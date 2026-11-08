import React, { useState } from 'react';
import {
  Ticket,
  Plus,
  Volume2,
  CheckCircle2,
  SkipForward,
  Printer,
  Search,
  Filter,
  Calendar,
  Clock,
  X,
  UserCheck,
} from 'lucide-react';
import { QueueItem, Patient, ServiceType, SoundSettings } from '../types';
import { announceQueue } from '../services/audioSpeech';

interface DataAntreanViewProps {
  queues: QueueItem[];
  patients: Patient[];
  soundSettings: SoundSettings;
  onAddQueue: (patientId: string, service: ServiceType, notes?: string) => void;
  onCallQueue: (queue: QueueItem) => void;
  onCompleteQueue: (queueId: string) => void;
  onSkipQueue: (queueId: string) => void;
  onPrintTicket: (queue: QueueItem) => void;
}

export const DataAntreanView: React.FC<DataAntreanViewProps> = ({
  queues,
  patients,
  soundSettings,
  onAddQueue,
  onCallQueue,
  onCompleteQueue,
  onSkipQueue,
  onPrintTicket,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('Semua');
  const [filterService, setFilterService] = useState<string>('Semua');
  const [showAddModal, setShowAddModal] = useState(false);

  // New queue modal form
  const [selectedPatientId, setSelectedPatientId] = useState<string>(patients[0]?.id || '');
  const [selectedService, setSelectedService] = useState<ServiceType>('Pemeriksaan Kehamilan');
  const [queueNotes, setQueueNotes] = useState('');

  const handleCallWithAudio = (item: QueueItem) => {
    announceQueue(item.noAntrean, item.namaPasien, item.jenisPelayanan, {
      playChime: soundSettings.chimeEnabled,
      speechRate: soundSettings.speechRate,
      volume: soundSettings.volume,
    });
    onCallQueue(item);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatientId) return;
    onAddQueue(selectedPatientId, selectedService, queueNotes);
    setShowAddModal(false);
    setQueueNotes('');
  };

  // Filter queues
  const filteredQueues = queues.filter((q) => {
    const matchesSearch =
      q.noAntrean.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.namaPasien.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.jenisPelayanan.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'Semua' || q.status === filterStatus;

    const matchesService =
      filterService === 'Semua' || q.jenisPelayanan === filterService;

    return matchesSearch && matchesStatus && matchesService;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#E5F7F8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-800">
            <Ticket className="w-6 h-6 text-[#20A6AE]" />
            <h2 className="text-xl font-bold">Data Antrean Pasien</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Kelola panggilan langsung, status antrean, dan cetak nomor tiket antrean klinik
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#20A6AE] to-[#188F96] hover:from-[#188F96] hover:to-[#127278] text-white font-bold text-xs shadow-md shadow-teal-500/20 flex items-center gap-2 transition shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Ambil / Tambah Antrean</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#E5F7F8] flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nomor tiket, nama pasien, layanan..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 focus:border-[#20A6AE] rounded-xl outline-none transition"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Status filters */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'Semua', label: 'Semua Status' },
            { id: 'dipanggil', label: 'Dipanggil' },
            { id: 'menunggu', label: 'Menunggu' },
            { id: 'selesai', label: 'Selesai' },
            { id: 'dilewati', label: 'Dilewati' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                filterStatus === tab.id
                  ? 'bg-[#20A6AE] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Queue Table */}
      <div className="bg-white rounded-3xl shadow-xs border border-[#E5F7F8] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#EBF9FA] text-[#087D86] font-bold">
                <th className="py-3.5 px-4">No. Antrean</th>
                <th className="py-3.5 px-4">Nama Pasien</th>
                <th className="py-3.5 px-4">Jenis Pelayanan</th>
                <th className="py-3.5 px-4">Tanggal & Waktu</th>
                <th className="py-3.5 px-4">Status Antrean</th>
                <th className="py-3.5 px-4 text-center">Aksi Pelayanan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQueues.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Tidak ada data antrean yang sesuai filter.
                  </td>
                </tr>
              ) : (
                filteredQueues.map((item) => {
                  const isDipanggil = item.status === 'dipanggil';
                  const isMenunggu = item.status === 'menunggu';
                  const isSelesai = item.status === 'selesai';

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-[#F7FDFF] transition duration-150 ${
                        isDipanggil ? 'bg-teal-50/50' : ''
                      }`}
                    >
                      {/* Ticket Number */}
                      <td className="py-3 px-4">
                        <span className="inline-block px-3 py-1 rounded-xl bg-[#E2F7F8] text-[#087D86] font-mono font-black text-sm border border-[#BCEFF2] shadow-2xs">
                          {item.noAntrean}
                        </span>
                      </td>

                      {/* Patient Name */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-800 text-sm">
                          {item.namaPasien}
                        </div>
                        {item.catatan && (
                          <div className="text-[11px] text-slate-400 italic">
                            Catatan: {item.catatan}
                          </div>
                        )}
                      </td>

                      {/* Service Type */}
                      <td className="py-3 px-4 text-slate-700 font-medium">
                        {item.jenisPelayanan}
                      </td>

                      {/* Date & Time */}
                      <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                        <div>{item.tanggal}</div>
                        <div className="text-slate-400">{item.waktuDaftar} WIB</div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3 px-4">
                        {isDipanggil ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200 animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                            Dipanggil
                          </span>
                        ) : isMenunggu ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            Menunggu
                          </span>
                        ) : isSelesai ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Selesai
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            Dilewati
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Panggil Suara */}
                          <button
                            onClick={() => handleCallWithAudio(item)}
                            className="px-2.5 py-1.5 rounded-xl bg-[#20A6AE] hover:bg-[#188F96] text-white font-bold text-xs flex items-center gap-1 shadow-xs transition"
                            title="Panggil dengan Suara & Bel"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Panggil</span>
                          </button>

                          {/* Selesaikan */}
                          {item.status !== 'selesai' && (
                            <button
                              onClick={() => onCompleteQueue(item.id)}
                              className="p-1.5 rounded-xl text-emerald-600 hover:bg-emerald-50 border border-emerald-200 transition"
                              title="Tandai Selesai Pelayanan"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          )}

                          {/* Lewati */}
                          {item.status === 'menunggu' && (
                            <button
                              onClick={() => onSkipQueue(item.id)}
                              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                              title="Lewati Antrean Ini"
                            >
                              <SkipForward className="w-4 h-4" />
                            </button>
                          )}

                          {/* Cetak Tiket */}
                          <button
                            onClick={() => onPrintTicket(item)}
                            className="p-1.5 rounded-xl text-slate-500 hover:text-[#087D86] hover:bg-teal-50 transition"
                            title="Cetak Struk Tiket Antrean"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Menampilkan {filteredQueues.length} antrean</span>
          <span className="font-semibold text-[#087D86]">
            Klinik Bidan Kanti Mandiri
          </span>
        </div>
      </div>

      {/* Modal: Tambah Antrean */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">
                Ambil / Tambah Antrean Baru
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAdd} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Pilih Pasien Terdaftar *
                </label>
                <select
                  required
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none font-medium"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nama} ({p.kategori}) - NIK: {p.nik}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Jenis Pelayanan *
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value as ServiceType)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none font-medium"
                >
                  <option value="Pemeriksaan Kehamilan">Pemeriksaan Kehamilan (ANC)</option>
                  <option value="KB">Program KB (Suntik / IUD / Implan / Pil)</option>
                  <option value="Imunisasi Bayi & Anak">Imunisasi Bayi & Anak</option>
                  <option value="Pemeriksaan Umum">Pemeriksaan Umum</option>
                  <option value="Konsultasi">Konsultasi Bidan & Laktasi</option>
                  <option value="Perawatan Nifas">Perawatan Nifas</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Catatan Keluhan / Instruksi (Opsional)
                </label>
                <textarea
                  rows={2}
                  value={queueNotes}
                  onChange={(e) => setQueueNotes(e.target.value)}
                  placeholder="Misal: Kontrol rutin trimester 2, keluhan pusing ringan..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-white bg-[#20A6AE] hover:bg-[#188F96] font-bold shadow-md shadow-teal-500/20"
                >
                  Terbitkan Nomor Antrean
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
