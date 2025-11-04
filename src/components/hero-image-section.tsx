"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroImageSection() {
  return (
    <section>
      <motion.div
        className="py-24"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative">
            <Image
              src="/Untitled5.png"
              alt="AI Arcade Platform"
              width={1200}
              height={600}
              className="w-full h-auto object-cover rounded-lg"
            />
            <div className="absolute top-8 left-8 z-10 max-w-lg">
              <div className="backdrop-blur-md bg-black/30 rounded-lg p-6">
                <h2 className="text-white text-xl font-semibold lg:text-2xl mb-3">
                  Transform Your Academic Journey
                </h2>
                <p className="text-white/90 text-sm leading-relaxed">
                  Experience the future of learning with AI Arcade. Get instant,
                  accurate answers to your academic questions powered by
                  cutting-edge RAG technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
