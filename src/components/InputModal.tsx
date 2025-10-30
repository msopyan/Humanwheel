import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { User, Zap, Navigation, Trophy, X, Camera, Upload } from 'lucide-react';
import { addOrUpdatePlayer, uploadPhoto } from '../utils/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';

interface InputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function InputModal({ isOpen, onClose, onSuccess }: InputModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    speed: '',
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate Laps and Score based on Speed using the formula
  // floor((x * 1000 / 3600) / 7.854 * 60)
  const calculateLapsAndScore = (speed: number) => {
    if (!speed || speed <= 0) return { laps: 0, score: 0 };
    
    const laps = Math.floor((speed * 1000 / 3600) / 7.854 * 60);
    const score = Math.floor(laps * speed);
    
    return { laps, score };
  };

  const speed = parseFloat(formData.speed) || 0;
  const { laps, score } = calculateLapsAndScore(speed);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Mohon pilih file gambar');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB');
        return;
      }

      setPhotoFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.speed) {
      return;
    }

    setIsSubmitting(true);

    try {
      const speedValue = parseFloat(formData.speed);
      const { laps: calculatedLaps, score: calculatedScore } = calculateLapsAndScore(speedValue);
      
      let avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`;

      // Upload photo if selected
      if (photoFile) {
        const uploadedUrl = await uploadPhoto(photoFile);
        if (uploadedUrl) {
          avatarUrl = uploadedUrl;
        }
      }

      const player = {
        id: `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: formData.name,
        avatar: avatarUrl,
        speed: speedValue,
        laps: calculatedLaps,
        score: calculatedScore,
      };

      const success = await addOrUpdatePlayer(player, 'team');

      if (success) {
        setFormData({ name: '', speed: '' });
        setPhotoFile(null);
        setPhotoPreview('');
        onSuccess();
        // Don't close immediately - let parent handle it
      } else {
        alert('Gagal menyimpan data. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Terjadi kesalahan saat menyimpan data.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ name: '', speed: '' });
      setPhotoFile(null);
      setPhotoPreview('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 max-w-md">
        {/* Close button */}
        <motion.button
          onClick={handleClose}
          className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-5 h-5 text-white" />
        </motion.button>

        <DialogHeader>
          <div className="flex flex-col items-center gap-4 pt-2">
            {/* Avatar Icon */}
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              <User className="w-8 h-8 text-white" />
            </motion.div>

            <DialogTitle className="text-white text-2xl text-center">
              Add New Player
            </DialogTitle>
            <DialogDescription className="text-red-400 text-sm -mt-2 text-center">
              Fill in the player information below
            </DialogDescription>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          {/* Photo Upload */}
          <div className="flex justify-center">
            <div className="relative">
              <motion.div
                className="w-24 h-24 rounded-full overflow-hidden border-2 border-red-500/30 bg-slate-900/50 flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.05, borderColor: 'rgba(239, 68, 68, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fileInputRef.current?.click()}
              >
                {photoPreview ? (
                  <img 
                    src={photoPreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <Camera className="w-8 h-8 text-red-400" />
                    <span className="text-slate-400 text-xs">Photo</span>
                  </div>
                )}
              </motion.div>
              
              <motion.button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center border-2 border-slate-800 shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Upload className="w-4 h-4 text-white" />
              </motion.button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
          </div>

          <p className="text-center text-slate-400 text-xs -mt-2">
            {photoPreview ? 'Click to change photo' : 'Optional - Default avatar will be used'}
          </p>

          {/* Player Name */}
          <div>
            <label className="text-red-400 text-sm mb-2 block">
              Player Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter player name"
              required
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-red-500 focus:outline-none transition-all"
            />
          </div>

          {/* Speed, Laps, Score Row */}
          <div className="grid grid-cols-3 gap-3">
            {/* Speed Input */}
            <div>
              <label className="text-yellow-400 text-xs mb-2 block flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Speed
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.speed}
                onChange={(e) => handleChange('speed', e.target.value)}
                placeholder="1.1"
                required
                className="w-full px-3 py-2.5 bg-slate-900/50 border border-yellow-500/30 rounded-lg text-white text-center placeholder-slate-500 focus:border-yellow-500 focus:outline-none transition-all"
              />
            </div>

            {/* Laps (Auto) */}
            <div>
              <label className="text-blue-400 text-xs mb-2 block flex items-center gap-1">
                <Navigation className="w-3 h-3" />
                Laps <span className="text-slate-500 text-xs">(auto)</span>
              </label>
              <div className="w-full px-3 py-2.5 bg-slate-900/80 border border-blue-500/30 rounded-lg text-blue-400 text-center">
                {laps}
              </div>
            </div>

            {/* Score (Auto) */}
            <div>
              <label className="text-red-400 text-xs mb-2 block flex items-center gap-1">
                <Trophy className="w-3 h-3" />
                Score <span className="text-slate-500 text-xs">(auto)</span>
              </label>
              <div className="w-full px-3 py-2.5 bg-slate-900/80 border border-red-500/30 rounded-lg text-red-400 text-center">
                {score.toFixed(1)}
              </div>
            </div>
          </div>

          {/* Add Player Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting || !formData.name || !formData.speed}
            className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl text-white text-center disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-red-500/20"
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            {isSubmitting ? 'Adding...' : 'Add Player'}
          </motion.button>

          {/* Cancel Button */}
          <motion.button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="w-full py-3 bg-transparent hover:bg-white/5 rounded-lg text-slate-400 hover:text-white text-center transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>

          {/* Bottom Text */}
          <p className="text-center text-slate-400 text-sm pt-2">
            Ready to add another champion! 🏆
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}