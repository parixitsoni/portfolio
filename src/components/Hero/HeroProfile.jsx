import { getAssetPath } from "../../utils/paths";
import { useTheme } from "../../hooks/useTheme";

export const HeroProfile = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative group p-4 cursor-pointer" onClick={toggleTheme}>
      {/* Floating Decorative Rings */}
      <div className="absolute -inset-4 border border-sky-500/10 rounded-[5rem] animate-[spin_20s_linear_infinite]"></div>
      <div className="absolute -inset-8 border border-blue-500/5 rounded-[6rem] animate-[spin_30s_linear_infinite_reverse]"></div>
      
      <div className="relative w-64 h-72 md:w-80 md:h-[24rem] rounded-[3.5rem] p-2.5 glass-effect-premium border border-white/20 dark:border-white/5 relative z-10 shadow-2xl transition-all duration-700 overflow-hidden group-hover:scale-[1.02]">
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 to-transparent z-0"></div>
        <img 
          src={getAssetPath("/parixit_img.jpg")} 
          alt="Parixit Soni" 
          className={`w-full h-full object-cover rounded-[3.5rem] transition-all duration-700 scale-105 group-hover:scale-110 mix-blend-multiply dark:mix-blend-normal opacity-90 group-hover:opacity-100 ${theme === 'dark' ? 'grayscale group-hover:grayscale-0' : 'grayscale-0'}`}
        />
      </div>
      
      {/* Accent Element */}
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sky-600/10 rounded-full blur-3xl -z-10 group-hover:bg-sky-500/20 transition-all"></div>
    </div>
  );
};
