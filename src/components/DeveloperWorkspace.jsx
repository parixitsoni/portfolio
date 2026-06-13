"use client";
import React, { useState, useEffect, useContext } from "react";
import { FileCode, Play, Code, X } from "lucide-react";
import { WindowHeader } from "./workspace/WindowHeader";
import { Explorer } from "./workspace/Explorer";
import { CodeView } from "./workspace/CodeView";
import { VisualPreview } from "./workspace/VisualPreview";
import { TerminalConsole } from "./workspace/TerminalConsole";
import { Diagnostics } from "./workspace/Diagnostics";
import { FILE_SYSTEM } from "../constants/file-system";
import { useTerminal } from "../hooks/useTerminal";
import { ThemeContext } from "../context/ThemeContext";

export const getFileIcon = (file) => {
  if (file.type === "javascript") {
    return <span className="text-amber-500 font-mono text-[10px] font-bold select-none shrink-0 leading-none">JS</span>;
  }
  if (file.type === "json") {
    return <span className="text-sky-500 font-mono text-[10px] font-bold select-none shrink-0 leading-none">{"{}"}</span>;
  }
  if (file.type === "markdown") {
    return <span className="text-emerald-500 font-mono text-[10px] font-bold select-none shrink-0 leading-none">MD</span>;
  }
  return <span className="text-slate-400 font-mono text-[10px] font-bold select-none shrink-0 leading-none">TXT</span>;
};

