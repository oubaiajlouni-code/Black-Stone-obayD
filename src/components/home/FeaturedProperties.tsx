import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Bed, Bath, Maximize, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";

// Real property images
import damascusVilla from "@/assets/damascus-villa.webp";
import istanbulResidence from "@/assets/istanbul-residence.webp";
import istanbulOffice from "@/assets/istanbul-office.webp";
import aleppoHouse from "@/assets/aleppo-house.webp";
import latakiaRestaurant from "@/assets/latakia-restaurant.webp";
import antalyaHotel from "@/assets/antalya-hotel-renovation.webp";

const FeaturedProperties = () => {
  const { t, language, isRTL } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">("auto");

  const items = t("featured.items") as Array<{
    id: number;
    title: string;
    description?: string;
    location: string;
    type: "sale" | "rent" | "fitout" | "consulting";
    price: string;
    specs: {
      beds: number;
      baths: number;
      area: string;
    };
  }>;

  const images = [
    damascusVilla,
    istanbulResidence,
    istanbulOffice,
    aleppoHouse,
    latakiaRestaurant,
    antalyaHotel
  ];

  // Helper to format SYP price
  const getSypPrice = (priceStr: string) => {
    const numericPart = priceStr.replace(/[^0-9]/g, ""); 
    const val = parseInt(numericPart, 10);
    if (isNaN(val)) return null;
    const sypVal = val * 116;
    return sypVal.toLocaleString("en-US");
  };

  // Determine displayed items based on expansion state
  const displayedItems = expanded ? items : items.slice(0, 3);

  // Animation variants for container (stagger children)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  // Animation variants for item
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20
      }
    }
  };

  // Update height for smooth transition
  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setHeight(entry.contentRect.height);
        }
      });
      resizeObserver.observe(containerRef.current);
      return () => resizeObserver.disconnect();
    }
  }, [expanded, displayedItems]);

  return (
    <section className="section-padding bg-background relative overflow-hidden">
       {/* Background Decor */}
        <div className="absolute right-0 top-0 -z-10 h-full w-full overflow-hidden opacity-30">
        <div className="absolute right-[10%] top-[10%] h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]" />
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
            {t("featured.badge")}
          </motion.span>
          
          <motion.h2
            key={`title-${language}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-4 text-3xl font-display font-800 leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {t("featured.title")}
          </motion.h2>

          <motion.p
            key={`desc-${language}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-lg text-muted-foreground"
          >
            {t("featured.subtitle")}
          </motion.p>
        </div>

        {/* Grid Container with smooth height animation */}
        <motion.div 
          animate={{ height: height }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <motion.div 
            ref={containerRef} 
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 pb-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {displayedItems.map((item, idx) => {
              const sypPrice = getSypPrice(item.price);
              
              return (
                <motion.div
                  key={`${item.id}`} // Stable key for items to prevent re-mounting unnecessarily during expand
                  layout
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={itemVariants} // Use variants for stagger effect
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={images[idx % images.length]}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Type Badge */}
                    <div className="absolute top-4 left-4 rtl:right-4 rtl:left-auto">
                       <span className={`inline-block rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-md 
                          ${item.type === 'sale' ? 'bg-accent/90 text-white' : 
                            item.type === 'rent' ? 'bg-primary/90 text-white' : 
                            'bg-white text-black'}`}>
                          {t(`featured.labels.${item.type}`)}
                       </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4">
                      <div className="flex flex-col gap-2">
                         <h3 className="line-clamp-2 text-xl font-display font-bold text-foreground group-hover:text-accent transition-colors">
                            {item.title}
                         </h3>
                         {item.description && (
                           <p className="line-clamp-2 text-sm text-muted-foreground/80 leading-relaxed">
                             {item.description}
                           </p>
                         )}
                      </div>
                      <div className="mt-3 flex items-center gap-1 text-sm text-muted-foreground font-medium">
                        <MapPin className="h-4 w-4 text-accent" />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    {/* Specs */}
                    <div className="mb-6 grid grid-cols-3 gap-2 border-y border-border/50 py-4">
                       {/* Beds */}
                       <div className="flex flex-col items-center justify-center gap-1 text-center">
                          <Bed className="h-5 w-5 text-muted-foreground/70" />
                          <span className="text-sm font-semibold text-foreground">{item.specs.beds > 0 ? item.specs.beds : '-'}</span>
                       </div>
                       {/* Baths */}
                       <div className="flex flex-col items-center justify-center gap-1 text-center border-x border-border/50 px-2">
                          <Bath className="h-5 w-5 text-muted-foreground/70" />
                          <span className="text-sm font-semibold text-foreground">{item.specs.baths > 0 ? item.specs.baths : '-'}</span>
                       </div>
                       {/* Area */}
                       <div className="flex flex-col items-center justify-center gap-1 text-center">
                          <Maximize className="h-4 w-4 text-muted-foreground/70" />
                          <span className="text-sm font-semibold text-foreground">{item.specs.area}</span>
                       </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto flex items-center justify-between gap-4">
                       <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">Price</span>
                          <span className="text-lg font-bold text-accent">{item.price}</span>
                          {sypPrice && (
                            <span className="text-xs font-medium text-muted-foreground/80 mt-0.5">
                              {sypPrice} SYP
                            </span>
                        )}
                      </div>
                        
                        <Link 
                        to={`/property/${item.id}`} 
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:rotate-[-45deg] rtl:group-hover:rotate-[45deg]">
                          <ArrowRight className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
                        </Link>
                    </div>
                  </div>
                </motion.div>
              )})}
          </motion.div>
        </motion.div>

        {/* View All / See More Button */}
        <div className="mt-8 text-center">
           <button 
             onClick={() => setExpanded(!expanded)}
             className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-8 py-3 text-sm font-semibold text-foreground transition-all hover:border-accent hover:bg-accent hover:text-accent-foreground"
           >
              {expanded ? t("featured.viewLess") : t("featured.viewMore")}
              {expanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
           </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
