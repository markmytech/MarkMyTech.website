import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Search, Lightbulb, CheckCircle, Wrench } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Audit Your Workflows",
    description:
      "We analyze your current operations, identify bottlenecks, and map out processes that are ideal for automation.",
    icon: Search,
    emoji: "🔍"
  },
  {
    number: 2,
    title: "Identify Automation Opportunities",
    description:
      "We pinpoint where AI can deliver the most impact—saving you time, reducing manual errors, and improving overall customer experience.",
    icon: Lightbulb,
    emoji: "🚀"
  },
  {
    number: 3,
    title: "Recommend Tools and Vendors",
    description:
      "You'll receive a personalized tech stack tailored to your goals and budget, using trusted AI tools and automation platforms.",
    icon: CheckCircle,
    emoji: "🛠️"
  },
  {
    number: 4,
    title: "Ongoing Support & Maintenance",
    description:
      "We help you stay on track even after implementation with optional support services: quarterly reviews, troubleshooting assistance, AI tool updates, and discounted consultations.",
    icon: Wrench,
    emoji: "🤝"
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
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our streamlined process helps you navigate the AI landscape without the technical complexity—and we're here with you every step of the way.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {steps.map((step) => (
            <motion.div key={step.number} variants={itemVariants}>
              <div className="bg-gray-50 rounded-lg shadow-lg h-full overflow-hidden hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
                <div className="bg-primary p-4 flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3" aria-hidden="true">{step.emoji}</div>
                    <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 font-poppins">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                  {step.number === 4 && (
                    <div className="mt-4 inline-block bg-primary/10 px-3 py-1 rounded text-primary text-sm font-medium">
                      New Service ✨
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
