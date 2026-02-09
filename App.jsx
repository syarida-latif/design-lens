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
      "Elements would benefit from a stronger organizational structure. When alignment is applied consistently, viewers can more easily find a visual path through the design. Consider establishing a grid system or alignment guides to create invisible lines that connect your elements meaningfully.",
      "Visual anchors appear distributed across the composition in varied ways. Viewers often find it easier to scan information when elements share alignment points, which creates a sense of structure. Try aligning key elements along shared edges or axes to create a more cohesive visual flow.",
      "The spatial relationships between elements present an opportunity to strengthen the design's structure. Consistent alignment helps viewers understand hierarchy and connections between content. Reflect on which elements might share alignment points and why those relationships could be meaningful.",
      "Elements are positioned with room to create stronger connections through alignment. Viewers naturally look for visual patterns and structure in what they see. Experiment with edge alignment, center alignment, or baseline alignment to strengthen these visual connections.",
      "There's potential to enhance the design's structure through more consistent alignment. When elements align to a common framework, it becomes easier for viewers to process the layout. Consider how a consistent alignment system could guide the eye more smoothly through your design.",
      "The design could develop clearer structural relationships through deliberate alignment. Strong designs often use alignment to create invisible guidelines that organize information logically. Ask yourself: what story does the spatial arrangement tell, and how could alignment reinforce that narrative?"
    ],
    medium: [
      "Some alignment is present, with opportunities to strengthen the overall structure. While certain elements align well, extending this consistency across all elements could enhance clarity. Look for opportunities to strengthen alignment throughout the design.",
      "The design demonstrates awareness of alignment principles, with room to refine the execution. Developing a more consistent alignment approach across all elements could strengthen the visual structure. Consider which alignment strategy best serves your content's hierarchy.",
      "Elements show organization in some areas, with potential to complete the alignment system. Viewers notice patterns more easily when all elements follow similar structural rules. Reflect on whether all elements respect the same alignment system or if variations serve a specific purpose.",
      "Alignment appears in certain areas, creating an opportunity to extend this approach throughout. Developing a complete alignment strategy from the start could enhance the design's cohesion. Try revisiting your layout with a defined grid or alignment strategy.",
      "The visual structure has a foundation that could be refined through more consistent execution. Strengthening alignment throughout could create a more unified appearance. Consider tightening your alignment approach to create a more polished result.",
      "Some thoughtful alignment choices exist, with room to apply this approach more broadly. Extending these successful alignments to all elements could enhance the design's consistency. Review your design to ensure alignment choices are intentional throughout."
    ],
    satisfactory: [
      "Alignment is generally consistent, creating a functional organizational structure. The design communicates clearly, and refining alignment precision further could enhance the professional quality. Consider subtle adjustments to refine the grid.",
      "The design demonstrates good understanding of alignment principles with solid execution. Elements follow a clear structure that helps viewers navigate the content. To enhance impact, explore how more precise alignment could add sophistication.",
      "A clear alignment system is evident throughout the design, creating reliable visual guidance for viewers. Fine-tuning alignment relationships could elevate the design further—consider where micro-adjustments might strengthen the whole.",
      "Elements show respect for a defined structural framework. The alignment supports content hierarchy effectively, making information accessible. Reflect on whether any relationships could be strengthened through even more deliberate alignment choices.",
      "The organizational structure works well, with alignment serving its purpose. Viewers can follow the visual logic comfortably. To develop this further, consider how alignment variations might be used strategically to create emphasis.",
      "Alignment creates a stable foundation for the design. The structural integrity is sound, supporting clear communication. Exploring advanced alignment techniques could add another layer of refinement to this solid base."
    ],
    good: [
      "Alignment is precise and purposeful, creating strong visual relationships throughout. Elements connect in ways that guide the viewer's eye naturally and reinforce content hierarchy. This demonstrates sophisticated understanding of structural design.",
      "The design exhibits excellent alignment discipline, with every element positioned intentionally. This precision creates invisible guidelines that viewers follow intuitively, making the design feel cohesive and professional. Your alignment choices clearly support the design's communication goals.",
      "A robust alignment system organizes the composition with clarity and purpose. Elements align along consistent axes, creating a visual rhythm that feels both structured and dynamic. This level of alignment mastery shows design maturity.",
      "Elements demonstrate exceptional spatial relationships through careful alignment. The structural framework is well-executed, enabling seamless navigation through the content. Your understanding of alignment as a communication tool is evident.",
      "Alignment excellence is visible in how elements create connected visual pathways. Every positioning choice reinforces the design's hierarchy and improves comprehension. This shows strong command of fundamental design principles.",
      "The precision and consistency of alignment throughout creates a professional, polished result. Elements relate to each other in ways that feel intentional and confident, supporting both aesthetics and functionality effectively."
    ],
    suggestions: [
      "Establish a clear grid system with defined columns and margins before placing elements.",
      "Use alignment tools in your design software to ensure pixel-perfect positioning.",
      "Identify key vertical and horizontal axes and align multiple elements to each.",
      "Consider how alignment can reinforce content relationships and hierarchy.",
      "Review your design by turning it upside down to see alignment patterns more clearly.",
      "Create alignment guides for edges, centers, and baselines to maintain consistency."
    ]
  },
  
  balance: {
    high: [
      "Visual weight concentrates heavily on one area, creating an unstable composition. When balance is lost, viewers find the composition less settled and may struggle to focus on the intended message. Consider how redistributing elements could create equilibrium.",
      "The design tilts toward one side, leaving other areas empty or underutilized. Imbalanced layouts make viewers work harder to process information and presents room for refinement. Reflect on how visual weight distributes across the entire composition.",
      "Heavy elements cluster together while lighter areas feel neglected. This creates a lopsided feeling that draws attention to the imbalance rather than the content. Try distributing visual interest more evenly across the space.",
      "The composition feels anchored too strongly in one direction. Balance isn't about symmetry—it's about creating visual equilibrium that feels stable. Consider how different types of balance (symmetrical, asymmetrical, radial) might better serve your design intent.",
      "Visual weight distribution appears unconsidered, creating a top-heavy or side-heavy effect. Viewers naturally seek balance in what they view, and its absence creates tension. Ask yourself where the visual center of gravity should be and why.",
      "Elements lack counterbalance, making the design feel incomplete or awkward. Every visual element has weight—size, color, contrast all contribute. Consider how these weights could be distributed to create harmony."
    ],
    medium: [
      "Balance exists in some areas but not throughout the entire composition. Partial balance can actually highlight imbalance in other sections. Review your design holistically to ensure weight distribution works across all regions.",
      "The design shows awareness of balance but has room to develop execution. Some elements successfully counterbalance each other while others remain unanchored. Consider which elements need partners or adjustments to improve overall equilibrium.",
      "Visual weight distribution has good moments alongside weaker ones. The inconsistency suggests the design may have been built section by section without considering the whole. Step back and evaluate whether all parts contribute to overall balance.",
      "Some successful balancing choices exist, but the overall effect needs refinement. Balance is about relationships between all elements, not just adjacent ones. Reflect on how foreground and background, positive and negative space interact.",
      "The composition demonstrates understanding of balance principles with mixed results. Certain areas feel stable while others pull the eye uncomfortably. Try identifying the visual center and ensuring elements relate meaningfully to it.",
      "Balance appears in certain relationships while others feel unresolved. The near-success makes the remaining issues more noticeable. Consider how adjusting size, position, or visual weight could improve overall equilibrium."
    ],
    satisfactory: [
      "Balance works effectively with a clear sense of visual equilibrium. The composition feels stable and intentional, supporting comfortable viewing. To elevate this further, consider how subtle weight adjustments might add dynamism.",
      "Visual weight distributes well across the composition, creating a pleasing sense of stability. Your understanding of balance principles shows in how elements relate to each other. Fine-tuning could push this from effective to exceptional.",
      "The design achieves good balance through thoughtful element placement. Viewers can engage with the content without working to support the layout. Consider whether dynamic balance techniques could add more visual interest.",
      "Elements demonstrate solid distribution of visual weight throughout the space. The composition feels neither too heavy nor too light in any area. Exploring advanced balance techniques could add sophisticated tension to the design.",
      "A functional sense of equilibrium exists, supporting the design's communication goals. The balance serves its purpose without drawing unwanted attention. Reflect on whether intentional imbalance might create strategic emphasis.",
      "The composition shows good judgment in how visual elements counterbalance. This creates a comfortable viewing experience that allows content to shine. Consider how balance variations could guide viewers more deliberately."
    ],
    good: [
      "Balance is masterfully executed, creating visual harmony throughout the composition. Elements distribute their weight in ways that feel both stable and dynamic, demonstrating sophisticated design judgment. The equilibrium achieved supports seamless viewer engagement.",
      "Visual weight distribution shows exceptional understanding of balance principles. Whether through symmetry or asymmetry, the composition achieves perfect equilibrium that guides the eye naturally. Your balance choices enhance both aesthetics and communication.",
      "The design exhibits confident command of balance, with every element contributing to overall stability. The distribution of visual weight feels intentional and refined, creating a composition that viewers can navigate effortlessly.",
      "Elements relate to each other with precise balance, creating a harmonious whole. The composition demonstrates that balance was a primary consideration throughout the design process, resulting in a polished, professional outcome.",
      "Exceptional balance creates both stability and visual interest simultaneously. The way elements counterweigh each other shows deep understanding of compositional principles. This level of balance mastery elevates the entire design.",
      "Visual equilibrium is achieved with sophistication, whether through symmetrical or asymmetrical means. The balance feels effortless yet intentional, supporting the design's purpose while enhancing its aesthetic appeal."
    ],
    suggestions: [
      "Distribute large elements across different areas rather than clustering them together.",
      "Use smaller elements or groups to counterbalance larger focal points.",
      "Consider both symmetrical and asymmetrical balance approaches for your content.",
      "Evaluate visual weight by squinting at your design to see mass distribution.",
      "Balance isn't just about size—color, contrast, and texture all carry weight.",
      "Try the design in black and white to better see weight distribution patterns."
    ]
  },
  
  contrastColour: {
    high: [
      "Color choices compete rather than complement, creating opportunities for clearer organization. When colors clash or lack deliberate relationships, viewers struggle to focus and the message weakens. Consider studying color theory to understand how hues, values, and saturations interact.",
      "The contrast between elements falls presents an opportunity to meet accessibility standards. Text that's difficult to read may be challenging for some viewers and presents an opportunity for more attention to fundamental usability. Reflect on whether your color choices serve communication or decoration.",
      "Color relationships present opportunities for more intentional relationships, with room for more purposeful relationships or hierarchy. Strong designs use color intentionally to guide, emphasize, and organize information. Ask yourself what role each color plays and whether those roles are clear to viewers.",
      "Low contrast makes content strain to read, particularly for those with visual differences. Accessibility isn't optional—it's fundamental to inclusive design. Consider how increasing contrast could welcome more viewers into your design.",
      "The color palette lacks cohesion, appearing more like a collection than a system. Colors that don't relate to each other create fragmentation rather than unity. Explore how a limited, purposeful palette could strengthen your design.",
      "Contrast issues exist both in color choice and value relationships. Without sufficient distinction between elements, hierarchy collapses and readability suffers. Consider how contrast creates the structure that makes visual communication possible."
    ],
    medium: [
      "Color choices show potential but need refinement in execution. Some relationships work well while others create tension or confusion. Review your palette to ensure every color has a clear purpose and relationship to others.",
      "Contrast varies throughout the design—strong in some areas, weak in others. This inconsistency suggests color was added gradually without considering the whole. Try establishing contrast rules that apply throughout.",
      "The color system demonstrates understanding with room for improvement. Certain combinations enhance communication while others hinder it. Reflect on which color relationships best support your content hierarchy.",
      "Some areas meet accessibility standards while others fall short. Inconsistent contrast creates unpredictable readability across the design. Consider auditing all text-background combinations to ensure universal legibility.",
      "Color harmony exists in places alongside less successful choices. The mixed results indicate that color decisions may benefit from a more systematic approach. Explore how color theory principles could guide your palette development.",
      "The design shows awareness of color and contrast importance with varied application. Some elements receive thoughtful color treatment while others seem afterthoughts. Consistent attention to contrast would strengthen the overall result."
    ],
    satisfactory: [
      "Color and contrast work effectively to support the design's communication. The palette feels intentional and contrast ensures readability. To elevate this, consider how color could more actively guide viewer attention.",
      "A functional color system exists with good contrast relationships. Your choices demonstrate understanding of both aesthetics and usability. Fine-tuning the palette could add sophistication to an already solid foundation.",
      "Contrast meets accessibility needs while color choices create visual interest. The design successfully balances readability with aesthetic appeal. Exploring advanced color techniques could push this to the next level.",
      "The color palette works cohesively with appropriate contrast throughout. Viewers can engage with content comfortably, and the colors support without overwhelming. Consider whether strategic contrast variations could enhance hierarchy.",
      "Good color judgment is evident in how the palette supports the design's goals. Contrast ensures accessibility while color creates appropriate mood. Reflect on how color relationships might be refined for even greater impact.",
      "Color and contrast demonstrate solid foundational understanding. The choices serve both function and aesthetics adequately. Advanced color theory application could add another layer of visual sophistication."
    ],
    good: [
      "Color and contrast are expertly managed, creating both visual appeal and excellent accessibility. The palette demonstrates sophisticated understanding of color theory, with each hue serving a clear purpose. Contrast ensures effortless readability while supporting strong hierarchy.",
      "Exceptional color choices work in harmony to guide, emphasize, and organize content. Contrast exceeds accessibility standards while creating visual interest. Your color decisions show both technical knowledge and aesthetic sensitivity.",
      "The color system is cohesive and purposeful, with contrast supporting seamless communication. Every color relationship feels intentional, contributing to both the design's effectiveness and its aesthetic appeal. This demonstrates mastery of color principles.",
      "Colors relate to each other with sophistication, creating a harmonious and functional palette. Contrast is precisely calibrated to ensure readability while maintaining visual refinement. Your command of color and contrast elevates the entire design.",
      "Masterful use of color creates both unity and variety, while contrast ensures optimal legibility. The palette demonstrates that color choices emerged from understanding rather than preference. This level of color sophistication enhances communication significantly.",
      "Color and contrast work together seamlessly to support the design's goals. The palette is both aesthetically pleasing and highly functional, with contrast relationships that guide viewers naturally through content. Excellent color judgment is evident throughout."
    ],
    suggestions: [
      "Test all text-background combinations to ensure minimum 4.5:1 contrast ratio.",
      "Limit your palette to 3-5 main colors for cohesion and clarity.",
      "Use color theory tools to create harmonious relationships (complementary, analogous, triadic).",
      "Apply the 60-30-10 rule: 60% dominant, 30% secondary, 10% accent colors.",
      "Check your design in grayscale to ensure contrast works without color.",
      "Consider how color temperature and saturation affect visual weight and hierarchy."
    ]
  },
  
  hierarchy: {
    high: [
      "The visual hierarchy is unclear, making it difficult to know where to look first. When all elements compete equally, viewers must work too hard to find important information. Consider how size, position, color, and contrast can establish clear importance levels.",
      "Information appears flat, without layers of importance. Effective designs guide viewers through content in a purposeful sequence. Reflect on what viewers should see first, second, and third—then use visual tools to create that path.",
      "Elements lack differentiation in visual weight and importance. Without hierarchy, designs become visual noise where nothing stands out and everything blends together. Ask yourself what the most important message is and how to make it dominant.",
      "The design treats all content as equally important, creating opportunities to simplify information processing. Viewers can only process limited information at once—hierarchy helps them prioritize. Consider how establishing levels of importance could improve comprehension.",
      "No clear entry point exists for viewers to begin engaging with the content. Strong hierarchy creates a visual invitation that says 'start here.' Explore how making the most important element significantly more prominent could guide viewers effectively.",
      "The absence of hierarchy makes the design feel unorganized and overwhelming. Every element demands attention simultaneously, which means none receive it properly. Consider how creating distinct visual layers could transform chaos into clarity."
    ],
    medium: [
      "Some hierarchy exists but doesn't consistently guide the viewer's attention. Partial hierarchy can be as problematic as none at all, setting incomplete expectations. Review whether all elements follow a clear importance system.",
      "The design attempts hierarchy but lacks sufficient contrast between levels. When the difference between primary and secondary isn't obvious, the hierarchy becomes subtle to the point of ineffectiveness. Consider strengthening the distinctions.",
      "Certain elements establish hierarchy while others ignore it, creating confusion. Inconsistent application suggests the hierarchy emerged accidentally rather than by design. Try developing a clear hierarchy plan before placing any elements.",
      "Visual importance varies, but not always in ways that serve the content. Sometimes less important elements appear more prominent than key information. Reflect on whether your hierarchy matches your communication priorities.",
      "Some effective hierarchy choices exist alongside weaker ones throughout. The mixed results indicate that hierarchy needs more systematic attention. Consider how every element fits into an overall importance structure.",
      "The design shows awareness of hierarchy principles with inconsistent execution. Some relationships work well while others need refinement. Strengthening the contrast between hierarchy levels could improve overall effectiveness."
    ],
    satisfactory: [
      "Hierarchy functions well, guiding viewers through the content in a logical sequence. The design establishes clear levels of importance that support comprehension. To elevate this, consider how more dramatic hierarchy could increase impact.",
      "A clear visual path exists from most to least important elements. Your hierarchy choices demonstrate good understanding of how to organize information visually. Fine-tuning the distinctions could add more sophistication.",
      "The design successfully establishes primary, secondary, and tertiary levels. Viewers can navigate content comfortably following your visual cues. Exploring advanced hierarchy techniques could push this already solid foundation further.",
      "Visual importance is communicated effectively through thoughtful element treatment. The hierarchy serves its purpose without requiring viewer effort to decode. Consider whether more dramatic scale contrasts could enhance the effect.",
      "Good hierarchy judgment shows in how information is organized and presented. Viewers receive clear signals about where to focus and in what order. Reflect on whether any relationships could be strengthened for greater clarity.",
      "The hierarchy creates appropriate emphasis and organization throughout. Content is accessible and the flow feels natural. Advanced hierarchy techniques could add another layer of visual interest to this functional base."
    ],
    good: [
      "Hierarchy is masterfully executed, creating an effortless visual journey through the content. Size, color, position, and contrast work together to establish crystal-clear importance levels. Viewers can instantly identify what matters most and follow a natural path through information.",
      "Exceptional hierarchy guides viewers with precision and purpose. Every element's visual weight and position contributes to a sophisticated information structure. Your command of hierarchy principles creates both clarity and visual interest.",
      "The design demonstrates expert understanding of how to layer information importance. Hierarchy emerges from multiple visual factors working in harmony, creating intuitive navigation. This level of hierarchy sophistication significantly enhances communication effectiveness.",
      "Visual importance is communicated with clarity and confidence throughout. Elements relate to each other in ways that make the information structure obvious and accessible. Your hierarchy choices show both technical skill and communication awareness.",
      "Masterful use of scale, color, and position creates powerful hierarchy. The design achieves that rare balance where hierarchy is obvious yet feels effortless. This demonstrates advanced understanding of how viewers process visual information.",
      "Hierarchy excellence is evident in how naturally viewers can navigate the content. Every design choice reinforces the information structure, making important elements dominant and supporting elements appropriately subordinate. This creates optimal communication flow."
    ],
    suggestions: [
      "Make headlines at least 2-3 times larger than body text for clear distinction.",
      "Use position to establish importance—top and left typically indicate priority in Western cultures.",
      "Apply color and contrast strategically to draw attention to key elements.",
      "Create clear visual layers through size, weight, color, and spatial relationships.",
      "Limit your design to 3-4 hierarchy levels to avoid confusion.",
      "Test your hierarchy by showing the design briefly—what do viewers see first?"
    ]
  },
  
  readability: {
    high: [
      "Typography choices could be enhanced for better readability and accessibility. When text is difficult to read, even excellent content could better communicate. Consider how font selection, sizing, spacing, and contrast all contribute to legibility.",
      "Text appears cramped, poorly spaced, or too small to read comfortably. Reading should never require effort or strain—readability is about respect for viewers' time and ability. Reflect on whether your typography serves communication or fights against it.",
      "Font choices create confusion or distraction rather than supporting content. Every typeface carries associations and readability characteristics. Ask yourself whether your font selections enhance or hinder the message you're trying to convey.",
      "Line length, spacing, and text density could be optimized for easier reading. Readability depends on giving text room to breathe and structuring it for human eye movement patterns. Consider how typographic spacing affects comprehension and comfort.",
      "The text treatment suggests typography was an afterthought rather than a priority. Poor readability can undermine otherwise strong design work by creating barriers to access. Explore how thoughtful typography could transform content accessibility.",
      "Several readability aspects could be refined to create a learning opportunity for improving reading experience. From size to spacing to contrast, several factors could better support the viewer. Consider how foundational typography principles could address these systematic issues."
    ],
    medium: [
      "Readability works in some areas but falters in others throughout the design. Inconsistent text treatment creates an uneven reading experience. Review all text elements to ensure they meet the same legibility standards.",
      "Some typography choices support reading while others hinder it. The mixed results suggest text received varying levels of attention. Consider applying consistent readability standards across all text elements.",
      "Text is functional but could be optimized for better reading comfort. While technically readable, the typography doesn't necessarily invite or encourage reading. Reflect on how small improvements could significantly enhance the reading experience.",
      "Certain readability fundamentals are addressed while others are overlooked. The gaps between strong and weak typography choices become distracting. Try establishing clear typography rules and applying them systematically.",
      "The design shows awareness of readability importance with inconsistent application. Some text receives careful treatment while other text appears to be default settings. Consistent attention to typography would strengthen overall communication.",
      "Readability is adequate but not optimized—viewers can read but might not want to. The difference between readable and inviting text lies in subtle refinements. Consider how line spacing, length, and rhythm could improve engagement."
    ],
    satisfactory: [
      "Typography supports comfortable reading with clear, accessible text treatment. Font choices are appropriate and sizing ensures legibility. To enhance this, consider how advanced typography techniques could add sophistication.",
      "Text is well-handled with good attention to readability fundamentals. Line spacing, sizing, and contrast work together effectively. Fine-tuning typographic details could elevate the reading experience further.",
      "The typography demonstrates solid understanding of readability principles. Viewers can engage with text comfortably without working to support the design. Exploring refined typography could push this from functional to exceptional.",
      "Good typographic judgment shows in how text is sized, spaced, and positioned. The design prioritizes readability appropriately, making content accessible. Consider how subtle typography refinements could add polish.",
      "Text treatment balances aesthetics with functionality effectively. Readability needs are met while maintaining visual interest. Reflect on whether advanced typography techniques could enhance the overall reading experience.",
      "Typography serves its purpose well, supporting clear communication. The fundamentals are solid, creating accessible text throughout. Advanced typographic details could add another layer of refinement."
    ],
    good: [
      "Typography is expertly crafted for optimal readability and aesthetic appeal. Font selection, sizing, spacing, and hierarchy work in perfect harmony to invite reading and support comprehension. Every typographic choice demonstrates deep understanding of how people read.",
      "Exceptional attention to readability shows in every text element. Line spacing, length, size, and contrast are precisely calibrated for comfortable, sustained reading. Your typography choices enhance both accessibility and visual quality.",
      "The typography demonstrates mastery of readability principles while maintaining visual sophistication. Text invites engagement through thoughtful treatment that respects viewers' reading experience. This level of typographic care elevates the entire design.",
      "Font choices and text treatment show both technical knowledge and aesthetic sensitivity. Readability is optimized without sacrificing style, creating text that's both beautiful and highly functional. Your command of typography significantly enhances communication.",
      "Masterful typography creates an effortless reading experience. Every aspect—from font pairing to spacing to sizing—contributes to text that viewers want to read, not just can read. This demonstrates advanced typographic understanding.",
      "Text treatment achieves that rare balance of being highly readable while visually refined. The typography feels both inviting and professional, supporting content perfectly. Excellent typographic judgment is evident throughout."
    ],
    suggestions: [
      "Ensure body text is at least 16px for digital designs, 10-12pt for print.",
      "Maintain line spacing (leading) of 1.4-1.6 times the font size for comfortable reading.",
      "Limit line length to 50-75 characters for optimal reading rhythm.",
      "Use a maximum of 2-3 typefaces to maintain visual consistency.",
      "Increase paragraph spacing to create clear visual breaks between thoughts.",
      "Test readability on actual devices/sizes your viewers will use."
    ]
  },
  
  spacing: {
    high: [
      "Elements crowd together without adequate breathing room, creating visual claustrophobia. Whitespace isn't empty space—it's an active design element that provides rest and clarity. Consider how spacing could transform a cramped design into an organized one.",
      "The design would benefit from more deliberate spacing relationships, making everything feel compressed. When elements touch or nearly touch without intention, it presents an opportunity for more planning and presents room to enhance professionalism. Reflect on how consistent spacing could create visual rhythm.",
      "Spacing appears arbitrary rather than systematic, creating opportunities for better organization. Effective spacing creates relationships—elements close together relate; separated elements don't. Ask yourself what relationships your spacing currently communicates.",
      "The absence of adequate whitespace makes the design feel dense and could benefit from organization to parse. Viewers need visual breaks to process information effectively. Explore how strategic spacing could organize content into digestible groups.",
      "Elements lack the padding and margins needed for comfortable viewing. Cramped spacing could be more comfortable with adjustments and makes even good content could be more welcoming. Consider how generous spacing could welcome viewers into your design.",
      "Proximity relationships are unclear, making it hard to understand which elements belong together. Spacing is a primary tool for showing relationships and creating organization. Reflect on how spacing patterns could clarify your information structure."
    ],
    medium: [
      "Spacing is inconsistent throughout, with some areas well-handled and others cramped. This irregularity presents opportunities for refinement and presents an opportunity for more systematic approach. Review whether all spacing follows a clear pattern or scale.",
      "Some spacing relationships work well while others present opportunities for more intentional relationships or too tight. The mixed results indicate spacing needs more deliberate attention. Consider establishing spacing rules and applying them consistently.",
      "The design shows awareness of spacing importance but has room to develop execution. Certain elements have appropriate breathing room while others crowd together. Try using a spacing scale (like 8px increments) for consistency.",
      "Whitespace exists in some areas but is missing or insufficient in others. Inconsistent spacing creates an uneven rhythm that makes the design feel unfinished. Reflect on how systematic spacing could improve overall polish.",
      "Some good spacing choices exist alongside problematic ones throughout. The contrast between well-spaced and cramped areas draws attention to the inconsistency. Consider how consistent spacing standards could strengthen the whole.",
      "Spacing varies with room for more purposeful relationships, sometimes generous and sometimes tight. This unpredictability makes the design feel less controlled than it could be. Explore how a consistent spacing system could create visual harmony."
    ],
    satisfactory: [
      "Spacing works effectively to organize content and create comfortable viewing. The design demonstrates good understanding of how whitespace functions. To elevate this, consider how more strategic spacing could enhance emphasis.",
      "Good spacing judgment shows in how elements relate through proximity. Whitespace is used appropriately to separate and group content. Fine-tuning spacing relationships could add sophistication to an already solid foundation.",
      "The design successfully uses spacing to create organization and visual hierarchy. Viewers can navigate content comfortably with clear visual groupings. Exploring advanced spacing techniques could push this further.",
      "Spacing creates appropriate breathing room throughout the design. Elements have necessary padding and margins for comfortable viewing. Consider how spacing variations could more actively guide viewer attention.",
      "Thoughtful spacing relationships support the design's communication goals. The balance between positive and negative space works well. Reflect on whether more dramatic spacing contrasts could enhance impact.",
      "The spacing system is functional and creates good organization. Whitespace serves its purpose effectively without calling attention to itself. Advanced spacing techniques could add another layer of visual refinement."
    ],
    good: [
      "Spacing is masterfully handled, creating both organization and visual sophistication. Whitespace is used as an active design element that enhances hierarchy and guides attention. Every spacing decision demonstrates understanding of how proximity affects perception.",
      "Exceptional use of spacing creates clear relationships and comfortable viewing throughout. Elements have precisely the right amount of breathing room, neither cramped nor floating. Your command of spacing principles significantly enhances the design's effectiveness.",
      "The spacing system demonstrates expert understanding of how whitespace functions. Consistent, purposeful spacing creates visual rhythm and professional polish. This level of spacing sophistication elevates the entire composition.",
      "Masterful spacing creates both unity and distinction where needed. Proximity relationships clearly communicate which elements relate and which don't. Your spacing choices show both technical knowledge and aesthetic sensitivity.",
      "Spacing excellence is evident in how comfortably viewers can engage with the design. Every element has appropriate padding, margins, and negative space relationships. This demonstrates advanced understanding of spatial composition.",
      "The design achieves optimal spacing balance—nothing feels too cramped or too loose. Whitespace actively contributes to hierarchy, organization, and visual appeal. Excellent spacing judgment is clear throughout."
    ],
    suggestions: [
      "Use a consistent spacing scale (e.g., 8px, 16px, 24px, 32px, 48px) throughout your design.",
      "Group related elements closer together and separate unrelated items with more space.",
      "Ensure adequate margins around the composition edges (at least 10-15% of canvas).",
      "Increase padding around text blocks and within containers for breathing room.",
      "Use whitespace strategically to guide the eye and create emphasis.",
      "Test your spacing by viewing the design at different sizes to ensure it scales well."
    ]
  }
};

