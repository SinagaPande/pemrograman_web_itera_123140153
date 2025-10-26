# Blog Viewer – UTS Pemrograman Web

Aplikasi **Blog Viewer** sederhana berbasis React + Vite yang menampilkan daftar artikel, detail artikel, dan profil penulis dari API publik **JSONPlaceholder**.

## Fitur
- Menampilkan daftar artikel dari API
- Menampilkan detail artikel dan penulis
- Navigasi antar halaman menggunakan React Router
- Mode Gelap/Terang dengan Context API
- Tampilan responsif dan modern

## Teknologi yang digunakan
- React + Vite
- React Router DOM
- Context API (untuk tema)
- Tailwind CSS (opsional, bisa diganti CSS biasa)
- Fetch API untuk mengambil data dari https://jsonplaceholder.typicode.com

## Struktur Folder
project-folder/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Navbar.jsx
    │   ├── ArticleCard.jsx
    │   ├── LoadingSpinner.jsx
    │   ├── ErrorMessage.jsx
    │   └── Layout.jsx
    ├── pages/
    │   ├── Home.jsx
    │   ├── ArticleList.jsx
    │   ├── ArticleDetail.jsx
    │   ├── AuthorProfile.jsx
    │   └── NotFound.jsx
    ├── hooks/
    │   └── useFetch.js
    └── context/
        └── AppContext.jsx

## Cara Menjalankan
```bash
npm install
npm run dev
Lalu buka di browser:
http://localhost:5173/

