/**
 * script.js – OnboardBuddy, Nusantara Tech
 * Semua data dummy dan logika interaktif ada di sini.
 * Tidak ada dependency eksternal selain Tailwind CSS.
 */

/* =============================================================
   DATA CHECKLIST
   Tiga fase onboarding: Hari Pertama, Minggu Pertama, Bulan Pertama.
   id: unik, digunakan sebagai kunci localStorage.
   ============================================================= */
const checklistData = [
  {
    fase: 'Hari Pertama',
    icon: '🌅',
    warna: 'blue',
    tugas: [
      { id: 'h1-t1', label: 'Aktifkan email kantor (@nusantaratech.id)' },
      { id: 'h1-t2', label: 'Bergabung ke Slack tim dan channel #general' },
      { id: 'h1-t3', label: 'Perkenalkan diri di channel #perkenalan' },
      { id: 'h1-t4', label: 'Terima dan baca Employee Handbook' },
      { id: 'h1-t5', label: 'Jadwalkan pertemuan pertama dengan Buddy' },
      { id: 'h1-t6', label: 'Aktivasi akun VPN perusahaan' },
    ],
  },
  {
    fase: 'Minggu Pertama',
    icon: '🚀',
    warna: 'indigo',
    tugas: [
      { id: 'w1-t1', label: 'Install Git dan konfigurasi nama & email' },
      { id: 'w1-t2', label: 'Install VS Code beserta ekstensi wajib' },
      { id: 'w1-t3', label: 'Clone repository utama tim dari GitLab' },
      { id: 'w1-t4', label: 'Baca dan pahami Coding Guidelines tim' },
      { id: 'w1-t5', label: 'Selesaikan onboarding task pertama (ticket #001)' },
      { id: 'w1-t6', label: 'Jadwalkan sesi 1-on-1 mingguan dengan Team Lead' },
    ],
  },
  {
    fase: 'Bulan Pertama',
    icon: '🎯',
    warna: 'violet',
    tugas: [
      { id: 'm1-t1', label: 'Kontribusi pertama: merge PR ke branch develop' },
      { id: 'm1-t2', label: 'Ikuti satu sesi Demo Day atau Review Sprint' },
      { id: 'm1-t3', label: 'Pelajari arsitektur proyek dan dokumentasi teknis' },
      { id: 'm1-t4', label: 'Selesaikan kursus internal di Learning Portal' },
      { id: 'm1-t5', label: 'Review dan beri feedback ke PR rekan setim' },
    ],
  },
];

/* =============================================================
   DATA FAQ
   12+ pertanyaan dalam 4 kategori.
   ============================================================= */
