import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 sm:pt-40 sm:pb-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 font-poppins leading-tight">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AI Automation
              </span>{" "}
              for Smarter, Faster Business Decisions
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Mark My Tech helps businesses uncover automation opportunities and recommends the right AI tools — no coding required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="shadow-lg">
                <a href="#contact">Get Your Free Consultation</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#services">View Services</a>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="AI Technology Visualization"
              className="rounded-lg shadow-xl w-full h-auto object-cover"
              width="600"
              height="400"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
