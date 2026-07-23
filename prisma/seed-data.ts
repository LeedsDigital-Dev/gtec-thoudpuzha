/**
 * Shared seed data used by both prisma/seed.ts and verification tests.
 * This is the single source of truth for what production content should look like.
 */

export interface CourseSeed {
  titleEn: string;
  titleMl: string | null;
  categoryName: string;
  descriptionEn: string;
  descriptionMl: string | null;
  durationText: string;
  certifications: string[];
  careerOutcomesEn: string;
  careerOutcomesMl: string | null;
  featured: boolean;
  status: "PUBLISHED";
}

export const CATEGORIES = [
  { nameEn: "IT & Software", nameMl: "ഐടി & സോഫ്റ്റ്വെയർ" },
  { nameEn: "Multimedia & Design", nameMl: "മൾട്ടിമീഡിയ & ഡിസൈൻ" },
  { nameEn: "Accounting & Finance", nameMl: "അക്കൗണ്ടിംഗ് & ഫിനാൻസ്" },
  { nameEn: "Language & Communications", nameMl: "ഭാഷ & കമ്മ്യൂണിക്കേഷൻ" },
  { nameEn: "Hardware & Networking", nameMl: "ഹാർഡ്വെയർ & നെറ്റ്വർക്കിംഗ്" },
  { nameEn: "Vocational & Professional", nameMl: "വൊക്കേഷണൽ & പ്രൊഫഷണൽ" },
];

