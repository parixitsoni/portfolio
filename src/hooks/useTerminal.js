import { useState, useEffect, useRef } from "react";
import { getThemeRedirectUrl, handleThemeRedirect, THEME_CONFIG } from "../constants/theme-config";
import { VERSION_INFO } from "../constants/version-config";

// ─── Virtual Filesystem ────────────────────────────────────────────────────────
const HOME = "/home/parixit";

const VIRTUAL_FS = {
  "/": { type: "dir", children: ["home"] },
  "/home": { type: "dir", children: ["parixit"] },
  [HOME]: {
    type: "dir",
    children: ["profile", "experience", "projects", "blog", "academic", "contact", "resume.pdf", ".bashrc"]
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
  [`${HOME}/projects`]: { type: "dir", children: ["hsl_dashboard.jsx", "product_list.jsx", "bms_jewels.jsx"] },
  [`${HOME}/projects/hsl_dashboard.jsx`]: {
    type: "file", size: "1.8K",
    content: "import React from 'react';\nimport { ClinicalDashboard } from 'hsl-clinical-command';\n\n// HSL Clinical Dashboard - SaaS Medical command center\nexport const HslClinicalDashboard = () => (\n  <ClinicalDashboard\n    url=\"https://hsl-clinical-dashboard.vercel.app/\"\n    title=\"HSL Dashboard\"\n    tech={[\"Next.js\", \"React\", \"Tailwind CSS\", \"Recharts\"]}\n  />\n);"
  },
  [`${HOME}/projects/product_list.jsx`]: {
    type: "file", size: "1.2K",
    content: "import React from 'react';\nimport { EcomProducts } from 'dynamic-ecom-showcase';\n\n// Dynamic Product List - E-Commerce Showcase\nexport const DynamicProductList = () => (\n  <EcomProducts\n    url=\"https://dynamic-productlist.vercel.app/\"\n    title=\"E-Commerce Showcase\"\n    tech={[\"React.js\", \"Vite\", \"CSS Modules\", \"REST API\"]}\n  />\n);"
  },
  [`${HOME}/projects/bms_jewels.jsx`]: {
    type: "file", size: "1.5K",
    content: "import React from 'react';\nimport { JewelleryShowcase } from 'bms-jewels-web';\n\n// BMS Jewels - A Unit of Bhagwan Lal Moolchand Soni\nexport const BmsJewelsShowcase = () => (\n  <JewelleryShowcase\n    url=\"https://www.bmsjewels.com/\"\n    title=\"BMS Jewels\"\n    tech={[\"Next.js\", \"React\", \"Tailwind CSS\", \"Framer Motion\"]}\n    description=\"Bilingual visual catalog and live bullion rates tracking platform developed for Deogarh's leading gold & silver jewellery store.\"\n  />\n);"
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
  [`${HOME}/blog`]: { type: "dir", children: ["view_transitions.md"] },
  [`${HOME}/blog/view_transitions.md`]: {
    type: "file", size: "3.2K",
    content: `# Demystifying CSS View Transitions & Circular Clip-Path Reveals\n\nTraditionally, transitions between different states or pages on the web required complex DOM manipulation, tracking of old/new elements, absolute positioning overlays, and elaborate library animations (such as Framer Motion or GSAP).\n\nThe modern CSS View Transition API completely redefines this paradigm by allowing developers to create seamless animated transitions between DOM states with minimal effort. Combined with dynamic SVG/CSS Clip-Paths, we can achieve immersive visual effects, like circular canvas reveals, that make user interfaces feel organic and responsive.`
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
  const longFormat = args.some(a => ["-l", "-la", "-al", "-lr", "-rl"].includes(a));
  const reverse = args.some(a => ["-r", "-lr", "-rl"].includes(a));

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
      const isDir = childNode?.type === "dir";
      const perm = isDir ? "drwxr-xr-x" : "-rw-r--r--";
      const size = (childNode?.size || "0B").padStart(6);
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

  const pattern = args[nameIdx + 1].replace(/^['"]|['"]$/g, "");
  const searchArg = args.find(a => !a.startsWith("-") && a !== args[nameIdx + 1]);
  const searchDir = searchArg ? resolvePath(currentPath, searchArg) : currentPath;
  const regexStr = pattern.replace(/\./g, "\\.").replace(/\*/g, ".*").replace(/\?/g, ".");
  const regex = new RegExp(`^${regexStr}$`, "i");

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
  "echo", "exit", "find", "git", "help", "history", "ls",
  "mode", "projects", "pwd", "resume", "skills", "time", "whoami",
];

// ─── Hook ──────────────────────────────────────────────────────────────────────
export const useTerminal = (toggleTheme, setTerminalMinimized, setThemeMode) => {
  const [consoleInput, setConsoleInput] = useState("");
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [userName, setUserName] = useState("");
  const [promptNameMode, setPromptNameMode] = useState(false);
  const [commandHistory, setCommandHistory] = useState([]);

  // Interactive SMTP contact form states
  const [smtpStep, setSmtpStep] = useState(null); // null, 'name', 'email', 'message'
  const [smtpData, setSmtpData] = useState({ name: "", email: "", message: "" });

  const customPrompt = promptNameMode
    ? "name"
    : smtpStep
      ? `contact(${smtpStep})`
      : null;

  const simulateSmtpSend = (data) => {
    let delay = 500;

    const steps = [
      { text: "Resolving SMTP server for parikshitsoni85@gmail.com...", className: "text-slate-400 dark:text-slate-500" },
      { text: "Connecting to mail.gmx.com [74.208.5.2] on port 587...", className: "text-slate-400 dark:text-slate-500" },
      { text: "220 mail.gmx.com ESMTP Exim ready.", className: "text-emerald-500 dark:text-emerald-400 font-bold" },
      { text: "EHLO parixit-portfolio-terminal", className: "text-slate-300 dark:text-slate-400" },
      { text: "250-mail.gmx.com Hello parixit-portfolio-terminal [104.244.72.11]", className: "text-emerald-500 dark:text-emerald-400" },
      { text: "250-STARTTLS\n250-SIZE 157286400\n250-AUTH LOGIN PLAIN", className: "text-emerald-500 dark:text-emerald-400" },
      { text: "STARTTLS", className: "text-slate-300 dark:text-slate-400" },
      { text: "220 Ready to start TLS", className: "text-emerald-500 dark:text-emerald-400" },
      { text: "[TLS handshake completed successfully]", className: "text-slate-400 dark:text-slate-500" },
      { text: "MAIL FROM: <no-reply@parixit.dev>", className: "text-slate-300 dark:text-slate-400" },
      { text: "250 OK", className: "text-emerald-500 dark:text-emerald-400" },
      { text: "RCPT TO: <parikshitsoni85@gmail.com>", className: "text-slate-300 dark:text-slate-400" },
      { text: "250 OK", className: "text-emerald-500 dark:text-emerald-400" },
      { text: "DATA", className: "text-slate-300 dark:text-slate-400" },
      { text: "354 Start mail input; end with <CRLF>.<CRLF>", className: "text-emerald-500 dark:text-emerald-400" },
      { text: `Subject: Portfolio Contact from ${data.name}\nFrom: ${data.name} <${data.email}>\nTo: parikshitsoni85@gmail.com\n\n${data.message}\n.`, className: "text-sky-500 dark:text-sky-400" },
      { text: "250 Message accepted for delivery", className: "text-emerald-500 dark:text-emerald-400 font-bold" },
      { text: "QUIT", className: "text-slate-300 dark:text-slate-400" },
      { text: "221 mail.gmx.com closing connection", className: "text-emerald-500 dark:text-emerald-400" },
      { text: "✔ Success! Message transmitted securely to Parixit's inbox.", className: "text-emerald-500 dark:text-emerald-400 font-bold text-xs" },
      { text: `Tip: You can also launch a direct mail client if preferred: mailto:parikshitsoni85@gmail.com?subject=Contact%20from%20${encodeURIComponent(data.name)}&body=${encodeURIComponent(data.message)}`, className: "text-sky-600 dark:text-sky-400" }
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setConsoleLogs(prev => [
          ...prev,
          { text: step.text, type: "output", className: step.className }
        ]);
      }, delay * (index + 1));
    });
  };
  const triggerGlobalThemeUpdate = async (viewValue, key) => {
    if (typeof window !== "undefined") {
      const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      if (isLocalhost) {
        try {
          const response = await fetch(`http://localhost:3001/api/set-theme-default?view=${viewValue}&key=${encodeURIComponent(key)}`);
          const data = await response.json();
          if (data.success) {
            setConsoleLogs(prev => [
              ...prev,
              { text: "✔ Success: Global default theme configuration updated in theme-config.js.", type: "system" }
            ]);
          } else {
            setConsoleLogs(prev => [
              ...prev,
              { text: `⚠ Failed to update global theme file: ${data.error}`, type: "error" }
            ]);
          }
        } catch (err) {
          setConsoleLogs(prev => [
            ...prev,
            { text: "⚠ Local sidecar server (port 3001) not responding. Global theme file was not modified on disk.", type: "error" }
          ]);
        }
      } else {
        setConsoleLogs(prev => [
          ...prev,
          { text: "ℹ Note: You are in a production environment. Global theme change cannot be written to server disk directly. Please run this command in your local development environment to update the codebase default configuration, then commit and deploy.", type: "system" }
        ]);
      }
    }
  };
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [savedInput, setSavedInput] = useState("");
  const [currentPath, setCurrentPath] = useState(HOME);
  const [prevPath, setPrevPath] = useState(HOME);
  const [isExiting, setIsExiting] = useState(false);
  const terminalEndRef = useRef(null);

  // Initialize terminal on mount
  useEffect(() => {
    const savedName = localStorage.getItem("workspace_username");
    if (savedName) {
      setUserName(savedName);
      setConsoleLogs([
        { text: `Parixit OS Kernel v${VERSION_INFO.version}-Production (updated: ${VERSION_INFO.lastUpdated})`, type: "system" },
        { text: `Welcome back, ${savedName}! Glad to see you again.`, type: "system" },
        { text: "Type 'help' to see all commands. Use ↑↓ arrows for history, Tab to autocomplete.", type: "prompt" },
      ]);
    } else {
      setPromptNameMode(true);
      setConsoleLogs([
        { text: `Parixit OS Kernel v${VERSION_INFO.version}-Production (updated: ${VERSION_INFO.lastUpdated})`, type: "system" },
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
    const cmd = parts[0];
    const arg = parts.length > 1 ? parts[parts.length - 1] : "";

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
    if (!consoleInput || promptNameMode || smtpStep) return "";
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

    // If empty input during interactive session, prompt user
    if (!inputVal && smtpStep) {
      const disp = `contact(${smtpStep})`;
      setConsoleLogs(prev => [
        ...prev,
        { text: "", prompt: disp, type: "input" },
        { text: `Input cannot be empty. Please enter your ${smtpStep} (or type 'cancel' to exit):`, type: "prompt" }
      ]);
      return;
    }

    if (!inputVal) return;

    // Interactive SMTP contact session
    if (smtpStep) {
      const disp = `contact(${smtpStep})`;

      // Allow cancellation
      if (inputVal.toLowerCase() === "cancel" || inputVal.toLowerCase() === "exit") {
        setSmtpStep(null);
        setConsoleLogs(prev => [
          ...prev,
          { text: inputVal, prompt: disp, type: "input" },
          { text: "SMTP session cancelled.", type: "system" }
        ]);
        setConsoleInput("");
        return;
      }

      if (smtpStep === "name") {
        setSmtpData(prev => ({ ...prev, name: inputVal }));
        setSmtpStep("email");
        setConsoleLogs(prev => [
          ...prev,
          { text: inputVal, prompt: disp, type: "input" },
          { text: "Please enter your Email address:", type: "prompt" }
        ]);
        setConsoleInput("");
        return;
      }

      if (smtpStep === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputVal)) {
          setConsoleLogs(prev => [
            ...prev,
            { text: inputVal, prompt: disp, type: "input" },
            { text: "Invalid email format. Please enter a valid Email address (or type 'cancel' to exit):", type: "error" }
          ]);
          setConsoleInput("");
          return;
        }
        setSmtpData(prev => ({ ...prev, email: inputVal }));
        setSmtpStep("message");
        setConsoleLogs(prev => [
          ...prev,
          { text: inputVal, prompt: disp, type: "input" },
          { text: "Please enter your Message:", type: "prompt" }
        ]);
        setConsoleInput("");
        return;
      }

      if (smtpStep === "message") {
        const finalData = { ...smtpData, message: inputVal };
        setSmtpStep(null);
        setConsoleInput("");

        setConsoleLogs(prev => [
          ...prev,
          { text: inputVal, prompt: disp, type: "input" },
          { text: "Initiating SMTP simulation...", type: "system" }
        ]);

        simulateSmtpSend(finalData);
        return;
      }
    }

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
    const parts = inputVal.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
    const cmdRaw = parts[0].toLowerCase();
    const args = parts.slice(1).map(a => a.replace(/^['"]|['"]$/g, ""));

    const disp = formatDisplayPath(currentPath);
    const newLogs = [...consoleLogs, { text: inputVal, prompt: disp, type: "input" }];

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
          newLogs.push({ text: "│  skills [name]         Display tech stack details   │", type: "output" });
          newLogs.push({ text: "│  projects              List featured projects       │", type: "output" });
          newLogs.push({ text: "│  contact [--send]      Contact details & SMTP form  │", type: "output" });
          newLogs.push({ text: "│  resume / download     Download resume PDF          │", type: "output" });
          newLogs.push({ text: "├─ SYSTEM ────────────────────────────────────────────┤", type: "output" });
          newLogs.push({ text: "│  git [log|status]      Mock Git history & status      │", type: "output" });
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

        // ── git ───────────────────────────────────────────────────────────────
        case "git": {
          const action = args[0]?.toLowerCase();
          if (action === "log") {
            newLogs.push({ text: "commit 804d33a6a6534d33908b57727d781ed3 (HEAD -> main, origin/main)", type: "output", className: "text-yellow-600 dark:text-yellow-500 font-bold" });
            newLogs.push({ text: "Author: Parixit Soni <parikshitsoni85@gmail.com>", type: "output" });
            newLogs.push({ text: "Date:   Fri Jun 12 17:29:33 2026 +0530", type: "output" });
            newLogs.push({ text: "", type: "output" });
            newLogs.push({ text: "    feat: add mock git history, SMTP contact forms, and custom skills CLI commands", type: "output", className: "text-slate-400 dark:text-slate-300" });
            newLogs.push({ text: "", type: "output" });

            newLogs.push({ text: "commit a712bc90fa6b4c123d8e907d6a5c128f", type: "output", className: "text-yellow-600 dark:text-yellow-500" });
            newLogs.push({ text: "Author: Parixit Soni <parikshitsoni85@gmail.com>", type: "output" });
            newLogs.push({ text: "Date:   Wed Jun 10 14:15:22 2026 +0530", type: "output" });
            newLogs.push({ text: "", type: "output" });
            newLogs.push({ text: "    feat: enable internal theme layout switching on same production URL", type: "output", className: "text-slate-400 dark:text-slate-300" });
            newLogs.push({ text: "", type: "output" });

            newLogs.push({ text: "commit b19a2e88a76d1e44f8a8b1112d8a0c23", type: "output", className: "text-yellow-600 dark:text-yellow-500" });
            newLogs.push({ text: "Author: Parixit Soni <parikshitsoni85@gmail.com>", type: "output" });
            newLogs.push({ text: "Date:   Tue Jun 9 11:42:01 2026 +0530", type: "output" });
            newLogs.push({ text: "", type: "output" });
            newLogs.push({ text: "    fix: prevent loader loops on classic home navigation & improve FOUC", type: "output", className: "text-slate-400 dark:text-slate-300" });
            newLogs.push({ text: "", type: "output" });

            newLogs.push({ text: "commit 4f9e1a3b567d1a293848e02d18471b0c", type: "output", className: "text-yellow-600 dark:text-yellow-500" });
            newLogs.push({ text: "Author: Parixit Soni <parikshitsoni85@gmail.com>", type: "output" });
            newLogs.push({ text: "Date:   Mon Jun 8 09:12:11 2026 +0530", type: "output" });
            newLogs.push({ text: "", type: "output" });
            newLogs.push({ text: "    feat: add touch drag-to-resize support for mobile terminal console height", type: "output", className: "text-slate-400 dark:text-slate-300" });
          } else if (action === "status") {
            newLogs.push({ text: "On branch main", type: "output" });
            newLogs.push({ text: "Your branch is up to date with 'origin/main'.", type: "output" });
            newLogs.push({ text: "", type: "output" });
            newLogs.push({ text: "nothing to commit, working tree clean", type: "output", className: "text-emerald-500 dark:text-emerald-400" });
          } else {
            newLogs.push({ text: "Usage: git [log|status]", type: "error" });
          }
          break;
        }

        // ── theme ─────────────────────────────────────────────────────────────
        case "theme": {
          const keyIndex = args.indexOf("--key");
          const keyPassed = keyIndex !== -1 ? args[keyIndex + 1] : null;

          if (keyPassed !== THEME_CONFIG.ownerKey) {
            newLogs.push({ text: `${cmdRaw}: command not found. Type 'help' for available commands.`, type: "error" });
            break;
          }

          const cleanArgs = args.filter((_, idx) => idx !== keyIndex && idx !== keyIndex + 1);
          const firstArg = cleanArgs[0]?.toLowerCase();
          const secondArg = cleanArgs[1]?.toLowerCase();

          if (firstArg === "--set-primary" || firstArg === "-p") {
            if (secondArg === "classic") {
              localStorage.setItem("portfolio-view", "classic");
              newLogs.push({ text: "Primary theme layout set to Classic Theme. On initial loads, this theme will now be visible by default.", type: "system" });
              triggerGlobalThemeUpdate("classic", keyPassed);
            } else if (secondArg === "interactive" || secondArg === "workspace") {
              localStorage.setItem("portfolio-view", "workspace");
              newLogs.push({ text: "Primary theme layout set to Interactive Workspace Theme. On initial loads, this theme will now be visible by default.", type: "system" });
              triggerGlobalThemeUpdate("workspace", keyPassed);
            } else {
              newLogs.push({ text: "Usage: theme --set-primary [classic|interactive] --key <secret_key>", type: "error" });
            }
          } else if (firstArg === "classic") {
            newLogs.push({ text: "Switching to Classic Theme...", type: "system" });
            setConsoleLogs([...newLogs]);
            setTimeout(() => {
              handleThemeRedirect("classic");
            }, 300);
          } else if (firstArg === "interactive" || firstArg === "workspace") {
            newLogs.push({ text: "Switching to Workspace Theme...", type: "system" });
            setConsoleLogs([...newLogs]);
            setTimeout(() => {
              handleThemeRedirect("workspace");
            }, 300);
          } else if (!firstArg) {
            newLogs.push({ text: "Switching to Classic Theme...", type: "system" });
            setConsoleLogs([...newLogs]);
            setTimeout(() => {
              handleThemeRedirect("classic");
            }, 300);
          } else {
            newLogs.push({ text: "Usage: theme [classic|interactive] --key <secret_key> OR theme --set-primary [classic|interactive] --key <secret_key>", type: "error" });
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
        case "skills": {
          const arg = args[0]?.toLowerCase();
          const SKILLS_DETAIL = {
            react: {
              name: "React.js (React 19)",
              level: "Expert",
              experience: "4.2+ Years",
              projects: "HSL Dashboard, Product List, Custom Portfolio OS",
              architectures: "Concurrent rendering, Server Components integration, custom performance hooks, context optimization, virtual lists."
            },
            "next.js": {
              name: "Next.js (App Router & Pages Router)",
              level: "Expert",
              experience: "3+ Years",
              projects: "HSL Clinical Dashboard, Next-Gen E-Commerce, parixit.vercel.app",
              architectures: "Static Site Generation (SSG) with output: 'export', Incremental Static Regeneration (ISR), dynamic rendering paths, route prefetching."
            },
            next: {
              name: "Next.js (App Router & Pages Router)",
              level: "Expert",
              experience: "3+ Years",
              projects: "HSL Clinical Dashboard, Next-Gen E-Commerce, parixit.vercel.app",
              architectures: "Static Site Generation (SSG) with output: 'export', Incremental Static Regeneration (ISR), dynamic rendering paths, route prefetching."
            },
            typescript: {
              name: "TypeScript",
              level: "Advanced",
              experience: "3+ Years",
              projects: "EXL Enterprise Apps, HSL Dashboard",
              architectures: "Strict type safety configurations, generics, utility types, union/intersection interfaces, sound types API integration."
            },
            ts: {
              name: "TypeScript",
              level: "Advanced",
              experience: "3+ Years",
              projects: "EXL Enterprise Apps, HSL Dashboard",
              architectures: "Strict type safety configurations, generics, utility types, union/intersection interfaces, sound types API integration."
            },
            javascript: {
              name: "JavaScript (ES6+)",
              level: "Expert",
              experience: "5+ Years",
              projects: "All projects, IndiaNIC Infotech development",
              architectures: "Asynchronous task flow (Promises, Async/Await), Event Loops, closure-based state factories, DOM/bom APIs, performance benchmarking."
            },
            js: {
              name: "JavaScript (ES6+)",
              level: "Expert",
              experience: "5+ Years",
              projects: "All projects, IndiaNIC Infotech development",
              architectures: "Asynchronous task flow (Promises, Async/Await), Event Loops, closure-based state factories, DOM/bom APIs, performance benchmarking."
            },
            redux: {
              name: "Redux Toolkit",
              level: "Advanced",
              experience: "3.5+ Years",
              projects: "IndiaNIC frontend projects, HSL Clinical Dashboard",
              architectures: "Normalized state databases, custom thunks, middleware logs, RTK Query caching configurations."
            },
            zustand: {
              name: "Zustand",
              level: "Advanced",
              experience: "2+ Years",
              projects: "Parixit OS Workspace (system state management)",
              architectures: "Transient state updates, lightweight atomic stores, devtools middleware integration."
            },
            tailwind: {
              name: "Tailwind CSS",
              level: "Expert",
              experience: "4+ Years",
              projects: "HSL Dashboard, Custom Portfolio, EXL Service client portals",
              architectures: "Custom design system tokens, utility classes composition, responsive breakpoints optimization, dark mode system hooks."
            }
          };

          if (arg) {
            const detail = SKILLS_DETAIL[arg];
            if (detail) {
              newLogs.push({ text: `─── Skill Profile: ${detail.name} ───`, type: "output", className: "text-sky-500 dark:text-sky-400 font-bold" });
              newLogs.push({ text: `  Level         : ${detail.level}`, type: "output" });
              newLogs.push({ text: `  Experience    : ${detail.experience}`, type: "output" });
              newLogs.push({ text: `  Key Projects  : ${detail.projects}`, type: "output" });
              newLogs.push({ text: `  Architecture  : ${detail.architectures}`, type: "output", className: "text-slate-400 dark:text-slate-300" });
              newLogs.push({ text: "────────────────────────────────────────────────", type: "output" });
            } else {
              newLogs.push({ text: `Skill '${args[0]}' details not found. Try one of: react, next.js, typescript, javascript, redux, zustand, tailwind.`, type: "error" });
            }
          } else {
            newLogs.push({ text: "─── TECHNICAL ARSENAL ──────────────────────────", type: "output" });
            newLogs.push({ text: "  [Foundations] : React 19, Next.js, TypeScript, JavaScript", type: "output" });
            newLogs.push({ text: "  [State Flow]  : Redux Toolkit, Zustand, React Query", type: "output" });
            newLogs.push({ text: "  [Interface]   : Tailwind CSS, Material UI, Framer Motion", type: "output" });
            newLogs.push({ text: "  [Ecosystem]   : Vercel, Git, Firebase, Jest / RTL", type: "output" });
            newLogs.push({ text: "────────────────────────────────────────────────", type: "output" });
            newLogs.push({ text: "  Tip: Type 'skills <name>' (e.g., 'skills react') for deep-dive architect info.", type: "system" });
          }
          break;
        }

        // ── projects ──────────────────────────────────────────────────────────
        case "projects":
          newLogs.push({ text: "─── FEATURED WORK ──────────────────────────────", type: "output" });
          newLogs.push({ text: "  • HSL Dashboard : https://hsl-clinical-dashboard.vercel.app/", type: "output" });
          newLogs.push({ text: "  • Product List  : https://dynamic-productlist.vercel.app/", type: "output" });
          newLogs.push({ text: "  • BMS Jewels    : https://www.bmsjewels.com/", type: "output" });
          newLogs.push({ text: "────────────────────────────────────────────────", type: "output" });
          break;

        // ── contact ───────────────────────────────────────────────────────────
        case "contact": {
          const firstArg = args[0]?.toLowerCase();
          if (firstArg === "--send" || firstArg === "-s") {
            setSmtpStep("name");
            setConsoleLogs([...newLogs, { text: "Starting SMTP simulator. Type 'cancel' to exit any time.", type: "system" }, { text: "Please enter your Name:", type: "prompt" }]);
            setConsoleInput("");
            return;
          }
          newLogs.push({ text: "─── CONTACT DETAILS ────────────────────────────", type: "output" });
          newLogs.push({ text: "  Location : Udaipur, Rajasthan, India", type: "output" });
          newLogs.push({ text: "  Email    : parikshitsoni85@gmail.com", type: "output" });
          newLogs.push({ text: "  Phone    : +91-759-719-1971", type: "output" });
          newLogs.push({ text: "  GitHub   : github.com/parixitsoni", type: "output" });
          newLogs.push({ text: "  LinkedIn : linkedin.com/in/parixitsoni", type: "output" });
          newLogs.push({ text: "────────────────────────────────────────────────", type: "output" });
          newLogs.push({ text: "  Tip: You can send a message directly from this CLI! Type: 'contact --send'", type: "system" });
          break;
        }

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
    customPrompt,
    handleTerminalSubmit,
    handleKeyDown,
    terminalEndRef,
    currentPath,
    suggestionText,
    isExiting,
  };
};
export default useTerminal;
