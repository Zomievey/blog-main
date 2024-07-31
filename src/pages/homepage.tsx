import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/NavBar";
import ConfirmModal from "../components/ConfirmationModal";
import { Post } from "../types";
import CommentSection from "../components/CommentsSection";
import Footer from "../components/Footer";
import "../styles/buttons.css";
import "../styles/header.css";
import "../../public/white_heart.png";
import CreatePost from "./createpost";

/* eslint-disable @next/next/no-img-element */

const HomePage = () => {
  const { user, role } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);
  const [postTitleToDelete, setPostTitleToDelete] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/api/posts");
      const postsData = response.data;
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchPosts();
  }, [user]);

  const handleLike = async (postId: string) => {
    try {
      const response = await axios.put(`/api/posts/like?id=${postId}`, {
        userId: user?.uid,
      });
      console.log(response.data.message);
      fetchPosts();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleDislike = async (postId: string) => {
    try {
      const response = await axios.put(`/api/posts/dislike?id=${postId}`, {
        userId: user?.uid,
      });
      console.log(response.data.message);
      fetchPosts();
    } catch (error) {
      console.error("Error disliking post:", error);
    }
  };

  const openModal = (postId: string, postTitle: string) => {
    setPostIdToDelete(postId);
    setPostTitleToDelete(postTitle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setPostIdToDelete(null);
    setPostTitleToDelete(null);
    setIsModalOpen(false);
  };

  const handleDeletePost = async () => {
    setIsLoading(true);
    try {
      if (!user) {
        throw new Error("User not authenticated");
      }
      if (!postIdToDelete) {
        throw new Error("No post ID to delete");
      }
      const authToken = await user.getIdToken();
      await axios.delete(`/api/posts/delete/${postIdToDelete}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      fetchPosts();
      closeModal();
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}`;
  };

  if (!user) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <img
          src='https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWMxNzQwMjBsdGhheTVrdTQ5aDB4dWZzOHU2Y245cmpvbTBuMjdvMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/uBn5A3rxwD7N8nZvlw/giphy.gif'
          alt='Loading'
          className='w-48 h-48'
        />
        <h1 className='text-center mt-2' style={{ color: "#49a4c4" }}>
          You are not logged in...
        </h1>
      </div>
    );
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />

      <div className='container mx-auto p-4 flex-grow max-w-screen-lg'>
        <div className='mb-6 p-4 card rounded flex items-center justify-between header'>
          <div>
            <h2 className='text-lg font-bold'>My Info</h2>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Role:</strong> {role}
            </p>
          </div>
          <div>
            <img src='/white_heart.png' alt='Hearts' className='h-16 w-16' />
          </div>
        </div>

        {role === "admin" && <CreatePost onPostCreated={fetchPosts} />}

        {loading ? (
          <div className='flex flex-col items-center justify-center'>
            <img
              src='https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmk3aGpvdHlmNm9jZTZsYXZyejkwZ2dtNzBlbXJsOXB5Znppb2RiciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/IEm8kcqLVCctHJ1kWm/giphy.gif'
              alt='Loading'
              className='w-48 h-48'
            />
            <h1 className='text-center mt-2' style={{ color: "#49a4c4" }}>
              Fetching posts...
            </h1>
          </div>
        ) : posts.length === 0 ? (
          <h1 className='text-center mt-2' style={{ color: "#49a4c4" }}>
            No posts found.
          </h1>
        ) : (
          posts.map((post) => (
            <div key={post._id} className='mb-6 p-4 card rounded shadow-md'>
              <h2
                className='text-xl font-bold'
                style={{ color: "var(--text-color-dark)" }}
              >
                {post.title}
              </h2>
              <p
                style={{
                  whiteSpace: "pre-wrap",
                  color: "var(--text-color-dark)",
                }}
              >
                {post.content}
              </p>
              <p className='text-sm text-gray-500'>
                {post.author} - {formatTimestamp(post.createdAt)}
              </p>
              <div className='flex justify-between items-center mt-4'>
                <div className='flex items-center space-x-2'>
                  <button
                    onClick={() => handleLike(post._id)}
                    className='btn-custom-like'
                  >
                    ❤️ {post.likesCount || 0}
                  </button>
                  <button
                    onClick={() => handleDislike(post._id)}
                    className='btn-custom-dislike'
                  >
                    👎 {post.dislikesCount || 0}
                  </button>
                </div>
                {role === "admin" && (
                  <button
                    onClick={() => openModal(post._id, post.title)}
                    className='btn-custom-cancel'
                  >
                    Delete Post
                  </button>
                )}
              </div>
              <CommentSection postId={post._id} />
            </div>
          ))
        )}
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleDeletePost}
          entityType='post'
          isLoading={isLoading}
          entityTitle={postTitleToDelete}
        />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
