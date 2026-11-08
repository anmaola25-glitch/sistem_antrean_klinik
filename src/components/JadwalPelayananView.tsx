import React, { useState } from 'react';
import { CalendarDays, Plus, Clock, Edit2, Trash2, X, CheckCircle, AlertCircle } from 'lucide-react';
import { ServiceSchedule } from '../types';

interface JadwalPelayananViewProps {
  schedules: ServiceSchedule[];
  onAddSchedule: (schedule: Omit<ServiceSchedule, 'id'>) => void;
  onUpdateSchedule: (schedule: ServiceSchedule) => void;
  onDeleteSchedule: (id: string) => void;
}

export const JadwalPelayananView: React.FC<JadwalPelayananViewProps> = ({
  schedules,
  onAddSchedule,
  onUpdateSchedule,
  onDeleteSchedule,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<ServiceSchedule | null>(null);

  const [formData, setFormData] = useState({
    hari: 'Senin - Jumat',
    jamBuka: '08:00',
    jamTutup: '12:00',
    jenisPelayanan: '',
    bidanBertugas: 'Bidan Kanti, S.Tr.Keb, Bdn',
    kuota: 25,
    status: 'Buka' as ServiceSchedule['status'],
  });

  const resetForm = () => {
    setFormData({
      hari: 'Senin - Jumat',
      jamBuka: '08:00',
      jamTutup: '12:00',
      jenisPelayanan: '',
      bidanBertugas: 'Bidan Kanti, S.Tr.Keb, Bdn',
      kuota: 25,
      status: 'Buka',
    });
  };

  const handleOpenAdd = () => {
    resetForm();
    setShowAddModal(true);
  };

  const handleOpenEdit = (item: ServiceSchedule) => {
    setEditingSchedule(item);
    setFormData({
      hari: item.hari,
      jamBuka: item.jamBuka,
      jamTutup: item.jamTutup,
      jenisPelayanan: item.jenisPelayanan,
      bidanBertugas: item.bidanBertugas,
      kuota: item.kuota,
      status: item.status,
    });
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.jenisPelayanan) return;
    onAddSchedule(formData);
    setShowAddModal(false);
    resetForm();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSchedule) return;
    onUpdateSchedule({
      ...editingSchedule,
      ...formData,
    });
    setEditingSchedule(null);
    resetForm();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#E5F7F8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-800">
            <CalendarDays className="w-6 h-6 text-[#20A6AE]" />
            <h2 className="text-xl font-bold">Jadwal Pelayanan Klinik Bidan Kanti</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Atur hari, jam buka & tutup, bidan bertugas, serta status aktif layanan
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#20A6AE] to-[#188F96] hover:from-[#188F96] hover:to-[#127278] text-white font-bold text-xs shadow-md shadow-teal-500/20 flex items-center gap-2 transition shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Tambah Jadwal Baru</span>
        </button>
      </div>

      {/* Grid of Schedules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {schedules.map((item) => {
          const isBuka = item.status === 'Buka';
          const isIstirahat = item.status === 'Istirahat';

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-5 shadow-xs border border-[#E5F7F8] hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EBF9FA] text-[#087D86] border border-teal-100">
                    {item.hari}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      isBuka
                        ? 'bg-emerald-100 text-emerald-700'
                        : isIstirahat
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    ● {item.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-800 mt-3 line-clamp-2">
                  {item.jenisPelayanan}
                </h3>

                <div className="mt-3 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#20A6AE] shrink-0" />
                    <span className="font-mono font-semibold">
                      {item.jamBuka} - {item.jamTutup} WIB
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Bidan:</span>
                    <span className="font-medium text-slate-700 truncate">
                      {item.bidanBertugas}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Kuota Antrean:</span>
                    <span className="font-bold text-[#087D86]">
                      Maksimal {item.kuota} Pasien / Hari
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Operasional Klinik
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-xl text-slate-500 hover:text-[#087D86] hover:bg-teal-50 transition"
                    title="Ubah Jadwal"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteSchedule(item.id)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                    title="Hapus Jadwal"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Tambah / Edit Jadwal */}
      {(showAddModal || editingSchedule) && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">
                {editingSchedule ? 'Edit Jadwal Pelayanan' : 'Tambah Jadwal Baru'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingSchedule(null);
                }}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={editingSchedule ? handleSaveEdit : handleSaveAdd}
              className="mt-4 space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Jenis Pelayanan *
                </label>
                <input
                  type="text"
                  required
                  value={formData.jenisPelayanan}
                  onChange={(e) => setFormData({ ...formData, jenisPelayanan: e.target.value })}
                  placeholder="Misal: Pemeriksaan Kehamilan (ANC)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Hari Pelayanan *
                </label>
                <input
                  type="text"
                  required
                  value={formData.hari}
                  onChange={(e) => setFormData({ ...formData, hari: e.target.value })}
                  placeholder="Misal: Senin - Jumat"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Jam Buka (WIB)
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.jamBuka}
                    onChange={(e) => setFormData({ ...formData, jamBuka: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Jam Tutup (WIB)
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.jamTutup}
                    onChange={(e) => setFormData({ ...formData, jamTutup: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Bidan Bertugas
                </label>
                <input
                  type="text"
                  value={formData.bidanBertugas}
                  onChange={(e) => setFormData({ ...formData, bidanBertugas: e.target.value })}
                  placeholder="Nama Bidan"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Kuota Pasien / Hari
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={150}
                    value={formData.kuota}
                    onChange={(e) => setFormData({ ...formData, kuota: parseInt(e.target.value) || 20 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Status Pelayanan
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as ServiceSchedule['status'] })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none"
                  >
                    <option value="Buka">Buka</option>
                    <option value="Istirahat">Istirahat</option>
                    <option value="Tutup">Tutup</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingSchedule(null);
                  }}
                  className="px-4 py-2 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-white bg-[#20A6AE] hover:bg-[#188F96] font-bold shadow-md shadow-teal-500/20"
                >
                  {editingSchedule ? 'Simpan Perubahan' : 'Tambahkan Jadwal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
