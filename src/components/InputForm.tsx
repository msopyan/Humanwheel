import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Gauge, RotateCw, Trophy, Save, X, Check } from 'lucide-react';
import { addOrUpdatePlayer } from '../utils/api';

interface InputFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function InputForm({ onSuccess, onCancel }: InputFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    speed: '',
    laps: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.speed || !formData.laps) {
      return;
    }

    setIsSubmitting(true);

    try {
      const speed = parseFloat(formData.speed);
      const laps = parseInt(formData.laps);
      const score = speed * laps;

      const player = {
        id: `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: formData.name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
        speed,
        laps,
        score,
      };

      const success = await addOrUpdatePlayer(player, 'team');

      if (success) {
        setShowSuccess(true);
        setTimeout(() => {
          setFormData({ name: '', speed: '', laps: '' });
          setShowSuccess(false);
          onSuccess();
        }, 1500);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const speed = parseFloat(formData.speed) || 0;
  const laps = parseInt(formData.laps) || 0;
  const calculatedScore = speed * laps;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 p-8 flex items-center justify-center">
      <motion.div
        className="w-full max-w-4xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-white text-6xl mb-2">Lezza HumanWheel</h1>
          <p className="text-red-400 text-3xl">Input Data Pemain</p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-3xl p-12 border border-white/10 shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {showSuccess ? (
            <motion.div
              className="flex flex-col items-center justify-center py-20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              <motion.div
                className="w-32 h-32 rounded-full bg-green-500/20 flex items-center justify-center mb-6"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Check className="w-16 h-16 text-green-400" />
              </motion.div>
              <h2 className="text-white text-4xl mb-2">Berhasil!</h2>
              <p className="text-gray-400 text-xl">Data pemain telah disimpan</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Input */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className="flex items-center gap-3 text-white text-2xl mb-4">
                  <User className="w-7 h-7 text-red-400" />
                  Nama Pemain
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Masukkan nama pemain"
                  required
                  className="w-full px-6 py-5 bg-gray-900/50 border-2 border-white/10 rounded-xl text-white text-xl placeholder-gray-500 focus:border-red-500 focus:outline-none transition-all"
                />
              </motion.div>

              {/* Speed Input */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <label className="flex items-center gap-3 text-white text-2xl mb-4">
                  <Gauge className="w-7 h-7 text-red-400" />
                  Kecepatan (KM/J)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.speed}
                  onChange={(e) => handleChange('speed', e.target.value)}
                  placeholder="Contoh: 25.5"
                  required
                  className="w-full px-6 py-5 bg-gray-900/50 border-2 border-white/10 rounded-xl text-white text-xl placeholder-gray-500 focus:border-red-500 focus:outline-none transition-all"
                />
              </motion.div>

              {/* Laps Input */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <label className="flex items-center gap-3 text-white text-2xl mb-4">
                  <RotateCw className="w-7 h-7 text-red-400" />
                  Jumlah Putaran
                </label>
                <input
                  type="number"
                  value={formData.laps}
                  onChange={(e) => handleChange('laps', e.target.value)}
                  placeholder="Contoh: 10"
                  required
                  className="w-full px-6 py-5 bg-gray-900/50 border-2 border-white/10 rounded-xl text-white text-xl placeholder-gray-500 focus:border-red-500 focus:outline-none transition-all"
                />
              </motion.div>

              {/* Calculated Score Display */}
              {calculatedScore > 0 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500/30 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-8 h-8 text-yellow-400" />
                      <span className="text-white text-2xl">Total Score:</span>
                    </div>
                    <span className="text-yellow-400 text-4xl">
                      {calculatedScore.toFixed(1)}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <motion.div
                className="flex gap-6 pt-6"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <motion.button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 py-5 bg-gray-700/50 hover:bg-gray-700 rounded-xl text-white text-2xl border border-white/10 transition-all flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  <X className="w-6 h-6" />
                  Batal
                </motion.button>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !formData.name || !formData.speed || !formData.laps}
                  className="flex-1 py-5 bg-gradient-to-r from-red-600 to-red-700 rounded-xl text-white text-2xl shadow-lg border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)" }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      >
                        <Save className="w-6 h-6" />
                      </motion.div>
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="w-6 h-6" />
                      Simpan Data
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          )}
        </motion.div>

        {/* Helper Text */}
        {!showSuccess && (
          <motion.p
            className="text-center text-gray-400 mt-6 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Total Score dihitung otomatis: Kecepatan × Jumlah Putaran
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
