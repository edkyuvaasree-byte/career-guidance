import { useState, useEffect } from "react";
 
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap');
 
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
  :root {
    --bg:       #07071a;
    --glass:    rgba(255,255,255,0.04);
    --glass-b:  rgba(255,255,255,0.09);
    --border:   rgba(255,255,255,0.10);
    --border-h: rgba(255,255,255,0.22);
    --text:     #e8eaf6;
    --muted:    #7b7fa8;
    --gold:     #f6c14b;
    --cyan:     #38f9d7;
    --violet:   #c77dff;
    --rose:     #ff6b9d;
    --blue:     #60b4ff;
    --green:    #57f0a0;
  }
 
  body { background: var(--bg); color: var(--text); font-family: 'Outfit', sans-serif; min-height: 100vh; overflow-x: hidden; }
 
  .explore-root { position: relative; min-height: 100vh; }
  .explore-root::before {
    content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 80% 60% at 15% 20%, rgba(99,60,255,0.13) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 85% 75%, rgba(56,249,215,0.08) 0%, transparent 55%),
      radial-gradient(ellipse 50% 40% at 50% 50%, rgba(246,193,75,0.05) 0%, transparent 60%);
  }
  .explore-root::after {
    content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image: linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px);
    background-size: 44px 44px;
  }
 
  .page-wrap { position: relative; z-index: 1; max-width: 1160px; margin: 0 auto; padding: 0 32px 100px; }
 
  .bc { display:flex; align-items:center; gap:6px; flex-wrap:wrap; padding:28px 0 0; font-size:12.5px; color:var(--muted); letter-spacing:.05em; text-transform:uppercase; }
  .bc-sep { opacity:.35; }
  .bc-link { cursor:pointer; transition:color .2s; }
  .bc-link:hover { color:var(--gold); }
  .bc-active { color:var(--gold); font-weight:700; }
 
  .back-btn { display:inline-flex; align-items:center; gap:8px; margin:24px 0 32px; padding:9px 20px; background:var(--glass); border:1px solid var(--border); border-radius:10px; color:var(--cyan); font-size:13.5px; font-weight:600; cursor:pointer; transition:all .2s; letter-spacing:.02em; backdrop-filter:blur(12px); }
  .back-btn:hover { background:rgba(56,249,215,0.08); border-color:var(--cyan); }
 
  .pg-title { font-family:'Playfair Display',serif; font-size:clamp(32px,5vw,56px); font-weight:800; line-height:1.1; margin:32px 0 10px; background:linear-gradient(135deg,#ffffff 30%,var(--gold) 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .pg-sub { font-size:15px; color:var(--muted); line-height:1.75; margin-bottom:44px; max-width:640px; }
 
  .sec-label { display:flex; align-items:center; gap:12px; font-size:11px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--gold); margin-bottom:18px; margin-top:36px; }
  .sec-label::after { content:''; flex:1; height:1px; background:linear-gradient(90deg,rgba(246,193,75,.35),transparent); }
 
  .home-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(250px,1fr)); gap:22px; margin-top:8px; }
  .home-card { position:relative; overflow:hidden; background:var(--glass); backdrop-filter:blur(20px); border:1px solid var(--border); border-radius:20px; padding:34px 28px 28px; cursor:pointer; transition:all .28s cubic-bezier(.25,.8,.25,1); }
  .home-card:hover { border-color:var(--border-h); transform:translateY(-6px); box-shadow:0 24px 60px rgba(0,0,0,.5); }
  .home-card::before { content:''; position:absolute; inset:0; background:var(--hc-glow,transparent); opacity:0; transition:opacity .3s; }
  .home-card:hover::before { opacity:1; }
  .hc-icon { font-size:40px; margin-bottom:18px; }
  .hc-name { font-family:'Playfair Display',serif; font-size:24px; font-weight:700; color:#fff; margin-bottom:8px; }
  .hc-desc { font-size:13.5px; color:var(--muted); line-height:1.7; }
  .hc-arrow { position:absolute; bottom:22px; right:22px; font-size:18px; color:var(--hc-accent,var(--gold)); opacity:0; transform:translateX(-8px); transition:all .25s; }
  .home-card:hover .hc-arrow { opacity:1; transform:translateX(0); }
  .hc-pill { position:absolute; top:20px; right:20px; font-size:10px; font-weight:700; letter-spacing:.1em; padding:3px 10px; border-radius:20px; background:var(--hc-pill-bg); color:var(--hc-accent); }
 
  .list-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:18px; }
  .list-card { background:var(--glass); backdrop-filter:blur(18px); border:1px solid var(--border); border-radius:16px; padding:26px 22px; cursor:pointer; transition:all .22s; display:flex; flex-direction:column; gap:10px; }
  .list-card:hover { border-color:var(--lc-accent,var(--gold)); transform:translateY(-3px); box-shadow:0 16px 40px rgba(0,0,0,.4); }
  .lc-tag { font-size:10px; font-weight:700; letter-spacing:.1em; padding:3px 10px; border-radius:20px; display:inline-block; width:fit-content; }
  .lc-name { font-size:18px; font-weight:700; color:#fff; }
  .lc-preview { font-size:13px; color:var(--muted); line-height:1.65; }
  .lc-foot { font-size:12px; color:var(--muted); display:flex; align-items:center; gap:6px; margin-top:4px; }
 
  .detail-overview { background:var(--glass); backdrop-filter:blur(20px); border:1px solid var(--border); border-left:3px solid var(--gold); border-radius:0 16px 16px 0; padding:22px 26px; font-size:15px; line-height:1.9; color:var(--text); margin-bottom:8px; }
 
  .stat-row { display:flex; flex-wrap:wrap; gap:14px; margin:24px 0 4px; }
  .stat-box { flex:1; min-width:150px; background:var(--glass); backdrop-filter:blur(16px); border:1px solid var(--border); border-radius:14px; padding:18px 20px; }
  .stat-box-label { font-size:10.5px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); margin-bottom:6px; }
  .stat-box-val { font-size:14px; font-weight:700; color:var(--cyan); line-height:1.5; }
 
  .items-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(210px,1fr)); gap:13px; }
  .item-pill { background:var(--glass); backdrop-filter:blur(14px); border:1px solid var(--border); border-radius:12px; padding:16px 18px; transition:border-color .2s,transform .2s; }
  .item-pill:hover { border-color:var(--border-h); transform:translateY(-2px); }
  .item-pill b { display:block; color:#fff; font-size:13.5px; margin-bottom:5px; }
  .item-pill span { font-size:12.5px; color:var(--muted); line-height:1.6; }
 
  .path-strip { background:var(--glass); backdrop-filter:blur(18px); border:1px solid var(--border); border-radius:14px; padding:22px 26px; }
  .path-steps { display:flex; flex-wrap:wrap; align-items:center; gap:6px; margin-top:12px; }
  .path-step { background:rgba(246,193,75,.1); border:1px solid rgba(246,193,75,.25); border-radius:8px; padding:6px 14px; font-size:13px; font-weight:600; color:var(--gold); }
  .path-arrow { color:var(--muted); font-size:14px; }
 
  .gender-tabs { display:flex; gap:10px; margin-bottom:28px; flex-wrap:wrap; }
  .gtab { padding:10px 26px; border-radius:10px; font-size:14px; font-weight:700; cursor:pointer; border:1px solid var(--border); background:var(--glass); color:var(--muted); transition:all .2s; backdrop-filter:blur(12px); }
  .gtab.active-common { background:rgba(246,193,75,.12); border-color:var(--gold); color:var(--gold); }
  .gtab.active-male   { background:rgba(96,180,255,.12); border-color:var(--blue); color:var(--blue); }
  .gtab.active-female { background:rgba(255,107,157,.12); border-color:var(--rose); color:var(--rose); }
 
  .big-card { background:var(--glass); backdrop-filter:blur(20px); border:1px solid var(--border); border-radius:18px; padding:28px 26px; margin-bottom:18px; }
  .big-card-title { font-size:14px; font-weight:700; letter-spacing:.05em; margin-bottom:14px; display:flex; align-items:center; gap:10px; }
 
  @keyframes fadeUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
  .fade-in { animation:fadeUp .38s ease both; }
 
  ::-webkit-scrollbar { width:6px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:rgba(255,255,255,.1); border-radius:10px; }
`;
 
// Same structure, shorter and simpler content
const DATA = {
  school: {
    _meta: { icon:"🏫", accent:"#f6c14b", pill:"rgba(246,193,75,.12)", desc:"Choose your stream after 10th and build your career foundation." },
    Science: {
      overview: "Science stream is for students who enjoy physics, chemistry, biology or maths. It leads to engineering, medicine, research and technology careers.",
      subjects: {
        Physics: "Motion, energy, electricity, waves and optics.",
        Chemistry: "Elements, reactions, organic and inorganic chemistry.",
        Biology: "Cells, genetics, human body and living organisms.",
        Mathematics: "Algebra, calculus, trigonometry and statistics.",
        "Computer Science": "Programming, data structures and software basics."
      },
      careers: {
        Doctor: "MBBS → Specialist — hospitals and clinics",
        Engineer: "BTech → Software, Civil or Mechanical roles",
        "Data Scientist": "AI and machine learning jobs in top companies",
        Pharmacist: "Drug formulation and pharmaceutical industry"
      },
      entrances: {
        "JEE Main": "Engineering — IIT, NIT, BITS admissions",
        NEET: "Medical — MBBS and BDS admissions",
        TNEA: "Tamil Nadu engineering college admissions",
        GATE: "PG engineering and PSU jobs"
      },
      path: "10th → Science → 11th & 12th → Entrance Exam → Degree → Job"
    },
    Commerce: {
      overview: "Commerce is for students interested in business, accounts and finance. It leads to banking, CA, MBA and entrepreneurship.",
      subjects: {
        Accountancy: "Financial records, balance sheets and auditing.",
        Economics: "Markets, GDP, inflation and monetary policy.",
        "Business Studies": "Management, marketing and HR basics.",
        Mathematics: "Financial maths and statistics.",
        "Computer Applications": "Tally, MS Office and digital finance tools."
      },
      careers: {
        "Chartered Accountant": "Taxation and audit — top finance career",
        Banker: "Bank PO or Manager in SBI, HDFC, ICICI",
        "Financial Analyst": "Stock market and investment advisory",
        Entrepreneur: "Start and run your own business"
      },
      entrances: {
        "CA Foundation": "Entry to CA — ICAI 3-level course",
        IPMAT: "IIM 5-year BBA + MBA program",
        CUET: "Central university UG admissions",
        "CS Foundation": "Company Secretary entry course"
      },
      path: "10th → Commerce → 11th & 12th → BCom / BBA → CA / MBA → Job"
    },
    Arts: {
      overview: "Arts stream suits students interested in history, politics, law and media. Best path for civil services, journalism and law.",
      subjects: {
        History: "Ancient, medieval and modern history.",
        Geography: "Climate, natural resources and population.",
        "Political Science": "Indian constitution, democracy and governance.",
        Sociology: "Society, caste, gender and social change.",
        Psychology: "Human mind, behaviour and counselling basics."
      },
      careers: {
        "IAS / IPS Officer": "Top civil services through UPSC exam",
        Lawyer: "Criminal, civil or corporate law practice",
        Journalist: "Print, TV and digital media careers",
        Professor: "College teaching and research"
      },
      entrances: {
        UPSC: "Civil Services — IAS, IPS, IFS exam",
        CLAT: "Law admission — NLU colleges",
        CUET: "Central university BA admissions",
        "State PSC": "State government civil service jobs"
      },
      path: "10th → Arts → 11th & 12th → BA / LLB → UPSC / Job"
    }
  },
 
  college: {
    _meta: { icon:"🎓", accent:"#38f9d7", pill:"rgba(56,249,215,.12)", desc:"Explore UG, PG and Diploma programs across all fields." },
    UG: {
      _meta: { label:"Undergraduate", accent:"#38f9d7" },
      Engineering: {
        overview: "BTech is a 4-year degree in technology and innovation. India's most popular degree with strong placements.",
        branches: {
          CSE: "Software, AI and networking — highest demand branch",
          Mechanical: "Machines, robotics and manufacturing",
          Civil: "Construction, roads and structural design",
          ECE: "Electronics, circuits and communication",
          "AI & Data Science": "Machine learning and data analytics"
        },
        eligibility: "12th Science (PCM) + JEE Main or State CET",
        salary: "₹4 LPA (fresher) → ₹15-40 LPA (experienced)",
        path: "12th Science → JEE → BTech (4 yrs) → Job / Higher Studies"
      },
      BCA: {
        overview: "BCA is a 3-year computer degree open to any stream. Good for software jobs at a lower cost than BTech.",
        programs: {
          Programming: "C, Java, Python — core coding languages",
          "Web Development": "HTML, CSS, JavaScript and React basics",
          Database: "MySQL, MongoDB and SQL queries",
          Networking: "Computer networks and cybersecurity basics"
        },
        eligibility: "Any stream in 12th — Maths not mandatory",
        salary: "₹3 LPA (fresher) → ₹8-18 LPA (experienced)",
        path: "Any 12th → BCA (3 yrs) → MCA / Job"
      },
      BCom: {
        overview: "BCom is a 3-year commerce degree in accounts, tax and finance. Foundation for CA, MBA and finance careers.",
        programs: {
          Accounting: "Financial statements and bookkeeping",
          Taxation: "Income Tax, GST and return filing",
          "Corporate Law": "Companies Act and SEBI basics",
          Banking: "Bank operations and financial markets"
        },
        eligibility: "12th Commerce preferred — other streams accepted too",
        salary: "₹2.5 LPA (fresher) → ₹6-15 LPA (with CA or MBA)",
        path: "12th Commerce → BCom (3 yrs) → CA / MBA → Job"
      },
      BA: {
        overview: "BA is a 3-year arts degree — very flexible. Opens doors to civil services, law, teaching and media.",
        programs: {
          English: "Literature, linguistics and creative writing",
          "Political Science": "Indian polity and international relations",
          History: "Ancient and modern history",
          Psychology: "Human behaviour and counselling"
        },
        eligibility: "12th from any stream",
        salary: "₹2 LPA (entry) → ₹5-12 LPA (with PG or UPSC)",
        path: "Any 12th → BA (3 yrs) → MA / UPSC / LLB → Job"
      }
    },
    PG: {
      _meta: { label:"Postgraduate", accent:"#c77dff" },
      MBA: {
        overview: "MBA is a 2-year management degree. Leads to senior roles in business, consulting and startups.",
        specializations: {
          Finance: "Investment banking and corporate finance",
          Marketing: "Brand strategy and digital marketing",
          HR: "Talent and people management",
          Operations: "Supply chain and logistics",
          Analytics: "Data-driven business decisions"
        },
        eligibility: "Any UG degree + CAT / XAT / MAT score",
        salary: "₹6-12 LPA (Tier 3) → ₹25-90 LPA (IIM / ISB)",
        path: "Any Degree → CAT → MBA (2 yrs) → Manager → Senior Role"
      },
      MCA: {
        overview: "MCA is a 2-year postgraduate IT degree equal to MTech CS. High demand in the software industry.",
        programs: {
          "AI & ML": "Machine learning and deep learning",
          "Full Stack": "Frontend and backend development",
          Cloud: "AWS, Azure and DevOps basics",
          Cybersecurity: "Ethical hacking and network security"
        },
        eligibility: "BCA / BSc CS with 50%+ marks",
        salary: "₹4-8 LPA (fresher) → ₹12-30 LPA (experienced)",
        path: "BCA / BSc → MCA (2 yrs) → Senior Developer → Tech Lead"
      }
    },
    Diploma: {
      _meta: { label:"Diploma", accent:"#f6c14b" },
      "Engineering Diploma": {
        overview: "3-year polytechnic diploma — fastest route to technical jobs. Lateral entry to BTech 2nd year also available.",
        programs: {
          Mechanical: "Lathe, CNC, welding and AutoCAD",
          Civil: "Construction, surveying and site work",
          Electrical: "Wiring, motor control and PLC basics",
          Computer: "Programming, networking and hardware"
        },
        eligibility: "10th pass — 3-year diploma course",
        salary: "₹2-4 LPA (junior) → ₹5-10 LPA (experienced)",
        path: "10th → Diploma (3 yrs) → Junior Engineer / Lateral BTech"
      }
    }
  },
 
  work: {
    _meta: { icon:"💼", accent:"#57f0a0", pill:"rgba(87,240,160,.12)", desc:"Government and private sector career opportunities." },
    "Government Jobs": {
      overview: "Government jobs offer job security, pension and social respect. From civil services to railways — many options for all graduates.",
      exams: {
        UPSC: "IAS, IPS, IFS — top civil services exam",
        TNPSC: "Tamil Nadu state government jobs",
        "SSC CGL": "Central govt jobs — tax, audit, inspection",
        "IBPS / SBI": "Bank PO and Clerk recruitment",
        "RRB NTPC": "Railway jobs — India's largest employer",
        TET: "Government school teacher recruitment"
      },
      benefits: {
        "Job Security": "Permanent employment — hard to lose",
        Pension: "Retirement income guaranteed for life",
        Allowances: "HRA, DA and travel allowance added to salary",
        "Medical Coverage": "Free CGHS health scheme for the whole family",
        "Paid Leave": "30+ days leave per year with full pay"
      },
      salary: "₹18,000/month (Group D) → ₹56,100/month (IAS) + Allowances",
      path: "Degree → Choose Exam → Study → Prelims → Mains → Interview → Job"
    },
    "Private Jobs": {
      overview: "Private sector gives fast salary growth and global exposure. Best for those who want high income and quick career growth.",
      sectors: {
        "IT & Software": "TCS, Infosys, Zoho, FAANG — biggest employer",
        "Banking & Finance": "HDFC, ICICI, Axis, Zerodha — high paying",
        Healthcare: "Apollo, Fortis, Sun Pharma — stable sector",
        FMCG: "HUL, Nestle, ITC — sales and marketing roles",
        Startups: "Swiggy, Zomato, Razorpay — fast growth"
      },
      skills: {
        "Technical Skills": "Coding, data analysis and domain expertise",
        Communication: "Writing, speaking and presentation skills",
        Networking: "LinkedIn, industry events and alumni connections",
        Leadership: "Team management and decision making"
      },
      salary: "₹3-6 LPA (fresher) → ₹12-30 LPA (mid) → ₹50 LPA+ (senior)",
      path: "Degree → Internship → Entry Job → Upskill → Promotion → Senior Role"
    }
  },
 
  business: {
    _meta: { icon:"🚀", accent:"#c77dff", pill:"rgba(199,125,255,.12)", desc:"Business ideas and startup paths for everyone." },
    overview: "Business gives unlimited income and freedom. India has the 3rd largest startup ecosystem globally. Government supports through Mudra Loan, Startup India and MSME schemes.",
    common: {
      label: "Common — For Anyone",
      accent: "#f6c14b",
      icon: "⭐",
      ideas: {
        "Digital Marketing": "Run social media and ads for local businesses. Start free with Canva and Meta Ads.",
        "YouTube / Content": "Educational or entertainment content. Earn through AdSense and brand deals.",
        Freelancing: "Offer coding, design or writing on Fiverr or Upwork. Earn ₹20,000+ per month.",
        "Online Tutoring": "Teach school subjects or skills on Zoom or WhatsApp. Very low startup cost.",
        "E-commerce": "Sell on Amazon, Flipkart or Meesho without holding stock.",
        "Cloud Kitchen": "Home-based food delivery with ₹20,000-1 lakh investment."
      },
      skills: "Communication, digital tools, networking and basic accounts",
      investment: "₹0 (freelancing) → ₹10,000-50,000 (food/services)",
      path: "Find skill → Get first customers → Start small → Grow → Hire"
    },
    male: {
      label: "Popular Among Men",
      accent: "#60b4ff",
      icon: "🔵",
      ideas: {
        "Construction Work": "Take painting, plumbing or tiling contracts. Earn ₹3-30 lakhs per project.",
        "Auto Workshop": "Multi-brand car or bike service center. High repeat customers.",
        "Transport Business": "Own trucks or cabs. Partner with Porter or run freight services.",
        "Real Estate Broker": "Earn 1-2% commission on property deals. Near zero investment.",
        "Hardware Shop": "Sell cement, steel, paints and tiles. High daily turnover.",
        "Gym / Fitness": "Local gym with trainers. ₹3-15 lakh investment needed."
      },
      skills: "Trade knowledge, vendor management, negotiation and supervision",
      investment: "₹50,000 (broker) → ₹2-10 Lakhs (workshop / transport)",
      path: "Learn trade → Get license → Start 1 unit → Grow → Build team"
    },
    female: {
      label: "Popular Among Women",
      accent: "#ff6b9d",
      icon: "🌸",
      ideas: {
        "Boutique / Tailoring": "Stitch and sell clothes. Start at home with ₹20,000-50,000.",
        "Home Bakery": "Sell cakes and tiffin. Start from kitchen with ₹10,000-30,000.",
        "Beauty Parlour": "Hair, skin and makeup services. Home setup ₹30,000-1 lakh.",
        "Daycare / Tuition": "Run childcare or tuition classes at home. ₹50,000-2 lakh to start.",
        "Handmade Products": "Sell jewellery, candles or crafts on Instagram and Meesho.",
        "Mehendi / Makeup": "Bridal services for events. Earn ₹5,000-50,000 per event."
      },
      skills: "Creativity, customer care, social media marketing and patience",
      investment: "₹0 (reselling) → ₹20,000-1 Lakh (tailoring / bakery)",
      path: "Pick skill → Practice → Find customers → Use Instagram → Grow"
    },
    types: {
      "Online Business": "E-commerce, YouTube, apps — scale with low cost",
      "Service Business": "Consulting, salons, tutoring — earn through skills",
      "Product Business": "Make or sell physical products — higher scale potential",
      Franchise: "Buy a brand like Amul or DTDC — proven low-risk model"
    },
    benefits: {
      "Unlimited Income": "No salary cap — grow as much as you work",
      "Be Your Own Boss": "Choose your own hours, clients and team",
      "Job Creation": "Your business gives jobs to others too",
      "Govt Support": "Mudra Loan up to ₹10L and Startup India benefits"
    }
  }
};
 
const ACCENTS     = { school:"#f6c14b", college:"#38f9d7", work:"#57f0a0", business:"#c77dff" };
const SUB_ACCENTS = { UG:"#38f9d7", PG:"#c77dff", Diploma:"#f6c14b" };
const GRID_KEYS   = ["subjects","careers","branches","programs","specializations","sectors","exams","skills","benefits","types","entrances","ideas"];
const STAT_KEYS   = ["eligibility","salary"];
 
function cap(str) { return str.charAt(0).toUpperCase() + str.slice(1); }
 
function PathSteps({ path }) {
  const steps = path.split("→").map(s => s.trim());
  return (
    <div className="path-steps">
      {steps.map((s, i) => (
        <span key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span className="path-step">{s}</span>
          {i < steps.length - 1 && <span className="path-arrow">→</span>}
        </span>
      ))}
    </div>
  );
}
 
function SectionLabel({ children }) {
  return <div className="sec-label">{children}</div>;
}
 
function ItemsGrid({ obj }) {
  return (
    <div className="items-grid">
      {Object.entries(obj).map(([k, v]) => (
        <div key={k} className="item-pill">
          <b>{k}</b>
          <span>{v}</span>
        </div>
      ))}
    </div>
  );
}
 
function StatRow({ info }) {
  const found = STAT_KEYS.filter(k => info[k]);
  return (
    <div className="stat-row">
      {found.map(k => (
        <div key={k} className="stat-box">
          <div className="stat-box-label">{k}</div>
          <div className="stat-box-val">{info[k]}</div>
        </div>
      ))}
    </div>
  );
}
 
export default function Explore() {
  const [view, setView] = useState("home");
  const [cat,  setCat]  = useState(null);
  const [sub,  setSub]  = useState(null);
  const [item, setItem] = useState(null);
  const [gtab, setGtab] = useState("common");
 
  useEffect(() => {
    if (!document.getElementById("explore-styles")) {
      const el = document.createElement("style");
      el.id = "explore-styles";
      el.textContent = GLOBAL_CSS;
      document.head.appendChild(el);
    }
  }, []);
 
  const go = (v, c=null, s=null, i=null) => {
    setView(v); setCat(c); setSub(s); setItem(i);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
 
  const Breadcrumb = () => {
    const crumbs = [{ label:"Explore", v:"home", c:null, s:null, i:null }];
    if (view === "business") crumbs.push({ label:"BUSINESS", v:"business", c:null, s:null, i:null });
    if (cat && view !== "home" && view !== "business") crumbs.push({ label:cat.toUpperCase(), v:"cat", c:cat, s:null, i:null });
    if (sub)  crumbs.push({ label:sub,  v:"sub",    c:cat, s:sub, i:null });
    if (item) crumbs.push({ label:item, v:"detail", c:cat, s:sub, i:item });
    return (
      <div className="bc">
        {crumbs.map((cr, idx) => (
          <span key={idx} style={{ display:"flex", alignItems:"center", gap:6 }}>
            {idx > 0 && <span className="bc-sep">›</span>}
            <span
              className={idx === crumbs.length-1 ? "bc-active" : "bc-link"}
              onClick={() => idx < crumbs.length-1 && go(cr.v, cr.c, cr.s, cr.i)}
            >{cr.label}</span>
          </span>
        ))}
      </div>
    );
  };
 
  const BackBtn = ({ onClick }) => (
    <div className="back-btn" onClick={onClick}>← Back</div>
  );
 
  const HomeView = () => {
    const META = {
      school:   { icon:"🏫", desc:"Science, Commerce & Arts streams after 10th.", pill:"rgba(246,193,75,.12)"  },
      college:  { icon:"🎓", desc:"UG, PG and Diploma programs.",                 pill:"rgba(56,249,215,.12)"  },
      work:     { icon:"💼", desc:"Government & Private sector jobs.",             pill:"rgba(87,240,160,.12)"  },
      business: { icon:"🚀", desc:"Business ideas and startup paths.",             pill:"rgba(199,125,255,.12)" },
    };
    return (
      <div className="fade-in">
        <h1 className="pg-title">Explore Career Paths</h1>
        <p className="pg-sub">Browse streams, college programs, jobs and business ideas to find your perfect path.</p>
        <div className="home-grid">
          {Object.keys(DATA).map(key => {
            const m = META[key];
            const accent = ACCENTS[key];
            return (
              <div
                key={key}
                className="home-card"
                style={{ "--hc-accent":accent, "--hc-pill-bg":m.pill, "--hc-glow":`radial-gradient(ellipse at top-left, ${accent}18, transparent 65%)` }}
                onClick={() => key === "business" ? go("business") : go("cat", key)}
              >
                <span className="hc-pill">{key.toUpperCase()}</span>
                <div className="hc-icon">{m.icon}</div>
                <div className="hc-name">{cap(key)}</div>
                <div className="hc-desc">{m.desc}</div>
                <div className="hc-arrow">→</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
 
  const CatView = () => {
    const catData = DATA[cat];
    const accent  = ACCENTS[cat];
    const meta    = catData._meta || {};
    return (
      <div className="fade-in">
        <BackBtn onClick={() => go("home")} />
        <h1 className="pg-title">{cap(cat)}</h1>
        <p className="pg-sub">{meta.desc}</p>
        <div className="list-grid">
          {Object.entries(catData).map(([key, val]) => {
            if (key === "_meta") return null;
            const isGroup  = !val.overview && typeof val === "object";
            const children = isGroup ? Object.keys(val).filter(k => k !== "_meta") : [];
            const preview  = val.overview ? val.overview.slice(0, 90) + "..." : children.slice(0, 3).join(" · ");
            return (
              <div
                key={key}
                className="list-card"
                style={{ "--lc-accent": accent }}
                onClick={() => isGroup ? go("sub", cat, key) : go("detail", cat, null, key)}
              >
                <span className="lc-tag" style={{ background:`${accent}1a`, color:accent, border:`1px solid ${accent}40` }}>
                  {isGroup ? `${children.length} programs` : cap(cat)}
                </span>
                <div className="lc-name">{key}</div>
                <div className="lc-preview">{preview}</div>
                <div className="lc-foot">
                  <span>{isGroup ? `${children.length} programs inside` : "View details"}</span>
                  <span style={{ color:accent }}>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
 
  const SubView = () => {
    const subData = DATA[cat][sub];
    const meta    = subData._meta || {};
    const accent  = meta.accent || ACCENTS[cat];
    const items   = Object.entries(subData).filter(([k]) => k !== "_meta");
    return (
      <div className="fade-in">
        <BackBtn onClick={() => go("cat", cat)} />
        <h1 className="pg-title">{sub}</h1>
        <p className="pg-sub" style={{ color: accent }}>{meta.label} Programs — {items.length} available</p>
        <div className="list-grid">
          {items.map(([key, val]) => (
            <div
              key={key}
              className="list-card"
              style={{ "--lc-accent": accent }}
              onClick={() => go("detail", cat, sub, key)}
            >
              <span className="lc-tag" style={{ background:`${accent}1a`, color:accent, border:`1px solid ${accent}40` }}>
                {meta.label || sub}
              </span>
              <div className="lc-name">{key}</div>
              <div className="lc-preview">{(val.overview || "").slice(0, 90)}...</div>
              <div className="lc-foot">
                <span>View details</span>
                <span style={{ color:accent }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
 
  const DetailView = () => {
    const info   = sub ? DATA[cat][sub][item] : DATA[cat][item];
    if (!info) return <div style={{ padding:40, color:"#f55" }}>Not found.</div>;
    const accent = sub ? (SUB_ACCENTS[sub] || ACCENTS[cat]) : ACCENTS[cat];
    return (
      <div className="fade-in">
        <BackBtn onClick={() => sub ? go("sub", cat, sub) : go("cat", cat)} />
        <h1 className="pg-title">{item}</h1>
        {info.overview && <div className="detail-overview">{info.overview}</div>}
        <StatRow info={info} />
        {GRID_KEYS.map(key => {
          if (!info[key] || typeof info[key] !== "object") return null;
          return (
            <div key={key}>
              <SectionLabel>{cap(key)}</SectionLabel>
              <ItemsGrid obj={info[key]} />
            </div>
          );
        })}
        {info.path && (
          <>
            <SectionLabel>Career Path</SectionLabel>
            <div className="path-strip">
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", color:accent, marginBottom:8, textTransform:"uppercase" }}>
                Step-by-Step
              </div>
              <PathSteps path={info.path} />
            </div>
          </>
        )}
      </div>
    );
  };
 
  const BusinessView = () => {
    const biz = DATA.business;
    const tabAccent = { common:"#f6c14b", male:"#60b4ff", female:"#ff6b9d" };
    const tabs      = { common: biz.common, male: biz.male, female: biz.female };
    const current   = tabs[gtab];
    const ca        = tabAccent[gtab];
    return (
      <div className="fade-in">
        <BackBtn onClick={() => go("home")} />
        <h1 className="pg-title">Business & Entrepreneurship</h1>
        <div className="detail-overview">{biz.overview}</div>
 
        <SectionLabel>Types of Business</SectionLabel>
        <ItemsGrid obj={biz.types} />
 
        <SectionLabel>Business Ideas</SectionLabel>
        <div className="gender-tabs">
          {["common","male","female"].map(t => (
            <div key={t} className={`gtab${gtab===t ? " active-"+t : ""}`} onClick={() => setGtab(t)}>
              {tabs[t].icon} {tabs[t].label}
            </div>
          ))}
        </div>
 
        <div className="big-card" style={{ borderTop:`3px solid ${ca}` }}>
          <div className="big-card-title" style={{ color:ca }}>
            {current.icon} {current.label}
          </div>
          <div className="stat-row" style={{ marginBottom:22 }}>
            <div className="stat-box">
              <div className="stat-box-label">Skills Needed</div>
              <div className="stat-box-val" style={{ color:ca }}>{current.skills}</div>
            </div>
            <div className="stat-box">
              <div className="stat-box-label">Investment</div>
              <div className="stat-box-val" style={{ color:ca }}>{current.investment}</div>
            </div>
          </div>
          <div className="items-grid">
            {Object.entries(current.ideas).map(([k, v]) => (
              <div key={k} className="item-pill" style={{ borderLeft:`2px solid ${ca}40` }}>
                <b style={{ color:"#fff" }}>{k}</b>
                <span>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop:24 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", color:ca, marginBottom:8, textTransform:"uppercase" }}>
              Getting Started
            </div>
            <div className="path-strip">
              <PathSteps path={current.path} />
            </div>
          </div>
        </div>
 
        <SectionLabel>Why Choose Business?</SectionLabel>
        <ItemsGrid obj={biz.benefits} />
      </div>
    );
  };
 
  const renderView = () => {
    if (view === "home")     return <HomeView />;
    if (view === "business") return <BusinessView />;
    if (view === "cat")      return <CatView />;
    if (view === "sub")      return <SubView />;
    if (view === "detail")   return <DetailView />;
    return null;
  };
 
  return (
    <div className="explore-root">
      <div className="page-wrap">
        <Breadcrumb />
        {renderView()}
      </div>
    </div>
  );
}