export const COURSES: CourseSeed[] = [
  {
    titleEn: "Diploma in Computer Application (DCA)",
    titleMl: "ഡിപ്ലോമ ഇൻ കമ്പ്യൂട്ടർ ആപ്ലിക്കേഷൻ (DCA)",
    categoryName: "IT & Software",
    descriptionEn:
      "A foundational course covering computer fundamentals, MS Office, internet applications, and basic programming. Ideal for beginners seeking a strong start in computing.",
    descriptionMl:
      "കമ്പ്യൂട്ടർ അടിസ്ഥാനങ്ങൾ, എംഎസ് ഓഫീസ്, ഇന്റർനെറ്റ് ആപ്ലിക്കേഷനുകൾ, അടിസ്ഥാന പ്രോഗ്രാമിംഗ് എന്നിവ ഉൾപ്പെടുന്ന ഒരു അടിസ്ഥാന കോഴ്സ്.",
    durationText: "6 Months",
    certifications: ["G-TEC", "DCA"],
    careerOutcomesEn: "Computer Operator, Office Assistant, Data Entry Operator",
    careerOutcomesMl: "കമ്പ്യൂട്ടർ ഓപ്പറേറ്റർ, ഓഫീസ് അസിസ്റ്റന്റ്, ഡാറ്റ എൻട്രി ഓപ്പറേറ്റർ",
    featured: true,
    status: "PUBLISHED",
  },
  {
    titleEn: "Advanced Diploma in Software Engineering (ADSE)",
    titleMl: null,
    categoryName: "IT & Software",
    descriptionEn:
      "An intensive program covering programming languages (C, C++, Java, Python), database management, web development, and software engineering principles.",
    descriptionMl: null,
    durationText: "12 Months",
    certifications: ["G-TEC", "ADSE"],
    careerOutcomesEn: "Software Developer, Web Developer, Programmer, Database Administrator",
    careerOutcomesMl: null,
    featured: true,
    status: "PUBLISHED",
  },
  {
    titleEn: "Python Programming",
    titleMl: "പൈത്തൺ പ്രോഗ്രാമിംഗ്",
    categoryName: "IT & Software",
    descriptionEn:
      "Master Python from fundamentals to advanced topics: data structures, OOP, file handling, libraries, and real-world project work.",
    descriptionMl:
      "അടിസ്ഥാനം മുതൽ വിപുലമായ വിഷയങ്ങൾ വരെ: ഡാറ്റാ സ്ട്രക്ചറുകൾ, OOP, ഫയൽ ഹാൻഡ്ലിംഗ്, ലൈബ്രറികൾ, യഥാർത്ഥ പ്രോജക്റ്റ് വർക്ക്.",
    durationText: "3 Months",
    certifications: ["G-TEC", "Python"],
    careerOutcomesEn: "Python Developer, Data Analyst, Automation Engineer",
    careerOutcomesMl: "പൈത്തൺ ഡവലപ്പർ, ഡാറ്റ അനലിസ്റ്റ്, ഓട്ടോമേഷൻ എഞ്ചിനീയർ",
    featured: false,
    status: "PUBLISHED",
  },
  {
    titleEn: "Full Stack Web Development",
    titleMl: null,
    categoryName: "IT & Software",
    descriptionEn:
      "Comprehensive training in frontend and backend web technologies: HTML5, CSS3, JavaScript, React, Node.js, Express, MongoDB, and deployment.",
    descriptionMl: null,
    durationText: "6 Months",
    certifications: ["G-TEC", "Full Stack"],
    careerOutcomesEn: "Full Stack Developer, Frontend Developer, Backend Developer",
    careerOutcomesMl: null,
    featured: true,
    status: "PUBLISHED",
  },
  {
    titleEn: "Data Science & Machine Learning",
    titleMl: null,
    categoryName: "IT & Software",
    descriptionEn:
      "Learn data analysis, statistical modeling, machine learning algorithms, and data visualization using Python, R, and industry tools.",
    descriptionMl: null,
    durationText: "6 Months",
    certifications: ["G-TEC", "Data Science"],
    careerOutcomesEn: "Data Scientist, ML Engineer, Data Analyst, Business Intelligence Analyst",
    careerOutcomesMl: null,
    featured: false,
    status: "PUBLISHED",
  },
  {
    titleEn: "Digital Marketing",
    titleMl: null,
    categoryName: "IT & Software",
    descriptionEn:
      "Covers SEO, SEM, social media marketing, email marketing, content strategy, Google Analytics, and paid advertising campaigns.",
    descriptionMl: null,
    durationText: "3 Months",
    certifications: ["G-TEC", "Digital Marketing"],
    careerOutcomesEn: "Digital Marketing Specialist, SEO Analyst, Social Media Manager",
    careerOutcomesMl: null,
    featured: false,
    status: "PUBLISHED",
  },
  {
    titleEn: "Graphic Design & Multimedia",
    titleMl: "ഗ്രാഫിക് ഡിസൈൻ & മൾട്ടിമീഡിയ",
    categoryName: "Multimedia & Design",
    descriptionEn:
      "Training in Adobe Creative Suite (Photoshop, Illustrator, InDesign), CorelDraw, typography, branding, and visual communication.",
    descriptionMl:
      "അഡോബി ക്രിയേറ്റീവ് സ്യൂട്ട് (ഫോട്ടോഷോപ്പ്, ഇല്ലസ്ട്രേറ്റർ, ഇൻഡിസൈൻ), കോറൽഡ്രോ, ടൈപ്പോഗ്രഫി, ബ്രാൻഡിംഗ്, വിഷ്വൽ കമ്മ്യൂണിക്കേഷൻ എന്നിവയിൽ പരിശീലനം.",
    durationText: "6 Months",
    certifications: ["G-TEC", "Adobe"],
    careerOutcomesEn: "Graphic Designer, UI/UX Designer, Art Director, Visualizer",
    careerOutcomesMl: "ഗ്രാഫിക് ഡിസൈനർ, UI/UX ഡിസൈനർ, ആർട്ട് ഡയറക്ടർ, വിഷ്വലൈസർ",
    featured: true,
    status: "PUBLISHED",
  },
  {
    titleEn: "Video Editing & Motion Graphics",
    titleMl: null,
    categoryName: "Multimedia & Design",
    descriptionEn:
      "Professional video editing with Adobe Premiere Pro, After Effects, motion graphics, color grading, and sound design.",
    descriptionMl: null,
    durationText: "4 Months",
    certifications: ["G-TEC", "Adobe"],
    careerOutcomesEn: "Video Editor, Motion Graphics Artist, Content Creator",
    careerOutcomesMl: null,
    featured: false,
    status: "PUBLISHED",
  },
  {
    titleEn: "Web & UI/UX Designing",
    titleMl: null,
    categoryName: "Multimedia & Design",
    descriptionEn:
      "Learn wireframing, prototyping, user research, Figma, Adobe XD, responsive design principles, and design systems.",
    descriptionMl: null,
    durationText: "4 Months",
    certifications: ["G-TEC"],
    careerOutcomesEn: "UI/UX Designer, Product Designer, Web Designer",
    careerOutcomesMl: null,
    featured: false,
    status: "PUBLISHED",
  },
  {
    titleEn: "Tally ERP 9 / Prime with GST",
    titleMl: "ടാലി ഇആർപി 9 / പ്രൈം വിത് ജിഎസ്ടി",
    categoryName: "Accounting & Finance",
    descriptionEn:
      "Hands-on training in Tally ERP 9 / Prime covering accounting fundamentals, GST filing, payroll, inventory management, and MIS reporting.",
    descriptionMl:
      "അക്കൗണ്ടിംഗ് അടിസ്ഥാനങ്ങൾ, ജിഎസ്ടി ഫയലിംഗ്, പേറോൾ, ഇൻവെന്ററി മാനേജ്മെന്റ്, എംഐഎസ് റിപ്പോർട്ടിംഗ് എന്നിവ ഉൾപ്പെടുന്ന ടാലി ഇആർപി 9 / പ്രൈമിൽ പ്രായോഗിക പരിശീലനം.",
    durationText: "3 Months",
    certifications: ["G-TEC", "Tally"],
    careerOutcomesEn: "Accountant, GST Practitioner, Accounts Executive",
    careerOutcomesMl: "അക്കൗണ്ടന്റ്, ജിഎസ്ടി പ്രാക്ടീഷണർ, അക്കൗണ്ട്സ് എക്സിക്യൂട്ടീവ്",
    featured: true,
    status: "PUBLISHED",
  },
  {
    titleEn: "SAP FICO (Finance & Controlling)",
    titleMl: null,
    categoryName: "Accounting & Finance",
    descriptionEn:
      "Comprehensive SAP FICO training covering financial accounting, controlling, asset management, and integration with other SAP modules.",
    descriptionMl: null,
    durationText: "3 Months",
    certifications: ["G-TEC", "SAP"],
    careerOutcomesEn: "SAP Consultant, Financial Analyst, FICO Specialist",
    careerOutcomesMl: null,
    featured: false,
    status: "PUBLISHED",
  },
  {
    titleEn: "Spoken English & Communication Skills",
    titleMl: "സ്പോക്കൺ ഇംഗ്ലീഷ് & കമ്മ്യൂണിക്കേഷൻ സ്കിൽസ്",
    categoryName: "Language & Communications",
    descriptionEn:
      "Practical English language training focused on spoken fluency, grammar, vocabulary, public speaking, interview skills, and business communication.",
    descriptionMl:
      "സംസാരശേഷി, വ്യാകരണം, പദസമ്പത്ത്, പൊതുപ്രസംഗം, ഇന്റർവ്യൂ കഴിവുകൾ, ബിസിനസ് കമ്മ്യൂണിക്കേഷൻ എന്നിവയിൽ ശ്രദ്ധ കേന്ദ്രീകരിച്ചുള്ള പ്രായോഗിക ഇംഗ്ലീഷ് ഭാഷാ പരിശീലനം.",
    durationText: "3 Months",
    certifications: ["G-TEC"],
    careerOutcomesEn: "Customer Service Executive, Front Office Executive, BPO Professional",
    careerOutcomesMl: "കസ്റ്റമർ സർവീസ് എക്സിക്യൂട്ടീവ്, ഫ്രണ്ട് ഓഫീസ് എക്സിക്യൂട്ടീവ്, ബിപിഒ പ്രൊഫഷണൽ",
    featured: true,
    status: "PUBLISHED",
  },
  {
    titleEn: "IELTS / TOEFL / PTE Preparation",
    titleMl: null,
    categoryName: "Language & Communications",
    descriptionEn:
      "Expert-led coaching for international English proficiency exams with mock tests, speaking practice, writing feedback, and study materials.",
    descriptionMl: null,
    durationText: "2 Months",
    certifications: ["G-TEC"],
    careerOutcomesEn: "Study Abroad Candidate, International Professional",
    careerOutcomesMl: null,
    featured: false,
    status: "PUBLISHED",
  },
  {
    titleEn: "Hardware & Networking (A+ / N+)",
    titleMl: null,
    categoryName: "Hardware & Networking",
    descriptionEn:
      "Training in computer hardware assembly, troubleshooting, operating systems, LAN/WAN networking, TCP/IP, and network security fundamentals.",
    descriptionMl: null,
    durationText: "6 Months",
    certifications: ["G-TEC", "CompTIA A+", "CompTIA N+"],
    careerOutcomesEn: "Hardware Technician, Network Administrator, IT Support Engineer",
    careerOutcomesMl: null,
    featured: false,
    status: "PUBLISHED",
  },
  {
    titleEn: "Diploma in Financial Accounting (DFA)",
    titleMl: null,
    categoryName: "Accounting & Finance",
    descriptionEn:
      "Covers financial accounting principles, banking, taxation, auditing, and computerized accounting using Tally and MS Excel.",
    descriptionMl: null,
    durationText: "6 Months",
    certifications: ["G-TEC", "DFA"],
    careerOutcomesEn: "Accounts Assistant, Auditor, Tax Assistant",
    careerOutcomesMl: null,
    featured: false,
    status: "PUBLISHED",
  },
];

