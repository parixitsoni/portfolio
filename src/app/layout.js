import "./globals.css";
import { Roboto, Outfit } from "next/font/google";
import Script from "next/script";

const roboto = Roboto({ 
  subsets: ["latin"], 
  weight: ["400", "500", "700"],
  variable: '--font-roboto'
});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit'
});

export const metadata = {
  title: "Parixit Soni - Senior Frontend Developer",
  description: "Portfolio of Parixit Soni - Senior Frontend Developer specializing in React.js & Next.js",
  icons: {
    icon: "/ps-logo.png",
    apple: "/ps-logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${roboto.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        <script src="/theme.js" />
      </head>
      <body className={`${outfit.className} bg-white dark:bg-[#020617] mesh-gradient min-h-screen relative transition-colors duration-700`}>
        {/* Background Vibrant Glows */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-sky-500/10 dark:bg-sky-400/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-blue-600/10 dark:bg-blue-500/15 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
