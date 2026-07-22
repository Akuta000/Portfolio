import React from 'react';
import { ViewMode } from '../types';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../data/portfolioData';
import { Newspaper, Feather, Code, Mail, Phone, MapPin, Heart, ArrowUp, ExternalLink } from 'lucide-react';
import { FacebookIcon, InstagramIcon } from './SocialIcons';

interface FooterProps {
  onSelectView: (view: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectView }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#2B080D] text-[#FAF6F0] border-t-4 border-[#800020] mt-16 font-sans-ui no-print">
      {/* Top Banner */}
      <div className="bg-[#4A0E17] border-b border-[#800020] py-3 px-4 sm:px-8 text-xs text-[#D4AF37] flex flex-wrap justify-between items-center font-sans-ui">
        <div className="flex items-center gap-2 font-semibold">
          <Newspaper className="w-4 h-4 text-[#D4AF37]" />
          <span>KARL DAVID Z. OCFEMIA • PERSONAL PORTFOLIO</span>
        </div>
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1 hover:text-[#FAF6F0] transition-colors cursor-pointer text-xs font-semibold"
        >
          Return to Top ↑
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Col 1: Profile Info */}
        <div>
          <h3 className="font-serif-display text-xl font-bold text-[#D4AF37] mb-2 uppercase">
            Karl David Z. Ocfemia
          </h3>
          <p className="text-xs text-[#E2D7C7]/80 font-serif-body leading-relaxed mb-4">
            Computer Science Student &amp; Literary Editor blending structured software engineering with creative writing at Bicol University Polangui.
          </p>
          <div className="text-xs text-[#E2D7C7]/80 space-y-1.5 font-sans-ui">
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> {PERSONAL_INFO.location}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#D4AF37]" /> {PERSONAL_INFO.email}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> {PERSONAL_INFO.phone}
            </p>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div>
          <h4 className="font-serif-display text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-3 border-b border-[#800020] pb-1">
            Navigation
          </h4>
          <ul className="space-y-2 text-xs font-sans-ui">
            <li>
              <button
                onClick={() => onSelectView('frontpage')}
                className="hover:text-[#D4AF37] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                🏠 Home
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectView('code')}
                className="hover:text-[#D4AF37] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                💻 Software Projects
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectView('writing')}
                className="hover:text-[#D4AF37] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                ✒️ Writing &amp; Publications
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectView('about')}
                className="hover:text-[#D4AF37] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                📜 About Me
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectView('resume')}
                className="hover:text-[#D4AF37] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                📄 Resume
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Official Social Media */}
        <div>
          <h4 className="font-serif-display text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-3 border-b border-[#800020] pb-1">
            Connect &amp; Socials
          </h4>
          <p className="text-xs text-[#E2D7C7]/80 font-serif-body mb-3">
            Official social channels:
          </p>
          <div className="space-y-2.5 text-xs font-sans-ui">
            <a
              href={SOCIAL_LINKS[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2 rounded bg-[#1C0B0E] border border-[#800020] text-[#E2D7C7] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all group"
            >
              <FacebookIcon className="w-4 h-4 text-[#1877F2] shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="font-semibold block text-[#FAF6F0] group-hover:text-[#D4AF37] transition-colors">Facebook</span>
                <span className="text-[11px] text-[#E2D7C7]/70 font-mono-code block truncate">{SOCIAL_LINKS[0].handle}</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </a>

            <a
              href={SOCIAL_LINKS[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2 rounded bg-[#1C0B0E] border border-[#800020] text-[#E2D7C7] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all group"
            >
              <InstagramIcon className="w-4 h-4 text-[#E4405F] shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="font-semibold block text-[#FAF6F0] group-hover:text-[#D4AF37] transition-colors">Instagram</span>
                <span className="text-[11px] text-[#E2D7C7]/70 font-mono-code block truncate">{SOCIAL_LINKS[1].handle}</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-[#800020] py-4 px-4 text-center text-xs text-[#E2D7C7]/60 font-serif-body">
        <p>
          © 2026 Karl David Z. Ocfemia. All Rights Reserved. • Bicol University Polangui
        </p>
      </div>
    </footer>
  );
};

