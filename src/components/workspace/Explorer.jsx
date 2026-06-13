import React from "react";
import { User, Briefcase, FolderGit2, GraduationCap, Mail, ChevronRight, ChevronLeft, ChevronDown, X, Palette, FolderOpen, Folder } from "lucide-react";
import { getThemeRedirectUrl, handleThemeRedirect } from "../../constants/theme-config";

// VS Code style unique icon resolver per folder type
const getFolderTypeIcon = (folderName) => {
  const name = folderName.toLowerCase();
  if (name.includes("profile")) {
    return <User size={14} className="text-sky-500 dark:text-sky-400 shrink-0" />;
  }
  if (name.includes("experience")) {
    return <Briefcase size={14} className="text-emerald-500 dark:text-emerald-400 shrink-0" />;
  }
  if (name.includes("projects")) {
    return <FolderGit2 size={14} className="text-violet-500 dark:text-violet-400 shrink-0" />;
  }
  if (name.includes("academic")) {
    return <GraduationCap size={14} className="text-amber-500 dark:text-amber-400 shrink-0" />;
  }
  if (name.includes("contact")) {
    return <Mail size={14} className="text-rose-500 dark:text-rose-400 shrink-0" />;
  }
  return <Folder size={14} className="text-slate-500 shrink-0" />;
};

// Folder open/closed indicator
const FolderStateIcon = ({ isOpen }) =>
  isOpen
    ? <FolderOpen size={14} className="text-slate-400 dark:text-slate-500 shrink-0" />
    : <Folder size={14} className="text-slate-400 dark:text-slate-500 shrink-0" />;

