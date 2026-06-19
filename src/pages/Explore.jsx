import { useState, useEffect } from "react";
 
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap');
 
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
  :root {
    --bg:       #eef2ff;
    --glass:    rgba(255,255,255,0.55);
    --glass-b:  rgba(255,255,255,0.80);
    --border:   rgba(99,102,241,0.15);
    --border-h: rgba(99,102,241,0.4);
    --text:     #1a1a2e;
    --muted:    #6b7280;
    --violet:   #7c3aed;
    --cyan:     #0ea5e9;
    --rose:     #ec4899;
    --blue:     #3b82f6;
    --green:    #10b981;
  }
 
  body { background: var(--bg); color: var(--text); font-family: 'Outfit', sans-serif; min-height: 100vh; overflow-x: hidden; }
 
  .explore-root { position: relative; min-height: 100vh; background: var(--bg); }
  .explore-root::before {
    content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 80% 60% at 10% 15%,  rgba(124,58,237,0.10) 0%, transparent 55%),
      radial-gradient(ellipse 60% 50% at 88% 75%,  rgba(14,165,233,0.09) 0%, transparent 52%),
      radial-gradient(ellipse 50% 45% at 50% 50%,  rgba(16,185,129,0.06) 0%, transparent 58%),
      radial-gradient(ellipse 40% 35% at 75% 10%,  rgba(236,72,153,0.07) 0%, transparent 50%);
  }
  .explore-root::after {
    content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image: linear-gradient(rgba(99,102,241,0.06) 1px,transparent 1px),
                      linear-gradient(90deg,rgba(99,102,241,0.06) 1px,transparent 1px);
    background-size: 44px 44px;
  }
 
  .page-wrap { position: relative; z-index: 1; max-width: 1160px; margin: 0 auto; padding: 0 32px 100px; }
 
  /* ── breadcrumb ── */
  .bc { display:flex; align-items:center; gap:6px; flex-wrap:wrap; padding:28px 0 0; font-size:12.5px; color:var(--muted); letter-spacing:.05em; text-transform:uppercase; }
  .bc-sep { opacity:.35; }
  .bc-link { cursor:pointer; transition:color .2s; }
  .bc-link:hover { color:#7c3aed; }
  .bc-active { color:#7c3aed; font-weight:700; }
 
  /* ── back button ── */
  .back-btn { display:inline-flex; align-items:center; gap:8px; margin:24px 0 32px; padding:9px 20px; background:rgba(255,255,255,0.70); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); border:1.5px solid rgba(255,255,255,0.85); border-radius:10px; color:#7c3aed; font-size:13.5px; font-weight:600; cursor:pointer; transition:all .2s; letter-spacing:.02em; box-shadow:0 2px 10px rgba(99,102,241,0.10); }
  .back-btn:hover { background:rgba(124,58,237,0.08); border-color:rgba(124,58,237,0.45); }
 
  /* ── page title ── */
  .pg-title { font-family:'Playfair Display',serif; font-size:clamp(32px,5vw,56px); font-weight:800; line-height:1.1; margin:32px 0 10px; background:linear-gradient(135deg,#1a1a2e 30%,#7c3aed 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .pg-sub { font-size:15px; color:var(--muted); line-height:1.75; margin-bottom:44px; max-width:640px; }
 
  /* ── section label ── */
  .sec-label { display:flex; align-items:center; gap:12px; font-size:11px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:#7c3aed; margin-bottom:18px; margin-top:36px; }
  .sec-label::after { content:''; flex:1; height:1px; background:linear-gradient(90deg,rgba(124,58,237,0.40),transparent); }
 
  /* ════════════════════════════════════════
     HOME CARDS  — colourful style like reference
  ════════════════════════════════════════ */
  .home-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:22px; margin-top:8px; }
 
  @media (max-width: 600px) { .home-grid { grid-template-columns: 1fr; } }
 
  .home-card {
    position: relative;
    overflow: hidden;
    border-radius: 22px;
    padding: 0;
    cursor: pointer;
    background: #fff;
    border: 1.5px solid var(--hc-border, rgba(200,200,220,0.5));
    box-shadow: 0 4px 24px var(--hc-shadow, rgba(99,102,241,0.08));
    transition: transform .28s cubic-bezier(.25,.8,.25,1), box-shadow .28s;
    min-height: 200px;
  }
 
  .home-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 52px var(--hc-shadow-h, rgba(99,102,241,0.18));
  }
 
  /* coloured accent bar at top */
  .hc-bar {
    position: absolute; top: 0; left: 0; right: 0; height: 4px;
    background: var(--hc-bar, #7c3aed);
    border-radius: 22px 22px 0 0;
    z-index: 3;
  }
 
  /* category pill — top right */
  .hc-pill {
    position: absolute; top: 16px; right: 16px; z-index: 3;
    font-size: 9.5px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
    padding: 4px 12px; border-radius: 20px;
    background: var(--hc-pill-bg); color: var(--hc-accent);
    border: 1.5px solid var(--hc-pill-border);
  }
 
  /* main content */
  .hc-inner { padding: 32px 26px 30px; }
 
  .hc-icon {
    width: 54px; height: 54px; border-radius: 16px;
    background: var(--hc-icon-bg, rgba(124,58,237,0.10));
    display: flex; align-items: center; justify-content: center;
    font-size: 28px; margin-bottom: 18px;
  }
 
  .hc-name { font-family:'Playfair Display',serif; font-size:24px; font-weight:800; color:#1a1a2e; margin-bottom:8px; }
  .hc-desc { font-size:13.5px; color:var(--muted); line-height:1.7; }
 
  .hc-arrow {
    position: absolute; bottom: 18px; right: 22px;
    width: 32px; height: 32px; border-radius: 50%;
    background: var(--hc-arrow-bg, rgba(124,58,237,0.10));
    display: flex; align-items: center; justify-content: center;
    font-size: 15px; color: var(--hc-accent, #7c3aed);
    opacity: 0; transform: translateX(-6px);
    transition: all .25s; z-index: 2;
  }
  .home-card:hover .hc-arrow { opacity: 1; transform: translateX(0); }
 
  /* ════════════════════════════════════════
     LIST CARDS
  ════════════════════════════════════════ */
  .list-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:18px; }
 
  .list-card {
    position: relative;
    overflow: hidden;
    background: rgba(255,255,255,0.60);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1.5px solid rgba(255,255,255,0.80);
    border-top: 3px solid var(--lc-accent, #7c3aed);
    border-radius: 18px;
    padding: 24px 20px;
    cursor: pointer;
    transition: all .22s;
    display: flex; flex-direction: column; gap: 10px;
    box-shadow: 0 4px 20px rgba(99,102,241,0.09), inset 0 1px 0 rgba(255,255,255,0.90);
  }
  .list-card::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 80% 60% at 0% 0%, var(--lc-glow, rgba(124,58,237,0.07)), transparent 65%);
    border-radius: 18px; pointer-events: none;
  }
  .list-card:hover {
    transform: translateY(-4px);
    border-color: var(--lc-accent, #7c3aed);
    border-top-color: var(--lc-accent, #7c3aed);
    background: rgba(255,255,255,0.72);
    box-shadow: 0 18px 44px rgba(99,102,241,0.14);
  }
 
  .lc-tag { font-size:10px; font-weight:700; letter-spacing:.1em; padding:3px 10px; border-radius:20px; display:inline-block; width:fit-content; position:relative; z-index:1; }
  .lc-name { font-size:18px; font-weight:700; color:#1a1a2e; position:relative; z-index:1; }
  .lc-preview { font-size:13px; color:var(--muted); line-height:1.65; position:relative; z-index:1; }
  .lc-foot { font-size:12px; color:var(--muted); display:flex; align-items:center; gap:6px; margin-top:4px; position:relative; z-index:1; }
 
  /* ════════════════════════════════════════
     DETAIL PAGE
  ════════════════════════════════════════ */
  .detail-overview {
    background: rgba(255,255,255,0.65);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1.5px solid rgba(255,255,255,0.80);
    border-left: 3px solid var(--detail-accent, #7c3aed);
    border-radius: 0 16px 16px 0;
    padding: 22px 26px;
    font-size: 15px; line-height: 1.9; color: var(--text);
    margin-bottom: 8px;
    box-shadow: 0 2px 14px rgba(99,102,241,0.08);
  }
 
  .stat-row { display:flex; flex-wrap:wrap; gap:14px; margin:24px 0 4px; }
  .stat-box {
    flex: 1; min-width: 150px;
    background: rgba(255,255,255,0.62);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1.5px solid rgba(255,255,255,0.80);
    border-radius: 14px; padding: 18px 20px;
    box-shadow: 0 2px 10px rgba(99,102,241,0.07);
  }
  .stat-box-label { font-size:10.5px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); margin-bottom:6px; }
  .stat-box-val { font-size:14px; font-weight:700; color:var(--detail-accent, #7c3aed); line-height:1.5; }
 
  /* ── subject/career/entrance cards — colourful ── */
  .items-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(210px,1fr)); gap:13px; }
 
  .item-pill {
    background: rgba(255,255,255,0.70);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1.5px solid rgba(255,255,255,0.78);
    border-radius: 14px; padding: 18px 18px;
    transition: border-color .2s, transform .2s, box-shadow .2s;
    box-shadow: 0 2px 8px rgba(99,102,241,0.06);
    border-top: 3px solid var(--item-accent, #7c3aed);
  }
  .item-pill:hover { transform:translateY(-3px); box-shadow:0 10px 28px rgba(124,58,237,0.13); background:rgba(255,255,255,0.88); }
  .item-pill b { display:block; color:#1a1a2e; font-size:13.5px; margin-bottom:5px; }
  .item-pill span { font-size:12.5px; color:var(--muted); line-height:1.6; }
 
  /* ── colourful section items: subjects, careers, entrances ── */
  .colored-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(210px,1fr)); gap:13px; }
 
  .colored-card {
    border-radius: 14px; padding: 20px 18px;
    transition: transform .2s, box-shadow .2s;
    cursor: default;
    border: 1.5px solid transparent;
    box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  }
  .colored-card:hover { transform:translateY(-4px); box-shadow:0 12px 30px rgba(0,0,0,0.13); }
  .colored-card b { display:block; font-size:14px; font-weight:700; margin-bottom:6px; }
  .colored-card span { font-size:13px; line-height:1.65; }
 
  /* ── path strip ── */
  .path-strip {
    background: rgba(255,255,255,0.60);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1.5px solid rgba(255,255,255,0.78);
    border-radius: 14px; padding: 22px 26px;
    box-shadow: 0 2px 10px rgba(99,102,241,0.07);
  }
  .path-steps { display:flex; flex-wrap:wrap; align-items:center; gap:6px; margin-top:12px; }
  .path-step { background:rgba(124,58,237,0.09); border:1px solid rgba(124,58,237,0.28); border-radius:8px; padding:6px 14px; font-size:13px; font-weight:600; color:#7c3aed; }
  .path-arrow { color:var(--muted); font-size:14px; }
 
  /* ── gender tabs ── */
  .gender-tabs { display:flex; gap:10px; margin-bottom:28px; flex-wrap:wrap; }
  .gtab { padding:10px 26px; border-radius:10px; font-size:14px; font-weight:700; cursor:pointer; background:rgba(255,255,255,0.60); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); border:1.5px solid rgba(255,255,255,0.80); color:var(--muted); transition:all .2s; box-shadow:0 2px 8px rgba(99,102,241,0.07); }
  .gtab.active-common { background:rgba(124,58,237,0.10); border-color:#7c3aed; color:#7c3aed; }
  .gtab.active-male   { background:rgba(59,130,246,0.10); border-color:#3b82f6; color:#3b82f6; }
  .gtab.active-female { background:rgba(236,72,153,0.10); border-color:#ec4899; color:#ec4899; }
 
  /* ── big card ── */
  .big-card {
    background: rgba(255,255,255,0.62);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1.5px solid rgba(255,255,255,0.80);
    border-radius: 18px; padding: 28px 26px; margin-bottom: 18px;
    box-shadow: 0 4px 20px rgba(99,102,241,0.09);
  }
  .big-card-title { font-size:14px; font-weight:700; letter-spacing:.05em; margin-bottom:14px; display:flex; align-items:center; gap:10px; }
 
  /* ── animations ── */
  @keyframes fadeUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
  .fade-in { animation:fadeUp .38s ease both; }
 
  ::-webkit-scrollbar { width:6px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:rgba(124,58,237,0.2); border-radius:10px; }
`;
 
/* ─── colour palettes matching the screenshot pastels exactly ─── */
/* Each entry: bg=card fill, border=left+top accent, text=title colour, sub=desc colour */
const PASTEL_CYCLE = [
  { bg:"#fefce8", border:"#ca8a04", text:"#713f12", sub:"#92400e" },   /* yellow  */
  { bg:"#f5f3ff", border:"#7c3aed", text:"#4c1d95", sub:"#6d28d9" },   /* purple  */
  { bg:"#f0fdf4", border:"#16a34a", text:"#14532d", sub:"#166534" },   /* green   */
  { bg:"#fff1f2", border:"#e11d48", text:"#881337", sub:"#be123c" },   /* pink/red*/
  { bg:"#eff6ff", border:"#2563eb", text:"#1e3a8a", sub:"#1d4ed8" },   /* blue    */
  { bg:"#ecfdf5", border:"#059669", text:"#064e3b", sub:"#047857" },   /* teal    */
  { bg:"#fdf4ff", border:"#a21caf", text:"#701a75", sub:"#86198f" },   /* fuchsia */
  { bg:"#fff7ed", border:"#ea580c", text:"#7c2d12", sub:"#c2410c" },   /* orange  */
];
 
const SECTION_PALETTES = {
  subjects:        PASTEL_CYCLE,
  careers:         PASTEL_CYCLE,
  entrances:       PASTEL_CYCLE,
  branches:        PASTEL_CYCLE,
  programs:        PASTEL_CYCLE,
  specializations: PASTEL_CYCLE,
  exams:           PASTEL_CYCLE,
  sectors:         PASTEL_CYCLE,
  benefits:        PASTEL_CYCLE,
  types:           PASTEL_CYCLE,
  skills:          PASTEL_CYCLE,
  ideas:           PASTEL_CYCLE,
};
 
const DATA = {
  school: {
    _meta: { icon:"🏫", accent:"#7c3aed", pill:"rgba(124,58,237,.1)", desc:"Choose your stream after 10th and build your career foundation." },
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
    _meta: { icon:"🎓", accent:"#0ea5e9", pill:"rgba(14,165,233,.1)", desc:"Explore UG, PG and Diploma programs across all fields." },
    UG: {
      _meta: { label:"Undergraduate", accent:"#0ea5e9" },
      Engineering: {
        overview: "BTech/BE is a 4-year degree in technology and innovation. India's most popular degree with strong placement records across all branches.",
        branches: {
          "Computer Science (CSE)": "Software, AI, networking — highest demand branch",
          "Information Technology": "Web, cybersecurity and cloud computing",
          Mechanical: "Machines, robotics, manufacturing and automobile",
          Civil: "Construction, roads, bridges and structural design",
          Electrical: "Power systems, circuits and electrical machines",
          Electronics: "VLSI, embedded systems and communication",
          "AI & Data Science": "Machine learning, deep learning and analytics",
          Biotechnology: "Biomedical engineering and pharmaceutical tech"
        },
        eligibility: "12th Science (PCM) + JEE Main or State CET (TNEA, COMEDK etc)",
        salary: "₹4 LPA (fresher) → ₹15-40 LPA (experienced)",
        path: "12th Science → JEE/CET → BTech (4 yrs) → Internship → Job / GATE"
      },
      Nursing: {
        overview: "BSc Nursing is a 4-year degree that trains students to become professional nurses. High demand in India and abroad especially in Gulf and UK.",
        subjects: {
          Anatomy: "Human body structure and organ systems",
          Physiology: "Body functions and biological processes",
          Pharmacology: "Medicines, dosage and drug interactions",
          "Medical Surgical Nursing": "Patient care in surgical and medical wards",
          "Community Health Nursing": "Public health and rural healthcare"
        },
        eligibility: "12th Science (PCB) + NEET or Nursing entrance exam",
        salary: "₹2.5 LPA (India fresher) → ₹8-20 LPA (abroad)",
        path: "12th Science PCB → BSc Nursing (4 yrs) → Hospital / Abroad"
      },
      MBBS: {
        overview: "MBBS is a 5.5 year medical degree including 1 year internship. The most respected and highest earning profession in India. Requires NEET.",
        subjects: {
          Anatomy: "Complete study of human body structure",
          Biochemistry: "Chemical processes in living organisms",
          Pathology: "Study of diseases and their causes",
          Pharmacology: "Drug mechanisms and clinical use",
          "Surgery & Medicine": "Practical clinical training in hospitals"
        },
        eligibility: "12th Science (PCB) + NEET UG (mandatory)",
        salary: "₹6 LPA (junior doctor) → ₹30-100 LPA (specialist)",
        path: "12th PCB → NEET → MBBS (5.5 yrs) → MD/MS Specialisation → Senior Doctor"
      },
      "BDS (Dentistry)": {
        overview: "BDS is a 5-year dental degree including 1 year internship. Growing field with opportunities in private practice and hospitals.",
        subjects: {
          "Oral Anatomy": "Teeth, jaw and oral cavity structure",
          "Dental Materials": "Composites, metals and ceramics used in dentistry",
          "Oral Surgery": "Tooth extraction and oral surgeries",
          Orthodontics: "Braces and teeth alignment",
          Prosthodontics: "Dental implants and prosthetics"
        },
        eligibility: "12th Science (PCB) + NEET UG",
        salary: "₹4 LPA (fresher) → ₹15-40 LPA (specialist/own clinic)",
        path: "12th PCB → NEET → BDS (5 yrs) → MDS Specialisation → Dental Clinic"
      },
      Pharmacy: {
        overview: "B.Pharm is a 4-year degree in pharmaceutical sciences. Good scope in drug companies, hospitals and research.",
        subjects: {
          Pharmaceutics: "Drug formulation and delivery systems",
          Pharmacology: "Drug action mechanisms and clinical use",
          "Pharmaceutical Chemistry": "Synthesis and analysis of medicines",
          Pharmacognosy: "Plant-based medicines and natural drugs",
          "Clinical Pharmacy": "Patient counselling and hospital pharmacy"
        },
        eligibility: "12th Science (PCB or PCM) + Pharmacy entrance or direct",
        salary: "₹3 LPA (fresher) → ₹10-25 LPA (experienced)",
        path: "12th Science → B.Pharm (4 yrs) → M.Pharm / Hospital / Drug Company"
      },
      "BSc (Science)": {
        overview: "BSc is a 3-year science degree available in many specialisations. Good foundation for research, teaching or professional courses.",
        branches: {
          "BSc Physics": "Optics, quantum mechanics and solid state physics",
          "BSc Chemistry": "Organic, inorganic and analytical chemistry",
          "BSc Mathematics": "Pure and applied mathematics and statistics",
          "BSc Biology / Zoology": "Living organisms, ecology and genetics",
          "BSc Botany": "Plant sciences and horticulture",
          "BSc Microbiology": "Bacteria, viruses and microorganism study",
          "BSc Biochemistry": "Chemical processes in living systems",
          "BSc Agriculture": "Crop science, soil and farming technology",
          "BSc Nutrition & Dietetics": "Food science and clinical nutrition"
        },
        eligibility: "12th Science (PCB or PCM) — depends on branch",
        salary: "₹2.5 LPA (fresher) → ₹8-20 LPA (with MSc or specialisation)",
        path: "12th Science → BSc (3 yrs) → MSc / Research / Teaching / Industry"
      },
      "IT & Computer": {
        overview: "Computer and IT degrees open doors to the highest paying jobs in India. Multiple options available for both science and non-science students.",
        branches: {
          BCA: "3-year computer degree — open to any stream. Great for software jobs",
          "BSc Computer Science": "Strong theoretical and practical CS foundation",
          "BSc Information Technology": "Focus on networking, web and IT systems",
          "BSc Data Science": "Statistics, Python and machine learning foundations",
          "BSc Artificial Intelligence": "AI, deep learning and neural networks",
          "BSc Cyber Security": "Ethical hacking, network security and forensics",
          "BSc Software Engineering": "Software development lifecycle and project management"
        },
        eligibility: "BCA — Any stream. BSc CS/IT — 12th with Maths preferred",
        salary: "₹3 LPA (fresher) → ₹12-35 LPA (experienced)",
        path: "12th Any Stream → BCA/BSc CS (3 yrs) → MCA / Job / Startup"
      },
      "BCom (Commerce)": {
        overview: "BCom is a 3-year commerce degree with multiple specialisations. Gateway to CA, MBA, banking and finance careers.",
        branches: {
          "BCom General": "Accounting, taxation and business law basics",
          "BCom Computer Applications": "Commerce with coding, Tally and digital tools",
          "BCom Accounting & Finance": "Advanced accounting and financial management",
          "BCom Banking & Insurance": "Banking operations, insurance and financial markets",
          "BCom Tax Procedure": "Income tax, GST and corporate tax filing",
          "BCom E-Commerce": "Digital marketing, online business and fintech",
          BBA: "Business Administration — management and entrepreneurship",
          BBM: "Business Management — operations and HR focus"
        },
        eligibility: "12th Commerce preferred — other streams also accepted",
        salary: "₹2.5 LPA (fresher) → ₹8-25 LPA (with CA or MBA)",
        path: "12th Commerce → BCom (3 yrs) → CA / MBA / Banking Job"
      },
      "BA (Arts)": {
        overview: "BA is a 3-year arts and humanities degree. Very flexible with wide career options in civil services, law, media, teaching and social work.",
        branches: {
          "BA English Literature": "Literature analysis, creative writing and linguistics",
          "BA Tamil / Hindi / Languages": "Regional language study and translation",
          "BA History": "Ancient, medieval and modern world history",
          "BA Political Science": "Indian polity, governance and international relations",
          "BA Economics": "Microeconomics, macroeconomics and development studies",
          "BA Sociology": "Society, culture, caste and social institutions",
          "BA Psychology": "Human behaviour, counselling and mental health",
          "BA Geography": "Physical geography, maps and environmental studies",
          "BA Journalism / Mass Communication": "Print, TV, digital media and content creation",
          "BA Social Work": "Community development, NGO and welfare services",
          "BA Fine Arts": "Drawing, painting, sculpture and visual arts"
        },
        eligibility: "12th from any stream",
        salary: "₹2 LPA (entry) → ₹8-20 LPA (with PG, UPSC or specialisation)",
        path: "Any 12th → BA (3 yrs) → MA / LLB / UPSC / Media / Teaching"
      },
      Law: {
        overview: "LLB is a law degree available as 3-year (after graduation) or 5-year integrated (after 12th). Opens doors to litigation, corporate law and civil services.",
        subjects: {
          "Constitutional Law": "Fundamental rights, directive principles and amendments",
          "Criminal Law": "IPC, CrPC and evidence act",
          "Civil Law": "Property, contract and family law",
          "Corporate Law": "Company law, SEBI regulations and mergers",
          "International Law": "Treaties, human rights and global trade law"
        },
        eligibility: "BA LLB — 12th any stream + CLAT. LLB — any UG degree",
        salary: "₹3 LPA (fresher) → ₹20-80 LPA (senior advocate or corporate lawyer)",
        path: "12th → CLAT → BA LLB (5 yrs) → Bar Council → Advocate / Corporate Lawyer"
      },
      "BEd (Education)": {
        overview: "BEd is a 2-year teacher training degree after graduation. Required to become a government or private school teacher in India.",
        subjects: {
          "Childhood and Growing Up": "Developmental psychology and child behaviour",
          "Contemporary India and Education": "Education policy and social context",
          "Learning and Teaching": "Pedagogy, curriculum design and assessment",
          "Language Across Curriculum": "Communication skills for teachers",
          "School Internship": "Practical teaching in real classrooms"
        },
        eligibility: "Any UG degree with 50% marks + State BEd entrance exam",
        salary: "₹3 LPA (private school) → ₹8 LPA (government school with benefits)",
        path: "Any UG → BEd (2 yrs) → TET/CTET → Government or Private School Teacher"
      },
    },
 
    PG: {
      _meta: { label:"Postgraduate", accent:"#7c3aed" },
      MBA: {
        overview: "MBA is a 2-year management degree. One of India's most sought-after PG degrees. Opens doors to senior management, consulting and entrepreneurship.",
        specializations: {
          Finance: "Investment banking, corporate finance and portfolio management",
          Marketing: "Brand strategy, digital marketing and consumer behaviour",
          HR: "Talent management, organisational behaviour and people analytics",
          Operations: "Supply chain, logistics and process management",
          "Business Analytics": "Data-driven decision making and business intelligence",
          "International Business": "Global trade, forex and multinational management",
          Entrepreneurship: "Startup ecosystem, venture capital and innovation"
        },
        eligibility: "Any UG degree + CAT / XAT / MAT / GMAT score",
        salary: "₹6-12 LPA (Tier 3) → ₹25-90 LPA (IIM / ISB)",
        path: "Any Degree → CAT/XAT → MBA (2 yrs) → Manager → Senior Leader"
      },
      MCA: {
        overview: "MCA is a 2-year postgraduate IT degree equivalent to MTech CS. Very high demand in software industry for technical roles.",
        specializations: {
          "AI & Machine Learning": "Deep learning, neural networks and AI applications",
          "Full Stack Development": "Frontend, backend and database development",
          "Cloud Computing": "AWS, Azure, Google Cloud and DevOps",
          Cybersecurity: "Ethical hacking, penetration testing and network defence",
          "Data Science": "Big data, analytics and data engineering",
          "Mobile Application": "Android, iOS and cross-platform development"
        },
        eligibility: "BCA / BSc CS / BSc IT with 50%+ marks",
        salary: "₹4-8 LPA (fresher) → ₹15-35 LPA (experienced)",
        path: "BCA / BSc → MCA (2 yrs) → Senior Developer → Tech Lead / Architect"
      },
      "MSc (Science)": {
        overview: "MSc is a 2-year postgraduate science degree. Opens doors to research, teaching, DRDO, ISRO and top pharma companies.",
        specializations: {
          "MSc Physics": "Quantum physics, astrophysics and material science",
          "MSc Chemistry": "Organic synthesis, analytical and industrial chemistry",
          "MSc Mathematics": "Pure math, statistics and computational mathematics",
          "MSc Biology / Zoology": "Advanced genetics, ecology and molecular biology",
          "MSc Biotechnology": "Genetic engineering, bioinformatics and drug development",
          "MSc Data Science": "Statistical modelling, Python, R and machine learning",
          "MSc Microbiology": "Medical microbiology and industrial fermentation",
          "MSc Nutrition": "Clinical nutrition, dietetics and food technology",
          "MSc Agriculture": "Crop protection, soil management and agri-business"
        },
        eligibility: "BSc in relevant subject with 50%+ marks",
        salary: "₹3 LPA (fresher) → ₹12-30 LPA (research / industry)",
        path: "BSc → MSc (2 yrs) → PhD / Research / Teaching / Industry"
      },
      "MA (Arts)": {
        overview: "MA is a 2-year postgraduate arts degree. Strengthens expertise in humanities, social sciences and prepares for civil services and academia.",
        specializations: {
          "MA English": "Advanced literature, linguistics and creative writing",
          "MA History": "Historical research and archival studies",
          "MA Political Science": "Public policy, governance and international relations",
          "MA Economics": "Advanced economics, econometrics and research",
          "MA Sociology": "Social research, welfare policy and community studies",
          "MA Psychology": "Clinical, organisational and educational psychology",
          "MA Journalism": "Investigative journalism, media management and broadcasting",
          "MA Social Work": "Community development, NGO management and welfare"
        },
        eligibility: "BA in relevant subject with 50%+ marks",
        salary: "₹2.5 LPA (entry) → ₹10-25 LPA (with UPSC or specialisation)",
        path: "BA → MA (2 yrs) → UPSC / PhD / Teaching / Media / NGO"
      },
      "MCom (Commerce)": {
        overview: "MCom is a 2-year postgraduate commerce degree. Ideal for those wanting to go into higher academics, banking, finance or CA alongside.",
        specializations: {
          "Advanced Accounting": "IFRS, forensic accounting and audit",
          Taxation: "Direct tax, indirect tax and international taxation",
          "Finance & Banking": "Investment analysis and banking operations",
          "E-Commerce": "Digital business, fintech and online retail management",
          "Business Administration": "Strategic management and corporate governance"
        },
        eligibility: "BCom with 50%+ marks",
        salary: "₹3 LPA (fresher) → ₹10-20 LPA (with CA or banking)",
        path: "BCom → MCom (2 yrs) → CA / Banking / Academics / Finance Job"
      },
      "MTech / ME": {
        overview: "MTech is a 2-year postgraduate engineering degree. Gateway to research, PSU jobs and senior technical roles in top companies.",
        specializations: {
          "Computer Science": "Advanced algorithms, AI and systems design",
          "Data Science & AI": "Machine learning research and AI engineering",
          "VLSI Design": "Chip design, semiconductor and embedded systems",
          "Structural Engineering": "Advanced structural analysis and construction tech",
          "Thermal Engineering": "Heat transfer, turbines and energy systems",
          "Communication Engineering": "5G, signal processing and wireless systems",
          Robotics: "Robot design, automation and control systems"
        },
        eligibility: "BTech/BE + GATE score (mandatory for IIT/NIT/IISc)",
        salary: "₹6 LPA (fresher) → ₹20-50 LPA (experienced/research)",
        path: "BTech → GATE → MTech (2 yrs) → Research / PSU / Senior Engineer"
      },
      "MD / MS (Medical)": {
        overview: "MD (Doctor of Medicine) and MS (Master of Surgery) are 3-year postgraduate medical specialisations after MBBS. Highest earning medical degrees.",
        specializations: {
          "MD General Medicine": "Internal medicine and systemic diseases",
          "MD Paediatrics": "Child health and developmental medicine",
          "MD Radiology": "Imaging, X-ray, CT and MRI interpretation",
          "MD Psychiatry": "Mental health disorders and treatment",
          "MS General Surgery": "Operative surgery and trauma care",
          "MS Orthopaedics": "Bone, joint and musculoskeletal surgery",
          "MS Ophthalmology": "Eye surgery and vision care",
          "MS ENT": "Ear, nose and throat surgery"
        },
        eligibility: "MBBS + NEET PG (mandatory)",
        salary: "₹15 LPA (junior resident) → ₹50-200 LPA (senior specialist)",
        path: "MBBS → NEET PG → MD/MS (3 yrs) → Senior Specialist / Own Hospital"
      },
      "LLM (Law)": {
        overview: "LLM is a 1-2 year postgraduate law degree for specialised legal practice and academic research in law.",
        specializations: {
          "Constitutional Law": "Fundamental rights and judicial review research",
          "Corporate Law": "Mergers, acquisitions and securities regulation",
          "Criminal Law": "Advanced criminal procedure and evidence",
          "International Law": "Global trade, human rights and treaty law",
          "Intellectual Property": "Patents, trademarks and copyright law",
          "Cyber Law": "Data privacy, IT act and digital crime law"
        },
        eligibility: "LLB / BA LLB with 50%+ marks",
        salary: "₹5 LPA (junior) → ₹30-100 LPA (senior corporate lawyer)",
        path: "LLB → LLM (1-2 yrs) → Senior Advocate / Corporate Law / Academics"
      },
      "MPharm (Pharmacy)": {
        overview: "MPharm is a 2-year postgraduate pharmacy degree. Opens doors to R&D in top pharma companies like Sun Pharma, Cipla and Dr Reddy's.",
        specializations: {
          Pharmaceutics: "Advanced drug delivery and formulation research",
          Pharmacology: "Clinical research and drug trial management",
          "Pharmaceutical Chemistry": "Drug synthesis and medicinal chemistry",
          "Pharmaceutical Analysis": "Quality control and analytical techniques",
          "Clinical Pharmacy": "Hospital pharmacy and patient counselling"
        },
        eligibility: "B.Pharm with 55%+ marks",
        salary: "₹4 LPA (fresher) → ₹15-30 LPA (R&D / industry)",
        path: "B.Pharm → M.Pharm (2 yrs) → Pharma Company / Research / Teaching"
      },
    },
 
    Diploma: {
      _meta: { label:"Diploma", accent:"#10b981" },
      "Engineering Diploma": {
        overview: "3-year polytechnic diploma after 10th. Fastest route to technical jobs. Lateral entry to BTech 2nd year also available after diploma.",
        programs: {
          "Mechanical Engineering": "Lathe, CNC machining, welding, AutoCAD and manufacturing",
          "Civil Engineering": "Construction, surveying, site management and AutoCAD",
          "Electrical Engineering": "Wiring, motor control, PLC and power systems",
          "Computer Engineering": "Programming, networking, hardware and OS basics",
          "Electronics Engineering": "Circuit design, PCB, microcontroller and IoT",
          "Automobile Engineering": "Vehicle design, engine repair and diagnostics",
          "Chemical Engineering": "Process plant operations and industrial chemistry",
          "Mining Engineering": "Mining operations, safety and blasting techniques"
        },
        eligibility: "10th pass — 3 year diploma from polytechnic college",
        salary: "₹2-4 LPA (junior) → ₹6-15 LPA (experienced engineer)",
        path: "10th → Diploma (3 yrs) → Junior Engineer / Lateral Entry BTech 2nd Year"
      },
      "Computer Diploma": {
        overview: "Short term and long term computer diplomas for quick entry into IT industry. Available after 10th or 12th.",
        programs: {
          "PGDCA": "Post Graduate Diploma in Computer Applications — 1 year after graduation",
          "DCA": "Diploma in Computer Applications — 1 year after 12th",
          "ADCA": "Advanced Diploma in Computer Applications — 1.5 years",
          "Diploma in Web Design": "HTML, CSS, JavaScript and UI/UX basics",
          "Diploma in Networking": "CCNA, network admin and server management",
          "Diploma in Cybersecurity": "Ethical hacking and network security basics",
          "Diploma in Animation": "2D/3D animation, VFX and motion graphics",
          "Diploma in Hardware & Networking": "Computer repair, assembly and network setup"
        },
        eligibility: "10th or 12th depending on program level",
        salary: "₹2-5 LPA (fresher) → ₹8-20 LPA (experienced)",
        path: "10th/12th → Computer Diploma (6 months to 2 yrs) → IT Job / Freelance"
      },
      "Medical & Paramedical Diploma": {
        overview: "Paramedical diplomas are short courses that prepare students for healthcare support roles in hospitals and clinics.",
        programs: {
          "DMLT (Medical Lab Technology)": "Blood tests, urine analysis and pathology lab work",
          "DRIT (Radiology & Imaging)": "X-ray, CT scan and MRI machine operation",
          "DOT (Operation Theatre)": "Assisting surgeons and managing OT equipment",
          "DOTT (Optometry)": "Eye testing, lens prescription and vision care",
          "DMRT (Medical Record Technology)": "Patient data management and health information",
          "Diploma in Dialysis Technology": "Kidney dialysis machine operation and patient care",
          "Diploma in ECG Technology": "Heart monitoring and ECG interpretation",
          "Diploma in Physiotherapy": "Rehabilitation, exercise therapy and pain management"
        },
        eligibility: "12th Science (PCB) for most programs",
        salary: "₹2-4 LPA (fresher) → ₹6-12 LPA (experienced)",
        path: "12th PCB → Paramedical Diploma (1-2 yrs) → Hospital / Diagnostic Centre"
      },
      "Pharmacy Diploma": {
        overview: "D.Pharm is a 2-year diploma in pharmacy. Quickest route to work in a medical store, hospital pharmacy or drug company.",
        programs: {
          Pharmaceutics: "Drug preparation, dispensing and packaging",
          Pharmacology: "Drug actions, side effects and interactions",
          "Pharmaceutical Chemistry": "Drug composition and quality testing",
          "Hospital & Clinical Pharmacy": "Patient counselling and prescription management",
          "Community Pharmacy": "Running a medical shop and retail pharmacy"
        },
        eligibility: "12th Science (PCB or PCM) — 2 year program",
        salary: "₹1.8-3 LPA (medical store) → ₹5-10 LPA (pharma company)",
        path: "12th Science → D.Pharm (2 yrs) → Medical Store / Hospital Pharmacy / Drug Company"
      },
      "Management Diploma": {
        overview: "Management diplomas provide quick business and management skills. Good alternative to full MBA for working professionals.",
        programs: {
          "PGDM": "Full MBA equivalent — 2 year program at private institutes",
          "Diploma in Digital Marketing": "SEO, social media, Google Ads and content marketing",
          "Diploma in Retail Management": "Store management, visual merchandising and customer service",
          "Diploma in HR Management": "Recruitment, payroll and employee relations",
          "Diploma in Financial Management": "Accounting, budgeting and financial planning",
          "Diploma in Logistics": "Supply chain, warehouse and transport management",
          "Diploma in Event Management": "Event planning, execution and client management"
        },
        eligibility: "12th or Graduation depending on program level",
        salary: "₹3-6 LPA (entry) → ₹10-25 LPA (experienced manager)",
        path: "12th / Graduation → Management Diploma (6 months to 2 yrs) → Corporate Job"
      },
      "Arts & Design Diploma": {
        overview: "Creative diplomas in design, media and performing arts for students passionate about visual arts, fashion and entertainment.",
        programs: {
          "Diploma in Graphic Design": "Logo, poster, branding and print design using Photoshop",
          "Diploma in UI/UX Design": "App design, wireframing and user experience",
          "Diploma in Fashion Design": "Garment construction, sketching and textile design",
          "Diploma in Interior Design": "Space planning, 3D rendering and furniture design",
          "Diploma in Photography": "Commercial, portrait and documentary photography",
          "Diploma in Film Making": "Direction, cinematography, editing and production",
          "Diploma in Music": "Classical or Western music theory and performance",
          "Diploma in Dance": "Classical, folk or contemporary dance performance"
        },
        eligibility: "10th or 12th — varies by institute and program",
        salary: "₹2.5-5 LPA (fresher) → ₹10-30 LPA (experienced creative professional)",
        path: "10th/12th → Design Diploma (1-3 yrs) → Design Agency / Freelance / Studio"
      },
      "Vocational & Skill Diploma": {
        overview: "Short skill-based diplomas under NSDC, ITI and government schemes. Fast track to employment with industry-recognised certification.",
        programs: {
          "ITI (Industrial Training Institute)": "Electrician, fitter, plumber, welder — 1-2 year trade courses",
          "Diploma in Beauty & Cosmetology": "Hair, skin, makeup and salon management",
          "Diploma in Hotel Management": "Hospitality, food service and front office operations",
          "Diploma in Travel & Tourism": "Tour operations, ticketing and travel agency management",
          "Diploma in Catering Technology": "Professional cooking, bakery and food production",
          "Diploma in Agriculture": "Farming techniques, crop management and agri-business",
          "Diploma in Yoga": "Yoga therapy, meditation and wellness coaching",
          "Diploma in Child Care": "Early childhood education and nursery teaching"
        },
        eligibility: "8th to 12th pass depending on course — most open to all",
        salary: "₹1.5-4 LPA (entry) → ₹5-15 LPA (skilled professional)",
        path: "8th/10th/12th → Skill Diploma (6 months to 2 yrs) → Skilled Employment"
      },
    }
  },
 
  work: {
    _meta: { icon:"💼", accent:"#10b981", pill:"rgba(16,185,129,.1)", desc:"Government and private sector career opportunities." },
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
    _meta: { icon:"🚀", accent:"#ec4899", pill:"rgba(236,72,153,.1)", desc:"Business ideas and startup paths for everyone." },
    overview: "Business gives unlimited income and freedom. India has the 3rd largest startup ecosystem globally. Government supports through Mudra Loan, Startup India and MSME schemes.",
    common: {
      label: "Common — For Anyone",
      accent: "#7c3aed",
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
      accent: "#3b82f6",
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
      accent: "#ec4899",
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
 
const ACCENTS     = { school:"#7c3aed", college:"#0ea5e9", work:"#10b981", business:"#ec4899" };
const SUB_ACCENTS = { UG:"#0ea5e9", PG:"#7c3aed", Diploma:"#10b981" };
const GRID_KEYS   = ["subjects","careers","branches","programs","specializations","sectors","exams","skills","benefits","types","entrances","ideas"];
const STAT_KEYS   = ["eligibility","salary"];
 
/* Home card colour configs — vivid, one distinct palette per category */
const HOME_CARD_CFG = {
  school: {
    bg: "#f5f3ff",
    bar: "linear-gradient(90deg,#7c3aed,#a78bfa)",
    pillBg: "rgba(124,58,237,0.12)",
    pillBorder: "rgba(124,58,237,0.30)",
    accent: "#7c3aed",
    iconBg: "rgba(124,58,237,0.12)",
    arrowBg: "rgba(124,58,237,0.12)",
    shadow: "rgba(124,58,237,0.14)",
    shadowH: "rgba(124,58,237,0.28)",
    border: "rgba(124,58,237,0.18)",
  },
  college: {
    bg: "#f0f9ff",
    bar: "linear-gradient(90deg,#0ea5e9,#38bdf8)",
    pillBg: "rgba(14,165,233,0.12)",
    pillBorder: "rgba(14,165,233,0.30)",
    accent: "#0284c7",
    iconBg: "rgba(14,165,233,0.12)",
    arrowBg: "rgba(14,165,233,0.12)",
    shadow: "rgba(14,165,233,0.14)",
    shadowH: "rgba(14,165,233,0.28)",
    border: "rgba(14,165,233,0.18)",
  },
  work: {
    bg: "#f0fdf4",
    bar: "linear-gradient(90deg,#10b981,#34d399)",
    pillBg: "rgba(16,185,129,0.12)",
    pillBorder: "rgba(16,185,129,0.30)",
    accent: "#059669",
    iconBg: "rgba(16,185,129,0.12)",
    arrowBg: "rgba(16,185,129,0.12)",
    shadow: "rgba(16,185,129,0.14)",
    shadowH: "rgba(16,185,129,0.28)",
    border: "rgba(16,185,129,0.18)",
  },
  business: {
    bg: "#fdf2f8",
    bar: "linear-gradient(90deg,#ec4899,#f472b6)",
    pillBg: "rgba(236,72,153,0.12)",
    pillBorder: "rgba(236,72,153,0.30)",
    accent: "#db2777",
    iconBg: "rgba(236,72,153,0.12)",
    arrowBg: "rgba(236,72,153,0.12)",
    shadow: "rgba(236,72,153,0.14)",
    shadowH: "rgba(236,72,153,0.28)",
    border: "rgba(236,72,153,0.18)",
  },
};
 
const HOME_META = {
  school:   { icon:"🏫", desc:"Science, Commerce & Arts streams after 10th." },
  college:  { icon:"🎓", desc:"UG, PG and Diploma programs."                 },
  work:     { icon:"💼", desc:"Government & Private sector jobs."             },
  business: { icon:"🚀", desc:"Business ideas and startup paths."             },
};
 
function cap(str) { return str.charAt(0).toUpperCase() + str.slice(1); }
 
function PathSteps({ path, accent }) {
  const steps = path.split("→").map(s => s.trim());
  return (
    <div className="path-steps">
      {steps.map((s, i) => (
        <span key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span className="path-step" style={{ background:`${accent}12`, borderColor:`${accent}35`, color:accent }}>{s}</span>
          {i < steps.length - 1 && <span className="path-arrow">→</span>}
        </span>
      ))}
    </div>
  );
}
 
function SectionLabel({ children, accent }) {
  return (
    <div className="sec-label" style={{ color: accent || "#7c3aed" }}>
      {children}
    </div>
  );
}
 
function ColoredItemsGrid({ obj, sectionKey }) {
  const palette = SECTION_PALETTES[sectionKey] || PASTEL_CYCLE;
  return (
    <div className="colored-grid">
      {Object.entries(obj).map(([k, v], i) => {
        const c = palette[i % palette.length];
        return (
          <div key={k} className="colored-card" style={{
            background: c.bg,
            border: `1.5px solid ${c.border}40`,
            borderLeft: `4px solid ${c.border}`,
          }}>
            <b style={{ color: c.text }}>{k}</b>
            <span style={{ color: c.sub }}>{v}</span>
          </div>
        );
      })}
    </div>
  );
}
 
function StatRow({ info, accent }) {
  const found = STAT_KEYS.filter(k => info[k]);
  return (
    <div className="stat-row">
      {found.map(k => (
        <div key={k} className="stat-box">
          <div className="stat-box-label">{k}</div>
          <div className="stat-box-val" style={{ color: accent || "#7c3aed" }}>{info[k]}</div>
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
    const existing = document.getElementById("explore-styles");
    if (existing) existing.remove();
    const el = document.createElement("style");
    el.id = "explore-styles";
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
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
 
  /* ── HOME VIEW ── */
  const HomeView = () => (
    <div className="fade-in">
      <p style={{ fontSize:11, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:"#7c3aed", marginTop:32, marginBottom:4 }}>EXPLORE</p>
      <h1 className="pg-title">Explore Career Paths</h1>
      <p className="pg-sub">Browse streams, college programs, jobs and business ideas to find your perfect path.</p>
      <div className="home-grid">
        {Object.keys(DATA).map(key => {
          const m   = HOME_META[key];
          const cfg = HOME_CARD_CFG[key];
          return (
            <div
              key={key}
              className="home-card"
              style={{
                background: cfg.bg,
                "--hc-accent": cfg.accent,
                "--hc-shadow": cfg.shadow,
                "--hc-shadow-h": cfg.shadowH,
                "--hc-border": cfg.border,
                "--hc-pill-bg": cfg.pillBg,
                "--hc-pill-border": cfg.pillBorder,
                "--hc-icon-bg": cfg.iconBg,
                "--hc-arrow-bg": cfg.arrowBg,
              }}
              onClick={() => key === "business" ? go("business") : go("cat", key)}
            >
              <div className="hc-bar" style={{ background: cfg.bar }} />
              <span className="hc-pill" style={{
                background: cfg.pillBg,
                color: cfg.accent,
                border: `1.5px solid ${cfg.pillBorder}`
              }}>
                {key.toUpperCase()}
              </span>
              <div className="hc-inner">
                <div className="hc-icon" style={{ background: cfg.iconBg }}>
                  {m.icon}
                </div>
                <div className="hc-name">{cap(key)}</div>
                <div className="hc-desc">{m.desc}</div>
              </div>
              <div className="hc-arrow" style={{ background: cfg.arrowBg, color: cfg.accent }}>→</div>
            </div>
          );
        })}
      </div>
    </div>
  );
 
  /* ── CAT VIEW ── */
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
                style={{ "--lc-accent": accent, "--lc-glow": `${accent}12` }}
                onClick={() => isGroup ? go("sub", cat, key) : go("detail", cat, null, key)}
              >
                <span className="lc-tag" style={{ background:`${accent}15`, color:accent, border:`1px solid ${accent}40` }}>
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
 
  /* ── SUB VIEW ── */
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
              style={{ "--lc-accent": accent, "--lc-glow": `${accent}12` }}
              onClick={() => go("detail", cat, sub, key)}
            >
              <span className="lc-tag" style={{ background:`${accent}15`, color:accent, border:`1px solid ${accent}40` }}>
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
 
  /* ── DETAIL VIEW ── */
  const DetailView = () => {
    const info   = sub ? DATA[cat][sub][item] : DATA[cat][item];
    if (!info) return <div style={{ padding:40, color:"#ef4444" }}>Not found.</div>;
    const accent = sub ? (SUB_ACCENTS[sub] || ACCENTS[cat]) : ACCENTS[cat];
    return (
      <div className="fade-in" style={{ "--detail-accent": accent }}>
        <BackBtn onClick={() => sub ? go("sub", cat, sub) : go("cat", cat)} />
        <h1 className="pg-title">{item}</h1>
        {info.overview && (
          <div className="detail-overview" style={{ "--detail-accent": accent }}>
            {info.overview}
          </div>
        )}
        <StatRow info={info} accent={accent} />
        {GRID_KEYS.map(key => {
          if (!info[key] || typeof info[key] !== "object") return null;
          return (
            <div key={key}>
              <SectionLabel accent={accent}>{cap(key)}</SectionLabel>
              <ColoredItemsGrid obj={info[key]} sectionKey={key} />
            </div>
          );
        })}
        {info.path && (
          <>
            <SectionLabel accent={accent}>Career Path</SectionLabel>
            <div className="path-strip">
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", color:accent, marginBottom:8, textTransform:"uppercase" }}>
                Step-by-Step
              </div>
              <PathSteps path={info.path} accent={accent} />
            </div>
          </>
        )}
      </div>
    );
  };
 
  /* ── BUSINESS VIEW ── */
  const BusinessView = () => {
    const biz = DATA.business;
    const tabAccent = { common:"#7c3aed", male:"#3b82f6", female:"#ec4899" };
    const tabs      = { common: biz.common, male: biz.male, female: biz.female };
    const current   = tabs[gtab];
    const ca        = tabAccent[gtab];
    return (
      <div className="fade-in">
        <BackBtn onClick={() => go("home")} />
        <h1 className="pg-title">Business & Entrepreneurship</h1>
        <div className="detail-overview" style={{ "--detail-accent": "#ec4899" }}>{biz.overview}</div>
 
        <SectionLabel accent="#ec4899">Types of Business</SectionLabel>
        <ColoredItemsGrid obj={biz.types} sectionKey="types" />
 
        <SectionLabel accent="#ec4899">Business Ideas</SectionLabel>
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
          <ColoredItemsGrid obj={current.ideas} sectionKey="ideas" />
          <div style={{ marginTop:24 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", color:ca, marginBottom:8, textTransform:"uppercase" }}>
              Getting Started
            </div>
            <div className="path-strip">
              <PathSteps path={current.path} accent={ca} />
            </div>
          </div>
        </div>
 
        <SectionLabel accent="#ec4899">Why Choose Business?</SectionLabel>
        <ColoredItemsGrid obj={biz.benefits} sectionKey="benefits" />
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
 