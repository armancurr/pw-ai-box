"use client";

import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function StatsSection() {
  return (
    <section>
      <motion.div
        className="bg-muted py-12"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-foreground max-w-lg text-balance text-3xl font-semibold lg:text-4xl">
            <span className="text-muted-foreground">
              Unlock University Wisdom.
            </span>{" "}
            Game On!
          </h2>
          <p className="mt-4 text-lg">
            Powered by advanced RAG technology it delivers instant, accurate
            answers to your academic queries in a fun experience.
          </p>
          <div className="mt-8 flex gap-3">
            <Button asChild className="pr-2">
              <Link href="#">
                Start Your Query Adventure
                <ChevronRight
                  strokeWidth={2.5}
                  className="size-3.5! opacity-50"
                />
              </Link>
            </Button>
            <Button asChild variant="outline" className="pl-2.5">
              <Link href="#">
                <Calendar className="!size-3.5 opacity-50" strokeWidth={2.5} />
                Schedule Campus Demo
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
