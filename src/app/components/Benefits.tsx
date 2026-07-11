import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Users, 
  Video, 
  BarChart3, 
  Shield, 
  Headphones,
  FileText,
  Trophy
} from 'lucide-react';

export function Benefits() {
  const benefits = [
    {
      icon: GraduationCap,
      title: 'Kurikulum Terstruktur',
      description: 'Materi pembelajaran yang sistematis dari dasar hingga advanced'
    },
    {
      icon: Users,
      title: 'Mentor Berpengalaman',
      description: 'Dibimbing oleh praktisi pasar modal dengan track record terbukti'
    },
    {
      icon: Video,
      title: 'Live Trading Session',
      description: 'Praktik langsung dengan bimbingan real-time di market session'
    },
    {
      icon: BarChart3,
      title: 'Analisis Market',
      description: 'Update rutin tentang kondisi pasar dan rekomendasi trading'
    },
      {
      icon: FileText,
      title: 'Materi Lengkap',
      description: 'E-book, video tutorial, dan tools analisis eksklusif'
    },
       {
      icon: Headphones,
      title: 'Support 24/7',
      description: 'Konsultasi dan bantuan kapanpun Anda membutuhkan'
    },
    {
      icon: Shield,
      title: 'Manajemen Risk',
      description: 'Pengelolaan modal dan risiko agar trading lebih aman dan terkontrol'
    },
    {
      icon: Trophy,
      title: 'WR Signal 80%',
      description: 'Signal trading dengan akurasi historis hingga 80% berbasis analisis market'
    }
  ];

  return (
    <section
  id="keuntungan"
  className="relative py-32 px-6 bg-gradient-to-b from-transparent via-green-500/5 to-transparent"
>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-green-500/30 mb-4">
            <span className="text-green-400 text-sm font-medium">Keuntungan Belajar</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Mengapa Memilih Kami?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Berbagai keuntungan eksklusif yang akan Anda dapatkan saat bergabung
            dengan program kami
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-green-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 40px rgba(0, 200, 83, 0.15)"
              }}
            >
              {/* Icon with animation */}
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30 flex items-center justify-center mb-4"
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <benefit.icon className="w-6 h-6 text-green-400" />
              </motion.div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-2">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed">
                {benefit.description}
              </p>

              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/0 via-green-500/10 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                initial={false}
              />

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-400 mb-6">
            Siap untuk memulai perjalanan investasi Anda?
          </p>
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-2xl hover:shadow-green-500/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Mulai Belajar Sekarang
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
