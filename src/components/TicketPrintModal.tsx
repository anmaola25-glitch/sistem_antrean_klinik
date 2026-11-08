import React from 'react';
import { X, Printer, Check } from 'lucide-react';
import { QueueItem, AdminProfile } from '../types';

interface TicketPrintModalProps {
  queue: QueueItem;
  profile: AdminProfile;
  onClose: () => void;
}

export const TicketPrintModal: React.FC<TicketPrintModalProps> = ({
  queue,
  profile,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 animate-fade-in">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="text-xs font-bold text-[#087D86] uppercase tracking-wider">
            Cetak Struk Antrean
          </span>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Thermal Receipt Area */}
        <div
          id="printable-ticket"
          className="my-4 p-5 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center text-slate-800"
        >
          <div className="text-center pb-3 border-b border-dashed border-slate-300">
            <h3 className="font-extrabold text-base tracking-tight text-slate-900">
              {profile.klinikNama}
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              {profile.klinikSlogan}
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {profile.klinikAlamat}
            </p>
            <p className="text-[10px] text-slate-400 font-mono">
              Telp: {profile.klinikTelepon}
            </p>
          </div>

          <div className="py-4">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Nomor Antrean Anda
            </p>
            <div className="text-5xl font-black font-mono tracking-tight text-[#087D86] my-1">
              {queue.noAntrean}
            </div>
            <p className="text-xs font-bold text-slate-700 mt-1">
              {queue.namaPasien}
            </p>
            <div className="inline-block mt-1 px-3 py-0.5 rounded-full bg-[#E2F7F8] text-[#087D86] text-[11px] font-semibold">
              {queue.jenisPelayanan}
            </div>
          </div>

          <div className="py-2.5 border-t border-b border-dashed border-slate-300 text-[11px] text-slate-600 space-y-1 text-left font-mono">
            <div className="flex justify-between">
              <span>Tanggal:</span>
              <span>{queue.tanggal}</span>
            </div>
            <div className="flex justify-between">
              <span>Waktu Daftar:</span>
              <span>{queue.waktuDaftar} WIB</span>
            </div>
            <div className="flex justify-between font-bold text-[#087D86]">
              <span>Status:</span>
              <span className="uppercase">{queue.status}</span>
            </div>
          </div>

          {/* Barcode visual simulation */}
          <div className="mt-4 pt-1 flex flex-col items-center">
            <div className="h-9 w-44 flex items-center justify-between px-2 bg-white border border-slate-200">
              {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1].map((w, i) => (
                <div
                  key={i}
                  className="bg-slate-900 h-7"
                  style={{ width: `${w}px` }}
                />
              ))}
            </div>
            <p className="text-[9px] font-mono text-slate-400 mt-1">
              {queue.noAntrean}-{queue.patientId}-{queue.tanggal.replace(/-/g, '')}
            </p>
          </div>

          <div className="mt-3 text-[10px] text-slate-500 leading-tight">
            Terima kasih atas kepercayaan Anda.
            <br />
            Silakan menunggu dengan nyaman di ruang tunggu.
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onClose}
            className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs transition"
          >
            Tutup
          </button>
          <button
            onClick={handlePrint}
            className="py-2.5 rounded-xl bg-[#20A6AE] hover:bg-[#188F96] text-white font-bold text-xs shadow-md shadow-teal-500/20 flex items-center justify-center gap-1.5 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Struk</span>
          </button>
        </div>
      </div>
    </div>
  );
};
