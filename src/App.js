import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Kaikey from './pages/Kaikey'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" caseSensitive={false} element={<Kaikey />} />
      </Routes>
    </Router>
  );
};
