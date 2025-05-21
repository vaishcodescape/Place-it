'use client';

import { FaBriefcase, FaUser, FaInfoCircle } from 'react-icons/fa';
import Link from 'next/link';
import Navbar from './components/UI/navbar';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 animate-fade-in-up">
        <div className="bg-white/5 rounded-2xl shadow-xl px-10 py-12 flex flex-col items-center w-full max-w-xl">
          <h1 className="text-5xl font-extrabold mb-4 mt-2 tracking-tight drop-shadow-lg animate-pop-in">Place It</h1>
          <p className="text-lg text-white/70 mb-8 max-w-xl text-center animate-fade-in">
            Search for the job and internship you deserve
          </p>
          {/* Add more content or call-to-action buttons here if needed */}
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
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-pop-in {
          animation: pop-in 0.7s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </div>
  );
}
