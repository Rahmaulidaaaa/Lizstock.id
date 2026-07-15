# Sistem Pendaftaran Kelas Saham Lizstock

## Struktur

```
frontend/
  RegistrationModal.tsx     <- komponen modal pendaftaran (form -> payment -> upload -> success)
  DaftarButtonExample.tsx   <- contoh tombol "Daftar" yang memicu modal

backend/
  server.ts                 <- Express API
  db.ts                     <- koneksi pool MySQL
  schema.sql                <- struktur tabel MySQL
  package.json
  .env.example
```

## 1. Setup Database

```bash
mysql -u root -p < backend/schema.sql
```

## 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env      # lalu isi DB_USER / DB_PASSWORD sesuai MySQL kamu
npm run dev                # jalan di http://localhost:4000
```

Bukti pembayaran yang diunggah user tersimpan di `backend/uploads/` dan
bisa diakses lewat `http://localhost:4000/uploads/<nama_file>`.

## 3. Setup Frontend

1. Salin `RegistrationModal.tsx` ke folder komponen React/Next.js kamu
   (proyek harus sudah pakai Tailwind CSS, karena styling memakai class Tailwind).
2. Sesuaikan `API_BASE_URL` di baris atas `RegistrationModal.tsx` ke alamat backend kamu.
3. Ganti `src="/assets/qris-lizstock.png"` dengan path foto QRIS asli Lizstock
   (taruh filenya di folder `public/assets/`).
4. Pasang di tombol "Daftar" yang sudah ada:

```tsx
import { useState } from "react";
import RegistrationModal from "./RegistrationModal";

const [isOpen, setIsOpen] = useState(false);

<button onClick={() => setIsOpen(true)}>Daftar</button>
<RegistrationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
```

## Alur Sistem

1. User klik "Daftar" -> modal terbuka, tanggal & waktu terisi otomatis.
2. User isi nama, no WA, status Discord, pilih kelas, centang disclaimer -> data
   dikirim ke `POST /api/registrations`, tersimpan di MySQL dengan
   `status_pembayaran = 'pending'`.
3. Modal pindah ke tampilan QRIS.
4. User klik "Sudah Bayar, Kirim Bukti Pembayaran" -> upload screenshot ->
   `POST /api/registrations/:id/proof`, file tersimpan di server & path-nya
   disimpan ke database.
5. Tampilan sukses muncul. Status pembayaran ("pending" / "berhasil" / "gagal")
   otomatis di-poll tiap 5 detik lewat `GET /api/registrations/:id/status`.

## Cara Admin Mengubah Status Pembayaran

Karena status pembayaran **tidak seharusnya dipilih sendiri oleh user** (rawan
disalahgunakan), status diverifikasi manual oleh admin lewat endpoint:

```
PATCH /api/registrations/:id/status
Body: { "status": "berhasil" }   // atau "gagal" / "pending"
```

Kamu bisa panggil endpoint ini dari dashboard admin terpisah, Postman, atau
bikin halaman admin sederhana yang fetch `GET /api/registrations` (daftar semua
pendaftar) lalu tombol update status per baris.
