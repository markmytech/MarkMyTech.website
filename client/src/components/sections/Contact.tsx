import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Linkedin, Facebook, Mail, Clock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

export default function Contact() {
  const [isFormLoading, setIsFormLoading] = useState(true);
  
  // Track when the Google Form is displayed to the user
  useEffect(() => {
    trackEvent({
      category: 'contact',
      action: 'google_form_view',
      label: 'contact_form'
    });
    
    // Track funnel stage
    if (window.analytics?.trackFunnelStage) {
      window.analytics.trackFunnelStage({
        stage: 'contact_form_view',
        pageSection: 'contact',
        attributes: {
          form_type: 'google_form'
        }
      });
    }
    
    // Set a timeout in case the form takes too long to load
    const timeout = setTimeout(() => {
      setIsFormLoading(false);
    }, 8000);
    
    return () => clearTimeout(timeout);
  }, []);

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

  return (
    <section id="contact" className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-poppins">
            Contact Us
          </h2>
          <p className="text-white max-w-2xl mx-auto">
            Ready to transform your business with AI automation? Let's talk about your needs.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="bg-white p-1 rounded-lg shadow-lg">
            <div 
              className="w-full bg-white rounded-lg overflow-hidden"
              style={{ height: '780px', boxShadow: 'inset 0 0 8px rgba(0,0,0,0.05)' }} 
              data-analytics="google-form-container"
            >
              {isFormLoading && (
                <div className="flex flex-col items-center justify-center h-full bg-white">
                  <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
                  <p className="text-gray-600 text-lg">Loading form...</p>
                  <p className="text-gray-500 text-sm mt-2">Please wait while we prepare the contact form</p>
                </div>
              )}
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSeHnEhEXLjnvUh7R9oCrtoJ-l40YVf7aRx-EEERaPTF1mfyDw/viewform?embedded=true&usp=pp_url&entry.1191745004="
                width="100%" 
                height="100%" 
                frameBorder="0" 
                marginHeight={0} 
                marginWidth={0}
                title="Contact Form"
                style={{ 
                  display: 'block',
                  border: 'none',
                  backgroundColor: 'white', 
                  transformOrigin: '0 0',
                  transform: 'scale(0.98)',
                  marginTop: '-15px',
                  marginBottom: '-20px',
                  borderRadius: '0.5rem',
                  transition: 'opacity 0.3s ease-in-out',
                  boxShadow: 'none',
                  opacity: isFormLoading ? 0 : 1
                }}
                onLoad={() => {
                  setIsFormLoading(false);
                  trackEvent({
                    category: 'contact',
                    action: 'google_form_loaded',
                    label: 'contact_form'
                  });
                }}
              >
                Loading form...
              </iframe>
            </div>
            <div className="text-center mt-4 p-2">
              <p className="text-xs text-white">
                Form powered by Google Forms
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:pl-8">
            <Card className="bg-white shadow-md">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4 font-poppins">
                  Connect With Us
                </h3>
                <p className="text-gray-600 mb-6">
                  Follow us on social media to stay updated with the latest AI automation trends and insights.
                </p>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="text-lg font-medium mb-2 font-poppins">
                      Book a Consultation
                    </h4>
                    <div className="flex items-center space-x-2 text-gray-600 mb-4">
                      <Calendar className="h-4 w-4 text-primary" />
                      <a 
                        href="https://calendar.app.google/MYPE1kzDMy6sDv2n6" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                        data-analytics="calendar-booking-click"
                      >
                        Schedule a Call
                      </a>
                    </div>
                    <Button 
                      asChild 
                      className="w-full bg-accent hover:bg-accent/90 text-white"
                      data-analytics="calendar-booking-button"
                    >
                      <a 
                        href="https://calendar.app.google/MYPE1kzDMy6sDv2n6" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Book Your Free Consultation
                      </a>
                    </Button>
                  </div>
                
                  <div>
                    <h4 className="text-lg font-medium mb-4 font-poppins">
                      Social Media
                    </h4>
                    <div className="flex space-x-4">
                      <Button asChild variant="outline" size="icon" className="rounded-full hover:bg-primary/10">
                        <a 
                          href="https://www.linkedin.com/company/markmytech/" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          aria-label="LinkedIn Company Page"
                          data-analytics="social-link-click"
                          data-platform="linkedin"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="icon" className="rounded-full hover:bg-primary/10">
                        <a 
                          href="https://www.linkedin.com/in/prajjwoltimilsina/" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          aria-label="LinkedIn Profile"
                          data-analytics="social-link-click"
                          data-platform="linkedin-profile"
                        >
                          <div className="flex items-center justify-center h-5 w-5">
                            <span className="text-sm font-bold">in</span>
                          </div>
                        </a>
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium mb-2 font-poppins">
                      Email Us
                    </h4>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail className="h-4 w-4 text-primary" />
                      <a 
                        href="mailto:praj@markmytech.com" 
                        className="text-primary hover:underline"
                        data-analytics="email-link-click"
                      >
                        praj@markmytech.com
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium mb-2 font-poppins">
                      Office Hours
                    </h4>
                    <div className="flex items-start space-x-2 text-gray-600">
                      <Clock className="h-4 w-4 text-primary mt-1" />
                      <p className="text-sm">
                        Monday - Friday: 9am - 5pm<br />
                        Weekend: By appointment only
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
