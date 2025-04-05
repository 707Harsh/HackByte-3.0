'use client';

import React, { useEffect, useState } from 'react';
import { useClerk, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { FiHome, FiUser, FiSettings, FiLogOut, FiTruck, FiPackage } from 'react-icons/fi';
import { GiFarmer } from 'react-icons/gi';

type Role = 'FARMER' | 'CONTRACTOR' | 'NONE';

export const Navbar = () => {
  const [role, setRole] = useState<Role>('NONE');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useUser();
  const {signOut}=useClerk();
  const router = useRouter();

  useEffect(() => {
    const fetchRole = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch(`/api/get-profile?clerkUserId=${user.id}`);
        if (!res.ok) throw new Error('Failed to fetch profile');
        const profile = await res.json();

        if (profile.role === 'FARMER' || profile.role === 'CONTRACTOR') {
          setRole(profile.role);
        }
      } catch (error) {
        console.error('Error fetching role:', error);
      }
    };

    fetchRole();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={() => router.push('/')}
            >
              <GiFarmer className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-2xl font-bold text-green-800">AgriConnect</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            {role === 'NONE' && (
              <>
                <button 
                  onClick={() => router.push('/farmer-signup')}
                  className="text-green-700 hover:bg-green-50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Farmer Sign Up
                </button>
                <button 
                  onClick={() => router.push('/contractor-signup')}
                  className="text-green-700 hover:bg-green-50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Contractor Sign Up
                </button>
                <button 
                  onClick={() => router.push('/login')}
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors duration-200"
                >
                  Login
                </button>
              </>
            )}

            {role === 'FARMER' && (
              <>
                <button 
                  onClick={() => router.push('/farmer/dashboard')}
                  className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200"
                >
                  <FiHome className="mr-1" /> Dashboard
                </button>
                <button 
                  onClick={() => router.push('/farmer/profile')}
                  className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200"
                >
                  <FiUser className="mr-1" /> Profile
                </button>
                <button 
                  onClick={() => router.push('/farmer/contracts')}
                  className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200"
                >
                  <FiPackage className="mr-1" /> My Contracts
                </button>
                <button 
                  onClick={() => router.push('/farmer/settings')}
                  className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200"
                >
                  <FiSettings className="mr-1" /> Settings
                </button>
                <button 
                  onClick={handleLogout}
                  className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200"
                >
                  <FiLogOut className="mr-1" /> Logout
                </button>
              </>
            )}

            {role === 'CONTRACTOR' && (
              <>
                <button 
                  onClick={() => router.push('/contractor/dashboard')}
                  className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200"
                >
                  <FiHome className="mr-1" /> Dashboard
                </button>
                <button 
                  onClick={() => router.push('/contractor/profile')}
                  className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200"
                >
                  <FiUser className="mr-1" /> Profile
                </button>
                <button 
                  onClick={() => router.push('/contractor/market')}
                  className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200"
                >
                  <FiTruck className="mr-1" /> Market
                </button>
                <button 
                  onClick={() => router.push('/contractor/settings')}
                  className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200"
                >
                  <FiSettings className="mr-1" /> Settings
                </button>
                <button 
                  onClick={handleLogout}
                  className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200"
                >
                  <FiLogOut className="mr-1" /> Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-lg`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {role === 'NONE' && (
            <>
              <button 
                onClick={() => {
                  router.push('/farmer-signup');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-green-700 hover:bg-green-50 px-3 py-2 rounded-md text-base font-medium"
              >
                Farmer Sign Up
              </button>
              <button 
                onClick={() => {
                  router.push('/contractor-signup');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-green-700 hover:bg-green-50 px-3 py-2 rounded-md text-base font-medium"
              >
                Contractor Sign Up
              </button>
              <button 
                onClick={() => {
                  router.push('/login');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left bg-green-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
              >
                Login
              </button>
            </>
          )}

          {role === 'FARMER' && (
            <>
              <button 
                onClick={() => {
                  router.push('/farmer/dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <FiHome className="mr-2" /> Dashboard
              </button>
              <button 
                onClick={() => {
                  router.push('/farmer/profile');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <FiUser className="mr-2" /> Profile
              </button>
              <button 
                onClick={() => {
                  router.push('/farmer/contracts');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <FiPackage className="mr-2" /> My Contracts
              </button>
              <button 
                onClick={() => {
                  router.push('/farmer/settings');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <FiSettings className="mr-2" /> Settings
              </button>
              <button 
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            </>
          )}

          {role === 'CONTRACTOR' && (
            <>
              <button 
                onClick={() => {
                  router.push('/contractor/dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <FiHome className="mr-2" /> Dashboard
              </button>
              <button 
                onClick={() => {
                  router.push('/contractor/profile');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <FiUser className="mr-2" /> Profile
              </button>
              <button 
                onClick={() => {
                  router.push('/contractor/market');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <FiTruck className="mr-2" /> Market
              </button>
              <button 
                onClick={() => {
                  router.push('/contractor/settings');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <FiSettings className="mr-2" /> Settings
              </button>
              <button 
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};