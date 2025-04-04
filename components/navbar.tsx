"use client";
import React from 'react';
import { useState } from 'react';

export const Navbar = () => 
{

    const roles = ['farmer', 'seller', 'none'];
    const [role, setRole] = useState('none');

    return(
        <div className="sm:flex sm:justify-between sm:items-center py-2 sm:py-4 px-6 shadow-md">
            <p className=" font-semibold text-4xl">AgriConnect</p>
            <div className="flex items-center space-x-4">
                {/* Testing Role Selector */}
                <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="text-xl border px-2 py-1 rounded"
                >
                {roles.map((r) => (
                    <option key={r} value={r}>
                    {r}
                    </option>
                ))}
                </select>

                {role === 'none' && (
                <>
                    <button className="bg-gray-200 text-black text-xl rounded px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-500">
                    Farmer Login
                    </button>
                    <button className="bg-gray-200 text-black text-xl rounded px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-500">
                    Seller Login
                    </button>
                </>
                )}

                {role === 'farmer' && (
                <>
                    <button className="bg-gray-200 text-black text-xl rounded px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-500">
                    Dashboard
                    </button>
                    <button className="bg-gray-200 text-black text-xl rounded px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-500">
                    Farmer Profile
                    </button>
                    <button className="bg-gray-200 text-black text-xl rounded px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-500">
                    My Contracts
                    </button>
                    <button className="bg-gray-200 text-black text-xl rounded px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-500">
                    Settings
                    </button>
                    <button className="bg-gray-200 text-black text-xl rounded px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-500">
                    Logout
                    </button>
                </>
                )}

                {role === 'seller' && (
                <>
                    <button className="bg-gray-200 text-black text-xl rounded px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-500">
                    Dashboard
                    </button>
                    <button className="bg-gray-200 text-black text-xl rounded px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-500">
                    Seller Profile
                    </button>
                    <button className="bg-gray-200 text-black text-xl rounded px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-500">
                    Market
                    </button>
                    <button className="bg-gray-200 text-black text-xl rounded px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-500">
                    Settings
                    </button>
                    <button className="bg-gray-200 text-black text-xl rounded px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-500">
                    Logout
                    </button>
                </>
                )}
            </div>
        </div>
    )
}