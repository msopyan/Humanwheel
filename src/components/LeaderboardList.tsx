import { motion } from 'motion/react';

interface User {
  id: string;
  name: string;
  avatar: string;
  speed: number;
  laps: number;
  score: number;
  rank: number;
}

interface LeaderboardListProps {
  users: User[];
  startRank?: number;
}

export function LeaderboardList({ users, startRank = 4 }: LeaderboardListProps) {
  const getRankColor = (rank: number) => {
    if (rank <= 3) return 'from-red-500 to-red-700';
    if (rank <= 5) return 'from-orange-500 to-red-600';
    return 'from-gray-500 to-gray-700';
  };

  return (
    <div className="space-y-3 px-4">
      {/* Header */}
      <motion.div
        className="grid grid-cols-[1fr_auto_auto_auto] gap-2 px-4 pb-2 border-b border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-red-400 text-sm">NAMA</div>
        <div className="text-red-400 text-sm text-center w-20">KECEPATAN (KM/J)</div>
        <div className="text-red-400 text-sm text-center w-16">JUMLAH PUTARAN</div>
        <div className="text-red-400 text-sm text-center w-16">TOTAL SKOR</div>
      </motion.div>

      {users.map((user, index) => (
        <motion.div
          key={user.id}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 hover:bg-white/10 transition-colors border border-white/10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2 items-center">
            {/* Name with avatar */}
            <div className="flex items-center gap-3 min-w-0">
              <motion.div
                className="relative flex-shrink-0"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {/* Laurel wreath for top ranks */}
                {user.rank <= 7 && (
                  <div className="absolute -inset-2">
                    <svg width="48" height="48" viewBox="0 0 48 48" className="w-full h-full">
                      <circle cx="24" cy="24" r="20" fill="none" stroke={user.rank <= 3 ? '#ef4444' : '#f97316'} strokeWidth="1.5" strokeDasharray="2,2" opacity="0.3"/>
                      {/* Laurel leaves */}
                      {[...Array(8)].map((_, i) => (
                        <ellipse
                          key={i}
                          cx={24 + 18 * Math.cos((i * Math.PI) / 4)}
                          cy={24 + 18 * Math.sin((i * Math.PI) / 4)}
                          rx="2"
                          ry="3"
                          fill={user.rank <= 3 ? '#ef4444' : '#f97316'}
                          opacity="0.6"
                          transform={`rotate(${i * 45} ${24 + 18 * Math.cos((i * Math.PI) / 4)} ${24 + 18 * Math.sin((i * Math.PI) / 4)})`}
                        />
                      ))}
                    </svg>
                  </div>
                )}
                <div className={`relative w-10 h-10 rounded-full bg-gradient-to-br ${getRankColor(user.rank)} flex items-center justify-center border-2 border-white/20 shadow-lg`}>
                  <span className="text-white text-sm z-10">{user.rank}</span>
                  {user.rank <= 3 && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                  )}
                </div>
              </motion.div>

              <motion.div
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0"
                whileHover={{ scale: 1.1 }}
              >
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </motion.div>

              <p className="text-white truncate">{user.name}</p>
            </div>

            {/* Speed */}
            <div className="text-orange-400 text-center w-20">
              {user.speed.toFixed(1)}
            </div>

            {/* Laps */}
            <div className="text-red-400 text-center w-16">
              {user.laps}
            </div>

            {/* Score */}
            <div className="text-red-500 text-center w-16">
              {user.score}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
