# GradiEnt Studio — preview Intercom 02

Entry: `preview_gradient.html`. Preview lokal: http://127.0.0.1:4317/preview_gradient.html

Halaman dibuat dari hasil recon Intercom pada 9 Oktober 2026, dengan konten dan aset GradiEnt. Ini prototipe terpisah; perubahan pengguna pada kode Next.js tetap dipertahankan.

## Isi dan interaksi

- Hero terpusat, sans besar, aksen terracotta, paragraf serif, logo resmi.
- Tiga tab peragaan: atmosfer, organisasi ruang, dan naungan. Mendukung tombol panah/Home/End pada keyboard.
- Tiga layanan, accordion proses, filter eksplorasi, dialog detail konsep, profil studio, FAQ.
- Form brief awal membuat pesan yang bisa diedit dan disalin. Tautan WhatsApp dibuka atas klik pengunjung. Tidak ada klaim pengiriman otomatis atau penyimpanan ke CRM.
- Menu mobile, label input, dialog native, reduced-motion, tautan portal akun pada domain studio.
- Galeri hanya berisi konsep dan diagram yang dilabeli sesuai status. Tidak memakai data fallback proyek terbangun pada API lama.

## Konten dan sumber aset

- `assets/brand-logo.png`: salinan aset brand resmi yang sudah ada.
- `assets/courtyard-concept.png`: ilustrasi konsep baru dari tool imagegen bawaan; bukan dokumentasi proyek terbangun. Disalin dari hasil generasi ke folder proyek.
- `assets/space-study.svg`: diagram konsep organisasi ruang yang ditulis sebagai SVG; tanpa skala, bukan denah konstruksi.
- `assets/light-study.svg`: diagram prinsip yang ditulis sebagai SVG; bukan hasil simulasi.
- Font memakai Google Fonts: IBM Plex Sans, IBM Plex Mono, Cormorant Garamond. Sistem memakai fallback jika koneksi font tidak tersedia.

### Prompt visual yang digunakan

Use case: photorealistic-natural. Asset type: large editorial architectural hero photograph for GradiEnt Studio concept portfolio. Create one beautiful exceptionally refined contemporary tropical courtyard pavilion in Makassar, original conceptual architecture, photographed with restrained architectural editorial taste. Single very wide horizontal composition around 16:9. Eye-level from deep shaded colonnade looking across a pale limestone courtyard toward a long single-storey warm terracotta brick volume with floor-to-ceiling dark timber glazing and a thin generous flat roof overhang. A single sculptural tropical tree grows through a large round opening in the overhang at the right third. Tactile local brick, fine sandstone texture, deep shadow, moss-green planting, soft Indonesian morning sunlight casting graphic shadows across the foreground. Flat simple massing and very disciplined material joints, warm natural imperfect details, still intimate spatial atmosphere, realistic perspective and verticals. Framing reads clearly both panoramic and cropped to portrait. Architecture fills image, minimum sky. No people, no text, no logos, no graphic overlays, no futuristic shapes, no alpine cabin, no artificial orange sunset, no generic glossy render, no excessive greenery. Rich photographic grain and quiet warm-white, charcoal, ochre and moss palette. It is conceptual imagery, not documentation of a real completed building.

## Menjalankan lagi

Jalankan dari folder ini:

```powershell
python -m http.server 4317 --bind 127.0.0.1
```

Server hanya perlu dijalankan jika preview belum aktif. Jangan menjalankan server statis dari akar repositori yang berisi konfigurasi privat.

## Status

Belum diterapkan ke production. Protokol skill mochi-web-editor mengharuskan penilaian preview HTML sebelum migrasi dan publikasi Next.js. Tidak ada automated test yang ditambahkan atau dijalankan. Integrasi CRM, kinerja produksi, serta alur autentikasi tidak diklaim telah diuji dari prototipe ini.
