import type { CourseWithCategory } from "@/lib/courses";
import type { CourseContent } from "@/lib/course-content.types";

export interface CourseHighlightItem {
  id: string;
  iconName: "clock" | "barChart" | "award" | "laptop";
  label: string;
  value: string;
  subtext?: string;
}

export interface CurriculumModule {
  index: string;
  title: string;
  code?: string;
  description?: string;
  topics?: string[];
}

export interface CareerRole {
  title: string;
  description?: string;
}

export interface AudienceItem {
  title: string;
  description: string;
}

export interface WhyChooseFeature {
  title: string;
  description: string;
  iconName: "book" | "users" | "laptop" | "award" | "target" | "building";
}

/**
 * Derives a clean, structured course level based on title, duration, or category.
 */
export function deriveCourseLevel(course: CourseWithCategory): string {
  const title = course.titleEn.toLowerCase();
  const dur = (course.durationText ?? "").toLowerCase();

  if (title.includes("master") || title.includes("pgdca") || title.includes("full stack") || dur.includes("12 month") || dur.includes("1 year")) {
    return "Intermediate to Advanced";
  }
  if (title.includes("advanced") || title.includes("adse") || title.includes("diploma") || dur.includes("6 month")) {
    return "Beginner to Advanced";
  }
  if (title.includes("crash") || title.includes("basic") || dur.includes("1 month")) {
    return "Beginner Level";
  }
  return "All Levels (Beginner Friendly)";
}

/**
 * Returns structured highlights for the course header strip.
 */
export function getCourseHighlights(
  course: CourseWithCategory,
  locale: string = "en"
): CourseHighlightItem[] {
  const isMl = locale === "ml";
  const duration = course.durationText || (isMl ? "3-6 മാസം" : "3–6 Months");
  const level = isMl ? (deriveCourseLevel(course).includes("Advanced") ? "തുടക്കക്കാർ മുതൽ അഡ്വാൻസ്ഡ് വരെ" : "തുടക്കക്കാർക്കായി") : deriveCourseLevel(course);
  
  const certs = course.certifications && course.certifications.length > 0
    ? course.certifications.join(" & ")
    : "G-TEC Certified";

  return [
    {
      id: "duration",
      iconName: "clock",
      label: isMl ? "കാലാവധി" : "Course Duration",
      value: duration,
      subtext: isMl ? "ഫ്ലെക്സിബിൾ ബാച്ചുകൾ" : "Flexible Batch Timings",
    },
    {
      id: "level",
      iconName: "barChart",
      label: isMl ? "ലെവൽ" : "Course Level",
      value: level,
      subtext: isMl ? "പ്രായോഗിക പരിശീലനം" : "Practical Lab Oriented",
    },
    {
      id: "mode",
      iconName: "laptop",
      label: isMl ? "പഠന രീതി" : "Training Mode",
      value: isMl ? "ക്ലാസ്സ്റൂം & ലാബ്" : "Classroom & Hands-on Lab",
      subtext: isMl ? "100% പ്രായോഗികം" : "100% Practical Sessions",
    },
    {
      id: "certificate",
      iconName: "award",
      label: isMl ? "സർട്ടിഫിക്കേഷൻ" : "Certification",
      value: certs,
      subtext: isMl ? "അന്താരാഷ്ട്ര അംഗീകാരം" : "Globally Recognized",
    },
  ];
}

/**
 * Extracts key learning outcomes ("What You'll Learn") from contentBlocks or generates them.
 */
