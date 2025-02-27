import { useState } from 'react';
import { useData } from '../context/DataContext';
import VideoGrid from '../components/VideoGrid';

const HomePage = () => {
  const { videos, categories, getVideosByCategory } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredVideos = selectedCategory === 'All' 
    ? videos 
    : getVideosByCategory(selectedCategory);

  return (
    <div className="p-4">
      <div className="flex overflow-x-auto pb-2 mb-4 scrollbar-hide">
        <button
          className={`px-3 py-1 mr-2 rounded-full text-sm whitespace-nowrap ${
            selectedCategory === 'All'
              ? 'bg-white text-black'
              : 'bg-yt-light-black text-white'
          }`}
          onClick={() => setSelectedCategory('All')}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            className={`px-3 py-1 mr-2 rounded-full text-sm whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-white text-black'
                : 'bg-yt-light-black text-white'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <VideoGrid videos={filteredVideos} />
    </div>
  );
};

export default HomePage;