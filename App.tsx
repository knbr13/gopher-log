import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Post } from './pages/Post';
import { Categories } from './pages/Categories';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Project } from './pages/Project';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:slug" element={<Post />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:slug" element={<Project />} />
      </Routes>
    </Router>
  );
}

export default App;