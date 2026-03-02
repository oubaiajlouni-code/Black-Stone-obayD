import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const WHATSAPP_NUMBER = "905526077996";

const WhatsAppButton = () => {
  const { language } = useLanguage();

  const message =
    language === "ar"
      ? "مرحباً، أرغب في الحصول على استشارة مجانية"
      : language === "tr"
      ? "Merhaba, ücretsiz danışmanlık almak istiyorum"
      : "Hello, I would like to get a free consultation";

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-110 ltr:right-6 rtl:left-6"
      aria-label="WhatsApp"
    >
      <span className="absolute h-14 w-14 animate-pulse-ring rounded-full bg-[#25D366]/40" />
      <MessageCircle className="h-7 w-7 fill-current text-primary-foreground" />
    </a>
  );
};

export default WhatsAppButton;