export function getWhatYoullLearn(
  course: CourseWithCategory,
  contentBlocks: CourseContent | null,
  locale: string = "en"
): string[] {
  const isMl = locale === "ml";

  // 1. If benefits are specified in contentBlocks, use them
  if (contentBlocks?.benefits?.items && contentBlocks.benefits.items.length > 0) {
    return contentBlocks.benefits.items.map((b) =>
      isMl && b.textMl ? b.textMl : b.textEn
    );
  }

  // 2. If courseLists are defined, use list item names
  if (contentBlocks?.courseLists && contentBlocks.courseLists.length > 0) {
    const listItems = contentBlocks.courseLists.flatMap((l) => l.items.map((i) => i.name));
    if (listItems.length >= 4) {
      return listItems.slice(0, 10);
    }
  }

  // 3. Fallback domain-specific learning outcomes based on course category & title
  const title = course.titleEn.toLowerCase();
  const cat = (course.category?.nameEn ?? "").toLowerCase();

  if (title.includes("tally") || title.includes("account") || cat.includes("account") || title.includes("gst")) {
    return isMl
      ? [
          "അക്കൗണ്ടിംഗ് അടിസ്ഥാന തത്വങ്ങളും ജേണൽ എൻട്രികളും",
          "ടാലി പ്രൈം ഇൻസ്റ്റാളേഷനും കമ്പനി ക്രിയേഷനും",
          "ജിഎസ്ടി കണക്കുകൂട്ടലുകളും ഇ-വേ ബിൽ തയ്യാറാക്കലും",
          "പർച്ചേസ്, സെയിൽസ്, ഇൻവെന്ററി മാനേജ്‌മെന്റ്",
          "പേറോൾ മാനേജ്‌മെന്റും സാലറി സ്ലിപ്പ് നിർമ്മാണവും",
          "ബാങ്ക് റീകൺസിലിയേഷൻ & കാഷ് ഫ്ലോ സ്റ്റേറ്റ്‌മെന്റുകൾ",
          "പ്രോഫിറ്റ് & ലോസ് അക്കൗണ്ട്, ബാലൻസ് ഷീറ്റ് വിശകലനം",
          "എംഐഎസ് (MIS) റിപ്പോർട്ടിംഗും ഓഡിറ്റ് തയ്യാറെടുപ്പുകളും",
        ]
      : [
          "Double-entry bookkeeping and accounting fundamentals",
          "Tally Prime company setup, ledger & voucher management",
          "GST computation, e-invoicing & e-way bill generation",
          "Inventory, stock valuation & purchase/sales order processing",
          "Payroll management, PF, ESI & salary processing",
          "Bank reconciliation & financial cash flow statements",
          "Finalization of accounts, P&L statements & Balance Sheet",
          "Management Information System (MIS) & financial reporting",
        ];
  }

  if (title.includes("python") || title.includes("data") || title.includes("ai")) {
    return isMl
      ? [
          "പൈത്തൺ സിന്റാക്സ്, ഡാറ്റാ ടൈപ്പുകൾ, ഓപ്പറേറ്ററുകൾ",
          "ഡാറ്റാ സ്ട്രക്ചറുകൾ (ലിസ്റ്റുകൾ, ട്യൂപ്പിളുകൾ, ഡിക്ഷണറികൾ)",
          "ഒബ്ജക്റ്റ് ഓറിയന്റഡ് പ്രോഗ്രാമിംഗ് (OOP) രീതികൾ",
          "ഫയൽ ഹാൻഡ്‌ലിംഗും എറർ മാനേജ്‌മെന്റും",
          "NumPy, Pandas ഉപയോഗിച്ചുള്ള ഡാറ്റാ വിശകലനം",
          "യഥാർത്ഥ പ്രോജക്ടുകളുടെ നിർമ്മാണവും കോഡിംഗും",
        ]
      : [
          "Core Python syntax, control flow, functions & modules",
          "Data structures: Lists, Dictionaries, Sets & Tuples",
          "Object-Oriented Programming (OOP) principles and design",
          "File I/O operations, exceptions & debugging workflows",
          "Data manipulation with NumPy and Pandas libraries",
          "API consumption, JSON handling & automation scripts",
          "Building real-world portfolio projects and applications",
          "Industry standard coding practices & Git version control",
        ];
  }

  if (title.includes("web") || title.includes("full stack") || title.includes("react") || title.includes("frontend")) {
    return isMl
      ? [
          "HTML5, സിഎസ്എസ്3 സെമാന്റിക് ഘടനകൾ",
          "റസ്പോൺസീവ് വെബ് ഡിസൈനും ഫ്ലെക്സ്ബോക്സ്/ഗ്രിഡും",
          "മോഡേൺ ജാവാസ്ക്രിപ്റ്റും (ES6+) DOM മാനിപുലേഷനും",
          "റിയാക്റ്റ് (React.js) കോംപോണന്റുകളും സ്റ്റേറ്റ് മാനേജ്‌മെന്റും",
          "ബാക്ക് എൻഡ് API ഇന്റഗ്രേഷനും ഡാറ്റാബേസ് കണക്ഷനും",
          "ലൈവ് വെബ്‌സൈറ്റ് ഡിപ്ലോയ്മെന്റും ഹോസ്റ്റിംഗും",
        ]
      : [
          "Semantic HTML5 structure and modern CSS3 layout systems",
          "Responsive mobile-first web design with Flexbox & Grid",
          "Modern JavaScript (ES6+), async programming & DOM APIs",
          "Component architecture, hooks & state management in React",
          "Backend REST API development & database connectivity",
          "Authentication, security best practices & form validation",
          "Git, GitHub version control & deployment to cloud platforms",
          "Building complete full-stack portfolio web applications",
        ];
  }

  if (title.includes("graphic") || title.includes("design") || title.includes("multimedia") || cat.includes("multimedia")) {
    return isMl
      ? [
          "ഡിജിറ്റൽ ഡിസൈൻ തത്വങ്ങളും കളർ തിയറിയും",
          "അഡോബ് ഫോട്ടോഷോപ്പ് ഇമേജ് എഡിറ്റിംഗും റീടച്ചിംഗും",
          "അഡോബ് ഇല്ലസ്ട്രേറ്റർ വെക്റ്റർ ഗ്രാഫിക്സും ലോഗോ ഡിസൈനും",
          "ഇൻഡിസൈൻ ലേഔട്ട് ഡിസൈനും പ്രിന്റ് പ്രൊഡക്ഷനും",
          "സോഷ്യൽ മീഡിയ പോസ്റ്ററുകളും പരസ്യ ഡിസൈനുകളും",
          "പോർട്ട്ഫോളിയോ നിർമ്മാണവും ക്ലയന്റ് പ്രോജക്ടുകളും",
        ]
      : [
          "Design fundamentals, visual hierarchy, typography & color theory",
          "Raster image editing, photo manipulation & retouching in Photoshop",
          "Vector graphics, branding & logo illustration in Illustrator",
          "Page layout design for brochures & magazines in InDesign",
          "Social media creative design and digital advertising banners",
          "Print preparation, export standards and color separations",
          "Industry-standard creative portfolio development",
        ];
  }

  if (title.includes("network") || title.includes("hardware") || cat.includes("hardware")) {
    return isMl
      ? [
          "കമ്പ്യൂട്ടർ ഹാർഡ്‌വെയർ അസംബ്ലിംഗും ട്രബിൾഷൂട്ടിംഗും",
          "നെറ്റ്‌വർക്കിംഗ് അടിസ്ഥാനങ്ങളും TCP/IP പ്രോട്ടോക്കോളുകളും",
          "റൂട്ടർ, സ്വിച്ച് കോൺഫിഗറേഷൻ & LAN/WAN സെറ്റപ്പ്",
          "വിൻഡോസ്, ലിനക്സ് സെർവർ അഡ്മിനിസ്ട്രേഷൻ",
          "നെറ്റ്‌വർക്ക് സുരക്ഷയും ഫയർവാൾ മാനേജ്‌മെന്റും",
          "പ്രായോഗിക ലാബ് പരിശീലനവും സിസ്റ്റം മെയിന്റനൻസും",
        ]
      : [
          "Computer hardware architecture, assembly & diagnostics",
          "Networking fundamentals, OSI model & TCP/IP protocols",
          "LAN/WAN configuration, IP addressing & subnetting",
          "Router, switch setup & wireless network administration",
          "Windows & Linux operating system installation and maintenance",
          "Network security principles, firewall setup & access control",
          "Hardware troubleshooting & hands-on lab infrastructure setup",
        ];
  }

  // General IT / foundational course outcomes
  return isMl
    ? [
        "കമ്പ്യൂട്ടർ ആപ്ലിക്കേഷനുകളുടെ സമഗ്രമായ പ്രായോഗിക പരിശീലനം",
        "ഓഫീസ് ഓട്ടോമേഷൻ ടൂളുകളിലുള്ള പ്രാവീണ്യം (MS Word, Excel, PowerPoint)",
        "ഡാറ്റാ മാനേജ്‌മെന്റും ഇൻഫർമേഷൻ പ്രോസസ്സിംഗും",
        "ഇന്റർനെറ്റ് അധിഷ്ഠിത സേവനങ്ങളും സുരക്ഷിതമായ കമ്പ്യൂട്ടിംഗും",
        "വ്യവസായ ആവശ്യങ്ങൾക്കനുസൃതമായ പ്രായോഗിക പ്രോജക്ടുകൾ",
        "തൊഴിൽ സാധ്യത വർദ്ധിപ്പിക്കുന്ന അന്താരാഷ്ട്ര സർട്ടിഫിക്കേഷൻ",
      ]
    : [
        "Comprehensive hands-on training in computer fundamentals & tools",
        "Mastery of office productivity suites (Word, Excel, PowerPoint)",
        "Database concepts, structured data entry & reporting",
        "Internet communication, cloud tools & cyber security awareness",
        "Industry-relevant practical lab assignments and exercises",
        "Direct preparation for global certification exams & career interviews",
      ];
}

