/**
 * All content is transcribed from Tejaswini Verma's resume
 * (public/resume/Tejaswini-Verma-Resume.pdf). Do not add facts that are not on it.
 * Per her preference, only email and location are published — phone numbers are omitted.
 */

export const person = {
  name: 'Tejaswini Verma',
  email: 'tejeswinivrm@gmail.com',
  location: 'Dubai, UAE / India',
  roles: ['MBA in Finance', 'Electrical Engineer', '3D Web Graphics'],
  objective:
    'Detail-oriented and analytical finance professional with a strong technical foundation in Electrical Engineering and ongoing MBA studies in Finance, combining expertise in financial modeling, risk management, 3D Web Graphics, and Python-based data analytics to drive strategic investment decisions.',
  headline: 'Finance, engineering and interactive 3D — in one analytical toolkit.',
  resume: '/resume/Tejaswini-Verma-Resume.pdf',
}

export type Project = {
  id: string
  title: string
  context: string
  date: string
  visual: 'risk' | 'nexus' | 'flight'
  summary: string
  body: string[]
  highlights?: { title: string; text: string }[]
  methods: string[]
}

export const projects: Project[] = [
  {
    id: 'model-risk',
    title: 'Blue-Chip Financial Model Risk Assessment',
    context: 'Stock Pitch Presentation & Investment Memo · Independent Project',
    date: 'June 2026',
    visual: 'risk',
    summary: 'Five-plus years of Tesla, Apple and Emaar data, valued and stress-tested with a Python model-validation tool.',
    body: [
      'Extracted 5+ years of historical financial data for Tesla, Apple, and Emaar using Python and SQL to analyze performance and risk metrics.',
      'Compiled a comprehensive investment memo and stock pitch presentation incorporating fundamental pricing and valuation methodologies such as Discounted Cash Flow (DCF), Comparable Company Analysis (Comps), and Precedent Transactions.',
      'Developed a Python-based model validation tool to backtest public valuation projections against actual market outcomes, applying Model Risk Management techniques including VaR, Stress Testing, and Scenario Analysis to identify high-volatility risks in tech and energy sectors and deliver insights relevant to portfolio risk management and investment decision-making for HNW clients.',
    ],
    methods: ['Python', 'SQL', 'DCF', 'Comps', 'Precedent Transactions', 'VaR', 'Stress Testing', 'Scenario Analysis', 'Model Risk Management'],
  },
  {
    id: 'ai-energy',
    title: 'AI-Energy Nexus',
    context: 'Industry Research Paper & Capstone Project · MBA Finance, Middlesex University Dubai',
    date: 'June 2026 – Present',
    visual: 'nexus',
    summary: 'How Generative AI and hyperscale data centres reshape renewable-energy demand and green-asset volatility.',
    body: [
      'Authored a comprehensive industry research paper researching the financial impact of Generative AI and hyperscale data center growth on renewable energy demand and green asset volatility.',
      'Analyzing ESG disclosures, financial statements, and market data to assess investment risks and opportunities in the AI-energy ecosystem while leveraging an Electrical Engineering background to evaluate AI-driven capital expenditure and energy costs, culminating in a structured research paper and financial model to guide sustainable investment strategies.',
    ],
    methods: ['ESG Analysis', 'Financial Statements', 'Market Data', 'Financial Modeling', 'Capex & Energy-Cost Evaluation'],
  },
  {
    id: 'web3d',
    title: '3D Interactive Web Simulations & Real-Time Telemetry Suite',
    context: 'Independent Web3D Projects',
    date: '2026',
    visual: 'flight',
    summary: 'A suite of browser-based 3D simulations of urban air mobility, airborne mega-structures and off-planet architecture.',
    body: [
      'Architected and deployed a suite of interactive, web-based 3D simulations using Three.js, WebGL, and JavaScript (CodePen/Netlify) to model futuristic urban air mobility, airborne mega-structures, and off-planet real estate architecture.',
    ],
    highlights: [
      {
        title: 'Fly-Air Ambulance (6-DOF UAM Dynamics Engine)',
        text: 'Engineered a 3D flight simulation featuring real-time telemetry HUDs tracking velocity vectors (55.7 km/h), pitch/roll attitude, crosswind dynamics, battery state of charge (SoC: 94.83%), and minimum building clearance.',
      },
      {
        title: 'Fly-Aero Sky Hotel & Aero-Villa Series',
        text: 'Developed automated 3D cruise mode simulations over cityscape skylines with dynamic camera rigs, displaying guest occupancy, cruise velocity (145 km/h), and anti-gravity stator dynamics.',
      },
      {
        title: 'Villa on Moon & Lunar Luxury Estates',
        text: 'Simulated 0.166g lunar orbital environments with floating quantum villas, forcefield shields, 12.5 Tesla levitation physics, and multi-view interactive camera controls.',
      },
    ],
    methods: ['Three.js', 'WebGL', 'JavaScript', 'CodePen', 'Netlify', '6-DOF Dynamics', 'Telemetry HUDs'],
  },
]

