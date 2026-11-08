import { Patient, QueueItem, ServiceSchedule, AdminProfile, SoundSettings } from '../types';

const PATIENTS_KEY = 'bidan_kanti_patients_v1';
const QUEUES_KEY = 'bidan_kanti_queues_v1';
const SCHEDULES_KEY = 'bidan_kanti_schedules_v1';
const PROFILE_KEY = 'bidan_kanti_profile_v1';
const SOUND_KEY = 'bidan_kanti_sound_v1';
const AUTH_KEY = 'bidan_kanti_auth_v1';

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'p-1',
    nik: '3201124508920001',
    nama: 'Siti Aisyah',
    noHp: '081234567890',
    alamat: 'Jl. Mawar Indah No. 14, RT 02/RW 04, Sukajadi',
    usia: 27,
    golonganDarah: 'O',
    kategori: 'Ibu Hamil',
    tanggalDaftar: '2025-01-15',
  },
  {
    id: 'p-2',
    nik: '3201126703950002',
    nama: 'Nur Haliza',
    noHp: '085712345678',
    alamat: 'Perum Permata Asri Blok B3, Cibeunying',
    usia: 29,
    golonganDarah: 'A',
    kategori: 'Akseptor KB',
    tanggalDaftar: '2025-02-10',
  },
  {
    id: 'p-3',
    nik: '3201125209930003',
    nama: 'Dewi Lestari',
    noHp: '087890123456',
    alamat: 'Kp. Babakan Tengah No. 45, Cibabat',
    usia: 31,
    golonganDarah: 'B',
    kategori: 'Umum',
    tanggalDaftar: '2025-03-01',
  },
  {
    id: 'p-4',
    nik: '3201124104970004',
    nama: 'Rina Melati',
    noHp: '082198765432',
    alamat: 'Jl. Kenanga Baru No. 8, Cimahi',
    usia: 26,
    golonganDarah: 'AB',
    kategori: 'Ibu Hamil',
    tanggalDaftar: '2025-03-12',
  },
  {
    id: 'p-5',
    nik: '3201125911960005',
    nama: 'Indah Sari',
    noHp: '089678901234',
    alamat: 'Jl. Teratai Putih No. 22, Sukamaju',
    usia: 28,
    golonganDarah: 'O',
    kategori: 'Ibu Hamil',
    tanggalDaftar: '2025-04-05',
  },
  {
    id: 'p-6',
    nik: '3201124401990006',
    nama: 'Fitri Handayani',
    noHp: '081387654321',
    alamat: 'Jl. Anggrek No. 17, Pasirkaliki',
    usia: 25,
    golonganDarah: 'B',
    kategori: 'Bayi / Balita',
    tanggalDaftar: '2025-04-18',
  },
  {
    id: 'p-7',
    nik: '3201125507910007',
    nama: 'Tri Wahyuni',
    noHp: '085234567891',
    alamat: 'Jl. Melati Hijau No. 30, Soreang',
    usia: 33,
    golonganDarah: 'A',
    kategori: 'Ibu Hamil',
    tanggalDaftar: '2025-05-02',
  },
  {
    id: 'p-8',
    nik: '3201126112940008',
    nama: 'Ratna Kusuma',
    noHp: '087765432109',
    alamat: 'Komplek Griya Sejahtera No. C5',
    usia: 30,
    golonganDarah: 'O',
    kategori: 'Akseptor KB',
    tanggalDaftar: '2025-06-11',
  },
];

const todayStr = new Date().toISOString().split('T')[0];

