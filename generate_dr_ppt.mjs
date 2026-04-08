import pptxgen from "pptxgenjs";

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "OpenAI Codex";
pptx.company = "OpenAI";
pptx.subject = "Diabetic Retinopathy Detection using AlexNet + Handcrafted Features";
pptx.title = "Diabetic Retinopathy Detection and Stage Classification Using Deep Learning";
pptx.lang = "en-US";
pptx.theme = { headFontFace: "Calibri", bodyFontFace: "Calibri", lang: "en-US" };

const C = {
  navy: "0D1B4B", light: "F0F4FA", teal: "0E6B58", blue: "1A4FA0",
  amber: "7A4A10", grey: "3A3A4A", purple: "4A3580", darkRed: "7A1A1A",
  gold: "F5C542", white: "FFFFFF", dark: "1E293B", muted: "5B7DB1",
  footer: "050D22", green: "2E8B57", coral: "E07A5F", red: "B22222", softBorder: "D2DAE6",
};

const W = 13.333, H = 7.5, headerH = 0.68, footerH = 0.28;

function addFooter(slide) {
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: H - footerH, w: W, h: footerH, line: { color: C.footer, transparency: 100 }, fill: { color: C.footer } });
  slide.addText("Diabetic Retinopathy Detection Using Deep Learning | AlexNet + Handcrafted Features", {
    x: 0.45, y: H - footerH + 0.06, w: 9.3, h: 0.12, fontFace: "Calibri", fontSize: 7.5, color: C.muted, margin: 0,
  });
}

// Slide 8
{
  const slide = pptx.addSlide();
  slide.background = { color: C.light };
  addHeader(slide, "System Architecture", "Three approaches, six systems — Focus: Approach 3, System 6 (AlexNet + Handcrafted) — Best Performing");
  addCard(slide, { x: 0.48, y: 1.06, w: 3.95, h: 1.1, fill: "EAF1FF", line: C.blue, title: "Approach 1 — CNN Features + PCA", titleFill: C.blue, body: "• System 1: DenseNet-121 → PCA → ANN\n• System 2: AlexNet → PCA → ANN", bodyColor: C.dark, fontSize: 10.2 });
  addCard(slide, { x: 4.69, y: 1.06, w: 3.95, h: 1.1, fill: "F4F5F8", line: C.grey, title: "Approach 2 — Hybrid CNN Fusion", titleFill: C.grey, body: "• System 3: DenseNet-121 + AlexNet before PCA\n• System 4: DenseNet-121 + AlexNet after PCA", bodyColor: C.dark, fontSize: 10.1 });
  addCard(slide, { x: 8.9, y: 1.06, w: 3.95, h: 1.1, fill: "ECFBF7", line: C.teal, title: "Approach 3 — Radiomic Features ★ BEST", titleFill: C.teal, body: "• System 5: DenseNet-121 + handcrafted → ANN\n• System 6: AlexNet + handcrafted → ANN", bodyColor: C.dark, fontSize: 10.1 });
  drawMethodArchitecture(slide, 1.25, 2.15, 0.88);
  addCard(slide, { x: 8.15, y: 5.55, w: 4.3, h: 0.72, fill: "F3FBF8", line: C.teal, body: "Design note: PCA is applied only to AlexNet features (2048 → 512). Handcrafted features remain unchanged so their unique complementary information is preserved.", bodyColor: C.teal, fontSize: 9.2, shadow: false });
}

// Slide 9
{
  const slide = pptx.addSlide();
  slide.background = { color: C.light };
  addHeader(slide, "Pictorial Representation of the Process", "Step-by-step walkthrough of all 7 pipeline stages");
  const steps = [
    [1, C.teal, "Image Acquisition", "Fundus images are collected from Kaggle EyePACS, balanced to 12,413 samples, resized to 227×227×3, and split into train and test sets."],
    [2, C.purple, "Image Preprocessing", "Average filtering removes artifacts and CLAHE boosts local contrast, making vessels, microaneurysms, and exudates more visible."],
    [3, C.blue, "AlexNet Deep Features", "AlexNet extracts a 2048-dimensional representation that captures structural and semantic retinal patterns."],
    [4, C.grey, "PCA Reduction", "The AlexNet vector is reduced from 2048 to 512 features while keeping the dominant variance and reducing redundancy."],
    [5, C.amber, "Handcrafted Features", "DWT, LBP, FCH, and GLCM capture lesion texture, colour distribution, and spatial relationships, giving 244 compact features."],
    [6, C.darkRed, "Radiomic Fusion", "The reduced deep features and handcrafted features are concatenated into one 756-dimensional radiomic vector."],
  ];
  steps.forEach((item, idx) => {
    const col = idx % 2, row = Math.floor(idx / 2), x = 0.52 + col * 6.22, y = 1.1 + row * 1.52;
    addCard(slide, { x, y, w: 5.98, h: 1.22, fill: "FFFFFF", line: item[1], shadow: true });
    addStepCircle(slide, item[0], x + 0.13, y + 0.12, item[1]);
    slide.addText(item[2], { x: x + 0.6, y: y + 0.1, w: 5.1, h: 0.16, fontFace: "Calibri", fontSize: 11.8, bold: true, color: item[1], margin: 0 });
    slide.addText(item[3], { x: x + 0.14, y: y + 0.42, w: 5.62, h: 0.6, fontFace: "Calibri", fontSize: 9.8, color: C.dark, fit: "shrink", margin: 0 });
  });
  addCard(slide, { x: 0.55, y: 5.76, w: 12.28, h: 0.86, fill: C.navy, line: C.navy, title: "Step 7 — ANN Classification", titleFill: C.navy, body: "The 756-dimensional radiomic vector is fed into an ANN with 12 hidden layers. Softmax produces a 5-class probability distribution, and the highest-probability class is reported as the final DR stage prediction.", bodyColor: C.white, fontSize: 10.2, titleSize: 12, shadow: false });
}

