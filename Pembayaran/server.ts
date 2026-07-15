import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { pool } from "./db";

const app = express();
app.use(cors());
app.use(express.json());

// folder penyimpanan bukti pembayaran
const UPLOAD_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);
app.use("/uploads", express.static(UPLOAD_DIR));

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `bukti-${req.params.id}-${Date.now()}${ext}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// 1) Buat pendaftaran baru
app.post("/api/registrations", async (req, res) => {
  try {
    const {
      tanggal,
      waktu,
      namaLengkap,
      noWa,
      punyaDiscord,
      kelas,
      harga,
      setujuDisclaimer,
    } = req.body;

    if (
      !tanggal ||
      !waktu ||
      !namaLengkap ||
      !noWa ||
      !punyaDiscord ||
      !kelas ||
      !harga ||
      !setujuDisclaimer
    ) {
      return res.status(400).json({ message: "Data tidak lengkap." });
    }

    const [result]: any = await pool.query(
      `INSERT INTO registrations
        (tanggal, waktu, nama_lengkap, no_wa, punya_discord, kelas, harga, setuju_disclaimer, status_pembayaran)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [tanggal, waktu, namaLengkap, noWa, punyaDiscord, kelas, harga, setujuDisclaimer ? 1 : 0]
    );

    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menyimpan pendaftaran." });
  }
});

// 2) Upload bukti pembayaran
app.post(
  "/api/registrations/:id/proof",
  upload.single("bukti"),
  async (req, res) => {
    try {
      const { id } = req.params;
      if (!req.file) {
        return res.status(400).json({ message: "File bukti tidak ditemukan." });
      }

      const relativePath = `/uploads/${req.file.filename}`;
      await pool.query(
        `UPDATE registrations
         SET bukti_pembayaran_path = ?, status_pembayaran = 'pending'
         WHERE id = ?`,
        [relativePath, id]
      );

      res.json({ message: "Bukti pembayaran diterima.", path: relativePath });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Gagal mengunggah bukti pembayaran." });
    }
  }
);

// 3) Cek status pembayaran (dipakai frontend untuk polling)
app.get("/api/registrations/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows]: any = await pool.query(
      `SELECT status_pembayaran FROM registrations WHERE id = ?`,
      [id]
    );
    if (!rows.length) return res.status(404).json({ message: "Tidak ditemukan." });
    res.json({ statusPembayaran: rows[0].status_pembayaran });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil status." });
  }
});

// 4) Update status pembayaran secara manual oleh admin
//    body: { status: "berhasil" | "gagal" | "pending" }
app.patch("/api/registrations/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["pending", "berhasil", "gagal"].includes(status)) {
      return res.status(400).json({ message: "Status tidak valid." });
    }
    await pool.query(
      `UPDATE registrations SET status_pembayaran = ? WHERE id = ?`,
      [status, id]
    );
    res.json({ message: "Status diperbarui." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal memperbarui status." });
  }
});

// 5) Lihat semua data pendaftar (untuk admin/dashboard)
app.get("/api/registrations", async (_req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM registrations ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data." });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
