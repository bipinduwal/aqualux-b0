export interface Fish {
  id: number;
  commonName: string;
  scientificName: string;
  emoji: string;
  habitat: 'Freshwater' | 'Saltwater' | 'Brackish';
  behavior: 'Peaceful' | 'Aggressive' | 'Schooling' | 'Territorial';
  experienceLevel: 'Beginner' | 'Intermediate' | 'Expert';
  size: {
    min: number; // cm
    max: number;
  };
  lifespan: {
    min: number; // years
    max: number;
  };
  tankSizeGallons: number;
  temperature: {
    min: number; // Celsius
    max: number;
  };
  diet: string[];
  temperament: string;
  price: number;
  availability: 'In Stock' | 'Low Stock' | 'Pre-Order';
  imageUrl?: string;
  description: string;
}

export const FISH_DATABASE: Fish[] = [
  {
    id: 1,
    commonName: 'Betta Fish',
    scientificName: 'Betta splendens',
    emoji: '🐠',
    habitat: 'Freshwater',
    behavior: 'Territorial',
    experienceLevel: 'Beginner',
    size: { min: 6, max: 7 },
    lifespan: { min: 3, max: 5 },
    tankSizeGallons: 5,
    temperature: { min: 24, max: 30 },
    diet: ['Small insects', 'Bloodworms', 'Pellets'],
    temperament: 'Aggressive to other males, can be aggressive to tank mates',
    price: 12.99,
    availability: 'In Stock',
    description: 'A vibrant and popular freshwater fish known for its flowing fins and aggressive behavior towards other males. Bettas are intelligent and can recognize their owners.',
  },
  {
    id: 2,
    commonName: 'Goldfish',
    scientificName: 'Carassius auratus',
    emoji: '🐟',
    habitat: 'Freshwater',
    behavior: 'Peaceful',
    experienceLevel: 'Beginner',
    size: { min: 10, max: 30 },
    lifespan: { min: 10, max: 20 },
    tankSizeGallons: 40,
    temperature: { min: 10, max: 23 },
    diet: ['Pellets', 'Vegetables', 'Insects'],
    temperament: 'Peaceful and friendly, can be kept in groups',
    price: 8.99,
    availability: 'In Stock',
    description: 'Classic and beloved, goldfish are hardy, long-lived, and can develop personality. They require larger tanks and good filtration.',
  },
  {
    id: 3,
    commonName: 'Angelfish',
    scientificName: 'Pterophyllum species',
    emoji: '🐟',
    habitat: 'Freshwater',
    behavior: 'Aggressive',
    experienceLevel: 'Intermediate',
    size: { min: 6, max: 10 },
    lifespan: { min: 10, max: 15 },
    tankSizeGallons: 55,
    temperature: { min: 24, max: 28 },
    diet: ['Small fish', 'Shrimp', 'Pellets', 'Bloodworms'],
    temperament: 'Peaceful with similarly sized fish, but predatory to small fish',
    price: 15.99,
    availability: 'In Stock',
    description: 'Elegant and majestic, angelfish are characterized by their triangular body shape and flowing fins. They are skilled hunters.',
  },
  {
    id: 4,
    commonName: 'Neon Tetra',
    scientificName: 'Paracheirodon innesi',
    emoji: '🐠',
    habitat: 'Freshwater',
    behavior: 'Schooling',
    experienceLevel: 'Beginner',
    size: { min: 1.5, max: 2 },
    lifespan: { min: 5, max: 10 },
    tankSizeGallons: 10,
    temperature: { min: 21, max: 25 },
    diet: ['Micro pellets', 'Small insects'],
    temperament: 'Peaceful, must be kept in schools of 6 or more',
    price: 3.99,
    availability: 'In Stock',
    description: 'Small and vibrant with a distinctive neon-like stripe, these fish create spectacular visual displays when schooling together.',
  },
  {
    id: 5,
    commonName: 'Clownfish',
    scientificName: 'Amphiprion ocellaris',
    emoji: '🐠',
    habitat: 'Saltwater',
    behavior: 'Peaceful',
    experienceLevel: 'Intermediate',
    size: { min: 7, max: 11 },
    lifespan: { min: 6, max: 10 },
    tankSizeGallons: 20,
    temperature: { min: 23, max: 27 },
    diet: ['Small crustaceans', 'Pellets', 'Algae'],
    temperament: 'Peaceful, can be housed with anemones',
    price: 24.99,
    availability: 'In Stock',
    description: 'Famous for their symbiotic relationship with sea anemones. Clownfish are hardy, colorful, and great for saltwater aquariums.',
  },
  {
    id: 6,
    commonName: 'Blue Tang',
    scientificName: 'Paracanthurus hepatus',
    emoji: '🐟',
    habitat: 'Saltwater',
    behavior: 'Aggressive',
    experienceLevel: 'Expert',
    size: { min: 10, max: 12 },
    lifespan: { min: 20, max: 30 },
    tankSizeGallons: 75,
    temperature: { min: 22, max: 26 },
    diet: ['Algae', 'Nori', 'Pellets'],
    temperament: 'Can be aggressive, requires large space and vegetation',
    price: 49.99,
    availability: 'Low Stock',
    description: 'A stunning electric blue saltwater fish, popular for their vibrant color but requires expert care and large tanks.',
  },
  {
    id: 7,
    commonName: 'Guppy',
    scientificName: 'Poecilia reticulata',
    emoji: '🐠',
    habitat: 'Freshwater',
    behavior: 'Peaceful',
    experienceLevel: 'Beginner',
    size: { min: 3, max: 6 },
    lifespan: { min: 2, max: 3 },
    tankSizeGallons: 10,
    temperature: { min: 22, max: 28 },
    diet: ['Pellets', 'Vegetables', 'Small insects'],
    temperament: 'Peaceful and active, thrives in groups',
    price: 4.99,
    availability: 'In Stock',
    description: 'Small, colorful, and lively fish that are perfect for beginners. Males have elaborate tail patterns and are highly interactive.',
  },
  {
    id: 8,
    commonName: 'Seahorse',
    scientificName: 'Hippocampus species',
    emoji: '🐴',
    habitat: 'Saltwater',
    behavior: 'Peaceful',
    experienceLevel: 'Expert',
    size: { min: 10, max: 35 },
    lifespan: { min: 5, max: 10 },
    tankSizeGallons: 50,
    temperature: { min: 20, max: 25 },
    diet: ['Small crustaceans', 'Mysis shrimp'],
    temperament: 'Peaceful, very slow swimmer, requires calm environment',
    price: 89.99,
    availability: 'Pre-Order',
    description: 'Graceful and delicate seahorses require specialized care, specific feeding, and calm tank conditions. A true aquarium centerpiece.',
  },
];

export const HABITATS = ['Freshwater', 'Saltwater', 'Brackish'] as const;
export const BEHAVIORS = ['Peaceful', 'Aggressive', 'Schooling', 'Territorial'] as const;
export const EXPERIENCE_LEVELS = ['Beginner', 'Intermediate', 'Expert'] as const;
