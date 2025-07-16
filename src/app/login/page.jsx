'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contex/authContex';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:4000/users?email=${email}&password=${password}`);
    const data = await res.json();

    if (data.length > 0) {
      login(data[0]);
      router.push('/post-job');
    } else {
      setError('Invalid credentials');
    }
  };

return (
    <main className="max-w-md mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded"
          type="submit"
        >
          Login
        </button>
      </form>

      <p className="text-sm mt-4 text-center">
        Don’t have an account?{' '}
        <a href="/signup" className="text-blue-600 underline">
          Sign up here
        </a>
      </p>
    </main>
  );
}
