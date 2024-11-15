import React, { useState } from 'react';
import { 
  Bird, 
  BookOpen, 
  Atom, 
  TestTube2, 
  HeartPulse, 
  TrendingUp,
  ArrowRight,
  PlusCircle
} from 'lucide-react';
import { NobelCategory } from '../types';
import { useVoteStore } from '../store/useVoteStore';

interface CategoryCardProps {
  category: NobelCategory;
  icon: React.ElementType;
  description: string;
  nominees: number;
  onClick: () => void;
}

const CategoryCard = ({ category, icon: Icon, description, nominees, onClick }: CategoryCardProps) => (
  <div className="category-card group">
    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    <div className="relative p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-white/10 p-3 rounded-xl">
          <Icon className="h-8 w-8 text-primary-600" />
        </div>
        <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
          {nominees} Nominees
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">{category}</h3>
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>
      
      <button
        onClick={onClick}
        className="flex items-center justify-between w-full px-4 py-2 text-primary-600 bg-primary-50 rounded-xl group-hover:bg-primary-600 group-hover:text-white transition-all duration-300"
      >
        <span className="font-medium">View Nominees</span>
        <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
);

const categoryDetails = {
  [NobelCategory.PEACE]: {
    icon: Bird,
    description: "Honoring champions of peace and conflict resolution worldwide.",
  },
  [NobelCategory.LITERATURE]: {
    icon: BookOpen,
    description: "Celebrating outstanding contributions to the world of letters.",
  },
  [NobelCategory.PHYSICS]: {
    icon: Atom,
    description: "Recognizing groundbreaking discoveries in physical science.",
  },
  [NobelCategory.CHEMISTRY]: {
    icon: TestTube2,
    description: "Awarding excellence in chemical research and innovation.",
  },
  [NobelCategory.MEDICINE]: {
    icon: HeartPulse,
    description: "Acknowledging breakthroughs in medical science and physiology.",
  },
  [NobelCategory.ECONOMICS]: {
    icon: TrendingUp,
    description: "Honoring influential work in economic sciences.",
  },
};

export const CategoriesPage = () => {
  const { nominees, setCurrentCategory, setCurrentPage } = useVoteStore();
  const [showSuggestionForm, setShowSuggestionForm] = useState(false);
  const [suggestion, setSuggestion] = useState({ name: '', description: '' });
  const [submitted, setSubmitted] = useState(false);
  
  const handleCategoryClick = (category: NobelCategory) => {
    setCurrentCategory(category);
    setCurrentPage('nominees');
  };

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the suggestion to a backend
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowSuggestionForm(false);
      setSuggestion({ name: '', description: '' });
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Nobel Prize Categories</h1>
        <p className="text-lg text-gray-600">
          Explore and vote across six prestigious categories, each representing groundbreaking achievements in human knowledge and progress.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(NobelCategory).map((category) => (
          <CategoryCard
            key={category}
            category={category}
            icon={categoryDetails[category].icon}
            description={categoryDetails[category].description}
            nominees={nominees.filter(n => n.category === category).length}
            onClick={() => handleCategoryClick(category)}
          />
        ))}
      </div>

      <div className="mt-16 p-8 rounded-2xl glass-card">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {nominees.length}
            </div>
            <div className="text-gray-600">Total Nominees</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {nominees.reduce((sum, nominee) => sum + nominee.votes, 0)}
            </div>
            <div className="text-gray-600">Total Votes Cast</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">6</div>
            <div className="text-gray-600">Prize Categories</div>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        {!showSuggestionForm ? (
          <button
            onClick={() => setShowSuggestionForm(true)}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-white border-2 border-primary-600 text-primary-600 rounded-xl hover:bg-primary-50 transition-colors"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Suggest a New Category</span>
          </button>
        ) : (
          <div className="max-w-xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Suggest a New Category</h3>
            {submitted ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-xl">
                Thank you for your suggestion! We'll review it carefully.
              </div>
            ) : (
              <form onSubmit={handleSuggestionSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Category Name"
                    value={suggestion.name}
                    onChange={(e) => setSuggestion({ ...suggestion, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Why should this category be added? Describe its significance..."
                    value={suggestion.description}
                    onChange={(e) => setSuggestion({ ...suggestion, description: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    rows={4}
                    required
                  />
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowSuggestionForm(false)}
                    className="px-6 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Submit Suggestion
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};