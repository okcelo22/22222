import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Mail, Phone } from "lucide-react";

function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto">
        <div className="grid gap-16 lg:grid-cols-[0.55fr_0.45fr]">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs uppercase tracking-[0.35em] text-amber-300">İletişim</p>
            <h2 className="text-4xl font-semibold text-white">Kampanyanızı birlikte tasarlayalım.</h2>
            <p className="text-sm text-slate-200/80">
              Formu doldurun; 24 saat içinde sizi tanışma toplantısı için arayalım. Takımımız, hedeflerinizi dinleyip hızlı bir fikir prototipiyle geri dönecek.
            </p>
            <div className="grid gap-4 text-sm text-slate-200/80">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-sky-300" /> hello@carlosmedya.com
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-sky-300" /> +90 212 000 00 00
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-sky-300" /> Haftalık demo oturumları: Çarşamba & Cuma
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="card-surface"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="glow" />
            <div className="relative z-10 space-y-5">
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-slate-300" htmlFor="name">
                  İsim Soyisim
                </label>
                <input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                  placeholder="Adınızı girin"
                  required
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-slate-300" htmlFor="company">
                  Marka / Şirket
                </label>
                <input
                  id="company"
                  name="company"
                  value={formState.company}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                  placeholder="Markanızı yazın"
                  required
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-slate-300" htmlFor="email">
                  E-posta
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                  placeholder="hello@marka.com"
                  required
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-slate-300" htmlFor="message">
                  Projeniz
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={4}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                  placeholder="Hedefleriniz, zaman planı, ihtiyaç duyduğunuz hizmetler..."
                  required
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="w-full rounded-full bg-gradient-to-r from-sky-400 via-fuchsia-500 to-amber-300 px-6 py-3 text-sm font-semibold text-slate-950"
              >
                {submitted ? "Talebiniz alındı!" : "Projemi Gönder"}
              </motion.button>
              {submitted && (
                <p className="text-xs text-emerald-300/80">
                  Harika! Ekibimiz 24 saat içinde sizinle iletişime geçecek.
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
