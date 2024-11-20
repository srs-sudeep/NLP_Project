import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Chat from 'pages/Chat';
import OverviewResultPage from 'pages/OverviewResult';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/overview" element={<OverviewResultPage />} />
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
