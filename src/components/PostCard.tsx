import React from 'react';
import { IMediaItem } from '~/utils/types';

interface PostCardProps {
  post: IMediaItem;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const renderMedia = () => {
    switch (post.media_type) {
      case 'IMAGE':
      case 'CAROUSEL_ALBUM': // Note: We are only showing the first item for carousels
        return (
          <img
            src={post.media_url}
            alt={post.caption || 'Instagram post'}
            className="w-full h-auto object-cover"
          />
        );
      case 'VIDEO':
        return (
          <video
            src={post.media_url}
            controls
            className="w-full h-auto"
          >
            Your browser does not support the video tag.
          </video>
        );
      default:
        return <p>Unsupported media type.</p>;
    }
  };

  return (
    <div className="max-w-md mx-auto my-4 overflow-hidden bg-white border rounded-lg shadow-md">
      <div className="p-4">
        {/* In a real app, you'd fetch and show the user's profile picture and username here */}
        <p className="text-sm font-semibold text-gray-800">Your Post</p>
      </div>
      {renderMedia()}
      {post.caption && (
        <div className="p-4">
          <p className="text-gray-700">{post.caption}</p>
        </div>
      )}
      <div className="px-4 py-2 text-xs text-gray-500 border-t">
        {new Date(post.timestamp).toLocaleDateString()}
      </div>
    </div>
  );
};