// Slide 10
{
  const slide = pptx.addSlide();
  slide.background = { color: C.light };
  addHeader(slide, "Correlation Between Algorithm and Process", "How every algorithm maps to its pipeline stage, solves a specific problem and feeds the next stage");
  slide.addTable(tableRows([
    ["Algorithm", "Pipeline Stage", "Problem It Solves", "Output to Next Stage"],
    ["Average Filter", "Preprocessing 1", "Removes camera noise, eyelash artifacts, and motion blur", "Clean normalized fundus image"],
    ["CLAHE", "Preprocessing 2", "Boosts local contrast of vessels, microaneurysms, and exudates", "Enhanced image with visible lesion boundaries"],
    ["AlexNet Convolution", "Deep feature extraction", "Learns hierarchical visual patterns from edges to lesion structures", "2048-dim deep feature vector"],
    ["Max Pooling", "Inside AlexNet", "Compresses spatial dimensions while preserving strongest activations", "Compact feature maps"],
    ["PCA", "Dimensionality reduction", "Removes correlated redundancy and prevents overfitting", "512 principal components"],
    ["DWT", "Handcrafted extraction", "Captures multi-resolution texture from fine and coarse lesions", "12 wavelet features"],
    ["LBP", "Handcrafted extraction", "Encodes local texture differences between healthy and diseased tissue", "203 histogram features"],
    ["FCH", "Handcrafted extraction", "Separates fuzzy colour patterns of red, yellow, and white lesions", "16 colour features"],
    ["GLCM", "Handcrafted extraction", "Measures spatial co-occurrence statistics of retinal patterns", "13 texture features"],
    ["Concatenation", "Radiomic fusion", "Unifies semantic deep features with low-level descriptors", "756-dim radiomic vector"],
    ["ANN Backpropagation", "Classification", "Learns non-linear boundaries between the 5 DR classes", "Trained model weights"],
    ["Softmax", "Output layer", "Converts scores into interpretable class probabilities", "P(class|image) across 5 stages"],
  ]), { x: 0.45, y: 1.12, w: 12.45, h: 5.58, border: { type: "solid", color: C.softBorder, pt: 1 }, fill: "FFFFFF", color: C.dark, fontFace: "Calibri", fontSize: 9.0, rowH: 0.37, colW: [2.0, 1.8, 4.4, 3.5], margin: 0.04, valign: "mid", autoFit: false });
  slide.addText("Core insight: Each algorithm compensates for the limitation of the previous one. Preprocessing removes noise, AlexNet learns real signal, PCA removes redundancy, handcrafted descriptors add fine texture and colour, fusion combines both, and ANN performs the final classification.", { x: 0.55, y: 6.86, w: 12.0, h: 0.18, fontFace: "Calibri", fontSize: 9.2, italic: true, bold: true, color: C.teal, fit: "shrink", margin: 0 });
}

// Slide 11
{
  const slide = pptx.addSlide();
  slide.background = { color: C.light };
  addHeader(slide, "Results of Each Intermediate Step", "Input, output dimensions and key observation at every pipeline stage");
  const rows = [
    ["1", "Raw image input", "12,413 × 227 × 227 × 3", "Variable brightness, noise, class imbalance"],
    ["2", "After Average Filter", "227 × 227 × 3 / image", "Artifacts removed, more uniform brightness"],
    ["3", "After CLAHE", "227 × 227 × 3 / image", "Vessels sharpened, lesions become more visible"],
    ["4", "AlexNet output", "12,413 × 2048", "High-dimensional deep feature representations"],
    ["5", "After PCA", "12,413 × 512", "75% fewer features while retaining dominant variance"],
    ["6", "DWT extraction", "12,413 × 12", "Multi-scale wavelet texture coefficients"],
    ["7", "LBP extraction", "12,413 × 203", "Local binary pattern histograms"],
    ["8", "FCH extraction", "12,413 × 16", "Fuzzy colour distribution values"],
    ["9", "GLCM extraction", "12,413 × 13", "Spatial co-occurrence statistics"],
    ["10", "Handcrafted fusion", "12,413 × 244", "Compact texture and colour descriptor"],
    ["11", "Radiomic fusion", "12,413 × 756", "Full discriminative radiomic vector"],
    ["12", "ANN training", "Trained model weights", "Decision boundaries learned across 5 stages"],
    ["13", "Final prediction", "DR stage label (0–4)", "99.1% accuracy on the test set"],
  ];
  slide.addTable(tableRows([["Step", "Stage", "Output Shape", "Key Observation"], ...rows]), { x: 0.48, y: 1.14, w: 12.38, h: 5.7, border: { type: "solid", color: C.softBorder, pt: 1 }, fill: "FFFFFF", color: C.dark, fontFace: "Calibri", fontSize: 9.0, rowH: 0.39, colW: [0.7, 3.2, 2.75, 5.45], margin: 0.04, autoFit: false, valign: "mid" });
  slide.addText("Key insight: Reducing 2048 → 512 through PCA improves accuracy by removing correlated noise. The 756-dimensional radiomic vector gives the highest inter-class separability among all six systems reported in the journal.", { x: 0.55, y: 6.88, w: 12.0, h: 0.18, fontFace: "Calibri", fontSize: 9.2, italic: true, bold: true, color: C.teal, fit: "shrink", margin: 0 });
}

