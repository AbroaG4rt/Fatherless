// app.js

// State Management
let state = {
    userName: "",
    userEmail: "",
    currentSectionIndex: 0,
    currentQuestionIndex: 0,
    answers: {}, // Format: { "sectionId_qIndex": value }
    sections: [], // Randomized sections array
    totalQuestions: 0,
    answeredQuestions: 0
};

// Initialization
document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp() {
    // Deep clone and randomize questions within sections
    state.sections = assessmentData.map(section => {
        let sectionQuestions = [...section.questions];
        // Fisher-Yates Shuffle for questions
        for (let i = sectionQuestions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [sectionQuestions[i], sectionQuestions[j]] = [sectionQuestions[j], sectionQuestions[i]];
        }
        state.totalQuestions += sectionQuestions.length;
        return {
            ...section,
            questions: sectionQuestions
        };
    });

    attachListeners();
}

function attachListeners() {
    const introForm = document.getElementById("intro-form");
    const testView = document.getElementById("test-view");
    const introView = document.getElementById("intro-view");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const downloadBtn = document.getElementById("download-btn");
    const retakeBtn = document.getElementById("retake-btn");
    const radioInputs = document.querySelectorAll('input[name="answer"]');

    introForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const numInput = document.getElementById("user-name").value.trim();
        const emailInput = document.getElementById("user-email").value.trim();
        if (numInput) {
            state.userName = numInput;
            state.userEmail = emailInput;
            
            // Populate hidden form early
            document.getElementById("submit-name").value = state.userName;
            document.getElementById("submit-email").value = state.userEmail;
            
            initTestUI();
            switchView("intro-view", "test-view");
        }
    });

    prevBtn.addEventListener("click", () => goBackQuestion());
    nextBtn.addEventListener("click", () => goNextQuestion());

    radioInputs.forEach(input => {
        input.addEventListener("change", (e) => {
            const val = parseInt(e.target.value);
            saveAnswer(val);

            // Small delay for smooth transition auto-advance
            setTimeout(() => {
                goNextQuestion();
            }, 500);
        });
    });

    downloadBtn.addEventListener("click", generatePDF);
    retakeBtn.addEventListener("click", () => window.location.reload());
}

// UI State Management 
function switchView(hideId, showId) {
    document.getElementById(hideId).classList.remove("active-view");
    setTimeout(() => {
        document.getElementById(showId).classList.add("active-view");
    }, 50);
}

function initTestUI() {
    // Generate inner tab dots based on section count
    const tabsContainer = document.getElementById("tabs-indicator");
    tabsContainer.innerHTML = '';
    state.sections.forEach((s, idx) => {
        const dot = document.createElement("div");
        dot.classList.add("tab-dot");
        if(idx === 0) dot.classList.add("active");
        tabsContainer.appendChild(dot);
    });

    renderQuestion();
}

function renderQuestion() {
    const qText = document.getElementById("question-text");
    const qCard = document.querySelector(".question-card");
    const sectionTitle = document.getElementById("section-title");
    const qCounter = document.getElementById("question-counter");

    // Fade animation effect
    qCard.classList.add("fade-out");
    qCard.classList.remove("fade-in");

    setTimeout(() => {
        const section = state.sections[state.currentSectionIndex];
        const questionStr = section.questions[state.currentQuestionIndex];

        sectionTitle.textContent = `Section ${state.currentSectionIndex + 1}: ${section.title}`;
        qCounter.textContent = `Question ${state.currentQuestionIndex + 1} of ${section.questions.length}`;
        qText.textContent = questionStr;

        // Reset inputs
        const radioInputs = document.querySelectorAll('input[name="answer"]');
        radioInputs.forEach(r => r.checked = false);

        // Check if already answered
        const answerKey = `${section.id}_${state.currentQuestionIndex}`;
        if (state.answers[answerKey]) {
            const val = state.answers[answerKey];
            document.querySelector(`input[name="answer"][value="${val}"]`).checked = true;
            document.getElementById("next-btn").disabled = false;
        } else {
            document.getElementById("next-btn").disabled = true;
        }

        // Manage Prev button
        document.getElementById("prev-btn").disabled = (state.currentSectionIndex === 0 && state.currentQuestionIndex === 0);

        // Update Tabs UI
        const dots = document.querySelectorAll(".tab-dot");
        dots.forEach((dot, idx) => {
            dot.classList.remove("active");
            if (idx < state.currentSectionIndex) {
                dot.classList.add("completed");
            } else if (idx === state.currentSectionIndex) {
                dot.classList.add("active");
                dot.classList.remove("completed");
            } else {
                dot.classList.remove("completed");
            }
        });

        // Toggle fade-in
        qCard.classList.remove("fade-out");
        qCard.classList.add("fade-in");

    }, 300); // Wait for fade-out
}

function saveAnswer(val) {
    const section = state.sections[state.currentSectionIndex];
    const answerKey = `${section.id}_${state.currentQuestionIndex}`;
    
    if(!state.answers[answerKey]) {
        state.answeredQuestions++;
    }
    state.answers[answerKey] = val;

    updateProgressBar();
    checkToast();
}

function updateProgressBar() {
    const bar = document.getElementById("progress-bar");
    const percent = (state.answeredQuestions / state.totalQuestions) * 100;
    bar.style.width = `${percent}%`;
}

function checkToast() {
    const half = Math.floor(state.totalQuestions / 2);
    if (state.answeredQuestions === half) {
        const toast = document.getElementById("encouragement-toast");
        toast.classList.add("show");
        toast.classList.remove("hidden");
        setTimeout(() => toast.classList.remove("show"), 3500);
    }
}

