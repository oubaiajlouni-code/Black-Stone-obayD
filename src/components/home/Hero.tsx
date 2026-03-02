import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import heroBg from "@/assets/hero-bg.webp";
import CountUp from "@/components/ui/CountUp";

const WHATSAPP_NUMBER = "905526077996";

const Hero = () => {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";

  const whatsappMessage =
    language === "ar"
      ? "مرحباً، أرغب في الحصول على استشارة مجانية"
      : language === "tr"
      ? "Merhaba, ücretsiz danışmanlık almak istiyorum"
      : "Hello, I would like to get a free consultation";

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pb-60 pt-32 sm:items-center sm:pb-0 sm:pt-0">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Luxury real estate in Istanbul"
          className="h-full w-full object-cover"
          loading="eager"
          fetchpriority="high"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="mb-6">
            <motion.span
              key={`badge-${language}`}
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-dark inline-block rounded-full px-4 py-2 text-xs font-medium uppercase tracking-widest text-primary-foreground/90"
            >
              {t("hero.badge")}
            </motion.span>
          </div>

          {/* Title */}
          <motion.h1
            key={`title-${language}`}
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6 text-4xl font-display font-800 leading-tight tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            {t("hero.title")}
            <br />
            <span className="text-accent">{t("hero.titleHighlight")}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            key={`subtitle-${language}`}
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8 max-w-xl text-base leading-relaxed text-primary-foreground/70 sm:text-lg"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            key={`cta-${language}`}
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20"
            >
              {t("hero.cta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-dark flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/10"
            >
              <MessageCircle className="h-4 w-4" />
              {t("hero.ctaWhatsapp")}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="glass-gentle mb-8 grid grid-cols-2 rounded-2xl sm:mb-12 sm:grid-cols-4 sm:divide-x sm:divide-primary-foreground/20 sm:rtl:divide-x-reverse"
          >
            <div className="border-b border-r rtl:border-l rtl:border-r-0 border-primary-foreground/20 px-6 py-5 text-center sm:border-0">
              <div className="text-2xl font-display font-800 text-primary-foreground sm:text-3xl">
                <CountUp end={12} prefix="+" duration={2.5} delay={0.5} />
              </div>
              <div className="mt-1 text-xs font-medium text-primary-foreground/80 sm:text-sm">
                <motion.span
                  key={`stat-exp-${language}`}
                  initial={{ opacity: 0, x: isRTL ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="inline-block"
                >
                  {t("stats.experience")}
                </motion.span>
              </div>
            </div>
            <div className="border-b border-primary-foreground/20 px-6 py-5 text-center sm:border-0">
              <div className="text-2xl font-display font-800 text-primary-foreground sm:text-3xl">
                <CountUp end={418} suffix="+" duration={2.5} delay={0.5} />
              </div>
              <div className="mt-1 text-xs font-medium text-primary-foreground/80 sm:text-sm">
                <motion.span
                  key={`stat-proj-${language}`}
                  initial={{ opacity: 0, x: isRTL ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="inline-block"
                >
                  {t("stats.projects")}
                </motion.span>
              </div>
            </div>
            <div className="border-r rtl:border-l rtl:border-r-0 border-primary-foreground/20 px-6 py-5 text-center sm:border-0">
              <div className="text-2xl font-display font-800 text-primary-foreground sm:text-3xl">
                <CountUp end={936} suffix="+" duration={2.5} delay={0.5} />
              </div>
              <div className="mt-1 text-xs font-medium text-primary-foreground/80 sm:text-sm">
                <motion.span
                  key={`stat-clients-${language}`}
                  initial={{ opacity: 0, x: isRTL ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="inline-block"
                >
                  {t("stats.clients")}
                </motion.span>
              </div>
            </div>
            <div className="px-6 py-5 text-center">
              <div className="text-2xl font-display font-800 text-primary-foreground sm:text-3xl">
                <CountUp end={3} duration={2.5} delay={0.5} />
              </div>
              <div className="mt-1 text-xs font-medium text-primary-foreground/80 sm:text-sm">
                <motion.span
                  key={`stat-offices-${language}`}
                  initial={{ opacity: 0, x: isRTL ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="inline-block"
                >
                  {t("stats.offices")}
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
