"use client";

import React, { useState } from 'react';

type Farmer = {
  id: string;
  name: string;
  cropType: string;
  location: string;
  quantity: string;
  status: 'pending' | 'accepted' | 'rejected';
};

type FarmerCardProps = {
  farmer: Farmer;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
};

const FarmerCard: React.FC<FarmerCardProps> = ({ farmer, onAccept, onReject }) => {
  const statusColor = {
    accepted: 'border-green-500',
    rejected: 'border-red-500',
    pending: 'border-gray-200'
  };

  const statusBadgeColor = {
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    pending: ''
  };

  return (
    <div className={`relative p-4 rounded-lg shadow-md mb-4 border-l-4 ${statusColor[farmer.status]} transition-all hover:shadow-lg`}>
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{farmer.name}</h3>
        <p className="text-gray-600"><span className="font-medium">Crop Type:</span> {farmer.cropType}</p>
        <p className="text-gray-600"><span className="font-medium">Location:</span> {farmer.location}</p>
        <p className="text-gray-600"><span className="font-medium">Quantity:</span> {farmer.quantity}</p>
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={() => onAccept(farmer.id)} 
          className={`px-3 py-1 rounded-md font-medium text-white bg-green-600 hover:bg-green-700 transition-colors ${
            farmer.status !== 'pending' ? 'opacity-60 cursor-not-allowed' : ''
          }`}
          disabled={farmer.status !== 'pending'}
        >
          Accept
        </button>
        <button 
          onClick={() => onReject(farmer.id)} 
          className={`px-3 py-1 rounded-md font-medium text-white bg-red-600 hover:bg-red-700 transition-colors ${
            farmer.status !== 'pending' ? 'opacity-60 cursor-not-allowed' : ''
          }`}
          disabled={farmer.status !== 'pending'}
        >
          Reject
        </button>
      </div>
      
      {farmer.status !== 'pending' && (
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold uppercase ${statusBadgeColor[farmer.status]}`}>
          {farmer.status}
        </div>
      )}
    </div>
  );
};

const FarmerCommoditySales: React.FC = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([
    {
      id: '1',
      name: 'John Doe',
      cropType: 'Wheat',
      location: 'Springfield, IL',
      quantity: '500 kg',
      status: 'pending'
    },
    {
      id: '2',
      name: 'Jane Smith',
      cropType: 'Corn',
      location: 'Lincoln, NE',
      quantity: '750 kg',
      status: 'pending'
    },
    {
      id: '3',
      name: 'Robert Johnson',
      cropType: 'Soybeans',
      location: 'Des Moines, IA',
      quantity: '1200 kg',
      status: 'pending'
    },
  ]);

  const handleAccept = (id: string) => {
    setFarmers(farmers.map(farmer => 
      farmer.id === id ? {...farmer, status: 'accepted'} : farmer
    ));
  };

  const handleReject = (id: string) => {
    setFarmers(farmers.map(farmer => 
      farmer.id === id ? {...farmer, status: 'rejected'} : farmer
    ));
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-6xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Farmers Interested in Selling</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {farmers.map(farmer => (
          <FarmerCard 
            key={farmer.id} 
            farmer={farmer} 
            onAccept={handleAccept}
            onReject={handleReject}
          />
        ))}
      </div>
    </div>
  );
};

export default FarmerCommoditySales;