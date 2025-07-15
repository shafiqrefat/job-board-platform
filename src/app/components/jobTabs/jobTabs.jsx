'use client';
import { useState } from 'react';

export function JobTabs({ job }) {
  const [activeTab, setActiveTab] = useState('description');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return <p>{job.description}</p>;
      case 'requirements':
        return (
          <ul className="list-disc ml-5">
            {job.requirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        );
      case 'company':
        return <p>{job.companyInfo}</p>;
      default:
        return null;
    }
  };

  return (
    <div className="mt-6">
      <div className="flex gap-4 border-b pb-2">
        <button onClick={() => setActiveTab('description')}
          className={activeTab === 'description' ? 'font-bold text-blue-600' : 'cursor-pointer'}>
          Description
        </button>
        <button onClick={() => setActiveTab('requirements')}
          className={activeTab === 'requirements' ? 'font-bold text-blue-600' : 'cursor-pointer'}>
          Requirements
        </button>
        <button onClick={() => setActiveTab('company')}
          className={activeTab === 'company' ? 'font-bold text-blue-600' : 'cursor-pointer'}>
          Company Info
        </button>
      </div>

      <div className="mt-4">
        {renderTabContent()}
      </div>
    </div>
  );
}
