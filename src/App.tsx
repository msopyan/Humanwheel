import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, ChevronLeft } from 'lucide-react';
import { LeaderboardPodium } from './components/LeaderboardPodium';
import { LeaderboardList } from './components/LeaderboardList';
import { TabSelector } from './components/TabSelector';
import { CongratulationScreen } from './components/CongratulationScreen';

// Mock data - Humanwheel Leaderboard
const mockUsers = [
  {
    id: '1',
    name: 'Jonathan',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjExNTA2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    speed: 18.4,
    laps: 52,
    score: 957,
    rank: 1,
  },
  {
    id: '2',
    name: 'Martin',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NjExNTMxMzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    speed: 17.9,
    laps: 49,
    score: 877,
    rank: 2,
  },
  {
    id: '3',
    name: 'Amelia',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBmYWNlfGVufDF8fHx8MTc2MTE4Mjk1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    speed: 17.2,
    laps: 46,
    score: 791,
    rank: 3,
  },
  {
    id: '4',
    name: 'Emilia',
    avatar: 'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTEzNTg4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    speed: 16.8,
    laps: 44,
    score: 739,
    rank: 4,
  },
  {
    id: '5',
    name: 'Olivia',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjExMzAyMTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    speed: 16.4,
    laps: 43,
    score: 668,
    rank: 5,
  },
  {
    id: '6',
    name: 'Liam',
    avatar: 'https://images.unsplash.com/photo-1724435811349-32d27f4d5806?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBhdmF0YXJ8ZW58MXx8fHwxNzYxMTYxNzAzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    speed: 15.9,
    laps: 42,
    score: 608,
    rank: 6,
  },
  {
    id: '7',
    name: 'Noah',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjExNTA2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    speed: 15.2,
    laps: 38,
    score: 566,
    rank: 7,
  },
];

type ViewType = 'leaderboard' | 'congratulation' | 'podium';

export default function App() {
  const [activeTab, setActiveTab] = useState('Team');
  const [currentView, setCurrentView] = useState<ViewType>('leaderboard');

  const topThree = mockUsers.slice(0, 3);
  const remainingUsers = mockUsers.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-800 overflow-hidden relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {currentView === 'congratulation' ? (
          <motion.div
            key="congratulation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CongratulationScreen
              userName={mockUsers[0].name}
              userAvatar={mockUsers[0].avatar}
              speed={mockUsers[0].speed}
              laps={mockUsers[0].laps}
              score={mockUsers[0].score}
              onHome={() => setCurrentView('leaderboard')}
              onShare={() => alert('Sharing...')}
            />
          </motion.div>
        ) : currentView === 'podium' ? (
          <motion.div
            key="podium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md mx-auto">
              {/* Header */}
              <motion.div
                className="flex items-center justify-between mb-8 px-4"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <motion.button
                  onClick={() => setCurrentView('leaderboard')}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </motion.button>

                <h1 className="text-white text-xl">Leaderboard</h1>

                <motion.button
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Menu className="w-5 h-5 text-white" />
                </motion.button>
              </motion.div>

              <LeaderboardPodium topThree={topThree} />

              <div className="mt-8">
                <LeaderboardList users={remainingUsers} startRank={4} />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen"
          >
            {/* Mobile view */}
            <div className="max-w-md mx-auto px-4 py-6">
              {/* Header */}
              <motion.div
                className="flex items-center justify-between mb-8"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.button
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="w-5 h-5 rounded-full border-2 border-red-500"></div>
                </motion.button>

                <motion.h1
                  className="text-white text-xl"
                  whileHover={{ scale: 1.05 }}
                >
                  Leaderboard
                </motion.h1>

                <motion.button
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Menu className="w-5 h-5 text-white" />
                </motion.button>
              </motion.div>

              {/* Tabs */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <TabSelector
                  tabs={['Team', 'Local', 'Global']}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
              </motion.div>

              {/* Top Ranking Label */}
              <motion.div
                className="flex items-center justify-center gap-2 mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", bounce: 0.5 }}
              >
                <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent flex-1"></div>
                <span className="text-red-400 text-sm">★ Top Ranking ★</span>
                <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent flex-1"></div>
              </motion.div>

              {/* Leaderboard List */}
              <LeaderboardList users={mockUsers} startRank={1} />

              {/* Bottom action buttons */}
              <motion.div
                className="mt-8 flex gap-4"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  onClick={() => setCurrentView('podium')}
                  className="flex-1 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl text-white shadow-lg border border-white/20 text-center"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Podium
                </motion.button>
                <motion.button
                  onClick={() => setCurrentView('congratulation')}
                  className="flex-1 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl text-white shadow-lg border border-white/20 text-center"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Celebrate
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
