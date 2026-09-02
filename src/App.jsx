import { useState } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechUniverse from "./components/TechUniverse";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Journey from "./components/Journey";
import Principles from "./components/Principles";
import GithubStats from "./components/GithubStats";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <div className={loading ? "h-screen overflow-hidden" : ""}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <TechUniverse />
          <Skills />
          <Projects />
          <Journey />
          <Principles />
          <GithubStats />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
