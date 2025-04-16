import { motion } from "framer-motion";

// Categories and their respective items
const audienceCategories = [
  {
    title: "🌐 Online & Tech",
    items: [
      { emoji: "🛒", title: "Ecommerce Brands", description: "Automate customer support, inventory, and marketing." },
      { emoji: "📚", title: "Course Creators", description: "Manage enrollments, emails, and content delivery." },
      { emoji: "🎥", title: "Content Creators", description: "Schedule posts, automate edits, and manage engagement." },
      { emoji: "🚀", title: "Startups & SaaS", description: "Build scalable systems from day one." },
      { emoji: "💼", title: "Remote Teams", description: "Streamline communication, reporting, and file management." }
    ]
  },
  {
    title: "🧑‍💼 Professional Services",
    items: [
      { emoji: "🎓", title: "Coaches & Consultants", description: "Automate onboarding, scheduling, and content." },
      { emoji: "🧾", title: "Financial Advisors", description: "Automate invoicing, client updates, and reporting." },
      { emoji: "⚖️", title: "Law Firms", description: "Automate document generation, client intake, and reminders." },
      { emoji: "🏡", title: "Real Estate Agents", description: "Lead generation, property alerts, and scheduling." },
      { emoji: "🧠", title: "Agencies", description: "Project management, client updates, and reporting." }
    ]
  },
  {
    title: "🏪 Local & Service-Based Businesses",
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
    title: "👤 Individuals & Creatives",
    items: [
      { emoji: "👩‍💻", title: "Freelancers", description: "Automate client flows, invoicing, and outreach." },
      { emoji: "👨‍🏫", title: "Tutors & Educators", description: "Lesson planning and student management." },
      { emoji: "🧘", title: "Wellness Coaches", description: "Session reminders, notes, and follow-ups." },
      { emoji: "🎭", title: "Artists & Creators", description: "Product launches, audience engagement, and CRM." }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function WhoItsFor() {
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
            Our AI automation consultation services are tailored for these growing businesses—and more. 
            If your work involves repetitive tasks, we can help automate them.
          </p>
        </motion.div>

        <div className="space-y-12">
          {audienceCategories.map((category, catIndex) => (
            <div key={catIndex} className="mb-10">
              <motion.h3 
                className="text-2xl font-semibold mb-6 ml-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={itemVariants}
              >
                {category.title}
              </motion.h3>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={sectionVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    variants={itemVariants}
                    className="bg-white rounded-lg p-5 shadow hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-l-4 hover:border-primary"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start">
                      <span className="text-2xl mr-3 flex-shrink-0">{item.emoji}</span>
                      <div>
                        <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
