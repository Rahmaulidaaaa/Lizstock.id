import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function CTA() {
  const benefits = [
    'Akses materi pembelajaran selamanya',
    'Konsultasi gratis dengan mentor',
    'Join komunitas investor aktif'
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="relative p-12 rounded-3xl bg-gradient-to-br from-green-500/10 via-emerald-600/10 to-green-500/10 backdrop-blur-sm border border-green-500/30 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-green-500"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-green-500/30 mb-6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-400 text-sm font-medium">Limited Seats Available</span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Mulai Perjalanan Investasi Anda Hari Ini
            </motion.h2>

            <motion.p
              className="text-xl text-gray-300 mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Daftarkan diri Anda sekarang dan dapatkan akses ke program edukasi
              investasi terbaik di Indonesia
            </motion.p>

            {/* Benefits List */}
            <motion.div
              className="grid md:grid-cols-2 gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                className="group px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl flex items-center gap-3 text-lg hover:shadow-2xl hover:shadow-green-500/50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Daftar Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Hubungi Kami
              </motion.button>
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              className="mt-8 flex items-center gap-6 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              
            </motion.div>
          </div>

          {/* Glow Effect */}
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
