import React from 'react';
import { ViewMode } from '../types';
import { BookOpen, Code, Feather, User, FileText, Mail, Search } from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  fontSize: 'sm' | 'base' | 'lg';
  setFontSize: (size: 'sm' | 'base' | 'lg') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSelectView,
  searchQuery,
  onSearchChange,
  fontSize,
  setFontSize,
}) => {
  return (
    <header className="w-full bg-[#FAF6F0] text-[#1C1618] border-b-2 border-[#800020] sticky top-0 z-40 shadow-xs transition-all">
      {/* Main Broadside Masthead Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-4 text-center">
        <button
          onClick={() => onSelectView('frontpage')}
          className="group inline-flex flex-col items-center cursor-pointer transition-transform hover:opacity-95"
        >
          {/* Centered Crest Emblem */}
          <div className="mb-2.5 flex items-center justify-center gap-3">
            <div className="h-px w-12 sm:w-20 bg-[#800020]/30"></div>
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#800020] text-[#D4AF37] font-serif-display font-bold text-lg sm:text-xl flex items-center justify-center border-2 border-[#D4AF37] shadow-xs group-hover:scale-105 transition-transform shrink-0">
              KO
            </div>
            <div className="h-px w-12 sm:w-20 bg-[#800020]/30"></div>
          </div>

          {/* Headline Name */}
          <h1 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-black text-[#800020] tracking-tight leading-none uppercase my-0.5">
            Karl David Z. Ocfemia
          </h1>

          {/* Subtitle Descriptor */}
          <div className="flex flex-wrap items-center justify-center gap-2 font-serif-body text-xs sm:text-sm text-[#574B4E] mt-2">
            <span className="font-semibold text-[#1C1618]">Software Developer</span>
            <span className="text-[#800020] font-bold">•</span>
            <span className="font-semibold text-[#1C1618]">Literary Writer</span>
            <span className="text-[#800020] font-bold hidden sm:inline">•</span>
            <span className="text-[#574B4E] hidden sm:inline">BS Computer Science @ BU Polangui</span>
          </div>
        </button>

        {/* Classic Editorial Double Rule Line */}
        <div className="mt-4 mb-3 editorial-double-line max-w-5xl mx-auto"></div>

        {/* Utility Row: Search Bar & Font Size Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-sans-ui max-w-4xl mx-auto px-2">
          <div className="hidden md:flex items-center gap-2 text-[11px] text-[#574B4E] font-mono-code">
            <span className="bg-[#800020]/10 text-[#800020] px-2 py-0.5 rounded font-semibold uppercase">CS Student</span>
            <span className="bg-[#800020]/10 text-[#800020] px-2 py-0.5 rounded font-semibold uppercase">Literary Editor</span>
          </div>

          {/* Search Box */}
          <div className="relative w-full max-w-md mx-auto sm:mx-0">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-2.5 text-[#800020]/60" />
            <input
              type="text"
              placeholder="Search projects, essays, and skills..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-1.5 bg-[#F2EBE1] border border-[#E2D7C7] rounded-lg font-sans-ui text-xs text-[#1C1618] placeholder-[#574B4E]/60 focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020] transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1.5 text-xs text-[#800020] font-bold cursor-pointer hover:text-[#5A0017]"
              >
                ×
              </button>
            )}
          </div>


        </div>
      </div>

      {/* Primary Navigation Bar */}
      <nav className="bg-[#FAF6F0] border-t border-[#800020]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center sm:justify-between overflow-x-auto py-2 gap-1 sm:gap-2 no-scrollbar text-xs font-sans-ui font-semibold uppercase tracking-wider">
            <button
              onClick={() => onSelectView('frontpage')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded transition-all cursor-pointer whitespace-nowrap ${
                currentView === 'frontpage'
                  ? 'bg-[#800020] text-[#FAF6F0] shadow-xs font-bold'
                  : 'text-[#1C1618] hover:bg-[#F2EBE1] hover:text-[#800020]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Home</span>
            </button>

            <button
              onClick={() => onSelectView('code')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded transition-all cursor-pointer whitespace-nowrap ${
                currentView === 'code'
                  ? 'bg-[#800020] text-[#FAF6F0] shadow-xs font-bold'
                  : 'text-[#1C1618] hover:bg-[#F2EBE1] hover:text-[#800020]'
              }`}
            >
              <Code className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Projects</span>
            </button>

            <button
              onClick={() => onSelectView('writing')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded transition-all cursor-pointer whitespace-nowrap ${
                currentView === 'writing'
                  ? 'bg-[#800020] text-[#FAF6F0] shadow-xs font-bold'
                  : 'text-[#1C1618] hover:bg-[#F2EBE1] hover:text-[#800020]'
              }`}
            >
              <Feather className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Writing</span>
            </button>

            <button
              onClick={() => onSelectView('about')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded transition-all cursor-pointer whitespace-nowrap ${
                currentView === 'about'
                  ? 'bg-[#800020] text-[#FAF6F0] shadow-xs font-bold'
                  : 'text-[#1C1618] hover:bg-[#F2EBE1] hover:text-[#800020]'
              }`}
            >
              <User className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>About Me</span>
            </button>

            <button
              onClick={() => onSelectView('resume')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded transition-all cursor-pointer whitespace-nowrap ${
                currentView === 'resume'
                  ? 'bg-[#800020] text-[#FAF6F0] shadow-xs font-bold'
                  : 'text-[#1C1618] hover:bg-[#F2EBE1] hover:text-[#800020]'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Resume</span>
            </button>

            <button
              onClick={() => onSelectView('contact')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded transition-all cursor-pointer whitespace-nowrap ${
                currentView === 'contact'
                  ? 'bg-[#800020] text-[#FAF6F0] shadow-xs font-bold'
                  : 'text-[#1C1618] hover:bg-[#F2EBE1] hover:text-[#800020]'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Contact</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
