// // import { Hono } from 'npm:hono';
// // import { cors } from 'npm:hono/cors';
// // import { logger } from 'npm:hono/logger';
// // import { createClient } from 'npm:@supabase/supabase-js@2.39.3';
// // import * as kv from './kv_store.tsx';

// // const app = new Hono();

// // app.use('*', cors());
// // app.use('*', logger(console.log));

// // const supabase = createClient(
// //   Deno.env.get('SUPABASE_URL') || '',
// //   Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
// // );

// Initialize storage bucket on startup
const BUCKET_NAME = 'make-ca1abb79-player-photos';

async function initializeBucket() {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);
    
    if (!bucketExists) {
      console.log(`Creating bucket: ${BUCKET_NAME}`);
      const { error } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: false,
        fileSizeLimit: 5242880, // 5MB
      });
      
      if (error) {
        console.error('Error creating bucket:', error);
      } else {
        console.log('Bucket created successfully');
      }
    } else {
      console.log('Bucket already exists');
    }
  } catch (error) {
    console.error('Error initializing bucket:', error);
  }
}

// Initialize on startup
initializeBucket();

// Helper function to retry database operations
async function retryOperation<T>(
  operation: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await operation();
    } catch (error) {
      console.log(`Operation failed (attempt ${i + 1}/${retries}):`, error);
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

// Get leaderboard by category
app.get('/make-server-ca1abb79/leaderboard/:category', async (c) => {
  try {
    const category = c.req.param('category');
    
    // Get all players for this category with retry logic
    const players = await retryOperation(async () => {
      return await kv.getByPrefix(`leaderboard_${category.toLowerCase()}_`);
    });
    
    console.log(`Found ${players?.length || 0} players for category ${category}`);
    
    // Filter out invalid items and sort by score descending
    const sortedPlayers = (players || [])
      .filter((player: any) => player && player.id)
      .sort((a: any, b: any) => (b.score || 0) - (a.score || 0))
      .map((player: any, index: number) => ({
        id: player.id || '',
        name: player.name || 'Unknown',
        avatar: player.avatar || '',
        speed: typeof player.speed === 'number' ? player.speed : 0,
        laps: typeof player.laps === 'number' ? player.laps : 0,
        score: typeof player.score === 'number' ? player.score : 0,
        rank: index + 1,
        category: player.category,
        timestamp: player.timestamp,
      }));
    
    console.log(`Returning ${sortedPlayers.length} sorted players`);
    return c.json({ success: true, players: sortedPlayers });
  } catch (error) {
    console.log(`Error getting leaderboard: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// async function initializeBucket() {
//   try {
//     const { data: buckets } = await supabase.storage.listBuckets();
//     const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);
    
//     if (!bucketExists) {
//       console.log(`Creating bucket: ${BUCKET_NAME}`);
//       const { error } = await supabase.storage.createBucket(BUCKET_NAME, {
//         public: false,
//         fileSizeLimit: 5242880, // 5MB
//       });
      
//       if (error) {
//         console.error('Error creating bucket:', error);
//       } else {
//         console.log('Bucket created successfully');
//       }
//     } else {
//       console.log('Bucket already exists');
//     }
//   } catch (error) {
//     console.error('Error initializing bucket:', error);
//   }
// }

// // Initialize on startup
// initializeBucket();

// Get all players across all categories
app.get('/make-server-ca1abb79/players/all', async (c) => {
  try {
    // Note: getByPrefix already returns array of values directly
    const players = await kv.getByPrefix('leaderboard_');
    
//     // Get all players for this category
//     // Note: getByPrefix already returns array of values directly
//     const players = await kv.getByPrefix(`leaderboard_${category.toLowerCase()}_`);
    
//     console.log(`Found ${players?.length || 0} players for category ${category}`);
    
//     // Filter out invalid items and sort by score descending
//     const sortedPlayers = (players || [])
//       .filter((player: any) => player && player.id)
//       .sort((a: any, b: any) => (b.score || 0) - (a.score || 0))
//       .map((player: any, index: number) => ({
//         id: player.id || '',
//         name: player.name || 'Unknown',
//         avatar: player.avatar || '',
//         speed: typeof player.speed === 'number' ? player.speed : 0,
//         laps: typeof player.laps === 'number' ? player.laps : 0,
//         score: typeof player.score === 'number' ? player.score : 0,
//         rank: index + 1,
//         category: player.category,
//         timestamp: player.timestamp,
//       }));
    
//     console.log(`Returning ${sortedPlayers.length} sorted players`);
//     return c.json({ success: true, players: sortedPlayers });
//   } catch (error) {
//     console.log(`Error getting leaderboard: ${error}`);
//     return c.json({ success: false, error: String(error) }, 500);
//   }
// });

// // // Add or update player
// // app.post('/make-server-ca1abb79/player', async (c) => {
// //   try {
// //     const body = await c.req.json();
// //     const { id, name, avatar, speed, laps, score, category } = body;
    
// //     if (!id || !name || !category) {
// //       return c.json({ success: false, error: 'Missing required fields: id, name, category' }, 400);
// //     }
    
// //     const key = `leaderboard_${category.toLowerCase()}_${id}`;
// //     const player = {
// //       id,
// //       name,
// //       avatar: avatar || '',
// //       speed: typeof speed === 'number' ? speed : parseFloat(speed) || 0,
// //       laps: typeof laps === 'number' ? laps : parseInt(laps) || 0,
// //       score: typeof score === 'number' ? score : parseInt(score) || 0,
// //       category: category.toLowerCase(),
// //       timestamp: new Date().toISOString(),
// //     };
    
// //     await kv.set(key, player);
    
// //     return c.json({ success: true, player });
// //   } catch (error) {
// //     console.log(`Error adding/updating player: ${error}`);
// //     return c.json({ success: false, error: String(error) }, 500);
// //   }
// // });

// Upload photo
app.post('/make-server-ca1abb79/upload-photo', async (c) => {
  try {
    const formData = await c.req.formData();
    const photo = formData.get('photo') as File;
    
    if (!photo) {
      return c.json({ success: false, error: 'No photo provided' }, 400);
    }
    
    // Validate file type
    if (!photo.type.startsWith('image/')) {
      return c.json({ success: false, error: 'File must be an image' }, 400);
    }
    
    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 15);
    const fileExt = photo.name.split('.').pop() || 'jpg';
    const fileName = `${timestamp}_${randomStr}.${fileExt}`;
    
    // Convert File to ArrayBuffer then to Uint8Array
    const arrayBuffer = await photo.arrayBuffer();
    const fileData = new Uint8Array(arrayBuffer);
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, fileData, {
        contentType: photo.type,
        cacheControl: '3600',
        upsert: false,
      });
    
    if (error) {
      console.error('Error uploading to storage:', error);
      return c.json({ success: false, error: error.message }, 500);
    }
    
    // Generate signed URL (valid for 1 year)
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(fileName, 31536000); // 1 year in seconds
    
    if (signedUrlError) {
      console.error('Error creating signed URL:', signedUrlError);
      return c.json({ success: false, error: signedUrlError.message }, 500);
    }
    
    console.log(`Photo uploaded successfully: ${fileName}`);
    
    return c.json({ 
      success: true, 
      url: signedUrlData.signedUrl,
      fileName: fileName
    });
  } catch (error) {
    console.error('Error uploading photo:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Reset database (delete all players and photos)
app.post('/make-server-ca1abb79/reset-database', async (c) => {
  try {
    console.log('Starting database reset...');
    
    // 1. Delete all players from KV store
    const players = await kv.getByPrefix('leaderboard_');
    console.log(`Found ${players?.length || 0} players to delete`);
    
    // Delete each player entry
    const deleteKeys: string[] = [];
    for (const player of (players || [])) {
      if (player && player.id && player.category) {
        const key = `leaderboard_${player.category.toLowerCase()}_${player.id}`;
        deleteKeys.push(key);
      }
    }
    
    if (deleteKeys.length > 0) {
      await kv.mdel(deleteKeys);
      console.log(`Deleted ${deleteKeys.length} player entries from KV store`);
    }
    
    // 2. Delete all photos from storage bucket
    const { data: files, error: listError } = await supabase.storage
      .from(BUCKET_NAME)
      .list();
    
    if (listError) {
      console.error('Error listing files:', listError);
    } else if (files && files.length > 0) {
      const filePaths = files.map(file => file.name);
      console.log(`Found ${filePaths.length} files to delete from storage`);
      
      const { error: deleteError } = await supabase.storage
        .from(BUCKET_NAME)
        .remove(filePaths);
      
      if (deleteError) {
        console.error('Error deleting files from storage:', deleteError);
      } else {
        console.log(`Deleted ${filePaths.length} files from storage`);
      }
    }
    
    console.log('Database reset completed successfully');
    return c.json({ 
      success: true, 
      message: 'Database reset successfully',
      deletedPlayers: deleteKeys.length,
      deletedPhotos: files?.length || 0
    });
  } catch (error) {
    console.error('Error resetting database:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);
