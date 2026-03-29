import assessmentData from './questions.js';

// State
let state = {
  userInfo: null,
  currentSectionIndex: 0,
  answers: {}, // Key: section dimension (e.g., "AF"), Value: array of int scores
  dimensionScores: {} // Key: dimension, Value: percentage 0-100
};

// DOM Elements
const sections = {
  intro: document.getElementById('sec-intro'),
  question: document.getElementById('sec-question'),
  loading: document.getElementById('sec-loading'),
  result: document.getElementById('sec-result'),
};

const dom = {
  userForm: document.getElementById('user-form'),
  progressBar: document.getElementById('progress-bar'),
  progressContainer: document.getElementById('progress-container'),
  
  qTitle: document.getElementById('q-section-title'),
  qDesc: document.getElementById('q-section-desc'),
  qContainer: document.getElementById('questions-container'),
  btnNext: document.getElementById('btn-next'),

  resType: document.getElementById('res-type'),
  resCore: document.getElementById('res-core'),
  resStrengths: document.getElementById('res-strengths'),
  resChallenges: document.getElementById('res-challenges'),
  resPlan: document.getElementById('res-plan'),
  
  radarChart: document.getElementById('radarChart'),
  btnDownload: document.getElementById('btn-download-pdf'),
  btnShare: document.getElementById('btn-share'),
  qrContainer: document.getElementById('qr-container'),
  qrcode: document.getElementById('qrcode'),
  
  fsName: document.getElementById('fs-name'),
  fsTimestamp: document.getElementById('fs-timestamp'),
  hiddenForm: document.getElementById('hidden-form')
};

// Utils
const showSection = (sec) => {
  Object.values(sections).forEach(s => s.classList.remove('active'));
  sec.classList.add('active');
};

const updateProgress = () => {
  const total = assessmentData.length;
  const curr = state.currentSectionIndex;
  const perc = (curr / total) * 100;
  dom.progressBar.style.width = `${perc}%`;
};

// Event Listeners
dom.userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  state.userInfo = {
    name: document.getElementById('input-name').value,
    age: document.getElementById('input-age').value,
    city: document.getElementById('input-city').value,
    contact: document.getElementById('input-contact').value
  };
  
  dom.progressContainer.style.display = 'block';
  showSection(sections.question);
  renderSection();
});

dom.btnNext.addEventListener('click', () => {
  if (!validateCurrentSection()) {
    alert("Harap jawab semua pertanyaan di bagian ini sebelum melanjutkan.");
    return;
  }
  
  saveCurrentSection();
  
  state.currentSectionIndex++;
  if (state.currentSectionIndex < assessmentData.length) {
    renderSection();
  } else {
    finishAssessment();
  }
});

