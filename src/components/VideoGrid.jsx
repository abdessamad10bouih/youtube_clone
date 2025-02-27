import VideoCard from './VideoCard';

const VideoGrid = ({ videos, title }) => {
  return (
    <div className="mt-4">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      <div className="flex flex-wrap -mx-2">
        {videos.length > 0 ? (
          videos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))
        ) : (
          <p className="text-center w-full py-8 text-yt-gray">No videos found</p>
        )}
      </div>
    </div>
  );
};

export default VideoGrid;