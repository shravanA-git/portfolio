// Single source of truth for site copy and data.
// Sourced from notes/content.md and notes/research-summary.md.

export const SITE_URL = "https://portfolio-hazel-sigma-58.vercel.app";

export const SITE_TITLE = "Shravan Anand · CS + Economics @ Duke '30";

export const SITE_DESCRIPTION =
  "Shravan Anand's research portfolio: machine learning, CFD, and quantitative finance projects. CS + Economics, Duke University Class of 2030.";

export const PERSON = {
  name: "Shravan Anand",
  subtitle: "CS + Economics · Duke University · Class of 2030",
  kicker: "Research in ML, quantitative finance, and aerospace engineering",
  email: "shravan.anand.2026@gmail.com",
  github: "https://github.com/shravanA-git",
  linkedin: "https://www.linkedin.com/in/shravan-anand",
  about: [
    "Incoming member of Duke University's Class of 2030, studying Computer Science and Economics.",
    "Work moves between quantitative finance, machine learning, data science, and aerospace engineering: fine-tuning BERT models on financial headlines one month, running thousand-simulation CFD sweeps on rocket geometry the next.",
    "Each project starts as a research question and ends as a working pipeline, with the data to back it up.",
  ],
} as const;

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Awards", href: "/awards" },
  { label: "Skills", href: "/skills" },
  { label: "Leadership", href: "/leadership" },
  { label: "Contact", href: "/contact" },
];