const faqData = [
  // ---- Akses & Akun ----
  {
    kategori: 'Akses & Akun',
    pertanyaan: 'Bagaimana cara mengaktifkan akun email kantor?',
    jawaban:
      'Buka tautan aktivasi yang dikirim HR ke email pribadimu. Ikuti langkah verifikasi, lalu atur kata sandi baru. Jika ada masalah, hubungi IT Support di it-support@nusantaratech.id.',
  },
  {
    kategori: 'Akses & Akun',
    pertanyaan: 'Bagaimana cara mengakses VPN perusahaan?',
    jawaban:
      'Download client VPN (Cisco AnyConnect) dari portal IT. Masukkan alamat server vpn.nusantaratech.id, lalu login menggunakan kredensial email kantor. Panduan lengkap ada di Setup Guide.',
  },
  {
    kategori: 'Akses & Akun',
    pertanyaan: 'Apa yang harus dilakukan jika lupa password?',
    jawaban:
      'Gunakan fitur "Lupa Kata Sandi" di halaman login. Jika tidak berhasil, kirim email ke it-support@nusantaratech.id atau hubungi IT Support langsung melalui Slack di channel #it-support.',
  },
  {
    kategori: 'Akses & Akun',
    pertanyaan: 'Bagaimana cara mendapatkan akses ke GitLab internal?',
    jawaban:
      'Team Lead akan menambahkanmu ke grup GitLab setelah akun email aktif. Pastikan kamu sudah menghubungi Team Lead atau Buddy untuk meminta aksesnya pada hari pertama.',
  },
  // ---- Tools Development ----
  {
    kategori: 'Tools Development',
    pertanyaan: 'Ekstensi VS Code apa saja yang wajib dipasang?',
    jawaban:
      'Ekstensi wajib: ESLint, Prettier, GitLens, Tailwind CSS IntelliSense, dan REST Client. Ekstensi rekomendasi lainnya ada di file .vscode/extensions.json di repository tim.',
  },
  {
    kategori: 'Tools Development',
    pertanyaan: 'Bagaimana konfigurasi Git yang benar untuk proyek ini?',
    jawaban:
      'Jalankan: git config --global user.name "Nama Kamu" dan git config --global user.email "email@nusantaratech.id". Gunakan SSH key untuk koneksi ke GitLab. Panduan lengkap ada di Setup Guide.',
  },
  {
    kategori: 'Tools Development',
    pertanyaan: 'Apakah ada standar Node.js version yang digunakan?',
    jawaban:
      'Kami menggunakan Node.js versi LTS terbaru (saat ini v20.x). Disarankan menggunakan nvm (Node Version Manager) agar mudah berpindah versi antar proyek.',
  },
  // ---- Proses Kerja ----
  {
    kategori: 'Proses Kerja',
    pertanyaan: 'Bagaimana alur kerja Git branching di tim ini?',
    jawaban:
      'Kami menggunakan Git Flow. Branch utama: main (production) dan develop. Buat feature branch dari develop dengan format feature/nama-fitur. PR harus direview minimal 1 orang sebelum merge.',
  },
  {
    kategori: 'Proses Kerja',
    pertanyaan: 'Kapan jadwal standup dan sprint planning?',
    jawaban:
      'Daily standup setiap hari Senin–Jumat pukul 09.00 WIB via Google Meet. Sprint planning dilakukan setiap dua minggu sekali pada Senin pertama sprint, pukul 10.00 WIB.',
  },
  {
    kategori: 'Proses Kerja',
    pertanyaan: 'Bagaimana cara melaporkan bug atau isu teknis?',
    jawaban:
      'Buat issue baru di GitLab dengan label "bug" dan deskripsi langkah reproduksi, expected behavior, dan actual behavior. Jika kritis, langsung mention Team Lead di Slack.',
  },
  // ---- Budaya Tim ----
  {
    kategori: 'Budaya Tim',
    pertanyaan: 'Bagaimana budaya kerja dan komunikasi di tim?',
    jawaban:
      'Kami menjunjung transparansi dan kolaborasi. Slack adalah alat komunikasi utama. Respons pesan diharapkan dalam 2 jam selama jam kerja. Rapat diusahakan singkat dan ada agenda tertulis.',
  },
  {
    kategori: 'Budaya Tim',
    pertanyaan: 'Adakah program mentoring atau buddy system?',
    jawaban:
      'Ya! Setiap anggota baru mendapatkan seorang Buddy selama 3 bulan pertama. Buddy adalah seniormu yang siap membantu menjawab pertanyaan teknis maupun non-teknis. Jadwalkan 1-on-1 rutin dengannya.',
  },
  {
    kategori: 'Budaya Tim',
    pertanyaan: 'Bagaimana cara memberikan dan menerima feedback?',
    jawaban:
      'Kami menggunakan model feedback SBI (Situation-Behavior-Impact). Feedback diberikan secara langsung, konstruktif, dan tepat waktu. Ada juga sesi retrospektif tiap akhir sprint untuk feedback tim.',
  },
];

/* =============================================================
   DATA KONTAK
   Empat kontak penting selama onboarding.
   ============================================================= */
