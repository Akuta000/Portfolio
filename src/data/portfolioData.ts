import { ProjectItem, WritingItem, EducationItem, SkillCategory, ProjectExperience } from '../types';

export const PERSONAL_INFO = {
  name: 'Karl David Z. Ocfemia',
  title: 'Computer Science Student & Literary Editor',
  tagline: 'Bridging Software Systems & Humanist Narrative in Polangui, Albay',
  institution: 'Bicol University Polangui Campus',
  email: 'kdzo2023-7478-31074@bicol-u.edu.ph',
  phone: '09564382996',
  location: 'Polangui, Albay, Philippines',
  publicationRole: 'Literary Editor, The Inditers (Official Student Publication)',
  objective: 'Motivated Computer Science student seeking a technology-based internship (240 hours) where I can apply programming fundamentals and IT knowledge in real-world settings. Committed to contributing meaningfully while continuously developing practical skills aligned with the needs of the ICT industry.',
  bio: `Karl David Z. Ocfemia is a Computer Science scholar at Bicol University Polangui and the Literary Editor of 'The Inditers', the official student publication of BU Polangui. Combining a rigorous background in Accountancy, Business, and Management (ABM) with structural computer science problem-solving, Karl explores the intersection of relational database systems, console software design, and expressive literary arts.`,
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'course-management-system',
    title: 'Course Management System',
    subtitle: 'Relational Database Schema & SQL Execution Engine',
    date: '2023',
    category: 'Database / SQL',
    tags: ['SQL', 'Relational DB', 'Database Design', 'CRUD Operations'],
    status: 'Class Project',
    readTime: '6 min read',
    leadQuote: 'Normalizing complex academic records into clean 3NF relational schemas for predictable data integrity.',
    summary: 'Designed and implemented a relational database schema to manage student, course, and enrollment records for Bicol University Polangui. Executed complex SQL queries for CRUD operations and presented findings to class.',
    problem: 'Academic records at university departments often suffer from data redundancy, inconsistent course enrollment tracking, and slow query execution when aggregating student grade records across semesters.',
    solution: 'Engineered a normalized database schema in Third Normal Form (3NF) containing Students, Courses, Departments, Instructors, and Enrollments tables with foreign key constraints, index optimization, and reusable CRUD stored views.',
    keyLearnings: [
      'Mastered Primary/Foreign key constraints and CASCADE rules for integrity.',
      'Constructed complex SQL JOINs (INNER, LEFT OUTER) for student transcript generation.',
      'Optimized aggregation queries (GROUP BY, HAVING, COUNT, AVG) for grade point calculation.',
      'Delivered a technical presentation and live database demo to faculty and peers.'
    ],
    featured: true,
    githubUrl: 'https://github.com/karldavidocfemia/course-management-db',
    codeSnippets: [
      {
        title: 'Database Schema DDL (Student & Enrollment Tables)',
        language: 'sql',
        code: `CREATE TABLE Students (
    student_id VARCHAR(20) PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    program VARCHAR(100) DEFAULT 'BS Computer Science',
    year_level INT CHECK (year_level BETWEEN 1 AND 4)
);

CREATE TABLE Courses (
    course_code VARCHAR(15) PRIMARY KEY,
    course_title VARCHAR(100) NOT NULL,
    units INT NOT NULL CHECK (units > 0),
    department VARCHAR(50) NOT NULL
);

CREATE TABLE Enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(20),
    course_code VARCHAR(15),
    semester VARCHAR(20) NOT NULL,
    academic_year VARCHAR(10) NOT NULL,
    final_grade DECIMAL(3,2),
    FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_code) REFERENCES Courses(course_code) ON DELETE CASCADE
);`,
        explanation: 'SQL Data Definition Language establishing referential integrity, constraints, and cascading deletes.'
      },
      {
        title: 'Complex Grade Aggregation Query',
        language: 'sql',
        code: `SELECT 
    s.student_id,
    CONCAT(s.last_name, ', ', s.first_name) AS full_name,
    COUNT(e.course_code) AS courses_enrolled,
    ROUND(AVG(e.final_grade), 2) AS gpa
FROM Students s
JOIN Enrollments e ON s.student_id = e.student_id
WHERE e.academic_year = '2023-2024'
GROUP BY s.student_id, s.last_name, s.first_name
HAVING gpa <= 2.00
ORDER BY gpa ASC;`,
        explanation: 'SQL aggregation statement retrieving top-performing students based on weighted GPA calculation.'
      }
    ],
    schemaInfo: {
      tables: [
        { name: 'Students', columns: ['student_id (PK)', 'first_name', 'last_name', 'email', 'program', 'year_level'] },
        { name: 'Courses', columns: ['course_code (PK)', 'course_title', 'units', 'department'] },
        { name: 'Enrollments', columns: ['enrollment_id (PK)', 'student_id (FK)', 'course_code (FK)', 'semester', 'academic_year', 'final_grade'] },
        { name: 'Instructors', columns: ['instructor_id (PK)', 'name', 'email', 'department'] }
      ]
    }
  },
  {
    id: 'inventory-tracker-python',
    title: 'Inventory Tracker — Python Console Application',
    subtitle: 'Text-Based Asset Management with File I/O & OOP Architecture',
    date: '2022',
    category: 'Python / Console',
    tags: ['Python', 'Object-Oriented Programming', 'File I/O', 'Console UI'],
    status: 'Class Project',
    readTime: '5 min read',
    leadQuote: 'Building robust terminal software with modular class hierarchies, persistent JSON/CSV file storage, and defensive exception handling.',
    summary: 'Developed a text-based inventory management system in Python demonstrating modular OOP design, persistent file storage, stock threshold alerts, and robust error checking.',
    problem: 'Small retail stores and student laboratory rooms require simple, reliable inventory tracking without requiring heavy graphical overhead or cloud connectivity.',
    solution: 'Created an object-oriented Python console system with Item, Inventory, and FileHandler classes. Features automated stock level calculations, price auditing, search filtering, and automatic state saving to disk.',
    keyLearnings: [
      'Applied OOP principles: Encapsulation (private attributes), Inheritance, and Polymorphism.',
      'Implemented robust File I/O with JSON serialization for seamless offline data persistence.',
      'Designed user-friendly terminal UI with structured ascii tables and input validation.',
      'Handled file missing exceptions and edge-case validation gracefully.'
    ],
    featured: true,
    githubUrl: 'https://github.com/karldavidocfemia/python-inventory-tracker',
    codeSnippets: [
      {
        title: 'Inventory Item Class Definition (Python)',
        language: 'python',
        code: `import json

class InventoryItem:
    def __init__(self, item_id: str, name: str, category: str, quantity: int, unit_price: float):
        self.item_id = item_id
        self.name = name
        self.category = category
        self.quantity = quantity
        self.unit_price = unit_price

    def total_value((self) -> float:
        return self.quantity * self.unit_price

    def to_dict(self) -> dict:
        return {
            "id": self.item_id,
            "name": self.name,
            "category": self.category,
            "quantity": self.quantity,
            "price": self.unit_price
        }

    def __str__(self) -> str:
        return f"[{self.item_id}] {self.name:<20} | Qty: {self.quantity:>3} | Price: ₱{self.unit_price:>8.2f} | Total: ₱{self.total_value():>10.2f}"`,
        explanation: 'Item model representing single catalog records with calculated properties and dictionary formatting.'
      }
    ]
  },
  {
    id: 'personal-portfolio-website',
    title: 'Personal Portfolio Web Engine',
    subtitle: 'Responsive HTML/CSS Front-End Architecture',
    date: '2023',
    category: 'Web Development',
    tags: ['HTML5', 'CSS3', 'Responsive Design', 'Web Architecture'],
    status: 'Live Demo',
    readTime: '4 min read',
    leadQuote: 'Crafting clean, accessible web pages using semantic HTML elements, CSS grid layouts, and cross-device media queries.',
    summary: 'Built a static portfolio website using HTML and CSS to showcase academic projects and technical competencies, incorporating mobile-first responsive principles.',
    problem: 'Static student websites often break on mobile screens or fail basic semantic accessibility standards.',
    solution: 'Designed a light, structured layout using HTML5 sectioning elements (<header>, <main>, <article>, <footer>) and CSS Flexbox/Grid for fluid desktop and smartphone rendering.',
    keyLearnings: [
      'Mastered mobile-first media query breakpoints for smooth responsiveness.',
      'Applied semantic HTML for screen reader compatibility and clean layout structure.',
      'Utilized CSS custom variables for streamlined color theme consistency.'
    ],
    featured: true,
    githubUrl: 'https://github.com/karldavidocfemia/personal-portfolio-2023',
    codeSnippets: [
      {
        title: 'CSS Grid & Responsive Layout System',
        language: 'css',
        code: `.portfolio-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  padding: 1rem;
}

@media (min-width: 768px) {
  .portfolio-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

@media (min-width: 1024px) {
  .portfolio-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}`,
        explanation: 'Responsive CSS Grid rule scaling from single column on mobile to three columns on desktop screens.'
      }
    ]
  },
  {
    id: 'memory-ticketing-system',
    title: 'Memory Event Ticketing Engine',
    subtitle: 'In-Memory Concurrency Control & Real-Time Seat Allocation System',
    date: '2024',
    category: 'Web Development',
    tags: ['TypeScript', 'React', 'Event Ticketing', 'State Management', 'In-Memory Cache', 'UI System'],
    status: 'Live Demo',
    readTime: '5 min read',
    leadQuote: 'Preventing double-booking race conditions during high-demand event drops using optimistic in-memory lock tables.',
    summary: 'Designed an interactive memory-backed event ticketing platform featuring real-time seat map allocation, ticket hold countdown timers, and digital QR admission token generation.',
    problem: 'High-demand ticket drops for university campus events frequently suffer from database transaction lock contention and race conditions where multiple users claim the same seat simultaneously.',
    solution: 'Engineered an in-memory optimistic locking engine that reserves selected seat IDs immediately upon user click, applies 10-minute hold expiration windows, and generates unique encrypted admission UUID passes.',
    keyLearnings: [
      'Implemented optimistic concurrency locking for high-density 200+ seat grids.',
      'Engineered countdown hold timers with auto-release mechanisms on timeout.',
      'Generated digital QR admission tokens and ticket metadata summaries.'
    ],
    featured: true,
    githubUrl: 'https://github.com/karldavidocfemia/memory-ticketing-system',
    codeSnippets: [
      {
        title: 'In-Memory Seat Locking Mechanism (TypeScript)',
        language: 'typescript',
        code: `export interface SeatLock {
  seatId: string;
  userId: string;
  lockedAt: number;
  expiresAt: number;
}

export class MemoryTicketingEngine {
  private locks: Map<string, SeatLock> = new Map();

  public tryLockSeat(seatId: string, userId: string, holdMs: number = 600000): boolean {
    const existing = this.locks.get(seatId);
    const now = Date.now();

    if (existing && existing.expiresAt > now && existing.userId !== userId) {
      return false; // Seat currently locked by another user
    }

    this.locks.set(seatId, {
      seatId,
      userId,
      lockedAt: now,
      expiresAt: now + holdMs
    });
    return true;
  }
}`,
        explanation: 'In-memory seat lock table validating timestamp bounds and preventing double-booking.'
      }
    ]
  },
  {
    id: 'editorial-pomodoro-timer',
    title: 'Editorial Focus Pomodoro Engine',
    subtitle: 'Minimalist Time-Boxing & Productivity Workstation for Writers',
    date: '2024',
    category: 'Web Development',
    tags: ['React', 'TypeScript', 'Pomodoro Engine', 'Audio API', 'Productivity', 'Tailwind CSS'],
    status: 'Live Demo',
    readTime: '4 min read',
    leadQuote: 'Balancing intense literary drafting and programming sessions through structured 25-minute focus intervals and soundscapes.',
    summary: 'A vintage newspaper-inspired Pomodoro timer tailored for literary publication writers and software engineers. Features time-boxing cycles, Web Audio synthesized chimes, task queues, and focus session analytics.',
    problem: 'Standard web timers are visually noisy, distracting, or lack integrated session logging for tracking long writing and coding hours.',
    solution: 'Constructed a minimalist distraction-free productivity workstation with Web Audio API chime synthesis, custom interval presets (25m focus / 5m short break / 15m long break), task checklist management, and persistent session logs.',
    keyLearnings: [
      'Utilized browser Web Audio API for harmonic sine-wave chime alerts without external asset latency.',
      'Designed responsive circular SVG progress dial animations with millisecond tracking.',
      'Structured daily focus session logs to quantify deep work time.'
    ],
    featured: true,
    githubUrl: 'https://github.com/karldavidocfemia/editorial-pomodoro-timer',
    codeSnippets: [
      {
        title: 'Web Audio API Chime Synthesis (TypeScript)',
        language: 'typescript',
        code: `export const playFocusChime = () => {
  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioCtx) return;

  const ctx = new AudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
  osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5

  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 1.2);
};`,
        explanation: 'Custom audio synthesis engine generating clean frequency notification tones.'
      }
    ]
  },
  {
    id: 'notion-workspace-clone',
    title: 'Notion-Inspired Minimalist Workspace Engine',
    subtitle: 'Block-Based Document Editor, Kanban Board & Workspace Notebook',
    date: '2024',
    category: 'Web Development',
    tags: ['React', 'TypeScript', 'Block Editor', 'Kanban Board', 'Local Storage', 'Notion Clone'],
    status: 'Live Demo',
    readTime: '6 min read',
    leadQuote: 'Empowering student writers and developers to organize prose, code blocks, and editorial tasks in a flexible workspace.',
    summary: 'An elegant imitation of Notion built with React and TypeScript. Features block-based document editing (headings, todos, code blocks, callouts), multi-page sidebar navigation, interactive drag-and-drop Kanban task boards, and Markdown export.',
    problem: 'Students and literary editors need a clean, offline-friendly workspace combining rich editorial prose formatting, code snippet blocks, and task status tracking.',
    solution: 'Architected a modular block data structure supporting real-time block insertion, task completion toggling, multi-page document switching, interactive Kanban boards, and instant Markdown source generation.',
    keyLearnings: [
      'Designed recursive block data structures supporting multiple block format types.',
      'Implemented dual-view UI switching between block document layouts and Kanban task boards.',
      'Engineered one-click Markdown serialization for seamless document export.'
    ],
    featured: true,
    githubUrl: 'https://github.com/karldavidocfemia/notion-workspace-clone',
    codeSnippets: [
      {
        title: 'Block Document Structure & Markdown Serializer (TypeScript)',
        language: 'typescript',
        code: `export interface Block {
  id: string;
  type: 'text' | 'h1' | 'h2' | 'todo' | 'code' | 'callout' | 'quote';
  content: string;
  completed?: boolean;
}

export const serializeToMarkdown = (title: string, blocks: Block[]): string => {
  let md = \`# \${title}\\n\\n\`;
  blocks.forEach((b) => {
    if (b.type === 'h1') md += \`# \${b.content}\\n\\n\`;
    else if (b.type === 'h2') md += \`## \${b.content}\\n\\n\`;
    else if (b.type === 'todo') md += \`- [\${b.completed ? 'x' : ' '}] \${b.content}\\n\`;
    else if (b.type === 'code') md += \`\`\`\\n\${b.content}\\n\`\`\`\\n\\n\`;
    else md += \`\${b.content}\\n\\n\`;
  });
  return md;
};`,
        explanation: 'Block serializer transforming document state into clean Markdown formatting.'
      }
    ]
  }
];

