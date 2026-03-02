import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Users2, Globe, Briefcase } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import aboutImg from "@/assets/about-bg.webp";
import aboutImg2 from "@/assets/about-bg1.webp"; 

const AboutPreview = () => {
  const { t, language, isRTL } = useLanguage();

  const metrics = [
    { label: t("about investment"), value: "$500M+", icon: Briefcase },
    { label: t("about team"), value: "45+", icon: Users2 },
    { label: t("about cities"), value: "8", icon: Globe },
  ];

  // Component for Text Column
  const TextContent = () => (
    <div className="flex flex-col">
      <motion.span
        initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent w-fit"
      >
        {t("about.badge")}
      </motion.span>
      
      <motion.h2
        initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mb-6 text-3xl font-display font-800 leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
      >
        {t("about.title")}
        <span className="block text-accent">{t("about.subtitle")}</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mb-8 text-lg text-muted-foreground leading-relaxed"
      >
        {t("about.story")}
      </motion.p>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-4 mb-10 border-y border-border/50 py-6">
        {metrics.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            className="text-center"
          >
            <div className="flex justify-center mb-2">
              <item.icon className="h-6 w-6 text-accent/80" />
            </div>
            <div className="text-2xl font-bold text-foreground font-display">{item.value}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">{item.label}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <Link to="/about" className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-bold text-background transition-all hover:bg-accent hover:text-accent-foreground shadow-lg hover:shadow-accent/25">
          {t("about.readMore")}
          <ArrowRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
        </Link>
      </motion.div>
    </div>
  );

  // Component for Image Column
  const ImageContent = () => (
    <div className="relative">
      {/* Main Image */}
      <motion.div
        initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-square"
      >
        <img 
          src={aboutImg} 
          alt="Black Stone Group Office" 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </motion.div>

      {/* Floating Secondary Image */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className={`absolute -bottom-12 ${isRTL ? "-right-12" : "-left-12"} z-20 w-1/2 rounded-2xl overflow-hidden shadow-xl border-4 border-background hidden md:block`}
      >
        <img 
          src={aboutImg2} 
          alt="Meeting" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Decor Elements - Position flips with language */}
      <div className={`absolute -top-12 ${isRTL ? "-left-12" : "-right-12"} -z-10 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[80px]`} />
      <div className={`absolute -bottom-12 ${isRTL ? "-right-12" : "-left-12"} -z-10 h-[200px] w-[200px] rounded-full bg-primary/10 blur-[60px]`} />
    </div>
  );

  return (
    <section className="section-padding relative overflow-hidden bg-background">
      <div className="container-max">
          {/* Key on the container forces a full re-render when language changes, 
              simultaneously updating content and triggering animations without delay */}
          <motion.div 
            key={language} 
            className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center"
          >
            {isRTL ? (
              <>
                <ImageContent />
                <TextContent />
              </>
            ) : (
              <>
                <TextContent />
                <ImageContent />
              </>
            )}
          </motion.div>
      </div>
    </section>
  );
};

export default AboutPreview;
