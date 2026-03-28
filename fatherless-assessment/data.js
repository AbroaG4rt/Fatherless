const assessmentData = [
  {
    id: "AF",
    title: "Attachment to Father",
    questions: [
      "Saya merasa ayah saya memahami saya sebagai individu",
      "Saya dapat berbicara jujur dengan ayah saya",
      "Ayah saya mendengarkan saya dengan penuh perhatian",
      "Saya merasa dekat secara emosional dengan ayah saya",
      "Saya merasa diabaikan oleh ayah saya",
      "Saya menyimpan kekecewaan terhadap ayah saya"
    ]
  },
  {
    id: "FCC",
    title: "Father Care & Control",
    questions: [
      "Ayah saya menunjukkan kasih sayang kepada saya",
      "Ayah saya peduli terhadap kesejahteraan saya",
      "Ayah saya terlalu mengontrol hidup saya",
      "Ayah saya memberi kebebasan dalam mengambil keputusan",
      "Ayah saya sering mengkritik saya secara berlebihan"
    ]
  },
  {
    id: "FP",
    title: "Father Presence",
    questions: [
      "Saya merasa memiliki figur ayah dalam hidup saya",
      "Ayah saya mempengaruhi nilai hidup saya",
      "Saya merasa kehilangan figur ayah",
      "Saya sering memikirkan hubungan saya dengan ayah",
      "Ayah saya menjadi role model bagi saya"
    ]
  },
  {
    id: "FI",
    title: "Father Involvement",
    questions: [
      "Ayah saya meluangkan waktu bersama saya",
      "Ayah saya membantu saya saat menghadapi masalah",
      "Ayah saya terlibat dalam pendidikan saya",
      "Ayah saya hadir dalam momen penting hidup saya",
      "Ayah saya mengetahui aktivitas sehari-hari saya"
    ]
  },
  {
    id: "PI",
    title: "Psychological Impact",
    questions: [
      "Saya sering merasa tidak cukup baik",
      "Saya sulit mempercayai orang lain",
      "Saya merasa harus mandiri sejak kecil",
      "Saya kesulitan mengekspresikan emosi",
      "Saya merasa kesepian meskipun bersama orang lain"
    ]
  },
  {
    id: "RP",
    title: "Relationship Pattern",
    questions: [
      "Saya takut ditinggalkan oleh orang yang saya sayangi",
      "Saya membutuhkan validasi dari orang lain",
      "Saya merasa tidak nyaman dengan kedekatan emosional",
      "Saya cenderung menghindari keterikatan",
      "Saya merasa hubungan saya tidak stabil"
    ]
  },
  {
    id: "ES",
    title: "Emotional Security",
    questions: [
      "Saya sering merasa cemas tanpa alasan jelas",
      "Saya sulit merasa tenang dalam hidup",
      "Saya sering overthinking hal kecil",
      "Saya merasa dunia tidak aman",
      "Saya mudah khawatir tentang masa depan",
      "Saya sulit mengendalikan kecemasan",
      "Saya merasa sendirian saat menghadapi masalah",
      "Saya merasa tidak memiliki tempat aman secara emosional",
      "Saya sulit merasa aman dengan diri sendiri",
      "Saya mudah panik saat situasi tidak terkendali",
      "Saya merasa harus selalu waspada",
      "Saya sulit percaya bahwa semuanya akan baik-baik saja",
      "Saya merasa emosional saya tidak stabil",
      "Saya mudah stres dibanding orang lain",
      "Saya sulit merasakan ketenangan dalam waktu lama"
    ]
  },
  {
    id: "AS",
    title: "Attachment Style",
    questions: [
      "Saya takut ditinggalkan oleh orang terdekat",
      "Saya sering membutuhkan kepastian dalam hubungan",
      "Saya merasa cemas jika tidak mendapat respon",
      "Saya merasa terlalu bergantung secara emosional",
      "Saya sulit percaya sepenuhnya kepada orang lain",
      "Saya menjaga jarak dalam hubungan",
      "Saya tidak nyaman dengan kedekatan emosional",
      "Saya menghindari hubungan yang terlalu dalam",
      "Saya merasa hubungan itu berisiko",
      "Saya lebih nyaman mandiri daripada bergantung",
      "Saya sering merasa hubungan tidak stabil",
      "Saya mudah cemburu",
      "Saya sering overthinking dalam hubungan",
      "Saya sulit membuka diri sepenuhnya",
      "Saya menarik diri saat konflik"
    ]
  },
  {
    id: "SW",
    title: "Self-Worth",
    questions: [
      "Saya merasa tidak cukup baik",
      "Saya merasa harus membuktikan diri",
      "Saya bergantung pada pengakuan orang lain",
      "Saya sering membandingkan diri",
      "Saya merasa minder dibanding orang lain",
      "Saya sulit menghargai diri sendiri",
      "Saya merasa tidak pantas mendapatkan hal baik",
      "Saya kurang percaya diri",
      "Saya takut gagal",
      "Saya takut dinilai orang lain",
      "Saya merasa identitas diri tidak jelas",
      "Saya sering meragukan diri sendiri",
      "Saya sulit bangga pada diri sendiri",
      "Saya merasa harus sempurna",
      "Saya sulit menerima diri sendiri"
    ]
  },
  {
    id: "AP",
    title: "Authority Perception",
    questions: [
      "Saya sulit mempercayai figur otoritas",
      "Saya merasa otoritas tidak bisa diandalkan",
      "Saya tidak nyaman diarahkan",
      "Saya merasa otoritas sering mengecewakan",
      "Saya sulit menerima aturan",
      "Saya merasa aturan membatasi kebebasan",
      "Saya lebih memilih mengandalkan diri sendiri",
      "Saya merasa sistem tidak adil",
      "Saya sulit menghormati pemimpin",
      "Saya sering skeptis terhadap keputusan orang lain",
      "Saya tidak suka bergantung pada orang lain",
      "Saya merasa harus mandiri sepenuhnya"
    ]
  },
  {
    id: "EE",
    title: "Emotional Expression",
    questions: [
      "Saya sulit mengekspresikan perasaan",
      "Saya sering memendam emosi",
      "Saya tidak nyaman menunjukkan kesedihan",
      "Saya merasa tidak aman untuk terbuka",
      "Saya merasa harus terlihat kuat",
      "Saya menyembunyikan emosi dari orang lain",
      "Saya merasa orang lain tidak akan memahami saya",
      "Saya merasa emosi adalah kelemahan",
      "Saya sulit mengungkapkan perasaan secara jujur",
      "Saya takut dinilai saat terbuka",
      "Saya tidak terbiasa membicarakan emosi",
      "Saya lebih memilih diam daripada terbuka",
      "Saya tidak tahu cara mengekspresikan emosi",
      "Saya merasa emosi saya terlalu rumit",
      "Saya merasa lebih aman menyimpan perasaan sendiri"
    ]
  }
];
