import React, { useState, useEffect, useRef } from 'react';
import {
  Bell,
  Menu,
  Volume2,
  Calendar,
  User,
  ChevronDown,
  CheckCircle2,
  Clock,
  Sparkles,
  LogOut,
  ExternalLink,
  ShieldCheck,
  X,
} from 'lucide-react';
import { AdminProfile } from '../types';

interface HeaderProps {
  admin: AdminProfile;
  onOpenMobileMenu: () => void;
  onLogout: () => void;
  onTestSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  admin,
  onOpenMobileMenu,
  onLogout,
  onTestSound,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Click outside listener to auto-close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (notifRef.current && !notifRef.current.contains(target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(target)) {
        setShowProfileMenu(false);
      }
      if (dateRef.current && !dateRef.current.contains(target)) {
        setShowDateModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format Indonesian Date matching Image 2
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const dayName = days[currentTime.getDay()];
  const dateNum = currentTime.getDate();
  const monthName = months[currentTime.getMonth()];
  const year = currentTime.getFullYear();
  const dateFormatted = `${dayName}, ${dateNum} ${monthName} ${year}`;

  const timeFormatted = currentTime.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return (
    // Note: relative z-40 and NO overflow-hidden on the header element
    // so all child dropdowns render completely above the content below!
    <header
      ref={headerRef}
      className="relative z-40 w-full rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 mb-6 bg-gradient-to-r from-[#179BA2] via-[#20A6AE] to-[#51CBD3] text-white shadow-lg shadow-teal-500/15"
    >
      {/* Decorative ambient background ECG line (isolated inside its own overflow-hidden container) */}
      <div className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-full opacity-20">
          <svg viewBox="0 0 400 120" fill="none" className="w-full h-full">
            <path
              d="M0 60 L100 60 L120 20 L135 100 L150 40 L165 75 L180 60 L400 60"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Greeting and subtitle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition shrink-0 cursor-pointer"
            aria-label="Buka navigasi menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2 whitespace-nowrap">
              <span>Selamat Datang, Admin</span>
              <span className="inline-block animate-bounce">👋</span>
            </h1>
            <p className="text-xs sm:text-sm text-teal-50 font-medium mt-0.5 opacity-90 truncate">
              Kelola antrean dan pelayanan klinik dengan mudah
            </p>
          </div>
        </div>

        {/* Right Controls: Exactly matching reference image 2 in one horizontal aligned row */}
        <div className="flex items-center justify-end gap-2.5 sm:gap-3.5 shrink-0 self-end lg:self-center">
          
          {/* Quick Sound Test icon button */}
          <button
            onClick={onTestSound}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-semibold text-white transition shadow-xs shrink-0 cursor-pointer active:scale-95"
            title="Uji Coba Lonceng Bel Antrean"
          >
            <Volume2 className="w-4 h-4" />
            <span className="hidden sm:inline">Tes Suara</span>
          </button>

          {/* Date & Time Capsule with interactive click */}
          <div ref={dateRef} className="relative shrink-0">
            <button
              onClick={() => {
                setShowDateModal(!showDateModal);
                setShowNotifications(false);
                setShowProfileMenu(false);
              }}
              className="flex items-center gap-3 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white shadow-xs shrink-0 transition text-left cursor-pointer active:scale-98"
              title="Klik untuk info jadwal klinik hari ini"
            >
              <div className="p-1 rounded-lg bg-white/15 text-white shrink-0 hidden sm:block">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="text-right leading-tight">
                <div className="text-[11px] font-semibold text-teal-100 whitespace-nowrap">
                  {dateFormatted}
                </div>
                <div className="text-xs sm:text-sm font-bold font-mono tracking-wider text-white">
                  {timeFormatted}
                </div>
              </div>
            </button>

            {/* Date / Clinic Schedule Popover */}
            {showDateModal && (
              <div className="absolute right-0 top-full mt-2.5 w-76 sm:w-84 rounded-3xl bg-white text-slate-800 p-4 shadow-2xl border border-slate-100 z-50 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#20A6AE]" />
                    <span className="font-bold text-xs text-[#087D86]">
                      Info Operasional Hari Ini
                    </span>
                  </div>
                  <button
                    onClick={() => setShowDateModal(false)}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-3 space-y-2.5 text-xs">
                  <div className="p-2.5 rounded-2xl bg-[#EAF8F9] border border-teal-100">
                    <p className="font-bold text-[#087D86]">Status Pelayanan: Buka Aktif</p>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      Poli Pemeriksaan Kehamilan & KB: 08:00 - 16:00 WIB
                    </p>
                    <p className="text-[10px] text-teal-700 font-semibold mt-1">
                      Pelayanan Persalinan: Siaga 24 Jam
                    </p>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-50 text-[11px] text-slate-600 flex items-center justify-between">
                    <span>Bidan Jaga:</span>
                    <span className="font-bold text-slate-800">{admin.nama}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notification Bell matching Image 2 */}
          <div ref={notifRef} className="relative shrink-0">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
                setShowDateModal(false);
              }}
              className="relative p-2.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition cursor-pointer active:scale-95"
              aria-label="Notifikasi"
              title="Notifikasi"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 border-2 border-white text-[10px] font-black flex items-center justify-center text-white shadow-xs">
                1
              </span>
            </button>

            {/* Notification Dropdown (renders cleanly without clipping) */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2.5 w-80 sm:w-88 rounded-3xl bg-white text-slate-800 p-4 shadow-2xl border border-slate-100 z-50 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-bold text-sm text-[#087D86]">Notifikasi Terkini</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full font-bold">
                      1 Baru
                    </span>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 space-y-2.5">
                  <div className="p-3 rounded-2xl bg-teal-50/70 border border-teal-100 text-xs">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-[#087D86]">Antrean Baru Masuk</p>
                      <span className="text-[10px] text-slate-400">Baru saja</span>
                    </div>
                    <p className="text-slate-600 mt-1">
                      Pasien <b>Indah Sari (A016)</b> baru saja mendaftar untuk Pemeriksaan Kehamilan.
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 text-xs text-slate-600">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-slate-700">Jadwal Praktek Buka</p>
                      <span className="text-[10px] text-slate-400">08:00 WIB</span>
                    </div>
                    <p className="text-slate-500 mt-1">
                      Poli Pemeriksaan Kehamilan (ANC) telah dibuka sesuai jam operasional klinik.
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 text-center">
                  <span className="text-[11px] text-slate-400 font-medium">
                    Klinik Bidan Kanti • Notifikasi Otomatis
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Admin Avatar matching Image 2 */}
          <div ref={profileRef} className="relative shrink-0">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
                setShowDateModal(false);
              }}
              className="flex items-center gap-1.5 p-1.5 pr-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md transition cursor-pointer active:scale-95"
              title="Profil Admin & Keluar"
            >
              <div className="w-8 h-8 rounded-full bg-white/95 text-[#20A6AE] font-black flex items-center justify-center text-xs shadow-xs border border-white/40">
                <User className="w-4 h-4 text-[#20A6AE]" />
              </div>
              <ChevronDown className="w-4 h-4 text-white/90" />
            </button>

            {/* Profile Dropdown (renders cleanly without clipping) */}
            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2.5 w-64 rounded-3xl bg-white text-slate-800 p-4 shadow-2xl border border-slate-100 z-50 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <p className="text-xs font-bold text-slate-800">{admin.nama}</p>
                    <p className="text-[11px] text-slate-500">{admin.role}</p>
                  </div>
                  <button
                    onClick={() => setShowProfileMenu(false)}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="py-2.5 text-xs space-y-1.5">
                  <div className="px-2 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>Petugas Bertugas Aktif</span>
                  </div>
                  <div className="px-2 py-1 text-slate-500 text-[11px]">
                    Klinik: <b>{admin.klinikNama}</b>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Keluar dari Sistem</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
