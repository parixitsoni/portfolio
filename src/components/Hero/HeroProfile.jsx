import { getAssetPath } from "../../utils/paths";
import { useTheme } from "../../hooks/useTheme";

export const HeroProfile = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative group p-4 cursor-pointer" onClick={(e) => toggleTheme(e)}>
      {/* Floating Decorative Rings */}
      <div className="absolute -inset-4 border border-sky-500/10 rounded-[5rem] animate-[spin_20s_linear_infinite]"></div>
      <div className="absolute -inset-8 border border-blue-500/5 rounded-[6rem] animate-[spin_30s_linear_infinite_reverse]"></div>

      <div className="w-64 h-72 md:w-80 md:h-[24rem] rounded-[3.5rem] relative z-10 transition-transform duration-700 overflow-hidden group-hover:scale-[1.05]">
        <img
          src={getAssetPath("/parixit-bios-img.png")}
          alt="Parixit Soni"
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${theme === 'dark' ? 'brightness-110' : 'brightness-100'}`}
        />
      </div>

      {/* Accent Element */}
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sky-600/10 rounded-full blur-3xl -z-10 group-hover:bg-sky-500/20 transition-all"></div>
    </div>
  );
};
