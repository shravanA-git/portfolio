// Single source of truth for site copy and data.
// Sourced from notes/content.md and notes/research-summary.md.

export const SITE_URL = "https://shravananand.me";

export const SITE_TITLE = "Shravan Anand · CS + Economics @ Duke '30";

export const SITE_DESCRIPTION =
  "Shravan Anand's portfolio: quantitative finance, equity research, and applied machine learning. Timestamped stock pitches, macro regime detection, and earnings-call sentiment. CS + Economics, Duke University Class of 2030.";

export const RESUME_PATH = "/Shravan_Anand_Resume.pdf";

export const PERSON = {
  name: "Shravan Anand",
  subtitle: "CS + Economics · Duke University · Class of 2030",
  kicker: "Quantitative finance, equity research, and applied machine learning",
  email: "shravan.anand.2026@gmail.com",
  github: "https://github.com/shravanA-git",
  linkedin: "https://www.linkedin.com/in/shravan-anand",
  about: [
    "First-year at Duke University, Class of 2030, studying Computer Science and Economics.",
    "I got interested in markets before I got interested in code. Trading a DECA portfolio to the top 4% of 5,000 teams taught me that most of an investment thesis is unfalsifiable hand-waving, and that the interesting question is not what do you think but what would prove you wrong. Everything I have built since is an attempt to answer that question with data.",
    "That means equity research where every pitch is timestamped in git and scored against the S&P 500 with no retroactive edits; a Hidden Markov Model that classifies the macro cycle into four regimes off 35 years of FRED data; and an earnings-call model that asks whether a company sounded better or worse than its economic climate would predict. The engineering exists to make the research falsifiable, not the other way around.",
    "Each project starts as a research question and ends as a working pipeline, with the data to back it up.",
  ],
  seeking:
    "I am recruiting for investment and consulting clubs at Duke this fall, and looking for summer 2027 internships in equity research, investment banking, or consulting.",
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
  /** When the work was done. Shown on the card so recent work reads as recent. */
  period: string;
  description: string;
  stats: Stat[];
  tags: string[];
  links: ProjectLink[];
  image?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "conviction",
    title: "Conviction",
    category: "Equity Research Platform",
    period: "2026",
    description:
      "An equity research notebook where every stock pitch is timestamped in git history and tracked live against the S&P 500, with no retroactive edits. Each pitch is a structured research note: Situation, Complication, and falsifiable thesis pillars, MECE risk tables with mitigants, comparable multiples frozen at pitch date, bear, base, and bull targets, and an interactive DCF with a WACC by terminal-growth sensitivity grid. A form-based Pitch Builder generates new entries.",
    stats: [
      { value: "Live", label: "Performance tracked vs SPY from pitch date" },
      { value: "3 lenses", label: "Comps, targets, interactive DCF" },
      { value: "0 deps", label: "Hand-rolled SVG charts, plain math, no LLM" },
      { value: "Timestamped", label: "Git history is the accountability layer" },
    ],
    tags: ["TypeScript", "Next.js", "Valuation", "DCF", "Equity Research"],
    links: [
      { label: "Live Site \u2192", href: "https://conviction-woad.vercel.app" },
      { label: "Code on GitHub \u2192", href: "https://github.com/shravanA-git/conviction" },
    ],
    image: "/images/conviction.png",
  },
  {
    slug: "macroscope",
    title: "MacroScope",
    category: "Macro Regime Detection",
    period: "2026",
    description:
      "A live quantitative research platform that classifies the US economy into four macro regimes (Expansion, Late-Cycle, Recovery, Contraction) using a Hidden Markov Model trained on 35 years of FRED data. A walk-forward validated AutoGluon ensemble forecasts next-month regime transitions. Full stack: Python HMM + FastAPI backend, Next.js 16 frontend, deployed on Vercel.",
    stats: [
      { value: "90.4%", label: "Walk-forward validation accuracy" },
      { value: "35 yrs", label: "FRED macroeconomic data, 1990\u20132026" },
      { value: "5-state", label: "GaussianHMM with Viterbi decoding" },
      { value: "Live", label: "Deployed to production on Vercel" },
    ],
    tags: ["Python", "hmmlearn", "AutoGluon", "FastAPI", "Next.js", "FRED API", "GSAP"],
    links: [
      { label: "Live Dashboard \u2192", href: "https://macroscope-red.vercel.app" },
      { label: "Code on GitHub \u2192", href: "https://github.com/shravanA-git/macroscope" },
    ],
    image: "/images/macroscope.png",
  },
  {
    slug: "earningsedge",
    title: "EarningsEdge",
    category: "Earnings Call Intelligence",
    period: "2026",
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
      { label: "Live Demo \u2192", href: "https://frontend-vert-nu-e3dizlrvd1.vercel.app" },
      { label: "Code on GitHub \u2192", href: "https://github.com/shravanA-git/earningsedge" },
    ],
    image: "/images/earningsedge.png",
  },
  {
    slug: "nlp-finance",
    title: "NLP Finance",
    category: "Financial Sentiment Classifier",
    period: "2025",
    description:
      "A BERT-based sentiment classifier fine-tuned on financial news headlines to flag positive, neutral, and negative market sentiment. Four epochs of fine-tuning with AdamW and a linear learning-rate schedule pushed accuracy from 70% to 99%, turning a generic language model into a domain-specific market-sentiment signal.",
    stats: [
      { value: "70% \u2192 99%", label: "Accuracy after fine-tuning" },
      { value: "3-class", label: "Positive / neutral / negative" },
      { value: "BERT-base", label: "Fine-tuned via PyTorch + HuggingFace" },
    ],
    tags: ["Python", "PyTorch", "BERT", "HuggingFace", "Transformers", "NLP"],
    links: [
      { label: "Code on GitHub \u2192", href: "https://github.com/shravanA-git/NLPFinance" },
    ],
    image: "/images/nlp-finance.png",
  },
  {
    slug: "cofound",
    title: "Cofound",
    category: "Multiplayer Coding Agent",
    period: "2026",
    description:
      "A coding agent a whole team shares. The agent's transcript is stored against the project rather than against a person, and the project's standing instructions live in a COFOUND.md the agent re-reads on every run, so a second person's message continues the same conversation instead of starting a new one. Runs stream live to everyone in the project, writes can be gated behind teammate review, and a review comment rides into the next run's prompt as an instruction.",
    stats: [
      { value: "673", label: "Self-tests and browser tests, 0 failing" },
      { value: "1 thread", label: "One shared transcript per project, not per person" },
      { value: "Per-phase", label: "Model routing across plan, edit, and review" },
      { value: "Live", label: "Deployed to production on Vercel" },
    ],
    tags: ["TypeScript", "Next.js", "Anthropic API", "Redis", "Liveblocks", "GitHub OAuth", "Playwright"],
    links: [
      { label: "Live Site \u2192", href: "https://cofound-tau.vercel.app" },
    ],
    image: "/images/cofound.png",
  },
  {
    slug: "argus",
    title: "Argus",
    category: "Multi-Agent RAG Platform",
    period: "2026",
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
      { label: "Live Demo \u2192", href: "https://argus-five-tau.vercel.app" },
      { label: "Code on GitHub \u2192", href: "https://github.com/shravanA-git/argus" },
    ],
    image: "/images/argus.png",
  },
  {
    slug: "traffic-collision-ml",
    title: "Traffic Collision ML",
    category: "Crash Severity Prediction",
    period: "2025",
    description:
      "Analysis of 260,000 California traffic collisions (SWITRS, 2006\u20132021) to predict crash severity. After preprocessing and addressing class imbalance with SMOTE, a Random Forest model reached 71% weighted accuracy, outperforming KNN and linear baselines, with feature importance analysis surfacing the conditions most associated with severe outcomes.",
    stats: [
      { value: "260,000", label: "SWITRS crash records, 2006\u20132021" },
      { value: "71%", label: "Weighted accuracy (Random Forest + SMOTE)" },
      { value: "4 models", label: "Linear, RF, KNN, AutoGluon compared" },
    ],
    tags: ["Python", "Scikit-learn", "Pandas", "AutoGluon", "SMOTE"],
    links: [
      { label: "View Publication \u2192", href: "https://doi.org/10.5281/zenodo.16749278" },
      {
        label: "Read on Medium \u2192",
        href: "https://medium.com/data-science-collective/can-ai-predict-when-car-crashes-turn-deadly-a-deep-dive-into-traffic-safety-6947a883462e",
      },
    ],
    image: "/images/traffic-collision-features.png",
  },
  {
    slug: "rocket-flow",
    title: "Rocket Flow",
    category: "Simulation + ML Pipeline",
    period: "2024\u20132025",
    description:
      "A computational pipeline that generates rocket fin geometries in OpenSCAD, runs them through 1,000+ OpenFOAM simulations, and trains an AutoGluon ensemble to predict drag from geometric parameters. SHAP analysis reveals which fin dimensions matter most. The ensemble reached R\u00b2 = 0.989, outperforming polynomial regression and standalone random forests.",
    stats: [
      { value: "R\u00b2 0.989", label: "AutoGluon ensemble accuracy" },
      { value: "MAE 0.036", label: "Best model mean absolute error" },
      { value: "1,000+", label: "Simulations in the training sweep" },
      { value: "1st Place", label: "Qorvo Young Innovators Award" },
    ],
    tags: ["Python", "AutoGluon", "SHAP", "OpenFOAM", "OpenSCAD"],
    links: [
      { label: "View Publication \u2192", href: "https://doi.org/10.5281/zenodo.17410956" },
    ],
    image: "/images/rocket-flow-model.png",
  },
];

