import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const FAQSection = () => {
  const { t, language, isRTL } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items = t("faq.items") as Array<{
    question: string;
    answer: string;
  }>;

  return (
    <section className="section-padding bg-secondary/20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute left-0 bottom-0 -z-10 h-full w-full overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute -left-[10%] -bottom-[10%] h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute right-[20%] top-[20%] h-[200px] w-[200px] rounded-full bg-primary/5 blur-[80px]" />
      </div>

      <div className="container-max max-w-4xl">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <motion.span
            key={`badge-${language}`}
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent"
          >
            <HelpCircle className="h-3 w-3" />
            {t("faq.badge")}
          </motion.span>
          
          <motion.h2
            key={`title-${language}`}
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-3xl font-display font-800 leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {t("faq.title")}
          </motion.h2>

          <motion.p
            key={`desc-${language}`}
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl text-lg text-muted-foreground"
          >
            {t("faq.subtitle")}
          </motion.p>
        </div>

        {/* FAQ Items */}
        <div className="flex flex-col gap-4">
          {items.map((item, idx) => (
            <motion.div
              key={`${idx}-${language}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all hover:border-accent/30 hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="flex w-full items-center justify-between p-6 text-start focus:outline-none"
              >
                <span className={`text-lg font-bold text-foreground transition-colors ${openIndex === idx ? "text-accent" : ""}`}>
                  {item.question}
                </span>
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all ${openIndex === idx ? "border-accent bg-accent text-accent-foreground" : "border-border text-muted-foreground"}`}>
                  {openIndex === idx ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-base text-muted-foreground leading-relaxed border-t border-border/40 pt-4">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
