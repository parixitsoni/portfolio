export const personalData = {
  name: "Parixit Soni",
  title: "Senior Frontend Developer",
  // Base64 encoded email to prevent automated spam harvesting
  get email() {
    return typeof window !== "undefined" ? atob("cGFyaWtzaGl0c29uaTg1QGdtYWlsLmNvbQ==") : "parikshitsoni85@gmail.com";
  },
  // Base64 encoded phone
  get phone() {
    return typeof window !== "undefined" ? atob("KzkxLTc1OS03MTktMTk3MQ==") : "+91-759-719-1971";
  },
  location: "Udaipur, Rajasthan",
  socials: {
    linkedin: "https://linkedin.com/in/parixitsoni",
    github: "https://github.com/parixitsoni"
  },
  summary: "Senior Frontend Developer with 4+ years of experience building performant, accessible, and scalable web applications using React.js and Next.js.",
  resumeUrl: "/Parixit_Soni_Resume.pdf"
};
