import { useState, useRef, useEffect } from 'react'; 

interface BeforeAfterSliderProps { 
  beforeImage: string; 
  afterImage: string; 
  beforeLabel?: string; 
  afterLabel?: string; 
} 

const BeforeAfterSlider = ({ 
  beforeImage, 
  afterImage, 
  beforeLabel = 'Before', 
  afterLabel = 'After', 
}: BeforeAfterSliderProps) => { 
  const [sliderPosition, setSliderPosition] = useState(50); 
  const [isDragging, setIsDragging] = useState(false); 
  const containerRef = useRef<HTMLDivElement>(null); 

  // Initial animation
  useEffect(() => {
    // Animate from 0 to 50 on mount
    const timer = setTimeout(() => {
      let start = 0;
      const end = 50;
      const duration = 1000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic
        const ease = 1 - Math.pow(1 - progress, 3);
        
        const currentVal = start + (end - start) * ease;
        setSliderPosition(currentVal);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, 500); // Small delay before starting

    return () => clearTimeout(timer);
  }, []);

  const handleMove = (clientX: number) => { 
    if (!containerRef.current) return; 
    const rect = containerRef.current.getBoundingClientRect(); 
    const x = clientX - rect.left; 
    const percentage = (x / rect.width) * 100; 
    setSliderPosition(Math.max(0, Math.min(100, percentage))); 
  }; 

  const handlePointerMove = (e: PointerEvent) => { 
    if (!isDragging) return; 
    e.preventDefault(); // Prevent default touch actions like scrolling
    handleMove(e.clientX); 
  }; 

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  useEffect(() => { 
    if (isDragging) { 
      window.addEventListener('pointermove', handlePointerMove); 
      window.addEventListener('pointerup', handlePointerUp); 
      window.addEventListener('pointercancel', handlePointerUp);
    } 

    return () => { 
      window.removeEventListener('pointermove', handlePointerMove); 
      window.removeEventListener('pointerup', handlePointerUp); 
      window.removeEventListener('pointercancel', handlePointerUp);
    }; 
  }, [isDragging]); 

  return ( 
    <div 
      ref={containerRef} 
      className="relative aspect-video overflow-hidden cursor-ew-resize select-none rounded-3xl touch-none group/slider" 
      onPointerDown={(e) => {
        e.stopPropagation(); // Critical: Stop event from bubbling to Carousel
        e.nativeEvent.stopImmediatePropagation(); // Stop native event bubbling for Embla/Touch listeners
        e.preventDefault();  // Prevent default browser behavior
        setIsDragging(true);
        // Optional: Capture pointer to ensure we get move events even if mouse leaves
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      }}
    > 
      <img src={afterImage} alt={afterLabel} className="absolute inset-0 w-full h-full object-cover pointer-events-none" loading="lazy" draggable={false} /> 

      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}> 
        <img src={beforeImage} alt={beforeLabel} className="absolute inset-0 w-full h-full object-cover" loading="lazy" draggable={false} /> 
      </div> 

      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg transition-opacity pointer-events-none" 
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }} 
      > 
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center transition-transform group-hover/slider:scale-110"> 
          <div className="flex gap-1"> 
            <div className="w-0.5 h-4 bg-foreground rounded-full" /> 
            <div className="w-0.5 h-4 bg-foreground rounded-full" /> 
          </div> 
        </div> 
      </div> 

      <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-black/50 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider pointer-events-none"> 
        {beforeLabel} 
      </div> 
      <div className="absolute top-4 right-4 px-3 py-1 rounded-md bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider pointer-events-none"> 
        {afterLabel} 
      </div> 
    </div> 
  ); 
}

export default BeforeAfterSlider;
