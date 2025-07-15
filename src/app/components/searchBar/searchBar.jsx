'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar() {
  const [term, setTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (term.trim()) {
      router.push(`/jobs?search=${encodeURIComponent(term.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        placeholder="Search jobs, companies, or locations..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-md"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Search
      </button>
    </form>
  );
}
