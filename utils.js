// utils.js - Utility functions

// Get fiscal quarter from date
const getFiscalQuarter = (date) => {
  const d = new Date(date);
  const month = d.getMonth();
  const year = d.getFullYear();
  const fiscalYear = month >= 3 ? year + 1 : year;
  if (month >= 3 && month <= 5) return { q: 1, fy: fiscalYear };
  if (month >= 6 && month <= 8) return { q: 2, fy: fiscalYear };
  if (month >= 9 && month <= 11) return { q: 3, fy: fiscalYear };
  return { q: 4, fy: month >= 0 && month <= 2 ? fiscalYear : fiscalYear + 1 };
};

const formatFiscalQuarter = (date) => {
  const { q, fy } = getFiscalQuarter(date);
  return 'Q' + q + ' FY' + fy;
};

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
const getPracticeMetrics = (practiceId, practicesData) => {
  const data = practicesData[practiceId];
  const afd = calculateAFD(data.teamComposition);
  const afdLevel = getAFDLevel(afd);
  const dpiLevel = getDPILevel(data.dpi);
  const avgCapability = calculateAvgCapability(data.capability);
  const targetAvgCapability = calculateAvgCapability(data.targetCapability);
  return {
    afd, afdLevel, dpiLevel, avgCapability, targetAvgCapability,
    dpi: data.dpi, targetDpi: data.targetDpi, teamSize: data.teamSize
  };
};

// Calculate overall consultancy metrics
const getOverallMetrics = (practicesData) => {
  let totalCapability = 0, totalAFD = 0, totalDPI = 0, totalTeamSize = 0;
  practices.forEach(practice => {
    const metrics = getPracticeMetrics(practice.id, practicesData);
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

// Prepare treemap data for all practices
const getTreemapData = (practicesData) => {
  return practices.map(practice => {
    const metrics = getPracticeMetrics(practice.id, practicesData);
    return { id: practice.id, name: practice.name, ...metrics };
  });
};

// Get color for maturity level
const getLevelColor = (level) => {
  if (level === 1) return 'bg-red-500/30 border-red-500 hover:bg-red-500/40';
  if (level === 2) return 'bg-yellow-500/30 border-yellow-500 hover:bg-yellow-500/40';
  if (level === 3) return 'bg-blue-500/40 border-blue-500 hover:bg-blue-500/50';
  return 'bg-cyan-400/40 border-cyan-400 hover:bg-cyan-400/50';
};

// Get gap color
const getGapColor = (gap) => {
  if (gap > 1.5) return 'text-red-400';
  if (gap > 0.8) return 'text-yellow-400';
  if (gap > 0.3) return 'text-blue-400';
  return 'text-green-400';
};

// Get treemap size class based on team size
const getTreemapSizeClass = (teamSize) => {
  if (teamSize > 40) return 'col-span-4 row-span-2';
  if (teamSize > 25) return 'col-span-3 row-span-2';
  return 'col-span-3 row-span-1';
};
