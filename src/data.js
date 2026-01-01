

export const education = {
  degree: "Bachelor of Computer Applications (BCA)",
  institution: "C.U. Shah Institution of Computer Applications",
  university: "Gujarat University, Ahmedabad",
  duration: "07/2021 - 05/2024"
};

export const interests = [
  "Judo", "Emerging Tech Trends", "Debugging Complex Code", "Continuous Learning", "Bike Riding"
];

// Update the image paths in your data.js file
export const personalInfo = {
  name: "Irfat Khan",
  title: "Full Stack Developer",
  description: "Motivated and detail-oriented Full Stack Developer with hands-on experience in backend and frontend development using Node.js, Python, Django, React.js, and MySQL/MariaDB.",
  phone: "+91 6352571075",
  email: "irfatkhan1445@gmail.com",
  location: "Ahmedabad, India",
  cvLink: "/images/irfatkhanCV.pdf",
  image: "/images/profile.JPG",  // Add this line
  socialLinks: {
    github: "https://github.com/1179irfatkhan-web/",
    linkedin: "https://www.linkedin.com/in/irfat-khan",
    instagram: "https://www.instagram.com/irfat_khan_786/",
    email: "mailto:irfatkhan1445@gmail.com"
  }
};

export const galleryItems = [
  {
    id: 1,
    category: "personal",
    title: "Professional Profile",
    description: "Full Stack Developer",
    image: "/images/profile.JPG",  // Updated path
    count: "Profile"
  },
  {
    id: 2,
    category: "project",
    title: "Coach Appointment System",
    description: "Home Page Interface",
    image: "/images/home.png",  // Updated path
    count: "Project"
  },
  {
    id: 3,
    category: "project",
    title: "Coach Appointment System",
    description: "Booking Interface",
    image: "/images/takeAppoint.png",  // Updated path
    count: "Project"
  },
  {
    id: 4,
    category: "project",
    title: "Coach Appointment System",
    description: "Admin Panel",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    count: "Project"
  },
  {
    id: 5,
    category: "judo",
    title: "1st Place - Gold Medalist",
    description: "🥇 Secured 1st Position in Judo at the Gujarat University Inter-Collegiate Competition.",
    image: "/images/gujaratuniversitycamp_2022-2023.png",  // Updated path
    count: "Inter-Collegiate Champion 2023-24"
  },
  {
    id: 6,
    category: "judo",
    title: "🏆 Consecutive Gold Medalist",
    description: "🥇 Successfully defended the title to secure 1st Position in Judo for the 2024-2025 Gujarat University Inter-Collegiate Competition.",
    image: "/images/gujaratuniversityCamp_2024-2025.png",  // Updated path
    count: "University Champion 2024-2025"
  },
  {
    id: 7,
    category: "judo",
    title: "All India Inter-University Player",
    description: "🥋 Represented Gujarat University at the National Level in Phagwara.",
    image: "/images/A_I_U_2022-2023.png",  // Updated path
    count: "National University Player 2022-2023"
  },
  {
    id: 8,
    category: "judo",
    title: "South-West Zone University Player",
    description: "🥋 Selected for the Inter-University Zonal Championship representing Gujarat University.",
    image: "/images/south-westuniversity-2024-2025.png",  // Updated path
    count: "Zonal Level Selection 2024-2025"
  },
  {
    id: 9,
    category: "selfdefense",
    title: "Community Outreach",
    description: "👨‍🏫 Training students in essential self-protection techniques.",
    image: "/images/image1.jpg",  // Updated path
    count: "Self-Defense 1/10"
  },
  {
    id: 10,
    category: "selfdefense",
    title: "GLS University Recognition",
    description: "🏅 Honored for contribution to campus safety and sports.",
    image: "/images/image (2).png",  // Updated path
    count: "Self-Defense 2/10"
  },
  // Add the rest of your self-defense images...
  {
    id: 11,
    category: "selfdefense",
    title: "Practical Instruction",
    description: "Demonstrating active self-defense maneuvers for students at GLS University.",
    image: "/images/imge4.JPG",
    count: "Self-Defense 3/10"
  },
  {
    id: 12,
    category: "selfdefense",
    title: "Honorary Recognition",
    description: "🌿 Receiving appreciation from the Principal of Mount Litera Zee School for workshop leadership.",
    image: "/images/image3.JPG",
    count: "Self-Defense 4/10"
  },
  {
    id: 13,
    category: "selfdefense",
    title: "Live Demonstration",
    description: "🥋 Demonstrating defensive stances at B.J. Medical College, Ahmedabad.",
    image: "/images/image5.JPG",
    count: "Self-Defense 5/10"
  },
  {
    id: 14,
    category: "selfdefense",
    title: "Grand Workshop Session",
    description: "🏢 Addressing a full auditorium of medical students on situational awareness.",
    image: "/images/image7.JPG",
    count: "Self-Defense 6/10"
  },
  {
    id: 15,
    category: "selfdefense",
    title: "Guest of Honor",
    description: "💐 Being felicitated for empowering women through martial arts.",
    image: "/images/image6.JPG",
    count: "Self-Defense 7/10"
  },
  {
    id: 16,
    category: "selfdefense",
    title: "Corporate Training",
    description: "Conducting a specialized workshop for the Pacific Group's Women's Day celebration.",
    image: "/images/image10.jpg",
    count: "Self-Defense 8/10"
  },
  {
    id: 17,
    category: "selfdefense",
    title: "Official Appreciation",
    description: "Receiving recognition for leadership in community safety from local authorities.",
    image: "/images/image9.JPG",
    count: "Self-Defense 9/10"
  },
  {
    id: 18,
    category: "selfdefense",
    title: "Expert Collaboration",
    description: "Partnering with SHE TEAM to promote awareness and self-protection techniques.",
    image: "/images/image8.JPG",
    count: "Self-Defense 10/10"
  }
];

