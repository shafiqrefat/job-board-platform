"use client"
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Hero from './hero/heroSection';

const LandingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname()
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    category: searchParams.get('category') || '',
    location: searchParams.get('location') || ''
  });
  const search = searchParams.get('search') || '';

// Update URL when filters change

  useEffect(() => {
  const params = new URLSearchParams();

  if (filters.type) params.set('type', filters.type);
  if (filters.category) params.set('category', filters.category);
  if (filters.location) params.set('location', filters.location);
  if (search) params.set('search', search);

  router.push(`/?${params.toString()}`);
}, [filters]);

// Fetch filtered jobs

  useEffect(() => {
    const fetchJobs = async () => {
      const params = new URLSearchParams();

      if (filters.type) params.set('type', filters.type);
      if (filters.category) params.set('category', filters.category);
      if (filters.location) params.set('location', filters.location);
      if (search) params.set('search', search);

      const res = await fetch(`/api/jobs?${params.toString()}`);
      const data = await res.json();
      setJobs(data);
    };

    fetchJobs();
  }, [filters,search]);
  const resetFilters = () => {
    setFilters({
      type: '',
      category: '',
      location: ''
    });

  // 2. Reset URL to base path (remove query string)
    router.push(pathname);
  };
  return (
    <>
    <Hero/>
    <div className="mb-2 flex flex-col md:flex-row items-center justify-end gap-4 p-4">
        <select value={filters.type} onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}>
          <option value="">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Freelance">Freelance</option>
        </select>

        <select value={filters.category} onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}>
          <option value="">All Categories</option>
          <option value="Tech">Tech</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
        </select>

        <input
          placeholder="Location"
          value={filters.location}
          onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}
          className="border px-2 ml-2"
        />

        <button onClick={resetFilters} className='cursor-pointer'>Clear All</button>
      </div>
     

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 relative">
      {jobs.length === 0 ?(
        <p className="text-center text-gray-500 mt-8 font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Does not match anything!!!</p>
      ):(
        jobs.map((job) => (
          <Link href={`/jobs/${job?.id}`} key={job?.id}>
            <div className="p-4 border rounded-md shadow hover:scale-95 transition hover:bg-gray-600 hover:text-white">
              <div className="flex gap-3">
              <h2 className="text-base lg:text-xl font-bold">{job.title}</h2>
              <h4 className='text-xs italic border rounded-3xl max-w-fit p-1'>{job.category}</h4>
              </div>
              <h5>{job.description}</h5>
              <p className="text-xs">{job.company} - {job.location}</p>
              <p className="text-sm text-gray-500 hover:text-white">{job.type}</p>
            </div>
          </Link>
        
      ))
      )}
    </div>
    </>
    
  )
}

export default LandingPage