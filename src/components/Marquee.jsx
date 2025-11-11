const marqueeItems = [
  "TikTok Live Commerce",
  "Metaverse Lansmanı",
  "Creator Network",
  "AI Storytelling",
  "Deneyimsel Pazarlama",
  "Sanal Prodüksiyon",
  "Influencer Collective",
  "XR Studio",
];

function Marquee() {
  return (
    <section className="border-y border-white/5 bg-white/5 py-6">
      <div className="container mx-auto">
        <div className="marquee">
          <div className="marquee__inner">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="rounded-full border border-white/10 bg-black/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/80"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Marquee;
