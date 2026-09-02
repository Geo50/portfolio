import React from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Skills } from './components/Skills/Skills';
import { Projects } from './components/Projects/Projects';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => {
  return (
    <div className="app-layout">
      {/* Subtle Ambient Background */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-grid" />
        <div className="ambient-glow-top" />
        <div className="ambient-glow-side" />
      </div>

      {/* Main Navigation */}
      <Navbar />

      {/* 4 Main Sections */}
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
