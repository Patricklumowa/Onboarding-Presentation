import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const KoordinatorSlide = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".koor-title", { opacity: 0, x: -50, duration: 0.8, ease: "power3.out" })
        .from(".koor-image", { scale: 0.8, opacity: 0, duration: 0.6, ease: "back.out(1.7)" }, "-=0.4")
        .from(".koor-info > *", { opacity: 0, y: 20, duration: 0.5, stagger: 0.1 }, "-=0.2");
        
      // Cyber lines animation entry
      gsap.to(".cyber-lines line, .cyber-lines path", {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: "power2.inOut",
        stagger: 0.1
      });

      // Background decorative node animation
      gsap.to('.cyber-node', {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        opacity: "random(0.3, 0.8)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="slide-section bg-dark-base relative border-t border-surface/50 px-8 overflow-hidden">
      {/* Decorative High-Tech SVG Background */}
      <svg className="cyber-lines absolute inset-0 w-full h-full pointer-events-none opacity-[0.25]" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <g strokeWidth="1" opacity="0.6">
          <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#ccff00" strokeDasharray="1000" strokeDashoffset="1000" />
          <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#ff0055" strokeDasharray="1000" strokeDashoffset="1000" />
          <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#333" strokeDasharray="1000" strokeDashoffset="1000" />
          
          <path d="M 0 500 Q 250 300 500 500 T 1000 500" stroke="#00e5ff" fill="none" strokeDasharray="1500" strokeDashoffset="1500" />
        </g>
        
        {/* Floating tech nodes */}
        <g className="nodes-group">
          {[
            {x: '10%', y: '15%', c: '#ccff00'},
            {x: '80%', y: '25%', c: '#ff0055'},
            {x: '25%', y: '75%', c: '#00e5ff'},
            {x: '85%', y: '85%', c: '#ccff00'},
            {x: '50%', y: '50%', c: '#333'}
          ].map((node, i) => (
            <g key={i} className="cyber-node">
              <circle cx={node.x} cy={node.y} r="4" fill={node.c} />
              <circle cx={node.x} cy={node.y} r="12" fill="none" stroke={node.c} opacity="0.5" strokeDasharray="2 4" />
              <line x1={node.x} y1={node.y} x2={node.x} y2={`calc(${node.y} - 30px)`} stroke={node.c} opacity="0.3" />
            </g>
          ))}
        </g>
      </svg>

      <div className="z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 w-full">
        <div className="flex-1">
          <h2 className="koor-title text-4xl md:text-6xl font-display font-bold text-accent-primary uppercase mb-8">Koordinator<br/>Divisi</h2>
          
          <div className="koor-info space-y-4">
            <h3 className="text-3xl font-display text-white">Miracle Patric Lumowa</h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-surface border border-accent-primary/30 text-xs font-bold tracking-widest uppercase rounded-sm">Lead Coordinator</span>
              <span className="px-3 py-1 bg-surface border border-accent-secondary/30 text-xs font-bold tracking-widest uppercase rounded-sm">ML Ops</span>
            </div>
            <p className="text-gray-400 font-body text-lg leading-relaxed mt-6 max-w-md">
              "Ya.... Pokoknya koordinator no."
            </p>
          </div>
        </div>
        
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="koor-image relative p-2 border border-surface bg-[#0a0a0a]">
            {/* Cyberpunk corner markers */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent-primary"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent-primary"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent-primary"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent-primary"></div>
            
            <img 
              src="/coordi.png" 
              alt="Koordinator" 
              className="w-[300px] h-[400px] md:w-[400px] md:h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default KoordinatorSlide;
