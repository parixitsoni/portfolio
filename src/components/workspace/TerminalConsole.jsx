"use client";
import React, { useContext, useRef, useCallback } from "react";
import { Terminal, ChevronUp, ChevronDown, GripHorizontal } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";
import { formatDisplayPath } from "../../hooks/useTerminal";

export const TerminalConsole = ({
  terminalMinimized,
  setTerminalMinimized,
  footerTab,
  setFooterTab,
  consoleLogs,
  consoleInput,
  setConsoleInput,
  handleTerminalSubmit,
  terminalEndRef,
  promptNameMode,
  handleKeyDown,    // from useTerminal hook
  currentPath,      // from useTerminal hook
  suggestionText,   // from useTerminal hook
  terminalHeight,   // controlled height in px (from DeveloperWorkspace)
  setTerminalHeight,// setter for resize
  children,         // Diagnostics panel
}) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const displayPath = formatDisplayPath(currentPath || "/home/parixit");

  // ── Drag/Touch-to-resize handler ─────────────────────────────────────────────
  const handleResizeStart = useCallback((e) => {
    const isTouch = e.type === "touchstart";
    
    // Prevent default scrolling when dragging to resize
    if (e.cancelable) {
      e.preventDefault();
    }
    
    const startY = isTouch ? e.touches[0].clientY : e.clientY;
    const startHeight = terminalHeight;

    const onMove = (ev) => {
      const currentY = ev.type === "touchmove" ? ev.touches[0].clientY : ev.clientY;
      const delta = startY - currentY; // drag up = larger terminal
      const maxH = window.innerHeight * 0.75;
      const newH = Math.max(80, Math.min(maxH, startHeight + delta));
      setTerminalHeight(newH);
    };

    const onUp = () => {
      if (isTouch) {
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", onUp);
      } else {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      }
    };

    if (isTouch) {
      document.addEventListener("touchmove", onMove, { passive: false });
      document.addEventListener("touchend", onUp);
    } else {
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    }
  }, [terminalHeight, setTerminalHeight]);

  return (
    <footer
      className={`bg-slate-100 dark:bg-[#050911]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex flex-col shrink-0 overflow-hidden relative z-10 transition-colors duration-300 ${
        terminalMinimized ? "h-9" : "h-auto"
      }`}
      style={!terminalMinimized ? { height: `${terminalHeight}px` } : undefined}
    >

      {/* ── Drag/Touch resize handle (top of panel) ── */}
      {!terminalMinimized && (
        <div
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeStart}
          className="flex h-3 md:h-2 cursor-ns-resize items-center justify-center shrink-0 bg-slate-200/50 dark:bg-slate-900/50 hover:bg-sky-500/25 dark:hover:bg-sky-500/20 group transition-colors border-b border-slate-200/40 dark:border-slate-800/40 touch-none"
          title="Drag to resize terminal"
        >
          <GripHorizontal
            size={12}
            className="text-slate-400 dark:text-slate-600 opacity-60 md:opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>
      )}

      {/* ── Desktop title bar + tab switcher ── */}
      <div
        onClick={() => setTerminalMinimized(!terminalMinimized)}
        className="hidden md:flex h-8 bg-slate-200/90 dark:bg-[#0c121e]/80 border-b border-slate-300 dark:border-slate-800/60 px-3 items-center justify-between shrink-0 w-full select-none cursor-pointer hover:bg-slate-300/40 dark:hover:bg-[#0c121e]/100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Terminal size={11} className="text-sky-600 dark:text-sky-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 font-heading">
            Console
          </span>
          {/* Inline tab pills */}
          <div className="flex ml-2 gap-0.5">
            {["terminal", "diagnostics"].map(tab => (
              <button
                key={tab}
                type="button"
                onClick={(e) => { e.stopPropagation(); setFooterTab(tab); setTerminalMinimized(false); }}
                className={`px-2.5 h-5 text-center text-[10px] font-bold font-heading rounded-md transition-all capitalize ${
                  footerTab === tab && !terminalMinimized
                    ? "text-sky-600 dark:text-sky-400 bg-sky-500/10 border border-sky-500/20"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800/40"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setTerminalMinimized(!terminalMinimized); }}
          className="p-1 rounded text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-300/40 dark:hover:bg-slate-800/60 transition-all cursor-pointer"
        >
          {terminalMinimized ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {/* ── Mobile tab headers ── */}
      <div
        onClick={() => setTerminalMinimized(!terminalMinimized)}
        className="flex md:hidden border-b border-slate-200 dark:border-slate-800/80 bg-slate-200/90 dark:bg-[#0c121e]/50 px-2 shrink-0 w-full justify-between items-center h-9 select-none cursor-pointer"
      >
        <div className="flex flex-1 h-full">
          {["terminal", "diagnostics"].map(tab => (
            <button
              key={tab}
              type="button"
              onClick={(e) => { e.stopPropagation(); setFooterTab(tab); setTerminalMinimized(false); }}
              className={`px-4 h-full text-center text-xs font-bold font-heading transition-all capitalize ${
                footerTab === tab && !terminalMinimized
                  ? "text-sky-600 dark:text-sky-400 border-b-2 border-sky-500 bg-sky-500/5"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setTerminalMinimized(!terminalMinimized); }}
          className="p-1 rounded text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white mr-1 cursor-pointer"
        >
          {terminalMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      <div className={`flex-1 flex flex-col overflow-hidden w-full ${
        isDark ? "bg-[#02050b]" : "bg-white"
      }`}>

        {/* Interactive Shell — hidden when diagnostics tab active */}
        <div className={`flex-1 flex flex-col p-3 overflow-hidden ${
          footerTab === "terminal" ? "flex" : "hidden"
        }`}>

          {/* Log stream */}
          <div className="flex-1 overflow-y-auto font-mono text-[11px] space-y-1 custom-scrollbar mb-2 px-1 selection:bg-sky-500/20">
            {consoleLogs.map((log, idx) => (
              <div key={idx} className="font-mono leading-relaxed">
                {log.type === "system" && (
                  <span className="text-slate-400 dark:text-slate-500">
                    [{new Date().toLocaleTimeString([], { hour12: false })}] [SYS] {log.text}
                  </span>
                )}
                {log.type === "prompt" && (
                  <span className="text-sky-600 dark:text-sky-400">● {log.text}</span>
                )}
                {log.type === "input" && (
                  <span>
                    {/* Colorized bash prompt in history */}
                    {log.prompt !== undefined && log.prompt !== null && (
                      <>
                        <span className="text-emerald-500 dark:text-emerald-400">parixit</span>
                        <span className="text-slate-400 dark:text-slate-500">@portfolio</span>
                        <span className="text-slate-400 dark:text-slate-500">:</span>
                        <span className="text-sky-500 dark:text-sky-400">{log.prompt}</span>
                        <span className="text-slate-400 dark:text-slate-500">$ </span>
                      </>
                    )}
                    <span className="text-slate-600 dark:text-slate-400">{log.text}</span>
                  </span>
                )}
                {log.type === "output" && (
                  <span className="text-slate-800 dark:text-slate-200">{log.text}</span>
                )}
                {log.type === "error" && (
                  <span className="text-red-500 dark:text-rose-400">⚠ {log.text}</span>
                )}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Input form */}
          <form
            onSubmit={handleTerminalSubmit}
            className={`flex items-center border rounded-lg px-3 h-9 shrink-0 transition-colors ${
              isDark
                ? "bg-slate-950/80 border-slate-800/80"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            {/* Colored bash-style prompt label */}
            <span 
              className="font-mono select-none flex items-center h-full shrink-0 mr-2 whitespace-nowrap leading-none"
              style={{ fontFamily: "'Fira Code', 'Cascadia Code', 'Courier New', monospace", fontSize: "11px", fontWeight: 400 }}
            >
              {promptNameMode ? (
                <span className="text-sky-600 dark:text-sky-500 leading-none">name$&nbsp;</span>
              ) : (
                <span className="flex items-center leading-none">
                  <span className="text-emerald-500 dark:text-emerald-400">parixit</span>
                  <span className="text-slate-400 dark:text-slate-500">@portfolio</span>
                  <span className="text-slate-400 dark:text-slate-500">:</span>
                  <span className="text-sky-500 dark:text-sky-400">{displayPath}</span>
                  <span className="text-slate-400 dark:text-slate-500">$&nbsp;</span>
                </span>
              )}
            </span>

            {/* Input wrapper — ghost text positioned RELATIVE to the input */}
            <div className="flex-1 h-full relative flex items-center overflow-hidden">
              {/* Ghost autocomplete overlay */}
              {suggestionText && (
                <div 
                  className="absolute left-0 top-0 h-full flex items-center pointer-events-none select-none font-mono whitespace-pre overflow-hidden text-slate-400 dark:text-slate-600 leading-none"
                  style={{ fontFamily: "'Fira Code', 'Cascadia Code', 'Courier New', monospace", fontSize: "11px", fontWeight: 400 }}
                >
                  <span className="invisible">{consoleInput}</span>
                  <span>{suggestionText}</span>
                </div>
              )}
              <input
                type="text"
                value={consoleInput}
                onChange={(e) => setConsoleInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={promptNameMode ? "Enter your name here..." : "Type a command or path..."}
                className={`w-full h-full bg-transparent border-none outline-none font-mono text-[11px] p-0 m-0 relative z-10 focus:ring-0 focus:outline-none ${
                  isDark ? "text-white placeholder-slate-700" : "text-slate-800 placeholder-slate-400"
                }`}
                style={{ fontFamily: "'Fira Code', 'Cascadia Code', 'Courier New', monospace", fontSize: "11px", fontWeight: 400 }}
                autoFocus
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </form>
        </div>

        {/* Diagnostics panel */}
        {children}
      </div>
    </footer>
  );
};
export default TerminalConsole;
