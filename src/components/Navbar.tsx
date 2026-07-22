import React from 'react';
import { ViewMode } from '../types';
import { BookOpen, Code, Feather, User, FileText, Mail, Search, Newspaper } from 'lucide-react';

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
    <header className="w-full bg-[#FAF6F0] text-[#1C1618] border-b-2 border-[#800020] sticky top-0 z-40 shadow-sm transition-all">
      {/* Top Welcome Bar */}
      <div className="bg-[#800020] text-[#FAF6F0] text-[11px] font-sans-ui py-1.5 px-4 tracking-wide flex flex-wrap justify-between items-center border-b border-[#D4AF37]/30">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#800020] font-mono-code font-bold text-[10px] flex items-center justify-center border border-white/20 shrink-0">
            KO
          </div>
          <span className="font-semibold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
            Karl David Z. Ocfemia
          </span>
          <span className="hidden sm:inline text-white/40">•</span>
          <span className="hidden sm:inline text-white/90">BS Computer Science Student</span>
          <span className="hidden md:inline text-white/40">•</span>
          <span className="hidden md:inline text-[#D4AF37]">Bicol University Polangui</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-[#E2D7C7] hidden sm:inline">Literary Editor @ The Inditers</span>
        </div>
      </div>

      {/* Main Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 text-center border-b border-[#800020]/20 relative">
        <div className="flex justify-between items-center text-xs font-sans-ui text-[#574B4E] mb-1 hidden sm:flex">
          <span className="text-[#800020] font-semibold">&ldquo;Building software &amp; crafting stories&rdquo;</span>
          <span className="bg-[#F2EBE1] border border-[#E2D7C7] px-2.5 py-0.5 rounded text-[11px]">
            Portfolio &amp; Personal Site
          </span>
        </div>

        <button
          onClick={() => onSelectView('frontpage')}
          className="group inline-flex flex-col items-center cursor-pointer transition-transform hover:scale-[0.99]"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#800020] text-[#D4AF37] font-serif-display font-bold text-xl sm:text-2xl flex items-center justify-center border-2 border-[#D4AF37] ring-2 ring-[#800020] shadow-md group-hover:scale-105 transition-transform shrink-0">
              KO
            </div>
            <div className="text-left">
              <div className="inline-flex items-center gap-1.5 mb-1 text-[10px] sm:text-[11px] font-sans-ui font-semibold text-[#800020] bg-[#F2EBE1] px-2.5 py-0.5 rounded-full border border-[#E2D7C7]">
                <span>COMPUTER SCIENCE &amp; LITERARY PORTFOLIO</span>
              </div>
              <h1 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-black text-[#800020] tracking-tight leading-none uppercase drop-shadow-xs">
                Karl David Z. Ocfemia
              </h1>
            </div>
          </div>
          <p className="font-serif-body italic text-sm sm:text-base text-[#574B4E] mt-1 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-[#800020]/40"></span>
            <span>Software Developer &amp; Literary Writer • BU Polangui</span>
            <span className="h-px w-8 bg-[#800020]/40"></span>
          </p>
        </button>

        {/* Editorial Divider */}
        <div className="my-3 editorial-double-line"></div>

        {/* Utility Row: Search Bar */}
        <div className="flex items-center justify-center text-xs font-sans-ui">
          <div className="relative w-full max-w-md">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#800020]/60" />
            <input
              type="text"
              placeholder="Search projects, essays, and skills..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8 pr-8 py-1.5 bg-[#F2EBE1] border border-[#E2D7C7] rounded-lg font-sans-ui text-xs text-[#1C1618] placeholder-[#574B4E]/60 focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1.5 text-xs text-[#800020] font-bold cursor-pointer"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center sm:justify-between overflow-x-auto py-2.5 gap-1 sm:gap-2 no-scrollbar text-xs font-sans-ui font-semibold uppercase tracking-wider">
          <button
            onClick={() => onSelectView('frontpage')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded transition-all cursor-pointer whitespace-nowrap ${
              currentView === 'frontpage'
                ? 'bg-[#800020] text-[#FAF6F0] shadow-xs'
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
                ? 'bg-[#800020] text-[#FAF6F0] shadow-xs'
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
                ? 'bg-[#800020] text-[#FAF6F0] shadow-xs'
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
                ? 'bg-[#800020] text-[#FAF6F0] shadow-xs'
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
                ? 'bg-[#800020] text-[#FAF6F0] shadow-xs'
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
                ? 'bg-[#800020] text-[#FAF6F0] shadow-xs'
                : 'text-[#1C1618] hover:bg-[#F2EBE1] hover:text-[#800020]'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Contact</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
