import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import CommentSection from '../components/CommentSection';
import VideoCard from '../components/VideoCard';
import { formatDistanceToNow } from 'date-fns';
import { 
  FaThumbsUp, 
  FaThumbsDown, 
  FaShare, 
  FaDownload, 
  FaEllipsisH,
  FaBell,
  FaPlus
} from 'react-icons/fa';

const VideoPage = () => {
  const { id } = useParams();
  const { getVideo, getUser, videos, updateVideoLikes, getUserPlaylists, addVideoToPlaylist } = useData();
  const { currentUser } = useAuth();
  const [video, setVideo] = useState(null);
  const [uploader, setUploader] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState([]);
  
  useEffect(() => {
    const videoData = getVideo(id);
    if (videoData) {
      setVideo(videoData);
      setUploader(getUser(videoData.userId));
      
      const related = videos
        .filter(v => v.id !== id && (v.category === videoData.category || v.userId === videoData.userId))
        .slice(0, 8);
      setRelatedVideos(related);
      
      if (currentUser) {
        setUserPlaylists(getUserPlaylists(currentUser.id));
      }
    }
  }, [id, getVideo, getUser, videos, currentUser, getUserPlaylists]);
  
  if (!video || !uploader) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views;
  };
  
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return dateString;
    }
  };
  
  const handleLike = () => {
    if (!currentUser) return;
    updateVideoLikes(video.id, true);
    setVideo({...video, likes: video.likes + 1});
  };
  
  const handleDislike = () => {
    if (!currentUser) return;
    updateVideoLikes(video.id, false);
    setVideo({...video, dislikes: video.dislikes + 1});
  };
  
  const handleAddToPlaylist = (playlistId) => {
    if (!currentUser) return;
    addVideoToPlaylist(playlistId, video.id);
    setShowPlaylistMenu(false);
  };

  return (
    <div className="flex flex-col lg:flex-row p-4 gap-6">
      <div className="lg:w-2/3">
        <div className="aspect-video bg-black">
          <iframe
            className="w-full h-full"
            src={video.videoUrl}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        
        <h1 className="text-xl font-bold mt-3">{video.title}</h1>
        
        <div className="flex flex-wrap justify-between items-center mt-2">
          <div className="flex items-center">
            <span className="text-yt-gray">{formatViews(video.views)} views</span>
            <span className="mx-1 text-yt-gray">•</span>
            <span className="text-yt-gray">{formatDate(video.uploadDate)}</span>
          </div>
          
          <div className="flex mt-2 sm:mt-0">
            <button 
              onClick={handleLike}
              className="flex items-center mr-2 px-3 py-1 rounded-full hover:bg-yt-light-black"
            >
              <FaThumbsUp className="mr-1" />
              <span>{formatViews(video.likes)}</span>
            </button>
            
            <button 
              onClick={handleDislike}
              className="flex items-center mr-2 px-3 py-1 rounded-full hover:bg-yt-light-black"
            >
              <FaThumbsDown className="mr-1" />
              <span>{formatViews(video.dislikes)}</span>
            </button>
            
            <button className="flex items-center mr-2 px-3 py-1 rounded-full hover:bg-yt-light-black">
              <FaShare className="mr-1" />
              <span>Share</span>
            </button>
            
            <button className="flex items-center mr-2 px-3 py-1 rounded-full hover:bg-yt-light-black">
              <FaDownload className="mr-1" />
              <span>Download</span>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowPlaylistMenu(!showPlaylistMenu)}
                className="flex items-center px-3 py-1 rounded-full hover:bg-yt-light-black"
              >
                <FaPlus className="mr-1" />
                <span>Save</span>
              </button>
              
              {showPlaylistMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-yt-light-black rounded-md shadow-lg py-1 z-10">
                  {currentUser ? (
                    <>
                      {userPlaylists.length > 0 ? (
                        userPlaylists.map(playlist => (
                          <button
                            key={playlist.id}
                            onClick={() => handleAddToPlaylist(playlist.id)}
                            className="block w-full text-left px-4 py-2 hover:bg-yt-black"
                          >
                            {playlist.name}
                          </button>
                        ))
                      ) : (
                        <p className="px-4 py-2 text-yt-gray">No playlists yet</p>
                      )}
                      <Link 
                        to="/playlists/create" 
                        className="block w-full text-left px-4 py-2 border-t border-yt-black hover:bg-yt-black"
                      >
                        Create new playlist
                      </Link>
                    </>
                  ) : (
                    <Link to="/login" className="block px-4 py-2 text-blue-500">
                      Sign in to create playlists
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-start mt-4 pb-4 border-b border-yt-light-black">
          <img 
            src={uploader.avatar} 
            alt={uploader.username} 
            className="w-12 h-12 rounded-full mr-3"
          />
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between">
              <div>
                <h3 className="font-medium">{uploader.username}</h3>
                <p className="text-yt-gray text-sm">{formatViews(uploader.subscribers)} subscribers</p>
              </div>
              <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 flex items-center">
                <FaBell className="mr-2" />
                Subscribe
              </button>
            </div>
            <p className="mt-3 whitespace-pre-line">{video.description}</p>
          </div>
        </div>
        
        <CommentSection videoId={video.id} />
      </div>
      
      <div className="lg:w-1/3 mt-6 lg:mt-0">
        <h3 className="text-lg font-medium mb-3">Related videos</h3>
        <div className="space-y-3">
          {relatedVideos.map(relatedVideo => (
            <div key={relatedVideo.id} className="flex">
              <Link to={`/video/${relatedVideo.id}`} className="w-2/5">
                <img 
                  src={relatedVideo.thumbnail} 
                  alt={relatedVideo.title} 
                  className="w-full h-24 object-cover rounded-lg"
                />
              </Link>
              <div className="w-3/5 pl-2">
                <Link to={`/video/${relatedVideo.id}`}>
                  <h4 className="font-medium line-clamp-2">{relatedVideo.title}</h4>
                </Link>
                <p className="text-yt-gray text-sm mt-1">{getUser(relatedVideo.userId)?.username}</p>
                <p className="text-yt-gray text-xs">
                  {formatViews(relatedVideo.views)} views • {formatDate(relatedVideo.uploadDate)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;