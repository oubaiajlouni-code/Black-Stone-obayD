import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import {
  Bed, Bath, Maximize, MapPin, ArrowLeft,
  Waves, Home, ShieldCheck, TreePine, Car,
  Thermometer, Zap, Users, GraduationCap,
  ShoppingBag, Building2, Plane, CheckCircle2,
  TrendingUp, Landmark, CircleDollarSign
} from "lucide-react";

// استيراد الصور
import damascusVilla from "@/assets/damascus-villa.webp";
import istanbulResidence from "@/assets/istanbul-residence.webp";
import istanbulOffice from "@/assets/istanbul-office.webp";
import aleppoHouse from "@/assets/aleppo-house.webp";
import latakiaRestaurant from "@/assets/latakia-restaurant.webp";
import antalyaHotel from "@/assets/antalya-hotel-renovation.webp";

const PropertyDetail = () => {
  const { id } = useParams();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  // Helper functions for dynamic icons
  const getFeatureIcon = (featureName: string) => {
    const nameStr = featureName.toLowerCase();
    if (nameStr.includes("pool") || nameStr.includes("havuz") || nameStr.includes("مسبح")) return <Waves className="h-5 w-5" />;
    if (nameStr.includes("smart") || nameStr.includes("akıllı") || nameStr.includes("ذكي")) return <Home className="h-5 w-5" />;
    if (nameStr.includes("security") || nameStr.includes("güvenlik") || nameStr.includes("حراسة")) return <ShieldCheck className="h-5 w-5" />;
    if (nameStr.includes("garden") || nameStr.includes("bahçe") || nameStr.includes("حديقة")) return <TreePine className="h-5 w-5" />;
    if (nameStr.includes("garage") || nameStr.includes("garaj") || nameStr.includes("مرآب") || nameStr.includes("parking")) return <Car className="h-5 w-5" />;
    if (nameStr.includes("heating") || nameStr.includes("ısıtma") || nameStr.includes("تدفئة")) return <Thermometer className="h-5 w-5" />;
    if (nameStr.includes("generator") || nameStr.includes("jeneratör") || nameStr.includes("مولد")) return <Zap className="h-5 w-5" />;
    if (nameStr.includes("maid") || nameStr.includes("hizmetli") || nameStr.includes("خدم")) return <Users className="h-5 w-5" />;
    return <CheckCircle2 className="h-5 w-5" />;
  };

  const getLocationIcon = (iconCode: string) => {
    switch (iconCode) {
      case "school": return <GraduationCap className="h-8 w-8 text-accent group-hover:scale-110 transition-transform duration-500" />;
      case "shopping": return <ShoppingBag className="h-8 w-8 text-accent group-hover:scale-110 transition-transform duration-500" />;
      case "city": return <Building2 className="h-8 w-8 text-accent group-hover:scale-110 transition-transform duration-500" />;
      case "airport": return <Plane className="h-8 w-8 text-accent group-hover:scale-110 transition-transform duration-500" />;
      default: return <MapPin className="h-8 w-8 text-accent group-hover:scale-110 transition-transform duration-500" />;
    }
  };

  // 1. مصفوفة الصور بنفس ترتيب العرض في الصفحة الرئيسية
  const images = [
    damascusVilla,
    istanbulResidence,
    istanbulOffice,
    aleppoHouse,
    latakiaRestaurant,
    antalyaHotel
  ];

  const items = t("featured.items") as any[];

  // إيجاد العقار بناءً على الـ ID
  const property = items.find((p) => p.id === Number(id));

  // 2. تحديد مكان العنصر (index) لجلب الصورة الصحيحة
  const propertyIndex = items.findIndex((p) => p.id === Number(id));

  if (!property) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Property Not Found</h2>
        <button onClick={() => navigate("/")} className="mt-4 text-accent">Return Home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="container-max">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
        >
          <ArrowLeft className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
          {isRTL ? "العودة" : "Back"}
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl overflow-hidden shadow-2xl h-[400px] lg:h-[600px] relative group"
          >
            {/* 3. استبدال الـ Placeholder بالصورة الحقيقية */}
            <img
              src={images[propertyIndex % images.length]}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <span className="mb-4 inline-block w-fit rounded-lg bg-accent/10 px-3 py-1 text-sm font-bold text-accent uppercase tracking-wider">
              {t(`featured.labels.${property.type}`)}
            </span>

            <h1 className="text-4xl font-display font-800 mb-2 leading-tight text-foreground">
              {property.title}
            </h1>

            <div className="flex items-center gap-2 text-muted-foreground mb-6">
              <MapPin className="h-5 w-5 text-accent" />
              <span className="text-lg">{property.location}</span>
            </div>

            <div className="text-3xl font-bold text-accent mb-8">
              {property.price}
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-3 gap-4 border-y border-border/50 py-6 mb-8 bg-card/30 rounded-xl px-4">
              <div className="flex flex-col items-center gap-1">
                <Bed className="h-6 w-6 text-muted-foreground/70" />
                <span className="font-bold text-foreground text-lg">{property.specs.beds}</span>
                <span className="text-xs text-muted-foreground uppercase">{isRTL ? "غرف" : "Beds"}</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-x border-border/50">
                <Bath className="h-6 w-6 text-muted-foreground/70" />
                <span className="font-bold text-foreground text-lg">{property.specs.baths}</span>
                <span className="text-xs text-muted-foreground uppercase">{isRTL ? "حمامات" : "Baths"}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Maximize className="h-6 w-6 text-muted-foreground/70" />
                <span className="font-bold text-foreground text-lg">{property.specs.area}</span>
                <span className="text-xs text-muted-foreground uppercase">{isRTL ? "مساحة" : "Area"}</span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {property.description || "Detailed description coming soon..."}
            </p>

            <button className="w-full lg:w-max px-12 py-4 bg-foreground text-background rounded-full font-bold hover:bg-accent hover:text-white transition-all transform active:scale-95 shadow-lg shadow-foreground/10 mb-12">
              {t("property.contact_inquiry") || (isRTL ? "تواصل معنا" : "Contact Inquiry")}
            </button>

          </motion.div>
        </div>

        {/* --- FULL WIDTH SECTIONS --- */}

        {/* New Section 1: Investment Potential */}
        {property.investment && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-card border border-border/50 rounded-3xl p-8 lg:p-12 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <div>
                <h3 className="text-3xl font-display font-bold text-foreground">
                  {isRTL ? "إمكانيات الاستثمار" : t("featured.investment.title") || "Investment Potential"}
                </h3>
                <p className="text-muted-foreground mt-1">
                  {isRTL ? "عائد مرتفع واستثمار آمن" : "High return and secure investment"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="group bg-background/50 backdrop-blur-md p-8 rounded-2xl border border-border/50 hover:border-accent hover:bg-accent/5 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-accent/10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-accent/10 transition-colors"></div>
                <TrendingUp className="h-8 w-8 text-accent/80 mb-4 group-hover:scale-110 transition-transform duration-500" />
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">{isRTL ? "عائد الاستثمار (ROI)" : "Expected ROI"}</span>
                <span className="text-5xl font-black text-foreground drop-shadow-sm">{property.investment.roi}</span>
              </div>
              <div className="group bg-background/50 backdrop-blur-md p-8 rounded-2xl border border-border/50 hover:border-accent hover:bg-accent/5 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-accent/10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-accent/10 transition-colors"></div>
                <Landmark className="h-8 w-8 text-accent/80 mb-4 group-hover:scale-110 transition-transform duration-500" />
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">{isRTL ? "نمو رأس المال" : "Capital Growth"}</span>
                <span className="text-4xl font-black text-foreground drop-shadow-sm mt-2">{property.investment.capitalGrowth}</span>
              </div>
              <div className="group bg-background/50 backdrop-blur-md p-8 rounded-2xl border border-border/50 hover:border-accent hover:bg-accent/5 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-accent/10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-accent/10 transition-colors"></div>
                <CircleDollarSign className="h-8 w-8 text-accent/80 mb-4 group-hover:scale-110 transition-transform duration-500" />
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">{isRTL ? "العائد الإيجاري" : "Rental Yield"}</span>
                <span className="text-4xl font-black text-foreground drop-shadow-sm mt-2">{property.investment.rentalYield}</span>
              </div>
            </div>

            {property.investment.highlights && (
              <div className="flex flex-wrap items-center justify-center gap-4">
                {property.investment.highlights.map((h: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 bg-accent/5 border border-accent/10 px-5 py-2.5 rounded-full">
                    <div className="h-2 w-2 rounded-full bg-accent animate-pulse"></div>
                    <span className="text-foreground font-medium">{h}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* New Section 2: Features & Amenities Checklist */}
        {property.features && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-card border border-border/50 rounded-3xl p-8 lg:p-12 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <div>
                <h3 className="text-3xl font-display font-bold text-foreground">
                  {isRTL ? "المميزات والمرافق" : t("featured.features.title") || "Features & Amenities"}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {property.features.map((feature: string, idx: number) => (
                <div key={idx} className="group flex items-center gap-4 p-5 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-accent hover:bg-accent/5 transition-all duration-300 shadow-sm hover:shadow-md cursor-default">
                  <div className="h-12 w-12 rounded-xl bg-accent/10 group-hover:bg-accent text-accent group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors duration-300 shadow-inner">
                    {getFeatureIcon(feature)}
                  </div>
                  <span className="text-foreground font-bold text-lg group-hover:text-accent transition-colors">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* New Section 3: Location Advantages */}
        {property.locationAdvantages && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-card border border-border/50 rounded-3xl p-8 lg:p-12 shadow-sm mb-12"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div>
                <h3 className="text-3xl font-display font-bold text-foreground">
                  {isRTL ? "مزايا الموقع" : t("featured.location.title") || "Location Advantages"}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {property.locationAdvantages.map((adv: any) => (
                <div key={adv.id} className="group relative overflow-hidden rounded-3xl bg-background/50 backdrop-blur-sm border border-border/50 p-8 flex flex-col items-center justify-center text-center hover:border-accent transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10 cursor-default">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="h-20 w-20 rounded-2xl bg-card border border-border/50 shadow-sm flex items-center justify-center mb-6 relative z-10 group-hover:border-accent/30 overflow-hidden">
                    <div className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                    {getLocationIcon(adv.icon || "default")}
                  </div>

                  <span className="font-extrabold text-xl text-foreground mb-4 relative z-10 group-hover:text-accent transition-colors">{adv.name}</span>

                  <div className="relative z-10 inline-flex items-center justify-center px-6 py-2 rounded-full bg-accent/10 border border-accent/20">
                    <span className="font-black tracking-wide text-accent text-sm">
                      {adv.distance}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default PropertyDetail;