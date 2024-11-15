import React from 'react';
import { NobelCategory } from '../types';
import { useVoteStore } from '../store/useVoteStore';
import { 
  Atom, 
  HeartPulse, 
  TestTube2, 
  Bird, 
  BookOpen, 
  TrendingUp 
} from 'lucide-react';

const categoryIcons = {
  [NobelCategory.PHYSICS]: Atom,
  [NobelCategory.MEDICINE]: HeartPulse,
  [NobelCategory.CHEMISTRY]: TestTube2,
  [NobelCategory.PEACE]: Bird,
  [NobelCategory.LITERATURE]: BookOpen,
  [NobelCategory.ECONOMICS]: TrendingUp,
};

export const CategorySelector = () => {
  const { currentCategory, setCurrentCategory } = useVoteStore();

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.values(NobelCategory).map((category) => {
            const Icon = categoryIcons[category];
            return (
              <button
                key={category}
                onClick={() => setCurrentCategory(category)}
                className={`category-card p-6 ${
                  currentCategory === category
                    ? 'ring-4 ring-primary-300 ring-opacity-50'
                    : ''
                }`}
              >
                <div className="flex flex-col items-center">
                  <Icon className="h-8 w-8 mb-3 text-primary-600 animate-float" />
                  <span className="text-sm font-medium text-gray-800 text-center">{category}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};