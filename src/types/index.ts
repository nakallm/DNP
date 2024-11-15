export interface Nominee {
  id: string;
  name: string;
  category: NobelCategory;
  description: string;
  achievements: string[];
  imageUrl: string;
  votes: number;
  institution: string;
  country: string;
  researchArea?: string;
  previousAwards?: string[];
  citationCount?: number;
}

export enum NobelCategory {
  PEACE = "Peace",
  PHYSICS = "Physics",
  CHEMISTRY = "Chemistry",
  MEDICINE = "Medicine",
  LITERATURE = "Literature",
  ECONOMICS = "Economic Sciences"
}

export interface VoteStatus {
  isLoading: boolean;
  error: string | null;
}