const kontakData = [
  {
    nama: 'Budi Santoso',
    peran: 'Buddy / Mentor',
    icon: '🤝',
    warna: 'blue',
    kapan: 'Pertanyaan teknis sehari-hari, kebingungan proses, atau butuh arahan.',
    email: 'budi.santoso@nusantaratech.id',
  },
  {
    nama: 'Sari Dewi',
    peran: 'Team Lead',
    icon: '👩‍💻',
    warna: 'indigo',
    kapan: 'Isu teknis escalation, prioritas task, atau kendala sprint.',
    email: 'sari.dewi@nusantaratech.id',
  },
  {
    nama: 'Andi Prasetyo',
    peran: 'HR & People Ops',
    icon: '🏢',
    warna: 'violet',
    kapan: 'Pertanyaan kontrak, benefit karyawan, cuti, atau kebijakan SDM.',
    email: 'andi.prasetyo@nusantaratech.id',
  },
  {
    nama: 'Tim IT Support',
    peran: 'IT Support',
    icon: '🛠️',
    warna: 'emerald',
    kapan: 'Masalah akun, perangkat, akses sistem, VPN, atau software.',
    email: 'it-support@nusantaratech.id',
  },
];

/* =============================================================
   DATA SETUP GUIDE
   Langkah-langkah setup environment dalam bentuk accordion.
   ============================================================= */
const setupGuideData = [
  {
    judul: '1. Instalasi Git',
    isi: `
      <p class="mb-2">Download Git dari <strong>git-scm.com</strong> sesuai sistem operasimu (Windows/Mac/Linux).</p>
      <p class="mb-2">Setelah install, konfigurasi identitasmu:</p>
      <pre class="bg-gray-800 text-green-400 rounded-lg p-3 text-xs overflow-x-auto"><code>git config --global user.name "Nama Lengkapmu"
git config --global user.email "email@nusantaratech.id"
git config --global core.autocrlf input  # Mac/Linux
git config --global core.autocrlf true   # Windows</code></pre>
      <p class="mt-2 text-sm text-gray-500">Verifikasi: jalankan <code class="bg-gray-100 px-1 rounded">git --version</code></p>`,
  },
  {
    judul: '2. Setup SSH Key untuk GitLab',
    isi: `
      <p class="mb-2">Generate SSH key baru agar bisa push/pull tanpa password:</p>
      <pre class="bg-gray-800 text-green-400 rounded-lg p-3 text-xs overflow-x-auto"><code>ssh-keygen -t ed25519 -C "email@nusantaratech.id"
# Tekan Enter untuk semua prompt (gunakan default path)
cat ~/.ssh/id_ed25519.pub  # Salin output ini</code></pre>
      <p class="mt-2 mb-1 text-sm">Tempelkan public key ke GitLab:</p>
      <ol class="list-decimal list-inside text-sm space-y-1 text-gray-600">
        <li>Buka GitLab → Profil → Preferences → SSH Keys</li>
        <li>Tempel key, beri judul "Laptop Kerja", klik <strong>Add key</strong></li>
      </ol>`,
  },
  {
    judul: '3. Instalasi VS Code & Ekstensi',
    isi: `
      <p class="mb-2">Download VS Code dari <strong>code.visualstudio.com</strong>.</p>
      <p class="mb-2">Install ekstensi wajib via terminal:</p>
      <pre class="bg-gray-800 text-green-400 rounded-lg p-3 text-xs overflow-x-auto"><code>code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension eamodio.gitlens
code --install-extension bradlc.vscode-tailwindcss
code --install-extension humao.rest-client</code></pre>
      <p class="mt-2 text-sm text-gray-500">Atau buka repository, VS Code akan otomatis menyarankan ekstensi dari <code class="bg-gray-100 px-1 rounded">.vscode/extensions.json</code></p>`,
  },
  {
    judul: '4. Clone Repository Tim',
    isi: `
      <p class="mb-2">Pastikan akses GitLab sudah diberikan oleh Team Lead, lalu:</p>
      <pre class="bg-gray-800 text-green-400 rounded-lg p-3 text-xs overflow-x-auto"><code># Clone via SSH (direkomendasikan)
git clone git@gitlab.nusantaratech.id:frontend/main-app.git

# Masuk ke folder proyek
cd main-app

# Install dependencies
npm install

# Jalankan dev server
npm run dev</code></pre>
      <p class="mt-2 text-sm text-gray-500">Buka <strong>http://localhost:5173</strong> di browser untuk melihat hasilnya.</p>`,
  },
  {
    judul: '5. Setup Node.js dengan nvm',
    isi: `
      <p class="mb-2">Gunakan nvm untuk mengelola versi Node.js:</p>
      <pre class="bg-gray-800 text-green-400 rounded-lg p-3 text-xs overflow-x-auto"><code># Install nvm (Mac/Linux)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Restart terminal, lalu:
nvm install --lts        # Install versi LTS terbaru
nvm use --lts            # Gunakan versi LTS
node -v && npm -v        # Verifikasi instalasi</code></pre>
      <p class="mt-2 text-sm text-gray-500">Untuk Windows, gunakan <strong>nvm-windows</strong> dari github.com/coreybutler/nvm-windows</p>`,
  },
  {
    judul: '6. Verifikasi Akses & Konfigurasi Akhir',
    isi: `
      <p class="mb-3">Ceklis akhir sebelum mulai bekerja:</p>
      <ul class="space-y-2 text-sm text-gray-600">
        <li class="flex items-center gap-2"><span class="text-success">✔</span> Email kantor aktif dan bisa login</li>
        <li class="flex items-center gap-2"><span class="text-success">✔</span> VPN bisa terhubung</li>
        <li class="flex items-center gap-2"><span class="text-success">✔</span> SSH key terdaftar di GitLab</li>
        <li class="flex items-center gap-2"><span class="text-success">✔</span> Repository berhasil di-clone</li>
        <li class="flex items-center gap-2"><span class="text-success">✔</span> Dev server berjalan di localhost</li>
        <li class="flex items-center gap-2"><span class="text-success">✔</span> Sudah bergabung ke Slack dan channel tim</li>
      </ul>
      <p class="mt-3 text-sm text-blue-600 font-medium">🎉 Kalau semua sudah dicentang, kamu siap berkontribusi!</p>`,
  },
];

