'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface FishProps {
  url: string;
  scale?: number;
}

interface FoodParticle {
  position: [number, number, number];
  life: number;
}

function Fish({ url, scale = 0.05, foods }: { url: string; scale?: number; foods: FoodParticle[] }) {
  const { scene, animations } = useGLTF(url);
  const ref = useRef<THREE.Group>(null!);
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const target = useRef(new THREE.Vector3(0, 0, 0));
  const swimTimer = useRef(0);
  const swimDuration = useRef(300);
  const searchRadius = 15;

  useEffect(() => {
    if (animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      const action = mixer.current.clipAction(animations[0]);
      action.play();
    }
  }, [animations, scene]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    if (mixer.current) mixer.current.update(delta);

    swimTimer.current += delta * 60;

    // Check for nearby food
    let closestFood: FoodParticle | undefined;
    let closestDist = searchRadius;

    foods.forEach((food) => {
      const foodPos = new THREE.Vector3(...food.position);
      const dist = ref.current.position.distanceTo(foodPos);
      if (dist < closestDist) {
        closestFood = food;
        closestDist = dist;
      }
    });

    // Set target to food or random point
    if (closestFood) {
      target.current.set(closestFood.position[0], closestFood.position[1], closestFood.position[2]);
      swimTimer.current = 0; // Keep swimming to food
    } else if (swimTimer.current > swimDuration.current) {
      target.current.set(
        Math.random() * 20 - 10,
        Math.random() * 10 - 5,
        Math.random() * 10 - 5
      );
      swimDuration.current = 200 + Math.random() * 300;
      swimTimer.current = 0;
    }

    // Move towards target
    const direction = target.current.clone().sub(ref.current.position);
    const distance = direction.length();

    if (distance > 0.5) {
      direction.normalize();
      velocity.current.add(direction.multiplyScalar(0.15)); // Faster acceleration towards food
      velocity.current.multiplyScalar(0.92); // Friction
      velocity.current.clampLength(0, 3); // Faster max speed

      ref.current.position.add(velocity.current.clone().multiplyScalar(delta));

      // Face direction of movement
      if (velocity.current.length() > 0.01) {
        ref.current.lookAt(ref.current.position.clone().add(velocity.current));
      }
    }

    // Bounds
    ref.current.position.clamp(new THREE.Vector3(-15, -10, -10), new THREE.Vector3(15, 10, 10));

    // Gentle bobbing
    ref.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.005 * delta;
  });

  return <primitive ref={ref} object={scene.clone()} scale={scale} />;
}

function FoodParticles({ foods, setFoods, fishRef }: { foods: FoodParticle[]; setFoods: React.Dispatch<React.SetStateAction<FoodParticle[]>>; fishRef: React.RefObject<THREE.Group> }) {
  useFrame((state, delta) => {
    setFoods((prev) =>
      prev.filter((food) => {
        // Sink slowly
        food.position[1] -= 0.05 * delta; // Slow sink
        food.life -= 0.005 * delta;

        // Check if eaten
        if (fishRef.current) {
          const fishPos = fishRef.current.position;
          const dist = new THREE.Vector3(...food.position).distanceTo(fishPos);
          if (dist < 1) return false; // Eaten
        }

        return food.life > 0 && food.position[1] > -10; // Remove if sunk too low
      })
    );
  });

  return (
    <>
      {foods.map((food, i) => (
        <mesh key={i} position={food.position}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="yellow" transparent opacity={food.life} />
        </mesh>
      ))}
    </>
  );
}

function ClickHandler({ setFoods, setClickCount, foods }: { setFoods: React.Dispatch<React.SetStateAction<FoodParticle[]>>; setClickCount: React.Dispatch<React.SetStateAction<number>>; foods: FoodParticle[] }) {
  const { camera, gl, raycaster, mouse } = useThree();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      mouse.x = (event.clientX / gl.domElement.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / gl.domElement.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // Find intersection with an invisible plane at z=0 (aquarium floor)
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const intersect = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersect);

      // Add 5 food particles with spread
      for (let i = 0; i < 5; i++) {
        setFoods((prev) => [
          ...prev,
          {
            position: [
              intersect.x + (Math.random() - 0.5) * 2,
              intersect.y + (Math.random() - 0.5) * 2,
              intersect.z + (Math.random() - 0.5) * 2,
            ],
            life: 1,
          },
        ]);
      }
      setClickCount((c) => c + 1);
    };

    gl.domElement.addEventListener('click', handleClick);
    return () => gl.domElement.removeEventListener('click', handleClick);
  }, [gl, camera, raycaster, mouse, setFoods, setClickCount]);

  return null;
}

function CanvasContent({ clickCount, setClickCount, foods, setFoods, fishRef }: { clickCount: number; setClickCount: React.Dispatch<React.SetStateAction<number>>; foods: FoodParticle[]; setFoods: React.Dispatch<React.SetStateAction<FoodParticle[]>>; fishRef: React.RefObject<THREE.Group> }) {
  const { scene, gl } = useThree();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Underwater fog and effects
    scene.fog = new THREE.FogExp2(0x001122, 0.02);

    // Handle canvas resize
    const handleResize = () => {
      gl.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [scene, gl]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#88aaff" />

      <Environment preset="night" background={false} />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />

      <Fish url="/model/fish.glb" foods={foods} />

      <FoodParticles foods={foods} setFoods={setFoods} fishRef={fishRef} />

      <OrbitControls enableZoom={false} enablePan={true} enableRotate={true} />

      <ClickHandler setFoods={setFoods} setClickCount={setClickCount} foods={foods} />
    </>
  );
}

export default function Realistic3DAquarium() {
  const [foods, setFoods] = useState<FoodParticle[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const fishRef = useRef<THREE.Group>(null!);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-blue-950 to-black">
      <Canvas 
        camera={{ position: [0, 30, 0.1], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <CanvasContent clickCount={clickCount} setClickCount={setClickCount} foods={foods} setFoods={setFoods} fishRef={fishRef} />
      </Canvas>

      <div className="absolute top-8 left-8 z-10 text-white pointer-events-none">
        <h1 className="text-4xl font-bold mb-2">Pond View</h1>
        <p className="text-xl text-blue-200">Click to drop food and feed the fish!</p>
      </div>

      <div className="absolute bottom-8 right-8 z-10 text-white pointer-events-none">
        <p className="text-lg font-semibold">Times Fed: <span className="text-yellow-400">{clickCount}</span></p>
      </div>

      <div className="absolute bottom-8 left-8 z-10 text-blue-200 text-sm pointer-events-none">
        <p>🖱️ Drag to rotate view</p>
      </div>
    </div>
  );
}