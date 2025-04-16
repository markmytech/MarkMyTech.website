import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Globe, 
  Briefcase, 
  Store, 
  User,
  Building2,
  GraduationCap
} from "lucide-react";

// Categories and their respective items
const audienceCategories = [
  {
    icon: Building2,
    title: "Healthcare & Industry",
    summary: "Specialized solutions for healthcare, manufacturing and education.",
    items: [
      { emoji: "🏥", title: "Healthcare & Medical", description: "Automate patient communications and streamline record management systems." },
      { emoji: "🌽", title: "Agriculture & Food", description: "Streamline supply chain operations and inventory for farms and food producers." },
      { emoji: "🏭", title: "Manufacturing", description: "Optimize production operations and reporting for enhanced efficiency." },
      { emoji: "🔬", title: "Research & Biotech", description: "Support lab operations and data management with scalable systems." },
      { emoji: "🏫", title: "Education", description: "Automate administrative tasks for schools and educational institutions." },
      { emoji: "🧪", title: "Life Sciences", description: "Streamline research workflows and compliance documentation." },
      { emoji: "🏗️", title: "Construction", description: "Simplify project management and contractor coordination." },
      { emoji: "🚚", title: "Logistics & Transport", description: "Optimize routing, scheduling, and delivery management." }
    ]
  },
  {
    icon: User,
    title: "Entrepreneurs & Creatives",
    summary: "Independent professionals and small business owners automating their workflow.",
    items: [
      { emoji: "👩‍💻", title: "Freelancers", description: "Automate client flows, invoicing, and outreach." },
      { emoji: "👨‍🏫", title: "Tutors & Educators", description: "Lesson planning and student management." },
      { emoji: "🧘", title: "Wellness Coaches", description: "Session reminders, notes, and follow-ups." },
      { emoji: "🎭", title: "Artists & Creators", description: "Product launches, audience engagement, and CRM." },
      { emoji: "🏠", title: "Remote Workers", description: "Optimize home office workflow and communications." },
      { emoji: "📱", title: "Digital Nomads", description: "Maintain business operations while traveling." },
      { emoji: "🖋️", title: "Content Writers", description: "Streamline research, publishing, and client deliveries." },
      { emoji: "👔", title: "Solopreneurs", description: "Manage all aspects of your business with less effort." }
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
      { emoji: "🧠", title: "Agencies", description: "Project management, client updates, and reporting." },
      { emoji: "📊", title: "Accounting Firms", description: "Streamline bookkeeping and automate client communications." },
      { emoji: "🔍", title: "Market Researchers", description: "Automate data collection, analysis, and report generation." },
      { emoji: "🛡️", title: "Insurance Providers", description: "Simplify claims processing and customer service workflows." }
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
      { emoji: "💼", title: "Remote Teams", description: "Streamline communication, reporting, and file management." },
      { emoji: "🖥️", title: "Software Companies", description: "Automate testing, deployments, and customer onboarding." },
      { emoji: "🌐", title: "Web3 & Blockchain", description: "Streamline operations while maintaining decentralization." },
      { emoji: "📈", title: "Growth Marketing", description: "Automate lead generation, nurturing, and analytics." }
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
  // Start with all categories closed by default
  const [openCategories, setOpenCategories] = useState<number[]>([]);

  const toggleCategory = (index: number) => {
    const isOpening = !openCategories.includes(index);
    
    // Update state
    setOpenCategories(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
    
    // Track the interaction for analytics if we're opening a category
    if (isOpening && typeof window !== 'undefined') {
      const category = audienceCategories[index];
      const analyticsEvent = {
        category: 'audience_segments',
        action: 'segment_opened',
        label: category.title,
        attributes: {
          segment_id: index,
          segment_name: category.title
        }
      };
      
      // Use the window object to access our analytics methods
      if (window.analytics?.trackEvent) {
        window.analytics.trackEvent(analyticsEvent);
      }
    }
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
            Our AI automation consultation services are tailored for businesses across various industries.
            If your work involves repetitive tasks, we can help automate them.
          </p>
        </motion.div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {audienceCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={accordionVariants}
              className="rounded-lg overflow-hidden bg-white shadow-md"
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
                            className="bg-white rounded-lg p-4 shadow-sm hover:shadow transition-all duration-300 hover:border-l-4 hover:border-primary border border-gray-100"
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