/**
 * Returns structured curriculum modules for the course timeline/accordion.
 */
export function getCurriculumModules(
  course: CourseWithCategory,
  contentBlocks: CourseContent | null,
  locale: string = "en"
): CurriculumModule[] {
  const isMl = locale === "ml";

  // 1. If courseLists are defined in contentBlocks, convert them into modules
  if (contentBlocks?.courseLists && contentBlocks.courseLists.length > 0) {
    return contentBlocks.courseLists.map((list, idx) => ({
      index: String(idx + 1).padStart(2, "0"),
      title: list.heading || (isMl ? `മൊഡ്യൂൾ ${idx + 1}` : `Module ${idx + 1}`),
      topics: list.items.map((item) => `${item.code ? `[${item.code}] ` : ""}${item.name}`),
    }));
  }

  // 2. Derive structured curriculum based on topic
  const title = course.titleEn.toLowerCase();
  const cat = (course.category?.nameEn ?? "").toLowerCase();

  if (title.includes("tally") || title.includes("account") || cat.includes("accounting")) {
    return [
      {
        index: "01",
        title: isMl ? "അക്കൗണ്ടിംഗ് തത്വങ്ങളും ജേണലൈസിംഗും" : "Accounting Fundamentals & Principles",
        description: isMl ? "ഡബിൾ എൻട്രി സിസ്റ്റം, ലെഡ്ജർ അക്കൗണ്ടുകൾ, ട്രയൽ ബാലൻസ്" : "Double-entry bookkeeping, ledger accounts, trial balance, and debit/credit rules.",
        topics: [
          "Basics of Accounting & Financial Terminology",
          "Types of Accounts & Golden Rules of Accounting",
          "Journalising Transactions & Ledger Posting",
          "Trial Balance Preparation & Error Rectification",
        ],
      },
      {
        index: "02",
        title: isMl ? "ടാലി പ്രൈം കോർ കോൺഫിഗറേഷൻ" : "Tally Prime Setup & Company Management",
        description: isMl ? "കമ്പനി ക്രിയേഷൻ, ചാർട്ട് ഓഫ് അക്കൗണ്ട്സ്, വൗച്ചർ എൻട്രികൾ" : "Company setup, groups, ledgers, and standard transaction vouchers.",
        topics: [
          "Creating & Altering Companies in Tally Prime",
          "Chart of Accounts & Ledger Classification",
          "Voucher Types: Payment, Receipt, Journal, Contra",
          "Day Book & Financial Summary Verification",
        ],
      },
      {
        index: "03",
        title: isMl ? "ഇൻവെന്ററി & സ്റ്റോക്ക് മാനേജ്‌മെന്റ്" : "Inventory & Stock Management",
        description: isMl ? "സ്റ്റോക്ക് ഗ്രൂപ്പുകൾ, യൂണിറ്റ്സ് ഓഫ് മെഷർ, പർച്ചേസ്/സെയിൽസ് ഇൻവോയ്സുകൾ" : "Stock categories, multi-godown storage, purchase and sales orders.",
        topics: [
          "Stock Groups, Categories & Units of Measure",
          "Purchase & Sales Invoicing with Item Details",
          "Godown / Warehouse Transfer Management",
          "Reorder Levels & Stock Ageing Analysis",
        ],
      },
      {
        index: "04",
        title: isMl ? "ജിഎസ്ടി & ടാക്സേഷൻ (GST Compliance)" : "GST & Statutory Taxation",
        description: isMl ? "CGST, SGST, IGST കണക്കുകൂട്ടലുകൾ, ഇ-വേ ബിൽ, റിട്ടേൺസ്" : "CGST, SGST, IGST calculations, e-invoicing, and GSTR reporting.",
        topics: [
          "GST Registration & Tax Rate Configuration (HSN/SAC)",
          "Intra-State vs Inter-State Invoicing",
          "E-Way Bill Generation & E-Invoicing Workflows",
          "GST Returns (GSTR-1, GSTR-3B) Preparation & Reconciliation",
        ],
      },
      {
        index: "05",
        title: isMl ? "പേറോൾ & ബാങ്കിംഗ് ഇടപാടുകൾ" : "Payroll Management & Banking",
        description: isMl ? "ജീവനക്കാരുടെ ശമ്പളം, PF, ESI, ബാങ്ക് റീകൺസിലിയേഷൻ" : "Employee salary structure, PF/ESI deductions, and automated BRS.",
        topics: [
          "Employee Profiles, Attendance & Pay Heads Setup",
          "Salary Processing & Pay Slip Generation",
          "Bank Reconciliation Statements (BRS)",
          "Cheque Management & Digital Payment Recording",
        ],
      },
      {
        index: "06",
        title: isMl ? "ഫൈനൽ അക്കൗണ്ട്സ് & എംഐഎസ് റിപ്പോർട്ടിംഗ്" : "Final Accounts & MIS Reporting",
        description: isMl ? "പ്രോഫിറ്റ് & ലോസ്, ബാലൻസ് ഷീറ്റ്, മാനേജ്‌മെന്റ് റിപ്പോർട്ടുകൾ" : "Profit & Loss, Balance Sheet analysis, ratio analysis, and export.",
        topics: [
          "Trading & Profit and Loss Account Finalization",
          "Balance Sheet Structuring & Analysis",
          "MIS Reports & Comparative Financial Statements",
          "Data Backup, Security Controls & Audit Trails",
        ],
      },
    ];
  }

  if (title.includes("python") || title.includes("data") || title.includes("ai")) {
    return [
      {
        index: "01",
        title: isMl ? "പൈത്തൺ പ്രോഗ്രാമിംഗ് അടിസ്ഥാനങ്ങൾ" : "Python Programming Fundamentals",
        description: isMl ? "ഡാറ്റാ ടൈപ്പുകൾ, ഓപ്പറേറ്ററുകൾ, കൺട്രോൾ ഫ്ലോ" : "Syntax, primitive types, loops, conditional statements and functions.",
        topics: [
          "Python Environment Setup (IDE & Terminal)",
          "Variables, Data Types & Type Conversion",
          "Conditional Logic (if/elif/else) & Loops (for/while)",
          "Function Definitions, Scope & Lambda Functions",
        ],
      },
      {
        index: "02",
        title: isMl ? "ഡാറ്റാ സ്ട്രക്ചറുകളും ഫയൽ ഹാൻഡ്‌ലിംഗും" : "Data Structures & File Operations",
        description: isMl ? "ലിസ്റ്റുകൾ, ഡിക്ഷണറികൾ, ഫയൽ റീഡിംഗ്/റൈറ്റിംഗ്" : "Working with built-in data collections and structured data files.",
        topics: [
          "Lists, Tuples, Sets & Dictionary Comprehensions",
          "String Manipulation & Regular Expressions",
          "Reading & Writing Text, CSV and JSON Files",
          "Exception Handling & Robust Debugging",
        ],
      },
      {
        index: "03",
        title: isMl ? "ഒബ്ജക്റ്റ് ഓറിയന്റഡ് പ്രോഗ്രാമിംഗ് (OOP)" : "Object-Oriented Programming (OOP)",
        description: isMl ? "ക്ലാസുകൾ, ഒബ്‌ജക്റ്റുകൾ, ഇൻഹെറിറ്റൻസ്, പോളിമോർഫിസം" : "Classes, objects, encapsulation, inheritance, and modular design.",
        topics: [
          "Classes, Attributes, Methods & Constructors",
          "Inheritance, Polymorphism & Encapsulation",
          "Modules, Packages & Virtual Environments",
          "Standard Library Utilities & Best Practices",
        ],
      },
      {
        index: "04",
        title: isMl ? "ഡാറ്റാ അനാലിസിസ് & ലൈബ്രറികൾ" : "Data Analysis & Popular Libraries",
        description: isMl ? "NumPy, Pandas, Matplotlib ഉപയോഗിച്ചുള്ള ഡാറ്റാ പ്രോസസ്സിംഗ്" : "Numerical computing, data frames, and statistical data visualization.",
        topics: [
          "NumPy Arrays & Mathematical Computing",
          "Pandas DataFrames for Data Cleaning & Filtering",
          "Data Visualization with Matplotlib & Seaborn",
          "Interacting with REST APIs & Database Connectors",
        ],
      },
      {
        index: "05",
        title: isMl ? "ലൈവ് പ്രോജക്റ്റും ഇൻഡസ്ട്രി ആപ്ലിക്കേഷനും" : "Real-World Capstone Project",
        description: isMl ? "യഥാർത്ഥ ഇൻഡസ്ട്രി പ്രോജക്റ്റ് നിർമ്മാണവും ഗിറ്റ്ഹബ് ഡിപ്ലോയ്മെന്റും" : "Full project lifecycle, Git version control, and portfolio presentation.",
        topics: [
          "Project Planning & Requirement Engineering",
          "Modular Code Architecture & Unit Testing",
          "Version Control with Git & GitHub Repositories",
          "Project Deployment & Documentation",
        ],
      },
    ];
  }

  // Default modular curriculum
  return [
    {
      index: "01",
      title: isMl ? "അടിസ്ഥാന തത്വങ്ങളും ഇൻട്രൊഡക്ഷനും" : "Foundations & Core Fundamentals",
      description: isMl ? "വിഷയത്തിന്റെ അടിസ്ഥാന തത്വങ്ങളും ഉപകരണങ്ങളും" : "Core concepts, essential tools, terminology, and foundational workflows.",
      topics: [
        "Introduction to the Industry & Core Tools",
        "Foundational Concepts & Operating Environment",
        "Basic Commands, Workflows & Best Practices",
      ],
    },
    {
      index: "02",
      title: isMl ? "പ്രാക്ടിക്കൽ ടൂളുകളും ടെക്നിക്കുകളും" : "Hands-On Practical Techniques",
      description: isMl ? "സോഫ്റ്റ്‌വെയർ ടൂളുകളിലുള്ള നേരിട്ടുള്ള പരിശീലനം" : "Application of essential software tools and real-world implementation.",
      topics: [
        "In-depth Tool Mastery & Features",
        "Practical Exercises & Guided Lab Tasks",
        "Common Troubleshooting & Performance Tips",
      ],
    },
    {
      index: "03",
      title: isMl ? "അഡ്വാൻസ്ഡ് മൊഡ്യൂളുകളും ഇന്റഗ്രേഷനും" : "Advanced Concepts & Workflows",
      description: isMl ? "സങ്കീർണ്ണമായ പ്രോജക്റ്റുകൾ കൈകാര്യം ചെയ്യാനുള്ള പരിശീലനം" : "Handling complex tasks, integrations, and high-efficiency techniques.",
      topics: [
        "Advanced Features & Industry Workflows",
        "Data Management & Automated Tasks",
        "Quality Standards & Professional Output",
      ],
    },
    {
      index: "04",
      title: isMl ? "ലൈവ് പ്രോജക്റ്റും സർട്ടിഫിക്കേഷൻ പ്രെപ്പും" : "Live Project & Certification Prep",
      description: isMl ? "ഇൻഡസ്ട്രി നിലവാരത്തിലുള്ള പ്രോജക്റ്റും പ്ലേസ്‌മെന്റ് പരിശീലനവും" : "Comprehensive project work, portfolio building, and interview preparation.",
      topics: [
        "End-to-End Capstone Project Execution",
        "Review, Evaluation & Mentorship Feedback",
        "Global Certification & Interview Readiness",
      ],
    },
  ];
}

