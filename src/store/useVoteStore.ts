import { create } from 'zustand';
import { NobelCategory, Nominee, VoteStatus } from '../types';
import { sampleNominees } from '../data/sampleData';

interface VoteStore {
  walletConnected: boolean;
  walletError: string | null;
  currentCategory: NobelCategory;
  currentPage: 'categories' | 'nominees' | 'results' | 'profile';
  nominees: Nominee[];
  voteStatus: VoteStatus;
  isNominationModalOpen: boolean;
  setWalletConnected: (connected: boolean) => void;
  setWalletError: (error: string | null) => void;
  setCurrentCategory: (category: NobelCategory) => void;
  setCurrentPage: (page: 'categories' | 'nominees' | 'results' | 'profile') => void;
  castVote: (nomineeId: string) => Promise<void>;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setIsNominationModalOpen: (isOpen: boolean) => void;
  addNominee: (nominee: Omit<Nominee, 'citationCount' | 'previousAwards' | 'researchArea'>) => void;
}

export const useVoteStore = create<VoteStore>((set, get) => ({
  walletConnected: false,
  walletError: null,
  currentCategory: NobelCategory.PEACE,
  currentPage: 'categories',
  nominees: sampleNominees,
  voteStatus: { isLoading: false, error: null },
  searchTerm: '',
  isNominationModalOpen: false,
  setWalletConnected: (connected) => set({ walletConnected: connected }),
  setWalletError: (error) => set({ walletError: error }),
  setCurrentCategory: (category) => set({ currentCategory: category }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setIsNominationModalOpen: (isOpen) => set({ isNominationModalOpen: isOpen }),
  addNominee: (nominee) => set(state => ({
    nominees: [...state.nominees, nominee]
  })),
  castVote: async (nomineeId) => {
    set({ voteStatus: { isLoading: true, error: null } });
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      set(state => ({
        nominees: state.nominees.map((nominee) =>
          nominee.id === nomineeId
            ? { ...nominee, votes: nominee.votes + 1 }
            : nominee
        ),
        voteStatus: { isLoading: false, error: null }
      }));
    } catch (error) {
      set({ voteStatus: { isLoading: false, error: 'Failed to cast vote. Please try again.' } });
    }
  }
}));