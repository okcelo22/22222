import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const cases = [
  {
    title: "NeoWave - Metaverse Moda Lansmanı",
    description:
      "Sanatçı avatarlarıyla canlı performansların, NFT koleksiyonunun ve fiziksel pop-up deneyimin eş zamanlı yürüdüğü hibrid lansman.",
    stat: "4.6M canlı izleyici",
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1400&q=80",
    palette: "from-[#38bdf8]/30 via-[#a855f7]/20 to-[#fbbf24]/20",
  },
  {
    title: "FlowFit - Sosyal Spor Devrimi",
    description:
      "TikTok creator ağı ve canlı alışveriş entegrasyonuyla 3 haftada 230K ürün satan interaktif kampanya.",
    stat: "%320 satış artışı",
    image: "https://images.unsplash.com/photo-1584367369853-8b966cf2234e?auto=format&fit=crop&w=1400&q=80",
    palette: "from-[#34d399]/30 via-[#60a5fa]/20 to-[#f472b6]/20",
  },
  {
    title: "Gala Energy - Sürdürülebilirlik Hikayesi",
    description:
      "Karma gerçeklik deneyimi ve veri görselleştirmeleriyle enerji dönüşümünü anlatan etkinlik serisi.",
    stat: "12 ülke turnesi",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    palette: "from-[#fde68a]/30 via-[#60a5fa]/20 to-[#facc15]/20",
  },
];

function CaseStudies() {
  return (
    <section id="cases" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-amber-300">Seçili Projeler</p>
            <h2 className="section-title mt-6 max-w-3xl">Kültüre dokunan projeler tasarlıyoruz.</h2>
          </div>
          <p className="max-w-xl text-sm text-slate-200/80">
            Her vaka, markanın kültürel potansiyelini ortaya çıkaran özel kurgularla hayata geçirildi. Etkinliklerimizi deneyimleyin, enerji farkını hissedin.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {cases.map((item, index) => (
            <motion.article
              key={item.title}
              className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/5"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.palette} opacity-70`} />
              <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover mix-blend-screen" />
              <div className="glow" />
              <div className="relative z-10 flex h-full flex-col justify-between p-8">
                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/70">Vaka #{index + 1}</p>
                  <h3 className="text-3xl font-semibold text-white drop-shadow-[0_8px_40px_rgba(14,165,233,0.45)]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/80">{item.description}</p>
                </div>
                <div className="mt-10 flex items-center justify-between text-sm text-white">
                  <span className="rounded-full border border-white/40 px-4 py-2 font-semibold uppercase tracking-[0.25em]">
                    {item.stat}
                  </span>
                  <motion.a
                    href="#"
                    whileHover={{ x: 4 }}
                    className="inline-flex items-center gap-2 text-sm font-semibold"
                  >
                    İncele <ArrowUpRight className="h-4 w-4" />
                  </motion.a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CaseStudies;
