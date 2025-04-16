import { Button } from "@/components/ui/button";
import { FaLinkedin, FaFacebook } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <a href="#home" className="text-2xl font-bold font-poppins">
              <span>Mark</span>
              <span className="text-primary">My</span>
              <span>Tech</span>
            </a>
            <p className="mt-4 text-gray-400">Your Blueprint for AI-Powered Growth.</p>
            <div className="flex space-x-4 mt-4">
              <a 
                href="https://www.linkedin.com/in/prajjwoltimilsina/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                <FaLinkedin size={24} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary transition-colors duration-200"
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
                <a href="#services" className="text-gray-400 hover:text-primary transition-colors duration-200">
                  Services
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
            <p className="text-gray-400 mb-4">
              Have questions? We're here to help you navigate the AI landscape.
            </p>
            <Button asChild variant="default">
              <a href="#contact">Book Your Free Consultation</a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
