'use client';

import { useState } from 'react';
import Navbar from '../components/UI/navbar';
import SearchBar from '../components/UI/searchbar';
import Filter from '../components/UI/filter';

const companies = [
  'Google',
  'Microsoft',
  'Amazon',
  'Meta',
  'Apple',
  'Netflix',
  'Tesla',
  'Adobe',
  'Salesforce',
  'Uber',
  'Airbnb',
  'Stripe',
  'Spotify',
  'Twitter',
  'LinkedIn',
];

export default function JobSearch() {
  const [search, setSearch] = useState('');
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const filteredCompanies = companies.filter(company =>
    company.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1 px-4 py-12 animate-fade-in-up">
        <h1 className="text-4xl font-extrabold mb-8 tracking-tight drop-shadow-lg">Companies</h1>
        <SearchBar
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search companies..."
        />
        <Filter
          jobType={jobType}
          onJobTypeChange={e => setJobType(e.target.value)}
          location={location}
          onLocationChange={e => setLocation(e.target.value)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-5xl">
          {filteredCompanies.map((company) => (
            <div
              key={company}
              className="bg-white/10 rounded-xl shadow-lg p-6 flex items-center justify-center text-xl font-semibold hover:bg-white/20 transition-colors duration-200 text-white text-center"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </div>
  );
}
