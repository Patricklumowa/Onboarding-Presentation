import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Array of ML tools mentioned in the PDF and general ecosystem
const toolSets = [
  ["PYENV", "PYTHON 3.10", "POETRY", "JUPYTER"],
  ["TENSORFLOW", "PYTORCH", "SCIKIT-LEARN", "KERAS"],
  ["DOCKER", "KUBERNETES", "MLFLOW", "APACHE AIRFLOW"],
  ["NUMPY", "PANDAS", "CUDA 11.8", "PYTEST"]
];

const ToolsSlide = () => {
  const containerRef = useRef(null);

  const mainTools = [
    { name: "NumPy", color: "#4d77cf", desc: "Scientific Computing", orbit: 150, angle: 30, speed: 30 },
    { name: "Pandas", color: "#e70488", desc: "Data Analysis", orbit: 150, angle: 210, speed: 30 },
    { name: "Scikit-Learn", color: "#f7931e", desc: "ML Models", orbit: 250, angle: 0, speed: -45 },
    { name: "TensorFlow", color: "#ff6f00", desc: "Deep Learning", orbit: 250, angle: 120, speed: -45 },
    { name: "PyTorch", color: "#ee4c2c", desc: "Dynamic Tensors", orbit: 250, angle: 240, speed: -45 },
    { name: "Hugging Face", color: "#ffd21e", desc: "Transformers & NLP", orbit: 350, angle: 90, speed: 60 },
    { name: "Google Colab", color: "#f9ab00", desc: "Cloud Notebooks", orbit: 350, angle: 270, speed: 60 }
  ];

  // Helper func to trace the actual logos
  const renderToolIcon = (name, color) => {
    switch(name) {
      case "NumPy":
        return (
          <>
            <rect x="25" y="25" width="22" height="22" fill={color} opacity="0.9"/>
            <rect x="53" y="25" width="22" height="22" fill={color} />
            <rect x="25" y="53" width="22" height="22" fill={color} opacity="0.6"/>
            <rect x="53" y="53" width="22" height="22" fill={color} opacity="0.4"/>
          </>
        );
      case "Pandas":
        return (
          <>
            <rect x="20" y="30" width="16" height="50" rx="6" fill="#130654" />
            <rect x="42" y="45" width="16" height="35" rx="6" fill="#ffca00" />
            <rect x="64" y="20" width="16" height="60" rx="6" fill="#e70488" />
          </>
        );
      case "Scikit-Learn":
        return (
          <>
            <path d="M 25 50 Q 50 15 75 50" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" />
            <path d="M 25 65 Q 50 100 75 65" fill="none" stroke="#32b1db" strokeWidth="8" strokeLinecap="round" />
            <circle cx="25" cy="58" r="10" fill="#f7931e" />
            <circle cx="75" cy="58" r="10" fill="#32b1db" />
          </>
        );
      case "TensorFlow":
        return (
          <>
            <path d="M 25 35 L 50 20 L 75 35 L 75 65 L 50 80 L 25 65 Z" fill="none" stroke={color} strokeWidth="8" />
            <path d="M 25 35 L 50 50 L 75 35 M 50 50 L 50 80" stroke={color} strokeWidth="8" />
          </>
        );
      case "PyTorch":
        return (
          <>
            <path d="M 50 85 Q 20 60 50 20 Q 80 60 50 85 Z" fill="none" stroke={color} strokeWidth="10" />
            <circle cx="50" cy="62" r="12" fill={color} />
          </>
        );
      case "Hugging Face":
        return (
          <>
            <circle cx="50" cy="50" r="35" fill={color} />
            <circle cx="35" cy="40" r="6" fill="#000" />
            <circle cx="65" cy="40" r="6" fill="#000" />
            <path d="M 35 65 Q 50 75 65 65" fill="none" stroke="#000" strokeWidth="6" strokeLinecap="round" />
            <path d="M 15 50 Q 25 30 35 40" fill="none" stroke="#000" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
            <path d="M 85 50 Q 75 30 65 40" fill="none" stroke="#000" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
          </>
        );
      case "Google Colab":
        return (
          <>
            <path d="M 35 70 C 15 50 15 30 35 25 C 55 20 60 40 50 50" fill="none" stroke="#f9ab00" strokeWidth="12" strokeLinecap="round" />
            <path d="M 65 30 C 85 50 85 70 65 75 C 45 80 40 60 50 50" fill="none" stroke="#ffa800" strokeWidth="12" strokeLinecap="round" opacity="0.9" />
          </>
        );
      default:
        return <circle cx="50" cy="50" r="20" fill={color} />;
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Marquee animation
      const rows = gsap.utils.toArray('.marquee-row');
      
      rows.forEach((row, i) => {
        const direction = i % 2 === 0 ? -1 : 1;
        
        gsap.to(row, {
          xPercent: direction * -50,
          ease: "none",
          duration: 30 + (i * 5),
          repeat: -1
        });
      });

      // Entrance animation for header
      gsap.from(".tools-header", {
        opacity: 0,
        y: 50,
        duration: 1
      });

      // Smart Orbital Animation System
      mainTools.forEach((tool, i) => {
        // 1. Initial Setup
        gsap.set(`.orbit-wrapper-${i}`, { rotation: tool.angle });
        gsap.set(`.tool-node-${i}`, { x: tool.orbit, rotation: -tool.angle, xPercent: -50, yPercent: -50 }); 
        
        // Entrance slide out from core
        gsap.from(`.tool-node-${i}`, {
             x: 0, scale: 0, opacity: 0, 
             duration: 1.5, ease: "elastic.out(1, 0.6)", delay: 0.5 + i * 0.15
        });
        
        // Ray stretching out
        gsap.from(`.tool-ray-${i}`, {
             width: 0,
             duration: 1.5, ease: "elastic.out(1, 0.6)", delay: 0.5 + i * 0.15
        });

        // 2. Orbital Revolution
        const direction = tool.speed > 0 ? 1 : -1;
        const duration = Math.abs(tool.speed);

        gsap.to(`.orbit-wrapper-${i}`, {
            rotation: `+=${360 * direction}`,
            duration: duration,
            repeat: -1,
            ease: "none",
            delay: 1.5 // Let entrance finish smoothly
        });

        // 3. Counter-Rotation to keep UI upright globally
        gsap.to(`.tool-node-${i}`, {
            rotation: `-=${360 * direction}`,
            duration: duration,
            repeat: -1,
            ease: "none",
            delay: 1.5
        });

        // 4. Subtle hover floating
        gsap.to(`.tool-node-${i}`, {
            y: "+=15",
            duration: "random(2, 4)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
      });

      // Orbital Rings animation
      gsap.to('.orbit-ring', {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center"
      });
      gsap.to('.orbit-ring-reverse', {
        rotation: -360,
        duration: 50,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center"
      });

      // Central core pulse
      gsap.to('.core-pulse', {
        scale: 1.2,
        opacity: 0.4,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="slide-section bg-[#111] overflow-hidden relative flex flex-col justify-center py-24 select-none border-t border-surface/50">
      <div className="absolute inset-0 bg-gradient-to-b from-[#111] via-transparent to-[#111] z-10 pointer-events-none"></div>

      <div className="absolute top-10 left-10 md:left-20 z-30 tools-header pointer-events-none">
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-display font-bold text-white uppercase">
          Ecosystem <br />
          <span className="text-accent-secondary">& Stack</span>
        </h2>
        <p className="mt-4 text-gray-300 font-body max-w-md bg-dark-base/50 p-2 rounded backdrop-blur-sm border border-surface">
          Lebih dari sekadar library; ini adalah amunisi utama arsitektur AI kita—dari riset (Colab, HF) hingga optimasi tensor.
        </p>
      </div>

      <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen flex flex-col gap-4 md:gap-8 transform -rotate-3 scale-110 pointer-events-none">
        {toolSets.map((set, i) => (
          <div key={i} className="marquee-row flex whitespace-nowrap gap-12 lg:gap-24 w-[200vw]" style={{ marginLeft: i % 2 === 0 ? '0' : '-50vw' }}>
            {/* Double the set to create seamless loop effect */}
            {[...set, ...set, ...set, ...set].map((tool, j) => (
              <span 
                key={j} 
                className={`text-5xl md:text-8xl lg:text-[10vw] font-display font-black uppercase ${
                  j % 3 === 0 ? 'text-transparent stroke-text' : 
                  j % 5 === 0 ? 'text-accent-primary' : 
                  j % 7 === 0 ? 'text-accent-secondary' : 'text-[#333]'
                }`}
                style={j % 3 === 0 ? { WebkitTextStroke: '2px #555' } : {}}
              >
                {tool}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Advanced Animated Ecosystem Constellation */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none md:ml-[15%]">
        
        {/* Core & Rings */}
        <div className="relative w-0 h-0 flex items-center justify-center">
          <svg className="absolute w-[800px] h-[800px] overflow-visible" viewBox="-400 -400 800 800">
            <circle cx="0" cy="0" r="350" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 16" className="orbit-ring" opacity="0.1" />
            <circle cx="0" cy="0" r="250" fill="none" stroke="#ccff00" strokeWidth="1" strokeDasharray="10 30" className="orbit-ring-reverse" opacity="0.2" />
            <circle cx="0" cy="0" r="150" fill="none" stroke="#ff0055" strokeWidth="2" strokeDasharray="50 50" className="orbit-ring" opacity="0.3" />
            
            {/* Core Element */}
            <circle cx="0" cy="0" r="40" fill="#111" stroke="#fff" strokeWidth="3" />
            <circle cx="0" cy="0" r="50" fill="none" stroke="#00e5ff" strokeWidth="2" className="core-pulse" />
            <text x="0" y="5" fill="white" fontSize="16" fontFamily="Space Grotesk" fontWeight="bold" textAnchor="middle" letterSpacing="2">CORE</text>
          </svg>

          {/* Smart Orbital Nodes */}
          {mainTools.map((tool, i) => (
            <div 
              key={i}
              className={`orbit-wrapper-${i} absolute flex items-center justify-center`}
              style={{ width: 0, height: 0, transformOrigin: 'center center' }}
            >
              {/* Connecting Ray (orbits locked to the wrapper, originating from core) */}
              <div 
                className={`tool-ray-${i} absolute top-0 left-0 h-[1px] origin-left border-t border-dashed pointer-events-none`}
                style={{ 
                  width: `${tool.orbit}px`, 
                  borderColor: tool.color, 
                  opacity: 0.4
                }}
              />

              <div 
                className={`tool-node-${i} absolute flex flex-col items-center justify-center`}
              >
                {/* Outer Hexagon / Circle Wrapper */}
                <div 
                  className="relative w-20 h-20 flex items-center justify-center rounded-xl bg-[#0a0a0c] border-2 shadow-xl backdrop-blur-md mb-3"
                  style={{ borderColor: tool.color, boxShadow: `0 0 20px ${tool.color}40` }}
                >
                {/* Simulated Tool Icon using colored geometries */}
                <svg className="w-12 h-12" viewBox="0 0 100 100">
                  {renderToolIcon(tool.name, tool.color)}
                </svg>
              </div>
              
              {/* Tool Label */}
              <div className="bg-dark-base/80 border border-surface w-36 px-2 py-2 rounded shadow-lg flex flex-col items-center text-center">
                <span className="font-display font-bold text-lg leading-tight tracking-wider" style={{ color: tool.color }}>{tool.name}</span>
                <span className="font-body text-xs text-gray-300 mt-1 leading-snug">{tool.desc}</span>
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default ToolsSlide;
