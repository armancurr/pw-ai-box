"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Features() {
  return (
    <section>
      <motion.div
        className="bg-muted/50 py-24"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <div className="mx-auto max-w-5xl px-6">
          <div>
            <h2 className="text-foreground text-4xl font-semibold">
              Interactive Academic Assistance
            </h2>
            <p className="text-muted-foreground mb-12 mt-4 text-balance text-lg">
              Engage with university resources through AI Arcade's RAG system.
              Get instant answers to your academic questions in a gamified,
              arcade-style interface.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-16 md:grid-cols-3">
            <div className="space-y-4">
              <Card className="aspect-video overflow-hidden" variant="soft">
                <Image
                  src="/Untitled2.png"
                  alt="Academic Resource Search"
                  width={400}
                  height={225}
                  className="h-full w-full object-cover"
                />
              </Card>
              <div className="sm:max-w-sm">
                <h3 className="text-foreground text-xl font-semibold">
                  Academic Resource Search
                </h3>
                <p className="text-muted-foreground my-4 text-lg">
                  Quickly search and retrieve relevant lecture notes, textbooks,
                  and research papers from your university database.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <Card className="aspect-video overflow-hidden" variant="soft">
                <Image
                  src="/Untitled3.png"
                  alt="Personalized Study Helper"
                  width={400}
                  height={225}
                  className="h-full w-full object-cover"
                />
              </Card>
              <div className="sm:max-w-sm">
                <h3 className="text-foreground text-xl font-semibold">
                  Personalized Study Helper
                </h3>
                <p className="text-muted-foreground my-4 text-lg">
                  Receive customized explanations and step-by-step guidance for
                  your coursework and assignments.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <Card className="aspect-video overflow-hidden" variant="soft">
                <Image
                  src="/Untitled4.png"
                  alt="Interactive Q&A Challenges"
                  width={400}
                  height={225}
                  className="h-full w-full object-cover"
                />
              </Card>
              <div className="sm:max-w-sm">
                <h3 className="text-foreground text-xl font-semibold">
                  Interactive Q&A Challenges
                </h3>
                <p className="text-muted-foreground my-4 text-lg">
                  Participate in fun, game-like sessions to test your knowledge
                  and get immediate feedback on queries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
