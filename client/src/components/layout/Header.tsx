import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { text: "Home", href: "#home" },
  { text: "Services", href: "#pricing" },
  { text: "How We Help", href: "#services" },
  { text: "Find Your Fit", href: "#quiz" },
  { text: "Success Stories", href: "#testimonials" },
  { text: "About", href: "#about" },
  { text: "FAQ", href: "#faq" },
  { text: "Contact", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-white/95 shadow-sm" : "bg-white/90"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <a href="#home" className="flex items-center">
              <span className="text-2xl font-bold font-poppins">
                <span className="text-primary">Mark</span>
                <span className="text-accent">My</span>
                <span className="text-primary">Tech</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
              >
                {link.text}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button asChild>
              <a 
                href="https://calendar.app.google/MYPE1kzDMy6sDv2n6" 
                target="_blank" 
                rel="noopener noreferrer"
                data-analytics="consultation-booking"
                data-source="header"
              >
                Book a Free Consultation
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col space-y-3 pb-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="text-gray-700 hover:text-primary font-medium py-2 transition-colors duration-200"
                  >
                    {link.text}
                  </a>
                ))}
                <Button asChild className="mt-2">
                  <a 
                    href="https://calendar.app.google/MYPE1kzDMy6sDv2n6" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    data-analytics="consultation-booking"
                    data-source="mobile-menu"
                  >
                    Book a Free Consultation
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
