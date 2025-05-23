import { motion } from "framer-motion";
import { User } from "lucide-react";
import { TechTerm } from "@/components/ui/tech-term";

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
    <section id="about" className="py-20 bg-light-grey">
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
            className="bg-gradient-to-br from-primary to-accent p-1 rounded-lg shadow-lg"
          >
            <div className="bg-white p-8 sm:p-10 rounded-lg">
              <p className="text-xl text-gray-700 italic mb-8">
                "We simplify <TechTerm>AI Automation</TechTerm> so business owners can focus on results. No hype, no jargon — just smart <TechTerm>Digital Transformation</TechTerm> strategy that works."
              </p>
              <div className="flex items-center">
                <div className="bg-accent h-12 w-12 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="font-medium">Founder</p>
                  <div className="flex items-center">
                    <a 
                      href="https://www.linkedin.com/in/prajjwoltimilsina/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center"
                      data-analytics="profile-link-click"
                    >
                      Prajjwol Timilsina
                      <svg className="w-4 h-4 ml-1 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  </div>
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
                At Mark My Tech, we simplify <TechTerm>AI Automation</TechTerm> for businesses of all sizes. Our goal is to help you harness the power of <TechTerm>Machine Learning</TechTerm> and <TechTerm>Workflow Automation</TechTerm> tools to save time, increase efficiency, and grow your business — without the technical jargon or confusion.
              </p>
              <p className="text-gray-600">
                We're independent advisors with no affiliation to the <TechTerm>SaaS</TechTerm> tools we recommend, ensuring you get unbiased guidance and measurable <TechTerm>ROI</TechTerm> tailored to your specific business needs.
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
