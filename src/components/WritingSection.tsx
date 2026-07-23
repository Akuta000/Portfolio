import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WritingItem, WritingCategory } from '../types';
import { WRITING_DATA } from '../data/portfolioData';
import { Feather, Clock, Filter, ArrowRight, Quote, ExternalLink, Move, Grid, LayoutGrid, Pin, Sparkles, Layers, Award } from 'lucide-react';
import { ParallaxHeader, ParallaxCard } from './Parallax';

interface WritingSectionProps {
  onSelectWriting: (writing: WritingItem) => void;
  searchQuery: string;
  fontSize: 'sm' | 'base' | 'lg';
}

interface CardPosition {
  x: number;
  y: number;
  zIndex: number;
  rotate: number;
}

export const WritingSection: React.FC<WritingSectionProps> = ({
  onSelectWriting,
  searchQuery,
  fontSize
}) => {
  const [selectedCategory, setSelectedCategory] = useState<WritingCategory>('All');
  const [viewMode, setViewMode] = useState<'collage' | 'grid'>('collage');
  const [highestZIndex, setHighestZIndex] = useState<number>(20);
  
  // Store custom positions for cards in collage mode
  const [positions, setPositions] = useState<Record<string, CardPosition>>({});
  const canvasRef = useRef<HTMLDivElement>(null);

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

  // Generate initial layout positions for collage view
  const initializePositions = () => {
    const newPos: Record<string, CardPosition> = {};
    const cols = typeof window !== 'undefined' && window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    const cardWidth = typeof window !== 'undefined' && window.innerWidth < 640 ? 300 : 340;
    const cardHeight = 440;
    const spacingX = typeof window !== 'undefined' && window.innerWidth < 640 ? 15 : 30;
    const spacingY = 40;

    filteredItems.forEach((item, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);

      // Add gentle rotation and offset for collage feel
      const randomRotate = (index % 5) * 3 - 6;
      const offsetX = row % 2 === 1 ? 20 : 0;
      const offsetY = col % 2 === 1 ? 15 : 0;

      newPos[item.id] = {
        x: Math.max(10, col * (cardWidth + spacingX) + offsetX + 15),
        y: Math.max(10, row * (cardHeight + spacingY) + offsetY + 20),
        zIndex: index + 1,
        rotate: randomRotate,
      };
    });

    setPositions(newPos);
  };

  useEffect(() => {
    initializePositions();
  }, [selectedCategory, searchQuery]);

  const bringToFront = (id: string) => {
    const nextZ = highestZIndex + 1;
    setHighestZIndex(nextZ);
    setPositions((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || { x: 0, y: 0, rotate: 0 }),
        zIndex: nextZ,
      },
    }));
  };

  // Preset Card Styles mimicking retro press kits, receipts, and magazine posters from reference
  const cardThemes = [
    {
      bg: 'bg-[#FAF6F0]',
      border: 'border-2 border-[#800020]',
      headerBg: 'bg-[#800020]',
      headerText: 'text-[#D4AF37]',
      accentBadge: 'bg-[#D4AF37] text-[#800020]',
      stampText: 'STUDENT PRESS • VOL. 2026',
      receiptColor: 'border-[#800020]/30',
    },
    {
      bg: 'bg-[#FFF9F2]',
      border: 'border-2 border-[#C0392B]',
      headerBg: 'bg-[#C0392B]',
      headerText: 'text-white',
      accentBadge: 'bg-[#1C1618] text-[#FAF6F0]',
      stampText: 'PRESS KIT & LITERARY FOLIO',
      receiptColor: 'border-[#C0392B]/30',
    },
    {
      bg: 'bg-[#F0FDF4]',
      border: 'border-2 border-[#004D40]',
      headerBg: 'bg-[#004D40]',
      headerText: 'text-[#E8F5E9]',
      accentBadge: 'bg-[#D4AF37] text-[#004D40]',
      stampText: 'CULTURAL EDITION • THE INDITERS',
      receiptColor: 'border-[#004D40]/30',
    },
    {
      bg: 'bg-[#FEFCE8]',
      border: 'border-2 border-[#854D0E]',
      headerBg: 'bg-[#854D0E]',
      headerText: 'text-[#FEF08A]',
      accentBadge: 'bg-[#800020] text-white',
      stampText: 'EDITORIAL BOARD • RATED ★★★★★',
      receiptColor: 'border-[#854D0E]/30',
    },
    {
      bg: 'bg-[#FAF5FF]',
      border: 'border-2 border-[#581C87]',
      headerBg: 'bg-[#581C87]',
      headerText: 'text-[#E9D5FF]',
      accentBadge: 'bg-[#D4AF37] text-[#581C87]',
      stampText: 'BU POLANGUI • OFFICIAL ENTRY',
      receiptColor: 'border-[#581C87]/30',
    },
  ];

  const calculateCanvasHeight = () => {
    if (filteredItems.length === 0) return '400px';
    const rows = Math.ceil(filteredItems.length / (typeof window !== 'undefined' && window.innerWidth > 1024 ? 3 : 2));
    return `${Math.max(850, rows * 460 + 100)}px`;
  };

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
        subtitle="Literary editorials, essays, poems, and folio entries. Drag cards freely on the canvas board to explore, stack, and inspect!"
      />

      {/* Top Toolbar: View Mode & Category Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-[#F2EBE1] p-4 rounded-xl border border-[#E2D7C7] shadow-xs">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-sans-ui font-bold text-[#800020] mr-1.5 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-sans-ui font-semibold px-3 py-1 rounded-md border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#800020] text-[#FAF6F0] border-[#800020] shadow-xs'
                  : 'bg-[#FAF6F0] text-[#1C1618] border-[#E2D7C7] hover:border-[#800020] hover:text-[#800020]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* View Mode & Collage Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-[#FAF6F0] p-1 rounded-lg border border-[#E2D7C7]">
            <button
              onClick={() => setViewMode('collage')}
              className={`text-xs font-sans-ui font-bold px-3 py-1 rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'collage'
                  ? 'bg-[#800020] text-[#FAF6F0] shadow-xs'
                  : 'text-[#574B4E] hover:text-[#800020]'
              }`}
            >
              <Move className="w-3.5 h-3.5" /> Interactive Canvas
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`text-xs font-sans-ui font-bold px-3 py-1 rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#800020] text-[#FAF6F0] shadow-xs'
                  : 'text-[#574B4E] hover:text-[#800020]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> Classic Grid
            </button>
          </div>
        </div>
      </div>

      {/* Writing Items Display */}
      {filteredItems.length === 0 ? (
        <div className="bg-[#FAF6F0] border-2 border-dashed border-[#800020]/40 rounded-xl p-12 text-center my-8">
          <Feather className="w-12 h-12 text-[#800020]/40 mx-auto mb-3" />
          <h3 className="font-serif-display text-xl font-bold text-[#800020] mb-2">
            No Literary Entries Matching Your Filter
          </h3>
          <p className="font-serif-body text-sm text-[#574B4E] max-w-md mx-auto">
            Try switching category filters or clearing your search term to reveal literary works.
          </p>
        </div>
      ) : viewMode === 'collage' ? (
        /* INTERACTIVE DRAGGABLE COLLAGE CANVAS */
        <div
          ref={canvasRef}
          style={{ minHeight: calculateCanvasHeight() }}
          className="relative w-full bg-[#1C0B0E] rounded-2xl border-4 border-[#800020] p-4 overflow-hidden shadow-2xl mb-12 bg-[radial-gradient(#800020_1px,transparent_1px)] [background-size:24px_24px]"
        >
          {/* Background Canvas Stamps */}
          <div className="absolute top-6 right-8 text-right pointer-events-none opacity-20 select-none">
            <h2 className="font-serif-display text-6xl font-black text-[#D4AF37] tracking-wider uppercase">
              THE INDITERS
            </h2>
            <p className="font-mono-code text-xs text-[#FAF6F0] uppercase tracking-widest">
              LITERARY DESK • BU POLANGUI
            </p>
          </div>

          <div className="absolute bottom-6 left-8 pointer-events-none opacity-25 select-none font-mono-code text-[11px] text-[#D4AF37]">
            <div>REC-NO: #2026-BU-POLANGUI</div>
            <div>STATUS: PUBLISHED EDITORIALS</div>
            <div>||||| ||| ||||||| || |||||||||| |||</div>
          </div>

          {/* Draggable Cards */}
          {filteredItems.map((item, idx) => {
            const theme = cardThemes[idx % cardThemes.length];
            const pos = positions[item.id] || { x: (idx % 3) * 360 + 20, y: Math.floor(idx / 3) * 460 + 20, zIndex: idx + 1, rotate: (idx % 5) * 3 - 6 };

            return (
              <motion.div
                key={item.id}
                drag
                dragConstraints={canvasRef}
                dragElastic={0.08}
                dragMomentum={false}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  zIndex: pos.zIndex,
                  rotate: `${pos.rotate}deg`,
                }}
                whileDrag={{
                  scale: 1.05,
                  rotate: 0,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
                  cursor: 'grabbing',
                }}
                onPointerDown={() => bringToFront(item.id)}
                className={`absolute w-[320px] sm:w-[350px] ${theme.bg} ${theme.border} rounded-xl shadow-xl overflow-hidden cursor-grab touch-none group select-none transition-shadow`}
              >
                {/* Top Header Bar */}
                <div className={`${theme.headerBg} ${theme.headerText} px-3.5 py-1.5 flex items-center justify-end border-b border-black/20 text-xs font-mono-code font-bold`}>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${theme.accentBadge} font-bold uppercase tracking-widest`}>
                    {item.category}
                  </span>
                </div>

                {/* Main Card Graphic & Image */}
                {item.imageUrl && (
                  <div className="relative h-44 overflow-hidden border-b border-black/10 bg-[#1C1618]">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    
                    {/* Retro Magazine Stamp Watermark */}
                    <div className="absolute top-2 right-2 bg-red-700/90 text-white text-[9px] font-mono-code px-2 py-0.5 rounded border border-white/30 uppercase font-bold tracking-widest shadow-xs">
                      BU PRESS
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[11px] font-mono-code">
                      <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                        {item.date}
                      </span>
                      <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                        {item.readTime}
                      </span>
                    </div>
                  </div>
                )}

                {/* Card Content Area */}
                <div className="p-4 space-y-2.5">
                  {!item.imageUrl && (
                    <div className="flex items-center justify-between text-xs font-mono-code">
                      <span className="text-[#800020] font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {item.readTime}
                      </span>
                      <span className="text-gray-500">{item.date}</span>
                    </div>
                  )}

                  <h3 className="font-serif-display text-lg font-bold text-[#1C1618] leading-tight line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="font-serif-body italic text-xs text-[#574B4E] line-clamp-1">
                    {item.subtitle}
                  </p>

                  <blockquote className="p-2 bg-black/5 border-l-2 border-[#800020] font-serif-body italic text-[11px] text-[#1C1618] rounded-r line-clamp-2">
                    &ldquo;{item.leadQuote}&rdquo;
                  </blockquote>

                  <p className="font-serif-body text-xs text-[#1C1618]/90 line-clamp-2 leading-relaxed">
                    {item.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[9px] font-mono-code bg-black/5 text-[#800020] px-1.5 py-0.5 rounded border border-black/10"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Receipt-Style Bottom Bar & Actions */}
                <div className={`p-3 bg-black/5 border-t ${theme.receiptColor} flex items-center justify-between gap-2 text-xs font-sans-ui`}>
                  <div className="font-mono-code text-[10px] text-gray-500 tracking-tighter select-none">
                    ||||| |||| || |||||
                  </div>

                  <div className="flex items-center gap-2">
                    {item.facebookUrl && (
                      <a
                        href={item.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#1877F2] text-white text-[10px] font-bold px-2 py-1 rounded hover:bg-[#0d65d9] transition-colors flex items-center gap-1 shadow-xs"
                      >
                        FB <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectWriting(item);
                      }}
                      className="bg-[#800020] text-[#FAF6F0] font-bold text-[11px] px-2.5 py-1 rounded hover:bg-[#4A0E17] transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      Read Piece <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* CLASSIC GRID READER VIEW */
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

                  <h3 className="font-serif-display text-xl font-bold text-[#800020] group-hover:text-[#4A0E17] transition-colors mb-1 leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-serif-body italic text-xs text-[#574B4E] mb-3">
                    {item.subtitle}
                  </p>

                  <blockquote className="my-2 p-2.5 bg-[#F2EBE1] group-hover:bg-[#FAF6F0] border-l-2 border-[#800020] font-serif-body italic text-xs text-[#1C1618] rounded-r">
                    &ldquo;{item.leadQuote}&rdquo;
                  </blockquote>

                  <p className="font-serif-body text-xs text-[#1C1618] leading-relaxed mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="text-[10px] font-mono-code bg-[#F2EBE1] text-[#800020] px-2 py-0.5 rounded border border-[#E2D7C7]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

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
            Note on Publication Rights &amp; Student Press Ethics
          </h4>
          <p>
            All literary pieces published on this desk are authored or edited by Karl David Z. Ocfemia for <em>The Inditers</em>, the official student publication of Bicol University Polangui. Each entry links directly to its original Facebook post on the official <em>The Inditers</em> page for verification and reader redirection.
          </p>
        </div>
      </div>
    </div>
  );
};
