"use client";

import { useState, useEffect } from "react";
import { FiPlus, FiTruck, FiBox, FiDollarSign, FiFilter, FiX, FiCheck } from "react-icons/fi";
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
    quantity: 0,
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
      [e.target.name]:
        e.target.name === "quantity" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const queryParams = new URLSearchParams({
        ...(formData.cropType && { cropType: formData.cropType }),
        ...(formData.quantity > 0 && { maxQuantity: formData.quantity.toString() })
      });

      const response = await fetch(`/api/farmer/purchase-requests?${queryParams}`);
      
      if (!response.ok) throw new Error('Failed to fetch requests');
      
      const data = await response.json();
      setMatchedRequests(data);
      setHasSearched(true);
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
      const data = await response.json();
      setMatchedRequests(data);
      setHasSearched(false);
      setFormData({ cropType: "", quantity: 0 });
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
      console.log('Sending contract confirmation for request:', selectedRequest.id);
      
      const response = await fetch('/api/farmer/confirm-contract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestId: selectedRequest.id }),
      });
  
      console.log('API response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API error details:', errorData);
        throw new Error(`Failed to confirm contract: ${response.status}`);
      }
  
      const updatedRequest = await response.json();
      console.log('Updated request:', updatedRequest);
      
      // Update the status in the local state
      setMatchedRequests(prev => prev.map(req => 
        req.id === updatedRequest.id ? updatedRequest : req
      ));
      
      setIsModalOpen(false);
      toast.success('Contract confirmed successfully!');
    } catch (error: any) {
      console.error('Confirmation error:', error);
      toast.error(`Failed to confirm contract: ${error}`);
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
            <FiPlus className="text-green-600" />
            Search Contracts
          </h2>
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
                placeholder="Enter crop type (e.g. Wheat, Rice)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity (quintals)
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter maximum quantity"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Searching..." : "Search Contracts"}
              </button>
              {hasSearched && (
                <button
                  type="button"
                  onClick={handleResetSearch}
                  disabled={loading}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Reset
                </button>
              )}
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
            {matchedRequests.length} {hasSearched ? "matches" : "contracts"} found
          </span>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading contracts...</p>
          </div>
        ) : matchedRequests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedRequests.map((request) => (
              <div
                key={request.id}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">
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
                  <p className="text-sm text-gray-500 mb-3">
                    {request.contractorProfile.companyName}
                  </p>
                )}

                <div className="space-y-2 mb-4">
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

                <button
                  onClick={() => handleInitiateContract(request)}
                  disabled={request.status === 'ACTIVE'}
                  className={`w-full mt-2 text-white font-medium py-2 px-4 rounded-lg text-sm ${
                    request.status === 'ACTIVE'
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {request.status === 'ACTIVE' ? 'Contract Active' : 'Initiate Contract'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">
              {hasSearched
                ? "No contracts found matching your search criteria"
                : "No contracts available in your area"}
            </p>
            {hasSearched && (
              <button
                onClick={handleResetSearch}
                className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
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
                  <span className="font-medium">{selectedRequest.quantity} quintals</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium">₹{selectedRequest.pricePerUnit}/quintal</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600 font-semibold">Total Value:</span>
                  <span className="font-bold">
                    ₹{(selectedRequest.quantity * selectedRequest.pricePerUnit).toFixed(2)}
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