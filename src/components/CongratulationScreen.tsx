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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-800 flex items-center justify-center p-4 md:p-8 lg:p-12">
      <div className="w-full max-w-4xl">
        {/* Congratulation text */}
        <motion.h1
          className="text-red-500 text-center mb-8 md:mb-12 lg:mb-16 text-4xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Congratulation!
        </motion.h1>

        {/* Avatar with crown */}
        <div className="relative flex justify-center mb-8 md:mb-12">
          <motion.div
            className="relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
          >
            {/* Floating crown */}
            <motion.div
              className="absolute -top-16 md:-top-24 lg:-top-32 left-1/2 -translate-x-1/2 z-20"
              animate={{ 
                y: [0, -10, 0],
                rotate: [-5, 5, -5]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Crown className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 text-red-500 fill-red-500 drop-shadow-2xl" />
              {/* Crown glow */}
              <div className="absolute inset-0 blur-xl bg-red-500/50 -z-10"></div>
            </motion.div>

            {/* Avatar */}
            <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-3xl md:rounded-[3rem] overflow-hidden border-4 border-red-500/50 shadow-2xl relative">
              <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                animate={{ x: [-400, 400] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            </div>

            {/* Rank badge */}
            <motion.div
              className="absolute -bottom-8 md:-bottom-10 lg:-bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-2xl md:rounded-3xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center border-4 border-white/20 shadow-2xl"
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.6, type: "spring", bounce: 0.6 }}
              whileHover={{ scale: 1.1, rotate: 360 }}
            >
              <div className="text-center">
                <div className="text-white text-4xl md:text-5xl lg:text-6xl">1</div>
                <div className="text-white text-lg md:text-xl lg:text-2xl">st</div>
              </div>
              {/* Laurel wreath */}
              <svg className="absolute -inset-4 md:-inset-6 w-32 h-32 md:w-44 md:h-44 lg:w-[200px] lg:h-[200px]" viewBox="0 0 120 120">
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
          className="text-white text-center mt-12 md:mt-16 lg:mt-20 mb-3 md:mb-4 text-3xl md:text-4xl lg:text-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {userName}
        </motion.h2>

        {/* Stats */}
        <motion.div
          className="flex flex-col items-center gap-2 md:gap-3 lg:gap-4 mb-8 md:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-2 md:gap-3 text-orange-400">
            <span className="text-xl md:text-2xl lg:text-3xl">⚡</span>
            <span className="text-xl md:text-2xl lg:text-3xl">{(speed ?? 0).toFixed(1)} km/j</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3 text-red-400">
            <span className="text-xl md:text-2xl lg:text-3xl">🔄</span>
            <span className="text-xl md:text-2xl lg:text-3xl">{laps ?? 0} putaran</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3 text-red-500">
            <span className="text-2xl md:text-3xl lg:text-4xl">⭐</span>
            <span className="text-3xl md:text-4xl lg:text-5xl">{score ?? 0}</span>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="space-y-4 md:space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <motion.button
            onClick={onHome}
            className="w-full py-4 md:py-5 lg:py-6 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl md:rounded-3xl text-white text-lg md:text-xl lg:text-2xl shadow-lg border border-white/20 flex items-center justify-center gap-2 md:gap-3 text-center"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
            <span>HOME</span>
          </motion.button>

          <motion.button
            onClick={onShare}
            className="w-full py-4 md:py-5 lg:py-6 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl md:rounded-3xl text-white text-lg md:text-xl lg:text-2xl shadow-lg border border-white/20 flex items-center justify-center gap-2 md:gap-3 text-center"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
            <span>SHARE</span>
          </motion.button>
        </motion.div>

        {/* Confetti particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 md:w-4 md:h-4 rounded-full"
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