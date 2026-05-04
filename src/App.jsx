import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import OpeningSlide from './slides/OpeningSlide';
import GetToKnowUsSlide from './slides/GetToKnowUsSlide';
import KoordinatorSlide from './slides/KoordinatorSlide';
import PengurusSlide from './slides/PengurusSlide';
import MLIntroSlide from './slides/MLIntroSlide';
import MLTypesSlide from './slides/MLTypesSlide';
import MLPipelineSlide from './slides/MLPipelineSlide';
import ToolsSlide from './slides/ToolsSlide';
import ClosingSlide from './slides/ClosingSlide';

const slides = [
  { Component: OpeningSlide, steps: 1 },
  { Component: GetToKnowUsSlide, steps: 1 },
  { Component: KoordinatorSlide, steps: 1 },
  { Component: PengurusSlide, steps: 2 }, // 2 Pengurus
  { Component: MLIntroSlide, steps: 1 },
  { Component: MLTypesSlide, steps: 3 }, // Supervised, Unsupervised, RL/DL
  { Component: MLPipelineSlide, steps: 1 },
  { Component: ToolsSlide, steps: 1 },
  { Component: ClosingSlide, steps: 1 }
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const goToNextSlide = () => {
    const slideInfo = slides[currentSlide];
    if (currentStep < slideInfo.steps - 1) {
      // More steps in current slide
      setCurrentStep(currentStep + 1);
    } else if (currentSlide < slides.length - 1) {
      // Move to next slide
      setCurrentSlide(currentSlide + 1);
      setCurrentStep(0);
    }
  };

  const goToPrevSlide = () => {
    if (currentStep > 0) {
      // Go to previous step in current slide
      setCurrentStep(currentStep - 1);
    } else if (currentSlide > 0) {
      // Move to previous slide
      setCurrentSlide(currentSlide - 1);
      setCurrentStep(slides[currentSlide - 1].steps - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent double firing if holding down, wait for animation
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goToNextSlide();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, currentStep]);

  const slideWrapperRef = useRef(null);

  useEffect(() => {
    if (slideWrapperRef.current) {
      gsap.fromTo(slideWrapperRef.current, 
        { opacity: 0, scale: 0.98, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      );
    }
  }, [currentSlide]);

  const { Component } = slides[currentSlide];
  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className="w-screen h-screen bg-dark-base text-gray-200 overflow-hidden relative selection:bg-accent-primary selection:text-dark-base">
      <div className="noise-overlay"></div>
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-surface z-[100] shadow-[0_0_10px_rgba(204,255,0,0.5)]">
        <div 
          className="h-full bg-accent-primary transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Slide Container */}
      <div className="w-full h-full relative origin-center" key={currentSlide} ref={slideWrapperRef}>
        <Component step={currentStep} />
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-8 right-8 z-[100] flex gap-4">
        <button 
          onClick={goToPrevSlide} 
          disabled={currentSlide === 0 && currentStep === 0} 
          className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center hover:bg-white/10 disabled:opacity-30 transition-all font-bold text-xl cursor-pointer"
        >
          &larr;
        </button>
        <button 
          onClick={goToNextSlide} 
          disabled={currentSlide === slides.length - 1 && currentStep === slides[slides.length-1].steps - 1} 
          className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center hover:bg-white/10 disabled:opacity-30 transition-all font-bold text-xl cursor-pointer"
        >
          &rarr;
        </button>
      </div>

      {/* Slide Indicator */}
      <div className="fixed bottom-8 left-8 z-[100] text-gray-500 font-display tracking-widest text-sm uppercase">
        {currentSlide + 1} / {slides.length} 
        {slides[currentSlide].steps > 1 && ` (Step ${currentStep + 1}/${slides[currentSlide].steps})`}
      </div>
    </div>
  );
}

export default App;
