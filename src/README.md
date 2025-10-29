# Lezza HumanWheel Leaderboard

Aplikasi leaderboard interaktif untuk Lezza HumanWheel dengan animasi Motion, desain responsif untuk TV 32 inch, dan integrasi database Supabase untuk penyimpanan data real-time.

## Fitur Utama

### 1. **Leaderboard dengan Sistem Tab**
- Tiga kategori: Team, Local, dan Global
- Menampilkan ranking pemain dengan data lengkap
- Auto-refresh setiap 10 detik untuk real-time updates

### 2. **Podium View**
- Menampilkan top 3 pemain dengan desain podium
- Animasi laurel wreath dan crown untuk pemenang
- Statistik detail: Kecepatan (KM/J), Jumlah Putaran, Total Score

### 3. **Congratulation Screen**
- Layar khusus untuk merayakan pemenang
- Animasi confetti dan efek visual menarik
- Tombol untuk kembali ke home atau share

### 4. **Integrasi Supabase**
- Penyimpanan data persisten menggunakan KV Store
- Real-time updates otomatis
- API endpoints untuk CRUD operations

## Komponen

- **App.tsx** - Komponen utama dengan routing antar view
- **LeaderboardList** - Menampilkan daftar pemain dengan ranking
- **LeaderboardPodium** - Menampilkan top 3 di podium
- **TabSelector** - Tab selector untuk kategori
- **CongratulationScreen** - Layar congratulation untuk pemenang

## Ukuran Display

Aplikasi ini dioptimalkan untuk **TV 32 inch** dengan resolusi landscape:
- Font size lebih besar untuk keterbacaan dari jarak jauh
- Padding dan spacing yang lebih luas
- Layout desktop-first dengan max-width 7xl (1280px)

## API Endpoints

### GET `/make-server-ca1abb79/leaderboard/:category`
Mendapatkan leaderboard berdasarkan kategori (team/local/global)

### POST `/make-server-ca1abb79/player`
Menambah atau update data pemain
```json
{
  "id": "string",
  "name": "string",
  "avatar": "string (url)",
  "speed": "number",
  "laps": "number",
  "score": "number",
  "category": "string (team/local/global)"
}
```

### DELETE `/make-server-ca1abb79/player/:category/:id`
Menghapus pemain dari leaderboard

### POST `/make-server-ca1abb79/seed`
Mengisi database dengan data contoh (untuk testing)

## Cara Menggunakan

1. **Pertama kali**:
   - Klik tombol Database (icon database di kiri atas) untuk mengisi data contoh
   - Atau gunakan endpoint `/seed` untuk mengisi data via API

2. **Navigasi**:
   - Gunakan tab (Team/Local/Global) untuk melihat kategori berbeda
   - Klik "View Podium" untuk melihat top 3 di podium
   - Klik "Celebrate" untuk melihat congratulation screen

3. **Real-time Updates**:
   - Data akan auto-refresh setiap 10 detik
   - Klik tombol Refresh untuk manual refresh

## Field Data

- **Nama**: Nama pemain
- **Kecepatan (KM/J)**: Kecepatan rata-rata dalam Kilometer per Jam
- **Jumlah Putaran**: Total putaran yang diselesaikan
- **Total Score**: Skor akhir pemain

## Teknologi

- **React** - UI framework
- **Motion (Framer Motion)** - Animasi interaktif
- **Tailwind CSS** - Styling
- **Supabase** - Backend database dan edge functions
- **Lucide React** - Icon library

## Color Scheme

Gradient red-gray matching dengan logo Lezza:
- Primary: Red (#ef4444, #dc2626)
- Secondary: Gray (#6b7280, #374151)
- Accent: Orange (#f97316) untuk highlights

## Animasi

Semua komponen menggunakan Motion untuk:
- Hover effects
- Tap/click feedback
- Page transitions
- Entrance animations
- Continuous animations (crown floating, confetti)
