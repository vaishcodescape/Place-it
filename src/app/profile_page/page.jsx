'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/UI/navbar';

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    institution: '',
    year: '',
    degree: '',
    branch: '',
    skillset: '',
  });
  const [institutes, setInstitutes] = useState([]);

  useEffect(() => {
    fetch('/indian_institutes.json')
      .then((res) => res.json())
      .then((data) => setInstitutes(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here (e.g., send to backend or show a message)
    alert('Details submitted!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1 px-4 py-12 animate-fade-in-up">
        <div className="bg-white/5 rounded-2xl shadow-xl px-8 py-12 max-w-2xl w-full">
          <h1 className="text-4xl font-extrabold mb-4 tracking-tight drop-shadow-lg">Profile Details</h1>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
              required
            />
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
              required
            />
            <select
              name="institution"
              value={form.institution}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
              required
            >
              <option value="" disabled>Select Institution</option>
              {institutes.map((inst) => (
                <option key={inst} value={inst} className="text-black">{inst}</option>
              ))}
            </select>
            <input
              type="number"
              name="year"
              value={form.year}
              onChange={handleChange}
              placeholder="Year of Graduating"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
              required
            />
            <input
              type="text"
              name="degree"
              value={form.degree}
              onChange={handleChange}
              placeholder="Degree"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
              required
            />
            <input
              type="text"
              name="branch"
              value={form.branch}
              onChange={handleChange}
              placeholder="Branch"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
              required
            />
            <input
              type="text"
              name="skillset"
              value={form.skillset}
              onChange={handleChange}
              placeholder="Skillset (comma separated)"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
              required
            />
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors font-semibold text-white mt-2"
            >
              Submit
            </button>
          </form>
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
