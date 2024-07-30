import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Link from "next/link";
import "../styles/landingPage.css";
import axios from "axios";
import { Suggestion } from "../types";

export default function LandingPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get("/api/suggestions");
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, []);

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-grow'>
        <div className='hero-section'>
          <h1 className='text-5xl font-bold mb-6'>Welcome to My Blog!</h1>
          <p className='text-xl mb-6'>
            Discover insights, tutorials, and tips on the latest in technology.
            Join our community and stay updated.
          </p>
          <div className='button-container'>
            <Link href='/homepage' legacyBehavior>
              <a className='btn-custom text-2xl'>Go to Blog</a>
            </Link>
            <Link href='/suggestions' legacyBehavior>
              <a className='btn-custom text-2xl'>Leave Feedback</a>
            </Link>
          </div>
        </div>

        <div className='features-section bg-white p-8 rounded shadow-md w-full max-w-6xl mx-auto mt-8'>
          <h2 className='text-3xl font-bold mb-4'>Features</h2>
          <div className='features-grid'>
            <div className='feature-item'>
              <h3 className='text-2xl font-bold mb-2'>User Authentication</h3>
              <p>
                Sign up, log in, and log out securely with Firebase
                Authentication.
              </p>
            </div>
            <div className='feature-item'>
              <h3 className='text-2xl font-bold mb-2'>
                Creating and Managing Posts
              </h3>
              <p>
                Create, edit, and delete posts. Admin users can manage all
                posts.
              </p>
            </div>
            <div className='feature-item'>
              <h3 className='text-2xl font-bold mb-2'>Commenting System</h3>
              <p>
                Leave comments on posts, fostering interaction and engagement.
              </p>
            </div>
            <div className='feature-item'>
              <h3 className='text-2xl font-bold mb-2'>
                Like and Dislike Functionality
              </h3>
              <p>Express opinions on posts with like and dislike buttons.</p>
            </div>
          </div>
        </div>

        <div className='testimonials-section bg-gray-200 p-8 rounded shadow-md w-full max-w-6xl mx-auto mt-8 mb-8'>
          <h2 className='text-3xl font-bold mb-4'>What Our Users Say</h2>
          <div className='testimonials-grid'>
            {suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => (
                <div className='testimonial-item' key={index}>
                  <p>{`"${suggestion.topic}" - User ${index + 1}`}</p>
                </div>
              ))
            ) : (
              <div className='testimonial-item'>
                <p>No feedback yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