export const INITIAL_QUEUES: QueueItem[] = [
  // Completed earlier
  {
    id: 'q-1',
    noAntrean: 'A001',
    patientId: 'p-6',
    namaPasien: 'Fitri Handayani',
    jenisPelayanan: 'Imunisasi Bayi & Anak',
    waktuDaftar: '08:05',
    tanggal: todayStr,
    status: 'selesai',
    panggilanKe: 2,
  },
  {
    id: 'q-2',
    noAntrean: 'A002',
    patientId: 'p-7',
    namaPasien: 'Tri Wahyuni',
    jenisPelayanan: 'Pemeriksaan Kehamilan',
    waktuDaftar: '08:12',
    tanggal: todayStr,
    status: 'selesai',
    panggilanKe: 1,
  },
  {
    id: 'q-3',
    noAntrean: 'A003',
    patientId: 'p-8',
    namaPasien: 'Ratna Kusuma',
    jenisPelayanan: 'KB',
    waktuDaftar: '08:20',
    tanggal: todayStr,
    status: 'selesai',
    panggilanKe: 1,
  },
  // Currently Calling (matches reference image 2)
  {
    id: 'q-12',
    noAntrean: 'A012',
    patientId: 'p-1',
    namaPasien: 'Siti Aisyah',
    jenisPelayanan: 'Pemeriksaan Kehamilan',
    waktuDaftar: '09:20',
    tanggal: todayStr,
    status: 'dipanggil',
    panggilanKe: 1,
  },
  // Waiting queue (matches reference image 2)
  {
    id: 'q-13',
    noAntrean: 'A013',
    patientId: 'p-2',
    namaPasien: 'Nur Haliza',
    jenisPelayanan: 'KB',
    waktuDaftar: '09:21',
    tanggal: todayStr,
    status: 'menunggu',
  },
  {
    id: 'q-14',
    noAntrean: 'A014',
    patientId: 'p-3',
    namaPasien: 'Dewi Lestari',
    jenisPelayanan: 'Pemeriksaan Umum',
    waktuDaftar: '09:22',
    tanggal: todayStr,
    status: 'menunggu',
  },
  {
    id: 'q-15',
    noAntrean: 'A015',
    patientId: 'p-4',
    namaPasien: 'Rina Melati',
    jenisPelayanan: 'Konsultasi',
    waktuDaftar: '09:23',
    tanggal: todayStr,
    status: 'menunggu',
  },
  {
    id: 'q-16',
    noAntrean: 'A016',
    patientId: 'p-5',
    namaPasien: 'Indah Sari',
    jenisPelayanan: 'Pemeriksaan Kehamilan',
    waktuDaftar: '09:24',
    tanggal: todayStr,
    status: 'menunggu',
  },
  {
    id: 'q-17',
    noAntrean: 'A017',
    patientId: 'p-6',
    namaPasien: 'Fitri Handayani',
    jenisPelayanan: 'Pemeriksaan Umum',
    waktuDaftar: '09:30',
    tanggal: todayStr,
    status: 'menunggu',
  },
  {
    id: 'q-18',
    noAntrean: 'A018',
    patientId: 'p-7',
    namaPasien: 'Tri Wahyuni',
    jenisPelayanan: 'Konsultasi',
    waktuDaftar: '09:35',
    tanggal: todayStr,
    status: 'menunggu',
  },
];

export const INITIAL_SCHEDULES: ServiceSchedule[] = [
  {
    id: 'sch-1',
    hari: 'Senin - Jumat',
    jamBuka: '08:00',
    jamTutup: '12:00',
    jenisPelayanan: 'Pemeriksaan Kehamilan (ANC) & USG Dasar',
    bidanBertugas: 'Bidan Kanti, S.Tr.Keb, Bdn',
    kuota: 30,
    status: 'Buka',
  },
  {
    id: 'sch-2',
    hari: 'Senin - Sabtu',
    jamBuka: '13:00',
    jamTutup: '16:00',
    jenisPelayanan: 'Pelayanan KB (IUD, Implan, Suntik, Pil)',
    bidanBertugas: 'Bidan Kanti & Bidan Rahma, Amd.Keb',
    kuota: 25,
    status: 'Buka',
  },
  {
    id: 'sch-3',
    hari: 'Selasa & Kamis',
    jamBuka: '08:30',
    jamTutup: '11:30',
    jenisPelayanan: 'Imunisasi Bayi, Balita & Tumbuh Kembang',
    bidanBertugas: 'Bidan Rahma, Amd.Keb',
    kuota: 20,
    status: 'Buka',
  },
  {
    id: 'sch-4',
    hari: 'Senin - Minggu (24 Jam)',
    jamBuka: '00:00',
    jamTutup: '23:59',
    jenisPelayanan: 'Persalinan Normal & Penanganan Darurat Nifas',
    bidanBertugas: 'Tim Bidan Jaga 24 Jam',
    kuota: 10,
    status: 'Buka',
  },
  {
    id: 'sch-5',
    hari: 'Rabu & Sabtu',
    jamBuka: '16:30',
    jamTutup: '19:30',
    jenisPelayanan: 'Konsultasi Laktasi, Nifas & Senam Hamil',
    bidanBertugas: 'Bidan Kanti, S.Tr.Keb, Bdn',
    kuota: 15,
    status: 'Buka',
  },
];

