const { useState } = React;
const { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } = Recharts;
const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } = Recharts;

const AIMaturityAssessment = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPractice, setSelectedPractice] = useState('modern-apps');
  const [viewMode, setViewMode] = useState('all'); // 'all', 'active', 'target'
  
  // Define all practice frameworks with stages
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

  // Initialize assessment data for all practices
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
      baselineDate: '2026-01-14', // Current date
      targetDate: '2026-09-30', // End of Q2 FY2026
      targetQuarter: 'Q2 FY2026'
    };
  };

  // State for all practices
  const [practicesData, setPracticesData] = useState({
    'modern-apps': {
      capability: {
        plan: 2, design: 2, develop: 3, 'build-ci': 2, 'test-qa': 2, deploy: 2, monitor: 2
      },
      targetCapability: {
        plan: 3, design: 3, develop: 4, 'build-ci': 3, 'test-qa': 3, deploy: 3, monitor: 3
      },
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
  });

  const [streamMetric, setStreamMetric] = useState('capability'); // 'capability', 'afd', 'dpi'
  
  // Comparison matrix state
  const [sortBy, setSortBy] = useState('name'); // 'name', 'capability', 'afd', 'dpi', 'gap', 'team'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'
  const [filterLevel, setFilterLevel] = useState('all'); // 'all', '1', '2', '3', '4'
  
  // Competitor overlay state
  const [showCompetitor, setShowCompetitor] = useState(false);
  const [selectedCompetitor, setSelectedCompetitor] = useState('competitor-a');
  
  // Export state
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState(null); // 'pdf', 'pptx'
  
  // Snapshot state for historical tracking
  const [snapshots, setSnapshots] = useState([
    {
      id: 'baseline-2026-01',
      name: 'Q4 FY2025 Baseline',
      date: '2026-01-14',
      data: JSON.parse(JSON.stringify(practicesData)), // Deep clone of initial state
      overallMetrics: {
        avgCapability: 2.3,
        avgAFD: 48.5,
        avgDPI: 1.8
      }
    }
  ]);
  const [selectedSnapshot, setSelectedSnapshot] = useState(null);
  const [showSnapshotComparison, setShowSnapshotComparison] = useState(false);
  
  // Snapshot functions
  const saveSnapshot = () => {
    const snapshotName = prompt('Enter a name for this snapshot:', `Snapshot ${new Date().toLocaleDateString()}`);
    if (!snapshotName) return;
    
    const newSnapshot = {
      id: `snapshot-${Date.now()}`,
      name: snapshotName,
      date: new Date().toISOString().split('T')[0],
      data: JSON.parse(JSON.stringify(practicesData)),
      overallMetrics: {
        avgCapability: parseFloat(overallMetrics.avgCapability),
        avgAFD: parseFloat(overallMetrics.avgAFD),
        avgDPI: parseFloat(overallMetrics.avgDPI)
      }
    };
    
    setSnapshots([...snapshots, newSnapshot]);
    alert(`Snapshot "${snapshotName}" saved successfully!`);
  };
  
  const loadSnapshot = (snapshotId) => {
    const snapshot = snapshots.find(s => s.id === snapshotId);
    if (!snapshot) return;
    
    if (confirm(`Load snapshot "${snapshot.name}"? This will replace your current data.`)) {
      setPracticesData(JSON.parse(JSON.stringify(snapshot.data)));
      alert('Snapshot loaded successfully!');
    }
  };
  
  const deleteSnapshot = (snapshotId) => {
    const snapshot = snapshots.find(s => s.id === snapshotId);
    if (!snapshot) return;
    
    if (confirm(`Delete snapshot "${snapshot.name}"? This cannot be undone.`)) {
      setSnapshots(snapshots.filter(s => s.id !== snapshotId));
      if (selectedSnapshot === snapshotId) {
        setSelectedSnapshot(null);
        setShowSnapshotComparison(false);
      }
      alert('Snapshot deleted successfully!');
    }
  };
  
  const compareWithSnapshot = (snapshotId) => {
    setSelectedSnapshot(snapshotId);
    setShowSnapshotComparison(true);
  };
  
  // Get snapshot comparison data
  const getSnapshotComparison = () => {
    if (!selectedSnapshot) return null;
    
    const snapshot = snapshots.find(s => s.id === selectedSnapshot);
    if (!snapshot) return null;
    
    const comparison = practices.map(practice => {
      const currentMetrics = getPracticeMetrics(practice.id);
      const snapshotPracticeData = snapshot.data[practice.id];
      
      const snapshotCapability = calculateAvgCapability(snapshotPracticeData.capability);
      const snapshotAFD = calculateAFD(snapshotPracticeData.teamComposition);
      const snapshotDPI = snapshotPracticeData.dpi;
      
      return {
        id: practice.id,
        name: practice.name,
        current: currentMetrics,
        snapshot: {
          avgCapability: snapshotCapability,
          afd: snapshotAFD,
          dpi: snapshotDPI
        },
        delta: {
          capability: currentMetrics.avgCapability - snapshotCapability,
          afd: currentMetrics.afd - snapshotAFD,
          dpi: currentMetrics.dpi - snapshotDPI
        }
      };
    });
    
    return {
      snapshot,
      comparison
    };
  };
  
  // Export functions
  const exportToPDF = async () => {
    setIsExporting(true);
    setExportFormat('pdf');
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('PDF Export: In a production environment, this would generate a PDF with:\n\n' +
          '• Executive Summary Dashboard\n' +
          '• Practice Comparison Matrix\n' +
          '• Individual Practice Deep-Dives\n' +
          '• Leadership Goals Timeline\n' +
          '• Competitor Benchmarking (if enabled)\n\n' +
          'Implementation requires a library like jsPDF or html2pdf.');
    
    setIsExporting(false);
    setExportFormat(null);
  };
  
  const exportToPPTX = async () => {
    setIsExporting(true);
    setExportFormat('pptx');
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('PowerPoint Export: In a production environment, this would generate slides with:\n\n' +
          'Slide 1: Executive Summary\n' +
          'Slide 2: Treemap Heatmap\n' +
          'Slide 3: Maturity Evolution Over Time\n' +
          'Slide 4: Practice Comparison Table\n' +
          'Slide 5: Leadership Goals & Milestones\n' +
          'Slide 6-13: Individual Practice Deep-Dives\n\n' +
          'Implementation requires a library like PptxGenJS.');
    
    setIsExporting(false);
    setExportFormat(null);
  };
  
  // Competitor benchmark data (industry averages or specific competitors)
  const [competitors, setCompetitors] = useState({
    'competitor-a': {
      name: 'Industry Leader A',
      overallCapability: 3.2,
      overallAFD: 65,
      overallDPI: 3.5,
      practiceScores: {
        'modern-apps': { capability: 3.5, afd: 70, dpi: 4 },
        'data-analytics': { capability: 3.8, afd: 75, dpi: 4 },
        'modern-work': { capability: 3.0, afd: 60, dpi: 3 },
        'hybrid-infra': { capability: 3.2, afd: 65, dpi: 3 },
        'security': { capability: 3.4, afd: 68, dpi: 4 },
        'managed-services': { capability: 2.8, afd: 55, dpi: 3 },
        'business-strategy': { capability: 3.0, afd: 62, dpi: 3 },
        'project-strategy': { capability: 2.9, afd: 58, dpi: 3 }
      }
    },
    'competitor-b': {
      name: 'Industry Average',
      overallCapability: 2.5,
      overallAFD: 45,
      overallDPI: 2.2,
      practiceScores: {
        'modern-apps': { capability: 2.6, afd: 48, dpi: 2 },
        'data-analytics': { capability: 2.8, afd: 52, dpi: 3 },
        'modern-work': { capability: 2.3, afd: 40, dpi: 2 },
        'hybrid-infra': { capability: 2.5, afd: 45, dpi: 2 },
        'security': { capability: 2.7, afd: 50, dpi: 2 },
        'managed-services': { capability: 2.2, afd: 38, dpi: 2 },
        'business-strategy': { capability: 2.4, afd: 42, dpi: 2 },
        'project-strategy': { capability: 2.3, afd: 40, dpi: 2 }
      }
    },
    'competitor-c': {
      name: 'Emerging Competitor C',
      overallCapability: 2.8,
      overallAFD: 52,
      overallDPI: 2.5,
      practiceScores: {
        'modern-apps': { capability: 3.0, afd: 55, dpi: 3 },
        'data-analytics': { capability: 3.2, afd: 60, dpi: 3 },
        'modern-work': { capability: 2.5, afd: 45, dpi: 2 },
        'hybrid-infra': { capability: 2.8, afd: 52, dpi: 2 },
        'security': { capability: 2.9, afd: 54, dpi: 3 },
        'managed-services': { capability: 2.6, afd: 48, dpi: 2 },
        'business-strategy': { capability: 2.7, afd: 50, dpi: 2 },
        'project-strategy': { capability: 2.6, afd: 48, dpi: 2 }
      }
    }
  });
  
  // Fiscal year quarter helper (Q1 = Apr-Jun, Q2 = Jul-Sep, Q3 = Oct-Dec, Q4 = Jan-Mar)
  const getFiscalQuarter = (date) => {
    const d = new Date(date);
    const month = d.getMonth(); // 0-11
    const year = d.getFullYear();
    
    // Determine fiscal year (starts in April)
    const fiscalYear = month >= 3 ? year : year - 1; // April (month 3) starts new FY
    
    // Determine quarter
    if (month >= 3 && month <= 5) return { q: 1, fy: fiscalYear }; // Apr-Jun = Q1
    if (month >= 6 && month <= 8) return { q: 2, fy: fiscalYear }; // Jul-Sep = Q2
    if (month >= 9 && month <= 11) return { q: 3, fy: fiscalYear }; // Oct-Dec = Q3
    return { q: 4, fy: month >= 0 && month <= 2 ? fiscalYear : fiscalYear + 1 }; // Jan-Mar = Q4
  };
  
  const formatFiscalQuarter = (date) => {
    const { q, fy } = getFiscalQuarter(date);
    return `Q${q} FY${fy}`;
  };

  // Leadership goals for organizational milestones
  const [leadershipGoals, setLeadershipGoals] = useState([
    { 
      id: 1, 
      date: '2026-03-31', 
      description: '50% of practices at L2+ capability', 
      targetPracticesAtLevel: { level: 2, percentage: 50 } 
    },
    { 
      id: 2, 
      date: '2026-06-30', 
      description: '3 practices reach Strategic (L3)', 
      targetPracticesAtLevel: { level: 3, count: 3 } 
    },
    { 
      id: 3, 
      date: '2026-09-30', 
      description: 'Overall AFD >40%', 
      targetMetric: { type: 'afd', value: 40 } 
    },
    { 
      id: 4, 
      date: '2026-12-31', 
      description: 'All practices at L2+, 50% at L3+', 
      targetPracticesAtLevel: { level: 3, percentage: 50 } 
    }
  ]);

  // Calculate AFD (AI Fluency Density)
  const calculateAFD = (composition) => {
    const total = composition.l1 + composition.l2 + composition.l3 + composition.l4;
    if (total === 0) return 0;
    const strategic = composition.l3 + composition.l4;
    return parseFloat(((strategic / total) * 100).toFixed(1));
  };

  // Get AFD level based on percentage
  const getAFDLevel = (afd) => {
    if (afd < 20) return 1;
    if (afd < 51) return 2;
    if (afd < 86) return 3;
    return 4;
  };

  // Get DPI level
  const getDPILevel = (dpi) => {
    if (dpi === 0) return 1;
    if (dpi === 1) return 2;
    if (dpi === 2) return 3;
    return 4;
  };

  // Calculate average capability maturity
  const calculateAvgCapability = (capability) => {
    const values = Object.values(capability);
    return parseFloat((values.reduce((a, b) => a + b, 0) / values.length).toFixed(1));
  };

  // Get metrics for a specific practice
  const getPracticeMetrics = (practiceId) => {
    const data = practicesData[practiceId];
    const afd = calculateAFD(data.teamComposition);
    const afdLevel = getAFDLevel(afd);
    const dpiLevel = getDPILevel(data.dpi);
    const avgCapability = calculateAvgCapability(data.capability);
    const targetAvgCapability = calculateAvgCapability(data.targetCapability);
    
    return {
      afd,
      afdLevel,
      dpiLevel,
      avgCapability,
      targetAvgCapability,
      dpi: data.dpi,
      targetDpi: data.targetDpi,
      teamSize: data.teamSize
    };
  };

  // Calculate overall consultancy metrics
  const getOverallMetrics = () => {
    let totalCapability = 0;
    let totalAFD = 0;
    let totalDPI = 0;
    let totalTeamSize = 0;
    
    practices.forEach(practice => {
      const metrics = getPracticeMetrics(practice.id);
      totalCapability += metrics.avgCapability;
      totalAFD += metrics.afd;
      totalDPI += metrics.dpi;
      totalTeamSize += metrics.teamSize;
    });
    
    return {
      avgCapability: parseFloat((totalCapability / practices.length).toFixed(1)),
      avgAFD: parseFloat((totalAFD / practices.length).toFixed(1)),
      avgDPI: parseFloat((totalDPI / practices.length).toFixed(1)),
      totalTeamSize
    };
  };

  const overallMetrics = getOverallMetrics();
  const currentPracticeMetrics = getPracticeMetrics(selectedPractice);

  // Get sorted and filtered comparison data
  const getComparisonData = () => {
    let data = treemapData.map(practice => ({
      ...practice,
      gap: practice.targetAvgCapability - practice.avgCapability
    }));

    // Filter by level
    if (filterLevel !== 'all') {
      const level = parseInt(filterLevel);
      data = data.filter(p => Math.round(p.avgCapability) === level);
    }

    // Sort
    data.sort((a, b) => {
      let aVal, bVal;
      
      switch(sortBy) {
        case 'name':
          aVal = a.name;
          bVal = b.name;
          break;
        case 'capability':
          aVal = a.avgCapability;
          bVal = b.avgCapability;
          break;
        case 'afd':
          aVal = a.afd;
          bVal = b.afd;
          break;
        case 'dpi':
          aVal = a.dpi;
          bVal = b.dpi;
          break;
        case 'gap':
          aVal = a.gap;
          bVal = b.gap;
          break;
        case 'team':
          aVal = a.teamSize;
          bVal = b.teamSize;
          break;
        default:
          aVal = a.name;
          bVal = b.name;
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return data;
  };

  const comparisonData = getComparisonData();

  // Prepare radar chart data for selected practice
  const currentFramework = practiceFrameworks[selectedPractice];
  const currentData = practicesData[selectedPractice];
  const radarData = currentFramework.stages.map(stage => ({
    stage: stage.name,
    current: currentData.capability[stage.id],
    target: currentData.targetCapability[stage.id],
    fullMark: 4
  }));

  // Prepare treemap data for all practices
  const treemapData = practices.map(practice => {
    const metrics = getPracticeMetrics(practice.id);
    return {
      id: practice.id,
      name: practice.name,
      ...metrics
    };
  });

  // Prepare streamgraph data over time
  const generateStreamData = () => {
    const months = [];
    const baseDate = new Date('2026-01-14'); // Today
    const endDate = new Date('2027-12-31'); // Through end of 2027
    
    for (let d = new Date(baseDate); d <= endDate; d.setMonth(d.getMonth() + 1)) {
      const monthData = {
        date: d.toISOString().slice(0, 7),
        month: d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        fiscalQuarter: formatFiscalQuarter(d)
      };
      
      practices.forEach(practice => {
        const metrics = getPracticeMetrics(practice.id);
        const practiceData = practicesData[practice.id];
        const targetDate = new Date(practiceData.targetDate);
        const progress = Math.min(1, (d - baseDate) / (targetDate - baseDate));
        
        // Interpolate values based on progress
        if (streamMetric === 'capability') {
          monthData[practice.id] = parseFloat((1 + (metrics.targetAvgCapability - 1) * progress).toFixed(2));
        } else if (streamMetric === 'afd') {
          monthData[practice.id] = parseFloat((20 + (75 - 20) * progress).toFixed(2));
        } else {
          monthData[practice.id] = Math.round(metrics.targetDpi * progress);
        }
      });
      
      months.push(monthData);
    }
    
    return months;
  };

  const streamData = generateStreamData();

  const updateCapability = (practiceId, stage, level) => {
    setPracticesData(prev => ({
      ...prev,
      [practiceId]: {
        ...prev[practiceId],
        capability: { ...prev[practiceId].capability, [stage]: level }
      }
    }));
  };

  const updateTargetCapability = (practiceId, stage, level) => {
    setPracticesData(prev => ({
      ...prev,
      [practiceId]: {
        ...prev[practiceId],
        targetCapability: { ...prev[practiceId].targetCapability, [stage]: level }
      }
    }));
  };

  const updateTeamComposition = (practiceId, level, count) => {
    const newComposition = { ...practicesData[practiceId].teamComposition, [level]: parseInt(count) || 0 };
    const newTeamSize = Object.values(newComposition).reduce((a, b) => a + b, 0);
    
    setPracticesData(prev => ({
      ...prev,
      [practiceId]: {
        ...prev[practiceId],
        teamComposition: newComposition,
        teamSize: newTeamSize
      }
    }));
  };

  const updateDPI = (practiceId, count) => {
    setPracticesData(prev => ({
      ...prev,
      [practiceId]: { ...prev[practiceId], dpi: parseInt(count) || 0 }
    }));
  };

  const updateTargetDPI = (practiceId, count) => {
    setPracticesData(prev => ({
      ...prev,
      [practiceId]: { ...prev[practiceId], targetDpi: parseInt(count) || 0 }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">AI Adoption Maturity Assessment</h1>
              <p className="text-cyan-400">2026 Consultancy Framework - Capability • Consistency • Provenance</p>
            </div>
            
            {/* Export Buttons */}
            <div className="flex gap-3">
              <button
                onClick={saveSnapshot}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium text-white shadow-lg transition-all"
                title="Save current state as snapshot"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Save Snapshot
              </button>
              
              <button
                onClick={exportToPDF}
                disabled={isExporting}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isExporting && exportFormat === 'pdf'
                    ? 'bg-slate-700 text-slate-400 cursor-wait'
                    : 'bg-red-600 hover:bg-red-700 text-white shadow-lg'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                {isExporting && exportFormat === 'pdf' ? 'Exporting...' : 'Export PDF'}
              </button>
              
              <button
                onClick={exportToPPTX}
                disabled={isExporting}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isExporting && exportFormat === 'pptx'
                    ? 'bg-slate-700 text-slate-400 cursor-wait'
                    : 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {isExporting && exportFormat === 'pptx' ? 'Exporting...' : 'Export PPT'}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-900 rounded-lg shadow-xl mb-6 p-1 flex gap-2 border border-slate-700">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
              activeTab === 'overview' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            📊 Overall Dashboard
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
              activeTab === 'compare' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            📈 Compare Practices
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
              activeTab === 'practice' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            🔧 Practice Deep-Dive
          </button>
          <button
            onClick={() => setActiveTab('assessment')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
              activeTab === 'assessment' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            ✏️ Assessment Input
          </button>
          <button
            onClick={() => setActiveTab('goals')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
              activeTab === 'goals' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            🎯 Leadership Goals
          </button>
        </div>

        {/* Overview Dashboard */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* View Controls */}
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <button
                  onClick={() => setViewMode('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    viewMode === 'all'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  All Practices
                </button>
                <button
                  onClick={() => setViewMode('target')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    viewMode === 'target'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  Target State
                </button>
                
                {/* Competitor Toggle */}
                <div className="border-l border-slate-600 pl-3 ml-3 flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showCompetitor}
                      onChange={(e) => setShowCompetitor(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-slate-300 text-sm font-medium">Show Competitor</span>
                  </label>
                  
                  {showCompetitor && (
                    <select
                      value={selectedCompetitor}
                      onChange={(e) => setSelectedCompetitor(e.target.value)}
                      className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      {Object.entries(competitors).map(([id, comp]) => (
                        <option key={id} value={id}>{comp.name}</option>
                      ))}
                    </select>
                  )}
                </div>
                
                {/* Snapshot Comparison */}
                {snapshots.length > 1 && (
                  <div className="border-l border-slate-600 pl-3 ml-3 flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showSnapshotComparison}
                        onChange={(e) => {
                          setShowSnapshotComparison(e.target.checked);
                          if (e.target.checked && !selectedSnapshot) {
                            setSelectedSnapshot(snapshots[0].id);
                          }
                        }}
                        className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-slate-300 text-sm font-medium">vs Snapshot</span>
                    </label>
                    
                    {showSnapshotComparison && (
                      <select
                        value={selectedSnapshot || ''}
                        onChange={(e) => setSelectedSnapshot(e.target.value)}
                        className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-green-500"
                      >
                        {snapshots.map(snapshot => (
                          <option key={snapshot.id} value={snapshot.id}>
                            {snapshot.name} ({snapshot.date})
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                )}
              </div>
              
              {/* Mini KPIs */}
              <div className="flex gap-6 text-sm">
                <div className="text-center">
                  <div className="text-slate-400 text-xs">Overall Maturity</div>
                  <div className="text-2xl font-bold text-cyan-400">{overallMetrics.avgCapability}</div>
                </div>
                <div className="text-center">
                  <div className="text-slate-400 text-xs">AI Fluency Density</div>
                  <div className="text-2xl font-bold text-blue-400">{overallMetrics.avgAFD}%</div>
                </div>
                <div className="text-center">
                  <div className="text-slate-400 text-xs">Delivery Provenance</div>
                  <div className="text-2xl font-bold text-purple-400">{overallMetrics.avgDPI}</div>
                </div>
              </div>
            </div>

            {/* Treemap Heatmap */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">AI Maturity Treemap</h2>
                <div className="flex gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-red-500/40"></div>
                    <span className="text-slate-300">L1: Foundational</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-yellow-500/40"></div>
                    <span className="text-slate-300">L2: Emerging</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-blue-500/40"></div>
                    <span className="text-slate-300">L3: Strategic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-cyan-400/40"></div>
                    <span className="text-slate-300">L4: Elite</span>
                  </div>
                </div>
              </div>

              {/* Treemap Grid */}
              <div className="grid grid-cols-12 gap-2" style={{ height: '500px' }}>
                {treemapData.map((practice, idx) => {
                  const capLevel = Math.round(viewMode === 'target' ? practice.targetAvgCapability : practice.avgCapability);
                  const gap = practice.targetAvgCapability - practice.avgCapability;
                  const sizeClass = practice.teamSize > 40 ? 'col-span-4 row-span-2' : 
                                   practice.teamSize > 25 ? 'col-span-3 row-span-2' : 
                                   'col-span-3 row-span-1';
                  
                  // Competitor comparison
                  const competitorData = showCompetitor ? competitors[selectedCompetitor].practiceScores[practice.id] : null;
                  const vsCompetitor = competitorData ? practice.avgCapability - competitorData.capability : 0;
                  
                  const getColor = (level) => {
                    if (level === 1) return 'bg-red-500/30 border-red-500 hover:bg-red-500/40';
                    if (level === 2) return 'bg-yellow-500/30 border-yellow-500 hover:bg-yellow-500/40';
                    if (level === 3) return 'bg-blue-500/40 border-blue-500 hover:bg-blue-500/50';
                    return 'bg-cyan-400/40 border-cyan-400 hover:bg-cyan-400/50';
                  };

                  const getGapColor = (gap) => {
                    if (gap > 1.5) return 'text-red-400';
                    if (gap > 0.8) return 'text-yellow-400';
                    if (gap > 0.3) return 'text-blue-400';
                    return 'text-green-400';
                  };

                  return (
                    <div
                      key={practice.id}
                      className={`${sizeClass} rounded-lg border-2 p-4 cursor-pointer transition-all duration-300 transform hover:scale-105 relative ${getColor(capLevel)}`}
                      onClick={() => setSelectedPractice(practice.id)}
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      {/* Gap Badge */}
                      {viewMode !== 'target' && gap > 0.1 && !showCompetitor && (
                        <div className="absolute top-2 right-2 bg-slate-900/80 rounded-full px-2 py-1 border border-slate-600">
                          <div className="flex items-center gap-1">
                            <span className={`text-xs font-bold ${getGapColor(gap)}`}>
                              -{gap.toFixed(1)}
                            </span>
                            <span className="text-xs text-slate-400">gap</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Competitor Comparison Badge */}
                      {showCompetitor && competitorData && (
                        <div className="absolute top-2 right-2 bg-slate-900/80 rounded-full px-2 py-1 border border-slate-600">
                          <div className="flex items-center gap-1">
                            <span className={`text-xs font-bold ${
                              vsCompetitor > 0.5 ? 'text-green-400' : 
                              vsCompetitor < -0.5 ? 'text-red-400' : 'text-yellow-400'
                            }`}>
                              {vsCompetitor > 0 ? '+' : ''}{vsCompetitor.toFixed(1)}
                            </span>
                            <span className="text-xs text-slate-400">vs</span>
                          </div>
                        </div>
                      )}

                      <div className="h-full flex flex-col justify-between">
                        <div>
                          <div className="font-bold text-white text-sm mb-1">{practice.name}</div>
                          <div className="text-xs text-slate-200">Team: {practice.teamSize}</div>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-baseline gap-2 mb-1">
                            <div className="text-2xl font-bold text-white">
                              {viewMode === 'target' ? practice.targetAvgCapability.toFixed(1) : practice.avgCapability.toFixed(1)}
                            </div>
                            {viewMode !== 'target' && gap > 0.1 && !showCompetitor && (
                              <div className="text-sm text-slate-300">
                                → {practice.targetAvgCapability.toFixed(1)}
                              </div>
                            )}
                            {showCompetitor && competitorData && (
                              <div className="text-sm text-slate-300">
                                vs {competitorData.capability.toFixed(1)}
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-slate-200 mb-2">
                            AFD: {practice.afd.toFixed(0)}% | DPI: {viewMode === 'target' ? practice.targetDpi : practice.dpi}
                          </div>
                          
                          {/* Progress Bar or Comparison Bar */}
                          {!showCompetitor && viewMode !== 'target' && (
                            <div className="w-full bg-slate-700/50 rounded-full h-1.5 mt-2">
                              <div 
                                className={`h-1.5 rounded-full transition-all ${
                                  gap > 1.5 ? 'bg-red-400' : 
                                  gap > 0.8 ? 'bg-yellow-400' : 
                                  gap > 0.3 ? 'bg-blue-400' : 'bg-green-400'
                                }`}
                                style={{ width: `${Math.min(100, (practice.avgCapability / practice.targetAvgCapability) * 100)}%` }}
                              ></div>
                            </div>
                          )}
                          
                          {showCompetitor && competitorData && (
                            <div className="flex gap-1 mt-2">
                              <div className="flex-1 bg-blue-500 rounded h-1.5" style={{ width: `${(practice.avgCapability / 4) * 100}%` }} title="Us"></div>
                              <div className="flex-1 bg-orange-500 rounded h-1.5" style={{ width: `${(competitorData.capability / 4) * 100}%` }} title="Competitor"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Streamgraph */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Maturity Evolution Over Time</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setStreamMetric('capability')}
                    className={`px-3 py-1 rounded text-sm transition-all ${
                      streamMetric === 'capability'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    Capability
                  </button>
                  <button
                    onClick={() => setStreamMetric('afd')}
                    className={`px-3 py-1 rounded text-sm transition-all ${
                      streamMetric === 'afd'
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    AFD %
                  </button>
                  <button
                    onClick={() => setStreamMetric('dpi')}
                    className={`px-3 py-1 rounded text-sm transition-all ${
                      streamMetric === 'dpi'
                        ? 'bg-purple-500 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    Delivery Provenance
                  </button>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={streamData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                    labelStyle={{ color: '#e2e8f0' }}
                    formatter={(value) => {
                      if (streamMetric === 'capability') {
                        return value.toFixed(2);
                      } else if (streamMetric === 'afd') {
                        return value.toFixed(2) + '%';
                      } else {
                        return Math.round(value);
                      }
                    }}
                  />
                  <Legend />
                  {practices.map((practice, idx) => {
                    const colors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#6366f1'];
                    return (
                      <Bar 
                        key={practice.id} 
                        dataKey={practice.id} 
                        stackId="a" 
                        fill={colors[idx % colors.length]}
                        name={practice.name}
                      />
                    );
                  })}
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Timeline & Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Snapshots Management */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-xl p-6 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4">📸 Saved Snapshots</h3>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {snapshots.map(snapshot => (
                    <div key={snapshot.id} className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="font-semibold text-white text-sm">{snapshot.name}</div>
                          <div className="text-xs text-slate-400">{new Date(snapshot.date).toLocaleDateString()}</div>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => compareWithSnapshot(snapshot.id)}
                            className="p-1 text-green-400 hover:text-green-300 hover:bg-green-900/20 rounded transition-all"
                            title="Compare with current"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => loadSnapshot(snapshot.id)}
                            className="p-1 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 rounded transition-all"
                            title="Load snapshot"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteSnapshot(snapshot.id)}
                            className="p-1 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-all"
                            title="Delete snapshot"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-slate-400">Cap:</span>
                          <span className="text-cyan-400 ml-1 font-medium">{snapshot.overallMetrics.avgCapability.toFixed(1)}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">AFD:</span>
                          <span className="text-blue-400 ml-1 font-medium">{snapshot.overallMetrics.avgAFD.toFixed(1)}%</span>
                        </div>
                        <div>
                          <span className="text-slate-400">DPI:</span>
                          <span className="text-purple-400 ml-1 font-medium">{snapshot.overallMetrics.avgDPI.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={saveSnapshot}
                  className="w-full mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Save New Snapshot
                </button>
              </div>
              
              {/* Timeline Progress */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-xl p-6 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4">Organizational Maturity Journey</h3>
                <div className="text-xs text-slate-400 mb-4">Fiscal Year: Q1 = Apr-Jun, Q2 = Jul-Sep, Q3 = Oct-Dec, Q4 = Jan-Mar</div>
                
                {/* Timeline visualization */}
                <div className="relative mb-8">
                  <div className="absolute top-6 left-0 right-0 h-1 bg-slate-700"></div>
                  
                  {/* Milestone markers */}
                  <div className="relative flex justify-between pt-2">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-slate-600 border-2 border-slate-500 mb-2 z-10"></div>
                      <div className="text-xs text-slate-400 text-center">Baseline</div>
                      <div className="text-xs text-slate-500">{formatFiscalQuarter('2026-01-14')}</div>
                    </div>
                    
                    {leadershipGoals.map((goal, idx) => {
                      const goalDate = new Date(goal.date);
                      const today = new Date();
                      const isAchieved = today >= goalDate;
                      
                      return (
                        <div key={goal.id} className="flex flex-col items-center" style={{ flex: 1 }}>
                          <div className={`w-4 h-4 rounded-full border-2 mb-2 z-10 ${
                            isAchieved 
                              ? 'bg-green-500 border-green-400' 
                              : 'bg-blue-500 border-blue-400'
                          }`}></div>
                          <div className={`text-xs font-semibold text-center ${
                            isAchieved ? 'text-green-400' : 'text-blue-400'
                          }`}>
                            {isAchieved ? '✓' : formatFiscalQuarter(goal.date)}
                          </div>
                          <div className="text-xs text-slate-400 text-center">
                            {goalDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Milestone details */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">Key Milestones</h4>
                  {leadershipGoals.map((goal, idx) => {
                    const goalDate = new Date(goal.date);
                    const today = new Date();
                    const isPast = today >= goalDate;
                    
                    // Calculate if goal is met based on current metrics
                    let isMetNow = false;
                    if (goal.targetPracticesAtLevel) {
                      const practicesAtLevel = treemapData.filter(p => 
                        Math.round(p.avgCapability) >= goal.targetPracticesAtLevel.level
                      ).length;
                      if (goal.targetPracticesAtLevel.count) {
                        isMetNow = practicesAtLevel >= goal.targetPracticesAtLevel.count;
                      } else if (goal.targetPracticesAtLevel.percentage) {
                        const percentage = (practicesAtLevel / practices.length) * 100;
                        isMetNow = percentage >= goal.targetPracticesAtLevel.percentage;
                      }
                    } else if (goal.targetMetric?.type === 'afd') {
                      isMetNow = parseFloat(overallMetrics.avgAFD) >= goal.targetMetric.value;
                    }
                    
                    return (
                      <div 
                        key={goal.id} 
                        className={`p-3 rounded-lg border flex items-start gap-3 ${
                          isMetNow 
                            ? 'bg-green-900/20 border-green-700/30' 
                            : isPast 
                            ? 'bg-red-900/20 border-red-700/30' 
                            : 'bg-slate-800/50 border-slate-700'
                        }`}
                      >
                        <div className={`text-lg ${
                          isMetNow ? 'text-green-400' : isPast ? 'text-red-400' : 'text-blue-400'
                        }`}>
                          {isMetNow ? '✅' : isPast ? '⚠️' : '🎯'}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-white mb-1">
                            {formatFiscalQuarter(goal.date)} - {goalDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                          <div className="text-xs text-slate-300">{goal.description}</div>
                        </div>
                        <div className={`text-xs font-medium ${
                          isMetNow ? 'text-green-400' : isPast ? 'text-red-400' : 'text-slate-400'
                        }`}>
                          {isMetNow ? 'Achieved' : isPast ? 'Missed' : 'Pending'}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Progress stats */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-xs text-slate-400">Milestones Achieved</div>
                    <div className="text-xl font-bold text-green-400">
                      {leadershipGoals.filter(g => {
                        const goalDate = new Date(g.date);
                        const today = new Date();
                        return today >= goalDate;
                      }).length} / {leadershipGoals.length}
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-xs text-slate-400">Total Team Size</div>
                    <div className="text-xl font-bold text-blue-400">
                      {overallMetrics.totalTeamSize}
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-xl p-6 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4">Executive Insights</h3>
                <div className="space-y-3">
                  {parseFloat(overallMetrics.avgCapability) < 3 && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 flex gap-3 items-start">
                      <span className="text-yellow-400 text-lg">⚠️</span>
                      <div>
                        <div className="text-sm font-semibold text-yellow-300">Below Strategic Threshold</div>
                        <div className="text-xs text-slate-300 mt-1">
                          Overall capability maturity ({overallMetrics.avgCapability}) is below the Strategic target (3.0)
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {parseFloat(overallMetrics.avgAFD) < 51 && (
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 flex gap-3 items-start">
                      <span className="text-blue-400 text-lg">📊</span>
                      <div>
                        <div className="text-sm font-semibold text-blue-300">AI Fluency Density Below Strategic</div>
                        <div className="text-xs text-slate-300 mt-1">
                          Average {overallMetrics.avgAFD}% of teams at L3+ level. Need {(51 - parseFloat(overallMetrics.avgAFD)).toFixed(0)}% more for Strategic density.
                        </div>
                      </div>
                    </div>
                  )}

                  {parseFloat(overallMetrics.avgDPI) < 3 && (
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 flex gap-3 items-start">
                      <span className="text-purple-400 text-lg">🎯</span>
                      <div>
                        <div className="text-sm font-semibold text-purple-300">Build Delivery Provenance Portfolio</div>
                        <div className="text-xs text-slate-300 mt-1">
                          Average of {overallMetrics.avgDPI} referenceable solutions per practice. Target: 3+ for Elite level.
                        </div>
                      </div>
                    </div>
                  )}

                  {parseFloat(overallMetrics.avgCapability) >= 3 && parseFloat(overallMetrics.avgAFD) >= 51 && parseFloat(overallMetrics.avgDPI) >= 3 && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 flex gap-3 items-start">
                      <span className="text-green-400 text-lg">✅</span>
                      <div>
                        <div className="text-sm font-semibold text-green-300">On Track for Elite Status</div>
                        <div className="text-xs text-slate-300 mt-1">
                          Consultancy is performing at or above Strategic level across all dimensions.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Compare Practices */}
        {activeTab === 'compare' && (
          <div className="space-y-6">
            {/* Filters and Controls */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-md p-6 border border-slate-700">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Practice Comparison Matrix</h2>
                  <p className="text-slate-400 text-sm">Compare maturity metrics across all practice areas</p>
                </div>
                
                <div className="flex gap-3 items-center">
                  {/* Filter by Level */}
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Filter by Level</label>
                    <select
                      value={filterLevel}
                      onChange={(e) => setFilterLevel(e.target.value)}
                      className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Levels</option>
                      <option value="1">L1 - Foundational</option>
                      <option value="2">L2 - Emerging</option>
                      <option value="3">L3 - Strategic</option>
                      <option value="4">L4 - Elite</option>
                    </select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="name">Practice Name</option>
                      <option value="capability">Capability</option>
                      <option value="afd">AFD</option>
                      <option value="dpi">DPI</option>
                      <option value="gap">Gap to Target</option>
                      <option value="team">Team Size</option>
                    </select>
                  </div>

                  {/* Sort Order */}
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Order</label>
                    <button
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm hover:bg-slate-700 transition-all flex items-center gap-2"
                    >
                      {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
                    </button>
                  </div>
                  
                  {/* Competitor Toggle */}
                  <div className="border-l border-slate-600 pl-3">
                    <label className="text-xs text-slate-400 block mb-1">Benchmark</label>
                    <label className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg cursor-pointer hover:bg-slate-700 transition-all">
                      <input
                        type="checkbox"
                        checked={showCompetitor}
                        onChange={(e) => setShowCompetitor(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-600"
                      />
                      <span className="text-white text-sm">vs Competitor</span>
                    </label>
                  </div>
                  
                  {showCompetitor && (
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Select</label>
                      <select
                        value={selectedCompetitor}
                        onChange={(e) => setSelectedCompetitor(e.target.value)}
                        className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500"
                      >
                        {Object.entries(competitors).map(([id, comp]) => (
                          <option key={id} value={id}>{comp.name}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-md p-5 border border-slate-700">
                <div className="text-xs text-slate-400 mb-1">Leading Practice</div>
                <div className="text-xl font-bold text-cyan-400">
                  {comparisonData.sort((a, b) => b.avgCapability - a.avgCapability)[0]?.name.split(' ')[0]}
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  L{comparisonData[0]?.avgCapability.toFixed(1)} Capability
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-md p-5 border border-slate-700">
                <div className="text-xs text-slate-400 mb-1">Highest AFD</div>
                <div className="text-xl font-bold text-blue-400">
                  {comparisonData.sort((a, b) => b.afd - a.afd)[0]?.afd.toFixed(1)}%
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  {comparisonData.sort((a, b) => b.afd - a.afd)[0]?.name.split(' ')[0]}
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-md p-5 border border-slate-700">
                <div className="text-xs text-slate-400 mb-1">Most References</div>
                <div className="text-xl font-bold text-purple-400">
                  {comparisonData.sort((a, b) => b.dpi - a.dpi)[0]?.dpi}
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  {comparisonData.sort((a, b) => b.dpi - a.dpi)[0]?.name.split(' ')[0]} (DPI)
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-md p-5 border border-slate-700">
                <div className="text-xs text-slate-400 mb-1">Largest Gap</div>
                <div className="text-xl font-bold text-red-400">
                  -{comparisonData.sort((a, b) => b.gap - a.gap)[0]?.gap.toFixed(1)}
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  {comparisonData.sort((a, b) => b.gap - a.gap)[0]?.name.split(' ')[0]}
                </div>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-md border border-slate-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-800/50 border-b border-slate-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase">Practice Area</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-slate-300 uppercase">Team Size</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-cyan-400 uppercase">Capability</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-blue-400 uppercase">AFD</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-purple-400 uppercase">DPI</th>
                      {showCompetitor && (
                        <th className="px-6 py-4 text-center text-xs font-semibold text-orange-400 uppercase">vs {competitors[selectedCompetitor].name}</th>
                      )}
                      <th className="px-6 py-4 text-center text-xs font-semibold text-slate-300 uppercase">Gap</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-slate-300 uppercase">Target Quarter</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-slate-300 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {comparisonData.map((practice, idx) => {
                      const capLevel = Math.round(practice.avgCapability);
                      const isOnTrack = practice.gap < 0.5;
                      const practiceData = practicesData[practice.id];
                      const competitorScore = showCompetitor ? competitors[selectedCompetitor].practiceScores[practice.id] : null;
                      const vsCap = competitorScore ? practice.avgCapability - competitorScore.capability : 0;
                      const vsAFD = competitorScore ? practice.afd - competitorScore.afd : 0;
                      const vsDPI = competitorScore ? practice.dpi - competitorScore.dpi : 0;
                      
                      return (
                        <tr 
                          key={practice.id} 
                          className="hover:bg-slate-800/30 transition-colors cursor-pointer"
                          onClick={() => {
                            setSelectedPractice(practice.id);
                            setActiveTab('practice');
                          }}
                        >
                          <td className="px-6 py-4">
                            <div className="font-semibold text-white">{practice.name}</div>
                            <div className="text-xs text-slate-400">
                              {maturityLevels[capLevel - 1]?.name} • {practiceFrameworks[practice.id].stages.length} stages
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center text-white">{practice.teamSize}</td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <div className="text-lg font-bold text-cyan-400">{practice.avgCapability.toFixed(1)}</div>
                              <div className="text-xs text-slate-400">→ {practice.targetAvgCapability.toFixed(1)}</div>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-1.5 mt-2">
                              <div 
                                className="bg-cyan-400 h-1.5 rounded-full"
                                style={{ width: `${(practice.avgCapability / 4) * 100}%` }}
                              ></div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="text-lg font-bold text-blue-400">{practice.afd.toFixed(1)}%</div>
                            <div className={`text-xs mt-1 ${
                              practice.afdLevel >= 3 ? 'text-green-400' : 
                              practice.afdLevel === 2 ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                              L{practice.afdLevel} {maturityLevels[practice.afdLevel - 1]?.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="text-lg font-bold text-purple-400">{practice.dpi}</div>
                            <div className="flex gap-1 justify-center mt-1">
                              {[1, 2, 3, 4].map(i => (
                                <div 
                                  key={i}
                                  className={`w-2 h-2 rounded-full ${i <= practice.dpi ? 'bg-purple-400' : 'bg-slate-700'}`}
                                />
                              ))}
                            </div>
                          </td>
                          {showCompetitor && competitorScore && (
                            <td className="px-6 py-4 text-center">
                              <div className="space-y-1">
                                <div className={`text-sm font-bold ${vsCap > 0 ? 'text-green-400' : vsCap < 0 ? 'text-red-400' : 'text-slate-400'}`}>
                                  Cap: {vsCap > 0 ? '+' : ''}{vsCap.toFixed(1)}
                                </div>
                                <div className={`text-xs ${vsAFD > 0 ? 'text-green-400' : vsAFD < 0 ? 'text-red-400' : 'text-slate-400'}`}>
                                  AFD: {vsAFD > 0 ? '+' : ''}{vsAFD.toFixed(0)}%
                                </div>
                                <div className={`text-xs ${vsDPI > 0 ? 'text-green-400' : vsDPI < 0 ? 'text-red-400' : 'text-slate-400'}`}>
                                  DPI: {vsDPI > 0 ? '+' : ''}{vsDPI}
                                </div>
                              </div>
                            </td>
                          )}
                          <td className="px-6 py-4 text-center">
                            <div className={`text-lg font-bold ${
                              practice.gap > 1.5 ? 'text-red-400' : 
                              practice.gap > 0.8 ? 'text-yellow-400' : 
                              practice.gap > 0.3 ? 'text-blue-400' : 'text-green-400'
                            }`}>
                              -{practice.gap.toFixed(1)}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center text-slate-300 text-sm">
                            {formatFiscalQuarter(practiceData.targetDate)}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              isOnTrack 
                                ? 'bg-green-900/30 text-green-400 border border-green-700' 
                                : 'bg-yellow-900/30 text-yellow-400 border border-yellow-700'
                            }`}>
                              {isOnTrack ? '✓ On Track' : '⚠ Needs Attention'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stage-Level Comparison Heatmap */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-md p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">Stage-Level Maturity Heatmap</h3>
              <p className="text-slate-400 text-sm mb-6">Compare current maturity levels across all stages for each practice</p>
              
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                  {comparisonData.map(practice => {
                    const practiceFramework = practiceFrameworks[practice.id];
                    const practiceData = practicesData[practice.id];
                    
                    return (
                      <div key={practice.id} className="mb-6 last:mb-0">
                        <div className="font-semibold text-white mb-3 flex items-center gap-3">
                          <span>{practice.name}</span>
                          <span className="text-sm text-slate-400">
                            ({practice.avgCapability.toFixed(1)} avg)
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {practiceFramework.stages.map(stage => {
                            const level = practiceData.capability[stage.id];
                            const target = practiceData.targetCapability[stage.id];
                            
                            const getColor = (lvl) => {
                              if (lvl === 1) return 'bg-red-500/40 border-red-500';
                              if (lvl === 2) return 'bg-yellow-500/40 border-yellow-500';
                              if (lvl === 3) return 'bg-blue-500/40 border-blue-500';
                              return 'bg-cyan-400/40 border-cyan-400';
                            };
                            
                            return (
                              <div 
                                key={stage.id} 
                                className={`flex-1 rounded-lg border-2 p-3 ${getColor(level)} transition-all hover:scale-105 cursor-help`}
                                title={`${stage.name}: L${level} → L${target}`}
                              >
                                <div className="text-xs text-white font-medium mb-1 truncate">{stage.name}</div>
                                <div className="text-center">
                                  <div className="text-lg font-bold text-white">{level}</div>
                                  {level < target && (
                                    <div className="text-xs text-slate-200">→ {target}</div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-md p-6 border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">Key Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="text-sm font-semibold text-cyan-400 mb-2">📊 Capability Distribution</div>
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map(level => {
                      const count = treemapData.filter(p => Math.round(p.avgCapability) === level).length;
                      const percentage = ((count / practices.length) * 100).toFixed(0);
                      return (
                        <div key={level} className="flex items-center gap-3">
                          <div className="text-xs text-slate-300 w-20">L{level} {maturityLevels[level - 1].name}:</div>
                          <div className="flex-1 bg-slate-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                level === 1 ? 'bg-red-400' :
                                level === 2 ? 'bg-yellow-400' :
                                level === 3 ? 'bg-blue-400' : 'bg-cyan-400'
                              }`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-slate-400 w-12">{count} ({percentage}%)</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="text-sm font-semibold text-blue-400 mb-2">👥 Team Distribution</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Total Team:</span>
                      <span className="text-white font-bold">{overallMetrics.totalTeamSize}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Largest Practice:</span>
                      <span className="text-white font-bold">
                        {comparisonData.sort((a, b) => b.teamSize - a.teamSize)[0]?.name.split(' ')[0]} ({comparisonData.sort((a, b) => b.teamSize - a.teamSize)[0]?.teamSize})
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Avg Team Size:</span>
                      <span className="text-white font-bold">
                        {(overallMetrics.totalTeamSize / practices.length).toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Practices On Track:</span>
                      <span className="text-green-400 font-bold">
                        {comparisonData.filter(p => p.gap < 0.5).length} / {practices.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Practice Deep-Dive */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            {/* Practice Selector */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-md p-6 border border-slate-700">
              <label className="block text-sm font-medium text-slate-300 mb-2">Select Practice Area</label>
              <select
                value={selectedPractice}
                onChange={(e) => setSelectedPractice(e.target.value)}
                className="w-full md:w-1/2 px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {practices.map(practice => (
                  <option key={practice.id} value={practice.id}>
                    {practice.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-md p-6 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">{currentFramework.name} - Maturity Assessment</h2>
              
              {/* Radar Chart */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-200 mb-4">Capability Radar</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#475569" />
                    <PolarAngleAxis dataKey="stage" stroke="#94a3b8" />
                    <PolarRadiusAxis angle={90} domain={[0, 4]} stroke="#94a3b8" />
                    <Radar name="Current" dataKey="current" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} />
                    <Radar name="Target" dataKey="target" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Stage-by-Stage Breakdown */}
              <div>
                <h3 className="text-lg font-semibold text-slate-200 mb-4">Stage Details</h3>
                <div className="space-y-3">
                  {currentFramework.stages.map(stage => {
                    const current = currentData.capability[stage.id];
                    const target = currentData.targetCapability[stage.id];
                    const currentLevel = maturityLevels[current - 1];
                    return (
                      <div key={stage.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-white">{stage.name}</span>
                          <div className="text-sm">
                            <span className="text-slate-400">Current: </span>
                            <span className="font-medium text-cyan-400">L{current} - {currentLevel.name}</span>
                            <span className="text-slate-500 mx-2">→</span>
                            <span className="text-slate-400">Target: </span>
                            <span className="font-medium text-green-400">L{target}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {maturityLevels.map(level => (
                            <div 
                              key={level.level}
                              className={`flex-1 h-2 rounded transition-all ${
                                level.level <= current ? 'bg-cyan-500' : 'bg-slate-700'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Team Composition Breakdown */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-md p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-slate-200 mb-4">Team Composition & AFD Analysis</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {[
                  { key: 'l1', label: 'Level 1', color: 'bg-red-900/40 text-red-200 border-red-700' },
                  { key: 'l2', label: 'Level 2', color: 'bg-yellow-900/40 text-yellow-200 border-yellow-700' },
                  { key: 'l3', label: 'Level 3', color: 'bg-blue-900/40 text-blue-200 border-blue-600' },
                  { key: 'l4', label: 'Level 4', color: 'bg-cyan-900/40 text-cyan-200 border-cyan-500' }
                ].map(item => (
                  <div key={item.key} className={`p-4 rounded-lg border-2 ${item.color}`}>
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-2xl font-bold">{currentData.teamComposition[item.key]}</div>
                  </div>
                ))}
              </div>
              <div className="text-sm text-slate-300">
                Total Team: {currentData.teamSize} • 
                Strategic+ (L3/L4): {currentData.teamComposition.l3 + currentData.teamComposition.l4} • 
                AFD: {currentPracticeMetrics.afd.toFixed(1)}%
              </div>
            </div>
          </div>
        )}

        {/* Assessment Input */}
        {activeTab === 'assessment' && (
          <div className="space-y-6">
            {/* Practice Selector */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-md p-6 border border-slate-700">
              <label className="block text-sm font-medium text-slate-300 mb-2">Select Practice Area to Assess</label>
              <select
                value={selectedPractice}
                onChange={(e) => setSelectedPractice(e.target.value)}
                className="w-full md:w-1/2 px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {practices.map(practice => (
                  <option key={practice.id} value={practice.id}>
                    {practice.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-md p-6 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">{currentFramework.name} Assessment</h2>
              
              {/* Stage Capability Inputs */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-200 mb-4">Stage Maturity Levels</h3>
                <div className="space-y-6">
                  {currentFramework.stages.map(stage => (
                    <div key={stage.id} className="border-b border-slate-700 pb-6">
                      <label className="block font-medium text-slate-200 mb-3">{stage.name}</label>
                      
                      {/* Current Level */}
                      <div className="mb-4">
                        <div className="text-sm text-slate-400 mb-2">Current Level</div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {maturityLevels.map(level => (
                            <button
                              key={level.level}
                              onClick={() => updateCapability(selectedPractice, stage.id, level.level)}
                              className={`p-3 rounded-lg border-2 text-left transition-all ${
                                currentData.capability[stage.id] === level.level
                                  ? 'border-cyan-500 bg-cyan-900/30 shadow-lg'
                                  : 'border-slate-600 bg-slate-800 hover:border-slate-500'
                              }`}
                            >
                              <div className="font-semibold text-sm text-white">L{level.level}: {level.name}</div>
                              <div className="text-xs text-slate-400">{level.description}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Target Level */}
                      <div>
                        <div className="text-sm text-slate-400 mb-2">Target Level</div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {maturityLevels.map(level => (
                            <button
                              key={level.level}
                              onClick={() => updateTargetCapability(selectedPractice, stage.id, level.level)}
                              className={`p-3 rounded-lg border-2 text-left transition-all ${
                                currentData.targetCapability[stage.id] === level.level
                                  ? 'border-green-500 bg-green-900/30 shadow-lg'
                                  : 'border-slate-600 bg-slate-800 hover:border-slate-500'
                              }`}
                            >
                              <div className="font-semibold text-sm text-white">L{level.level}: {level.name}</div>
                              <div className="text-xs text-slate-400">{level.description}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Composition Inputs */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-200 mb-4">Team Composition (Headcount by Level)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { key: 'l1', label: 'Level 1 (Foundational)', desc: 'Manual/Traditional workers' },
                    { key: 'l2', label: 'Level 2 (Emerging)', desc: 'AI-Augmented workers' },
                    { key: 'l3', label: 'Level 3 (Strategic)', desc: 'AI-Integrated workers' },
                    { key: 'l4', label: 'Level 4 (Elite)', desc: 'Agentic/Autonomous workers' }
                  ].map(item => (
                    <div key={item.key}>
                      <label className="block text-sm font-medium text-slate-300 mb-1">
                        {item.label}
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={currentData.teamComposition[item.key]}
                        onChange={(e) => updateTeamComposition(selectedPractice, item.key, e.target.value)}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-green-900/20 rounded-lg border border-green-700/30">
                  <div className="text-sm font-medium text-green-300">
                    Calculated AFD: {currentPracticeMetrics.afd.toFixed(1)}% (Level {currentPracticeMetrics.afdLevel} - {maturityLevels[currentPracticeMetrics.afdLevel - 1].name})
                  </div>
                  <div className="text-xs text-green-400 mt-1">
                    {currentData.teamComposition.l3 + currentData.teamComposition.l4} of {currentData.teamSize} team members at Strategic+ level
                  </div>
                </div>
              </div>

              {/* DPI Input */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-200 mb-4">Delivery Provenance Index</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Current Referenceable Production Solutions
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={currentData.dpi}
                      onChange={(e) => updateDPI(selectedPractice, e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Target Referenceable Solutions
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={currentData.targetDpi}
                      onChange={(e) => updateTargetDPI(selectedPractice, e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm text-slate-400">
                  <div className={currentData.dpi === 0 ? 'font-semibold text-slate-200' : ''}>
                    • 0 solutions = Level 1 (Internal experimentation only)
                  </div>
                  <div className={currentData.dpi === 1 ? 'font-semibold text-slate-200' : ''}>
                    • 1 solution = Level 2 (Proof of Value)
                  </div>
                  <div className={currentData.dpi === 2 ? 'font-semibold text-slate-200' : ''}>
                    • 2 solutions = Level 3 (Repeatable framework)
                  </div>
                  <div className={currentData.dpi >= 3 ? 'font-semibold text-slate-200' : ''}>
                    • 3+ solutions = Level 4 (Standardized offering)
                  </div>
                </div>
              </div>
            </div>

            {/* Baseline & Target Dates */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-md p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-slate-200 mb-4">Timeline for {currentFramework.name}</h3>
              <div className="mb-4 text-xs text-slate-400">
                Fiscal Year Quarters: Q1 = Apr-Jun, Q2 = Jul-Sep, Q3 = Oct-Dec, Q4 = Jan-Mar
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Baseline Date</label>
                  <input
                    type="date"
                    value={currentData.baselineDate}
                    onChange={(e) => setPracticesData(prev => ({
                      ...prev,
                      [selectedPractice]: { ...prev[selectedPractice], baselineDate: e.target.value }
                    }))}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="text-xs text-slate-400 mt-1">
                    {formatFiscalQuarter(currentData.baselineDate)}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Target Date</label>
                  <input
                    type="date"
                    value={currentData.targetDate}
                    onChange={(e) => setPracticesData(prev => ({
                      ...prev,
                      [selectedPractice]: { ...prev[selectedPractice], targetDate: e.target.value }
                    }))}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="text-xs text-slate-400 mt-1">
                    {formatFiscalQuarter(currentData.targetDate)}
                  </div>
                </div>
              </div>
              
              {/* Quick Quarter Selectors */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-300 mb-2">Quick Select Target Quarter</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Q1 FY26', date: '2026-06-30' },
                    { label: 'Q2 FY26', date: '2026-09-30' },
                    { label: 'Q3 FY26', date: '2026-12-31' },
                    { label: 'Q4 FY26', date: '2027-03-31' },
                  ].map(quarter => (
                    <button
                      key={quarter.label}
                      onClick={() => setPracticesData(prev => ({
                        ...prev,
                        [selectedPractice]: { ...prev[selectedPractice], targetDate: quarter.date }
                      }))}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        currentData.targetDate === quarter.date
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600'
                      }`}
                    >
                      {quarter.label}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {[
                    { label: 'Q1 FY27', date: '2027-06-30' },
                    { label: 'Q2 FY27', date: '2027-09-30' },
                    { label: 'Q3 FY27', date: '2027-12-31' },
                    { label: 'Q4 FY27', date: '2028-03-31' },
                  ].map(quarter => (
                    <button
                      key={quarter.label}
                      onClick={() => setPracticesData(prev => ({
                        ...prev,
                        [selectedPractice]: { ...prev[selectedPractice], targetDate: quarter.date }
                      }))}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        currentData.targetDate === quarter.date
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600'
                      }`}
                    >
                      {quarter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Leadership Goals */}
        {activeTab === 'goals' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-md p-6 border border-slate-700">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Leadership Goals & Milestones</h2>
                  <p className="text-slate-400 text-sm mt-1">Set organizational targets and key milestones for AI adoption</p>
                </div>
                <button
                  onClick={() => {
                    const newGoal = {
                      id: leadershipGoals.length + 1,
                      date: new Date().toISOString().split('T')[0],
                      description: 'New milestone',
                      targetPracticesAtLevel: { level: 2, percentage: 50 }
                    };
                    setLeadershipGoals([...leadershipGoals, newGoal]);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
                >
                  + Add Milestone
                </button>
              </div>

              {/* Milestone List */}
              <div className="space-y-4">
                {leadershipGoals.map((goal, idx) => (
                  <div key={goal.id} className="bg-slate-800/50 rounded-lg p-5 border border-slate-700">
                    <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {idx + 1}
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        {/* Date */}
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Target Date</label>
                          <input
                            type="date"
                            value={goal.date}
                            onChange={(e) => {
                              const updated = [...leadershipGoals];
                              updated[idx].date = e.target.value;
                              setLeadershipGoals(updated);
                            }}
                            className="px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {/* Description */}
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Milestone Description</label>
                          <input
                            type="text"
                            value={goal.description}
                            onChange={(e) => {
                              const updated = [...leadershipGoals];
                              updated[idx].description = e.target.value;
                              setLeadershipGoals(updated);
                            }}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., 50% of practices at Strategic level"
                          />
                        </div>

                        {/* Goal Type Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">Goal Type</label>
                            <select
                              value={goal.targetMetric ? 'metric' : 'practices'}
                              onChange={(e) => {
                                const updated = [...leadershipGoals];
                                if (e.target.value === 'metric') {
                                  updated[idx] = {
                                    ...goal,
                                    targetMetric: { type: 'afd', value: 50 },
                                    targetPracticesAtLevel: undefined
                                  };
                                } else {
                                  updated[idx] = {
                                    ...goal,
                                    targetPracticesAtLevel: { level: 2, percentage: 50 },
                                    targetMetric: undefined
                                  };
                                }
                                setLeadershipGoals(updated);
                              }}
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="practices">Practice Count/Percentage</option>
                              <option value="metric">Overall Metric (AFD/DPI)</option>
                            </select>
                          </div>

                          {/* Conditional inputs based on goal type */}
                          {goal.targetPracticesAtLevel && (
                            <>
                              <div>
                                <label className="block text-xs text-slate-400 mb-1">Target Level</label>
                                <select
                                  value={goal.targetPracticesAtLevel.level}
                                  onChange={(e) => {
                                    const updated = [...leadershipGoals];
                                    updated[idx].targetPracticesAtLevel.level = parseInt(e.target.value);
                                    setLeadershipGoals(updated);
                                  }}
                                  className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500"
                                >
                                  <option value="1">L1 - Foundational</option>
                                  <option value="2">L2 - Emerging</option>
                                  <option value="3">L3 - Strategic</option>
                                  <option value="4">L4 - Elite</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs text-slate-400 mb-1">
                                  {goal.targetPracticesAtLevel.count ? 'Practice Count' : 'Percentage'}
                                </label>
                                <div className="flex gap-2">
                                  <input
                                    type="number"
                                    min="0"
                                    max={goal.targetPracticesAtLevel.count ? practices.length : 100}
                                    value={goal.targetPracticesAtLevel.count || goal.targetPracticesAtLevel.percentage}
                                    onChange={(e) => {
                                      const updated = [...leadershipGoals];
                                      const val = parseInt(e.target.value);
                                      if (goal.targetPracticesAtLevel.count) {
                                        updated[idx].targetPracticesAtLevel.count = val;
                                      } else {
                                        updated[idx].targetPracticesAtLevel.percentage = val;
                                      }
                                      setLeadershipGoals(updated);
                                    }}
                                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500"
                                  />
                                  <button
                                    onClick={() => {
                                      const updated = [...leadershipGoals];
                                      if (goal.targetPracticesAtLevel.count) {
                                        updated[idx].targetPracticesAtLevel = {
                                          level: goal.targetPracticesAtLevel.level,
                                          percentage: 50
                                        };
                                      } else {
                                        updated[idx].targetPracticesAtLevel = {
                                          level: goal.targetPracticesAtLevel.level,
                                          count: 3
                                        };
                                      }
                                      setLeadershipGoals(updated);
                                    }}
                                    className="px-2 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs transition-all"
                                    title="Toggle between count and percentage"
                                  >
                                    {goal.targetPracticesAtLevel.count ? '#' : '%'}
                                  </button>
                                </div>
                              </div>
                            </>
                          )}

                          {goal.targetMetric && (
                            <>
                              <div>
                                <label className="block text-xs text-slate-400 mb-1">Metric Type</label>
                                <select
                                  value={goal.targetMetric.type}
                                  onChange={(e) => {
                                    const updated = [...leadershipGoals];
                                    updated[idx].targetMetric.type = e.target.value;
                                    setLeadershipGoals(updated);
                                  }}
                                  className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500"
                                >
                                  <option value="afd">AI Fluency Density (AFD)</option>
                                  <option value="dpi">Delivery Provenance (DPI)</option>
                                  <option value="capability">Avg Capability</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs text-slate-400 mb-1">Target Value</label>
                                <input
                                  type="number"
                                  min="0"
                                  max={goal.targetMetric.type === 'afd' ? 100 : 4}
                                  step={goal.targetMetric.type === 'capability' ? 0.1 : 1}
                                  value={goal.targetMetric.value}
                                  onChange={(e) => {
                                    const updated = [...leadershipGoals];
                                    updated[idx].targetMetric.value = parseFloat(e.target.value);
                                    setLeadershipGoals(updated);
                                  }}
                                  className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Delete button */}
                      <button
                        onClick={() => {
                          setLeadershipGoals(leadershipGoals.filter(g => g.id !== goal.id));
                        }}
                        className="flex-shrink-0 p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all"
                        title="Delete milestone"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Example Goals Guide */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-md p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Example Leadership Goals</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="font-semibold text-cyan-400 mb-1">🎯 Practice-Based Goals</div>
                  <ul className="text-slate-300 space-y-1 text-xs">
                    <li>• "3 practices reach Strategic (L3) by Q2"</li>
                    <li>• "50% of practices at L2+ by Q3"</li>
                    <li>• "All practices above Foundational by Q4"</li>
                  </ul>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="font-semibold text-blue-400 mb-1">📊 Metric-Based Goals</div>
                  <ul className="text-slate-300 space-y-1 text-xs">
                    <li>• "Overall AFD reaches 50% by mid-year"</li>
                    <li>• "Average capability hits 2.5 by Q3"</li>
                    <li>• "Average DPI of 2+ across consultancy"</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

window.AIMaturityAssessment = AIMaturityAssessment;

