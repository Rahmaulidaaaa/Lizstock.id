import React, { useState } from "react";
import RegistrationModal from "./RegistrationModal";

/**
 * Contoh pemakaian: taruh <DaftarButtonExample /> di halaman kamu,
 * atau cukup ambil pola state `isOpen` + `<RegistrationModal />` ini
 * dan tempel ke tombol "Daftar" yang sudah ada di website kamu.
 */
export default function DaftarButtonExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Daftar Sekarang
      </button>

      <RegistrationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
