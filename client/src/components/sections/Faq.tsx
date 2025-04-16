import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqItems = [
  {
    question: "Do you build or integrate the AI tools?",
    answer:
      "No — we focus purely on strategic auditing and recommendations. We help you know what to use, not how to build it.",
  },
  {
    question: "What kind of businesses do you work with?",
    answer:
      "Mostly small and medium-sized service-based businesses, ecommerce brands, agencies, and solo founders looking to grow.",
  },
  {
    question: "Do I need to know anything about AI to work with you?",
    answer: "Nope! We keep it jargon-free and guide you every step of the way.",
  },
  {
    question: "Can you recommend people to help implement the tools?",
    answer:
      "Yes — we have a list of trusted partners and freelancers we can refer you to.",
  },
  {
    question: "How fast can I see results?",
    answer:
      "Many clients start saving time within days of implementing the tools we recommend. It depends on the complexity of your workflow.",
  },
  {
    question: "What if I'm already using some tools?",
    answer:
      "Great! We can audit and optimize what you're already doing, then fill in the gaps.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function Faq() {
  return (
    <section id="faq" className="py-20 bg-accent-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-poppins">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our AI automation services.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem value={`item-${index}`} className="bg-white rounded-lg shadow-md">
                  <AccordionTrigger className="px-6 py-4 font-medium hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