// Logic - Shuffle Questions using native array sort for randomness within section
const renderSection = () => {
  dom.btnNext.disabled = true;
  updateProgress();
  dom.qContainer.innerHTML = '';
  
  const secData = assessmentData[state.currentSectionIndex];
  dom.qTitle.textContent = `${state.currentSectionIndex + 1}/11 - ${secData.title}`;
  dom.qDesc.textContent = secData.description;
  
  // Randomize questions for this session
  const shuffledQs = [...secData.questions].sort(() => Math.random() - 0.5);
  // Store them so we can fetch them back in order when saving
  secData._currentSessionQs = shuffledQs;
  
  shuffledQs.forEach((q, idx) => {
    const qBlock = document.createElement('div');
    qBlock.className = 'question-block';
    
    const qText = document.createElement('div');
    qText.className = 'question-text';
    qText.textContent = q.text;
    qBlock.appendChild(qText);
    
    const likertScale = document.createElement('div');
    likertScale.className = 'likert-scale';
    
    for (let i = 1; i <= 5; i++) {
        const btn = document.createElement('button');
        btn.className = `likert-btn val-${i}`;
        btn.dataset.val = i;
        btn.dataset.qIdx = idx;
        btn.addEventListener('click', handleLikertClick);
        likertScale.appendChild(btn);
    }
    
    qBlock.appendChild(likertScale);
    
    const labels = document.createElement('div');
    labels.className = 'likert-labels';
    labels.innerHTML = `<span class="disagree-label">Sangat Tidak Sesuai</span><span class="agree-label">Sangat Sesuai</span>`;
    qBlock.appendChild(labels);
    
    dom.qContainer.appendChild(qBlock);
  });
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleLikertClick = (e) => {
  const btn = e.currentTarget;
  const parent = btn.parentElement;
  
  // Clear siblings
  Array.from(parent.children).forEach(c => c.classList.remove('selected'));
  btn.classList.add('selected');
  
  checkSectionComplete();
};

const checkSectionComplete = () => {
  const qBlocks = dom.qContainer.querySelectorAll('.question-block');
  const allAnswered = Array.from(qBlocks).every(b => b.querySelector('.likert-btn.selected'));
  dom.btnNext.disabled = !allAnswered;
};

const validateCurrentSection = () => {
  const qBlocks = dom.qContainer.querySelectorAll('.question-block');
  return Array.from(qBlocks).every(b => b.querySelector('.likert-btn.selected'));
};

const saveCurrentSection = () => {
    const secData = assessmentData[state.currentSectionIndex];
    const qBlocks = dom.qContainer.querySelectorAll('.question-block');
    
    const scores = [];
    qBlocks.forEach((block, idx) => {
        const btn = block.querySelector('.likert-btn.selected');
        let val = parseInt(btn.dataset.val);
        const qRef = secData._currentSessionQs[idx];
        
        // Handle Inversion (Reverse Coding)
        if (qRef.invert) {
            val = 6 - val; // 1->5, 2->4, 3->3, 4->2, 5->1
        }
        scores.push(val);
    });
    
    state.answers[secData.dimension] = scores;
};

const finishAssessment = () => {
  dom.progressContainer.style.display = 'none';
  showSection(sections.loading);
  
  setTimeout(() => {
    calculateFinalScores();
    generateResultProfile();
    sendFormSubmit();
    showSection(sections.result);
    drawChart();
  }, 2000); // Fake logic processing time for UX
};

const calculateFinalScores = () => {
  assessmentData.forEach(sec => {
    const dim = sec.dimension;
    const ansArray = state.answers[dim];
    const sum = ansArray.reduce((acc, curr) => acc + curr, 0);
    const maxScore = ansArray.length * 5;
    
    const percentage = Math.round((sum / maxScore) * 100);
    state.dimensionScores[dim] = percentage;
  });
};

const sendFormSubmit = () => {
  dom.fsName.value = state.userInfo.name;
  dom.fsTimestamp.value = new Date().toISOString();
  // We use Fetch to avoid page redirect on dummy email
  fetch(dom.hiddenForm.action, {
      method: "POST",
      body: new FormData(dom.hiddenForm)
  }).catch(e => console.log('Form submition failed/cors block, continuing...', e));
};

// --- PROFILE HEURISTICS ---
const getProfileHeuristic = (s) => {
  let candidates = [];
  const add = (name, core, str, chal, plan, metric) => {
      candidates.push({name, core, strengths: str, challenges: chal, plan, score: metric});
  };

  // 1. The Independent Survivor (AF < 50%, FI < 50%, SW > 60% OR PI > 60%)
  if (s.AF < 50 && s.FI < 50 && (s.SW > 60 || s.PI > 60)) {
    add("The Independent Survivor", 
    "Anda mengembangkan kemandirian ekstrem sebagai respons terhadap absennya keterlibatan ayah.", 
    "Sangat mandiri, resilient, mampu bertahan dalam situasi sulit.", 
    "Menutup diri dari bantuan orang lain, rentan mengalami kelelahan batin.", 
    "Belajar mendelegasikan tugas dan menyadari bahwa meminta bantuan bukanlah tanda kelemahan.", 
    ((100-s.AF) + (100-s.FI) + Math.max(s.SW, s.PI)) / 3);
  }

  // 2. The Approval Seeker (SW < 50%, AS > 60%, RP > 60%)
  if (s.SW < 50 && s.AS > 60 && s.RP > 60) {
    add("The Approval Seeker", 
    "Ada kerinduan akan validasi yang belum terpenuhi, sehingga Anda mencarinya melalui hubungan eksternal.", 
    "Sangat peduli pada orang lain, empatik, ingin menyenangkan lingkungan.", 
    "Cenderung mengorbankan diri sendiri demi diterima, takut ditolak.", 
    "Bangun validasi dari dalam diri. Berlatih untuk mengatakan 'tidak' tanpa rasa bersalah.", 
    ((100-s.SW) + s.AS + s.RP) / 3);
  }

  // 3. The Guarded Heart (AF < 50%, AS > 60%, EE < 50%)
  if (s.AF < 50 && s.AS > 60 && s.EE < 50) {
    add("The Guarded Heart", 
    "Anda membangun dinding emosional untuk melindungi diri dari kekecewaan akibat kurangnya kedekatan di masa lalu.", 
    "Sangat rasional, stabil di permukaan, mampu melindungi diri dari toksisitas.", 
    "Sulit percaya orang lain sepenuhnya, terisolasi secara emosional.", 
    "Cobalah untuk membagikan kerentanan Anda sedikit demi sedikit dengan satu orang yang Anda percayai.", 
    ((100-s.AF) + s.AS + (100-s.EE)) / 3);
  }

  // 4. The Emotional Avoider (EE < 50%, AS > 60%, PI >= 40%)
  if (s.EE < 50 && s.AS > 60 && s.PI >= 40) {
    add("The Emotional Avoider", 
    "Menutup emosi adalah strategi bertahan hidup agar tidak perlu merasakan sakitnya kekecewaan.", 
    "Fokus pada penyelesaian masalah (problem solver), jarang terjabak drama emosional.", 
    "Pemendaman emosi dapat bermanifestasi menjadi stres fisik atau ledakan emosi mendadak.", 
    "Mulai latih jurnal harian untuk mengenali emosi apa yang sedang bermukim di dalam batin.", 
    ((100-s.EE) + s.AS + s.PI) / 3);
  }

  // 5. The Love Chaser (AS > 60%, RP > 60%, ES < 50%)
  if (s.AS > 60 && s.RP > 60 && s.ES < 50) {
    add("The Love Chaser", 
    "Anda cenderung mengejar intensitas emosional dalam hubungan akibat perasaan tidak aman yang mendalam.", 
    "Sangat penyayang, romantis, berdedikasi tinggi pada pasangan.", 
    "Takut ditinggalkan, overthinking dalam hubungan, kehilangan batas diri.", 
    "Kenali pola cemas Anda. Sadari bahwa kepastian sebuah hubungan datang dari rasa aman di diri Anda, bukan dari validasi eksternal terus-menerus.", 
    (s.AS + s.RP + (100-s.ES)) / 3);
  }

  // 6. The Silent Fighter (EE < 50%, PI > 60%, SW >= 40%)
  if (s.EE < 50 && s.PI > 60 && s.SW >= 40) {
    add("The Silent Fighter", 
    "Anda menanggung beban psikologis yang berat namun memilih untuk bertarung dalam diam agar tidak merepotkan.", 
    "Kuat menanggung tekanan, bertanggung jawab, gigih.", 
    "Sangat rentan terhadap depresi tersembunyi karena merasa tidak ada ruang untuk mengeluh.", 
    "Beri diri Anda ruang untuk merasa lelah dan beristirahat. Anda tidak harus selalu terlihat kuat.", 
    ((100-s.EE) + s.PI + s.SW) / 3);
  }

  // 7. The Over-Responsible Child (PI > 60%, AP > 60%, EE <= 60%)
  if (s.PI > 60 && s.AP > 60 && s.EE <= 60) {
    add("The Over-Responsible Child", 
    "Tumbuh dewasa terlalu cepat karena figur otoritas yang absen memaksa Anda mengambil peran pemimpin sejak dini.", 
    "Dapat diandalkan, dewasa secara pemikiran, berorientasi masa depan.", 
    "Terlalu keras pada diri sendiri karena takut gagal.", 
    "Sadari bahwa Anda berhak menjadi 'anak' pada beberapa aspek hidup. Lepaskan kontrol pada hal-hal kecil.", 
    (s.PI + s.AP + (100-s.EE)) / 3);
  }

  // 8. The Distrustful Mind (AP > 60%, AF < 50%, AS > 60%)
  if (s.AP > 60 && s.AF < 50 && s.AS > 60) {
    add("The Distrustful Mind", 
    "Pandangan skeptis pada figur pimpinan atau laki-laki terbentuk dari hilangnya kepercayaan sejak awal.", 
    "Pemikir kristis, tajam dalam analisa, tidak mudah dimanipulasi.", 
    "Sinisme yang berlebihan membuat Anda kehilangan kesempatan untuk dibimbing.", 
    "Belajar memilah bahwa tidak semua figur otoritas akan mengecewakan seperti figur sebelumnya.", 
    (s.AP + (100-s.AF) + s.AS) / 3);
  }

  // 9. The Attention Performer (SW < 50%, RP > 60%, EE > 60%)
  if (s.SW < 50 && s.RP > 60 && s.EE > 60) {
    add("The Attention Performer", 
    "Mengekspresikan diri secara berlebihan seringkali adalah sebuah topeng untuk rasa 'tidak cukup berharga' di dalam.", 
    "Kreatif, sosial, hangat saat berinteraksi.", 
    "Mendasarkan harga diri pada opini publik, energi cepat habis karena tampil.", 
    "Cari waktu untuk menikmati keheningan. Anda berharga tanpa tepuk tangan orang lain.", 
    ((100-s.SW) + s.RP + s.EE) / 3);
  }
  
  // 10. The Balanced Builder (ES > 60%, AS < 50%, SW > 60%)
  if (s.ES > 60 && s.AS < 50 && s.SW > 60) {
    add("The Balanced Builder", 
    "Anda berhasil membangun landasan mental yang stabil meskipun mungkin masa lalu tidak sempurna.", 
    "Kestabilan emosi yang baik, self-esteem kokoh, mampu menjalin relasi sehat.", 
    "Kadang mengabaikan luka kecil karena terlalu fokus pada keutuhan bangunan secara umum.", 
    "Terus pertahankan regulasi emosi yang baik dan bagikan pengalaman Anda pada mereka yang berjuang.", 
    (s.ES + (100-s.AS) + s.SW) / 3);
  }

  // 11. The Cycle Breaker (PI > 60%, SW > 50%, EE > 50%)
  if (s.PI > 60 && s.SW > 50 && s.EE > 50) {
    add("The Cycle Breaker", 
    "Meski membawa beban dampak psikologis, tingginya harga diri dan kesadaran emosional Anda memungkinkan Anda untuk memutus rantai trauma antargenerasi.", 
    "Tingkat self-awareness superior, empati mendalam, orientasi pada pemulihan.", 
    "Beban menjadi 'penyembuh' siklus keluarga bisa sangat menguras emosi dan menuntut pengorbanan batin.", 
    "Pertahankan proses healing ini perlahan, dan pastikan Anda mencari bantuan juga saat energi mulai menipis.", 
    (s.PI + s.SW + s.EE) / 3);
  }

  // 12. Fallback / Universal Default: The Self-Healer
  add("The Self-Healer", 
  "Anda secara bertahap belajar merajut kembali bagian diri Anda. Dampaknya mungkin samar, tetapi Anda di jalur pemulihan introspektif.", 
  "Kemampuan adaptasi yang tenang dan berjalan pada proses Anda sendiri.", 
  "Sering merasa bingung akan identitas karena trauma tidak selalu terlihat wujudnya dengan jelas.", 
  "Lanjutkan pencarian diri. Validasi rasa kehilangan Anda meskipun itu abu-abu.", 
  1); // Always guaranteed but lowest weight

  candidates.sort((a,b) => b.score - a.score);
  return candidates[0]; // The top match profile
};

const generateResultProfile = () => {
  const profile = getProfileHeuristic(state.dimensionScores);
  
  dom.resType.textContent = profile.name;
  dom.resCore.textContent = profile.core;
  dom.resStrengths.textContent = profile.strengths;
  dom.resChallenges.textContent = profile.challenges;
  dom.resPlan.textContent = profile.plan;
};

const drawChart = () => {
  const ctx = dom.radarChart.getContext('2d');
  
  const labels = ['Attachment', 'Care & Control', 'Presence', 'Involvement', 'Impact', 'Relation Pattern', 'Security', 'Attach. Style', 'Self-Worth', 'Authority', 'Emotion Exp.'];
  const mapping = ['AF', 'FC', 'FP', 'FI', 'PI', 'RP', 'ES', 'AS', 'SW', 'AP', 'EE'];
  const dataPts = mapping.map(k => state.dimensionScores[k]);
  
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Persentase Dimensi',
        data: dataPts,
        backgroundColor: 'rgba(43, 108, 176, 0.2)',
        borderColor: 'rgba(43, 108, 176, 1)',
        pointBackgroundColor: 'rgba(43, 108, 176, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(43, 108, 176, 1)'
      }]
    },
    options: {
      scales: {
        r: {
          angleLines: { display: true },
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: { stepSize: 20 }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
};

// Actions
dom.btnDownload.addEventListener('click', () => {
    const el = document.getElementById('pdf-content');
    const opt = {
      margin:       [10, 10, 10, 10],
      filename:     `Laporan-Psikologi-${state.userInfo.name.replace(/\s+/g,'-')}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(el).save();
});

dom.btnShare.addEventListener('click', () => {
  dom.qrcode.innerHTML = '';
  dom.qrContainer.style.display = 'block';
  // Use current URL as the shareable endpoint
  const url = window.location.href;
  new QRCode(dom.qrcode, {
    text: url,
    width: 128,
    height: 128,
    colorDark : "#2d3748",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
  });
});
