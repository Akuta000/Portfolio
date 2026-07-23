import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipForward, Volume2, CheckCircle2, Clock, Plus, Trash2, ListTodo, Sparkles } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface SessionLog {
  id: string;
  mode: string;
  durationMinutes: number;
  completedAt: string;
}

export const InteractivePomodoroTimer: React.FC = () => {
  const [mode, setMode] = useState<'focus' | 'shortBreak' | 'longBreak'>('focus');
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedSessions, setCompletedSessions] = useState<number>(0);

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Write Inditers editorial draft for July issue', completed: false },
    { id: '2', text: 'Refactor SQL grade calculation stored procedure', completed: true },
    { id: '3', text: 'Review Data Structures algorithm notes', completed: false },
  ]);
  const [newTaskText, setNewTaskText] = useState<string>('');
  const [sessionLogs, setSessionLogs] = useState<SessionLog[]>([
    { id: '101', mode: 'Focus Session', durationMinutes: 25, completedAt: '02:30 PM' },
    { id: '102', mode: 'Short Break', durationMinutes: 5, completedAt: '02:55 PM' },
  ]);

  // Mode durations in seconds
  const modeDurations = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  // Play audio chime synthesiser via Web Audio API
  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 note
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5 note

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {
      // Audio fallback
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      playChime();
      setIsRunning(false);

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (mode === 'focus') {
        setCompletedSessions((prev) => prev + 1);
        setSessionLogs((prev) => [
          {
            id: Date.now().toString(),
            mode: 'Focus Session',
            durationMinutes: 25,
            completedAt: timeStr,
          },
          ...prev,
        ]);
        // Switch to break
        setMode('shortBreak');
        setTimeLeft(modeDurations.shortBreak);
      } else {
        setSessionLogs((prev) => [
          {
            id: Date.now().toString(),
            mode: mode === 'shortBreak' ? 'Short Break' : 'Long Break',
            durationMinutes: mode === 'shortBreak' ? 5 : 15,
            completedAt: timeStr,
          },
          ...prev,
        ]);
        setMode('focus');
        setTimeLeft(modeDurations.focus);
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const switchMode = (newMode: 'focus' | 'shortBreak' | 'longBreak') => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(modeDurations[newMode]);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(modeDurations[mode]);
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), text: newTaskText.trim(), completed: false }]);
    setNewTaskText('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const formatDisplayTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const totalModeTime = modeDurations[mode];
  const progressPercent = ((totalModeTime - timeLeft) / totalModeTime) * 100;

  return (
    <div className="bg-[#2B080D] text-[#FAF6F0] p-5 sm:p-7 rounded-xl border-2 border-[#800020] shadow-xl my-4">
      {/* Header */}
      <div className="border-b border-[#800020] pb-4 mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-xs font-mono-code text-[#D4AF37] uppercase font-bold tracking-widest">
              Live System Sandbox • Editorial Pomodoro Workstation
            </span>
          </div>
          <h3 className="font-serif-display text-2xl font-bold text-[#FAF6F0] mt-1">
            Focus &amp; Writing Time-Boxing Engine
          </h3>
        </div>
        <div className="flex items-center gap-2 font-mono-code text-xs bg-[#800020] px-3 py-1.5 rounded border border-[#D4AF37]/30 text-[#D4AF37]">
          <Sparkles className="w-3.5 h-3.5" /> Sessions Completed: <span className="font-bold text-white">{completedSessions}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Timer Display */}
        <div className="lg:col-span-7 bg-[#1C0508] p-6 rounded-xl border border-[#800020] flex flex-col items-center justify-center text-center">
          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-2 bg-[#2B080D] p-1.5 rounded-lg border border-[#800020] mb-6">
            <button
              onClick={() => switchMode('focus')}
              className={`text-xs font-mono-code font-bold px-3 py-1.5 rounded transition-all cursor-pointer ${
                mode === 'focus' ? 'bg-[#800020] text-[#D4AF37] shadow-xs' : 'text-[#E2D7C7]/70 hover:text-white'
              }`}
            >
              Focus (25m)
            </button>
            <button
              onClick={() => switchMode('shortBreak')}
              className={`text-xs font-mono-code font-bold px-3 py-1.5 rounded transition-all cursor-pointer ${
                mode === 'shortBreak' ? 'bg-[#800020] text-[#D4AF37] shadow-xs' : 'text-[#E2D7C7]/70 hover:text-white'
              }`}
            >
              Short Break (5m)
            </button>
            <button
              onClick={() => switchMode('longBreak')}
              className={`text-xs font-mono-code font-bold px-3 py-1.5 rounded transition-all cursor-pointer ${
                mode === 'longBreak' ? 'bg-[#800020] text-[#D4AF37] shadow-xs' : 'text-[#E2D7C7]/70 hover:text-white'
              }`}
            >
              Long Break (15m)
            </button>
          </div>

          {/* Vintage Circular Progress Timer */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 my-2 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="42%"
                className="stroke-[#3D141A]"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50%"
                cy="50%"
                r="42%"
                className="stroke-[#D4AF37] transition-all duration-1000 ease-linear"
                strokeWidth="8"
                strokeDasharray="264%"
                strokeDashoffset={`${264 - (264 * progressPercent) / 100}%`}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono-code text-4xl sm:text-5xl font-black text-[#FAF6F0] tracking-tight">
                {formatDisplayTime(timeLeft)}
              </span>
              <span className="font-serif-body italic text-xs text-[#D4AF37] mt-1 capitalize">
                {mode === 'focus' ? 'Deep Focus Session' : mode === 'shortBreak' ? 'Resting Interval' : 'Extended Pause'}
              </span>
            </div>
          </div>

          {/* Timer Controls */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={toggleTimer}
              className="bg-[#D4AF37] hover:bg-[#F2C94C] text-[#2B080D] font-sans-ui font-black text-sm py-2.5 px-6 rounded-lg flex items-center gap-2 cursor-pointer transition-transform active:scale-95 shadow-md"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isRunning ? 'Pause' : 'Start Cycle'}</span>
            </button>
            <button
              onClick={resetTimer}
              className="bg-[#800020] hover:bg-[#A3283B] text-[#FAF6F0] font-sans-ui font-semibold text-xs p-2.5 rounded-lg cursor-pointer transition-colors border border-[#D4AF37]/30"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={playChime}
              className="bg-[#800020] hover:bg-[#A3283B] text-[#FAF6F0] font-sans-ui font-semibold text-xs p-2.5 rounded-lg cursor-pointer transition-colors border border-[#D4AF37]/30"
              title="Test Chime Sound"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Task Queue & Session History Column */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          {/* Active Work Queue */}
          <div className="bg-[#1C0508] p-4 rounded-xl border border-[#800020]">
            <h4 className="font-serif-display text-sm font-bold text-[#D4AF37] border-b border-[#800020] pb-2 mb-3 flex items-center gap-1.5">
              <ListTodo className="w-4 h-4 text-[#D4AF37]" /> Session Focus Tasks
            </h4>

            <form onSubmit={addTask} className="flex items-center gap-2 mb-3">
              <input
                type="text"
                placeholder="Add writing or coding task..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#2B080D] border border-[#800020] rounded text-xs text-white placeholder-[#E2D7C7]/40 focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                className="bg-[#800020] hover:bg-[#A3283B] text-[#D4AF37] p-1.5 rounded cursor-pointer shrink-0 border border-[#D4AF37]/30"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>

            <ul className="space-y-1.5 max-h-36 overflow-y-auto pr-1 text-xs font-sans-ui">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`flex items-center justify-between p-2 rounded border transition-colors ${
                    task.completed ? 'bg-[#2B080D]/50 border-[#800020]/40 text-[#E2D7C7]/50 line-through' : 'bg-[#2B080D] border-[#800020] text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 cursor-pointer flex-1" onClick={() => toggleTask(task.id)}>
                    <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${task.completed ? 'text-emerald-500' : 'text-[#800020]'}`} />
                    <span className="truncate">{task.text}</span>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-[#E2D7C7]/40 hover:text-red-400 p-0.5 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Session Log */}
          <div className="bg-[#1C0508] p-4 rounded-xl border border-[#800020]">
            <h4 className="font-serif-display text-xs font-bold text-[#D4AF37] border-b border-[#800020] pb-1.5 mb-2">
              Recent Session Logs
            </h4>
            <div className="space-y-1.5 text-[11px] font-mono-code text-[#E2D7C7]">
              {sessionLogs.map((log) => (
                <div key={log.id} className="flex justify-between items-center bg-[#2B080D] p-1.5 rounded border border-[#800020]/60">
                  <span className="text-[#D4AF37] font-semibold">{log.mode}</span>
                  <span>{log.durationMinutes}m</span>
                  <span className="text-[#E2D7C7]/60">{log.completedAt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
