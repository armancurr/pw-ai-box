"use client";

import { Card } from "@/components/ui/card";
import * as React from "react";
import {
  Gemini,
  Replit,
  MagicUI,
  VSCodium,
  MediaWiki,
  GooglePaLM,
} from "@/components/logos";
import { motion } from "framer-motion";

export default function Integrations() {
  return (
    <section>
      <motion.div
        className="py-32"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <div className="mx-auto max-w-5xl px-6">
          <div>
            <h2 className="text-balance text-3xl font-semibold md:text-4xl">
              Integrate AI Arcade with Leading AI Platforms
            </h2>
            <p className="text-muted-foreground mt-3 text-lg">
              Enhance your university's RAG system by connecting with powerful
              AI models and development tools for superior query handling and
              student engagement.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <IntegrationCard
              title="Google Gemini"
              description="Integrate Gemini's advanced language models to power natural language understanding and generation for student academic queries."
            >
              <Gemini />
            </IntegrationCard>

            <IntegrationCard
              title="Replit"
              description="Enable collaborative coding and interactive learning environments directly within the AI Arcade for hands-on university courses."
            >
              <Replit />
            </IntegrationCard>

            <IntegrationCard
              title="Magic UI"
              description="Utilize stunning UI components to build an immersive, arcade-style interface that makes learning fun and accessible."
            >
              <MagicUI />
            </IntegrationCard>

            <IntegrationCard
              title="VSCodium"
              description="Provide students with an open-source editor integrated for real-time AI-assisted coding and debugging in academic projects."
            >
              <VSCodium />
            </IntegrationCard>

            <IntegrationCard
              title="MediaWiki"
              description="Seamlessly retrieve and update university knowledge bases from MediaWiki instances to enrich the RAG system's responses."
            >
              <MediaWiki />
            </IntegrationCard>

            <IntegrationCard
              title="Google PaLM"
              description="Harness PaLM's generative capabilities to create detailed explanations and summaries tailored to student queries."
            >
              <GooglePaLM />
            </IntegrationCard>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

const IntegrationCard = ({
  title,
  description,
  children,
  link = "https://github.com/meschacirung/cnblocks",
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  link?: string;
}) => {
  return (
    <Card variant="soft" className="p-6">
      <div className="relative">
        <div className="*:size-10">{children}</div>

        <div className="mt-6 space-y-1.5">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-muted-foreground line-clamp-2">{description}</p>
        </div>
      </div>
    </Card>
  );
};
