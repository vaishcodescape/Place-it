'use client';

import { useState } from 'react';

export default function About() {
  const [form, setForm] = useState({
    institution: '',
    year: '',
    degree: '',
    branch: '',
    skillset: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here (e.g., send to backend or show a message)
    alert('Details submitted!');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <div className="bg-white/5 rounded-2xl shadow-xl px-8 py-12 max-w-2xl w-full animate-fade-in-up">
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight drop-shadow-lg">About Place It</h1>
        <p className="text-lg text-white/80 mb-6">
          <span className="font-semibold text-white">Place It</span> is your modern companion for job and internship searching. Designed for simplicity and speed, Place It helps you organize, save, and track opportunities so you can focus on landing your dream role.
        </p>
        <h2 className="text-2xl font-bold mb-2 mt-6">Key Features</h2>
        <ul className="list-disc list-inside space-y-2 text-white/80 mb-8">
          <li><span className="font-semibold text-white">Job & Internship Search:</span> Find and save opportunities that match your interests.</li>
          <li><span className="font-semibold text-white">Profile Management:</span> Keep your application materials and preferences organized in one place.</li>
          <li><span className="font-semibold text-white">Opportunity Tracking:</span> Track your applications, interviews, and offers with ease.</li>
          <li><span className="font-semibold text-white">Minimal & Fast UI:</span> Enjoy a distraction-free, beautiful interface that works on any device.</li>
          <li><span className="font-semibold text-white">Secure & Private:</span> Your data stays yours—secure and private.</li>
        </ul>
        <form onSubmit={handleSubmit} className="space-y-4 mt-8">
          <h2 className="text-xl font-bold mb-2">Fill in your details</h2>
          <input
            type="text"
            name="institution"
            value={form.institution}
            onChange={handleChange}
            placeholder="Institution"
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
            required
          />
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
