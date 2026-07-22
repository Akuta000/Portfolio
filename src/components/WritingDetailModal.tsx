import React, { useState } from 'react';
import { WritingItem } from '../types';
import { X, Feather, Clock, Share2, Check, ExternalLink } from 'lucide-react';

interface WritingDetailModalProps {
  item: WritingItem | null;
  onClose: () => void;
  fontSize: 'sm' | 'base' | 'lg';
}

export const WritingDetailModal: React.FC<WritingDetailModalProps> = ({
  item,
  onClose,
  fontSize
}) => {
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const fontClass = fontSize === 'sm' ? 'text-sm' : fontSize === 'lg' ? 'text-xl' : 'text-base';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF6F0] text-[#1C1618] rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#800020] shadow-2xl relative">
        {/* Sticky Reader Header */}
        <div className="sticky top-0 bg-[#800020] text-[#FAF6F0] p-4 flex items-center justify-between z-10 border-b border-[#D4AF37]/40">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-code bg-[#D4AF37] text-[#2B080D] px-2.5 py-0.5 rounded font-bold uppercase">
              {item.category}
            </span>
            <span className="text-xs text-[#E2D7C7] font-serif-body italic hidden sm:inline">
              • {item.publication}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {item.facebookUrl && (
              <a
                href={item.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1877F2] hover:bg-[#0d65d9] text-white px-3 py-1.5 rounded text-xs font-sans-ui font-bold flex items-center gap-1 transition-colors shadow-xs"
              >
                <span>View FB Post</span> <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={handleCopyLink}
              className="p-1.5 rounded bg-[#4A0E17] hover:bg-[#A3283B] text-[#FAF6F0] transition-colors cursor-pointer text-xs flex items-center gap-1 font-sans-ui"
              title="Share piece"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full bg-[#4A0E17] hover:bg-[#A3283B] text-[#FAF6F0] transition-colors cursor-pointer"
              aria-label="Close reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero Image for write-up if available */}
        {item.imageUrl && (
          <div className="relative w-full h-64 sm:h-96 overflow-hidden border-b border-[#800020]/20 bg-[#2B080D]">
            <img
              src={item.imageUrl}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] via-transparent to-black/30"></div>
          </div>
        )}

        <div className="p-6 sm:p-12">
          {/* Article / Poem Banner */}
          <div className="text-center border-b border-[#800020]/20 pb-8 mb-8">
            <span className="text-xs font-mono-code text-[#800020] font-bold tracking-widest uppercase">
              {item.publication}
            </span>
            <h1 className="font-serif-display text-3xl sm:text-5xl font-black text-[#800020] mt-2 mb-3 leading-tight">
              {item.title}
            </h1>
            <p className="font-serif-body italic text-lg sm:text-xl text-[#574B4E] max-w-xl mx-auto">
              {item.subtitle}
            </p>

            {/* Byline */}
            <div className="flex items-center justify-center gap-3 mt-6 text-xs font-sans-ui text-[#574B4E]">
              <span>By <strong>Karl David Z. Ocfemia</strong></span>
              <span>•</span>
              <span className="italic">{item.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#800020]" /> {item.readTime}</span>
            </div>

            {item.facebookUrl && (
              <div className="mt-4">
                <a
                  href={item.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#0d65d9] text-white font-sans-ui text-xs font-bold px-4 py-2 rounded-full shadow transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Read Original Post on Facebook Page
                </a>
              </div>
            )}
          </div>

          {/* Lead Pull-Quote */}
          <blockquote className="my-8 p-6 bg-[#F2EBE1] border-l-4 border-[#800020] font-serif-body italic text-lg sm:text-xl text-[#1C1618] rounded-r shadow-xs text-center sm:text-left">
            &ldquo;{item.leadQuote}&rdquo;
          </blockquote>

          {/* Article / Poetry Body */}
          {item.isPoem ? (
            <div className="my-10 max-w-lg mx-auto bg-[#F2EBE1]/60 p-8 rounded-lg border border-[#E2D7C7]">
              <div className="text-center mb-6">
                <Feather className="w-6 h-6 text-[#800020] mx-auto mb-1" />
                <span className="text-xs font-mono-code text-[#800020] uppercase tracking-widest">
                  Poetic Stanzas
                </span>
              </div>
              <div className={`font-serif-body text-[#1C1618] leading-relaxed space-y-6 ${fontClass} text-center`}>
                {item.content.map((stanza, idx) => (
                  <div key={idx} className="whitespace-pre-line italic border-b border-[#800020]/10 pb-4 last:border-b-0">
                    {stanza}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={`font-serif-body text-[#1C1618] leading-relaxed space-y-6 ${fontClass}`}>
              {item.content.map((paragraph, idx) => (
                <p key={idx} className={idx === 0 ? 'drop-cap' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-[#800020]/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-sans-ui bg-[#F2EBE1] text-[#800020] px-2.5 py-1 rounded-full border border-[#E2D7C7]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {item.facebookUrl && (
                <a
                  href={item.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1877F2] text-white hover:bg-[#0d65d9] font-sans-ui font-bold text-xs px-4 py-2.5 rounded shadow flex items-center gap-1.5 transition-colors"
                >
                  Open in Facebook <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={onClose}
                className="bg-[#800020] text-[#FAF6F0] hover:bg-[#4A0E17] font-sans-ui font-semibold text-xs px-6 py-2.5 rounded shadow cursor-pointer transition-colors"
              >
                Finished Reading
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