export type Stat = { value: string; label: string };
export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  stats: Stat[];
  tags: string[];
  links: ProjectLink[];
  image?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "macroscope",
    title: "MacroScope",
    category: "Macro Regime Detection",
    description:
      "A live quantitative research platform that classifies the US economy into four macro regimes (Expansion, Late-Cycle, Recovery, Contraction) using a Hidden Markov Model trained on 35 years of FRED data. A walk-forward validated AutoGluon ensemble forecasts next-month regime transitions. Full stack: Python HMM + FastAPI backend, Next.js 16 frontend, deployed on Vercel.",
    stats: [
      { value: "90.4%", label: "Walk-forward validation accuracy" },
      { value: "35 yrs", label: "FRED macroeconomic data, 1990–2026" },
      { value: "5-state", label: "GaussianHMM with Viterbi decoding" },
      { value: "Live", label: "Deployed to production on Vercel" },
    ],
    tags: ["Python", "hmmlearn", "AutoGluon", "FastAPI", "Next.js", "FRED API", "GSAP"],
    links: [
      { label: "Live Dashboard →", href: "https://macroscope-red.vercel.app" },
      { label: "Code on GitHub →", href: "https://github.com/shravanA-git/macroscope" },
    ],
    image: "/images/macroscope.png",
  },
  {
    slug: "argus",
    title: "Argus",
    category: "Multi-Agent RAG Platform",
    description:
      "A production multi-agent RAG platform that answers questions about uploaded documents with inline citations, then grades its own answers. Five agents handle ingestion, query routing, hybrid retrieval (pgvector dense search fused with BM25 and reranked by a cross-encoder), streaming synthesis, and an automated RAGAS evaluation loop that scores every answer for faithfulness, context precision, and answer relevancy. Runs entirely on free-tier infrastructure.",
    stats: [
      { value: "1.00", label: "Hit@5, hybrid retrieval benchmark" },
      { value: "0.92", label: "MRR with cross-encoder reranking" },
      { value: "5 agents", label: "Ingest, route, retrieve, synthesize, evaluate" },
      { value: "Live", label: "Deployed to production on Vercel" },
    ],
    tags: ["TypeScript", "Next.js", "pgvector", "LangChain", "RAGAS", "Groq", "HuggingFace", "Neon"],
    links: [
      { label: "Live Demo →", href: "https://argus-five-tau.vercel.app" },
      { label: "Code on GitHub →", href: "https://github.com/shravanA-git/argus" },
    ],
    image: "/images/argus.png",
  },
  {
    slug: "earningsedge",
    title: "EarningsEdge",
    category: "Earnings Call Intelligence",
    description:
      "An earnings call intelligence platform that scores SEC EDGAR transcripts with FinBERT sentiment analysis, then adjusts each score for the prevailing macro regime supplied by MacroScope. The result is a sentiment surprise signal: whether a company sounded better or worse than the economic climate would predict. Covers 20 S&P 500 tickers across 6 sectors, with live filing analysis and generated PDF reports.",
    stats: [
      { value: "20", label: "S&P 500 tickers across 6 sectors" },
      { value: "FinBERT", label: "Domain-tuned financial sentiment model" },
      { value: "4 regimes", label: "MacroScope HMM baselines per call" },
      { value: "Live", label: "Deployed to production on Vercel" },
    ],
    tags: ["Next.js", "TypeScript", "FinBERT", "HuggingFace", "SEC EDGAR", "Groq"],
    links: [
      { label: "Live Demo →", href: "https://frontend-vert-nu-e3dizlrvd1.vercel.app" },
      { label: "Code on GitHub →", href: "https://github.com/shravanA-git/earningsedge" },
    ],
    image: "/images/earningsedge.png",
  },
  {
    slug: "rocket-flow",
    title: "Rocket Flow",
    category: "CFD + ML Pipeline",
    description:
      "A computational pipeline that generates rocket fin geometries in OpenSCAD, runs them through 1,000+ OpenFOAM CFD simulations, and trains an AutoGluon ensemble to predict drag from geometric parameters. SHAP analysis reveals which fin dimensions matter most. The ensemble reached R² = 0.989, outperforming polynomial regression and standalone random forests.",
    stats: [
      { value: "R² 0.989", label: "AutoGluon ensemble accuracy" },
      { value: "MAE 0.036", label: "Best model mean absolute error" },
      { value: "1,000+", label: "OpenFOAM CFD simulations" },
      { value: "1st Place", label: "Qorvo Young Innovators Award" },
    ],
    tags: ["Python", "OpenFOAM", "OpenSCAD", "AutoGluon", "SHAP", "CFD"],
    links: [
      { label: "View Publication →", href: "https://doi.org/10.5281/zenodo.17410956" },
    ],
    image: "/images/rocket-flow-model.png",
  },
  {
    slug: "nlp-finance",
    title: "NLP Finance",
    category: "Financial Sentiment Classifier",
    description:
      "A BERT-based sentiment classifier fine-tuned on financial news headlines to flag positive, neutral, and negative market sentiment. Four epochs of fine-tuning with AdamW and a linear learning-rate schedule pushed accuracy from 70% to 99%, turning a generic language model into a domain-specific market-sentiment signal.",
    stats: [
      { value: "70% → 99%", label: "Accuracy after fine-tuning" },
      { value: "3-class", label: "Positive / neutral / negative" },
      { value: "BERT-base", label: "Fine-tuned via PyTorch + HuggingFace" },
    ],
    tags: ["Python", "PyTorch", "BERT", "HuggingFace", "Transformers", "NLP"],
    links: [
      { label: "Code on GitHub →", href: "https://github.com/shravanA-git" },
    ],
    image: "/images/nlp-finance.png",
  },
  {
    slug: "traffic-collision-ml",
    title: "Traffic Collision ML",
    category: "Crash Severity Prediction",
    description:
      "Analysis of 260,000 California traffic collisions (SWITRS, 2006–2021) to predict crash severity. After preprocessing and addressing class imbalance with SMOTE, a Random Forest model reached 71% weighted accuracy, outperforming KNN and linear baselines, with feature importance analysis surfacing the conditions most associated with severe outcomes.",
    stats: [
      { value: "260,000", label: "SWITRS crash records, 2006–2021" },
      { value: "71%", label: "Weighted accuracy (Random Forest + SMOTE)" },
      { value: "4 models", label: "Linear, RF, KNN, AutoGluon compared" },
    ],
    tags: ["Python", "Scikit-learn", "Pandas", "AutoGluon", "SMOTE"],
    links: [
      { label: "View Publication →", href: "https://doi.org/10.5281/zenodo.16749278" },
      {
        label: "Read on Medium →",
        href: "https://medium.com/data-science-collective/can-ai-predict-when-car-crashes-turn-deadly-a-deep-dive-into-traffic-safety-6947a883462e",
      },
    ],
    image: "/images/traffic-collision-features.png",
  },
];

export type Award = { title: string; detail: string };

export const AWARDS: Award[] = [
  { title: "1st Place · Qorvo Young Innovators Award", detail: "Dallas Regional Science Fair, selected from 11,000+ students" },
  { title: "Top 4% · DECA Stock Market Game", detail: "80% portfolio growth, top 4% of 5,000+ teams internationally" },
  { title: "DECA ICDC Thrive Academy Nominee", detail: "1 of 500 students nominated internationally" },
  { title: "2nd Place · Texas State DECA", detail: "Principles of Finance" },
  { title: "1st Place · District DECA", detail: "Travel & Tourism" },
  { title: "National Merit Commended Scholar", detail: "" },
  { title: "AP Scholar with Distinction", detail: "SAT 1570 (780 EBRW / 790 Math)" },
];

