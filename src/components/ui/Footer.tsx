import { Instagram, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-indigo-900 via-fuchsia-900 to-pink-900 text-white py-8 mt-16 shadow-inner">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-4">
        <div className="flex items-center gap-3 mb-2 md:mb-0">
          <img src="/logo.svg" alt="ParlourPro Logo" className="w-8 h-8 rounded-full border-2 border-pink-400 shadow" />
          <span className="text-lg font-extrabold bg-gradient-to-r from-pink-300 via-indigo-200 to-fuchsia-300 text-transparent bg-clip-text drop-shadow">ParlourPro &copy; {new Date().getFullYear()}</span>
        </div>
        <div className="text-sm text-pink-100 mb-2 md:mb-0">Empowering Salons with Smart Attendance & Admin Tools</div>
        <div className="flex gap-4">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-300 transition"><Instagram className="w-5 h-5" /></a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition"><Facebook className="w-5 h-5" /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300 transition"><Linkedin className="w-5 h-5" /></a>
        </div>
      </div>
    </footer>
  );
}
