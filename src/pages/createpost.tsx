import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import '../styles/buttons.css';
export default function CreatePost({
  onPostCreated,
}: {
  onPostCreated: () => void;
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!user) {
        throw new Error('User not authenticated');
      }
      const authToken = await user.getIdToken();
      const newPost = {
        title,
        content,
        author: "Dani H",
        createdAt: new Date().toISOString(),
      };
      console.log('Creating post with data:', newPost);
      const response = await axios.post('/api/posts/createPost', newPost, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log('Post created successfully:', response.data);
      setTitle('');
      setContent('');
      onPostCreated();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold'>Create a New Post</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium'>Title</label>
          <input
            title='title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className='w-full p-2 border rounded'
          />
        </div>
        <div>
          <label className='block text-sm font-medium'>Content</label>
          <textarea
            title='content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className='w-full p-2 border rounded'
          />
        </div>
        <div className='flex justify-end'>
          <button
            type='submit'
            className='px-4 py-2 bg-blue-500 text-white rounded btn-custom '
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
}
