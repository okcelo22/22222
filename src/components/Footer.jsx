import { motion } from "framer-motion";

const footerLinks = [
  {
    title: "Ajans",
    items: [
      { label: "Hakkımızda", href: "#" },
      { label: "Ekip", href: "#" },
      { label: "Kariyer", href: "#" },
    ],
  },
  {
    title: "Hizmetler",
    items: [
      { label: "Prodüksiyon", href: "#services" },
      { label: "Sosyal Medya", href: "#services" },
      { label: "Deneyim Tasarımı", href: "#services" },
    ],
  },
  {
    title: "Kaynaklar",
    items: [
      { label: "Trend Raporu", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Bülten", href: "#" },
    ],
  },
];

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black/40 py-16">
      <div className="glow opacity-30" />
      <div className="container relative z-10 mx-auto grid gap-12 lg:grid-cols-[0.35fr_0.65fr]">
        <div className="space-y-6">
          <a href="#top" className="text-2xl font-semibold text-white">
            Carlos Medya
          </a>
          <p className="max-w-sm text-sm text-slate-300/80">
            İstanbul ve Londra'dan dünyaya açılan tam entegre kreatif ajans. Strateji, hikaye, teknoloji ve üretimi tek roof altında buluşturuyoruz.
          </p>
          <div className="flex gap-4 text-sm text-slate-300/80">
            <span>© {new Date().getFullYear()} Carlos Medya</span>
            <span>KVKK</span>
            <span>Çerezler</span>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {footerLinks.map((section) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300">{section.title}</p>
              <ul className="space-y-2 text-sm text-slate-200/80">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <a className="transition hover:text-white" href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
