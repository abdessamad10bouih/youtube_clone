import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
import VideoCard from '../components/VideoCard';

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const { searchVideos } = useData();
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    if (query) {
      const searchResults = searchVideos(query);
      setResults(searchResults);
    }
  }, [query, searchVideos]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Search results for "{query}"</h2>
      
      {results.length > 0 ? (
        <div className="flex flex-wrap -mx-2">
          {results.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg text-yt-gray">No videos found matching your search</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;