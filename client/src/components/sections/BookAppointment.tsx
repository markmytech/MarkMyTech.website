import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, CheckCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent, trackConversion } from "@/lib/analytics";

const GOOGLE_CALENDAR_LINK = "https://calendar.app.google/MYPE1kzDMy6sDv2n6";

// Get user's timezone
const getUserTimezone = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (error) {
    console.error("Error getting timezone:", error);
    return "Your local timezone";
  }
};

export default function BookAppointment() {
  const [isHovering, setIsHovering] = useState(false);
  const [timezone, setTimezone] = useState<string>("Detecting timezone...");
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  
  useEffect(() => {
    // Get user's timezone when component mounts
    setTimezone(getUserTimezone());
  }, []);
  
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
  
  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2
      }
    }
  };

  const handleBookAppointment = () => {
    // Track appointment booking click
    if (typeof window !== 'undefined') {
      try {
        // Open the Google Calendar link in a new tab
        window.open(GOOGLE_CALENDAR_LINK, '_blank');
        
        // Show booking confirmation
        setShowBookingConfirmation(true);
        
        // Track analytics event using our tracking function
        trackEvent({
          category: 'engagement',
          action: 'schedule_appointment',
          label: 'Google Calendar'
        });
        
        // Also track as a conversion
        trackConversion('consultation-booking', undefined, {
          source: 'booking_section',
          timezone: timezone
        });
        
        // Hide confirmation after 5 seconds
        setTimeout(() => {
          setShowBookingConfirmation(false);
        }, 5000);
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
              
              <div className="space-y-4 mb-8">
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
              
              {/* Mini testimonials */}
              <div className="border-t border-gray-100 pt-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  What others say about our consultations
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <p className="text-sm italic text-gray-600">
                      "The consultation was eye-opening! I had no idea how much of my daily work could be automated."
                    </p>
                    <p className="text-sm font-medium mt-2">
                      — Sarah T., Marketing Agency
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <p className="text-sm italic text-gray-600">
                      "Extremely valuable 30 minutes. The personalized automation roadmap was exactly what our team needed."
                    </p>
                    <p className="text-sm font-medium mt-2">
                      — Michael R., E-commerce Business
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            {/* Timezone info */}
            <div className="mb-6 flex justify-center items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4 text-primary" />
              <span>All times shown will be in your local timezone: <span className="font-medium">{timezone}</span></span>
            </div>
            
            {/* Booking Button */}
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
                <span className="flex items-center">
                  <Calendar className={`mr-2 h-5 w-5 ${isHovering ? 'animate-pulse' : ''}`} />
                  Book Your Free Consultation
                </span>
                <motion.div
                  animate={{ x: isHovering ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.div>
              </Button>
            </div>
            
            {/* Terms */}
            <p className="text-gray-500 text-sm mt-4">
              By scheduling, you agree to our terms of service and privacy policy.
            </p>
            
            {/* Booking Confirmation Message */}
            {showBookingConfirmation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-green-50 text-green-800 px-6 py-4 rounded-lg border border-green-200 flex items-center justify-center shadow-sm"
              >
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                <span>Google Calendar opened in a new tab. Complete your booking there!</span>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}