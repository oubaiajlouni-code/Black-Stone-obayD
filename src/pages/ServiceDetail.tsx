import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { 
  Building2, Home, Paintbrush, KeyRound, TrendingUp, 
  CheckCircle2, FileSignature, Headphones, Wrench, PenTool, Layers, HardHat, 
  ShieldCheck, Maximize, Clock, Wallet, Shield, BarChart, Calculator, Target, Percent,
  Briefcase, Scale, Globe, BadgeCheck
} from "lucide-react";
import CTASection from "@/components/home/CTASection";
import ProjectGallery from "@/components/services/ProjectGallery";

// Image Imports
import salesBg from "@/assets/istanbul-residence.webp";
import rentalsBg from "@/assets/damascus-villa.webp";
import fitoutBg from "@/assets/showroom-after.webp";
import turnkeyBg from "@/assets/chalet-after.webp";
import consultingBg from "@/assets/istanbul-office.webp";

// Icon Mapping for Features
const featureIcons: Record<string, any> = {
  portfolio: Briefcase,
  investment: TrendingUp,
  legal: Scale,
  citizenship: Globe,
  selection: CheckCircle2,
  contracts: FileSignature,
  support: Headphones,
  maintenance: Wrench,
  design: PenTool,
  materials: Layers,
  execution: HardHat,
  quality: ShieldCheck,
  comprehensive: Maximize,
  timeline: Clock,
  budget: Wallet,
  guarantee: Shield,
  analysis: BarChart,
  valuation: Calculator,
  strategy: Target,
  roi: Percent,
};

// Mapping service IDs to images, icons and extra content keys
const serviceMap: Record<string, any> = {
  sales: { 
    icon: Building2, 
    image: salesBg,
    features: ["portfolio", "investment", "legal", "citizenship"],
    process: ["consultation", "viewing", "negotiation", "handover"]
  },
  rentals: { 
    icon: Home, 
    image: rentalsBg,
    features: ["selection", "contracts", "support", "maintenance"],
    process: ["requirements", "matching", "agreement", "movein"]
  },
  fitout: { 
    icon: Paintbrush, 
    image: fitoutBg,
    features: ["design", "materials", "execution", "quality"],
    process: ["concept", "planning", "construction", "delivery"]
  },
  turnkey: { 
    icon: KeyRound, 
    image: turnkeyBg,
    features: ["comprehensive", "timeline", "budget", "guarantee"],
    process: ["land", "design", "permits", "construction"]
  },
  consulting: { 
    icon: TrendingUp, 
    image: consultingBg,
    features: ["analysis", "valuation", "strategy", "roi"],
    process: ["audit", "market_research", "proposal", "execution"]
  },
};

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const { t, language, isRTL } = useLanguage();

  if (!serviceId || !serviceMap[serviceId]) {
    return <Navigate to="/services" replace />;
  }

  const service = serviceMap[serviceId];
  const Icon = service.icon;
  const title = t(`services.${serviceId}.title`);
  const description = t(`services.${serviceId}.description`);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden pb-16 pt-32">
        <div className="absolute inset-0">
          <img src={service.image} alt={title} className="h-full w-full object-cover" loading="eager" />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-col items-start ${isRTL ? "text-right" : "text-left"}`}>
            <motion.div
              key={`icon-${serviceId}-${language}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20 text-accent backdrop-blur-sm"
            >
              <Icon className="h-8 w-8" />
            </motion.div>
            <motion.h1
              key={`title-${serviceId}-${language}`}
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-display font-800 tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl"
            >
              {title}
            </motion.h1>
            <motion.p
              key={`desc-${serviceId}-${language}`}
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-3xl text-lg leading-relaxed text-primary-foreground/80 sm:text-xl"
            >
              {description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Project Gallery - For All Services */}
      <ProjectGallery serviceId={serviceId} />

      {/* Features Grid */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <motion.div
            key={`features-title-${language}`}
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-display font-bold text-foreground">
              {t("services.detailTitles.features")}
            </h2>
          </motion.div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.features.map((featureKey: string, idx: number) => {
              const FeatureIcon = featureIcons[featureKey] || BadgeCheck;
              const featureTitle = t(`services.features.${featureKey}.title`);
              const featureDesc = t(`services.features.${featureKey}.desc`);
              
              return (
                <motion.div
                  key={`${featureKey}-${language}`}
                  initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <FeatureIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{featureTitle}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {featureDesc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-max">
          <motion.div
            key={`process-title-${language}`}
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-display font-bold text-foreground">
              {t("services.detailTitles.process")}
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-4">
            {service.process.map((processKey: string, idx: number) => (
              <motion.div
                key={`${processKey}-${language}`}
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Connector Line */}
                {idx < service.process.length - 1 && (
                  <div className={`absolute top-8 hidden h-0.5 w-full bg-border md:block ${isRTL ? "right-1/2" : "left-1/2"}`} />
                )}
                
                <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-background border-4 border-secondary shadow-sm">
                  <span className="text-xl font-bold text-accent">{idx + 1}</span>
                </div>
                
                <h3 className="mb-2 text-lg font-bold text-foreground">
                  {t(`services.process.${processKey}`)}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default ServiceDetail;