/* =============================================================
   UTILITAS: localStorage checklist
   ============================================================= */

/**
 * Simpan status satu tugas ke localStorage.
 * @param {string} id - ID tugas
 * @param {boolean} selesai - status selesai
 */
function simpanStatus(id, selesai) {
  localStorage.setItem(`ob_task_${id}`, selesai ? '1' : '0');
}

/**
 * Baca status satu tugas dari localStorage.
 * @param {string} id
 * @returns {boolean}
 */
function bacaStatus(id) {
  return localStorage.getItem(`ob_task_${id}`) === '1';
}

/* =============================================================
   HITUNG PROGRESS
   ============================================================= */

/**
 * Hitung berapa persen tugas selesai dari seluruh checklist.
 * @returns {{ persen: number, selesai: number, total: number }}
 */
function hitungProgressTotal() {
  let total = 0;
  let selesai = 0;
  checklistData.forEach((fase) => {
    fase.tugas.forEach((t) => {
      total++;
      if (bacaStatus(t.id)) selesai++;
    });
  });
  return { persen: total > 0 ? Math.round((selesai / total) * 100) : 0, selesai, total };
}

/**
 * Hitung progress per fase.
 * @param {object} fase - objek fase dari checklistData
 * @returns {{ persen: number, selesai: number, total: number }}
 */
function hitungProgressFase(fase) {
  const total = fase.tugas.length;
  const selesai = fase.tugas.filter((t) => bacaStatus(t.id)).length;
  return { persen: total > 0 ? Math.round((selesai / total) * 100) : 0, selesai, total };
}

/* =============================================================
   RENDER: DASHBOARD (progress bar + tugas berikutnya)
   ============================================================= */
