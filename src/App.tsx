import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, ChevronLeft, RefreshCw, Database, UserPlus } from 'lucide-react';
import { LeaderboardPodium } from './components/LeaderboardPodium';
import { LeaderboardList } from './components/LeaderboardList';
import { CongratulationScreen } from './components/CongratulationScreen';
import { AddPlayerModal } from './components/AddPlayerModal';
import { getLeaderboard, seedData, addNewPlayer } from './utils/api';

type ViewType = 'leaderboard' | 'congratulation' | 'podium' | 'input';

interface Player {
  id: string;
  name: string;
  avatar: string;
  speed: number;
  laps: number;
  score: number;
  rank?: number;
  category?: string;
  timestamp?: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('leaderboard');
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load data from Supabase
  useEffect(() => {
    loadData();
  }, []);

  // Auto refresh every 10 seconds for real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      loadData(true);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  async function loadData(silent = false) {
    if (!silent) {
      setLoading(true);
    }
    setRefreshing(true);
    
    try {
      const data = await getLeaderboard('team');
      setPlayers(data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function handleSeedData() {
    setLoading(true);
    try {
      const success = await seedData();
      if (success) {
        alert('Data berhasil diisi dengan contoh data!');
        await loadData();
      } else {
        alert('Gagal mengisi data. Coba lagi.');
      }
    } catch (error) {
      console.error('Error seeding data:', error);
      alert('Terjadi kesalahan saat mengisi data.');
    } finally {
      setLoading(false);
    }
  }

  async function handleAddPlayer(playerData: {
    name: string;
    avatar: string;
    speed: number;
    laps: number;
    score: number;
  }) {
    const result = await addNewPlayer(
      playerData.name,
      'team', // category
      playerData.avatar,
      playerData.speed,
      playerData.laps,
      playerData.score
    );

    if (result.success) {
      alert('Player berhasil ditambahkan!');
      await loadData();
    } else {
      throw new Error('Failed to add player');
    }
  }

  const topThree = players.slice(0, 3);
  const remainingUsers = players.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-800 overflow-hidden relative">
      {/* Add Player Modal */}
      <AddPlayerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddPlayer}
      />

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
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
        {currentView === 'input' ? (
          <motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <InputForm
              onSuccess={() => {
                loadData();
                setCurrentView('leaderboard');
              }}
              onCancel={() => setCurrentView('leaderboard')}
            />
          </motion.div>
        ) : currentView === 'congratulation' ? (
          <motion.div
            key="congratulation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CongratulationScreen
              userName={players[0]?.name || 'Champion'}
              userAvatar={players[0]?.avatar || ''}
              speed={players[0]?.speed || 0}
              laps={players[0]?.laps || 0}
              score={players[0]?.score || 0}
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
            className="min-h-screen flex items-center justify-center p-12"
          >
            <div className="w-full max-w-6xl mx-auto">
              {/* Header */}
              <motion.div
                className="flex items-center justify-between mb-12 px-8"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <motion.button
                  onClick={() => setCurrentView('leaderboard')}
                  className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-8 h-8 text-white" />
                </motion.button>

                <div className="flex flex-col items-center">
                  <h1 className="text-white text-5xl">Lezza HumanWheel</h1>
                  <p className="text-red-400 text-2xl">Leaderboard</p>
                </div>

                <motion.button
                  onClick={() => loadData()}
                  className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <RefreshCw className={`w-8 h-8 text-white ${refreshing ? 'animate-spin' : ''}`} />
                </motion.button>
              </motion.div>

              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <RefreshCw className="w-16 h-16 text-white animate-spin" />
                </div>
              ) : (
                <>
                  <LeaderboardPodium topThree={topThree} />

                  <div className="mt-12">
                    <LeaderboardList users={remainingUsers} startRank={4} />
                  </div>
                </>
              )}
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
            {/* Desktop view optimized for TV 32 inch (1920x1080) */}
            <div className="max-w-7xl mx-auto px-12 py-10">
              {/* Header */}
              <motion.div
                className="flex items-center justify-between mb-12"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex gap-3">
                  <motion.button
                    onClick={handleSeedData}
                    className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Isi Data Contoh"
                  >
                    <Database className="w-8 h-8 text-red-400" />
                  </motion.button>

                  <motion.button
                    onClick={() => setIsModalOpen(true)}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-red-600 to-red-700 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-lg"
                    whileHover={{ scale: 1.1, boxShadow: "0 10px 30px rgba(239, 68, 68, 0.4)" }}
                    whileTap={{ scale: 0.9 }}
                    title="Add New Player"
                  >
                    <UserPlus className="w-8 h-8 text-white" />
                  </motion.button>
                </div>

                <motion.div
                  className="flex flex-col items-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <h1 className="text-white text-6xl">Lezza HumanWheel</h1>
                  <p className="text-red-400 text-3xl">Leaderboard</p>
                </motion.div>

                <motion.button
                  onClick={() => loadData()}
                  className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Refresh Data"
                >
                  <RefreshCw className={`w-8 h-8 text-white ${refreshing ? 'animate-spin' : ''}`} />
                </motion.button>
              </motion.div>

              {/* Top Ranking Label */}
              <motion.div
                className="flex items-center justify-center gap-4 mb-10 mt-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
              >
                <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent flex-1"></div>
                <span className="text-red-400 text-2xl">★ Top Ranking ★</span>
                <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent flex-1"></div>
              </motion.div>

              {/* Loading or Leaderboard List */}
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <RefreshCw className="w-16 h-16 text-white animate-spin" />
                </div>
              ) : players.length === 0 ? (
                <motion.div
                  className="text-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-white text-2xl mb-4">Belum ada data leaderboard</p>
                  <p className="text-gray-400 text-xl mb-8">Tambahkan player baru atau isi data contoh</p>
                  <div className="flex gap-4 justify-center">
                    <motion.button
                      onClick={() => setIsModalOpen(true)}
                      className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl text-white text-xl shadow-lg border border-white/20 flex items-center gap-2"
                      whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <UserPlus className="w-6 h-6" />
                      Add New Player
                    </motion.button>
                    <motion.button
                      onClick={handleSeedData}
                      className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-2xl text-white text-xl shadow-lg border border-white/20 flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Database className="w-6 h-6" />
                      Isi Data Contoh
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <LeaderboardList users={players} startRank={1} />
              )}

              {/* Bottom action buttons */}
              {players.length > 0 && (
                <motion.div
                  className="mt-12 flex gap-6"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.button
                    onClick={() => setCurrentView('input')}
                    className="flex-1 py-5 bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl text-white text-2xl shadow-lg border border-white/20 text-center"
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(55, 65, 81, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Input Data
                  </motion.button>
                  <motion.button
                    onClick={() => setCurrentView('podium')}
                    className="flex-1 py-5 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl text-white text-2xl shadow-lg border border-white/20 text-center"
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Podium
                  </motion.button>
                  <motion.button
                    onClick={() => setCurrentView('congratulation')}
                    className="flex-1 py-5 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl text-white text-2xl shadow-lg border border-white/20 text-center"
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Celebrate
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}