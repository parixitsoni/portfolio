import React from "react";
import { Layout } from "./components/Layout";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Education } from "./components/Education";
import { Footer } from "./components/Footer";

function App() {
  return (
    <Layout>
      <Navbar />
      <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth custom-scrollbar relative z-0 bg-white dark:bg-slate-950">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Footer />
      </main>
    </Layout>
  );
}

export default App;