export const Explorer = ({
  FILE_SYSTEM,
  openFolders,
  toggleFolder,
  expandAll,
  collapseAll,
  activeFile,
  selectFile,
  sidebarOpen,
  setSidebarOpen,
  sidebarCollapsed,
  setSidebarCollapsed
}) => {

  const getFileIcon = (file) => {
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

  const handleRedirect = () => {
    handleThemeRedirect("classic");
  };

  const allFoldersCollapsed = Object.values(openFolders).every(v => v === false);

  const toggleAllFolders = () => {
    if (allFoldersCollapsed) {
      expandAll();
    } else {
      collapseAll();
    }
  };

  // 1. Minimized/Collapsed icons-only layout (VS Code style activity bar) — DESKTOP ONLY
  if (sidebarCollapsed) {
    return (
      <aside className="hidden md:flex w-14 bg-slate-100/95 dark:bg-[#050811]/90 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800/80 flex-col justify-between shrink-0 z-40 transition-all duration-300 ease-in-out">
        <div className="flex flex-col items-center py-2 flex-1">
          {/* Top Expand Toggle */}
          <button 
            onClick={() => setSidebarCollapsed(false)}
            className="p-2.5 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
            title="Expand Sidebar"
          >
            <ChevronRight size={18} />
          </button>
          
          <div className="w-8 h-px bg-slate-200 dark:bg-slate-800/60 my-3"></div>

          {/* Folder Icons Stack */}
          <div className="space-y-4 flex-1 flex flex-col items-center">
            {Object.keys(FILE_SYSTEM).map(folderKey => {
              const folder = FILE_SYSTEM[folderKey];
              const isOpen = openFolders[folderKey];
              
              return (
                <button
                  key={folder.name}
                  onClick={() => {
                    setSidebarCollapsed(false);
                    if (!isOpen) {
                      toggleFolder(folderKey);
                    }
                  }}
                  className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-all relative group cursor-pointer"
                >
                  {getFolderTypeIcon(folderKey)}
                  
                  {/* Tooltip */}
                  <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] px-2.5 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 pointer-events-none whitespace-nowrap capitalize border border-slate-800 tracking-wider">
                    {folder.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Minimized Classic theme switcher */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800/60 flex justify-center bg-slate-100/50 dark:bg-[#050911]/50">
          <button 
            onClick={handleRedirect}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-950/40 hover:bg-slate-50 dark:hover:bg-slate-900/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-sky-500/30 shadow-sm transition-all hover:scale-105 group relative cursor-pointer"
          >
            <Palette size={16} className="text-sky-500" />
            <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] px-2.5 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 pointer-events-none whitespace-nowrap border border-slate-800 tracking-wider">
              Classic Theme
            </span>
          </button>
        </div>
      </aside>
    );
  }

  // 2. Expanded layout
  return (
    <aside className={`
      w-60 md:w-64 bg-slate-100/95 dark:bg-[#050811]/90 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800/80 flex flex-col justify-between shrink-0 z-50 transition-all duration-300 ease-in-out
      absolute md:relative inset-y-0 left-0 transform md:transform-none
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
    `}>
      <div className="p-4 overflow-y-auto custom-scrollbar flex-1">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[10px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase font-heading">File Explorer</h3>
          <div className="flex items-center gap-1">
            {/* Single smart toggle: collapses all if any open, expands all if all closed */}
            <button 
              onClick={toggleAllFolders}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
              title={allFoldersCollapsed ? "Expand All Folders" : "Collapse All Folders"}
            >
              {allFoldersCollapsed 
                ? <FolderOpen size={13} /> 
                : <Folder size={13} />
              }
            </button>
            
            {/* Sidebar Collapse chevron - desktop only */}
            <button
              onClick={() => setSidebarCollapsed(true)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800/60 transition-colors cursor-pointer hidden md:block"
              title="Collapse Sidebar"
            >
              <ChevronLeft size={13} />
            </button>

            {/* Mobile close button */}
            <button 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800/60 transition-colors"
            >
              <X size={13} />
            </button>
          </div>
        </div>
        
        <div className="space-y-1 text-xs font-semibold">
          {Object.keys(FILE_SYSTEM).map(folderKey => {
            const folder = FILE_SYSTEM[folderKey];
            const isOpen = openFolders[folderKey];
            
            return (
              <div key={folder.name} className="space-y-0.5">
                {/* Folder Header - VS Code style: chevron + type icon + name */}
                <button 
                  onClick={() => toggleFolder(folderKey)}
                  className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-white transition-colors text-left"
                >
                  {/* Chevron rotation to show open/closed */}
                  <ChevronRight
                    size={12}
                    className={`text-slate-400 dark:text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-90" : "rotate-0"}`}
                  />
                  {/* Unique folder type icon */}
                  {getFolderTypeIcon(folderKey)}
                  <span className="font-heading ml-0.5 capitalize">{folder.name}</span>
                </button>
                
                {/* Folder Files */}
                {isOpen && (
                  <div className="pl-6 space-y-0.5 border-l border-slate-300 dark:border-slate-800 ml-3.5">
                    {Object.keys(folder.files).map(fileKey => {
                      const file = folder.files[fileKey];
                      const isActive = activeFile.name === file.name;
                      return (
                        <button
                          key={file.name}
                          onClick={() => selectFile(file)}
                          className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all text-left ${
                            isActive 
                              ? "text-sky-600 dark:text-sky-400 border-l-2 border-sky-500 pl-1.5 font-bold bg-sky-500/10 dark:bg-sky-500/15 -ml-px"
                              : "text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800/20 hover:text-slate-800 dark:hover:text-slate-200"
                          }`}
                        >
                          {getFileIcon(file)}
                          <span className="truncate font-sans font-semibold">
                            {file.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Classic Theme Switcher Widget */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800/60 bg-slate-100/50 dark:bg-[#050911]/50 space-y-3 shrink-0">
        <button 
          onClick={handleRedirect}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-950/40 hover:bg-slate-50 dark:hover:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 font-semibold rounded-xl text-xs transition-all border border-slate-200 dark:border-slate-800 hover:border-sky-500/30 shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
        >
          <Palette size={14} className="text-sky-500 group-hover:rotate-45 transition-transform duration-300" />
          <span className="font-heading">Classic Theme</span>
        </button>
      </div>
    </aside>
  );
};
export default Explorer;
