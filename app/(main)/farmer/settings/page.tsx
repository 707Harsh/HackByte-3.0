"use client"
import React, { useState } from "react";

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    emailUpdates: true,
    smsAlerts: false,
    pushNotifications: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
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
                placeholder="Enter your name"
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
                placeholder="Enter your email"
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-600 text-sm">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter a new password"
                className="w-full p-2 border rounded mt-1"
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Notification Preferences</h3>
          <div className="mt-2 space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="emailUpdates"
                checked={formData.emailUpdates}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <span>Receive email updates</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="smsAlerts"
                checked={formData.smsAlerts}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <span>Receive SMS alerts</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="pushNotifications"
                checked={formData.pushNotifications}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <span>Enable push notifications</span>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;