/**
 * Extracts practical skills chips for the course.
 */
export function getSkillsGained(course: CourseWithCategory): string[] {
  const title = course.titleEn.toLowerCase();
  const cat = (course.category?.nameEn ?? "").toLowerCase();

  const baseCertifications = course.certifications || [];

  if (title.includes("tally") || title.includes("account") || cat.includes("account")) {
    return [
      "Financial Accounting",
      "Tally Prime",
      "GST & Taxation",
      "E-Way Bills",
      "Payroll Management",
      "Inventory Control",
      "Bank Reconciliation",
      "MIS Reporting",
      "Balance Sheet Analysis",
      "Voucher Entry",
      ...baseCertifications,
    ];
  }

  if (title.includes("python") || title.includes("data") || title.includes("ai")) {
    return [
      "Python 3",
      "Object-Oriented Programming",
      "Data Structures",
      "NumPy",
      "Pandas",
      "Data Analysis",
      "REST APIs",
      "Git & GitHub",
      "Automation Scripting",
      "JSON / CSV Handling",
      ...baseCertifications,
    ];
  }

  if (title.includes("web") || title.includes("full stack") || title.includes("react")) {
    return [
      "HTML5 & CSS3",
      "JavaScript (ES6+)",
      "React.js",
      "Node.js",
      "RESTful APIs",
      "Responsive UI",
      "Tailwind CSS",
      "Database Design",
      "Git Version Control",
      "Web Hosting & Deployment",
      ...baseCertifications,
    ];
  }

  if (title.includes("graphic") || title.includes("design") || cat.includes("multimedia")) {
    return [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Adobe InDesign",
      "Visual Design",
      "Branding & Logo Design",
      "Typography",
      "Color Theory",
      "Digital Illustration",
      "Print Production",
      ...baseCertifications,
    ];
  }

  if (title.includes("network") || title.includes("hardware") || cat.includes("hardware")) {
    return [
      "PC Hardware Diagnostics",
      "Networking & TCP/IP",
      "LAN/WAN Configuration",
      "Router & Switch Setup",
      "Server Administration",
      "Network Security",
      "Troubleshooting",
      "Hardware Maintenance",
      ...baseCertifications,
    ];
  }

  return [
    "Computer Operations",
    "MS Office Suite",
    "MS Excel (Advanced)",
    "Data Entry & Management",
    "Business Communication",
    "Internet & Cloud Tools",
    "Information Security",
    ...baseCertifications,
  ];
}

