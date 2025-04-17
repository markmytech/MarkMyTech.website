export interface TechTerm {
  term: string;
  explanation: string;
}

// Technical terminology related to AI, Automation, and Tech Consulting
export const techTerms: TechTerm[] = [
  {
    term: "AI Automation",
    explanation: "The use of artificial intelligence to automate tasks that previously required human intervention, often resulting in greater efficiency, accuracy, and cost savings."
  },
  {
    term: "Workflow Automation",
    explanation: "The process of using technology to automate and streamline repeatable business tasks, reducing manual effort and increasing efficiency."
  },
  {
    term: "API Integration",
    explanation: "Connecting different software systems via their Application Programming Interfaces (APIs) to enable data sharing and automated processes across platforms."
  },
  {
    term: "Business Process Automation",
    explanation: "Using technology to automate complex business processes, often involving multiple steps, decisions, and systems to reduce manual work and improve efficiency."
  },
  {
    term: "RPA",
    explanation: "Robotic Process Automation uses software 'robots' to perform repetitive, rule-based tasks by mimicking human interactions with digital systems, without changing existing infrastructure."
  },
  {
    term: "Machine Learning",
    explanation: "A subset of AI that enables systems to learn and improve from experience without being explicitly programmed, often used for prediction, classification, and decision-making."
  },
  {
    term: "Natural Language Processing",
    explanation: "NLP enables computers to understand, interpret, and generate human language, powering applications like chatbots, translation services, and text analysis."
  },
  {
    term: "Digital Transformation",
    explanation: "The integration of digital technology into all areas of a business, fundamentally changing how organizations operate and deliver value to customers."
  },
  {
    term: "SaaS",
    explanation: "Software as a Service is a cloud-based delivery model where applications are hosted by a provider and made available to customers over the internet on a subscription basis."
  },
  {
    term: "ROI",
    explanation: "Return On Investment measures the profitability or efficiency of an investment by comparing its return to its cost, often used to evaluate technology projects."
  },
  {
    term: "Scalability",
    explanation: "The capability of a system to handle growing amounts of work, or its potential to accommodate growth by adding resources as needed."
  },
  {
    term: "Cloud Computing",
    explanation: "The delivery of different services through the Internet, including data storage, servers, databases, networking, and software, offering faster innovation and flexible resources."
  },
  {
    term: "Data Mining",
    explanation: "The process of discovering patterns and knowledge from large amounts of data, using methods at the intersection of machine learning, statistics, and database systems."
  },
  {
    term: "ETL",
    explanation: "Extract, Transform, Load is a process used to collect data from various sources, transform it to suit operational needs, and load it into a destination database."
  },
  {
    term: "Big Data",
    explanation: "Extremely large data sets that may be analyzed computationally to reveal patterns, trends, and associations, especially relating to human behavior and interactions."
  },
  {
    term: "CRM",
    explanation: "Customer Relationship Management systems help manage customer interactions, data, and relationships throughout the customer lifecycle to improve business relationships."
  },
  {
    term: "KPI",
    explanation: "Key Performance Indicators are measurable values that demonstrate how effectively a company is achieving key business objectives, used to evaluate success at reaching targets."
  },
  {
    term: "MVP",
    explanation: "Minimum Viable Product is a version of a product with just enough features to be usable by early customers who can then provide feedback for future development."
  },
  {
    term: "Agile Methodology",
    explanation: "An approach to project management that emphasizes incremental delivery, team collaboration, continual planning, and continual learning through iterations."
  },
  {
    term: "Legacy System",
    explanation: "Outdated computing systems, programming languages, or application software that are still in use but no longer supported or maintained effectively."
  }
];

// Helper function to find a term by exact match
export function findTerm(searchTerm: string): TechTerm | undefined {
  return techTerms.find(item => 
    item.term.toLowerCase() === searchTerm.toLowerCase()
  );
}

// Helper function to find terms that contain a given string
export function findTermsContaining(searchText: string): TechTerm[] {
  const lowerSearchText = searchText.toLowerCase();
  return techTerms.filter(item => 
    item.term.toLowerCase().includes(lowerSearchText)
  );
}