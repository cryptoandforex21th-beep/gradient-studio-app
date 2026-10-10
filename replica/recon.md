# Recon Intercom → arah antarmuka GradiEnt

**Tanggal:** 9 Oktober 2026 · **Platform:** situs web publik · **Pemilik proyek:** Heru Ardiansyah

**Lingkup:** struktur pemasaran, navigasi, komponen visual, jalur evaluasi dan formulir awal Intercom. Tujuan penerapan adalah situs GradiEnt Studio untuk calon klien arsitektur dan desain spasial. Dashboard layanan pelanggan berada di luar lingkup.

## 1. Sumber dan tingkat bukti

| ID | Sumber resmi | Bukti yang dipakai |
| --- | --- | --- |
| R01 | [Homepage](https://www.intercom.com/) | Browser desktop dan viewport 390 × 844; menu, pergantian panel produk, susunan halaman; screenshot |
| R02 | [Pricing](https://www.intercom.com/pricing) | Browser; harga tahunan dan bulanan setelah toggle, kartu, kalkulator, FAQ |
| R03 | [View demos](https://www.intercom.com/view-demos) | Browser; halaman tertutup formulir email tahap 1 dari 3 pada sesi ini |
| R04 | [Contact sales](https://www.intercom.com/contact-sales) | Browser; dua kolom dan formulir tahap 1 dari 2 pada sesi ini |
| R05 | [Signup](https://www.intercom.com/signup/email) | Browser; dicapai melalui CTA pada halaman kontak; formulir email dan Google |
| R06 | [Helpdesk](https://www.intercom.com/helpdesk) | Browser; hero, tangkapan produk, manfaat, fitur, bukti, CTA |
| R07 | [Customers](https://www.intercom.com/customers) | Browser; filter industri dibuka dan Education dipilih; hasil berubah |
| R08 | [Studi kasus Simply](https://www.intercom.com/customers/simply) | Browser; dibuka dari hasil filter; metadata, masalah, solusi, hasil, kutipan, cerita terkait |
| R09 | [Help center](https://www.intercom.com/help/en) dan [panduan memulai](https://www.intercom.com/help/en/articles/9639255-getting-started-with-intercom) | Pembacaan halaman publik oleh agen riset; sumber pelengkap, bukan alur akun yang diperiksa |
| R10 | [Changes](https://www.intercom.com/changes/en) | Pembacaan publik; pola jurnal pembaruan |
| R11 | [Kalkulator rinci](https://www.intercom.com/pricing/calculator) | Pembacaan publik; tersedia sebagai tujuan tautan dari pricing; interaksi kalkulator belum diperiksa |
| R12 | [Terms](https://www.intercom.com/legal/terms-and-policies) dan [ketentuan situs](https://www.intercom.com/legal/website-terms-of-use) | Pemeriksaan batas akses; seluruh riset dilakukan di situs publik |

**Label bukti:** “Diamati” berarti terlihat di browser; “terbaca” berarti ada dalam struktur halaman/dokumen publik; “inferensi” berarti rancangan yang diusulkan. Situs dapat memberikan varian per sesi. Tampilan browser dijadikan acuan jika berbeda dari pembacaan web, khususnya jumlah langkah formulir.

## 2. Kesimpulan desain

**Core loop produk yang dijelaskan publik:** pertanyaan pelanggan masuk, AI atau anggota tim menanganinya, lalu pengetahuan dan hasil percakapan digunakan untuk memperbaiki layanan berikutnya. Perilaku operasional ini belum diuji di akun. **Alur situs pemasaran:** pahami produk → lihat bukti dan biaya → pilih demo, trial, atau kontak.

Kesan Intercom dibentuk oleh **hirarki tipografi, ruang kosong, media yang spesifik, dan urutan argumen yang jelas**. Pada GradiEnt, kualitas tersebut perlu datang dari foto ruang, gambar kerja, model, serta uraian keputusan desain yang benar-benar tersedia.

| Aspek | Diamati pada Intercom | Terjemahan yang disarankan untuk GradiEnt |
| --- | --- | --- |
| Hirarki | Judul sans besar, sebagian frasa abu-abu, satu fokus hitam | Satu gagasan arsitektur yang jelas; hindari judul yang memuat semua jasa sekaligus |
| Kontras tipografi | Judul sans dengan paragraf pengantar serif | Sans pada judul; serif secukupnya untuk uraian studio. Jangan memakai serif sebagai keseluruhan identitas hero jika ingin mengikuti arah ini |
| Komposisi | Hero terpusat, foto kecil di tepi; demonstrasi produk besar sesudahnya | Potongan detail material/tapak mengapit judul, lalu satu karya atau proses desain utama berukuran besar |
| Warna | Putih, abu hangat, hitam, tanda biru kecil; warna kuat datang dari media | Dasar terang dan teks gelap; aksen GradiEnt dipakai sedikit, warna utama datang dari karya |
| Bentuk | Garis pembatas tipis, panel relatif datar, radius kecil pada banyak kontrol | Grid rapi dan tombol sederhana; kurangi dekorasi yang tidak menjelaskan karya |
| Bukti | Screenshot produk, pelanggan bernama, cerita rinci dan hasil | Status proyek, tahun, lokasi, peran Heru, gambar proses, dan hasil yang dapat dibuktikan |
| Ritme | Klaim → peragaan → manfaat → bukti → tindakan | Posisi studio → karya utama → layanan → proses → konsultasi |

**Pengukuran terbatas:** judul utama desktop menggunakan keluarga font `Saans`, ukuran terhitung 80 px, bobot 400, tinggi baris 80 px, dan jarak huruf −2,4 px pada viewport desktop sesi ini. Ini pengamatan satu ukuran layar, bukan token universal. Nama keluarga terbaca dari gaya elemen yang dirender; file font tidak diambil. Untuk implementasi, gunakan font yang lisensinya tersedia bagi GradiEnt atau padanan legal.

### Susunan homepage yang terbaca

1. Pengumuman dan navigasi.
2. Janji utama, dukungan singkat, formulir trial.
3. Panel dua produk.
4. Bukti pelanggan.
5. Penjelasan helpdesk.
6. Penjelasan AI agent dan video.
7. Hubungan kedua produk.
8. Testimoni.
9. Integrasi.
10. Ringkasan harga.
11. CTA akhir dan footer.

Untuk GradiEnt, cukup gunakan enam bagian inti: **hero → karya utama → layanan → proses → profil/bukti → konsultasi**. Panjang dan kepadatan navigasi Intercom menyesuaikan katalog SaaS yang jauh lebih luas.

## 3. Inventaris layar

Delapan halaman unik; variasi menu dan viewport dihitung sebagai state, bukan halaman tambahan.

| ID | Halaman / rute | Tujuan dan komponen | State yang diamati / batas |
| --- | --- | --- | --- |
| S01 | Homepage `/` | Hero; header menetap saat scroll; panel produk; bukti; fitur; footer | Desktop, menu produk terbuka, panel Fin dipilih; mobile hero dan menu bertingkat. Chat proaktif muncul. State error jaringan tidak diamati |
| S02 | Harga `/pricing` | Kartu paket; toggle periode; perbandingan; estimator; add-on; FAQ | Toggle tahunan → bulanan mengubah harga pada kartu dan estimator. Estimator terlihat, inputnya tidak diubah |
| S03 | Demo `/view-demos` | Tab mode demo; video dan bab; gate email | Gate tahap 1/3 menutupi konten. Bab video terbaca di struktur latar. Playback, langkah 2–3, serta hasil submit belum diamati |
| S04 | Kontak `/contact-sales` | Bukti pada kolom kiri; formulir pada kanan | Tahap 1/2: nama depan, nama belakang, email bisnis, pilihan ukuran perusahaan. Tidak diisi atau dikirim; validasi dan hasil kirim belum diamati |
| S05 | Trial `/signup/email` | Form email, Google, penunjuk progres, panel bukti | Tahap awal; tombol Google sempat loading lalu tampil siap. Login, consent, onboarding lanjutan tidak dijalankan |
| S06 | Produk `/helpdesk` | Hero, media produk besar, manfaat bernomor, fitur, testimonial, CTA | Desktop awal dan struktur halaman terisi; interaksi panel lanjutan tidak diperiksa |
| S07 | Cerita pelanggan `/customers` | Hero, filter industri/topik, kartu, tombol tambah hasil | Default; dropdown industri; Education aktif; hasil berubah dan kontrol hapus filter muncul. Empty state belum diamati |
| S08 | Studi kasus `/customers/simply` | Breadcrumb, identitas, metadata, hasil, narasi, share, cerita terkait | Artikel terisi; dibuka dari S07. Tombol berbagi tidak dijalankan |

### Galeri bukti

Semua file di `screens/` merupakan screenshot referensi internal, bukan aset untuk dipublikasikan sebagai karya GradiEnt.

| File | Isi |
| --- | --- |
| [S01-home-desktop.jpg](screens/S01-home-desktop.jpg) | Hero desktop |
| [S01-product-menu.jpg](screens/S01-product-menu.jpg) | Menu produk desktop |
| [S01-product-fin-selected.jpg](screens/S01-product-fin-selected.jpg) | Panel produk setelah Fin dipilih |
| [S01-home-full.jpg](screens/S01-home-full.jpg) | Tangkapan panjang homepage; unsur bergerak dapat tertangkap pada frame berbeda |
| [S01-home-mobile.jpg](screens/S01-home-mobile.jpg) | Hero pada viewport 390 × 844 |
| [S01-mobile-menu.jpg](screens/S01-mobile-menu.jpg) | Menu ponsel dengan kelompok produk terbuka |
| [S02-pricing-annual.jpg](screens/S02-pricing-annual.jpg) | Paket tahunan |
| [S02-pricing-monthly.jpg](screens/S02-pricing-monthly.jpg) | Paket bulanan setelah toggle |
| [S03-demo-gate.jpg](screens/S03-demo-gate.jpg) | Gate email demo |
| [S04-contact-step1.jpg](screens/S04-contact-step1.jpg) | Kontak tahap awal |
| [S05-signup-email.jpg](screens/S05-signup-email.jpg) | Trial tahap email |
| [S06-helpdesk-hero.jpg](screens/S06-helpdesk-hero.jpg) | Hero halaman produk |
| [S07-customers.jpg](screens/S07-customers.jpg) | Daftar cerita pelanggan |
| [S07-customers-filter.jpg](screens/S07-customers-filter.jpg) | Filter terpilih |
| [S08-case-study.jpg](screens/S08-case-study.jpg) | Pembuka studi kasus |

## 4. Perilaku responsif yang penting

Diamati pada homepage ukuran 390 × 844:

- Logo menjadi simbol ringkas; tombol trial dan tombol menuju produk AI tetap di bar atas.
- Navigasi pindah ke panel vertikal. Kelompok produk memakai buka/tutup bertingkat.
- Judul tersusun lebih banyak baris; paragraf hero dipendekkan secara nyata.
- Formulir email berubah menjadi susunan vertikal dengan tombol selebar area form.
- Foto dekoratif berpindah dari sisi hero ke baris di bawah formulir.
- Bagian fitur menggunakan accordion pada struktur mobile, dengan item pertama terbuka.
- Screenshot demonstrasi menggunakan komposisi mobile yang berbeda.

**Implikasi:** layout GradiEnt harus dirancang ulang pada ponsel, termasuk panjang teks dan pemilihan crop karya. Satu pengecilan desktop tidak cukup. Lebar tablet, keyboard navigation, pembaca layar dan reduced-motion belum diaudit.

## 5. Alur pengguna

Jumlah klik di bawah berasal dari interaksi yang benar-benar dijalankan. Scroll dan navigasi langsung untuk riset tidak dihitung. Jalur yang berhenti pada gate belum membuktikan keberhasilan alur sampai selesai.

| ID | Tujuan / jalur | Klik teramati | Edge atau batas |
| --- | --- | --- | --- |
| F01 | S01: membandingkan panel produk → pilih Fin | 1 | Perubahan media terlihat; tidak menguji auto-rotation atau keyboard |
| F02 | S01 → S02 → ubah tahunan ke bulanan | 2 | Harga dan total estimasi berubah; harga bukan estimasi biaya GradiEnt |
| F03 | S02 → S03 lewat CTA demo | 1 hingga gate | Penyelesaian demo memerlukan data; jumlah klik sampai video dapat dimainkan belum diketahui |
| F04 | S04 → S05 melalui CTA trial | 1 hingga formulir awal | Belum melewati email, Google, atau persetujuan pendaftaran |
| F05 | S07 buka industri → pilih Education → tutup dropdown → buka Simply/S08 | 4 | Hasil filter terlihat; kombinasi filter kosong dan load-more belum diperiksa |
| F06 | S01 mobile buka menu → buka kelompok produk | 2 | Struktur tautan terlihat; fokus keyboard dan penutupan overlay belum diaudit |

**Alur yang direkomendasikan untuk GradiEnt (inferensi):** homepage → karya → detail karya → konsultasi. Sediakan jalan singkat langsung dari hero ke konsultasi. Galeri karya sebaiknya dapat dibaca tanpa memasukkan email.

## 6. Komponen berulang

| Komponen | Variasi dan state | Lokasi |
| --- | --- | --- |
| Header | Penuh; ringkas pada demo; versi ponsel; menetap saat scroll | S01–S04, S06–S08 |
| Navigasi bertingkat | Mega menu desktop; accordion pada panel ponsel; buka/tutup diamati | S01 |
| Announcement | Bar tipis, tautan, tombol tutup; penutupan belum dijalankan | S01 |
| Hero | Terpusat; dua kolom pada kontak; artikel studi kasus | S01–S08 |
| Tombol | Hitam isi, outline, tautan; transient disabled pada Google | Semua halaman |
| Panel peragaan | Dua pilihan produk; gambar bertumpuk; versi mobile | S01 |
| Modul fitur | Judul dan deskripsi dengan media; accordion mobile | S01, S06 |
| Bukti pelanggan | Logo, kutipan, nama, jabatan, foto | S01, S04, S05, S06, S07, S08 |
| Kartu dan estimator harga | Paket, daftar kemampuan, billing toggle; total berubah | S02 |
| Formulir | Label, input, radio, progres; gate demo dan halaman kontak | S01, S03, S04, S05 |
| Filter dan daftar | Dropdown checkbox, jumlah pilihan, reset, kartu hasil | S07 |
| Media | Screenshot produk, gambar editorial, video ber-bab di belakang gate | S01, S03, S06, S08 |
| Artikel | Metadata, narasi, pull quote, media, related content | S08 |
| Footer dan bantuan | Direktori tautan, legal, launcher chat, notifikasi proaktif | Banyak halaman; chat tidak diisi |

## 7. Model data yang diinferensikan

Ini model konten minimum yang dapat menjelaskan UI publik, **bukan skema database asli Intercom**.

| Entitas | Field minimum yang diinferensikan | Dasar | Keyakinan |
| --- | --- | --- | --- |
| Page | slug, title, sections, seo_title | Rute dan bagian S01–S08 | Tinggi untuk kebutuhan model, implementasi aslinya tidak diketahui |
| Product | name, slug, summary, media | Dua produk pada S01 dan halaman S06 | Tinggi |
| Capability | product, title, summary, media, destination | Modul fitur S01/S06 | Tinggi |
| Plan | name, billing_period, seat_price, usage_unit, benefits | Kartu dan toggle S02 | Tinggi |
| Testimonial | person, role, company, quote, portrait, consent_reference | Bukti bernama di beberapa halaman; consent_reference adalah kebutuhan rancangan | Sedang |
| CaseStudy | slug, company, region, story, results, media | S07/S08 | Tinggi |
| Taxonomy | type, label, case_study_ids | Filter industri/topik S07 | Tinggi |
| DemoChapter | title, timestamp, video_id | Bab yang terbaca pada S03; perilaku player belum terbukti | Sedang |
| LeadSubmission | name, email, company_size, source, step, status | Field dan progres S03–S05; status internal adalah inferensi | Sedang |

Relasi usulan: Product 1→banyak Capability; Page memuat banyak section; CaseStudy banyak↔banyak Taxonomy; CaseStudy dapat mengandung Testimonial; satu video mempunyai banyak DemoChapter; satu LeadSubmission membawa sumber formulir. Tidak ada bukti publik untuk menetapkan provider CMS, tabel database, sistem auth, atau mekanisme routing lead internal.

**Penyederhanaan untuk GradiEnt:** Project, Service, MediaAsset, Page, Inquiry. Project perlu memiliki status yang eksplisit (misalnya studi akademik, konsep, dalam pengerjaan, terbangun), peran, tahun, lokasi dan hak penggunaan media. Status tersebut diisi berdasarkan bukti proyek Heru.

## 8. Matriks prioritas

Lihat [features.csv](features.csv). Ada **23 baris**: 8 must, 6 should, 9 could. Dari 9 could, 5 berstatus `skip`; sehingga ada **18 calon item implementasi**. Semua item yang direncanakan masih `clone=no` karena sesi ini menghasilkan recon.

`original=yes` berarti pola tampak atau terbaca pada sumber yang disebut di catatan. Ini tidak berarti seluruh fungsi internalnya diperiksa. `clone=no` mencatat status pekerjaan recon, bukan audit kemampuan situs GradiEnt yang sudah ada.

## 9. Batas cakupan dan hal yang dilewati

- Logo, foto, ilustrasi, font berlisensi, screenshot produk dan teks pemasaran Intercom digunakan sebagai referensi pengamatan. Implementasi GradiEnt memakai aset dan teks miliknya sendiri.
- Klaim angka, nama pelanggan, ulasan serta testimoni Intercom tidak dipindahkan menjadi bukti GradiEnt.
- Helpdesk operasional, agent AI, inbox, ticketing, account admin, billing, dan jaringan integrasi tidak dibangun dalam lingkup situs studio.
- Tidak mengakses akun, mengirim formulir, atau mengekstrak kode sumber/API nonpublik. Terms layanan §2.7 membatasi penggunaan layanan untuk analisis kompetitif dan §2.8 membatasi trial untuk evaluasi pembelian; riset ini memakai permukaan publik.
- Gate email untuk melihat karya, menu puluhan tujuan, dan kalkulator harga layanan arsitektur yang belum punya aturan harga jelas tidak direkomendasikan untuk versi pertama.
- Screenshot statis tidak membuktikan timing animasi, performa, aksesibilitas, SEO, atau keberhasilan konversi. State loading/error/empty yang belum terlihat harus dirancang dan diperiksa pada tahap implementasi.

## 10. Ukuran pekerjaan dan langkah lanjutan

**Hasil recon:** 8 halaman, 6 alur yang diikuti sampai batas publiknya, 14 kelompok komponen, 9 entitas hasil inferensi, 15 screenshot.

**Tiga bagian tersulit untuk adaptasi:**

1. Menyeleksi karya dan media asli agar pembaca memahami kualitas serta peran studio.
2. Menjaga komposisi hero dan peragaan karya pada desktop sekaligus ponsel.
3. Menghubungkan formulir konsultasi dengan tujuan penerimaan yang benar, beserta state kirim, gagal, dan konfirmasi.

**Ukuran adaptasi: M**, dengan lingkup homepage, daftar/detail karya, layanan/proses, dan konsultasi. Perkiraan bersyarat setelah aset dan isi tersedia: konsep visual 1–2 hari kerja; implementasi 3–5 hari kerja; peninjauan responsif, formulir dan isi 1–2 hari. Ini rentang perencanaan, bukan janji waktu pengiriman. Membuat seluruh SaaS Intercom akan menjadi proyek XL yang berbeda.

**Langkah berikutnya:** `/replica-architect` untuk memetakan struktur rute dan konten GradiEnt dari temuan ini; kemudian `/replica-design` untuk token dan komponen, dilanjutkan preview. Fokus pertama: **satu hero + satu peragaan karya + mobile-nya**, supaya arah desain dapat dievaluasi sebelum seluruh halaman dibuat.
