import React from 'react';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import Blog from './Blog';
import Contact from './Contact';

const HomePage: React.FC = () => (
  <>
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Experience />
    <Blog />
    <Contact />
  </>
);

export default HomePage; 