function renderDashboard() {
  const { persen, selesai, total } = hitungProgressTotal();

  // Update progress bar total
  const bar = document.getElementById('total-progress-bar');
  const label = document.getElementById('total-progress-label');
  const wrap = document.getElementById('total-progressbar-wrap');
  const desc = document.getElementById('total-progress-desc');

  bar.style.width = `${persen}%`;
  label.textContent = `${persen}%`;
  wrap.setAttribute('aria-valuenow', persen);
  desc.textContent =
    persen === 100
      ? '🎉 Selamat! Semua tugas onboarding selesai!'
      : `${selesai} dari ${total} tugas telah diselesaikan.`;

  // Pesan sambutan dinamis berdasarkan rentang persentase progress
  const greeting = document.getElementById('dashboard-greeting');
  if (greeting) {
    let pesan;
    if (persen === 100) {
      pesan = '🏆 Luar biasa! Kamu telah menyelesaikan seluruh proses onboarding!';
    } else if (persen >= 70) {
      pesan = '💪 Hampir selesai! Kamu sudah melewati sebagian besar onboarding — tetap semangat!';
    } else if (persen >= 30) {
      pesan = '📈 Progresmu bagus! Teruskan dan selesaikan sisa tugas yang ada.';
    } else {
      pesan = '🌱 Baru memulai? Tidak apa-apa — mulai dari tugas pertama, satu langkah demi satu langkah!';
    }
    greeting.textContent = pesan;
  }

  // Render kartu "Tugas Berikutnya" (maks 3 tugas belum selesai)
  const container = document.getElementById('next-tasks-container');
  const tugasBelum = [];
  checklistData.forEach((fase) => {
    fase.tugas.forEach((t) => {
      if (!bacaStatus(t.id)) tugasBelum.push({ ...t, fase: fase.fase, icon: fase.icon });
    });
  });

  const tampil = tugasBelum.slice(0, 3);

  if (tampil.length === 0) {
    container.innerHTML = `
      <div class="col-span-3 text-center py-8 text-success font-semibold text-sm">
        🎉 Semua tugas sudah selesai! Kerja bagus, Rina!
      </div>`;
    return;
  }

  container.innerHTML = tampil
    .map(
      (t) => `
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div class="flex items-center gap-2 mb-2">
        <span class="text-lg" aria-hidden="true">${t.icon}</span>
        <span class="text-xs font-medium text-gray-400 uppercase tracking-wide">${t.fase}</span>
      </div>
      <p class="text-sm font-medium text-gray-700 leading-snug">${t.label}</p>
      <a href="#checklist" class="mt-3 inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline focus-ring rounded">
        Kerjakan sekarang →
      </a>
    </div>`
    )
    .join('');
}

/* =============================================================
   RENDER: CHECKLIST
   ============================================================= */

// Peta warna per fase
const warnaFase = {
  blue:    { ring: 'ring-blue-200',   bg: 'bg-blue-50',    badge: 'bg-blue-100 text-blue-700',  progress: 'bg-blue-500' },
  indigo:  { ring: 'ring-indigo-200', bg: 'bg-indigo-50',  badge: 'bg-indigo-100 text-indigo-700', progress: 'bg-indigo-500' },
  violet:  { ring: 'ring-violet-200', bg: 'bg-violet-50',  badge: 'bg-violet-100 text-violet-700', progress: 'bg-violet-500' },
};

function renderChecklist() {
  const container = document.getElementById('checklist-container');
  container.innerHTML = checklistData
    .map((fase) => {
      const warna = warnaFase[fase.warna] || warnaFase.blue;
      const prog = hitungProgressFase(fase);
      const tugasHTML = fase.tugas
        .map((t) => {
          const done = bacaStatus(t.id);
          return `
          <li>
            <label class="flex items-start gap-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors checklist-item ${done ? 'is-done' : ''}" for="task-${t.id}">
              <div class="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  id="task-${t.id}"
                  data-task-id="${t.id}"
                  ${done ? 'checked' : ''}
                  class="peer sr-only"
                  aria-label="${t.label}"
                />
                <div class="w-5 h-5 rounded-md border-2 ${done ? 'border-success bg-success' : 'border-gray-300 bg-white group-hover:border-primary'} transition-colors flex items-center justify-center peer-focus-visible:ring-2 peer-focus-visible:ring-primary/50 peer-focus-visible:ring-offset-1" aria-hidden="true">
                  ${done ? '<svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>' : ''}
                </div>
              </div>
              <span class="text-sm text-gray-700 leading-relaxed ${done ? 'line-through text-gray-400' : ''} transition-all">${t.label}</span>
            </label>
          </li>`;
        })
        .join('');

      return `
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ring-1 ${warna.ring}">
        <!-- Header fase -->
        <div class="${warna.bg} px-5 py-4 border-b border-gray-100">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <span class="text-xl" aria-hidden="true">${fase.icon}</span>
              <h3 class="font-semibold text-gray-800">${fase.fase}</h3>
            </div>
            <span class="${warna.badge} text-xs font-semibold px-2.5 py-1 rounded-full">${prog.selesai}/${prog.total} selesai</span>
          </div>
          <!-- Progress bar fase -->
          <div class="mt-3">
            <div class="bg-white/70 rounded-full h-2 overflow-hidden" role="progressbar" aria-valuenow="${prog.persen}" aria-valuemin="0" aria-valuemax="100" aria-label="Progress ${fase.fase}">
              <div class="h-full ${warna.progress} rounded-full transition-all duration-500" style="width:${prog.persen}%" data-fase-bar="${fase.fase}"></div>
            </div>
          </div>
        </div>
        <!-- Daftar tugas -->
        <ul class="divide-y divide-gray-50 px-3 py-2" role="list" aria-label="Tugas ${fase.fase}">
          ${tugasHTML}
        </ul>
      </div>`;
    })
    .join('');

  // Pasang event listener ke setiap checkbox
  document.querySelectorAll('input[data-task-id]').forEach((cb) => {
    cb.addEventListener('change', (e) => {
      const id = e.target.dataset.taskId;
      simpanStatus(id, e.target.checked);
      // Re-render checklist dan dashboard agar progress update
      renderChecklist();
      renderDashboard();
    });
  });
}

