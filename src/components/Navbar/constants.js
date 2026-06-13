import { Home, User, Briefcase, Code, GraduationCap, BookOpen, Layers } from "lucide-react";

export const NAV_LINKS = [
  { label: "Home", href: "/", icon: Home, id: "home" },
  { label: "About", href: "/#about", icon: User, id: "about" },
  {
    label: "Experience",
    href: "/#experience",
    icon: Briefcase,
    id: "experience",
  },
  { label: "Skills", href: "/#skills", icon: Code, id: "skills" },
  { label: "Projects", href: "/#projects", icon: Layers, id: "projects" },
  { label: "Blog", href: "/#blog", icon: BookOpen, id: "blog" },
  {
    label: "Education",
    href: "/#education",
    icon: GraduationCap,
    id: "education",
  },
  // Hidden from navbar but route exists
  // { label: "Learning", href: "/learning", icon: BookOpen, id: "learning" },
];
