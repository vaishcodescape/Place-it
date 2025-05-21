'use client';

const jobTypes = ['Full Time', 'Part Time', 'Internship', 'Remote'];
const locations = ['Bangalore', 'Delhi', 'Mumbai', 'Chennai', 'Hyderabad', 'Remote'];

export default function Filter({ jobType, onJobTypeChange, location, onLocationChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full max-w-3xl animate-fade-in-up">
      <select
        value={jobType}
        onChange={onJobTypeChange}
        className="w-full sm:w-1/2 px-4 py-2 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
      >
        <option value="">All Job Types</option>
        {jobTypes.map((type) => (
          <option key={type} value={type} className="text-black">{type}</option>
        ))}
      </select>
      <select
        value={location}
        onChange={onLocationChange}
        className="w-full sm:w-1/2 px-4 py-2 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
      >
        <option value="">All Locations</option>
        {locations.map((loc) => (
          <option key={loc} value={loc} className="text-black">{loc}</option>
        ))}
      </select>
    </div>
  );
}