export const CERTIFICATION_PARTNERS = [
  { name: "Adobe", nameMl: null, link: "https://www.adobe.com/in/education.html" },
  { name: "Microsoft", nameMl: null, link: "https://www.microsoft.com/en-in/education" },
  { name: "SAP", nameMl: null, link: "https://www.sap.com/india/training.html" },
  { name: "Tally Education", nameMl: "ടാലി എജ്യുക്കേഷൻ", link: "https://tallyeducation.com" },
  { name: "CompTIA", nameMl: null, link: "https://www.comptia.org" },
  { name: "Autodesk", nameMl: null, link: "https://www.autodesk.com/certification" },
  { name: "Red Hat", nameMl: null, link: "https://www.redhat.com/en/services/training-and-certification" },
  { name: "Oracle", nameMl: null, link: "https://education.oracle.com" },
  { name: "ISO", nameMl: null, link: "https://www.iso.org" },
  { name: "NIELIT", nameMl: null, link: "https://www.nielit.gov.in" },
];

export const GALLERY_CATEGORIES = [
  { slug: "campus", nameEn: "Campus & Facilities", nameMl: "ക്യാമ്പസ് & സൗകര്യങ്ങൾ" },
  { slug: "events", nameEn: "Events & Activities", nameMl: "പരിപാടികൾ & പ്രവർത്തനങ്ങൾ" },
  { slug: "placement", nameEn: "Placement & Support", nameMl: "പ്ലേസ്മെന്റ് & പിന്തുണ" },
  { slug: "classroom", nameEn: "Classroom Sessions", nameMl: "ക്ലാസ്‌റൂം സെഷനുകൾ" },
];

