import React, { useState } from 'react';
import { PERSONAL_INFO, EDUCATION_DATA, SKILLS_DATA, PROJECT_EXPERIENCE_DATA, CHARACTER_REFERENCE, SOCIAL_LINKS } from '../data/portfolioData';
import { FileText, Printer, Copy, Check, Download, Mail, Phone, MapPin, ExternalLink, GraduationCap, Code, Briefcase, User } from 'lucide-react';
import { FacebookIcon, InstagramIcon } from './SocialIcons';
import { ParallaxBanner, ParallaxWrapper } from './Parallax';

export const ResumeSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const plainTextResume = `
KARL DAVID Z. OCFEMIA
Bachelor of Science in Computer Science
Bicol University Polangui Campus | Polangui, Albay
Phone: ${PERSONAL_INFO.phone} | Email: ${PERSONAL_INFO.email}
Facebook: ${SOCIAL_LINKS[0].url}
Instagram: ${SOCIAL_LINKS[1].url}

OBJECTIVE
${PERSONAL_INFO.objective}

EDUCATION
- Bachelor of Science in Computer Science | Bicol University Polangui Campus | 2023 - Present
- Senior High School — ABM Track | Marcial O. Ranola Memorial School | 2021 - 2023
- Junior High School | Bicol Regional Science High School | 2017 - 2021

TECHNICAL SKILLS
- Programming & Development: Python, Java, HTML/CSS, SQL, OOP, variables, loops, conditionals
- Tools & Software: Git/GitHub, MS Office Suite, Windows & Linux CLI
- Core Competencies: Analytical thinking, adaptability, multitasking, attention to detail

ACADEMIC PROJECTS
- Course Management System (Database Class Project, 2023): Designed & implemented relational DB schema, SQL CRUD queries.
- Personal Portfolio Website (2023): Built static responsive portfolio with HTML/CSS.
- Inventory Tracker (Python Console App, 2022): Text-based inventory system with file I/O & OOP.

ACTIVITIES & INVOLVEMENT
- Literary Editor, The Inditers — Official Student Publication of Bicol University Polangui
- Member, Computer Science Student Organization — Bicol University Polangui

CHARACTER REFERENCES
- Mary Antoniette S. Ariño | Instructor III, Bicol University Polangui
  Email: ${CHARACTER_REFERENCE.email} | Phone: ${CHARACTER_REFERENCE.phone}
`.trim();

  const handleCopyText = () => {
    navigator.clipboard.writeText(plainTextResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Action Header (Hidden during printing) */}
      <ParallaxBanner className="no-print bg-[#F2EBE1] border-2 border-[#800020] rounded-xl p-4 sm:p-6 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-sans-ui text-[#800020] uppercase font-bold tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-[#800020]" /> Resume • Curriculum Vitae
          </span>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-black text-[#800020] mt-0.5">
            Karl David Z. Ocfemia — Resume
          </h1>
          <p className="font-serif-body italic text-xs text-[#574B4E]">
            Formatted for clear reading, applications, and PDF printing.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopyText}
            className="bg-[#FAF6F0] hover:bg-[#800020] text-[#800020] hover:text-[#FAF6F0] font-sans-ui font-semibold text-xs px-4 py-2 rounded border border-[#800020] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied Resume' : 'Copy Plaintext'}
          </button>

          <button
            onClick={handlePrint}
            className="bg-[#800020] hover:bg-[#4A0E17] text-[#FAF6F0] font-sans-ui font-bold text-xs px-5 py-2 rounded shadow flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Printer className="w-4 h-4 text-[#D4AF37]" /> Print / Export PDF
          </button>
        </div>
      </ParallaxBanner>

      {/* Actual Printable Resume Document Sheet */}
      <ParallaxWrapper speed={0.1}>
        <div className="bg-white text-black p-8 sm:p-12 rounded-xl shadow-xl border border-gray-300 font-sans-ui print:shadow-none print:border-none print:p-0">
        {/* Header */}
        <div className="border-b-2 border-[#800020] pb-4 mb-6 flex flex-col-reverse sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#800020]">
              KARL DAVID Z. OCFEMIA
            </h1>
            <p className="text-sm font-semibold text-gray-700 italic mt-0.5">
              Bachelor of Science in Computer Science
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600 mt-2 font-mono-code">
              <span>• Bicol University Polangui, Polangui, Albay</span>
              <span>• Phone: {PERSONAL_INFO.phone}</span>
              <span>• Email: {PERSONAL_INFO.email}</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#800020] mt-1 font-mono-code font-semibold">
              <a href={SOCIAL_LINKS[0].url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                <FacebookIcon className="w-3.5 h-3.5 text-[#1877F2]" /> Facebook
              </a>
              <a href={SOCIAL_LINKS[1].url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                <InstagramIcon className="w-3.5 h-3.5 text-[#E4405F]" /> Instagram
              </a>
            </div>
          </div>

          {/* Official Applicant Photograph Badge */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="w-24 h-28 sm:w-28 sm:h-32 border-2 border-[#800020] rounded shadow-xs bg-[#800020] text-[#FAF6F0] flex flex-col items-center justify-center p-2 text-center">
              <div className="w-12 h-12 rounded-full bg-[#FAF6F0] text-[#800020] font-serif-display font-bold text-lg flex items-center justify-center mb-1 border border-[#D4AF37]">
                KO
              </div>
              <span className="text-[9px] font-mono-code text-[#D4AF37] font-bold uppercase tracking-tight">
                BU Polangui
              </span>
            </div>
            <span className="text-[9px] font-mono-code text-gray-500 mt-1 uppercase tracking-tight">
              Official Profile
            </span>
          </div>
        </div>

        {/* Objective */}
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#800020] border-b border-gray-300 pb-1 mb-2 font-mono-code">
            OBJECTIVE
          </h2>
          <p className="text-xs text-gray-800 leading-relaxed font-serif-body">
            {PERSONAL_INFO.objective}
          </p>
        </section>

        {/* Education */}
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#800020] border-b border-gray-300 pb-1 mb-3 font-mono-code">
            EDUCATION
          </h2>
          <div className="space-y-3 text-xs">
            {EDUCATION_DATA.map((edu, idx) => (
              <div key={idx}>
                <div className="flex justify-between font-bold text-gray-900">
                  <span>{edu.degree}</span>
                  <span className="font-mono-code text-gray-600">{edu.period}</span>
                </div>
                <div className="text-gray-700 italic">{edu.institution} | {edu.location}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#800020] border-b border-gray-300 pb-1 mb-3 font-mono-code">
            TECHNICAL SKILLS
          </h2>
          <div className="space-y-3 text-xs">
            <div>
              <p className="font-bold text-gray-900 mb-1">Programming & Development</p>
              <ul className="list-disc list-inside space-y-0.5 text-gray-800 pl-1">
                <li>Proficient in programming fundamentals: variables, loops, conditionals, functions, and OOP concepts</li>
                <li>Working knowledge of Python and Java for basic data processing and console-based applications</li>
                <li>Familiar with HTML and CSS for front-end web page structure and styling</li>
                <li>Exposure to database concepts and basic SQL queries</li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-gray-900 mb-1">Tools & Software</p>
              <ul className="list-disc list-inside space-y-0.5 text-gray-800 pl-1">
                <li>Microsoft Office Suite: Word, Excel, PowerPoint (proficient)</li>
                <li>Familiar with version control fundamentals (Git/GitHub)</li>
                <li>Comfortable with Windows and Linux command-line environments</li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-gray-900 mb-1">Core Competencies</p>
              <ul className="list-disc list-inside space-y-0.5 text-gray-800 pl-1">
                <li>Analytical thinking and structured problem-solving</li>
                <li>Adaptable to different working environments and team dynamics</li>
                <li>Capable of multitasking under varying workloads</li>
                <li>Quick learner with attention to detail</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Academic Projects */}
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#800020] border-b border-gray-300 pb-1 mb-3 font-mono-code">
            ACADEMIC PROJECTS
          </h2>
          <div className="space-y-4 text-xs">
            {PROJECT_EXPERIENCE_DATA.map((proj, idx) => (
              <div key={idx}>
                <div className="flex justify-between font-bold text-gray-900">
                  <span>{proj.title}</span>
                  <span className="font-mono-code text-gray-600">{proj.year}</span>
                </div>
                <div className="text-gray-700 italic mb-1">{proj.type} | {proj.institution}</div>
                <ul className="list-disc list-inside space-y-0.5 text-gray-800 pl-1">
                  {proj.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Activities & Involvement */}
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#800020] border-b border-gray-300 pb-1 mb-2 font-mono-code">
            ACTIVITIES & INVOLVEMENT
          </h2>
          <ul className="list-disc list-inside space-y-1 text-xs text-gray-800 pl-1">
            <li>Member, Computer Science Student Organization — Bicol University Polangui</li>
            <li>Literary Editor, The Inditers — Official Student Publication of Bicol University Polangui</li>
          </ul>
        </section>

        {/* Character References */}
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#800020] border-b border-gray-300 pb-1 mb-2 font-mono-code">
            CHARACTER REFERENCES
          </h2>
          <div className="text-xs text-gray-800">
            <p className="font-bold text-gray-900">• MARY ANTONIETTE S. ARIÑO</p>
            <p className="italic">{CHARACTER_REFERENCE.role}, Bicol University Polangui</p>
            <p className="font-mono-code">Email: {CHARACTER_REFERENCE.email} | Phone: {CHARACTER_REFERENCE.phone}</p>
          </div>
        </section>

        {/* Certification */}
        <div className="pt-6 border-t border-gray-200 text-xs text-gray-600 italic text-center font-serif-body">
          I hereby certify that the above information is true and correct to the best of my knowledge.
          <p className="font-bold text-gray-900 uppercase font-sans-ui mt-2 not-italic">
            KARL DAVID Z. OCFEMIA
          </p>
          <span className="text-[10px] text-gray-500">Applicant</span>
        </div>
      </div>
    </ParallaxWrapper>
  </div>
  );
};
