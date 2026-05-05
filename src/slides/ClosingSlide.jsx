import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ClosingSlide = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".close-text", {
        y: 150,
        opacity: 0,
        rotation: 5,
        duration: 1.2,
        ease: "power4.out"
      })
      .from(".qa-img", {
        scale: 0,
        rotation: -45,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.5)"
      }, "-=0.8")
      .from(".qa-desc", {
        opacity: 0,
        y: 20,
        duration: 0.6
      }, "-=0.4")
      .from(".presenter-info", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      
      // Bubble popping animation
      .from(".the-bubble", {
        scale: 0,
        y: 100,
        opacity: 0,
        duration: 1.4,
        ease: "elastic.out(1, 0.4)" // Bouncy entrance
      }, "-=0.2")
      .to(".the-bubble", {
        scaleX: 1.15,
        scaleY: 0.85,
        duration: 0.08,
        yoyo: true,
        repeat: 5,
        ease: "sine.inOut" // Jitter / wobble like a bubble under pressure
      })
      .to(".the-bubble", {
        scale: 1.3,
        opacity: 0,
        duration: 0.05, // Instantly popped
        ease: "power2.in"
      })
      // Shockwave Ring - only appears at burst moment
      .fromTo(".pop-shockwave", {
        scale: 0.8,
        opacity: 0,
        borderWidth: "2px"
      }, {
        scale: 3.5,
        opacity: 0,
        borderWidth: "1px",
        duration: 0.7,
        ease: "expo.out"
      }, "-=0.05") // Start right at the pop moment
      // Advanced Particle explosion
      .fromTo(".pop-particle", {
        x: 0,
        y: 0,
        scale: 0.1,
        opacity: 1
      }, {
        x: () => gsap.utils.random(-400, 400),
        y: () => gsap.utils.random(-400, 400),
        scale: () => gsap.utils.random(0.5, 3),
        opacity: 0,
        rotation: () => gsap.utils.random(-360, 360),
        duration: () => gsap.utils.random(0.6, 1.5),
        ease: "expo.out"
      }, "<")
      // Reveal photo
      .fromTo(".the-photo", {
        scale: 0.1,
        opacity: 0,
        rotation: 45,
        filter: "contrast(200%) blur(20px)"
      }, {
        scale: 1,
        opacity: 1,
        rotation: -5,
        filter: "contrast(100%) blur(0px)",
        duration: 1.4,
        ease: "elastic.out(0.8, 0.5)" // Gives a heavy, satisfying thud into place
      }, "<0.02"); // trigger exactly with the pop

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full bg-accent-primary text-dark-base relative border-t border-surface overflow-hidden flex flex-col justify-center items-center">
      
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex justify-center items-center">
        <div className="w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] border-[1px] border-dark-base rounded-full border-dashed animate-[spin_60s_linear_infinite]"></div>
      </div>

      {/* Credit Left */}
      <div className="presenter-info absolute left-6 md:left-16 top-1/2 transform -translate-y-1/2 z-20">
        <p className="font-body text-sm md:text-base font-bold uppercase tracking-widest text-dark-base opacity-80 max-w-[200px] text-left border-l-4 border-dark-base pl-4">
          This Web Presentation<br/>is built by<br/>
          <span className="text-2xl md:text-4xl font-display text-white mix-blend-difference mt-3 block">Patrick Lumowa</span>
        </p>
      </div>

      {/* Bubble & Photo Right */}
      <div className="absolute right-2 md:right-8 lg:right-12 top-[40%] transform -translate-y-1/2 z-20 flex justify-center items-center h-80 w-80">
        {/* The Bubble */}
        <div className="the-bubble absolute w-56 h-56 md:w-72 md:h-72 rounded-full border border-pink-300/40 shadow-[inset_0_0_60px_rgba(0,255,255,0.3),inset_20px_0_80px_rgba(255,0,255,0.2),inset_-20px_0_80px_rgba(0,100,255,0.2)] backdrop-blur-sm z-30 flex justify-center items-center overflow-hidden">
           {/* Specular Highlights for soap bubble effect */}
           <div className="absolute top-8 left-8 w-24 h-12 border-t-[6px] border-white/60 rounded-full blur-[2px] transform -rotate-45"></div>
           <div className="absolute bottom-6 right-6 w-32 h-32 bg-cyan-400/20 rounded-full blur-xl"></div>
           <div className="absolute top-12 right-12 w-20 h-20 bg-pink-400/20 rounded-full blur-xl"></div>
           <div className="absolute top-1/2 left-4 w-6 h-16 bg-white/30 rounded-full blur-[3px] transform -rotate-12"></div>
        </div>

        {/* Shockwave Ring */}
        <div className="pop-shockwave absolute inset-0 m-auto w-56 h-56 md:w-72 md:h-72 rounded-full border-white/80 z-30 pointer-events-none opacity-0 shadow-[0_0_40px_rgba(0,255,255,0.8)]"></div>

        {/* Advanced Particles */}
        {[...Array(30)].map((_, i) => {
          const colors = ['rgba(187, 255, 255, 0.8)', 'rgba(187, 255, 255, 0.8)', 'rgba(183, 243, 255, 0.8)'];
          const bg = colors[i % colors.length];
          const size = 6 + (i % 6) * 2; // Varying sizes logic
          return (
            <div key={`part-${i}`} className="pop-particle absolute rounded-full z-40 pointer-events-none mix-blend-screen" 
              style={{ 
                top: '50%', left: '50%', 
                width: `${size}px`, height: `${size}px`,
                marginTop: `${-size/2}px`, marginLeft: `${-size/2}px`,
                backgroundColor: bg, 
                boxShadow: `0 0 ${size * 1.5}px ${bg}` 
              }}
            ></div>
          );
        })}

        {/* The Photo Placeholder */}
        <div className="the-photo absolute w-64 md:w-80 h-auto rounded-xl shadow-2xl z-20 rotate-[-5deg] overflow-hidden border-2 border-white/20">
           <img src="/mas_gatot.png" alt="Patrick" className="w-full h-auto object-cover" />
        </div>
      </div>

      {/* Center Q&A */}
      <div className="z-10 flex flex-col items-center max-w-2xl text-center px-4">
        
        <div className="qa-img mb-12 w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-dark-base">
           <img 
              src="https://placehold.co/400x400/08080a/ccff00?text=Q%26A" 
              alt="Q&A" 
              className="w-full h-full object-cover filter grayscale contrast-125"
            />
        </div>

        <h2 className="close-text text-5xl md:text-8xl lg:text-[8vw] font-display font-black leading-none uppercase tracking-tighter mix-blend-difference text-white">
          ADA PERTANYAAN<span className="text-dark-base mix-blend-normal">?</span>
        </h2>
        
        <p className="qa-desc mt-8 font-body text-xl md:text-2xl font-bold tracking-widest uppercase">
          usahakan nda usah ba tanya:v <span className="underline decoration-wavy underline-offset-4">#divisi_ML</span>
        </p>

       <div className="mt-12 flex flex-col items-center gap-4">
        </div>
      </div>

    </section>
  );
};

export default ClosingSlide;
