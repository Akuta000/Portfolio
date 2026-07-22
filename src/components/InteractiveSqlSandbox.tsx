import React, { useState } from 'react';
import { Play, Database, CheckCircle, RefreshCw, Terminal, Code } from 'lucide-react';

interface StudentRecord {
  id: string;
  name: string;
  email: string;
  program: string;
  gpa: number;
}

const INITIAL_STUDENTS: StudentRecord[] = [
  { id: '2023-7478', name: 'Karl David Z. Ocfemia', email: 'kdzo2023@bicol-u.edu.ph', program: 'BS Computer Science', gpa: 1.25 },
  { id: '2023-1102', name: 'Maria Santos', email: 'msantos@bicol-u.edu.ph', program: 'BS Computer Science', gpa: 1.50 },
  { id: '2023-4589', name: 'John Doe', email: 'jdoe@bicol-u.edu.ph', program: 'BS Information Technology', gpa: 2.10 },
  { id: '2023-8821', name: 'Angela Reyes', email: 'areyes@bicol-u.edu.ph', program: 'BS Computer Science', gpa: 1.35 },
  { id: '2023-3390', name: 'Rafael Cruz', email: 'rcruz@bicol-u.edu.ph', program: 'BS Information Technology', gpa: 1.85 },
];

export const InteractiveSqlSandbox: React.FC = () => {
  const [query, setQuery] = useState<string>(
    `SELECT student_id, name, program, gpa\nFROM Students\nWHERE program = 'BS Computer Science'\nORDER BY gpa ASC;`
  );
  const [results, setResults] = useState<StudentRecord[]>(
    INITIAL_STUDENTS.filter(s => s.program === 'BS Computer Science').sort((a, b) => a.gpa - b.gpa)
  );
  const [statusMsg, setStatusMsg] = useState<string>('Query executed successfully. 3 rows returned.');
  const [executionTime, setExecutionTime] = useState<string>('0.002s');

  const presetQueries = [
    {
      label: 'Top CS Scholars (GPA <= 1.50)',
      sql: `SELECT student_id, name, program, gpa\nFROM Students\nWHERE program = 'BS Computer Science' AND gpa <= 1.50\nORDER BY gpa ASC;`,
      filter: () => {
        const res = INITIAL_STUDENTS.filter(s => s.program === 'BS Computer Science' && s.gpa <= 1.50).sort((a,b) => a.gpa - b.gpa);
        setResults(res);
        setStatusMsg(`Query executed successfully. ${res.length} rows returned.`);
      }
    },
    {
      label: 'All Students in Database',
      sql: `SELECT * FROM Students;`,
      filter: () => {
        setResults([...INITIAL_STUDENTS]);
        setStatusMsg(`Query executed successfully. ${INITIAL_STUDENTS.length} rows returned.`);
      }
    },
    {
      label: 'BS Information Technology Students',
      sql: `SELECT * FROM Students WHERE program = 'BS Information Technology';`,
      filter: () => {
        const res = INITIAL_STUDENTS.filter(s => s.program === 'BS Information Technology');
        setResults(res);
        setStatusMsg(`Query executed successfully. ${res.length} rows returned.`);
      }
    }
  ];

  const handleRunQuery = () => {
    const startTime = performance.now();
    const cleanQ = query.toLowerCase();

    if (cleanQ.includes('where program = \'bs information technology\'')) {
      const res = INITIAL_STUDENTS.filter(s => s.program === 'BS Information Technology');
      setResults(res);
      setStatusMsg(`Query executed successfully. ${res.length} rows returned.`);
    } else if (cleanQ.includes('gpa <= 1.50')) {
      const res = INITIAL_STUDENTS.filter(s => s.gpa <= 1.50).sort((a,b) => a.gpa - b.gpa);
      setResults(res);
      setStatusMsg(`Query executed successfully. ${res.length} rows returned.`);
    } else {
      setResults([...INITIAL_STUDENTS]);
      setStatusMsg(`Query executed successfully. ${INITIAL_STUDENTS.length} rows returned.`);
    }

    const duration = ((performance.now() - startTime) / 1000).toFixed(3);
    setExecutionTime(`${duration}s`);
  };

  return (
    <div className="bg-[#2B080D] text-[#FAF6F0] rounded-lg p-5 border border-[#800020] shadow-xl my-6">
      <div className="flex items-center justify-between border-b border-[#800020]/60 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-[#D4AF37]" />
          <span className="font-serif-display text-lg font-bold text-[#FAF6F0]">Interactive SQL Execution Engine</span>
        </div>
        <span className="text-xs font-mono-code bg-[#800020] text-[#D4AF37] px-2.5 py-1 rounded-full border border-[#D4AF37]/40">
          BU Polangui Course DB (Simulated)
        </span>
      </div>

      <p className="text-xs text-[#E2D7C7]/80 font-sans-ui mb-3">
        Try executing real SQL queries against Karl&apos;s Course Management System relational schema:
      </p>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {presetQueries.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => {
              setQuery(preset.sql);
              preset.filter();
            }}
            className="text-xs font-sans-ui px-3 py-1.5 rounded bg-[#4A0E17] text-[#D4AF37] hover:bg-[#800020] border border-[#800020] transition-colors cursor-pointer"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Query Editor Box */}
      <div className="relative mb-4">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={4}
          className="w-full bg-[#1C0B0E] text-[#D4AF37] font-mono-code text-xs p-3.5 rounded border border-[#800020] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
          placeholder="Enter SQL Query..."
        />
        <button
          onClick={handleRunQuery}
          className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-[#800020] text-[#FAF6F0] hover:bg-[#A3283B] text-xs font-sans-ui font-semibold px-3 py-1.5 rounded shadow cursor-pointer transition-all"
        >
          <Play className="w-3.5 h-3.5 text-[#D4AF37]" /> Execute Query
        </button>
      </div>

      {/* Execution Info */}
      <div className="flex items-center justify-between text-xs font-mono-code text-[#E2D7C7]/70 bg-[#1C0B0E]/60 px-3 py-2 rounded mb-3 border border-[#800020]/40">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <CheckCircle className="w-3.5 h-3.5" /> {statusMsg}
        </span>
        <span>Exec Time: {executionTime}</span>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto rounded border border-[#800020]/60">
        <table className="w-full text-left text-xs font-mono-code">
          <thead className="bg-[#4A0E17] text-[#D4AF37]">
            <tr>
              <th className="p-2.5 border-b border-[#800020]">student_id</th>
              <th className="p-2.5 border-b border-[#800020]">full_name</th>
              <th className="p-2.5 border-b border-[#800020]">program</th>
              <th className="p-2.5 border-b border-[#800020] text-right">gpa</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#800020]/40 bg-[#1C0B0E]/80">
            {results.map((row) => (
              <tr key={row.id} className="hover:bg-[#4A0E17]/40 transition-colors">
                <td className="p-2.5 text-[#D4AF37] font-bold">{row.id}</td>
                <td className="p-2.5 text-[#FAF6F0]">{row.name}</td>
                <td className="p-2.5 text-[#E2D7C7]/80">{row.program}</td>
                <td className="p-2.5 text-right font-bold text-amber-300">{row.gpa.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
