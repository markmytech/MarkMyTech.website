import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const packages = [
  {
    title: "Starter Plan",
    price: "$500",
    description: "Perfect for small businesses exploring automation.",
    features: [
      "Initial 30-min consultation",
      "Workflow audit for 1–2 processes",
      "Tool and vendor recommendations",
      "Personalized automation report",
      "Add-on: Ongoing Support & Maintenance (optional)"
    ],
    buttonText: "Get Started",
    highlight: false,
    color: "🟢"
  },
  {
    title: "Growth Plan",
    price: "$1,500",
    description: "Ideal for growing businesses ready to scale AI integration.",
    features: [
      "Full workflow audit (up to 5 processes)",
      "ROI-focused automation strategy",
      "Tool and vendor sourcing",
      "Implementation roadmap",
      "1 follow-up review session",
      "Add-on: Ongoing Support & Maintenance (discounted)"
    ],
    buttonText: "Upgrade Your Business",
    highlight: true,
    color: "🟡"
  },
  {
    title: "Custom Enterprise Plan",
    price: "Custom",
    description: "Tailored for larger organizations with complex operations.",
    features: [
      "End-to-end workflow analysis",
      "Full tech stack strategy",
      "Vendor negotiation & coordination",
      "Custom dashboards or reporting templates",
      "2+ review and optimization sessions",
      "Includes: Ongoing Support & Maintenance (3 months free)"
    ],
    buttonText: "Contact for Details",
    highlight: false,
    color: "🔵"
  }
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
    <section id="pricing" className="py-20 bg-accent-light">
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
          <p className="text-gray-600 max-w-3xl mx-auto">
            Choose the right level of AI automation guidance for your business needs and goals.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`bg-gray-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                pkg.highlight
                  ? "transform scale-105 border-t-4 border-primary shadow-xl"
                  : "hover:translate-y-[-5px]"
              }`}
            >
              {pkg.highlight && (
                <div className="bg-primary py-2 text-center">
                  <span className="text-white font-medium">Most Popular</span>
                </div>
              )}
              <div className="p-8">
                <div className="text-3xl mb-4" aria-hidden="true">
                  {pkg.color}
                </div>
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
                      <Check className="h-5 w-5 text-accent mr-2" />
                      <span className={feature.includes("Support & Maintenance") ? "font-medium text-primary flex items-center" : ""}>
                        {feature}
                        {feature.includes("Support & Maintenance") && 
                          <span className="ml-1 inline-flex items-center justify-center">
                            <span className="text-xs">🛠️</span>
                          </span>
                        }
                      </span>
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
                  <a 
                    href="https://calendar.app.google/MYPE1kzDMy6sDv2n6" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-analytics="package-cta"
                    data-package-type={pkg.title}
                  >
                    {pkg.buttonText}
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
