import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const WHATSAPP_NUMBER = "905526077996";

const CTASection = () => {
  const { t, language, isRTL } = useLanguage();

  const whatsappMessage =
    language === "ar"
      ? "مرحباً، أرغب في الحصول على استشارة مجانية"
      : language === "tr"
      ? "Merhaba, ücretsiz danışmanlık almak istiyorum"
      : "Hello, I would like to get a free consultation";

  return (
    <section className="bg-white section-padding">
      <div className="container-max text-center">
        <div className="flex flex-col items-center">
          <motion.h2
            key={`title-${language}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-display font-800 tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {t("cta.title")}
          </motion.h2>
          <motion.p
            key={`subtitle-${language}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 max-w-xl text-base text-muted-foreground"
          >
            {t("cta.subtitle")}
          </motion.p>
          <motion.div
            key={`buttons-${language}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              to="/contact"
              className="flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20"
            >
              {t("cta.button")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-semibold text-foreground transition-all hover:bg-muted"
            >
              <MessageCircle className="h-4 w-4" />
              {t("cta.whatsapp")}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
