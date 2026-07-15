import React, { useEffect, useMemo, useState } from "react";

/**
 * RegistrationModal
 * -------------------------------------------------------------
 * Alur:
 * 1. FORM      -> isi data diri, pilih kelas, centang disclaimer
 * 2. PAYMENT   -> tampil QRIS + status pembayaran (pending/berhasil/gagal)
 * 3. UPLOAD    -> upload bukti transfer/pembayaran
 * 4. SUCCESS   -> ringkasan pendaftaran
 *
 * Ganti API_BASE_URL sesuai alamat backend kamu.
 */

const API_BASE_URL = "http://localhost:4000/api";

type Step = "FORM" | "PAYMENT" | "UPLOAD" | "SUCCESS";

type KelasKey =
  | "VVIP_1_MINGGU"
  | "VVIP_PRIORITY_1_BULAN"
  | "EXPERT_CLASS"
  | "PLATINUM_CLASS";

interface KelasOption {
  key: KelasKey;
  label: string;
  durasi: string;
  harga: number;
}

const KELAS_OPTIONS: KelasOption[] = [
  { key: "VVIP_1_MINGGU", label: "VVIP", durasi: "1 Minggu", harga: 35000 },
  {
    key: "VVIP_PRIORITY_1_BULAN",
    label: "VVIP Priority",
    durasi: "1 Bulan",
    harga: 150000,
  },
  { key: "EXPERT_CLASS", label: "Expert Class", durasi: "", harga: 175000 },
  { key: "PLATINUM_CLASS", label: "Platinum Class", durasi: "", harga: 350000 },
];

type PaymentStatus = "pending" | "berhasil" | "gagal";

interface RegistrationForm {
  namaLengkap: string;
  noWa: string;
  punyaDiscord: "ya" | "tidak" | "";
  kelas: KelasKey | "";
  setujuDisclaimer: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);
}

