import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Showreel", href: "#showreel" },
  { label: "Hizmetler", href: "#services" },
  { label: "Projeler", href: "#cases" },
  { label: "Süreç", href: "#process" },
  { label: "İletişim", href: "#contact" },
];

function Navigation({ setCursorVariant }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-[99] transition-all duration-500 ${
        scrolled ? "py-4" : "py-6"
      }`}
      animate={{ backgroundColor: scrolled ? "rgba(9, 12, 26, 0.85)" : "rgba(9, 12, 26, 0)" }}
    >
      <div className="container mx-auto flex items-center justify-between rounded-full border border-white/5 bg-white/5 px-6 py-4 backdrop-blur-xl">
        <a
          href="#top"
          className="flex items-center gap-3 text-lg font-semibold tracking-tight text-white"
          onMouseEnter={() => setCursorVariant("explore")}
          onMouseLeave={() => setCursorVariant("default")}
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-sky-400 via-fuchsia-500 to-amber-300 text-slate-950 font-bold">
            C
          </span>
          Carlos Medya
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
              onMouseEnter={() => setCursorVariant("explore")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow-[0_20px_80px_-35px_rgba(255,255,255,1)]"
            onMouseEnter={() => setCursorVariant("explore")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            Brief Gönder
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              →
            </motion.span>
          </a>
        </div>
        <button
          className="rounded-full border border-white/10 p-2 text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto mt-3 flex flex-col gap-2 rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl lg:hidden"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-full px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-white px-4 py-3 text-center text-sm font-semibold text-slate-900"
          >
            Brief Gönder
          </a>
        </motion.nav>
      )}
    </motion.header>
  );
}

export default Navigation;