export type SkillGroup = { label: string; skills: string[] };

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "Machine Learning & Data",
    skills: ["Python", "Scikit-learn", "AutoGluon", "SHAP", "BERT",
             "HuggingFace", "PyTorch", "pandas", "NumPy", "hmmlearn", "SQL"],
  },
  {
    label: "Web & Backend",
    skills: ["Next.js", "FastAPI", "TypeScript", "React",
             "Tailwind CSS", "Vercel", "REST APIs"],
  },
  {
    label: "Simulation & Engineering",
    skills: ["OpenFOAM", "OpenSCAD", "CAD", "CFD", "Git"],
  },
  {
    label: "Quantitative Finance",
    skills: ["Time-Series Modeling", "Macro Economics",
             "Hidden Markov Models", "Walk-Forward Validation", "FRED API"],
  },
];

export type LeadershipItem = { role: string; detail: string };

export const LEADERSHIP: LeadershipItem[] = [
  { role: "Founder & President, Data Science Club", detail: "Built a 50+ member organization with a full curriculum and monthly workshops" },
  { role: "Director of Membership, DECA", detail: "Grew chapter membership from 300 to 400 students (+33%)" },
  { role: "Student Researcher & Senior Mentor, NASA HAS", detail: "8-month aerospace research program; mentored on the Moonshot CAD project" },
  { role: "Legislative & Youth Mentor, NAAF", detail: "Built a national peer-support community and piloted a Discord support network" },
  { role: "Court Lead, ACEing Autism", detail: "100+ volunteer hours; trained 15+ volunteers per session" },
  { role: "Competition Officer, Mu Alpha Theta", detail: "Led the school's 1st-place math team and ran AMC prep sessions" },
  { role: "Student Ambassador & PALS Mentor", detail: "District presentations on study skills and peer mentorship" },
];

export type ContactLink = { label: string; value: string; href: string };

export const CONTACT_LINKS: ContactLink[] = [
  { label: "Email", value: PERSON.email, href: `mailto:${PERSON.email}` },
  { label: "GitHub", value: "github.com/shravanA-git", href: PERSON.github },
  { label: "LinkedIn", value: "linkedin.com/in/shravan-anand", href: PERSON.linkedin },
];

/**
 * Cards for the homepage staircase nav — one per major section, in the
 * same order/index as NAV_LINKS and SectionHeading. Clicking a card scrolls
 * to that section, where the individual items (projects, awards, etc.) live.
 */
export type ExploreCard = {
  href: string;
  index: string;
  label: string;
  description: string;
  meta: string;
};

export const EXPLORE_CARDS: ExploreCard[] = [
  {
    href: "/about",
    index: "01",
    label: "About",
    description:
      "CS + Economics at Duke, Class of 2030, with research spanning machine learning, CFD, and quantitative finance.",
    meta: "Profile",
  },
  {
    href: "/projects",
    index: "02",
    label: "Projects",
    description:
      "Six research projects spanning applied AI, aerospace, public safety, financial markets, and macro economics, each shipped as working code and data.",
    meta: `${PROJECTS.length} projects`,
  },
  {
    href: "/awards",
    index: "03",
    label: "Awards",
    description:
      "National and state recognition, from a 1st-place science fair win to top rankings in DECA and academic scholarships.",
    meta: `${AWARDS.length} awards`,
  },
  {
    href: "/skills",
    index: "04",
    label: "Skills",
    description:
      "A working toolkit across machine learning, simulation, and quantitative finance, built through research rather than coursework alone.",
    meta: `${SKILL_GROUPS.length} domains`,
  },
  {
    href: "/leadership",
    index: "05",
    label: "Leadership",
    description:
      "Founding and leading student organizations, mentoring peers, and growing community programs.",
    meta: `${LEADERSHIP.length} roles`,
  },
  {
    href: "/contact",
    index: "06",
    label: "Contact",
    description:
      "Open to conversations about research, internships, or anything at the intersection of code, data, and flight.",
    meta: `${CONTACT_LINKS.length} channels`,
  },
];
