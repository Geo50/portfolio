import React from "react";
import { SpaceEnvironment } from "./components/SpaceEnvironment/SpaceEnvironment";
import { Navbar } from "./components/Navbar/Navbar";
import { Hero } from "./components/Hero/Hero";
import { About } from "./components/About/About";
import { Skills } from "./components/Skills/Skills";
import { Projects } from "./components/Projects/Projects";
import { Contact } from "./components/Contact/Contact";
import { Footer } from "./components/Footer/Footer";
import { OrbitalCursor } from "./components/Cursor/OrbitalCursor";

export const App: React.FC = () => {
  return (
    <div className="app-layout">
      <OrbitalCursor />
      {/* Fixed deep-space environment — sits behind everything */}
      <SpaceEnvironment />

      {/* Navigation */}
      <Navbar />

      {/* Main content — all sections sit above the environment at z-index: 1 */}
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;
