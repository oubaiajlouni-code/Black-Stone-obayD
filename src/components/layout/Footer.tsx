import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import logo from "@/assets/logo.webp";

const Footer = () => {
  const { t, isRTL, language } = useLanguage();

  const quickLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/about", label: t("nav.about") },
    { path: "/services", label: t("nav.services") },
    { path: "/locations", label: t("nav.locations") },
    { path: "/contact", label: t("nav.contact") },
  ];

  const serviceLinks = [
    { path: "/services/sales", label: t("services.sales.title") },
    { path: "/services/rentals", label: t("services.rentals.title") },
    { path: "/services/fitout", label: t("services.fitout.title") },
    { path: "/services/turnkey", label: t("services.turnkey.title") },
    { path: "/services/consulting", label: t("services.consulting.title") },
  ];

  return (
    <footer className="surface-dark relative z-10">
      <div className="container-max px-4 pt-16 pb-24 sm:px-6 sm:pt-20 sm:pb-24 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <motion.div 
            key={`brand-${language}`}
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="BLACK STONE GROUP" className="h-12 w-auto object-contain brightness-0 invert" loading="lazy" />
              <div className="flex flex-col">
                <span className="text-xl font-display font-800 tracking-tight text-surface-dark-foreground leading-none">
                  BLACK STONE
                </span>
                <span className="text-[10px] font-display font-500 tracking-[0.3em] uppercase text-surface-dark-foreground/50 leading-none mt-1">
                  GROUP
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-surface-dark-foreground/60">
              {t("footer.description")}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            key={`links-${language}`}
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-surface-dark-foreground/80">
              {t("footer.quickLinks")}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-surface-dark-foreground/50 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            key={`services-${language}`}
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-surface-dark-foreground/80">
              {t("footer.services")}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-sm text-surface-dark-foreground/50 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            key={`contact-${language}`}
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-surface-dark-foreground/80">
              {t("footer.contactInfo")}
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm text-surface-dark-foreground/50">{t("contact.info.address")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm text-surface-dark-foreground/50">{t("contact.info.phone")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm text-surface-dark-foreground/50">{t("contact.info.email")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm text-surface-dark-foreground/50">{t("contact.info.hours")}</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-surface-dark-foreground/10 pt-8 text-center">
          <p className="text-xs text-surface-dark-foreground/40">
            © {new Date().getFullYear()} BLACK STONE GROUP. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
