export type QueueStatus = 'dipanggil' | 'menunggu' | 'selesai' | 'dilewati';

export type ServiceType = 
  | 'Pemeriksaan Kehamilan' 
  | 'KB' 
  | 'Pemeriksaan Umum' 
  | 'Konsultasi' 
  | 'Imunisasi Bayi & Anak' 
  | 'Persalinan 24 Jam' 
  | 'Perawatan Nifas';

export interface Patient {
  id: string;
  nik: string;
  nama: string;
  noHp: string;
  alamat: string;
  usia: number;
  golonganDarah: string;
  kategori: 'Ibu Hamil' | 'Ibu Bersalin' | 'Bayi / Balita' | 'Akseptor KB' | 'Umum';
  tanggalDaftar: string;
}

export interface QueueItem {
  id: string;
  noAntrean: string;
  patientId: string;
  namaPasien: string;
  jenisPelayanan: ServiceType;
  waktuDaftar: string;
  tanggal: string;
  status: QueueStatus;
  catatan?: string;
  panggilanKe?: number;
}

export interface ServiceSchedule {
  id: string;
  hari: string;
  jamBuka: string;
  jamTutup: string;
  jenisPelayanan: string;
  bidanBertugas: string;
  kuota: number;
  status: 'Buka' | 'Istirahat' | 'Tutup';
}

export interface AdminProfile {
  nama: string;
  email: string;
  role: string;
  noHp: string;
  klinikNama: string;
  klinikSlogan: string;
  klinikAlamat: string;
  klinikTelepon: string;
  sipb: string;
}

export interface SoundSettings {
  volume: number;
  speechRate: number;
  chimeEnabled: boolean;
}
