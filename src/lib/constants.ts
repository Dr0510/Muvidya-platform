export const SITE_CONFIG = {
  name: "MμVidya",
  tagline: "Empowering Students with Real-World STEM Skills",
  description:
    "MμVidya offers cutting-edge STEM education learning platforms, robotics workshops, and hands-on learning experiences for schools and students across India. Empowering the next generation of innovators.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://muvidya.com",
  ogImage: "/images/brand/og-image.jpg",
  keywords: [
    "STEM education",
    "robotics Learning Platform",
    "coding for kids",
    "STEM workshops",
    "educational technology",
    "India STEM education",
    "N-Byte Learning Platform",
    "MμVidya",
    "robotics for schools",
    "hands-on learning",
  ] as string[],
  author: "MμVidya",
  email: "contact@muvidya.com",
  phone: "+91 9022477635",
  address: "102, AIIC, MIT west campus, Gate no 5, MIT Engineering college, Beed bypass road Satara parisar Chhatrapati sambhajinagar -431010",
  social: {
    facebook: "https://facebook.com/muvidya",
    instagram: "https://instagram.com/muvidya",
    youtube: "https://youtube.com/@muvidya",
    linkedin: "https://linkedin.com/company/muvidya",
    twitter: "https://twitter.com/muvidya",
  },
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+919XXXXXXXXX",
    message: process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || "Hi! I'm interested in MuVidya STEM products.",
  },
} as const;

export interface NavItem {
  label: string;
  href: string;
  /** Optional children for dropdown menus (future scalability) */
  children?: { label: string; href: string; description?: string }[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "STEM Kits", href: "/products?category=kit", description: "Hands-on learning kits" },
      { label: "Books & Guides", href: "/products?category=book", description: "Curriculum-aligned resources" },
      { label: "Accessories", href: "/products?category=accessory", description: "Spare parts & add-ons" },
    ],
  },
  { label: "Workshops", href: "/workshops" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const PRODUCT_CATEGORIES = [
  { value: "kit", label: "STEM Kits", color: "from-cyan-500 to-blue-600" },
  { value: "book", label: "Books & Guides", color: "from-violet-500 to-purple-600" },
  { value: "accessory", label: "Accessories", color: "from-amber-500 to-orange-600" },
] as const;

export const WORKSHOP_CATEGORIES = [
  { value: "robotics", label: "Robotics", icon: "Bot" },
  { value: "coding", label: "Coding & Programming", icon: "Code" },
  { value: "ai", label: "Artificial Intelligence", icon: "Brain" },
  { value: "iot", label: "IoT & Electronics", icon: "Cpu" },
] as const;

export const LEAD_SOURCES = [
  "website",
  "referral",
  "social_media",
  "google_ads",
  "facebook_ads",
  "instagram",
  "youtube",
  "email_campaign",
  "workshop",
  "exhibition",
  "other",
] as const;

export const LEAD_STATUS_LABELS: Record<string, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUALIFIED: "Qualified",
  DEMO_SCHEDULED: "Demo Scheduled",
  DEMO_COMPLETED: "Demo Completed",
  NEGOTIATION: "Negotiation",
  WON: "Won",
  LOST: "Lost",
  FOLLOW_UP: "Follow Up",
};

export const LEAD_STATUS_COLORS: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-800 border-blue-200",
  CONTACTED: "bg-yellow-100 text-yellow-800 border-yellow-200",
  QUALIFIED: "bg-green-100 text-green-800 border-green-200",
  DEMO_SCHEDULED: "bg-purple-100 text-purple-800 border-purple-200",
  DEMO_COMPLETED: "bg-indigo-100 text-indigo-800 border-indigo-200",
  NEGOTIATION: "bg-orange-100 text-orange-800 border-orange-200",
  WON: "bg-emerald-100 text-emerald-800 border-emerald-200",
  LOST: "bg-red-100 text-red-800 border-red-200",
  FOLLOW_UP: "bg-pink-100 text-pink-800 border-pink-200",
};

export const STATS = [
  { value: "5+", label: "Schools Partnered" },
  { value: "100+", label: "Students Empowered" },
  { value: "3+", label: "Workshops Conducted" },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Science Teacher",
    school: "Delhi Public School, Bangalore",
    image: "/images/testimonials/testimonial-1.jpg",
    content:
      "MuVidya's N-Byte Explorer Kit has transformed how our students engage with STEM. The hands-on projects make complex concepts accessible and fun. Our robotics club has never been more active!",
    rating: 5,
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Principal",
    school: "Sri Chaitanya School, Hyderabad",
    image: "/images/testimonials/testimonial-2.jpg",
    content:
      "The workshop conducted by MuVidya was exceptional. Our students built working robots in just two days. The curriculum alignment with CBSE standards was a huge plus for our academic team.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ananya Patel",
    role: "Parent",
    school: "Parent of 12-year-old",
    image: "/images/testimonials/testimonial-3.jpg",
    content:
      "My daughter used to spend hours on social media. After getting the MuVidya kit, she's now building circuits and writing code. The change in her curiosity and confidence is remarkable.",
    rating: 5,
  },
  {
    id: 4,
    name: "Dr. Vikram Joshi",
    role: "STEM Coordinator",
    school: "The International School, Mumbai",
    image: "/images/testimonials/testimonial-4.jpg",
    content:
      "We evaluated multiple STEM programs before choosing MuVidya. Their comprehensive curriculum, quality hardware, and teacher training support make them stand out. Highly recommended.",
    rating: 5,
  },
];

