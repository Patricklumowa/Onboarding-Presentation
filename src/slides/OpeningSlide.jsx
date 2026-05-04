import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const OpeningSlide = () => {
  const containerRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup initial states
      gsap.set([title1Ref.current, title2Ref.current], { 
        yPercent: 100, 
        opacity: 0,
        rotationX: 15
      });
      gsap.set(".decor-line", { scaleX: 0 });
      
      // Entrance animation
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      
      tl.to(".decor-line", {
        scaleX: 1,
        duration: 1.5,
        stagger: 0.2,
        transformOrigin: "left center"
      })
      .to([title1Ref.current, title2Ref.current], {
        yPercent: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.15
      }, "-=1.0")
      .fromTo(".glitch-text", 
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8 }, 
        "-=0.8"
      );

      // Grid GSAP effect
      if (gridRef.current) {
        gsap.fromTo('.grid-dot',
          { scale: 0.1, opacity: 0.2 },
          {
            scale: 1,
            opacity: 1,
            duration: 2,
            ease: "sine.inOut",
            stagger: {
              amount: 2.5,
              grid: [5, 14],
              from: "center"
            },
            repeat: -1,
            yoyo: true
          }
        );
        
        // Massive background rings animation
        gsap.to('.hero-ring-1', { rotation: 360, transformOrigin: 'center', duration: 40, repeat: -1, ease: 'none' });
        gsap.to('.hero-ring-2', { rotation: -360, transformOrigin: 'center', duration: 35, repeat: -1, ease: 'none' });
        gsap.to('.hero-ring-3', { rotation: 360, transformOrigin: 'center', duration: 50, repeat: -1, ease: 'none' });
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="slide-section relative perspective-1000 overflow-hidden">
      {/* Dynamic Animated SVG Background */}
      <div className="absolute top-1/2 left-[-10%] md:left-1/4 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.15] pointer-events-none z-0">
        <svg viewBox="0 0 1000 1000" className="w-full h-full" stroke="#ccff00" fill="none">
          <circle className="hero-ring-1" cx="500" cy="500" r="400" strokeWidth="2" strokeDasharray="50 30 10 40" />
          <circle className="hero-ring-2" cx="500" cy="500" r="300" strokeWidth="1.5" stroke="#ff0055" strokeDasharray="100 20" />
          <circle className="hero-ring-3" cx="500" cy="500" r="450" strokeWidth="1" strokeDasharray="5 15" opacity="0.5" />
          
          {/* Constellation points */}
          <g opacity="0.6">
            <circle cx="500" cy="100" r="5" fill="#ccff00" />
            <circle cx="900" cy="500" r="5" fill="#ff0055" />
            <circle cx="100" cy="500" r="5" fill="#ccff00" />
            <circle cx="500" cy="900" r="5" fill="#ff0055" />
          </g>
        </svg>
      </div>

      {/* Grid Pattern Background */}
      <div 
        ref={gridRef}
        className="absolute inset-0 z-0 grid grid-cols-[repeat(14,minmax(0,1fr))] grid-rows-[repeat(5,minmax(0,1fr))] gap-8 p-10 opacity-30"
      >
        {Array.from({ length: 14 * 5 }).map((_, i) => (
          <div key={i} className="grid-dot w-1 h-1 bg-accent-primary rounded-full mx-auto" />
        ))}
      </div>

      {/* Main Content */}
      <div className="z-10 w-full max-w-7xl mx-auto px-8 lg:px-16 flex flex-col justify-center">
        <div className="decor-line w-24 h-1 bg-accent-secondary mb-12"></div>
        
        <div className="overflow-hidden no-visible-scroll">
          <h1 
            ref={title1Ref} 
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-none tracking-tight text-white mb-4"
          >
            MACHINE
          </h1>
        </div>
        
        <div className="overflow-hidden no-visible-scroll">
          <h1 
            ref={title2Ref} 
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-none tracking-tight text-accent-primary"
          >
            LEARNING
          </h1>
        </div>

        <div className="mt-16 flex items-center gap-6">
          <div className="decor-line w-full h-[1px] bg-surface flex-grow"></div>
          <p className="glitch-text font-body uppercase tracking-[0.3em] font-light text-sm md:text-base whitespace-nowrap text-gray-400">
            ONBOARDING DIVISION <span className="text-accent-secondary ml-2 font-bold">2026</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default OpeningSlide;
