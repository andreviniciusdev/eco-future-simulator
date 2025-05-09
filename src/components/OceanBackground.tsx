
import React, { useEffect, useRef } from 'react';

const OceanBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system for plankton/microorganisms
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;

      constructor(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
        
        // Create different colors for the particles (blue/teal shades)
        const colors = ['rgba(56, 189, 248, 0.7)', 'rgba(14, 165, 233, 0.7)', 'rgba(8, 145, 178, 0.7)'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = Math.min(100, Math.floor(canvas.width * canvas.height / 10000));
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas));
    }

    // Create a gradient background
    const createGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#38bdf8'); // light blue
      gradient.addColorStop(1, '#1e3a8a'); // dark blue
      return gradient;
    };

    // Wave effect
    let waveOffset = 0;
    const drawWaves = () => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.8);
      
      for (let i = 0; i < canvas.width; i++) {
        const y = Math.sin(i * 0.01 + waveOffset) * 20 + canvas.height * 0.8;
        ctx.lineTo(i, y);
      }
      
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      
      ctx.fillStyle = 'rgba(14, 165, 233, 0.2)';
      ctx.fill();
      
      waveOffset += 0.05;
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      ctx.fillStyle = createGradient();
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw waves
      drawWaves();
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default OceanBackground;
