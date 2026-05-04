import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MLPipelineSlide = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Background Abstract Grid Entry
      tl.fromTo('.pipe-grid', 
        { opacity: 0, scale: 0.8 },
        { opacity: 0.15, scale: 1, duration: 1.5, ease: "power3.out" }
      );

      // Reveal Title
      tl.from(".pipeline-title", { opacity: 0, y: -30, duration: 0.8 }, "-=1");

      // Animate Nodes popping in sequentially
      tl.from(".svg-node", { 
        y: 40,
        opacity: 0, 
        transformOrigin: "center center", 
        stagger: 0.2, 
        ease: "back.out(1.2)",
        duration: 0.7
      }, "-=0.5");

      // Animate Connectors expanding
      tl.fromTo(".main-path", 
        { strokeDashoffset: 1000 },
        { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" },
        "-=0.8"
      );

      // Retraining Loop line
      tl.fromTo('.feedback-path',
        { strokeDashoffset: -800 },
        { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" },
        "-=1"
      );

      // --- CONTINUOUS INFINITE ANIMATIONS ---

      // 1. Data flow packets (Dashed lines moving)
      gsap.to(".data-stream", {
        strokeDashoffset: -50,
        duration: 1,
        repeat: -1,
        ease: "none"
      });

      // 2. Preprocessing Gear rotation
      gsap.to('.gear-icon', {
        rotation: 360,
        transformOrigin: "center center",
        duration: 8,
        repeat: -1,
        ease: "none"
      });

      // 3. Model Training Brain/Core Pulsing
      gsap.to('.training-core', {
        scale: 1.15,
        opacity: 0.8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "center center"
      });
      
      gsap.to('.training-ring', {
        rotation: -360,
        transformOrigin: "center center",
        duration: 10,
        repeat: -1,
        ease: "none"
      });

      // 4. Server/Deploy Lights Blinking
      gsap.to('.server-light', {
        opacity: 0.2,
        duration: 0.5,
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)"
      });

      // 5. Floating Data Particles along the feedback loop
      gsap.fromTo('.feedback-particle', 
        { attr: { cx: 950, cy: 230 }, opacity: 0 },
        { attr: { cy: 320 }, opacity: 1, duration: 0.5, ease: "power1.in", repeat: -1, delay: 0.5 }
      );
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="slide-section bg-[#0a0a0c] relative border-t border-surface/50 flex flex-col justify-center py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 noise-overlay z-0"></div>
      
      {/* High-tech overlay grid */}
      <svg className="pipe-grid absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid slice" opacity="0.1">
        <defs>
          <pattern id="hex-grid" width="40" height="69.282" patternUnits="userSpaceOnUse">
            <path d="M 40 17.321 L 20 5.774 L 0 17.321 L 0 40.415 L 20 51.962 L 40 40.415 Z" fill="none" stroke="#222" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-grid)" />
      </svg>
      
      <h2 className="pipeline-title text-4xl md:text-5xl lg:text-7xl font-display font-bold text-center mb-10 text-white uppercase tracking-tight z-10 relative">
        THE <span className="text-accent-primary">ML</span> PIPELINE <br/>
        <span className="text-xl md:text-2xl text-gray-400 font-body block mt-2 opacity-80 tracking-widest">ARCHITECTURE & WORKFLOW</span>
      </h2>

      <div className="z-10 w-full max-w-[95vw] mx-auto h-[50vh] md:h-[60vh] relative mt-2">
        {/* Animated SVG Diagram */}
        <svg viewBox="0 0 1200 450" className="w-full h-full overflow-visible" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#ccff00" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ff0055" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="solidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="50%" stopColor="#ccff00" />
              <stop offset="100%" stopColor="#ff0055" />
            </linearGradient>
            <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="heavyGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="15" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* MAIN PIPELINE BACKBONE */}
          <path className="main-path" d="M 120 180 L 1080 180" fill="none" stroke="url(#pipeGrad)" strokeWidth="12" strokeLinecap="round" strokeDasharray="1000" />
          {/* MOVING DATA STREAM */}
          <path className="data-stream" d="M 120 180 L 1080 180" fill="none" stroke="url(#solidGrad)" strokeWidth="4" strokeDasharray="15 35" strokeLinecap="round" filter="url(#neonGlow)" />

          {/* FEEDBACK LOOP (RETRAINING) */}
          <g className="feedback-path-group" opacity="0.8">
            <path className="feedback-path" d="M 950 230 L 950 320 L 550 320 L 550 240" fill="none" stroke="#ff0055" strokeWidth="2" strokeDasharray="800" />
            <path className="data-stream" d="M 950 230 L 950 320 L 550 320 L 550 240" fill="none" stroke="#ccff00" strokeWidth="2" strokeDasharray="8 20" />
            
            <rect x="700" y="305" width="100" height="30" rx="4" fill="#0a0a0c" stroke="#ff0055" strokeWidth="1" />
            <text x="750" y="325" fill="#ff0055" fontSize="12" fontFamily="Outfit" letterSpacing="2" textAnchor="middle">RETRAINING</text>
          </g>

          {/* ----- NODES ----- */}

          {/* 1. Data Collection */}
          <g className="svg-node" transform="translate(120, 180)">
            <rect x="-70" y="-80" width="140" height="120" rx="12" fill="#111115" stroke="#4f46e5" strokeWidth="2" filter="url(#neonGlow)" />
            <rect x="-70" y="-80" width="140" height="120" rx="12" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
            
            {/* Database Icon */}
            <path d="M 0 -40 C 25 -40 40 -35 40 -30 C 40 -25 25 -20 0 -20 C -25 -20 -40 -25 -40 -30 C -40 -35 -25 -40 0 -40 Z" fill="none" stroke="#4f46e5" strokeWidth="2" />
            <path d="M -40 -30 L -40 0 C -40 5 -25 10 0 10 C 25 10 40 5 40 0 L 40 -30" fill="none" stroke="#4f46e5" strokeWidth="2" />
            <path d="M -40 -15 C -40 -10 -25 -5 0 -5 C 25 -5 40 -10 40 -15" fill="none" stroke="#4f46e5" strokeWidth="2" opacity="0.5" />
            
            <text x="0" y="25" fill="white" fontSize="16" fontFamily="Space Grotesk" fontWeight="bold" textAnchor="middle">DATA</text>
          </g>

          {/* 2. Preprocessing */}
          <g className="svg-node" transform="translate(340, 180)">
            <polygon points="0,-70 60,0 0,70 -60,0" fill="#111115" stroke="#00e5ff" strokeWidth="2" filter="url(#neonGlow)" />
            <polygon points="0,-60 50,0 0,60 -50,0" fill="none" stroke="#00e5ff" strokeWidth="1" opacity="0.4" />
            
            {/* Gear Icon */}
            <g className="gear-icon">
              <circle cx="0" cy="0" r="15" fill="none" stroke="#00e5ff" strokeWidth="3" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <rect key={deg} x="-3" y="-22" width="6" height="8" fill="#00e5ff" transform={`rotate(${deg})`} />
              ))}
            </g>

            <text x="0" y="95" fill="white" fontSize="14" fontFamily="Space Grotesk" fontWeight="bold" textAnchor="middle">CLEAN & PREP</text>
          </g>

          {/* 3. Model Training (THE CORE) */}
          <g className="svg-node" transform="translate(550, 180)">
            {/* Glowing Outer Rings */}
            <circle className="training-ring" cx="0" cy="0" r="90" fill="none" stroke="#ccff00" strokeWidth="1" strokeDasharray="10 30" opacity="0.6" />
            <circle className="training-ring" cx="0" cy="0" r="100" fill="none" stroke="#ccff00" strokeWidth="2" strokeDasharray="40 60" opacity="0.3" transform="scale(-1, 1)" />
            
            <circle className="training-core" cx="0" cy="0" r="75" fill="#111115" stroke="#ccff00" strokeWidth="3" filter="url(#heavyGlow)" />
            
            {/* AI Brain / Core Icon */}
            <path d="M 0 -30 L -25 -10 L -15 20 L 15 20 L 25 -10 Z" fill="none" stroke="#ccff00" strokeWidth="2" />
            <circle cx="0" cy="0" r="10" fill="#ccff00" filter="url(#neonGlow)" />
            <path d="M 0 -30 L 0 0 M -25 -10 L 0 0 M -15 20 L 0 0 M 15 20 L 0 0 M 25 -10 L 0 0" stroke="#ccff00" strokeWidth="1" opacity="0.6" />
            
            <text x="0" y="-115" fill="#ccff00" fontSize="16" fontFamily="Space Grotesk" fontWeight="bold" textAnchor="middle" letterSpacing="4">TRAINING</text>
          </g>

          {/* 4. Evaluation */}
          <g className="svg-node" transform="translate(770, 180)">
            <rect x="-60" y="-60" width="120" height="120" rx="20" fill="#111115" stroke="#ff0055" strokeWidth="2" filter="url(#neonGlow)" transform="rotate(45)" />
            
            {/* Chart Icon */}
            <path d="M -20 20 L 20 20 M -20 -20 L -20 20" fill="none" stroke="#ff0055" strokeWidth="2" />
            <path d="M -15 15 L -5 -5 L 5 5 L 18 -15" fill="none" stroke="#ff0055" strokeWidth="2" />
            <circle cx="18" cy="-15" r="3" fill="#ff0055" />

            <text x="0" y="85" fill="white" fontSize="14" fontFamily="Space Grotesk" fontWeight="bold" textAnchor="middle">EVALUATION</text>
          </g>

          {/* 5. Deployment / Server */}
          <g className="svg-node" transform="translate(980, 180)">
            <rect x="-65" y="-80" width="130" height="140" rx="8" fill="#111115" stroke="#ff0055" strokeWidth="2" filter="url(#neonGlow)" />
            
            {/* Server racks */}
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(0, ${-40 + i * 40})`}>
                <rect x="-45" y="0" width="90" height="25" rx="4" fill="none" stroke="#ff0055" strokeWidth="1" />
                <circle cx="-30" cy="12.5" r="3" fill="#ff0055" className="server-light" style={{ animationDelay: `${i * 0.2}s` }} />
                <circle cx="-15" cy="12.5" r="3" fill="#ff0055" className="server-light" style={{ animationDelay: `${i * 0.4}s` }} />
                <line x1="10" y1="12.5" x2="35" y2="12.5" stroke="#ff0055" strokeWidth="2" opacity="0.5" />
              </g>
            ))}

            <text x="0" y="-105" fill="#ff0055" fontSize="16" fontFamily="Space Grotesk" fontWeight="bold" textAnchor="middle" letterSpacing="2">DEPLOY</text>
          </g>

        </svg>
      </div>
    </section>
  );
};

export default MLPipelineSlide;
