"use client";

import { useState, useEffect } from "react";
import { FiPlus, FiTruck, FiBox, FiDollarSign, FiFilter, FiX, FiCheck, FiSearch } from "react-icons/fi";
import { toast } from 'react-hot-toast';

interface PurchaseRequest {
  id: string;
  cropType: string;
  quantity: number;
  pricePerUnit: number;
  contractorProfile: {
    userName: string;
    companyName: string;
  };
  status: string;
}

const Dashboard = () => {
  const [formData, setFormData] = useState({
    cropType: "",
    quantity: "",
  });

  const [matchedRequests, setMatchedRequests] = useState<PurchaseRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<PurchaseRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  // Fetch initial requests on mount
  useEffect(() => {
    const fetchInitialRequests = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/farmer/purchase-requests');
        if (!response.ok) throw new Error('Failed to load contracts');
        const data = await response.json();
        setMatchedRequests(data);
      } catch (error) {
        console.error('Error loading requests:', error);
        toast.error('Failed to load contracts');
      } finally {
        setLoading(false);
      }
    };
    fetchInitialRequests();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const queryParams = new URLSearchParams();
      if (formData.cropType) queryParams.append('cropType', formData.cropType);
      if (formData.quantity) queryParams.append('maxQuantity', formData.quantity);

      const response = await fetch(`/api/farmer/purchase-requests?${queryParams}`);
      
      if (!response.ok) throw new Error('Failed to fetch requests');
      
      const data = await response.json();
      setMatchedRequests(data);
      setHasSearched(true);
      toast.success(`Found ${data.length} matching contracts`);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to search contracts');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSearch = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/farmer/purchase-requests');
      if (!response.ok) throw new Error('Failed to reset search');
      const data = await response.json();
      setMatchedRequests(data);
      setHasSearched(false);
      setFormData({ cropType: "", quantity: "" });
      toast.success('Search reset successfully');
    } catch (error) {
      console.error('Reset error:', error);
      toast.error('Failed to reset search');
    } finally {
      setLoading(false);
    }
  };

  const handleInitiateContract = (request: PurchaseRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleConfirmContract = async () => {
    if (!selectedRequest) return;
    
    setIsConfirming(true);
    try {
      // Get farmerId from your auth system - adjust based on your setup
      // const farmerId = localStorage.getItem('userId') || ''; 
      // console.log()
      // or from session: const farmerId = session?.user?.id;
      
      // if (!farmerId) {
      //   throw new Error('Farmer ID not found');
      // }
  
      const response = await fetch('/api/farmer/confirm-contract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          requestId: selectedRequest.id, // Make sure this exists
          // farmerId: farmerId            // Make sure this exists
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to confirm contract');
      }
  
      const updatedRequest = await response.json();
      
      setMatchedRequests(prev => prev.map(req => 
        req.id === updatedRequest.id ? updatedRequest : req
      ));
      
      setIsModalOpen(false);
      toast.success('Contract confirmed successfully!');
    } catch (error: any) {
      console.error('Confirmation error:', error);
      toast.error(error.message || 'Failed to confirm contract');
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Search Form Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FiSearch className="text-green-600" />
            Search Contracts
          </h2>
          {hasSearched && (
            <button
              onClick={handleResetSearch}
              disabled={loading}
              className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
            >
              <FiX size={16} />
              Clear filters
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="max-w-lg">
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Crop Type
              </label>
              <input
                type="text"
                name="cropType"
                value={formData.cropType}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g. Wheat, Rice, Corn"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Quantity (quintals)
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter maximum quantity you can supply"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </>
                ) : (
                  <>
                    <FiSearch />
                    Search Contracts
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Results Section */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FiTruck className="text-blue-600" />
            {hasSearched ? "Matching Contracts" : "Available Contracts"}
          </h2>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            {matchedRequests.length} {matchedRequests.length === 1 ? 'contract' : 'contracts'} found
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : matchedRequests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedRequests.map((request) => (
              <div
                key={request.id}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {request.contractorProfile.userName}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    request.status === 'ACTIVE' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {request.status}
                  </span>
                </div>

                {request.contractorProfile.companyName && (
                  <p className="text-sm text-gray-500 mb-3 truncate">
                    {request.contractorProfile.companyName}
                  </p>
                )}

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <FiBox className="text-gray-400 flex-shrink-0" />
                    <span className="truncate">Crop: {request.cropType}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FiDollarSign className="text-gray-400 flex-shrink-0" />
                    <span>Price: ₹{request.pricePerUnit.toLocaleString()}/quintal</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FiFilter className="text-gray-400 flex-shrink-0" />
                    <span>Quantity: {request.quantity.toLocaleString()} quintals</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-2 text-sm font-medium">
                    <span>Total Value:</span>
                    <span>₹{(request.quantity * request.pricePerUnit).toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => handleInitiateContract(request)}
                    disabled={request.status === 'ACTIVE'}
                    className={`w-full text-white font-medium py-2 px-4 rounded-lg text-sm ${
                      request.status === 'ACTIVE'
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {request.status === 'ACTIVE' ? 'Contract Active' : 'Initiate Contract'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FiBox className="text-gray-400 text-2xl" />
            </div>
            <p className="text-gray-500 mb-4">
              {hasSearched
                ? "No contracts match your search criteria"
                : "No contracts available at this time"}
            </p>
            {hasSearched && (
              <button
                onClick={handleResetSearch}
                className="mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Show All Contracts
              </button>
            )}
          </div>
        )}
      </div>

      {/* Contract Confirmation Modal */}
      {isModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Confirm Contract</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                  disabled={isConfirming}
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Contractor:</span>
                  <span className="font-medium">{selectedRequest.contractorProfile.userName}</span>
                </div>
                {selectedRequest.contractorProfile.companyName && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Company:</span>
                    <span className="font-medium">{selectedRequest.contractorProfile.companyName}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Crop Type:</span>
                  <span className="font-medium">{selectedRequest.cropType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-medium">{selectedRequest.quantity.toLocaleString()} quintals</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium">₹{selectedRequest.pricePerUnit.toLocaleString()}/quintal</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600 font-semibold">Total Value:</span>
                  <span className="font-bold">
                    ₹{(selectedRequest.quantity * selectedRequest.pricePerUnit).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  disabled={isConfirming}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmContract}
                  disabled={isConfirming}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isConfirming ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiCheck />
                      Confirm Contract
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;