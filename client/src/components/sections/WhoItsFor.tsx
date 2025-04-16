import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Globe, 
  Briefcase, 
  Store, 
  User,
  MapPin
} from "lucide-react";

// Categories and their respective items
const audienceCategories = [
  {
    icon: MapPin,
    title: "Minnesota Businesses",
    summary: "Tailored automation solutions for key Minnesota industries.",
    items: [
      { emoji: "🏥", title: "Healthcare & Medical", description: "Automate patient communications and record management for Minnesota clinics." },
      { emoji: "🌽", title: "Agriculture & Food", description: "Streamline supply chain and inventory for Minnesota farms and food producers." },
      { emoji: "🏭", title: "Manufacturing", description: "Optimize operations and reporting for Minnesota manufacturers." },
      { emoji: "🌲", title: "Outdoor & Tourism", description: "Manage bookings and customer engagement for Minnesota resorts and outfitters." },
      { emoji: "🏫", title: "Education", description: "Automate administrative tasks for Minnesota schools and educational institutions." },
      { emoji: "🏙️", title: "Twin Cities Retail", description: "Enhance customer experience and inventory for metro area shops." },
      { emoji: "🏪", title: "Small Town Main Street", description: "Help local Minnesota businesses compete with automated marketing." },
      { emoji: "🔬", title: "Tech & Biotech", description: "Support Minnesota's growing tech corridor with scalable systems." }
    ]
  },
  {
    icon: User,
    title: "Individuals & Creatives",
    summary: "Independent professionals automating their workflow.",
    items: [
      { emoji: "👩‍💻", title: "Freelancers", description: "Automate client flows, invoicing, and outreach." },
      { emoji: "👨‍🏫", title: "Tutors & Educators", description: "Lesson planning and student management." },
      { emoji: "🧘", title: "Wellness Coaches", description: "Session reminders, notes, and follow-ups." },
      { emoji: "🎭", title: "Artists & Creators", description: "Product launches, audience engagement, and CRM." }
    ]
  },
  {
    icon: Store,
    title: "Local & Service-Based Businesses",
    summary: "Local businesses improving operations and customer service.",
    items: [
      { emoji: "✂️", title: "Salons & Spas", description: "Schedule appointments, promotions, and reviews." },
      { emoji: "🍽️", title: "Restaurants & Cafés", description: "Reservations, online orders, and loyalty messaging." },
      { emoji: "🏋️", title: "Gyms & Studios", description: "Class bookings, renewals, and client communication." },
      { emoji: "🧹", title: "Home Services", description: "Automate bookings, quotes, and follow-ups." },
      { emoji: "🚗", title: "Auto Repair Shops", description: "Manage appointments, status texts, and offers." },
      { emoji: "🏠", title: "Interior Designers", description: "Client onboarding and project updates." },
      { emoji: "📦", title: "Retail Stores", description: "Manage inventory, receipts, and customer emails." },
      { emoji: "🩺", title: "Clinics & Wellness", description: "Automate reminders and patient flows." },
      { emoji: "🏕️", title: "Event Planners", description: "RSVPs, timelines, and vendor coordination." },
      { emoji: "🎨", title: "Photographers", description: "Booking, invoicing, and delivery workflows." },
      { emoji: "🛏️", title: "BnB Hosts", description: "Messaging, bookings, and review requests." }
    ]
  },
  {
    icon: Briefcase,
    title: "Professional Services",
    summary: "Service professionals enhancing client experience through automation.",
    items: [
      { emoji: "🎓", title: "Coaches & Consultants", description: "Automate onboarding, scheduling, and content." },
      { emoji: "🧾", title: "Financial Advisors", description: "Automate invoicing, client updates, and reporting." },
      { emoji: "⚖️", title: "Law Firms", description: "Automate document generation, client intake, and reminders." },
      { emoji: "🏡", title: "Real Estate Agents", description: "Lead generation, property alerts, and scheduling." },
      { emoji: "🧠", title: "Agencies", description: "Project management, client updates, and reporting." }
    ]
  },
  {
    icon: Globe,
    title: "Online & Tech",
    summary: "Digital businesses leveraging automation for scale and efficiency.",
    items: [
      { emoji: "🛒", title: "Ecommerce Brands", description: "Automate customer support, inventory, and marketing." },
      { emoji: "📚", title: "Course Creators", description: "Manage enrollments, emails, and content delivery." },
      { emoji: "🎥", title: "Content Creators", description: "Schedule posts, automate edits, and manage engagement." },
      { emoji: "🚀", title: "Startups & SaaS", description: "Build scalable systems from day one." },
      { emoji: "💼", title: "Remote Teams", description: "Streamline communication, reporting, and file management." }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const accordionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const contentVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { 
    opacity: 1, 
    height: "auto",
    transition: { 
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  exit: { 
    opacity: 0, 
    height: 0,
    transition: { 
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 25,
      delay: 0.1
    }
  }
};

export default function WhoItsFor() {
  // Start with the first category open by default
  const [openCategories, setOpenCategories] = useState<number[]>([0]);

  const toggleCategory = (index: number) => {
    setOpenCategories(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="for-who" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-poppins">
            Who It's For
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our AI automation consultation services are tailored for growing businesses in <span className="text-accent font-semibold">Minnesota</span> and beyond. 
            If your work involves repetitive tasks, we can help automate them.
          </p>
        </motion.div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {audienceCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={accordionVariants}
              className={`rounded-lg overflow-hidden bg-white shadow-md ${index === 0 ? 'border-l-4 border-accent' : ''}`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleCategory(index)}
                className={`w-full p-5 flex items-center justify-between text-left transition-all duration-300 ${
                  openCategories.includes(index) 
                    ? "bg-primary text-white shadow-md" 
                    : "bg-white hover:bg-gray-50 hover:shadow-sm"
                }`}
                aria-expanded={openCategories.includes(index)}
              >
                <div className="flex items-center">
                  <category.icon className={`h-6 w-6 mr-3 ${openCategories.includes(index) ? "text-white" : "text-primary"}`} />
                  <div>
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                    <p className={`text-sm mt-1 ${openCategories.includes(index) ? "text-white/90" : "text-gray-500"}`}>
                      {category.summary}
                    </p>
                  </div>
                </div>
                <ChevronDown 
                  className={`h-5 w-5 transition-transform duration-300 ${
                    openCategories.includes(index) ? "transform rotate-180 text-white" : "text-gray-500"
                  }`} 
                />
              </button>
              
              {/* Accordion Content */}
              <AnimatePresence>
                {openCategories.includes(index) && (
                  <motion.div
                    key={`content-${index}`}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={contentVariants}
                    className="overflow-hidden"
                  >
                    <div className="p-5 bg-gray-50 border-t border-gray-100">
                      <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.07
                            }
                          }
                        }}
                      >
                        {category.items.map((item, itemIndex) => (
                          <motion.div
                            key={itemIndex}
                            variants={itemVariants}
                            className={`bg-white rounded-lg p-4 shadow-sm hover:shadow transition-all duration-300 hover:border-l-4 ${
                              index === 0 
                                ? "hover:border-accent border border-gray-100" 
                                : "hover:border-primary"
                            }`}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                          >
                            <div className="flex items-start">
                              <span className="text-2xl mr-3 flex-shrink-0">{item.emoji}</span>
                              <div>
                                <h4 className="text-lg font-medium mb-1">{item.title}</h4>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
