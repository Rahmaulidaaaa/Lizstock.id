CREATE DATABASE IF NOT EXISTS lizstock
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE lizstock;

CREATE TABLE IF NOT EXISTS registrations (
  id                    INT AUTO_INCREMENT PRIMARY KEY,
  tanggal               DATE NOT NULL,
  waktu                 TIME NOT NULL,
  nama_lengkap          VARCHAR(150) NOT NULL,
  no_wa                 VARCHAR(30) NOT NULL,
  punya_discord         ENUM('ya', 'tidak') NOT NULL,
  kelas                 ENUM(
                            'VVIP_1_MINGGU',
                            'VVIP_PRIORITY_1_BULAN',
                            'EXPERT_CLASS',
                            'PLATINUM_CLASS'
                          ) NOT NULL,
  harga                 INT NOT NULL,
  setuju_disclaimer     TINYINT(1) NOT NULL DEFAULT 0,
  status_pembayaran     ENUM('pending', 'berhasil', 'gagal') NOT NULL DEFAULT 'pending',
  bukti_pembayaran_path VARCHAR(500) DEFAULT NULL,
  created_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;
