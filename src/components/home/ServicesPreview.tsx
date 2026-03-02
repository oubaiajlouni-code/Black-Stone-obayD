import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

// Placeholder image imports - These should be replaced with the actual .webp images in src/assets/
import serviceSales from "@/assets/service-sales.webp";
import serviceRentals from "@/assets/service-rentals.webp";
import serviceFitout from "@/assets/service-fitout.webp";
import serviceTurnkey from "@/assets/service-turnkey.webp";
import serviceConsulting from "@/assets/service-consulting.webp";

// Fallback to existing images if new ones aren't present yet (for development continuity)
// In production, ensure the new .webp files exist in src/assets/
/*
import heroBg from "@/assets/hero-bg.webp";
import aboutBg from "@/assets/about-bg.webp";
import aboutBg1 from "@/assets/about-bg1.webp";
import istanbulSkyline from "@/assets/istanbul-skyline.jpg";
import damascus from "@/assets/damascus.jpg";
*/

const getServiceImage = (key: string) => {
  switch(key) {
    case "sales": return serviceSales;
    case "rentals": return serviceRentals;
    case "fitout": return serviceFitout;
    case "turnkey": return serviceTurnkey;
    case "consulting": return serviceConsulting;
    default: return serviceSales;
  }
};

const services = [
  { key: "sales", colSpan: "lg:col-span-2" }, 
  { key: "rentals", colSpan: "lg:col-span-1" },
  { key: "fitout", colSpan: "lg:col-span-1" },
  { key: "turnkey", colSpan: "lg:col-span-2" }, 
  { key: "consulting", colSpan: "lg:col-span-3", objectPosition: "50% 25%" }, 
];

const ServicesPreview = () => {
  const { t, isRTL, language } = useLanguage();

  return (
    <section className="section-padding bg-background relative overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container-max">
        
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <motion.span
              key={`subtitle-${language}`}
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
              </span>
              {t("services.subtitle")}
            </motion.span>
            
            <motion.h2
              key={`title-${language}`}
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4 text-4xl font-display font-800 leading-tight tracking-tight text-foreground lg:text-5xl"
            >
              {t("services.sectionTitle")}
            </motion.h2>

            <motion.p
              key={`desc-${language}`}
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              {t("services.sectionDescription")}
            </motion.p>
          </div>

          <motion.div
            key={`btn-${language}`}
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 text-sm font-bold text-foreground transition-colors hover:text-accent"
            >
              <span>{t("services.learnMore")}</span>
              <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${isRTL ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
            </Link>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <motion.div
              key={`${service.key}-${language}`}
              initial={{ opacity: 0, y: 20, x: isRTL ? -20 : 20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl ${service.colSpan} min-h-[300px]`}
            >
              <Link to={`/services/${service.key}`} className="block h-full w-full">
                {/* Background Image */}
                <div className="absolute inset-0 h-full w-full">
                  <img
                    src={getServiceImage(service.key)}
                    alt={t(`services.${service.key}.title`)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-110"
                    style={{ objectPosition: service.objectPosition || "center" }}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/95" />
                </div>

                {/* Content */}
                <div className="relative flex h-full flex-col justify-end p-8">
                  <div className="translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                    <div className="mb-3 flex items-center justify-between">
                      <motion.h3
                        key={`service-title-${service.key}-${language}`}
                        initial={{ opacity: 0, x: isRTL ? -10 : 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-2xl font-display font-bold text-white"
                      >
                        {t(`services.${service.key}.title`)}
                      </motion.h3>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                        <ArrowUpRight className={`h-5 w-5 ${isRTL ? "-scale-x-100" : ""}`} />
                      </div>
                    </div>
                    
                    <p className="line-clamp-2 text-sm leading-relaxed text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {t(`services.${service.key}.description`)}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
