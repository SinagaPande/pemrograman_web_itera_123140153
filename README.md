# Manajemen Tugas Kuliah Sederhana

Aplikasi *to-do list* berbasis web murni (Vanilla JavaScript) untuk membantu mahasiswa melacak tugas kuliah. Data tugas Anda disimpan aman di *browser* Anda menggunakan **LocalStorage**.

---

## 🚀 Fitur Utama

* **Pencatatan Tugas (CRUD):** Tambah, Edit, Hapus, dan Tandai Selesai.
* **Prioritas Otomatis:** Tugas yang *deadline*-nya **$\le 3$ hari** akan ditandai sebagai "PRIORITAS!" (Merah, berkedip).
* **Peringatan Terlewat:** Menandai tugas yang sudah melewati *deadline*.
* **Statistik Cepat:** Lihat total tugas, yang selesai, dan yang belum selesai sekilas.
* **Filter Fleksibel:** Saring tugas berdasarkan **Status** (Selesai/Belum Selesai) dan **Mata Kuliah**.
* **Validasi *Deadline*:** Mencegah input tanggal *deadline* di masa lalu.

---

## 💻 Teknologi

* HTML5
* CSS3
* Vanilla JavaScript
* Penyimpanan data menggunakan **LocalStorage**.

---

## 🛠️ Cara Menggunakan

Tidak perlu instalasi rumit.

1.  Pastikan Anda memiliki tiga file ini dalam satu folder: `index.html`, `script.js`, dan `styles.css`.
2.  Buka `index.html` di *browser* favorit Anda.
3.  Selesai! Tugas yang Anda masukkan akan tersimpan otomatis.

---

## 📝 Catatan Pengembang

Kode menggunakan Delegasi Event untuk menangani aksi pada daftar tugas (`edit`, `hapus`, `toggle status`) agar lebih efisien. Perhitungan hari menggunakan `Math.floor` untuk akurasi.# pemrograman_web_itera_123140153
