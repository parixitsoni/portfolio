"use client";
import React, { useState } from "react";
import { BookOpen, Calendar, Clock, ArrowRight, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BLOG_POSTS = [
  {
    id: "css-view-transitions",
    title: "Demystifying CSS View Transitions & Circular Clip-Path Reveals",
    summary: "Traditionally, state transitions on the web required complex animations or absolute positioning overlays. The modern CSS View Transition API and circular reveals change this completely, leveraging compositor-thread performance.",
    category: "Web Dev & UI",
    date: "June 13, 2026",
    readTime: "5 min read",
    content: `# Demystifying CSS View Transitions & Circular Clip-Path Reveals

Traditionally, transitions between different states or pages on the web required complex DOM manipulation, tracking of old/new elements, absolute positioning overlays, and elaborate library animations (such as Framer Motion or GSAP). 

The modern **CSS View Transition API** completely redefines this paradigm by allowing developers to create seamless animated transitions between DOM states with minimal effort. Combined with dynamic **SVG/CSS Clip-Paths**, we can achieve immersive visual effects, like circular canvas reveals, that make user interfaces feel organic and responsive.

---

### Under the Hood: How View Transitions Work

When \`document.startViewTransition(callback)\` is invoked, the browser executes a multi-step orchestration pipeline:

1. **Capture Phase**: The browser takes a snapshot of the current state of the page (the "old" state).
2. **State Transition**: The callback function is executed. This is where the DOM is updated (e.g., updating React state, toggling classes, or updating inner text).
3. **New Capture**: The browser captures the updated state of the page (the "new" state).
4. **Pseudo-Element Tree**: The browser constructs a temporary tree of pseudo-elements on top of the document root:
   \`\`\`text
   ::view-transition
   └─ ::view-transition-group(root)
      └─ ::view-transition-image-pair(root)
         ├─ ::view-transition-old(root)  (Old state screenshot)
         └─ ::view-transition-new(root)  (New state DOM tree)
   \`\`\`
5. **Animation Execution**: By default, the browser performs a cross-fade transition from the old screenshot to the new live view. However, developers can target these pseudo-elements using standard CSS animations or the Web Animations API (WAAPI) to customize the behavior.

---

### Implementing the Circular Reveal Effect

Instead of a generic cross-fade, we can create a circular clip-path reveal originating from a user's action point (such as a mouse click or a terminal cursor). 

Here is the mathematical and programmatic approach:

1. **Calculate the Viewport Boundary**: First, compute the maximum distance (the hypotenuse) from the click coordinates \`(x, y)\` to the four corners of the viewport. This gives us the target radius (\`endRadius\`) required to cover the entire screen.
   
   $$\\text{endRadius} = \\sqrt{\\max(x, W - x)^2 + \\max(y, H - y)^2}$$

2. **Execute the Transition**: Wrap the theme/layout change inside \`document.startViewTransition()\`.
3. **Animate the Clip-Path**: Once the transition is ready, trigger a Web Animation on the \`::view-transition-new(root)\` pseudo-element (if switching to dark mode) or \`::view-transition-old(root)\` (if switching to light mode):

\`\`\`javascript
document.documentElement.animate(
  {
    clipPath: [
      \`circle(0px at \${x}px \${y}px)\`,
      \`circle(\${endRadius}px at \${x}px \${y}px)\`
    ]
  },
  {
    duration: 500,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    pseudoElement: "::view-transition-new(root)"
  }
);
\`\`\`

By utilizing native browser screenshots, this animation performs at a locked 60/120fps because it relies on compositor-thread rendering, avoiding typical main-thread layouts and paint recalculation bottlenecks.
`
  }
];

export const Blog = () => {
  const [activePost, setActivePost] = useState(null);

  return (
    <section id="blog" className="py-20 px-6 relative bg-transparent">
      {/* Background glow specific to this section */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[60%] h-[60%] bg-sky-500/5 dark:bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white tracking-tight">
            Technical <span className="text-sky-600 dark:text-sky-400">Insights</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-semibold max-w-md mx-auto">
            Deep dives into frontend engineering, browser mechanics, and modern user interfaces.
          </p>
        </div>

        {/* Featured Post Card */}
        <div className="grid gap-8">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setActivePost(post)}
              className="glass-effect-premium rounded-[2rem] border border-slate-200/50 dark:border-white/5 overflow-hidden shadow-xl dark:shadow-black/20 hover:shadow-2xl hover:border-sky-500/20 dark:hover:border-sky-500/25 group transition-all duration-500 flex flex-col md:flex-row cursor-pointer"
            >
              {/* Card visual banner */}
              <div className="md:w-1/3 bg-slate-100 dark:bg-slate-900/60 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200/50 dark:border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/20 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <BookOpen size={20} />
                </div>
                <div className="space-y-2.5 mt-8 md:mt-0 relative z-10">
                  <span className="px-2.5 py-1 rounded-md bg-sky-550/10 dark:bg-sky-400/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-[10px] font-black uppercase tracking-wider select-none">
                    {post.category}
                  </span>
                  <div className="flex flex-col gap-1.5 text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest font-mono mt-2">
                    <span className="flex items-center gap-1"><Calendar size={11} className="text-sky-500 shrink-0" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} className="text-indigo-500 shrink-0" /> {post.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Card textual info */}
              <div className="flex-1 p-6 md:p-10 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors font-sans tracking-tight leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-sans font-semibold">
                    {post.summary}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-black uppercase tracking-widest mt-8 group-hover:translate-x-1.5 transition-transform duration-300">
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Screen Article Overlay Reader */}
      {activePost && (
        <div className="fixed inset-0 z-[150] bg-slate-900/60 dark:bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
          <div className="w-full max-w-4xl h-full max-h-[85vh] bg-white dark:bg-[#060b13] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden relative animate-slide-up">
            
            {/* Header / Top Nav */}
            <div className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0 bg-slate-50 dark:bg-slate-950">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-[10px] font-black uppercase tracking-wider">
                  {activePost.category}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-bold uppercase tracking-wider">
                  {activePost.readTime}
                </span>
              </div>
              <button
                onClick={() => setActivePost(null)}
                className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                title="Close Reader"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar select-text bg-white dark:bg-[#060b13]">
              <article className="prose prose-sky dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 font-sans leading-relaxed text-justify">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {activePost.content}
                </ReactMarkdown>
              </article>
            </div>

            {/* Footer */}
            <div className="h-12 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between px-6 shrink-0 text-[10px] text-slate-400 dark:text-slate-500 font-semibold font-sans">
              <span>Author: Parixit Soni</span>
              <span>Published: {activePost.date}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default Blog;
