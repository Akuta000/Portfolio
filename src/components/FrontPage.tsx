import React from 'react';
import { ProjectItem, WritingItem, ViewMode } from '../types';
import { PROJECTS_DATA, WRITING_DATA, PERSONAL_INFO, SOCIAL_LINKS } from '../data/portfolioData';
import { BookOpen, Code, Feather, ArrowRight, Clock, Star, Terminal, Sparkles, User, Database, ExternalLink, GraduationCap, Award, FileText } from 'lucide-react';
import { FacebookIcon, InstagramIcon } from './SocialIcons';
import { ParallaxWrapper, ParallaxCard, ParallaxBanner } from './Parallax';

interface FrontPageProps {
  onSelectProject: (project: ProjectItem) => void;
  onSelectWriting: (writing: WritingItem) => void;
  onSelectView: (view: ViewMode) => void;
  fontSize: 'sm' | 'base' | 'lg';
}

export const FrontPage: React.FC<FrontPageProps> = ({
  onSelectProject,
  onSelectWriting,
  onSelectView,
  fontSize
}) => {
  const [activeLeadTab, setActiveLeadTab] = React.useState<'code' | 'literary'>('code');

  const leadProject = PROJECTS_DATA[0]; // Course Management System
  // Pick the latest/highlighted literary work
  const leadWriting = WRITING_DATA.length > 0 ? WRITING_DATA[WRITING_DATA.length - 1] : null; 
  const secondaryProjects = PROJECTS_DATA.slice(1, 3);
  const secondaryWritings = WRITING_DATA.length > 1 ? WRITING_DATA.slice(0, 2) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Resume Redirect Banner */}
      <ParallaxBanner className="bg-[#F2EBE1] border border-[#800020]/30 hover:border-[#800020] p-4 mb-8 rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs font-sans-ui text-[#1C1618] shadow-xs transition-all">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#800020] text-[#FAF6F0] font-mono-code font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
            <FileText className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-[#800020] text-[#D4AF37] px-2 py-0.5 rounded font-mono-code font-bold uppercase tracking-wider">
                Curriculum Vitae
              </span>
              <span className="font-serif-display font-bold text-sm text-[#800020]">
                Academic &amp; Professional Resume
              </span>
            </div>
            <p className="text-[11px] text-[#574B4E] mt-0.5">
              Review technical skill set, course projects, academic background, and editorial experience.
            </p>
          </div>
        </div>
        <button
          onClick={() => onSelectView('resume')}
          className="text-[#FAF6F0] bg-[#800020] hover:bg-[#5A0017] font-bold text-xs flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border border-[#D4AF37]/40 shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Explore Resume &amp; Credentials</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
        </button>
      </ParallaxBanner>

      {/* Main Grid: 12 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left / Center Main Column (8 Columns) */}
        <div className="lg:col-span-8 space-y-10">
          {/* COVER FEATURE / LEAD HIGHLIGHT */}
          <section className="bg-[#FAF6F0] border-2 border-[#800020] rounded-xl p-6 sm:p-8 shadow-md relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#800020]/20">
              <div className="flex items-center gap-2 text-xs font-sans-ui text-[#800020] font-bold">
                {activeLeadTab === 'code' ? (
                  <>
                    <Database className="w-4 h-4 text-[#800020]" />
                    <span>DATABASE ARCHITECTURE • FEATURED PROJECT</span>
                  </>
                ) : (
                  <>
                    <Feather className="w-4 h-4 text-[#800020]" />
                    <span>LITERARY WRITING • FEATURED ESSAY</span>
                  </>
                )}
              </div>

              {/* Segmented Control */}
              <div className="flex items-center bg-[#F2EBE1] border border-[#E2D7C7] p-1 rounded-lg text-xs font-sans-ui font-bold">
                <button
                  onClick={() => setActiveLeadTab('code')}
                  className={`px-3 py-1 rounded cursor-pointer transition-all flex items-center gap-1.5 ${
                    activeLeadTab === 'code'
                      ? 'bg-[#800020] text-[#FAF6F0] shadow-xs'
                      : 'text-[#574B4E] hover:text-[#800020]'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Software Project</span>
                </button>
                <button
                  onClick={() => setActiveLeadTab('literary')}
                  className={`px-3 py-1 rounded cursor-pointer transition-all flex items-center gap-1.5 ${
                    activeLeadTab === 'literary'
                      ? 'bg-[#800020] text-[#FAF6F0] shadow-xs'
                      : 'text-[#574B4E] hover:text-[#800020]'
                  }`}
                >
                  <Feather className="w-3.5 h-3.5" />
                  <span>Literary Writing</span>
                </button>
              </div>
            </div>

            {activeLeadTab === 'code' ? (
              <div>
                <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#800020] leading-tight mb-3">
                  {leadProject.title}
                </h2>

                <p className="font-serif-body italic text-lg text-[#574B4E] mb-4">
                  {leadProject.subtitle}
                </p>

                <blockquote className="my-4 p-4 bg-[#F2EBE1] border-l-4 border-[#800020] font-serif-body italic text-sm text-[#1C1618]">
                  &ldquo;{leadProject.leadQuote}&rdquo;
                </blockquote>

                <p className="font-serif-body text-sm sm:text-base text-[#1C1618] leading-relaxed mb-6">
                  {leadProject.summary} Designed in 3rd Normal Form for Bicol University Polangui, incorporating student records, course catalog, and grade point query optimization.
                </p>

                <div className="flex flex-wrap items-center justify-end gap-4 pt-4 border-t border-[#800020]/20">
                  <button
                    onClick={() => onSelectProject(leadProject)}
                    className="bg-[#800020] hover:bg-[#4A0E17] text-[#FAF6F0] font-sans-ui font-bold text-xs px-5 py-2.5 rounded shadow flex items-center gap-2 cursor-pointer transition-all"
                  >
                    View Project Details &amp; Interactive SQL Demo <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                </div>
              </div>
            ) : (
              leadWriting && (
                <div>
                  <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-black text-[#800020] leading-tight mb-2">
                    {leadWriting.title}
                  </h2>

                  <p className="font-serif-body italic text-sm text-[#574B4E] mb-4">
                    {leadWriting.subtitle} • <span className="font-sans-ui font-normal text-xs text-[#800020]">{leadWriting.date}</span>
                  </p>

                  <blockquote className="my-4 p-4 bg-[#F2EBE1] border-l-4 border-[#800020] font-serif-body italic text-sm sm:text-base text-[#1C1618]">
                    &ldquo;{leadWriting.leadQuote}&rdquo;
                  </blockquote>

                  <p className="font-serif-body text-sm sm:text-base text-[#1C1618] leading-relaxed mb-6">
                    {leadWriting.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center justify-end gap-4 pt-4 border-t border-[#800020]/20">
                    <div className="flex items-center gap-2">
                      {leadWriting.facebookUrl && (
                        <a
                          href={leadWriting.facebookUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#1877F2] text-white hover:bg-[#0d65d9] font-sans-ui font-bold text-xs px-4 py-2 rounded shadow transition-colors flex items-center gap-1.5"
                        >
                          View Original Facebook Post
                        </a>
                      )}
                      <button
                        onClick={() => onSelectWriting(leadWriting)}
                        className="bg-[#800020] hover:bg-[#4A0E17] text-[#FAF6F0] font-sans-ui font-bold text-xs px-5 py-2 rounded shadow flex items-center gap-2 cursor-pointer transition-all"
                      >
                        Read Full Piece <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </section>

          {/* SECONDARY FEATURES */}
          <section>
            <div className="flex items-center justify-between border-b-2 border-[#800020] pb-2 mb-6">
              <h3 className="font-serif-display text-2xl font-bold text-[#800020] uppercase tracking-wide flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#800020]" /> Featured Highlights
              </h3>
              <span className="text-xs font-serif-body italic text-[#574B4E]">Software &amp; Writing Synergy</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Secondary Code Project */}
              <div className="bg-[#F2EBE1] p-6 rounded-lg border border-[#E2D7C7] flex flex-col justify-between hover:border-[#800020] transition-all">
                <div>
                  <span className="text-[11px] font-sans-ui text-[#800020] font-bold uppercase">
                    {secondaryProjects[0].category}
                  </span>
                  <h4 className="font-serif-display text-xl font-bold text-[#1C1618] mt-1 mb-2">
                    {secondaryProjects[0].title}
                  </h4>
                  <p className="font-serif-body text-xs text-[#574B4E] leading-relaxed mb-4 line-clamp-3">
                    {secondaryProjects[0].summary}
                  </p>
                </div>
                <button
                  onClick={() => onSelectProject(secondaryProjects[0])}
                  className="text-xs font-sans-ui font-bold text-[#800020] hover:underline flex items-center gap-1 mt-2 cursor-pointer"
                >
                  View Application Details <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Secondary Writing Piece */}
              <div className="bg-[#F2EBE1] p-6 rounded-lg border border-[#E2D7C7] flex flex-col justify-between hover:border-[#800020] transition-all">
                {leadWriting ? (
                  <>
                    <div>
                      <span className="text-[11px] font-sans-ui text-[#800020] font-bold uppercase">
                        {leadWriting.category} • The Inditers
                      </span>
                      <h4 className="font-serif-display text-xl font-bold text-[#1C1618] mt-1 mb-2">
                        {leadWriting.title}
                      </h4>
                      <p className="font-serif-body text-xs text-[#574B4E] leading-relaxed mb-4 line-clamp-3 italic">
                        &ldquo;{leadWriting.leadQuote}&rdquo;
                      </p>
                    </div>
                    <button
                      onClick={() => onSelectWriting(leadWriting)}
                      className="text-xs font-sans-ui font-bold text-[#800020] hover:underline flex items-center gap-1 mt-2 cursor-pointer"
                    >
                      Read Piece <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <div>
                    <span className="text-[11px] font-sans-ui text-[#800020] font-bold uppercase">
                      Literary Works
                    </span>
                    <h4 className="font-serif-display text-xl font-bold text-[#1C1618] mt-1 mb-2">
                      Literary Writing
                    </h4>
                    <p className="font-serif-body text-xs text-[#574B4E] leading-relaxed mb-4 italic">
                      Explore published literary pieces and editorial columns.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* SOFTWARE PROJECTS SECTION */}
          <section>
            <div className="flex items-center justify-between border-b-2 border-[#800020] pb-2 mb-6">
              <h3 className="font-serif-display text-2xl font-bold text-[#800020] uppercase tracking-wide flex items-center gap-2">
                <Code className="w-5 h-5 text-[#800020]" /> Software Engineering Projects
              </h3>
              <button
                onClick={() => onSelectView('code')}
                className="text-xs font-sans-ui font-bold text-[#800020] hover:underline cursor-pointer"
              >
                View All Projects →
              </button>
            </div>

            <div className="space-y-4">
              {PROJECTS_DATA.map((proj, idx) => (
                <ParallaxCard
                  key={proj.id}
                  delayIndex={idx}
                  onClick={() => onSelectProject(proj)}
                  className="bg-[#FAF6F0] p-5 rounded-lg border border-[#E2D7C7] hover:border-[#800020] hover:bg-[#F2EBE1] transition-all cursor-pointer group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-sans-ui text-[#800020] mb-1">
                      <span className="font-bold">{proj.category}</span>
                      <span>•</span>
                      <span>{proj.date}</span>
                    </div>
                    <h4 className="font-serif-display text-xl font-bold text-[#1C1618] group-hover:text-[#800020] transition-colors">
                      {proj.title}
                    </h4>
                    <p className="font-serif-body text-xs text-[#574B4E] mt-1 max-w-xl">
                      {proj.subtitle}
                    </p>
                  </div>
                  <span className="text-xs font-sans-ui font-bold text-[#800020] bg-[#F2EBE1] group-hover:bg-[#800020] group-hover:text-[#FAF6F0] px-3 py-1.5 rounded transition-all whitespace-nowrap">
                    View Project
                  </span>
                </ParallaxCard>
              ))}
            </div>
          </section>

          {/* LITERARY WRITING SECTION */}
          <section>
            <div className="flex items-center justify-between border-b-2 border-[#800020] pb-2 mb-6">
              <h3 className="font-serif-display text-2xl font-bold text-[#800020] uppercase tracking-wide flex items-center gap-2">
                <Feather className="w-5 h-5 text-[#800020]" /> Literary Works &amp; Publications
              </h3>
              <button
                onClick={() => onSelectView('writing')}
                className="text-xs font-sans-ui font-bold text-[#800020] hover:underline cursor-pointer"
              >
                View All Writing →
              </button>
            </div>

            <div className="space-y-4">
              {WRITING_DATA.length === 0 ? (
                <div className="bg-[#FAF6F0] p-6 rounded-lg border border-dashed border-[#800020]/30 text-center font-serif-body text-xs text-[#574B4E]">
                  No literary pieces currently listed.
                </div>
              ) : (
                WRITING_DATA.slice(0, 5).map((item, idx) => (
                  <ParallaxCard
                    key={item.id}
                    delayIndex={idx}
                    onClick={() => onSelectWriting(item)}
                    className="bg-[#FAF6F0] p-5 rounded-lg border border-[#E2D7C7] hover:border-[#800020] hover:bg-[#F2EBE1] transition-all cursor-pointer group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                  >
                    <div className="flex gap-4 items-center">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 object-cover rounded border border-[#800020]/30 shrink-0 hidden sm:block shadow-xs"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded bg-[#F2EBE1] border border-[#800020]/30 text-[#800020] flex items-center justify-center shrink-0 hidden sm:flex">
                          <Feather className="w-5 h-5 text-[#800020]" />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2 text-xs font-sans-ui text-[#800020] mb-1">
                          <span className="bg-[#800020] text-[#FAF6F0] px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                            {item.category}
                          </span>
                          <span>•</span>
                          <span>{item.date}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.readTime}</span>
                        </div>
                        <h4 className="font-serif-display text-lg font-bold text-[#1C1618] group-hover:text-[#800020] transition-colors">
                          {item.title}
                        </h4>
                        <p className="font-serif-body italic text-xs text-[#574B4E] mt-0.5 max-w-xl line-clamp-1">
                          &ldquo;{item.leadQuote}&rdquo;
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      {item.facebookUrl && (
                        <a
                          href={item.facebookUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[11px] font-sans-ui font-bold bg-[#1877F2] text-white hover:bg-[#0d65d9] px-2.5 py-1.5 rounded transition-colors flex items-center gap-1 shadow-xs"
                        >
                          Facebook Post
                        </a>
                      )}
                      <span className="text-xs font-sans-ui font-bold text-[#800020] bg-[#F2EBE1] group-hover:bg-[#800020] group-hover:text-[#FAF6F0] px-3 py-1.5 rounded transition-all whitespace-nowrap">
                        Read
                      </span>
                    </div>
                  </ParallaxCard>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Right Sidebar (4 Columns) */}
        <ParallaxWrapper className="lg:col-span-4 space-y-8" speed={0.1}>
          {/* ABOUT ME CARD */}
          <div className="bg-[#FAF6F0] border-2 border-[#800020] rounded-xl p-6 shadow-xs">
            {/* Author Profile Header Card */}
            <div className="mb-4 p-5 rounded-lg border-2 border-[#800020] shadow-md bg-[#800020] text-[#FAF6F0] flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#FAF6F0] text-[#800020] border-2 border-[#D4AF37] font-serif-display font-bold text-xl flex items-center justify-center mb-3 shadow-inner">
                KO
              </div>
              <span className="text-[10px] font-mono-code bg-[#2B080D] text-[#D4AF37] px-2.5 py-0.5 rounded border border-[#D4AF37]/40 font-bold uppercase tracking-wider mb-2">
                BU Polangui • CS Scholar
              </span>
              <h3 className="font-serif-display text-lg font-bold text-[#FAF6F0] leading-tight">
                Karl David Z. Ocfemia
              </h3>
              <p className="font-serif-body text-xs text-[#D4AF37] italic mt-0.5">
                BS Computer Science • Literary Editor
              </p>
            </div>

            <p className="font-serif-body text-xs text-[#1C1618] leading-relaxed mb-4">
              Hello! I am a Computer Science student at Bicol University Polangui and the Literary Editor of <em>The Inditers</em>. I enjoy building structured software applications (databases, Python programs, web apps) and writing thoughtful literary pieces.
            </p>

            <div className="bg-[#F2EBE1] p-3 rounded text-xs font-sans-ui text-[#1C1618] space-y-1.5 mb-4 border border-[#E2D7C7]">
              <p>📍 Polangui, Albay, Philippines</p>
              <p>🎓 BS Computer Science (BU Polangui, 2023–Present)</p>
              <p>📊 Senior High ABM Track Honor Graduate</p>
              <p>✍️ Literary Editor @ The Inditers</p>
            </div>

            <button
              onClick={() => onSelectView('about')}
              className="w-full bg-[#800020] hover:bg-[#4A0E17] text-[#FAF6F0] text-xs font-sans-ui font-bold py-2 rounded shadow text-center cursor-pointer transition-colors mb-4"
            >
              Read Full Bio &amp; Profile →
            </button>

            {/* Quick Social Links */}
            <div className="border-t border-[#800020]/20 pt-3">
              <span className="text-[10px] font-sans-ui text-[#800020] uppercase font-bold tracking-wider block mb-2">
                Connect On Socials
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={SOCIAL_LINKS[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook"
                  className="p-2 rounded bg-[#F2EBE1] border border-[#E2D7C7] hover:bg-[#1877F2] text-[#1877F2] hover:text-white transition-all cursor-pointer flex-1 flex justify-center items-center"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href={SOCIAL_LINKS[1].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                  className="p-2 rounded bg-[#F2EBE1] border border-[#E2D7C7] hover:bg-[#E4405F] text-[#E4405F] hover:text-white transition-all cursor-pointer flex-1 flex justify-center items-center"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </ParallaxWrapper>
      </div>
    </div>
  );
};
