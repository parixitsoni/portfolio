import { useState, useEffect, useRef } from "react";
import { getThemeRedirectUrl, handleThemeRedirect } from "../constants/theme-config";

// ─── Virtual Filesystem ────────────────────────────────────────────────────────
const HOME = "/home/parixit";

const VIRTUAL_FS = {
  "/": { type: "dir", children: ["home"] },
  "/home": { type: "dir", children: ["parixit"] },
  [HOME]: {
    type: "dir",
    children: ["profile", "experience", "projects", "academic", "contact", "resume.pdf", ".bashrc"]
  },
  [`${HOME}/profile`]: { type: "dir", children: ["bio.md"] },
  [`${HOME}/profile/bio.md`]: {
    type: "file", size: "2.4K",
    content: `# Biography - Parixit Soni

Senior Consultant & Frontend Architect based in Udaipur, Rajasthan.

With over 4.2 years of professional experience, I specialize in crafting high-performance, accessible, and scalable web applications using React.js and Next.js. I bridge the gap between complex engineering architectures and minimalist, high-fidelity user experiences.

## Core Values & Architectural Focus
- **Performance**: Optimizing Core Web Vitals for fluid page responsiveness.
- **Accessibility**: Engineering WCAG 2.1 AA compliant elements.
- **Scale**: Designing modular, clean codebases using design systems.`
  },
  [`${HOME}/experience`]: {
    type: "dir",
    children: ["exl_service.json", "cairs_solutions.json", "indianic_infotech.json"]
  },
  [`${HOME}/experience/exl_service.json`]: {
    type: "file", size: "512B",
    content: '{\n  "company": "EXL Service",\n  "title": "Manager, Band C1",\n  "duration": "Jan 2026 — Feb 2026",\n  "location": "Noida, UP (Remote)"\n}'
  },
  [`${HOME}/experience/cairs_solutions.json`]: {
    type: "file", size: "768B",
    content: '{\n  "company": "Cairs Solutions",\n  "title": "Senior Consultant",\n  "duration": "Mar 2024 — Oct 2025",\n  "location": "Visakhapatnam, AP (Remote)"\n}'
  },
  [`${HOME}/experience/indianic_infotech.json`]: {
    type: "file", size: "640B",
    content: '{\n  "company": "IndiaNIC Infotech",\n  "title": "Frontend Developer",\n  "duration": "Aug 2021 — Oct 2023",\n  "location": "Ahmedabad, GJ (Remote)"\n}'
  },
  [`${HOME}/projects`]: { type: "dir", children: ["hsl_dashboard.jsx", "product_list.jsx"] },
  [`${HOME}/projects/hsl_dashboard.jsx`]: {
    type: "file", size: "1.8K",
    content: "import React from 'react';\nimport { ClinicalDashboard } from 'hsl-clinical-command';\n\n// HSL Clinical Dashboard - SaaS Medical command center\nexport const HslClinicalDashboard = () => (\n  <ClinicalDashboard\n    url=\"https://hsl-clinical-dashboard.vercel.app/\"\n    title=\"HSL Dashboard\"\n    tech={[\"Next.js\", \"React\", \"Tailwind CSS\", \"Recharts\"]}\n  />\n);"
  },
  [`${HOME}/projects/product_list.jsx`]: {
    type: "file", size: "1.2K",
    content: "import React from 'react';\nimport { EcomProducts } from 'dynamic-ecom-showcase';\n\n// Dynamic Product List - E-Commerce Showcase\nexport const DynamicProductList = () => (\n  <EcomProducts\n    url=\"https://dynamic-productlist.vercel.app/\"\n    title=\"E-Commerce Showcase\"\n    tech={[\"React.js\", \"Vite\", \"CSS Modules\", \"REST API\"]}\n  />\n);"
  },
  [`${HOME}/academic`]: { type: "dir", children: ["degrees.json"] },
  [`${HOME}/academic/degrees.json`]: {
    type: "file", size: "256B",
    content: '[\n  {\n    "degree": "MCA (Master of Computer Applications)",\n    "institution": "Mohanlal Sukhadia University",\n    "period": "2017 — 2020",\n    "grade": "Postgraduate Degree"\n  },\n  {\n    "degree": "Bachelor of Computer Science",\n    "institution": "Bhupal Nobles P.G. College",\n    "period": "2014 — 2017",\n    "grade": "Undergraduate Degree"\n  }\n]'
  },
  [`${HOME}/contact`]: { type: "dir", children: ["contact_info.txt"] },
  [`${HOME}/contact/contact_info.txt`]: {
    type: "file", size: "128B",
    content: "PARIXIT SONI - CONTACT FILE\n===========================\nEmail    : parikshitsoni85@gmail.com\nPhone    : +91-759-719-1971\nGitHub   : github.com/parixitsoni\nLinkedIn : linkedin.com/in/parixitsoni\nPortfolio: https://parixit.vercel.app"
  },
  [`${HOME}/resume.pdf`]: { type: "file", size: "124K", content: "[Binary PDF — Parixit Soni Resume. Use: resume command to download]" },
  [`${HOME}/.bashrc`]: {
    type: "file", size: "64B", hidden: true,
    content: "# ~/.bashrc — Parixit's shell config\nalias ll='ls -la'\nalias cls='clear'\nexport TERM=xterm-256color\nexport PS1='\\u@portfolio:\\w$ '"
  },
};

