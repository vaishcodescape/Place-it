import { FaBriefcase, FaUser, FaInfoCircle, FaProductHunt } from 'react-icons/fa';
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="w-full flex items-center justify-between px-8 py-4 border-b border-white/10 bg-black/80 backdrop-blur-md shadow-md animate-fade-in-down">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                <FaProductHunt className="text-orange-400 drop-shadow-md" />
                <div className="text-white text-2xl font-bold tracking-tight">
                    Place It
                </div>
            </Link>
            <div className="flex gap-8 text-base font-medium">
                <Link href="/job_search" className="flex items-center gap-2 hover:underline underline-offset-4 transition-colors duration-200 hover:text-gray-300">
                    <FaBriefcase className="text-lg" />
                    Search for Jobs
                </Link>
                <Link href="/profile_page" className="flex items-center gap-2 hover:underline underline-offset-4 transition-colors duration-200 hover:text-gray-300">
                    <FaUser className="text-lg" />
                    Profile Page
                </Link>
                <Link href="/about" className="flex items-center gap-2 hover:underline underline-offset-4 transition-colors duration-200 hover:text-gray-300">
                    <FaInfoCircle className="text-lg" />
                    About
                </Link>
            </div>
            <style jsx global>{`
                @keyframes fade-in-down {
                    0% { opacity: 0; transform: translateY(-20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.8s cubic-bezier(0.4,0,0.2,1) both;
                }
            `}</style>
        </nav>
    )
}