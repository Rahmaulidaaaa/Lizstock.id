import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';

export function Hero() {

    return (
  <section
  id="beranda"
  className="relative min-h-screen flex items-center overflow-hidden"
  style={{
    backgroundImage: "url('/images/hero-bg.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
  
>
  
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/40"></div>

    {/* Glow */}
    <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-green-500/10 blur-[180px] rounded-full"></div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center pt-20">

  <div className="max-w-4xl mx-auto">

        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 backdrop-blur-sm mb-8 mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-green-400 text-sm">
            Lizstock Official
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Selamat Datang di Lizstock
        </motion.h1>

        <motion.h2
          className="mt-4 text-4xl md:text-6xl font-bold text-green-400 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Bangun Kebebasan dengan
          <br />
          Strategi Saham yang Terbukti
        </motion.h2>

        <motion.p
          className="mt-8 text-lg md:text-xl text-gray-300 leading-8 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Program edukasi investasi saham yang komprehensif
          dengan mentor berpengalaman, kurikulum terstruktur,
          serta komunitas aktif untuk membantu perjalanan
          investasimu.
        </motion.p>

        {/* Button */}
        <motion.div
          className="flex flex-wrap justify-center gap-5 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold flex items-center gap-2 hover:scale-105 transition">

            Daftar Sekarang
            <ArrowRight size={20} />

          </button>

          <button className="px-8 py-4 rounded-xl bg-black/40 border border-white/20 backdrop-blur-md text-white flex items-center gap-3 hover:bg-black/60 transition">

            <Play size={18} />

            Lihat Program

          </button>

        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">

          {[
            {
              value: "1000+",
              label: "Alumni Sukses",
            },
            {
              value: "3+",
              label: "Tahun Pengalaman",
            },
            {
              value: "98%",
              label: "Tingkat Kepuasan",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md p-6 text-center"
            >
              <div className="text-4xl font-bold text-white">
                {item.value}
              </div>

              <div className="mt-2 text-gray-400">
                {item.label}
              </div>
            </motion.div>
          ))}

        </div>

      </div>

    </div>

    {/* Scroll */}
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
      animate={{ y: [0, 10, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    >
      <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
        <div className="w-1 h-2 rounded-full bg-white"></div>
      </div>
    </motion.div>

  </section>
);
}