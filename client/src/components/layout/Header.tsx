import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Main navigation links
const mainNavLinks = [
  { text: "Home", href: "#home" },
  { text: "Services", href: "#pricing" },
  { text: "About", href: "#about" },
  { text: "FAQ", href: "#faq" },
  { text: "Contact", href: "#contact" },
];

// Sections dropdown items
const sectionsLinks = [
  { text: "How We Help", href: "#services" },
  { text: "Find Your Fit", href: "#quiz" },
  { text: "Who It's For", href: "#for-who" },
  { text: "Success Stories", href: "#testimonials" },
];

// All nav links for mobile view
const allNavLinks = [
  ...mainNavLinks,
  ...sectionsLinks
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
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-md bg-gradient-to-tr from-primary to-primary/70 flex items-center justify-center mr-2 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-3 h-3 bg-white opacity-20 rounded-full"></div>
                  <span className="text-white text-2xl font-bold">M</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold font-poppins">
                      <span className="text-primary">Mark</span>
                      <span className="text-accent">My</span>
                      <span className="text-primary">Tech</span>
                    </span>
                  </div>
                  <span className="text-[10px] md:text-xs text-gray-500 -mt-1">AI Automation Solutions</span>
                </div>
              </div>
              <span className="sr-only">Mark My Tech</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            {/* Main links */}
            {mainNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-primary text-sm xl:text-base font-medium transition-colors duration-200 px-2 py-1"
                data-analytics="nav-link"
                data-section={link.text.toLowerCase().replace(/\s+/g, '-')}
              >
                {link.text}
              </a>
            ))}
            
            {/* Sections dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-primary text-sm xl:text-base font-medium transition-colors duration-200 px-2 py-1">
                Sections <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 z-50">
                {sectionsLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <a
                      href={link.href}
                      className="w-full cursor-pointer"
                      data-analytics="nav-link"
                      data-section={link.text.toLowerCase().replace(/\s+/g, '-')}
                    >
                      {link.text}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="hidden lg:block">
            <Button asChild className="text-sm px-3 py-2 h-auto">
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
          <div className="lg:hidden flex items-center">
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
              className="lg:hidden overflow-hidden"
            >
              <div className="flex flex-col space-y-2 pb-4">
                {allNavLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="text-gray-700 hover:text-primary font-medium py-2 px-1 transition-colors duration-200 border-b border-gray-100 last:border-0"
                    data-analytics="nav-link"
                    data-section={link.text.toLowerCase().replace(/\s+/g, '-')}
                    data-mobile="true"
                  >
                    {link.text}
                  </a>
                ))}
                <div className="pt-2 mt-2 border-t border-gray-200">
                  <Button asChild className="w-full justify-center text-sm">
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