// Slide 12
{
  const slide = pptx.addSlide();
  slide.background = { color: C.light };
  addHeader(slide, "How to Interpret the Results", "Understanding each metric — technically and clinically — and what the numbers mean for real patients");
  const metrics = [
    [C.teal, "Accuracy 99.1%", "(TP+TN)/(TP+TN+FP+FN)", "99.1% of all fundus images were correctly classified across the five DR stages.", "Only about 9 in every 1,000 patients would receive an incorrect class prediction."],
    [C.blue, "Sensitivity 97.92%", "TP/(TP+FN)", "97.92% of actual DR cases were correctly identified by the system.", "Fewer than 3 in every 100 diseased patients are missed, which is critical for screening safety."],
    [C.purple, "Specificity 99.4%", "TN/(TN+FP)", "99.4% of healthy eyes were correctly identified as healthy.", "False alarms are rare, reducing unnecessary referrals and treatment burden."],
    [C.amber, "Precision 99.06%", "TP/(TP+FP)", "When the system predicts DR, it is correct 99.06% of the time.", "Clinicians can trust a positive prediction with high confidence."],
    [C.darkRed, "AUC 99.56%", "Area under ROC curve", "The classifier shows near-perfect separability between classes.", "The system can reliably rank severe disease above mild disease for triage and prioritisation."],
  ];
  metrics.forEach((m, idx) => {
    const y = 1.08 + idx * 1.05;
    addCard(slide, { x: 0.48, y, w: 2.0, h: 0.84, fill: m[0], line: m[0], body: m[1], bodyColor: C.white, fontSize: 14, shadow: false });
    addCard(slide, { x: 2.68, y, w: 4.2, h: 0.84, fill: "FFFFFF", line: C.softBorder, body: `Formula: ${m[2]}\nTechnical: ${m[3]}`, bodyColor: C.dark, fontSize: 9.5 });
    addCard(slide, { x: 7.05, y, w: 5.78, h: 0.84, fill: "FFFFFF", line: m[0], body: `Clinical meaning: ${m[4]}`, bodyColor: C.dark, fontSize: 9.6 });
  });
  addCard(slide, { x: 0.55, y: 6.42, w: 12.2, h: 0.42, fill: "E7F7F2", line: C.teal, body: "Rule of thumb: Accuracy >95% is clinically strong, Sensitivity >90% is safe for screening, and AUC >95% shows excellent discrimination. This system exceeds all three thresholds.", bodyColor: C.teal, fontSize: 9.7, shadow: false });
}

// Slide 13
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  slide.addText("Conclusion", { x: 0.75, y: 0.45, w: 3.5, h: 0.28, fontFace: "Calibri", fontSize: 23, bold: true, color: C.white, margin: 0 });
  slide.addText("Project objective — achieved", { x: 0.77, y: 0.86, w: 3.8, h: 0.16, fontFace: "Calibri", fontSize: 10.5, italic: true, color: "9BAECB", margin: 0 });
  slide.addText("An automated hybrid deep learning system was designed, implemented, and validated to classify retinal fundus images into all 5 DR development stages using a 756-dimensional radiomic feature pipeline.", { x: 0.78, y: 1.2, w: 11.7, h: 0.42, fontFace: "Calibri", fontSize: 11, italic: true, color: "9BAECB", fit: "shrink", margin: 0 });
  const findings = [
    [1, C.teal, "Finding 1: Hybrid radiomic features outperform single-source approaches", "Combining AlexNet PCA-reduced features (512) with DWT+LBP+FCH+GLCM handcrafted features (244) creates a richer, more discriminative 756-dimensional vector than either source alone."],
    [2, C.blue, "Finding 2: Strategic PCA placement is critical to performance", "PCA should be applied only to AlexNet features (2048 → 512). Handcrafted features are already compact and independent, so reducing them would weaken their complementary value."],
    [3, C.darkRed, "Finding 3: Clinical-grade performance is achievable", "The best system reached Accuracy 99.1%, Sensitivity 97.92%, Specificity 99.4%, AUC 99.56%, and Precision 99.06%, outperforming reviewed prior methods on the EyePACS benchmark."],
  ];
  findings.forEach((f, idx) => {
    const y = 1.9 + idx * 1.25;
    addCard(slide, { x: 0.78, y, w: 11.78, h: 0.98, fill: "11235B", line: f[1], shadow: false });
    addStepCircle(slide, f[0], 0.95, y + 0.14, f[1]);
    slide.addText(f[2], { x: 1.42, y: y + 0.11, w: 10.8, h: 0.16, fontFace: "Calibri", fontSize: 12, bold: true, color: C.white, margin: 0 });
    slide.addText(f[3], { x: 1.42, y: y + 0.36, w: 10.8, h: 0.4, fontFace: "Calibri", fontSize: 9.8, color: C.white, fit: "shrink", margin: 0 });
  });
  slide.addText("Impact: Early automated detection of Mild and Moderate NPDR can prevent progression to Proliferative DR and blindness in millions of diabetic patients worldwide.", { x: 0.8, y: 5.82, w: 11.9, h: 0.26, fontFace: "Calibri", fontSize: 11.2, bold: true, italic: true, color: C.gold, fit: "shrink", margin: 0 });
  slide.addText("Future: External validation on Messidor/APTOS · Continuous severity grading · Mobile or web deployment · Grad-CAM explainability for clinician review", { x: 0.8, y: 6.35, w: 11.9, h: 0.16, fontFace: "Calibri", fontSize: 9.2, color: "9BAECB", fit: "shrink", margin: 0 });
  addFooter(slide);
}

