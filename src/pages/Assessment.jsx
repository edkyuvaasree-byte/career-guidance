import { useState } from "react";

// ─── APTITUDE 10TH ────────────────────────────────────────────
const APTITUDE_10 = [
  {
    q: "If the cost price of 12 pens is equal to the selling price of 8 pens, what is the profit percentage?",
    options: ["25%", "33.33%", "50%", "66.67%"],
    correct: 2,
    explanation: "CP of 12 = SP of 8. Profit on 8 pens = 4 pens. Profit% = (4/8)×100 = 50%.",
  },
  {
    q: "A is the brother of B. B is the sister of C. C is the son of D. How is A related to D?",
    options: ["Son", "Daughter", "Nephew", "Cannot be determined"],
    correct: 0,
    explanation: "C is son of D. B is sister of C so also child of D. A is brother of B so A is also son of D.",
  },
  {
    q: "In a code language APPLE is written as BQQMF. How is MANGO written?",
    options: ["NBNHP", "NBOHP", "NBOIP", "NCOHP"],
    correct: 1,
    explanation: "Each letter shifts by +1. M→N, A→B, N→O, G→H, O→P. So MANGO = NBOHP.",
  },
  {
    q: "Walking at 3/4 of normal speed a man reaches office 20 minutes late. What is his normal travel time?",
    options: ["45 minutes", "60 minutes", "75 minutes", "90 minutes"],
    correct: 1,
    explanation: "At 3/4 speed time becomes 4/3 of normal. Extra time = 1/3 of normal = 20 min. Normal = 60 min.",
  },
  {
    q: "Find the missing number in the series: 3, 7, 13, 21, 31, __",
    options: ["41", "43", "45", "47"],
    correct: 1,
    explanation: "Differences are 4,6,8,10,12. Next = 31+12 = 43.",
  },
];

// ─── APTITUDE 12TH ────────────────────────────────────────────
const APTITUDE_12 = [
  {
    q: "A shopkeeper marks price 40% above cost and gives 20% discount. What is his profit percentage?",
    options: ["10% profit", "12% profit", "8% profit", "10% loss"],
    correct: 1,
    explanation: "Let CP=100. MP=140. After 20% discount SP=112. Profit=12%.",
  },
  {
    q: "If log(x) + log(y) = log(x+y), which is true?",
    options: ["x+y=1", "x-y=1", "xy=x+y", "x/y=x+y"],
    correct: 2,
    explanation: "log(xy)=log(x+y) means xy=x+y.",
  },
  {
    q: "In how many ways can the letters of LEADER be arranged?",
    options: ["360", "720", "120", "480"],
    correct: 0,
    explanation: "LEADER has 6 letters with E repeated twice. Ways = 6!/2! = 360.",
  },
  {
    q: "A train 120m long passes a pole in 12 sec. How long to pass a 180m platform?",
    options: ["24 sec", "30 sec", "36 sec", "40 sec"],
    correct: 1,
    explanation: "Speed=120/12=10 m/s. Distance=120+180=300m. Time=300/10=30 sec.",
  },
  {
    q: "A data set has mean 50 and SD 10. Each value is multiplied by 2. New mean and SD?",
    options: ["100 and 10", "50 and 20", "100 and 20", "50 and 10"],
    correct: 2,
    explanation: "Multiplying by 2 doubles both mean and SD. New mean=100, SD=20.",
  },
];

// ─── INTEREST 10TH ────────────────────────────────────────────
const INTEREST_10 = {
  categories: ["group1","group2","group3","group4","group5","group6"],
  labels: {
    group1: "Physics, Chemistry, Biology, Maths",
    group2: "Physics, Chemistry, Computer Science, Maths",
    group3: "Physics, Chemistry, Biology, Computer Science",
    group4: "Accounts, Commerce, Economics, Computer Application",
    group5: "Accounts, Commerce, Economics, Business Maths",
    group6: "Accounts, Commerce, Computer Application, Business Maths",
  },
  questions: [
    {
      q: "When you have free time what do you enjoy most?",
      options: [
        "Solving maths or science puzzles",
        "Coding, gaming or building things on computer",
        "Learning about human body or nature",
        "Managing money, trading or playing business games",
      ],
      scores: [
        { group1:2, group2:2, group3:1, group4:0, group5:2, group6:0 },
        { group1:0, group2:2, group3:1, group4:2, group5:0, group6:2 },
        { group1:2, group2:0, group3:2, group4:0, group5:0, group6:0 },
        { group1:0, group2:0, group3:0, group4:2, group5:2, group6:2 },
      ],
    },
    {
      q: "Which future career excites you the most?",
      options: [
        "Doctor, Surgeon or Medical Researcher",
        "Software Engineer, AI Developer or Data Scientist",
        "Chartered Accountant, Banker or Financial Analyst",
        "Business Owner, Digital Marketer or Entrepreneur",
      ],
      scores: [
        { group1:2, group2:0, group3:2, group4:0, group5:0, group6:0 },
        { group1:1, group2:2, group3:1, group4:2, group5:0, group6:1 },
        { group1:0, group2:0, group3:0, group4:1, group5:2, group6:1 },
        { group1:0, group2:1, group3:0, group4:2, group5:1, group6:2 },
      ],
    },
    {
      q: "What matters most to you in your future career?",
      options: [
        "Helping people and saving lives",
        "Building technology and solving technical problems",
        "Financial success and business growth",
        "Stability, respect and government recognition",
      ],
      scores: [
        { group1:2, group2:0, group3:2, group4:0, group5:0, group6:0 },
        { group1:1, group2:2, group3:1, group4:2, group5:0, group6:1 },
        { group1:0, group2:0, group3:0, group4:2, group5:2, group6:2 },
        { group1:1, group2:1, group3:1, group4:0, group5:1, group6:0 },
      ],
    },
  ],
};

