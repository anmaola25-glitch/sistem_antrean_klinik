import React, { useState } from 'react';
import {
  Settings,
  Building2,
  User,
  Lock,
  Volume2,
  Save,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { AdminProfile, SoundSettings } from '../types';
import { announceQueue, playClinicChime } from '../services/audioSpeech';

interface PengaturanViewProps {
  profile: AdminProfile;
  sound: SoundSettings;
  onSaveProfile: (profile: AdminProfile) => void;
  onSaveSound: (sound: SoundSettings) => void;
  onResetData: () => void;
}

export const PengaturanView: React.FC<PengaturanViewProps> = ({
  profile,
  sound,
  onSaveProfile,
  onSaveSound,
  onResetData,
}) => {
  const [profileData, setProfileData] = useState<AdminProfile>({ ...profile });
  const [soundData, setSoundData] = useState<SoundSettings>({ ...sound });

  // Password state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(profileData);
    onSaveSound(soundData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (newPassword.length < 6) {
      setPasswordError('Password baru minimal 6 karakter.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Konfirmasi password tidak cocok.');
      return;
    }

    setPasswordSuccess(true);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  const handleTestAudio = () => {
    announceQueue('A012', 'Siti Aisyah', 'Pemeriksaan Kehamilan', {
      playChime: soundData.chimeEnabled,
      speechRate: soundData.speechRate,
      volume: soundData.volume,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#E5F7F8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-800">
            <Settings className="w-6 h-6 text-[#20A6AE]" />
            <h2 className="text-xl font-bold">Pengaturan Sistem & Profil Klinik</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Konfigurasi profil klinik, akun admin pengelola, dan preferensi audio antrean
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Pengaturan Berhasil Disimpan!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Profil Klinik & Akun Admin (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <form onSubmit={handleSaveAll} className="space-y-6">
            
            {/* Profil Klinik */}
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#E5F7F8]">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-800 font-bold text-sm">
                <Building2 className="w-4 h-4 text-[#20A6AE]" />
                <span>Profil Klinik Bidan Kanti</span>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nama Klinik
                  </label>
                  <input
                    type="text"
                    value={profileData.klinikNama}
                    onChange={(e) =>
                      setProfileData({ ...profileData, klinikNama: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Slogan Klinik
                  </label>
                  <input
                    type="text"
                    value={profileData.klinikSlogan}
                    onChange={(e) =>
                      setProfileData({ ...profileData, klinikSlogan: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Surat Izin Praktik Bidan (SIPB)
                  </label>
                  <input
                    type="text"
                    value={profileData.sipb}
                    onChange={(e) =>
                      setProfileData({ ...profileData, sipb: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Alamat Lengkap Klinik
                  </label>
                  <textarea
                    rows={2}
                    value={profileData.klinikAlamat}
                    onChange={(e) =>
                      setProfileData({ ...profileData, klinikAlamat: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nomor Telepon / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={profileData.klinikTelepon}
                    onChange={(e) =>
                      setProfileData({ ...profileData, klinikTelepon: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Informasi Admin */}
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#E5F7F8]">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-800 font-bold text-sm">
                <User className="w-4 h-4 text-[#20A6AE]" />
                <span>Informasi Admin Pengelola</span>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nama Penanggung Jawab
                  </label>
                  <input
                    type="text"
                    value={profileData.nama}
                    onChange={(e) =>
                      setProfileData({ ...profileData, nama: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Peran / Jabatan
                  </label>
                  <input
                    type="text"
                    value={profileData.role}
                    onChange={(e) =>
                      setProfileData({ ...profileData, role: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Email Resmi
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nomor Handphone Admin
                  </label>
                  <input
                    type="text"
                    value={profileData.noHp}
                    onChange={(e) =>
                      setProfileData({ ...profileData, noHp: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="py-2.5 px-6 rounded-2xl bg-gradient-to-r from-[#20A6AE] to-[#188F96] hover:from-[#188F96] hover:to-[#127278] text-white font-bold text-xs shadow-md shadow-teal-500/20 flex items-center gap-2 transition"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan Profil</span>
              </button>
            </div>
          </form>

          {/* Change Password Card */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#E5F7F8]">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-800 font-bold text-sm">
              <Lock className="w-4 h-4 text-[#20A6AE]" />
              <span>Ubah Password Akun Admin</span>
            </div>

            {passwordSuccess && (
              <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl font-medium">
                Password berhasil diperbarui! Silakan gunakan password baru saat login berikutnya.
              </div>
            )}

            {passwordError && (
              <div className="mt-3 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                {passwordError}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Password Saat Ini
                </label>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Password Baru
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Konfirmasi Password Baru
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi password baru"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition"
                >
                  Perbarui Password
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Audio Settings & System Reset (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Audio Chime Settings */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#E5F7F8]">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-800 font-bold text-sm">
              <Volume2 className="w-4 h-4 text-[#20A6AE]" />
              <span>Suara Panggilan Antrean</span>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <label className="flex items-center justify-between cursor-pointer select-none">
                <span className="font-semibold text-slate-700">Lonceng Chime (Ding-Dong)</span>
                <input
                  type="checkbox"
                  checked={soundData.chimeEnabled}
                  onChange={(e) =>
                    setSoundData({ ...soundData, chimeEnabled: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-[#20A6AE] accent-[#20A6AE]"
                />
              </label>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Volume Audio</span>
                  <span>{Math.round(soundData.volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={soundData.volume}
                  onChange={(e) =>
                    setSoundData({ ...soundData, volume: parseFloat(e.target.value) })
                  }
                  className="w-full accent-[#20A6AE] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Kecepatan Bicara</span>
                  <span>{soundData.speechRate}x</span>
                </div>
                <input
                  type="range"
                  min="0.7"
                  max="1.2"
                  step="0.05"
                  value={soundData.speechRate}
                  onChange={(e) =>
                    setSoundData({ ...soundData, speechRate: parseFloat(e.target.value) })
                  }
                  className="w-full accent-[#20A6AE] cursor-pointer"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleTestAudio}
                  className="w-full py-2.5 rounded-xl bg-[#EBF9FA] hover:bg-[#DDF7F7] text-[#087D86] font-bold text-xs border border-teal-200 flex items-center justify-center gap-2 transition"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Uji Coba Panggilan Suara</span>
                </button>
              </div>
            </div>
          </div>

          {/* Reset Demo Data */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-rose-100">
            <h4 className="font-bold text-sm text-slate-800">
              Reset Data Awal Demo
            </h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Kembalikan antrean, pasien, dan jadwal ke pengaturan awal sesuai tangkapan layar referensi.
            </p>
            <button
              onClick={() => {
                if (window.confirm('Apakah Anda ingin memulihkan semua data ke pengaturan awal?')) {
                  onResetData();
                }
              }}
              className="mt-4 w-full py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs border border-rose-200 flex items-center justify-center gap-2 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Pulihkan Data Bawaan</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
