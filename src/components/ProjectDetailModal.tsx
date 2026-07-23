import React from 'react';
import { ProjectItem } from '../types';
import { X, ExternalLink, Github, Code, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { InteractiveSqlSandbox } from './InteractiveSqlSandbox';
import { InteractivePythonConsole } from './InteractivePythonConsole';
import { InteractiveMemoryTicketing } from './InteractiveMemoryTicketing';
import { InteractivePomodoroTimer } from './InteractivePomodoroTimer';
import { InteractiveNotionClone } from './InteractiveNotionClone';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  fontSize: 'sm' | 'base' | 'lg';
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  fontSize
}) => {
  if (!project) return null;

  const fontClass = fontSize === 'sm' ? 'text-sm' : fontSize === 'lg' ? 'text-lg' : 'text-base';

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF6F0] text-[#1C1618] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#800020] shadow-2xl relative">
        {/* Sticky Header Bar */}
        <div className="sticky top-0 bg-[#800020] text-[#FAF6F0] p-4 flex items-center justify-between z-10 border-b border-[#D4AF37]/40">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-code bg-[#D4AF37] text-[#2B080D] px-2.5 py-0.5 rounded font-bold uppercase">
              {project.category}
            </span>
            <span className="text-xs text-[#E2D7C7] font-serif-body italic hidden sm:inline">
              • Academic Feature Article
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-[#4A0E17] hover:bg-[#A3283B] text-[#FAF6F0] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-10">
          {/* Article Header */}
          <div className="border-b border-[#800020]/20 pb-6 mb-8 text-center sm:text-left">
            <span className="text-xs font-mono-code text-[#800020] font-bold tracking-widest uppercase">
              {project.status} • {project.date}
            </span>
            <h1 className="font-serif-display text-3xl sm:text-5xl font-black text-[#800020] mt-2 mb-3 leading-tight">
              {project.title}
            </h1>
            <p className="font-serif-body italic text-lg sm:text-xl text-[#574B4E] max-w-2xl">
              {project.subtitle}
            </p>

            {/* Byline + Metadata */}
            <div className="flex flex-wrap items-center gap-4 mt-6 text-xs font-sans-ui text-[#574B4E] border-t border-b border-[#800020]/15 py-3">
              <span>By <strong>Karl David Z. Ocfemia</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#800020]" /> {project.readTime}</span>
              <span>•</span>
              <span>Bicol University Polangui</span>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-1 text-[#800020] hover:underline font-bold"
                >
                  <Github className="w-3.5 h-3.5" /> Repository
                </a>
              )}
            </div>
          </div>

          {/* Lead Quote Callout */}
          <blockquote className="my-6 p-5 bg-[#F2EBE1] border-l-4 border-[#800020] font-serif-body italic text-lg text-[#1C1618] rounded-r shadow-xs">
            &ldquo;{project.leadQuote}&rdquo;
          </blockquote>

          {/* System Architecture & Overview */}
          <div className={`space-y-6 font-serif-body text-[#1C1618] leading-relaxed ${fontClass}`}>
            <div>
              <h2 className="font-serif-display text-xl font-bold text-[#800020] border-b border-[#800020]/20 pb-1 mb-2">
                1. Problem Statement
              </h2>
              <p className="drop-cap">{project.problem}</p>
            </div>

            <div>
              <h2 className="font-serif-display text-xl font-bold text-[#800020] border-b border-[#800020]/20 pb-1 mb-2">
                2. Architectural Solution
              </h2>
              <p>{project.solution}</p>
            </div>

            {/* Embedded Live Interactive Tool */}
            {project.id === 'course-management-system' && (
              <div className="my-8">
                <InteractiveSqlSandbox />
              </div>
            )}

            {project.id === 'inventory-tracker-python' && (
              <div className="my-8">
                <InteractivePythonConsole />
              </div>
            )}

            {project.id === 'memory-ticketing-system' && (
              <div className="my-8">
                <InteractiveMemoryTicketing />
              </div>
            )}

            {project.id === 'editorial-pomodoro-timer' && (
              <div className="my-8">
                <InteractivePomodoroTimer />
              </div>
            )}

            {project.id === 'notion-workspace-clone' && (
              <div className="my-8">
                <InteractiveNotionClone />
              </div>
            )}

            {/* Relational Schema Diagram / Table Preview */}
            {project.schemaInfo && (
              <div className="my-6 bg-[#F2EBE1] p-5 rounded border border-[#E2D7C7]">
                <h3 className="font-serif-display text-lg font-bold text-[#800020] mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#800020]" /> Normalized Database Schema Structure
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono-code text-xs">
                  {project.schemaInfo.tables.map((tbl, i) => (
                    <div key={i} className="bg-[#FAF6F0] p-3 rounded border border-[#800020]/30">
                      <p className="font-bold text-[#800020] border-b border-[#800020]/20 pb-1 mb-1.5">
                        Table: {tbl.name}
                      </p>
                      <ul className="space-y-0.5 text-[#574B4E]">
                        {tbl.columns.map((col, cIdx) => (
                          <li key={cIdx} className="flex items-center gap-1">
                            <span className="text-[#800020]">•</span> {col}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Code Snippets Section */}
            {project.codeSnippets.map((snippet, idx) => (
              <div key={idx} className="my-6">
                <h3 className="font-serif-display text-lg font-bold text-[#800020] mb-2">
                  Code Analysis: {snippet.title}
                </h3>
                <p className="text-sm font-sans-ui text-[#574B4E] mb-2">{snippet.explanation}</p>
                <div className="bg-[#2B080D] text-[#FAF6F0] p-4 rounded-lg font-mono-code text-xs overflow-x-auto border border-[#800020]">
                  <pre>{snippet.code}</pre>
                </div>
              </div>
            ))}

            {/* Key Learnings */}
            <div className="bg-[#F2EBE1] p-6 rounded-lg border border-[#E2D7C7]">
              <h3 className="font-serif-display text-xl font-bold text-[#800020] mb-3">
                Key Computer Science & Engineering Takeaways
              </h3>
              <ul className="space-y-2 font-sans-ui text-sm text-[#1C1618]">
                {project.keyLearnings.map((learning, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#800020] mt-0.5 shrink-0" />
                    <span>{learning}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Action */}
          <div className="mt-8 pt-6 border-t border-[#800020]/20 flex justify-end">
            <button
              onClick={onClose}
              className="bg-[#800020] text-[#FAF6F0] hover:bg-[#4A0E17] font-sans-ui font-semibold text-sm px-6 py-2.5 rounded shadow cursor-pointer transition-colors"
            >
              Close Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
