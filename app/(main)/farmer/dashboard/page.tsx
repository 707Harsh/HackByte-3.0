"use client";

import { useState } from "react";
import { FiFileText, FiPlus, FiTruck, FiBox, FiDollarSign, FiFilter, FiStar } from "react-icons/fi";

interface SaleListing {
  id: string;
  cropType: string;
  quantity: number;
  status: string;
}

interface PurchaseRequest {
  id: string;
  cropType: string;
  quantity: number;
  pricePerUnit: number;
  contractorProfile: {
    companyName: string;
    rating: number;
  };
  status: string;
}

const Dashboard = () => {
  // Dummy data matching Prisma schema
  const dummyPurchaseRequests: PurchaseRequest[] = [
    {
      id: "65de0d7361cb4b0c040d0563",
      cropType: "Wheat",
      quantity: 150,
      pricePerUnit: 2100,
      contractorProfile: {
        companyName: "AgriSolutions Pvt. Ltd.",
        rating: 4.8
      },
      status: "ACTIVE"
    },{
      id: "65de0d7361cb4b0c040d0363",
      cropType: "Wheat",
      quantity: 150,
      pricePerUnit: 2100,
      contractorProfile: {
        companyName: "AgriSolutions Pvt. Ltd.",
        rating: 4.8
      },
      status: "ACTIVE"
    },
    {
      id: "65de8c23e9c1bff218cf5275",
      cropType: "Rice",
      quantity: 80,
      pricePerUnit: 1850,
      contractorProfile: {
        companyName: "FarmConnect International",
        rating: 4.5
      },
      status: "ACTIVE"
    },
    {
      id: "65de9938bac72ce0dd2f1960",
      cropType: "Corn",
      quantity: 200,
      pricePerUnit: 1750,
      contractorProfile: {
        companyName: "CropMasters Co.",
        rating: 4.2
      },
      status: "ACTIVE"
    },
  ];

  const [formData, setFormData] = useState({
    cropType: "",
    quantity: 0,
  });

  const [addedListings, setAddedListings] = useState<SaleListing[]>([]);
  const [matchedRequests, setMatchedRequests] = useState<PurchaseRequest[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === "quantity" ? Number(e.target.value) : e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Create new sale listing (dummy data)
      const newListing: SaleListing = {
        id: `listing-${Date.now()}`,
        cropType: formData.cropType,
        quantity: formData.quantity,
        status: "ACTIVE"
      };

      // Find matching purchase requests
      const matches = dummyPurchaseRequests.filter(
        request => 
          request.cropType.toLowerCase() === formData.cropType.toLowerCase() &&
          request.quantity <= formData.quantity
      );

      setAddedListings([...addedListings, newListing]);
      setMatchedRequests(matches);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <FiFileText className="text-2xl text-green-600" />
            <h2 className="text-xl font-bold text-gray-800">New Contracts</h2>
          </div>
          <p className="text-gray-600">
            Create customized contracts with terms and conditions for your agricultural partners.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <FiTruck className="text-2xl text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">Active Contracts</h2>
          </div>
          <p className="text-gray-600">
            Manage and monitor your ongoing contracts and partnerships.
          </p>
        </div>
      </div> */}

      {/* Add Crop Listing Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FiPlus className="text-green-600" />
            Search Contracts
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="max-w-lg">
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
              <input
                type="text"
                name="cropType"
                value={formData.cropType}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter crop type (e.g. Wheat, Rice)"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (quintals)</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="1"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter quantity"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Search'}
            </button>
          </div>
        </form>
      </div>

      {/* Matched Purchase Requests */}
      {matchedRequests.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FiTruck className="text-blue-600" />
              Matching Contractor Requests
            </h2>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {matchedRequests.length} matches found
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedRequests.map((request) => (
              <div key={request.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">
                    {request.contractorProfile.companyName}
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                      {request.status}
                    </span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm flex items-center">
                      <FiStar className="mr-1" /> {request.contractorProfile.rating}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <FiBox className="text-gray-400" />
                    <span>Crop: {request.cropType}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FiDollarSign className="text-gray-400" />
                    <span>Price: ₹{request.pricePerUnit}/quintal</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FiFilter className="text-gray-400" />
                    <span>Quantity: {request.quantity} quintals</span>
                  </div>
                </div>
                
                <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm">
                  Initiate Contract
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Existing Listings */}
      {/* {addedListings.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FiBox className="text-green-600" />
            Your Active Listings
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Crop Type</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Quantity</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {addedListings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{listing.cropType}</td>
                    <td className="px-6 py-4">{listing.quantity} quintals</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        listing.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                        listing.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {listing.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Dashboard;