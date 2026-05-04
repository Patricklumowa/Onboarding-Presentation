import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const MLTypesSlide = ({ step = 0 }) => {
  const containerRef = useRef(null);

  const types = [
    {
      title: 'SUPERVISED',
      subtitle: 'Learning with a teacher',
      desc: 'Model belajar dari data yang sudah memiliki label. Memberikan fitur Input dan mengharapkan Output yang sesuai.',
      color: '#ccff00', // accent-primary
    },
    {
      title: 'UNSUPERVISED',
      subtitle: 'Finding hidden structures',
      desc: 'Mencari pola tersembunyi dari data yang tidak berlabel. Model mengelompokkan atau menemukan struktur secara mandiri.',
      color: '#ff0055', // accent-secondary
    },
    {
      title: 'DEEP LEARNING',
      subtitle: 'Neural Networks across layers',
      desc: 'Cabang ML yang menggunakan jaringan saraf tiruan (Neural Networks) dengan banyak layer untuk mengekstraksi tingkat fitur yang kompleks.',
      color: '#00e5ff', // cyan accent
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".type-panel", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // SVG GSAP Animations tailored per step
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (step === 0) {
        gsap.fromTo('.sup-line', 
          { strokeDashoffset: 300 },
          { strokeDashoffset: 0, duration: 1.5, ease: "power3.out" }
        );
        gsap.to('.sup-dot', {
          y: "random(-15, 15)",
          x: "random(-15, 15)",
          duration: "random(1.5, 3)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.1
        });
      } else if (step === 1) {
        gsap.to('.unsup-ring', { rotation: 360, transformOrigin: 'center', duration: 25, repeat: -1, ease: 'none' });
        gsap.to('.unsup-ring-inner', { rotation: -360, transformOrigin: 'center', duration: 20, repeat: -1, ease: 'none' });
        
        gsap.fromTo('.unsup-dot', 
          { x: 0, y: 0, scale: 0 },
          {
            x: () => gsap.utils.random([-40, 0, 40]) + gsap.utils.random(-15, 15),
            y: () => gsap.utils.random([-40, 0, 40]) + gsap.utils.random(-15, 15),
            scale: 1,
            duration: 2,
            ease: "elastic.out(1, 0.5)",
            stagger: 0.05
          }
        );
        
        gsap.to('.unsup-dot', {
          scale: "random(0.8, 1.2)",
          duration: "random(1, 2)",
          delay: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      } else if (step === 2) {
        // Animate node radius via attr to avoid center transform origin scaling bugs
        gsap.to('.dl-node', {
          attr: { r: 9 }, // Base is 6
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: { amount: 1.5, from: "edges" }
        });

        gsap.fromTo('.dl-path', 
          { strokeDasharray: "4 10", strokeDashoffset: 14 },
          { strokeDashoffset: 0, duration: 0.5, repeat: -1, ease: "none" }
        );

        // Animate pulse cx/cy coordinates to trace precise SVG positions instead of relative transforms
        const tl1 = gsap.timeline({ repeat: -1 });
        tl1.fromTo('.dl-pulse', 
              { attr: { cx: 50, cy: 40, r: 0 }, opacity: 0 }, 
              { attr: { r: 4 }, opacity: 1, duration: 0.2 })
           .to('.dl-pulse', { attr: { cx: 100, cy: 80 }, duration: 0.6, ease: "power1.inOut" })
           .to('.dl-pulse', { attr: { cx: 150, cy: 130 }, duration: 0.6, ease: "power1.inOut" })
           .to('.dl-pulse', { attr: { r: 0 }, opacity: 0, duration: 0.2 })
           .to({}, { duration: 0.5 }); // pause

        const tl2 = gsap.timeline({ repeat: -1, delay: 0.8 });
        tl2.fromTo('.dl-pulse2', 
              { attr: { cx: 50, cy: 160, r: 0 }, opacity: 0 }, 
              { attr: { r: 4 }, opacity: 1, duration: 0.2 })
           .to('.dl-pulse2', { attr: { cx: 100, cy: 120 }, duration: 0.6, ease: "power1.inOut" })
           .to('.dl-pulse2', { attr: { cx: 150, cy: 70 }, duration: 0.6, ease: "power1.inOut" })
           .to('.dl-pulse2', { attr: { r: 0 }, opacity: 0, duration: 0.2 })
           .to({}, { duration: 0.2 }); // pause
      }
    }, containerRef);
    return () => ctx.revert();
  }, [step]);

  return (
    <section ref={containerRef} className="h-screen w-full flex flex-col md:flex-row bg-dark-base border-t border-surface/50 overflow-hidden items-stretch">
      {types.map((type, index) => {
        const isHovered = step === index;
        const flexValue = isHovered ? '2 1 0%' : '0.5 1 0%';
        const bgColor = isHovered ? '#111' : 'transparent';
        
        return (
          <div 
            key={index}
            className="h-full relative transition-[flex,background-color] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col border-r border-surface/50 overflow-hidden"
            style={{
              flex: flexValue,
              backgroundColor: bgColor,
            }}
          >
            {/* Inner div for GSAP Entry Animation */}
            <div className="type-panel absolute inset-0 w-full h-full flex flex-col pt-40 md:pt-52 px-8 md:px-12 items-start pointer-events-none">
            {/* SVG Background Illustration */}
            <div 
              className="absolute inset-0 pointer-events-none transition-opacity duration-700 flex items-center justify-center z-0"
              style={{ opacity: isHovered ? 0.6 : 0.05 }}
            >
              {index === 0 && (
                <svg viewBox="0 0 200 200" className="w-[150%] h-[150%] max-w-[500px]" stroke={type.color} fill="none" strokeWidth="1.5">
                  <path className="sup-line" d="M 20 180 L 180 20" strokeWidth="2" opacity="0.6" strokeDasharray="300" strokeDashoffset="300"/>
                  <g className="sup-elements">
                    <circle className="sup-dot" cx="40" cy="60" r="6" fill={type.color} />
                    <circle className="sup-dot" cx="80" cy="80" r="5" fill={type.color} />
                    <circle className="sup-dot" cx="120" cy="140" r="8" />
                    <circle className="sup-dot" cx="160" cy="120" r="5" />
                    <circle className="sup-dot" cx="150" cy="160" r="7" />
                    <circle className="sup-dot" cx="50" cy="110" r="4" fill={type.color} />
                    <circle className="sup-dot" cx="130" cy="90" r="6" />
                  </g>
                </svg>
              )}
              {index === 1 && (
                <svg viewBox="0 0 200 200" className="w-[150%] h-[150%] max-w-[500px]" stroke={type.color} fill="none" strokeWidth="1.5">
                  <circle className="unsup-ring" cx="100" cy="100" r="70" strokeDasharray="4 12" opacity="0.3" />
                  <circle className="unsup-ring-inner" cx="100" cy="100" r="45" strokeDasharray="2 6" opacity="0.2" />
                  <g className="unsup-dots">
                    {Array.from({length: 18}).map((_, i) => (
                      <circle 
                        key={i} 
                        className="unsup-dot" 
                        cx="100" cy="100" 
                        r={Math.random()*4 + 3} 
                        fill={i%3 === 0 ? type.color : 'none'} 
                      />
                    ))}
                  </g>
                </svg>
              )}
              {index === 2 && (
                <svg viewBox="0 0 200 200" className="w-[150%] h-[150%] max-w-[500px]" stroke={type.color} fill="none" strokeWidth="1.5">
                  <g className="dl-connections" opacity="0.25">
                    {[40, 100, 160].map((y1) => 
                      [40, 80, 120, 160].map((y2) => (
                        <path key={`${y1}-${y2}`} d={`M 50 ${y1} L 100 ${y2}`} className="dl-path" />
                      ))
                    )}
                    {[40, 80, 120, 160].map((y2) => 
                      [70, 130].map((y3) => (
                        <path key={`${y2}-${y3}`} d={`M 100 ${y2} L 150 ${y3}`} className="dl-path" />
                      ))
                    )}
                  </g>
                  <g className="dl-nodes">
                    {[40, 100, 160].map(y => <circle key={`in-${y}`} className="dl-node" cx="50" cy={y} r="6" fill="#111" strokeWidth="2" stroke={type.color}/>)}
                    {[40, 80, 120, 160].map(y => <circle key={`mid1-${y}`} className="dl-node" cx="100" cy={y} r="6" fill="#111" strokeWidth="2" stroke={type.color}/>)}
                    {[70, 130].map(y => <circle key={`out-${y}`} className="dl-node" cx="150" cy={y} r="6" fill={type.color}/>)}
                  </g>
                  <circle className="dl-pulse" cx="50" cy="40" r="4" fill="#fff" style={{filter: 'drop-shadow(0 0 4px #fff)'}}/>
                  <circle className="dl-pulse2" cx="50" cy="160" r="4" fill="#fff" style={{filter: 'drop-shadow(0 0 4px #fff)'}}/>
                </svg>
              )}
            </div>

            {/* Decorative Color Line */}
            <div 
              className="absolute top-0 right-0 w-2 h-full opacity-20 transition-opacity duration-300"
              style={{ backgroundColor: type.color, opacity: isHovered ? 1 : 0.2 }}
            />
            
            <div className="absolute top-12 left-12 text-6xl md:text-9xl font-display opacity-10 font-bold" style={{ color: type.color }}>
              0{index + 1}
            </div>

            <div className="z-10 w-full">
              <h3 
                className="font-body text-xs tracking-[0.3em] mb-4 uppercase transition-colors duration-300"
                style={{ color: isHovered ? type.color : '#555' }}
              >
                {type.subtitle}
              </h3>
              <h2 
                className="text-4xl md:text-5xl lg:text-7xl font-display font-bold leading-none mb-6 transition-colors duration-300"
                style={{ 
                  color: isHovered ? '#fff' : '#222',
                  textShadow: isHovered ? `0 0 30px ${type.color}60` : 'none'
                }}
              >
                {type.title}
              </h2>
              
              <div 
                className="overflow-hidden transition-all duration-700 max-w-sm"
                style={{
                  maxHeight: isHovered ? '200px' : '0px',
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <p className="text-gray-300 font-body text-sm md:text-base leading-relaxed border-l-2 pl-4" style={{ borderColor: type.color }}>
                  {type.desc}
                </p>
              </div>
            </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default MLTypesSlide;
