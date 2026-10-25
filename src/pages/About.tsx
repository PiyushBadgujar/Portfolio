import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const About = () => {
  // Safe window height check for SSR
  const [vh, setVh] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800
  );

  useEffect(() => {
    const updateVh = () => setVh(window.innerHeight);
    updateVh(); // Set on mount
    window.addEventListener("resize", updateVh);
    return () => window.removeEventListener("resize", updateVh);
  }, []);

  const { scrollY } = useScroll();

  // Scroll mapping: 
  // As the user scrolls from 0 to 100vh (the Hero height), 
  // the text precisely fades in and slides up. We stagger the start/end points.

  // Section 1: Context Label
  const y1 = useTransform(scrollY, [0, vh * 0.4], [80, 0]);
  const opacity1 = useTransform(scrollY, [0, vh * 0.3], [0, 1]);

  // Section 2: Education
  const y2 = useTransform(scrollY, [vh * 0.1, vh * 0.5], [80, 0]);
  const opacity2 = useTransform(scrollY, [vh * 0.1, vh * 0.4], [0, 1]);

  // Section 3: Experience
  const y3 = useTransform(scrollY, [vh * 0.2, vh * 0.6], [80, 0]);
  const opacity3 = useTransform(scrollY, [vh * 0.2, vh * 0.5], [0, 1]);

  // Section 4: Focus
  const y4 = useTransform(scrollY, [vh * 0.3, vh * 0.7], [80, 0]);
  const opacity4 = useTransform(scrollY, [vh * 0.3, vh * 0.6], [0, 1]);

  return (
    <section className="h-screen w-full bg-white text-black font-sans px-6 md:px-12 lg:px-16 overflow-hidden flex items-center justify-center relative">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-12 w-full max-w-[1600px] mx-auto">

        {/* Left Column: Context Label & Portrait */}
        <motion.div
          className="md:col-span-4 lg:col-span-4 pt-2 flex flex-col justify-between"
          style={{ y: y1, opacity: opacity1 }}
        >
          <div>
            <h2 className="font-sans text-xs md:text-sm font-bold uppercase tracking-widest text-black/80">
              Background & Data
            </h2>
            <p className="font-sans text-[11px] text-black/40 uppercase tracking-wider mt-1 font-mono">
              Profile · PCCOE '27
            </p>

            {/* Profile Photo Card matching white background */}
            <div className="mt-6 relative w-full max-w-[250px] lg:max-w-[280px] aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-b from-neutral-50 via-neutral-100 to-neutral-200/60 border border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.04)] group">
              <img
                src="/profile-nobg.png"
                alt="Piyush Badgujar"
                className="relative z-10 w-full h-full object-contain object-bottom pt-2 scale-102 group-hover:scale-106 transition-transform duration-500 ease-out"
                style={{
                  maskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
                  filter: "contrast(1.04) brightness(0.98)",
                }}
              />

              {/* Minimalist Floating Tag */}
              <div className="absolute bottom-3 left-3 right-3 z-20 bg-white/90 backdrop-blur-md py-2 px-3 rounded-xl border border-black/5 shadow-xs flex items-center justify-between">
                <div>
                  <p className="font-sans font-bold text-xs uppercase tracking-tight text-black">Piyush Badgujar</p>
                  <p className="font-sans text-[10px] text-black/60 font-medium">Full-Stack & AI/ML</p>
                </div>
                <span className="flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700">Active</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: The Data List */}
        <div className="md:col-span-8 lg:col-span-8 flex flex-col gap-10 md:gap-12">

          {/* 01. EDUCATION */}
          <motion.div style={{ y: y2, opacity: opacity2 }} className="flex flex-col gap-2">
            <h3 className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1">
              01. Education
            </h3>
            <div className="flex flex-col">
              <p className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                Pimpri Chinchwad College of Engineering, Pune
              </p>
              <p className="font-sans text-xl md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight tracking-tight">
                B.Tech, Information Technology (2023–2027) · CGPA: 8.05/10
              </p>
            </div>
          </motion.div>

          {/* 02. EXPERIENCE */}
          <motion.div style={{ y: y3, opacity: opacity3 }} className="flex flex-col gap-2">
            <h3 className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1">
              02. Experience
            </h3>

            <div className="flex flex-col gap-6">
              {/* Job 1 */}
              <div>
                <p className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                  Intellect Turnkey Solar Energy Solutioners
                </p>
                <p className="font-sans text-xl md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight tracking-tight">
                  Software Developer Intern (Oct 2025 – Dec 2025)
                </p>
              </div>
            </div>
          </motion.div>

          {/* 03. FOCUS */}
          <motion.div style={{ y: y4, opacity: opacity4 }} className="flex flex-col gap-2">
            <h3 className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1">
              03. Focus
            </h3>
            <ul className="flex flex-col">
              <li className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                Full-Stack Development & AI/ML Systems
              </li>
              <li className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                Intelligent Software & Real-World Problem Solving
              </li>
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;