/**
 * Returns career job opportunities / roles.
 */
export function getCareerOpportunities(
  course: CourseWithCategory,
  locale: string = "en"
): CareerRole[] {
  const isMl = locale === "ml";
  const outcomesText = isMl && course.careerOutcomesMl ? course.careerOutcomesMl : course.careerOutcomesEn;

  if (outcomesText) {
    const roles = outcomesText
      .split(/[,;\n]/)
      .map((r) => r.trim())
      .filter(Boolean);

    if (roles.length > 0) {
      return roles.map((role) => ({
        title: role,
        description: isMl
          ? "കോർപ്പറേറ്റ് സ്ഥാപനങ്ങളിലും എംഎൻസികളിലും ഉയർന്ന തൊഴിൽ സാധ്യതകൾ."
          : "High-demand role across leading private, MNC, and public sector organizations.",
      }));
    }
  }

  // Fallback domain career outcomes
  const title = course.titleEn.toLowerCase();
  if (title.includes("tally") || title.includes("account")) {
    return [
      { title: isMl ? "അക്കൗണ്ട്സ് എക്സിക്യൂട്ടീവ്" : "Accounts Executive", description: "Manage day-to-day accounts, ledgers, and financial records." },
      { title: isMl ? "ജൂനിയർ അക്കൗണ്ടന്റ്" : "Junior Accountant", description: "Prepare trial balance, bank reconciliations, and financial vouchers." },
      { title: isMl ? "ടാലി ഓപ്പറേറ്റർ" : "Tally Operator", description: "Accurate transaction entry and billing management in Tally Prime." },
      { title: isMl ? "ജിഎസ്ടി എക്സിക്യൂട്ടീവ്" : "GST Executive", description: "Handle GST filing, e-way bills, and tax compliance." },
      { title: isMl ? "പേറോൾ സ്പെഷ്യലിസ്റ്റ്" : "Payroll Specialist", description: "Calculate employee wages, PF, ESI, and deductions." },
      { title: isMl ? "ഇൻവെന്ററി മാനേജർ" : "Inventory / Stock Manager", description: "Oversee warehouse stocks, purchase orders, and dispatch logs." },
    ];
  }

  if (title.includes("python") || title.includes("data") || title.includes("software")) {
    return [
      { title: "Python Developer", description: "Build scalable scripts, automation tools, and backend services." },
      { title: "Junior Software Engineer", description: "Develop and test application modules with clean, efficient code." },
      { title: "Data Analyst", description: "Extract insights and clean datasets using Pandas and Python libraries." },
      { title: "Automation Engineer", description: "Automate repetitive business workflows and data pipelines." },
    ];
  }

  return [
    { title: isMl ? "ഓഫീസ് അസിസ്റ്റന്റ്" : "Office Administrator", description: "Coordinate office operations, reporting, and computerized documentation." },
    { title: isMl ? "കമ്പ്യൂട്ടർ ഓപ്പറേറ്റർ" : "Computer Operator", description: "Handle essential software applications and administrative systems." },
    { title: isMl ? "ഡാറ്റാ എൻട്രി സ്പെഷ്യലിസ്റ്റ്" : "Data Entry Specialist", description: "Accurate information processing and spreadsheet management." },
    { title: isMl ? "കസ്റ്റമർ സപ്പോർട്ട് അസോസിയേറ്റ്" : "Customer Support Associate", description: "Manage digital communication and client interactions." },
  ];
}

