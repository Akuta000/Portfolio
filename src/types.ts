export type ViewMode = 'frontpage' | 'code' | 'writing' | 'about' | 'resume' | 'contact';

export type WritingCategory = 'All' | 'Articles' | 'Essays' | 'Poems' | 'Editorials' | 'Opinions' | 'Folio / Facebook Posts';

export type CodeCategory = 'All' | 'Database / SQL' | 'Web Development' | 'Python / Console' | 'Algorithms';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  category: CodeCategory;
  tags: string[];
  status: 'Live Demo' | 'In Progress' | 'Archived' | 'Class Project';
  readTime: string;
  leadQuote: string;
  summary: string;
  problem: string;
  solution: string;
  keyLearnings: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  codeSnippets: {
    title: string;
    language: string;
    code: string;
    explanation: string;
  }[];
  schemaInfo?: {
    tables: { name: string; columns: string[] }[];
  };
}

export interface WritingItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  category: 'Article' | 'Essay' | 'Poem' | 'Editorial' | 'Opinion' | 'Folio / Facebook Post';
  publication: string; // e.g. "The Inditers — Official Student Publication"
  readTime: string;
  leadQuote: string;
  excerpt: string;
  content: string[]; // paragraphs or stanzas
  isPoem?: boolean;
  featured?: boolean;
  tags: string[];
  facebookUrl?: string;
  imageUrl?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  details?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ProjectExperience {
  title: string;
  type: string;
  institution: string;
  year: string;
  bullets: string[];
}
