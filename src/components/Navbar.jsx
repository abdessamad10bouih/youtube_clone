import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaYoutube, FaSearch, FaUserCircle, FaBell, FaVideo } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';

const Navbar = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-yt-black text-white py-2 px-4 fixed top-0 left-0 right-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="mr-2 p-2 rounded-full hover:bg-yt-light-black"
          >
            <HiMenu className="text-xl" />
          </button>
          <Link to="/" className="flex items-center">
            <FaYoutube className="text-yt-red text-3xl mr-1" />
            <span className="font-bold text-xl">PandaTube</span>
          </Link>
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-yt-black border border-yt-light-black rounded-l-full py-2 px-4 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-yt-light-black px-5 py-2 rounded-r-full border border-yt-light-black"
            >
              <FaSearch />
            </button>
          </div>
        </form>

        <div className="flex items-center">
          {currentUser ? (
            <>
              <Link to="/upload" className="mx-2 p-2 rounded-full hover:bg-yt-light-black">
                <FaVideo className="text-xl" />
              </Link>
              <button className="mx-2 p-2 rounded-full hover:bg-yt-light-black">
                <FaBell className="text-xl" />
              </button>
              <div className="relative group ml-2">
                <Link to="/profile">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.username}
                    className="w-8 h-8 rounded-full"
                  />
                </Link>
                <div className="absolute right-0 mt-2 w-48 bg-yt-light-black rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-yt-black">
                    Your Channel
                  </Link>
                  <Link to="/playlists" className="block px-4 py-2 hover:bg-yt-black">
                    Your Playlists
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 hover:bg-yt-black"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center border border-blue-500 text-blue-500 px-3 py-1 rounded-md"
            >
              <FaUserCircle className="mr-2" />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;