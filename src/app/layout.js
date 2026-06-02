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
        <script src="/theme.js" />
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
