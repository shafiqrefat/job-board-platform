'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function JobListPage() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState([]);

  const filters = {
    type: searchParams.get('type') || '',
    category: searchParams.get('category') || '',
    location: searchParams.get('location') || '',
    search: searchParams.get('search') || ''
  };

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.type) params.set('type', filters.type);
    if (filters.category) params.set('category', filters.category);
    if (filters.location) params.set('location', filters.location);
    if (filters.search) params.set('search', filters.search);

    fetch(`/api/jobs?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, [filters.type, filters.category, filters.location, filters.search]);

  return (
    <>
        <h1 className="text-2xl font-bold p-4 text-center">
            {filters.search ? `Search results for "${filters.search}"` : 'Job Listings'}
        </h1>
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 py-8">
            {jobs.length === 0 ? (
                <p className="text-center text-gray-500"> Does not match anything!!!</p>
            ) : (
                jobs.map((job) => (
                <Link key={job.id} href={`/jobs/${job.id}`}>
                    <div className="p-4 border rounded-md mb-4 hover:bg-gray-100 cursor-pointer">
                    <h2 className="text-xl font-bold">{job.title}</h2>
                    <p>{job.company} — {job.location}</p>
                    <p className="text-sm text-gray-500">{job.category} • {job.type}</p>
                    </div>
                </Link>
                ))
            )}
        </main>
    </>
    
  );
}
