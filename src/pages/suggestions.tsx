import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Link from "next/link";
import "../styles/landingPage.css";
import axios from "axios";
import { Suggestion } from "../types";

export default function LandingPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

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

  useEffect(() => {
    if (suggestions.length > 0) {
      const typingInterval = setInterval(() => {
        const currentText = suggestions[activeIndex]?.topic || "";
        let currentIndex = 0;

        const typeWriterEffect = setInterval(() => {
          setDisplayText((prev) => prev + currentText[currentIndex]);
          currentIndex++;

          if (currentIndex === currentText.length) {
            clearInterval(typeWriterEffect);
          }
        }, 130); // Adjust typing speed

        return () => clearInterval(typeWriterEffect);
      }, 22000); // Adjust interval between suggestions

      return () => clearInterval(typingInterval);
    }
  }, [suggestions, activeIndex]);

  useEffect(() => {
    if (suggestions.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
        setDisplayText(""); // Clear text for next suggestion
      }, 9000); // Adjust for longer visibility and slower transitions

      return () => clearInterval(interval);
    }
  }, [suggestions]);

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar isLandingPage={true} />
      <div className='flex-grow'>
        <div className='hero-section'>
          <div className='hero-content'>
            <h1 className='hero-title'>Innovative Tech Blog</h1>
            <p className='hero-subtitle'>
              Discover insights, tutorials, and tips on the latest in
              technology. Join our community and stay updated.
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
        </div>

        <div className='grid-container'>
          {/* Your grid content here */}
        </div>

        <div className='testimonials-section'>
          <h2 className='text-3xl font-bold mb-4'>Testimonials</h2>
          <div className='testimonial-container'>
            <div className={`testimonial`}>
              <p>{displayText}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
