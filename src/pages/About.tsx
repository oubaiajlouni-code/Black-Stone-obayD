import { motion } from "framer-motion";
import { Shield, Award, Handshake, Lightbulb, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import aboutBg from "@/assets/about-bg.webp";
import about1 from "@/assets/about1.webp";
import about2 from "@/assets/about2.webp";
import CTASection from "@/components/home/CTASection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const About = () => {
  const { t, isRTL, language } = useLanguage();

  const values = [
    { icon: Shield, key: "integrity" },
    { icon: Award, key: "excellence" },
    { icon: Handshake, key: "trust" },
    { icon: Lightbulb, key: "innovation" },
  ];

  // Get team members from translations
  // Since t() returns string or object, we need to cast it properly or use a helper
  // For now, we'll manually map indices since the structure is known
  const teamMembers = [0, 1, 2, 3].map((idx) => ({
    name: t(`about.teamSection.members.${idx}.name`),
    role: t(`about.teamSection.members.${idx}.role`),
    // Use UI Avatars for placeholders based on name
    image: `https://ui-avatars.com/api/?name=${t(`about.teamSection.members.${idx}.name`)}&background=random&color=fff`
  }));

  const investmentItems = [0, 1, 2].map((idx) => t(`about.investmentSection.items.${idx}`));

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden pb-16 pt-32">
        <div className="absolute inset-0">
          <img src={aboutBg} alt="BLACK STONE GROUP" className="h-full w-full object-cover" loading="eager" />
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
              {t("about.badge")}
            </motion.span>
            <motion.h1
              key={`title-${language}`}
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-4xl font-display font-800 tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl"
            >
              {t("about.title")}
            </motion.h1>
            <motion.p
              key={`subtitle-${language}`}
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-4 text-xl font-display font-600 text-accent"
            >
              {t("about.subtitle")}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Section 1: Intro / Mission / Vision */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Image */}
            <motion.div
              key={`intro-img-${language}`}
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                <img 
                  src={about1} 
                  alt={t("about.title")} 
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" 
                />
              </div>
              <div className={`absolute -bottom-6 ${isRTL ? "-right-6" : "-left-6"} -z-10 h-full w-full rounded-2xl border-2 border-accent/20 bg-accent/5`} />
            </motion.div>

            {/* Right Content */}
            <div className={`flex flex-col ${isRTL ? "text-right" : "text-left"}`}>
              <motion.div
                key={`story-${language}`}
                initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-sm font-semibold uppercase tracking-wider text-accent mb-2 block">
                  {t("about.badge")}
                </span>
                <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                  {t("about.subtitle")}
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                  {t("about.story")}
                </p>
              </motion.div>

              <div className="grid gap-6">
                <motion.div
                  key={`mission-${language}`}
                  initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="mb-3 text-lg font-display font-bold text-foreground flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    {isRTL ? "مهمتنا" : language === 'tr' ? "Misyonumuz" : "Our Mission"}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t("about.mission")}</p>
                </motion.div>
                
                <motion.div
                  key={`vision-${language}`}
                  initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="mb-3 text-lg font-display font-bold text-foreground flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    {isRTL ? "رؤيتنا" : language === 'tr' ? "Vizyonumuz" : "Our Vision"}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t("about.vision")}</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Investment in Safe Hands */}
      <section className="section-padding bg-secondary/30 overflow-hidden">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className={`flex flex-col ${isRTL ? "text-right order-2 md:order-1" : "text-left order-2 md:order-1"}`}>
              <motion.div
                key={`investment-content-${language}`}
                initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                  {t("about.investmentSection.title")}
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                  {t("about.investmentSection.description")}
                </p>
                
                <ul className="space-y-4">
                  {investmentItems.map((item, idx) => (
                    <motion.li 
                      key={`inv-item-${idx}-${language}`}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                      <span className="text-base text-foreground/80">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div
              key={`investment-img-${language}`}
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`relative order-1 md:order-2`}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <img 
                  src={about2} 
                  alt={t("about.investmentSection.title")} 
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" 
                />
              </div>
              <div className={`absolute -top-6 ${isRTL ? "-left-6" : "-right-6"} -z-10 h-full w-full rounded-2xl border-2 border-accent/20 bg-accent/5`} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Team */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <motion.div
            key={`team-header-${language}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-display font-800 tracking-tight text-foreground sm:text-4xl mb-4">
              {t("about.teamSection.title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("about.teamSection.subtitle")}
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={`team-member-${idx}-${language}`}
                initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-3xl bg-background border border-border/50 p-8 text-center transition-all hover:shadow-xl hover:border-accent/20"
              >
                <div className="mx-auto mb-6 h-28 w-28 overflow-hidden rounded-full bg-secondary/30 flex items-center justify-center">
                  <Avatar className="h-full w-full">
                    {/* <AvatarImage src={member.image} alt={member.name} className="object-cover" /> */}
                    <AvatarFallback className="bg-transparent">
                      {/* Show different icons for male/female based on index or name */}
                      {idx % 2 === 0 ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-12 w-12 text-foreground/40"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-12 w-12 text-foreground/40"
                        >
                          <circle cx="12" cy="7" r="4" />
                          <path d="M20 21a8 8 0 0 0-16 0" />
                        </svg>
                      )}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="mb-2 text-lg font-display font-bold text-foreground tracking-tight">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-muted-foreground/80">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-secondary/50">
        <div className="container-max">
          <motion.h2
            key={`values-title-${language}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-3xl font-display font-800 tracking-tight text-foreground sm:text-4xl"
          >
            {t("about.values.title")}
          </motion.h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={`${val.key}-${language}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-2xl border border-border bg-card p-6 text-center hover:border-accent/50 transition-colors"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-base font-display font-700 text-foreground">
                    {t(`about.values.${val.key}`)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(`about.values.${val.key}Desc`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default About;
