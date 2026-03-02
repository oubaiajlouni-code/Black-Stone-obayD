import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const TestimonialsSection = () => {
  const { t, language, isRTL } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const items = t("testimonials.items") as Array<{
    name: string;
    role: string;
    text: string;
    rating: number;
  }>;

  // Auto-rotate logic
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]); // Dependency only on items length, independent of activeIndex to prevent reset on manual change if desired, 
                      // but typically we want to reset timer on change. 
                      // To make progress bar sync perfectly with timer, it's better to just let the timer drive the index change 
                      // and let the progress bar animate based on the key change.

  const handleManualChange = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="section-padding relative overflow-hidden bg-foreground text-background">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -left-[10%] top-[20%] h-[600px] w-[600px] rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute -right-[10%] bottom-[20%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px]" />
      </div>

      <div className="container-max relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* LEFT COLUMN: The Display */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <motion.div
              key={`header-${language}`} // Re-animate header on language change
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent">
                {t("testimonials.badge") || "Testimonials"}
              </span>
              <h2 className="text-3xl font-display font-800 leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                {t("testimonials.sectionTitle")}
              </h2>
            </motion.div>

            <div className="relative min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  // Key includes language to force re-render on switch
                  key={`${activeIndex}-${language}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <Quote className="mb-6 h-12 w-12 text-accent opacity-50" />
                  
                  <div className="mb-6 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-5 w-5",
                          i < items[activeIndex].rating
                            ? "fill-accent text-accent"
                            : "fill-accent/20 text-accent/20"
                        )}
                      />
                    ))}
                  </div>

                  <p className="font-display text-2xl font-medium leading-relaxed md:text-3xl lg:text-4xl lg:leading-tight">
                    "{items[activeIndex].text}"
                  </p>
                  
                  <div className="mt-8 flex items-center gap-4 lg:hidden">
                     {/* Mobile Only Author Info */}
                     <div className="h-12 w-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-xl">
                        {items[activeIndex].name.charAt(0)}
                     </div>
                     <div>
                       <div className="font-bold text-lg">{items[activeIndex].name}</div>
                       <div className="text-sm text-white/60">{items[activeIndex].role}</div>
                     </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT COLUMN: The Interactive List */}
          <div className="hidden flex-col justify-center gap-4 lg:col-span-5 lg:flex">
            {items.map((item, idx) => (
              <button
                key={`${idx}-${language}`} // Key by language for smooth transition
                onClick={() => handleManualChange(idx)}
                className={cn(
                  "group relative flex items-center gap-4 rounded-xl p-4 text-start transition-all duration-300 hover:bg-white/5",
                  activeIndex === idx ? "bg-white/10" : "opacity-60 hover:opacity-100"
                )}
              >
                {/* Progress Bar Background (Active Only) */}
                {activeIndex === idx && (
                  <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/10 overflow-hidden rounded-b-xl">
                     <motion.div
                        className="h-full bg-accent"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5, ease: "linear" }}
                      />
                  </div>
                )}

                <motion.div 
                  initial={{ opacity: 0, x: isRTL ? -10 : 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className={cn(
                  "flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-xl font-bold transition-all duration-300",
                  activeIndex === idx 
                    ? "bg-accent text-accent-foreground scale-110 shadow-lg shadow-accent/20" 
                    : "bg-white/10 text-white group-hover:bg-white/20"
                )}>
                  {item.name.charAt(0)}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: isRTL ? -10 : 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 + 0.1 }}
                >
                  <div className={cn(
                    "font-display font-bold transition-colors",
                    activeIndex === idx ? "text-white text-lg" : "text-white/80"
                  )}>
                    {item.name}
                  </div>
                  <div className="text-sm text-white/50 group-hover:text-white/70">
                    {item.role}
                  </div>
                </motion.div>
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
