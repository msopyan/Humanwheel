import { motion } from 'motion/react';
import { Trophy, Crown } from 'lucide-react';

interface PodiumUser {
  id: string;
  name: string;
  avatar: string;
  speed: number;
  laps: number;
  score: number;
  rank: number;
}

interface LeaderboardPodiumProps {
  topThree: PodiumUser[];
}

export function LeaderboardPodium({ topThree }: LeaderboardPodiumProps) {
  const podiumOrder = [
    topThree.find(u => u.rank === 2),
    topThree.find(u => u.rank === 1),
    topThree.find(u => u.rank === 3),
  ].filter(Boolean) as PodiumUser[];

  const getPodiumHeight = (rank: number) => {
    if (rank === 1) return 'md:h-48 h-36';
    if (rank === 2) return 'md:h-40 h-32';
    return 'md:h-32 h-24';
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-red-500 to-red-700';
    if (rank === 2) return 'from-gray-300 to-gray-500';
    return 'from-orange-600 to-red-800';
  };

  return (
    <div className="flex items-end justify-center gap-3 md:gap-6 lg:gap-8 px-2 md:px-8 mb-6 md:mb-10">
      {podiumOrder.map((user, index) => (
        <motion.div
          key={user.id}
          className="flex flex-col items-center flex-1 max-w-[120px] md:max-w-[200px] lg:max-w-[280px]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.5 }}
        >
          {/* Laurel wreath */}
          <motion.div
            className="relative mb-2 md:mb-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              {/* Laurel decoration - Hidden on mobile for cleaner look */}
              <div className={`absolute -top-4 -left-6 -right-6 justify-center hidden md:flex ${user.rank === 1 ? 'z-10' : ''}`}>
                <svg width="160" height="80" viewBox="0 0 80 40" className={user.rank === 1 ? 'w-40' : 'w-32'}>
                  <path
                    d="M10,30 Q20,10 40,5 Q60,10 70,30"
                    fill="none"
                    stroke={user.rank === 1 ? '#ef4444' : user.rank === 2 ? '#9ca3af' : '#f97316'}
                    strokeWidth="3"
                  />
                  {/* Left laurel leaves */}
                  <ellipse cx="15" cy="25" rx="4" ry="6" fill={user.rank === 1 ? '#ef4444' : user.rank === 2 ? '#9ca3af' : '#f97316'} transform="rotate(-30 15 25)"/>
                  <ellipse cx="20" cy="18" rx="4" ry="6" fill={user.rank === 1 ? '#ef4444' : user.rank === 2 ? '#9ca3af' : '#f97316'} transform="rotate(-20 20 18)"/>
                  <ellipse cx="27" cy="12" rx="4" ry="6" fill={user.rank === 1 ? '#ef4444' : user.rank === 2 ? '#9ca3af' : '#f97316'} transform="rotate(-10 27 12)"/>
                  {/* Right laurel leaves */}
                  <ellipse cx="65" cy="25" rx="4" ry="6" fill={user.rank === 1 ? '#ef4444' : user.rank === 2 ? '#9ca3af' : '#f97316'} transform="rotate(30 65 25)"/>
                  <ellipse cx="60" cy="18" rx="4" ry="6" fill={user.rank === 1 ? '#ef4444' : user.rank === 2 ? '#9ca3af' : '#f97316'} transform="rotate(20 60 18)"/>
                  <ellipse cx="53" cy="12" rx="4" ry="6" fill={user.rank === 1 ? '#ef4444' : user.rank === 2 ? '#9ca3af' : '#f97316'} transform="rotate(10 53 12)"/>
                </svg>
              </div>

              {/* Rank badge */}
              <div className={`absolute -top-2 left-1/2 -translate-x-1/2 z-20 ${user.rank === 1 ? 'w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16' : 'w-9 h-9 md:w-12 md:h-12 lg:w-14 lg:h-14'} rounded-full bg-gradient-to-br ${getRankColor(user.rank)} flex items-center justify-center border-2 border-white/20 shadow-lg`}>
                <span className="text-white text-xs md:text-lg lg:text-xl">{user.rank}{user.rank === 1 ? 'st' : user.rank === 2 ? 'nd' : 'rd'}</span>
              </div>

              {/* Avatar */}
              <div className={`${user.rank === 1 ? 'w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40' : 'w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32'} rounded-2xl md:rounded-3xl overflow-hidden border-2 md:border-4 ${user.rank === 1 ? 'border-yellow-400' : user.rank === 2 ? 'border-gray-400' : 'border-amber-700'} shadow-xl bg-gradient-to-br ${user.rank === 1 ? 'from-yellow-200 to-yellow-400' : user.rank === 2 ? 'from-blue-200 to-blue-400' : 'from-orange-200 to-orange-400'}`}>
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>

              {/* Crown for 1st place */}
              {user.rank === 1 && (
                <motion.div
                  className="absolute -top-10 md:-top-16 left-1/2 -translate-x-1/2"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Crown className="w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 text-red-500 fill-red-500" />
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Name */}
          <p className="text-white text-center text-xs md:text-lg lg:text-2xl mb-1 md:mb-2 mt-2 md:mt-4 truncate max-w-full px-1">{user.name}</p>

          {/* Stats */}
          <div className="flex flex-col items-center gap-1 md:gap-2 mb-3 md:mb-6">
            <div className="flex items-center gap-1 text-orange-400">
              <span className="text-sm md:text-lg lg:text-xl">⚡</span>
              <span className="text-xs md:text-base lg:text-xl">{(user.speed ?? 0).toFixed(1)} km/j</span>
            </div>
            <div className="flex items-center gap-1 text-red-400">
              <span className="text-sm md:text-lg lg:text-xl">🔄</span>
              <span className="text-xs md:text-base lg:text-xl">{user.laps ?? 0} putaran</span>
            </div>
            <div className="flex items-center gap-1 text-red-500">
              <span className="text-sm md:text-lg lg:text-xl">⭐</span>
              <span className="text-sm md:text-xl lg:text-2xl">{user.score ?? 0}</span>
            </div>
          </div>

          {/* Podium */}
          <motion.div
            className={`w-full ${getPodiumHeight(user.rank)} bg-gradient-to-b ${getRankColor(user.rank)} rounded-t-2xl border-t-2 border-white/20 shadow-lg`}
            initial={{ height: 0 }}
            animate={{ height: user.rank === 1 ? '9rem' : user.rank === 2 ? '8rem' : '6rem' }}
            transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
          >
            <div className="flex items-center justify-center h-full">
              <span className="text-white/30 text-3xl md:text-4xl lg:text-5xl">{user.rank}</span>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}