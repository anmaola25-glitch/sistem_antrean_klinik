import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Edit2,
  Trash2,
  Ticket,
  UserCheck,
  Phone,
  MapPin,
  Calendar,
  X,
} from 'lucide-react';
import { Patient, ServiceType } from '../types';

interface DataPasienViewProps {
  patients: Patient[];
  onAddPatient: (patient: Omit<Patient, 'id' | 'tanggalDaftar'>) => void;
  onUpdatePatient: (patient: Patient) => void;
  onDeletePatient: (patientId: string) => void;
  onRegisterQueueForPatient: (patient: Patient, service: ServiceType) => void;
}

export const DataPasienView: React.FC<DataPasienViewProps> = ({
  patients,
  onAddPatient,
  onUpdatePatient,
  onDeletePatient,
  onRegisterQueueForPatient,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKategori, setFilterKategori] = useState<string>('Semua');

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [queueModalPatient, setQueueModalPatient] = useState<Patient | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceType>('Pemeriksaan Kehamilan');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states for Add/Edit
  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    noHp: '',
    alamat: '',
    usia: 28,
    golonganDarah: 'O',
    kategori: 'Ibu Hamil' as Patient['kategori'],
  });

  const resetForm = () => {
    setFormData({
      nama: '',
      nik: '',
      noHp: '',
      alamat: '',
      usia: 28,
      golonganDarah: 'O',
      kategori: 'Ibu Hamil',
    });
  };

  const handleOpenAdd = () => {
    resetForm();
    setShowAddModal(true);
  };

  const handleOpenEdit = (p: Patient) => {
    setEditingPatient(p);
    setFormData({
      nama: p.nama,
      nik: p.nik,
      noHp: p.noHp,
      alamat: p.alamat,
      usia: p.usia,
      golonganDarah: p.golonganDarah,
      kategori: p.kategori,
    });
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.nik) return;
    onAddPatient(formData);
    setShowAddModal(false);
    resetForm();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPatient) return;
    onUpdatePatient({
      ...editingPatient,
      ...formData,
    });
    setEditingPatient(null);
    resetForm();
  };

  const handleConfirmRegisterQueue = () => {
    if (queueModalPatient) {
      onRegisterQueueForPatient(queueModalPatient, selectedService);
      setQueueModalPatient(null);
    }
  };

  // Filtered patients
  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.nik.includes(searchTerm) ||
      p.noHp.includes(searchTerm) ||
      p.alamat.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesKategori =
      filterKategori === 'Semua' || p.kategori === filterKategori;

    return matchesSearch && matchesKategori;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#E5F7F8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-800">
            <Users className="w-6 h-6 text-[#20A6AE]" />
            <h2 className="text-xl font-bold">Data Pasien Klinik Bidan Kanti</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Kelola data rekam pasien ibu, anak, dan peserta pelayanan kebidanan
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#20A6AE] to-[#188F96] hover:from-[#188F96] hover:to-[#127278] text-white font-bold text-xs shadow-md shadow-teal-500/20 flex items-center gap-2 transition shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Tambah Pasien Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#E5F7F8] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama, NIK, no HP, alamat..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 focus:border-[#20A6AE] rounded-xl outline-none transition"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['Semua', 'Ibu Hamil', 'Akseptor KB', 'Bayi / Balita', 'Umum'].map(
            (kat) => (
              <button
                key={kat}
                onClick={() => setFilterKategori(kat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  filterKategori === kat
                    ? 'bg-[#20A6AE] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {kat}
              </button>
            )
          )}
        </div>
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-3xl shadow-xs border border-[#E5F7F8] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#EBF9FA] text-[#087D86] font-bold">
                <th className="py-3.5 px-4">No.</th>
                <th className="py-3.5 px-4">Nama Pasien</th>
                <th className="py-3.5 px-4">NIK</th>
                <th className="py-3.5 px-4">No. Telepon</th>
                <th className="py-3.5 px-4">Alamat</th>
                <th className="py-3.5 px-4">Kategori</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Tidak ada data pasien yang sesuai dengan pencarian.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient, index) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-[#F7FDFF] transition duration-150"
                  >
                    <td className="py-3 px-4 font-mono text-slate-400 font-semibold">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-800 text-sm">
                        {patient.nama}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>{patient.usia} Tahun</span>
                        <span>•</span>
                        <span>Gol. Darah: {patient.golonganDarah}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">
                      {patient.nik}
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-mono">
                      {patient.noHp}
                    </td>
                    <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                      {patient.alamat}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#E2F7F8] text-[#087D86] border border-[#BCEFF2]">
                        {patient.kategori}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {/* Quick Register Queue button */}
                        <button
                          onClick={() => setQueueModalPatient(patient)}
                          className="px-2.5 py-1 rounded-xl bg-teal-50 hover:bg-[#20A6AE] text-[#087D86] hover:text-white font-bold text-[11px] flex items-center gap-1 border border-teal-200 transition"
                          title="Daftarkan ke Antrean Hari Ini"
                        >
                          <Ticket className="w-3.5 h-3.5" />
                          <span>Antre</span>
                        </button>

                        <button
                          onClick={() => handleOpenEdit(patient)}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition"
                          title="Ubah Data"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setDeleteConfirmId(patient.id)}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                          title="Hapus Data"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Menampilkan {filteredPatients.length} dari {patients.length} total pasien</span>
          <span className="font-semibold text-[#087D86]">Klinik Bidan Kanti</span>
        </div>
      </div>

      {/* Modal: Tambah Pasien / Edit Pasien */}
      {(showAddModal || editingPatient) && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-100 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">
                {editingPatient ? 'Edit Data Pasien' : 'Tambah Pasien Baru'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingPatient(null);
                }}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={editingPatient ? handleSaveEdit : handleSaveAdd}
              className="mt-4 space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nama Lengkap Pasien *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  placeholder="Contoh: Ny. Siti Fatimah"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    NIK (Nomor Induk Kependudukan) *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    value={formData.nik}
                    onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                    placeholder="3201xxxxxxxxxxxx"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nomor WhatsApp / HP *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.noHp}
                    onChange={(e) => setFormData({ ...formData, noHp: e.target.value })}
                    placeholder="08123456789"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Usia (Tahun)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={120}
                    value={formData.usia}
                    onChange={(e) => setFormData({ ...formData, usia: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Golongan Darah
                  </label>
                  <select
                    value={formData.golonganDarah}
                    onChange={(e) => setFormData({ ...formData, golonganDarah: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                    <option value="O">O</option>
                    <option value="Tidak Tahu">Tidak Tahu</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Kategori
                  </label>
                  <select
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value as Patient['kategori'] })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none"
                  >
                    <option value="Ibu Hamil">Ibu Hamil</option>
                    <option value="Akseptor KB">Akseptor KB</option>
                    <option value="Bayi / Balita">Bayi / Balita</option>
                    <option value="Ibu Bersalin">Ibu Bersalin</option>
                    <option value="Umum">Umum</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Alamat Lengkap
                </label>
                <textarea
                  rows={2}
                  value={formData.alamat}
                  onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                  placeholder="Jl. Melati RT 01 / RW 02..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingPatient(null);
                  }}
                  className="px-4 py-2 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-white bg-[#20A6AE] hover:bg-[#188F96] font-bold shadow-md shadow-teal-500/20"
                >
                  {editingPatient ? 'Simpan Perubahan' : 'Tambahkan Pasien'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Quick Register Queue */}
      {queueModalPatient && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 animate-fade-in text-center">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#20A6AE] flex items-center justify-center mx-auto mb-3">
              <Ticket className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              Daftarkan Nomor Antrean
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Pasien: <b className="text-slate-700">{queueModalPatient.nama}</b>
            </p>

            <div className="mt-4 text-left">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pilih Jenis Pelayanan:
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value as ServiceType)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-[#20A6AE] outline-none font-medium"
              >
                <option value="Pemeriksaan Kehamilan">Pemeriksaan Kehamilan (ANC)</option>
                <option value="KB">Program KB (Suntik / IUD / Implan / Pil)</option>
                <option value="Imunisasi Bayi & Anak">Imunisasi Bayi & Anak</option>
                <option value="Pemeriksaan Umum">Pemeriksaan Umum</option>
                <option value="Konsultasi">Konsultasi Bidan & Laktasi</option>
                <option value="Perawatan Nifas">Perawatan Nifas</option>
              </select>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                onClick={() => setQueueModalPatient(null)}
                className="py-2.5 rounded-xl bg-slate-100 text-slate-600 font-semibold text-xs"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmRegisterQueue}
                className="py-2.5 rounded-xl bg-[#20A6AE] hover:bg-[#188F96] text-white font-bold text-xs shadow-md shadow-teal-500/20"
              >
                Daftar & Cetak
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 text-center animate-fade-in">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              Hapus Data Pasien?
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              Data pasien yang dihapus tidak dapat dipulihkan. Apakah Anda yakin ingin melanjutkan?
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="py-2.5 rounded-xl bg-slate-100 text-slate-600 font-semibold text-xs"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  onDeletePatient(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md"
              >
                Hapus Pasien
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
