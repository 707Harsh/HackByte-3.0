'use client';

import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { 
  FiHome, 
  FiUser, 
  FiSettings, 
  FiLogOut, 
  FiFileText, 
  FiShoppingBag,
  FiMenu,
  FiX
} from 'react-icons/fi';
import { GiFarmer } from 'react-icons/gi';
import { FaHardHat } from 'react-icons/fa';

type Role = 'FARMER' | 'CONTRACTOR' | 'NONE';

export const Sidebar = () => {
  const { user } = useUser();
  const [role, setRole] = useState<Role>('NONE');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const fetchRole = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch(`/api/get-profile?clerkUserId=${user.id}`);
        if (!res.ok) throw new Error('Failed to fetch role');
        const data = await res.json();
        if (data.role === 'FARMER' || data.role === 'CONTRACTOR') {
          setRole(data.role);
        }
      } catch (err) {
        console.error('Error fetching role:', err);
      }
    };

    fetchRole();
  }, [user]);

  const dashboardLink =
    role === 'FARMER'
      ? '/farmer/dashboard'
      : role === 'CONTRACTOR'
      ? '/contractor/dashboard'
      : '/dashboard';

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-30 bg-white p-2 rounded-md shadow-md text-gray-700"
      >
        <FiMenu size={24} />
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`
          fixed md:relative z-50 h-screen bg-white shadow-lg transition-all duration-300
          ${mobileOpen ? 'left-0' : '-left-64'} 
          md:left-0
          ${collapsed ? 'w-20' : 'w-64'}
        `}
      >
        {/* Collapse toggle button */}
        <button
          onClick={toggleSidebar}
          className="hidden md:flex absolute -right-3 top-6 bg-white p-1 rounded-full shadow-md border border-gray-200 text-gray-600 hover:bg-gray-100"
        >
          {collapsed ? <FiMenu size={18} /> : <FiX size={18} />}
        </button>

        <div className="h-full flex flex-col">
          {/* Logo */}
          {/* <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            {!collapsed && (
              <Link href="/" className="flex items-center">
                {role === 'FARMER' ? (
                  <GiFarmer className="h-8 w-8 text-green-600" />
                ) : role === 'CONTRACTOR' ? (
                  <FaHardHat className="h-8 w-8 text-blue-600" />
                ) : (
                  <GiFarmer className="h-8 w-8 text-gray-600" />
                )}
                <span className="ml-2 text-xl font-bold text-gray-800">
                  AgriConnect
                </span>
              </Link>
            )}
            {collapsed && (
              <div className="mx-auto">
                {role === 'FARMER' ? (
                  <GiFarmer className="h-8 w-8 text-green-600" />
                ) : role === 'CONTRACTOR' ? (
                  <FaHardHat className="h-8 w-8 text-blue-600" />
                ) : (
                  <GiFarmer className="h-8 w-8 text-gray-600" />
                )}
              </div>
            )}
            <button 
              onClick={closeMobileMenu}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>
          </div> */}

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              <li>
                <Link 
                  href={dashboardLink}
                  onClick={closeMobileMenu}
                  className={`
                    flex items-center p-3 rounded-lg transition-colors
                    hover:bg-green-50 text-gray-700 hover:text-green-700
                    ${collapsed ? 'justify-center' : ''}
                  `}
                >
                  <FiHome size={20} />
                  {!collapsed && <span className="ml-3">Dashboard</span>}
                </Link>
              </li>

              {role === 'FARMER' && (
                <li>
                  <Link 
                    href="/contracts"
                    onClick={closeMobileMenu}
                    className={`
                      flex items-center p-3 rounded-lg transition-colors
                      hover:bg-green-50 text-gray-700 hover:text-green-700
                      ${collapsed ? 'justify-center' : ''}
                    `}
                  >
                    <FiFileText size={20} />
                    {!collapsed && <span className="ml-3">My Contracts</span>}
                  </Link>
                </li>
              )}

              {role === 'CONTRACTOR' && (
                <li>
                  <Link 
                    href="/market"
                    onClick={closeMobileMenu}
                    className={`
                      flex items-center p-3 rounded-lg transition-colors
                      hover:bg-blue-50 text-gray-700 hover:text-blue-700
                      ${collapsed ? 'justify-center' : ''}
                    `}
                  >
                    <FiShoppingBag size={20} />
                    {!collapsed && <span className="ml-3">Market</span>}
                  </Link>
                </li>
              )}

              <li>
                <Link 
                  href="/profile"
                  onClick={closeMobileMenu}
                  className={`
                    flex items-center p-3 rounded-lg transition-colors
                    hover:bg-gray-100 text-gray-700
                    ${collapsed ? 'justify-center' : ''}
                  `}
                >
                  <FiUser size={20} />
                  {!collapsed && (
                    <span className="ml-3">
                      {role === 'FARMER' 
                        ? 'Farmer Profile' 
                        : role === 'CONTRACTOR' 
                        ? 'Contractor Profile' 
                        : 'Profile'}
                    </span>
                  )}
                </Link>
              </li>

              <li>
                <Link 
                  href="/settings"
                  onClick={closeMobileMenu}
                  className={`
                    flex items-center p-3 rounded-lg transition-colors
                    hover:bg-gray-100 text-gray-700
                    ${collapsed ? 'justify-center' : ''}
                  `}
                >
                  <FiSettings size={20} />
                  {!collapsed && <span className="ml-3">Settings</span>}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Bottom section */}
          <div className="p-4 border-t border-gray-200">
            <button
              className={`
                w-full flex items-center p-3 rounded-lg transition-colors
                hover:bg-gray-100 text-gray-700
                ${collapsed ? 'justify-center' : ''}
              `}
            >
              <FiLogOut size={20} />
              {!collapsed && <span className="ml-3">Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};