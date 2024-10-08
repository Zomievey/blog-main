import { useState, useEffect } from "react";
import axios from "axios";
import { Comment } from "../types";
import { useAuth } from "../hooks/useAuth";
import ConfirmModal from "./ConfirmationModal";
import "../styles/buttons.css";

interface CommentSectionProps {
  postId: string;
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const { user, getUsername } = useAuth();
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false); // Define the isLoading state

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/comments?postId=${postId}`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const username = await getUsername(user?.uid); // Get the username from Firestore
      const newComment = {
        postId,
        content,
        author: user?.email,
        username, // Include username
        createdAt: new Date().toISOString(),
      };
      console.log("Submitting new comment:", newComment); // Debug log
      await axios.post("/api/comments/createcomments", newComment);
      setContent("");
      fetchComments();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const openCommentModal = (commentId: string) => {
    setCommentIdToDelete(commentId);
    setIsCommentModalOpen(true);
  };

  const closeCommentModal = () => {
    setCommentIdToDelete(null);
    setIsCommentModalOpen(false);
  };

  const handleDeleteComment = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      await axios.delete(`/api/comments/delete?id=${commentIdToDelete}`);
      fetchComments();
      closeCommentModal();
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  const handleEditComment = async (commentId: string) => {
    try {
      const updatedComment = { content: editingContent };
      await axios.put(`/api/comments/edit?id=${commentId}`, updatedComment);
      setEditingCommentId(null);
      setEditingContent("");
      fetchComments();
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  return (
    <div className='mt-2'>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder='Write a comment...'
          className='w-full p-2 border rounded mt-2'
        />
        <div className='flex justify-end'>
          <button
            type='submit'
            className='mt-2 px-4 py-2 bg-blue-500 text-white rounded btn-custom'
          >
            Add Comment
          </button>
        </div>
      </form>
      <div className='mt-4'>
        {comments.map((comment, index) => (
          <div key={comment._id} className='mt-2 flex'>
            <div
              className='mr-2 mt-1'
              style={{
                color: index % 2 === 0 ? "#ff7474" : "#49a4c4",
                fontSize: "1.5em",
              }}
            >
              •
            </div>
            <div className='w-full'>
              {editingCommentId === comment._id ? (
                <>
                  <textarea
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    required
                    placeholder='Edit your comment...'
                    className='w-full p-2 border rounded mt-2'
                  />
                  <div className='flex justify-end'>
                    <button
                      type='button'
                      className='mt-2 mr-2 px-4 py-2 bg-blue-500 text-white rounded btn-custom'
                      onClick={() => handleEditComment(comment._id)}
                    >
                      Save
                    </button>
                    <button
                      type='button'
                      className='mt-2 px-4 py-2 bg-gray-500 text-white rounded btn-custom-cancel'
                      onClick={() => {
                        setEditingCommentId(null);
                        setEditingContent("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p style={{ whiteSpace: "pre-wrap" }}>{comment.content}</p>
                  <p className='text-sm text-gray-500'>
                    {comment.username} -{" "}
                    {new Date(comment.createdAt).toLocaleDateString()}{" "}
                    {new Date(comment.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {comment.author === user?.email && (
                    <div>
                      <button
                        type='button'
                        className='mr-5'
                        style={{ color: "#49a4c4" }}
                        onClick={() => {
                          setEditingCommentId(comment._id);
                          setEditingContent(comment.content);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type='button'
                        style={{ color: "#ff7474" }}
                        onClick={() => openCommentModal(comment._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <ConfirmModal
        isOpen={isCommentModalOpen}
        onClose={closeCommentModal}
        onConfirm={handleDeleteComment}
        entityType='comment'
        isLoading={isLoading}
      />
    </div>
  );
};

export default CommentSection;