await pptx.writeFile({ fileName: "D:/Myportfolio/Diabetic_Retinopathy_AlexNet_Handcrafted_Presentation.pptx" });
console.log("Created: D:/Myportfolio/Diabetic_Retinopathy_AlexNet_Handcrafted_Presentation.pptx");

// Slide 5
{
  const slide = pptx.addSlide();
  slide.background = { color: C.light };
  addHeader(slide, "Dataset Selection and Details", "Kaggle EyePACS — Diabetic Retinopathy Detection");
  addSectionTitle(slide, "Why EyePACS was selected", 0.45, 1.05, 3.0, C.navy);
  addBulletText(slide, [
    "Largest publicly available DR fundus image collection",
    "Covers all 5 DR stages with real clinical diversity",
    "Images come from multiple camera types, simulating real-world variation",
    "Widely used benchmark for comparing with prior research",
    "Open access through the Kaggle competition platform"
  ], 0.48, 1.35, 5.25, 1.15);
  slide.addText("Original Dataset (35,126 images — class imbalance)", { x: 0.48, y: 2.63, w: 4.7, h: 0.2, fontFace: "Calibri", fontSize: 12.3, bold: true, color: C.darkRed, margin: 0 });
  slide.addTable(tableRows([
    ["Stage", "Class", "Images", "%"],
    ["0", "No DR", "25,810", "73.5%"],
    ["1", "Mild NPDR", "2,443", "7.0%"],
    ["2", "Moderate NPDR", "5,292", "15.1%"],
    ["3", "Severe NPDR", "873", "2.5%"],
    ["4", "Proliferative DR", "708", "2.0%"],
  ]), { x: 0.5, y: 2.92, w: 5.25, h: 1.7, border: { type: "solid", color: C.softBorder, pt: 1 }, fill: "FFFFFF", color: C.dark, fontFace: "Calibri", fontSize: 10, rowH: 0.28, autoFit: false, colW: [0.65, 2.1, 1.2, 0.8], margin: 0.04, valign: "mid", align: "center" });
  slide.addText("No DR class downsampled from 25,810 → 3,097 to fix 73.5% class-dominance bias", { x: 0.52, y: 4.75, w: 5.35, h: 0.28, fontFace: "Calibri", fontSize: 9.5, italic: true, bold: true, color: C.darkRed, fit: "shrink", margin: 0 });
  slide.addText("Balanced Dataset Used (12,413 images)", { x: 6.45, y: 1.05, w: 3.8, h: 0.2, fontFace: "Calibri", fontSize: 12.3, bold: true, color: C.teal, margin: 0 });
  slide.addTable(tableRows([
    ["Stage", "Images", "%"],
    ["No DR", "3,097", "24.9%"],
    ["Mild NPDR", "2,443", "19.7%"],
    ["Moderate NPDR", "5,292", "42.6%"],
    ["Severe NPDR", "873", "7.0%"],
    ["PDR", "708", "5.7%"],
    ["Total", "12,413", "100%"],
  ]), { x: 6.45, y: 1.34, w: 3.15, h: 1.95, border: { type: "solid", color: C.softBorder, pt: 1 }, fill: "FFFFFF", color: C.dark, fontFace: "Calibri", fontSize: 10, rowH: 0.27, colW: [1.6, 0.8, 0.65], margin: 0.04, align: "center", valign: "mid" });
  addCard(slide, { x: 9.9, y: 1.45, w: 0.95, h: 0.75, fill: C.blue, line: C.blue, body: "Original Size\n3500 × 3000 px\n24-bit RGB", bodyColor: C.white, fontSize: 9.1, shadow: false });
  addCard(slide, { x: 10.98, y: 1.45, w: 0.95, h: 0.75, fill: C.teal, line: C.teal, body: "Resized For AlexNet\n227 × 227 × 3", bodyColor: C.white, fontSize: 9.1, shadow: false });
  addCard(slide, { x: 12.06, y: 1.45, w: 0.82, h: 0.75, fill: C.grey, line: C.grey, body: "Train/Test\n80% / 20%", bodyColor: C.white, fontSize: 9.1, shadow: false });
  addSectionTitle(slide, "DR Stage Biomarkers", 6.45, 3.55, 2.8, C.navy);
  addBulletText(slide, [
    "No DR: Healthy retina with no visible lesions",
    "Mild NPDR: Microaneurysms appearing as small circular red dots",
    "Moderate NPDR: Hard exudates, soft exudates, and haemorrhages appear",
    "Severe NPDR: Extensive haemorrhage and severe vascular abnormalities",
    "PDR: Abnormal neovascularisation, pre-retinal bleeding, and blindness risk"
  ], 6.48, 3.85, 6.15, 1.55);
}

