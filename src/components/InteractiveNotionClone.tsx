import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  CheckSquare,
  Square,
  Heading1,
  Heading2,
  Code,
  Quote,
  Sparkles,
  Layout,
  ListFilter,
  Download,
  Terminal,
  Folder,
  ChevronRight,
  Info
} from 'lucide-react';

interface Block {
  id: string;
  type: 'text' | 'h1' | 'h2' | 'todo' | 'code' | 'callout' | 'quote';
  content: string;
  completed?: boolean;
}

interface Page {
  id: string;
  title: string;
  icon: string;
  blocks: Block[];
}

interface KanbanTask {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  tag: string;
}

export const InteractiveNotionClone: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editor' | 'kanban'>('editor');

  const [pages, setPages] = useState<Page[]>([
    {
      id: 'page-1',
      title: 'BU Computer Science & Editorial Workspace',
      icon: '🎓',
      blocks: [
        { id: 'b1', type: 'h1', content: 'BU Computer Science & Literary Folio' },
        { id: 'b2', type: 'callout', content: 'Minimalist workspace engine built for student developers and publication editors at Bicol University Polangui.' },
        { id: 'b3', type: 'h2', content: 'Current Sprint Objectives' },
        { id: 'b4', type: 'todo', content: 'Normalize Course Management Database to 3NF', completed: true },
        { id: 'b5', type: 'todo', content: 'Draft literary essay "Labour: Paris Paloma" for The Inditers', completed: true },
        { id: 'b6', type: 'todo', content: 'Implement Memory Ticket Reservation Engine', completed: false },
        { id: 'b7', type: 'quote', content: '"To live freely but sincerely is where my prayer lies." — Karl David Z. Ocfemia' },
        { id: 'b8', type: 'code', content: 'SELECT student_id, AVG(final_grade) FROM Enrollments GROUP BY student_id;' },
      ],
    },
    {
      id: 'page-2',
      title: 'The Inditers Editorial Calendar',
      icon: '📰',
      blocks: [
        { id: 'b21', type: 'h1', content: 'The Inditers — Literary Desk Notes' },
        { id: 'b22', type: 'text', content: 'Submissions review and layout schedule for upcoming BU Olympics coverage and Folio releases.' },
        { id: 'b23', type: 'todo', content: 'Edit #TheInditersNowPlaying Ikot commentary', completed: true },
        { id: 'b24', type: 'todo', content: 'Coordinate with cartoonist for Diwa ng Wika illustration', completed: true },
      ],
    },
  ]);

  const [activePageId, setActivePageId] = useState<string>('page-1');
  const [showSlashMenu, setShowSlashMenu] = useState<boolean>(false);
  const [showMarkdownModal, setShowMarkdownModal] = useState<boolean>(false);

  // Kanban tasks
  const [kanbanTasks, setKanbanTasks] = useState<KanbanTask[]>([
    { id: 'k1', title: 'SQL Stored Procedure Optimization', status: 'done', tag: 'CS Coursework' },
    { id: 'k2', title: 'Write Opinion Piece on BU Hataw 2025', status: 'done', tag: 'The Inditers' },
    { id: 'k3', title: 'Test Memory Event Ticketing Locks', status: 'in_progress', tag: 'Engineering' },
    { id: 'k4', title: 'Prepare 240-hour Internship Portfolio', status: 'in_progress', tag: 'Career' },
    { id: 'k5', title: 'Finalize Senior High ABM Ledger Review', status: 'todo', tag: 'Academic' },
  ]);

  const activePage = pages.find((p) => p.id === activePageId) || pages[0];

  const updateBlockContent = (blockId: string, content: string) => {
    setPages((prevPages) =>
      prevPages.map((page) => {
        if (page.id !== activePageId) return page;
        return {
          ...page,
          blocks: page.blocks.map((b) => (b.id === blockId ? { ...b, content } : b)),
        };
      })
    );
  };

  const toggleBlockTodo = (blockId: string) => {
    setPages((prevPages) =>
      prevPages.map((page) => {
        if (page.id !== activePageId) return page;
        return {
          ...page,
          blocks: page.blocks.map((b) => (b.id === blockId ? { ...b, completed: !b.completed } : b)),
        };
      })
    );
  };

  const addBlock = (type: Block['type']) => {
    const newBlock: Block = {
      id: 'b-' + Date.now(),
      type,
      content:
        type === 'h1'
          ? 'New Heading 1'
          : type === 'h2'
          ? 'New Section Heading'
          : type === 'todo'
          ? 'New Task Item'
          : type === 'code'
          ? '// Enter code snippet here'
          : type === 'callout'
          ? 'Important note or reminder...'
          : type === 'quote'
          ? 'Quote passage...'
          : 'Type something...',
      completed: type === 'todo' ? false : undefined,
    };

    setPages((prevPages) =>
      prevPages.map((page) => {
        if (page.id !== activePageId) return page;
        return { ...page, blocks: [...page.blocks, newBlock] };
      })
    );
    setShowSlashMenu(false);
  };

  const deleteBlock = (blockId: string) => {
    setPages((prevPages) =>
      prevPages.map((page) => {
        if (page.id !== activePageId) return page;
        return { ...page, blocks: page.blocks.filter((b) => b.id !== blockId) };
      })
    );
  };

  const createNewPage = () => {
    const newId = 'page-' + Date.now();
    const newPage: Page = {
      id: newId,
      title: 'Untitled Notebook Page',
      icon: '📝',
      blocks: [{ id: 'b-init', type: 'h1', content: 'Untitled Page' }],
    };
    setPages([...pages, newPage]);
    setActivePageId(newId);
  };

  const moveKanbanTask = (taskId: string, newStatus: KanbanTask['status']) => {
    setKanbanTasks(
      kanbanTasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const exportMarkdown = () => {
    let md = `# ${activePage.title}\n\n`;
    activePage.blocks.forEach((b) => {
      if (b.type === 'h1') md += `# ${b.content}\n\n`;
      else if (b.type === 'h2') md += `## ${b.content}\n\n`;
      else if (b.type === 'todo') md += `- [${b.completed ? 'x' : ' '}] ${b.content}\n`;
      else if (b.type === 'code') md += `\`\`\`\n${b.content}\n\`\`\`\n\n`;
      else if (b.type === 'quote') md += `> ${b.content}\n\n`;
      else if (b.type === 'callout') md += `> 💡 **Callout:** ${b.content}\n\n`;
      else md += `${b.content}\n\n`;
    });
    return md;
  };

  return (
    <div className="bg-[#2B080D] text-[#FAF6F0] p-5 sm:p-7 rounded-xl border-2 border-[#800020] shadow-xl my-4">
      {/* Header Bar */}
      <div className="border-b border-[#800020] pb-4 mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Layout className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-xs font-mono-code text-[#D4AF37] uppercase font-bold tracking-widest">
              Live System Sandbox • Block-Based Workspace Engine
            </span>
          </div>
          <h3 className="font-serif-display text-2xl font-bold text-[#FAF6F0] mt-1">
            Notion-Inspired Workspace &amp; Note Engine
          </h3>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 bg-[#1C0508] p-1 rounded-lg border border-[#800020]">
          <button
            onClick={() => setActiveTab('editor')}
            className={`text-xs font-mono-code font-bold px-3 py-1.5 rounded transition-all cursor-pointer ${
              activeTab === 'editor' ? 'bg-[#800020] text-[#D4AF37] shadow-xs' : 'text-[#E2D7C7]/70 hover:text-white'
            }`}
          >
            Block Editor
          </button>
          <button
            onClick={() => setActiveTab('kanban')}
            className={`text-xs font-mono-code font-bold px-3 py-1.5 rounded transition-all cursor-pointer ${
              activeTab === 'kanban' ? 'bg-[#800020] text-[#D4AF37] shadow-xs' : 'text-[#E2D7C7]/70 hover:text-white'
            }`}
          >
            Kanban Board
          </button>
        </div>
      </div>

      {activeTab === 'editor' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Workspace Sidebar */}
          <div className="lg:col-span-4 bg-[#1C0508] p-4 rounded-xl border border-[#800020]">
            <div className="flex items-center justify-between border-b border-[#800020] pb-2 mb-3">
              <span className="text-xs font-mono-code text-[#D4AF37] uppercase font-bold flex items-center gap-1">
                <Folder className="w-3.5 h-3.5" /> Workspace Pages
              </span>
              <button
                onClick={createNewPage}
                className="text-[11px] font-mono-code bg-[#800020] hover:bg-[#A3283B] text-[#D4AF37] px-2 py-0.5 rounded cursor-pointer border border-[#D4AF37]/30 flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> New
              </button>
            </div>

            <div className="space-y-1.5">
              {pages.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePageId(p.id)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs font-sans-ui flex items-center justify-between transition-colors cursor-pointer ${
                    p.id === activePageId
                      ? 'bg-[#800020] text-[#FAF6F0] font-bold border border-[#D4AF37]/40'
                      : 'bg-[#2B080D] text-[#E2D7C7] hover:bg-[#800020]/40'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span>{p.icon}</span>
                    <span className="truncate">{p.title}</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
                </button>
              ))}
            </div>

            {/* Markdown Export Button */}
            <div className="mt-6 pt-4 border-t border-[#800020]">
              <button
                onClick={() => setShowMarkdownModal(true)}
                className="w-full bg-[#2B080D] hover:bg-[#800020] text-[#D4AF37] border border-[#800020] font-mono-code text-xs py-2 px-3 rounded flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Export Markdown Source
              </button>
            </div>
          </div>

          {/* Block Editor Stage */}
          <div className="lg:col-span-8 bg-[#FAF6F0] text-[#1C1618] p-6 sm:p-8 rounded-xl border-2 border-[#D4AF37] shadow-lg relative min-h-[420px]">
            {/* Page Header */}
            <div className="mb-6 border-b border-[#800020]/20 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{activePage.icon}</span>
                <input
                  type="text"
                  value={activePage.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setPages(pages.map((p) => (p.id === activePageId ? { ...p, title } : p)));
                  }}
                  className="font-serif-display text-2xl sm:text-3xl font-black text-[#800020] bg-transparent border-none focus:outline-none w-full"
                />
              </div>
            </div>

            {/* Block Menu Toolbar */}
            <div className="flex flex-wrap items-center gap-1.5 bg-[#F2EBE1] p-2 rounded-lg border border-[#E2D7C7] mb-6 text-xs font-mono-code text-[#800020]">
              <span className="text-[10px] uppercase font-bold text-[#574B4E] mr-1">Insert Block:</span>
              <button
                onClick={() => addBlock('text')}
                className="px-2 py-1 bg-[#FAF6F0] hover:bg-[#800020] hover:text-[#FAF6F0] rounded border border-[#E2D7C7] cursor-pointer transition-colors"
              >
                + Text
              </button>
              <button
                onClick={() => addBlock('h1')}
                className="px-2 py-1 bg-[#FAF6F0] hover:bg-[#800020] hover:text-[#FAF6F0] rounded border border-[#E2D7C7] cursor-pointer transition-colors flex items-center gap-1"
              >
                <Heading1 className="w-3 h-3" /> H1
              </button>
              <button
                onClick={() => addBlock('h2')}
                className="px-2 py-1 bg-[#FAF6F0] hover:bg-[#800020] hover:text-[#FAF6F0] rounded border border-[#E2D7C7] cursor-pointer transition-colors flex items-center gap-1"
              >
                <Heading2 className="w-3 h-3" /> H2
              </button>
              <button
                onClick={() => addBlock('todo')}
                className="px-2 py-1 bg-[#FAF6F0] hover:bg-[#800020] hover:text-[#FAF6F0] rounded border border-[#E2D7C7] cursor-pointer transition-colors flex items-center gap-1"
              >
                <CheckSquare className="w-3 h-3" /> Todo
              </button>
              <button
                onClick={() => addBlock('callout')}
                className="px-2 py-1 bg-[#FAF6F0] hover:bg-[#800020] hover:text-[#FAF6F0] rounded border border-[#E2D7C7] cursor-pointer transition-colors flex items-center gap-1"
              >
                <Info className="w-3 h-3" /> Callout
              </button>
              <button
                onClick={() => addBlock('quote')}
                className="px-2 py-1 bg-[#FAF6F0] hover:bg-[#800020] hover:text-[#FAF6F0] rounded border border-[#E2D7C7] cursor-pointer transition-colors flex items-center gap-1"
              >
                <Quote className="w-3 h-3" /> Quote
              </button>
              <button
                onClick={() => addBlock('code')}
                className="px-2 py-1 bg-[#FAF6F0] hover:bg-[#800020] hover:text-[#FAF6F0] rounded border border-[#E2D7C7] cursor-pointer transition-colors flex items-center gap-1"
              >
                <Code className="w-3 h-3" /> Code
              </button>
            </div>

            {/* Block Render Loop */}
            <div className="space-y-3 font-serif-body">
              {activePage.blocks.map((block) => (
                <div key={block.id} className="group relative flex items-start gap-2 pr-6">
                  {/* Handle Block Type Rendering */}
                  {block.type === 'h1' && (
                    <input
                      type="text"
                      value={block.content}
                      onChange={(e) => updateBlockContent(block.id, e.target.value)}
                      className="font-serif-display text-xl sm:text-2xl font-bold text-[#800020] bg-transparent border-b border-transparent hover:border-[#800020]/20 focus:border-[#800020] focus:outline-none w-full"
                    />
                  )}

                  {block.type === 'h2' && (
                    <input
                      type="text"
                      value={block.content}
                      onChange={(e) => updateBlockContent(block.id, e.target.value)}
                      className="font-serif-display text-lg font-bold text-[#800020] bg-transparent border-b border-transparent hover:border-[#800020]/20 focus:border-[#800020] focus:outline-none w-full mt-2"
                    />
                  )}

                  {block.type === 'text' && (
                    <textarea
                      rows={2}
                      value={block.content}
                      onChange={(e) => updateBlockContent(block.id, e.target.value)}
                      className="text-sm font-serif-body text-[#1C1618] bg-transparent border-none focus:outline-none w-full resize-none leading-relaxed"
                    />
                  )}

                  {block.type === 'todo' && (
                    <div className="flex items-center gap-2 w-full my-1">
                      <button
                        onClick={() => toggleBlockTodo(block.id)}
                        className="text-[#800020] cursor-pointer"
                      >
                        {block.completed ? (
                          <CheckSquare className="w-4 h-4 text-emerald-700" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                      <input
                        type="text"
                        value={block.content}
                        onChange={(e) => updateBlockContent(block.id, e.target.value)}
                        className={`text-xs font-sans-ui w-full bg-transparent border-none focus:outline-none ${
                          block.completed ? 'line-through text-[#574B4E]' : 'text-[#1C1618]'
                        }`}
                      />
                    </div>
                  )}

                  {block.type === 'callout' && (
                    <div className="w-full bg-[#F2EBE1] border-l-4 border-[#800020] p-3 rounded-r text-xs font-sans-ui text-[#1C1618]">
                      <input
                        type="text"
                        value={block.content}
                        onChange={(e) => updateBlockContent(block.id, e.target.value)}
                        className="bg-transparent border-none focus:outline-none w-full text-xs italic font-serif-body"
                      />
                    </div>
                  )}

                  {block.type === 'quote' && (
                    <blockquote className="w-full border-l-2 border-[#D4AF37] pl-3 italic text-xs font-serif-body text-[#574B4E]">
                      <input
                        type="text"
                        value={block.content}
                        onChange={(e) => updateBlockContent(block.id, e.target.value)}
                        className="bg-transparent border-none focus:outline-none w-full"
                      />
                    </blockquote>
                  )}

                  {block.type === 'code' && (
                    <div className="w-full bg-[#2B080D] text-[#FAF6F0] p-3 rounded border border-[#800020] font-mono-code text-xs">
                      <textarea
                        rows={2}
                        value={block.content}
                        onChange={(e) => updateBlockContent(block.id, e.target.value)}
                        className="bg-transparent border-none focus:outline-none w-full text-xs font-mono-code text-[#D4AF37] resize-none"
                      />
                    </div>
                  )}

                  {/* Delete Hover Action */}
                  <button
                    onClick={() => deleteBlock(block.id)}
                    className="opacity-0 group-hover:opacity-100 text-[#800020]/40 hover:text-[#800020] p-1 cursor-pointer absolute right-0 top-1 transition-opacity"
                    title="Delete block"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Kanban Task Board View */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { key: 'todo', title: 'To Do Queue', color: 'border-amber-500' },
            { key: 'in_progress', title: 'In Progress', color: 'border-[#D4AF37]' },
            { key: 'done', title: 'Completed', color: 'border-emerald-600' },
          ].map((col) => {
            const colTasks = kanbanTasks.filter((t) => t.status === col.key);
            return (
              <div key={col.key} className={`bg-[#1C0508] p-4 rounded-xl border-t-4 ${col.color} border-x border-b border-[#800020]`}>
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#800020]">
                  <h4 className="font-serif-display text-sm font-bold text-[#FAF6F0]">{col.title}</h4>
                  <span className="text-xs font-mono-code bg-[#800020] text-[#D4AF37] px-2 py-0.5 rounded font-bold">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {colTasks.map((task) => (
                    <div key={task.id} className="bg-[#2B080D] p-3 rounded border border-[#800020] text-xs font-sans-ui space-y-2">
                      <span className="text-[9px] font-mono-code bg-[#800020] text-[#D4AF37] px-1.5 py-0.5 rounded uppercase">
                        {task.tag}
                      </span>
                      <p className="font-semibold text-[#FAF6F0]">{task.title}</p>

                      <div className="flex gap-1 pt-2 border-t border-[#800020]/50 text-[10px] font-mono-code">
                        {col.key !== 'todo' && (
                          <button
                            onClick={() => moveKanbanTask(task.id, col.key === 'done' ? 'in_progress' : 'todo')}
                            className="bg-[#1C0508] hover:bg-[#800020] px-2 py-0.5 rounded text-[#E2D7C7] cursor-pointer"
                          >
                            ← Move Left
                          </button>
                        )}
                        {col.key !== 'done' && (
                          <button
                            onClick={() => moveKanbanTask(task.id, col.key === 'todo' ? 'in_progress' : 'done')}
                            className="bg-[#1C0508] hover:bg-[#800020] px-2 py-0.5 rounded text-[#D4AF37] cursor-pointer ml-auto"
                          >
                            Move Right →
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Markdown Export Preview Modal */}
      {showMarkdownModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#FAF6F0] text-[#1C1618] p-6 rounded-xl max-w-xl w-full border-2 border-[#800020] shadow-2xl">
            <div className="flex justify-between items-center mb-4 border-b border-[#800020]/20 pb-2">
              <h4 className="font-serif-display text-lg font-bold text-[#800020]">Markdown Export Preview</h4>
              <button
                onClick={() => setShowMarkdownModal(false)}
                className="text-xs font-mono-code bg-[#800020] text-white px-2 py-1 rounded"
              >
                Close
              </button>
            </div>
            <textarea
              readOnly
              rows={10}
              value={exportMarkdown()}
              className="w-full bg-[#2B080D] text-[#D4AF37] font-mono-code text-xs p-3 rounded border border-[#800020] focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};
