import { motion } from "framer-motion";
import { User } from "lucide-react";

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

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-poppins">
              About Us
            </h2>
          </div>

          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-primary to-blue-600 p-1 rounded-lg shadow-lg"
          >
            <div className="bg-white p-8 sm:p-10 rounded-lg">
              <p className="text-xl text-gray-700 italic mb-8">
                "We simplify AI so business owners can focus on results. No hype, no jargon — just smart automation strategy that works."
              </p>
              <div className="flex items-center">
                <div className="bg-gray-200 h-12 w-12 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
                <div className="ml-4">
                  <p className="font-medium">Founder</p>
                  <p className="text-gray-600">Mark My Tech</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold mb-4 font-poppins">
                Our Approach
              </h3>
              <p className="text-gray-600 mb-6">
                In a world of AI hype and empty promises, we focus on practical
                solutions that deliver real business results. We're independent
                advisors with no affiliation to the tools we recommend.
              </p>
              <p className="text-gray-600">
                Our mission is to demystify AI automation for small and medium
                businesses, helping you implement only what will truly benefit
                your unique situation.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Team strategy meeting"
                className="rounded-lg shadow-lg w-full h-auto"
                width="500"
                height="350"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