export const skills: { group: string; items: string[] }[] = [
  { group: 'Programming & Analytics', items: ['Python (Pandas, NumPy, Matplotlib, Scikit-Learn)', 'SQL (PostgreSQL, MySQL)'] },
  { group: '3D Graphics & Simulation', items: ['Three.js', 'WebGL', '6-DOF Dynamics Engine', 'Canvas & Physics Animation', 'Interactive Telemetry HUDs'] },
  {
    group: 'Financial Modeling',
    items: ['Discounted Cash Flow (DCF)', 'Comparable Company Analysis (Comps)', 'Precedent Transactions', 'Valuation Models', 'Cash Flow Forecasting', 'Scenario Analysis', 'Value at Risk (VaR)', 'Sensitivity Analysis'],
  },
  { group: 'Risk & Research', items: ['Model Risk Management (MRM)', 'Model Validation', 'Stress Testing', 'ESG Analysis'] },
  { group: 'Tools & Software', items: ['Financial APIs', 'Data Visualization', 'Microsoft Excel', 'Microsoft PowerPoint', 'Computer Aided Designing', 'CodePen', 'Netlify'] },
  {
    group: 'Core Competencies',
    items: ['Account Management', 'Client Relationship Management', 'Project Management', 'Sales Engagement', 'Pipeline Management', 'Leadership & Cross-functional Collaboration'],
  },
]

export type Entry = { title: string; org: string; period: string; text?: string }

export const experience: Entry[] = [
  {
    title: 'Student Research Assistant',
    org: 'Middlesex University Dubai',
    period: 'October 2026 – Present',
    text: 'Appointed to support the Principal Researcher on university research projects, assisting with research, data collection and analysis.',
  },
  {
    title: 'Student Voice Leader',
    org: 'Middlesex University Dubai',
    period: 'Academic Year 2026–27',
    text: 'Represent fellow MBA students in Programme Voice Group (PVG) meetings, gathering and submitting cohort feedback to the Quality Office to improve the student experience.',
  },
  { title: 'Senior Business Development Manager', org: 'Panorama India Consulting Group - Digital Quest', period: 'December 2017 – October 2024' },
  { title: 'College General Secretary', org: 'Dean Student Welfare', period: '' },
  { title: 'Industrial Training', org: 'UPPCL Corporation (400 kV substations, Unnao)', period: 'July 2016 – August 2016' },
]

export const engagements: Entry[] = [
  { title: 'Industrial Visit Participant – Century Financial', org: 'Century Financial, Dubai', period: 'July 2026' },
  { title: 'Industrial Visit Participant – Tesla Facility & EV Technology Experience', org: 'Tesla / Middlesex University Dubai', period: 'July 2026' },
  { title: 'Participant – MDX Summer Skills Series: The Hidden Rules of the Workplace', org: 'Aleph Hospitality / Middlesex University Dubai', period: 'July 2026' },
  { title: 'Participant – MDX Summer Skills Series: The Retail Career Playbook (Hiring Insights from Spinneys)', org: 'Spinneys / Middlesex University Dubai', period: 'July 2026' },
  { title: 'Participant – MDX Summer Skills Series: From Ambition to Achievement', org: 'Media 247 / Middlesex University Dubai', period: 'June 2026' },
]

export const education: (Entry & { score?: string })[] = [
  { title: 'Master of Business Administration (MBA) in Finance', org: 'Middlesex University, Dubai', period: 'June 2026 – Present' },
  {
    title: 'Bachelor of Technology (B.Tech) in Electrical Engineering',
    org: 'Babu Banarasi Das National Institute of Technology and Management (AKTU)',
    period: '2013 – 2017',
    score: 'Marks: 72.26%',
  },
  { title: '12th Intermediate (CBSE)', org: 'Kendriya Vidyalaya, Unnao', period: '2013', score: 'Marks: 77.8% (Physics-Chemistry-Maths)' },
  { title: '10th (CBSE)', org: 'Stella Maris Convent School, Sultanpur', period: '2011', score: 'Marks: 89.3%' },
]

export const recognition: Entry[] = [
  { title: 'Global Business Immersion Programme', org: 'Middlesex University Dubai (Sri Lanka)', period: 'July 2026' },
  { title: 'Dubai Holding Virtual Engagement Career Readiness Series', org: 'Delivered in collaboration with Dubai Holding and Middlesex University Dubai', period: 'May 2026' },
  { title: 'Certificate in Academic Excellence', org: 'Awarded by Mr. Kapil Sibal', period: '' },
  { title: 'Campus Placement', org: 'HCL', period: '' },
  { title: 'Database Development Workshop', org: 'RANKETHON (IIT Kharagpur)', period: 'December 2017' },
  { title: 'AutoBotz AVR (Robotics & Computer Applications)', org: 'Institute of USA', period: '' },
]

export const additional = {
  languages: 'English and Hindi (Fluent; English Debater & Anchor)',
  interests: ['Sportsperson', 'Content Writing', 'Photography & Editing', 'Cooking', 'Yoga & Meditation', 'Fitness'],
}
