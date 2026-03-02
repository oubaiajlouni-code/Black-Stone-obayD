import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, Home, Paintbrush, KeyRound, TrendingUp, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import CTASection from "@/components/home/CTASection";

import heroBg from "@/assets/services-hero.webp";

const allServices = [
  { key: "sales", icon: Building2 },
  { key: "rentals", icon: Home },
  { key: "fitout", icon: Paintbrush },
  { key: "turnkey", icon: KeyRound },
  { key: "consulting", icon: TrendingUp },
];

const Services = () => {
  const { t, isRTL, language } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden pb-16 pt-32">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Services Hero" className="h-full w-full object-cover" loading="eager" />
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
              {t("services.sectionTitle")}
            </motion.span>
            <motion.h1
              key={`title-${language}`}
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-4xl font-display font-800 tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl"
            >
              {t("services.sectionSubtitle")}
            </motion.h1>
            <motion.p
              key={`desc-${language}`}
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-4 max-w-2xl text-lg text-primary-foreground/80 sm:text-xl"
            >
              {t("services.sectionDescription")}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background pb-32">
        <div className="container-max">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allServices.map((service, idx) => {
              const Icon = service.icon;
              const title = t(`services.${service.key}.title`);
              const description = t(`services.${service.key}.description`);

              return (
                <motion.div
                  key={`${service.key}-${language}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link 
                    to={`/services/${service.key}`}
                    className="group block h-full rounded-3xl border border-border bg-card p-8 transition-all duration-300 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5"
                  >
                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <Icon className="h-8 w-8" />
                    </div>
                    
                    <h3 className="mb-3 text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {title}
                    </h3>
                    
                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {description}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all">
                      <span>{t("services.learnMore")}</span>
                      <ArrowRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default Services;
