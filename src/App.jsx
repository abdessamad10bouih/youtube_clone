import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import PlaylistsPage from './pages/PlaylistsPage';
import CreatePlaylistPage from './pages/CreatePlaylistPage';
import PlaylistPage from './pages/PlaylistPage';
import UploadPage from './pages/UploadPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-yt-black text-white">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} />
            <div className={`pt-14 ${sidebarOpen ? 'pl-56' : 'pl-16'}`}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/video/:id" element={<VideoPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/playlists" element={<PlaylistsPage />} />
                <Route path="/playlists/create" element={<CreatePlaylistPage />} />
                <Route path="/playlist/:id" element={<PlaylistPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/category/:category" element={<HomePage />} />
                <Route path="/explore" element={<HomePage />} />
                <Route path="/trending" element={<HomePage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;