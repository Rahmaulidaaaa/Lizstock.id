import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Andi Prasetyo',
      role: 'Entrepreneur',
      program: 'Advanced Program',
      rating: 5,
      image: 'AP',
      testimonial: 'Program yang luar biasa! Dalam 3 bulan saya sudah bisa menghasilkan profit konsisten dari trading. Mentor sangat helpful dan materinya aplikatif.',
      result: '+45% Portfolio Return'
    },
    {
      name: 'Diana Kartika',
      role: 'Professional',
      program: 'Intermediate Program',
      rating: 5,
      image: 'DK',
      testimonial: 'Awalnya saya skeptis, tapi setelah mengikuti program ini, mindset investasi saya berubah total. Sekarang portfolio saya sudah grow 35%.',
      result: '+35% Portfolio Return'
    },
    {
      name: 'Rizki Abdullah',
      role: 'Fresh Graduate',
      program: 'Beginner Program',
      rating: 5,
      image: 'RA',
      testimonial: 'Sebagai pemula, saya sangat terbantu dengan metode pembelajaran yang step-by-step. Support dari komunitas juga sangat aktif!',
      result: 'Consistent Profit'
    },
    {
      name: 'Siti Nurhaliza',
      role: 'Business Owner',
      program: 'Advanced Program',
      rating: 5,
      image: 'SN',
      testimonial: 'Investment terbaik yang pernah saya lakukan adalah invest di ilmu. Program ini benar-benar mengubah cara saya mengelola uang.',
      result: '+52% Portfolio Return'
    },
    {
      name: 'Budi Santoso',
      role: 'Corporate Employee',
      program: 'Intermediate Program',
      rating: 5,
      image: 'BS',
      testimonial: 'Materinya sangat lengkap, dari fundamental sampai technical. Live trading session nya sangat membantu untuk praktik langsung.',
      result: '+28% Portfolio Return'
    },
    {
      name: 'Maya Angelina',
      role: 'Freelancer',
      program: 'Beginner Program',
      rating: 5,
      image: 'MA',
      testimonial: 'Sekarang saya punya passive income dari dividen dan capital gain. Thank you Sekolah Pasar Modal!',
      result: 'Passive Income'
    }
  ];

  return (
    <section 
    id="testimoni"
    className="relative py-32 px-6 bg-gradient-to-b from-green-500/5 via-transparent to-transparent">
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
            <span className="text-green-400 text-sm font-medium">Testimonial</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Kata Alumni Kami
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ribuan alumni telah merasakan manfaat program kami dan mencapai
            target finansial mereka
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-green-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 25px 50px rgba(0, 200, 83, 0.15)"
              }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-green-500/20">
                <Quote className="w-12 h-12" />
              </div>

              {/* Profile */}
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <motion.div
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {testimonial.image}
                </motion.div>
                
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 mb-4 leading-relaxed">
                "{testimonial.testimonial}"
              </p>

              {/* Program & Result */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-xs text-gray-500">{testimonial.program}</span>
                <span className="text-xs font-medium text-green-400">{testimonial.result}</span>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/0 via-green-500/10 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { value: '10,000+', label: 'Alumni' },
            { value: '4.9/5', label: 'Rating' },
            { value: '98%', label: 'Satisfaction' },
            { value: '85%', label: 'Success Rate' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
