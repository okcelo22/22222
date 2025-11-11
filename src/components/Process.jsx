import { motion } from "framer-motion";
import { Compass, Lightbulb, Rocket, Workflow } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    title: "Discovery Sprint",
    description:
      "Kültür haritaları, trend analizleri ve topluluk dinleme seanslarıyla markanızın bugünkü ve gelecekteki potansiyelini ortaya çıkarıyoruz.",
  },
  {
    icon: Workflow,
    title: "Creative Lab",
    description:
      "Yaratıcı odaklı workshop'larla hikayenizi formatlara döküyoruz. Moodboard'lardan animatiklere hızlı prototipler üretiyoruz.",
  },
  {
    icon: Compass,
    title: "Experience Design",
    description:
      "İçerik planlarından deneyimsel yolculuğa kadar, çok kanallı temas noktalarını veriye dayalı şekilde kurguluyoruz.",
  },
  {
    icon: Rocket,
    title: "Launch & Amplify",
    description:
      "Gerçek zamanlı optimizasyon, creator ağları ve medya entegrasyonu ile hikayenizi sürekli güncel tutuyoruz.",
  },
];

function Process() {
  return (
    <section id="process" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-fuchsia-300">Yolculuğumuz</p>
          <h2 className="section-title mt-6">İlhamdan aktivasyona kadar yan yanayız.</h2>
          <p className="section-subtitle mx-auto">
            Carlos Medya süreçleri, hızlı teslimat için çevik çalışma biçimleriyle tasarlandı. Her adımda şeffaf raporlama, sürekli öğrenme ve ortak üretim var.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="card-surface h-full">
                <div className="glow" />
                <div className="relative z-10 space-y-5">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm uppercase tracking-[0.35em] text-slate-400">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="text-xl font-semibold text-white">{title}</h3>
                  </div>
                  <p className="text-sm text-slate-200/80">{description}</p>
                </div>
              </div>
              {index !== steps.length - 1 && (
                <motion.span
                  className="absolute right-0 top-1/2 hidden h-px w-16 -translate-y-1/2 bg-gradient-to-r from-white/10 to-white/40 lg:block"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;
