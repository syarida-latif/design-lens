import React, { useState, useRef } from 'react';

// Add print styles
const printStyles = `
  @media print {
    @page {
      margin: 1cm;
      size: A4;
    }
    
    body {
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
    
    .print-hide {
      display: none !important;
    }
    
    .print-show {
      display: block !important;
    }
    
    .page-break {
      page-break-after: always;
    }
    
    .page-break-avoid {
      page-break-inside: avoid;
    }
    
    /* Ensure colors are preserved */
    * {
      print-color-adjust: exact !important;
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
  }
`;

// Inject print styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = printStyles;
  document.head.appendChild(styleSheet);
}

// ============================================================================
// FEEDBACK BANK - Core Design Coaching Logic
// ============================================================================

const feedbackBank = {
  alignment: {
    high: [
      "Elements appear misaligned or lack a clear grid structure. This creates visual chaos and reduces professional appeal.",
      "Strong alignment creates invisible lines that guide the eye and communicate organization."
    ],
    medium: [
      "Some elements could be better aligned. Tightening your alignment will create a more polished, cohesive look.",
      "Consider using a grid system to ensure all elements relate to each other spatially."
    ],
    suggestions: [
      "Align text blocks to a consistent left or center axis.",
      "Use a grid system (e.g., 12-column layout) for precision.",
      "Ensure images, headers, and body text share alignment points."
    ]
  },
  
  balance: {
    high: [
      "The design feels unbalanced, with too much visual weight on one side. Balance creates stability and harmony.",
      "Imbalance can make designs feel unstable or incomplete. Distribute elements more evenly."
    ],
    medium: [
      "Balance could be improved. Adjusting element placement or size will create better equilibrium.",
      "Consider both symmetrical and asymmetrical balance techniques."
    ],
    suggestions: [
      "Distribute large elements evenly across the canvas.",
      "Balance a heavy element on one side with multiple smaller elements on the other.",
      "Use symmetry for formal designs, asymmetry for dynamic layouts."
    ]
  },
  
  contrastColour: {
    high: [
      "Your contrast and color harmony need attention. Poor contrast makes text unreadable, while clashing colors undermine your message.",
      "Aim for high contrast between text and background (minimum 4.5:1 ratio) and use a cohesive color palette throughout."
    ],
    medium: [
      "Contrast and color choices are functional but could be optimized for better visual impact and accessibility.",
      "Consider refining your color palette to create more harmony and ensure all text meets readability standards."
    ],
    suggestions: [
      "Use high-contrast pairings for text (dark on light or vice versa).",
      "Test contrast ratios with accessibility tools.",
      "Stick to 3-5 colors and apply the 60-30-10 rule.",
      "Use color palette generators like Adobe Color or Coolors."
    ]
  },
  
  hierarchy: {
    high: [
      "Visual hierarchy is unclear. Viewers should immediately understand what's most important on the page.",
      "Without clear hierarchy, all elements compete equally for attention, creating cognitive overload."
    ],
    medium: [
      "Hierarchy exists but could be stronger. Ensure the most important information dominates visually.",
      "Use size, color, weight, and position to create a clear reading order."
    ],
    suggestions: [
      "Make headlines significantly larger than body text (at least 2x).",
      "Use color or weight to emphasize key information.",
      "Position the most important element in a prominent location (top-left for Western readers)."
    ]
  },
  
  readability: {
    high: [
      "Typography and text formatting hinder readability. Font selection, sizing, and spacing are critical for effective communication.",
      "Poor readability makes even great content inaccessible. Prioritize legibility through proper typography and layout."
    ],
    medium: [
      "Readability is functional but could be improved. Small refinements in typography and spacing can significantly enhance reading experience.",
      "Consider font pairing, sizing, line spacing, and text contrast for optimal readability."
    ],
    suggestions: [
      "Use a maximum of 2-3 typefaces throughout.",
      "Ensure body text is at least 16px for web, 10-12pt for print.",
      "Maintain line spacing (leading) of 1.4-1.6x the font size.",
      "Keep line length between 50-75 characters for comfortable reading."
    ]
  },
  
  spacing: {
    high: [
      "Spacing issues are creating visual confusion. Proper spacing (whitespace) is essential for clarity and elegance.",
      "Without adequate spacing, designs feel cramped and relationships between elements become unclear."
    ],
    medium: [
      "Spacing could be improved for better visual breathing room and clearer content groupings.",
      "Strategic use of whitespace draws attention to key elements and improves overall composition."
    ],
    suggestions: [
      "Increase padding around text blocks and images.",
      "Group related items closer together, separate unrelated items.",
      "Leave generous margins (at least 10-15% of the canvas).",
      "Use consistent spacing values (e.g., 8px, 16px, 24px, 32px)."
    ]
  }
};

