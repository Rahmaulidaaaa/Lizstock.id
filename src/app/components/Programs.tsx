import { motion } from 'motion/react';
import { BookOpen, TrendingUp, Crown, ArrowRight } from 'lucide-react';

export function Programs() {
  const programs = [
    {
      level: 'Beginner',
      title: 'Program Dasar',
      icon: BookOpen,
      prices: [
  { label: "Sebulan", value: "Rp 250.000" }, 
],
      features: [
        'Pengenalan pasar modal',
        'Fundamental & teknikal dasar',
        'Praktik trading simulasi',
        'Manajemen risiko pemula',
        'Akses materi selamanya'
      ],
      popular: false,
      gradient: 'from-blue-500/20 to-cyan-600/20',
      borderGradient: 'from-blue-500 to-cyan-600'
    },
    {
      level: 'Intermediate',
      title: 'VVIP + Live Trade',
      icon: TrendingUp,
     prices: [
  { label: "Mingguan", value: "Rp 30.000" },
  { label: "Bulanan", value: "Rp 125.000" },
  { label: "3 Bulan", value: "Rp 285.000" },
  { label: "1 Tahun", value: "Rp 985.000" },
],
      features: [
        'Signal Scalping',
        'Swing',
        'BSJP Setiap Hari',
        'Dapat Mengikuti Live Trade Yarzz (setiap rabu/kamis)',
      ],
      popular: true,
      gradient: 'from-green-500/20 to-emerald-600/20',
      borderGradient: 'from-green-500 to-emerald-600'
    },
    {
      level: 'Advanced',
      title: 'Program Expert',
      icon: Crown,
      duration: '',
      sessions: '',
       prices: [
  { label: "1 Bulan", value: "Rp 135.000" },
  { label: "3 Bulanan", value: "Rp 380.000" },
  { label: "6 Bulan", value: "Rp 585.000" },
],
      features: [
        'Advanced trading strategies',
        'Quantitative analysis',
        'Risk management profesional',
        'Mentoring intensif',
        'Real market trading',
        'Certificate of completion',
        'Lifetime support'
      ],
      popular: false,
      gradient: 'from-amber-500/20 to-yellow-600/20',
      borderGradient: 'from-amber-500 to-yellow-600'
    }
  ];

  return (
    <section id="program" className="relative py-32 px-6">
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
            <span className="text-green-400 text-sm font-medium">Program Kami</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pilih Program yang Sesuai
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Dari pemula hingga expert, kami memiliki program yang dirancang khusus
            untuk setiap tingkat keahlian Anda
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Popular Badge */}
              {program.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Paling Populer
                </motion.div>
              )}

              <motion.div
                className={`relative h-full p-8 rounded-2xl bg-gradient-to-br ${program.gradient} backdrop-blur-sm border border-white/10 overflow-hidden`}
                whileHover={{ 
                  y: -12,
                  boxShadow: program.popular 
                    ? "0 25px 50px rgba(0, 200, 83, 0.2)"
                    : "0 25px 50px rgba(255, 255, 255, 0.05)"
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon */}
                <motion.div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${program.gradient} border border-white/20 flex items-center justify-center mb-6 mx-auto`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                >
                <program.icon className="w-10 h-10 text-white" />
                </motion.div>

                {/* Level Badge */}
                <div className="text-gray-300 text-lg font-semibold text-center mb-2">
                 {program.level}
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold text-white text-center mb-5">
                {program.title}
                </h3>

                {/* Info */}       
                {(program.duration || program.sessions) && (
                <div className="flex items-center justify-center gap-4 mb-3 text-gray-400 text-sm">
                {program.duration && <span>{program.duration}</span>}
                {program.duration && program.sessions && <span>•</span>}
                {program.sessions && <span>{program.sessions}</span>}
  </div>
)}

      {/* Price */}
<div className="mb-6">
  {program.prices ? (
    <div className="space-y-5">
      {program.prices.map((item, i) => (
        <div key={i}>
          <p className="text-gray-400 text-sm">
            {item.label}
          </p>
          <h3 className="text-2xl font-bold text-white leading-none">
            {item.value}
          </h3>
        </div>
      ))}
    </div>
  ) : (
    <>
      <div className="text-3xl font-bold text-white">
        {program.prices}
      </div>
      <div className="text-gray-400 text-sm">
      </div>
    </>
  )}
</div>

                {/* Features */}
                <ul className="space-y-3 mt-8 mb-8">
                  {program.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${program.borderGradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.button
                  className={`w-full px-6 py-3 rounded-xl bg-gradient-to-r ${program.borderGradient} text-white font-medium flex items-center justify-center gap-2 group/btn`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Pilih Program
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </motion.button>

                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${program.borderGradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
