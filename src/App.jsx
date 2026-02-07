import React, { useEffect, useState } from 'react';
import { mockBusinesses } from './utils/mockBusinesses';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './styles/global.css';
import { checkToken } from './utils/auth';

// Import pages
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import BusinessDetail from './pages/BusinessDetail/BusinessDetail';
import UserPage from './pages/UserPage/UserPage';
import ForBusinesses from './pages/ForBusinesses/ForBusinesses';

// Import components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [authError, setAuthError] = useState('');
  // Bookmarked business IDs and objects
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    const saved = localStorage.getItem('bookmarkedBusinessIds');
    return saved ? JSON.parse(saved) : [];
  });
  const [bookmarkedBusinesses, setBookmarkedBusinesses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token)
        .then(res => {
          setUser(res.data);
          setAuthChecked(true);
        })
        .catch(err => {
          setAuthError('Session expired. Please log in again.');
          setUser(null);
          setAuthChecked(true);
        });
    } else {
      setAuthChecked(true);
    }
  }, []);

  // Keep bookmarked IDs in localStorage
  useEffect(() => {
    localStorage.setItem('bookmarkedBusinessIds', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  // Update bookmarkedBusinesses from all businesses in search results (simulate global business list)
  useEffect(() => {
    // Always get full info for bookmarks from localStorage (set by BusinessCards)
    const info = JSON.parse(localStorage.getItem('bookmarkedBusinessInfo') || '[]');
    setBookmarkedBusinesses(
      info.filter(biz => bookmarkedIds.includes(biz.id) || bookmarkedIds.includes(biz.place_id))
    );
  }, [bookmarkedIds]);

  if (!authChecked) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <span className="circle-preloader" style={{ display: 'block', margin: '0 auto' }} />
        <div style={{ marginTop: 32 }}>Checking authentication...</div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Header user={user} setUser={setUser} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage bookmarkedIds={bookmarkedIds} setBookmarkedIds={setBookmarkedIds} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/business/:placeId" element={<BusinessDetail />} />
            <Route path="/user" element={<UserPage user={user} bookmarkedBusinesses={bookmarkedBusinesses} bookmarkedIds={bookmarkedIds} setBookmarkedIds={setBookmarkedIds} onLogout={handleLogout} />} />
            <Route path="/for-businesses" element={<ForBusinesses />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;