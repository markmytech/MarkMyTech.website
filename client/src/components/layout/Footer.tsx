import { Button } from "@/components/ui/button";
import { FaLinkedin, FaFacebook } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-grey text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <a href="#home" className="flex items-center">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-md bg-gradient-to-tr from-white to-white/70 flex items-center justify-center mr-2 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-3 h-3 bg-primary opacity-20 rounded-full"></div>
                  <span className="text-primary text-2xl font-bold">M</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex">
                    <span className="text-2xl font-bold font-poppins">
                      <span className="text-white">Mark</span>
                      <span className="text-accent">My</span>
                      <span className="text-white">Tech</span>
                    </span>
                  </div>
                  <span className="text-xs text-gray-300 -mt-1">AI Automation Solutions</span>
                </div>
              </div>
            </a>
            <p className="mt-4 text-gray-200">Your Blueprint for AI-Powered Growth.</p>
            <div className="flex space-x-4 mt-4">
              <a 
                href="https://www.linkedin.com/company/markmytech/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors duration-200"
                data-analytics="social-link-click"
                data-platform="linkedin"
              >
                <FaLinkedin size={24} />
              </a>
              <a 
                href="https://www.linkedin.com/in/prajjwoltimilsina/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors duration-200"
                data-analytics="social-link-click"
                data-platform="facebook"
              >
                <FaFacebook size={24} />
              </a>
            </div>
            <p className="mt-4 text-gray-400">© {currentYear} Mark My Tech. All rights reserved.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 font-poppins">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-primary transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-400 hover:text-primary transition-colors duration-200">
                  Services
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary transition-colors duration-200">
                  How We Help
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-primary transition-colors duration-200">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-primary transition-colors duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-primary transition-colors duration-200">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-primary transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 font-poppins">Get In Touch</h3>
            <p className="text-white mb-4">
              Have questions? We're here to help you navigate the AI landscape.
            </p>
            <Button asChild variant="default">
              <a 
                href="https://calendar.app.google/MYPE1kzDMy6sDv2n6" 
                target="_blank" 
                rel="noopener noreferrer"
                data-analytics="consultation-booking"
                data-source="footer"
              >
                Book Your Free Consultation
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