// Slide 6
{
  const slide = pptx.addSlide();
  slide.background = { color: C.light };
  addHeader(slide, "Proposed Methodology", "End-to-end pipeline — from raw fundus image to DR stage prediction (Approach 3, System 6 — Best)");
  drawMethodArchitecture(slide, 1.1, 1.0, 1.0);
  slide.addText("Critical design note: PCA is applied only to AlexNet output (2048 → 512), not to handcrafted features. The handcrafted block is already compact and independently computed, so PCA would weaken its complementary contribution.", { x: 0.82, y: 6.9, w: 11.9, h: 0.22, fontFace: "Calibri", fontSize: 9.2, italic: true, color: C.teal, fit: "shrink", margin: 0 });
}

// Slide 7
{
  const slide = pptx.addSlide();
  slide.background = { color: C.light };
  addHeader(slide, "The Algorithm", "All 6 core algorithms — equations, logic and purpose");
  const algs = [
    [1, C.teal, "Average Filter", "Z(n) = (1/M) × Σ S(n−i)    where M = 25", "Uses a 5×5 window to replace each pixel with the local average. Removes camera noise and eyelash artifacts while preserving lesion regions."],
    [2, C.purple, "CLAHE", "Clip H(t) at C → redistribute → interpolate", "Performs local histogram equalization to boost contrast of microaneurysms, vessels, and exudates without amplifying background noise."],
    [3, C.blue, "AlexNet Convolution and Pooling", "Conv: W = f × x   |   ReLU: max(0,x)   |   Pool: max()", "Learns hierarchical visual patterns from fundus images and produces a 2048-dimensional deep feature vector."],
    [4, C.grey, "PCA", "C = (1/n)XᵀX,  C·v = λ·v,  Xreduced = X·Vk", "Computes principal components and keeps the top 512 features that retain the dominant variance while reducing redundancy."],
    [5, C.amber, "LBP and Handcrafted Extraction", "LBP = Σ bp × 2^p,  bp = 1 if Ip ≥ Ic else 0", "Encodes local retinal textures. Along with DWT, FCH, and GLCM, it captures lesion texture, colour, and spatial statistics."],
    [6, C.navy, "ANN Backpropagation", "L = −Σ yi log(ŷi),   ΔW = −η × ∂L/∂W", "Learns non-linear decision boundaries over the 756-dimensional radiomic vector and outputs 5 DR stage probabilities."],
  ];
  algs.forEach((item, idx) => {
    const col = idx % 2, row = Math.floor(idx / 2), x = 0.55 + col * 6.25, y = 1.12 + row * 1.72;
    addCard(slide, { x, y, w: 5.95, h: 1.45, fill: "FFFFFF", line: item[1], shadow: true });
    addStepCircle(slide, item[0], x + 0.12, y + 0.12, item[1]);
    slide.addText(item[2], { x: x + 0.6, y: y + 0.1, w: 4.9, h: 0.18, fontFace: "Calibri", fontSize: 11.7, bold: true, color: item[1], margin: 0 });
    slide.addShape(pptx.ShapeType.roundRect, { x: x + 0.14, y: y + 0.38, w: 5.55, h: 0.26, rectRadius: 0.05, line: { color: item[1], transparency: 100 }, fill: { color: "EEF2F8" } });
    slide.addText(item[3], { x: x + 0.18, y: y + 0.435, w: 5.45, h: 0.1, fontFace: "Calibri", fontSize: 8.8, bold: true, color: item[1], margin: 0, fit: "shrink" });
    slide.addText(item[4], { x: x + 0.14, y: y + 0.73, w: 5.55, h: 0.52, fontFace: "Calibri", fontSize: 9.7, color: C.dark, fit: "shrink", margin: 0 });
  });
}

function addHeader(slide, title, subtitle) {
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: W, h: headerH, line: { color: C.navy, transparency: 100 }, fill: { color: C.navy } });
  slide.addText(title, { x: 0.42, y: 0.16, w: 7.2, h: 0.26, fontFace: "Calibri", fontSize: 22, bold: true, color: C.white, margin: 0 });
  slide.addText(subtitle, { x: 0.42, y: 0.76, w: 12, h: 0.18, fontFace: "Calibri", italic: true, fontSize: 10.5, color: C.muted, margin: 0 });
  addFooter(slide);
}

function addSectionTitle(slide, text, x, y, w, color = C.navy) {
  slide.addShape(pptx.ShapeType.rect, { x, y: y + 0.03, w: 0.08, h: 0.24, line: { color, transparency: 100 }, fill: { color } });
  slide.addText(text, { x: x + 0.12, y, w, h: 0.24, fontFace: "Calibri", fontSize: 13.5, bold: true, color, margin: 0 });
}

