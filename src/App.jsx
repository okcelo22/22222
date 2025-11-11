import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Play, Sparkles, Wand2 } from "lucide-react";

import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Services from "./components/Services";
import CaseStudies from "./components/CaseStudies";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Marquee from "./components/Marquee";

const floatingBadgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

function VelocityBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[999] h-1 bg-gradient-to-r from-sky-400 via-fuchsia-500 to-amber-300"
      style={{ scaleX, transformOrigin: "left" }}
    />
  );
}

function FloatingBadge() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 160]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={floatingBadgeVariants}
      transition={{ delay: 1.2, type: "spring", stiffness: 90 }}
      style={{ y }}
      className="pointer-events-none fixed right-6 top-32 z-40 hidden max-w-[260px] lg:block"
    >
      <div className="gradient-border overflow-hidden rounded-[2rem] bg-black/40 backdrop-blur-xl">
        <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 p-6">
          <div className="glow" />
          <div className="relative z-10 space-y-3 text-sm text-slate-100">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-300">
              <Sparkles className="h-4 w-4 text-amber-300" />
              2024 Trend Report
            </div>
            <p className="text-base font-semibold text-white">
              Kreatif kampanyalarımızla markanıza parlaklık katıyoruz.
            </p>
            <p className="text-sm text-slate-300/90">
              Sosyal medya, deneyimsel pazarlama ve dijital evrende uçtan uca hikayeler inşa eden Carlos Medya ile tanışın.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function LiveMetrics() {
  const metrics = useMemo(
    () => [
      { label: "Marka Dönüşümleri", value: "x4", change: "+326%" },
      { label: "Kampanya Teslimi", value: "32", change: "Bu ay" },
      { label: "Video İzlenme", value: "12M", change: "+1.8M" },
    ],
    []
  );

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <motion.div
          className="grid gap-6 md:grid-cols-3"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/5 p-8 backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/0 to-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{metric.label}</p>
                <div className="mt-6 flex items-end justify-between">
                  <p className="text-5xl font-semibold text-white drop-shadow-[0_8px_24px_rgba(125,211,252,0.35)]">
                    {metric.value}
                  </p>
                  <span className="rounded-full bg-sky-400/20 px-3 py-1 text-xs font-semibold text-sky-200">
                    {metric.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Culture() {
  const values = [
    {
      title: "Hikaye Odaklı Strateji",
      description:
        "Her kampanya, markanızın DNA'sına göre yazdığımız etkileyici hikayelerle başlar. Duygusal bağ kuruyor, dönüşüm yaratıyoruz.",
    },
    {
      title: "İleri Teknoloji Prodüksiyon",
      description:
        "Sanal prodüksiyon, 8K sinematografi ve gerçek zamanlı render ile benzersiz görsel deneyimler yaratıyoruz.",
    },
    {
      title: "Topluluk Merkezli Yaklaşım",
      description:
        "Yaptığımız her iş, toplulukların konuşmak isteyeceği etkileşimler üretmeye odaklanır. Etkileşim, sadakat ve büyüme odaklıyız.",
    },
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-sky-300">Carlos Medya Kültürü</p>
          <h2 className="section-title mt-6">Meraklı zihinler, cesur hayaller.</h2>
          <p className="section-subtitle mx-auto">
            Stratejistlerden tasarımcılara, prodüksiyon ekibinden yaratıcı yazarlara kadar uzanan multidisipliner ekibimiz, markanızın sesini duyan ve onu küresel sahneye taşıyan deneyimler yaratır.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <motion.div
              key={value.title}
              className="card-surface group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
            >
              <div className="glow opacity-40" />
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white">
                  <Wand2 className="h-4 w-4 text-amber-300" />
                  Craft
                </div>
                <h3 className="text-2xl font-semibold text-white">{value.title}</h3>
                <p className="text-sm text-slate-200/80">{value.description}</p>
              </div>
              <motion.div
                className="absolute -bottom-6 right-6 h-20 w-20 rounded-full bg-sky-400/30 blur-2xl"
                animate={{
                  scale: [1, 1.1, 0.95, 1],
                  opacity: [0.6, 0.9, 0.6, 0.75],
                }}
                transition={{ repeat: Infinity, duration: 6 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowreelCTA() {
  return (
    <section id="showreel" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          className="card-surface relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-20"
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1600&q=80"
          >
            <source
              src="https://cdn.coverr.co/videos/coverr-aerial-shot-of-a-busy-highway-3215/1080p.mp4"
              type="video/mp4"
            />
          </video>
          <div className="glow opacity-60" />
          <div className="relative z-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-200">Showreel 2024</p>
              <h2 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
                45 saniyede Carlos Medya evreni.
              </h2>
              <p className="max-w-xl text-lg text-slate-200/80">
                TikTok canlı alışverişlerinden metaverse lansmanlarına, dinamik kampanyalarımızın nabzını bu showreel ile yakalayın. Kemerlerinizi bağlayın, bu yolculuk hızlı.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 rounded-full bg-sky-400 px-7 py-3 text-sm font-semibold text-sky-950 shadow-[0_20px_60px_-25px_rgba(56,189,248,0.6)]"
                >
                  <Play className="h-4 w-4" /> Showreeli İzle
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white"
                >
                  Projeyi Konuşalım <ArrowRight className="h-4 w-4" />
                </motion.a>
              </div>
            </div>
            <div className="relative grid place-items-center">
              <motion.div
                className="relative h-64 w-64 overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 backdrop-blur"
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{ repeat: Infinity, duration: 12 }}
              >
                <video
                  className="h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=80"
                >
                  <source
                    src="https://cdn.coverr.co/videos/coverr-futuristic-interface-4735/1080p.mp4"
                    type="video/mp4"
                  />
                </video>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function App() {
  const [cursorVariant, setCursorVariant] = useState("default");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorXSpring = useSpring(cursorX, { stiffness: 300, damping: 40, mass: 0.8 });
  const cursorYSpring = useSpring(cursorY, { stiffness: 300, damping: 40, mass: 0.8 });
  const cursorVariants = {
    default: {
      scale: 1,
      opacity: 0.35,
      backgroundColor: "rgba(56,189,248,0.15)",
    },
    explore: {
      scale: 2.2,
      opacity: 0.45,
      backgroundColor: "rgba(192,132,252,0.25)",
    },
  };

  useEffect(() => {
    const updateCursor = (event) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };
    window.addEventListener("mousemove", updateCursor);

    const handleMouseDown = () => setCursorVariant("explore");
    const handleMouseUp = () => setCursorVariant("default");
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <VelocityBar />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[98] h-8 w-full bg-gradient-to-b from-black/70 via-black/10 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[97] h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-400/40 bg-sky-400/10 shadow-[0_0_80px_rgba(56,189,248,0.25)] backdrop-blur"
        style={{ translateX: cursorXSpring, translateY: cursorYSpring }}
        variants={cursorVariants}
        animate={cursorVariant}
      />
      <Navigation setCursorVariant={setCursorVariant} />
      <main>
        <Hero setCursorVariant={setCursorVariant} />
        <Marquee />
        <LiveMetrics />
        <ShowreelCTA />
        <Services />
        <CaseStudies />
        <Culture />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingBadge />
    </div>
  );
}

export default App;
