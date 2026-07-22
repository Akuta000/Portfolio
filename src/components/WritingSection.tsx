import React, { useState } from 'react';
import { WritingItem, WritingCategory } from '../types';
import { WRITING_DATA } from '../data/portfolioData';
import { Feather, Clock, Filter, ArrowRight, Quote, ExternalLink } from 'lucide-react';
import { ParallaxHeader, ParallaxCard } from './Parallax';

interface WritingSectionProps {
  onSelectWriting: (writing: WritingItem) => void;
  searchQuery: string;
  fontSize: 'sm' | 'base' | 'lg';
}

export const WritingSection: React.FC<WritingSectionProps> = ({
  onSelectWriting,
  searchQuery,
  fontSize
}) => {
  const [selectedCategory, setSelectedCategory] = useState<WritingCategory>('All');

  const categories: WritingCategory[] = ['All', 'Articles', 'Essays', 'Poems', 'Editorials', 'Opinions', 'Folio / Facebook Posts'];

  const filteredItems = WRITING_DATA.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      (selectedCategory === 'Articles' && item.category === 'Article') ||
      (selectedCategory === 'Essays' && item.category === 'Essay') ||
      (selectedCategory === 'Poems' && item.category === 'Poem') ||
      (selectedCategory === 'Editorials' && item.category === 'Editorial') ||
      (selectedCategory === 'Opinions' && item.category === 'Opinion') ||
      (selectedCategory === 'Folio / Facebook Posts' && (item.category === 'Folio / Facebook Post' || item.facebookUrl));

    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Section Header */}
      <ParallaxHeader
        badge={
          <span className="text-xs font-sans-ui text-[#800020] uppercase font-bold tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
            <Feather className="w-4 h-4 text-[#800020]" /> Literary Works &amp; Publications • The Inditers
          </span>
        }
        title="Writing &amp; Publications"
        subtitle="Literary editorials, essays, poems, and folio entries written and edited for The Inditers (Official Student Publication of BU Polangui) and personal publications."
      />

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-[#800020]/20 pb-4">
        <span className="text-xs font-sans-ui font-bold text-[#800020] mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filter by Category:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs font-sans-ui font-semibold px-3.5 py-1.5 rounded border transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#800020] text-[#FAF6F0] border-[#800020] shadow-xs'
                : 'bg-[#F2EBE1] text-[#1C1618] border-[#E2D7C7] hover:border-[#800020] hover:text-[#800020]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Writing Items List */}
      {filteredItems.length === 0 ? (
        <div className="bg-[#FAF6F0] border-2 border-dashed border-[#800020]/40 rounded-xl p-12 text-center my-8">
          <Feather className="w-12 h-12 text-[#800020]/40 mx-auto mb-3" />
          <h3 className="font-serif-display text-xl font-bold text-[#800020] mb-2">
            No Literary Entries Currently Listed
          </h3>
          <p className="font-serif-body text-sm text-[#574B4E] max-w-md mx-auto">
            The literary desk is ready! Share your posts or literary pieces one by one, and they will be beautifully formatted with photos, excerpts, and direct Facebook post links right here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredItems.map((item, idx) => (
            <ParallaxCard
              key={item.id}
              delayIndex={idx}
              onClick={() => onSelectWriting(item)}
              className="bg-[#FAF6F0] border-2 border-[#800020]/80 rounded-xl overflow-hidden shadow-md hover:border-[#800020] hover:bg-[#F2EBE1] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Image Header if available */}
                {item.imageUrl ? (
                  <div className="relative h-48 overflow-hidden border-b border-[#800020]/20 bg-[#2B080D]">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B080D]/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                      <span className="bg-[#800020] text-[#D4AF37] text-[10px] font-mono-code font-bold px-2 py-0.5 rounded border border-[#D4AF37]/30 uppercase">
                        {item.category}
                      </span>
                      {item.facebookUrl && (
                        <a
                          href={item.facebookUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="bg-[#1877F2] text-white p-1.5 rounded-full hover:bg-[#0d65d9] transition-colors shadow flex items-center justify-center text-xs"
                          title="View on Facebook"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Category Header Badge if no image */
                  <div className="p-4 bg-[#800020] text-[#FAF6F0] border-b border-[#D4AF37]/30 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Feather className="w-4 h-4 text-[#D4AF37]" />
                      <span className="bg-[#2B080D] text-[#D4AF37] text-[10px] font-mono-code font-bold px-2 py-0.5 rounded border border-[#D4AF37]/30 uppercase">
                        {item.category}
                      </span>
                    </div>
                    {item.facebookUrl && (
                      <a
                        href={item.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#1877F2] text-white p-1.5 rounded-full hover:bg-[#0d65d9] transition-colors shadow flex items-center justify-center text-xs"
                        title="View on Facebook"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                )}

                <div className="p-5">
                  {/* Top Banner (if no image) */}
                  {!item.imageUrl && (
                    <div className="flex items-center justify-between text-xs font-mono-code mb-3">
                      <span className="bg-[#800020] text-[#D4AF37] px-2.5 py-0.5 rounded font-bold uppercase">
                        {item.category}
                      </span>
                      <span className="text-[#574B4E] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#800020]" /> {item.readTime}
                      </span>
                    </div>
                  )}

                  {/* Title & Subtitle */}
                  <h3 className="font-serif-display text-xl font-bold text-[#800020] group-hover:text-[#4A0E17] transition-colors mb-1 leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-serif-body italic text-xs text-[#574B4E] mb-3">
                    {item.subtitle}
                  </p>

                  {/* Lead Quote */}
                  <blockquote className="my-2 p-2.5 bg-[#F2EBE1] group-hover:bg-[#FAF6F0] border-l-2 border-[#800020] font-serif-body italic text-xs text-[#1C1618] rounded-r">
                    &ldquo;{item.leadQuote}&rdquo;
                  </blockquote>

                  {/* Excerpt */}
                  <p className="font-serif-body text-xs text-[#1C1618] leading-relaxed mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono-code bg-[#F2EBE1] text-[#800020] px-2 py-0.5 rounded border border-[#E2D7C7]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Read Button & External FB Redirection */}
              <div className="p-4 bg-[#F2EBE1]/60 border-t border-[#800020]/20 flex items-center justify-between text-xs font-sans-ui">
                <span className="text-[#574B4E] font-serif-body italic text-[11px]">{item.date}</span>
                
                <div className="flex items-center gap-2">
                  {item.facebookUrl && (
                    <a
                      href={item.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="bg-[#1877F2] text-white text-[11px] font-bold px-2.5 py-1 rounded hover:bg-[#0d65d9] transition-colors flex items-center gap-1 shadow-xs"
                    >
                      FB Post <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  <span className="font-bold text-[#800020] group-hover:underline flex items-center gap-1">
                    Read <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </span>
                </div>
              </div>
            </ParallaxCard>
          ))}
        </div>
      )}

      {/* Literary Note Box */}
      <div className="bg-[#F2EBE1] border border-[#E2D7C7] p-6 rounded-xl font-serif-body text-xs text-[#574B4E] leading-relaxed flex items-start gap-4">
        <Quote className="w-8 h-8 text-[#800020] shrink-0 mt-1" />
        <div>
          <h4 className="font-serif-display text-base font-bold text-[#800020] mb-1">
            Note on Publication Rights & Student Press Ethics
          </h4>
          <p>
            All literary pieces published on this desk are authored or edited by Karl David Z. Ocfemia for <em>The Inditers</em>, the official student publication of Bicol University Polangui. Each entry links directly to its original Facebook post on the official <em>The Inditers</em> page for verification and reader redirection.
          </p>
        </div>
      </div>
    </div>
  );
};
