import { motion } from "framer-motion";
import { ShoppingCart, UserCheck, TrendingUp, Briefcase } from "lucide-react";

const audienceTypes = [
  {
    icon: ShoppingCart,
    title: "Ecom Brands",
    description: "Automate customer service, inventory management, and marketing tasks.",
  },
  {
    icon: UserCheck,
    title: "Coaches & Consultants",
    description: "Streamline client onboarding, content creation, and scheduling.",
  },
  {
    icon: TrendingUp,
    title: "Agencies",
    description: "Enhance project management, reporting, and creative workflows.",
  },
  {
    icon: Briefcase,
    title: "Service-Based Businesses",
    description: "Simplify scheduling, client communications, and operational tasks.",
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
    transition: { duration: 0.5 },
  },
};

export default function WhoItsFor() {
  return (
    <section className="py-20 bg-light-grey">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-poppins">
            Who It's For
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI automation consultation services are tailored for these growing businesses.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          {audienceTypes.map((type, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-50 rounded-lg p-6 text-center transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex justify-center mb-4">
                <type.icon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-poppins">
                {type.title}
              </h3>
              <p className="text-gray-600">{type.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
