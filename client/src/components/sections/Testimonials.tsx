import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechGrowth Inc.",
    testimonial:
      "Mark My Tech transformed our marketing automation system. Their implementation increased our lead conversion rates by 45% and saved our team countless hours of manual work.",
    image: null,
    initials: "SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CEO",
    company: "Nexus Solutions",
    testimonial:
      "The custom AI analytics dashboard that Mark My Tech built for us has been instrumental in our decision-making process. We can now spot market trends in real-time and respond quickly.",
    image: null,
    initials: "MC",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Operations Manager",
    company: "Global Logistics",
    testimonial:
      "Our supply chain efficiency improved by 30% after implementing the AI prediction model from Mark My Tech. Their solution was tailored perfectly to our unique requirements.",
    image: null,
    initials: "ER",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Handle automatic slides
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
  };

  const testimonial = testimonials[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  };

  return (
    <section 
      id="testimonials" 
      className="py-20 bg-gray-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">
            Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how our AI automation solutions have transformed businesses like yours
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden relative py-10">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={testimonial.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="w-full"
              >
                <div className="flex flex-col items-center">
                  <Card className="w-full bg-white shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-6">
                          <Avatar className="h-16 w-16 border-2 border-primary">
                            {testimonial.image ? (
                              <AvatarImage src={testimonial.image} alt={testimonial.name} />
                            ) : (
                              <AvatarFallback className="bg-primary text-white text-lg">
                                {testimonial.initials}
                              </AvatarFallback>
                            )}
                          </Avatar>
                        </div>
                        <blockquote className="text-lg italic text-gray-700 mb-6">
                          "{testimonial.testimonial}"
                        </blockquote>
                        <div>
                          <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                          <p className="text-gray-600">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center mt-6 gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="rounded-full h-10 w-10"
              aria-label="Previous testimonial"
              data-analytics="testimonial-navigation"
              data-direction="prev"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-2.5 rounded-full transition-all ${
                    currentIndex === index 
                      ? "w-8 bg-primary" 
                      : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  data-analytics="testimonial-dot-navigation"
                  data-index={index}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full h-10 w-10"
              aria-label="Next testimonial"
              data-analytics="testimonial-navigation"
              data-direction="next"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}