import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-ca1abb79`;

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

export async function getLeaderboard(category: string): Promise<Player[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/leaderboard/${category}`, {
      headers: {
        Authorization: `Bearer ${publicAnonKey}`,
      },
    });
    
    const data = await response.json();
    
    if (!data.success) {
      console.error('Error fetching leaderboard:', data.error);
      return [];
    }
    
    return data.players || [];
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
}

export async function addOrUpdatePlayer(player: Player, category: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/player`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        ...player,
        category,
      }),
    });
    
    const data = await response.json();
    
    if (!data.success) {
      console.error('Error adding/updating player:', data.error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error adding/updating player:', error);
    return false;
  }
}

// Function baru untuk menambahkan player baru
export async function addNewPlayer(
  name: string,
  category: string,
  avatar?: string,
  speed?: number,
  laps?: number,
  score?: number
): Promise<{ success: boolean; player?: Player }> {
  try {
    // Generate ID unik untuk player baru
    const id = `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const response = await fetch(`${API_BASE_URL}/player`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        id,
        name,
        avatar: avatar || '',
        speed: speed || 0,
        laps: laps || 0,
        score: score || 0,
        category,
      }),
    });
    
    const data = await response.json();
    
    if (!data.success) {
      console.error('Error adding new player:', data.error);
      return { success: false };
    }
    
    return { success: true, player: data.player };
  } catch (error) {
    console.error('Error adding new player:', error);
    return { success: false };
  }
}

export async function deletePlayer(id: string, category: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/player/${category}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${publicAnonKey}`,
      },
    });
    
    const data = await response.json();
    
    if (!data.success) {
      console.error('Error deleting player:', data.error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting player:', error);
    return false;
  }
}

export async function seedData(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/seed`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${publicAnonKey}`,
      },
    });
    
    const data = await response.json();
    
    if (!data.success) {
      console.error('Error seeding data:', data.error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error seeding data:', error);
    return false;
  }
<<<<<<< HEAD
}
=======
}

export async function uploadPhoto(file: File): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('photo', file);
    
    const response = await fetch(`${API_BASE_URL}/upload-photo`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${publicAnonKey}`,
      },
      body: formData,
    });
    
    const data = await response.json();
    
    if (!data.success) {
      console.error('Error uploading photo:', data.error);
      return null;
    }
    
    return data.url;
  } catch (error) {
    console.error('Error uploading photo:', error);
    return null;
  }
}
>>>>>>> main