export default function RegistrationModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState<Step>("FORM");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const now = useMemo(() => new Date(), []);
  const tanggal = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const waktu = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [form, setForm] = useState<RegistrationForm>({
    namaLengkap: "",
    noWa: "",
    punyaDiscord: "",
    kelas: "",
    setujuDisclaimer: false,
  });

  const [registrationId, setRegistrationId] = useState<number | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("pending");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);

  const selectedKelas = KELAS_OPTIONS.find((k) => k.key === form.kelas);

  // reset saat modal ditutup
  useEffect(() => {
    if (!isOpen) {
      setStep("FORM");
      setErrorMsg(null);
      setForm({
        namaLengkap: "",
        noWa: "",
        punyaDiscord: "",
        kelas: "",
        setujuDisclaimer: false,
      });
      setRegistrationId(null);
      setPaymentStatus("pending");
      setProofFile(null);
      setProofPreview(null);
    }
  }, [isOpen]);

  // poll status pembayaran tiap 5 detik selama di step PAYMENT/UPLOAD
  useEffect(() => {
    if (!registrationId || (step !== "PAYMENT" && step !== "UPLOAD")) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/registrations/${registrationId}/status`
        );
        if (res.ok) {
          const data = await res.json();
          setPaymentStatus(data.statusPembayaran);
        }
      } catch {
        /* diamkan, biarkan polling coba lagi */
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [registrationId, step]);

  if (!isOpen) return null;

  function updateForm<K extends keyof RegistrationForm>(
    key: K,
    value: RegistrationForm[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmitForm(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    if (!form.namaLengkap.trim()) return setErrorMsg("Nama lengkap wajib diisi.");
    if (!form.noWa.trim()) return setErrorMsg("Nomor WhatsApp wajib diisi.");
    if (!form.punyaDiscord) return setErrorMsg("Pilih apakah kamu punya Discord.");
    if (!form.kelas) return setErrorMsg("Pilih kelas saham yang diminati.");
    if (!form.setujuDisclaimer)
      return setErrorMsg("Kamu harus menyetujui pernyataan persetujuan (disclaimer).");

    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE_URL}/registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tanggal: now.toISOString().slice(0, 10),
          waktu: now.toTimeString().slice(0, 8),
          namaLengkap: form.namaLengkap,
          noWa: form.noWa,
          punyaDiscord: form.punyaDiscord,
          kelas: form.kelas,
          harga: selectedKelas?.harga,
          setujuDisclaimer: form.setujuDisclaimer,
        }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan pendaftaran.");
      const data = await res.json();
      setRegistrationId(data.id);
      setStep("PAYMENT");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setProofFile(file);
    if (file) setProofPreview(URL.createObjectURL(file));
  }

  async function handleSendProof() {
    if (!registrationId) return;
    if (!proofFile) return setErrorMsg("Pilih file bukti pembayaran terlebih dahulu.");

    try {
      setSubmitting(true);
      setErrorMsg(null);
      const body = new FormData();
      body.append("bukti", proofFile);

      const res = await fetch(
        `${API_BASE_URL}/registrations/${registrationId}/proof`,
        { method: "POST", body }
      );
      if (!res.ok) throw new Error("Gagal mengirim bukti pembayaran.");
      setPaymentStatus("pending");
      setStep("SUCCESS");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Pendaftaran Kelas Saham Lizstock
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
            aria-label="Tutup"
          >
            ✕
          </button>
        </div>

        <StepIndicator step={step} />

        <div className="px-6 py-5">
          {errorMsg && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
              {errorMsg}
            </div>
          )}

          {step === "FORM" && (
            <form onSubmit={handleSubmitForm} className="space-y-5">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="mb-1 block font-medium text-gray-700">
                    Tanggal
                  </label>
                  <div className="rounded-lg border bg-gray-50 px-3 py-2 text-gray-600">
                    {tanggal}
                  </div>
                </div>
                <div>
                  <label className="mb-1 block font-medium text-gray-700">
                    Waktu
                  </label>
                  <div className="rounded-lg border bg-gray-50 px-3 py-2 text-gray-600">
                    {waktu} WIB
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={form.namaLengkap}
                  onChange={(e) => updateForm("namaLengkap", e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="Nama sesuai KTP"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Nomor WhatsApp
                </label>
                <input
                  type="tel"
                  value={form.noWa}
                  onChange={(e) => updateForm("noWa", e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="08xxxxxxxxxx"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Apakah kamu punya Discord?
                </label>
                <div className="flex gap-4 text-sm">
                  {(["ya", "tidak"] as const).map((val) => (
                    <label key={val} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="punyaDiscord"
                        checked={form.punyaDiscord === val}
                        onChange={() => updateForm("punyaDiscord", val)}
                      />
                      {val === "ya" ? "Ya" : "Tidak"}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Kelas Saham yang Diminati
                </label>
                <div className="grid gap-2">
                  {KELAS_OPTIONS.map((opt) => (
                    <label
                      key={opt.key}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-sm transition ${
                        form.kelas === opt.key
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="kelas"
                          checked={form.kelas === opt.key}
                          onChange={() => updateForm("kelas", opt.key)}
                        />
                        <span>
                          {opt.label}
                          {opt.durasi ? ` · ${opt.durasi}` : ""}
                        </span>
                      </span>
                      <span className="font-semibold text-gray-800">
                        {formatRupiah(opt.harga)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border bg-gray-50 p-4 text-xs leading-relaxed text-gray-600">
                <p className="mb-2 font-semibold text-gray-800">
                  Pernyataan Persetujuan (Disclaimer)
                </p>
                <p className="mb-2">
                  Dengan mendaftar sebagai member kelas saham Lizstock, saya
                  memahami dan menyetujui bahwa:
                </p>
                <ol className="mb-2 list-decimal space-y-1 pl-4">
                  <li>
                    Seluruh materi, analisis, watchlist, dan informasi saham
                    yang diberikan hanya bersifat edukasi dan referensi,
                    berdasarkan indikator, data, serta analisis yang digunakan
                    oleh tim Lizstock.
                  </li>
                  <li>
                    Informasi yang diberikan bukan merupakan ajakan, perintah,
                    atau jaminan untuk membeli, menjual, atau menahan suatu
                    efek.
                  </li>
                  <li>
                    Setiap keputusan investasi sepenuhnya merupakan keputusan
                    pribadi saya setelah mempertimbangkan profil risiko,
                    kondisi keuangan, dan analisis saya sendiri.
                  </li>
                  <li>
                    Investasi di pasar modal memiliki risiko, termasuk
                    kemungkinan kehilangan sebagian atau seluruh modal yang
                    diinvestasikan.
                  </li>
                  <li>
                    Saya memahami bahwa pihak Lizstock, mentor, maupun tim
                    pengajar tidak bertanggung jawab atas kerugian maupun
                    keuntungan yang timbul dari keputusan investasi yang saya
                    ambil berdasarkan materi atau informasi yang diberikan
                    selama kelas.
                  </li>
                </ol>
                <p>
                  Dengan mencentang kotak persetujuan dan melakukan
                  pendaftaran, saya menyatakan telah membaca, memahami, dan
                  menyetujui seluruh ketentuan di atas.
                </p>
              </div>

              <label className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.setujuDisclaimer}
                  onChange={(e) =>
                    updateForm("setujuDisclaimer", e.target.checked)
                  }
                  className="mt-1"
                />
                Saya sudah membaca dan menyetujui pernyataan persetujuan
                (disclaimer) di atas.
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting ? "Memproses..." : "Lanjutkan Pembayaran"}
              </button>
            </form>
          )}

          {step === "PAYMENT" && selectedKelas && (
            <div className="space-y-4 text-center">
              <p className="text-sm text-gray-600">
                Scan QRIS di bawah ini untuk membayar
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatRupiah(selectedKelas.harga)}
              </p>

              <div className="mx-auto w-56 rounded-xl border p-3">
                {/* Ganti src dengan foto QRIS asli, mis. /assets/qris-lizstock.png */}
                <img
                  src="/assets/qris-lizstock.png"
                  alt="QRIS Lizstock"
                  className="w-full rounded-lg"
                />
              </div>

              <PaymentStatusBadge status={paymentStatus} />

              <p className="text-xs text-gray-500">
                Status akan terupdate otomatis setelah admin memverifikasi
                pembayaranmu.
              </p>

              <button
                onClick={() => setStep("UPLOAD")}
                className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Sudah Bayar, Kirim Bukti Pembayaran
              </button>
            </div>
          )}

          {step === "UPLOAD" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Unggah screenshot bukti transfer/pembayaran QRIS kamu.
              </p>

              <PaymentStatusBadge status={paymentStatus} />

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />

              {proofPreview && (
                <img
                  src={proofPreview}
                  alt="Preview bukti pembayaran"
                  className="mx-auto max-h-64 rounded-lg border"
                />
              )}

              <button
                onClick={handleSendProof}
                disabled={submitting}
                className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting ? "Mengirim..." : "Kirim"}
              </button>
            </div>
          )}

          {step === "SUCCESS" && (
            <div className="space-y-3 py-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
                ✓
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Pendaftaran Berhasil Dikirim
              </h3>
              <p className="text-sm text-gray-600">
                Bukti pembayaranmu sudah kami terima dan sedang diverifikasi
                oleh tim Lizstock. Kamu akan dihubungi via WhatsApp setelah
                pembayaran dikonfirmasi.
              </p>
              <PaymentStatusBadge status={paymentStatus} />
              <button
                onClick={onClose}
                className="mt-2 w-full rounded-lg border border-gray-300 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Tutup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StepIndicator({ step }: { step: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: "FORM", label: "Data Diri" },
    { key: "PAYMENT", label: "Pembayaran" },
    { key: "UPLOAD", label: "Bukti Bayar" },
    { key: "SUCCESS", label: "Selesai" },
  ];
  const activeIndex = steps.findIndex((s) => s.key === step);

  return (
    <div className="flex items-center gap-1 px-6 pt-4 text-xs">
      {steps.map((s, i) => (
        <React.Fragment key={s.key}>
          <div
            className={`flex items-center gap-1 ${
              i <= activeIndex ? "text-blue-600" : "text-gray-300"
            }`}
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] ${
                i <= activeIndex
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-300"
              }`}
            >
              {i + 1}
            </div>
            <span className="hidden sm:inline">{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`h-px flex-1 ${
                i < activeIndex ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const map: Record<PaymentStatus, { label: string; className: string }> = {
    pending: {
      label: "Menunggu Konfirmasi",
      className: "bg-yellow-100 text-yellow-700",
    },
    berhasil: {
      label: "Pembayaran Berhasil",
      className: "bg-green-100 text-green-700",
    },
    gagal: {
      label: "Pembayaran Gagal",
      className: "bg-red-100 text-red-700",
    },
  };
  const s = map[status];
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${s.className}`}
    >
      {s.label}
    </span>
  );
}
