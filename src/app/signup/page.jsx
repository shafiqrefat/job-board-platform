'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contex/authContex';

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }

    // Check if user already exists
    const checkRes = await fetch(`http://localhost:4000/users?email=${email}`);
    const existing = await checkRes.json();

    if (existing.length > 0) {
      setError('User already exists.');
      return;
    }

    // Create new user
    const newUser = {
      id: `user-${Math.floor(Math.random() * (999 - 13 + 1)) + 13}`,
      name,
      email,
      password
    };

    const res = await fetch('http://localhost:4000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });

    if (res.ok) {
      login(newUser); // Save in context/localStorage
      router.push('/post-job');
    } else {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <>
        <form onSubmit={handleSignup} className="max-w-md mx-auto py-8 space-y-4">
            <h2 className="text-2xl font-bold">Sign Up</h2>
            {error && <p className="text-red-500">{error}</p>}

            <input
                className="border p-2 w-full"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
            />

            <input
                className="border p-2 w-full"
                name="email"
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
            />

            <input
                className="border p-2 w-full"
                name="password"
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
            />

            <button className="bg-blue-600 text-white px-4 py-2 rounded w-full" type="submit">
                Create Account
            </button>
        </form>
        <p className="text-sm mt-2 text-center">
            Already have an account? 
            <a href="/login" className="text-blue-600 underline ml-1 cursor-pointer">
            Back to login page
            </a>
        </p>
    </>
  );
}
