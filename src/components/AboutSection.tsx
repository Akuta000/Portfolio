import React from 'react';
import { PERSONAL_INFO, EDUCATION_DATA, SKILLS_DATA, CHARACTER_REFERENCE, SOCIAL_LINKS } from '../data/portfolioData';
import { User, BookOpen, GraduationCap, Award, Feather, Code, CheckCircle, Mail, Phone, MapPin, Building2, Sparkles, ExternalLink } from 'lucide-react';
import { FacebookIcon, InstagramIcon } from './SocialIcons';
import { ParallaxHeader, ParallaxWrapper, ParallaxCard } from './Parallax';

interface AboutSectionProps {
  fontSize: 'sm' | 'base' | 'lg';
}

export const AboutSection: React.FC<AboutSectionProps> = ({ fontSize }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page Header */}
      <ParallaxHeader
        badge={
          <span className="text-xs font-sans-ui text-[#800020] uppercase font-bold tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
            <User className="w-4 h-4 text-[#800020]" /> About Me • Profile &amp; Background
          </span>
        }
        title="About Karl David Z. Ocfemia"
        subtitle="Computer Science Student at Bicol University Polangui &amp; Literary Editor of The Inditers."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Bio Column (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Bio Article */}
          <ParallaxWrapper speed={0.12}>
            <section className="bg-[#FAF6F0] border-2 border-[#800020] rounded-xl p-6 sm:p-8 shadow-md">
              {/* Featured Profile Header */}
              <div className="mb-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#F2EBE1] p-4 sm:p-5 rounded-lg border border-[#E2D7C7]">
                <div className="md:col-span-5 relative group overflow-hidden rounded-lg border-2 border-[#800020] shadow-md bg-[#800020] p-6 text-center text-[#FAF6F0] flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-[#FAF6F0] text-[#800020] border-2 border-[#D4AF37] font-serif-display font-bold text-2xl flex items-center justify-center mb-3 shadow-md">
                    KO
                  </div>
                  <span className="text-[10px] font-mono-code text-[#D4AF37] font-bold uppercase tracking-widest bg-[#2B080D] px-2.5 py-1 rounded border border-[#D4AF37]/30">
                    BU Polangui • Scholar
                  </span>
                </div>
                <div className="md:col-span-7 space-y-2">
                  <span className="text-xs font-mono-code bg-[#800020] text-[#D4AF37] px-2.5 py-1 rounded font-bold uppercase tracking-wider inline-block">
                    Scholar &amp; Editor Profile
                  </span>
                  <h3 className="font-serif-display text-2xl font-bold text-[#800020]">
                    Karl David Z. Ocfemia
                  </h3>
                  <p className="font-serif-body text-xs text-[#574B4E] italic">
                    BS Computer Science Scholar • Literary Editor, The Inditers
                  </p>
                  <p className="font-serif-body text-xs text-[#1C1618] leading-relaxed pt-1">
                    Academic scholar at Bicol University Polangui specializing in software systems, relational database architecture, and literary publishing.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-sans-ui text-[#800020]">
                    <span className="bg-[#FAF6F0] px-2.5 py-1 rounded border border-[#E2D7C7] font-semibold">
                      📍 Polangui, Albay
                    </span>
                    <span className="bg-[#FAF6F0] px-2.5 py-1 rounded border border-[#E2D7C7] font-semibold">
                      🎓 BU Polangui CS
                    </span>
                  </div>
                </div>
              </div>

              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#800020] mb-4 border-b border-[#800020]/20 pb-2">
                The Dual-Mind Philosophy: Code & Literature
              </h2>

              <div className="font-serif-body text-sm sm:text-base text-[#1C1618] leading-relaxed space-y-4">
                <p className="drop-cap">
                  My academic path at Bicol University Polangui is rooted in the conviction that technical competence and expressive communication are mutually reinforcing strengths. As an undergraduate pursuing a Bachelor of Science in Computer Science, I specialize in programming fundamentals, relational database design (SQL), and object-oriented software architecture in Python and Java.
                </p>
                <p>
                  Prior to entering computer science, I completed the Accountancy, Business, and Management (ABM) track at Marcial O. Ranola Memorial School. This foundation in business math, organizational accounting, and analytical logic shaped my structured approach to system requirements—allowing me to evaluate software projects not merely as lines of code, but as functional solutions that solve business problems.
                </p>
                <p>
                  Simultaneously, serving as the <strong>Literary Editor for <em>The Inditers</em></strong>, the official student publication of BU Polangui, has honed my narrative discipline, editing accuracy, and empathetic communication. Whether refining student essays or designing normalized database schemas, I apply the same core standard: removing noise, organizing structure, and delivering clear value.
                </p>
              </div>
            </section>
          </ParallaxWrapper>

          {/* Academic History Timeline */}
          <ParallaxWrapper speed={0.15}>
            <section className="bg-[#F2EBE1] border border-[#E2D7C7] rounded-xl p-6 sm:p-8">
              <h2 className="font-serif-display text-2xl font-bold text-[#800020] mb-6 flex items-center gap-2 border-b border-[#800020]/20 pb-2">
                <GraduationCap className="w-6 h-6 text-[#800020]" /> Educational Background
              </h2>

              <div className="space-y-6">
                {EDUCATION_DATA.map((edu, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-[#800020]">
                    <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-[#800020] border-2 border-[#FAF6F0]"></div>
                    <span className="text-xs font-mono-code text-[#800020] font-bold">
                      {edu.period}
                    </span>
                    <h3 className="font-serif-display text-lg font-bold text-[#1C1618] mt-0.5">
                      {edu.degree}
                    </h3>
                    <p className="font-serif-body italic text-xs text-[#574B4E] mb-1">
                      {edu.institution} • {edu.location}
                    </p>
                    {edu.details && (
                      <p className="font-serif-body text-xs text-[#1C1618] mt-2">
                        {edu.details}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </ParallaxWrapper>

          {/* Technical & Core Competencies Matrix */}
          <section className="bg-[#FAF6F0] border-2 border-[#800020] rounded-xl p-6 sm:p-8">
            <h2 className="font-serif-display text-2xl font-bold text-[#800020] mb-6 border-b border-[#800020]/20 pb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#800020]" /> Competency Matrix
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SKILLS_DATA.map((cat, idx) => (
                <div key={idx} className="bg-[#F2EBE1] p-5 rounded-lg border border-[#E2D7C7]">
                  <h3 className="font-serif-display text-base font-bold text-[#800020] mb-3 uppercase tracking-wider">
                    {cat.category}
                  </h3>
                  <ul className="space-y-2 text-xs font-sans-ui text-[#1C1618]">
                    {cat.items.map((item, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#800020] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Info Sidebar (4 Cols) */}
        <div className="lg:col-span-4 space-y-8">
          {/* Quick Contact Card */}
          <div className="bg-[#2B080D] text-[#FAF6F0] p-6 rounded-xl border border-[#800020] shadow-md">
            <h3 className="font-serif-display text-xl font-bold text-[#D4AF37] mb-3 border-b border-[#800020] pb-2 uppercase">
              Direct Contact
            </h3>
            <div className="space-y-3 font-mono-code text-xs text-[#E2D7C7]">
              <div>
                <p className="text-[#D4AF37] font-bold text-[10px] uppercase">Email</p>
                <p className="break-all">{PERSONAL_INFO.email}</p>
              </div>
              <div>
                <p className="text-[#D4AF37] font-bold text-[10px] uppercase">Phone</p>
                <p>{PERSONAL_INFO.phone}</p>
              </div>
              <div>
                <p className="text-[#D4AF37] font-bold text-[10px] uppercase">Location</p>
                <p>{PERSONAL_INFO.location}</p>
              </div>
              <div>
                <p className="text-[#D4AF37] font-bold text-[10px] uppercase">University</p>
                <p>{PERSONAL_INFO.institution}</p>
              </div>
            </div>
          </div>

          {/* Social Media Profiles */}
          <div className="bg-[#FAF6F0] border-2 border-[#800020] p-6 rounded-xl shadow-xs">
            <h3 className="font-serif-display text-xl font-bold text-[#800020] mb-3 border-b border-[#800020]/20 pb-2 uppercase">
              Social Profiles
            </h3>
            <div className="space-y-2.5 font-sans-ui text-xs">
              <a
                href={SOCIAL_LINKS[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded bg-[#F2EBE1] hover:bg-[#800020] hover:text-[#FAF6F0] text-[#1C1618] border border-[#E2D7C7] transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <FacebookIcon className="w-4 h-4 text-[#1877F2] group-hover:text-[#FAF6F0]" />
                  <span className="font-semibold">Facebook</span>
                </div>
                <span className="text-[11px] font-mono-code opacity-75">{SOCIAL_LINKS[0].handle}</span>
              </a>

              <a
                href={SOCIAL_LINKS[1].url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded bg-[#F2EBE1] hover:bg-[#800020] hover:text-[#FAF6F0] text-[#1C1618] border border-[#E2D7C7] transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <InstagramIcon className="w-4 h-4 text-[#E4405F] group-hover:text-[#FAF6F0]" />
                  <span className="font-semibold">Instagram</span>
                </div>
                <span className="text-[11px] font-mono-code opacity-75">{SOCIAL_LINKS[1].handle}</span>
              </a>
            </div>
          </div>

          {/* Activities & Involvement */}
          <div className="bg-[#FAF6F0] border-2 border-[#800020] p-6 rounded-xl shadow-xs">
            <h3 className="font-serif-display text-xl font-bold text-[#800020] mb-3 border-b border-[#800020]/20 pb-2 uppercase">
              Campus Leadership
            </h3>
            <ul className="space-y-3 font-serif-body text-xs text-[#1C1618]">
              <li className="flex items-start gap-2">
                <Feather className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                <div>
                  <strong>Literary Editor</strong> — <em>The Inditers</em> (Official Student Publication of BU Polangui)
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Code className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                <div>
                  <strong>Active Member</strong> — Computer Science Student Organization (BU Polangui)
                </div>
              </li>
            </ul>
          </div>

          {/* Character References */}
          <div className="bg-[#F2EBE1] border border-[#E2D7C7] p-6 rounded-xl">
            <h3 className="font-serif-display text-lg font-bold text-[#800020] mb-3 border-b border-[#800020]/20 pb-2 uppercase">
              Character Reference
            </h3>
            <div className="font-serif-body text-xs text-[#1C1618]">
              <p className="font-bold text-sm text-[#800020]">{CHARACTER_REFERENCE.name}</p>
              <p className="italic text-[#574B4E]">{CHARACTER_REFERENCE.role}</p>
              <p className="text-[#574B4E]">{CHARACTER_REFERENCE.institution}</p>
              <div className="mt-2 text-[11px] font-mono-code text-[#800020]">
                <p>📧 {CHARACTER_REFERENCE.email}</p>
                <p>📞 {CHARACTER_REFERENCE.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
