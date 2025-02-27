import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FaHome, 
  FaCompass, 
  FaHistory, 
  FaThumbsUp, 
  FaClock, 
  FaPlayCircle,
  FaFire,
  FaMusic,
  FaGamepad,
  FaNewspaper,
  FaLightbulb
} from 'react-icons/fa';

const Sidebar = ({ isOpen }) => {
  const { currentUser } = useAuth();

  return (
    <div className={`fixed left-0 top-14 h-screen bg-yt-black text-white transition-all duration-300 z-10 ${isOpen ? 'w-56' : 'w-16'}`}>
      <div className="flex flex-col items-center">
        <Link to="/" className={`flex items-center py-3 px-3 w-full hover:bg-yt-light-black ${isOpen ? 'justify-start' : 'justify-center'}`}>
          <FaHome className="text-xl" />
          {isOpen && <span className="ml-4">Home</span>}
        </Link>
        
        <Link to="/explore" className={`flex items-center py-3 px-3 w-full hover:bg-yt-light-black ${isOpen ? 'justify-start' : 'justify-center'}`}>
          <FaCompass className="text-xl" />
          {isOpen && <span className="ml-4">Explore</span>}
        </Link>

        <div className={`border-t border-yt-light-black w-full my-2 ${isOpen ? 'mx-3' : 'mx-auto'}`}></div>

        {currentUser ? (
          <>
            <Link to="/history" className={`flex items-center py-3 px-3 w-full hover:bg-yt-light-black ${isOpen ? 'justify-start' : 'justify-center'}`}>
              <FaHistory className="text-xl" />
              {isOpen && <span className="ml-4">History</span>}
            </Link>
            
            <Link to="/liked-videos" className={`flex items-center py-3 px-3 w-full hover:bg-yt-light-black ${isOpen ? 'justify-start' : 'justify-center'}`}>
              <FaThumbsUp className="text-xl" />
              {isOpen && <span className="ml-4">Liked videos</span>}
            </Link>
            
            <Link to="/watch-later" className={`flex items-center py-3 px-3 w-full hover:bg-yt-light-black ${isOpen ? 'justify-start' : 'justify-center'}`}>
              <FaClock className="text-xl" />
              {isOpen && <span className="ml-4">Watch later</span>}
            </Link>
            
            <Link to="/playlists" className={`flex items-center py-3 px-3 w-full hover:bg-yt-light-black ${isOpen ? 'justify-start' : 'justify-center'}`}>
              <FaPlayCircle className="text-xl" />
              {isOpen && <span className="ml-4">Your playlists</span>}
            </Link>
            
            <div className={`border-t border-yt-light-black w-full my-2 ${isOpen ? 'mx-3' : 'mx-auto'}`}></div>
          </>
        ) : (
          <div className={`py-3 px-3 w-full ${isOpen ? 'text-sm' : 'hidden'}`}>
            Sign in to like videos, comment, and subscribe.
            <Link to="/login" className="block mt-2 text-blue-500">
              Sign In
            </Link>
            <div className={`border-t border-yt-light-black w-full my-2 ${isOpen ? 'mx-0' : 'mx-auto'}`}></div>
          </div>
        )}

        <h3 className={`font-medium uppercase text-xs text-yt-gray py-2 ${isOpen ? 'self-start px-3' : 'hidden'}`}>
          Explore
        </h3>

        <Link to="/trending" className={`flex items-center py-3 px-3 w-full hover:bg-yt-light-black ${isOpen ? 'justify-start' : 'justify-center'}`}>
          <FaFire className="text-xl" />
          {isOpen && <span className="ml-4">Trending</span>}
        </Link>
        
        <Link to="/category/Music" className={`flex items-center py-3 px-3 w-full hover:bg-yt-light-black ${isOpen ? 'justify-start' : 'justify-center'}`}>
          <FaMusic className="text-xl" />
          {isOpen && <span className="ml-4">Music</span>}
        </Link>
        
        <Link to="/category/Gaming" className={`flex items-center py-3 px-3 w-full hover:bg-yt-light-black ${isOpen ? 'justify-start' : 'justify-center'}`}>
          <FaGamepad className="text-xl" />
          {isOpen && <span className="ml-4">Gaming</span>}
        </Link>
        
        <Link to="/category/News" className={`flex items-center py-3 px-3 w-full hover:bg-yt-light-black ${isOpen ? 'justify-start' : 'justify-center'}`}>
          <FaNewspaper className="text-xl" />
          {isOpen && <span className="ml-4">News</span>}
        </Link>
        
        <Link to="/category/Education" className={`flex items-center py-3 px-3 w-full hover:bg-yt-light-black ${isOpen ? 'justify-start' : 'justify-center'}`}>
          <FaLightbulb className="text-xl" />
          {isOpen && <span className="ml-4">Learning</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;