export const INITIAL_PROFILE: AdminProfile = {
  nama: 'Bidan Kanti, S.Tr.Keb, Bdn',
  email: 'admin@bidankanti.id',
  role: 'Bidan Koordinator & Administrator',
  noHp: '0812-9876-5432',
  klinikNama: 'Klinik Bidan Kanti',
  klinikSlogan: 'Sehat Bersama, Bahagia Selamanya',
  klinikAlamat: 'Jl. Melati Sejahtera No. 12, Sukajadi, Kota Bandung 40162',
  klinikTelepon: '(022) 8765-4321 / 0812-9876-5432',
  sipb: 'SIPB. 503/4521/DPMPTSP/SIPB/VIII/2023',
};

export const INITIAL_SOUND: SoundSettings = {
  volume: 0.85,
  speechRate: 0.95,
  chimeEnabled: true,
};

// Storage Helpers
export function getStoredPatients(): Patient[] {
  try {
    const data = localStorage.getItem(PATIENTS_KEY);
    if (!data) {
      localStorage.setItem(PATIENTS_KEY, JSON.stringify(INITIAL_PATIENTS));
      return INITIAL_PATIENTS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_PATIENTS;
  }
}

export function savePatients(patients: Patient[]): void {
  localStorage.setItem(PATIENTS_KEY, JSON.stringify(patients));
}

export function getStoredQueues(): QueueItem[] {
  try {
    const data = localStorage.getItem(QUEUES_KEY);
    if (!data) {
      localStorage.setItem(QUEUES_KEY, JSON.stringify(INITIAL_QUEUES));
      return INITIAL_QUEUES;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_QUEUES;
  }
}

export function saveQueues(queues: QueueItem[]): void {
  localStorage.setItem(QUEUES_KEY, JSON.stringify(queues));
}

export function getStoredSchedules(): ServiceSchedule[] {
  try {
    const data = localStorage.getItem(SCHEDULES_KEY);
    if (!data) {
      localStorage.setItem(SCHEDULES_KEY, JSON.stringify(INITIAL_SCHEDULES));
      return INITIAL_SCHEDULES;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_SCHEDULES;
  }
}

export function saveSchedules(schedules: ServiceSchedule[]): void {
  localStorage.setItem(SCHEDULES_KEY, JSON.stringify(schedules));
}

export function getStoredProfile(): AdminProfile {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    if (!data) {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(INITIAL_PROFILE));
      return INITIAL_PROFILE;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_PROFILE;
  }
}

export function saveProfile(profile: AdminProfile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function getStoredSound(): SoundSettings {
  try {
    const data = localStorage.getItem(SOUND_KEY);
    if (!data) {
      localStorage.setItem(SOUND_KEY, JSON.stringify(INITIAL_SOUND));
      return INITIAL_SOUND;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_SOUND;
  }
}

export function saveSound(sound: SoundSettings): void {
  localStorage.setItem(SOUND_KEY, JSON.stringify(sound));
}

export function getAuthSession(): { isAuthenticated: boolean; user: string | null } {
  return { isAuthenticated: false, user: null };
}

export function setAuthSession(isAuthenticated: boolean, user: string | null): void {
  localStorage.setItem(AUTH_KEY, JSON.stringify({ isAuthenticated, user, loginAt: new Date().toISOString() }));
}

export function resetAllDataToDefault(): void {
  localStorage.setItem(PATIENTS_KEY, JSON.stringify(INITIAL_PATIENTS));
  localStorage.setItem(QUEUES_KEY, JSON.stringify(INITIAL_QUEUES));
  localStorage.setItem(SCHEDULES_KEY, JSON.stringify(INITIAL_SCHEDULES));
  localStorage.setItem(PROFILE_KEY, JSON.stringify(INITIAL_PROFILE));
  localStorage.setItem(SOUND_KEY, JSON.stringify(INITIAL_SOUND));
}
