import { motion } from 'motion/react';
import { Target, Eye, Award, Shield } from 'lucide-react';

export function About() {
  const features = [
    {
      icon: Target,
      title: 'Visi',
      description: 'Menjadi layanan edukasi dan informasi saham yang terpercaya, transparan dan berorientasi pada pembentukan investor yang mandiri, disiplin, serta memiliki manajemen risiko yang baik.'
    },
    {
      icon: Eye,
      title: 'Misi',
      description: 'Memberikan edukasi investasi berkualitas dengan metode pembelajaran praktis dan aplikatif.'
    },
   
  ];

  return (
    <section id="tentang" className="relative py-32 px-6">
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
            <span className="text-green-400 text-sm font-medium">Tentang Kami</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Kelas Pasar Modal Terpercaya
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Kami berkomitmen untuk memberikan edukasi investasi yang berkualitas,
            praktis, dan sesuai dengan regulasi pasar modal Indonesia
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-green-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 40px rgba(0, 200, 83, 0.1)"
              }}
            >
              <div className="flex items-start gap-6">
                <motion.div
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30 flex items-center justify-center flex-shrink-0"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-7 h-7 text-green-400" />
                </motion.div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-green-400 text-4xl font-bold mb-2">15+</div>
              <div className="text-gray-300">Tahun Berpengalaman</div>
            </div>
            <div>
              <div className="text-green-400 text-4xl font-bold mb-2">50+</div>
              <div className="text-gray-300">Mentor Bersertifikat</div>
            </div>
            <div>
              <div className="text-green-400 text-4xl font-bold mb-2">100+</div>
              <div className="text-gray-300">Batch Pembelajaran</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