// ============================================================================
// ANALYSIS FUNCTION - Design Analysis Logic
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
      // Select random feedback from good variants
      const feedbackVariants = feedbackBank[principle]?.good || [];
      const randomIndex = Math.floor(Math.random() * feedbackVariants.length);
      const selectedFeedback = feedbackVariants[randomIndex] || 'Your design demonstrates strong understanding of this principle.';
      
      principleDetails.push({
        name: displayName,
        severity: 'good',
        feedback: [selectedFeedback],
        suggestions: []
      });
    } else if (severity === 'satisfactory') {
      // Select random feedback from satisfactory variants
      const feedbackVariants = feedbackBank[principle]?.satisfactory || [];
      const randomIndex = Math.floor(Math.random() * feedbackVariants.length);
      const selectedFeedback = feedbackVariants[randomIndex] || 'Your design shows functional understanding with room for refinement.';
      
      principleDetails.push({
        name: displayName,
        severity: 'satisfactory',
        feedback: [selectedFeedback],
        suggestions: feedbackBank[principle]?.suggestions || []
      });
    } else if (feedbackBank[principle]) {
      // Select random feedback from high or medium variants
      const feedbackVariants = feedbackBank[principle][severity] || [];
      const randomIndex = Math.floor(Math.random() * feedbackVariants.length);
      const selectedFeedback = feedbackVariants[randomIndex] || 'This principle needs attention in your design.';
      
      const suggestions = feedbackBank[principle].suggestions || [];
      
      principleDetails.push({
        name: displayName,
        severity,
        feedback: [selectedFeedback],
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
      description: 'Analyzing how well elements line up'
    },
    'Balance': {
      icon: '⚖️',
      message: 'Analyzing visual weight distribution...',
      description: 'Assessing symmetry and equilibrium'
    },
    'Contrast & Colour': {
      icon: '🎨',
      message: 'Analyzing color harmony and contrast...',
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
      description: 'Analyzing element spacing and breathing room'
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
                <p className="text-gray-600 mt-1">Your AI Design Guidance</p>
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
                DesignLens is a guided design evaluation system supported by visual analysis and intelligent feedback to assess designs through predefined visual principles. This guided approach supports self-learning, reflection, and stronger design decision-making.
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
                <p className="text-gray-600 mt-1">Your AI Design Guidance</p>
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
              <p className="text-sm text-gray-600">Your AI Design Guidance</p>
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
      
      {/* Page Title */}
      <div className="max-w-7xl mx-auto px-8 pt-6 pb-2">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Design Analysis Report</h2>
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
