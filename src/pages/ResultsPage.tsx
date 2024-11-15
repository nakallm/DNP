import React from 'react';
import { Trophy, Award, ArrowUp, ArrowDown } from 'lucide-react';
import { useVoteStore } from '../store/useVoteStore';
import { NobelCategory } from '../types';

export const ResultsPage = () => {
  const { nominees } = useVoteStore();

  const categoryResults = Object.values(NobelCategory).map(category => {
    const categoryNominees = nominees
      .filter(n => n.category === category)
      .sort((a, b) => b.votes - a.votes);

    return {
      category,
      nominees: categoryNominees,
      totalVotes: categoryNominees.reduce((sum, n) => sum + n.votes, 0)
    };
  });

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Current Results</h1>
          <p className="text-lg text-gray-600">
            Live voting results across all Nobel Prize categories
          </p>
        </div>

        <div className="space-y-8">
          {categoryResults.map(({ category, nominees: categoryNominees, totalVotes }) => (
            <div key={category} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-white">{category}</h2>
                  <div className="flex items-center space-x-2 text-white/90">
                    <Trophy className="h-5 w-5" />
                    <span>{totalVotes} votes</span>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {categoryNominees.map((nominee, index) => (
                  <div 
                    key={nominee.id}
                    className="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                        ${index === 0 ? 'bg-yellow-100 text-yellow-600' : 
                          index === 1 ? 'bg-gray-100 text-gray-600' :
                          index === 2 ? 'bg-orange-100 text-orange-600' :
                          'bg-gray-50 text-gray-400'}
                      `}>
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{nominee.name}</h3>
                        <p className="text-sm text-gray-500">{nominee.institution}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{nominee.votes} votes</div>
                        <div className="text-sm text-gray-500">
                          {((nominee.votes / totalVotes) * 100 || 0).toFixed(1)}%
                        </div>
                      </div>
                      {index === 0 ? (
                        <ArrowUp className="h-5 w-5 text-green-500" />
                      ) : (
                        <ArrowDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};