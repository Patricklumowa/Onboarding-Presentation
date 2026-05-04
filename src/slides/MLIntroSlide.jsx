import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MLIntroSlide = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ml-intro-text", 
        { scale: 3, opacity: 0, filter: "blur(20px)" },
        { 
          scale: 1, 
          opacity: 1, 
          filter: "blur(0px)",
          duration: 1.5, 
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 40%"
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="slide-section bg-[#e5e5e5] text-dark-base relative border-t border-surface/50">
      <div className="noise-overlay" style={{opacity: 0.08}}></div>
      
      <div className="z-10 text-center px-4 flex flex-col items-center">
        <p className="text-sm font-bold uppercase tracking-[0.5em] mb-12 text-gray-500">Pertanyaan Mendasar</p>
        <h2 className="ml-intro-text text-5xl md:text-8xl lg:text-[7vw] font-display font-extrabold leading-none tracking-tighter uppercase whitespace-break-spaces w-full max-w-[1200px] text-center mix-blend-difference">
          APA ITU MACHINE LEARNING?
        </h2>
      </div>
    </section>
  );
};

export default MLIntroSlide;