function addCard(slide, opts) {
  const { x, y, w, h, fill = "FFFFFF", line = C.softBorder, title, body, titleColor = C.white, bodyColor = C.dark, titleFill = null, fontSize = 10.2, titleSize = 12.2, shadow = true } = opts;
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.08, line: { color: line, pt: 1 }, fill: { color: fill },
    shadow: shadow ? { type: "outer", color: "B7C3D7", blur: 1, angle: 45, distance: 1, opacity: 0.15 } : undefined,
  });
  if (titleFill) slide.addShape(pptx.ShapeType.roundRect, { x, y, w, h: 0.34, rectRadius: 0.08, line: { color: titleFill, transparency: 100 }, fill: { color: titleFill } });
  if (title) slide.addText(title, { x: x + 0.12, y: y + 0.07, w: w - 0.24, h: 0.18, fontFace: "Calibri", fontSize: titleSize, bold: true, color: titleFill ? titleColor : bodyColor, margin: 0 });
  if (body) slide.addText(body, {
    x: x + 0.12, y: y + (title ? (titleFill ? 0.44 : 0.34) : 0.12), w: w - 0.22, h: h - (title ? (titleFill ? 0.5 : 0.4) : 0.16),
    fontFace: "Calibri", fontSize, color: bodyColor, valign: "top", margin: 0.02, fit: "shrink",
  });
}

function addBulletText(slide, lines, x, y, w, h, color = C.dark, fontSize = 10.4) {
  slide.addText(lines.map((line, idx) => ({ text: `• ${line}`, options: { breakLine: idx < lines.length - 1 } })), {
    x, y, w, h, fontFace: "Calibri", fontSize, color, valign: "top", margin: 0, fit: "shrink",
  });
}

function addPill(slide, text, x, y, w, color) {
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w, h: 0.3, rectRadius: 0.14, line: { color, pt: 1 }, fill: { color } });
  slide.addText(text, { x, y: y + 0.06, w, h: 0.14, align: "center", fontFace: "Calibri", fontSize: 10, bold: true, color: C.white, margin: 0 });
}

function addStatBox(slide, value, label, x, y, w = 1.45) {
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w, h: 0.72, rectRadius: 0.08, line: { color: C.muted, pt: 1 }, fill: { color: "11235B", transparency: 8 } });
  slide.addText(value, { x, y: y + 0.08, w, h: 0.26, align: "center", fontFace: "Calibri", fontSize: 22, bold: true, color: C.gold, margin: 0 });
  slide.addText(label, { x, y: y + 0.42, w, h: 0.14, align: "center", fontFace: "Calibri", fontSize: 8.5, color: C.white, margin: 0 });
}

function addStepCircle(slide, num, x, y, color) {
  slide.addShape(pptx.ShapeType.ellipse, { x, y, w: 0.34, h: 0.34, line: { color, pt: 1 }, fill: { color: C.white } });
  slide.addText(String(num), { x, y: y + 0.055, w: 0.34, h: 0.14, align: "center", fontFace: "Calibri", fontSize: 12, bold: true, color, margin: 0 });
}

function addArrow(slide, x1, y1, x2, y2, color = C.navy, pt = 1.2) {
  slide.addShape(pptx.ShapeType.line, { x: x1, y: y1, w: x2 - x1, h: y2 - y1, line: { color, pt, endArrowType: "triangle" } });
}

function drawMethodArchitecture(slide, x, y, scale = 1) {
  const bw = 2.0 * scale, bh = 0.44 * scale, gapY = 0.28 * scale, leftX = x, midX = x + 2.55 * scale, rightX = x + 5.35 * scale;
  addCard(slide, { x: midX, y, w: bw, h: bh, fill: C.teal, line: C.teal, body: "Colour Fundus Image Input\n227×227×3 RGB", bodyColor: C.white, fontSize: 10.2, shadow: false });
  addArrow(slide, midX + bw / 2, y + bh, midX + bw / 2, y + bh + gapY - 0.03, C.teal);
  addCard(slide, { x: midX - 0.15, y: y + bh + gapY, w: bw + 0.3, h: 0.56 * scale, fill: C.purple, line: C.purple, body: "Preprocessing\nAverage Filter + CLAHE", bodyColor: C.white, fontSize: 10.2, shadow: false });
  addArrow(slide, midX + bw / 2, y + bh + gapY + 0.56 * scale, leftX + bw / 2, y + 1.75 * scale, C.purple);
  addArrow(slide, midX + bw / 2 + 0.05, y + bh + gapY + 0.56 * scale, rightX + bw / 2, y + 1.75 * scale, C.purple);
  addCard(slide, { x: leftX, y: y + 1.82 * scale, w: bw, h: 0.54 * scale, fill: C.blue, line: C.blue, body: "AlexNet CNN\n2048-dim deep vector", bodyColor: C.white, fontSize: 10.1, shadow: false });
  addArrow(slide, leftX + bw / 2, y + 2.36 * scale, leftX + bw / 2, y + 2.64 * scale, C.blue);
  addCard(slide, { x: leftX, y: y + 2.68 * scale, w: bw, h: 0.46 * scale, fill: C.grey, line: C.grey, body: "PCA\n2048 → 512", bodyColor: C.white, fontSize: 10.1, shadow: false });
  addCard(slide, { x: rightX, y: y + 1.82 * scale, w: bw + 0.4, h: 1.4 * scale, fill: "FFF8F0", line: C.amber, title: "Handcrafted Features", titleFill: C.amber, titleColor: C.white, body: "DWT → 12\nLBP → 203\nFCH → 16\nGLCM → 13\nTotal = 244", bodyColor: C.dark, fontSize: 9.6, titleSize: 11.2, shadow: false });
  addArrow(slide, leftX + bw / 2, y + 3.14 * scale, midX + bw / 2, y + 3.54 * scale, C.darkRed);
  addArrow(slide, rightX + (bw + 0.4) / 2, y + 3.22 * scale, midX + bw / 2 + 0.02, y + 3.54 * scale, C.darkRed);
  addCard(slide, { x: midX - 0.1, y: y + 3.56 * scale, w: bw + 0.2, h: 0.58 * scale, fill: C.darkRed, line: C.darkRed, body: "Radiomic Feature Fusion\n512 ⊕ 244 = 756", bodyColor: C.white, fontSize: 10.1, shadow: false });
  addArrow(slide, midX + bw / 2, y + 4.14 * scale, midX + bw / 2, y + 4.42 * scale, C.darkRed);
  addCard(slide, { x: midX - 0.05, y: y + 4.46 * scale, w: bw + 0.1, h: 0.54 * scale, fill: C.blue, line: C.blue, body: "ANN Classifier\n12 Hidden Layers + Softmax(5)", bodyColor: C.white, fontSize: 10, shadow: false });
  addArrow(slide, midX + bw / 2, y + 5.0 * scale, midX + bw / 2, y + 5.28 * scale, C.blue);
  [["No DR", C.teal], ["Mild", C.green], ["Moderate", C.amber], ["Severe", C.coral], ["PDR", C.red]].forEach((item, idx) => {
    addCard(slide, { x: x + idx * 1.18 * scale, y: y + 5.34 * scale, w: 1.08 * scale, h: 0.38 * scale, fill: item[1], line: item[1], body: item[0], bodyColor: C.white, fontSize: 9.4, shadow: false });
  });
}

