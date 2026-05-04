import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const GetToKnowUsSlide = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".gtk-text span",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "expo.out"
        }
      );
      
      gsap.to(".circle-decor", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "linear"
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  // Split text into spans for animation
  const text = "GET TO KNOW US";
  
  return (
    <section ref={containerRef} className="slide-section bg-[#0a0a0f] relative border-t border-surface/50">
      
      {/* Background Graphic */}
      <div className="absolute right-[-10%] top-[-10%] opacity-10 blur-xl pointer-events-none circle-decor">
         <svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
           <circle cx="400" cy="400" r="399" stroke="#ccff00" strokeWidth="2" strokeDasharray="10 10"/>
           <circle cx="400" cy="400" r="300" stroke="#ff0055" strokeWidth="1" strokeDasharray="5 5"/>
           <line x1="400" y1="0" x2="400" y2="800" stroke="#ccff00" strokeWidth="1" opacity="0.5"/>
           <line x1="0" y1="400" x2="800" y2="400" stroke="#ccff00" strokeWidth="1" opacity="0.5"/>
         </svg>
      </div>

      <div className="z-10 w-full px-8 flex justify-center items-center">
        <h2 className="gtk-text text-5xl md:text-7xl lg:text-[10vw] font-display font-bold leading-none tracking-tighter uppercase overflow-hidden flex flex-wrap justify-center gap-[1vw]">
          {text.split(' ').map((word, wordIdx) => (
             <span key={wordIdx} className="inline-block overflow-hidden">
               {word.split('').map((char, charIdx) => (
                 <span key={`${wordIdx}-${charIdx}`} className="inline-block relative">
                   {char}
                 </span>
               ))}
             </span>
          ))}
        </h2>
      </div>
      
      <div className="absolute bottom-10 right-10 flex gap-2">
         <div className="w-3 h-3 bg-accent-primary"></div>
         <div className="w-3 h-3 bg-accent-secondary"></div>
      </div>
    </section>
  );
};

export default GetToKnowUsSlide;
