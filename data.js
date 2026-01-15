// data.js - Practice Frameworks and Initial Data
const practiceFrameworks = {
  'modern-apps': {
    name: 'Modern Applications',
    stages: [
      { id: 'plan', name: 'Plan' },
      { id: 'design', name: 'Design' },
      { id: 'develop', name: 'Develop' },
      { id: 'build-ci', name: 'Build & CI' },
      { id: 'test-qa', name: 'Test & QA' },
      { id: 'deploy', name: 'Deploy' },
      { id: 'monitor', name: 'Monitor' }
    ]
  },
  'data-analytics': {
    name: 'Data Analytics & Data Platform',
    stages: [
      { id: 'planning', name: 'Data Strategy & Planning' },
      { id: 'architecture', name: 'Platform Architecture' },
      { id: 'ingestion', name: 'Data Ingestion & Integration' },
      { id: 'transformation', name: 'Transformation & Processing' },
      { id: 'ml-ops', name: 'ML Ops & Model Management' },
      { id: 'governance', name: 'Governance & Quality' },
      { id: 'delivery', name: 'Analytics Delivery' }
    ]
  },
  'modern-work': {
    name: 'Modern Work',
    stages: [
      { id: 'planning', name: 'Workplace Strategy' },
      { id: 'design', name: 'Experience Design' },
      { id: 'collaboration', name: 'Collaboration Tools' },
      { id: 'automation', name: 'Workflow Automation' },
      { id: 'adoption', name: 'Change & Adoption' },
      { id: 'support', name: 'Support & Optimization' }
    ]
  },
  'hybrid-infra': {
    name: 'Hybrid Infrastructure',
    stages: [
      { id: 'planning', name: 'Infrastructure Planning' },
      { id: 'architecture', name: 'Architecture Design' },
      { id: 'provisioning', name: 'Provisioning & IaC' },
      { id: 'configuration', name: 'Configuration Management' },
      { id: 'monitoring', name: 'Monitoring & Observability' },
      { id: 'optimization', name: 'Cost & Performance Optimization' },
      { id: 'security', name: 'Security & Compliance' }
    ]
  },
  'security': {
    name: 'Security Advisory',
    stages: [
      { id: 'planning', name: 'Security Strategy' },
      { id: 'architecture', name: 'Security Architecture' },
      { id: 'threat-detection', name: 'Threat Detection' },
      { id: 'incident-response', name: 'Incident Response' },
      { id: 'compliance', name: 'Compliance & Audit' },
      { id: 'risk-assessment', name: 'Risk Assessment' }
    ]
  },
  'managed-services': {
    name: 'Managed Services',
    stages: [
      { id: 'planning', name: 'Service Design & Planning' },
      { id: 'onboarding', name: 'Client Onboarding' },
      { id: 'operations', name: 'Operations Management' },
      { id: 'incident', name: 'Incident Management' },
      { id: 'optimization', name: 'Continuous Optimization' },
      { id: 'reporting', name: 'Reporting & Analytics' }
    ]
  },
  'business-strategy': {
    name: 'Business Strategy',
    stages: [
      { id: 'research', name: 'Market Research & Analysis' },
      { id: 'planning', name: 'Strategic Planning' },
      { id: 'design', name: 'Business Model Design' },
      { id: 'roadmap', name: 'Roadmap Development' },
      { id: 'execution', name: 'Execution Support' },
      { id: 'measurement', name: 'Performance Measurement' }
    ]
  },
  'project-strategy': {
    name: 'Project Strategy',
    stages: [
      { id: 'planning', name: 'Project Planning' },
      { id: 'design', name: 'Methodology Design' },
      { id: 'resource', name: 'Resource Management' },
      { id: 'execution', name: 'Execution & Delivery' },
      { id: 'risk', name: 'Risk Management' },
      { id: 'reporting', name: 'Reporting & Governance' }
    ]
  }
};

const practices = [
  { id: 'modern-apps', name: 'Modern Applications', active: true },
  { id: 'data-analytics', name: 'Data Analytics & Data Platform', active: true },
  { id: 'modern-work', name: 'Modern Work', active: true },
  { id: 'hybrid-infra', name: 'Hybrid Infrastructure', active: true },
  { id: 'security', name: 'Security Advisory', active: true },
  { id: 'managed-services', name: 'Managed Services', active: true },
  { id: 'business-strategy', name: 'Business Strategy', active: true },
  { id: 'project-strategy', name: 'Project Strategy', active: true }
];