/**
 * Returns target audience items for "Who Can Join".
 */
export function getWhoCanJoin(locale: string = "en"): AudienceItem[] {
  const isMl = locale === "ml";
  return isMl
    ? [
        {
          title: "വിദ്യാർത്ഥികൾ (Students & +2 / Degree)",
          description: "പഠനത്തോടൊപ്പം പ്രായോഗിക തൊഴിൽ നൈപുണ്യം കരസ്ഥമാക്കാൻ ആഗ്രഹിക്കുന്നവർക്ക്.",
        },
        {
          title: "തൊഴിലന്വേഷകർ (Job Seekers & Freshers)",
          description: "ഇൻഡസ്ട്രിക്ക് അനുയോജ്യമായ സർട്ടിഫിക്കേഷനോടെ മികച്ച ജോലി നേടാൻ ആഗ്രഹിക്കുന്നവർക്ക്.",
        },
        {
          title: "തൊഴിൽ ചെയ്യുന്നവർ (Working Professionals)",
          description: "തങ്ങളുടെ കരിയർ വളർച്ചയ്ക്കായി പുതിയ സാങ്കേതികവിദ്യകളിൽ അപ്‌സ്‌കിൽ ചെയ്യാൻ ആഗ്രഹിക്കുന്നവർക്ക്.",
        },
        {
          title: "ബിസിനസ്സ് സംരംഭകർ (Business Owners & Entrepreneurs)",
          description: "സ്വന്തം ബിസിനസ്സ് അക്കൗണ്ടിംഗും പ്രവർത്തനങ്ങളും കാര്യക്ഷമമായി നിയന്ത്രിക്കാൻ.",
        },
      ]
    : [
        {
          title: "Students & College Graduates",
          description: "College students and fresh graduates wanting industry-ready practical skills alongside their degree.",
        },
        {
          title: "Job Seekers & Career Starters",
          description: "Individuals aiming for immediate employment in private, corporate, or MNC sectors.",
        },
        {
          title: "Working Professionals",
          description: "Professionals seeking skill upgrades, salary growth, or career transitions.",
        },
        {
          title: "Business Owners & Entrepreneurs",
          description: "Entrepreneurs wanting to independently manage business accounts, technology, and operations.",
        },
      ];
}