function tableRows(rows) {
  return rows.map((r, ridx) => r.map((cell) => ({ text: String(cell), options: ridx === 0 ? { bold: true, color: C.white, fill: C.navy, align: "center" } : {} })));
}

// Slide 1
{
  const slide = pptx.addSlide();
  slide.background = { color: C.navy };
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.2, h: H, line: { color: C.teal, transparency: 100 }, fill: { color: C.teal } });
  slide.addText("Diabetic Retinopathy Detection\nand Stage Classification Using Deep Learning", {
    x: 0.75, y: 0.95, w: 7.8, h: 1.1, fontFace: "Calibri", fontSize: 24, bold: true, color: C.white, margin: 0,
  });
  slide.addText("A Hybrid AlexNet + Handcrafted Features Approach for\nEarly Diagnosis from Retinal Fundus Images", {
    x: 0.77, y: 2.15, w: 7.2, h: 0.45, fontFace: "Calibri", fontSize: 11, italic: true, color: "9BAECB", margin: 0,
  });
  addPill(slide, "AlexNet", 0.78, 2.95, 1.25, C.blue);
  addPill(slide, "PCA", 2.14, 2.95, 0.92, C.grey);
  addPill(slide, "DWT · LBP · FCH · GLCM", 3.18, 2.95, 2.55, C.amber);
  addPill(slide, "ANN Classifier", 5.88, 2.95, 1.55, C.teal);
  addStatBox(slide, "99.1%", "Accuracy", 0.82, 4.12);
  addStatBox(slide, "99.56%", "AUC", 2.45, 4.12);
  addStatBox(slide, "97.92%", "Sensitivity", 4.08, 4.12);
  addStatBox(slide, "99.4%", "Specificity", 5.71, 4.12);
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: H - 0.42, w: W, h: 0.42, line: { color: C.footer, transparency: 100 }, fill: { color: C.footer } });
  slide.addText("Domain: Medical Image Analysis · Dataset: Kaggle EyePACS · 12,413 Fundus Images · 5 DR Classes", {
    x: 0.75, y: H - 0.28, w: 11.8, h: 0.12, fontFace: "Calibri", fontSize: 8.5, color: C.muted, margin: 0,
  });
}

// Slide 2
{
  const slide = pptx.addSlide();
  slide.background = { color: C.light };
  addHeader(slide, "Introduction", "What is Diabetic Retinopathy and why is automated detection critically needed?");
  addSectionTitle(slide, "What is Diabetic Retinopathy?", 0.45, 1.08, 4.8, C.navy);
  slide.addText("Diabetic Retinopathy (DR) is a severe ocular complication of diabetes. In diabetic patients, excess blood glucose damages small blood vessels in the retina causing them to swell and rupture. The retina gradually deteriorates across five stages, and if DR is not detected early it can lead to irreversible blindness.", {
    x: 0.46, y: 1.38, w: 5.95, h: 1.1, fontFace: "Calibri", fontSize: 10.5, color: C.dark, fit: "shrink", margin: 0,
  });
  addBulletText(slide, [
    "According to WHO, diabetes may affect 642 million people by 2040, and roughly one-third may develop DR",
    "2.6% of global blindness is directly caused by DR",
    "About 10% of diabetic patients without DR progress to Mild DR each year",
    "Severe NPDR can progress to Proliferative DR, the blinding stage, at very high annual rates",
    "Manual diagnosis is slow, costly, and dependent on expert availability"
  ], 0.48, 2.58, 5.85, 2.45);
  addCard(slide, {
    x: 6.75, y: 1.08, w: 5.95, h: 4.95, fill: "FFFFFF", line: C.softBorder, title: "What does this project build?", titleFill: C.teal, titleColor: C.white,
    body: "An automated deep learning pipeline that takes a colour retinal fundus image as input and classifies it into one of 5 DR development stages.\n\nApproach:\n• AlexNet deep features (PCA-reduced: 2048 → 512)\n• Handcrafted features: DWT + LBP + FCH + GLCM = 244\n• Fusion: 512 + 244 = 756 radiomic features\n• ANN classifier for 5-class DR stage prediction\n\nBest Result Achieved:\nAccuracy 99.1% · AUC 99.56% · Sensitivity 97.92%\nSpecificity 99.4% · Precision 99.06%",
    bodyColor: C.dark, fontSize: 10.3, titleSize: 13,
  });
}

