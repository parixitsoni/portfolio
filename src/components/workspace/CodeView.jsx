import React from "react";

export const CodeView = ({ activeFile }) => {
  if (!activeFile) return null;

  const renderHighlightedCode = (file) => {
    const lines = file.content.split("\n");

    return (
      <code className="text-xs font-mono block leading-relaxed selection:bg-sky-500/20 whitespace-pre-wrap break-words">
        {lines.map((line, idx) => {
          let renderedLine = line;
          if (file.type === "json") {
            renderedLine = line
              .replace(/(".*?")\s*:/g, '<span class="text-sky-500 dark:text-sky-400 font-bold">$1</span>:')
              .replace(/:\s*(".*?")/g, ': <span class="text-emerald-600 dark:text-emerald-400 font-medium">$1</span>')
              .replace(/:\s*(\d+|true|false)/g, ': <span class="text-amber-600 dark:text-amber-500 font-medium">$1</span>');
          } else if (file.type === "javascript") {
            renderedLine = line
              .replace(/\b(import|export|const|let|var|return|from|default|function)\b/g, '<span class="text-purple-600 dark:text-purple-400 font-bold">$1</span>')
              .replace(/\b(React|ClinicalDashboard|EcomProducts|div|main)\b/g, '<span class="text-yellow-600 dark:text-yellow-500">$1</span>')
              .replace(/(".*?"|'.*?')/g, '<span class="text-emerald-600 dark:text-emerald-400">$1</span>');
          } else if (file.type === "markdown") {
            renderedLine = line
              .replace(/^(#+ .*)$/g, '<span class="text-sky-600 dark:text-sky-400 font-bold">$1</span>')
              .replace(/(\*\*.*?\*\*)/g, '<span class="text-amber-600 dark:text-amber-500 font-bold">$1</span>')
              .replace(/(- .*)$/g, '<span class="text-slate-650 dark:text-slate-350">$1</span>');
          }
          
          return (
            <div key={idx} className="flex group hover:bg-slate-200/40 dark:hover:bg-slate-800/40 px-4">
              <span className="w-8 text-slate-400 dark:text-slate-600 select-none text-right pr-3 font-mono text-[10px] border-r border-slate-300 dark:border-slate-800/60 shrink-0">{idx + 1}</span>
              <span className="pl-4 text-slate-700 dark:text-slate-300 font-mono whitespace-pre-wrap break-words flex-1" dangerouslySetInnerHTML={{ __html: renderedLine || "&nbsp;" }} />
            </div>
          );
        })}
      </code>
    );
  };

  return (
    <pre className="font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap break-words overflow-x-hidden py-4">
      {renderHighlightedCode(activeFile)}
    </pre>
  );
};
