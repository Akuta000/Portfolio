import React, { useState } from 'react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../data/portfolioData';
import { Mail, Phone, MapPin, Send, CheckCircle, Newspaper, ExternalLink, User } from 'lucide-react';
import { FacebookIcon, InstagramIcon } from './SocialIcons';
import { ParallaxHeader, ParallaxWrapper } from './Parallax';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('240-Hour Internship Inquiry');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [dispatchReceipt, setDispatchReceipt] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const receiptNo = `DISPATCH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setDispatchReceipt(receiptNo);
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page Header */}
      <ParallaxHeader
        badge={
          <span className="text-xs font-sans-ui text-[#800020] uppercase font-bold tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
            <Mail className="w-4 h-4 text-[#800020]" /> Contact &amp; Inquiries
          </span>
        }
        title="Contact Me"
        subtitle="Get in touch with Karl David Z. Ocfemia for software projects, literary collaborations, or general inquiries."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Contact Form (7 Cols) */}
        <ParallaxWrapper className="lg:col-span-7" speed={0.1}>
          <div className="bg-[#FAF6F0] border-2 border-[#800020] rounded-xl p-6 sm:p-8 shadow-md">
            <div className="border-b border-[#800020]/20 pb-3 mb-6">
              <h2 className="font-serif-display text-2xl font-bold text-[#800020]">
                Send a Message
              </h2>
              <p className="font-serif-body italic text-xs text-[#574B4E]">
                Direct message to Karl&apos;s email.
              </p>
            </div>

            {submitted ? (
              <div className="bg-[#2B080D] text-[#FAF6F0] p-6 rounded-lg border border-[#800020] space-y-4">
                <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-lg font-serif-display">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37]" />
                  <span>Dispatch Confirmed & Transmitted</span>
                </div>
                <div className="bg-[#1C0B0E] p-4 rounded border border-[#800020] font-mono-code text-xs space-y-2 text-[#E2D7C7]">
                  <p className="text-[#D4AF37] font-bold">RECEIPT #: {dispatchReceipt}</p>
                  <p><strong>From:</strong> {name} ({email})</p>
                  <p><strong>Category:</strong> {category}</p>
                  <p><strong>Subject:</strong> {subject || 'General Inquiry'}</p>
                  <p className="italic border-t border-[#800020] pt-2 text-[#FAF6F0]">
                    &ldquo;{message}&rdquo;
                  </p>
                </div>
                <p className="text-xs text-[#E2D7C7]/80 font-serif-body">
                  Thank you for writing. Karl David Z. Ocfemia will review your dispatch and reply promptly via your provided email address.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                    setSubject('');
                  }}
                  className="bg-[#800020] text-[#FAF6F0] hover:bg-[#A3283B] font-sans-ui text-xs font-semibold px-4 py-2 rounded cursor-pointer transition-colors"
                >
                  Send Another Letter
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans-ui text-xs">
                <div>
                  <label className="block text-[#800020] font-bold mb-1">Inquiry Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#F2EBE1] border border-[#E2D7C7] p-2.5 rounded text-[#1C1618] focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020]"
                  >
                    <option value="240-Hour Internship Inquiry">240-Hour IT Internship Placement Inquiry</option>
                    <option value="The Inditers Literary Submission">The Inditers Literary Submission / Press Query</option>
                    <option value="Academic Project Collaboration">Academic Project Collaboration</option>
                    <option value="General Letter to Karl">General Letter to Karl</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#800020] font-bold mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Maria Santos / Hiring Manager"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#F2EBE1] border border-[#E2D7C7] p-2.5 rounded text-[#1C1618] focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#800020] font-bold mb-1">Your Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#F2EBE1] border border-[#E2D7C7] p-2.5 rounded text-[#1C1618] focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#800020] font-bold mb-1">Subject Line</label>
                  <input
                    type="text"
                    placeholder="e.g. IT Internship Opportunity / Project Review"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#F2EBE1] border border-[#E2D7C7] p-2.5 rounded text-[#1C1618] focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020]"
                  />
                </div>

                <div>
                  <label className="block text-[#800020] font-bold mb-1">Message Body *</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Write your letter or internship query here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#F2EBE1] border border-[#E2D7C7] p-2.5 rounded text-[#1C1618] focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020] font-serif-body"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#800020] hover:bg-[#4A0E17] text-[#FAF6F0] font-sans-ui font-bold text-sm py-3 px-6 rounded shadow flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Send className="w-4 h-4 text-[#D4AF37]" /> Transmit Dispatch Letter
                </button>
              </form>
            )}
          </div>
        </ParallaxWrapper>

        {/* Right Column: Direct Info (5 Cols) */}
        <ParallaxWrapper className="lg:col-span-5 space-y-6" speed={0.15}>
          {/* Official Contact Directory */}
          <div className="bg-[#2B080D] text-[#FAF6F0] p-6 sm:p-8 rounded-xl border border-[#800020] shadow-md">
            {/* Author Portrait Badge */}
            <div className="flex items-center gap-4 mb-5 pb-4 border-b border-[#800020] bg-[#1C0B0E] p-3 rounded-lg">
              <div className="w-12 h-12 rounded bg-[#800020] text-[#D4AF37] font-serif-display font-bold text-base flex items-center justify-center border border-[#D4AF37] shadow-xs shrink-0">
                KO
              </div>
              <div>
                <span className="text-[10px] font-mono-code bg-[#800020] text-[#D4AF37] px-2 py-0.5 rounded border border-[#D4AF37]/30 font-bold uppercase tracking-wider">
                  Direct Inquiries
                </span>
                <h3 className="font-serif-display text-lg font-bold text-[#FAF6F0] mt-1">
                  Karl David Z. Ocfemia
                </h3>
                <p className="font-serif-body text-xs text-[#E2D7C7] italic">
                  BS CS Student • BU Polangui
                </p>
              </div>
            </div>

            <h2 className="font-serif-display text-xl font-bold text-[#D4AF37] mb-4 border-b border-[#800020] pb-2 uppercase">
              Official Directory
            </h2>

            <div className="space-y-4 font-mono-code text-xs text-[#E2D7C7]">
              <div className="flex items-start gap-3 bg-[#1C0B0E] p-3 rounded border border-[#800020]">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#D4AF37] font-bold text-[10px] uppercase">Institutional Email</p>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:underline text-[#FAF6F0] break-all font-semibold">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#1C0B0E] p-3 rounded border border-[#800020]">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#D4AF37] font-bold text-[10px] uppercase">Mobile Contact</p>
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="hover:underline text-[#FAF6F0] font-semibold">
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#1C0B0E] p-3 rounded border border-[#800020]">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#D4AF37] font-bold text-[10px] uppercase">Campus Location</p>
                  <p className="text-[#FAF6F0]">Bicol University Polangui, Polangui, Albay, Philippines</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#1C0B0E] p-3 rounded border border-[#800020]">
                <Newspaper className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#D4AF37] font-bold text-[10px] uppercase">Publication Office</p>
                  <p className="text-[#FAF6F0]">The Inditers Office, Student Center, BU Polangui</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Profiles */}
          <div className="bg-[#FAF6F0] border-2 border-[#800020] rounded-xl p-6 shadow-md">
            <h3 className="font-serif-display text-xl font-bold text-[#800020] mb-3 border-b border-[#800020]/20 pb-2 uppercase">
              Social Media Profiles
            </h3>
            <p className="font-serif-body text-xs text-[#574B4E] mb-4">
              Connect with Karl across social networks.
            </p>

            <div className="space-y-3 font-sans-ui text-xs">
              <a
                href={SOCIAL_LINKS[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-[#1877F2]/10 border border-[#1877F2]/30 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <FacebookIcon className="w-5 h-5 text-[#1877F2] group-hover:text-white transition-colors" />
                  <div>
                    <span className="font-bold block">Facebook</span>
                    <span className="text-[11px] opacity-80">{SOCIAL_LINKS[0].handle}</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
              </a>

              <a
                href={SOCIAL_LINKS[1].url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-[#E4405F]/10 border border-[#E4405F]/30 text-[#E4405F] hover:bg-[#E4405F] hover:text-white transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <InstagramIcon className="w-5 h-5 text-[#E4405F] group-hover:text-white transition-colors" />
                  <div>
                    <span className="font-bold block">Instagram</span>
                    <span className="text-[11px] opacity-80">{SOCIAL_LINKS[1].handle}</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Quick Notice */}
          <div className="bg-[#F2EBE1] border border-[#E2D7C7] p-5 rounded-xl font-serif-body text-xs text-[#574B4E]">
            <h3 className="font-serif-display font-bold text-[#800020] mb-1 text-sm">
              Note for Hiring Managers & Recruiters
            </h3>
            <p>
              Karl David Z. Ocfemia is currently seeking a <strong>240-hour technology internship</strong> to satisfy undergraduate Computer Science requirements. He is prepared to provide transcript copies and academic endorsement letters upon request.
            </p>
          </div>
        </ParallaxWrapper>
      </div>
    </div>
  );
};