export const WRITING_DATA: WritingItem[] = [
  {
    id: 'fb-post-1DFdzNEyfN',
    title: '#TheInditersNowPlaying | 𝐈𝐤𝐨𝐭 by 𝐎𝐯𝐞𝐫 𝐎𝐜𝐭𝐨𝐛𝐞𝐫',
    subtitle: 'Mga salita ni Karl David Ocfemia, Literary Editor • Layout ni Kirby Cope, Online Content Editor',
    date: 'July 2026',
    category: 'Folio / Facebook Post',
    publication: 'The Inditers — Official Student Publication of BU Polangui',
    readTime: '3 min read',
    leadQuote: 'Araw-gabi, tanging ikaw ang nasa isip / Kahit laman ng panaginip ay ikaw.',
    excerpt: 'Ilang beses mo na bang naramdaman \'yung paulit-ulit mong iniisip ang isang tao, pero wala kang magawa kundi umikot lang sa sarili mong mga damdamin? Ganyan ang kwento ng kantang ito.',
    content: [
      'Ilang beses mo na bang naramdaman \'yung paulit-ulit mong iniisip ang isang tao, pero wala kang magawa kundi umikot lang sa sarili mong mga damdamin? Ganyan ang kwento ng kantang ito. Ang "paikot-ikot lang" ay hindi lamang metapora—ito ang eksaktong pakiramdam kapag minahal mo ang isang taong hindi mo alam kung paano haharapin.',
      'Hindi kailangan ng malalim na usapan, no grand gestures. Minsan, sapat na ang isang ngiti para gumuho ang lahat ng depensa mo. Minsan, isang tingin lang, tapos ikaw na \'yung tanga na umaasa. Pero mas kadalasang nakikita ang mga maliliit na detalye ng pagkakakilanlan.',
      '"Aasa na tayo sa huli"—ilang beses mo na bang sinabi \'to sa sarili mo? Ilang beses mo nang pinagpilitan na umasa kahit wala namang kasiguraduhan? Ngunit minsan, hindi kasiguraduhan ang tunay na mahalaga kundi ang sumisid nang hindi sigurado.',
      'Mahirap aminin sa sarili at mas mahirap aminin sa kanya. Pag sinabi mo, maaring \'yung meron kayo ngayon, kahit gaano pa \'yun ka-labo ay tuluyang maglaho. Baka mas gugustuhin mo pang manatili sa kalagitnaan kaysa malaman ang totoo at masaktan. Kaya nagtitimpi ka. Kaya tumatahimik ka. Kaya nag-iisip ka kung "ano tayo sa buhay ng isa\'t isa?" Pero hindi mo naman talaga gustong malaman ang sagot, sapagkat maaring hindi pala \'yun ang nais mong marinig.',
      'At dahil hindi mo masabi, nag-iisa ka na lang sa mundo ng iniisip mo: "Araw-gabi, tanging ikaw ang nasa isip / Kahit laman ng panaginip ay ikaw." Gising ka man o tulog, nandoon siya. Sakanya na lahat—lahat ng oras mo, lahat ng espasyo sa utak mo. Wala ka nang ibang magawa kundi isipin siya. Ito \'yung nakakapagod na parte ng one-sided love—consumed ka na, pero ikaw lang mag-isa sa mundong \'to.',
      'Mga salita ni Karl David Ocfemia, Literary Editor | Layout ni Kirby Cope, Online Content Editor'
    ],
    featured: true,
    tags: ['TheInditersNowPlaying', 'Ikot', 'Over October', 'Literary Desk', 'Facebook Post'],
    facebookUrl: 'https://www.facebook.com/share/p/1DFdzNEyfN/',
    imageUrl: 'https://scontent.flgp1-1.fna.fbcdn.net/v/t39.30808-6/559261636_1213779627438234_3290340199657727156_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x2048&ctp=s2048x2048&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHHuzwRgmCTrKUhvaNymDkVVrVf2ABCaDtWtV_YAEJoO0KM7d3eMWwYzYn4GcDzFGonwszcyWqnwswonSI0JEft&_nc_ohc=1GH_HkwKFmgQ7kNvwFOceD4&_nc_oc=AdoRajsbuSmPpLCf6THFuXLm7DwtoaZVtiUOxi74Iq-S2XJeUNuu6ZpYjTJ25ToU0os&_nc_zt=23&_nc_ht=scontent.flgp1-1.fna&_nc_gid=UJ30U-CGo89128JKR9b6pA&_nc_ss=7b2a8&oh=00_AQCOiTQkZRDQWhjiRby_xaD2bOcIYLw0jgJ4TnUJzVItTg&oe=6A661A37'
  },
  {
    id: 'fb-post-pfbid02c8aEszcoBerGGcg1B6iHa1TgCGvJwjmXHubScBepj9iUJ7Pm31s7ShahvtcNj9PPl',
    title: '𝐋𝐈𝐓𝐄𝐑𝐀𝐑𝐘 | 𝐓𝐡𝐞 𝐔𝐧𝐛𝐞𝐚𝐫𝐚𝐛𝐥𝐞 𝐖𝐞𝐢𝐠𝐡𝐭 𝐨𝐟 𝐁𝐞𝐢𝐧𝐠',
    subtitle: 'Words by Karl David Ocfemia, Literary Editor • Illustration by Angelica Eunice Fernandez, Cartoonist',
    date: 'July 2026',
    category: 'Poem',
    publication: 'The Inditers — Official Student Publication of BU Polangui',
    readTime: '2 min read',
    leadQuote: 'To live freely but sincerely is where my prayer lies, / To be free of bated breaths and to be honest about what this is',
    excerpt: 'What man under the burden of thousands of silent mornings, / Does not ask without carrying hope and utterance of a single word: "For which reason must I go on?"',
    isPoem: true,
    content: [
      'What man under the burden of thousands of silent mornings,\nDoes not ask without carrying hope and utterance of a single word\n"For which reason must I go on?"',
      'The waking of sunrise\nBreathed not life but a continuance of judgment\nEach second feeling nothing more than a tribunal',
      'One says that life is holy\nBut I do not feel sanctity in this repitition\nAs if though an experiment left to rot\nWhen all you\'ve done is survive',
      'When your soul cries out for fire or even indignity,\nWhat meaning shall it hold',
      'I wish not a hero\'s death nor a coward\'s flight,\nBut as a man weary of justifying his breath\nTo the silence that deigned to answer',
      'To live freely but sincerely is where my prayer lies,\nTo be free of bated breaths and to be honest about what this is',
      'Words by Karl David Ocfemia, Literary Editor | Illustration by Angelica Eunice Fernandez, Cartoonist'
    ],
    featured: true,
    tags: ['Literary', 'TheUnbearableWeightOfBeing', 'Poem', 'TheInditers', 'FacebookPost'],
    facebookUrl: 'https://www.facebook.com/Inditers/posts/pfbid02c8aEszcoBerGGcg1B6iHa1TgCGvJwjmXHubScBepj9iUJ7Pm31s7ShahvtcNj9PPl?rdid=zQkaRdjegNyFb4oX#',
    imageUrl: 'https://scontent.flgp1-1.fna.fbcdn.net/v/t39.30808-6/561789667_1218560050293525_7867660751537211376_n.jpg?stp=dst-jpg_tt6&cstp=mx1617x2048&ctp=s1617x2048&_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGU36Dbp1_RlWz9m1tfyRSQDBvwD384kd0MG_APfziR3aC3BGZE7k8IWVRv6Il5BJAq2hb-rjH3J3urD2fMLH8W&_nc_ohc=CCfQEnMlIRYQ7kNvwGtd-0o&_nc_oc=AdrshUHFcoumoWsvixcVqQ8Z8SaiVGg8ZYFDf_J-Nd3X8eXJ5I154ICbJRbGG9T6EFw&_nc_zt=23&_nc_ht=scontent.flgp1-1.fna&_nc_gid=Vc0-R0tHdaizFPYnT3orYA&_nc_ss=7b2a8&oh=00_AQBIBe7IkSWTS47DOoxhx7qKzQ-hTwcLpanwgVvGTiDyuA&oe=6A6635C9'
  },
  {
    id: 'fb-post-pfbid025XN1xPm8hGGDnWKPyFVxJBCndT2q8YK4hMNFkQgpiCPUzAH9Vr3U8d63HYfSKogol',
    title: '𝕷𝖆𝖇𝖔𝖚𝖗: 𝕻𝖆𝖗𝖎𝖘 𝕻𝖆𝖑𝖔𝖒𝖆',
    subtitle: 'Written by Karl David Ocfemia, Literary Editor • Layout by Kim Bernadette Satparam, Layout Artist',
    date: 'July 2026',
    category: 'Essay',
    publication: 'The Inditers — Official Student Publication of BU Polangui',
    readTime: '3 min read',
    leadQuote: '"Nymph, then virgin, nurse, then servant." A whole life. A whole self, staged in relation to someone else\'s needs.',
    excerpt: 'I have been thinking about the word accumulate. How suffering doesn\'t arrive all at once. How it builds in increments so small she cannot point to any single one and say — there. that is where it started.',
    content: [
      'I have been thinking about the word accumulate.',
      'How suffering doesn\'t arrive all at once. How it builds in increments so small she cannot point to any single one and say — there. that is where it started. She cannot name the first time she was made smaller. She cannot identify the exact morning she woke up and realized that her hands had been cracking for years and no one had noticed, because she had learned, very early, that noticing her own pain was a luxury she could not afford in the presence of his comfort.',
      'And then there is this: the apologies that only ever travel one direction. Hers, always. Never his. While he sits at the table — full plate, gobbling, oblivious — or perhaps not oblivious at all. Perhaps that is the more honest reading. Because the song is careful to tell you: he is not stupid. She knows he is not stupid. That matters. It changes everything. There is a profound difference between a man who cannot see what he is doing and a man who has simply decided that not seeing is more convenient than seeing. One is ignorance. The other is a choice dressed up as ignorance.',
      'The bridge hits and it does not feel like a metaphor anymore.\n"Nymph, then virgin, nurse, then servant."',
      'A whole life. A whole self, staged in relation to someone else\'s needs. There is no version of that list that ends with her. That is not an accident. That is the architecture of the thing — designed so that by the time she understands what has been done to her, she has already spent decades building the house she is trapped in.',
      'I do not know what to do with the feeling this song leaves in me. I don\'t think I\'m supposed to. Perhaps to sit with it and ruminate. Perhaps to advocate for change that so many have deigned to demand.',
      'Written by Karl David Ocfemia, Literary Editor | Layout by Kim Bernadette Satparam, Layout Artist'
    ],
    featured: true,
    tags: ['Labour', 'ParisPaloma', 'Literary', 'TheInditers', 'FacebookPost'],
    facebookUrl: 'https://www.facebook.com/Inditers/posts/pfbid025XN1xPm8hGGDnWKPyFVxJBCndT2q8YK4hMNFkQgpiCPUzAH9Vr3U8d63HYfSKogol?rdid=oZwAFHyuJ3akjyR8#',
    imageUrl: 'https://scontent.flgp1-1.fna.fbcdn.net/v/t39.30808-6/644937567_1331255345690661_416068121912177912_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x2048&ctp=s2048x2048&_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEnImb-F6AtksEO-NjC1kub7QfLplcEaw_tB8umVwRrD_BVUhkrSl8fZOEvKi2v0bKO8e8F0868UbpOBkQ5ARxa&_nc_ohc=qnVz6RTm2IUQ7kNvwErBWEz&_nc_oc=AdpfFdfkxkOHvi6tKcM4B9kBFDkbyAQtqRhr-Zkr1RILyTJ3Pg_RhnskTy4vnEeNrjc&_nc_zt=23&_nc_ht=scontent.flgp1-1.fna&_nc_gid=61ZmzXHVWqdJANw0jsClpw&_nc_ss=7b2a8&oh=00_AQCTYeoe6tIJW9BXzDxjB0pWhdw1xmmeW8tvZlQuvfdK7A&oe=6A662426'
  },
  {
    id: 'fb-post-pfbid02jXzEdebXhCoK2Jr4gE6cYgnpHYjE8oh64ULujryP7wHjtsEcnwHpDcYS8QTGUfMml',
    title: '𝐋𝐈𝐓𝐄𝐑𝐀𝐑𝐘 | 𝐃𝐢𝐰𝐚 𝐧𝐠 𝐖𝐢𝐤𝐚',
    subtitle: 'Mga salita ni Karl David Ocfemia, Literary Editor • Dibuho ni Jewenha Joyce Colico, Cartoonist',
    date: 'August 2026',
    category: 'Poem',
    publication: 'The Inditers — Official Student Publication of BU Polangui',
    readTime: '2 min read',
    leadQuote: 'Wika ang haligi ng ating pagkatao / Ang bayan at tahanan ng kaluluwang nangangarap',
    excerpt: 'Hindi banyaga ang tinig ng puso sa unang iyak ng isang sanggol, kasama na ang wikang mahal sa mga kwento\'t awit ng pag-ibig...',
    isPoem: true,
    content: [
      'Hindi banyaga ang tinig ng puso\nSa unang iyak ng isang sangol \nKasama na ang wikang mahal\nSa mga kwento\'t awit ng pag-ibig',
      'Tayo\'y natutong mahalin ang hindi sa atin\nAt itakwil ang kulturang tunay na sa atin',
      'Sa sariling wika ang katotohanan\nAng mga saloobin at diwa ay malinaw\nWalang salin pang kakailanganin \nUpang magkaunawaan',
      'Sa bawat letra\'t titik ng ating pangalan\nAy siya ring nakakaukit ang pagkakilanlan',
      'Ang sulat ng bayani\nAng sigaw at liham ng masa\nWika ang haligi ng ating pagkatao\nAng bayan at tahanan ng kaluluwang nangangarap\nNa sana\'y wag kalimutang mangarap sa sariling wika',
      '—',
      'Maligayang Buwan ng Wikang Pambansa! 🇵🇭\nNakikiisa ang The Inditers sa pagdiriwang ng Buwan ng Wika na may temang “Ang Paglinang sa Filipino at Katutubong Wika: Makasaysayan sa Pagkakaisa ng Bansa.”\nBilang tinig ng mga mag-aaral ng Bicol University Polangui, patuloy naming itataguyod ang pagmamahal sa wikang sarili at pagpapahalaga sa ating makulay na kultura. Sama-sama nating pagyamanin ang ating wika, ang siyang ugat ng ating pagkakaisa bilang isang bayan.',
      'Mga salita ni Karl David Ocfemia, Literary Editor | Dibuho ni Jewenha Joyce Colico, Cartoonist'
    ],
    featured: true,
    tags: ['Literary', 'DiwaNgWika', 'BuwanNgWika', 'Poem', 'TheInditers', 'FacebookPost'],
    facebookUrl: 'https://www.facebook.com/Inditers/posts/pfbid02jXzEdebXhCoK2Jr4gE6cYgnpHYjE8oh64ULujryP7wHjtsEcnwHpDcYS8QTGUfMml?rdid=DZkDb7JaK020tEGl#',
    imageUrl: 'https://scontent.flgp1-1.fna.fbcdn.net/v/t39.30808-6/529262073_1164784722337725_7424735057770366919_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1080&ctp=s1080x1080&_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFGiJFQiEB5k2dCaeYRUd8sSTcpEfrWx-dJNykR-tbH5yAlR-nS1TpFhCdUz6fwtn5mgAfy1-9GROZqOrIlYKhb&_nc_ohc=W8yn08x1AXcQ7kNvwFkEPNK&_nc_oc=AdoMkXG9F9rg9bgv0-Fuhb9TefXkEtkiJzcTmOEPJCncV37EHEv3kyPH3EfoiI0pbLk&_nc_zt=23&_nc_ht=scontent.flgp1-1.fna&_nc_gid=Js5zFB0CUW-reYGDJqhhSQ&_nc_ss=7b2a8&oh=00_AQCNKV78UIAExD9xr_VXRMEQb5E2Tzw2YozEAbrD-X69Yw&oe=6A661F2A'
  },
  {
    id: 'fb-post-pfbid0y8NnZvvj2KcneTrtmNvhve8Pqmnmqa9qqCB4LjxjN2iwFCjh5KqkrQJwmzNw1i1yl',
    title: '𝐍𝐄𝐖𝐒 𝐅𝐄𝐀𝐓𝐔𝐑𝐄 | 𝐓𝐞𝐜𝐡 𝐟𝐨𝐫 𝐏𝐢𝐥𝐚𝐫: 𝐁𝐔 𝐏𝐨𝐥𝐚𝐧𝐠𝐮𝐢 𝐚𝐝𝐯𝐚𝐧𝐜𝐞𝐬 𝐋𝐆𝐔 𝐒𝐞𝐫𝐯𝐢𝐜𝐞𝐬 𝐯𝐢𝐚 𝐄𝐦𝐩𝐨𝐰𝐞𝐫𝐂𝐨𝐦𝐦',
    subtitle: 'Written by Karl David Ocfemia, Literary Editor • Photos by Prof. Arnold B. Platon',
    date: 'June 2025',
    category: 'Article',
    publication: 'The Inditers — Official Student Publication of BU Polangui',
    readTime: '5 min read',
    leadQuote: 'In the rural heartland of Sorsogon, where tradition and progress intertwine, a digital revolution is underway.',
    excerpt: 'In the rural heartland of Sorsogon, where tradition and progress intertwine, a digital revolution is underway. At the forefront is the partnership between Bicol University Polangui and LGU Pilar under EmpowerComm.',
    content: [
      'In the rural heartland of Sorsogon, where tradition and progress intertwine, a digital revolution is underway. At the forefront of this transformation is the partnership between Bicol University Polangui and the Local Government Unit (LGU) of Pilar, rooted in a shared commitment to community development through innovation.',
      'What began as a formal signing of a Memorandum of Agreement (MOA) on January 21, 2025, has since progressed into a dynamic collaboration under the banner of EmpowerComm: Bridging Communities through Information and Communication Technology Solutions and Training, an extension initiative spearheaded by BU Polangui’s Computer Studies Department (CSD).',
      'This initiative has become the foundation for what is shaping up to be a meaningful extension engagement between the college and the local government.',
      'A ceremonial beginning\nThe ceremonial MOA signing, held at the Pilar Municipal Hall, marked a pivotal moment for both institutions. Presided over by Hon. Mayor Carolyn C. Sy-Reyes, the event formalized the collaboration and solidified a shared commitment to drive technological advancement at the grassroots level. Representing BU Polangui were notable academic leaders: Prof. Arnold B. Platon, CSD Chairperson; Dean Mary Joy B. Catangui; Associate Dean Floradel S. Relucio; Extension Coordinator Edward Pescuela; and Ms. Blessica Dorosan, Extension Focal Person.',
      'EmpowerComm: the heart of the partnership\nAt the center of this collaboration is EmpowerComm, an extension project developed by BU Polangui’s CSD. Designed to offer ICT-based interventions, the project seeks to equip local government units with practical tools and training suited to their specific needs and capacities.',
      'The Pilar Web Portal: a vision realized\nOn June 16, 2025, five months after the MOA signing, the first major output of the partnership was realized with the official turnover of the Municipality of Pilar Web Portal. Developed by BU Polangui BSIT student researchers Noel Roselada, Micah Listanco, and Yesha Madrigal, the portal is intended to improve access to government services, support transparency, and foster community engagement.',
      'From education to empowerment\nThe collaboration with Pilar is part of a broader mission embraced by Bicol University to extend its academic influence beyond the walls of the campus and directly into communities.',
      'Looking ahead\nThe partnership between BU Polangui and LGU Pilar is far from over. Continuous mentoring, feedback gathering, and system refinement remain active.',
      'via Karl David Ocfemia, Literary Editor | Photo credits to Prof. Arnold B. Platon'
    ],
    featured: true,
    tags: ['NewsFeature', 'TechForPilar', 'EmpowerComm', 'BUPolangui', 'TheInditers', 'FacebookPost'],
    facebookUrl: 'https://www.facebook.com/Inditers/posts/pfbid0y8NnZvvj2KcneTrtmNvhve8Pqmnmqa9qqCB4LjxjN2iwFCjh5KqkrQJwmzNw1i1yl?rdid=lZ1qW4lz36PbMhyK#',
    imageUrl: 'https://scontent.flgp1-1.fna.fbcdn.net/v/t39.30808-6/508717792_1123466933136171_1481068288030351409_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1536&ctp=s2048x1536&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGEVI_AwiSzZh8NTzvAcx5QDZ8SSw8l1fwNnxJLDyXV_JZJpXYGOcHlKP3t9WYHiKPyuWD6VbrXvMt6SMmZymFC&_nc_ohc=RUvdIPWEPAQQ7kNvwEYw_4q&_nc_oc=AdqSfBkxa_FmdE9EzcwxTUTf0B9aUQBPnMn5SJCIb01ZG58z2I_gvIETAQBZAY06kwg&_nc_zt=23&_nc_ht=scontent.flgp1-1.fna&_nc_gid=TB2Q4BP3PXSYtqKc-JuFsQ&_nc_ss=7b2a8&oh=00_AQDooQWbS2ebZCdyUNARafcWJLddbbCls8mZ3iBjPeFyrg&oe=6A661B73'
  },
  {
    id: 'fb-post-pfbid02YCymgQ7Nd1TfR9Kz48ArDuXp4x5kPM9Ww5HcxorSNvxayeq8zTzu4n7JSHnRZMPDl',
    title: '𝐎𝐏𝐈𝐍𝐈𝐎𝐍 | 𝐖𝐡𝐚𝐭’𝐬 𝐒𝐭𝐨𝐥𝐞𝐧 𝐢𝐧 𝐁𝐥𝐨𝐨𝐝 𝐢𝐬 𝐏𝐚𝐢𝐝 𝐢𝐧 𝐑𝐮𝐢𝐧',
    subtitle: 'Written by Karl David Ocfemia, Literary Editor • Cartoon by Reyson Asgar, Cartoonist',
    date: 'September 2025',
    category: 'Opinion',
    publication: 'The Inditers — Official Student Publication of BU Polangui',
    readTime: '6 min read',
    leadQuote: 'What do you do when power stops pretending to care if you live or die? When parliaments become theaters and politicians become actors reciting scripted promises, the streets become the only stage where truth can still be spoken.',
    excerpt: 'Across continents, from Kathmandu to Jakarta, millions are discovering the same bitter reality: their governments have stopped listening to anything but the sound of their own power consolidating.',
    content: [
      'What do you do when power stops pretending to care if you live or die? When parliaments become theaters and politicians become actors reciting scripted promises, the streets become the only stage where truth can still be spoken.',
      'Across continents, from the mountain valleys of Kathmandu to the bustling boulevards of Jakarta, millions are discovering the same bitter reality: their governments have stopped listening to anything but the sound of their own power consolidating.',
      'What politicians dismiss as "disruption" is actually democracy\'s immune system kicking in. These protests aren\'t tantrums; they\'re emergency signals from citizens who refuse to watch their countries rot from the inside while leaders smile for cameras and count their gains.',
      'Power bought in blood\nIn Nepal, citizens are exhausted by promises of a "new republic" that has failed to deliver. The recent deadly anti-corruption protests that forced the prime minister\'s resignation are just the latest eruption of anger that has been building for years.',
      'Indonesia tells a parallel story. Behind the slogans of "growth" and "modernization" lies a reality where House of Representatives members earn over 100 million rupiah monthly, including housing allowances reaching 230 million rupiah monthly; meanwhile, ordinary citizens struggle.',
      'Unity promised, obedience demanded\nNow what exactly makes these two governments so similar in nature? Their overflowing greed and depravity? A lust for power? While these may be realistic answers, there is a much more unsettling answer. The myth of unity—"Stronger together". It’s the greatest lie of those that greedily cling to power and position.',
      'Silence is complicity; protest is refusal\nTo stand by in silence is to lend strength to those who exploit. Protest, then, is more than an outburst of anger—it is the active renunciation of being leeched.',
      'The will of the many breaks the silence of the few\nThe sudden eruption of protests in Kathmandu’s streets or Jakarta’s boulevards shows that people no longer accept complicity as an option. In the end, the lesson is brutal but undeniable: what’s stolen in blood is paid in ruin.',
      'What Comes After the Streets: From Rupture to Reconstruction\nProtest is diagnosis, not cure. Sustainable change requires moving beyond the politics of outrage toward the politics of construction—building systems that serve people rather than exploit them.',
      'Written by Karl David Ocfemia, Literary Editor | Cartoon by Reyson Asgar, Cartoonist'
    ],
    featured: true,
    tags: ['Opinion', 'WhatsStolenInBloodIsPaidInRuin', 'Democracy', 'Protest', 'TheInditers', 'FacebookPost'],
    facebookUrl: 'https://www.facebook.com/Inditers/posts/pfbid02YCymgQ7Nd1TfR9Kz48ArDuXp4x5kPM9Ww5HcxorSNvxayeq8zTzu4n7JSHnRZMPDl?rdid=nuZDqK3cEE38sWFf#',
    imageUrl: 'https://scontent.flgp1-1.fna.fbcdn.net/v/t39.30808-6/548616200_1197655349050662_8652183796087336383_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x2048&ctp=s2048x2048&_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeECFbMam12Yv1XKYjexQj_yuX_ZG4-FSFq5f9kbj4VIWsxVTSo3djIiS3GcEiBWnF34_dKuY0YsyBFHCU5Nx36D&_nc_ohc=qlUQWv63_w8Q7kNvwHxtNxk&_nc_oc=AdryPxwCy-RKzXFy-bYsyXoCS61woral6jvi6J4F72GXv_Y9cPyvexmaWWF9WiePfns&_nc_zt=23&_nc_ht=scontent.flgp1-1.fna&_nc_gid=fBOeotThnrTMrpndjosjYw&_nc_ss=7b2a8&oh=00_AQCsO_VV8egO44-Biq8NAMJjbED396SFiDfFwPjCYMJ6-w&oe=6A662975'
  },
  {
    id: 'fb-post-1Da8iS7hhN',
    title: '𝐈𝐂𝐘𝐌𝐈 | 𝐁𝐔 𝐏𝐨𝐥𝐚𝐧𝐠𝐮𝐢 𝐛𝐫𝐢𝐧𝐠𝐬 𝐡𝐨𝐦𝐞 𝐝𝐨𝐮𝐛𝐥𝐞 𝐬𝐢𝐥𝐯𝐞𝐫 𝐢𝐧 𝐋𝐚𝐰𝐧 𝐓𝐞𝐧𝐧𝐢𝐬',
    subtitle: 'Via Karl David Ocfemia, Literary Editor • Photos by Melvin Bueno Jr., Layout Artist',
    date: 'October 2025',
    category: 'Article',
    publication: 'The Inditers — Official Student Publication of BU Polangui',
    readTime: '3 min read',
    leadQuote: 'Bicol University Polangui\'s Karl Antonni Era maintained her composure throughout the challenging match to secure the silver medal in Women\'s Lawn Tennis.',
    excerpt: 'Bicol University Polangui\'s Karl Antonni Era and the doubles pair of Micah Ella Masilang and Eleanor Aimee Reantaso brought home double silver medals in Lawn Tennis at the BU Olympics.',
    content: [
      'Bicol University Polangui\'s Karl Antonni Era\'s impressive run through the Women\'s Singles bracket came to an end Saturday morning as she fell 8-0 to Institute of Physical Education, Sports, and Recreation\'s seasoned delegate in the finals of the Women\'s Lawn Tennis on the final day of the BU Olympics.',
      'Despite the lopsided score, Era maintained her composure throughout the challenging match to secure the silver medal.',
      'Singles Semifinals: Era Advances with Dominant Performance\nEra earned her spot in the finals with a commanding semifinal victory over teammate Cecillia Marie Salle. Playing a balanced and efficient game, Era took control early, winning the first two sets while avoiding costly faults. Salle mounted a fierce comeback in the third set, bringing the score to 2-1, but Era responded immediately, extending her lead to 3-1. Era\'s strategic positioning gave her the edge, allowing her to return shots with ease while Salle struggled to find her rhythm. Era closed out the match 6-2, advancing to the finals while Salle prepared for the bronze medal match.',
      'Finals: Experience Prevails\nIn the gold medal match, Era faced IPESR\'s veteran competitor, last year\'s SCUAA delegate, and quickly found herself in unfamiliar territory as her opponent\'s calm, composed play proved to be difficult to crack, and Era fell behind 2-0 early. The deficit continued to grow as IPESR\'s experience showed, extending the lead to 7-0. Despite the overwhelming scoreline, Era refused to concede, fighting through each point until the final 8-0 result. The silver medal marked a strong showing for the BU Polangui delegate in her Olympic campaign.',
      'Doubles Finals\nIn the doubles finals, BU Polangui\'s Micah Ella Masilang and Eleanor Aimee Reantaso fought valiantly against BU College of Social Sciences and Philosophy, but feel short to a score of 8-3. CSSP came out firing, taking the first three sets with powerful smashes that overwhelmed Team Orens\' defenses, building a commanding 3-0 lead. Masilang sparked a comeback with excellent court awareness, demonstrating a keen sense of distance by letting outside balls go untouched. Team Orens capitalized on scoring opportunities to pull within one at 4-3. However, CSSP stuck to their aggressive game plan, unleashing another barrage of powerful smashes to push ahead 6-3. Though Masilang and Reantaso showed tremendous tenacity in their comeback efforts, they ultimately fell short as CSSP closed out the match 8-3 to capture the doubles title, but secured the silver medal for the event.',
      'Bronze Medal Match: Salle Unable to Compete\nThe bronze medal match in Women\'s Singles never materialized as Salle, citing overfatigue from her semifinal battle, was unable to compete. Her withdrawal ended what had been a spirited run through this year\'s BU Olympics tennis competition.',
      'Via Karl David Ocfemia, Literary Editor | Photos by Melvin Bueno Jr., Layout Artist'
    ],
    featured: true,
    tags: ['ICYMI', 'BUOlympics', 'LawnTennis', 'BUPolangui', 'Sports', 'TheInditers', 'FacebookPost'],
    facebookUrl: 'https://www.facebook.com/share/p/1Da8iS7hhN/',
    imageUrl: 'https://scontent.flgp1-1.fna.fbcdn.net/v/t39.30808-6/571041979_1231289632353900_575821723321865674_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1364&ctp=s2048x1364&_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFPmRCAHKwhn_4HkBbjMAUwiEmhsN2SnpCISaGw3ZKekDyoDEc3tAWuAe0eZah6QPBJvqigacu6TsL853TeU91F&_nc_ohc=jecz_pD1BWcQ7kNvwHzmFwK&_nc_oc=AdoyH2_Wb0rkLbUYwyzEoAcGhH-qq5c3DZyP4gfwHTFSQQJSoSCGYZcx7NpJLzdDVHo&_nc_zt=23&_nc_ht=scontent.flgp1-1.fna&_nc_gid=M2S94Fe2HSWrzWH97irYMw&_nc_ss=7b2a8&oh=00_AQAEVLrhWuDm19ZR7DEMXmE1jVUwQ0omXGaPDSgaejTydg&oe=6A663C93'
  },
  {
    id: 'fb-post-1HVVkt7gkj',
    title: '𝐁𝐔 𝐎𝐥𝐲𝐦𝐩𝐢𝐜𝐬 𝟐𝟎𝟐𝟓 𝐭𝐚𝐤𝐞𝐬 𝐚𝐥𝐚𝐫𝐦𝐢𝐧𝐠 𝐭𝐮𝐫𝐧 𝐚𝐦𝐢𝐝 𝐬𝐦𝐨𝐤𝐞 𝐢𝐧𝐜𝐢𝐝𝐞𝐧𝐭',
    subtitle: 'Via Karl David Ocfemia, Literary Editor • Photos by Annie Rose Edem, Shane Balbuena, Neil Ivan Ocbiana, Johann Josh Salcedo',
    date: 'October 2025',
    category: 'Article',
    publication: 'The Inditers — Official Student Publication of BU Polangui',
    readTime: '3 min read',
    leadQuote: 'The much awaited Bicol University Olympics 2025 kicked off with a grand parade on October 20, only for the evening to be later followed with smoke bombs filling the venue.',
    excerpt: 'The opening day of the BU Olympics 2025 featured vibrant parade showcases and performances, but concluded on a concerning note as color smoke bombs during BU Hataw led to several students passing out.',
    content: [
      'The much awaited Bicol University Olympics 2025 kicked off at the peak of the afternoon with a grand parade on October 20, only for the evening to be later followed with smoke bombs filling the venue.',
      'Opening of bright hopes and anticipation\nEach of the campus delegates was received with thunderous cheers as they marched into the field of Bicol University Sports Complex. Alongside the delegates were the coaches and the college student councils, offering utmost support to the athletes participating in their respective individual and team sports in the coming days of the Olympics.',
      'The opening salvo showcased various performances ranging from electrifying dance numbers to impressive sports exhibitions— garnering attention from the crowd of students and audiences alike.',
      'Following the performances, the muses and escorts gracefully introduced themselves as representatives of their respective colleges. "I\'m very happy, for when I was chosen to represent our campus, I wasn\'t particularly enthusiastic. But with people pushing me with all the support and comments, I felt the warm support towards me," shared Michaela Blanche Malonda, Bicol University Polangui Muse. "I am also very happy to experience the BU Hataw this year as I am already a 4th year," she added.',
      'The presentation of each delegation was done proudly by the deans of their colleges, formally welcoming their students into the competition. With delegation banners hoisted high and the opening acts reaching their conclusion, the excitement refused to die down.',
      'BU Hataw ends with perilous smoke\nThe start of the BU Hataw was nothing short of explosive. Participating students from each college sprinted to the center of the sports complex, assembling into their formations with energy.',
      'However, what was meant to be a spectacular attraction quickly turned concerning. The color smoke bombs became overwhelming, smoldering the senses of students and causing a sizable number to pass out. The intended spectacle transformed into an unsavory experience as emergency responders rushed to assist the affected students.',
      '"Quite fun but merong mga nahimatay so need talaga mag action," commented Clark Aeron De Villa, Bicol University Polangui Escort, reflecting on both the excitement of the event and the urgent need for safety measures.',
      'As the program concluded, responders continued to attend to affected students while officials assessed the situation to ensure the safety of participants.',
      'Via Karl David Ocfemia, Literary Editor | Photos by Annie Rose Edem, Shane Balbuena, Neil Ivan Ocbiana, Johann Josh Salcedo, Photojournalists'
    ],
    featured: true,
    tags: ['BUOlympics', 'BUHataw', 'NewsReport', 'BUPolangui', 'TheInditers', 'FacebookPost'],
    facebookUrl: 'https://www.facebook.com/share/p/1HVVkt7gkj/',
    imageUrl: 'https://scontent.flgp1-1.fna.fbcdn.net/v/t39.30808-6/565627245_1226470052835858_7666597235390473640_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1365&ctp=s2048x1365&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeF0qhuby7-3fNIp_0iWuXhxpkWyzpySBtWmRbLOnJIG1b_wCl67i_YCh8Nyl7hOJevdt1sVV1iCaboQjNlQRmB5&_nc_ohc=5FRVom-TMQAQ7kNvwFJ8Ols&_nc_oc=AdowDjViiLJKkkepYJTvEN_qPeqtL9r09AeIRvbh17m4y-al9XFFATBO3rrVnAOg4EU&_nc_zt=23&_nc_ht=scontent.flgp1-1.fna&_nc_gid=rr0YTuo8CJlf8kDO6lnYiA&_nc_ss=7b2a8&oh=00_AQBef6k1Q9dtm8rQLpMCE2PgmuCo4C2WMR3K2ua-cJ7glA&oe=6A6621E9'
  },
  {
    id: 'fb-post-1EpTMxdJJb',
    title: '𝐎𝐏𝐈𝐍𝐈𝐎𝐍 | 𝐁𝐫𝐞𝐚𝐭𝐡𝐭𝐚𝐤𝐢𝐧𝐠 𝐈𝐧𝐝𝐞𝐞𝐝',
    subtitle: 'Via Karl David Ocfemia, Literary Editor • Cartoon by Roel Moendem and Reyson Asgar, Cartoonists',
    date: 'October 2025',
    category: 'Opinion',
    publication: 'The Inditers — Official Student Publication of BU Polangui',
    readTime: '3 min read',
    leadQuote: 'What could have been a breathtaking celebration of spirit and unity turned into a memory of horror for this year’s participants of the annual BU Hataw.',
    excerpt: 'A single mishap spiraled into an uncontrollable dilemma—prioritizing aesthetics over the safety and well-being of students during BU Hataw 2025.',
    content: [
      'What could have been a breathtaking celebration of spirit and unity turned into a memory of horror for this year’s participants of the annual BU Hataw. A single mishap spiraled into an uncontrollable dilemma—prioritizing aesthetics over the safety and well-being of students.',
      'The opening of BU Hataw 2025 was, to say the least, extreme. The use of colored smoke bombs meant to enhance the spectacle immediately backfired. Students fainted barely three minutes into the performance, yet the program continued. That alone should have been enough reason to stop the use of the smoke props—but it wasn’t. It carried on until the very end of the mass presentation leading to further complications.',
      'Perhaps it was the presence of the smoke that clouded the judgment of the organizers, but the cost was far greater than what they could possibly carry on their backs. The lives and health of the participants being treated as collateral in the midst of the chaos by carrying on with the event was the form of judgement that goes against the act of being humane. No visual grandeur or applause could ever justify putting hundreds of students at risk.',
      'BU Hataw 2025 had a large effect on the University as a whole— revealing that apologies and temporary suspensions aren\'t enough. Contingency plans were inadequate, responders were insufficient, and medical aid was delayed—when every second could have meant safety, or even survival. It was not merely an accident, but a reflection of complacency that should have been prevented with proper risk assessment and preparedness.',
      'As one of the country’s premier institutions, Bicol University bears the responsibility to uphold not only excellence but also vigilance in ensuring the welfare of its students. Safety should never be treated as an afterthought, regardless of how big or small an event is.',
      'It is a wake-up call for the university to uphold its duty of care, to ensure that no future celebration of unity ever comes at the expense of student welfare. Let this incident be more than a lesson learned the hard way, that it must be the start of a culture that values foresight over flair, and humanity—the very vision that the university carries—over mere spectacle.',
      'Via Karl David Ocfemia, Literary Editor | Cartoon by Roel Moendem and Reyson Asgar, Cartoonists'
    ],
    featured: true,
    tags: ['Opinion', 'BreathtakingIndeed', 'BUHataw', 'StudentSafety', 'BUPolangui', 'TheInditers', 'FacebookPost'],
    facebookUrl: 'https://www.facebook.com/share/p/1EpTMxdJJb/',
    imageUrl: 'https://scontent.flgp1-1.fna.fbcdn.net/v/t39.30808-6/567308654_1228087426007454_6887532475036430966_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x2048&ctp=s2048x2048&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFFYXMW4ZdCDsv8Dtp1vhaJyI7v3BoyHmHIju_cGjIeYdkcf604ODducSVlE8ebUAJjHNyvJ3K7kKw98hFcsciQ&_nc_ohc=dicSl9BtwqsQ7kNvwFKoeDS&_nc_oc=AdrxjD7K28WmAajybi9-FZEnQ9huDZ16Oh1BTWXXFdnYN6z-LSvYopmHnpoRuc8s6fg&_nc_zt=23&_nc_ht=scontent.flgp1-1.fna&_nc_gid=X0gSRqO9ay_pDT3nXxAH3g&_nc_ss=7b2a8&oh=00_AQB3FnE_VxtWVLqTw2PFKUxo77bD98CviyuqeHwlx_spMA&oe=6A664D1F'
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'Bicol University Polangui Campus',
    location: 'Polangui, Albay',
    period: '2023 – Present',
    details: 'Current status: Undergraduate student seeking 240-hour technology internship. Active member of Computer Science Student Organization & Literary Editor at The Inditers.'
  },
  {
    degree: 'Senior High School — ABM Track (Accountancy, Business & Management)',
    institution: 'Marcial O. Ranola Memorial School',
    location: 'Guinobatan / Polangui, Albay',
    period: '2021 – 2023',
    details: 'Focused on financial accounting, business math, organizational management, and structured analytical problem-solving.'
  },
  {
    degree: 'Junior High School',
    institution: 'Bicol Regional Science High School',
    location: 'Ligao / Polangui, Albay',
    period: '2017 – 2021',
    details: 'Rigorous science and mathematics curriculum background with early exposure to logic and scientific methodology.'
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: 'Programming & Development',
    items: [
      'Programming Fundamentals (variables, loops, conditionals, functions)',
      'Object-Oriented Programming (OOP concepts & class architecture)',
      'Python (data processing, console apps, file I/O)',
      'Java (console apps, basic data processing)',
      'HTML5 & CSS3 (semantic structure, responsive web design)',
      'Database Concepts & SQL (queries, CRUD operations, normalization)'
    ]
  },
  {
    category: 'Tools & Software',
    items: [
      'Git & GitHub (version control fundamentals, repositories)',
      'Microsoft Office Suite (Word, Excel, PowerPoint - proficient)',
      'Windows & Linux Command-Line Environments (CLI navigation, scripts)',
      'VS Code / IDE Development Tools'
    ]
  },
  {
    category: 'Core Competencies',
    items: [
      'Analytical Thinking & Structured Problem-Solving',
      'Literary Editing & Written Communication',
      'Adaptability to Team Dynamics & Work Environments',
      'Multitasking & Workload Management',
      'Quick Learner with High Attention to Detail'
    ]
  }
];

