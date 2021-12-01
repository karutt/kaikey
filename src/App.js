import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import About from './pages/About'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/about" caseSensitive={false} element={<About />} />
        <Route path="/" caseSensitive={false} element={<Home />} />
      </Routes>
    </Router>
  );
};
