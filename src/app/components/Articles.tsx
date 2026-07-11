import { motion } from 'motion/react';
import { Calendar, ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';

export function Articles() {
  const articles = [
    {
      category: 'Market Analysis',
      title: 'Strategi Investasi di Tengah Volatilitas Market 2026',
      excerpt: 'Panduan lengkap menghadapi kondisi market yang volatile dengan strategi diversifikasi dan risk management...',
      date: '20 Feb 2026',
      readTime: '5 min',
      trending: 'up',
      image: '📈',
      link: 'https://www.cnbcindonesia.com/market/20260212113220-17-710537/anti-salah-langkah-kupas-strategi-investasi-di-tengah-volatilitas',
    },
    {
      category: 'Technical Analysis',
      title: 'Menguasai Candlestick Pattern untuk Trading',
      excerpt: 'Pelajari 10 pola candlestick paling powerful yang sering digunakan oleh professional trader...',
      date: '18 Feb 2026',
      readTime: '7 min',
      trending: 'up',
      image: '📊',
      link: 'https://finex.co.id/blog/menguasai-16-pola-candlestick-penting',
    },
    {
      category: 'Fundamental',
      title: 'Cara Membaca Laporan Keuangan untuk Value Investing',
      excerpt: 'Teknik analisis laporan keuangan yang digunakan Warren Buffett untuk menemukan saham undervalued...',
      date: '15 Feb 2026',
      readTime: '10 min',
      trending: 'down',
      image: '💼',
      link:'https://www.brights.id/en/blog/cara-membaca-laporan-keuangan-perusahaan-untuk-investasi-saham'
    },
    {
      category: 'Market News',
      title: 'Siaran Pers: OJK Ingatkan Bahaya Scam yang Semakin Meluas, PBB Apresiasi Peran OJK dalam Penanganan Scam',
      excerpt: 'OJK terus berupaya memperkuat pelindungan konsumen, terutama dari ancaman scam atau penipuan digital yang bukan saja merugikan masyarakat, tetapi juga dapat mempengaruhi kepercayaan terhadap sektor jasa keuangan.',
      date: '6 Juli 2026',
      readTime: '6 min',
      trending: 'up',
      image: '📰',
      link:'https://ojk.go.id/id/berita-dan-kegiatan/siaran-pers/Pages/Seminar-Anti-Scam-OJK-UNODC-2026.aspx'
    }
  ];

  return (
    <section id="artikel" className="relative py-32 px-6">
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
            <span className="text-green-400 text-sm font-medium">Artikel</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Artikel & Analisis Terkini
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Update rutin tentang kondisi pasar, strategi trading, dan insights
            dari para ahli
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={index}
              className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-green-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 25px 50px rgba(0, 200, 83, 0.1)"
              }}
            >
              {/* Image/Icon */}
              <div className="flex items-start gap-6 mb-4">
                <motion.div
                  className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30 flex items-center justify-center text-3xl flex-shrink-0"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {article.image}
                </motion.div>

                <div className="flex-1">
                  {/* Category & Trending */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-green-400 text-xs font-medium">
                      {article.category}
                    </span>
                    {article.trending === 'up' ? (
                      <div className="flex items-center gap-1 text-green-400 text-xs">
                        <TrendingUp className="w-3 h-3" />
                        <span>Trending</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <TrendingDown className="w-3 h-3" />
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                    {article.title}
                  </h3>
                </div>
              </div>

              {/* Excerpt */}
              <p className="text-gray-400 mb-4 leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>

              {/* Meta Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-gray-500 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{article.date}</span>
                  </div>
                  <span>•</span>
                  <span>{article.readTime} read</span>
                </div>

                <motion.a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="..."
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                >
                Baca
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-white/10 hover:border-green-500/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Lihat Semua Artikel
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
