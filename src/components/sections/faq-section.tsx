"use client";

import { useState } from "react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { FAQ_ITEMS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

function FAQItem({ question, answer, isOpen, toggle }: { question: string; answer: string; isOpen: boolean; toggle: () => void }) {
  return (
    <div className="border-b border-border/40 last:border-b-0">
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-primary"
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-foreground">{question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
            isOpen && "rotate-180 text-primary"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-muted-foreground leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionWrapper className="bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about our products, workshops, and programs"
          badge="FAQ"
        />

        <div className="mx-auto max-w-3xl rounded-2xl border border-border/50 bg-card p-6 md:p-8 shadow-sm">
          {FAQ_ITEMS.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              toggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}