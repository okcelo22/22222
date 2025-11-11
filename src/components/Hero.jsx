import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

function Hero({ setCursorVariant }) {
  return (
    <section id="top" className="relative flex min-h-[100vh] items-center overflow-hidden pb-24 pt-40">
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
        autoPlay
        loop
        muted
        playsInline
        poster="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
      >
        <source src="https://cdn.coverr.co/videos/coverr-night-city-lights-9322/1080p.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-slate-950/70 to-slate-950" />
      <div className="container relative z-10 mx-auto grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/90">
            <Sparkles className="h-4 w-4 text-amber-300" />
            Carlos Medya 2024
          </div>
          <h1 className="text-5xl font-semibold leading-tight tracking-tight text-white drop-shadow-[0_8px_40px_rgba(59,130,246,0.35)] md:text-6xl lg:text-7xl">
            Markanızı geleceğin kültürüyle <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-fuchsia-400 to-amber-300">buluşturuyoruz.</span>
          </h1>
          <p className="max-w-2xl text-lg text-slate-200/80 md:text-xl">
            Carlos Medya, dijital, fiziksel ve sanal evrenleri harmanlayarak markalar için unutulmaz deneyimler tasarlar. Viral kampanyalar, deneyimsel etkinlikler ve ödüllü prodüksiyonlar tek çatı altında.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-sky-400 via-fuchsia-500 to-amber-300 px-8 py-3 text-sm font-semibold text-slate-950 shadow-[0_20px_80px_-30px_rgba(56,189,248,0.6)]"
              onMouseEnter={() => setCursorVariant("explore")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              Bizi Keşfet
              <ArrowRight className="h-4 w-4" />
            </motion.a>
            <motion.a
              href="#showreel"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white"
              onMouseEnter={() => setCursorVariant("explore")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              Son İşlerimizi İzle
            </motion.a>
          </div>
          <div className="grid gap-6 pt-6 md:grid-cols-3">
            {[
              { label: "Ödüllü Kampanya", value: "45+" },
              { label: "Global Marka", value: "70" },
              { label: "Topluluk Etkisi", value: "120M" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-300">{stat.label}</p>
                <p className="mt-3 text-3xl font-semibold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative"
        >
          <motion.div
            className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl"
            animate={{
              rotate: [0, 1.5, -1.5, 0],
            }}
            transition={{ repeat: Infinity, duration: 16 }}
          >
            <div className="glow" />
            <div className="relative z-10 space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-200">Günün Fikri</p>
              <h3 className="text-3xl font-semibold text-white">
                Yaratıcı fikirlerimizi gerçek zamanlı veriyle güçlendiriyoruz.
              </h3>
              <p className="text-sm text-slate-200/80">
                Sosyal dinleme algoritmalarımız, trend radarımız ve içerik laboratuvarımızla her kampanya kültürel momentleri yakalıyor.
              </p>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-300">Bugün Takımda</p>
                <div className="mt-3 grid gap-3 text-sm">
                  <div className="flex items-center justify-between text-slate-200/90">
                    <span>Metaverse Stratejisti</span>
                    <span>Derin</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-200/90">
                    <span>Sosyal Dinleme Analisti</span>
                    <span>İrem</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-200/90">
                    <span>Kreatif Yönetmen</span>
                    <span>Enes</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