/**
 * Returns 6 feature cards for "Why Choose G-TEC".
 */
export function getWhyChooseGtecFeatures(locale: string = "en"): WhyChooseFeature[] {
  const isMl = locale === "ml";
  return isMl
    ? [
        {
          title: "ഇൻഡസ്ട്രി അധിഷ്ഠിത സിലബസ്",
          description: "തൊഴിൽ വിപണിയിലെ പുതിയ ആവശ്യങ്ങൾക്കനുസരിച്ച് തയ്യാറാക്കിയ ആധുനിക പാഠ്യപദ്ധതി.",
          iconName: "book",
        },
        {
          title: "പരിചയസമ്പന്നരായ ഫാക്കൽറ്റി",
          description: "വർഷങ്ങളുടെ പ്രായോഗിക പരിചയമുള്ള പ്രൊഫഷണൽ അധ്യാപകരുടെ നേരിട്ടുള്ള മാർഗ്ഗനിർദ്ദേശം.",
          iconName: "users",
        },
        {
          title: "100% പ്രായോഗിക ലാബ് പരിശീലനം",
          description: "ആധുനിക കമ്പ്യൂട്ടർ ലാബുകളിൽ ഓരോ വിദ്യാർത്ഥിക്കും സ്വന്തമായി കമ്പ്യൂട്ടർ സൗകര്യം.",
          iconName: "laptop",
        },
        {
          title: "അന്താരാഷ്ട്ര സർട്ടിഫിക്കേഷൻ",
          description: "ലോകമെമ്പാടും അംഗീകാരമുള്ള ജി-ടെക് & ഗ്ലോബൽ പാർട്ണർ സർട്ടിഫിക്കറ്റുകൾ.",
          iconName: "award",
        },
        {
          title: "100% പ്ലേസ്‌മെന്റ് പിന്തുണ",
          description: "റെസ്യൂമെ നിർമ്മാണം, മോക്ക് ഇന്റർവ്യൂകൾ, പ്രമുഖ കമ്പനികളിലെ ജോബ് പ്ലേസ്‌മെന്റ്.",
          iconName: "target",
        },
        {
          title: "25+ വർഷത്തെ വിശ്വാസ്യത",
          description: "800+ കേന്ദ്രങ്ങളിലായി 3.2 ദശലക്ഷത്തിലധികം വിദ്യാർത്ഥികൾക്ക് പരിശീലനം നൽകിയ പാരമ്പര്യം.",
          iconName: "building",
        },
      ]
    : [
        {
          title: "Industry-Aligned Curriculum",
          description: "Course content designed and regularly updated in consultation with hiring managers and industry experts.",
          iconName: "book",
        },
        {
          title: "Expert Certified Faculty",
          description: "Learn directly from experienced mentors who provide dedicated one-on-one attention and guidance.",
          iconName: "users",
        },
        {
          title: "100% Practical Lab Sessions",
          description: "Modern high-spec computer workstations with dedicated 1:1 computer access for hands-on mastery.",
          iconName: "laptop",
        },
        {
          title: "Globally Recognized Certification",
          description: "Earn ISO 9001:2015 and internationally accredited diplomas recognized across 23+ countries.",
          iconName: "award",
        },
        {
          title: "100% Placement Assistance",
          description: "Dedicated placement cell offering interview grooming, resume building, and direct campus recruitment.",
          iconName: "target",
        },
        {
          title: "25+ Years of Educational Trust",
          description: "Part of an international network of 800+ centres that has trained over 3.2 Million successful students.",
          iconName: "building",
        },
      ];
}
