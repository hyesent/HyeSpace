// ==================== HYESPACE — APPS DATA ====================

export const apps = [
  {
    id: "hyescriptures",
    name: "Hyescriptures",
    icon: "/assets/icons/hyescriptures.png",
    category: "Faith",
    tags: ["Religious", "Study", "Community"],
    description:
      "Hyescriptures is your all-in-one Bible app designed to help you read, study, and grow in God's Word every day.",
    shortDescription:
      "Your daily bread — Bible reading, devotionals, AI study tools & community.",
    version: "1.0.2",
    size: "120 MB",
    rating: 4.7,
    totalRatings: 3,
    lastUpdated: "2026-08-03",
    isNew: true,
    isUpdated: false,
    apkUrl: "https://drive.google.com/file/d/1qrMFy3V_79YXMHOyJCWOw4XdjQRE4C0C/view?usp=drive_link",
    webAppUrl: "https://hye-scriptures.vercel.app",
    screenshots: [
      "/assets/screenshots/hyescriptures/1.jpg",
      "/assets/screenshots/hyescriptures/2.jpg",
      "/assets/screenshots/hyescriptures/3.jpg",
      "/assets/screenshots/hyescriptures/4.jpg",
    ],
    changelog: [
      {
        version: "v1.0.1",
        date: "2026-08-06",
        notes: "Added more consistent audio bible performance.",
      },
       {
        version: "v1.0.2",
        date: "2026-08-16",
        notes: "Improved socials and better image handling",
      },
    ],
    subscriptionTiers: [
      {
        id: "hyescriptures-elder",
        name: "Elder",
        price:  750000,
        currency: "NGN",
        interval: "yearly",
        description:
          "Access to all features and content, including custom app icon switch and AI study tools.",
        features: [
          "All Bible translations",
          "AI study tools",
          "Custom app icon",
          "Ad-free experience",
          "Priority support",
        ],
        highlighted: true,
        paystackPlanCode: "PLN_9w4qnqs44shhxvv",
      },
    ],
  },

  {
    id: "zephye",
    name: "Zephye",
    icon: "/assets/icons/zephye.png",
    category: "Weather",
    tags: ["Utility", "Traffic", "AI"],
    description:
      "Zephye is a personal weather app that provides accurate weather and traffic information. It supports multiple locations, weather briefings, traffic updates, and a weather chatbot.",
    shortDescription:
      "Accurate weather and traffic information, multiple location support, weather briefings, traffic updates, and a weather chatbot.",
    version: "1.0.1",
    size: "5 MB",
    rating: 4.8,
    totalRatings: 10,
    lastUpdated: "2026-08-04",
    isNew: false,
    isUpdated: true,
    apkUrl: "https://drive.google.com/file/d/1PbzYl4oXug66keU_HhoBitH9DyeafFP6/view?usp=drivesdk",
    webAppUrl: "https://zephye.vercel.app",
    screenshots: [
      "/assets/screenshots/zephye/1.jpg",
      "/assets/screenshots/zephye/2.jpg",
      "/assets/screenshots/zephye/3.jpg",
      "/assets/screenshots/zephye/4.jpg",
    ],
    changelog: [
      {
        version: "v1.0.1",
        date: "2026-08-04",
        notes:
          "Improved reasoning and response, added map supporting pollen grain tracking, multiple weather view on tap for supported locations around the globe, and traffic + routing.",
      },
    ],
    subscriptionTiers: [],
  },

  {
    id: "hyelearner",
    name: "Hyelearner",
    icon: "/assets/icons/hyelearner.png",
    category: "Education",
    tags: ["Learning", "Exam Prep", "AI"],
    description:
      "Hyelearner Foundation is a comprehensive AI-powered exam preparation platform designed specifically for Pre-University students globally with over 30,000 questions and 100+ comprehensive lessons with tests.",
    shortDescription:
      "AI-powered exam prep for Pre-University students. Practice 30,000+ questions, get AI explanations, duel friends, and track your progress and weakness and receive drills to improve.",
    version: "1.0.0",
    size: "10 MB",
    rating: 4.8,
    totalRatings: 2,
    lastUpdated: "2026-08-03",
    isNew: true,
    isUpdated: false,
    apkUrl: "https://drive.google.com/file/d/1oOCa5-iy7TWQXXtso3kOeRePVUSU77h6/view?usp=drivesdk",
    webAppUrl: "https://hyelearner-foundation.vercel.app",
    screenshots: [
      "/assets/screenshots/hyelearner/1.jpg",
      "/assets/screenshots/hyelearner/2.jpg",
      "/assets/screenshots/hyelearner/3.jpg",
      "/assets/screenshots/hyelearner/4.jpg",
    ],
    changelog: [
      {
        version: "v1.0.1",
        date: "2026-07-26",
        notes: "Added comprehension and diagram support in practice.",
      },
    ],
    subscriptionTiers: [
      {
        id: "hyelearner-foundation",
        name: "Foundation",
        price: 150000,
        currency: "NGN",
        interval: "monthly",
        description:
          "Full access to all features and content, including AI explanations, duel friends, and progress tracking.",
        features: [
          "30,000+ practice questions",
          "AI-powered explanations",
          "Duel friends mode",
          "Progress tracking",
          "Weakness detection & drills",
        ],
        highlighted: true,
        paystackPlanCode: "PLN_xk4b9fvss0z9mbf",
      },
    ],
  },

  {
    id: "discypln",
    name: "Discypln",
    icon: "/assets/icons/discypln.png",
    category: "Productivity",
    tags: ["Personal", "Tasks", "Journal"],
    description:
      "Discypln is your all-in-one productivity app designed to help you stay organized, focused, and productive throughout the day.",
    shortDescription:
      "Your daily productivity companion — task management, organization, and journals.",
    version: "1.0.1",
    size: "3 MB",
    rating: 4.7,
    totalRatings: 3,
    lastUpdated: "2026-08-03",
    isNew: false,
    isUpdated: true,
    apkUrl: "https://drive.google.com/file/d/1vkaLnXCskjtlwt-LHfgwQd_asZAZpmmc/view?usp=drivesdk",
    webAppUrl: "https://discypln.vercel.app",
    screenshots: [
      "/assets/screenshots/discypln/1.jpg",
      "/assets/screenshots/discypln/2.jpg",
      "/assets/screenshots/discypln/3.jpg",
      "/assets/screenshots/discypln/4.jpg",
    ],
    changelog: [
      {
        version: "v1.0.1",
        date: "2026-08-06",
        notes: "UI and UX redesign, bug fixes.",
      },
    ],
    subscriptionTiers: [],
  },

  {
    id: "hyezen",
    name: "Hyezen",
    icon: "/assets/icons/hyezen.svg",
    category: "AI",
    tags: ["Voice", "Generation", "Cloning"],
    description:
      "Tiered voice generation and cloning platform, over 150 languages and accents across 6 continents.",
    shortDescription: "Voice generation and cloning platform.",
    version: "1.0.1",
    size: "6 MB",
    rating: 4.5,
    totalRatings: 15,
    lastUpdated: "2026-07-16",
    isNew: false,
    isUpdated: true,
    apkUrl: "",
    webAppUrl: "https://hyezen.vercel.app",
    screenshots: [
      "/assets/screenshots/hyezen/1.jpg",
      "/assets/screenshots/hyezen/2.jpg",
      "/assets/screenshots/hyezen/3.jpg",
      "/assets/screenshots/hyezen/4.jpg",
    ],
    changelog: [
      {
        version: "v1.0.1",
        date: "2026-07-16",
        notes: "Implemented more realistic voice features Batch I.",
      },
    ],
    subscriptionTiers: [],
  },

  {
    id: "hyecode",
    name: "HyecodeEditor",
    icon: "/assets/icons/hyecode.png",
    category: "Development",
    tags: ["Editor", "Code", "Tools"],
    description:
      "HyeCodeEditor is a powerful code editor designed for developers who want to write, debug, and deploy code efficiently.",
    shortDescription: "A powerful code editor for efficient development.",
    version: "1.0.1",
    size: "3 MB",
    rating: 4.7,
    totalRatings: 3,
    lastUpdated: "2026-08-03",
    isNew: false,
    isUpdated: true,
    apkUrl: "https://drive.google.com/file/d/1YHUHqj0PBTBEBoM8_n3j3eYnyWvo7WW_/view?usp=drivesdk",
    webAppUrl: "https://hyecode.vercel.app",
    screenshots: [
      "/assets/screenshots/hyecode/1.jpg",
      "/assets/screenshots/hyecode/2.jpg",
      "/assets/screenshots/hyecode/3.jpg",
      "/assets/screenshots/hyecode/4.jpg",
    ],
    changelog: [
      {
        version: "v1.0.1",
        date: "2026-08-06",
        notes: "Collapsible file tree.",
      },
    ],
    subscriptionTiers: [],
  },

  {
    id: "hye-terminal",
    name: "Hye Terminal",
    icon: "/assets/icons/hyeterminal.png",
    category: "Development",
    tags: ["Terminal", "Git", "Tools"],
    description:
      "Hye Terminal is a powerful terminal designed for developers who want to interact with their systems efficiently, seamless git deployments and supports Vue, React, Vanilla and basic terminal bash codes.",
    shortDescription:
      "Install Dependecies and Fast Deployments From Your Pockets.",
    version: "1.0.1",
    size: "5 MB",
    rating: 4.8,
    totalRatings: 4,
    lastUpdated: "2026-06-12",
    isNew: false,
    isUpdated: true,
    apkUrl: "https://drive.google.com/file/d/1yTfuDH2M_ThaEzRZVafPYTrJuQBPAwqu/view?usp=drivesdk",
    webAppUrl: "https://hye-terminal.vercel.app",
    screenshots: [
      "/assets/screenshots/hye-terminal/1.jpg",
      "/assets/screenshots/hye-terminal/2.jpg",
      "/assets/screenshots/hye-terminal/3.jpg",
      "/assets/screenshots/hye-terminal/4.jpg",
    ],
    changelog: [
      {
        version: "v1.0.1",
        date: "2026-08-06",
        notes: "Added Git integration and identity management.",
      },
    ],
    subscriptionTiers: [],
  },

  {
    id: "hyedebugger",
    name: "Hye Debugger",
    icon: "/assets/icons/hyedebugger.svg",
    category: "Development",
    tags: ["Debugging", "AI", "Tools"],
    description:
      "Hye Debugger is a powerful debugging tool designed for developers who want to identify and fix issues in their code efficiently.",
    shortDescription:
      "A powerful debugging tool for efficient code issue identification and resolution.",
    version: "1.0.1",
    size: "3 MB",
    rating: 4.7,
    totalRatings: 3,
    lastUpdated: "2026-06-22",
    isNew: false,
    isUpdated: true,
    apkUrl: "",
    webAppUrl: "https://hye-debugger.vercel.app",
    screenshots: [
      "/assets/screenshots/hye-debugger/1.jpg",
      "/assets/screenshots/hye-debugger/2.jpg",
      "/assets/screenshots/hye-debugger/3.jpg",
      "/assets/screenshots/hye-debugger/4.jpg",
    ],
    changelog: [
      {
        version: "v1.0.1",
        date: "2026-06-22",
        notes: "Added AI features.",
      },
    ],
    subscriptionTiers: [],
  },
];