// ─── INTEREST 12TH ────────────────────────────────────────────
const INTEREST_12 = {
  categories: ["engineering","medical","bca_mca","ca_finance","bba_management","design_media"],
  labels: {
    engineering:    "Engineering / BTech",
    medical:        "Medical / MBBS / Pharmacy",
    bca_mca:        "BCA / BSc CS / MCA",
    ca_finance:     "CA / BCom / Banking",
    bba_management: "BBA / MBA / Management",
    design_media:   "Design / Media / Animation",
  },
  questions: [
    {
      q: "Which activity excites you the most?",
      options: [
        "Coding, building apps or working with machines",
        "Understanding the human body or helping sick people",
        "Managing accounts, stocks or running a business",
        "Designing, writing or creating creative content",
      ],
      scores: [
        { engineering:2, medical:0, bca_mca:2, ca_finance:0, bba_management:0, design_media:1 },
        { engineering:0, medical:2, bca_mca:0, ca_finance:0, bba_management:0, design_media:0 },
        { engineering:0, medical:0, bca_mca:1, ca_finance:2, bba_management:2, design_media:0 },
        { engineering:0, medical:0, bca_mca:1, ca_finance:0, bba_management:1, design_media:2 },
      ],
    },
    {
      q: "Where do you see yourself in 5 years?",
      options: [
        "Working in a top tech company or startup",
        "Completing MBBS or medical specialisation",
        "Running a business or working in finance",
        "Working in a creative or media field",
      ],
      scores: [
        { engineering:2, medical:0, bca_mca:2, ca_finance:0, bba_management:1, design_media:0 },
        { engineering:0, medical:2, bca_mca:0, ca_finance:0, bba_management:0, design_media:0 },
        { engineering:0, medical:0, bca_mca:0, ca_finance:2, bba_management:2, design_media:0 },
        { engineering:0, medical:0, bca_mca:0, ca_finance:0, bba_management:0, design_media:2 },
      ],
    },
    {
      q: "What is your biggest strength?",
      options: [
        "Logical and analytical thinking",
        "Memory, patience and caring nature",
        "Communication and leadership skills",
        "Creativity and out of the box thinking",
      ],
      scores: [
        { engineering:2, medical:1, bca_mca:2, ca_finance:1, bba_management:0, design_media:0 },
        { engineering:0, medical:2, bca_mca:0, ca_finance:1, bba_management:1, design_media:0 },
        { engineering:0, medical:0, bca_mca:0, ca_finance:1, bba_management:2, design_media:1 },
        { engineering:0, medical:0, bca_mca:1, ca_finance:0, bba_management:0, design_media:2 },
      ],
    },
  ],
};

