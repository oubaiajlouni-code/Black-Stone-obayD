import { useEffect, useRef } from "react";
import { useMotionValue, animate, useInView } from "framer-motion";

interface CountUpProps {
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const CountUp = ({ end, duration = 2.5, delay = 0, prefix = "", suffix = "", className = "" }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(0); // Reset to 0 when starting
      const controls = animate(motionValue, end, {
        duration: duration,
        delay: delay,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, end, duration, delay, motionValue]);

  useEffect(() => {
    const unsubscribe = motionValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`;
      }
    });
    return unsubscribe;
  }, [motionValue, prefix, suffix]);

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
};

export default CountUp;