// ==================== COMING SOON ====================

export const comingSoon = [
  {
    id: "hyeshot",
    name: "HyeShot",
    icon: "/assets/icons/hyeshot.svg",
    description:
      "Powerful video editor with voice sync, voice over, background swapping, noise reduction, and caption generation.",
    category: "Productivity",
  },
  {
    id: "hyeFVS",
    name: "HyeFVS",
    icon: "/assets/icons/hyefvs.svg",
    description: "Live call and streaming tool with face and voice swap plugin.",
    category: "Productivity",
  },
  {
    id: "hyelearner-campus",
    name: "HyeLearner Campus",
    icon: "/assets/icons/hyelearner-campus.png",
    description: "Educational platform for campus students.",
    category: "Education",
  },
];

// ==================== DEVELOPER INFO ====================

export const developer = {
  name: "Hyesent",
  bio: "I'm a software developer and product builder focused on creating intelligent, polished digital products. I work with React, Svelte, TypeScript, AI, SaaS, PWAs, backend architecture, payments, analytics, and modern UI/UX. I enjoy turning ambitious ideas into complete, scalable products — from architecture and feature systems to branding and user experience.",
  avatar: "/assets/dev-avatar.jpg",
  socials: {
    github: "https://github.com/hyesent",
    email: "hyacinthmichael36@gmail.com",
    website: "https://hyesent.github.io/hye-links/",
  },
};

// ==================== CATEGORIES ====================

export const categories = [
  "All",
  ...new Set(apps.map((app) => app.category)),
];
