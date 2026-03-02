import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { MapPin, Building2, CheckCircle2 } from "lucide-react";
import CTASection from "@/components/home/CTASection";
import turkeyBg from "@/assets/location-turkey.webp";
import syriaBg from "@/assets/location-syria.webp";
import locationsHeroBg from "@/assets/locations-hero.webp";

const Locations = () => {
  const { t, isRTL, language } = useLanguage();

  const locations = [
    {
      id: "turkey",
      titleKey: "turkey.title",
      subtitleKey: "turkey.subtitle",
      descKey: "turkey.content",
      highlightsKey: "turkey.highlights",
      image: turkeyBg,
    },
    {
      id: "syria",
      titleKey: "syria.title",
      subtitleKey: "syria.subtitle",
      descKey: "syria.content",
      highlightsKey: "syria.highlights",
      image: syriaBg,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden pb-16 pt-32">
        <div className="absolute inset-0">
          <img src={locationsHeroBg} alt="Locations Hero" className="h-full w-full object-cover" loading="eager" />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-col items-start ${isRTL ? "text-right" : "text-left"}`}>
            <motion.span
              key={`badge-${language}`}
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-dark mb-4 inline-block rounded-full px-4 py-2 text-xs font-medium uppercase tracking-widest text-primary-foreground/90"
            >
              {t("nav.locations")}
            </motion.span>
            <motion.h1
              key={`title-${language}`}
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-4xl font-display font-800 tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl"
            >
              {t("nav.locations")}
            </motion.h1>
            <motion.p
              key={`desc-${language}`}
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-4 max-w-2xl text-lg text-primary-foreground/80 sm:text-xl"
            >
              {t("nav.locationsSubtitle")}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Locations List */}
      <div className="container-max py-20 lg:py-32 space-y-32 px-4 sm:px-6 lg:px-8">
        {locations.map((loc, idx) => {
          const isEven = idx % 2 === 0;
          const highlights = t(loc.highlightsKey) as string[];

          return (
            <motion.div
              key={`${loc.id}-${language}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center`}
            >
              {/* Content Side */}
              <div className={`flex-1 ${
                isRTL 
                  ? (isEven ? "lg:order-1" : "lg:order-2") 
                  : (isEven ? "lg:order-1" : "lg:order-2")
              }`}>
                <div className="flex items-center gap-2 text-accent mb-4">
                  <MapPin className="h-6 w-6" />
                  <span className="text-sm font-bold uppercase tracking-widest">
                    {t(loc.id === "turkey" ? "turkey.badge" : "syria.badge")}
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  {t(loc.titleKey)}
                </h2>
                <p className="text-xl text-muted-foreground mb-6 font-medium">
                  {t(loc.subtitleKey)}
                </p>
                <p className="text-lg text-muted-foreground/80 leading-relaxed mb-8">
                  {t(loc.descKey)}
                </p>

                <div className="grid gap-4">
                  {Array.isArray(highlights) && highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Side */}
              <div className={`flex-1 relative ${
                isRTL 
                  ? (isEven ? "lg:order-2" : "lg:order-1") 
                  : (isEven ? "lg:order-2" : "lg:order-1")
              }`}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group">
                  <div className="absolute inset-0 bg-accent/10 mix-blend-overlay group-hover:bg-transparent transition-all duration-500" />
                  <img 
                    src={loc.image} 
                    alt={t(`nav.${loc.id}`)}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Decorative Box */}
                <div className={`absolute -bottom-8 -z-10 w-full h-full border-2 border-accent/20 rounded-3xl ${
                  isRTL 
                    ? (isEven ? "-right-8" : "-left-8")
                    : (isEven ? "-right-8" : "-left-8")
                }`} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <CTASection />
    </div>
  );
};

export default Locations;
