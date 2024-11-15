import React, { useState } from 'react';
import { Award, Bitcoin, Search, X, LayoutGrid, Vote, BarChart, User, UserPlus, AlertCircle } from 'lucide-react';
import { getAddress } from 'sats-connect';
import { useVoteStore } from '../store/useVoteStore';

interface NavLinkProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavLink = ({ icon: Icon, label, active = false, onClick }: NavLinkProps) => (
  <button 
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all
    ${active 
      ? 'bg-white/10 text-white' 
      : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`}
  >
    <Icon className="h-4 w-4" />
    <span>{label}</span>
  </button>
);

export const Header = () => {
  const { 
    walletConnected, 
    setWalletConnected, 
    setSearchTerm,
    currentPage,
    setCurrentPage,
    setIsNominationModalOpen,
    setWalletError
  } = useVoteStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showWalletError, setShowWalletError] = useState(false);

  const connectWallet = async () => {
    try {
      // Check if wallet is installed
      if (typeof window.bitcoin === 'undefined') {
        setShowWalletError(true);
        setWalletError('Bitcoin wallet not detected. Please install a compatible wallet.');
        return;
      }

      const getAddressOptions = {
        payload: {
          purposes: ['ordinals'],
          message: 'Address for receiving Runes',
          network: {
            type: 'Mainnet'
          },
        },
        onFinish: (response: { addresses: string[] }) => {
          if (response?.addresses?.[0]) {
            setWalletConnected(true);
            setWalletError(null);
            setShowWalletError(false);
          } else {
            setWalletError('No address received from wallet');
            setShowWalletError(true);
          }
        },
        onCancel: () => {
          setWalletError('Wallet connection cancelled');
          setShowWalletError(true);
        },
      };

      await getAddress(getAddressOptions);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect wallet';
      setWalletError(errorMessage);
      setShowWalletError(true);
      console.error('Error connecting wallet:', error);
    }
  };

  return (
    <header className="bg-gray-900 sticky top-0 z-50">
      <div className="relative">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 p-3 rounded-xl">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Decentralized Nobel Prize
                </h1>
                <p className="text-slate-400 text-sm">Voting Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {isSearchOpen ? (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search nominees..."
                    className="w-64 px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 border border-white/20"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
              )}
              
              <div className="relative">
                <button
                  onClick={connectWallet}
                  className="flex items-center space-x-2 bg-white/10 border border-white/20 text-white px-6 py-2.5 rounded-xl hover:bg-white/20 transition-all duration-300"
                >
                  <Bitcoin className="h-5 w-5" />
                  <span>{walletConnected ? 'Connected' : 'Connect Wallet'}</span>
                </button>
                
                {showWalletError && (
                  <div className="absolute top-full mt-2 right-0 w-64 p-3 bg-red-50 border border-red-200 rounded-lg shadow-lg">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-red-700">
                          {typeof window.bitcoin === 'undefined' 
                            ? 'Please install a compatible Bitcoin wallet to continue.'
                            : 'Failed to connect to wallet. Please try again.'}
                        </p>
                        {typeof window.bitcoin === 'undefined' && (
                          <a 
                            href="https://leather.io"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-red-700 hover:text-red-800 underline mt-1 inline-block"
                          >
                            Install Leather Wallet
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <nav className="mt-6">
            <div className="flex items-center space-x-2">
              <NavLink 
                icon={LayoutGrid} 
                label="Categories" 
                active={currentPage === 'categories'} 
                onClick={() => setCurrentPage('categories')}
              />
              <NavLink 
                icon={Vote} 
                label="Nominees" 
                active={currentPage === 'nominees'} 
                onClick={() => setCurrentPage('nominees')}
              />
              <button
                onClick={() => setIsNominationModalOpen(true)}
                className="flex items-center space-x-2 bg-white/10 text-white px-4 py-2 rounded-xl hover:bg-white/20 transition-colors"
              >
                <UserPlus className="h-4 w-4" />
                <span>Nominate</span>
              </button>
              <NavLink 
                icon={BarChart} 
                label="Results" 
                active={currentPage === 'results'} 
                onClick={() => setCurrentPage('results')}
              />
              <NavLink 
                icon={User} 
                label="Profile" 
                active={currentPage === 'profile'} 
                onClick={() => setCurrentPage('profile')}
              />
            </div>
          </nav>
        </div>
        <div className="h-1 bg-gradient-to-r from-white/5 via-white/10 to-white/5" />
      </div>
    </header>
  );
};