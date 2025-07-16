import { JobTabs } from '../../components/jobTabs/jobTabs';
import { notFound } from 'next/navigation';

async function getJob(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function JobDetailPage({ params }) {
  const job = await getJob(params.id);

  if (!job) return notFound();

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-600">{job.company} — {job.location}</p>

      <JobTabs job={job}/>
    </div>
  );
}
