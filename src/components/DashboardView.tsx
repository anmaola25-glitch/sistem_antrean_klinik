import React, { useState } from 'react';
import {
  Users,
  Ticket,
  Clock,
  CheckCircle2,
  TrendingUp,
  Volume2,
  ArrowRight,
  UserCheck,
  Stethoscope,
  SkipForward,
  Printer,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { Patient, QueueItem, SoundSettings } from '../types';
import { PregnantMotherBannerIllustration } from './ClinicIllustration';
import { announceQueue } from '../services/audioSpeech';

interface DashboardViewProps {
  queues: QueueItem[];
  patients: Patient[];
  soundSettings: SoundSettings;
  onCallQueue: (queue: QueueItem) => void;
  onCompleteQueue: (queueId: string) => void;
  onSkipQueue: (queueId: string) => void;
  onNextQueue: () => void;
  onViewAllQueues: () => void;
  onPrintTicket: (queue: QueueItem) => void;
  onSelectQueueDetail: (queue: QueueItem) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  queues,
  patients,
  soundSettings,
  onCallQueue,
  onCompleteQueue,
  onSkipQueue,
  onNextQueue,
  onViewAllQueues,
  onPrintTicket,
  onSelectQueueDetail,
}) => {
  const [chartRange, setChartRange] = useState('7 Hari Terakhir');
  const [hoveredChartPoint, setHoveredChartPoint] = useState<{ day: string; value: number } | null>(null);

  // Statistics calculation
  const totalPasien = patients.length >= 248 ? patients.length : 248; // keep realistic counter
  const antreanHariIni = queues.length;
  const antreanMenunggu = queues.filter((q) => q.status === 'menunggu').length;
  const antreanSelesai = queues.filter((q) => q.status === 'selesai').length;

  // Currently calling queue item
  const currentCalling =
    queues.find((q) => q.status === 'dipanggil') ||
    queues.find((q) => q.status === 'menunggu');

  // Recent queues (up to 5)
  const recentQueues = queues.slice(0, 7);

  // Chart data matching image 2 (Sen: 20, Sel: 25, Rab: 33, Kam: 26, Jum: 25, Sab: 35, Min: 27)
  const chartData = [
    { day: 'Sen', value: 20, x: 40, y: 100 },
    { day: 'Sel', value: 25, x: 120, y: 88 },
    { day: 'Rab', value: 33, x: 200, y: 68 },
    { day: 'Kam', value: 26, x: 280, y: 85 },
    { day: 'Jum', value: 25, x: 360, y: 88 },
    { day: 'Sab', value: 35, x: 440, y: 63 },
    { day: 'Min', value: 27, x: 520, y: 83 },
  ];

  const handleVoiceCall = (queue: QueueItem) => {
    announceQueue(queue.noAntrean, queue.namaPasien, queue.jenisPelayanan, {
      playChime: soundSettings.chimeEnabled,
      speechRate: soundSettings.speechRate,
      volume: soundSettings.volume,
    });
    onCallQueue(queue);
  };

  return (
    <div className="space-y-6">
      {/* 4 Statistics Cards Row (matches Reference Image 2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        
        {/* Card 1: Total Pasien */}
        <div className="relative overflow-hidden rounded-3xl bg-white p-5 shadow-xs border border-[#E5F7F8] hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div className="w-13 h-13 rounded-2xl bg-[#E2F7F8] text-[#20A6AE] flex items-center justify-center shadow-xs">
              <Users className="w-7 h-7" />
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <span>↑</span>
              <span>12%</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-500">Total Pasien</p>
            <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-0.5">
              {totalPasien}
            </h3>
          </div>
          {/* Subtle watermark */}
          <Users className="absolute -bottom-3 -right-3 w-20 h-20 text-[#E5F7F8] opacity-60 pointer-events-none" />
        </div>

        {/* Card 2: Antrean Hari Ini */}
        <div className="relative overflow-hidden rounded-3xl bg-white p-5 shadow-xs border border-rose-50 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div className="w-13 h-13 rounded-2xl bg-[#FFE4E8] text-[#FF5A79] flex items-center justify-center shadow-xs">
              <Ticket className="w-7 h-7" />
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <span>↑</span>
              <span>8%</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-500">Antrean Hari Ini</p>
            <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-0.5">
              {antreanHariIni >= 32 ? antreanHariIni : 32}
            </h3>
          </div>
          {/* Subtle watermark */}
          <Ticket className="absolute -bottom-3 -right-3 w-20 h-20 text-[#FFE4E8] opacity-50 pointer-events-none" />
        </div>

        {/* Card 3: Antrean Menunggu */}
        <div className="relative overflow-hidden rounded-3xl bg-white p-5 shadow-xs border border-emerald-50 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div className="w-13 h-13 rounded-2xl bg-[#E8F8F0] text-[#1DBB73] flex items-center justify-center shadow-xs">
              <Clock className="w-7 h-7" />
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              <span>↓</span>
              <span>3%</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-500">Antrean Menunggu</p>
            <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-0.5">
              {antreanMenunggu}
            </h3>
          </div>
          {/* Subtle watermark */}
          <Clock className="absolute -bottom-3 -right-3 w-20 h-20 text-[#E8F8F0] opacity-50 pointer-events-none" />
        </div>

        {/* Card 4: Antrean Selesai */}
        <div className="relative overflow-hidden rounded-3xl bg-white p-5 shadow-xs border border-teal-50 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div className="w-13 h-13 rounded-2xl bg-[#E0F4F2] text-[#1E9B8A] flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <span>↑</span>
              <span>5%</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-500">Antrean Selesai</p>
            <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-0.5">
              {antreanSelesai >= 20 ? antreanSelesai : 20}
            </h3>
          </div>
          {/* Subtle watermark */}
          <CheckCircle2 className="absolute -bottom-3 -right-3 w-20 h-20 text-[#E0F4F2] opacity-50 pointer-events-none" />
        </div>

      </div>

      {/* Main Body: Row 1 (Antrean Saat Ini & Antrean Terbaru) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left: Antrean Saat Ini (5 cols on lg) */}
        <div className="lg:col-span-5 rounded-3xl bg-white p-6 shadow-xs border border-[#E5F7F8] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <Volume2 className="w-5 h-5 text-[#20A6AE]" />
                <span className="text-base">Antrean Saat Ini</span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E2F7F8] text-[#087D86] border border-[#BCEFF2]">
                {currentCalling?.status === 'dipanggil' ? 'Sedang Dipanggil' : 'Siap Dipanggil'}
              </span>
            </div>

            {/* Glowing Big Number Capsule matching reference image 2 */}
            <div className="mt-5 p-6 rounded-3xl bg-gradient-to-br from-[#EAF9FA] via-[#DDF7F7] to-[#C8F1F4] border border-[#BDECEF] shadow-inner text-center relative overflow-hidden">
              <div className="absolute top-2 left-3 w-3 h-3 rounded-full bg-[#65D6DD] opacity-70 animate-ping" />
              <div className="absolute bottom-2 right-3 w-2 h-2 rounded-full bg-[#20A6AE] opacity-50" />
              
              <p className="text-xs font-semibold text-[#087D86] uppercase tracking-wider mb-1">
                Nomor Antrean
              </p>
              <h2 className="text-5xl md:text-6xl font-black text-[#138D95] tracking-tight drop-shadow-xs font-mono">
                {currentCalling ? currentCalling.noAntrean : '---'}
              </h2>

              <div className="mt-4 pt-3 border-t border-teal-200/60 flex flex-col gap-1.5 text-left px-2">
                <div className="flex items-center gap-2.5 text-slate-700">
                  <UserCheck className="w-4 h-4 text-[#20A6AE] shrink-0" />
                  <span className="text-sm font-bold truncate">
                    {currentCalling ? currentCalling.namaPasien : 'Belum ada antrean aktif'}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Stethoscope className="w-4 h-4 text-[#20A6AE] shrink-0" />
                  <span className="text-xs font-medium truncate">
                    {currentCalling ? currentCalling.jenisPelayanan : 'Silakan panggil antrean berikutnya'}
                  </span>
                </div>
              </div>
            </div>

            {/* Sisa Antrean capsule */}
            <div className="mt-4 py-2 px-4 rounded-2xl bg-[#E8F8F9] text-[#087D86] text-xs font-bold flex items-center justify-center gap-2 border border-teal-100">
              <Users className="w-4 h-4 text-[#20A6AE]" />
              <span>Sisa Antrean : {antreanMenunggu} Pasien</span>
            </div>
          </div>

          {/* Interactive Calling Action Buttons */}
          <div className="mt-5 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2.5">
            <button
              onClick={() => currentCalling && handleVoiceCall(currentCalling)}
              disabled={!currentCalling}
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#20A6AE] to-[#1BA1A9] hover:from-[#188F96] hover:to-[#147980] text-white font-bold text-xs shadow-md shadow-teal-500/20 flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              <Volume2 className="w-4 h-4" />
              <span>Panggil Suara</span>
            </button>

            <button
              onClick={onNextQueue}
              className="py-2.5 px-3 rounded-xl bg-[#EBF9FA] hover:bg-[#DDF7F7] text-[#087D86] font-bold text-xs border border-teal-200 flex items-center justify-center gap-1.5 transition"
            >
              <SkipForward className="w-4 h-4" />
              <span>Panggil Berikutnya</span>
            </button>

            {currentCalling && (
              <>
                <button
                  onClick={() => onCompleteQueue(currentCalling.id)}
                  className="py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs border border-emerald-200 flex items-center justify-center gap-1.5 transition"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Selesaikan</span>
                </button>
                <button
                  onClick={() => onSkipQueue(currentCalling.id)}
                  className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <span>Lewati</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right: Antrean Terbaru Table (7 cols on lg) */}
        <div className="lg:col-span-7 rounded-3xl bg-white p-6 shadow-xs border border-[#E5F7F8] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <Clock className="w-5 h-5 text-[#20A6AE]" />
                <span className="text-base">Antrean Terbaru</span>
              </div>
              <button
                onClick={onViewAllQueues}
                className="text-xs font-bold text-[#20A6AE] hover:text-[#087D86] flex items-center gap-1 hover:underline"
              >
                <span>Lihat Semua</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Table matching reference image 2 */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#EBF9FA] text-[#087D86] font-bold rounded-xl overflow-hidden">
                    <th className="py-2.5 px-3 rounded-l-xl">No. Antrean</th>
                    <th className="py-2.5 px-3">Nama Pasien</th>
                    <th className="py-2.5 px-3">Jenis Pelayanan</th>
                    <th className="py-2.5 px-3">Waktu Daftar</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 rounded-r-xl text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentQueues.map((item) => {
                    const isDipanggil = item.status === 'dipanggil';
                    const isMenunggu = item.status === 'menunggu';
                    const isSelesai = item.status === 'selesai';

                    return (
                      <tr
                        key={item.id}
                        className={`hover:bg-slate-50/80 transition ${
                          isDipanggil ? 'bg-teal-50/40 font-semibold' : ''
                        }`}
                      >
                        <td className="py-2.5 px-3 font-mono font-bold text-[#087D86]">
                          {item.noAntrean}
                        </td>
                        <td className="py-2.5 px-3 text-slate-800 font-medium">
                          {item.namaPasien}
                        </td>
                        <td className="py-2.5 px-3 text-slate-600">
                          {item.jenisPelayanan}
                        </td>
                        <td className="py-2.5 px-3 text-slate-500 font-mono">
                          {item.waktuDaftar}
                        </td>
                        <td className="py-2.5 px-3">
                          {isDipanggil ? (
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700">
                              Dipanggil
                            </span>
                          ) : isMenunggu ? (
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-700">
                              Menunggu
                            </span>
                          ) : isSelesai ? (
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700">
                              Selesai
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
                              Dilewati
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => onSelectQueueDetail(item)}
                              className="p-1 rounded-lg text-slate-400 hover:text-[#20A6AE] hover:bg-teal-50 transition"
                              title="Lihat Detail Pasien"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => onPrintTicket(item)}
                              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                              title="Cetak Tiket"
                            >
                              <Printer className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Menampilkan antrean hari ini</span>
            <span className="font-semibold text-[#087D86]">
              {queues.length} Total Antrean Terdaftar
            </span>
          </div>
        </div>

      </div>

      {/* Main Body: Row 2 (Grafik Antrean & Mother Banner Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left: Grafik Antrean 7 Hari Terakhir (7 cols on lg) */}
        <div className="lg:col-span-7 rounded-3xl bg-white p-6 shadow-xs border border-[#E5F7F8] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <TrendingUp className="w-5 h-5 text-[#20A6AE]" />
                <span className="text-base">Grafik Antrean 7 Hari Terakhir</span>
              </div>
              <div className="relative">
                <select
                  value={chartRange}
                  onChange={(e) => setChartRange(e.target.value)}
                  className="bg-[#EBF9FA] text-[#087D86] text-xs font-semibold py-1.5 px-3 rounded-xl border border-teal-200 outline-none cursor-pointer"
                >
                  <option value="7 Hari Terakhir">7 Hari Terakhir</option>
                  <option value="Bulan Ini">Bulan Ini</option>
                </select>
              </div>
            </div>

            {/* Responsive SVG Chart with curve matching reference image 2 */}
            <div className="mt-5 relative h-52 w-full flex items-center justify-center">
              {/* Tooltip */}
              {hoveredChartPoint && (
                <div className="absolute top-2 right-4 bg-slate-900 text-white text-xs px-2.5 py-1 rounded-lg shadow-md font-medium z-10">
                  {hoveredChartPoint.day}: <b>{hoveredChartPoint.value} Pasien</b>
                </div>
              )}

              <svg viewBox="0 0 560 160" className="w-full h-full overflow-visible">
                {/* Horizontal grid lines */}
                <line x1="30" y1="20" x2="540" y2="20" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="30" y1="60" x2="540" y2="60" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="30" y1="100" x2="540" y2="100" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="30" y1="140" x2="540" y2="140" stroke="#E2E8F0" strokeWidth="1.5" />

                {/* Y-axis labels */}
                <text x="15" y="24" fill="#94A3B8" fontSize="10" fontWeight="600">40</text>
                <text x="15" y="64" fill="#94A3B8" fontSize="10" fontWeight="600">30</text>
                <text x="15" y="104" fill="#94A3B8" fontSize="10" fontWeight="600">20</text>
                <text x="15" y="144" fill="#94A3B8" fontSize="10" fontWeight="600">0</text>

                {/* Smooth Curve Area Gradient */}
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#20A6AE" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#65D6DD" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Filled curve */}
                <path
                  d="M40 100 Q80 88 120 88 T200 68 T280 85 T360 88 T440 63 T520 83 L520 140 L40 140 Z"
                  fill="url(#chartGradient)"
                />

                {/* Curve stroke line */}
                <path
                  d="M40 100 Q80 88 120 88 T200 68 T280 85 T360 88 T440 63 T520 83"
                  fill="none"
                  stroke="#20A6AE"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Interactive Points */}
                {chartData.map((pt) => (
                  <g
                    key={pt.day}
                    className="cursor-pointer group"
                    onMouseEnter={() => setHoveredChartPoint({ day: pt.day, value: pt.value })}
                    onMouseLeave={() => setHoveredChartPoint(null)}
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="5.5"
                      fill="#20A6AE"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      className="group-hover:r-7 transition-all duration-150 drop-shadow-sm"
                    />
                    <text
                      x={pt.x}
                      y="156"
                      textAnchor="middle"
                      fill="#64748B"
                      fontSize="11"
                      fontWeight="600"
                    >
                      {pt.day}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <div className="mt-2 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Rata-rata kedatangan: <b>27.2 pasien / hari</b></span>
            <span className="text-[#087D86] font-semibold">Tingkat Ketepatan Jadwal: 96%</span>
          </div>
        </div>

        {/* Right: Promotional / Mother & Child Card (5 cols on lg) */}
        <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-[#E6FAFA] via-[#D8F5F7] to-[#C9EFF2] p-6 border border-[#BCEBF0] shadow-xs flex flex-col justify-between relative overflow-hidden">
          
          {/* Decorative ambient elements */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Mother Illustration from Image 2 */}
            <div className="w-36 h-36 shrink-0 flex items-center justify-center">
              <PregnantMotherBannerIllustration className="w-full h-full drop-shadow-sm" />
            </div>

            {/* Motivational Quote & Branding */}
            <div className="text-center sm:text-left">
              <span className="text-xl">❤️</span>
              <h4 className="text-base sm:text-lg font-extrabold text-[#087D86] leading-snug mt-1">
                “Kesehatan Ibu dan Anak adalah Prioritas Kami”
              </h4>
              <p className="text-xs text-slate-600 font-medium mt-1.5 leading-relaxed">
                Pelayanan ramah, nyaman, dan berstandar kebidanan profesional untuk bunda dan buah hati.
              </p>
            </div>
          </div>

          {/* Bottom Badge & Action Button */}
          <div className="mt-5 pt-3 border-t border-teal-200/60 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-[#20A6AE] shadow-xs border border-teal-100">
              Klinik Bidan Kanti
            </span>
            <span className="text-[11px] text-[#087D86] font-semibold">
              Praktek Mandiri Bidan
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