/* =============================================================
   RENDER: FAQ
   ============================================================= */
function renderFaq(query = '', kategori = '') {
  const list = document.getElementById('faq-list');
  const empty = document.getElementById('faq-empty');
  const q = query.toLowerCase().trim();

  const filtered = faqData.filter((item) => {
    const cocokKategori = !kategori || item.kategori === kategori;
    const cocokQuery =
      !q ||
      item.pertanyaan.toLowerCase().includes(q) ||
      item.jawaban.toLowerCase().includes(q) ||
      item.kategori.toLowerCase().includes(q);
    return cocokKategori && cocokQuery;
  });

  if (filtered.length === 0) {
    list.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');

  list.innerHTML = filtered
    .map((item, i) => {
      const badgeWarna = {
        'Akses & Akun': 'bg-blue-100 text-blue-700',
        'Tools Development': 'bg-orange-100 text-orange-700',
        'Proses Kerja': 'bg-violet-100 text-violet-700',
        'Budaya Tim': 'bg-emerald-100 text-emerald-700',
      };
      const badge = badgeWarna[item.kategori] || 'bg-gray-100 text-gray-600';
      return `
      <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden" role="region" aria-label="${item.pertanyaan}">
        <button
          class="w-full text-left px-5 py-4 flex items-start justify-between gap-3 hover:bg-gray-50 transition-colors focus-ring"
          aria-expanded="false"
          aria-controls="faq-answer-${i}"
          id="faq-btn-${i}"
        >
          <div class="flex-1">
            <span class="${badge} text-xs font-semibold px-2 py-0.5 rounded-full mr-2">${item.kategori}</span>
            <span class="text-sm font-medium text-gray-800 mt-1 block">${item.pertanyaan}</span>
          </div>
          <svg class="faq-chevron w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div id="faq-answer-${i}" class="faq-answer hidden px-5 pb-4 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-50" role="region" aria-labelledby="faq-btn-${i}">
          ${item.jawaban}
        </div>
      </div>`;
    })
    .join('');

  // Pasang event accordion untuk FAQ
  list.querySelectorAll('button[aria-controls]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('aria-controls');
      const answer = document.getElementById(id);
      const chevron = btn.querySelector('.faq-chevron');
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      btn.setAttribute('aria-expanded', !isOpen);
      answer.classList.toggle('hidden', isOpen);
      chevron.classList.toggle('rotate-180', !isOpen);
    });
  });
}

/* =============================================================
   RENDER: TANYA BUDDY (chat sederhana)
   ============================================================= */

/**
 * Cari jawaban dari faqData berdasarkan kata kunci.
 * @param {string} teks - pertanyaan pengguna
 * @returns {string|null} - jawaban atau null jika tidak ditemukan
 */
