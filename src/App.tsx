import React, { useState } from 'react';
import { ViewMode, ProjectItem, WritingItem } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FrontPage } from './components/FrontPage';
import { CodeSection } from './components/CodeSection';
import { WritingSection } from './components/WritingSection';
import { AboutSection } from './components/AboutSection';
import { ResumeSection } from './components/ResumeSection';
import { ContactSection } from './components/ContactSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { WritingDetailModal } from './components/WritingDetailModal';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('frontpage');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedWriting, setSelectedWriting] = useState<WritingItem | null>(null);

  const handleSelectView = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] bg-tech-grid text-[#1C1618] flex flex-col font-sans-ui selection:bg-[#800020] selection:text-[#FAF6F0]">
      {/* Editorial Navigation Banner */}
      <Navbar
        currentView={currentView}
        onSelectView={handleSelectView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 w-full">
        {currentView === 'frontpage' && (
          <FrontPage
            onSelectProject={(proj) => setSelectedProject(proj)}
            onSelectWriting={(writing) => setSelectedWriting(writing)}
            onSelectView={handleSelectView}
            fontSize={fontSize}
          />
        )}

        {currentView === 'code' && (
          <CodeSection
            onSelectProject={(proj) => setSelectedProject(proj)}
            searchQuery={searchQuery}
            fontSize={fontSize}
          />
        )}

        {currentView === 'writing' && (
          <WritingSection
            onSelectWriting={(writing) => setSelectedWriting(writing)}
            searchQuery={searchQuery}
            fontSize={fontSize}
          />
        )}

        {currentView === 'about' && (
          <AboutSection fontSize={fontSize} />
        )}

        {currentView === 'resume' && (
          <ResumeSection />
        )}

        {currentView === 'contact' && (
          <ContactSection />
        )}
      </main>

      {/* Detailed Reading Modals */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        fontSize={fontSize}
      />

      <WritingDetailModal
        item={selectedWriting}
        onClose={() => setSelectedWriting(null)}
        fontSize={fontSize}
      />

      {/* Editorial Footer */}
      <Footer onSelectView={handleSelectView} />
    </div>
  );
}