// ─── OTHER STAGES ─────────────────────────────────────────────
const OTHER_STAGES = {

  ug: {
    categories: ["software_job","data_science","pg_mba","govt_exam","business"],
    labels: {
      software_job: "Software / IT Job",
      data_science: "Data Science / AI / ML",
      pg_mba:       "PG / MBA / Higher Studies",
      govt_exam:    "Government Exam (UPSC/TNPSC/SSC)",
      business:     "Business / Freelance / Startup",
    },
    questions: [
      {
        q: "What is your current or completed UG degree?",
        options: [
          "Engineering / BTech / BE",
          "BSc (Physics / Chemistry / Maths / Biology)",
          "BCA / BSc CS / BSc IT",
          "BCom / BBA / BBM (Commerce)",
          "BA (English / History / Psychology / Languages)",
          "Professional (Law / Nursing / BEd / Agriculture)",
          "Other / Not listed here",
        ],
        scores: [
          { software_job:2, data_science:2, pg_mba:2, govt_exam:0, business:1 },
          { software_job:0, data_science:2, pg_mba:2, govt_exam:1, business:0 },
          { software_job:2, data_science:2, pg_mba:1, govt_exam:0, business:1 },
          { software_job:0, data_science:1, pg_mba:2, govt_exam:1, business:2 },
          { software_job:0, data_science:0, pg_mba:2, govt_exam:2, business:1 },
          { software_job:0, data_science:0, pg_mba:2, govt_exam:2, business:0 },
          { software_job:1, data_science:1, pg_mba:1, govt_exam:1, business:1 },
        ],
      },
      {
        q: "What do you want to do after UG?",
        options: [
          "Get a job as soon as possible",
          "Pursue PG or MBA for better opportunities",
          "Prepare for government exams",
          "Start my own business or freelance",
          "No idea — that is why I am here",
        ],
        scores: [
          { software_job:2, data_science:1, pg_mba:0, govt_exam:0, business:0 },
          { software_job:0, data_science:1, pg_mba:2, govt_exam:0, business:0 },
          { software_job:0, data_science:0, pg_mba:0, govt_exam:2, business:0 },
          { software_job:0, data_science:0, pg_mba:0, govt_exam:0, business:2 },
          { software_job:1, data_science:1, pg_mba:1, govt_exam:1, business:1 },
        ],
      },
      {
        q: "How is your academic performance?",
        options: [
          "Above 8 CGPA / 75% and above",
          "6 to 8 CGPA / 60 to 75%",
          "Below 6 CGPA",
          "Marks do not define me — I have strong skills",
        ],
        scores: [
          { software_job:2, data_science:2, pg_mba:2, govt_exam:2, business:1 },
          { software_job:1, data_science:1, pg_mba:1, govt_exam:1, business:1 },
          { software_job:0, data_science:0, pg_mba:0, govt_exam:0, business:1 },
          { software_job:1, data_science:1, pg_mba:0, govt_exam:0, business:2 },
        ],
      },
      {
        q: "Which skill are you most confident in?",
        options: [
          "Coding or technical skills",
          "Analytical thinking and data",
          "Communication and management",
          "Creative skills like design or writing",
        ],
        scores: [
          { software_job:2, data_science:1, pg_mba:0, govt_exam:0, business:0 },
          { software_job:1, data_science:2, pg_mba:1, govt_exam:1, business:0 },
          { software_job:0, data_science:0, pg_mba:2, govt_exam:1, business:2 },
          { software_job:0, data_science:0, pg_mba:1, govt_exam:0, business:1 },
        ],
      },
      {
        q: "What kind of work environment suits you?",
        options: [
          "Corporate tech company with fast growth",
          "Research or academic environment",
          "Government office with stability",
          "Startup or work from home independently",
        ],
        scores: [
          { software_job:2, data_science:1, pg_mba:1, govt_exam:0, business:0 },
          { software_job:0, data_science:2, pg_mba:2, govt_exam:1, business:0 },
          { software_job:0, data_science:0, pg_mba:0, govt_exam:2, business:0 },
          { software_job:0, data_science:1, pg_mba:0, govt_exam:0, business:2 },
        ],
      },
      {
        q: "What matters most in your ideal career?",
        options: [
          "High salary and fast growth",
          "Deep knowledge and expertise",
          "Job security and stability",
          "Freedom and being my own boss",
        ],
        scores: [
          { software_job:2, data_science:1, pg_mba:1, govt_exam:0, business:1 },
          { software_job:0, data_science:2, pg_mba:2, govt_exam:1, business:0 },
          { software_job:0, data_science:0, pg_mba:0, govt_exam:2, business:0 },
          { software_job:0, data_science:0, pg_mba:0, govt_exam:0, business:2 },
        ],
      },
      {
        q: "Are you open to studying 2 more years for a better career?",
        options: [
          "Yes — PG or MBA will open better doors",
          "Yes — but only if I get into a top college",
          "No — I want to start working now",
          "Maybe — depends on what I get",
        ],
        scores: [
          { software_job:0, data_science:1, pg_mba:2, govt_exam:1, business:0 },
          { software_job:0, data_science:0, pg_mba:2, govt_exam:0, business:0 },
          { software_job:2, data_science:1, pg_mba:0, govt_exam:0, business:2 },
          { software_job:1, data_science:1, pg_mba:1, govt_exam:1, business:1 },
        ],
      },
      {
        q: "Which of these paths sounds most exciting to you?",
        options: [
          "Get a software job and grow to senior engineer",
          "Do MBA and become a business leader",
          "Clear UPSC and become an IAS officer",
          "Start a startup or freelance business",
        ],
        scores: [
          { software_job:2, data_science:1, pg_mba:0, govt_exam:0, business:0 },
          { software_job:0, data_science:0, pg_mba:2, govt_exam:0, business:1 },
          { software_job:0, data_science:0, pg_mba:0, govt_exam:2, business:0 },
          { software_job:0, data_science:0, pg_mba:0, govt_exam:0, business:2 },
        ],
      },
    ],
  },

  working: {
    categories: ["tech_switch","management","govt_exam","business","freelance"],
    labels: {
      tech_switch: "Switch to Tech / Data Science",
      management:  "Move into Management / Leadership",
      govt_exam:   "Prepare for Government Exam",
      business:    "Start Your Own Business",
      freelance:   "Go Freelance / Consulting",
    },
    questions: [
      {
        q: "What is your current job role or field?",
        options: [
          "IT / Software / Tech (Developer, Tester, Analyst, Designer)",
          "Government / Public Sector (Officer, Teacher, Clerk, Police)",
          "Healthcare / Education (Doctor, Nurse, Professor, Trainer)",
          "Business / Sales / Marketing / Operations",
          "Finance / Banking / Accounts / Insurance",
          "Other / Not listed here",
        ],
        scores: [
          { tech_switch:1, management:1, govt_exam:0, business:1, freelance:2 },
          { tech_switch:1, management:1, govt_exam:0, business:1, freelance:1 },
          { tech_switch:0, management:1, govt_exam:1, business:1, freelance:1 },
          { tech_switch:1, management:2, govt_exam:0, business:2, freelance:1 },
          { tech_switch:1, management:2, govt_exam:1, business:2, freelance:1 },
          { tech_switch:1, management:1, govt_exam:1, business:1, freelance:1 },
        ],
      },
      {
        q: "How long have you been working?",
        options: [
          "Less than 1 year",
          "1 to 3 years",
          "3 to 7 years",
          "More than 7 years",
        ],
        scores: [
          { tech_switch:2, management:0, govt_exam:1, business:0, freelance:1 },
          { tech_switch:2, management:1, govt_exam:1, business:1, freelance:1 },
          { tech_switch:1, management:2, govt_exam:1, business:2, freelance:1 },
          { tech_switch:0, management:2, govt_exam:0, business:2, freelance:2 },
        ],
      },
      {
        q: "Why are you looking for guidance?",
        options: [
          "Want to switch to a completely different field",
          "Want to grow faster in my current field",
          "Feel stuck and don't know next step",
          "Want to start my own business",
        ],
        scores: [
          { tech_switch:2, management:0, govt_exam:1, business:0, freelance:1 },
          { tech_switch:1, management:2, govt_exam:0, business:0, freelance:0 },
          { tech_switch:1, management:1, govt_exam:1, business:1, freelance:1 },
          { tech_switch:0, management:0, govt_exam:0, business:2, freelance:1 },
        ],
      },
      {
        q: "What is your biggest frustration at work?",
        options: [
          "No growth or learning opportunities",
          "Low salary compared to effort",
          "Work is boring and not challenging",
          "Bad work culture or toxic management",
        ],
        scores: [
          { tech_switch:2, management:1, govt_exam:0, business:1, freelance:1 },
          { tech_switch:1, management:0, govt_exam:1, business:2, freelance:2 },
          { tech_switch:2, management:1, govt_exam:0, business:1, freelance:1 },
          { tech_switch:0, management:0, govt_exam:1, business:1, freelance:2 },
        ],
      },
      {
        q: "Which of these excites you most right now?",
        options: [
          "Data Science, AI or high paying tech role",
          "Product Management or senior leadership",
          "Government exam and stable respected career",
          "Entrepreneurship, consulting or freelancing",
        ],
        scores: [
          { tech_switch:2, management:0, govt_exam:0, business:0, freelance:1 },
          { tech_switch:0, management:2, govt_exam:0, business:1, freelance:0 },
          { tech_switch:0, management:0, govt_exam:2, business:0, freelance:0 },
          { tech_switch:0, management:1, govt_exam:0, business:2, freelance:2 },
        ],
      },
      {
        q: "What is your priority right now?",
        options: [
          "More money as soon as possible",
          "Better work life balance",
          "More meaningful and satisfying work",
          "Long term stability and security",
        ],
        scores: [
          { tech_switch:2, management:1, govt_exam:0, business:2, freelance:1 },
          { tech_switch:0, management:0, govt_exam:1, business:0, freelance:2 },
          { tech_switch:1, management:1, govt_exam:0, business:2, freelance:1 },
          { tech_switch:0, management:1, govt_exam:2, business:0, freelance:0 },
        ],
      },
      {
        q: "How much time can you give daily for upskilling?",
        options: [
          "1 to 2 hours daily",
          "3 to 4 hours daily",
          "Only on weekends",
          "Very limited — barely any time",
        ],
        scores: [
          { tech_switch:1, management:1, govt_exam:1, business:1, freelance:1 },
          { tech_switch:2, management:2, govt_exam:2, business:2, freelance:2 },
          { tech_switch:1, management:1, govt_exam:1, business:1, freelance:1 },
          { tech_switch:0, management:0, govt_exam:0, business:1, freelance:0 },
        ],
      },
    ],
  },

  business: {
    categories: ["digital_online","service_based","product_based","franchise","freelance"],
    labels: {
      digital_online: "Digital / Online Business",
      service_based:  "Service Based Business",
      product_based:  "Product Based Business",
      franchise:      "Franchise Model",
      freelance:      "Freelancing",
    },
    questions: [
      {
        q: "What is your current situation?",
        options: [
          "Student wanting to start something on the side",
          "Working professional wanting to quit and start",
          "Already have a small idea or side income",
          "Have savings and fully ready to invest",
        ],
        scores: [
          { digital_online:2, service_based:1, product_based:0, franchise:0, freelance:2 },
          { digital_online:1, service_based:2, product_based:1, franchise:1, freelance:1 },
          { digital_online:2, service_based:2, product_based:2, franchise:1, freelance:2 },
          { digital_online:1, service_based:1, product_based:2, franchise:2, freelance:0 },
        ],
      },
      {
        q: "How much can you invest to start?",
        options: [
          "Zero — I want to start with no money at all",
          "Up to ₹10,000 to ₹50,000",
          "₹50,000 to ₹2 Lakhs",
          "More than ₹2 Lakhs — ready to invest",
        ],
        scores: [
          { digital_online:2, service_based:1, product_based:0, franchise:0, freelance:2 },
          { digital_online:2, service_based:2, product_based:1, franchise:0, freelance:1 },
          { digital_online:1, service_based:2, product_based:2, franchise:1, freelance:0 },
          { digital_online:0, service_based:1, product_based:2, franchise:2, freelance:0 },
        ],
      },
      {
        q: "What skill do you already have?",
        options: [
          "Technical — coding, design, engineering",
          "Communication — teaching, sales, content creation",
          "Creative — art, cooking, crafts, music",
          "Management — organising, planning, leading teams",
        ],
        scores: [
          { digital_online:2, service_based:1, product_based:1, franchise:0, freelance:2 },
          { digital_online:2, service_based:2, product_based:0, franchise:1, freelance:2 },
          { digital_online:1, service_based:1, product_based:2, franchise:0, freelance:1 },
          { digital_online:1, service_based:2, product_based:1, franchise:2, freelance:0 },
        ],
      },
      {
        q: "How much risk are you comfortable with?",
        options: [
          "Very low — I need guaranteed returns",
          "Moderate — calculated risk is fine",
          "High — I am ready to fail and learn",
          "Not sure yet",
        ],
        scores: [
          { digital_online:1, service_based:1, product_based:0, franchise:2, freelance:1 },
          { digital_online:2, service_based:2, product_based:1, franchise:1, freelance:1 },
          { digital_online:1, service_based:1, product_based:2, franchise:0, freelance:1 },
          { digital_online:1, service_based:1, product_based:1, franchise:1, freelance:1 },
        ],
      },
      {
        q: "Do you want to run this full time or alongside job or studies?",
        options: [
          "Full time — I am 100% committed right now",
          "Part time — alongside my job or studies",
          "Start part time then go full time when ready",
          "Not sure yet — just want to explore",
        ],
        scores: [
          { digital_online:2, service_based:2, product_based:2, franchise:2, freelance:1 },
          { digital_online:2, service_based:1, product_based:0, franchise:0, freelance:2 },
          { digital_online:1, service_based:1, product_based:1, franchise:1, freelance:2 },
          { digital_online:1, service_based:1, product_based:0, franchise:1, freelance:1 },
        ],
      },
      {
        q: "What is your main goal from this business?",
        options: [
          "Replace my current salary as soon as possible",
          "Build long term wealth and financial freedom",
          "Follow my passion and do what I love",
          "Create jobs and make a social impact",
        ],
        scores: [
          { digital_online:1, service_based:2, product_based:1, franchise:2, freelance:2 },
          { digital_online:2, service_based:1, product_based:2, franchise:1, freelance:1 },
          { digital_online:1, service_based:1, product_based:2, franchise:0, freelance:2 },
          { digital_online:0, service_based:2, product_based:1, franchise:1, freelance:0 },
        ],
      },
      {
        q: "What kind of business excites you most?",
        options: [
          "Online — YouTube, e-commerce, digital marketing",
          "Service — tutoring, salon, repair, consulting",
          "Product — make or sell physical products",
          "Franchise — buy an existing proven brand",
        ],
        scores: [
          { digital_online:2, service_based:0, product_based:0, franchise:0, freelance:1 },
          { digital_online:0, service_based:2, product_based:0, franchise:0, freelance:2 },
          { digital_online:0, service_based:0, product_based:2, franchise:0, freelance:0 },
          { digital_online:0, service_based:0, product_based:0, franchise:2, freelance:0 },
        ],
      },
    ],
  },
};

