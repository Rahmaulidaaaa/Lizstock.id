import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function StockBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-[0.21]">
      {/* Animated candlestick charts */}
      <AnimatedCandlesticks />
      
      {/* Animated line charts */}
      <AnimatedLineCharts />
      
      {/* Floating price numbers */}
      <FloatingPrices />
    </div>
  );
}

function AnimatedCandlesticks() {
  const candlesticks = generateCandlesticks();

  return (
    <svg className="absolute w-full h-full">
      <motion.g
        initial={{ x: -100 }}
        animate={{ x: 100 }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {candlesticks.map((candle, i) => (
          <g key={i} transform={`translate(${candle.x}, ${candle.y})`}>
            {/* Candle body */}
            <rect
              x="0"
              y={candle.isGreen ? candle.close : candle.open}
              width="8"
              height={Math.abs(candle.close - candle.open)}
              fill={candle.isGreen ? "#00C853" : "#FF1744"}
              opacity="0.6"
            />
            {/* Upper wick */}
            <line
              x1="4"
              y1={candle.high}
              x2="4"
              y2={Math.min(candle.open, candle.close)}
              stroke={candle.isGreen ? "#00C853" : "#FF1744"}
              strokeWidth="2"
              opacity="0.6"
            />
            {/* Lower wick */}
            <line
              x1="4"
              y1={Math.max(candle.open, candle.close)}
              x2="4"
              y2={candle.low}
              stroke={candle.isGreen ? "#00C853" : "#FF1744"}
              strokeWidth="2"
              opacity="0.6"
            />
          </g>
        ))}
      </motion.g>
    </svg>
  );
}

function AnimatedLineCharts() {
  const paths = generateLinePaths();

  return (
    <svg className="absolute w-full h-full">
      {paths.map((path, i) => (
        <motion.path
          key={i}
          d={path.d}
          stroke={i % 2 === 0 ? "#00C853" : "#D4AF37"}
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 0.4,
            y: [-20, 20, -20]
          }}
          transition={{
            pathLength: { duration: 3, ease: "easeInOut" },
            opacity: { duration: 1 },
            y: { 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 0.5
            }
          }}
        />
      ))}
      
      {/* Glowing points on charts */}
      {paths.map((path, i) => (
        <motion.circle
          key={`point-${i}`}
          cx={path.glowX}
          cy={path.glowY}
          r="4"
          fill={i % 2 === 0 ? "#00C853" : "#D4AF37"}
          initial={{ scale: 0.8, opacity: 0.3 }}
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3
          }}
        />
      ))}
    </svg>
  );
}

function FloatingPrices() {
  const [prices, setPrices] = useState(generatePrices());

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(generatePrices());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute w-full h-full">
      {prices.map((price, i) => (
        <motion.div
          key={i}
          className="absolute text-green-500 font-mono text-sm"
          style={{ left: `${price.x}%`, top: `${price.y}%` }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ 
            opacity: [0, 0.6, 0],
            y: -50
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: price.delay
          }}
        >
          {price.value}
        </motion.div>
      ))}
    </div>
  );
}

// Helper functions to generate random data
function generateCandlesticks() {
  const candlesticks = [];
  for (let i = 0; i < 40; i++) {
    const open = 100 + Math.random() * 200;
    const close = open + (Math.random() - 0.5) * 60;
    const high = Math.max(open, close) + Math.random() * 20;
    const low = Math.min(open, close) - Math.random() * 20;
    
    candlesticks.push({
      x: (i % 20) * 80 + 50,
      y: Math.floor(i / 20) * 300 + 100,
      open,
      close,
      high,
      low,
      isGreen: close > open
    });
  }
  return candlesticks;
}

function generateLinePaths() {
  const paths = [];
  for (let i = 0; i < 4; i++) {
    const points = [];
    const startY = 200 + i * 150;
    
    for (let j = 0; j < 8; j++) {
      const x = j * 200 + 100;
      const y = startY + (Math.random() - 0.5) * 100;
      points.push({ x, y });
    }
    
    const d = points.map((p, idx) => 
      `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
    ).join(' ');
    
    paths.push({
      d,
      glowX: points[Math.floor(points.length / 2)].x,
      glowY: points[Math.floor(points.length / 2)].y
    });
  }
  return paths;
}

function generatePrices() {
  const prices = [];
  for (let i = 0; i < 12; i++) {
    const value = (1000 + Math.random() * 9000).toFixed(2);
    prices.push({
      value,
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5,
      delay: i * 0.5
    });
  }
  return prices;
}
