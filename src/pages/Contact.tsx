import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle, ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const WHATSAPP_NUMBER = "905526077996";

import heroBg from "@/assets/contact-hero.webp";

const Contact = () => {
  const { t, language, isRTL } = useLanguage();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const whatsappMessage =
    language === "ar"
      ? "مرحباً، أرغب في الحصول على استشارة مجانية"
      : language === "tr"
      ? "Merhaba, ücretsiz danışmanlık almak istiyorum"
      : "Hello, I would like to get a free consultation";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!form.name.trim() || !form.phone.trim()) return;

    // Build WhatsApp message with form data
    const lines = [
      `${t("contact.form.name")}: ${form.name}`,
      form.email ? `${t("contact.form.email")}: ${form.email}` : "",
      `${t("contact.form.phone")}: ${form.phone}`,
      form.service ? `${t("contact.form.service")}: ${form.service}` : "",
      form.message ? `${t("contact.form.message")}: ${form.message}` : "",
    ].filter(Boolean);

    const waMessage = lines.join("\n");
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`,
      "_blank"
    );

    toast({
      title: "✓",
      description: t("contact.form.success"),
    });
    setSubmitted(true);
  };

  const serviceOptions = [
    { value: "sales", label: t("contact.form.services.sales") },
    { value: "rentals", label: t("contact.form.services.rentals") },
    { value: "fitout", label: t("contact.form.services.fitout") },
    { value: "turnkey", label: t("contact.form.services.turnkey") },
    { value: "consulting", label: t("contact.form.services.consulting") },
  ];

  const contactItems = [
    { icon: MapPin, text: t("contact.info.address") },
    { icon: Phone, text: t("contact.info.phone") },
    { icon: Mail, text: t("contact.info.email") },
    { icon: Clock, text: t("contact.info.hours") },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden pb-16 pt-32">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Contact Hero" className="h-full w-full object-cover" loading="eager" />
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
              {t("contact.badge")}
            </motion.span>
            <motion.h1
              key={`title-${language}`}
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-4xl font-display font-800 tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl"
            >
              {t("contact.title")}
            </motion.h1>
            <motion.p
              key={`subtitle-${language}`}
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-4 max-w-xl text-lg text-primary-foreground/80 sm:text-xl"
            >
              {t("contact.subtitle")}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <motion.div
              key={`form-${language}`}
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-12 text-center">
                  <CheckCircle className="mb-4 h-16 w-16 text-accent" />
                  <p className="text-lg font-semibold text-foreground">{t("contact.form.success")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        {t("contact.form.name")} *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={100}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        {t("contact.form.email")}
                      </label>
                      <input
                        type="email"
                        maxLength={255}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                      />
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        {t("contact.form.phone")} *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={20}
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        {t("contact.form.service")}
                      </label>
                      <div className="relative">
                        <select
                          value={form.service}
                          onChange={(e) => setForm({ ...form, service: e.target.value })}
                          className="w-full appearance-none rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                        >
                          <option value="">—</option>
                          {serviceOptions.map((opt) => (
                            <option key={opt.value} value={opt.label}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground rtl:left-0 rtl:right-auto">
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      {t("contact.form.message")}
                    </label>
                    <textarea
                      rows={4}
                      maxLength={1000}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20"
                  >
                    <Send className="h-4 w-4" />
                    {t("contact.form.submit")}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              key={`sidebar-${language}`}
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="rounded-2xl border border-border bg-card p-8">
                <h3 className="mb-6 text-lg font-display font-700 text-foreground">
                  {t("footer.contactInfo")}
                </h3>
                <ul className="flex flex-col gap-5">
                  {contactItems.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <li key={idx} className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="pt-2 text-sm text-muted-foreground">{item.text}</span>
                      </li>
                    );
                  })}
                </ul>

                {/* Direct WhatsApp */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-[#20BD5A]"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
