import React, { useState } from 'react';
import { ProjectItem, CodeCategory } from '../types';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Code, Database, Terminal, ArrowRight, Github, ExternalLink, Filter, Sparkles, CheckCircle2, Ticket, Clock, Layout } from 'lucide-react';
import { InteractiveSqlSandbox } from './InteractiveSqlSandbox';
import { InteractivePythonConsole } from './InteractivePythonConsole';
import { InteractiveMemoryTicketing } from './InteractiveMemoryTicketing';
import { InteractivePomodoroTimer } from './InteractivePomodoroTimer';
import { InteractiveNotionClone } from './InteractiveNotionClone';
import { ParallaxHeader, ParallaxCard, ParallaxWrapper } from './Parallax';

interface CodeSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  searchQuery: string;
  fontSize: 'sm' | 'base' | 'lg';
}

export const CodeSection: React.FC<CodeSectionProps> = ({
  onSelectProject,
  searchQuery,
  fontSize
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CodeCategory>('All');
  const [activePlayground, setActivePlayground] = useState<'sql' | 'ticketing' | 'pomodoro' | 'notion' | 'python'>('sql');

  const categories: CodeCategory[] = ['All', 'Database / SQL', 'Web Development', 'Python / Console'];

  const filteredProjects = PROJECTS_DATA.filter((proj) => {
    const matchesCategory = selectedCategory === 'All' || proj.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Section Header */}
      <ParallaxHeader
        badge={
          <span className="text-xs font-sans-ui text-[#800020] uppercase font-bold tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
            <Terminal className="w-4 h-4 text-[#800020]" /> Software Engineering Portfolio
          </span>
        }
        title="Software Projects"
        subtitle="Academic systems, relational database schemas, and software applications built during my Computer Science studies at Bicol University Polangui."
      />

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-[#800020]/20 pb-4">
        <span className="text-xs font-sans-ui font-bold text-[#800020] mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filter by Stack:
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {filteredProjects.map((project, idx) => (
          <ParallaxCard
            key={project.id}
            delayIndex={idx}
            className="bg-[#FAF6F0] border-2 border-[#800020]/80 rounded-xl p-6 shadow-md hover:border-[#800020] hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              {/* Category & Date Header */}
              <div className="flex items-center justify-between text-xs font-mono-code mb-3">
                <span className="bg-[#800020] text-[#D4AF37] px-2.5 py-0.5 rounded font-bold uppercase">
                  {project.category}
                </span>
                <span className="text-[#574B4E] font-semibold">{project.date}</span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-serif-display text-2xl font-bold text-[#800020] mb-2 leading-tight">
                {project.title}
              </h3>
              <p className="font-serif-body italic text-xs text-[#574B4E] mb-4">
                {project.subtitle}
              </p>

              {/* Summary */}
              <p className="font-serif-body text-xs text-[#1C1618] leading-relaxed mb-4">
                {project.summary}
              </p>

              {/* Lead Quote Callout */}
              <blockquote className="p-3 bg-[#F2EBE1] border-l-2 border-[#800020] font-serif-body italic text-xs text-[#1C1618] mb-4">
                &ldquo;{project.leadQuote}&rdquo;
              </blockquote>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-6">
                {project.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="text-[10px] font-mono-code bg-[#F2EBE1] text-[#800020] px-2 py-0.5 rounded border border-[#E2D7C7]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#800020]/20 flex items-center justify-between gap-2">
              <button
                onClick={() => onSelectProject(project)}
                className="w-full bg-[#800020] hover:bg-[#4A0E17] text-[#FAF6F0] font-sans-ui font-bold text-xs py-2 px-3 rounded flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-xs"
              >
                Read Feature & Interactive Demo <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>
            </div>
          </ParallaxCard>
        ))}
      </div>

      {/* Featured Interactive Playground Section */}
      <ParallaxWrapper speed={0.1}>
        <section className="bg-[#2B080D] text-[#FAF6F0] p-6 sm:p-8 rounded-xl border-2 border-[#800020] shadow-xl my-12">
          <div className="border-b border-[#800020] pb-4 mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono-code text-[#D4AF37] uppercase font-bold tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Live Interactive Systems Lab
              </span>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#FAF6F0] mt-1">
                Interactive Systems &amp; Software Demos
              </h2>
            </div>

            {/* Sandbox Selector Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-[#1C0508] p-1.5 rounded-lg border border-[#800020]">
              <button
                onClick={() => setActivePlayground('sql')}
                className={`text-xs font-mono-code font-bold px-3 py-1.5 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
                  activePlayground === 'sql' ? 'bg-[#800020] text-[#D4AF37] shadow-xs' : 'text-[#E2D7C7]/70 hover:text-white'
                }`}
              >
                <Database className="w-3.5 h-3.5" /> SQL Sandbox
              </button>
              <button
                onClick={() => setActivePlayground('ticketing')}
                className={`text-xs font-mono-code font-bold px-3 py-1.5 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
                  activePlayground === 'ticketing' ? 'bg-[#800020] text-[#D4AF37] shadow-xs' : 'text-[#E2D7C7]/70 hover:text-white'
                }`}
              >
                <Ticket className="w-3.5 h-3.5" /> Memory Ticketing
              </button>
              <button
                onClick={() => setActivePlayground('pomodoro')}
                className={`text-xs font-mono-code font-bold px-3 py-1.5 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
                  activePlayground === 'pomodoro' ? 'bg-[#800020] text-[#D4AF37] shadow-xs' : 'text-[#E2D7C7]/70 hover:text-white'
                }`}
              >
                <Clock className="w-3.5 h-3.5" /> Pomodoro Timer
              </button>
              <button
                onClick={() => setActivePlayground('notion')}
                className={`text-xs font-mono-code font-bold px-3 py-1.5 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
                  activePlayground === 'notion' ? 'bg-[#800020] text-[#D4AF37] shadow-xs' : 'text-[#E2D7C7]/70 hover:text-white'
                }`}
              >
                <Layout className="w-3.5 h-3.5" /> Notion Workspace
              </button>
              <button
                onClick={() => setActivePlayground('python')}
                className={`text-xs font-mono-code font-bold px-3 py-1.5 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
                  activePlayground === 'python' ? 'bg-[#800020] text-[#D4AF37] shadow-xs' : 'text-[#E2D7C7]/70 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" /> Python Console
              </button>
            </div>
          </div>

          <p className="font-serif-body text-xs sm:text-sm text-[#E2D7C7]/90 leading-relaxed mb-6">
            Explore live, fully functional software systems engineered during Karl David Z. Ocfemia&apos;s Computer Science studies at Bicol University Polangui.
          </p>

          {activePlayground === 'sql' && <InteractiveSqlSandbox />}
          {activePlayground === 'ticketing' && <InteractiveMemoryTicketing />}
          {activePlayground === 'pomodoro' && <InteractivePomodoroTimer />}
          {activePlayground === 'notion' && <InteractiveNotionClone />}
          {activePlayground === 'python' && <InteractivePythonConsole />}
        </section>
      </ParallaxWrapper>
    </div>
  );
};