// ─── GROUPS 12TH ──────────────────────────────────────────────
const GROUPS_12 = [
  { key:"g1", label:"Group 1", subjects:"Physics, Chemistry, Biology, Maths" },
  { key:"g2", label:"Group 2", subjects:"Physics, Chemistry, Computer Science, Maths" },
  { key:"g3", label:"Group 3", subjects:"Physics, Chemistry, Biology, Computer Science" },
  { key:"g4", label:"Group 4", subjects:"Accounts, Commerce, Economics, Computer Application" },
  { key:"g5", label:"Group 5", subjects:"Accounts, Commerce, Economics, Business Maths" },
  { key:"g6", label:"Group 6", subjects:"Accounts, Commerce, Computer Application, Business Maths" },
];

const MARKS_OPTIONS = [
  { key:"above90", label:"Above 90%",  bonus:3 },
  { key:"75to90",  label:"75% to 90%", bonus:2 },
  { key:"60to75",  label:"60% to 75%", bonus:1 },
  { key:"below60", label:"Below 60%",  bonus:0 },
];

// ─── SCORE CALCULATOR ─────────────────────────────────────────
function calcScores(categories, questions, answers) {
  const scores = {};
  categories.forEach(c => scores[c] = 0);
  answers.forEach((ansIdx, qIdx) => {
    const s = questions[qIdx]?.scores?.[ansIdx];
    if (s) categories.forEach(c => { scores[c] += s[c] || 0; });
  });
  const total = categories.reduce((a,c) => a + scores[c], 0);
  const pct   = {};
  categories.forEach(c => { pct[c] = total > 0 ? Math.round((scores[c]/total)*100) : 0; });
  return pct;
}

// ─── APTITUDE BLOCK ───────────────────────────────────────────
function AptitudeBlock({ questions, onDone, onBack, progressStart, progressEnd, label }) {
  const [idx, setIdx]           = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect]   = useState(0);

  const q   = questions[idx];
  const pct = Math.round(progressStart + ((idx/questions.length)*(progressEnd-progressStart)));

  const handleNext = () => {
    if (!revealed) {
      setRevealed(true);
      if (selected === q.correct) setCorrect(c => c+1);
      return;
    }
    if (idx+1 < questions.length) {
      setIdx(idx+1); setSelected(null); setRevealed(false);
    } else {
      onDone(correct + (selected === q.correct ? 1 : 0));
    }
  };

  return (
    <div className="assess-wrapper">
      <div className="assess-topbar">
        <button className="assess-back" onClick={() => idx===0 ? onBack() : (setIdx(idx-1), setSelected(null), setRevealed(false))}>← Back</button>
        <div className="assess-counter">{label} — Q{idx+1} of {questions.length}</div>
      </div>
      <div className="assess-progress-bar">
        <div className="assess-progress-fill" style={{ width:pct+"%" }}/>
      </div>
      <div className="assess-card">
        <div className="assess-qnum">🧠 Aptitude Test — Q{idx+1}</div>
        <div className="assess-question">{q.q}</div>
        <div className="assess-options">
          {q.options.map((opt,i) => {
            let cls = "assess-option";
            if (revealed) {
              if (i===q.correct) cls += " correct";
              else if (i===selected) cls += " wrong";
            } else if (i===selected) cls += " selected";
            return (
              <div key={i} className={cls} onClick={() => !revealed && setSelected(i)}>
                <div className="assess-opt-letter">{String.fromCharCode(65+i)}</div>
                <div className="assess-opt-text">{opt}</div>
                {revealed && i===q.correct && <div className="assess-tick">✓</div>}
                {revealed && i===selected && i!==q.correct && <div className="assess-cross">✗</div>}
              </div>
            );
          })}
        </div>
        {revealed && (
          <div className={`assess-explanation ${selected===q.correct?"correct-exp":"wrong-exp"}`}>
            {selected===q.correct?"✅ Correct! ":"❌ Incorrect! "}{q.explanation}
          </div>
        )}
        <button className="assess-next" onClick={handleNext} disabled={selected===null}>
          {!revealed ? "Check Answer" : idx+1<questions.length ? "Next Question →" : "Continue →"}
        </button>
      </div>
      <div className="assess-tip">💡 These questions test your analytical ability!</div>
    </div>
  );
}

// ─── INTEREST BLOCK ───────────────────────────────────────────
function InterestBlock({ data, onDone, onBack, progressStart, progressEnd, label, btnLabel }) {
  const [idx, setIdx]           = useState(0);
  const [answers, setAnswers]   = useState([]);
  const [selected, setSelected] = useState(null);

  const q   = data.questions[idx];
  const pct = Math.round(progressStart + ((idx/data.questions.length)*(progressEnd-progressStart)));

  const handleNext = () => {
    if (selected===null) return;
    const newAns = [...answers, selected];
    if (idx+1 < data.questions.length) {
      setAnswers(newAns); setIdx(idx+1); setSelected(null);
    } else {
      onDone(newAns);
    }
  };

  return (
    <div className="assess-wrapper">
      <div className="assess-topbar">
        <button className="assess-back" onClick={() => idx===0 ? onBack() : (setIdx(idx-1), setSelected(null))}>← Back</button>
        <div className="assess-counter">{label} — Q{idx+1} of {data.questions.length}</div>
      </div>
      <div className="assess-progress-bar">
        <div className="assess-progress-fill" style={{ width:pct+"%" }}/>
      </div>
      <div className="assess-card">
        <div className="assess-qnum">❤️ {label} — Q{idx+1}</div>
        <div className="assess-question">{q.q}</div>
        <div className="assess-options">
          {q.options.map((opt,i) => (
            <div key={i} className={`assess-option ${selected===i?"selected":""}`} onClick={() => setSelected(i)}>
              <div className="assess-opt-letter">{String.fromCharCode(65+i)}</div>
              <div className="assess-opt-text">{opt}</div>
            </div>
          ))}
        </div>
        <button className="assess-next" onClick={handleNext} disabled={selected===null}>
          {idx+1===data.questions.length ? (btnLabel||"See My Results 🎯") : "Next Question →"}
        </button>
      </div>
      <div className="assess-tip">💡 No right or wrong — answer what feels most like you!</div>
    </div>
  );
}

// ─── OTHER STAGE BLOCK ────────────────────────────────────────
function OtherStageBlock({ stageData, onDone, onBack }) {
  const [idx, setIdx]           = useState(0);
  const [answers, setAnswers]   = useState([]);
  const [selected, setSelected] = useState(null);

  const { questions } = stageData;
  const q   = questions[idx];
  const pct = Math.round((idx/questions.length)*100);

  const handleNext = () => {
    if (selected===null) return;
    const newAns = [...answers, selected];
    if (idx+1 < questions.length) {
      setAnswers(newAns); setIdx(idx+1); setSelected(null);
    } else {
      onDone(newAns);
    }
  };

  return (
    <div className="assess-wrapper">
      <div className="assess-topbar">
        <button className="assess-back" onClick={() => idx===0 ? onBack() : (setIdx(idx-1), setSelected(null))}>← Back</button>
        <div className="assess-counter">Question {idx+1} of {questions.length}</div>
      </div>
      <div className="assess-progress-bar">
        <div className="assess-progress-fill" style={{ width:pct+"%" }}/>
      </div>
      <div className="assess-card">
        <div className="assess-qnum">
          {idx < 2 ? "📋 About You" : "❤️ Interest"} — Q{idx+1}
        </div>
        <div className="assess-question">{q.q}</div>
        <div className="assess-options">
          {q.options.map((opt,i) => (
            <div key={i} className={`assess-option ${selected===i?"selected":""}`} onClick={() => setSelected(i)}>
              <div className="assess-opt-letter">{String.fromCharCode(65+i)}</div>
              <div className="assess-opt-text">{opt}</div>
            </div>
          ))}
        </div>
        <button className="assess-next" onClick={handleNext} disabled={selected===null}>
          {idx+1===questions.length ? "See My Career GPS Results 🎯" : "Next Question →"}
        </button>
      </div>
      <div className="assess-tip">💡 Answer honestly — the more honest you are the better your results!</div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────
export default function Assessment({ setPage, currentUser, stage }) {

  const save = (data) => {
    const progress = JSON.parse(localStorage.getItem("cg_progress_" + currentUser.email) || "{}");
    localStorage.setItem("cg_progress_" + currentUser.email, JSON.stringify({ ...progress, ...data, stage, done:true }));
    setPage("results");
  };

  // ── 10TH ───────────────────────────────────────────────────
  const [phase10, setPhase10]           = useState("aptitude");
  const [apt10Correct, setApt10Correct] = useState(0);

  if (stage === "school10") {
    if (phase10 === "aptitude") {
      return (
        <AptitudeBlock
          questions={APTITUDE_10}
          label="Aptitude Test"
          progressStart={0} progressEnd={60}
          onBack={() => setPage("dashboard")}
          onDone={(c) => { setApt10Correct(c); setPhase10("interest"); }}
        />
      );
    }
    return (
      <InterestBlock
        data={INTEREST_10}
        label="Interest Test"
        progressStart={60} progressEnd={100}
        onBack={() => setPhase10("aptitude")}
        onDone={(answers) => {
          const cats   = INTEREST_10.categories;
          const pcts   = calcScores(cats, INTEREST_10.questions, answers);
          const sorted = cats.map(c => ({ key:c, label:INTEREST_10.labels[c], score:pcts[c] })).sort((a,b) => b.score-a.score).slice(0,3);
          save({ topMatches:sorted, scores:pcts, aptCorrect:apt10Correct, totalAptitude:APTITUDE_10.length });
        }}
      />
    );
  }

  // ── 12TH ───────────────────────────────────────────────────
  const [phase12, setPhase12]           = useState("group");
  const [sel12Group, setSel12Group]     = useState(null);
  const [sel12Marks, setSel12Marks]     = useState(null);
  const [apt12Correct, setApt12Correct] = useState(0);

  if (stage === "school12") {

    if (phase12 === "group") {
      return (
        <div className="assess-wrapper">
          <div className="assess-topbar">
            <button className="assess-back" onClick={() => setPage("dashboard")}>← Back</button>
            <div className="assess-counter">Step 1 of 4</div>
          </div>
          <div className="assess-progress-bar"><div className="assess-progress-fill" style={{ width:"10%" }}/></div>
          <div className="assess-card">
            <div className="assess-qnum">📋 About You</div>
            <div className="assess-question">Which group did you take in 11th and 12th?</div>
            <div className="assess-options">
              {GROUPS_12.map((g,i) => (
                <div key={g.key} className={`assess-option ${sel12Group===g.key?"selected":""}`} onClick={() => setSel12Group(g.key)}>
                  <div className="assess-opt-letter">{String.fromCharCode(65+i)}</div>
                  <div className="assess-opt-text"><b>{g.label}</b> — {g.subjects}</div>
                </div>
              ))}
            </div>
            <button className="assess-next" onClick={() => setPhase12("marks")} disabled={!sel12Group}>Next →</button>
          </div>
          <div className="assess-tip">💡 Select the group you studied in 11th and 12th standard</div>
        </div>
      );
    }

    if (phase12 === "marks") {
      return (
        <div className="assess-wrapper">
          <div className="assess-topbar">
            <button className="assess-back" onClick={() => setPhase12("group")}>← Back</button>
            <div className="assess-counter">Step 2 of 4</div>
          </div>
          <div className="assess-progress-bar"><div className="assess-progress-fill" style={{ width:"20%" }}/></div>
          <div className="assess-card">
            <div className="assess-qnum">📋 About You</div>
            <div className="assess-question">What is your approximate percentage in 12th?</div>
            <div className="assess-options">
              {MARKS_OPTIONS.map((m,i) => (
                <div key={m.key} className={`assess-option ${sel12Marks===m.key?"selected":""}`} onClick={() => setSel12Marks(m.key)}>
                  <div className="assess-opt-letter">{String.fromCharCode(65+i)}</div>
                  <div className="assess-opt-text">{m.label}</div>
                </div>
              ))}
            </div>
            <button className="assess-next" onClick={() => setPhase12("aptitude")} disabled={!sel12Marks}>Start Aptitude Test →</button>
          </div>
          <div className="assess-tip">💡 Your marks help us suggest realistic courses for you</div>
        </div>
      );
    }

    if (phase12 === "aptitude") {
      return (
        <AptitudeBlock
          questions={APTITUDE_12}
          label="Aptitude Test"
          progressStart={20} progressEnd={60}
          onBack={() => setPhase12("marks")}
          onDone={(c) => { setApt12Correct(c); setPhase12("interest"); }}
        />
      );
    }

    return (
      <InterestBlock
        data={INTEREST_12}
        label="Interest Test"
        progressStart={60} progressEnd={100}
        btnLabel="See My Career GPS Results 🎯"
        onBack={() => setPhase12("aptitude")}
        onDone={(answers) => {
          const cats = INTEREST_12.categories;
          const groupBonus = {
            g1:{ engineering:3, medical:3, bca_mca:0, ca_finance:0, bba_management:0, design_media:0 },
            g2:{ engineering:3, medical:0, bca_mca:3, ca_finance:0, bba_management:0, design_media:1 },
            g3:{ engineering:1, medical:3, bca_mca:1, ca_finance:0, bba_management:0, design_media:0 },
            g4:{ engineering:0, medical:0, bca_mca:3, ca_finance:2, bba_management:1, design_media:1 },
            g5:{ engineering:0, medical:0, bca_mca:0, ca_finance:3, bba_management:3, design_media:0 },
            g6:{ engineering:0, medical:0, bca_mca:1, ca_finance:1, bba_management:3, design_media:2 },
          };
          const marksBonus = MARKS_OPTIONS.find(m => m.key===sel12Marks)?.bonus || 0;
          const intScores  = calcScores(cats, INTEREST_12.questions, answers);
          const combined   = {};
          cats.forEach(c => { combined[c] = (intScores[c]||0) + (groupBonus[sel12Group]?.[c]||0) + marksBonus; });
          const total      = cats.reduce((a,c) => a+combined[c], 0);
          const finalPct   = {};
          cats.forEach(c => { finalPct[c] = total>0 ? Math.round((combined[c]/total)*100) : 0; });
          const sorted     = cats.map(c => ({ key:c, label:INTEREST_12.labels[c], score:finalPct[c] })).sort((a,b) => b.score-a.score).slice(0,3);
          save({ topMatches:sorted, scores:finalPct, aptCorrect:apt12Correct, totalAptitude:APTITUDE_12.length, group:sel12Group, marks:sel12Marks });
        }}
      />
    );
  }

  // ── OTHER STAGES ───────────────────────────────────────────
  const stageData = OTHER_STAGES[stage];
  if (!stageData) return (
    <div style={{ padding:"120px 80px", color:"#fff" }}>
      Invalid stage. <span style={{ color:"var(--gold)", cursor:"pointer" }} onClick={() => setPage("dashboard")}>Go back</span>
    </div>
  );

  return (
    <OtherStageBlock
      stageData={stageData}
      onBack={() => setPage("dashboard")}
      onDone={(answers) => {
        const { categories, labels, questions } = stageData;
        const pcts   = calcScores(categories, questions, answers);
        const sorted = categories.map(c => ({ key:c, label:labels[c], score:pcts[c] })).sort((a,b) => b.score-a.score).slice(0,3);
        save({ topMatches:sorted, scores:pcts });
      }}
    />
  );
}