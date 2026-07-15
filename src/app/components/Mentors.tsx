import { motion } from 'motion/react';
import { Instagram, Award } from 'lucide-react';

export function Mentors() {
  const mentors = [
    {
      name: 'Azrian Novrian',
      title: 'Scalper',
      specialization: 'Mentor 1',
      image: '/images/mentor1.png',
      Instagram: 'https://www.instagram.com/aziz_novrian?igsh=MWRmOXd4aW9ibXRrcQ=='
    },
    {
      name: 'Gunawan Cahya Ramadhan',
      title: 'Fundamental Analysis',
      specialization: 'Mentor 2',
      image: '/images/mentor2.png',
      Instagram: 'https://www.instagram.com/gunnn00_?igsh=MXcwNGExdHpiYWRuNA=='
    },
    {
      name: 'Adisya Nadhif Dwi Antoko',
      title: 'Technical Analysis',
      specialization: 'Mentor 3',
      image: '/images/mentor3.png',
      Instagram: 'https://www.instagram.com/ndhpdw_?igsh=d2VkMnV3a3VqY21l'
    },
  ];

  return (
    <section 
    id="mentor"
    className="relative py-32 px-6">
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
            <span className="text-green-400 text-sm font-medium">Tim Mentor</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Belajar dari yang Terbaik
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Mentor kami adalah praktisi berpengalaman dengan track record proven
            di industri pasar modal
          </p>
        </motion.div>

      {/* Mentors Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
  {mentors.map((mentor, index) => (
    <motion.div
      key={index}
      className="group relative w-full max-w-[360px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div
                className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-green-500/50 transition-all duration-300 overflow-hidden"
                whileHover={{ 
                  y: -12,
                  boxShadow: "0 25px 50px rgba(0, 200, 83, 0.15)"
                }}
              >
                {/* Avatar */}
                <div className="relative mb-6">
                  <motion.img
                src={mentor.image}
                alt={mentor.name}
                className="w-24 h-24 mx-auto rounded-2xl object-cover border-2 border-green-500"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
/>
                  
                 
                  
                </div>

                {/* Info */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {mentor.name}
                  </h3>
                  <div className="text-green-400 text-sm mb-3">
                    {mentor.title}
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs inline-block mb-3">
                    {mentor.specialization}
                  </div>
                </div>

                <motion.a
  href={mentor.Instagram}
  target="_blank"
  rel="noopener noreferrer"
  className="w-full px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 flex items-center justify-center gap-2 text-sm transition-all"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  <Instagram className="w-4 h-4" />
  View Profile
</motion.a>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-400 mb-6">
            Ingin konsultasi langsung dengan mentor kami?
          </p>
          <motion.button
            className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-white/10 hover:border-green-500/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Jadwalkan Konsultasi
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