export const PROJECT_EXPERIENCE_DATA: ProjectExperience[] = [
  {
    title: 'Course Management System (Database Class Project)',
    type: 'Database Class Project',
    institution: 'Bicol University Polangui',
    year: '2023',
    bullets: [
      'Designed and implemented a relational database schema to manage student and course records.',
      'Created SQL queries for CRUD operations; presented findings and system demo to class.'
    ]
  },
  {
    title: 'Personal Portfolio Website',
    type: 'Self-initiated / Web Development Course',
    institution: 'Bicol University Polangui',
    year: '2023',
    bullets: [
      'Built a static portfolio website using HTML and CSS to showcase academic projects.',
      'Incorporated responsive design principles for mobile compatibility.'
    ]
  },
  {
    title: 'Inventory Tracker — Python Console App',
    type: 'Programming Fundamentals Course',
    institution: 'Bicol University Polangui',
    year: '2022',
    bullets: [
      'Developed a text-based inventory management system demonstrating file I/O, functions, and OOP.'
    ]
  }
];

export const CHARACTER_REFERENCE = {
  name: 'MARY ANTONIETTE S. ARIÑO',
  role: 'Instructor III',
  email: 'maryantoniette.arino@bicol-u.edu.ph',
  phone: '09665347135',
  institution: 'Bicol University Polangui'
};

export const SOCIAL_LINKS = [
  {
    platform: 'Facebook',
    handle: '@karl.d.ocfemia',
    url: 'https://www.facebook.com/karl.d.ocfemia',
    description: 'Facebook Profile',
    brandColor: '#1877F2',
  },
  {
    platform: 'Instagram',
    handle: '@haz_maryun',
    url: 'https://www.instagram.com/haz_maryun?igsh=ZXh6cjVxM3B5YWpr',
    description: 'Instagram Account',
    brandColor: '#E4405F',
  }
];
