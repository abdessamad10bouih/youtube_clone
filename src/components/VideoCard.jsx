import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { formatDistanceToNow } from 'date-fns';

const VideoCard = ({ video }) => {
  const { getUser } = useData();
  const uploader = getUser(video.userId);
  
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

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
      <div className="bg-yt-black rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
        <Link to={`/video/${video.id}`}>
          <div className="relative">
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
              {formatViews(video.views)} views
            </div>
          </div>
          <div className="p-3">
            <div className="flex">
              <div className="mr-3">
                <img 
                  src={uploader?.avatar} 
                  alt={uploader?.username} 
                  className="w-9 h-9 rounded-full"
                />
              </div>
              <div>
                <h3 className="text-white font-medium line-clamp-2">{video.title}</h3>
                <p className="text-yt-gray text-sm mt-1">{uploader?.username}</p>
                <div className="flex text-yt-gray text-xs mt-1">
                  <span>{formatViews(video.views)} views</span>
                  <span className="mx-1">•</span>
                  <span>{formatDate(video.uploadDate)}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default VideoCard;