import { useEffect, useRef, useState } from "react";

const MagicBento = () => {
  return (
    <section className="w-full bg-black text-white py-32">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Header */}
        <div className="mb-24">
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em]">
            Achievements & Recognition
          </h2>
        </div>

        {/* Strict Swiss Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-40">

          <SwissItem
            value={4}
            suffix="+"
            label="Projects Completed"
            description="AI-powered systems, full-stack web apps, and open-source tools — each built with architectural intent."
          />

          <SwissItem
            value={1}
            suffix="st"
            label="Prize — Innoveda"
            description="First Prize in the Innoveda research paper competition for research on Data Structures and Algorithms."
          />

          <SwissItem
            value={2}
            suffix=""
            label="Copyright Registrations"
            description="PulmoScan (AI Medical Imaging) and Save & Serve (Food Donation Platform) are copyright registered."
          />

          <SwissItem
            value={8}
            suffix=".05"
            label="CGPA / 10"
            description="Maintaining a strong academic record at PCCOE Pune, B.Tech Information Technology (2023–2027)."
          />

        </div>

        {/* Achievements list */}
        <div className="mt-40 border-t border-white/10 pt-20">
          <h3 className="font-sans text-xs font-bold uppercase tracking-[0.2em] mb-12 text-white/60">
            Recognition
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "FFE Scholar", desc: "Foundation for Excellence (FFE) scholarship recipient." },
              { title: "Innoveda — 1st Prize", desc: "Research paper competition on Data Structures & Algorithms." },
              { title: "Aavishkar Research Convention", desc: "Zonal-level participation, SPPU." },
              { title: "Microsoft Learn Student Chapter", desc: "Web Development Team Member at PCCOE chapter." },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-2 border-b border-white/10 pb-6">
                <span className="font-sans text-sm font-bold uppercase tracking-wide">{item.title}</span>
                <span className="font-sans text-sm text-white/60">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

interface SwissItemProps {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const SwissItem = ({ value, suffix, label, description }: SwissItemProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate();
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const animate = () => {
    const duration = 1200;
    const startTime = performance.now();

    const update = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  return (
    <div ref={ref} className="flex flex-col items-start">

      {/* Label */}
      <span className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-white">
        {label}
      </span>

      {/* Number */}
      <h3 className="mb-6 font-sans text-8xl md:text-9xl font-bold tracking-tight leading-none">
        {count.toLocaleString()}
        {suffix}
      </h3>

      {/* Description */}
      <p className="max-w-sm font-sans text-base leading-6 text-white/65">
        {description}
      </p>
    </div>
  );
};

export default MagicBento;
