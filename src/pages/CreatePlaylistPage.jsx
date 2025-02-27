import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const CreatePlaylistPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const { currentUser } = useAuth();
  const { createPlaylist } = useData();
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (name.trim() === '') return;
    
    const newPlaylist = createPlaylist(
      currentUser.id,
      name,
      description,
      isPublic
    );
    
    navigate(`/playlist/${newPlaylist.id}`);
  };
  
  if (!currentUser) {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create a new playlist</h1>
      
      <form onSubmit={handleSubmit} className="bg-yt-light-black p-6 rounded-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-yt-black border border-yt-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="w-full px-3 py-2 bg-yt-black border border-yt-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Privacy
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              id="public"
              name="privacy"
              checked={isPublic}
              onChange={() => setIsPublic(true)}
              className="mr-2"
            />
            <label htmlFor="public" className="mr-4">Public</label>
            
            <input
              type="radio"
              id="private"
              name="privacy"
              checked={!isPublic}
              onChange={() => setIsPublic(false)}
              className="mr-2"
            />
            <label htmlFor="private">Private</label>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/playlists')}
            className="px-4 py-2 mr-2 text-white bg-yt-gray rounded-md hover:bg-opacity-80"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!name.trim()}
            className={`px-4 py-2 text-white rounded-md ${
              name.trim() ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-500 opacity-50 cursor-not-allowed'
            }`}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePlaylistPage;