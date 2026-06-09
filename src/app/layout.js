import "./globals.css";
import { Roboto, Outfit, Inter } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "../context/ThemeContext";

const roboto = Roboto({ 
  subsets: ["latin"], 
  weight: ["400", "500", "700"],
  variable: '--font-roboto'
});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit'
});

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata = {
  title: "Parixit Soni - Senior Frontend Developer",
  description: "Portfolio of Parixit Soni - Senior Frontend Developer specializing in React.js & Next.js",
  icons: {
    icon: "/ps-logo-light.png",
    apple: "/ps-logo-light.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${roboto.variable} ${outfit.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var params = new URLSearchParams(window.location.search);
              var urlTheme = params.get('theme');
              if (urlTheme === 'dark' || urlTheme === 'light') {
                localStorage.setItem('theme', urlTheme);
                localStorage.setItem('theme_override', 'true');
                var newUrl = window.location.pathname + window.location.hash;
                window.history.replaceState({}, document.title, newUrl);
              }

              var theme = localStorage.getItem('theme');
              var override = localStorage.getItem('theme_override') === 'true';
              if (!theme || !override) {
                var hour = new Date().getHours();
                theme = (hour >= 19 || hour < 7) ? 'dark' : 'light';
              }
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (e) {}
          })();
        `}} />
        {/* Dynamic favicon based on theme */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            function updateFavicon() {
              var isDark = document.documentElement.classList.contains('dark');
              var favicon = document.querySelector('link[rel="icon"]');
              if (!favicon) {
                favicon = document.createElement('link');
                favicon.rel = 'icon';
                document.head.appendChild(favicon);
              }
              favicon.href = isDark ? '/ps-logo-dark.png' : '/ps-logo-light.png';
            }
            updateFavicon();
            var observer = new MutationObserver(updateFavicon);
            observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
          })();
        `}} />
      </head>
      <body className={`${outfit.className} bg-white dark:bg-[#020617] mesh-gradient min-h-screen relative transition-colors duration-700`}>
        {/* Anti-FOUC Page Loader */}
        <div id="global-page-loader" style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#02050b",
          zIndex: 99999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transition: "opacity 0.4s ease, visibility 0.4s ease",
          opacity: 1,
          visibility: "visible",
          pointerEvents: "none"
        }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "3px solid rgba(56,189,248,0.15)",
            borderTopColor: "#38bdf8",
            animation: "loader-spin 1s linear infinite"
          }} />
          <p id="global-page-loader-text" style={{
            color: "#38bdf8",
            fontFamily: "monospace",
            fontSize: "11px",
            marginTop: "16px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: "bold"
          }}>Loading Workspace...</p>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes loader-spin { to { transform: rotate(360deg); } }
          `}} />
        </div>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var loader = document.getElementById('global-page-loader');
            var text = document.getElementById('global-page-loader-text');
            var isClassic = window.location.pathname === '/' && !document.querySelector('main')?.classList?.contains('bg-slate-950');
            
            // Sync loader background color with saved theme
            var theme = localStorage.getItem('theme');
            if (!theme) {
              theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            if (theme === 'light') {
              loader.style.backgroundColor = '#ffffff';
              if (text) text.style.color = '#0284c7';
              var spinner = loader.querySelector('div');
              if (spinner) {
                spinner.style.borderTopColor = '#0284c7';
                spinner.style.borderRightColor = 'rgba(2,132,199,0.15)';
              }
            } else {
              loader.style.backgroundColor = '#020617';
              if (text) text.style.color = '#38bdf8';
              var spinner = loader.querySelector('div');
              if (spinner) {
                spinner.style.borderTopColor = '#38bdf8';
                spinner.style.borderRightColor = 'rgba(56,189,248,0.15)';
              }
            }
            
            if (text) {
              text.textContent = window.location.pathname.includes('learning') 
                ? 'Loading Vault...' 
                : (isClassic ? 'Loading Classic Theme...' : 'Loading Workspace...');
            }

            window.addEventListener('load', function() {
              setTimeout(function() {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
              }, 100);
            });
          })();
        `}} />

        <ThemeProvider>
          {/* Background Vibrant Glows */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-sky-500/10 dark:bg-sky-400/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-blue-600/10 dark:bg-blue-500/15 rounded-full blur-[120px]"></div>
          </div>

          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
