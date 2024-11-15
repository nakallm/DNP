import React from 'react';
import { Header } from './components/Header';
import { CategoriesPage } from './pages/CategoriesPage';
import { NomineesPage } from './pages/NomineesPage';
import { ResultsPage } from './pages/ResultsPage';
import { ProfilePage } from './pages/ProfilePage';
import { NominationModal } from './components/NominationModal';
import { useVoteStore } from './store/useVoteStore';

function App() {
  const { currentPage, isNominationModalOpen, setIsNominationModalOpen } = useVoteStore();
  
  const renderPage = () => {
    switch (currentPage) {
      case 'categories':
        return <CategoriesPage />;
      case 'nominees':
        return <NomineesPage />;
      case 'results':
        return <ResultsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <CategoriesPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4">
        {renderPage()}
      </main>
      
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">Decentralized Nobel Prize Voting Platform</p>
          <p className="text-sm">Powered by Bitcoin Runes Protocol</p>
          <div className="mt-4 text-xs">
            <p>All votes are recorded on the Bitcoin blockchain using Runes Protocol</p>
          </div>
        </div>
      </footer>

      <NominationModal 
        isOpen={isNominationModalOpen}
        onClose={() => setIsNominationModalOpen(false)}
      />
    </div>
  );
}

export default App;