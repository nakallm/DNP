import React from 'react';
import { User, Award, History, Settings, AlertCircle } from 'lucide-react';
import { useVoteStore } from '../store/useVoteStore';

export const ProfilePage = () => {
  const { walletConnected, walletError, nominees } = useVoteStore();

  if (!walletConnected) {
    return (
      <div className="py-20 text-center">
        <User className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Connect Your Wallet</h2>
        <p className="text-gray-600 mb-4">
          Please connect your wallet to view your profile and voting history
        </p>
        {walletError && (
          <div className="flex items-center justify-center text-red-600 mt-4">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{walletError}</span>
          </div>
        )}
      </div>
    );
  }

  const votingHistory = nominees.filter(n => n.votes > 0);

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 p-3 rounded-full">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Your Profile</h1>
                <p className="text-primary-100">Connected via Bitcoin Wallet</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <Award className="h-8 w-8 text-primary-600 mb-2" />
                <div className="text-2xl font-bold text-gray-900">
                  {votingHistory.length}
                </div>
                <div className="text-gray-600">Total Votes Cast</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <History className="h-8 w-8 text-primary-600 mb-2" />
                <div className="text-2xl font-bold text-gray-900">
                  {new Date().getFullYear()}
                </div>
                <div className="text-gray-600">Current Voting Year</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <Settings className="h-8 w-8 text-primary-600 mb-2" />
                <div className="text-2xl font-bold text-gray-900">Active</div>
                <div className="text-gray-600">Account Status</div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Voting History</h2>
              
              {votingHistory.length > 0 ? (
                <div className="bg-white rounded-lg border border-gray-200">
                  {votingHistory.map((vote, index) => (
                    <div
                      key={vote.id}
                      className={`px-6 py-4 flex items-center justify-between ${
                        index !== votingHistory.length - 1 ? 'border-b border-gray-200' : ''
                      }`}
                    >
                      <div>
                        <h3 className="font-medium text-gray-900">{vote.name}</h3>
                        <p className="text-sm text-gray-500">{vote.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {vote.votes} votes
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date().toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">No voting history yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};