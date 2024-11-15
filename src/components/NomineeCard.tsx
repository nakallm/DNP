import React, { useState } from 'react';
import { Trophy, Award, MapPin, Building2, BookOpen, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { Nominee } from '../types';
import { useVoteStore } from '../store/useVoteStore';

interface NomineeCardProps {
  nominee: Nominee;
}

export const NomineeCard = ({ nominee }: NomineeCardProps) => {
  const { walletConnected, castVote, voteStatus } = useVoteStore();
  const [expanded, setExpanded] = useState(false);

  const handleVote = async () => {
    await castVote(nominee.id);
  };

  return (
    <div className="nominee-card group">
      <div className="relative">
        <img
          src={nominee.imageUrl}
          alt={nominee.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 m-4 bg-primary-600/90 px-4 py-1 rounded-full text-sm font-medium text-white">
          {nominee.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          {nominee.name}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Building2 className="h-4 w-4 mr-2 text-primary-500" />
            {nominee.institution}
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-primary-500" />
            {nominee.country}
          </div>
          {nominee.citationCount && (
            <div className="flex items-center text-gray-600">
              <BookOpen className="h-4 w-4 mr-2 text-primary-500" />
              {nominee.citationCount.toLocaleString()} citations
            </div>
          )}
        </div>

        <p className="text-gray-600 mb-4">{nominee.description}</p>
        
        <div className={`space-y-3 transition-all duration-300 ${expanded ? 'block' : 'hidden'}`}>
          <h4 className="font-semibold text-gray-800">Key Achievements:</h4>
          {nominee.achievements.map((achievement, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="flex-shrink-0 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
              </div>
              <p className="text-sm text-gray-500">{achievement}</p>
            </div>
          ))}
          
          {nominee.previousAwards && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-800 mb-2">Previous Awards:</h4>
              <div className="flex flex-wrap gap-2">
                {nominee.previousAwards.map((award, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-1 bg-primary-50 px-3 py-1 rounded-full"
                  >
                    <Award className="h-3 w-3 text-primary-600" />
                    <span className="text-xs text-primary-600">{award}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full mt-4 flex items-center justify-center text-sm text-primary-600 hover:text-primary-700"
        >
          {expanded ? (
            <>
              Show Less <ChevronUp className="h-4 w-4 ml-1" />
            </>
          ) : (
            <>
              Show More <ChevronDown className="h-4 w-4 ml-1" />
            </>
          )}
        </button>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-accent-500" />
            <span className="text-gray-600 font-medium">{nominee.votes} votes</span>
          </div>
          <button
            onClick={handleVote}
            disabled={!walletConnected || voteStatus.isLoading}
            className={`px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all
              ${
                walletConnected
                  ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            {voteStatus.isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Voting...</span>
              </>
            ) : (
              'Vote'
            )}
          </button>
        </div>
        
        {voteStatus.error && (
          <p className="mt-2 text-sm text-red-600">{voteStatus.error}</p>
        )}
      </div>
    </div>
  );
};