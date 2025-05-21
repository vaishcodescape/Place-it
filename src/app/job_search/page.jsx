'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/UI/navbar';
import SearchBar from '../components/UI/searchbar';
import Filter from '../components/UI/filter';

export default function JobSearch() {
  const [search, setSearch] = useState('');
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch jobs when filters change, but with a delay to avoid too many requests
    const delayDebounceFn = setTimeout(() => {
      fetchJobs();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, jobType, location]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      // Build the URL with search parameters
      let url = '/api/jobs';
      const params = new URLSearchParams();
      
      if (search) params.append('query', search);
      if (jobType) params.append('jobType', jobType);
      if (location) params.append('location', location);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch job listings');
      }
      const data = await response.json();
      setJobs(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching job listings:', error);
      setLoading(false);
    }
  };

  // Function to format date to a readable format
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Function to check if a job is in India
  const isIndiaJob = (job) => {
    return job.location.toLowerCase().includes('india');
  };

  // Function to format salary based on currency
  const formatSalary = (salary) => {
    if (!salary) return 'Competitive';
    return salary;
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1 px-4 py-12 animate-fade-in-up">
        <h1 className="text-4xl font-extrabold mb-8 tracking-tight drop-shadow-lg">Job Openings</h1>
        <SearchBar
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search jobs by title, company, or keywords..."
        />
        <Filter
          jobType={jobType}
          onJobTypeChange={e => setJobType(e.target.value)}
          location={location}
          onLocationChange={e => setLocation(e.target.value)}
        />
        
        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 w-full max-w-5xl mt-8">
            {jobs.length === 0 ? (
              <div className="text-center text-gray-400 py-10">
                No job openings found matching your criteria
              </div>
            ) : (
              jobs.map((job) => (
                <div
                  key={job.id}
                  className={`bg-white/10 rounded-xl shadow-lg p-6 hover:bg-white/20 transition-colors duration-200 ${isIndiaJob(job) ? 'border-l-4 border-orange-500' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      {job.logoUrl && (
                        <img 
                          src={job.logoUrl} 
                          alt={`${job.company} logo`} 
                          className="w-12 h-12 object-contain mr-4 rounded bg-white/20 p-1"
                          onError={(e) => {e.target.style.display = 'none'}}
                        />
                      )}
                      <div>
                        <h2 className="text-xl font-bold">{job.title}</h2>
                        <h3 className="text-lg text-blue-400">{job.company}</h3>
                        <div className="mt-2 text-gray-300 flex flex-wrap items-center gap-2">
                          <span>{job.location}</span>
                          <span>•</span>
                          <span>{job.type}</span>
                          {job.isRemote && (
                            <span className="px-2 py-0.5 bg-green-500/20 text-green-300 text-xs rounded-full">
                              Remote
                            </span>
                          )}
                          {isIndiaJob(job) && (
                            <span className="px-2 py-0.5 bg-orange-500/20 text-orange-300 text-xs rounded-full">
                              India
                            </span>
                          )}
                          {job.publicationDate && (
                            <span className="text-gray-400 text-sm">
                              Posted: {formatDate(job.publicationDate)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-green-400 font-semibold">{formatSalary(job.salary)}</div>
                  </div>
                  
                  <div className="mt-4">
                    {job.tags && job.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {job.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-gray-300 mt-2">{
                      // Limit description length and strip HTML
                      job.description?.replace(/<[^>]*>?/gm, '')?.substring(0, 300) + 
                      (job.description?.length > 300 ? '...' : '')
                    }</p>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-400">
                    <strong>Requirements:</strong> {job.requirements}
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a 
                      href={job.applicationUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors inline-block"
                    >
                      Apply Now
                    </a>
                    {job.category && (
                      <span className="px-4 py-2 bg-gray-600/30 rounded-lg text-gray-300 text-sm inline-flex items-center">
                        {job.category}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
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
