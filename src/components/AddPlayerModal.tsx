import { useState } from 'react';
import { X, User, Trophy, Zap, Target } from 'lucide-react';

interface AddPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (playerData: {
    name: string;
    avatar: string;
    speed: number;
    laps: number;
    score: number;
  }) => Promise<void>;
}

export function AddPlayerModal({ isOpen, onClose, onSubmit }: AddPlayerModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    avatar: '',
    speed: null,
  });
  const [loading, setLoading] = useState(false);

  // Calculate laps and score based on speed
  const calculatedLaps = Math.floor((formData.speed * 1000 / 3600) / 7.854 * 60);
  const calculatedScore = formData.speed * calculatedLaps;

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert('Player name is required');
      return;
    }

    setLoading(true);
    
    try {
      await onSubmit({
        ...formData,
        laps: calculatedLaps,
        score: calculatedScore,
      });
      setFormData({
        name: '',
        avatar: '',
        speed: 0,
      });
      onClose();
    } catch (error) {
      console.error('Error adding player:', error);
      alert('Gagal menambahkan player. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)'
        }}
      />

      {/* Modal Box */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          background: 'linear-gradient(135deg, #1f1f2e 0%, #2d1f2f 50%, #3d2130 100%)',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '500px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          overflow: 'hidden'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
            zIndex: 10,
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
        >
          <X style={{ width: '20px', height: '20px', color: 'white' }} />
        </button>

        {/* Header */}
        <div style={{ padding: '40px 40px 24px', textAlign: 'center' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(to right, #ef4444, #dc2626)',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <User style={{ width: '32px', height: '32px', color: 'white' }} />
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', margin: '0 0 8px' }}>
            Add New Player
          </h2>
          <p style={{ fontSize: '14px', color: '#fca5a5', margin: 0 }}>
            Fill in the player information below
          </p>
        </div>

        {/* Form */}
        <div style={{ padding: '0 40px 40px' }}>
          {/* Name Input */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#fca5a5', marginBottom: '8px' }}>
              Player Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter player name"
              style={{
                width: '100%',
                padding: '12px 0',
                fontSize: '18px',
                color: 'white',
                background: 'transparent',
                border: 'none',
                borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.currentTarget.style.borderBottomColor = '#ef4444'}
              onBlur={(e) => e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.2)'}
            />
          </div>

          {/* Avatar URL */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#fca5a5', marginBottom: '8px' }}>
              Avatar URL <span style={{ color: '#9ca3af' }}>(optional)</span>
            </label>
            <input
              type="url"
              value={formData.avatar}
              onChange={(e) => handleChange('avatar', e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              style={{
                width: '100%',
                padding: '12px 0',
                fontSize: '18px',
                color: 'white',
                background: 'transparent',
                border: 'none',
                borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.currentTarget.style.borderBottomColor = '#ef4444'}
              onBlur={(e) => e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.2)'}
            />
            {formData.avatar && (
              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img 
                  src={formData.avatar} 
                  alt="Preview" 
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ef4444' }}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span style={{ fontSize: '14px', color: '#9ca3af' }}>Preview</span>
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '32px' }}>
            {/* Speed Input */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '14px', fontWeight: '500', color: '#fbbf24', marginBottom: '8px' }}>
                <Zap style={{ width: '16px', height: '16px' }} />
                Speed
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.speed}
                onChange={(e) => handleChange('speed', parseFloat(e.target.value) || 0)}
                placeholder="0.0"
                style={{
                  width: '100%',
                  padding: '12px 0',
                  fontSize: '18px',
                  color: 'white',
                  textAlign: 'center',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.currentTarget.style.borderBottomColor = '#fbbf24'}
                onBlur={(e) => e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.2)'}
              />
            </div>

            {/* Laps (Calculated) */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '14px', fontWeight: '500', color: '#60a5fa', marginBottom: '8px' }}>
                <Target style={{ width: '16px', height: '16px' }} />
                Laps
                <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '400' }}>(auto)</span>
              </label>
              <div
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#60a5fa',
                  textAlign: 'center',
                  borderRadius: '8px',
                  background: 'rgba(96, 165, 250, 0.1)',
                  border: '2px dashed rgba(96, 165, 250, 0.3)',
                  opacity: 0.7,
                  cursor: 'not-allowed',
                  position: 'relative'
                }}
              >
                {calculatedLaps}
              </div>
            </div>

            {/* Score (Calculated) */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '14px', fontWeight: '500', color: '#f87171', marginBottom: '8px' }}>
                <Trophy style={{ width: '16px', height: '16px' }} />
                Score
                <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '400' }}>(auto)</span>
              </label>
              <div
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#f87171',
                  textAlign: 'center',
                  borderRadius: '8px',
                  background: 'rgba(248, 113, 113, 0.1)',
                  border: '2px dashed rgba(248, 113, 113, 0.3)',
                  opacity: 0.7,
                  cursor: 'not-allowed',
                  position: 'relative'
                }}
              >
                {calculatedScore}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '18px',
              fontWeight: '600',
              color: 'white',
              background: 'linear-gradient(to right, #ef4444, #dc2626)',
              border: 'none',
              borderRadius: '9999px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
              boxShadow: '0 10px 15px -3px rgba(239, 68, 68, 0.3)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = 'scale(1)')}
          >
            {loading ? 'Adding Player...' : 'Add Player'}
          </button>

          <button
            onClick={onClose}
            disabled={loading}
            style={{
              width: '100%',
              marginTop: '12px',
              padding: '12px',
              fontSize: '16px',
              fontWeight: '500',
              color: '#fca5a5',
              background: 'transparent',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.color = 'white')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.color = '#fca5a5')}
          >
            Cancel
          </button>

          <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '14px', marginTop: '16px' }}>
            Ready to add another champion? 🏆
          </p>
        </div>
      </div>
    </div>
  );
}

// Demo Component
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [players, setPlayers] = useState<any[]>([]);

  const handleAddPlayer = async (playerData: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setPlayers(prev => [...prev, { ...playerData, id: Date.now() }]);
    console.log('Player added:', playerData);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      padding: '40px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: 'white', fontSize: '36px', marginBottom: '24px', textAlign: 'center' }}>
          Player Management Demo
        </h1>
        
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            display: 'block',
            margin: '0 auto 40px',
            padding: '16px 32px',
            fontSize: '18px',
            fontWeight: '600',
            color: 'white',
            background: 'linear-gradient(to right, #ef4444, #dc2626)',
            border: 'none',
            borderRadius: '9999px',
            cursor: 'pointer',
            boxShadow: '0 10px 15px -3px rgba(239, 68, 68, 0.3)',
          }}
        >
          Add New Player
        </button>

        {players.length > 0 && (
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.05)', 
            borderRadius: '16px', 
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h2 style={{ color: 'white', marginBottom: '16px', fontSize: '24px' }}>Players Added:</h2>
            {players.map((player, index) => (
              <div key={player.id} style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '16px',
                borderRadius: '12px',
                marginBottom: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {player.avatar ? (
                    <img src={player.avatar} alt={player.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User style={{ width: '24px', height: '24px', color: 'white' }} />
                    </div>
                  )}
                  <div>
                    <div style={{ color: 'white', fontSize: '18px', fontWeight: '600' }}>{player.name}</div>
                    <div style={{ color: '#9ca3af', fontSize: '14px' }}>
                      Speed: {player.speed} | Laps: {player.laps} | Score: {player.score}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AddPlayerModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddPlayer}
      />
    </div>
  );
}