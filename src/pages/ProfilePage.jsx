import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import VideoGrid from '../components/VideoGrid';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const { videos, getUserPlaylists } = useData();
  
  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-xl font-bold mb-4">You need to sign in to view your profile</h2>
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Sign In
        </Link>
      </div>
    );
  }
  
  const userVideos = videos.filter(video => video.userId === currentUser.id);
  const userPlaylists = getUserPlaylists(currentUser.id);
  
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return dateString;
    }
  };
  
  const formatSubscribers = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count;
  };

  return (
    <div className="p-4">
      <div className="bg-yt-light-black rounded-lg overflow-hidden mb-6">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div className="p-4 flex flex-col sm:flex-row items-center sm:items-start">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.username} 
            className="w-24 h-24 rounded-full border-4 border-yt-black -mt-12 sm:mr-4"
          />
          <div className="text-center sm:text-left mt-4 sm:mt-0">
            <h1 className="text-2xl font-bold">{currentUser.username}</h1>
            <p className="text-yt-gray">
              {formatSubscribers(currentUser.subscribers)} subscribers • Joined {formatDate(currentUser.joinedDate)}
            </p>
            <div className="mt-4">
              <Link 
                to="/upload" 
                className="bg-blue-500 text-white px-4 py-2 rounded-full inline-block"
              >
                Upload Video
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Videos</h2>
          <Link to="/upload" className="text-blue-500">
            Upload New Video
          </Link>
        </div>
        
        {userVideos.length > 0 ? (
          <VideoGrid videos={userVideos} />
        ) : (
          <div className="text-center py-8 bg-yt-light-black rounded-lg">
            <p className="text-yt-gray mb-4">You haven't uploaded any videos yet</p>
            <Link 
              to="/upload" 
              className="bg-blue-500 text-white px-4 py-2 rounded-full inline-block"
            >
              Upload Your First Video
            </Link>
          </div>
        )}
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Playlists</h2>
          <Link to="/playlists" className="text-blue-500">
            View All Playlists
          </Link>
        </div>
        
        {userPlaylists.length > 0 ? (
          <div className="flex flex-wrap -mx-2">
            {userPlaylists.slice(0, 4).map(playlist => (
              <div key={playlist.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <Link to={`/playlist/${playlist.id}`}>
                  <div className="bg-yt-light-black rounded-lg p-4 h-full">
                    <h3 className="font-medium">{playlist.name}</h3>
                    <p className="text-yt-gray text-sm mt-1">
                      {playlist.videos.length} videos • {playlist.isPublic ? 'Public' : 'Private'}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-yt-light-black rounded-lg">
            <p className="text-yt-gray mb-4">You haven't created any playlists yet</p>
            <Link 
              to="/playlists/create" 
              className="bg-blue-500 text-white px-4 py-2 rounded-full inline-block"
            >
              Create Your First Playlist
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;