# Personal Book Manager 📚

Aplikasi manajemen buku pribadi yang dibangun dengan React untuk membantu Anda mengelola koleksi buku dengan mudah. Fitur termasuk CRUD operations, pencarian, filter berdasarkan status, dan penyimpanan data lokal.

## ✨ Fitur Utama

- **📖 Kelola Koleksi Buku**: Tambah, edit, hapus, dan lihat daftar buku
- **🔍 Pencarian Cepat**: Cari buku berdasarkan judul, penulis, atau deskripsi
- **📊 Filter Berdasarkan Status**: Filter buku berdasarkan status (Milik, Baca, Beli)
- **💾 Penyimpanan Lokal**: Data tersimpan di browser localStorage
- **📈 Statistik**: Lihat statistik koleksi buku Anda
- **📱 Responsif**: Tampilan optimal di desktop dan mobile
- **🎨 UI Modern**: Antarmuka yang bersih dan mudah digunakan

## 🚀 Teknologi yang Digunakan

- **React 18** - Library UI
- **React Router DOM** - Navigasi halaman
- **Context API** - State management
- **localStorage** - Penyimpanan data
- **CSS3** - Styling dan responsive design
- **Vite** - Build tool dan development server

## 📋 Prerequisites

Pastikan Anda telah menginstall:
- **Node.js** (versi 14 atau lebih tinggi)
- **npm** (biasanya sudah termasuk dengan Node.js)

## 🛠️ Instalasi dan Menjalankan Aplikasi

1. Clone atau Download Project
```bash
# Jika menggunakan git
git clone <repository-url>
cd personal-book-manager

# Jika download ZIP, extract dan masuk ke folder project

2. Install Dependencies
npm install

3. Menjalankan Development Server
npm run dev

4. Build untuk Production
npm run build

5. Preview Build Production
npm run preview

🌐 Akses Aplikasi

Setelah menjalankan npm run dev, buka browser dan akses:

http://localhost:5173

📖 Panduan Penggunaan

🏠 Halaman Utama (Home)
- Menampilkan semua buku dalam grid yang responsive
- Search bar di bagian atas untuk pencarian cepat
- Filter dropdown untuk memfilter berdasarkan status buku
- Statistik koleksi menampilkan jumlah buku per kategori
- Tombol aksi cepat untuk export dan clear all books

➕ Menambah Buku Baru
1. Klik tombol "Add Book" di header atau "Add New Book" di halaman utama
2. Isi form dengan data:
   - Judul Buku (wajib)
   - Penulis (wajib)
   - Status (pilih: Milik, Baca, atau Beli)
3. Klik "Add Book" untuk menyimpan
4. Buku akan otomatis muncul di halaman utama

✏️ Mengedit Buku
1. Di halaman utama, klik tombol "Edit" pada kartu buku yang ingin diubah
2. Form akan terisi dengan data buku yang dipilih
3. Ubah data yang diperlukan
4. Klik "Update Book" untuk menyimpan perubahan

🗑️ Menghapus Buku
1. Di halaman utama, klik tombol "Delete" pada kartu buku yang ingin dihapus
2. Konfirmasi penghapusan pada dialog yang muncul
3. Buku akan dihapus dari koleksi

🔍 Pencarian Buku
1. Gunakan search box di bagian atas halaman utama
2. Ketik kata kunci (judul, penulis, atau deskripsi)
3. Hasil pencarian akan muncul secara real-time
4. Gunakan tombol × untuk menghapus pencarian

📊 Filter Berdasarkan Status
1. Pilih status dari dropdown filter:
   - All Books → Menampilkan semua buku
   - Owned → Hanya buku yang sudah dimiliki
   - Reading → Buku yang sedang dibaca
   - Wishlist → Buku yang ingin dibeli/dibaca
2. Filter akan diterapkan secara instan
3. Gunakan "Clear Filters" untuk menampilkan semua buku
