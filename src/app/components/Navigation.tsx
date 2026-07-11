import { motion } from 'motion/react';

export function Navigation() {
  const navItems = ['Beranda', 'Tentang','Program', 'Keuntungan', 'Mentor', 'Artikel', 'Testimoni', 'Kontak'];

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
        className="flex items-center"
        whileHover={{ scale: 1.05 }}
    >
      <img
        src="/images/logo.png"
        alt="Lizstock"
      className="h-12 w-auto"
    />
      </motion.div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-300 hover:text-white transition-colors relative"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-400"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 200, 83, 0.5)" }}
          whileTap={{ scale: 0.95 }}
        >
          Daftar Sekarang
        </motion.button>
      </div>
    </motion.nav>
  );
}
