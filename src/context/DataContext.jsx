import { createContext, useState, useContext, useEffect } from 'react';
import initialData from '../data/videos.json';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [videos, setVideos] = useState(initialData.videos);
  const [users, setUsers] = useState(initialData.users);
  const [comments, setComments] = useState(initialData.comments);
  const [playlists, setPlaylists] = useState(initialData.playlists);
  const [categories, setCategories] = useState(initialData.categories);

  const getVideo = (id) => {
    return videos.find(video => video.id === id);
  };

  const getUser = (id) => {
    return users.find(user => user.id === id);
  };

  const getVideoComments = (videoId) => {
    return comments.filter(comment => comment.videoId === videoId);
  };

  const addComment = (videoId, userId, text) => {
    const newComment = {
      id: String(comments.length + 1),
      videoId,
      userId,
      text,
      timestamp: new Date().toISOString(),
      likes: 0,
      dislikes: 0
    };
    
    setComments([...comments, newComment]);
    return newComment;
  };

  const updateVideoLikes = (videoId, isLike) => {
    setVideos(videos.map(video => {
      if (video.id === videoId) {
        return {
          ...video,
          likes: isLike ? video.likes + 1 : video.likes,
          dislikes: !isLike ? video.dislikes + 1 : video.dislikes
        };
      }
      return video;
    }));
  };

  const getUserPlaylists = (userId) => {
    return playlists.filter(playlist => playlist.userId === userId);
  };

  const createPlaylist = (userId, name, description, isPublic = true) => {
    const newPlaylist = {
      id: String(playlists.length + 1),
      userId,
      name,
      description,
      videos: [],
      createdAt: new Date().toISOString(),
      isPublic
    };
    
    setPlaylists([...playlists, newPlaylist]);
    return newPlaylist;
  };

  const addVideoToPlaylist = (playlistId, videoId) => {
    setPlaylists(playlists.map(playlist => {
      if (playlist.id === playlistId) {
        if (!playlist.videos.includes(videoId)) {
          return {
            ...playlist,
            videos: [...playlist.videos, videoId]
          };
        }
      }
      return playlist;
    }));
  };

  const removeVideoFromPlaylist = (playlistId, videoId) => {
    setPlaylists(playlists.map(playlist => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          videos: playlist.videos.filter(id => id !== videoId)
        };
      }
      return playlist;
    }));
  };

  const searchVideos = (query) => {
    if (!query) return videos;
    
    const lowerCaseQuery = query.toLowerCase();
    return videos.filter(video => 
      video.title.toLowerCase().includes(lowerCaseQuery) ||
      video.description.toLowerCase().includes(lowerCaseQuery) ||
      video.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
    );
  };

  const getVideosByCategory = (category) => {
    if (!category || category === 'All') return videos;
    return videos.filter(video => video.category === category);
  };

  const addVideo = (videoData) => {
    const newVideo = {
      id: String(videos.length + 1),
      ...videoData,
      uploadDate: new Date().toISOString().split('T')[0],
      views: 0,
      likes: 0,
      dislikes: 0
    };
    
    setVideos([...videos, newVideo]);
    return newVideo;
  };

  const value = {
    videos,
    users,
    comments,
    playlists,
    categories,
    getVideo,
    getUser,
    getVideoComments,
    addComment,
    updateVideoLikes,
    getUserPlaylists,
    createPlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    searchVideos,
    getVideosByCategory,
    addVideo
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};