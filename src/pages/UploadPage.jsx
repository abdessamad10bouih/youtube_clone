import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { FaUpload } from 'react-icons/fa';

const UploadPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  const { currentUser } = useAuth();
  const { addVideo, categories } = useData();
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (!title || !description || !category || !thumbnailUrl || !videoUrl) {
      return;
    }
    
    setIsUploading(true);
    
    setTimeout(() => {
      const newVideo = addVideo({
        title,
        description,
        category,
        tags: tags.split(',').map(tag => tag.trim()),
        thumbnail: thumbnailUrl,
        videoUrl,
        userId: currentUser.id
      });
      
      setIsUploading(false);
      navigate(`/video/${newVideo.id}`);
    }, 1500);
  };
  
  if (!currentUser) {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Upload a new video</h1>
      
      <form onSubmit={handleSubmit} className="bg-yt-light-black p-6 rounded-lg">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-yt-black border border-yt-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full px-3 py-2 bg-yt-black border border-yt-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 bg-yt-black border border-yt-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="tags" className="block text-sm font-medium mb-2">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="react, tutorial, coding"
            className="w-full px-3 py-2 bg-yt-black border border-yt-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="thumbnailUrl" className="block text-sm font-medium mb-2">
            Thumbnail URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            id="thumbnailUrl"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            placeholder="https://example.com/thumbnail.jpg"
            className="w-full px-3 py-2 bg-yt-black border border-yt-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="videoUrl" className="block text-sm font-medium mb-2">
            Video URL (YouTube embed) <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            id="videoUrl"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/embed/dQw4w9WgXcQ"
            className="w-full px-3 py-2 bg-yt-black border border-yt-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 mr-2 text-white bg-yt-gray rounded-md hover:bg-opacity-80"
            disabled={isUploading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUploading || !title || !description || !category || !thumbnailUrl || !videoUrl}
            className={`px-4 py-2 text-white rounded-md flex items-center ${
              isUploading || !title || !description || !category || !thumbnailUrl || !videoUrl
                ? 'bg-blue-500 opacity-50 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isUploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <FaUpload className="mr-2" />
                Upload Video
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadPage;