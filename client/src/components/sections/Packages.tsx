import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const packages = [
  {
    title: "Free 30-Minute Consultation",
    price: "Free",
    description: "An introductory, no-obligation consultation where we discuss your business and explore automation opportunities.",
    features: [
      "Initial business review",
      "Identify automation potential",
      "Brief Q&A session",
      "No obligation to continue"
    ],
    buttonText: "Book Free Consultation",
    highlight: false,
  },
  {
    title: "Starter Plan",
    price: "$500",
    description: "A simplified audit of your current workflows with a focus on the most essential areas for automation.",
    features: [
      "Focused workflow assessment",
      "3 key recommendations",
      "Introductory guide on automation tools",
      "90-minute strategy call"
    ],
    buttonText: "Get Started",
    highlight: false,
  },
  {
    title: "AI Automation Blueprint",
    price: "$2,000",
    description: "A comprehensive audit of your workflows, customized tool recommendations, and an actionable roadmap for AI automation.",
    features: [
      "Complete business workflow mapping",
      "Full automation opportunity analysis",
      "Detailed tool stack recommendations",
      "Implementation roadmap",
      "ROI projections",
      "Two strategy sessions"
    ],
    buttonText: "Get Your Blueprint",
    highlight: true,
  },
  {
    title: "Ongoing Advisor",
    price: "Custom",
    description: "Monthly check-ins to optimize and scale your AI automation efforts with expert guidance.",
    features: [
      "Monthly AI strategy sessions",
      "Ongoing tool evaluation",
      "Implementation support",
      "AI technology updates",
      "Priority access to new services"
    ],
    buttonText: "Contact for Details",
    highlight: false,
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

export default function Packages() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-poppins">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the right level of AI automation guidance for your business needs.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                pkg.highlight
                  ? "transform scale-105 border-t-4 border-primary shadow-xl"
                  : ""
              }`}
            >
              {pkg.highlight && (
                <div className="bg-orange-50 py-2 text-center">
                  <span className="text-secondary font-medium">Most Popular</span>
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-2 font-poppins">
                  {pkg.title}
                </h3>
                <div className="text-4xl font-bold mb-6 text-primary">
                  {pkg.price}
                </div>
                <p className="text-gray-600 mb-6">{pkg.description}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-8 pb-8">
                <Button
                  asChild
                  variant={pkg.highlight ? "default" : "outline"}
                  className="w-full"
                >
                  <a href="#contact">{pkg.buttonText}</a>
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
