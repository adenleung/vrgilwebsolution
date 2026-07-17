"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { useState } from "react";

interface FAQAccordionBlockProps {
  faqs: readonly string[][];
}

export function FAQAccordionBlock({ faqs }: FAQAccordionBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="faq-block">
      <motion.div className="faq-block-header" {...fadeUp}>
        <span><HelpCircle size={13} /> FAQ</span>
        <h2>Frequently Asked Questions</h2>
        <p>Have a question? We’ve got answers. If you do not find what you need, get in touch.</p>
      </motion.div>

      <div className="faq-card-list">
        {faqs.map(([question, answer], index) => {
          const isOpen = openIndex === index;
          return (
            <motion.article key={question} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * .05 }}>
              <button type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setOpenIndex(isOpen ? null : index)}>
                <span className="faq-card-number">{String(index + 1).padStart(2, "0")}</span>
                <strong>{question}</strong>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: .3 }}><ChevronDown size={17} /></motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div id={`faq-answer-${index}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .3 }} className="faq-card-answer">
                    <p>{answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>

      <motion.div className="faq-contact-card" {...fadeUp}>
        <MessageCircle size={24} />
        <div><h3>Still have questions?</h3><p>Tell us about your business and we’ll help you choose the right solution.</p></div>
        <a href="#contact">Contact VRGIL</a>
      </motion.div>
    </div>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: .15 },
  transition: { duration: .55 },
};
