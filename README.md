
# Kulinary - Kuliner Nyentrik

Projek ini merupakan submission untuk kelas [Menjadi Front-End Web Developer Expert](https://www.dicoding.com/academies/219) dari [Dicoding](https://www.dicoding.com) pada beasiswa [DBS Foundation Coding Camp 2024](https://www.dbs.com/newsroom/DBS_Foundation_holds_DBS_Foundation_Coding_Camp_2024_to_offer_free_coding_classes). 

> **_PERINGATAN: Jadikan repositori ini sebagai rujukan/referensi._**
>
> - Sesuai dengan terms of use di Dicoding, submission kelas Dicoding Academy haruslah hasil karya Anda sendiri.
>
> - Kode yang didapatkan dari sumber lain (website, buku, forum, GitHub, dan lain-lain) hanya digunakan sebagai referensi. Tingkat kesamaannya tidak boleh lebih dari 70%.


## Features


**Catatan:**

Dalam mengerjakan submission ini, tidak diperkenankan menggunakan CSS framework, seperti Bootstrap, Materialize, Tailwind, dll, yang dapat membantu dalam menyusun tampilan yang responsif. Tuliskan kode CSS dari nol. Sistem layouting CSS saat ini sudah cukup hebat untuk membuat tampilan website responsif seperti CSS grid.

### Submission 1
  * App Bar (Navigation Bar)
  Menampilkan nama aplikasi atau brand logo dari aplikasi katalog restoran (tentukan sendiri nama aplikasi atau brand logonya).
Terdapat navigation menu:
Home → mengarah ke root domain.
Favorite → target URL cukup bernilai “#” (Sebagai placeholder untuk digunakan pada submission selanjutnya).
About Us → arahkan ke profil LinkedIn/Github/Social Media Anda, atau boleh juga ke personal web/blog.
Terdapat fitur navigation drawer yang berfungsi dengan baik bila diakses pada layar seluler.
  * Hero Element (Jumbotron Element)
Menampilkan hero element dengan gambar yang sudah ditentukan, silakan pilih salah satu aset yang disediakan di dalam starter proyek, src → public → images → hero. Gambar yang tidak digunakan, bisa Anda hapus.
Gambar hero element yang ditampilkan haruslah full-width atau memenuhi persyaratan sebagai berikut. 
Tampilkan minimal dengan width 1000px pada ukuran viewport width >= 1200px.
Jika ukuran viewport width < 1200px, hero element ditampilkan full-width.
  * Daftar Restoran
Menampilkan daftar restoran berdasarkan data yang sudah disediakan di dalam project starter–lokasinya ada di src → public → data → DATA.json. Untuk menampilkannya dapat melalui cara hardcoded–dituliskan dalam HTML secara langsung–atau DOM manipulation menggunakan JavaScript.
Wajib menampilkan nama, gambar, dan minimal salah satu di antara kota, rating, dan/atau deskripsi pada restoran.
  * Footer
Terdapat footer yang ditampilkan di bawah halaman.
Terdapat konten teks bebas sesuai dengan kreatifitas Anda. Misalnya, konten hak cipta yang mencangkup tahun dan nama aplikasi. Contoh: “Copyright © 2020 - Hunger Apps”.
  * Responsibilitas Tampilan
Tampilan web app harus responsif pada seluruh ukuran layar (mobile - tablet - desktop). Utamakan tampilan mobile terlebih dahulu.
Gunakan teknik Grid CSS atau Flexbox dalam menyusun layout. Bila terdapat float, submission Anda akan kami ditolak.
Menetapkan ukuran viewport secara dinamis berdasarkan layar device yang digunakan.
  * Aksesibilitas Website
Seluruh fungsionalitas website dapat dilakukan dengan menggunakan keyboard. Contohnya mengakses tombol hamburger button, mengakses tautan yang ada, dan lain sebagainya.
Menerapkan teknik Skip to Content untuk melewati focus pada menu navigasi.
Terdapat alternative teks pada seluruh gambar yang ditampilkan. Bila ada gambar yang tidak memiliki arti apa pun, cukup berikan atribut alt dengan nilai kosong. 
Dimensi touch target pada elemen yang diinteraksikan dengan touch harus memilliki ukuran elemen minimal 44x44px. Adapun beberapa contoh elemen tersebut meliputi button, anchor, input text, dan textarea.
Pastikan juga terdapat jarak antar elemen tersebut supaya dimensi touch target tidak menumpuk.
Menggunakan semantic element dalam menyusun struktur dan landmarking HTML.
### Submission 2
* Halaman Utama (Daftar Restoran)
Menampilkan daftar restoran yang datanya bersumber dari API: restaurant-api.dicoding.dev. Silakan lihat dokumentasinya pada halaman tersebut.
Wajib menampilkan nama, gambar, dan minimal salah satu di antara kota, rating, dan/atau deskripsi pada restoran.
Ada tautan/CTA yang mengarah ke detail restoran pada setiap item-nya.
Hero elemen tetap dipertahankan.
* Halaman Detail Restoran
Menampilkan detail dari restoran yang dipilih dari halaman utama (daftar restoran) atau halaman favorit restoran.
Pada halaman detail restoran harus berisi hal-hal berikut.
Nama restoran,
Gambar,
Alamat,
Kota ,
Deskripsi,
Menu Makanan, dan
Menu Minuman, serta
Customer Reviews.
Ada tombol favorite untuk memasukkan atau menghapus restoran favorit dari database. Penyimpanan ini menggunakan IndexedDB.
* Halaman Daftar Restoran Favorit
Halaman daftar restoran dapat diakses melalui menu navigasi favorit.
Menampilkan restoran yang difavoritkan oleh pengguna (data diambil dari indexedDB).
Wajib menampilkan nama, gambar dan minimal salah satu diantara kota, rating, dan atau deskripsi pada restoran.
Ada tautan/CTA yang mengarah ke detail restoran pada tiap itemnya.
* Native Capability
Aplikasi dapat diakses dalam keadaan offline tanpa ada aset yang gagal dimuat, termasuk data yang didapatkan dari API. Anda bebas menggunakan strategi caching apa pun, bahkan menggunakan workbox.
Aplikasi harus menampilkan icon Add to Home Screen.
Aplikasi memiliki custom icon yang ditampilkan pada home screen dan splash screen.
* Code Quality
Gunakan ESLint sebagai linter kode JavaScript Anda. Anda WAJIB melampirkan berkas konfigurasi sebagai buktinya.
Mengintegrasikan ESLint sharable config yang kami sediakan pada konfigurasi ESLint Anda: eslint-config-dicodingacademy.
Periksa kembali sebelum mengirimkan submission project Anda. Penuhi seluruh kriteria yang ditetapkan dalam konfigurasi linter Anda. Kondisi terpenuhinya ditandai dengan tidak adanya error satupun ketika menjalankan eslint.
* Pertahankan syarat yang ada pada submission sebelumnya.
Di antaranya, responsibilitas tampilan, aksesibilitas pada website, appbar, footer, dan sebagainya.
### Submission 3
* Integration Test
Syarat:
Menerapkan integration test untuk fungsi menyukai dan batal menyukai restoran.
* End to End Test
Menerapkan End to End Test dengan skenario:
Menyukai salah satu restoran.
Batal menyukai restoran tersebut.
* Image Optimization
Melakukan kompresi terhadap gambar hero yang digunakan. Ukuran gambar harus di bawah 200kb.
Menerapkan teknik image responsive pada gambar hero. Resolusi gambar pada layar seluler dan desktop harus berbeda.
Menerapkan teknik lazy loading pada gambar daftar restoran yang ditampilkan.
* Bundle Optimization
Memasang bundle analyzer pada proyek submission.
Gunakan teknik Code Splitting untuk memisahkan vendor code dari kode asli yang Anda tuliskan.
* Pertahankan syarat yang ada pada submission sebelumnya. Seperti penerapan PWA, responsibilitas tampilan,  aksesibilitas pada website dan sebagainya.
## Run Locally

Prosedur menjalankan projek ini di lokal

```bash
  git clone https://github.com/ifwhy/ifwhy-Dicoding-Menjadi-Front-End-Web-Developer-Expert.git
  cd Dicoding-Menjadi-Front-End-Web-Developer-Expert
  npm i
  npm run start-dev
```


## Authors

- [@ifwhy](https://github.com/ifwhy)

