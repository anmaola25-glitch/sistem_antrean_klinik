import React, { useState, useEffect } from 'react';
import { Volume2, X, Users, Stethoscope, Maximize2, Minimize2 } from 'lucide-react';
import { QueueItem, SoundSettings, AdminProfile } from '../types';
import { ClinicLogo, EcgWaveBackground, PregnantMotherBannerIllustration } from './ClinicIllustration';
import { announceQueue } from '../services/audioSpeech';

interface LayarAntreanTVProps {
  queues: QueueItem[];
  profile: AdminProfile;
  soundSettings: SoundSettings;
  onClose: () => void;
}

export const LayarAntreanTV: React.FC<LayarAntreanTVProps> = ({
  queues,
  profile,
  soundSettings,
  onClose,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const currentCalling =
    queues.find((q) => q.status === 'dipanggil') ||
    queues.find((q) => q.status === 'menunggu');

  const waitingList = queues
    .filter((q) => q.status === 'menunggu' && q.id !== currentCalling?.id)
    .slice(0, 5);

  const completedToday = queues.filter((q) => q.status === 'selesai').length;

  const handleCallActive = () => {
    if (currentCalling) {
      announceQueue(
        currentCalling.noAntrean,
        currentCalling.namaPasien,
        currentCalling.jenisPelayanan,
        {
          playChime: soundSettings.chimeEnabled,
          speechRate: soundSettings.speechRate,
          volume: soundSettings.volume,
        }
      );
    }
  };

  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const dateFormatted = `${days[currentTime.getDay()]}, ${currentTime.getDate()} ${months[currentTime.getMonth()]} ${currentTime.getFullYear()}`;
  const timeFormatted = currentTime.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#EAF8F9] flex flex-col justify-between overflow-hidden font-['Poppins',sans-serif]">
      {/* Top TV Bar */}
      <header className="px-6 py-4 bg-gradient-to-r from-[#179BA2] via-[#20A6AE] to-[#51CBD3] text-white flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <ClinicLogo size="md" showSubtitle={true} theme="light" />
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs font-medium text-teal-100">{dateFormatted}</div>
            <div className="text-xl font-bold font-mono tracking-wider">{timeFormatted} WIB</div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCallActive}
              className="p-2.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition"
              title="Panggil Suara Antrean Saat Ini"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition"
              title="Layar Penuh"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-rose-500/80 hover:bg-rose-600 text-white transition"
              title="Tutup Layar TV"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main TV Queue Area */}
      <main className="flex-1 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left: Giant Calling Queue Card (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-white p-8 shadow-xl border-2 border-teal-100 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#087D86]">
                PANGGILAN AKTIF SEKARANG
              </span>
            </div>
            <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#E2F7F8] text-[#087D86]">
              RUANG PERIKSA 1 • BIDAN KANTI
            </span>
          </div>

          {/* Huge Number */}
          <div className="my-auto py-8 text-center">
            <div className="inline-block px-10 py-5 rounded-3xl bg-gradient-to-br from-[#E2F7F8] via-[#D0F3F5] to-[#B8ECEF] border border-[#A4E4E8] shadow-inner">
              <span className="text-7xl sm:text-8xl md:text-9xl font-black font-mono text-[#0F8A91] tracking-tight drop-shadow-md">
                {currentCalling ? currentCalling.noAntrean : '---'}
              </span>
            </div>

            <div className="mt-6 space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
                {currentCalling ? currentCalling.namaPasien : 'Menunggu Panggilan Berikutnya'}
              </h2>
              <p className="text-base sm:text-lg font-semibold text-[#20A6AE]">
                {currentCalling ? currentCalling.jenisPelayanan : 'Silakan menunggu dengan nyaman'}
              </p>
            </div>
          </div>

          {/* Footer of calling card */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#20A6AE]" />
              <span>Sisa Menunggu: <b>{waitingList.length + (currentCalling ? 0 : 0)} Pasien</b></span>
            </div>
            <div className="flex items-center gap-2">
              <span>Selesai Terlayani Hari Ini: <b>{completedToday}</b></span>
            </div>
          </div>
        </div>

        {/* Right: Next Queues and Clinic Banner (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-5">
          {/* Next Queues Card */}
          <div className="rounded-3xl bg-white p-6 shadow-xl border border-teal-100 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 pb-3 border-b border-slate-100 flex items-center justify-between">
                <span>ANTREAN BERIKUTNYA</span>
                <span className="text-xs text-teal-600 font-semibold">Harap Bersiap</span>
              </h3>

              <div className="mt-4 space-y-2.5">
                {waitingList.length === 0 ? (
                  <p className="py-6 text-center text-xs text-slate-400">
                    Tidak ada antrean berikutnya yang menunggu.
                  </p>
                ) : (
                  waitingList.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-teal-100 text-[#087D86] text-xs font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="font-bold text-xs text-slate-800">
                            {item.namaPasien}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {item.jenisPelayanan}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono font-black text-sm text-[#20A6AE]">
                        {item.noAntrean}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <p className="text-[11px] text-center text-slate-400 pt-3 border-t border-slate-100">
              Pengambilan nomor antrean ditutup 30 menit sebelum jam layanan selesai
            </p>
          </div>

          {/* Bottom Mother Banner */}
          <div className="rounded-3xl bg-gradient-to-br from-[#E6FAFA] via-[#D8F5F7] to-[#C9EFF2] p-5 border border-[#BCEBF0] shadow-md flex items-center gap-4">
            <div className="w-24 h-24 shrink-0">
              <PregnantMotherBannerIllustration className="w-full h-full" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#087D86] leading-snug">
                “Kesehatan Ibu dan Anak adalah Prioritas Kami” ❤️
              </p>
              <p className="text-[11px] text-slate-600 mt-1">
                Klinik Bidan Kanti siap melayani persalinan, periksa kehamilan, imunisasi & KB dengan sepenuh hati.
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* Running Marquee Text at Bottom of TV */}
      <footer className="bg-[#087D86] text-white py-3 px-6 overflow-hidden select-none">
        <div className="flex items-center gap-4 text-xs font-semibold whitespace-nowrap">
          <span className="px-2 py-0.5 rounded-full bg-white text-[#087D86] font-bold text-[10px]">
            INFORMASI
          </span>
          <div className="inline-block animate-marquee tracking-wide text-teal-100">
            🌸 Selamat Datang di Klinik Bidan Kanti • Harap memperhatikan nomor antrean pada layar monitor • Jaga asupan nutrisi bunda dan buah hati • Lakukan pemeriksaan kehamilan (ANC) secara rutin minimal 6 kali selama masa kehamilan • Pelayanan Persalinan Buka 24 Jam • Hubungi nomor darurat klinik di (022) 8765-4321 / 0812-9876-5432.
          </div>
        </div>
      </footer>
    </div>
  );
};