// Slide 3
{
  const slide = pptx.addSlide();
  slide.background = { color: C.light };
  addHeader(slide, "Problem Statement", "The clinical gap and the core technical challenge this project addresses");
  addSectionTitle(slide, "The Clinical Gap", 0.45, 1.08, 3.5, C.teal);
  addBulletText(slide, [
    "Regular retinal screening is clinically mandatory for diabetic patients, yet specialist access remains limited",
    "Manual diagnosis is time-consuming, expensive, and can vary between experts",
    "Rural and low-resource settings face a shortage of retinal specialists",
    "Without early detection, DR progresses silently from mild NPDR to proliferative disease and blindness"
  ], 0.48, 1.38, 12.2, 0.95);
  addCard(slide, { x: 0.48, y: 2.45, w: 4.08, h: 2.05, fill: "EAF1FF", line: C.blue, title: "High Visual Similarity", titleFill: C.blue, body: "The 5 DR stages share highly similar visual signatures. Lesion differences between stages are subtle and based on size, density, and distribution, so single-model classifiers often confuse them.", bodyColor: C.dark, fontSize: 10.1 });
  addCard(slide, { x: 4.63, y: 2.45, w: 4.08, h: 2.05, fill: "FFF5EA", line: C.amber, title: "Insufficient Single Features", titleFill: C.amber, body: "Deep CNN features capture global semantics but can miss fine-grained texture. Handcrafted features capture texture and colour but miss larger structural patterns. Neither alone is enough for robust 5-class separation.", bodyColor: C.dark, fontSize: 10.1 });
  addCard(slide, { x: 8.78, y: 2.45, w: 4.08, h: 2.05, fill: "FCEDEE", line: C.darkRed, title: "Dimensionality & Redundancy", titleFill: C.darkRed, body: "AlexNet produces a 2048-dimensional vector containing correlated, redundant features. Without PCA, classification becomes less efficient and more prone to overfitting.", bodyColor: C.dark, fontSize: 10.1 });
  addCard(slide, { x: 0.48, y: 5.0, w: 12.36, h: 0.88, fill: C.teal, line: C.teal, body: "Project Goal\nDesign and implement an automated pipeline that classifies colour retinal fundus images into all 5 DR stages with clinical-grade accuracy, enabling timely and targeted patient treatment decisions.", bodyColor: C.white, fontSize: 11, shadow: false });
}

// Slide 4
{
  const slide = pptx.addSlide();
  slide.background = { color: C.light };
  addHeader(slide, "Objectives", "What this project aims to achieve — technically and clinically");
  const cards = [
    [1, C.teal, "Automated Multi-Class Classification", "Build a system that classifies fundus images into all 5 DR stages with clinically reliable performance."],
    [2, C.blue, "Hybrid Deep Feature Extraction", "Extract high-level deep features using AlexNet to capture shape, edge, and structural lesion patterns."],
    [3, C.grey, "Dimensionality Reduction via PCA", "Apply PCA to AlexNet output (2048 → 512) to remove redundancy and improve ANN learning."],
    [4, C.amber, "Handcrafted Texture Features", "Extract complementary DWT, LBP, FCH, and GLCM descriptors for texture, colour, and spatial statistics."],
    [5, C.purple, "Radiomic Feature Fusion", "Fuse 512 AlexNet+PCA features with 244 handcrafted features to create a 756-dimensional radiomic vector."],
    [6, C.darkRed, "Clinical-Grade ANN Classification", "Train a deep ANN on the fused vector to separate all 5 DR stages with high sensitivity and AUC."],
  ];
  cards.forEach((item, idx) => {
    const col = idx % 2, row = Math.floor(idx / 2), x = 0.55 + col * 6.25, y = 1.15 + row * 1.7;
    addCard(slide, { x, y, w: 5.95, h: 1.45, fill: "FFFFFF", line: item[1], shadow: true });
    addStepCircle(slide, item[0], x + 0.14, y + 0.14, item[1]);
    slide.addText(item[2], { x: x + 0.6, y: y + 0.12, w: 5.05, h: 0.2, fontFace: "Calibri", fontSize: 12.1, bold: true, color: item[1], margin: 0 });
    slide.addText(item[3], { x: x + 0.14, y: y + 0.48, w: 5.6, h: 0.74, fontFace: "Calibri", fontSize: 10.1, color: C.dark, fit: "shrink", margin: 0 });
  });
}
