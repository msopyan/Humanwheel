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

// // Initialize storage bucket on startup
// const BUCKET_NAME = 'make-ca1abb79-player-photos';

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

// // Get leaderboard by category
// app.get('/make-server-ca1abb79/leaderboard/:category', async (c) => {
//   try {
//     const category = c.req.param('category');
    
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

// // // Delete player
// // app.delete('/make-server-ca1abb79/player/:category/:id', async (c) => {
// //   try {
// //     const category = c.req.param('category');
// //     const id = c.req.param('id');
// //     const key = `leaderboard_${category.toLowerCase()}_${id}`;
    
// //     await kv.del(key);
    
// //     return c.json({ success: true });
// //   } catch (error) {
// //     console.log(`Error deleting player: ${error}`);
// //     return c.json({ success: false, error: String(error) }, 500);
// //   }
// // });

// // Get all players across all categories
// app.get('/make-server-ca1abb79/players/all', async (c) => {
//   try {
//     // Note: getByPrefix already returns array of values directly
//     const players = await kv.getByPrefix('leaderboard_');
    
// //     return c.json({ success: true, players });
// //   } catch (error) {
// //     console.log(`Error getting all players: ${error}`);
// //     return c.json({ success: false, error: String(error) }, 500);
// //   }
// // });

// // // Seed initial data (for testing)
// // app.post('/make-server-ca1abb79/seed', async (c) => {
// //   try {
// //     const mockUsers = [
// //       {
// //         id: '1',
// //         name: 'Jonathan',
// //         avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjExNTA2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
// //         speed: 18.4,
// //         laps: 52,
// //         score: 957,
// //       },
// //       {
// //         id: '2',
// //         name: 'Martin',
// //         avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NjExNTMxMzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
// //         speed: 17.9,
// //         laps: 49,
// //         score: 877,
// //       },
// //       {
// //         id: '3',
// //         name: 'Amelia',
// //         avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBmYWNlfGVufDF8fHx8MTc2MTE4Mjk1OXww&ixlib=rb-4.1.0&q=80&w=1080',
// //         speed: 17.2,
// //         laps: 46,
// //         score: 791,
// //       },
// //       {
// //         id: '4',
// //         name: 'Emilia',
// //         avatar: 'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTEzNTg4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
// //         speed: 16.8,
// //         laps: 44,
// //         score: 739,
// //       },
// //       {
// //         id: '5',
// //         name: 'Olivia',
// //         avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjExMzAyMTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
// //         speed: 16.4,
// //         laps: 43,
// //         score: 668,
// //       },
// //       {
// //         id: '6',
// //         name: 'Liam',
// //         avatar: 'https://images.unsplash.com/photo-1724435811349-32d27f4d5806?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBhdmF0YXJ8ZW58MXx8fHwxNzYxMTYxNzAzfDA&ixlib=rb-4.1.0&q=80&w=1080',
// //         speed: 15.9,
// //         laps: 42,
// //         score: 608,
// //       },
// //       {
// //         id: '7',
// //         name: 'Noah',
// //         avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjExNTA2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
// //         speed: 15.2,
// //         laps: 38,
// //         score: 566,
// //       },
// //     ];
    
// //     const categories = ['team', 'local', 'global'];
    
// //     for (const category of categories) {
// //       for (const user of mockUsers) {
// //         const key = `leaderboard_${category}_${user.id}`;
// //         const player = {
// //           ...user,
// //           category,
// //           timestamp: new Date().toISOString(),
// //         };
// //         await kv.set(key, player);
// //       }
// //     }
    
// //     return c.json({ success: true, message: 'Data seeded successfully' });
// //   } catch (error) {
// //     console.log(`Error seeding data: ${error}`);
// //     return c.json({ success: false, error: String(error) }, 500);
// //   }
// // });

// // Upload photo
// app.post('/make-server-ca1abb79/upload-photo', async (c) => {
//   try {
//     const formData = await c.req.formData();
//     const photo = formData.get('photo') as File;
    
//     if (!photo) {
//       return c.json({ success: false, error: 'No photo provided' }, 400);
//     }
    
//     // Validate file type
//     if (!photo.type.startsWith('image/')) {
//       return c.json({ success: false, error: 'File must be an image' }, 400);
//     }
    
//     // Generate unique filename
//     const timestamp = Date.now();
//     const randomStr = Math.random().toString(36).substring(2, 15);
//     const fileExt = photo.name.split('.').pop() || 'jpg';
//     const fileName = `${timestamp}_${randomStr}.${fileExt}`;
    
//     // Convert File to ArrayBuffer then to Uint8Array
//     const arrayBuffer = await photo.arrayBuffer();
//     const fileData = new Uint8Array(arrayBuffer);
    
//     // Upload to Supabase Storage
//     const { data, error } = await supabase.storage
//       .from(BUCKET_NAME)
//       .upload(fileName, fileData, {
//         contentType: photo.type,
//         cacheControl: '3600',
//         upsert: false,
//       });
    
//     if (error) {
//       console.error('Error uploading to storage:', error);
//       return c.json({ success: false, error: error.message }, 500);
//     }
    
//     // Generate signed URL (valid for 1 year)
//     const { data: signedUrlData, error: signedUrlError } = await supabase.storage
//       .from(BUCKET_NAME)
//       .createSignedUrl(fileName, 31536000); // 1 year in seconds
    
//     if (signedUrlError) {
//       console.error('Error creating signed URL:', signedUrlError);
//       return c.json({ success: false, error: signedUrlError.message }, 500);
//     }
    
//     console.log(`Photo uploaded successfully: ${fileName}`);
    
//     return c.json({ 
//       success: true, 
//       url: signedUrlData.signedUrl,
//       fileName: fileName
//     });
//   } catch (error) {
//     console.error('Error uploading photo:', error);
//     return c.json({ success: false, error: String(error) }, 500);
//   }
// });

// Deno.serve(app.fetch);
