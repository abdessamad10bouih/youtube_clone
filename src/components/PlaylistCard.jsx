import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const PlaylistCard = ({ playlist }) => {
  const { getVideo } = useData();
  
  // Get the first video thumbnail for the playlist cover
  const firstVideoId = playlist.videos[0];
  const firstVideo = firstVideoId ? getVideo(firstVideoId) : null;
  const thumbnailUrl = firstVideo ? firstVideo.thumbnail : 'https://via.placeholder.com/480x360?text=Playlist';
  
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
      <Link to={`/playlist/${playlist.id}`}>
        <div className="bg-yt-black rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
          <div className="relative">
            <img 
              src={thumbnailUrl} 
              alt={playlist.name} 
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-4xl font-bold">{playlist.videos.length}</div>
                <div className="text-sm">videos</div>
              </div>
            </div>
          </div>
          <div className="p-3">
            <h3 className="text-white font-medium line-clamp-2">{playlist.name}</h3>
            <p className="text-yt-gray text-sm mt-1 line-clamp-2">{playlist.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlaylistCard;