"use client";
import React, { useState } from "react";
import { FiClock, FiCalendar, FiDollarSign, FiPackage, FiX } from "react-icons/fi";
import { GiWheat, GiCorn, GiGrain } from "react-icons/gi";

// Dummy data
const dummySaleListings = [
  {
    id: "1",
    cropType: "Wheat",
    quantity: 150,
    createdAt: "2024-03-15",
    status: "ACTIVE",
    pricePerUnit: 2100,
  },
  {
    id: "2",
    cropType: "Rice",
    quantity: 80,
    createdAt: "2024-03-18",
    status: "PENDING",
    pricePerUnit: 1850,
  },
];

const dummyPurchaseRequests = [
  {
    id: "req1",
    contractorProfileId: "contractor1",
    cropType: "Wheat",
    quantity: 100,
    pricePerUnit: 2000,
    status: "ACTIVE",
    contractor: {
      name: "Agri Corp A",
      companyName: "Green Fields LLC",
      rating: 4.5,
      experience: 5,
    },
  },
  {
    id: "req2",
    contractorProfileId: "contractor2",
    cropType: "Wheat",
    quantity: 150,
    pricePerUnit: 2100,
    status: "ACTIVE",
    contractor: {
      name: "Agri Corp B",
      companyName: "Golden Harvest Inc",
      rating: 4.8,
      experience: 8,
    },
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
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [selectedContractor, setSelectedContractor] = useState<string | null>(null);

  const handleFinalizeContract = () => {
    if (selectedContractor && selectedListing) {
      // API call would go here
      alert(`Contract finalized with ${selectedContractor}`);
      setSelectedListing(null);
      setSelectedContractor(null);
    }
  };

  const getAcceptedContractors = (cropType: string) => {
    return dummyPurchaseRequests.filter(
      request => request.cropType === cropType && request.status === "ACTIVE"
    );
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-green-800">My Crop Contracts</h1>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
            + New Listing
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {/* ... (keep the existing stats summary code) ... */}
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
                <button 
                  onClick={() => setSelectedListing(listing)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm"
                >
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

      {/* Contractor Selection Modal */}
      {selectedListing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Select Contractor for {selectedListing.cropType}
              </h3>
              <button
                onClick={() => {
                  setSelectedListing(null);
                  setSelectedContractor(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {getAcceptedContractors(selectedListing.cropType).length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-gray-500 mb-6">
                    No contractors have accepted this request yet.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedListing(null);
                      setSelectedContractor(null);
                    }}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg transition-colors"
                  >
                    Back to Listings
                  </button>
                </div>
              ) : (
                getAcceptedContractors(selectedListing.cropType).map((request) => (
                  <label
                    key={request.id}
                    className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      name="contractor"
                      value={request.contractorProfileId}
                      checked={selectedContractor === request.contractorProfileId}
                      onChange={(e) => setSelectedContractor(e.target.value)}
                      className="form-radio h-4 w-4 text-green-600"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {request.contractor.companyName}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Offered: ₹{request.pricePerUnit}/quintal
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="inline-flex items-center">
                            ⭐ {request.contractor.rating}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        <p>Experience: {request.contractor.experience} years</p>
                        <p>Contact: {request.contractor.name}</p>
                      </div>
                    </div>
                  </label>
                ))
              )}
            </div>

            {getAcceptedContractors(selectedListing.cropType).length > 0 && (
              <div className="mt-6">
                <button
                  onClick={handleFinalizeContract}
                  disabled={!selectedContractor}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    selectedContractor
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Finalize Contract
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SaleListings;