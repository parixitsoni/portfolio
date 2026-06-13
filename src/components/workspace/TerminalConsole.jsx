"use client";
import React, { useContext, useRef, useCallback, useEffect } from "react";
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
  customPrompt,
  handleKeyDown,
  currentPath,
  suggestionText,
  terminalHeight,
  setTerminalHeight,
  children,
}) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const displayPath = formatDisplayPath(currentPath || "/home/parixit");

  // ── Refs for stale-closure-free access inside pointer event handlers ──────────
  const minimizedRef = useRef(terminalMinimized);
  const heightRef    = useRef(terminalHeight);
  useEffect(() => { minimizedRef.current = terminalMinimized; }, [terminalMinimized]);
  useEffect(() => { heightRef.current    = terminalHeight;    }, [terminalHeight]);

  // Grip / drag-strip ref — we attach Pointer Events directly so we can call
  // setPointerCapture() which gives us smooth tracking even if the pointer
  // leaves the element on fast drags (mobile & desktop).
  const gripRef = useRef(null);
  const mobileGripRef = useRef(null);

  const attachDrag = useCallback((el) => {
    if (!el) return;

    let startY       = 0;
    let startHeight  = 0;
    let hasMoved     = false;
    let pointerId    = null;

    const onPointerDown = (e) => {
      // Only handle primary pointer (left button or first touch)
      if (e.button !== undefined && e.button !== 0) return;

      startY      = e.clientY;
      startHeight = heightRef.current;
      hasMoved    = false;
      pointerId   = e.pointerId;

      // Capture so move/up events always reach us even outside the element
      try { el.setPointerCapture(e.pointerId); } catch (_) { /* ignore */ }

      e.preventDefault();
    };

    const onPointerMove = (e) => {
      if (pointerId === null || e.pointerId !== pointerId) return;

      const delta = startY - e.clientY; // positive = dragging up = taller

      if (Math.abs(delta) > 3) {
        hasMoved = true;

        // Expanding from minimized state
        if (minimizedRef.current && delta > 0) {
          setTerminalMinimized(false);
        }
      }

      if (!minimizedRef.current || (hasMoved && delta > 0)) {
        const maxH  = window.innerHeight * 0.75;
        const newH  = Math.max(80, Math.min(maxH, startHeight + delta));
        setTerminalHeight(newH);
      }

      e.preventDefault();
    };

    const onPointerUp = (e) => {
      if (pointerId === null || e.pointerId !== pointerId) return;

      // Tap (no significant movement) → toggle minimize
      if (!hasMoved) {
        setTerminalMinimized((prev) => !prev);
      }

      pointerId = null;
      e.preventDefault();
    };

    el.addEventListener("pointerdown", onPointerDown, { passive: false });
    el.addEventListener("pointermove", onPointerMove, { passive: false });
    el.addEventListener("pointerup",   onPointerUp,   { passive: false });
    el.addEventListener("pointercancel", onPointerUp, { passive: false });

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup",   onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
    };
  }, [setTerminalMinimized, setTerminalHeight]);

  // Attach drag to desktop grip
  useEffect(() => {
    const el = gripRef.current;
    if (!el) return;
    return attachDrag(el);
  }, [attachDrag]);

  // Attach drag to mobile grip
  useEffect(() => {
    const el = mobileGripRef.current;
    if (!el) return;
    return attachDrag(el);
  }, [attachDrag]);

  return (
    <footer
      className={`bg-slate-100 dark:bg-[#050911]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex flex-col shrink-0 overflow-hidden relative z-10 transition-colors duration-300 ${
        terminalMinimized ? "h-9" : "h-auto"
      }`}
      style={!terminalMinimized ? { height: `${terminalHeight}px` } : undefined}
    >

      {/* ── Desktop: title bar + drag handle ── */}
      <div className="hidden md:flex h-8 bg-slate-200/90 dark:bg-[#0c121e]/80 border-b border-slate-300 dark:border-slate-800/60 px-3 items-center justify-between shrink-0 w-full select-none transition-colors relative">

        {/* Left section — tabs (not draggable so clicks work) */}
        <div className="flex items-center gap-2 z-10 pointer-events-auto">
          <Terminal size={11} className="text-sky-600 dark:text-sky-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 font-heading">
            Console
          </span>
          <div className="flex ml-2 gap-0.5">
            {["terminal", "diagnostics"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFooterTab(tab);
                  setTerminalMinimized(false);
                }}
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

        {/* Centre drag strip — full-width invisible overlay behind tabs */}
        <div
          ref={gripRef}
          className="absolute inset-0 z-0 cursor-ns-resize flex items-center justify-center"
          style={{ touchAction: "none" }}
          title="Drag to resize"
        >
          {!terminalMinimized && (
            <GripHorizontal
              size={12}
              className="text-slate-400 dark:text-slate-600 opacity-60 pointer-events-none"
            />
          )}
        </div>

        {/* Right: minimize button */}
        <div className="z-10 pointer-events-auto">
          <button
            type="button"
            onClick={() => setTerminalMinimized((p) => !p)}
            className="p-1 rounded text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-300/40 dark:hover:bg-slate-800/60 transition-all cursor-pointer"
          >
            {terminalMinimized ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
        </div>
      </div>

      {/* ── Mobile: dedicated drag strip above tab bar ── */}
      <div className="flex md:hidden flex-col shrink-0 select-none">

        {/* Drag handle strip */}
        <div
          ref={mobileGripRef}
          className="w-full flex items-center justify-center py-1.5 bg-slate-200/90 dark:bg-[#0c121e]/80 cursor-ns-resize active:bg-slate-300/60 dark:active:bg-[#0c121e] transition-colors"
          style={{ touchAction: "none" }}
          title="Drag to resize"
        >
          <div className="w-10 h-1 rounded-full bg-slate-400/60 dark:bg-slate-600/80" />
        </div>

        {/* Tab header row */}
        <div className="border-b border-slate-200 dark:border-slate-800/80 bg-slate-200/60 dark:bg-[#0c121e]/50 px-2 flex w-full justify-between items-center h-8">
          <div className="flex flex-1 h-full">
            {["terminal", "diagnostics"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setFooterTab(tab);
                  setTerminalMinimized(false);
                }}
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
            onClick={() => setTerminalMinimized((p) => !p)}
            className="p-1 rounded text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white mr-1 cursor-pointer"
          >
            {terminalMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* ── Console body ── */}
      <div className={`flex-1 flex flex-col overflow-hidden w-full ${isDark ? "bg-[#02050b]" : "bg-white"}`}>

        {/* Terminal shell — shown when terminal tab active */}
        <div className={`flex-1 flex flex-col p-3 overflow-hidden ${footerTab === "terminal" ? "flex" : "hidden"}`}>

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
                  <span className={log.className || "text-slate-800 dark:text-slate-200"}>{log.text}</span>
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
            <span
              className="font-mono select-none flex items-center h-full shrink-0 mr-2 whitespace-nowrap leading-none"
              style={{ fontFamily: "'Fira Code', 'Cascadia Code', 'Courier New', monospace", fontSize: "11px", fontWeight: 400 }}
            >
              {customPrompt ? (
                <span className="text-sky-600 dark:text-sky-500 leading-none">{customPrompt}$&nbsp;</span>
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
                placeholder={customPrompt ? "Enter input here..." : "Type a command or path..."}
                className={`w-full h-full bg-transparent border-none outline-none font-mono text-[11px] p-0 m-0 relative z-10 focus:ring-0 focus:outline-none ${
                  isDark ? "text-white placeholder-slate-700" : "text-slate-800 placeholder-slate-400"
                }`}
                style={{ fontFamily: "'Fira Code', 'Cascadia Code', 'Courier New', monospace", fontSize: "11px", fontWeight: 400 }}
                autoFocus
                autoComplete="off"
                spellCheck={false}
                enterKeyHint="go"
              />
              <button type="submit" className="hidden" aria-hidden="true" />
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
