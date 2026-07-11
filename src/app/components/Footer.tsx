import { motion } from 'motion/react';
import { FaTiktok } from "react-icons/fa6";
import { 
  TrendingUp, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Youtube,


} from 'lucide-react';

export function Footer() {
  const footerLinks = {
    'Program': ['Beginner', 'Intermediate', 'Advanced'],
    'Resources': ['Artikel', 'Market Analysis'],
    'Lizstock': ['Tentang Kami', 'Mentor'],
    'Support': ['FAQ', 'Contact']
  };

  return (
    <footer id="kontak" className="relative pt-20 pb-10 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
           <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
>
  <img
    src="/images/logo.png"
    alt="Lizstock"
    className="h-16 w-auto"
  />
</motion.div>

            <motion.p
              className="text-gray-400 mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Lembaga edukasi pasar modal terpercaya yang telah menghasilkan ribuan
              investor sukses di Indonesia.
            </motion.p>

            {/* Contact Info */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-green-400" />
                <span>0815-5511-9338 </span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Instagram className="w-4 h-4 text-green-400" />
                <span>lizstock.id </span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
  <FaTiktok className="w-4 h-4 text-green-400" />
  <span>@lizstock.id</span>
</div>
              
             

            </motion.div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links], columnIndex) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (columnIndex + 1) }}
            >
              <h4 className="text-white font-bold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                      whileHover={{ x: 4 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Media & Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Copyright */}
            <div className="w-full text-gray-400 text-sm text-center">
  <p>© 2026 Sekolah Pasar Modal. All rights reserved.</p>
</div>
          </div>

          {/* Disclaimer */}
          <motion.div
            className="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-amber-400 text-xs leading-relaxed text-center">
              <strong>Lizstock.id</strong> 
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
