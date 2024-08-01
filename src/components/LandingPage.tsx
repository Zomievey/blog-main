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
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
      }, 9000); // Adjusted for longer visibility and slower transitions

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
          <div className='grid-item large-tile'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
          <div className='grid-item small-tile'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </div>
          <div className='grid-item small-tile'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </div>
          <div className='grid-item medium-tile'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
          <div className='grid-item medium-tile'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
          <div className='grid-item medium-tile'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
        </div>

        <div className='testimonials-section'>
          <div>
            <h2 className='text-3xl font-bold mb-4'></h2>
          </div>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`testimonial ${index === activeIndex ? "active" : ""}`}
            >
              <p>{`"${suggestion.topic}"`}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
