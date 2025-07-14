import { NextRequest } from 'next/server';
export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get('type');
  const category = searchParams.get('category');
  const location = searchParams.get('location');

  const res = await fetch('http://localhost:4000/jobs');
  let jobs = await res.json();

  // Filter by job type
  if (type) {
    jobs = jobs.filter((job) =>
      job.type.toLowerCase() === type.toLowerCase()
    );
  }

  // Filter by category
  if (category) {
    jobs = jobs.filter((job) =>
      job.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by location (partial match)
  if (location) {
    jobs = jobs.filter((job) =>
      job.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  return Response.json(jobs);
}

