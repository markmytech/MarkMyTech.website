import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Search, Lightbulb, CheckCircle } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Audit Your Workflows",
    description:
      "We analyze your current operations, identify bottlenecks, and map processes that can benefit from automation.",
    icon: Search,
  },
  {
    number: 2,
    title: "Identify Automation Opportunities",
    description:
      "We pinpoint exactly where AI can save you time, reduce errors, and improve customer experiences.",
    icon: Lightbulb,
  },
  {
    number: 3,
    title: "Recommend Tools and Vendors",
    description:
      "We provide a personalized tech stack plan with specific AI tools that match your needs and budget.",
    icon: CheckCircle,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function HowItWorks() {
  return (
    <section id="services" className="py-20 bg-light-grey">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-poppins">
            How We Help You Grow with AI
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our streamlined process helps you navigate the AI landscape without the technical complexity.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {steps.map((step) => (
            <motion.div key={step.number} variants={itemVariants}>
              <div className="bg-gray-50 rounded-lg shadow-lg h-full overflow-hidden hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
                <div className="bg-primary p-4 flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="p-8">
                  <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold mb-6">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 font-poppins">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
