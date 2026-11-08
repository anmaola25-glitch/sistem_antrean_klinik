import React from 'react';
import { X, User, Phone, MapPin, Calendar, Clock, Stethoscope, Printer, Volume2 } from 'lucide-react';
import { QueueItem, Patient } from '../types';

interface PatientDetailModalProps {
  queue: QueueItem;
  patient?: Patient;
  onClose: () => void;
  onPrintTicket: (queue: QueueItem) => void;
  onCallQueue: (queue: QueueItem) => void;
}

export const PatientDetailModal: React.FC<PatientDetailModalProps> = ({
  queue,
  patient,
  onClose,
  onPrintTicket,
  onCallQueue,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 animate-fade-in">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-[#E2F7F8] text-[#087D86] font-mono font-bold text-sm">
              {queue.noAntrean}
            </span>
            <span className="font-bold text-slate-800 text-sm">Detail Pasien & Antrean</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-xs">
          {/* Patient Overview */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Nama Lengkap:</span>
              <span className="font-bold text-slate-800 text-sm">{queue.namaPasien}</span>
            </div>
            {patient && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">NIK:</span>
                  <span className="font-mono text-slate-700">{patient.nik}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">No. WhatsApp / HP:</span>
                  <span className="font-mono text-slate-700">{patient.noHp}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Usia & Gol. Darah:</span>
                  <span className="text-slate-700">{patient.usia} Thn • Gol {patient.golonganDarah}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Alamat:</span>
                  <span className="text-slate-700 text-right max-w-[200px] truncate">{patient.alamat}</span>
                </div>
              </>
            )}
          </div>

          {/* Queue Details */}
          <div className="p-4 rounded-2xl bg-[#EAF8F9] border border-teal-100 space-y-2 text-[#087D86]">
            <div className="flex items-center justify-between">
              <span>Jenis Pelayanan:</span>
              <span className="font-bold">{queue.jenisPelayanan}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Waktu Pendaftaran:</span>
              <span className="font-mono">{queue.tanggal} • {queue.waktuDaftar} WIB</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Status Antrean:</span>
              <span className="uppercase font-bold tracking-wide">{queue.status}</span>
            </div>
            {queue.catatan && (
              <div className="pt-2 border-t border-teal-200/50">
                <span className="font-semibold block text-[11px] text-slate-500">Catatan:</span>
                <p className="text-slate-700 italic mt-0.5">{queue.catatan}</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => onCallQueue(queue)}
            className="py-2.5 rounded-xl bg-[#20A6AE] hover:bg-[#188F96] text-white font-bold flex items-center justify-center gap-1.5 shadow-md shadow-teal-500/20 transition"
          >
            <Volume2 className="w-4 h-4" />
            <span>Panggil Suara</span>
          </button>
          <button
            onClick={() => onPrintTicket(queue)}
            className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center gap-1.5 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Tiket</span>
          </button>
        </div>
      </div>
    </div>
  );
};
