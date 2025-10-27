import { motion } from 'motion/react';
import { Crown, Home, Share2 } from 'lucide-react';

interface CongratulationScreenProps {
  userName: string;
  userAvatar: string;
  speed: number;
  laps: number;
  score: number;
  onHome: () => void;
  onShare: () => void;
}

export function CongratulationScreen({
  userName,
  userAvatar,
  speed,
  laps,
  score,
  onHome,
  onShare,
}: CongratulationScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Congratulation text */}
        <motion.h1
          className="text-red-500 text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Congratulation!
        </motion.h1>

        {/* Avatar with crown */}
        <div className="relative flex justify-center mb-8">
          <motion.div
            className="relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
          >
            {/* Floating crown */}
            <motion.div
              className="absolute -top-16 left-1/2 -translate-x-1/2 z-20"
              animate={{ 
                y: [0, -10, 0],
                rotate: [-5, 5, -5]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Crown className="w-20 h-20 text-red-500 fill-red-500 drop-shadow-2xl" />
              {/* Crown glow */}
              <div className="absolute inset-0 blur-xl bg-red-500/50 -z-10"></div>
            </motion.div>

            {/* Avatar */}
            <div className="w-48 h-48 rounded-3xl overflow-hidden border-4 border-red-500/50 shadow-2xl relative">
              <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                animate={{ x: [-200, 200] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            </div>

            {/* Rank badge */}
            <motion.div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center border-4 border-white/20 shadow-2xl"
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.6, type: "spring", bounce: 0.6 }}
              whileHover={{ scale: 1.1, rotate: 360 }}
            >
              <div className="text-center">
                <div className="text-white text-3xl">1</div>
                <div className="text-white text-xs">st</div>
              </div>
              {/* Laurel wreath */}
              <svg className="absolute -inset-3 w-[120px] h-[120px]" viewBox="0 0 120 120">
                <path
                  d="M30,60 Q30,30 60,20 Q90,30 90,60"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="3"
                  opacity="0.6"
                />
                <path
                  d="M30,60 Q30,90 60,100 Q90,90 90,60"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="3"
                  opacity="0.6"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* User name */}
        <motion.h2
          className="text-white text-center mt-12 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {userName}
        </motion.h2>

        {/* Stats */}
        <motion.div
          className="flex flex-col items-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-2 text-orange-400">
            <span className="text-xl">⚡</span>
            <span className="text-xl">{speed.toFixed(1)} km/j</span>
          </div>
          <div className="flex items-center gap-2 text-red-400">
            <span className="text-xl">🔄</span>
            <span className="text-xl">{laps} putaran</span>
          </div>
          <div className="flex items-center gap-2 text-red-500">
            <span className="text-2xl">⭐</span>
            <span className="text-3xl">{score}</span>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <motion.button
            onClick={onHome}
            className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl text-white shadow-lg border border-white/20 flex items-center justify-center gap-2 text-center"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-5 h-5" />
            <span>HOME</span>
          </motion.button>

          <motion.button
            onClick={onShare}
            className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl text-white shadow-lg border border-white/20 flex items-center justify-center gap-2 text-center"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 className="w-5 h-5" />
            <span>SHARE</span>
          </motion.button>
        </motion.div>

        {/* Confetti particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: ['#ef4444', '#f97316', '#dc2626', '#b91c1c', '#f87171'][i % 5],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
