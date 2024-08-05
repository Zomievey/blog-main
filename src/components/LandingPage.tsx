import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Image from "next/image";
import "../styles/landingPage.css";
import "../types/images.ts";
import { images } from "../types/images";

export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isSliderPaused, setIsSliderPaused] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: !isSliderPaused,
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  const preloadImage = (src: string) => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.src = src;
      img.onload = resolve;
    });
  };

  const openLightbox = async (index: number) => {
    await preloadImage(images[index].src);
    setPhotoIndex(index);
    setIsOpen(true);
    setIsSliderPaused(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setIsSliderPaused(false);
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar isLandingPage={true} />
      <div className='flex-grow'>
        <div className='hero-section'>
          <div className='hero-content'>
            <h1 className='hero-title'>Feral Art</h1>
            <p className='hero-subtitle'>
              Experience the beauty of oils, watercolors, and murals where
              innovation meets artistic whimsy.
            </p>
            <p className='hero-subtitle'>
              From pet portraits and illustrations to abstract oil paintings,
              each piece is inspired by nature’s wonders:
              <br /> clouds, sunsets, flowers, and the wild around us.
            </p>

            <p className='hero-subtitle'>
              Commissions are always welcome.
              <br /> If you have a vision or a question, I’d love to bring it to
              life.
              <br /> Simply fill out the form under "Get a Quote" to get
              started.
            </p>

            <div className='button-container'>
              <Link href='/homepage' legacyBehavior>
                <a className='btn-custom text-2xl'>Go to blog</a>
              </Link>
              <a
                href='https://docs.google.com/forms/d/e/1FAIpQLSe3h2RtEGB-TV4GHbG5z70ikIaQdQpwbq_DTfwSSJPMYynszw/viewform?usp=sf_link'
                target='_blank'
                rel='noopener noreferrer'
                className='btn-custom text-2xl'
              >
                Get a quote
              </a>
            </div>
          </div>
        </div>

        <div className='slideshow-container'>
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className='slide'>
                <div
                  onClick={() => openLightbox(index)}
                  className='flex justify-center items-center'
                  style={{ height: "100%" }}
                >
                  <div className='image-border'>
                    <Image
                      className='image'
                      src={image.src}
                      alt={image.title}
                      width={image.width}
                      height={image.height}
                      layout='responsive'
                      quality={75}
                      objectFit='cover'
                    />
                  </div>
                </div>
                <h1 className='hero-subtitle text-center mt-3'>
                  {image.title}
                </h1>
              </div>
            ))}
          </Slider>
        </div>

        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex].src}
            nextSrc={images[(photoIndex + 1) % images.length].src}
            prevSrc={
              images[(photoIndex + images.length - 1) % images.length].src
            }
            onCloseRequest={closeLightbox}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % images.length)
            }
            imageTitle={images[photoIndex].title}
            imageCaption={images[photoIndex].description}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
