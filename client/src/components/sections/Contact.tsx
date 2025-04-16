import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Linkedin, Facebook, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { trackEvent } from "@/lib/analytics";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing fields",
        description: "Please fill out all the fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", formData);
      
      // Track successful form submission
      trackEvent({
        category: 'contact',
        action: 'form_submit_success',
        label: 'contact_form',
        attributes: {
          form_length: formData.message.length
        }
      });
      
      // Track conversion
      if (window.analytics?.trackConversion) {
        window.analytics.trackConversion(
          'contact_form_submit',
          1,
          {
            message_topic: formData.message.substring(0, 30) + '...',
            message_length: formData.message.length
          }
        );
      }
      
      // Track funnel stage
      if (window.analytics?.trackFunnelStage) {
        window.analytics.trackFunnelStage({
          stage: 'contact_submitted',
          pageSection: 'contact',
          attributes: {
            previous_page: window.location.pathname
          }
        });
      }
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      // Track form submission error
      trackEvent({
        category: 'contact',
        action: 'form_submit_error',
        label: 'contact_form',
        attributes: {
          error: String(error).substring(0, 100)
        }
      });
      
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              <div>
                <Button 
                  type="submit" 
                  className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 text-lg shadow-lg" 
                  disabled={isSubmitting}
                  data-analytics="contact-form-submit"
                >
                  {isSubmitting ? "Sending..." : "Let's Talk"}
                </Button>
              </div>
            </form>
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