export const WHY_CHOOSE_US_CARDS = [
  { icon: "AWARD" as const, titleEn: "ISO 9001:2015 Certified", titleMl: "ഐഎസ്ഒ 9001:2015 സർട്ടിഫൈഡ്", descriptionEn: "Globally recognized quality management standards ensuring world-class education delivery.", descriptionMl: "ആഗോളനിലവാരമുള്ള വിദ്യാഭ്യാസം ഉറപ്പാക്കുന്ന ഗുണനിലവാര മാനേജ്മെന്റ് സ്റ്റാൻഡേർഡ്." },
  { icon: "USERS" as const, titleEn: "Expert Trainers", titleMl: "വിദഗ്ധ പരിശീലകർ", descriptionEn: "Industry-experienced faculty dedicated to hands-on, practical learning that prepares you for the real world.", descriptionMl: "വ്യവസായ പരിചയമുള്ള അധ്യാപകർ പ്രായോഗിക പഠനത്തിന് ഊന്നൽ നൽകുന്നു." },
  { icon: "BOOK_OPEN" as const, titleEn: "Industry-Relevant Curriculum", titleMl: "വ്യവസായ-അനുയോജ്യമായ പാഠ്യപദ്ധതി", descriptionEn: "Courses designed in collaboration with industry partners to meet current market demands.", descriptionMl: "വിപണി ആവശ്യങ്ങൾ നിറവേറ്റുന്നതിനായി രൂപകൽപ്പന ചെയ്ത കോഴ്സുകൾ." },
  { icon: "BRIEFCASE" as const, titleEn: "Placement Assistance", titleMl: "പ്ലേസ്മെന്റ് സഹായം", descriptionEn: "Dedicated placement support with resume workshops, mock interviews, and job referral networks.", descriptionMl: "റെസ്യൂമെ വർക്ക്ഷോപ്പുകൾ, മോക്ക് ഇന്റർവ്യൂകൾ, ജോബ് റഫറൽ നെറ്റ്‌വർക്കുകൾ എന്നിവയുള്ള പ്ലേസ്മെന്റ് പിന്തുണ." },
  { icon: "GLOBE" as const, titleEn: "Global Recognition", titleMl: "ആഗോള അംഗീകാരം", descriptionEn: "G-TEC certificates are recognized by employers and institutions across 23 countries worldwide.", descriptionMl: "ജി-ടെക് സർട്ടിഫിക്കറ്റുകൾ 23 രാജ്യങ്ങളിലെ തൊഴിലുടമകളും സ്ഥാപനങ്ങളും അംഗീകരിക്കുന്നു." },
  { icon: "HEADPHONES" as const, titleEn: "Lifetime Support", titleMl: "ആജീവനാന്ത പിന്തുണ", descriptionEn: "Free course revision and career guidance for life — even after you complete your program.", descriptionMl: "കോഴ്സ് പൂർത്തിയാക്കിയ ശേഷവും സൗജന്യ കോഴ്സ് പുനരവലോകനവും കരിയർ മാർഗ്ഗനിർദ്ദേശവും." },
];

