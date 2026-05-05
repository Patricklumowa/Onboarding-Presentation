import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const PengurusSlide = ({ step = 0 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.pengurus-card');
      
      // Set initial entry state right before the step animation takes over,
      // avoiding animation tracking collisions!
      gsap.set(cards[0], { x: "-105%", y: 150, opacity: 0, scale: 0.8 });
      gsap.set(cards[1], { x: "5%", y: 200, opacity: 0, scale: 0.6 });

      // Background element animation
      gsap.to('.bg-shape', {
        rotation: "random(-45, 45)",
        x: "random(-30, 30)",
        y: "random(-30, 30)",
        duration: "random(4, 8)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const cards = gsap.utils.toArray('.pengurus-card');
    
    if (step === 0) {
      // First card active, Left-Top
      gsap.to(cards[0], { 
        x: "-105%",
        y: 0, 
        scale: 1, 
        opacity: 1, 
        filter: "grayscale(0%) blur(0px)", 
        duration: 0.8, 
        ease: "power3.inOut" 
      });
      // Second card inactive, Right-Bottom
      gsap.to(cards[1], { 
        x: "5%", 
        y: 100,    
        scale: 0.8, 
        opacity: 0.2, 
        filter: "grayscale(100%) blur(8px)", 
        duration: 0.8, 
        ease: "power3.inOut" 
      });
    } else if (step === 1) {
      // First card inactive, Left-Bottom
      gsap.to(cards[0], { 
        x: "-105%",
        y: 100,    
        scale: 0.8, 
        opacity: 0.2, 
        filter: "grayscale(100%) blur(8px)", 
        duration: 0.8, 
        ease: "power3.inOut" 
      });
      // Second card active, Right-Top
      gsap.to(cards[1], { 
        x: "5%", 
        y: 0,      
        scale: 1, 
        opacity: 1, 
        filter: "grayscale(0%) blur(0px)", 
        duration: 0.8, 
        ease: "power3.inOut" 
      });
    }
  }, [step]);

  return (
    <section ref={containerRef} className="slide-section bg-dark-base relative border-t border-surface/50 px-8 py-20 flex-col flex overflow-hidden">
      
      {/* Animated SVG Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <svg w="100%" h="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none" className="w-full h-full">
          {/* Abstract Floating Shapes */}
          <rect className="bg-shape" x="100" y="200" width="150" height="150" fill="none" stroke="#ff0055" strokeWidth="2" strokeDasharray="10 5" transform="rotate(15, 175, 275)" />
          <polygon className="bg-shape" points="800,100 900,300 700,300" fill="none" stroke="#ccff00" strokeWidth="2" opacity="0.6" />
          <circle className="bg-shape" cx="850" cy="700" r="100" fill="none" stroke="#00e5ff" strokeWidth="1" strokeDasharray="4 8" />
          <rect className="bg-shape" x="150" y="650" width="80" height="80" fill="none" stroke="#ff0055" strokeWidth="3" transform="rotate(45, 190, 690)" />
          
          {/* Connecting Thin Lines */}
          <path d="M 175 275 L 800 200 L 850 700 L 190 690 Z" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.1" />
        </svg>
      </div>

      <div className="absolute top-10 right-10 z-0 opacity-[0.15]">
        <h2 className="text-8xl font-display uppercase text-transparent stroke-text mix-blend-overlay" style={{ WebkitTextStroke: '2px #ff0055' }}>TEAM</h2>
      </div>

      <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-10 z-10 self-start md:ml-[10%]">
        CORE PENGURUS <span className="text-accent-secondary">.</span>
      </h2>

      <div className="z-10 relative max-w-6xl mx-auto w-full h-[600px] mt-10">
        {/* Card 1 */}
        <div className="pengurus-card absolute top-0 left-[50%] w-[45%] max-w-[400px] md:w-[40%] bg-surface border border-white/5 p-6 transform-gpu">
          <div className="absolute inset-0 bg-accent-secondary/5 opacity-0 transition-opacity"></div>
          
          <img 
            src="/jana.png" 
            alt="Pengurus 1" 
            className="w-full aspect-[4/5] object-cover mb-6 border border-white/10"
          />
          
          <h3 className="text-3xl font-display text-white mb-2">Jana Worang</h3>
          <p className="text-xs uppercase tracking-widest text-accent-secondary mb-4">Pengurus Divisi ML</p>
          <p className="text-gray-400 font-body text-sm">
            Pokonya gitu.
          </p>
        </div>

        {/* Card 2 */}
        <div className="pengurus-card absolute top-0 left-[50%] w-[45%] max-w-[400px] md:w-[40%] bg-surface border border-white/5 p-6 transform-gpu">
          <div className="absolute inset-0 bg-accent-primary/5 opacity-0 transition-opacity"></div>
          
          <img 
            src="/amat.png" 
            alt="Pengurus 2" 
            className="w-full aspect-[4/5] object-cover mb-6 border border-white/10"
          />
          
          <h3 className="text-3xl font-display text-white mb-2"> Luhung Aradhana</h3>
          <p className="text-xs uppercase tracking-widest text-accent-primary mb-4">Pengajar Inti</p>
          <p className="text-gray-400 font-body text-sm">
            isi apaan ya.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PengurusSlide;
