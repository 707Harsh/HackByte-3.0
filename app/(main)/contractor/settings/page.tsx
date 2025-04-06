"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

interface UserData {
  name: string;
  email: string;
}

const Settings = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState<UserData>({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch initial user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/contractor/${user?.id}`);
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setFormData({
          name: data.name || "",
          email: data.email || "",
        });
      } catch (err) {
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    console.log("user?.id in settings page:", user?.id);
    if (user?.id) fetchUserData();
  }, [user?.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/contractor/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save changes");
      alert("Changes saved successfully!");
    } catch (err) {
      setError("Failed to save changes");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>

        {/* Profile Information */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Profile Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block text-gray-600 text-sm">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button 
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;