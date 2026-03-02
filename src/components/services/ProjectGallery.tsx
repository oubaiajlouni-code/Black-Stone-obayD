import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { ChevronLeft, ChevronRight, ArrowUpRight, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Sales Images
import sales1 from "@/assets/sales-1.webp";
import sales2 from "@/assets/sales-2.webp";
import sales3 from "@/assets/sales-3.webp";

// Rentals Images
import rentals1 from "@/assets/rentals-1.webp";
import rentals2 from "@/assets/rentals-2.webp";
import rentals3 from "@/assets/rentals-3.webp";

// Fitout Images
import fitout1 from "@/assets/fitout-1.webp";
import fitout2 from "@/assets/fitout-2.webp";
import fitout3 from "@/assets/fitout-3.webp";

// Turnkey Images
import turnkey1 from "@/assets/turnkey-1.webp";
import turnkey2 from "@/assets/turnkey-2.webp";
import turnkey3 from "@/assets/turnkey-3.webp";

// Consulting Images
import consulting1 from "@/assets/consulting-1.webp";
import consulting2 from "@/assets/consulting-2.webp";
import consulting3 from "@/assets/consulting-3.webp";

const ALL_PROJECTS = {
  sales: [
    {
      id: 1,
      title: {
        en: "Bosphorus Horizon Residence",
        ar: "إقامة أفق البوسفور",
        tr: "Boğaziçi Ufuk Rezidansı"
      },
      location: {
        en: "Bosphorus, Istanbul",
        ar: "البوسفور، إسطنبول",
        tr: "Boğaziçi, İstanbul"
      },
      description: {
        en: "A masterpiece of luxury living featuring floor-to-ceiling windows that frame a breathtaking panoramic view of the Bosphorus at sunset.",
        ar: "تحفة من الحياة الفاخرة تتميز بنوافذ ممتدة من الأرض حتى السقف تؤطر إطلالة بانورامية خلابة على مضيق البوسفور عند غروب الشمس.",
        tr: "Gün batımında Boğaz'ın nefes kesen panoramik manzarasını çerçeveleyen boydan boya pencerelere sahip bir lüks yaşam şaheseri."
      },
      image: sales1,
    },
    {
      id: 2,
      title: {
        en: "Yaafour Limestone Estate",
        ar: "قصر يعفور الحجري",
        tr: "Yaafour Kireçtaşı Malikanesi"
      },
      location: {
        en: "Yaafour, Damascus",
        ar: "يعفور، دمشق",
        tr: "Yaafour, Şam"
      },
      description: {
        en: "A stunning private villa characterized by modern limestone architecture and lush landscaped gardens, offering a serene twilight sanctuary.",
        ar: "فيلا خاصة مذهلة تتميز بالعمارة الحديثة من الحجر الجيري والحدائق ذات المناظر الطبيعية الخلابة، وتوفر ملاذاً هادئاً عند الغسق.",
        tr: "Modern kireçtaşı mimarisi ve yemyeşil peyzajlı bahçeleriyle karakterize edilen, sakin bir alacakaranlık sığınağı sunan çarpıcı bir özel villa."
      },
      image: sales2,
    },
    {
      id: 3,
      title: {
        en: "Levent Corporate Hub",
        ar: "مركز ليفنت للأعمال",
        tr: "Levent Kurumsal Merkezi"
      },
      location: {
        en: "Levent, Istanbul",
        ar: "ليفنت، إسطنبول",
        tr: "Levent, İstanbul"
      },
      description: {
        en: "A modern corporate complex designed for efficiency, featuring open-plan workspaces bathed in natural light and ergonomic design.",
        ar: "مجمع شركات حديث مصمم للكفاءة، يتميز بمساحات عمل مفتوحة تغمرها الإضاءة الطبيعية وتصميم مريح.",
        tr: "Verimlilik için tasarlanmış, doğal ışıkla yıkanan açık plan çalışma alanlarına ve ergonomik tasarıma sahip modern bir kurumsal kompleks."
      },
      image: sales3,
    }
  ],
  rentals: [
    {
      id: 1,
      title: {
        en: "Bohemian Chic Apartment",
        ar: "شقة بوهيمية أنيقة",
        tr: "Bohem Şık Daire"
      },
      location: {
        en: "Beyoglu, Istanbul",
        ar: "بي أوغلو، إسطنبول",
        tr: "Beyoğlu, İstanbul"
      },
      description: {
        en: "A cozy, furnished boutique apartment offering a view of the Galata Tower, blending historic charm with warm, inviting sunlight.",
        ar: "شقة بوتيك مفروشة ومريحة توفر إطلالة على برج غلطة، وتمزج بين السحر التاريخي وأشعة الشمس الدافئة والجذابة.",
        tr: "Galata Kulesi manzarası sunan, tarihi cazibeyi sıcak ve davetkar güneş ışığıyla harmanlayan rahat, eşyalı bir butik daire."
      },
      image: rentals1,
    },
    {
      id: 2,
      title: {
        en: "Prime Retail Space",
        ar: "مساحة تجارية متميزة",
        tr: "Seçkin Perakende Alanı"
      },
      location: {
        en: "Business Bay, Dubai",
        ar: "الخليج التجاري، دبي",
        tr: "Business Bay, Dubai"
      },
      description: {
        en: "An expansive commercial retail space with high ceilings and polished concrete floors, creating a modern industrial vibe.",
        ar: "مساحة تجارية واسعة للبيع بالتجزئة ذات أسقف عالية وأرضيات خرسانية مصقولة، مما يخلق جواً صناعياً حديثاً.",
        tr: "Yüksek tavanlı ve cilalı beton zeminli, modern bir endüstriyel hava yaratan geniş bir ticari perakende alanı."
      },
      image: rentals2,
    },
    {
      id: 3,
      title: {
        en: "Sapanca Lake Retreat",
        ar: "ملاذ بحيرة صبنحة",
        tr: "Sapanca Göl Evi"
      },
      location: {
        en: "Sapanca, Turkey",
        ar: "صبنحة، تركيا",
        tr: "Sapanca, Türkiye"
      },
      description: {
        en: "A luxury wooden lake house nestled in the forest, offering a serene escape with misty morning views from a cozy deck.",
        ar: "منزل خشبي فاخر على البحيرة يقع في الغابة، ويوفر ملاذاً هادئاً مع إطلالات صباحية ضبابية من سطح مريح.",
        tr: "Ormanın içine gizlenmiş, rahat bir terastan sisli sabah manzaraları ile sakin bir kaçış sunan lüks bir ahşap göl evi."
      },
      image: rentals3,
    }
  ],
  fitout: [
    {
      id: 1,
      title: {
        en: "Modern HQ Lobby",
        ar: "لوبي المقر الرئيسي الحديث",
        tr: "Modern Merkez Lobisi"
      },
      location: {
        en: "Istanbul, Turkey",
        ar: "إسطنبول، تركيا",
        tr: "İstanbul, Türkiye"
      },
      description: {
        en: "A bright and airy corporate lobby renovation featuring marble floors, wood slat walls, and a statement chandelier.",
        ar: "تجديد لوبي شركة مشرق وجيد التهوية يتميز بأرضيات رخامية وجدران خشبية وثريا بارزة.",
        tr: "Mermer zeminler, ahşap çıtalı duvarlar ve iddialı bir avizeye sahip aydınlık ve ferah bir kurumsal lobi renovasyonu."
      },
      image: fitout1,
    },
    {
      id: 2,
      title: {
        en: "Heritage Fusion Hotel",
        ar: "فندق التراث المدمج",
        tr: "Miras Füzyon Oteli"
      },
      location: {
        en: "Old Damascus, Syria",
        ar: "دمشق القديمة، سوريا",
        tr: "Eski Şam, Suriye"
      },
      description: {
        en: "A unique boutique hotel room blending restored ancient stone walls with modern luxury furniture and oriental rugs.",
        ar: "غرفة فندق بوتيك فريدة تمزج بين الجدران الحجرية القديمة المرممة والأثاث الفاخر الحديث والسجاد الشرقي.",
        tr: "Restore edilmiş antik taş duvarları modern lüks mobilyalar ve oryantal kilimlerle harmanlayan benzersiz bir butik otel odası."
      },
      image: fitout2,
    },
    {
      id: 3,
      title: {
        en: "Flagship Fashion Store",
        ar: "متجر الأزياء الرئيسي",
        tr: "Amiral Gemisi Moda Mağazası"
      },
      location: {
        en: "Istanbul, Turkey",
        ar: "إسطنبول، تركيا",
        tr: "İstanbul, Türkiye"
      },
      description: {
        en: "A high-end retail experience defined by minimalist design, white surfaces, gold accents, and premium lighting.",
        ar: "تجربة تسوق راقية تحددها التصاميم البسيطة، والأسطح البيضاء، واللمسات الذهبية، والإضاءة المتميزة.",
        tr: "Minimalist tasarım, beyaz yüzeyler, altın detaylar ve birinci sınıf aydınlatma ile tanımlanan üst düzey bir perakende deneyimi."
      },
      image: fitout3,
    }
  ],
  turnkey: [
    {
      id: 1,
      title: {
        en: "Mediterranean Resort",
        ar: "منتجع البحر المتوسط",
        tr: "Akdeniz Tatil Köyü"
      },
      location: {
        en: "Antalya, Turkey",
        ar: "أنطاليا، تركيا",
        tr: "Antalya, Türkiye"
      },
      description: {
        en: "A sprawling seaside luxury resort project featuring white modern villas and turquoise pools under the sunny Antalya sky.",
        ar: "مشروع منتجع ساحلي فاخر واسع يضم فيلات حديثة بيضاء وحمامات سباحة فيروزية تحت سماء أنطاليا المشمسة.",
        tr: "Güneşli Antalya gökyüzünün altında beyaz modern villalar ve turkuaz havuzlara sahip geniş bir sahil lüks tatil köyü projesi."
      },
      image: turnkey1,
    },
    {
      id: 2,
      title: {
        en: "Baghdad Skyscraper",
        ar: "ناطحة سحاب بغداد",
        tr: "Bağdat Gökdeleni"
      },
      location: {
        en: "Baghdad, Iraq",
        ar: "بغداد، العراق",
        tr: "Bağdat, Irak"
      },
      description: {
        en: "A modern residential tower rising above the busy streets, with a glass facade reflecting the golden hour sky.",
        ar: "برج سكني حديث يرتفع فوق الشوارع المزدحمة، بواجهة زجاجية تعكس سماء الساعة الذهبية.",
        tr: "İşlek caddelerin üzerinde yükselen, altın saat gökyüzünü yansıtan cam cepheli modern bir konut kulesi."
      },
      image: turnkey2,
    },
    {
      id: 3,
      title: {
        en: "Bodrum Stone Estate",
        ar: "قصر بودروم الحجري",
        tr: "Bodrum Taş Malikane"
      },
      location: {
        en: "Bodrum, Turkey",
        ar: "بودروم، تركيا",
        tr: "Bodrum, Türkiye"
      },
      description: {
        en: "A private stone mansion overlooking the Aegean Sea, featuring an infinity pool and olive trees in a luxury setting.",
        ar: "قصر حجري خاص يطل على بحر إيجة، ويتميز بمسبح لا متناهي وأشجار زيتون في بيئة فاخرة.",
        tr: "Ege Denizi'ne bakan, lüks bir ortamda sonsuzluk havuzu ve zeytin ağaçları içeren özel bir taş malikane."
      },
      image: turnkey3,
    }
  ],
  consulting: [
    {
      id: 1,
      title: {
        en: "Corporate Strategy",
        ar: "استراتيجية الشركات",
        tr: "Kurumsal Strateji"
      },
      location: {
        en: "Istanbul, Turkey",
        ar: "إسطنبول، تركيا",
        tr: "İstanbul, Türkiye"
      },
      description: {
        en: "High-level strategic meetings in a modern boardroom with a city skyline backdrop, facilitating professional decisions.",
        ar: "اجتماعات استراتيجية رفيعة المستوى في قاعة اجتماعات حديثة مع خلفية أفق المدينة، لتسهيل القرارات المهنية.",
        tr: "Şehir silüeti fonunda modern bir toplantı odasında, profesyonel kararları kolaylaştıran üst düzey stratejik toplantılar."
      },
      image: consulting1,
    },
    {
      id: 2,
      title: {
        en: "Investment Valuation",
        ar: "تقييم الاستثمار",
        tr: "Yatırım Değerlemesi"
      },
      location: {
        en: "Dubai, UAE",
        ar: "دبي، الإمارات",
        tr: "Dubai, BAE"
      },
      description: {
        en: "Precise architectural and financial analysis for real estate valuation, set against the inspiring Dubai skyline.",
        ar: "تحليل معماري ومالي دقيق للتقييم العقاري، على خلفية أفق دبي الملهم.",
        tr: "İlham verici Dubai silüetine karşı, gayrimenkul değerlemesi için hassas mimari ve finansal analiz."
      },
      image: consulting2,
    },
    {
      id: 3,
      title: {
        en: "Development Site Survey",
        ar: "مسح موقع التطوير",
        tr: "Geliştirme Saha Araştırması"
      },
      location: {
        en: "Riyadh, Saudi Arabia",
        ar: "الرياض، السعودية",
        tr: "Riyad, Suudi Arabistan"
      },
      description: {
        en: "On-site engineering and investment assessment at a major construction development in Riyadh during golden hour.",
        ar: "تقييم هندسي واستثماري في الموقع لمشروع تطوير إنشائي كبير في الرياض خلال الساعة الذهبية.",
        tr: "Riyad'daki büyük bir inşaat geliştirme projesinde altın saatte yerinde mühendislik ve yatırım değerlendirmesi."
      },
      image: consulting3,
    }
  ]
};

const ProjectGallery = ({ serviceId }: { serviceId: string }) => {
  const { language, isRTL, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Select projects based on serviceId
  const serviceProjects = ALL_PROJECTS[serviceId as keyof typeof ALL_PROJECTS] || ALL_PROJECTS.sales;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % serviceProjects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + serviceProjects.length) % serviceProjects.length);
  };

  const currentProject = serviceProjects[currentIndex];

  return (
    <section className="section-padding bg-background overflow-hidden">
      <motion.div 
        key={`gallery-content-${language}-${serviceId}`}
        initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="container-max"
      >
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-2 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
              {t("nav.locations")} {/* Using existing translation key as placeholder for "Projects" */}
            </span>
            <h2 className="text-3xl font-display font-bold text-foreground md:text-4xl">
              {language === 'ar' ? "مشاريع مميزة" : language === 'tr' ? "Öne Çıkan Projeler" : "Featured Projects"}
            </h2>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-accent hover:bg-accent hover:text-white"
              aria-label="Previous project"
            >
              <ChevronLeft className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
            </button>
            <button
              onClick={nextSlide}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-accent hover:bg-accent hover:text-white"
              aria-label="Next project"
            >
              <ChevronRight className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {/* Gallery Content */}
        <div className="relative h-[500px] w-full rounded-3xl overflow-hidden bg-muted">
          <AnimatePresence>
            <motion.div
              key={`${currentIndex}-${serviceId}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full"
            >
              <img
                src={currentProject.image}
                alt={currentProject.title[language as keyof typeof currentProject.title]}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Project Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <motion.div
              key={`info-${currentIndex}-${language}`}
              initial={{ opacity: 0, y: 20, x: isRTL ? -20 : 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="max-w-3xl"
            >
              <h3 className="mb-2 text-2xl font-display font-bold text-white md:text-4xl">
                {currentProject.title[language as keyof typeof currentProject.title]}
              </h3>
              <p className="mb-4 text-lg text-white/80 flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent"></span>
                {currentProject.location[language as keyof typeof currentProject.location]}
              </p>
              
              <p className="text-base text-white/90 leading-relaxed max-w-2xl drop-shadow-md">
                {currentProject.description[language as keyof typeof currentProject.description]}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Thumbnails & CTA */}
        <div className="mt-6 flex flex-col md:flex-row gap-6 items-start md:items-center md:justify-between">
          {/* Thumbnails Scroll Container */}
          <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar w-full md:w-auto">
            {serviceProjects.map((project, idx) => {
              const isSelected = currentIndex === idx;

              return (
                <button
                  key={project.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-xl transition-opacity duration-300 border-none outline-none ring-0 focus:ring-0 focus:outline-none focus:border-none ${
                    isSelected 
                      ? "opacity-100" 
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title[language as keyof typeof project.title]}
                    className="h-full w-full object-cover"
                  />
                </button>
              );
            })}
          </div>

          {/* Contact CTA Button */}
          <Link 
            to="/contact" 
            className="w-full md:w-auto flex-shrink-0 group flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-accent-foreground transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 md:h-auto md:py-3"
          >
            <MessageSquare className="h-5 w-5" />
            <span className="whitespace-nowrap">
              {t("nav.freeConsultation")}
            </span>
            <ArrowUpRight className={`h-4 w-4 transition-transform duration-300 ${isRTL ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectGallery;
