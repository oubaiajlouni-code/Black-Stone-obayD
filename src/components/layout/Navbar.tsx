import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import logo from "@/assets/logo.webp";

const WHATSAPP_NUMBER = "905526077996";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { t, isRTL, language } = useLanguage();
  const location = useLocation();

  const whatsappMessage =
    language === "ar"
      ? "مرحباً، أرغب في الحصول على استشارة مجانية"
      : language === "tr"
      ? "Merhaba, ücretsiz danışmanlık almak istiyorum"
      : "Hello, I would like to get a free consultation";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/about", label: t("nav.about") },
    { path: "/services", label: t("nav.services") },
    { path: "/locations", label: t("nav.locations") },
    { path: "/contact", label: t("nav.contact") },
  ];

  const isHome = location.pathname === "/";
  const navBg = isScrolled || !isHome || isMobileOpen
    ? "bg-background/95 backdrop-blur-md shadow-sm"
    : "bg-transparent";
  const textColor = isScrolled || !isHome || isMobileOpen ? "text-foreground" : "text-primary-foreground";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${navBg}`}>
      <nav className="container-max flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="BLACK STONE GROUP" 
            className={`h-10 w-auto object-contain transition-all duration-300 ${
              isScrolled || !isHome || isMobileOpen ? "brightness-0" : "brightness-0 invert"
            }`} 
          />
          <div className={`flex flex-col ${isRTL ? "items-end" : "items-start"}`}>
            <span className={`text-lg font-display font-900 tracking-tight leading-none ${textColor}`}>
              BLACK STONE
            </span>
            <span className={`text-[10px] font-display font-500 tracking-[0.3em] uppercase leading-none ${textColor} opacity-70`}>
              GROUP
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                location.pathname === link.path
                  ? "text-accent"
                  : textColor + " opacity-80 hover:opacity-100"
              }`}
            >
              <motion.span
                key={`nav-${link.path}-${language}`}
                initial={{ opacity: 0, x: isRTL ? -10 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="inline-block"
              >
                {link.label}
              </motion.span>
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent/90 hover:shadow-md"
          >
            <Phone className="h-4 w-4" />
            <motion.span
              key={`nav-cta-${language}`}
              initial={{ opacity: 0, x: isRTL ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {t("nav.freeConsultation")}
            </motion.span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`${textColor}`}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileOpen ? "auto" : 0,
          opacity: isMobileOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden border-t border-border bg-background/98 backdrop-blur-lg lg:hidden"
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "bg-accent/10 text-accent"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              <motion.span
                key={`mobile-nav-${link.path}-${language}`}
                initial={{ opacity: 0, x: isRTL ? -10 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="inline-block"
              >
                {link.label}
              </motion.span>
            </Link>
          ))}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground"
          >
            <Phone className="h-4 w-4" />
            <motion.span
              key={`mobile-nav-cta-${language}`}
              initial={{ opacity: 0, x: isRTL ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {t("nav.freeConsultation")}
            </motion.span>
          </a>
        </div>
      </motion.div>
    </header>
  );
};

export default Navbar;
