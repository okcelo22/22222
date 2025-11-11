import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Carlos Medya'nın oluşturduğu creator network sayesinde markamız 2 ayda 3 milyon yeni kullanıcı kazandı. Süreç boyunca veri odaklı yaklaşımları bize büyük güven verdi.",
    name: "Selin Ö.",
    role: "Pazarlama Direktörü, FlowFit",
  },
  {
    quote:
      "Metaverse lansmanımızı tasarlarken hem teknoloji hem de duygu tarafını bu kadar dengede tutan başka bir ekip görmedim. Tüm ekibin enerjisi benzersizdi.",
    name: "Kerem K.",
    role: "Kurucu Ortak, NeoWave",
  },
  {
    quote:
      "Carlos Medya ile çalıştığımız sürdürülebilirlik projesi, global ekiplerimizi ortak vizyonda buluşturdu. Deneyim tasarımındaki detaycılık takdire şayan.",
    name: "Merve A.",
    role: "İletişim Lideri, Gala Energy",
  },
];

const variants = {
  enter: {
    opacity: 0,
    y: 20,
  },
  center: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const testimonial = testimonials[index];

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid gap-16 lg:grid-cols-[0.65fr_0.35fr] lg:items-center">
          <motion.div
            className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/5 p-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glow opacity-60" />
            <div className="absolute -top-16 -left-12 h-40 w-40 rounded-full bg-gradient-to-br from-sky-400/40 via-fuchsia-500/40 to-amber-200/40 blur-3xl" />
            <Quote className="relative z-10 h-10 w-10 text-amber-300" />
            <div className="relative z-10 mt-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={testimonial.quote}
                  className="text-2xl font-medium leading-relaxed text-white md:text-3xl"
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {testimonial.quote}
                </motion.p>
              </AnimatePresence>
              <motion.div
                className="mt-10 flex flex-col gap-1 text-sm text-slate-200/80"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <span className="text-base font-semibold text-white">{testimonial.name}</span>
                <span>{testimonial.role}</span>
              </motion.div>
            </div>
            <div className="mt-12 flex gap-3">
              {testimonials.map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  onClick={() => setIndex(dotIndex)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === dotIndex ? "w-10 bg-white" : "w-6 bg-white/30"
                  }`}
                >
                  <span className="sr-only">{`Görüş ${dotIndex + 1}`}</span>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xs uppercase tracking-[0.35em] text-fuchsia-300">Güven</p>
            <h2 className="text-4xl font-semibold text-white">Markalar bizimle kültürün parçası oluyor.</h2>
            <p className="text-sm text-slate-200/80">
              Büyüyen topluluklar, anlamlı etkileşimler ve sürdürülebilir marka sevgisi. Carlos Medya, kreatif iş birlikleriyle markalar için uzun soluklu değer yaratır.
            </p>
            <div className="grid gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200/80">
                <p className="font-semibold text-white">Gerçek zamanlı raporlama</p>
                <p>Her kampanya için erişim, etkileşim ve dönüşüm panellerine 7/24 erişim.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200/80">
                <p className="font-semibold text-white">Global partner ağı</p>
                <p>40'tan fazla ülkede yerel içerik üreticileri ve medya ortaklarıyla entegre çalışıyoruz.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
