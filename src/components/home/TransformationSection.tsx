import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

// Real before/after images
import facadeBefore from "@/assets/facade-before.webp";
import facadeAfter from "@/assets/facade-after.webp";
import showroomBefore from "@/assets/showroom-before.webp";
import showroomAfter from "@/assets/showroom-after.webp";
import chaletBefore from "@/assets/chalet-before.webp";
import chaletAfter from "@/assets/chalet-after.webp";

const TransformationSection = () => {
  const { t, language, isRTL } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const projects = [
    {
      id: 1,
      beforeImg: facadeBefore,
      afterImg: facadeAfter,
    },
    {
      id: 2,
      beforeImg: showroomBefore,
      afterImg: showroomAfter,
    },
    {
      id: 3,
      beforeImg: chaletBefore,
      afterImg: chaletAfter,
    },
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="section-padding bg-background relative overflow-hidden">
       {/* Background Decor */}
       <div className="absolute left-0 top-0 -z-10 h-full w-full overflow-hidden opacity-30">
        <div className="absolute -left-[10%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="container-max">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <motion.span
            key={`badge-${language}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent"
          >
            {t("transformation.badge") || "Transformations"}
          </motion.span>
          
          <motion.h2
            key={`title-${language}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-4 text-3xl font-display font-800 leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {t("transformation.title") || "Project Transformations"}
          </motion.h2>

          <motion.p
            key={`desc-${language}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-lg text-muted-foreground"
          >
            {t("transformation.subtitle") || "Witness the difference we make."}
          </motion.p>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl" // Constrain width for single view
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: "center", // Center the single slide
              loop: true,
              direction: isRTL ? "rtl" : "ltr",
              watchDrag: false, // Disable swipe/drag to prevent conflict with slider
            }}
            className="w-full"
          >
            <CarouselContent>
              {projects.map((project, idx) => (
                <CarouselItem key={project.id} className="basis-full"> {/* Full width per slide */}
                  <div className="group relative flex flex-col gap-6 rounded-3xl border border-border bg-card p-2 shadow-sm transition-all hover:shadow-lg">
                    <BeforeAfterSlider
                      beforeImage={project.beforeImg}
                      afterImage={project.afterImg}
                      beforeLabel={t("transformation.labels.before") || "Before"}
                      afterLabel={t("transformation.labels.after") || "After"}
                    />
                    
                    <div className="px-4 pb-4 text-center md:text-start">
                      <h3 className="mb-2 text-xl font-display font-bold text-foreground">
                        {t(`transformation.items.${idx}.title`) || `Project ${idx + 1}`}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t(`transformation.items.${idx}.description`) || "Description of the transformation project."}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation Controls */}
            <div className="mt-8 flex flex-col items-center gap-6">
              {/* Arrows */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => api?.scrollPrev()}
                  className="group flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:border-accent hover:bg-accent hover:text-white active:scale-95"
                  aria-label="Previous project"
                >
                  <ChevronLeft className={cn("h-6 w-6 transition-transform", isRTL && "rotate-180")} />
                </button>
                
                <span className="text-sm font-medium text-muted-foreground">
                  {current + 1} / {count}
                </span>

                <button
                  onClick={() => api?.scrollNext()}
                  className="group flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:border-accent hover:bg-accent hover:text-white active:scale-95"
                  aria-label="Next project"
                >
                  <ChevronRight className={cn("h-6 w-6 transition-transform", isRTL && "rotate-180")} />
                </button>
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-2">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      current === index ? "w-6 bg-accent" : "w-1.5 bg-border hover:bg-accent/50"
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default TransformationSection;