export const DeveloperWorkspace = () => {
  const [openFolders, setOpenFolders] = useState({
    profile: true,
    experience: true,
    projects: true,
    academic: false,
    contact: false
  });
  
  // Selection states
  const [activeFile, setActiveFile] = useState(FILE_SYSTEM.profile.files["bio.md"]);
  const [openTabs, setOpenTabs] = useState([FILE_SYSTEM.profile.files["bio.md"]]);
  const [viewMode, setViewMode] = useState("preview"); // "code" | "preview"
  
  // Sidebar expand/collapse and responsive states
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // VS Code style icons-only sidebar state
  
  // Console tabs states
  const [footerTab, setFooterTab] = useState("terminal"); // "terminal" | "diagnostics" on mobile
  const [terminalMinimized, setTerminalMinimized] = useState(true);
  const [terminalHeight, setTerminalHeight] = useState(192); // px — user-resizable
  
  // Digital clock
  const [time, setTime] = useState("");

  const { theme, toggleTheme, setThemeMode } = useContext(ThemeContext);

  // Custom hook for terminal commands, filesystem nav, history & shortcuts
  const {
    consoleInput,
    setConsoleInput,
    consoleLogs,
    promptNameMode,
    customPrompt,     // custom dynamic prompt text
    handleTerminalSubmit,
    handleKeyDown,
    terminalEndRef,
    currentPath,
    suggestionText,
    isExiting,
  } = useTerminal(toggleTheme, setTerminalMinimized, setThemeMode, theme);

  // Update clock
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Listen for global keyboard shortcuts on desktop
  useEffect(() => {
    let ctrlKActive = false;
    let timer = null;

    const handleGlobalKeyDown = (e) => {
      // 1. Toggle sidebar: Ctrl + B or Cmd + B
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setSidebarCollapsed(prev => !prev);
        return;
      }

      // 2. Chord check for Ctrl + K + W: Ctrl + K (or Cmd + K)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        ctrlKActive = true;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          ctrlKActive = false;
        }, 1500); // 1.5 second window for chord
        return;
      }

      // If Ctrl + K was pressed, and now W is pressed
      if (ctrlKActive && e.key.toLowerCase() === "w") {
        e.preventDefault();
        ctrlKActive = false;
        if (timer) clearTimeout(timer);
        setOpenTabs([]);
        return;
      }

      // 3. Close active tab: Ctrl + W or Cmd + W
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "w") {
        if (!ctrlKActive) {
          e.preventDefault();
          if (activeFile && openTabs.length > 0) {
            const tabName = activeFile.name;
            const updatedTabs = openTabs.filter(tab => tab.name !== tabName);
            setOpenTabs(updatedTabs);
            if (updatedTabs.length > 0) {
              setActiveFile(updatedTabs[updatedTabs.length - 1]);
            }
          }
        }
        return;
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
      if (timer) clearTimeout(timer);
    };
  }, [activeFile, openTabs, setSidebarCollapsed]);

  // Folder state controls
  const toggleFolder = (folderName) => {
    setOpenFolders(prev => ({ ...prev, [folderName]: !prev[folderName] }));
  };

  const expandAll = () => {
    setOpenFolders({
      profile: true,
      experience: true,
      projects: true,
      academic: true,
      contact: true
    });
  };

  const collapseAll = () => {
    setOpenFolders({
      profile: false,
      experience: false,
      projects: false,
      academic: false,
      contact: false
    });
  };

  // Select file handler
  const selectFile = (fileObj) => {
    setActiveFile(fileObj);
    if (!openTabs.find(tab => tab.name === fileObj.name)) {
      setOpenTabs(prev => [...prev, fileObj]);
    }
    setSidebarOpen(false);
  };

  // Close tab handler
  const closeTab = (tabName, e) => {
    e.stopPropagation();
    const updatedTabs = openTabs.filter(tab => tab.name !== tabName);
    setOpenTabs(updatedTabs);
    
    if (activeFile.name === tabName && updatedTabs.length > 0) {
      setActiveFile(updatedTabs[updatedTabs.length - 1]);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-dvh bg-slate-50 dark:bg-[#02050b] text-slate-700 dark:text-slate-200 z-50 flex flex-col font-sans select-none overflow-hidden font-medium transition-colors duration-300">
      
      {/* Exit overlay — prevents flash during redirect */}
      {isExiting && (
        <div className="fixed inset-0 z-[9999] bg-[#02050b] flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-sky-500/30 border-t-sky-500 animate-spin" />
          <p className="text-sky-400 font-mono text-xs tracking-widest">Redirecting to Classic Theme...</p>
        </div>
      )}
      
      {/* Background neon glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-sky-500/[0.03] dark:bg-sky-500/[0.03] rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-violet-600/[0.03] dark:bg-violet-600/[0.03] rounded-full blur-[150px]"></div>
      </div>

      {/* 1. MOCK IDE TOPBAR PANEL */}
      <WindowHeader 
        time={time} 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      <div className="flex-1 flex overflow-hidden relative z-10">
        
        {/* 2a. FILE EXPLORER SIDEBAR */}
        <Explorer 
          FILE_SYSTEM={FILE_SYSTEM} 
          openFolders={openFolders} 
          toggleFolder={toggleFolder} 
          expandAll={expandAll}
          collapseAll={collapseAll}
          activeFile={activeFile} 
          selectFile={selectFile} 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />

        {/* Sidebar backdrop blur overlay on mobile */}
        {sidebarOpen && (
          <div 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden absolute inset-0 bg-black/65 backdrop-blur-md z-45"
          />
        )}

        {/* 2b. CODE EDITOR SECTION */}
        <section className="flex-1 flex flex-col bg-white dark:bg-[#02050b] overflow-hidden transition-colors duration-300">
          
          {/* Tabs bar */}
          <div className="h-9 bg-slate-100 dark:bg-[#050811] border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between px-2 shrink-0 transition-colors duration-300">
            <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar flex-1 min-w-0 mr-2">
              {openTabs.map(tab => {
                const isActive = activeFile.name === tab.name;
                return (
                  <div
                    key={tab.name}
                    onClick={() => selectFile(tab)}
                    className={`h-9 flex items-center gap-2 px-3 py-1.5 border-r border-t-2 border-slate-200 dark:border-slate-800/80 text-[11px] font-semibold transition-all cursor-pointer shrink-0 ${
                      isActive 
                        ? "bg-white dark:bg-[#02050b] text-sky-600 dark:text-sky-400 border-t-sky-500 border-r-slate-300 dark:border-r-slate-800 font-bold" 
                        : "border-t-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800/30 hover:text-slate-800 dark:hover:text-slate-200"
                    }`}
                  >
                    {getFileIcon(tab)}
                    <span className="font-heading">{tab.name}</span>
                    <button 
                      onClick={(e) => closeTab(tab.name, e)}
                      className="p-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      <X size={10} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Preview mode selection toggle */}
            {openTabs.length > 0 && (
              <div className="flex items-center bg-slate-200/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-lg p-0.5 text-[10px] font-bold mr-2 shrink-0 select-none">
                <button
                  onClick={() => setViewMode("code")}
                  className={`flex items-center gap-1 px-1.5 py-1 rounded-md transition-all font-heading ${
                    viewMode === "code" 
                      ? "bg-white dark:bg-slate-800/80 text-sky-600 dark:text-sky-400 shadow-sm" 
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  }`}
                >
                  <Code size={11} />
                  <span className="hidden sm:inline">Code View</span>
                </button>
                <button
                  onClick={() => setViewMode("preview")}
                  className={`flex items-center gap-1 px-1.5 py-1 rounded-md transition-all font-heading ${
                    viewMode === "preview" 
                      ? "bg-white dark:bg-slate-800/80 text-sky-600 dark:text-sky-400 shadow-sm" 
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  }`}
                >
                  <Play size={11} />
                  <span className="hidden sm:inline">Visual Tab</span>
                </button>
              </div>
            )}
          </div>

          {/* Code View Editor body */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-5 custom-scrollbar bg-white dark:bg-[#02050b] transition-colors duration-300">
            {openTabs.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                <FileCode size={48} className="text-slate-300 dark:text-slate-800 mb-3 animate-pulse" />
                <p className="text-xs font-bold uppercase tracking-widest font-heading">No active file open in workspace</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-600 mt-1 font-heading">Select files from explorer sidebar to load details</p>
              </div>
            ) : viewMode === "code" ? (
              <CodeView activeFile={activeFile} />
            ) : (
              <VisualPreview activeFile={activeFile} />
            )}
          </div>
        </section>
      </div>

       {/* 3. TERMINAL AND DIAGNOSTICS CONSOLE AREA */}
      <TerminalConsole
        terminalMinimized={terminalMinimized}
        setTerminalMinimized={setTerminalMinimized}
        footerTab={footerTab}
        setFooterTab={setFooterTab}
        consoleLogs={consoleLogs}
        consoleInput={consoleInput}
        setConsoleInput={setConsoleInput}
        handleTerminalSubmit={handleTerminalSubmit}
        handleKeyDown={handleKeyDown}
        terminalEndRef={terminalEndRef}
        promptNameMode={promptNameMode}
        customPrompt={customPrompt}
        currentPath={currentPath}
        suggestionText={suggestionText}
        terminalHeight={terminalHeight}
        setTerminalHeight={setTerminalHeight}
      >
        <Diagnostics footerTab={footerTab} />
      </TerminalConsole>
    </div>
  );
};