// ─── Path Utilities ────────────────────────────────────────────────────────────
const resolvePath = (current, target) => {
  if (!target || target === "~") return HOME;
  if (target === "/") return "/";

  if (target.startsWith("/")) {
    return target.replace(/\/$/, "") || "/";
  }

  const segments = target.split("/");
  let resolved = current.split("/").filter(Boolean);

  for (const seg of segments) {
    if (seg === "..") {
      if (resolved.length > 0) resolved.pop();
    } else if (seg !== "." && seg !== "") {
      resolved.push(seg);
    }
  }

  return "/" + resolved.join("/") || "/";
};

export const formatDisplayPath = (path) => {
  if (path === HOME) return "~";
  if (path.startsWith(HOME + "/")) return "~" + path.slice(HOME.length);
  return path;
};

// ─── Filesystem Command Runners ────────────────────────────────────────────────
const runLs = (args, currentPath) => {
  const showHidden = args.some(a => ["-a", "-la", "-al", "-lah", "-lA"].includes(a));
  const longFormat  = args.some(a => ["-l", "-la", "-al", "-lr", "-rl"].includes(a));
  const reverse     = args.some(a => ["-r", "-lr", "-rl"].includes(a));

  const pathArg = args.find(a => !a.startsWith("-"));
  const targetPath = pathArg ? resolvePath(currentPath, pathArg) : currentPath;
  const node = VIRTUAL_FS[targetPath];

  if (!node) {
    return [{ text: `ls: cannot access '${pathArg}': No such file or directory`, type: "error" }];
  }
  if (node.type === "file") {
    return [{ text: targetPath.split("/").pop(), type: "output" }];
  }

  let children = [...(node.children || [])];
  if (!showHidden) children = children.filter(c => !VIRTUAL_FS[`${targetPath}/${c}`]?.hidden);
  if (reverse) children.reverse();
  if (children.length === 0) return [];

  if (longFormat) {
    const logs = [{ text: `total ${children.length}`, type: "output" }];
    for (const child of children) {
      const childPath = `${targetPath}/${child}`;
      const childNode = VIRTUAL_FS[childPath];
      const isDir  = childNode?.type === "dir";
      const perm   = isDir ? "drwxr-xr-x" : "-rw-r--r--";
      const size   = (childNode?.size || "0B").padStart(6);
      logs.push({ text: `${perm}  parixit  parixit  ${size}  ${child}`, type: "output" });
    }
    return logs;
  }

  // Plain listing — directories get trailing /
  const items = children.map(c => {
    const cNode = VIRTUAL_FS[`${targetPath}/${c}`];
    return cNode?.type === "dir" ? `${c}/` : c;
  });
  return [{ text: items.join("   "), type: "output" }];
};

