import { VERSION_INFO } from "./version-config";

const updateListMarkdown = VERSION_INFO.changelog.map(item => `- ${item}`).join("\n");

export const FILE_SYSTEM = {
  profile: {
    name: "profile",
    files: {
      "bio.md": {
        name: "bio.md",
        type: "markdown",
        content: `# Biography - Parixit Soni

Senior Consultant & Frontend Architect based in Udaipur, Rajasthan.

With over 4.2 years of professional experience, I specialize in crafting high-performance, accessible, and scalable web applications using React.js and Next.js. I bridge the gap between complex engineering architectures and minimalist, high-fidelity user experiences.

## Core Values & Architectural Focus
- **Performance**: Optimizing Core Web Vitals for fluid page responsiveness.
- **Accessibility**: Engineering WCAG 2.1 AA compliant elements.
- **Scale**: Designing modular, clean codebases using design systems.`,
        previewType: "profile"
      },
      "system_updates.md": {
        name: "system_updates.md",
        type: "markdown",
        content: `# Portfolio System Updates & Release Notes

Current Version: v${VERSION_INFO.version}
Last Updated   : ${VERSION_INFO.lastUpdated}

## Latest Features
${updateListMarkdown}

---
*Recruiter Note: Parixit built this modular update system using unified client-side state hooks to bridge classic and developer workspace layouts.*`,
        previewType: "updates",
        data: VERSION_INFO
      }
    }
  },
  experience: {
    name: "experience",
    files: {
      "exl_service.json": {
        name: "exl_service.json",
        type: "json",
        content: `{
  "company": "EXL Service",
  "title": "Manager, Band C1",
  "duration": "Jan 2026 — Feb 2026",
  "location": "Noida, UP (Remote)",
  "summary": "Led frontend strategy and technical architecture decisions for clinical analytics dashboards.",
  "highlights": [
    "Architected reusable dashboard frameworks.",
    "Supervised agile sprint delivery schedules."
  ]
}`,
        previewType: "work",
        data: {
          company: "EXL Service",
          title: "Manager, Band C1",
          duration: "Jan 2026 — Feb 2026",
          location: "Noida, UP (Remote)",
          desc: "Led frontend strategy and technical architecture decisions for clinical analytics dashboards.",
          highlights: ["Architected reusable dashboard frameworks.", "Supervised agile sprint delivery schedules."]
        }
      },
      "cairs_solutions.json": {
        name: "cairs_solutions.json",
        type: "json",
        content: `{
  "company": "Cairs Solutions",
  "title": "Senior Consultant",
  "duration": "Mar 2024 — Oct 2025",
  "location": "Visakhapatnam, AP (Remote)",
  "summary": "Architected healthcare client applications, custom UI libraries, and Core Web Vitals audits.",
  "highlights": [
    "Architected 4 production applications using React/Next.js.",
    "Built a reusable Material UI component library, cutting delivery times by 30%.",
    "Achieved WCAG 2.1 AA accessibility compliance across clinical portals.",
    "Optimized Core Web Vitals to achieve high performance audit scores."
  ]
}`,
        previewType: "work",
        data: {
          company: "Cairs Solutions",
          title: "Senior Consultant",
          duration: "Mar 2024 — Oct 2025",
          location: "Visakhapatnam, AP (Remote)",
          desc: "Architected healthcare client applications, custom UI libraries, and Core Web Vitals audits.",
          highlights: [
            "Architected 4 production applications using React/Next.js.",
            "Built a reusable Material UI component library, cutting delivery times by 30%.",
            "Achieved WCAG 2.1 AA accessibility compliance across clinical portals.",
            "Optimized Core Web Vitals to achieve high performance audit scores."
          ]
        }
      },
      "indianic_infotech.json": {
        name: "indianic_infotech.json",
        type: "json",
        content: `{
  "company": "IndiaNIC Infotech",
  "title": "Frontend Developer",
  "duration": "Aug 2021 — Oct 2023",
  "location": "Ahmedabad, GJ (Remote)",
  "summary": "Built geo-fencing maps widgets, Redux states, and robust automated test suites.",
  "highlights": [
    "Delivered recruitment portal and task management system dashboards.",
    "Engineered real-time features using GraphQL and Redux Toolkit.",
    "Built interactive maps widgets using Google Maps API.",
    "Maintained 80%+ unit testing coverage using Jest and React Testing Library."
  ]
}`,
        previewType: "work",
        data: {
          company: "IndiaNIC Infotech",
          title: "Frontend Developer",
          duration: "Aug 2021 — Oct 2023",
          location: "Ahmedabad, GJ (Remote)",
          desc: "Built geo-fencing maps widgets, Redux states, and robust automated test suites.",
          highlights: [
            "Delivered recruitment portal and task management system dashboards.",
            "Engineered real-time features using GraphQL and Redux Toolkit.",
            "Built interactive maps widgets using Google Maps API.",
            "Maintained 80%+ unit testing coverage using Jest and React Testing Library."
          ]
        }
      }
    }
  },
  projects: {
    name: "projects",
    files: {
      "hsl_dashboard.jsx": {
        name: "hsl_dashboard.jsx",
        type: "javascript",
        content: `import React from 'react';
import { ClinicalDashboard } from 'hsl-clinical-command';

// HSL Clinical Dashboard - SaaS Medical command center
export const HslClinicalDashboard = () => {
  return (
    <ClinicalDashboard
      url="https://hsl-clinical-dashboard.vercel.app/"
      title="HSL Dashboard"
      tech={["Next.js", "React", "Tailwind CSS", "Recharts"]}
      description="Centralized medical control tracker oversight patient statuses and invoices."
    />
  );
};`,
        previewType: "project",
        data: {
          title: "HSL Clinical Dashboard",
          subtitle: "Medical & SaaS Command Center",
          url: "https://hsl-clinical-dashboard.vercel.app/",
          desc: "A high-fidelity clinical management dashboard built to centralize patient overview, compliance audits, medical stock records, and invoices.",
          tech: ["Next.js", "React", "Tailwind CSS", "Recharts"]
        }
      },
      "product_list.jsx": {
        name: "product_list.jsx",
        type: "javascript",
        content: `import React from 'react';
import { EcomProducts } from 'dynamic-ecom-showcase';

// Dynamic Product List - E-Commerce Showcase
export const DynamicProductList = () => {
  return (
    <EcomProducts
      url="https://dynamic-productlist.vercel.app/"
      title="E-Commerce Showcase"
      tech={["React.js", "Vite", "CSS Modules", "REST API"]}
      description="Sleek filters grid demonstrating debouncing hooks and render limits."
    />
  );
};`,
        previewType: "project",
        data: {
          title: "Dynamic Product List",
          subtitle: "High-Performance E-Commerce UI",
          url: "https://dynamic-productlist.vercel.app/",
          desc: "A sleek e-commerce list application demonstrating advanced state management, debounced search filters, and layout optimizations.",
          tech: ["React.js", "Vite", "CSS Modules", "REST API"]
        }
      }
    }
  },
  academic: {
    name: "academic",
    files: {
      "degrees.json": {
        name: "degrees.json",
        type: "json",
        content: `[
  {
    "degree": "MCA (Master of Computer Applications)",
    "institution": "Mohanlal Sukhadia University",
    "period": "2017 — 2020",
    "grade": "Postgraduate Degree"
  },
  {
    "degree": "Bachelor of Computer Science",
    "institution": "Bhupal Nobles P.G. College",
    "period": "2014 — 2017",
    "grade": "Undergraduate Degree"
  }
]`,
        previewType: "education",
        data: [
          { degree: "MCA (Master of Computer Applications)", institution: "Mohanlal Sukhadia University", period: "2017 — 2020", grade: "Postgraduate Degree" },
          { degree: "Bachelor of Computer Science", institution: "Bhupal Nobles P.G. College", period: "2014 — 2017", grade: "Undergraduate Degree" }
        ]
      }
    }
  },
  contact: {
    name: "contact",
    files: {
      "contact_info.txt": {
        name: "contact_info.txt",
        type: "text",
        content: `PARIXIT SONI - CONTACT FILE
===========================
Location : Udaipur, Rajasthan, India
Email    : parikshitsoni85@gmail.com
Phone    : +91-759-719-1971
GitHub   : https://github.com/parixitsoni
LinkedIn : https://linkedin.com/in/parixitsoni
Portfolio: https://parixit.vercel.app`,
        previewType: "contact"
      }
    }
  }
};