function cariBuddy(teks) {
  const q = teks.toLowerCase();
  // Cari yang paling relevan (pertanyaan atau jawaban mengandung kata kunci)
  const hasil = faqData.find(
    (item) =>
      item.pertanyaan.toLowerCase().includes(q) ||
      item.jawaban.toLowerCase().includes(q) ||
      item.kategori.toLowerCase().includes(q) ||
      // Cek tiap kata dengan panjang > 3
      q.split(/\s+/).some(
        (kata) =>
          kata.length > 3 &&
          (item.pertanyaan.toLowerCase().includes(kata) || item.jawaban.toLowerCase().includes(kata))
      )
  );
  return hasil ? hasil.jawaban : null;
}

/**
 * Tambahkan pesan ke area chat.
 * @param {string} teks - konten pesan
 * @param {'user'|'buddy'} pengirim
 */
function tambahPesan(teks, pengirim) {
  const area = document.getElementById('chat-messages');
  const isUser = pengirim === 'user';
  const div = document.createElement('div');
  div.className = `flex items-start gap-2 ${isUser ? 'flex-row-reverse' : ''}`;
  div.innerHTML = `
    ${
      isUser
        ? `<div class="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-xs font-bold text-gray-600" aria-hidden="true">R</div>`
        : `<div class="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white text-xs font-bold" aria-hidden="true">B</div>`
    }
    <div class="${
      isUser
        ? 'bg-primary text-white rounded-2xl rounded-tr-sm'
        : 'bg-blue-50 text-gray-700 rounded-2xl rounded-tl-sm'
    } px-4 py-2.5 text-sm max-w-xs md:max-w-md leading-relaxed">
      ${teks}
    </div>`;
  area.appendChild(div);
  // Scroll ke bawah
  area.scrollTop = area.scrollHeight;
}

function initChat() {
  const input = document.getElementById('chat-input');
  const btnSend = document.getElementById('btn-send-chat');

  function kirimPesan() {
    const teks = input.value.trim();
    if (!teks) return;

    tambahPesan(teks, 'user');
    input.value = '';

    // Simulasi jeda singkat agar terasa natural
    setTimeout(() => {
      const jawaban = cariBuddy(teks);
      if (jawaban) {
        tambahPesan(jawaban, 'buddy');
      } else {
        tambahPesan(
          'Maaf, saya belum menemukan jawaban yang tepat untuk pertanyaanmu. 🙏<br/>' +
            'Coba cek halaman <strong>FAQ</strong> atau hubungi Buddy-mu langsung: ' +
            '<strong>budi.santoso@nusantaratech.id</strong>',
          'buddy'
        );
      }
    }, 400);
  }

  btnSend.addEventListener('click', kirimPesan);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      kirimPesan();
    }
  });
}

/* =============================================================
   RENDER: KONTAK
   ============================================================= */
function renderKontak() {
  const warnaKontak = {
    blue:    { icon: 'bg-blue-100',    border: 'border-blue-100',   text: 'text-blue-700' },
    indigo:  { icon: 'bg-indigo-100',  border: 'border-indigo-100', text: 'text-indigo-700' },
    violet:  { icon: 'bg-violet-100',  border: 'border-violet-100', text: 'text-violet-700' },
    emerald: { icon: 'bg-emerald-100', border: 'border-emerald-100',text: 'text-emerald-700' },
  };

  const container = document.getElementById('kontak-container');
  container.innerHTML = kontakData
    .map((k) => {
      const w = warnaKontak[k.warna] || warnaKontak.blue;
      return `
      <div class="bg-white rounded-2xl border ${w.border} shadow-sm p-5 flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all">
        <div class="${w.icon} w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4" aria-hidden="true">${k.icon}</div>
        <h3 class="font-semibold text-gray-800 text-sm">${k.nama}</h3>
        <p class="${w.text} text-xs font-medium mb-2">${k.peran}</p>
        <p class="text-gray-500 text-xs leading-relaxed flex-1 mb-3">${k.kapan}</p>
        <a
          href="mailto:${k.email}"
          class="mt-auto text-xs text-primary font-medium hover:underline focus-ring rounded truncate"
          aria-label="Kirim email ke ${k.nama}"
        >
          ${k.email}
        </a>
      </div>`;
    })
    .join('');
}

/* =============================================================
   RENDER: SETUP GUIDE (accordion)
   ============================================================= */
