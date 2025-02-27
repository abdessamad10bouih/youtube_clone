import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import PlaylistCard from '../components/PlaylistCard';
import { FaPlus } from 'react-icons/fa';

const PlaylistsPage = () => {
  const { currentUser } = useAuth();
  const { getUserPlaylists } = useData();
  const [playlists, setPlaylists] = useState([]);
  
  useEffect(() => {
    if (currentUser) {
      const userPlaylists = getUserPlaylists(currentUser.id);
      setPlaylists(userPlaylists);
    }
  }, [currentUser, getUserPlaylists]);
  
  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-xl font-bold mb-4">You need to sign in to view your playlists</h2>
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Playlists</h1>
        <Link 
          to="/playlists/create" 
          className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center"
        >
          <FaPlus className="mr-2" />
          Create Playlist
        </Link>
      </div>
      
      {playlists.length > 0 ? (
        <div className="flex flex-wrap -mx-2">
          {playlists.map(playlist => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-yt-light-black rounded-lg">
          <h3 className="text-xl font-medium mb-2">No playlists yet</h3>
          <p className="text-yt-gray mb-4">Create your first playlist to save and organize your favorite videos</p>
          <Link 
            to="/playlists/create" 
            className="bg-blue-500 text-white px-4 py-2 rounded-full inline-flex items-center"
          >
            <FaPlus className="mr-2" />
            Create Playlist
          </Link>
        </div>
      )}
    </div>
  );
};

export default PlaylistsPage;