const maturityLevels = [
  { level: 1, name: 'Foundational', description: 'Traditional/Manual' },
  { level: 2, name: 'Emerging', description: 'AI-Augmented' },
  { level: 3, name: 'Strategic', description: 'AI-Integrated' },
  { level: 4, name: 'Elite', description: 'Agentic/Autonomous' }
];

const initializePracticeData = (practiceId) => {
  const framework = practiceFrameworks[practiceId];
  const capability = {};
  const targetCapability = {};
  framework.stages.forEach(stage => {
    capability[stage.id] = 2;
    targetCapability[stage.id] = 3;
  });
  return {
    capability,
    targetCapability,
    teamComposition: { l1: 10, l2: 15, l3: 8, l4: 2 },
    teamSize: 35,
    dpi: 1,
    targetDpi: 3,
    baselineDate: '2026-01-14',
    targetDate: '2026-09-30',
    targetQuarter: 'Q2 FY2026'
  };
};

const initialPracticesData = {
  'modern-apps': {
    capability: { plan: 2, design: 2, develop: 3, 'build-ci': 2, 'test-qa': 2, deploy: 2, monitor: 2 },
    targetCapability: { plan: 3, design: 3, develop: 4, 'build-ci': 3, 'test-qa': 3, deploy: 3, monitor: 3 },
    teamComposition: { l1: 15, l2: 20, l3: 12, l4: 3 },
    teamSize: 50,
    dpi: 2,
    targetDpi: 3,
    baselineDate: '2026-01-14',
    targetDate: '2026-12-31',
    targetQuarter: 'Q3 FY2026'
  },
  'data-analytics': initializePracticeData('data-analytics'),
  'modern-work': initializePracticeData('modern-work'),
  'hybrid-infra': initializePracticeData('hybrid-infra'),
  'security': initializePracticeData('security'),
  'managed-services': initializePracticeData('managed-services'),
  'business-strategy': initializePracticeData('business-strategy'),
  'project-strategy': initializePracticeData('project-strategy')
};

const initialLeadershipGoals = [
  { id: 1, date: '2026-03-31', description: '50% of practices at L2+ capability', targetPracticesAtLevel: { level: 2, percentage: 50 } },
  { id: 2, date: '2026-06-30', description: '3 practices reach Strategic (L3)', targetPracticesAtLevel: { level: 3, count: 3 } },
  { id: 3, date: '2026-09-30', description: 'Overall AFD >40%', targetMetric: { type: 'afd', value: 40 } },
  { id: 4, date: '2026-12-31', description: 'All practices at L2+, 50% at L3+', targetPracticesAtLevel: { level: 3, percentage: 50 } }
];

const competitors = {
  'competitor-a': {
    name: 'Industry Leader A',
    overallCapability: 3.2,
    overallAFD: 65,
    overallDPI: 3.5,
    practiceScores: {
      'modern-apps': { capability: 3.5, afd: 70, dpi: 4 },
      'data-analytics': { capability: 3.8, afd: 75, dpi: 4 },
      'modern-work': { capability: 2.8, afd: 55, dpi: 3 },
      'hybrid-infra': { capability: 3.2, afd: 60, dpi: 3 },
      'security': { capability: 3.0, afd: 58, dpi: 3 },
      'managed-services': { capability: 2.9, afd: 52, dpi: 2 },
      'business-strategy': { capability: 2.7, afd: 48, dpi: 2 },
      'project-strategy': { capability: 2.6, afd: 45, dpi: 2 }
    }
  },
  'competitor-b': {
    name: 'Industry Leader B',
    overallCapability: 2.8,
    overallAFD: 55,
    overallDPI: 2.5,
    practiceScores: {
      'modern-apps': { capability: 3.0, afd: 60, dpi: 3 },
      'data-analytics': { capability: 3.2, afd: 65, dpi: 3 },
      'modern-work': { capability: 2.5, afd: 45, dpi: 2 },
      'hybrid-infra': { capability: 2.8, afd: 50, dpi: 2 },
      'security': { capability: 2.9, afd: 55, dpi: 3 },
      'managed-services': { capability: 2.6, afd: 48, dpi: 2 },
      'business-strategy': { capability: 2.4, afd: 42, dpi: 2 },
      'project-strategy': { capability: 2.5, afd: 44, dpi: 2 }
    }
  }
};
