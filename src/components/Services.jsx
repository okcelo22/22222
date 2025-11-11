import { motion } from "framer-motion";
import { Camera, Globe2, Share2, Sparkles, TrendingUp } from "lucide-react";

const services = [
  {
    icon: Camera,
    title: "Next-Gen Prodüksiyon",
    description:
      "LED volume stüdyoları, drone filoları ve AI destekli post prodüksiyonla kampanyalarınıza sinematik kalite getiriyoruz.",
    tags: ["8K Sinema", "Sanal Prodüksiyon", "XR"],
  },
  {
    icon: Share2,
    title: "Sosyal Medya Evrimi",
    description:
      "TikTok, Reels, Shorts... Hepsinde markanızın hikayesini gerçek zamanlı trendlerle harmanlayarak viral içerikler üretiyoruz.",
    tags: ["Trend Radar", "Creator Network", "Live Commerce"],
  },
  {
    icon: Globe2,
    title: "Deneyimsel Kampanyalar",
    description:
      "Metaverse lansmanlarından pop-up deneyimlere, fiziksel ve dijital dünyayı birleştiren immersive brandverse projeleri kuruyoruz.",
    tags: ["Metaverse", "Phygital", "AR/VR"],
  },
  {
    icon: TrendingUp,
    title: "Veri Odaklı Strateji",
    description:
      "Derin sosyal dinleme, kültür haritaları ve yaratıcı testler ile stratejilerimizi sürekli optimize ediyoruz.",
    tags: ["Data Lab", "Growth Design", "Insight Engine"],
  },
];

function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-sky-300">Hizmetler</p>
          <h2 className="section-title mt-6">Kampanyanızın her aşamasında yanınızdayız.</h2>
          <p className="section-subtitle mx-auto">
            Yaratıcı stratejiden prodüksiyona, medya satın almadan topluluk yönetimine kadar uçtan uca çözüm sunan ajans ekosistemimizle markanızın kültüre nüfuz etmesini sağlıyoruz.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {services.map(({ icon: Icon, title, description, tags }, index) => (
            <motion.div
              key={title}
              className="card-surface group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -6 }}
            >
              <div className="glow" />
              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-sky-400/30 via-fuchsia-400/30 to-amber-200/30 text-white">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{title}</h3>
                    <p className="text-sm text-slate-300/80">{description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-sky-400/40 bg-sky-400/10 p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-xl space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-sky-200">Carlos Lab</p>
            <h3 className="text-2xl font-semibold text-white">Her hafta yeni fikirler prototipliyoruz.</h3>
            <p className="text-sm text-slate-100/80">
              Sosyal dinleme odasında çıkan bir içgörü 72 saatte kampanya konseptine dönüşüyor. Hızlı test ediyor, optimize ediyor, etkisini gerçek zamanlı ölçüyoruz.
            </p>
          </div>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900"
          >
            Demo Randevusu
            <Sparkles className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