const runFind = (args, currentPath) => {
  const nameIdx = args.indexOf("-name");
  if (nameIdx === -1 || !args[nameIdx + 1]) {
    return [{ text: "Usage: find [directory] -name [pattern]", type: "error" }];
  }

  const pattern    = args[nameIdx + 1].replace(/^['"]|['"]$/g, "");
  const searchArg  = args.find(a => !a.startsWith("-") && a !== args[nameIdx + 1]);
  const searchDir  = searchArg ? resolvePath(currentPath, searchArg) : currentPath;
  const regexStr   = pattern.replace(/\./g, "\\.").replace(/\*/g, ".*").replace(/\?/g, ".");
  const regex      = new RegExp(`^${regexStr}$`, "i");

  const results = [];
  const search = (dirPath) => {
    const node = VIRTUAL_FS[dirPath];
    if (!node || node.type !== "dir") return;
    for (const child of (node.children || [])) {
      const childPath = `${dirPath}/${child}`;
      if (regex.test(child)) results.push({ text: childPath, type: "output" });
      search(childPath);
    }
  };

  search(searchDir);
  if (results.length === 0) return [{ text: `find: no matches found for '${pattern}'`, type: "output" }];
  return results;
};

// ─── All Commands (for autocomplete) ──────────────────────────────────────────
const ALL_COMMANDS = [
  "cat", "cd", "clear", "cls", "contact", "dir", "download",
  "echo", "exit", "find", "help", "history", "ls",
  "mode", "projects", "pwd", "resume", "skills", "theme", "time", "whoami",
];

// ─── Hook ──────────────────────────────────────────────────────────────────────
export const useTerminal = (toggleTheme, setTerminalMinimized, setThemeMode) => {
  const [consoleInput, setConsoleInput]     = useState("");
  const [consoleLogs, setConsoleLogs]       = useState([]);
  const [userName, setUserName]             = useState("");
  const [promptNameMode, setPromptNameMode] = useState(false);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex]     = useState(-1);
  const [savedInput, setSavedInput]         = useState("");
  const [currentPath, setCurrentPath]       = useState(HOME);
  const [prevPath, setPrevPath]             = useState(HOME);
  const [isExiting, setIsExiting]           = useState(false);
  const terminalEndRef = useRef(null);

  // Initialize terminal on mount
  useEffect(() => {
    const savedName = localStorage.getItem("workspace_username");
    if (savedName) {
      setUserName(savedName);
      setConsoleLogs([
        { text: "Parixit OS Kernel v1.2.0-Production", type: "system" },
        { text: `Welcome back, ${savedName}! Glad to see you again.`, type: "system" },
        { text: "Type 'help' to see all commands. Use ↑↓ arrows for history, Tab to autocomplete.", type: "prompt" },
      ]);
    } else {
      setPromptNameMode(true);
      setConsoleLogs([
        { text: "Parixit OS Kernel v1.2.0-Production", type: "system" },
        { text: "Hello! Welcome to my interactive portfolio workspace.", type: "system" },
        { text: "What is your name? Please type it below:", type: "prompt" },
      ]);
    }
  }, []);

  // Auto-scroll to bottom on new log entries
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleLogs]);

  // ── Tab completion helper ───────────────────────────────────────────────────
  const getTabCompletion = (inputVal, path) => {
    const parts = inputVal.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [inputVal];
    const cmd   = parts[0];
    const arg   = parts.length > 1 ? parts[parts.length - 1] : "";

    if (parts.length === 1) {
      // Complete the command name
      const matches = ALL_COMMANDS.filter(c => c.startsWith(cmd.toLowerCase()));
      if (matches.length === 1) return matches[0].substring(cmd.length);
      if (matches.length > 1) return ""; // TODO: show all matches
      return "";
    }

    // Complete filesystem path argument
    const slashIdx = arg.lastIndexOf("/");
    let dirPath, partial;

    if (slashIdx === -1) {
      dirPath = path;
      partial = arg;
    } else {
      const dirPart = arg.substring(0, slashIdx) || "/";
      dirPath = resolvePath(path, dirPart);
      partial = arg.substring(slashIdx + 1);
    }

    const node = VIRTUAL_FS[dirPath];
    if (!node || node.type !== "dir") return "";

    const visible = node.children.filter(c => !VIRTUAL_FS[`${dirPath}/${c}`]?.hidden);
    const matches = visible.filter(c => c.startsWith(partial));

    if (matches.length === 1) {
      const match = matches[0];
      const isDir = VIRTUAL_FS[`${dirPath}/${match}`]?.type === "dir";
      return match.substring(partial.length) + (isDir ? "/" : "");
    }
    return "";
  };

  // ── Ghost text suggestion (command-only, shown while typing) ───────────────
  const suggestionText = (() => {
    if (!consoleInput || promptNameMode) return "";
    const parts = consoleInput.split(" ");
    if (parts.length > 1) return ""; // Only for bare command typing
    const matched = ALL_COMMANDS.find(c => c.startsWith(consoleInput.toLowerCase()));
    if (matched && matched !== consoleInput.toLowerCase()) {
      return matched.substring(consoleInput.length);
    }
    return "";
  })();

  // ── Keyboard handler (exported) ─────────────────────────────────────────────
  const handleKeyDown = (e) => {
    // Ctrl+L → clear screen
    if (e.ctrlKey && (e.key === "l" || e.key === "L")) {
      e.preventDefault();
      setConsoleLogs([]);
      return;
    }

    // Ctrl+C → cancel current input
    if (e.ctrlKey && (e.key === "c" || e.key === "C")) {
      e.preventDefault();
      const disp = formatDisplayPath(currentPath);
      setConsoleLogs(prev => [
        ...prev,
        { text: `${consoleInput}^C`, prompt: disp, type: "input" },
      ]);
      setConsoleInput("");
      setHistoryIndex(-1);
      return;
    }

    // Ctrl+D → close terminal
    if (e.ctrlKey && (e.key === "d" || e.key === "D")) {
      e.preventDefault();
      setConsoleLogs(prev => [...prev, { text: "logout", type: "system" }]);
      if (setTerminalMinimized) {
        setTerminalMinimized(true);
      }
      return;
    }

    // Tab → autocomplete
    if (e.key === "Tab") {
      e.preventDefault();
      if (!consoleInput) return;
      // Prefer ghost suggestion first, then filesystem completion
      if (suggestionText) {
        setConsoleInput(consoleInput + suggestionText);
        return;
      }
      const completion = getTabCompletion(consoleInput, currentPath);
      if (completion) setConsoleInput(consoleInput + completion);
      return;
    }

    // ArrowRight → accept ghost suggestion (only when cursor is at end)
    if (e.key === "ArrowRight" && suggestionText) {
      const el = e.target;
      if (el.selectionStart === consoleInput.length) {
        e.preventDefault();
        setConsoleInput(consoleInput + suggestionText);
      }
      return;
    }

    // ArrowUp → go to previous command in history
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      if (historyIndex === -1) {
        setSavedInput(consoleInput);
        const idx = commandHistory.length - 1;
        setHistoryIndex(idx);
        setConsoleInput(commandHistory[idx]);
      } else if (historyIndex > 0) {
        const idx = historyIndex - 1;
        setHistoryIndex(idx);
        setConsoleInput(commandHistory[idx]);
      }
      return;
    }

    // ArrowDown → go to next command in history (or restore saved input)
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      if (historyIndex < commandHistory.length - 1) {
        const idx = historyIndex + 1;
        setHistoryIndex(idx);
        setConsoleInput(commandHistory[idx]);
      } else {
        setHistoryIndex(-1);
        setConsoleInput(savedInput);
      }
      return;
    }
  };

  // ── Submit handler ──────────────────────────────────────────────────────────
  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const inputVal = consoleInput.trim();
    if (!inputVal) return;

    // Security check - prevent external links, script injections, and shell injection characters
    const hasUrl = /https?:\/\/[^\s]+/i.test(inputVal) || /www\.[a-z0-9]+/i.test(inputVal);
    const hasInjection = /[;&|`\\<>$\(\)]/g.test(inputVal);
    
    if (hasUrl || hasInjection) {
      const disp = formatDisplayPath(currentPath);
      const newLogs = [
        ...consoleLogs,
        { text: inputVal, prompt: promptNameMode ? null : disp, type: "input" },
        { text: "Security policy violation: External links, script injections, and shell control characters are strictly prohibited.", type: "error" }
      ];
      setConsoleLogs(newLogs);
      setConsoleInput("");
      return;
    }

    // Initial name prompt
    if (promptNameMode) {
      setUserName(inputVal);
      localStorage.setItem("workspace_username", inputVal);
      setPromptNameMode(false);
      setConsoleLogs(prev => [
        ...prev,
        { text: inputVal, type: "input", prompt: null },
        { text: `Hello ${inputVal}! Welcome to my interactive portfolio workspace.`, type: "system" },
        { text: "Type 'help' to see all commands. Use ↑↓ for history, Tab to autocomplete.", type: "prompt" },
      ]);
      setConsoleInput("");
      return;
    }

    // Track history (skip consecutive duplicates)
    setCommandHistory(prev => {
      if (prev[prev.length - 1] === inputVal) return prev;
      return [...prev, inputVal];
    });
    setHistoryIndex(-1);

    // Parse raw input into cmd + args (respects quoted strings)
    const parts   = inputVal.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
    const cmdRaw  = parts[0].toLowerCase();
    const args    = parts.slice(1).map(a => a.replace(/^['"]|['"]$/g, ""));

    const disp     = formatDisplayPath(currentPath);
    const newLogs  = [...consoleLogs, { text: inputVal, prompt: disp, type: "input" }];

    // Autocorrect single-word commands
    let cmd = cmdRaw;
    if (args.length === 0) {
      const matched = ALL_COMMANDS.find(c => c.startsWith(cmdRaw));
      if (matched && matched !== cmdRaw) {
        cmd = matched;
        newLogs.push({ text: `[Autocorrected: '${cmdRaw}' → '${cmd}']`, type: "system" });
      }
    }

    // ── Greeting aliases ──────────────────────────────────────────────────────
    if (["hello", "hi", "hey", "welcome"].includes(cmd)) {
      newLogs.push({ text: `Hello ${userName || "friend"}! Let's build something extraordinary!`, type: "output" });
    } else if (userName && cmd === userName.toLowerCase()) {
      newLogs.push({ text: `Hello ${userName}! That's your name 😄. Type 'help' for commands.`, type: "output" });
    } else {
      switch (cmd) {

        // ── help ──────────────────────────────────────────────────────────────
        case "help":
          newLogs.push({ text: "┌─ Commands ─────────────────────────────────────────┐", type: "output" });
          newLogs.push({ text: "│  FILESYSTEM                                         │", type: "output" });
          newLogs.push({ text: "│  pwd                   Print working directory      │", type: "output" });
          newLogs.push({ text: "│  ls [-a|-l|-r] [dir]   List directory contents      │", type: "output" });
          newLogs.push({ text: "│  dir                   Alias for ls                 │", type: "output" });
          newLogs.push({ text: "│  cd [dir|..|~|-]       Change directory             │", type: "output" });
          newLogs.push({ text: "│  cat [file]            Show file contents           │", type: "output" });
          newLogs.push({ text: "│  find [dir] -name [p]  Search files by pattern      │", type: "output" });
          newLogs.push({ text: "│  echo [text]           Print text                   │", type: "output" });
          newLogs.push({ text: "│  whoami                Current user info            │", type: "output" });
          newLogs.push({ text: "├─ PORTFOLIO ─────────────────────────────────────────┤", type: "output" });
          newLogs.push({ text: "│  skills                Display tech stack matrix    │", type: "output" });
          newLogs.push({ text: "│  projects              List featured projects        │", type: "output" });
          newLogs.push({ text: "│  contact               Display contact details      │", type: "output" });
          newLogs.push({ text: "│  resume / download     Download resume PDF          │", type: "output" });
          newLogs.push({ text: "├─ SYSTEM ────────────────────────────────────────────┤", type: "output" });
          newLogs.push({ text: "│  theme [classic|inter] Switch active theme layout   │", type: "output" });
          newLogs.push({ text: "│  mode [dark|light]     Set theme dark/light mode    │", type: "output" });
          newLogs.push({ text: "│  time                  Show system time             │", type: "output" });
          newLogs.push({ text: "│  history               Show command history         │", type: "output" });
          newLogs.push({ text: "│  clear / cls           Clear terminal screen        │", type: "output" });
          newLogs.push({ text: "│  exit                  Close terminal console       │", type: "output" });
          newLogs.push({ text: "├─ KEYBOARD SHORTCUTS ────────────────────────────────┤", type: "output" });
          newLogs.push({ text: "│  ↑ / ↓          Browse command history              │", type: "output" });
          newLogs.push({ text: "│  Tab            Autocomplete command / path         │", type: "output" });
          newLogs.push({ text: "│  Ctrl+L         Clear screen                        │", type: "output" });
          newLogs.push({ text: "│  Ctrl+C         Cancel current input                │", type: "output" });
          newLogs.push({ text: "│  Ctrl+D         Exit terminal                       │", type: "output" });
          newLogs.push({ text: "└─────────────────────────────────────────────────────┘", type: "output" });
          break;

        // ── clear ─────────────────────────────────────────────────────────────
        case "clear":
        case "cls":
          setConsoleLogs([]);
          setConsoleInput("");
          return;

        // ── pwd ───────────────────────────────────────────────────────────────
        case "pwd":
          newLogs.push({ text: currentPath, type: "output" });
          break;

        // ── whoami ────────────────────────────────────────────────────────────
        case "whoami":
          newLogs.push({ text: "parixit", type: "output" });
          newLogs.push({ text: `uid=1000(parixit) gid=1000(parixit) groups=1000(parixit),4(adm),27(sudo)`, type: "output" });
          break;

        // ── ls / dir ──────────────────────────────────────────────────────────
        case "ls":
        case "dir":
          newLogs.push(...runLs(args, currentPath));
          break;

        // ── cd ────────────────────────────────────────────────────────────────
        case "cd": {
          const target = args[0];
          if (!target || target === "~") {
            setPrevPath(currentPath);
            setCurrentPath(HOME);
            break;
          }
          if (target === "-") {
            const tmp = currentPath;
            setCurrentPath(prevPath);
            setPrevPath(tmp);
            newLogs.push({ text: prevPath, type: "output" });
            break;
          }
          const resolved = resolvePath(currentPath, target);
          const node = VIRTUAL_FS[resolved];
          if (!node) {
            newLogs.push({ text: `cd: ${target}: No such file or directory`, type: "error" });
          } else if (node.type === "file") {
            newLogs.push({ text: `cd: ${target}: Not a directory`, type: "error" });
          } else {
            setPrevPath(currentPath);
            setCurrentPath(resolved);
          }
          break;
        }

        // ── cat ───────────────────────────────────────────────────────────────
        case "cat": {
          if (!args[0]) {
            newLogs.push({ text: "Usage: cat [filename]", type: "error" });
            break;
          }
          const filePath = resolvePath(currentPath, args[0]);
          const fileNode = VIRTUAL_FS[filePath];
          if (!fileNode) {
            newLogs.push({ text: `cat: ${args[0]}: No such file or directory`, type: "error" });
          } else if (fileNode.type === "dir") {
            newLogs.push({ text: `cat: ${args[0]}: Is a directory`, type: "error" });
          } else {
            const lines = (fileNode.content || "").split("\n");
            lines.forEach(line => newLogs.push({ text: line, type: "output" }));
          }
          break;
        }

        // ── echo ──────────────────────────────────────────────────────────────
        case "echo":
          newLogs.push({ text: args.join(" "), type: "output" });
          break;

        // ── find ──────────────────────────────────────────────────────────────
        case "find":
          newLogs.push(...runFind(args, currentPath));
          break;

        // ── exit ─────────────────────────────────────────────────────────────────────────
        case "exit":
          if (setTerminalMinimized) {
            setTerminalMinimized(true);
          }
          setConsoleLogs([...newLogs, { text: "logout", type: "system" }]);
          setConsoleInput("");
          return;

        // ── theme ─────────────────────────────────────────────────────────────
        case "theme": {
          const target = args[0]?.toLowerCase();
          if (target === "classic") {
            newLogs.push({ text: "Switching to Classic Theme...", type: "system" });
            setConsoleLogs([...newLogs]);
            setTimeout(() => {
              handleThemeRedirect("classic");
            }, 300);
          } else if (target === "interactive" || target === "workspace") {
            newLogs.push({ text: "Switching to Workspace Theme...", type: "system" });
            setConsoleLogs([...newLogs]);
            setTimeout(() => {
              handleThemeRedirect("workspace");
            }, 300);
          } else if (!target) {
            newLogs.push({ text: "Switching to Classic Theme...", type: "system" });
            setConsoleLogs([...newLogs]);
            setTimeout(() => {
              handleThemeRedirect("classic");
            }, 300);
          } else {
            newLogs.push({ text: "Usage: theme [classic|interactive]", type: "error" });
          }
          break;
        }

        // ── mode ──────────────────────────────────────────────────────────────
        case "mode": {
          const target = args[0]?.toLowerCase();
          if (target === "dark") {
            if (setThemeMode) {
              setThemeMode("dark");
              newLogs.push({ text: "System theme mode set to dark.", type: "system" });
            } else {
              newLogs.push({ text: "Theme mode selection unavailable.", type: "error" });
            }
          } else if (target === "light") {
            if (setThemeMode) {
              setThemeMode("light");
              newLogs.push({ text: "System theme mode set to light.", type: "system" });
            } else {
              newLogs.push({ text: "Theme mode selection unavailable.", type: "error" });
            }
          } else if (!target) {
            if (toggleTheme) {
              toggleTheme();
              newLogs.push({ text: "System theme mode toggled.", type: "system" });
            } else {
              newLogs.push({ text: "Theme mode toggle unavailable.", type: "error" });
            }
          } else {
            newLogs.push({ text: "Usage: mode [dark|light]", type: "error" });
          }
          break;
        }

        // ── time ──────────────────────────────────────────────────────────────
        case "time":
          newLogs.push({ text: `Current System Time: ${new Date().toLocaleTimeString()}`, type: "output" });
          newLogs.push({ text: `Date: ${new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`, type: "output" });
          break;

        // ── resume / download ─────────────────────────────────────────────────
        case "resume":
        case "download":
          newLogs.push({ text: "Initiating PDF resume download...", type: "system" });
          if (typeof window !== "undefined") {
            const link = document.createElement("a");
            link.href = "/Parixit_Soni_Resume.pdf";
            link.download = "Parixit_Soni_Resume.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            newLogs.push({ text: "Download started: Parixit_Soni_Resume.pdf", type: "output" });
          }
          break;

        // ── history ───────────────────────────────────────────────────────────
        case "history":
          if (commandHistory.length === 0) {
            newLogs.push({ text: "(no command history)", type: "output" });
          } else {
            commandHistory.forEach((oldCmd, idx) => {
              newLogs.push({ text: `  ${String(idx + 1).padStart(3)}  ${oldCmd}`, type: "output" });
            });
          }
          break;

        // ── skills ────────────────────────────────────────────────────────────
        case "skills":
          newLogs.push({ text: "─── TECHNICAL ARSENAL ──────────────────────────", type: "output" });
          newLogs.push({ text: "  [Foundations] : React 19, Next.js, TypeScript, JavaScript", type: "output" });
          newLogs.push({ text: "  [State Flow]  : Redux Toolkit, Zustand, React Query", type: "output" });
          newLogs.push({ text: "  [Interface]   : Tailwind CSS, Material UI, Framer Motion", type: "output" });
          newLogs.push({ text: "  [Ecosystem]   : Vercel, Git, Firebase, Jest / RTL", type: "output" });
          newLogs.push({ text: "────────────────────────────────────────────────", type: "output" });
          break;

        // ── projects ──────────────────────────────────────────────────────────
        case "projects":
          newLogs.push({ text: "─── FEATURED WORK ──────────────────────────────", type: "output" });
          newLogs.push({ text: "  • HSL Dashboard : https://hsl-clinical-dashboard.vercel.app/", type: "output" });
          newLogs.push({ text: "  • Product List  : https://dynamic-productlist.vercel.app/", type: "output" });
          newLogs.push({ text: "────────────────────────────────────────────────", type: "output" });
          break;

        // ── contact ───────────────────────────────────────────────────────────
        case "contact":
          newLogs.push({ text: "─── CONTACT DETAILS ────────────────────────────", type: "output" });
          newLogs.push({ text: "  Location : Udaipur, Rajasthan, India", type: "output" });
          newLogs.push({ text: "  Email    : parikshitsoni85@gmail.com", type: "output" });
          newLogs.push({ text: "  Phone    : +91-759-719-1971", type: "output" });
          newLogs.push({ text: "  GitHub   : github.com/parixitsoni", type: "output" });
          newLogs.push({ text: "  LinkedIn : linkedin.com/in/parixitsoni", type: "output" });
          newLogs.push({ text: "────────────────────────────────────────────────", type: "output" });
          break;

        // ── unknown ───────────────────────────────────────────────────────────
        default:
          newLogs.push({ text: `${cmdRaw}: command not found. Type 'help' for available commands.`, type: "error" });
      }
    }

    setConsoleLogs(newLogs);
    setConsoleInput("");
  };

  return {
    consoleInput,
    setConsoleInput,
    consoleLogs,
    promptNameMode,
    handleTerminalSubmit,
    handleKeyDown,
    terminalEndRef,
    currentPath,
    suggestionText,
    isExiting,
  };
};
export default useTerminal;
