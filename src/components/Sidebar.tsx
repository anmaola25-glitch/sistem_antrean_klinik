import React from 'react';
import {
  LayoutDashboard,
  Users,
  Ticket,
  CalendarDays,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  Tv,
} from 'lucide-react';
import { ClinicLogo } from './ClinicIllustration';

export type NavTab =
  | 'dashboard'
  | 'pasien'
  | 'antrean'
  | 'jadwal'
  | 'laporan'
  | 'pengaturan';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onLogout: () => void;
  onOpenTvDisplay: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onLogout,
  onOpenTvDisplay,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pasien', label: 'Data Pasien', icon: Users },
    { id: 'antrean', label: 'Data Antrean', icon: Ticket },
    { id: 'jadwal', label: 'Jadwal Pelayanan', icon: CalendarDays },
    { id: 'laporan', label: 'Laporan Antrean', icon: BarChart3 },
    { id: 'pengaturan', label: 'Pengaturan', icon: Settings },
  ] as const;

  const handleTabClick = (tab: NavTab) => {
    onSelectTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-screen w-72 flex-shrink-0 bg-white/90 backdrop-blur-xl border-r border-[#DDF7F7] flex flex-col justify-between py-6 px-4 shadow-sm transition-transform duration-300 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top: Clinic Logo */}
        <div>
          <div className="px-3 pb-6 border-b border-slate-100 flex items-center justify-between">
            <ClinicLogo size="md" showSubtitle={true} />
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                ✕
              </button>
            )}
          </div>

          {/* Navigation Menu (matches Image 2) */}
          <nav className="mt-6 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-[#20A6AE] to-[#39BDC5] text-white shadow-md shadow-teal-500/25'
                      : 'text-slate-600 hover:text-[#087D86] hover:bg-[#EBF9FA]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon
                      className={`w-5 h-5 transition-transform ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#20A6AE]'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-white/80" />}
                </button>
              );
            })}

            {/* Quick TV Waiting Room Display button */}
            <button
              onClick={onOpenTvDisplay}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-semibold text-[#087D86] bg-[#DDF7F7]/60 hover:bg-[#DDF7F7] border border-teal-200/50 transition mt-4"
              title="Tampilkan Layar Antrean TV Ruang Tunggu"
            >
              <div className="flex items-center gap-3">
                <Tv className="w-4 h-4 text-[#20A6AE]" />
                <span>Layar TV Antrean</span>
              </div>
              <span className="bg-[#20A6AE] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                LIVE
              </span>
            </button>

            {/* Logout button in soft pink pill (matches Image 2) */}
            <div className="pt-3">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold text-rose-500 bg-[#FEE2E2]/60 hover:bg-[#FEE2E2] hover:text-rose-600 transition-colors"
              >
                <LogOut className="w-5 h-5 text-rose-500" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Bottom Silhouette Illustration (Mother & Baby) from Reference Image 2 */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col items-center text-center">
          <div className="relative w-36 h-36 flex items-center justify-center opacity-85 hover:opacity-100 transition">
            {/* Soft decorative background circles and hearts */}
            <div className="absolute inset-0 bg-[#E8FAFA] rounded-full filter blur-xl -z-10" />

            <svg
              viewBox="0 0 160 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-[#65D6DD]"
            >
              {/* Floating sweet hearts */}
              <path
                d="M125 40C122 36 117 36 114 39C111 36 106 36 103 39C99 43 103 49 108 53L114 58L120 53C125 49 129 43 125 40Z"
                fill="#FF9EAF"
                opacity="0.7"
              />
              <path
                d="M35 55C33 52 29 52 27 54C25 52 21 52 19 54C16 57 19 61 23 65L27 68L31 65C35 61 38 57 35 55Z"
                fill="#FFB8C6"
                opacity="0.6"
              />

              {/* Mother face silhouette */}
              <circle cx="72" cy="50" r="14" fill="#20A6AE" opacity="0.3" />
              <path
                d="M58 50C58 38 68 34 78 34C85 34 94 38 92 48C90 56 84 62 76 64C68 64 58 58 58 50Z"
                fill="#20A6AE"
                opacity="0.4"
              />
              {/* Mother embracing body */}
              <path
                d="M45 110C45 85 60 70 80 70C92 70 102 76 108 85C102 88 98 94 98 102C98 114 108 118 112 118C106 128 94 135 78 135C58 135 45 125 45 110Z"
                fill="#20A6AE"
                opacity="0.25"
              />

              {/* Baby */}
              <circle cx="106" cy="95" r="9" fill="#20A6AE" opacity="0.4" />
              <path
                d="M98 104C102 101 110 101 114 105C118 110 115 118 108 120C102 116 99 110 98 104Z"
                fill="#20A6AE"
                opacity="0.35"
              />
            </svg>
          </div>
          <p className="text-[11px] font-semibold text-[#087D86] mt-1">
            Pelayanan Kasih Ibu
          </p>
          <span className="text-[10px] text-slate-400">
            Klinik Bidan Kanti Mandiri
          </span>
        </div>
      </aside>
    </>
  );
};