export const FAQ_ITEMS = [
  {
    question: "What age groups are MuVidya products suitable for?",
    answer:
      "Our products are designed for students aged 8-18 years. We have different kits and workshops tailored for beginner (ages 8-11), intermediate (ages 12-14), and advanced (ages 15-18) levels. Each product page specifies the recommended age group.",
  },
  {
    question: "Do you conduct workshops at our school?",
    answer:
      "Yes! We conduct on-site workshops at schools across India. Our team brings all necessary materials and equipment. Workshops range from 1-day introductory sessions to week-long intensive programs. Contact us to schedule a workshop at your school.",
  },
  {
    question: "What is included in the N-Byte Learning Platform?",
    answer:
      "The N-Byte Learning Platform includes a microcontroller board, sensors (ultrasonic, IR, temperature, etc.), motors, wheels, connecting wires, LEDs, resistors, a comprehensive project guidebook, and access to our online learning platform with video tutorials and coding challenges.",
  },
  {
    question: "Is prior coding knowledge required?",
    answer:
      "Not at all! Our beginner kits use block-based programming (similar to Scratch) that requires no prior coding experience. As students progress, they can transition to Python and C++ programming with our advanced modules.",
  },
  {
    question: "Do you offer teacher training programs?",
    answer:
      "Absolutely. We provide comprehensive teacher training workshops to help educators integrate STEM education effectively. Our training covers both technical aspects (using the kits) and pedagogical approaches to STEM teaching.",
  },
  {
    question: "What is the warranty on your products?",
    answer:
      "All MuVidya products come with a 1-year warranty against manufacturing defects. We also offer extended warranty plans. Our support team is available via email, phone, and WhatsApp to assist with any technical issues.",
  },
  {
    question: "How can my school partner with MuVidya?",
    answer:
      "Schools can partner with us through our School Partnership Program. Benefits include discounted bulk pricing, dedicated teacher training, curriculum integration support, annual STEM events, and priority workshop scheduling. Fill out the demo request form to learn more.",
  },
  {
    question: "Do you ship across India?",
    answer:
      "Yes, we ship to all states and union territories across India. Orders are typically delivered within 5-7 business days. We offer free shipping on orders above ₹2,000. International shipping is also available on request.",
  },
];

export const SCHOOL_BENEFITS = [
  {
    title: "Curriculum Aligned",
    description: "Our programs align with CBSE, ICSE, and state board curricula, seamlessly integrating into your existing STEM syllabus.",
    icon: "BookOpen",
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    title: "Teacher Training",
    description: "Comprehensive training programs to upskill your educators in STEM pedagogy and hands-on teaching methodologies.",
    icon: "GraduationCap",
    gradient: "from-violet-600 to-purple-500",
  },
  {
    title: "Lab Setup Support",
    description: "End-to-end support in setting up STEM labs, including infrastructure guidance, equipment installation, and curriculum planning.",
    icon: "FlaskConical",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Student Assessment",
    description: "Built-in assessment tools to track student progress, with detailed analytics and progress reports for each student.",
    icon: "BarChart3",
    gradient: "from-orange-500 to-rose-500",
  },
];

export const STUDENT_BENEFITS = [
  {
    title: "Hands-On Learning",
    description: "Build real robots, circuits, and projects. Learn by doing, not just reading.",
    icon: "Zap",
  },
  {
    title: "Future Skills",
    description: "Develop coding, problem-solving, and critical thinking skills essential for future careers.",
    icon: "Rocket",
  },
  {
    title: "Project Portfolio",
    description: "Build an impressive portfolio of STEM projects for school admissions and competitions.",
    icon: "FolderOpen",
  },
  {
    title: "Certification",
    description: "Earn certificates upon completing workshops and courses, recognized by leading educational institutions.",
    icon: "Award",
  },
  {
    title: "Mentorship",
    description: "Get guidance from industry professionals and STEM experts through our mentorship program.",
    icon: "MessagesSquare",
  },
  {
    title: "Online Community",
    description: "Join our community of young innovators. Share projects, participate in challenges, and win prizes.",
    icon: "Users",
  },
];

export const LEARNING_OUTCOMES = [
  {
    title: "Computational Thinking",
    description: "Break down complex problems and develop algorithmic solutions",
    icon: "BrainCircuit",
    color: "text-violet-500",
    bgColor: "bg-violet-50",
  },
  {
    title: "Problem Solving",
    description: "Tackle real-world challenges using design thinking and engineering principles",
    icon: "Lightbulb",
    color: "text-amber-500",
    bgColor: "bg-amber-50",
  },
  {
    title: "Meet Innovation",
    description: "Design and build original projects that solve meaningful problems",
    icon: "Palette",
    color: "text-rose-500",
    bgColor: "bg-rose-50",
  },
  {
    title: "Collaboration",
    description: "Work effectively in teams, communicate ideas, and learn peer-to-peer",
    icon: "Handshake",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Technical Literacy",
    description: "Gain proficiency in coding, electronics, robotics, and AI technologies",
    icon: "Monitor",
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
  },
  {
    title: "Scientific Thinking",
    description: "Apply scientific method, conduct experiments, and analyze data systematically",
    icon: "Microscope",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
];