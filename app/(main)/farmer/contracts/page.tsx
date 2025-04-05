import React from "react";
import { FiClock, FiCalendar, FiDollarSign, FiPackage } from "react-icons/fi";
import { GiWheat, GiCorn, GiGrain } from "react-icons/gi";

// Dummy data based on Prisma schema
const dummySaleListings = [
  {
    id: "65de0d7361cb4b0c040d0563",
    cropType: "Wheat",
    quantity: 150,
    createdAt: "2024-03-15",
    status: "ACTIVE",
    pricePerUnit: 2100,
  },
  {
    id: "65de8c23e9c1bff218cf5275",
    cropType: "Rice",
    quantity: 80,
    createdAt: "2024-03-18",
    status: "PENDING",
    pricePerUnit: 1850,
  },
  {
    id: "65de9938bac72ce0dd2f1960",
    cropType: "Corn",
    quantity: 200,
    createdAt: "2024-03-20",
    status: "COMPLETED",
    pricePerUnit: 1750,
  },
];

const getCropIcon = (cropType: string) => {
  switch (cropType.toLowerCase()) {
    case 'wheat':
      return <GiWheat className="text-amber-500 text-xl" />;
    case 'rice':
      return <GiGrain className="text-gray-600 text-xl" />;
    case 'corn':
      return <GiCorn className="text-yellow-500 text-xl" />;
    default:
      return <FiPackage className="text-green-500 text-xl" />;
  }
};

const formatDate = (dateString: string) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' } as Intl.DateTimeFormatOptions;
  return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
};

const getStatusBadge = (status: string) => {
  const statusStyles = {
    ACTIVE: "bg-green-100 text-green-800",
    PENDING: "bg-yellow-100 text-yellow-800",
    COMPLETED: "bg-blue-100 text-blue-800",
    EXPIRED: "bg-gray-100 text-gray-800",
    CANCELLED: "bg-red-100 text-red-800",
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-sm ${statusStyles[status as keyof typeof statusStyles]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
    </span>
  );
};

const SaleListings = () => {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-green-800">My Crop Listings</h1>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
            + New Listing
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Total Listings</p>
          <p className="text-2xl font-bold">3</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Active</p>
          <p className="text-2xl font-bold text-green-600">1</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">1</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Completed</p>
          <p className="text-2xl font-bold text-blue-600">1</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Total Quantity</p>
          <p className="text-2xl font-bold">430 quintals</p>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummySaleListings.map((listing) => (
          <div key={listing.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
            {/* Listing Header */}
            <div className="bg-green-50 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                {getCropIcon(listing.cropType)}
                <h3 className="font-semibold text-gray-800">{listing.cropType}</h3>
              </div>
              {getStatusBadge(listing.status)}
            </div>

            {/* Listing Details */}
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <FiCalendar className="text-gray-400" />
                  <span>Listed: {formatDate(listing.createdAt)}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <FiPackage className="text-gray-400" />
                  <span>Quantity: {listing.quantity} quintals</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <FiDollarSign className="text-gray-400" />
                  <span>Price: ₹{listing.pricePerUnit}/quintal</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between gap-3 mt-6">
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">
                  View Offers
                </button>
                <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">
                  Cancel Listing
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {/* <div className="bg-gray-50 rounded-xl p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <FiPackage className="text-gray-400 text-2xl" />
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">No Active Listings</h3>
        <p className="text-gray-500 mb-4">You haven't created any crop listings yet.</p>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
          Create New Listing
        </button>
      </div> */}
    </div>
  );
};

export default SaleListings;