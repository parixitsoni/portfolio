"use client";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Experience } from "../components/Experience";
import { Skills } from "../components/Skills";
import { Education } from "../components/Education";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Footer />
      </main>
    </>
  );
}
