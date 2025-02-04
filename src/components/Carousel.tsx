import { useState, useEffect } from 'react';
import './Carousel.css';

interface CarouselProps {
  images: string[];
}

const Carousel = ({ images }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'slide-left' | 'slide-right' | ''>('');

  const nextSlide = () => {
    setSlideDirection('slide-left');
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      return newIndex;
    });
  };

  const prevSlide = () => {
    setSlideDirection('slide-right');
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      return newIndex;
    });
  };

  // Reset animation class after animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideDirection('');
    }, 500); // Match this with CSS animation duration

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="carousel">
      <button 
        className="carousel-button prev" 
        onClick={prevSlide}
        type="button"
      >
        &#8249;
      </button>
      <div className="carousel-content">
        <img 
          key={currentIndex}
          src={images[currentIndex]} 
          alt={`Slide ${currentIndex + 1}`} 
          className={`carousel-image ${slideDirection}`}
        />
        <div className="carousel-indicator">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
      <button 
        className="carousel-button next" 
        onClick={nextSlide}
        type="button"
      >
        &#8250;
      </button>
    </div>
  );
};

export default Carousel; 