function goNextQuestion() {
    const section = state.sections[state.currentSectionIndex];
    if (state.currentQuestionIndex < section.questions.length - 1) {
        state.currentQuestionIndex++;
        renderQuestion();
    } else {
        // Move to next section
        if (state.currentSectionIndex < state.sections.length - 1) {
            state.currentSectionIndex++;
            state.currentQuestionIndex = 0;
            renderQuestion();
        } else {
            // Finished!
            calculateResults();
            switchView("test-view", "result-view");
        }
    }
}

function goBackQuestion() {
    if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex--;
        renderQuestion();
    } else {
        if (state.currentSectionIndex > 0) {
            state.currentSectionIndex--;
            const section = state.sections[state.currentSectionIndex];
            state.currentQuestionIndex = section.questions.length - 1;
            renderQuestion();
        }
    }
}

// Calculations & Outputs
function calculateResults() {
    let finalScores = {}; // { "AF": percentage }
    
    state.sections.forEach(section => {
        let maxScore = section.questions.length * 5;
        let sum = 0;
        
        for (let i = 0; i < section.questions.length; i++) {
            const val = state.answers[`${section.id}_${i}`] || 0;
            sum += val;
        }
        
        const percentage = Math.round((sum / maxScore) * 100);
        finalScores[section.id] = percentage;
    });

    renderResultsUI(finalScores);
    submitDataHidden(finalScores);
}

function renderResultsUI(scores) {
    document.getElementById("result-name").textContent = state.userName;
    
    // Labels array mapped to IDs
    const labels = state.sections.map(s => s.title);
    const dataPoints = state.sections.map(s => scores[s.id]);

    // 1. Render List
    const scoreList = document.getElementById("score-list");
    scoreList.innerHTML = '';
    state.sections.forEach(s => {
        const li = document.createElement("li");
        li.innerHTML = `<span class="score-name">${s.title} (${s.id})</span> <span class="score-val">${scores[s.id]}%</span>`;
        scoreList.appendChild(li);
    });

    // 2. Render Radar Chart
    const ctx = document.getElementById("radarChart").getContext("2d");
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Dimension Score (%)',
                data: dataPoints,
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                borderColor: 'rgba(99, 102, 241, 1)',
                pointBackgroundColor: 'rgba(244, 114, 182, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(244, 114, 182, 1)',
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
                    grid: { color: 'rgba(0, 0, 0, 0.1)' },
                    pointLabels: {
                        font: { size: 10, family: "'Inter', sans-serif" },
                        color: '#6b7280'
                    },
                    ticks: {
                        min: 0,
                        max: 100,
                        stepSize: 20,
                        display: false
                    }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

    // 3. Generate Insights (Basic Rules depending on dimensions)
    generateInsights(scores);
}

function generateInsights(scores) {
    const strengthList = document.getElementById("strength-list");
    const riskList = document.getElementById("risk-list");
    const summary = document.getElementById("psych-summary");
    
    strengthList.innerHTML = '';
    riskList.innerHTML = '';
    
    let strengths = [];
    let risks = [];

    // Simple heuristical analysis based on typical meaning
    if (scores["ES"] > 60) strengths.push("Strong Emotional Security");
    if (scores["SW"] > 60) strengths.push("High Self-Worth");
    if (scores["FI"] > 50) strengths.push("Experienced Father Involvement");
    
    if (scores["AS"] > 60) risks.push("Anxious/Avoidant Attachment tendencies");
    if (scores["RP"] > 60) risks.push("Fear of Abandonment in Relationships");
    if (scores["AP"] > 70) risks.push("Distrust towards Authority figures");
    if (scores["EE"] > 60) risks.push("Suppressed Emotional Expression");
    if (scores["PI"] > 60) risks.push("High Psychological Impact from Absence");

    if (strengths.length === 0) strengths.push("Adaptive Independence", "High Resilience Potential");
    if (risks.length === 0) risks.push("None identified across major domains");

    strengths.forEach(s => {
        const li = document.createElement("li");
        li.textContent = s;
        strengthList.appendChild(li);
    });

    risks.forEach(r => {
        const li = document.createElement("li");
        li.textContent = r;
        riskList.appendChild(li);
    });

    // Summary Text
    let sumText = "Your profile suggests ";
    if (scores["ES"] > 50 && scores["SW"] > 50) {
        sumText += "a solid psychological foundation and emotional regulation capabilities.";
    } else if (scores["AS"] > 60 || scores["PI"] > 60) {
        sumText += "significant emotional patterns likely developed as a protective mechanism. The data points towards challenges in trust and relationship stability.";
    } else {
        sumText += "a balanced adaptive strategy towards emotional security, with specific areas of internal tension remaining.";
    }
    summary.textContent = sumText;
}

function submitDataHidden(scores) {
    // Stringify scores for the hidden input
    document.getElementById("submit-scores").value = JSON.stringify(scores);
    
    // Auto-submit form in background to avoid reloading
    const hiddenForm = document.getElementById("submission-form");
    if (hiddenForm) {
        hiddenForm.submit();
    }
}

// PDF Generation
function generatePDF() {
    const element = document.getElementById('pdf-content');
    const opt = {
      margin:       10,
      filename:     `Fatherless_Impact_Report_${state.userName.replace(' ', '_')}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Temporarily adjust styles for better PDF output if needed
    element.style.padding = '20px';
    element.style.background = '#fff';

    html2pdf().set(opt).from(element).save().then(() => {
        // Revert temporary styles
        element.style.padding = '';
        element.style.background = '';
    });
}
