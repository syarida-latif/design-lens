<!doctype html>
<html lang="en" class="h-full">
 <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DesignLens</title>
  <script src="/_sdk/element_sdk.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&amp;family=Roboto:wght@400;500&amp;display=swap" rel="stylesheet">
  <style>
    body {
      box-sizing: border-box;
    }
    
    .upload-area {
      border: 3px dashed;
      transition: all 0.3s ease;
      background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1));
    }
    
    .upload-area:hover {
      transform: scale(1.01);
      background: linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(139, 92, 246, 0.15));
    }
    
    .upload-area.dragover {
      transform: scale(1.02);
      opacity: 0.8;
    }
    
    .result-card {
      animation: slideIn 0.4s ease-out;
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .principle-card {
      transition: all 0.2s ease;
      background: linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(139, 92, 246, 0.05));
    }
    
    .principle-card:hover {
      transform: translateY(-2px);
      background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1));
    }
    
    .logo-img {
      width: 500px;
      height: 185px;
      object-fit: contain;
    }

    /* Report Print Styles */
    .report-header {
      text-align: center;
      margin-bottom: 20px;
    }

    .report-header h1 {
      margin: 0 0 10px 0;
      font-size: 28px;
      font-weight: bold;
    }

    .report-meta {
      font-size: 12px;
      opacity: 0.7;
      margin: 0;
    }

    .report-section {
      margin-top: 24px;
      margin-bottom: 20px;
    }

    .report-section h2 {
      font-size: 18px;
      font-weight: 600;
      border-bottom: 2px solid #333;
      padding-bottom: 8px;
      margin: 0 0 16px 0;
    }

    .analysis-item {
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid #e5e7eb;
    }

    .analysis-item:last-child {
      border-bottom: none;
    }

    .analysis-item h3 {
      font-size: 14px;
      font-weight: 600;
      margin: 0 0 6px 0;
    }

    .analysis-item p {
      font-size: 13px;
      margin: 0;
      line-height: 1.5;
      opacity: 0.8;
    }

    #uploadedDesignPreview {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin-top: 12px;
      max-height: 400px;
      object-fit: contain;
    }

    @media print {
      /* Hide everything */
      body * {
        visibility: hidden;
      }

      /* Show report only */
      #analysisReport,
      #analysisReport * {
        visibility: visible;
      }

      #analysisReport {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        padding: 30px;
        font-family: "Arial", sans-serif;
        font-size: 11pt;
        color: #000;
      }

      /* Header styling */
      .report-header h1 {
        font-size: 18pt;
        text-align: center;
        margin-bottom: 5px;
      }

      .report-meta {
        text-align: center;
        font-size: 9pt;
        color: #555;
      }

      /* Section styling */
      .report-section {
        margin-top: 20px;
        page-break-inside: avoid;
      }

      .report-section h2 {
        font-size: 14pt;
        border-bottom: 1px solid #000;
        padding-bottom: 4px;
      }

      .analysis-item h3 {
        font-size: 11pt;
        margin-bottom: 4px;
      }

      .analysis-item p {
        font-size: 10pt;
      }

      .analysis-item {
        page-break-inside: avoid;
      }

      /* Image control */
      #uploadedDesignPreview {
        max-width: 100%;
        height: auto;
        margin: 10px 0;
      }

      /* Page breaks */
      hr {
        margin: 20px 0;
        border: 1px solid #000;
      }
    }
  </style>
  <style>@view-transition { navigation: auto; }</style>
  <script src="/_sdk/data_sdk.js" type="text/javascript"></script>
 </head>
 <body class="h-full">
  <div id="app" class="w-full h-full flex flex-col overflow-auto"></div>
  <script>
    const defaultConfig = {
      background_color: "#F7F8FA",
      surface_color: "#C9EEF5",
      text_color: "#2d3748",
      primary_action: "#A6E88B",
      secondary_action: "#C9EEF5",
      logo_url: "https://i.ibb.co/kYkxhTd/Untitled-design-5.png",
      font_family: "Space Grotesk",
      font_size: 16,
      app_title: "DesignLens",
      upload_button_text: "Click Here to Upload Design",
      footer_text: "AI analyzes your design based on design principles"
    };

    let isProcessing = false;
    let currentPage = 'landing';
    let currentResultData = null;
    let currentResultImage = null;

    function rgbToHex(r, g, b) {
      return "#" + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      }).join('');
    }

    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }

    function getLuminance(r, g, b) {
      const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    function getContrastRatio(color1, color2) {
      const lum1 = getLuminance(color1.r, color1.g, color1.b);
      const lum2 = getLuminance(color2.r, color2.g, color2.b);
      const brightest = Math.max(lum1, lum2);
      const darkest = Math.min(lum1, lum2);
      return (brightest + 0.05) / (darkest + 0.05);
    }

    const feedbackBank = {
      contrast: [
        {
          principle: "Contrast & Colour",
          id: "COLOR_01",
          severity: "high",
          condition: {
            metric: "contrast_score",
            operator: "<",
            value: 0.5
          },
          feedback: {
            title: "Low Text Contrast",
            message_core: "The contrast between text and background is too low, reducing readability.",
            explanation: "Strong contrast ensures text is readable across different screen sizes and lighting conditions.",
            suggestion: "Increase contrast by darkening the text or lightening the background.",
            example_fix: "Use dark grey or black text on a light background."
          }
        },
        {
          principle: "Contrast & Colour",
          id: "COLOR_02",
          severity: "medium",
          condition: {
            metric: "color_count",
            operator: ">",
            value: 5
          },
          feedback: {
            title: "Too Many Colours Used",
            message_core: "The design uses too many colours, which weakens visual focus.",
            explanation: "A limited color palette creates visual consistency and hierarchy.",
            suggestion: "Reduce the palette to 2-3 primary colours.",
            example_fix: "Choose one dominant colour and use shades for variation."
          }
        },
        {
          principle: "Contrast & Colour",
          id: "COLOR_03",
          severity: "low",
          condition: {
            metric: "contrast_ratio",
            operator: ">=",
            value: 4.5
          },
          feedback: {
            message_core: "The contrast meets basic readability standards but could be strengthened.",
            suggestion: "Slightly increasing contrast can improve clarity and visual impact."
          }
        }
      ],
      alignment: [
        {
          principle: "Alignment",
          id: "ALIGN_01",
          severity: "medium",
          condition: {
            metric: "alignment_score",
            operator: "<",
            value: 0.6
          },
          feedback: {
            title: "Inconsistent Alignment",
            message_core: "Elements appear misaligned, creating a fragmented layout.",
            explanation: "Consistent alignment improves structure and visual flow.",
            suggestion: "Align elements using a consistent grid system.",
            example_fix: "Align text and images to a common left edge."
          }
        },
        {
          principle: "Alignment",
          id: "ALIGN_02",
          severity: "low",
          condition: {
            metric: "floating_elements",
            operator: ">",
            value: 2
          },
          feedback: {
            title: "Floating Elements Detected",
            message_core: "Some elements feel disconnected from the layout.",
            explanation: "Floating elements reduce cohesion and clarity.",
            suggestion: "Group related elements together.",
            example_fix: "Place related text and icons within the same container."
          }
        }
      ],
      spacing: [
        {
          principle: "Spacing",
          id: "SPACE_01",
          severity: "high",
          condition: {
            metric: "spacing_consistency",
            operator: "<",
            value: 0.5
          },
          feedback: {
            title: "Inconsistent Spacing",
            message_core: "Spacing between elements is inconsistent.",
            explanation: "Consistent spacing creates rhythm and improves readability.",
            suggestion: "Apply uniform margins and padding throughout the layout.",
            example_fix: "Use an 8px or 16px spacing system."
          }
        },
        {
          principle: "Spacing",
          id: "SPACE_02",
          severity: "medium",
          condition: {
            metric: "content_density",
            operator: ">",
            value: 0.7
          },
          feedback: {
            title: "Crowded Layout",
            message_core: "The layout feels crowded with limited breathing space.",
            explanation: "White space helps separate content and improves focus.",
            suggestion: "Increase padding and margins between sections.",
            example_fix: "Add vertical spacing between text blocks."
          }
        }
      ],
      hierarchy: [
        {
          principle: "Hierarchy",
          id: "HIER_01",
          severity: "high",
          condition: {
            metric: "hierarchy_score",
            operator: "<",
            value: 0.5
          },
          feedback: {
            title: "Weak Visual Hierarchy",
            message_core: "The design lacks a clear focal point.",
            explanation: "Hierarchy helps users understand what to look at first.",
            suggestion: "Emphasize key elements using size or contrast.",
            example_fix: "Increase heading size or make call-to-action buttons more prominent."
          }
        }
      ],
      balance: [
        {
          principle: "Balance",
          id: "BAL_01",
          severity: "medium",
          condition: {
            metric: "visual_weight_difference",
            operator: ">",
            value: 0.4
          },
          feedback: {
            title: "Unbalanced Layout",
            message_core: "One side of the layout feels visually heavier.",
            explanation: "Balanced layouts feel more stable and pleasing.",
            suggestion: "Redistribute visual weight across the layout.",
            example_fix: "Add supporting elements to the lighter side."
          }
        }
      ],
      readability: [
        {
          principle: "Readability",
          id: "READ_01",
          severity: "high",
          condition: {
            metric: "average_font_size",
            operator: "<",
            value: 12
          },
          feedback: {
            title: "Text Too Small",
            message_core: "Text size is too small for comfortable reading.",
            explanation: "Readable text improves comprehension and accessibility.",
            suggestion: "Increase body text size and line height.",
            example_fix: "Use at least 14–16px for body text."
          }
        }
      ]
    };

    function getStatusLabel(score) {
      if (score >= 85) return "excellent";
      if (score >= 75) return "good";
      if (score >= 65) return "fair";
      return "poor";
    }

    function evaluateCondition(metricValue, operator, value) {
      const ops = {
        "<": metricValue < value,
        "<=": metricValue <= value,
        ">": metricValue > value,
        ">=": metricValue >= value,
        "=": metricValue === value
      };
      return ops[operator] || false;
    }

    function calculateConfidence(metricValue, threshold) {
      return Math.min(1, Math.abs(metricValue - threshold));
    }

    function getTriggeredFeedback(principle, detectionResult) {
      if (!feedbackBank[principle] || !detectionResult) return [];
      
      const rules = feedbackBank[principle];
      const triggered = [];
      
      rules.forEach(rule => {
        const metricValue = detectionResult[rule.condition.metric];
        const { operator, value } = rule.condition;
        
        const conditionMet = evaluateCondition(metricValue, operator, value);
        
        if (conditionMet) {
          const confidence = calculateConfidence(metricValue, value);
          
          triggered.push({
            id: rule.id,
            severity: rule.severity,
            title: rule.feedback.title,
            message: rule.feedback.message_core,
            explanation: rule.feedback.explanation,
            suggestion: rule.feedback.suggestion,
            example: rule.feedback.example_fix,
            confidence: confidence
          });
        }
      });
      
      return triggered;
    }

    function getFeedback(principle, score, detectionResult = null) {
      const status = getStatusLabel(score);
      const triggeredRules = getTriggeredFeedback(principle, detectionResult);
      
      const feedbackMessages = [];
      const suggestionMessages = [];
      
      if (triggeredRules.length > 0) {
        triggeredRules.forEach(rule => {
          feedbackMessages.push(rule.message);
          if (rule.explanation) {
            feedbackMessages.push(rule.explanation);
          }
          suggestionMessages.push(rule.suggestion);
          if (rule.example) {
            suggestionMessages.push(`Example: ${rule.example}`);
          }
        });
      } else {
        if (score >= 80) {
          feedbackMessages.push(`${principle.charAt(0).toUpperCase() + principle.slice(1)} is well-executed in this design.`);
          feedbackMessages.push("This aspect supports good user experience and visual clarity.");
        } else {
          feedbackMessages.push(`${principle.charAt(0).toUpperCase() + principle.slice(1)} is acceptable but has room for refinement.`);
          suggestionMessages.push("Consider minor improvements to enhance this aspect further.");
        }
      }
      
      return {
        feedback: feedbackMessages,
        suggestions: suggestionMessages,
        status: status,
        triggeredRules: triggeredRules
      };
    }

    function analyzeDesign(imageData, selectedPrinciples = {}) {
      return new Promise((resolve, reject) => {
        console.log('Starting analysis with principles:', selectedPrinciples);
        
        const img = new Image();
        
        img.onload = function() {
          console.log('Image loaded successfully. Dimensions:', img.width, 'x', img.height);
          
          try {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            
            if (!ctx) {
              console.error('Failed to get canvas context');
              reject(new Error('Could not get canvas context'));
              return;
            }
            
            console.log('Canvas context created, drawing image...');
            ctx.drawImage(img, 0, 0);
            
            console.log('Getting image data...');
            const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageDataObj.data;
            console.log('Image data extracted. Pixel array length:', pixels.length);
          
          const results = {};
          const scores = {};
          
          console.log('Running analysis on selected principles...');
          
          if (selectedPrinciples.contrast) {
            console.log('Analyzing contrast...');
            results.contrast = detectContrastAndColor(pixels, canvas.width, canvas.height);
            scores.contrast = results.contrast.score;
            console.log('Contrast score:', scores.contrast);
          }
          
          if (selectedPrinciples.alignment) {
            console.log('Analyzing alignment...');
            results.alignment = detectAlignment(pixels, canvas.width, canvas.height);
            scores.alignment = results.alignment.score;
            console.log('Alignment score:', scores.alignment);
          }
          
          if (selectedPrinciples.spacing) {
            console.log('Analyzing spacing...');
            results.spacing = detectSpacing(pixels, canvas.width, canvas.height);
            scores.spacing = results.spacing.score;
            console.log('Spacing score:', scores.spacing);
          }
          
          if (selectedPrinciples.hierarchy) {
            console.log('Analyzing hierarchy...');
            results.hierarchy = detectHierarchy(pixels, canvas.width, canvas.height);
            scores.hierarchy = results.hierarchy.score;
            console.log('Hierarchy score:', scores.hierarchy);
          }
          
          if (selectedPrinciples.balance) {
            console.log('Analyzing balance...');
            results.balance = detectBalance(pixels, canvas.width, canvas.height);
            scores.balance = results.balance.score;
            console.log('Balance score:', scores.balance);
          }
          
          if (selectedPrinciples.readability) {
            console.log('Analyzing readability...');
            results.readability = detectReadability(pixels, canvas.width, canvas.height);
            scores.readability = results.readability.score;
            console.log('Readability score:', scores.readability);
          }
          
          console.log('All analyses complete. Scores:', scores);

          const selectedScores = Object.values(scores);
          const overall = selectedScores.length > 0 
            ? Math.round(selectedScores.reduce((a, b) => a + b, 0) / selectedScores.length)
            : 0;

          const allFeedback = [];
          const allSuggestions = [];
          const principleDetails = [];

          const categories = [
            { key: 'contrast', label: 'Contrast & Color', icon: '🎨' },
            { key: 'balance', label: 'Balance', icon: '⚖️' },
            { key: 'alignment', label: 'Alignment', icon: '📐' },
            { key: 'hierarchy', label: 'Hierarchy', icon: '📊' },
            { key: 'spacing', label: 'Spacing', icon: '📏' },
            { key: 'readability', label: 'Readability', icon: '👁️' }

          ];

          categories.forEach(({ key, label, icon }) => {
            if (selectedPrinciples[key] && scores[key] !== undefined) {
              const score = scores[key];
              const feedback = getFeedback(key, score, results[key]);
              
              principleDetails.push({
                name: label,
                icon: icon,
                score: score,
                feedback: feedback.feedback,
                suggestions: feedback.suggestions
              });

              allFeedback.push(...feedback.feedback);
              if (score < 80) {
                allSuggestions.push(...feedback.suggestions);
              }
            }
          });

          const detailedAnalysis = JSON.stringify({
            contrast: scores.contrast || null,
            alignment: scores.alignment || null,
            spacing: scores.spacing || null,
            hierarchy: scores.hierarchy || null,
            balance: scores.balance || null,
            readability: scores.readability || null,
            selectedPrinciples: selectedPrinciples,
            principleDetails: principleDetails,
            allFeedback: allFeedback,
            allSuggestions: allSuggestions.length > 0 ? allSuggestions : ["Your design follows good design principles!", "Keep up the excellent work!", "The selected principles are well-executed."],
            detectedColors: results.contrast?.colors || [],
            colorCount: results.contrast?.colorCount || 0,
            contrastRatio: results.contrast?.ratio || 0,
            alignmentGrid: results.alignment?.hasGrid || false,
            whitespaceRatio: results.spacing?.ratio || 0,
            hierarchyLevels: results.hierarchy?.fontCount || 0,
            textDensity: results.readability?.textDensity || 0
          });

          resolve({
            overall_score: overall,
            analysis_result: detailedAnalysis
          });
          } catch (error) {
            console.error('Analysis error details:', error);
            console.error('Error stack:', error.stack);
            reject(new Error('Failed to analyze image: ' + error.message));
          }
        };
        
        img.onerror = function(event) {
          console.error('Image loading error event:', event);
          console.error('Failed image src:', img.src);
          reject(new Error('Failed to load image. The image may be corrupted or in an unsupported format.'));
        };
        
        img.crossOrigin = 'anonymous';
        console.log('Setting image source...');
        img.src = imageData;
      });
    }

    function simplifyColors(colors, tolerance = 20) {
      const simplified = [];

      colors.forEach(color => {
        const [r, g, b] = color.split(',').map(Number);

        const match = simplified.find(existing => {
          const [er, eg, eb] = existing;
          return (
            Math.abs(r - er) < tolerance &&
            Math.abs(g - eg) < tolerance &&
            Math.abs(b - eb) < tolerance
          );
        });

        if (!match) simplified.push([r, g, b]);
      });

      return simplified;
    }

    function filterMinorColors(colorFrequency, threshold = 0.03) {
      return Object.entries(colorFrequency)
        .filter(([_, count]) => count / totalPixels > threshold)
        .map(([color]) => color);
    }

    function analyzeColorVariety(imageData) {
      const pixels = imageData.data;
      const freq = {};
      let total = 0;

      for (let i = 0; i < pixels.length; i += 4) {
        const key = `${pixels[i]},${pixels[i+1]},${pixels[i+2]}`;
        freq[key] = (freq[key] || 0) + 1;
        total++;
      }

      const significantColors = Object.entries(freq)
        .filter(([_, count]) => count / total > 0.03)
        .map(([color]) => color);

      const clustered = simplifyColors(significantColors);

      return {
        dominant_color_count: clustered.length,
        color_variety:
          clustered.length <= 3 ? "low" :
          clustered.length <= 5 ? "moderate" :
          "high"
      };
    }

    function detectContrastAndColor(pixels, width, height) {
      const sampleRate = 30;
      let contrastSum = 0;
      let samples = 0;
      let lowContrastAreas = 0;
      
      const colorMap = new Map();
      const colorSampleRate = 50;
      
      for (let y = 0; y < height - 1; y += sampleRate) {
        for (let x = 0; x < width - 1; x += sampleRate) {
          const i = (y * width + x) * 4;
          const nextI = (y * width + (x + 1)) * 4;
          
          const lum1 = 0.2126 * pixels[i] + 0.7152 * pixels[i + 1] + 0.0722 * pixels[i + 2];
          const lum2 = 0.2126 * pixels[nextI] + 0.7152 * pixels[nextI + 1] + 0.0722 * pixels[nextI + 2];
          
          const contrast = Math.abs(lum1 - lum2);
          contrastSum += contrast;
          samples++;
          
          if (contrast < 40) lowContrastAreas++;
        }
      }
      
      for (let i = 0; i < pixels.length; i += colorSampleRate * 4) {
        const r = Math.round(pixels[i] / 51) * 51;
        const g = Math.round(pixels[i + 1] / 51) * 51;
        const b = Math.round(pixels[i + 2] / 51) * 51;
        
        const brightness = (r + g + b) / 3;
        if (brightness > 235 || brightness < 20) continue;
        
        const key = `${r},${g},${b}`;
        colorMap.set(key, (colorMap.get(key) || 0) + 1);
      }
      
      const avgContrast = contrastSum / samples;
      const lowContrastRatio = lowContrastAreas / samples;
      
      let contrastScore = Math.min(100, Math.round((avgContrast / 45) * 100));
      if (lowContrastRatio > 0.5) contrastScore = Math.max(contrastScore - 20, 50);
      
      const totalColorSamples = Array.from(colorMap.values()).reduce((a, b) => a + b, 0);
      const threshold = totalColorSamples * 0.02;
      
      const sortedColors = Array.from(colorMap.entries())
        .filter(([_, count]) => count >= threshold)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8);
      
      const colorCount = sortedColors.length;
      const colors = sortedColors.slice(0, 5).map(([rgb]) => rgb);
      
      let colorScore = 70;
      if (colorCount >= 3 && colorCount <= 6) colorScore = 95;
      else if (colorCount >= 7 && colorCount <= 10) colorScore = 85;
      else if (colorCount >= 2) colorScore = 80;
      
      const score = Math.round(contrastScore * 0.6 + colorScore * 0.4);
      
      const normalizedContrastScore = Math.min(contrastScore / 100, 1.0);
      
      return { 
        score, 
        ratio: avgContrast.toFixed(1),
        colors,
        colorCount,
        color_count: colorCount,
        contrast_score: normalizedContrastScore,
        contrastScore,
        colorScore
      };
    }

    function detectAlignment(pixels, width, height) {
      const edgeThreshold = 35;
      let verticalEdges = new Map();
      let horizontalEdges = new Map();
      
      for (let y = 0; y < height; y += 16) {
        for (let x = 0; x < width - 1; x += 4) {
          const i = (y * width + x) * 4;
          const nextI = (y * width + (x + 1)) * 4;
          const diff = Math.abs(pixels[i] - pixels[nextI]) + 
                       Math.abs(pixels[i + 1] - pixels[nextI + 1]) + 
                       Math.abs(pixels[i + 2] - pixels[nextI + 2]);
          
          if (diff > edgeThreshold * 3) {
            const xBucket = Math.floor(x / 20) * 20;
            verticalEdges.set(xBucket, (verticalEdges.get(xBucket) || 0) + 1);
          }
        }
      }
      
      for (let y = 0; y < height - 1; y += 4) {
        for (let x = 0; x < width; x += 16) {
          const i = (y * width + x) * 4;
          const nextI = ((y + 1) * width + x) * 4;
          const diff = Math.abs(pixels[i] - pixels[nextI]) + 
                       Math.abs(pixels[i + 1] - pixels[nextI + 1]) + 
                       Math.abs(pixels[i + 2] - pixels[nextI + 2]);
          
          if (diff > edgeThreshold * 3) {
            const yBucket = Math.floor(y / 20) * 20;
            horizontalEdges.set(yBucket, (horizontalEdges.get(yBucket) || 0) + 1);
          }
        }
      }
      
      const strongVerticals = Array.from(verticalEdges.values()).filter(v => v > 15).length;
      const strongHorizontals = Array.from(horizontalEdges.values()).filter(v => v > 15).length;
      
      const hasGrid = strongVerticals >= 2 || strongHorizontals >= 2;
      const alignmentScore = Math.min(100, (strongVerticals + strongHorizontals) * 15 + 40);
      
      let score = alignmentScore;
      if (!hasGrid) score = Math.max(score - 15, 60);
      
      const alignment_score = score / 100;
      const floating_elements = hasGrid ? 1 : 3;
      
      return { score, hasGrid, alignment_score, floating_elements };
    }

    function detectSpacing(pixels, width, height) {
      const sampleRate = 24;
      let whitePixels = 0;
      let darkPixels = 0;
      let totalPixels = 0;
      let clusterSize = 0;
      let clusterCount = 0;
      let inCluster = false;
      
      for (let i = 0; i < pixels.length; i += sampleRate * 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const brightness = (r + g + b) / 3;
        
        totalPixels++;
        
        if (brightness > 220) {
          whitePixels++;
          if (inCluster) {
            clusterSize++;
          } else {
            inCluster = true;
            clusterSize = 1;
          }
        } else if (brightness < 80) {
          darkPixels++;
          if (inCluster && clusterSize > 5) {
            clusterCount++;
          }
          inCluster = false;
        } else {
          if (inCluster && clusterSize > 5) {
            clusterCount++;
          }
          inCluster = false;
        }
      }
      
      const whiteSpaceRatio = whitePixels / totalPixels;
      const hasGoodClusters = clusterCount >= 3;
      
      let score = 70;
      if (whiteSpaceRatio >= 0.25 && whiteSpaceRatio <= 0.55) score += 20;
      if (hasGoodClusters) score += 10;
      
      const spacing_consistency = whiteSpaceRatio;
      const content_density = 1 - whiteSpaceRatio;
      
      return { score, ratio: (whiteSpaceRatio * 100).toFixed(1), spacing_consistency, content_density };
    }

    function detectHierarchy(pixels, width, height) {
      const textRegions = findTextRegions(pixels, width, height);
      
      const sizeGroups = [];
      
      textRegions.forEach(region => {
        const signature = analyzeTextSignature(pixels, width, height, region);
        
        let foundMatch = false;
        for (let existing of sizeGroups) {
          if (Math.abs(existing.avgSize - signature.avgSize) < 4) {
            existing.count++;
            foundMatch = true;
            break;
          }
        }
        
        if (!foundMatch) {
          sizeGroups.push({ ...signature, count: 1 });
        }
      });
      
      sizeGroups.sort((a, b) => b.avgSize - a.avgSize);
      const hierarchyLevels = sizeGroups.length;
      
      let score = 70;
      
      if (hierarchyLevels >= 3 && hierarchyLevels <= 4) {
        score = 95;
      } else if (hierarchyLevels === 2) {
        score = 80;
      } else if (hierarchyLevels === 5) {
        score = 85;
      } else if (hierarchyLevels >= 6) {
        score = 70;
      } else if (hierarchyLevels === 1) {
        score = 65;
      }
      
      if (hierarchyLevels >= 2) {
        const largestSize = sizeGroups[0].avgSize;
        const smallestSize = sizeGroups[hierarchyLevels - 1].avgSize;
        const sizeRatio = largestSize / smallestSize;
        
        if (sizeRatio >= 1.8) score += 5;
        else if (sizeRatio < 1.3) score -= 10;
      }
      
      const hierarchy_score = score / 100;
      
      return { 
        score, 
        fontCount: hierarchyLevels,
        fontDetails: sizeGroups,
        hierarchy_score
      };
    }
    
    function findTextRegions(pixels, width, height) {
      const regions = [];
      const gridSize = 60;
      
      for (let gy = 0; gy < height; gy += gridSize) {
        for (let gx = 0; gx < width; gx += gridSize) {
          const region = {
            x: gx,
            y: gy,
            w: Math.min(gridSize, width - gx),
            h: Math.min(gridSize, height - gy)
          };
          
          const edgeDensity = calculateEdgeDensity(pixels, width, height, region);
          if (edgeDensity > 0.15) {
            regions.push(region);
          }
        }
      }
      
      return regions;
    }
    
    function calculateEdgeDensity(pixels, width, height, region) {
      let edges = 0;
      let total = 0;
      
      for (let y = region.y; y < region.y + region.h - 1; y += 4) {
        for (let x = region.x; x < region.x + region.w - 1; x += 4) {
          const i = (y * width + x) * 4;
          const nextI = (y * width + (x + 1)) * 4;
          
          const diff = Math.abs(pixels[i] - pixels[nextI]) + 
                       Math.abs(pixels[i + 1] - pixels[nextI + 1]) + 
                       Math.abs(pixels[i + 2] - pixels[nextI + 2]);
          
          if (diff > 60) edges++;
          total++;
        }
      }
      
      return total > 0 ? edges / total : 0;
    }
    
    function analyzeTextSignature(pixels, width, height, region) {
      let strokeWidth = 0;
      let strokeCount = 0;
      let avgBrightness = 0;
      let brightnessCount = 0;
      let verticalStrokes = 0;
      let horizontalStrokes = 0;
      
      for (let y = region.y; y < region.y + region.h - 1; y += 4) {
        for (let x = region.x; x < region.x + region.w - 1; x += 4) {
          const i = (y * width + x) * 4;
          const brightness = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
          
          avgBrightness += brightness;
          brightnessCount++;
          
          if (brightness < 128) {
            strokeCount++;
            
            let hContinuity = 0;
            for (let dx = 1; dx < 5 && x + dx < region.x + region.w; dx++) {
              const nextI = (y * width + (x + dx)) * 4;
              const nextBrightness = (pixels[nextI] + pixels[nextI + 1] + pixels[nextI + 2]) / 3;
              if (nextBrightness < 128) hContinuity++;
              else break;
            }
            if (hContinuity > 1) horizontalStrokes++;
            
            let vContinuity = 0;
            for (let dy = 1; dy < 5 && y + dy < region.y + region.h; dy++) {
              const nextI = ((y + dy) * width + x) * 4;
              const nextBrightness = (pixels[nextI] + pixels[nextI + 1] + pixels[nextI + 2]) / 3;
              if (nextBrightness < 128) vContinuity++;
              else break;
            }
            if (vContinuity > 1) verticalStrokes++;
          }
        }
      }
      
      avgBrightness = brightnessCount > 0 ? avgBrightness / brightnessCount : 128;
      const strokeDensity = strokeCount / (region.w * region.h / 4);
      const strokeRatio = horizontalStrokes > 0 ? verticalStrokes / horizontalStrokes : 1;
      
      const estimatedSize = strokeDensity > 0.3 ? 'large' : strokeDensity > 0.15 ? 'medium' : 'small';
      
      return {
        strokeDensity: strokeDensity,
        strokeRatio: strokeRatio,
        avgBrightness: avgBrightness,
        avgSize: estimatedSize === 'large' ? 24 : estimatedSize === 'medium' ? 16 : 12,
        region: region
      };
    }

    function detectBalance(pixels, width, height) {
      let leftWeight = 0;
      let rightWeight = 0;
      let topWeight = 0;
      let bottomWeight = 0;
      const midX = width / 2;
      const midY = height / 2;
      
      for (let y = 0; y < height; y += 20) {
        for (let x = 0; x < width; x += 20) {
          const i = (y * width + x) * 4;
          const weight = 255 - ((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
          
          if (x < midX) leftWeight += weight;
          else rightWeight += weight;
          
          if (y < midY) topWeight += weight;
          else bottomWeight += weight;
        }
      }
      
      const horizontalRatio = Math.min(leftWeight, rightWeight) / Math.max(leftWeight, rightWeight);
      const verticalRatio = Math.min(topWeight, bottomWeight) / Math.max(topWeight, bottomWeight);
      
      const score = Math.round(((horizontalRatio + verticalRatio) / 2) * 100);
      
      const visual_weight_difference = 1 - ((horizontalRatio + verticalRatio) / 2);
      
      return { score, visual_weight_difference };
    }

    function detectReadability(pixels, width, height) {
      const textRegions = findTextRegions(pixels, width, height);
      
      let totalTextPixels = 0;
      let totalLineSpacing = 0;
      let lineCount = 0;
      let tooSmallRegions = 0;
      
      textRegions.forEach(region => {
        totalTextPixels += region.w * region.h;
        
        const signature = analyzeTextSignature(pixels, width, height, region);
        
        if (signature.avgSize < 12) tooSmallRegions++;
        
        if (region.h > 10) {
          lineCount++;
          totalLineSpacing += region.h;
        }
      });
      
      const textDensity = totalTextPixels / (width * height);
      const avgLineHeight = lineCount > 0 ? totalLineSpacing / lineCount : 0;
      const smallTextRatio = textRegions.length > 0 ? tooSmallRegions / textRegions.length : 0;
      
      let score = 75;
      
      if (textDensity >= 0.2 && textDensity <= 0.5) {
        score += 10;
      } else if (textDensity > 0.6) {
        score -= 15;
      } else if (textDensity < 0.1) {
        score -= 5;
      }
      
      if (avgLineHeight >= 14 && avgLineHeight <= 30) {
        score += 10;
      } else if (avgLineHeight < 10) {
        score -= 15;
      }
      
      if (smallTextRatio > 0.4) {
        score -= 15;
      } else if (smallTextRatio < 0.2) {
        score += 5;
      }
      
      score = Math.max(50, Math.min(100, score));
      
      const average_font_size = avgLineHeight > 0 ? avgLineHeight / 1.5 : 12;
      
      return {
        score,
        textDensity: (textDensity * 100).toFixed(1),
        average_font_size
      };
    }

    async function onConfigChange(config) {
      const headingFontStack = 'Poppins, system-ui, -apple-system, sans-serif';
      const bodyFontStack = 'Roboto, system-ui, -apple-system, sans-serif';
      const app = document.getElementById('app');
      
      const backgroundColor = config.background_color || defaultConfig.background_color;
      const textColor = config.text_color || defaultConfig.text_color;
      const fontFamily = config.font_family || defaultConfig.font_family;

      app.style.backgroundColor = backgroundColor;
      app.style.color = textColor;
      app.style.fontFamily = `${fontFamily}, ${bodyFontStack}`;

      if (currentPage === 'landing') {
        renderLandingPage(config, headingFontStack, bodyFontStack);
      } else if (currentPage === 'main') {
        renderMainPage(config, headingFontStack, bodyFontStack);
      } else if (currentPage === 'results') {
        renderResultsPage(config, headingFontStack, bodyFontStack);
      }

      attachEventListeners();
    }

    function renderLandingPage(config, headingFontStack, bodyFontStack) {
      const backgroundColor = config.background_color || defaultConfig.background_color;
      const textColor = config.text_color || defaultConfig.text_color;
      const primaryAction = "#72BD55";
      const fontFamily = config.font_family || defaultConfig.font_family;
      const fontSize = config.font_size || defaultConfig.font_size;
      const logoUrl = config.logo_url || defaultConfig.logo_url;

      const app = document.getElementById('app');
      app.innerHTML = `
        <div class="flex-1 flex items-center justify-center p-6 md:p-8">
          <div class="max-w-3xl mx-auto text-center">
            <div class="flex items-center justify-center mb-8">
              <img src="${logoUrl}" alt="Logo" class="logo-img" loading="lazy" onerror="this.style.display='none';">
            </div>
            
            <h1 class="font-bold mb-6" style="font-size: ${fontSize * 2.5}px; color: ${textColor}; font-family: ${fontFamily}, ${headingFontStack}; line-height: 1.2;">
              Improve Your Design with AI-Powered Feedback
            </h1>
            
            <p class="mb-8 opacity-90" style="font-size: ${fontSize * 1.25}px; color: ${textColor}; font-family: ${fontFamily}, ${bodyFontStack}; line-height: 1.6; max-width: 600px; margin-left: auto; margin-right: auto;">
              DesignLens helps students improve their visual layouts by analysing design based on core design principles and providing constructive feedback.
            </p>
            
            <button id="getStartedButton" class="px-8 py-4 rounded-lg font-bold transition-all hover:opacity-80 hover:transform hover:scale-105" style="background-color: ${primaryAction}; color: white; font-size: ${fontSize * 1.25}px; font-family: ${fontFamily}, ${bodyFontStack}; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              Let's Get Started
            </button>
          </div>
        </div>
      `;
    }

    function renderMainPage(config, headingFontStack, bodyFontStack) {
      const backgroundColor = config.background_color || defaultConfig.background_color;
      const surfaceColor = config.surface_color || defaultConfig.surface_color;
      const textColor = config.text_color || defaultConfig.text_color;
      const primaryAction = "#72BD55";
      const secondaryAction = "#72BD55";
      const fontFamily = config.font_family || defaultConfig.font_family;
      const fontSize = config.font_size || defaultConfig.font_size;
      const logoUrl = config.logo_url || defaultConfig.logo_url;
      const appTitle = config.app_title || defaultConfig.app_title;
      const uploadButtonText = config.upload_button_text || defaultConfig.upload_button_text;
      const footerText = config.footer_text || defaultConfig.footer_text;

      const app = document.getElementById('app');
      app.innerHTML = `
        <div class="flex-1 p-6 md:p-8">
          <header class="text-center mb-8">
            <div class="flex items-center justify-center">
              <img src="${logoUrl}" alt="Logo" class="logo-img" loading="lazy" onerror="this.style.display='none';">
            </div>
            <p class="opacity-80" style="font-size: ${fontSize}px; color: ${textColor}; font-family: ${fontFamily}, ${bodyFontStack};">Upload your design for automatic analysis</p>
          </header>

          <div class="max-w-4xl mx-auto">
            <input type="file" id="fileInput" accept="image/*" style="display: none;">
            
            <div id="uploadSection">
              <div class="rounded-xl p-6 mb-6" style="background-color: ${surfaceColor};">
                <h3 class="font-bold mb-4" style="font-size: ${fontSize * 1.25}px; color: ${textColor}; font-family: ${fontFamily}, ${headingFontStack};">Select Design Principles to Check</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label class="principle-card flex items-center gap-3 p-3 rounded-lg cursor-pointer" style="background-color: ${backgroundColor};">
                    <input type="checkbox" id="check_contrast" class="principle-checkbox w-5 h-5 cursor-pointer" style="accent-color: ${primaryAction};">
                    <div>
                      <span style="font-size: ${fontSize * 1.25}px;">🎨</span>
                      <span class="font-medium ml-2" style="font-size: ${fontSize}px; color: ${textColor}; font-family: ${fontFamily}, ${bodyFontStack};">Contrast & Colour</span>
                    </div>
                  </label>
                  <label class="principle-card flex items-center gap-3 p-3 rounded-lg cursor-pointer" style="background-color: ${backgroundColor};">
                    <input type="checkbox" id="check_balance" class="principle-checkbox w-5 h-5 cursor-pointer" style="accent-color: ${primaryAction};">
                    <div>
                      <span style="font-size: ${fontSize * 1.25}px;">⚖️</span>
                      <span class="font-medium ml-2" style="font-size: ${fontSize}px; color: ${textColor}; font-family: ${fontFamily}, ${bodyFontStack};">Balance</span>
                    </div>
                  </label>
                  <label class="principle-card flex items-center gap-3 p-3 rounded-lg cursor-pointer" style="background-color: ${backgroundColor};">
                    <input type="checkbox" id="check_alignment" class="principle-checkbox w-5 h-5 cursor-pointer" style="accent-color: ${primaryAction};">
                    <div>
                      <span style="font-size: ${fontSize * 1.25}px;">📐</span>
                      <span class="font-medium ml-2" style="font-size: ${fontSize}px; color: ${textColor}; font-family: ${fontFamily}, ${bodyFontStack};">Alignment</span>
                    </div>
                  </label>
                  <label class="principle-card flex items-center gap-3 p-3 rounded-lg cursor-pointer" style="background-color: ${backgroundColor};">
                    <input type="checkbox" id="check_hierarchy" class="principle-checkbox w-5 h-5 cursor-pointer" style="accent-color: ${primaryAction};">
                    <div>
                      <span style="font-size: ${fontSize * 1.25}px;">📊</span>
                      <span class="font-medium ml-2" style="font-size: ${fontSize}px; color: ${textColor}; font-family: ${fontFamily}, ${bodyFontStack};">Hierarchy</span>
                    </div>
                  </label>
                  <label class="principle-card flex items-center gap-3 p-3 rounded-lg cursor-pointer" style="background-color: ${backgroundColor};">
                    <input type="checkbox" id="check_spacing" class="principle-checkbox w-5 h-5 cursor-pointer" style="accent-color: ${primaryAction};">
                    <div>
                      <span style="font-size: ${fontSize * 1.25}px;">📏</span>
                      <span class="font-medium ml-2" style="font-size: ${fontSize}px; color: ${textColor}; font-family: ${fontFamily}, ${bodyFontStack};">Spacing</span>
                    </div>
                  </label>
                  <label class="principle-card flex items-center gap-3 p-3 rounded-lg cursor-pointer" style="background-color: ${backgroundColor};">
                    <input type="checkbox" id="check_readability" class="principle-checkbox w-5 h-5 cursor-pointer" style="accent-color: ${primaryAction};">
                    <div>
                      <span style="font-size: ${fontSize * 1.25}px;">👁️</span>
                      <span class="font-medium ml-2" style="font-size: ${fontSize}px; color: ${textColor}; font-family: ${fontFamily}, ${bodyFontStack};">Readability</span>
                    </div>
                  </label>
                </div>
                <div class="mt-4 text-center">
                  <button id="resetButton" class="px-6 py-2 rounded-lg font-medium transition-all hover:opacity-80" style="background-color: ${primaryAction}; color: white; font-size: ${fontSize}px; font-family: ${fontFamily}, ${bodyFontStack};">Reset Selection</button>
                </div>
              </div>

              <button id="uploadButton" class="upload-area rounded-xl p-12 text-center cursor-pointer w-full" style="background-color: ${surfaceColor}; border-color: ${primaryAction};">
                <svg class="mx-auto mb-4" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="${primaryAction}" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <p class="mb-2 font-semibold" style="font-size: ${fontSize * 1.25}px; color: ${textColor}; font-family: ${fontFamily}, ${headingFontStack};">${uploadButtonText}</p>
                <p class="text-sm opacity-70" style="font-size: ${fontSize * 0.875}px; color: ${textColor}; font-family: ${fontFamily}, ${bodyFontStack};">Supports PNG, JPG, GIF</p>
              </button>
            </div>

            <div id="previewSection" style="display: none;" class="mb-6">
              <div class="rounded-xl p-6" style="background-color: ${surfaceColor};">
                <h3 class="font-bold mb-4" style="font-size: ${fontSize * 1.25}px; color: ${textColor}; font-family: ${fontFamily}, ${headingFontStack};">Preview Design</h3>
                <img id="previewImage" src="" alt="Preview" loading="lazy" class="w-full rounded-lg mb-4" style="max-height: 400px; object-fit: contain;" onerror="console.error('Image failed to load:', this.src); this.style.background='#e5e7eb'; this.alt='Image unavailable';">
                <div class="text-center">
                  <button id="startAnalysisButton" class="px-8 py-3 rounded-lg font-bold transition-all hover:opacity-80" style="background-color: ${primaryAction}; color: white; font-size: ${fontSize * 1.125}px; font-family: ${fontFamily}, ${bodyFontStack};">Start Analysis</button>
                </div>
              </div>
            </div>

            <div id="loadingSection" style="display: none;" class="mb-6">
              <div class="rounded-xl p-8 text-center" style="background-color: ${surfaceColor};">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solid mb-4" style="border-color: ${primaryAction}; border-top-color: transparent;"></div>
                <p class="font-semibold" style="font-size: ${fontSize}px; color: ${textColor}; font-family: ${fontFamily}, ${bodyFontStack};">Analysing your design...</p>
              </div>
            </div>
          </div>
        </div>

        <footer class="p-6 text-center border-t" style="border-color: ${secondaryAction}40;">
          <p class="text-sm opacity-70" style="font-size: ${fontSize * 0.875}px; color: ${textColor}; font-family: ${fontFamily}, ${bodyFontStack};">${footerText}</p>
        </footer>
      `;
    }

    function renderResultsPage(config, headingFontStack, bodyFontStack) {
      if (!currentResultData) return;

      const backgroundColor = config.background_color || defaultConfig.background_color;
      const surfaceColor = config.surface_color || defaultConfig.surface_color;
      const textColor = config.text_color || defaultConfig.text_color;
      const primaryAction = "#72BD55";
      const secondaryAction = "#72BD55";
      const fontFamily = config.font_family || defaultConfig.font_family;
      const fontSize = config.font_size || defaultConfig.font_size;

      const app = document.getElementById('app');

      const score = currentResultData.overall_score;
      const circumference = 2 * Math.PI * 45;
      const offset = circumference - (score / 100) * circumference;

      let scoreColor = primaryAction;
      if (score >= 85) scoreColor = '#10b981';
      else if (score >= 75) scoreColor = '#f59e0b';
      else scoreColor = '#ef4444';

      const imageHTML = currentResultImage ? `
        <div class="mb-6">
          <img src="${currentResultImage}" alt="${currentResultData.design_name}" loading="lazy" class="w-full rounded-lg" style="max-height: 400px; object-fit: contain; background-color: ${surfaceColor};" onerror="console.error('Image failed to load:', this.src); this.style.background='#e5e7eb'; this.alt='Image unavailable';">
        </div>
      ` : '';

      app.innerHTML = `
        <div class="flex-1 p-6 md:p-8">
          <div class="max-w-4xl mx-auto">
            <div class="mb-6 text-center">
              <img src="${config.logo_url || defaultConfig.logo_url}" alt="Logo" class="logo-img mx-auto" loading="lazy" onerror="this.style.display='none';">
            </div>

            <div id="analysisReport" class="result-card rounded-xl p-6 mb-6" style="background-color: ${surfaceColor};">
              <h3 class="font-bold mb-4" style="font-size: ${fontSize * 1.5}px; color: ${textColor}; font-family: ${fontFamily}, ${headingFontStack};">${currentResultData.design_name}</h3>
                  
                ${imageHTML}

                <div class="flex items-center gap-6 mb-6">
                  <div class="relative">
                    <svg width="120" height="120" class="transform -rotate-90">
                      <circle cx="60" cy="60" r="45" stroke="#e5e7eb" stroke-width="10" fill="none"/>
                      <circle cx="60" cy="60" r="45" stroke="${scoreColor}" stroke-width="10" fill="none" 
                              stroke-dasharray="${circumference}" 
                              stroke-dashoffset="${offset}"/>
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center">
                      <span class="font-bold" style="font-size: ${fontSize * 2}px; color: ${scoreColor}; font-family: ${fontFamily}, ${bodyFontStack};">${score}</span>
                    </div>
                  </div>
                  <div>
                    <p class="font-semibold mb-1" style="font-size: ${fontSize * 1.125}px; color: ${textColor}; font-family: ${fontFamily}, ${headingFontStack};">Overall Score</p>
                    <p class="text-sm opacity-70" style="font-size: ${fontSize * 0.875}px; color: ${textColor}; font-family: ${fontFamily}, ${bodyFontStack};">out of 100 points</p>
                  </div>
                </div>

                <div>
                  ${renderAnalysisCards(currentResultData.analysis_result, config, headingFontStack, bodyFontStack)}
                </div>
            </div>

            <div class="mb-6 text-center flex flex-wrap gap-3 justify-center">
              <button id="printResultButton" class="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-80" style="background-color: ${primaryAction}; color: white; font-size: ${fontSize}px; font-family: ${fontFamily}, ${bodyFontStack};">
                Print Result
              </button>
              <button id="backToMainButton" class="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-80" style="background-color: ${secondaryAction}; color: white; font-size: ${fontSize}px; font-family: ${fontFamily}, ${bodyFontStack};">
                Start Another Analysis
              </button>
            </div>
          </div>
        </div>
      `;
    }

    function attachEventListeners() {
      const fileInput = document.getElementById('fileInput');
      const uploadButton = document.getElementById('uploadButton');
      const resetButton = document.getElementById('resetButton');
      const startAnalysisButton = document.getElementById('startAnalysisButton');
      const backToMainButton = document.getElementById('backToMainButton');
      const getStartedButton = document.getElementById('getStartedButton');
      const printResultButton = document.getElementById('printResultButton');

      if (getStartedButton) {
        getStartedButton.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          navigateToUpload();
        };
      }

      if (printResultButton) {
        printResultButton.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          printAnalysis();
        };
      }

      if (backToMainButton) {
        backToMainButton.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          navigateToUpload();
        };
      }

      if (resetButton) {
        resetButton.onclick = function() {
          document.querySelectorAll('.principle-checkbox').forEach(checkbox => {
            checkbox.checked = false;
          });
        };
      }

      if (startAnalysisButton) {
        startAnalysisButton.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          startAnalysis();
        };
      }

      if (uploadButton && fileInput) {
        const newUploadButton = uploadButton.cloneNode(true);
        uploadButton.parentNode.replaceChild(newUploadButton, uploadButton);
        
        const newFileInput = document.getElementById('fileInput');

        newUploadButton.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          newFileInput.click();
        };

        newFileInput.onchange = function(e) {
          const files = e.target.files;
          
          if (files && files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
              handleFile(file);
            } else {
              showInlineMessage('Please select an image file (PNG, JPG, or GIF).');
            }
          }
        };

        newUploadButton.ondragover = function(e) {
          e.preventDefault();
          e.stopPropagation();
          newUploadButton.classList.add('dragover');
        };

        newUploadButton.ondragleave = function(e) {
          e.preventDefault();
          e.stopPropagation();
          newUploadButton.classList.remove('dragover');
        };

        newUploadButton.ondrop = function(e) {
          e.preventDefault();
          e.stopPropagation();
          newUploadButton.classList.remove('dragover');
          
          const files = e.dataTransfer.files;
          if (files && files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
              handleFile(file);
            } else {
              showInlineMessage('Please select an image file (PNG, JPG, or GIF)');
            }
          }
        };
      }
    }

    let currentImagePreview = null;
    let currentFileName = null;

    function getSelectedPrinciples() {
      return {
        contrast: document.getElementById('check_contrast')?.checked || false,
        balance: document.getElementById('check_balance')?.checked || false,
        alignment: document.getElementById('check_alignment')?.checked || false,
        hierarchy: document.getElementById('check_hierarchy')?.checked || false,
        spacing: document.getElementById('check_spacing')?.checked || false,
        readability: document.getElementById('check_readability')?.checked || false
      };
    }

    async function handleFile(file) {
      if (isProcessing) return;
      
      if (!file.type.startsWith('image/')) {
        showInlineMessage('Please select an image file (PNG, JPG, or GIF).');
        return;
      }

      const selectedPrinciples = getSelectedPrinciples();
      const hasSelection = Object.values(selectedPrinciples).some(v => v);
      
      if (!hasSelection) {
        showInlineMessage('Please select at least one design principle to check.');
        return;
      }

      const reader = new FileReader();
      
      reader.onload = (e) => {
        currentImagePreview = e.target.result;
        currentFileName = file.name;
        
        document.getElementById('uploadSection').style.display = 'none';
        
        const previewSection = document.getElementById('previewSection');
        const previewImage = document.getElementById('previewImage');
        
        previewImage.src = currentImagePreview;
        previewSection.style.display = 'block';
        
        previewSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        document.getElementById('fileInput').value = '';
      };

      reader.onerror = () => {
        showInlineMessage('Error reading file. Please try again.');
      };

      reader.readAsDataURL(file);
    }

    async function startAnalysis() {
      console.log('startAnalysis called');
      console.log('isProcessing:', isProcessing);
      console.log('currentImagePreview exists:', !!currentImagePreview);
      
      if (isProcessing || !currentImagePreview) {
        console.log('Stopping - already processing or no image');
        return;
      }

      const selectedPrinciples = getSelectedPrinciples();
      console.log('Selected principles:', selectedPrinciples);
      const hasSelection = Object.values(selectedPrinciples).some(v => v);
      
      if (!hasSelection) {
        console.log('No principles selected');
        showInlineMessage('Please select at least one design principle to check.');
        return;
      }

      console.log('Starting analysis process...');
      isProcessing = true;
      document.getElementById('previewSection').style.display = 'none';
      document.getElementById('loadingSection').style.display = 'block';

      try {
        console.log('Calling analyzeDesign...');
        const analysis = await analyzeDesign(currentImagePreview, selectedPrinciples);
        console.log('Analysis complete:', analysis);
        
        const analysisData = {
          design_name: currentFileName || 'design.png',
          analysis_result: analysis.analysis_result,
          overall_score: analysis.overall_score
        };
        
        console.log('Navigating to results...');
        navigateToResults(analysisData, currentImagePreview);
      } catch (error) {
        console.error('Analysis error:', error);
        console.error('Error type:', error.constructor.name);
        console.error('Error message:', error.message);
        showInlineMessage('Error processing image: ' + error.message + '. Please check the console for details.');
        document.getElementById('loadingSection').style.display = 'none';
        document.getElementById('uploadSection').style.display = 'block';
      } finally {
        console.log('Analysis process finished');
        isProcessing = false;
        currentImagePreview = null;
        currentFileName = null;
      }
    }

    function showInlineMessage(message) {
      const config = window.elementSdk?.config || defaultConfig;
      const app = document.getElementById('app');
      
      if (!app) return;
      
      const messageDiv = document.createElement('div');
      messageDiv.className = 'rounded-xl p-4 mb-4 text-center';
      messageDiv.style.backgroundColor = config.surface_color || defaultConfig.surface_color;
      messageDiv.style.border = `2px solid ${config.primary_action || defaultConfig.primary_action}`;
      messageDiv.style.position = 'fixed';
      messageDiv.style.top = '20px';
      messageDiv.style.left = '50%';
      messageDiv.style.transform = 'translateX(-50%)';
      messageDiv.style.zIndex = '1000';
      messageDiv.style.maxWidth = '90%';
      messageDiv.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      messageDiv.innerHTML = `<p style="font-size: ${config.font_size || defaultConfig.font_size}px; color: ${config.text_color || defaultConfig.text_color}; font-family: ${config.font_family || defaultConfig.font_family}, Roboto, system-ui, sans-serif;">${message}</p>`;
      
      document.body.appendChild(messageDiv);
      
      setTimeout(() => {
        messageDiv.remove();
      }, 4000);
    }

    function navigateToUpload() {
      currentPage = 'main';
      onConfigChange(window.elementSdk?.config || defaultConfig);
    }

    function navigateToMain() {
      currentPage = 'landing';
      currentResultData = null;
      currentResultImage = null;
      onConfigChange(window.elementSdk?.config || defaultConfig);
    }

    function navigateToResults(resultData, imagePreview) {
      currentPage = 'results';
      currentResultData = resultData;
      currentResultImage = imagePreview;
      onConfigChange(window.elementSdk?.config || defaultConfig);
    }

    function renderAnalysisCards(analysisResultString, config, headingFontStack, bodyFontStack) {
      let analysis;
      try {
        analysis = JSON.parse(analysisResultString);
      } catch (e) {
        return `<p>Error parsing analysis data</p>`;
      }

      const backgroundColor = config.background_color || defaultConfig.background_color;
      const textColor = config.text_color || defaultConfig.text_color;
      const fontSize = config.font_size || defaultConfig.font_size;
      const fontFamily = config.font_family || defaultConfig.font_family;

      const categories = [
        { key: 'contrast', label: 'Contrast & Color', icon: '🎨' },
        { key: 'balance', label: 'Balance', icon: '⚖️' },
        { key: 'alignment', label: 'Alignment', icon: '📐' },
        { key: 'hierarchy', label: 'Hierarchy', icon: '📊' },
        { key: 'spacing', label: 'Spacing', icon: '📏' },
        { key: 'readability', label: 'Readability', icon: '👁️' }
      ];

      const selectedCategories = categories.filter(cat => analysis[cat.key] !== null && analysis[cat.key] !== undefined);

      const cardsHTML = selectedCategories.map(cat => {
        const score = analysis[cat.key];
        const percentage = score;
        
        let statusColor = '#10b981';
        let statusText = 'Good';
        if (score < 70) {
          statusColor = '#ef4444';
          statusText = 'Need Work';
        } else if (score < 85) {
          statusColor = '#f59e0b';
          statusText = 'Fair';
        }

        return `
          <div class="rounded-lg p-4" style="background-color: ${backgroundColor};">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <span style="font-size: ${fontSize * 1.5}px;">${cat.icon}</span>
                <span class="font-semibold" style="font-size: ${fontSize}px; color: ${textColor}; font-family: ${fontFamily}, ${headingFontStack};">${cat.label}</span>
              </div>
              <span class="font-bold" style="font-size: ${fontSize * 1.125}px; color: ${statusColor}; font-family: ${fontFamily}, ${headingFontStack};">${score}</span>
            </div>
            <div class="w-full rounded-full h-2" style="background-color: #e5e7eb;">
              <div class="h-2 rounded-full transition-all" style="width: ${percentage}%; background-color: ${statusColor};"></div>
            </div>
            <p class="text-sm mt-2" style="font-size: ${fontSize * 0.875}px; color: ${statusColor}; font-family: ${fontFamily}, ${bodyFontStack}; font-weight: 600;">${statusText}</p>
          </div>
        `;
      }).join('');

      const detectionDetailsHTML = `
        ${(analysis.colorCount !== undefined || analysis.hierarchyLevels !== undefined || analysis.textDensity !== undefined) ? `
        <div class="mt-6 rounded-lg p-4" style="background-color: ${backgroundColor};">
          <h4 class="font-bold mb-3" style="font-size: ${fontSize * 1.125}px; color: ${textColor}; font-family: ${fontFamily}, ${headingFontStack};">Detected Elements</h4>
          <div class="grid grid-cols-2 gap-3">
            ${analysis.hierarchyLevels !== undefined ? `
              <div class="p-2 rounded" style="background-color: ${config.surface_color || defaultConfig.surface_color};">
                <p class="text-sm opacity-70 mb-1" style="font-size: ${fontSize * 0.875}px; color: ${textColor}; font-family: ${fontFamily}, ${bodyFontStack};">Hierarchy Levels</p>
                <p class="font-bold" style="font-size: ${fontSize * 1.25}px; color: ${textColor}; font-family: ${fontFamily}, ${headingFontStack};">${analysis.hierarchyLevels} ${analysis.hierarchyLevels === 1 ? 'Level' : 'Levels'}</p>
              </div>
            ` : ''}
            ${analysis.colorCount !== undefined ? `
              <div class="p-2 rounded" style="background-color: ${config.surface_color || defaultConfig.surface_color};">
                <p class="text-sm opacity-70 mb-1" style="font-size: ${fontSize * 0.875}px; color: ${textColor}; font-family: ${fontFamily}, ${bodyFontStack};">Colours Used</p>
                <p class="font-bold" style="font-size: ${fontSize * 1.25}px; color: ${textColor}; font-family: ${fontFamily}, ${headingFontStack};">${analysis.colorCount} ${analysis.colorCount === 1 ? 'Colour' : 'Colours'}</p>
              </div>
            ` : ''}
            ${analysis.textDensity !== undefined ? `
              <div class="p-2 rounded" style="background-color: ${config.surface_color || defaultConfig.surface_color};">
                <p class="text-sm opacity-70 mb-1" style="font-size: ${fontSize * 0.875}px; color: ${textColor}; font-family: ${fontFamily}, ${bodyFontStack};">Text Density</p>
                <p class="font-bold" style="font-size: ${fontSize * 1.25}px; color: ${textColor}; font-family: ${fontFamily}, ${headingFontStack};">${analysis.textDensity}%</p>
              </div>
            ` : ''}
          </div>
        </div>
      ` : ''}
      `;

      const principleDetailsHTML = analysis.principleDetails && analysis.principleDetails.length > 0 ? 
        analysis.principleDetails.map(detail => {
          const hasSuggestions = detail.suggestions && detail.suggestions.length > 0;
          const feedbackColor = detail.score >= 80 ? '#10b981' : '#f59e0b';
          
          return `
            <div class="mt-6 rounded-lg p-4" style="background-color: ${backgroundColor};">
              <div class="mb-4">
                <h4 class="font-bold mb-2" style="font-size: ${fontSize * 1.125}px; color: ${textColor}; font-family: ${fontFamily}, ${headingFontStack};">
                  ${detail.icon} ${detail.name}
                </h4>
              </div>
              
              <div class="mb-4">
                <h5 class="font-semibold mb-2" style="font-size: ${fontSize}px; color: ${feedbackColor}; font-family: ${fontFamily}, ${headingFontStack};">Feedback</h5>
                <ul style="color: ${textColor}; font-size: ${fontSize}px; font-family: ${fontFamily}, ${bodyFontStack}; line-height: 1.6; list-style: none; padding: 0;">
                  ${detail.feedback.map(fb => `<li style="margin-bottom: 0.5rem; padding-left: 1.5rem; position: relative;">
                    <span style="position: absolute; left: 0;">•</span>
                    ${fb}
                  </li>`).join('')}
                </ul>
              </div>
              
              ${hasSuggestions ? `
                <div>
                  <h5 class="font-semibold mb-2" style="font-size: ${fontSize}px; color: ${textColor}; font-family: ${fontFamily}, ${headingFontStack};">Suggestions</h5>
                  <ul style="color: ${textColor}; font-size: ${fontSize}px; font-family: ${fontFamily}, ${bodyFontStack}; line-height: 1.6; list-style: none; padding: 0;">
                    ${detail.suggestions.map(suggestion => `<li style="margin-bottom: 0.5rem; padding-left: 1.5rem; position: relative;">
                      <span style="position: absolute; left: 0;">→</span>
                      ${suggestion}
                    </li>`).join('')}
                  </ul>
                </div>
              ` : ''}
            </div>
          `;
        }).join('')
      : `
        <div class="mt-6 rounded-lg p-4 text-center" style="background-color: ${backgroundColor};">
          <p class="font-semibold" style="font-size: ${fontSize}px; color: #10b981; font-family: ${fontFamily}, ${bodyFontStack};">✨ Excellent! All design aspects are at a good level!</p>
        </div>
      `;

      return `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          ${cardsHTML}
        </div>
        ${detectionDetailsHTML}
        ${principleDetailsHTML}
      `;
    }

    function printAnalysis() {
      if (!currentResultData || !currentResultImage) {
        showInlineMessage('No analysis data available to print.');
        return;
      }

      let analysis;
      try {
        analysis = JSON.parse(currentResultData.analysis_result);
      } catch (e) {
        showInlineMessage('Error generating print report.');
        return;
      }

      const config = window.elementSdk?.config || defaultConfig;
      const today = new Date();
      const dateString = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

      // Generate analysis items from principle details
      let analysisItemsHTML = '';
      if (analysis.principleDetails && analysis.principleDetails.length > 0) {
        analysis.principleDetails.forEach(detail => {
          const feedback = detail.feedback.join(' ');
          analysisItemsHTML += `
            <div class="analysis-item">
              <h3>${detail.name}</h3>
              <p>${feedback}</p>
            </div>
          `;
        });
      }

      // Generate suggestions
      let suggestionsHTML = '';
      if (analysis.allSuggestions && analysis.allSuggestions.length > 0) {
        suggestionsHTML = '<ul>';
        analysis.allSuggestions.forEach(suggestion => {
          suggestionsHTML += `<li>${suggestion}</li>`;
        });
        suggestionsHTML += '</ul>';
      }

      const reportHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>DesignLens Analysis Report</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                color: #333;
              }
              .report-header {
                text-align: center;
                margin-bottom: 20px;
              }
              .report-header h1 {
                font-size: 24px;
                margin: 0 0 10px 0;
              }
              .report-meta {
                font-size: 12px;
                color: #666;
              }
              hr {
                margin: 20px 0;
                border: 1px solid #ddd;
              }
              .report-section {
                margin-top: 20px;
                margin-bottom: 20px;
              }
              .report-section h2 {
                font-size: 16px;
                border-bottom: 2px solid #333;
                padding-bottom: 8px;
                margin-bottom: 12px;
              }
              .analysis-item {
                margin-bottom: 16px;
                padding-bottom: 12px;
                border-bottom: 1px solid #eee;
              }
              .analysis-item h3 {
                font-size: 13px;
                font-weight: 600;
                margin: 0 0 6px 0;
              }
              .analysis-item p {
                font-size: 12px;
                margin: 0;
                line-height: 1.5;
              }
              img {
                max-width: 100%;
                height: auto;
              }
              #uploadedDesignPreview {
                max-width: 100%;
                height: auto;
                margin: 10px 0;
              }
              ul {
                font-size: 12px;
                line-height: 1.6;
              }
              @media print {
                body * {
                  visibility: hidden;
                }
                body * {
                  visibility: visible;
                }
              }
            </style>
          </head>
          <body>
            <div class="report-header">
              <h1>DesignLens – Design Analysis Report</h1>
              <p class="report-meta">Generated on: ${dateString}</p>
            </div>

            <hr>

            <section class="report-section">
              <h2>Uploaded Design</h2>
              <img id="uploadedDesignPreview" src="${currentResultImage}" alt="Uploaded Design">
            </section>

            <section class="report-section">
              <h2>Analysis Summary</h2>
              ${analysisItemsHTML}
            </section>

            <section class="report-section">
              <h2>Overall Feedback & Suggestions</h2>
              ${suggestionsHTML}
            </section>

            <section class="report-section">
              <h2>Score Summary</h2>
              <p><strong>Overall Score: ${currentResultData.overall_score}/100</strong></p>
            </section>
          </body>
        </html>
      `;

      const printWindow = window.open("", "", "width=800,height=600");
      printWindow.document.write(reportHTML);
      printWindow.document.close();
      
      // Delay print to ensure content is loaded
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }

    async function init() {
      if (window.elementSdk) {
        window.elementSdk.init({
          defaultConfig,
          onConfigChange,
          mapToCapabilities: (config) => ({
            recolorables: [
              {
                get: () => config.background_color || defaultConfig.background_color,
                set: (value) => {
                  config.background_color = value;
                  window.elementSdk.setConfig({ background_color: value });
                }
              },
              {
                get: () => config.surface_color || defaultConfig.surface_color,
                set: (value) => {
                  config.surface_color = value;
                  window.elementSdk.setConfig({ surface_color: value });
                }
              },
              {
                get: () => config.text_color || defaultConfig.text_color,
                set: (value) => {
                  config.text_color = value;
                  window.elementSdk.setConfig({ text_color: value });
                }
              },
              {
                get: () => config.primary_action || defaultConfig.primary_action,
                set: (value) => {
                  config.primary_action = value;
                  window.elementSdk.setConfig({ primary_action: value });
                }
              },
              {
                get: () => config.secondary_action || defaultConfig.secondary_action,
                set: (value) => {
                  config.secondary_action = value;
                  window.elementSdk.setConfig({ secondary_action: value });
                }
              }
            ],
            borderables: [],
            fontEditable: {
              get: () => config.font_family || defaultConfig.font_family,
              set: (value) => {
                config.font_family = value;
                window.elementSdk.setConfig({ font_family: value });
              }
            },
            fontSizeable: {
              get: () => config.font_size || defaultConfig.font_size,
              set: (value) => {
                config.font_size = value;
                window.elementSdk.setConfig({ font_size: value });
              }
            }
          }),
          mapToEditPanelValues: (config) => new Map([
            ["logo_url", config.logo_url || defaultConfig.logo_url],
            ["app_title", config.app_title || defaultConfig.app_title],
            ["upload_button_text", config.upload_button_text || defaultConfig.upload_button_text],
            ["footer_text", config.footer_text || defaultConfig.footer_text]
          ])
        });
      }

      await onConfigChange(window.elementSdk?.config || defaultConfig);
    }

    init();
  </script>
 <script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9c8f0b8367185e23',t:'MTc3MDI1OTI0Ni4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>