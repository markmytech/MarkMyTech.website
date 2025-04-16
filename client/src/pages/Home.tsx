import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import WhoItsFor from "@/components/sections/WhoItsFor";
import Packages from "@/components/sections/Packages";
import About from "@/components/sections/About";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import Testimonials from "@/components/sections/Testimonials";
import RecommendationQuiz from "@/components/sections/RecommendationQuiz";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const [_, setLocation] = useLocation();

  useEffect(() => {
    // Handle hash-based navigation
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    // Handle initial hash if present
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [setLocation]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <RecommendationQuiz />
        <WhoItsFor />
        <Packages />
        <Testimonials />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
