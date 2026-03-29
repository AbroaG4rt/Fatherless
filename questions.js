const assessmentData = [
  {
    "id": "A",
    "title": "A. ATTACHMENT TO FATHER",
    "dimension": "AF",
    "description": "Bagian ini mengukur tingkat keterikatan emosional Anda dengan sosok Ayah.",
    "questions": [
      { "text": "Saya merasa ayah saya memahami saya sebagai individu", "invert": false },
      { "text": "Saya dapat berbicara jujur dengan ayah saya", "invert": false },
      { "text": "Ayah saya mendengarkan saya dengan penuh perhatian", "invert": false },
      { "text": "Saya merasa dekat secara emosional dengan ayah saya", "invert": false },
      { "text": "Saya merasa diabaikan oleh ayah saya", "invert": true },
      { "text": "Saya menyimpan kekecewaan terhadap ayah saya", "invert": true }
    ]
  },
  {
    "id": "B",
    "title": "B. FATHER CARE & CONTROL",
    "dimension": "FC",
    "description": "Bagian ini mengevaluasi bagaimana Anda merasakan kepedulian dan kontrol dari figur Ayah.",
    "questions": [
      { "text": "Ayah saya menunjukkan kasih sayang kepada saya", "invert": false },
      { "text": "Ayah saya peduli terhadap kesejahteraan saya", "invert": false },
      { "text": "Ayah saya terlalu mengontrol hidup saya", "invert": true },
      { "text": "Ayah saya memberi kebebasan dalam mengambil keputusan", "invert": false },
      { "text": "Ayah saya sering mengkritik saya secara berlebihan", "invert": true }
    ]
  },
  {
    "id": "C",
    "title": "C. FATHER PRESENCE",
    "dimension": "FP",
    "description": "Bagian ini melihat sejauh mana Ayah hadir secara fisik dan psikologis.",
    "questions": [
      { "text": "Saya merasa memiliki figur ayah dalam hidup saya", "invert": false },
      { "text": "Ayah saya mempengaruhi nilai hidup saya", "invert": false },
      { "text": "Saya merasa kehilangan figur ayah", "invert": true },
      { "text": "Saya sering memikirkan hubungan saya dengan ayah", "invert": false },
      { "text": "Ayah saya menjadi role model bagi saya", "invert": false }
    ]
  },
  {
    "id": "D",
    "title": "D. FATHER INVOLVEMENT",
    "dimension": "FI",
    "description": "Keterlibatan aktif figur Ayah dalam keseharian Anda.",
    "questions": [
      { "text": "Ayah saya meluangkan waktu bersama saya", "invert": false },
      { "text": "Ayah saya membantu saya saat menghadapi masalah", "invert": false },
      { "text": "Ayah saya terlibat dalam pendidikan saya", "invert": false },
      { "text": "Ayah saya hadir dalam momen penting hidup saya", "invert": false },
      { "text": "Ayah saya mengetahui aktivitas sehari-hari saya", "invert": false }
    ]
  },
  {
    "id": "E",
    "title": "E. PSYCHOLOGICAL IMPACT",
    "dimension": "PI",
    "description": "Dampak psikologis yang Anda rasakan hingga saat ini.",
    "questions": [
      { "text": "Saya sering merasa tidak cukup baik", "invert": false },
      { "text": "Saya sulit mempercayai orang lain", "invert": false },
      { "text": "Saya merasa harus mandiri sejak kecil", "invert": false },
      { "text": "Saya kesulitan mengekspresikan emosi", "invert": false },
      { "text": "Saya merasa kesepian meskipun bersama orang lain", "invert": false }
    ]
  },
  {
    "id": "F",
    "title": "F. RELATIONSHIP PATTERN",
    "dimension": "RP",
    "description": "Pola perilaku Anda saat menjalin hubungan dengan orang lain.",
    "questions": [
      { "text": "Saya takut ditinggalkan oleh orang yang saya sayangi", "invert": false },
      { "text": "Saya membutuhkan validasi dari orang lain", "invert": false },
      { "text": "Saya merasa tidak nyaman dengan kedekatan emosional", "invert": false },
      { "text": "Saya cenderung menghindari keterikatan", "invert": false },
      { "text": "Saya merasa hubungan saya tidak stabil", "invert": false }
    ]
  },
  {
    "id": "G",
    "title": "G. EMOTIONAL SECURITY",
    "dimension": "ES",
    "description": "Tingkat keamanan emosional dan ketenangan batin Anda.",
    "questions": [
      { "text": "Saya sering merasa cemas tanpa alasan jelas", "invert": true },
      { "text": "Saya sulit merasa tenang dalam hidup", "invert": true },
      { "text": "Saya sering overthinking hal kecil", "invert": true },
      { "text": "Saya merasa dunia tidak aman", "invert": true },
      { "text": "Saya mudah khawatir tentang masa depan", "invert": true },
      { "text": "Saya sulit mengendalikan kecemasan", "invert": true },
      { "text": "Saya merasa sendirian saat menghadapi masalah", "invert": true },
      { "text": "Saya merasa tidak memiliki tempat aman secara emosional", "invert": true },
      { "text": "Saya sulit merasa aman dengan diri sendiri", "invert": true },
      { "text": "Saya mudah panik saat situasi tidak terkendali", "invert": true },
      { "text": "Saya merasa harus selalu waspada", "invert": true },
      { "text": "Saya sulit percaya bahwa semuanya akan baik-baik saja", "invert": true },
      { "text": "Saya merasa emosional saya tidak stabil", "invert": true },
      { "text": "Saya mudah stres dibanding orang lain", "invert": true },
      { "text": "Saya sulit merasakan ketenangan dalam waktu lama", "invert": true }
    ]
  },
  {
    "id": "H",
    "title": "H. ATTACHMENT STYLE",
    "dimension": "AS",
    "description": "Kecenderungan Anda dalam membentuk keterikatan emosional mendalam.",
    "questions": [
      { "text": "Saya takut ditinggalkan oleh orang terdekat", "invert": false },
      { "text": "Saya sering membutuhkan kepastian dalam hubungan", "invert": false },
      { "text": "Saya merasa cemas jika tidak mendapat respon", "invert": false },
      { "text": "Saya merasa terlalu bergantung secara emosional", "invert": false },
      { "text": "Saya sulit percaya sepenuhnya kepada orang lain", "invert": false },
      { "text": "Saya menjaga jarak dalam hubungan", "invert": false },
      { "text": "Saya tidak nyaman dengan kedekatan emosional", "invert": false },
      { "text": "Saya menghindari hubungan yang terlalu dalam", "invert": false },
      { "text": "Saya merasa hubungan itu berisiko", "invert": false },
      { "text": "Saya lebih nyaman mandiri daripada bergantung", "invert": false },
      { "text": "Saya sering merasa hubungan tidak stabil", "invert": false },
      { "text": "Saya mudah cemburu", "invert": false },
      { "text": "Saya sering overthinking dalam hubungan", "invert": false },
      { "text": "Saya sulit membuka diri sepenuhnya", "invert": false },
      { "text": "Saya menarik diri saat konflik", "invert": false }
    ]
  },
  {
    "id": "I",
    "title": "I. SELF-WORTH",
    "dimension": "SW",
    "description": "Harga diri dan bagaimana Anda menilai diri sendiri.",
    "questions": [
      { "text": "Saya merasa tidak cukup baik", "invert": true },
      { "text": "Saya merasa harus membuktikan diri", "invert": true },
      { "text": "Saya bergantung pada pengakuan orang lain", "invert": true },
      { "text": "Saya sering membandingkan diri", "invert": true },
      { "text": "Saya merasa minder dibanding orang lain", "invert": true },
      { "text": "Saya sulit menghargai diri sendiri", "invert": true },
      { "text": "Saya merasa tidak pantas mendapatkan hal baik", "invert": true },
      { "text": "Saya kurang percaya diri", "invert": true },
      { "text": "Saya takut gagal", "invert": true },
      { "text": "Saya takut dinilai orang lain", "invert": true },
      { "text": "Saya merasa identitas diri tidak jelas", "invert": true },
      { "text": "Saya sering meragukan diri sendiri", "invert": true },
      { "text": "Saya sulit bangga pada diri sendiri", "invert": true },
      { "text": "Saya merasa harus sempurna", "invert": true },
      { "text": "Saya sulit menerima diri sendiri", "invert": true }
    ]
  },
  {
    "id": "J",
    "title": "J. AUTHORITY PERCEPTION",
    "dimension": "AP",
    "description": "Pandangan dan reaksi Anda terhadap figur otoritas dan regulasi.",
    "questions": [
      { "text": "Saya sulit mempercayai figur otoritas", "invert": false },
      { "text": "Saya merasa otoritas tidak bisa diandalkan", "invert": false },
      { "text": "Saya tidak nyaman diarahkan", "invert": false },
      { "text": "Saya merasa otoritas sering mengecewakan", "invert": false },
      { "text": "Saya sulit menerima aturan", "invert": false },
      { "text": "Saya merasa aturan membatasi kebebasan", "invert": false },
      { "text": "Saya lebih memilih mengandalkan diri sendiri", "invert": false },
      { "text": "Saya merasa sistem tidak adil", "invert": false },
      { "text": "Saya sulit menghormati pemimpin", "invert": false },
      { "text": "Saya sering skeptis terhadap keputusan orang lain", "invert": false },
      { "text": "Saya tidak suka bergantung pada orang lain", "invert": false },
      { "text": "Saya merasa harus mandiri sepenuhnya", "invert": false }
    ]
  },
  {
    "id": "K",
    "title": "K. EMOTIONAL EXPRESSION",
    "dimension": "EE",
    "description": "Kemampuan Anda dalam mengenali dan mengekspresikan emosi.",
    "questions": [
      { "text": "Saya sulit mengekspresikan perasaan", "invert": true },
      { "text": "Saya sering memendam emosi", "invert": true },
      { "text": "Saya tidak nyaman menunjukkan kesedihan", "invert": true },
      { "text": "Saya merasa tidak aman untuk terbuka", "invert": true },
      { "text": "Saya merasa harus terlihat kuat", "invert": true },
      { "text": "Saya menyembunyikan emosi dari orang lain", "invert": true },
      { "text": "Saya merasa orang lain tidak akan memahami saya", "invert": true },
      { "text": "Saya merasa emosi adalah kelemahan", "invert": true },
      { "text": "Saya sulit mengungkapkan perasaan secara jujur", "invert": true },
      { "text": "Saya takut dinilai saat terbuka", "invert": true },
      { "text": "Saya tidak terbiasa membicarakan emosi", "invert": true },
      { "text": "Saya lebih memilih diam daripada terbuka", "invert": true },
      { "text": "Saya tidak tahu cara mengekspresikan emosi", "invert": true },
      { "text": "Saya merasa emosi saya terlalu rumit", "invert": true },
      { "text": "Saya merasa lebih aman menyimpan perasaan sendiri", "invert": true }
    ]
  }
];

export default assessmentData;
