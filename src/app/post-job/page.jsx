'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PostJobPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    type: 'Full-time',
    company: '',
  });
  const [requirements, setRequirements] = useState([]);
  const [requirementInput, setRequirementInput] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title || !formData.description || !formData.location || !formData.category || !formData.company) {
      setError('Please fill in all required fields.');
      return;
    }

    const newJob = {
      ...formData,
      id: `job-${Math.floor(Math.random() * (999 - 13 + 1)) + 13}`, // unique ID
      requirements,
      companyInfo: `${formData.company} is hiring via Post Job Form.`
    };

    const res = await fetch('http://localhost:4000/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJob)
    });

    if (res.ok) {
      router.push('/jobs'); // Redirect to job list
    } else {
      setError('Something went wrong while posting the job.');
    }
  };

  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" />
        <div>
        <label className="block font-semibold">Requirements</label>
            <div className="flex gap-2 mt-1">
                <input
                type="text"
                value={requirementInput}
                onChange={(e) => setRequirementInput(e.target.value)}
                placeholder="e.g. React, TypeScript"
                className="flex-1 border p-2 rounded"
                />
                <button
                type="button"
                onClick={() => {
                    if (requirementInput.trim()) {
                    setRequirements((prev) => [...prev, requirementInput.trim()]);
                    setRequirementInput('');
                    }
                }}
                className="bg-gray-200 px-3 rounded"
                >
                Add
                </button>
            </div>

        {/* Show requirements list */}
            <ul className="list-disc ml-5 mt-2 text-sm">
                {requirements.map((req, index) => (
                <li key={index}>
                    {req}
                    <button
                    type="button"
                    onClick={() => setRequirements(requirements.filter((_, i) => i !== index))}
                    className="ml-2 text-red-500 text-xs"
                    >
                    ✕
                    </button>
                </li>
                ))}
            </ul>
        </div>

        <input name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="category" placeholder="Category (e.g., Tech)" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded" />

        <select name="type" value={formData.type} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">Post Job</button>
      </form>
    </main>
  );
}
