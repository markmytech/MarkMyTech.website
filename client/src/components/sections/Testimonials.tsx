import { useState, useEffect, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "Growth Partners",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "Mark My Tech helped us identify the perfect AI tools to automate our email marketing workflows. We've saved over 15 hours per week and improved our customer engagement rates by 40%.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "E-commerce Founder",
    company: "Urban Essentials",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "As a small business owner, I was overwhelmed by all the AI options out there. The team at Mark My Tech cut through the noise and recommended exactly what I needed to streamline inventory management.",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Operations Manager",
    company: "Bright Consulting",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    quote:
      "The personalized AI consultation saved us from making costly mistakes. Their expertise in selecting and implementing the right tools for our specific needs was invaluable.",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Business Coach",
    company: "Impact Mentoring",
    avatar: "https://randomuser.me/api/portraits/men/64.jpg",
    quote:
      "I've been able to scale my coaching business thanks to the automation tools recommended by Mark My Tech. Client onboarding is now a breeze, and I can focus on delivering value.",
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

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedTestimonials, setDisplayedTestimonials] = useState<typeof testimonials>([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Determine how many testimonials to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update displayed testimonials when screen size or index changes
  useEffect(() => {
    const count = isSmallScreen ? 1 : 2;
    let items: typeof testimonials = [];

    for (let i = 0; i < count; i++) {
      const idx = (currentIndex + i) % testimonials.length;
      items.push(testimonials[idx]);
    }

    setDisplayedTestimonials(items);
  }, [currentIndex, isSmallScreen]);

  const navigateCarousel = useCallback(
    (direction: "next" | "prev") => {
      if (direction === "next") {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      }
    },
    []
  );

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      navigateCarousel("next");
    }, 8000);

    return () => clearInterval(interval);
  }, [navigateCarousel]);

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-poppins">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from business owners and professionals who transformed their workflows with our AI automation expertise.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto px-4 md:px-0">
          <div className="hidden md:flex absolute top-1/2 -left-6 transform -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md hover:bg-gray-50"
              onClick={() => navigateCarousel("prev")}
              data-analytics="testimonial-navigation"
              data-direction="prev"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="transition-all duration-500 ease-in-out"
              >
                <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-50">
                  <CardContent className="p-8">
                    <Quote className="h-10 w-10 text-primary/40 mb-4" />
                    <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 border-2 border-primary/20">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="hidden md:flex absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md hover:bg-gray-50"
              onClick={() => navigateCarousel("next")}
              data-analytics="testimonial-navigation"
              data-direction="next"
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next</span>
            </Button>
          </div>

          {/* Mobile navigation dots */}
          <div className="flex justify-center mt-8 md:hidden">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={`h-2 w-2 mx-1 rounded-full ${
                  idx === currentIndex ? "bg-primary" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                data-analytics="testimonial-dot-navigation"
                data-index={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}