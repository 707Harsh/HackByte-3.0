'use client';

import { useForm } from 'react-hook-form';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface FormData {
  name: string;
  phone: string;
  email?: string;
  role: 'FARMER' | 'CONTRACTOR';
  state: string;
  city: string;
}

export default function CompleteProfile() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const checkProfile = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch(`/api/get-profile?clerkUserId=${user.id}`);
        if (!res.ok) throw new Error('Failed to fetch profile');
        const profile = await res.json();

        const fields = ['name', 'phone', 'state', 'city', 'role'];
        const isComplete = fields.every((field) => !!profile[field]);

        if (isComplete) {
          if (profile.role === 'FARMER') {
            router.push('/farmer/dashboard');
          } else if (profile.role === 'CONTRACTOR') {
            router.push('/contractor/dashboard');
          }
        }
      } catch (err) {
        console.error('Error checking profile:', err);
      } finally {
        setLoadingProfile(false);
      }
    };

    checkProfile();
  }, [user, router]);

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/complete-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, clerkUserId: user?.id })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to complete profile');
      }

      if (data.role === 'FARMER') {
        router.push('/farmer-dashboard');
      } else {
        router.push('/contractor-dashboard');
      }
    } catch (err) {
      setError((err as Error).message || 'An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Complete Your Profile
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                {...register('phone', { required: 'Phone is required' })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                {...register('email')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                {...register('state', { required: 'State is required' })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                {...register('city', { required: 'City is required' })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              {...register('role', { required: 'Role is required' })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select Role</option>
              <option value="FARMER">Farmer</option>
              <option value="CONTRACTOR">Contractor</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
          >
            {submitting ? 'Saving...' : 'Complete Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}