export const NEWS_EVENTS = [
  { type: "NEWS" as const, titleEn: "G-TEC Thodupuzha Achieves 95% Placement Rate for 2024 Batch", titleMl: null, bodyEn: "We are proud to announce that the 2024 batch has achieved a 95% placement rate, with students placed in leading IT companies, financial institutions, and multinational corporations across Kerala and beyond.", bodyMl: null, slug: "gtec-thodupuzha-95-percent-placement-2024" },
  { type: "EVENT" as const, titleEn: "Free Career Guidance Workshop — July 2025", titleMl: null, bodyEn: "Join us for a free career guidance workshop at our Thodupuzha campus. Expert counselors will help you identify the right career path and training program. Limited seats available — register now!", bodyMl: null, slug: "free-career-guidance-workshop-july-2025" },
  { type: "NEWS" as const, titleEn: "New Batch Starting: Full Stack Web Development — August 2025", titleMl: null, bodyEn: "Enrollments are open for the upcoming Full Stack Web Development batch starting August 2025. The course covers React, Node.js, MongoDB, and deployment. Early bird discounts available!", bodyMl: null, slug: "full-stack-web-dev-batch-august-2025" },
  { type: "EVENT" as const, titleEn: "Industry Visit to Kochi IT Park", titleMl: null, bodyEn: "Students will visit leading IT companies at Kochi's Infopark to gain exposure to real work environments, interact with industry professionals, and understand corporate expectations.", bodyMl: null, slug: "industry-visit-kochi-it-park-2025" },
];

export const CATEGORY_NAMES = CATEGORIES.map((c) => c.nameEn);
export const ALL_COURSE_TITLES = COURSES.map((c) => c.titleEn);
export const ALL_PARTNER_NAMES = CERTIFICATION_PARTNERS.map((p) => p.name);
