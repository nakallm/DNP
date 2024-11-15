import React from 'react';
import { CategorySelector } from '../components/CategorySelector';
import { NomineeCard } from '../components/NomineeCard';
import { useVoteStore } from '../store/useVoteStore';

export const NomineesPage = () => {
  const { currentCategory, nominees, searchTerm } = useVoteStore();
  
  const filteredNominees = nominees.filter(
    (nominee) => 
      nominee.category === currentCategory &&
      (searchTerm === '' || 
        nominee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nominee.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nominee.country.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <CategorySelector />
      
      {!filteredNominees.length ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-600">
            {searchTerm 
              ? 'No nominees found matching your search'
              : `No nominees yet for ${currentCategory}`}
          </h2>
          <p className="text-gray-500 mt-2">
            {searchTerm 
              ? 'Try adjusting your search terms'
              : 'Be the first to nominate someone!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredNominees.map((nominee) => (
            <NomineeCard key={nominee.id} nominee={nominee} />
          ))}
        </div>
      )}
    </div>
  );
};