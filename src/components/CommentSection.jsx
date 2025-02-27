import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { formatDistanceToNow } from 'date-fns';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const CommentSection = ({ videoId }) => {
  const [commentText, setCommentText] = useState('');
  const { currentUser } = useAuth();
  const { getVideoComments, addComment, getUser } = useData();
  
  const comments = getVideoComments(videoId);
  
  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!currentUser) return;
    if (commentText.trim() === '') return;
    
    addComment(videoId, currentUser.id, commentText);
    setCommentText('');
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
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">{comments.length} Comments</h3>
      
      {currentUser ? (
        <form onSubmit={handleSubmitComment} className="flex mb-6">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.username} 
            className="w-10 h-10 rounded-full mr-3"
          />
          <div className="flex-1">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full bg-transparent border-b border-yt-light-black pb-1 focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={() => setCommentText('')}
                className="px-3 py-1 mr-2 text-sm rounded-full hover:bg-yt-light-black"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!commentText.trim()}
                className={`px-3 py-1 text-sm rounded-full ${
                  commentText.trim() 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-yt-light-black text-yt-gray cursor-not-allowed'
                }`}
              >
                Comment
              </button>
            </div>
          </div>
        </form>
      ) : (
        <p className="mb-6 text-yt-gray">
          <a href="/login" className="text-blue-500">Sign in</a> to add a comment
        </p>
      )}
      
      <div className="space-y-4">
        {comments.map(comment => {
          const user = getUser(comment.userId);
          return (
            <div key={comment.id} className="flex">
              <img 
                src={user?.avatar} 
                alt={user?.username} 
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{user?.username}</span>
                  <span className="text-yt-gray text-sm">{formatDate(comment.timestamp)}</span>
                </div>
                <p className="mt-1">{comment.text}</p>
                <div className="flex items-center mt-2 text-sm text-yt-gray">
                  <button className="flex items-center mr-3 hover:text-white">
                    <FaThumbsUp className="mr-1" />
                    <span>{comment.likes}</span>
                  </button>
                  <button className="flex items-center mr-3 hover:text-white">
                    <FaThumbsDown className="mr-1" />
                  </button>
                  <button className="hover:text-white">Reply</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentSection;