import { useState } from "react";

// ─── CAREER DATA ──────────────────────────────────────────────
const CAREER_DATA = {
  group1: {
    title: "Physics, Chemistry, Biology, Maths (PCBM)",
    icon: "🔬",
    why: "You showed strong analytical ability and interest in both life sciences and mathematics. This group keeps all doors open — both engineering and medical paths are available to you.",
    traits: ["Strong in logical thinking", "Interest in both science and maths", "Good analytical aptitude"],
    careers: ["Doctor (MBBS)", "Engineer (BTech)", "Pharmacist", "Biotechnologist", "Data Scientist"],
    exams: ["NEET — for Medical colleges", "JEE Main — for Engineering colleges", "TNEA — for Tamil Nadu Engineering"],
    path: ["Complete 11th and 12th with PCBM seriously", "Decide between NEET or JEE based on interest", "Join Medical or Engineering college", "Specialise and build your career"],
    salary: "₹4 LPA (fresher) → ₹20-60 LPA (experienced)",
    resources: ["Khan Academy (free)", "BYJU's", "Unacademy", "YouTube — Physics Wallah"],
    govtOption: "Government hospitals, PSU engineering firms, ISRO, DRDO, Railways",
  },
  group2: {
    title: "Physics, Chemistry, Computer Science, Maths (PCCM)",
    icon: "💻",
    why: "You showed strong logical thinking and a clear passion for technology and computers. This group is the best foundation for software, AI and data science careers.",
    traits: ["Logical and analytical thinker", "Enjoys technology and computers", "Strong numerical aptitude"],
    careers: ["Software Engineer", "Data Scientist", "AI/ML Engineer", "Cybersecurity Analyst", "Game Developer"],
    exams: ["JEE Main — for Engineering colleges", "TNEA — for Tamil Nadu", "CUET — for Central Universities"],
    path: ["Complete 11th and 12th with PCCM", "Prepare for JEE or direct college admission", "Join BTech CSE or BCA", "Start learning to code now — don't wait!"],
    salary: "₹4 LPA (fresher) → ₹15-50 LPA (experienced)",
    resources: ["FreeCodeCamp (free)", "CS50 Harvard (free)", "NPTEL (free)", "YouTube — CodeWithHarry"],
    govtOption: "NIC, CDAC, ISRO, DRDO, Digital India — all hire CS graduates",
  },
  group3: {
    title: "Physics, Chemistry, Biology, Computer Science (PCBC)",
    icon: "🧬",
    why: "You showed interest in both life sciences and technology. This rare combination opens exciting doors in Biotechnology, Medical Tech and Bioinformatics.",
    traits: ["Interest in living things and technology", "Curious and research oriented", "Good memory and analytical skills"],
    careers: ["Bioinformatics Specialist", "Medical Lab Technician", "Biotechnologist", "Healthcare IT Professional", "Research Scientist"],
    exams: ["NEET — for Medical", "CUET — for BSc programs", "TNEA — for Engineering"],
    path: ["Complete 11th and 12th with PCBC", "Choose BSc Biotechnology or Medical Lab", "Pursue MSc or research career", "Build career in healthcare or biotech"],
    salary: "₹3 LPA (fresher) → ₹10-30 LPA (experienced)",
    resources: ["NCBI Learning (free)", "Coursera Biology courses", "YouTube — Nucleus Medical Media", "Khan Academy"],
    govtOption: "ICMR, DBT, Government hospitals, DRDO biotech division",
  },
  group4: {
    title: "Accounts, Commerce, Economics, Computer Application",
    icon: "💼",
    why: "You showed interest in both business and technology. This powerful combination leads to careers in Fintech, Business Analytics and Digital Business roles.",
    traits: ["Business minded with tech interest", "Good with numbers and systems", "Enjoys digital tools and platforms"],
    careers: ["Business Analyst", "Financial Analyst", "Digital Marketer", "E-commerce Manager", "Software Developer"],
    exams: ["CUET — for BCA or BCom", "IPMAT — for IIM BBA", "State CET — for management colleges"],
    path: ["Complete 11th and 12th with this group", "Join BCA or BCom Computer Applications", "Learn digital skills alongside degree", "Enter Fintech or Business Tech roles"],
    salary: "₹3 LPA (fresher) → ₹10-25 LPA (experienced)",
    resources: ["Google Digital Garage (free)", "Tally ERP tutorials (YouTube)", "Coursera Business courses", "edX Finance courses"],
    govtOption: "IBPS Bank PO, SSC CGL, State government IT departments",
  },
  group5: {
    title: "Accounts, Commerce, Economics, Business Maths",
    icon: "📊",
    why: "You showed strong interest in finance, numbers and business operations. This is the ideal group for CA, MBA, Banking and top finance careers.",
    traits: ["Strong with numbers and finance", "Business oriented mindset", "Analytical and detail focused"],
    careers: ["Chartered Accountant (CA)", "Bank Manager", "Financial Analyst", "MBA Graduate", "Tax Consultant"],
    exams: ["CA Foundation — start alongside 11th", "IPMAT — for IIM BBA", "CUET — for BCom colleges"],
    path: ["Complete 11th and 12th seriously", "Join BCom or start CA Foundation", "Clear CA levels step by step", "Work in top firms, banks or start practice"],
    salary: "₹4 LPA (BCom fresher) → ₹15-50 LPA (CA experienced)",
    resources: ["ICAI Study Material (free)", "YouTube — CA Wallah", "Investopedia (free)", "Unacademy Commerce"],
    govtOption: "IBPS Bank PO, SBI PO, RBI Grade B, SSC CGL Accounts",
  },
  group6: {
    title: "Accounts, Commerce, Computer Application, Business Maths",
    icon: "🚀",
    why: "You showed entrepreneurial thinking and interest in digital business. This group is perfect for building digital businesses and working in modern commerce roles.",
    traits: ["Entrepreneurial mindset", "Interest in digital tools and business", "Creative and action oriented"],
    careers: ["Entrepreneur / Startup Founder", "Digital Marketing Manager", "E-commerce Business Owner", "BBA Graduate", "Operations Manager"],
    exams: ["IPMAT — for IIM BBA", "CUET — for BBA colleges", "State management college entrance"],
    path: ["Complete 11th and 12th with focus", "Join BBA or BCom", "Start building digital skills now", "Launch business or join growing startup"],
    salary: "₹3 LPA (fresher) → ₹10-30 LPA (experienced) / Unlimited in business",
    resources: ["Google Digital Garage (free)", "YouTube — Business ideas India", "Coursera Entrepreneurship", "Startup India portal"],
    govtOption: "Mudra Loan up to ₹10L, Startup India, MSME registration benefits",
  },
  engineering: {
    title: "Engineering / BTech",
    icon: "⚙️",
    why: "Your analytical thinking, logical problem solving and interest in building things make Engineering a strong and natural fit for you.",
    traits: ["Strong logical and analytical thinking", "Interest in technology and machines", "Good at solving complex problems"],
    careers: ["Software Engineer", "Civil Engineer", "Mechanical Engineer", "AI/ML Engineer", "Data Scientist"],
    exams: ["JEE Main", "JEE Advanced (for IIT)", "TNEA (Tamil Nadu)", "COMEDK", "VITEEE"],
    path: ["Prepare for JEE or state entrance exam", "Join BTech in your preferred branch (4 years)", "Do internships from 2nd year onwards", "Get placed or pursue MTech or MBA"],
    salary: "₹4 LPA (fresher) → ₹15-50 LPA (experienced)",
    resources: ["NPTEL (free)", "MIT OpenCourseWare (free)", "Coursera Engineering", "YouTube — Gate Smashers"],
    govtOption: "ISRO, DRDO, BEL, BHEL, Railways — all recruit engineers through GATE",
  },
  medical: {
    title: "Medical / MBBS / Pharmacy",
    icon: "🏥",
    why: "Your caring nature, patience and strong interest in human health and biology make Medical science the most fulfilling path for you.",
    traits: ["Caring and patient personality", "Strong interest in biology and human health", "Good memory and dedication"],
    careers: ["Doctor (MBBS)", "Specialist (MD/MS)", "Pharmacist", "Dentist (BDS)", "Physiotherapist"],
    exams: ["NEET UG — mandatory for all medical admissions", "AIIMS entrance", "State medical CET"],
    path: ["Prepare seriously for NEET — start now", "Join MBBS (5.5 years with internship)", "Complete house surgery internship", "Pursue specialisation (MD or MS)"],
    salary: "₹6 LPA (junior doctor) → ₹30-100 LPA (specialist)",
    resources: ["NCERT Biology (essential)", "YouTube — Dr Najeeb (free)", "Marrow app", "PrepLadder"],
    govtOption: "Government hospitals, AIIMS, ESI hospitals, Railways health dept",
  },
  bca_mca: {
    title: "BCA / BSc Computer Science / MCA",
    icon: "🖥️",
    why: "Your interest in technology, computers and logical thinking makes BCA or BSc CS the perfect and most direct path into the software industry.",
    traits: ["Tech enthusiast", "Logical and systematic thinker", "Interest in coding and digital tools"],
    careers: ["Software Developer", "Web Developer", "Mobile App Developer", "Database Administrator", "Cybersecurity Analyst"],
    exams: ["CUET — for central university BCA", "State university entrance", "Direct admission in many colleges"],
    path: ["Join BCA or BSc CS — 3 year degree", "Start learning to code from semester 1", "Do freelance projects in 2nd year", "Get job or pursue MCA for senior roles"],
    salary: "₹3 LPA (fresher) → ₹12-30 LPA (experienced)",
    resources: ["FreeCodeCamp (free)", "CS50 Harvard (free)", "YouTube — Apna College", "GeeksForGeeks (free)"],
    govtOption: "NIC, Digital India, CDAC, State IT departments",
  },
  ca_finance: {
    title: "CA / BCom / Banking and Finance",
    icon: "💰",
    why: "Your understanding of numbers, business thinking and interest in finance make CA and finance careers the most natural and rewarding path.",
    traits: ["Strong numerical ability", "Detail oriented and disciplined", "Business and finance minded"],
    careers: ["Chartered Accountant (CA)", "Investment Banker", "Financial Analyst", "Bank Manager", "Tax Consultant"],
    exams: ["CA Foundation (ICAI)", "CUET for BCom", "IPMAT for IIM BBA"],
    path: ["Join BCom or start CA Foundation simultaneously", "Clear CA Foundation then Intermediate then Final", "Complete 3 year articleship", "Join Big 4 firm or start own practice"],
    salary: "₹4 LPA (BCom fresher) → ₹15-60 LPA (CA experienced)",
    resources: ["ICAI Study Material (free)", "YouTube — CA Wallah", "Investopedia (free)", "Unacademy CA"],
    govtOption: "IBPS Bank PO, SBI PO, RBI Grade B, SSC CGL Accounts department",
  },
  bba_management: {
    title: "BBA / MBA / Management",
    icon: "📈",
    why: "Your leadership skills, communication ability and natural interest in business operations make Management the most exciting career direction.",
    traits: ["Natural leader and communicator", "Business and strategy minded", "Good with people and teams"],
    careers: ["Business Manager", "Marketing Manager", "HR Manager", "Operations Manager", "Entrepreneur"],
    exams: ["IPMAT — for IIM BBA directly after 12th", "CUET — for BBA colleges", "CAT or XAT — for MBA after graduation"],
    path: ["Join BBA — 3 year program", "Do internships every semester break", "Prepare for CAT in final year of BBA", "Join top MBA at IIM or leading B-school"],
    salary: "₹4 LPA (BBA fresher) → ₹15-80 LPA (IIM MBA graduate)",
    resources: ["Coursera Business (free audit)", "YouTube — MBA Crystal Ball", "Harvard Business Review (free articles)", "Unacademy Management"],
    govtOption: "UPSC Civil Services, State PSC, Management roles in PSUs like ONGC NTPC",
  },
  design_media: {
    title: "Design / Media / Animation",
    icon: "🎨",
    why: "Your creativity, visual thinking and passion for expression make Design and Media the most fulfilling and authentic career path for you.",
    traits: ["Highly creative and visual thinker", "Strong communication and expression", "Passion for aesthetics and storytelling"],
    careers: ["UI/UX Designer", "Graphic Designer", "Video Editor", "Animator", "Content Creator"],
    exams: ["UCEED — for IIT Design program", "NID entrance exam", "NIFT entrance", "CEED — for PG design programs"],
    path: ["Join BDes or BA Mass Communication", "Build your portfolio from day 1", "Start freelancing during college", "Join a design studio or go fully independent"],
    salary: "₹3 LPA (fresher) → ₹15-40 LPA (experienced)",
    resources: ["Canva Design School (free)", "YouTube — The Futur", "Figma tutorials (free)", "Google UX Design course on Coursera"],
    govtOption: "Doordarshan, AIR, Government design departments, NIFT faculty roles",
  },
  software_job: {
    title: "Software / IT Job",
    icon: "💻",
    why: "Your technical mindset, logical thinking and interest in building digital solutions make a Software career the strongest and most rewarding match.",
    traits: ["Strong logical and technical thinking", "Interest in coding and building things", "Continuous learner mindset"],
    careers: ["Software Developer", "Full Stack Developer", "Data Analyst", "DevOps Engineer", "Product Manager"],
    exams: ["GATE — for PSU tech jobs and higher studies", "Company aptitude and coding tests", "HackerRank and LeetCode contests"],
    path: ["Polish core skills — DSA and one framework", "Build a strong GitHub profile with projects", "Start with TCS Infosys Wipro for experience", "Upskill toward product companies in 2-3 years"],
    salary: "₹3.5 LPA (fresher) → ₹20-80 LPA (senior engineer)",
    resources: ["LeetCode (free)", "YouTube — Striver DSA (free)", "GeeksForGeeks (free)", "Coursera Google IT certificate (free audit)"],
    govtOption: "NIC, CDAC, ISRO, DRDO, Digital India — hire tech graduates through GATE",
  },
  data_science: {
    title: "Data Science / AI / ML",
    icon: "🤖",
    why: "Your strong analytical thinking, interest in patterns and natural curiosity about how things work makes Data Science a powerful and future-proof career.",
    traits: ["Analytical and data driven thinker", "Curious and research oriented", "Good with numbers and logic"],
    careers: ["Data Scientist", "ML Engineer", "AI Researcher", "Business Intelligence Analyst", "Data Engineer"],
    exams: ["GATE CS — for research and PSU roles", "Company specific data tests", "Kaggle competitions for portfolio"],
    path: ["Start with Python and Statistics — free resources available", "Complete one end-to-end project on Kaggle", "Build portfolio of 3 to 5 projects", "Apply to analytics and AI focused companies"],
    salary: "₹5 LPA (fresher) → ₹25-80 LPA (senior data scientist)",
    resources: ["Kaggle Learn (free)", "fast.ai (free)", "YouTube — Krish Naik (free)", "Coursera Andrew Ng ML (free audit)"],
    govtOption: "ISRO data division, DRDO, Government statistical departments, Census India",
  },
  pg_mba: {
    title: "PG / MBA / Higher Studies",
    icon: "🎓",
    why: "Your academic strength, deep thinking and desire for thorough knowledge make higher studies the ideal next step for accelerated long term growth.",
    traits: ["Academic strength and discipline", "Deep thinker and researcher", "Ambitious and growth oriented"],
    careers: ["Management Consultant", "Senior Analyst", "Professor or Researcher", "Product Manager", "Investment Banker"],
    exams: ["CAT — for IIM MBA", "GATE — for MTech research", "GRE — for abroad MS program", "GMAT — for international MBA"],
    path: ["Identify target colleges in final UG year", "Prepare seriously for CAT or GATE", "Apply with strong SOP and projects", "Complete PG and target top campus placements"],
    salary: "₹8 LPA (PG fresher) → ₹25-90 LPA (IIM MBA graduate)",
    resources: ["2IIM CAT prep YouTube (free)", "NPTEL for GATE (free)", "IMS Learning (paid)", "Magoosh GRE (paid)"],
    govtOption: "IAS IPS through UPSC, RBI Grade B, SEBI Grade A — all value PG degrees",
  },
  govt_exam: {
    title: "Government Exam (UPSC / TNPSC / SSC)",
    icon: "🏛️",
    why: "Your desire for stability, social impact and respect makes Government service not just a job but a deeply fulfilling life mission.",
    traits: ["Disciplined and consistent", "Interest in serving society", "Values stability and long term security"],
    careers: ["IAS or IPS Officer", "TNPSC Group 1 Officer", "Bank PO", "SSC CGL Officer", "Railway Officer"],
    exams: ["UPSC Civil Services — IAS IPS IFS", "TNPSC Group 1 Group 2 Group 4", "SSC CGL and CHSL", "IBPS PO and SBI PO", "RRB NTPC Railways"],
    path: ["Choose your target exam clearly first", "Start with NCERT books — completely free", "Dedicate 6 to 8 hours daily for preparation", "Attempt Prelims then Mains then Interview"],
    salary: "₹35,000/month (entry level) → ₹2,50,000/month (IAS with full allowances)",
    resources: ["NCERT books (free)", "YouTube — StudyIQ (free)", "Unacademy UPSC free videos", "InsightsonIndia.com (free)"],
    govtOption: "This IS the government path — unmatched security pension and respect for life",
  },
  business: {
    title: "Business / Freelance / Startup",
    icon: "🚀",
    why: "Your entrepreneurial mindset, independence and creative energy make business not just a career but the most exciting and unlimited path for you.",
    traits: ["Entrepreneurial and self motivated", "Creative problem solver", "Risk taker with big vision"],
    careers: ["Startup Founder", "Freelancer", "Digital Marketer", "E-commerce Seller", "Business Consultant"],
    exams: ["No mandatory exam needed", "GST registration for formal business", "Startup India registration is free"],
    path: ["Identify your core skill or business idea", "Get your first customer within 30 days", "Use Instagram and LinkedIn to find clients", "Scale slowly and hire only when ready"],
    salary: "₹0 to unlimited — entirely based on your effort and scale",
    resources: ["YouTube — Ankur Warikoo (free)", "Startup India portal (free)", "Google Digital Garage (free)", "Udemy Business courses"],
    govtOption: "Mudra Loan up to ₹10 Lakh, Startup India tax benefits, MSME registration",
  },
  tech_switch: {
    title: "Switch to Tech / Data Science",
    icon: "💻",
    why: "Your frustration with your current role and strong interest in technology clearly shows you are ready and capable of making a high growth tech career switch.",
    traits: ["Analytical and problem solving mindset", "Willing to learn from scratch", "Motivated by growth and high income"],
    careers: ["Software Developer", "Data Analyst", "Product Manager", "DevOps Engineer", "Cybersecurity Analyst"],
    exams: ["AWS or Azure cloud certification", "Google Data Analytics certificate", "GATE — optional for PSU tech roles"],
    path: ["Pick one focused skill — Python or Web Development", "Spend 3 to 6 months learning every day", "Build 3 portfolio projects to show employers", "Apply to product companies and startups"],
    salary: "Current salary → ₹8-15 LPA after switch → ₹25-50 LPA in 3 years",
    resources: ["FreeCodeCamp (free)", "YouTube — Striver (free)", "Coursera Google certificates (free audit)", "LeetCode (free)"],
    govtOption: "NIC, CDAC, ISRO, DRDO — all recruit tech professionals through GATE",
  },
  management: {
    title: "Move into Management / Leadership",
    icon: "📈",
    why: "Your years of experience, natural people skills and leadership interest make you perfectly ready to step into management and senior roles.",
    traits: ["Natural leader and decision maker", "Strong communication and team skills", "Strategic and big picture thinker"],
    careers: ["Project Manager", "Product Manager", "Operations Head", "Business Unit Manager", "Management Consultant"],
    exams: ["CAT or XAT — for MBA", "PMP certification for project management", "Six Sigma for operations roles"],
    path: ["Take on team lead responsibilities in current role now", "Pursue part time or executive MBA", "Get PMP or Six Sigma certified", "Target senior management roles actively"],
    salary: "₹8 LPA → ₹25-60 LPA in management and leadership roles",
    resources: ["Coursera Project Management Google cert (free audit)", "YouTube — PM School (free)", "LinkedIn Learning", "IIM executive programs"],
    govtOption: "PSU management roles, UPSC experience quota, State government senior positions",
  },
  freelance: {
    title: "Go Freelance / Consulting",
    icon: "🌐",
    why: "Your desire for freedom, existing valuable skills and frustration with rigid structures make Freelancing the most natural and fulfilling path for you.",
    traits: ["Self motivated and independent", "Skilled in a marketable area", "Values freedom over fixed structure"],
    careers: ["Freelance Developer", "Consultant", "Content Creator", "Digital Marketer", "Independent Trainer"],
    exams: ["No mandatory exam", "HubSpot certifications (free)", "Google Skillshop certifications (free)", "Meta Blueprint (free)"],
    path: ["List your top 3 marketable skills clearly", "Create profile on Fiverr or Upwork today", "Apply to 10 projects daily for first month", "Deliver quality work and collect 5 star reviews"],
    salary: "₹20,000/month (starting out) → ₹2-10 Lakh/month (well established)",
    resources: ["Fiverr Learn (paid)", "YouTube — Ankur Warikoo (free)", "HubSpot Academy (free)", "Google Skillshop (free)"],
    govtOption: "Register as MSME for significant tax benefits and government project access",
  },
  digital_online: {
    title: "Digital / Online Business",
    icon: "🌐",
    why: "Your digital skills, comfort with online platforms and low investment capacity make Digital Business the most accessible and scalable path for you.",
    traits: ["Digital native and tech comfortable", "Creative with content or products", "Self motivated entrepreneur"],
    careers: ["YouTube Creator", "E-commerce Seller", "Digital Marketing Agency Owner", "Online Tutor", "App or SaaS Developer"],
    exams: ["No mandatory exam", "Google Ads certification (free)", "Meta Blueprint certification (free)"],
    path: ["Pick ONE platform to start — YouTube Amazon or Instagram", "Create content or list products consistently", "Get first 100 customers or subscribers", "Monetise and reinvest to scale up"],
    salary: "₹0 to start → ₹1-20 Lakh/month when scaled properly",
    resources: ["YouTube Creator Academy (free)", "Google Digital Garage (free)", "Meesho seller guide (free)", "Canva free plan"],
    govtOption: "Startup India scheme, Digital India grants, MSME registration benefits",
  },
  service_based: {
    title: "Service Based Business",
    icon: "🛠️",
    why: "Your existing skills and natural ability to connect with people make a Service business the fastest path to income with the lowest risk.",
    traits: ["People oriented and customer focused", "Has a marketable skill already", "Prefers direct results and income"],
    careers: ["Tutor or Coaching Center", "Salon or Beauty Services", "Repair or Maintenance Service", "Event Management", "Consulting or Agency"],
    exams: ["No mandatory exam", "Trade license from local municipality"],
    path: ["Define your service clearly in one sentence", "Get first 5 customers through WhatsApp contacts", "Deliver excellent service and ask for referrals", "Expand team and open new locations when ready"],
    salary: "₹15,000/month (just starting) → ₹5-30 Lakh/month (well scaled)",
    resources: ["YouTube — Business ideas India (free)", "WhatsApp Business app (free)", "Google My Business listing (free)", "JustDial free listing"],
    govtOption: "Mudra Loan for service businesses, PM Vishwakarma Yojana for trade skills",
  },
  product_based: {
    title: "Product Based Business",
    icon: "📦",
    why: "Your interest in creating or selling physical products and willingness to invest makes a Product business the right path with high scale potential.",
    traits: ["Product minded and creative", "Willing to invest and take calculated risk", "Interested in manufacturing or trading"],
    careers: ["Manufacturer", "Amazon or Flipkart Seller", "Reseller", "Private Label Brand Owner", "Handmade Products Seller"],
    exams: ["No mandatory exam", "FSSAI license for food products", "GST registration required"],
    path: ["Find a product with proven demand on Amazon", "Source from manufacturer or make it yourself", "List on Amazon Flipkart or Meesho", "Optimise listings and scale with advertising"],
    salary: "₹20,000/month (just starting) → ₹10-50 Lakh/month (scaled brand)",
    resources: ["YouTube — Rahul Malodia (free)", "Meesho seller guide (free)", "Amazon seller central (free)", "IndiaMART supplier directory"],
    govtOption: "MSME registration, Make in India scheme, Export promotion councils for scaling",
  },
  franchise: {
    title: "Franchise Model",
    icon: "🏪",
    why: "Your preference for low risk, proven systems and stability makes Franchise the safest and most structured way to run your own business.",
    traits: ["Risk averse but entrepreneurial", "Follows systems and processes well", "Has investment capacity"],
    careers: ["Franchise Owner", "Multi-unit Franchise Operator", "Master Franchisee", "Distribution Partner"],
    exams: ["No mandatory exam", "Brand specific training program"],
    path: ["Research brands — Amul DTDC Subway etc", "Contact brand directly for franchise details", "Arrange investment amount and suitable location", "Complete brand training program and launch"],
    salary: "₹30,000/month (small franchise) → ₹5-20 Lakh/month (large established brand)",
    resources: ["FranchiseIndia.com (free listings)", "YouTube — Franchise India channel (free)", "Amul franchise official page", "DTDC franchise official page"],
    govtOption: "Mudra Loan available for franchise investment, full MSME benefits apply",
  },
  freelance_biz: {
    title: "Freelancing",
    icon: "💼",
    why: "Your strongest skill combined with your desire to work independently and zero investment requirement makes Freelancing the fastest path to your own income.",
    traits: ["Skilled in a specific marketable area", "Independent and self disciplined", "Wants income without huge investment"],
    careers: ["Freelance Designer", "Freelance Developer", "Content Writer", "Video Editor", "Social Media Manager"],
    exams: ["No mandatory exam", "Platform badges help — Fiverr and Upwork"],
    path: ["Identify your single strongest skill clearly", "Create detailed Fiverr or Upwork profile today", "Apply to 10 relevant jobs every single day", "Deliver excellent work and earn 5 star reviews"],
    salary: "₹10,000/month (just starting) → ₹2-10 Lakh/month (well established)",
    resources: ["Fiverr Learn courses (paid)", "YouTube — Santrel Media (free)", "HubSpot Academy (free)", "Google Skillshop (free)"],
    govtOption: "Register as sole proprietor MSME for tax benefits and credibility",
  },
  creative: {
    title: "Creative Field (Design / Media / Content)",
    icon: "🎨",
    why: "Your natural creativity, love for visual communication and passion for expression make Creative careers the most authentic and fulfilling path for you.",
    traits: ["Highly creative and expressive", "Visual thinker and storyteller", "Passionate about aesthetics and design"],
    careers: ["UI/UX Designer", "Content Creator", "Graphic Designer", "Video Editor", "Copywriter or Brand Strategist"],
    exams: ["UCEED — for IIT Design", "NID entrance exam", "Portfolio based college admissions"],
    path: ["Start creating content or designs today — right now", "Build a strong portfolio on Behance or Instagram", "Take on freelance work for first paid income", "Join a creative agency or go fully independent"],
    salary: "₹3 LPA (fresher) → ₹15-40 LPA (experienced creative professional)",
    resources: ["Canva Design School (free)", "YouTube — The Futur (free)", "Figma tutorials completely free", "Adobe free tutorials"],
    govtOption: "Doordarshan, AIR, Government design and media communication departments",
  },
  tech_career: {
    title: "Tech Career (Software / Data Science)",
    icon: "💻",
    why: "Based on your overall profile — your problem solving approach, interests and learning style — a tech career gives you the best combination of growth salary and long term stability.",
    traits: ["Logical and systematic thinker", "Enjoys solving problems with technology", "Continuous learner and self motivated"],
    careers: ["Software Developer", "Data Analyst", "Web Developer", "Mobile App Developer", "IT Consultant"],
    exams: ["GATE — for PSU or higher studies", "Company aptitude tests", "Coding platform contests"],
    path: ["Start learning Python or Web Dev today — completely free", "Build 3 solid projects within 6 months", "Apply for internships to get real experience", "Get your first job and keep upskilling consistently"],
    salary: "₹3.5 LPA (fresher) → ₹20-50 LPA (senior with experience)",
    resources: ["FreeCodeCamp (free)", "CS50 Harvard (free)", "YouTube — Apna College (free)", "GeeksForGeeks (free)"],
    govtOption: "NIC, CDAC, ISRO, DRDO, Digital India — all actively hire tech graduates",
  },
};

const STAGE_LABELS = {
  school10: "10th Student",
  school12: "12th Student",
  ug:       "UG Graduate",
  working:  "Working Professional",
  business: "Aspiring Entrepreneur",
};

export default function Results({ setPage, currentUser }) {
  const progress = JSON.parse(localStorage.getItem("cg_progress_" + currentUser.email) || "{}");
  const { topMatches, aptCorrect, totalAptitude, stage } = progress;
  const [showAlternates, setShowAlternates] = useState(false);

  if (!topMatches || topMatches.length === 0) {
    return (
      <div style={{ padding:"120px 80px", color:"#fff", textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:16 }}>🤔</div>
        <div style={{ fontSize:22, fontWeight:700, marginBottom:12 }}>No results found</div>
        <div style={{ color:"var(--muted)", marginBottom:28 }}>Please complete the assessment first</div>
        <button className="dash-results-btn" onClick={() => setPage("dashboard")}>Go to Dashboard</button>
      </div>
    );
  }

  const best      = topMatches[0];
  const alts      = topMatches.slice(1);
  const bestData  = CAREER_DATA[best.key] || CAREER_DATA[best.key + "_biz"];
  const aptScore  = totalAptitude > 0 ? Math.round((aptCorrect / totalAptitude) * 100) : null;

  if (!bestData) {
    return (
      <div style={{ padding:"120px 80px", color:"#fff", textAlign:"center" }}>
        <div style={{ fontSize:22, fontWeight:700, marginBottom:12 }}>Something went wrong</div>
        <button className="dash-results-btn" onClick={() => setPage("dashboard")}>Go back</button>
      </div>
    );
  }

  return (
    <div className="results-wrapper">

      {/* Header */}
      <div className="results-header">
        <div className="results-gps-badge">🗺️ Career GPS Result</div>
        <h1 className="results-title">Your Perfect Career Path</h1>
        <p className="results-sub">
          Based on your {STAGE_LABELS[stage] || "assessment"} — here is your personalised career roadmap
        </p>
      </div>

      {/* Aptitude score */}
      {aptScore !== null && (
        <div className="results-apt-bar">
          <div className="results-apt-label">
            <span>🧠 Aptitude Score</span>
            <span style={{ color:"var(--gold)", fontWeight:700 }}>
              {aptCorrect}/{totalAptitude} correct ({aptScore}%)
            </span>
          </div>
          <div className="results-apt-track">
            <div className="results-apt-fill" style={{ width: aptScore+"%" }}/>
          </div>
          <div className="results-apt-msg">
            {aptScore >= 80 ? "Excellent analytical ability! 🌟" :
             aptScore >= 60 ? "Good analytical skills! Keep practising 👍" :
             aptScore >= 40 ? "Average — focus on improving problem solving 📚" :
             "Keep practising — aptitude improves with practice 💪"}
          </div>
        </div>
      )}

      {/* PRIMARY RESULT */}
      <div className="results-primary-label">⭐ Your Best Match</div>

      <div className="results-primary-card">

        {/* Match score header */}
        <div className="results-primary-top">
          <div className="results-primary-icon">{bestData.icon}</div>
          <div className="results-primary-info">
            <div className="results-primary-title">{bestData.title}</div>
            <div className="results-primary-score">{best.score}% match with your profile</div>
          </div>
          <div className="results-primary-badge">🥇 Best Match</div>
        </div>

        {/* Score bar */}
        <div className="results-score-track" style={{ margin:"0 0 24px 0" }}>
          <div className="results-score-fill" style={{ width: best.score+"%", background:"var(--gold)" }}/>
        </div>

        {/* Why */}
        <div className="results-why">
          <div className="results-why-label">💡 Why this is YOUR path</div>
          <p>{bestData.why}</p>
        </div>

        {/* Traits */}
        <div className="results-detail-section">
          <div className="results-detail-label">✅ Your strengths that match this path</div>
          <div className="results-tags">
            {bestData.traits.map((t,i) => (
              <span key={i} className="results-trait-tag">{t}</span>
            ))}
          </div>
        </div>

        {/* Roadmap */}
        <div className="results-detail-section">
          <div className="results-detail-label">🗺️ Your Step by Step Roadmap</div>
          <div className="results-path">
            {bestData.path.map((step, i) => (
              <div key={i} className="results-path-step">
                <div className="results-path-num">{i+1}</div>
                <div className="results-path-text">{step}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Careers */}
        <div className="results-detail-section">
          <div className="results-detail-label">🎯 Career Options Available</div>
          <div className="results-tags">
            {bestData.careers.map((c,i) => (
              <span key={i} className="results-tag">{c}</span>
            ))}
          </div>
        </div>

        {/* Exams */}
        <div className="results-detail-section">
          <div className="results-detail-label">📝 Key Exams or Certifications</div>
          <div className="results-tags">
            {bestData.exams.map((e,i) => (
              <span key={i} className="results-tag-plain">{e}</span>
            ))}
          </div>
        </div>

        {/* Salary */}
        <div className="results-salary-box">
          <div className="results-salary-label">💰 Expected Salary Range</div>
          <div className="results-salary-val">{bestData.salary}</div>
        </div>

        {/* Resources */}
        <div className="results-detail-section">
          <div className="results-detail-label">📚 Free Learning Resources to Start Now</div>
          <div className="results-tags">
            {bestData.resources.map((r,i) => (
              <span key={i} className="results-tag-plain">{r}</span>
            ))}
          </div>
        </div>

        {/* Govt option */}
        {bestData.govtOption && (
          <div className="results-govt-box">
            <div className="results-govt-label">🏛️ Government Job Alternative</div>
            <div className="results-govt-text">{bestData.govtOption}</div>
          </div>
        )}

      </div>

      {/* ALTERNATE PATHS — collapsed by default */}
      {alts.length > 0 && (
        <div className="results-alts-section">
          <button
            className="results-alts-toggle"
            onClick={() => setShowAlternates(!showAlternates)}
          >
            {showAlternates ? "▲ Hide" : "▼ Show"} other paths that also suit your profile
          </button>

          {showAlternates && (
            <div className="results-alts-list">
              <p className="results-alts-note">
                These paths also match your profile but to a lesser degree.
                Explore them only if the primary match above does not feel right for you.
              </p>
              {alts.map((alt, idx) => {
                const altData = CAREER_DATA[alt.key] || CAREER_DATA[alt.key + "_biz"];
                if (!altData) return null;
                return (
                  <div key={alt.key} className="results-alt-card">
                    <div className="results-alt-left">
                      <span className="results-alt-icon">{altData.icon}</span>
                      <div>
                        <div className="results-alt-title">{altData.title}</div>
                        <div className="results-alt-score">{alt.score}% match</div>
                      </div>
                    </div>
                    <div className="results-alt-why">{altData.why}</div>
                    <div className="results-alt-salary">
                      💰 {altData.salary}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="results-actions">
        <button
          className="results-retake-btn"
          onClick={() => {
            localStorage.setItem("cg_progress_" + currentUser.email, JSON.stringify({}));
            setPage("dashboard");
          }}
        >
          🔄 Retake Assessment
        </button>
        <button className="results-explore-btn" onClick={() => setPage("explore")}>
          🔍 Explore All Careers
        </button>
      </div>

    </div>
  );
}