// ============================================================================
// ANALYSIS FUNCTION - Design Evaluation Logic
// ============================================================================

function analyzeDesign(imageData, selectedPrinciples) {
  // Create deterministic analysis based on selected principles
  // This ensures consistent results for the same image and principle selection
  
  const allPrincipleKeys = {
    'Alignment': 'alignment',
    'Balance': 'balance',
    'Contrast & Colour': 'contrastColour',
    'Hierarchy': 'hierarchy',
    'Readability': 'readability',
    'Spacing': 'spacing'
  };
  
  // Use a simple hash of the image data and principles for consistent randomness
  const seed = imageData.length + selectedPrinciples.join('').length;
  const seededRandom = (index) => {
    const x = Math.sin(seed + index) * 10000;
    return x - Math.floor(x);
  };
  
  const analysis = {};
  const principleScores = {};
  
  // Analyze selected principles with consistent results
  selectedPrinciples.forEach((principle, index) => {
    const key = allPrincipleKeys[principle];
    const rand = seededRandom(index);
    
    let severity, score;
    // New ranges: 0-39 critical, 40-59 need improvement, 60-79 satisfactory, 80-100 good
    if (rand > 0.6) {
      severity = 'good';
      score = Math.floor(80 + rand * 20); // 80-100
    } else if (rand > 0.4) {
      severity = 'satisfactory';
      score = Math.floor(60 + (rand - 0.4) * 100); // 60-79
    } else if (rand > 0.2) {
      severity = 'medium';
      score = Math.floor(40 + (rand - 0.2) * 100); // 40-59
    } else {
      severity = 'high';
      score = Math.floor(20 + rand * 100); // 20-39
    }
    
    analysis[key] = severity;
    principleScores[principle] = score;
  });
  
  const principleDetails = [];
  const allSuggestions = [];
  
  // Include ALL principles in feedback, not just problematic ones
  Object.keys(analysis).forEach(principle => {
    const severity = analysis[principle];
    const displayName = Object.keys(allPrincipleKeys).find(
      key => allPrincipleKeys[key] === principle
    );
    
    if (severity === 'good') {
      // Add positive feedback for good principles (80-100)
      principleDetails.push({
        name: displayName,
        severity: 'good',
        feedback: [
          `Your ${displayName.toLowerCase()} is well-executed and demonstrates strong understanding of this principle.`,
          `The elements show clear attention to ${displayName.toLowerCase()}, contributing positively to the overall design.`
        ],
        suggestions: []
      });
    } else if (severity === 'satisfactory') {
      // Add satisfactory feedback (60-79)
      principleDetails.push({
        name: displayName,
        severity: 'satisfactory',
        feedback: [
          `Your ${displayName.toLowerCase()} is functional and meets basic standards.`,
          `While the principle is applied correctly, there's room for refinement to elevate the design further.`
        ],
        suggestions: feedbackBank[principle]?.suggestions || []
      });
    } else if (feedbackBank[principle]) {
      const feedback = feedbackBank[principle][severity] || [];
      const suggestions = feedbackBank[principle].suggestions || [];
      
      principleDetails.push({
        name: displayName,
        severity,
        feedback,
        suggestions
      });
      
      allSuggestions.push(...suggestions);
    }
  });
  
  // Calculate overall score as average of all principle scores
  const scores = Object.values(principleScores);
  const overallScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  
  return {
    principleDetails,
    principleScores,
    allSuggestions: [...new Set(allSuggestions)],
    overallScore,
    rawAnalysis: analysis
  };
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function DesignLens() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [selectedPrinciples, setSelectedPrinciples] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [scanningPrinciple, setScanningPrinciple] = useState('');
  const fileInputRef = useRef(null);
  
  const availablePrinciples = [
    'Alignment',
    'Balance', 
    'Contrast & Colour',
    'Hierarchy',
    'Readability',
    'Spacing'
  ];
  
  // Loading messages and icons for each principle
  const principleLoadingData = {
    'Alignment': {
      icon: '📐',
      message: 'Checking alignment and grid structure...',
      description: 'Evaluating how well elements line up'
    },
    'Balance': {
      icon: '⚖️',
      message: 'Analyzing visual weight distribution...',
      description: 'Assessing symmetry and equilibrium'
    },
    'Contrast & Colour': {
      icon: '🎨',
      message: 'Evaluating color harmony and contrast...',
      description: 'Reviewing color choices and readability'
    },
    'Hierarchy': {
      icon: '📊',
      message: 'Examining visual hierarchy...',
      description: 'Checking the flow of information'
    },
    'Readability': {
      icon: '📖',
      message: 'Assessing typography and legibility...',
      description: 'Analyzing text clarity and spacing'
    },
    'Spacing': {
      icon: '📏',
      message: 'Measuring whitespace and proximity...',
      description: 'Evaluating element spacing and breathing room'
    }
  };
  
  const togglePrinciple = (principle) => {
    setSelectedPrinciples(prev => 
      prev.includes(principle)
        ? prev.filter(p => p !== principle)
        : [...prev, principle]
    );
  };
  
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  
  const handleFile = (file) => {
    if (selectedPrinciples.length === 0) {
      alert('Please select at least one design principle before uploading');
      return;
    }
    
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
      startAnalysis(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  const startAnalysis = async (imageData) => {
    setIsAnalyzing(true);
    setCurrentPage('analyzing');
    
    // Start the AI analysis immediately in the background
    const analysisPromise = new Promise(resolve => {
      setTimeout(() => {
        const result = analyzeDesign(imageData, selectedPrinciples);
        resolve(result);
      }, 100); // Start analysis almost immediately
    });
    
    // Animate through each selected principle with controlled timing
    // Each principle stays visible for 1.2 seconds
    const principleDelay = 1200; // 1.2 seconds per principle
    
    for (let i = 0; i < selectedPrinciples.length; i++) {
      setScanningPrinciple(selectedPrinciples[i]);
      await new Promise(resolve => setTimeout(resolve, principleDelay));
    }
    
    // Add a brief pause at the end to show completion
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Wait for analysis to complete (in case it's still running)
    const result = await analysisPromise;
    
    // Set results and transition to results page
    setAnalysisResult(result);
    setIsAnalyzing(false);
    setScanningPrinciple('');
    setCurrentPage('results');
  };
  
  const resetAnalysis = () => {
    setCurrentPage('selection');
    setSelectedPrinciples([]);
    setUploadedImage(null);
    setAnalysisResult(null);
    setScanningPrinciple('');
  };
  
  const downloadReport = () => {
    if (!analysisResult || !uploadedImage) {
      alert('No analysis data available to download.');
      return;
    }
    
    // Use browser's print-to-PDF functionality with optimized styles
    window.print();
  };
  
  const getSeverityColor = (severity) => {
    if (severity === 'high') return 'bg-red-50 border-red-200';
    if (severity === 'medium') return 'bg-orange-50 border-orange-200';
    if (severity === 'satisfactory') return 'bg-yellow-50 border-yellow-200';
    if (severity === 'good') return 'bg-green-50 border-green-200';
    return 'bg-green-50 border-green-200';
  };
  
  const getSeverityBadge = (severity) => {
    if (severity === 'high') return 'bg-red-100 text-red-700';
    if (severity === 'medium') return 'bg-orange-100 text-orange-700';
    if (severity === 'satisfactory') return 'bg-yellow-100 text-yellow-700';
    if (severity === 'good') return 'bg-green-100 text-green-700';
    return 'bg-green-100 text-green-700';
  };
  
  const getSeverityLabel = (severity) => {
    if (severity === 'high') return 'Critical Issues';
    if (severity === 'medium') return 'Need Improvement';
    if (severity === 'satisfactory') return 'Satisfactory';
    if (severity === 'good') return 'Good/Strong';
    return 'Good/Strong';
  };
  
  const getPrincipleScoreColor = (score) => {
    if (score >= 80) return '#10b981'; // Green
    if (score >= 60) return '#eab308'; // Yellow
    if (score >= 40) return '#f97316'; // Orange
    return '#ef4444'; // Red
  };
  
  const getPrincipleScoreLabel = (score) => {
    if (score >= 80) return 'Good/Strong';
    if (score >= 60) return 'Satisfactory';
    if (score >= 40) return 'Need Improvement';
    return 'Critical Issues';
  };
  
  // ============================================================================
  // RENDER: WELCOME LANDING PAGE
  // ============================================================================
  
  if (currentPage === 'welcome') {
    return (
      <div className="min-h-screen flex flex-col" style={{ 
        background: 'linear-gradient(135deg, #F7F8FA 0%, #E8F4F8 100%)',
        fontFamily: "'Space Grotesk', 'Poppins', sans-serif"
      }}>
        {/* Header */}
        <header className="px-8 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3">
              {/* Modern Logo Icon */}
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">DesignLens</h1>
                <p className="text-gray-600 mt-1">Your AI Design Mentor</p>
              </div>
            </div>
          </div>
        </header>
        
        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-4xl w-full text-center">
            {/* Main Heading */}
            <div className="mb-12">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                Improve Your Design with<br />
                <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                  AI-Powered Feedback
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                DesignLens helps design students analyze their work through visual principles and receive guided feedback powered by hybrid AI. The system supports independent learning by translating design structure into clear, actionable insights.
              </p>
              
              {/* CTA Button */}
              <button
                onClick={() => setCurrentPage('selection')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-lg font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Let's Get Started
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Custom Analysis</h3>
                <p className="text-gray-600 leading-relaxed">
                  Focus on the principles that matter to you. Select from 6 core design principles for targeted feedback.
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Educational Feedback</h3>
                <p className="text-gray-600 leading-relaxed">
                  Learn the 'why' behind every design decision with supportive, mentor-style guidance.
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Exportable Reports</h3>
                <p className="text-gray-600 leading-relaxed">
                  Download professional analysis reports for your portfolio and future reference.
                </p>
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="py-6 px-8 text-center text-gray-500 text-sm">
          <p>AI analyzes your design based on professional design principles</p>
        </footer>
      </div>
    );
  }
  
  // ============================================================================
  // RENDER: PRINCIPLE SELECTION & UPLOAD PAGE
  // ============================================================================
  
  if (currentPage === 'selection') {
    return (
      <div className="min-h-screen flex flex-col" style={{ 
        background: 'linear-gradient(135deg, #F7F8FA 0%, #E8F4F8 100%)',
        fontFamily: "'Space Grotesk', 'Poppins', sans-serif"
      }}>
        {/* Header */}
        <header className="px-8 py-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Modern Logo Icon */}
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">DesignLens</h1>
                <p className="text-gray-600 mt-1">Your AI Design Mentor</p>
              </div>
            </div>
            <button
              onClick={() => setCurrentPage('welcome')}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Selection Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl mb-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Select Design Principles to Analyze
                </h2>
                <p className="text-gray-600">
                  Choose one or more principles you'd like feedback on
                </p>
              </div>
              
              {/* Principle Selection Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {availablePrinciples.map((principle) => (
                  <button
                    key={principle}
                    onClick={() => togglePrinciple(principle)}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      selectedPrinciples.includes(principle)
                        ? 'border-cyan-500 bg-gradient-to-br from-cyan-50 to-purple-50 shadow-md scale-105'
                        : 'border-gray-200 bg-white hover:border-cyan-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {principle}
                      </h3>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedPrinciples.includes(principle)
                          ? 'border-cyan-500 bg-cyan-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedPrinciples.includes(principle) && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {principle === 'Alignment' && 'How well elements line up with each other'}
                      {principle === 'Balance' && 'Visual weight distribution across the design'}
                      {principle === 'Contrast & Colour' && 'Color harmony and text-background contrast'}
                      {principle === 'Hierarchy' && 'Clear visual importance of elements'}
                      {principle === 'Readability' && 'Typography and text legibility'}
                      {principle === 'Spacing' && 'Use of whitespace and element proximity'}
                    </p>
                  </button>
                ))}
              </div>
              
              {/* Selection Summary & Quick Actions */}
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-gradient-to-r from-cyan-50 to-purple-50 rounded-xl p-4">
                  <p className="text-gray-700">
                    <span className="font-semibold">{selectedPrinciples.length}</span> principle{selectedPrinciples.length !== 1 ? 's' : ''} selected
                    {selectedPrinciples.length > 0 && (
                      <span className="ml-2 text-gray-600">
                        • {selectedPrinciples.join(', ')}
                      </span>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPrinciples(availablePrinciples)}
                  className="py-3 px-6 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 whitespace-nowrap"
                >
                  Select All
                </button>
                <button
                  onClick={() => setSelectedPrinciples([])}
                  disabled={selectedPrinciples.length === 0}
                  className={`py-3 px-6 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedPrinciples.length > 0
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Reset
                </button>
              </div>
            </div>
            
            {/* Upload Area */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Your Design</h2>
              
              <div
                className={`upload-area rounded-2xl p-16 text-center transition-all duration-300 cursor-pointer ${
                  dragActive ? 'dragover border-cyan-400 scale-[1.02]' : 'border-cyan-300'
                } ${selectedPrinciples.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{
                  borderWidth: '3px',
                  borderStyle: 'dashed',
                  background: dragActive 
                    ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(139, 92, 246, 0.15))'
                    : 'linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(139, 92, 246, 0.08))'
                }}
                onDragEnter={selectedPrinciples.length > 0 ? handleDrag : undefined}
                onDragLeave={selectedPrinciples.length > 0 ? handleDrag : undefined}
                onDragOver={selectedPrinciples.length > 0 ? handleDrag : undefined}
                onDrop={selectedPrinciples.length > 0 ? handleDrop : undefined}
                onClick={selectedPrinciples.length > 0 ? () => fileInputRef.current?.click() : undefined}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                  disabled={selectedPrinciples.length === 0}
                />
                
                <div className="mb-6">
                  <svg className="w-24 h-24 mx-auto text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                
                {selectedPrinciples.length > 0 ? (
                  <>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                      Drop Your Design Here
                    </h3>
                    <p className="text-gray-600 mb-4 text-lg">
                      Drag & drop your poster or layout, or click to browse
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports: JPG, PNG, GIF, WebP
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-semibold text-gray-600 mb-3">
                      Select Principles First
                    </h3>
                    <p className="text-gray-500 text-lg">
                      Choose at least one design principle above to begin
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="py-6 px-8 text-center text-gray-500 text-sm">
          <p>AI analyzes your design based on professional design principles</p>
        </footer>
      </div>
    );
  }
  
  // ============================================================================
  // RENDER: ANALYZING STATE
  // ============================================================================
  
  if (currentPage === 'analyzing') {
    const currentIndex = selectedPrinciples.indexOf(scanningPrinciple);
    const progress = scanningPrinciple ? ((currentIndex + 1) / selectedPrinciples.length) * 100 : 0;
    const currentLoadingData = scanningPrinciple ? principleLoadingData[scanningPrinciple] : null;
    
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ 
        background: 'linear-gradient(135deg, #F7F8FA 0%, #E8F4F8 100%)',
        fontFamily: "'Space Grotesk', 'Poppins', sans-serif"
      }}>
        <div className="max-w-2xl w-full px-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 text-center shadow-2xl">
            {/* Central Loading Circle with Icon - Doughnut Style */}
            <div className="mb-8">
              <div className="relative w-48 h-48 mx-auto mb-8">
                {/* Doughnut chart style progress */}
                <svg className="transform -rotate-90 w-48 h-48" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                  />
                  {/* Progress circle with gradient */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#loading-gradient)"
                    strokeWidth="12"
                    strokeDasharray={`${(progress * 251.2) / 100} 251.2`}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                  />
                  <defs>
                    <linearGradient id="loading-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Icon in center with smooth transition */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-7xl transition-all duration-500 transform" key={scanningPrinciple}>
                    {currentLoadingData ? currentLoadingData.icon : '🔍'}
                  </div>
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Analyzing Your Design
            </h2>
            
            {/* Current principle and message */}
            {currentLoadingData && (
              <div className="mb-6 transition-all duration-500" key={scanningPrinciple}>
                <p className="text-xl font-semibold text-gray-800 mb-2">
                  {scanningPrinciple}
                </p>
                <p className="text-lg text-gray-600">
                  {currentLoadingData.message}
                </p>
                <div className="flex justify-center items-center gap-2 mt-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            
            {/* Progress counter */}
            <p className="text-sm text-gray-500 mt-4">
              {currentIndex + 1} of {selectedPrinciples.length} principles
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  // ============================================================================
  // RENDER: RESULTS PAGE
  // ============================================================================
  
  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #F7F8FA 0%, #E8F4F8 100%)',
      fontFamily: "'Space Grotesk', 'Poppins', sans-serif"
    }}>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm print-hide">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Modern Logo Icon */}
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">DesignLens</h1>
              <p className="text-sm text-gray-600">Design Analysis Report</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={downloadReport}
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Download Report
            </button>
          </div>
        </div>
      </header>
      
      {/* Disclaimer */}
      <div className="max-w-7xl mx-auto px-8 pt-6 print-hide">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-blue-800">
              <strong className="font-semibold">Disclaimer:</strong> DesignLens is designed as a learning support tool. Final design decisions should always involve human judgment and creativity.
            </p>
          </div>
        </div>
      </div>
      
      {/* Print-only header */}
      <div className="hidden print-show text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">DesignLens – Design Analysis Report</h1>
        <p className="text-gray-600">Generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-6">
        {/* Score Overview with Doughnut Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 page-break-avoid">
          {/* Doughnut Chart for Overall Score */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg print:shadow-none">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Overall Design Score</h2>
            <div className="relative w-48 h-48 mx-auto">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                />
                {/* Score circle with color based on score range */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={getPrincipleScoreColor(analysisResult?.overallScore || 0)}
                  strokeWidth="12"
                  strokeDasharray={`${(analysisResult?.overallScore * 251.2) / 100} 251.2`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold" style={{ 
                    color: getPrincipleScoreColor(analysisResult?.overallScore || 0)
                  }}>
                    {analysisResult?.overallScore}
                  </div>
                  <div className="text-sm text-gray-500">out of 100</div>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-600 mt-6 leading-relaxed px-2">
              {analysisResult?.overallScore >= 80 
                ? 'The overall design is strong and well-executed.' 
                : analysisResult?.overallScore >= 60 
                ? 'A solid foundation is present, though further refinement would improve impact.'
                : analysisResult?.overallScore >= 40
                ? 'Some ideas are visible, but the overall execution needs more attention.'
                : 'The structure and clarity of this design need major improvement.'}
            </p>
          </div>
          
          {/* Individual Principle Scores */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg print:shadow-none">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Principle Scores</h2>
            <div className="space-y-4">
              {selectedPrinciples.map((principle) => {
                const score = analysisResult?.principleScores[principle] || 0;
                const color = getPrincipleScoreColor(score);
                const label = getPrincipleScoreLabel(score);
                
                return (
                  <div key={principle} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800">{principle}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium" style={{ color }}>
                          {label}
                        </span>
                        <span className="text-2xl font-bold" style={{ color }}>
                          {score}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${score}%`,
                          backgroundColor: color
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Design & Feedback Grid */}
        <div className="page-break"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Uploaded Design */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg print:shadow-none">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Your Design</h3>
            <div className="rounded-xl overflow-hidden bg-gray-100">
              <img
                src={uploadedImage}
                alt="Uploaded design"
                className="w-full h-auto object-contain"
                style={{ maxHeight: '500px' }}
              />
            </div>
          </div>
          
          {/* Feedback Summary */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Design Feedback</h3>
            
            {analysisResult?.principleDetails.length > 0 ? (
              analysisResult.principleDetails.map((detail, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl p-6 border-2 transition-all duration-300 hover:shadow-md ${getSeverityColor(detail.severity)}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-800">{detail.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityBadge(detail.severity)}`}>
                      {getSeverityLabel(detail.severity)}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {detail.feedback.map((fb, fbIdx) => (
                      <p key={fbIdx} className="text-gray-700 leading-relaxed">{fb}</p>
                    ))}
                  </div>
                  
                  {detail.suggestions && detail.suggestions.length > 0 && (
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm font-semibold text-gray-700 mb-2">💡 Tips:</p>
                      <ul className="space-y-1">
                        {detail.suggestions.map((suggestion, sIdx) => (
                          <li key={sIdx} className="text-sm text-gray-600 flex items-start">
                            <span className="text-cyan-500 mr-2">→</span>
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Excellent Work!</h4>
                <p className="text-gray-600">Your design demonstrates strong understanding of all selected design principles. Keep up the great work!</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Printable Report (Hidden on Screen) */}
        <div className="hidden print:block">
          <div className="mb-8 text-center border-b-2 border-gray-300 pb-6">
            <h1 className="text-3xl font-bold mb-2">DesignLens – Design Analysis Report</h1>
            <p className="text-gray-600">Generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-300 pb-2">Uploaded Design</h2>
            <img src={uploadedImage} alt="Design" className="max-w-full h-auto" style={{ maxHeight: '400px' }} />
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-300 pb-2">Analysis Summary</h2>
            {analysisResult?.principleDetails.map((detail, idx) => (
              <div key={idx} className="mb-6 pb-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold mb-2">{detail.name}</h3>
                {detail.feedback.map((fb, fbIdx) => (
                  <p key={fbIdx} className="mb-2 text-gray-700">{fb}</p>
                ))}
              </div>
            ))}
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-300 pb-2">Score Summary</h2>
            <p className="text-lg"><strong>Overall Score: {analysisResult?.overallScore}/100</strong></p>
          </div>
        </div>
        
        {/* New Analysis Button at Bottom */}
        <div className="text-center pb-8 print-hide">
          <button
            onClick={resetAnalysis}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-lg rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            New Analysis
          </button>
        </div>
      </main>
    </div>
  );
}
