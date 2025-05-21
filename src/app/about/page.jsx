'use client';

import Link from 'next/link';

export default function About() {
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
        
        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
          >
            Go to Home
          </Link>
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
