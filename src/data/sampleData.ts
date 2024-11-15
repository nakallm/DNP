import { Nominee, NobelCategory } from '../types';

export const sampleNominees: Nominee[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    category: NobelCategory.PHYSICS,
    description: 'Pioneering work in quantum computing and superconductivity',
    achievements: [
      'Developed new quantum error correction methods',
      'Created first room-temperature quantum bit',
      'Published groundbreaking paper in Nature Physics'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
    votes: 156,
    institution: 'MIT',
    country: 'United States',
    researchArea: 'Quantum Computing',
    previousAwards: ['Wolf Prize in Physics', 'Breakthrough Prize'],
    citationCount: 45000
  },
  {
    id: '2',
    name: 'Prof. James Watson',
    category: NobelCategory.CHEMISTRY,
    description: 'Revolutionary advances in green hydrogen production',
    achievements: [
      'Developed efficient water splitting catalyst',
      'Reduced hydrogen production costs by 80%',
      'Created sustainable energy storage solution'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    votes: 143,
    institution: 'Oxford University',
    country: 'United Kingdom',
    researchArea: 'Catalysis',
    previousAwards: ['Royal Medal', 'Priestley Medal'],
    citationCount: 38000
  },
  {
    id: '3',
    name: 'Dr. Maria Rodriguez',
    category: NobelCategory.PEACE,
    description: 'Innovative conflict resolution in water-scarce regions',
    achievements: [
      'Established cross-border water sharing framework',
      'Prevented three potential water conflicts',
      'Created sustainable agriculture program'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
    votes: 198,
    institution: 'UN Peace Institute',
    country: 'Spain',
    previousAwards: ['UN Peace Prize', 'Gandhi Peace Award']
  }
];