import { useState } from "react";
import axios from "axios";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/suggestions.css";

export default function Suggestions() {
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios
      .post("/api/suggestions", { topic })
      .then(() => {
        setTopic("");
        setMessage("Suggestion submitted successfully!");
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((error) => {
        setMessage("Failed to submit suggestion. Please try again.");
        console.error("Error submitting suggestion:", error);
      });
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-grow p-8'>
        <div className='suggestions-container mx-auto p-4 bg-white rounded shadow-md'>
          <h1 className='text-2xl font-bold mb-4'>Feedback</h1>
          <form onSubmit={handleSubmit} className='my-4'>
            <input
              type='text'
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder='Leave a review or suggestion'
              className='block w-full p-2 border rounded mb-4'
            />
            <button
              type='submit'
              className='suggestions-btn-custom px-6 py-2 rounded'
            >
              Submit
            </button>
          </form>
          {message && <p className='text-center mt-4'>{message}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
}
