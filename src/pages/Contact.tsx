import { motion } from "framer-motion";
import { useState } from "react";

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("pb875108@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <section className="h-screen w-full bg-white text-black font-sans px-4 md:px-8 lg:px-12 overflow-hidden flex items-center justify-center relative">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-16 max-w-[1400px] w-full mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full py-2">
          <motion.div variants={itemVariants} className="mb-8 lg:mb-0">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tight text-left">
              Let's Build <br />
              Something <span className="inline-block ml-2">→</span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 lg:mt-0 hidden lg:block">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-black/60">
              Get In Touch
            </h2>
            <p className="text-base md:text-lg font-normal leading-relaxed text-black/80 max-w-md text-left">
              I'm interested in software development, full-stack engineering, and AI-powered applications. Feel free to connect about opportunities, collaborations, or interesting projects.
            </p>
          </motion.div>
        </div>

        {/* Right Column: Contact Details */}
        <motion.div className="lg:col-span-5 flex flex-col justify-center gap-8" variants={itemVariants}>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-black/50">Email</span>
            <div className="flex items-center gap-4">
              <a
                href="mailto:pb875108@gmail.com"
                className="text-xl md:text-2xl font-bold hover:opacity-60 transition-opacity duration-300"
              >
                pb875108@gmail.com
              </a>
              <button
                onClick={handleCopyEmail}
                className="group flex items-center gap-1 text-xs font-bold uppercase tracking-wider border border-black/20 px-3 py-1.5 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                title="Copy email"
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-black/10" />

          {/* LinkedIn */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-black/50">LinkedIn</span>
            <a
              href="https://www.linkedin.com/in/piyushbadgujar/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl md:text-2xl font-bold hover:opacity-60 transition-opacity duration-300 flex items-center gap-2"
            >
              /in/piyushbadgujar
              <span className="text-base">↗</span>
            </a>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-black/10" />

          {/* GitHub */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-black/50">GitHub</span>
            <a
              href="https://github.com/piyushbadgujar05"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl md:text-2xl font-bold hover:opacity-60 transition-opacity duration-300 flex items-center gap-2"
            >
              /piyushbadgujar05
              <span className="text-base">↗</span>
            </a>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-black/10" />

          {/* Location */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-black/50">Location</span>
            <p className="text-base font-medium text-black/70">Pune, Maharashtra, India</p>
          </div>

        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