export type Award = { title: string; detail: string };

export const AWARDS: Award[] = [
  { title: "Top 4% \u00b7 DECA Stock Market Game", detail: "80% portfolio growth, top 4% of 5,000+ teams internationally" },
  { title: "2nd Place \u00b7 Texas State DECA", detail: "Principles of Finance" },
  { title: "1st Place \u00b7 Qorvo Young Innovators Award", detail: "Dallas Regional Science Fair, selected from 11,000+ students" },
  { title: "DECA ICDC Thrive Academy Nominee", detail: "1 of 500 students nominated internationally" },
  { title: "National Merit Commended Scholar", detail: "" },
];

export type SkillGroup = { label: string; skills: string[] };

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "Quantitative Finance",
    skills: ["Valuation", "DCF Modeling", "Comparable Company Analysis",
             "Equity Research", "Time-Series Modeling", "Macro Economics",
             "Hidden Markov Models", "Walk-Forward Validation", "FRED API", "SEC EDGAR"],
  },
  {
    label: "Machine Learning & Data",
    skills: ["Python", "Scikit-learn", "AutoGluon", "SHAP", "BERT", "FinBERT",
             "HuggingFace", "PyTorch", "pandas", "NumPy", "hmmlearn", "SQL"],
  },
  {
    label: "Agents & Applied AI",
    skills: ["Anthropic API", "Tool-Use Agents", "RAG", "pgvector",
             "LangChain", "RAGAS", "Playwright", "Liveblocks"],
  },
  {
    label: "Web & Backend",
    skills: ["Next.js", "FastAPI", "TypeScript", "React",
             "Tailwind CSS", "Vercel", "REST APIs", "Redis", "OAuth", "Git"],
  },
  {
    label: "Simulation",
    skills: ["OpenFOAM", "OpenSCAD", "Numerical Methods"],
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
  { label: "Resume", value: "Shravan_Anand_Resume.pdf", href: RESUME_PATH },
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
      "CS + Economics at Duke, Class of 2030. Markets first, code second: research built to be falsifiable rather than persuasive.",
    meta: "Profile",
  },
  {
    href: "/projects",
    index: "02",
    label: "Projects",
    description:
      "Timestamped equity research scored against the S&P 500, a Hidden Markov Model for the macro cycle, and earnings-call sentiment adjusted for the economic climate, each shipped as working code and data.",
    meta: `${PROJECTS.length} projects`,
  },
  {
    href: "/awards",
    index: "03",
    label: "Awards",
    description:
      "State and international recognition in DECA finance competition and independent research.",
    meta: `${AWARDS.length} awards`,
  },
  {
    href: "/skills",
    index: "04",
    label: "Skills",
    description:
      "A working toolkit across valuation, time-series modeling, and machine learning, built through research rather than coursework alone.",
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
      "Recruiting for investment and consulting clubs at Duke, and open to conversations about equity research and summer 2027 internships.",
    meta: `${CONTACT_LINKS.length} channels`,
  },
];
