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

// Helper function to retry fetch operations
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries = 3,
  delay = 1000
): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      return response;
    } catch (error) {
      console.error(`Fetch failed (attempt ${i + 1}/${retries}):`, error);
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
      } else {
        throw error;
      }
    }
  }
  throw new Error('Max retries exceeded');
}

export async function getLeaderboard(category: string): Promise<Player[]> {
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/leaderboard/${category}`, {
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

export async function resetDatabase(): Promise<{ success: boolean; deletedPlayers?: number; deletedPhotos?: number; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/reset-database`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${publicAnonKey}`,
      },
    });
    
    const data = await response.json();
    
    if (!data.success) {
      console.error('Error resetting database:', data.error);
      return { success: false, error: data.error };
    }
    
    return { 
      success: true, 
      deletedPlayers: data.deletedPlayers,
      deletedPhotos: data.deletedPhotos
    };
  } catch (error) {
    console.error('Error resetting database:', error);
    return { success: false, error: String(error) };
  }
}