import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent, trackConversion } from "@/lib/analytics";

const GOOGLE_CALENDAR_LINK = "https://calendar.app.google/MYPE1kzDMy6sDv2n6";

export default function BookAppointment() {
  const [isHovering, setIsHovering] = useState(false);
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const handleBookAppointment = () => {
    // Track appointment booking click
    if (typeof window !== 'undefined') {
      try {
        // Open the Google Calendar link in a new tab
        window.open(GOOGLE_CALENDAR_LINK, '_blank');
        
        // Track analytics event using our tracking function
        trackEvent({
          category: 'engagement',
          action: 'schedule_appointment',
          label: 'Google Calendar'
        });
        
        // Also track as a conversion
        trackConversion('consultation-booking', undefined, {
          source: 'booking_section'
        });
      } catch (error) {
        console.error('Error opening calendar link:', error);
      }
    }
  };

  return (
    <section id="book-appointment" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-poppins">
              Book a Free Consultation
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ready to explore how AI automation can transform your business? Schedule a free 30-minute consultation to discuss your needs and discover the possibilities.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg p-8 mb-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 -mt-8 -mr-8 bg-primary/10 rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 -mb-6 -ml-6 bg-accent/10 rounded-full"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
                <div className="flex items-center">
                  <Calendar className="w-6 h-6 text-primary mr-2" />
                  <span className="text-gray-700 font-medium">Flexible scheduling options</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-6 h-6 text-primary mr-2" />
                  <span className="text-gray-700 font-medium">30-minute session</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">What to expect:</h3>
                <ul className="space-y-2 text-left">
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>Discuss your business challenges and automation goals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>Explore potential AI automation opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>Get personalized recommendations for your situation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">•</span>
                    <span>No obligation – just valuable insights</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div 
              className="inline-block"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Button 
                onClick={handleBookAppointment}
                className="text-lg bg-primary hover:bg-primary/90 text-white font-semibold py-6 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center"
                size="lg"
              >
                Book Your Free Consultation
                <motion.div
                  animate={{ x: isHovering ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.div>
              </Button>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              By scheduling, you agree to our terms of service and privacy policy.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}