import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import LiteratureReview from './pages/LiteratureReview';
import SavePaper from './pages/SavedPaper';
import Profile from './pages/Profile';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import ProtectedRoute from 'core/protectedRoute';
import { AuthProvider } from 'context/authContext';
import Chat from 'pages/Chat';
import OverviewResultPage from 'pages/OverviewResult';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element = {<Signup />}/>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/overview" element={<OverviewResultPage />} />
          <Route path='/profile' element={<ProtectedRoute > <Profile/> </ProtectedRoute> }/>
          <Route path='/savedpaper' element={<ProtectedRoute > <SavePaper/> </ProtectedRoute> }/>
          <Route path="/literatureReview" element={<LiteratureReview />} />
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