export const projects = [
  {
    id: 1,
    title: "Coach Appointment System",
    description: "A comprehensive booking platform with role-based authentication, and scheduling",
    image: "/images/home.png",  // Updated path
    tags: ["Django", "SQLlite3", "JavaScript", "Bootstrap"]
  },
  {
    id: 2,
    title: "DataSync",
    description: "Automated data pipeline developed in Python to import, clean, and synchronize external datasets into a centralized database.",
    image: "/images/DataSync.png",  // Updated path
    tags: ["Python", "ExternalDB"]
  },
  {
    id: 3,
    title: "POS Billing System",
    description: "Complete point-of-sale system with inventory management, billing, and reporting features.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Node.js", "Express", "MySQL"]
  },
  {
    id: 4,
    title: "Ahmedabad Post News",
    description: "Developed the backend infrastructure and RESTful APIs for automated news reporting and distribution.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Backend Dev", "API Integration", "Node.js", "Express", "MySQL"]
  },
  {
    id: 5,
    title: "Market Yantra",
    description: "AI-powered stock market analysis platform with real-time insights and predictive analytics.",
    image: "/images/market.png",  // Updated path
    tags: ["Python", "Machine Learning", "Ajax", "JavaScript", "REST API", "Django"]
  }
];

// ... rest of your data.js remains the same

export const skills = {
  languages: ["JavaScript", "Python", "HTML/CSS", "SQL"],
  frameworks: ["Node.js", "Express.js", "Django", "React.js"],
  databases: ["MySQL", "MariaDB", "MongoDB", "PostgreSQL"],
  tools: ["Git", "GitHub", "VS Code", "Postman", "Docker", "cursor", "Copilot"]
};

export const experience = [
  {
    id: 1,
    title: "Full Stack Developer",
    period: "01/2025 - 12/2025",
    company: "Arham Corporation, Ahmedabad",
    responsibilities: [
      "Developed responsive web applications using Django, JavaScript, HTML, and CSS",
      "Created and optimized backend services and APIs using Node.js and Express.js",
      "Designed and maintained MySQL/MariaDB schemas including indexing",
      "Integrated REST APIs and implemented authentication using JWT and OAuth",
      "Participated in testing, debugging, and performance improvements",
      "Collaborated with UI/UX and backend teams",
      "Documented workflows and code reviews; used Git & GitHub"
    ]
  },
  {
    id: 2,
    title: "Full Stack Developer – Intern",
    period: "10/2024 - 12/2024",
    company: "Arham Corporation, Ahmedabad, India",
    responsibilities: [
      "Developed UI features using Django templates, forms, and routing, integrating GET, POST, PUT, and DELETE API operations",
      "Built responsive pages with HTML, CSS, JavaScript, and Django template engine for improved user experience",
      "Built one project using React.js, focusing on component-based UI development",
      "Assisted with backend task development using Node.js, including basic API and database functionality",
      "Performed CRUD operations using MariaDB/MySQL and supported testing and debugging for stability improvements",
      "Used Git/GitHub for version control, branching, and collaborative development"
    ]
  }
];