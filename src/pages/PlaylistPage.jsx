import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { FaPlay, FaTrash } from 'react-icons/fa';

const PlaylistPage = () => {
  const { id } = useParams();
  const { playlists, getVideo, getUser, removeVideoFromPlaylist } = useData();
  const { currentUser } = useAuth();
  const [playlist, setPlaylist] = useState(null);
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [creator, setCreator] = useState(null);
  
  useEffect(() => {
    const playlistData = playlists.find(p => p.id === id);
    if (playlistData) {
      setPlaylist(playlistData);
      setCreator(getUser(playlistData.userId));
      
      const videos = playlistData.videos.map(videoId => getVideo(videoId)).filter(Boolean);
      setPlaylistVideos(videos);
    }
  }, [id, playlists, getVideo, getUser]);
  
  if (!playlist || !creator) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return dateString;
    }
  };
  
  const handleRemoveVideo = (videoId) => {
    if (currentUser && currentUser.id === playlist.userId) {
      removeVideoFromPlaylist(playlist.id, videoId);
      setPlaylistVideos(playlistVideos.filter(video => video.id !== videoId));
    }
  };
  
  const isOwner = currentUser && currentUser.id === playlist.userId;

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="bg-yt-light-black rounded-lg overflow-hidden">
            {playlistVideos.length > 0 ? (
              <div className="relative">
                <img 
                  src={playlistVideos[0].thumbnail} 
                  alt={playlist.name} 
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-5xl font-bold">{playlistVideos.length}</div>
                    <div className="text-lg">videos</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full aspect-video bg-yt-black flex items-center justify-center">
                <p className="text-yt-gray">No videos in playlist</p>
              </div>
            )}
            
            <div className="p-4">
              <h1 className="text-xl font-bold">{playlist.name}</h1>
              <p className="text-yt-gray mt-1">{playlist.description}</p>
              <div className="mt-3 text-sm text-yt-gray">
                <p>Created by {creator.username}</p>
                <p>Created {formatDate(playlist.createdAt)}</p>
                <p>{playlist.isPublic ? 'Public' : 'Private'} playlist</p>
              </div>
              
              {playlistVideos.length > 0 && (
                <Link 
                  to={`/video/${playlistVideos[0].id}?playlist=${playlist.id}`}
                  className="mt-4 bg-white text-black px-4 py-2 rounded-full inline-flex items-center"
                >
                  <FaPlay className="mr-2" />
                  Play All
                </Link>
              )}
            </div>
          </div>
        </div>
        
        <div className="md:w-2/3">
          <h2 className="text-lg font-medium mb-4">Videos in this playlist</h2>
          
          {playlistVideos.length > 0 ? (
            <div className="space-y-3">
              {playlistVideos.map((video, index) => (
                <div key={video.id} className="flex bg-yt-light-black rounded-lg overflow-hidden">
                  <div className="w-16 flex items-center justify-center bg-yt-black">
                    <span className="text-lg font-medium">{index + 1}</span>
                  </div>
                  
                  <Link to={`/video/${video.id}?playlist=${playlist.id}`} className="w-1/3">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-24 object-cover"
                    />
                  </Link>
                  
                  <div className="flex-1 p-3 flex justify-between items-center">
                    <div>
                      <Link to={`/video/${video.id}?playlist=${playlist.id}`}>
                        <h3 className="font-medium line-clamp-1">{video.title}</h3>
                      </Link>
                      <p className="text-yt-gray text-sm">{getUser(video.userId)?.username}</p>
                    </div>
                    
                    {isOwner && (
                      <button 
                        onClick={() => handleRemoveVideo(video.id)}
                        className="text-yt-gray hover:text-white p-2"
                        title="Remove from playlist"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-yt-light-black rounded-lg">
              <p className="text-yt-gray">This playlist has no videos</p>
              {isOwner && (
                <p className="mt-2 text-sm">
                  Browse videos and click "Save" to add them to this playlist
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;