function renderSetupGuide() {
  const container = document.getElementById('accordion-container');
  container.innerHTML = setupGuideData
    .map((item, i) => `
      <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <button
          class="w-full text-left px-5 py-4 flex items-center justify-between gap-3 hover:bg-gray-50 transition-colors focus-ring font-medium text-gray-800 text-sm"
          aria-expanded="${i === 0 ? 'true' : 'false'}"
          aria-controls="setup-body-${i}"
          id="setup-btn-${i}"
        >
          <span>${item.judul}</span>
          <svg class="setup-chevron w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${i === 0 ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div id="setup-body-${i}" class="px-5 pb-5 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-50 ${i === 0 ? '' : 'hidden'}" role="region" aria-labelledby="setup-btn-${i}">
          ${item.isi}
        </div>
      </div>`)
    .join('');

  // Event accordion setup guide
  container.querySelectorAll('button[aria-controls]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('aria-controls');
      const body = document.getElementById(id);
      const chevron = btn.querySelector('.setup-chevron');
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !isOpen);
      body.classList.toggle('hidden', isOpen);
      chevron.classList.toggle('rotate-180', !isOpen);
    });
  });
}

/* =============================================================
   NAVBAR: hamburger menu toggle
   ============================================================= */
function initNavbar() {
  const btnMenu = document.getElementById('btn-menu');
  const mobileMenu = document.getElementById('mobile-menu');

  btnMenu.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('hidden');
    btnMenu.setAttribute('aria-expanded', !isOpen);
  });

  // Tutup menu saat link diklik
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      btnMenu.setAttribute('aria-expanded', 'false');
    });
  });
}

/* =============================================================
   NAVBAR: highlight link aktif saat scroll
   ============================================================= */
function initScrollSpy() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            const target = link.getAttribute('href').replace('#', '');
            link.classList.toggle('text-primary', target === entry.target.id);
            link.classList.toggle('bg-blue-50', target === entry.target.id);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((sec) => observer.observe(sec));
}

/* =============================================================
   FAQ: event pencarian & filter
   ============================================================= */
function initFaqInteraksi() {
  const searchInput = document.getElementById('faq-search');
  const filterSelect = document.getElementById('faq-filter');

  function update() {
    renderFaq(searchInput.value, filterSelect.value);
  }

  searchInput.addEventListener('input', update);
  filterSelect.addEventListener('change', update);
}

/* =============================================================
   CHECKLIST: tombol reset
   ============================================================= */
function initResetChecklist() {
  // Fungsi reset yang dipakai bersama oleh dua tombol
  function lakukanReset() {
    const konfirmasi = confirm(
      'Apakah kamu yakin ingin mereset semua progress checklist? Semua tanda selesai akan dihapus.'
    );
    if (!konfirmasi) return;
    checklistData.forEach((fase) => {
      fase.tugas.forEach((t) => localStorage.removeItem(`ob_task_${t.id}`));
    });
    renderChecklist();
    renderDashboard();
  }

  // Tombol reset di section Checklist
  document.getElementById('btn-reset-checklist').addEventListener('click', lakukanReset);

  // Tombol "Reset Progress" di Dashboard — menggunakan fungsi yang sama
  const btnDashboard = document.getElementById('btn-reset-dashboard');
  if (btnDashboard) {
    btnDashboard.addEventListener('click', lakukanReset);
  }
}

/* =============================================================
   SMOOTH SCROLL polyfill-friendly
   ============================================================= */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Pindahkan fokus ke section untuk aksesibilitas
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });
}

/* =============================================================
   INISIALISASI APLIKASI
   Jalankan semua fungsi render dan event setelah DOM siap.
   ============================================================= */
document.addEventListener('DOMContentLoaded', () => {
  // Render semua komponen
  renderChecklist();
  renderDashboard();
  renderFaq();
  renderKontak();
  renderSetupGuide();

  // Inisialisasi interaksi
  initNavbar();
  initScrollSpy();
  initFaqInteraksi();
  initResetChecklist();
  initSmoothScroll();
  initChat();

  console.log('✅ OnboardBuddy berhasil dimuat tanpa error.');
});
