import React, { useState, useEffect } from 'react';
import {
  Patient,
  QueueItem,
  ServiceSchedule,
  AdminProfile,
  SoundSettings,
  ServiceType,
} from './types';
import {
  getStoredPatients,
  savePatients,
  getStoredQueues,
  saveQueues,
  getStoredSchedules,
  saveSchedules,
  getStoredProfile,
  saveProfile,
  getStoredSound,
  saveSound,
  getAuthSession,
  setAuthSession,
  resetAllDataToDefault,
} from './services/storage';
import { LoginScreen } from './components/LoginScreen';
import { Sidebar, NavTab } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { DataPasienView } from './components/DataPasienView';
import { DataAntreanView } from './components/DataAntreanView';
import { JadwalPelayananView } from './components/JadwalPelayananView';
import { LaporanAntreanView } from './components/LaporanAntreanView';
import { PengaturanView } from './components/PengaturanView';
import { LayarAntreanTV } from './components/LayarAntreanTV';
import { TicketPrintModal } from './components/TicketPrintModal';
import { PatientDetailModal } from './components/PatientDetailModal';
import { playClinicChime, announceQueue } from './services/audioSpeech';

export default function App() {
  // Authentication state - ALWAYS start on LoginScreen whenever the app/link is opened
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Clear any previous session so fresh link visits always land on Login
    localStorage.removeItem('bidan_kanti_auth_v1');
  }, []);

  // Navigation tab state
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Core Data States
  const [patients, setPatients] = useState<Patient[]>(getStoredPatients);
  const [queues, setQueues] = useState<QueueItem[]>(getStoredQueues);
  const [schedules, setSchedules] = useState<ServiceSchedule[]>(getStoredSchedules);
  const [profile, setProfile] = useState<AdminProfile>(getStoredProfile);
  const [sound, setSound] = useState<SoundSettings>(getStoredSound);

  // Modal states
  const [printModalQueue, setPrintModalQueue] = useState<QueueItem | null>(null);
  const [detailModalQueue, setDetailModalQueue] = useState<QueueItem | null>(null);
  const [showTvDisplay, setShowTvDisplay] = useState(false);

  // Synchronize state with LocalStorage
  useEffect(() => {
    savePatients(patients);
  }, [patients]);

  useEffect(() => {
    saveQueues(queues);
  }, [queues]);

  useEffect(() => {
    saveSchedules(schedules);
  }, [schedules]);

  // Auth Handlers
  const handleLoginSuccess = (user: string) => {
    setAuthSession(true, user);
    setIsAuthenticated(true);
    setCurrentTab('dashboard');
  };

  const handleLogout = () => {
    setAuthSession(false, null);
    setIsAuthenticated(false);
    setIsMobileMenuOpen(false);
  };

  // Queue Operations
  const handleCallQueue = (queue: QueueItem) => {
    setQueues((prev) =>
      prev.map((q) => {
        if (q.id === queue.id) {
          return {
            ...q,
            status: 'dipanggil',
            panggilanKe: (q.panggilanKe || 0) + 1,
          };
        }
        // if another queue was 'dipanggil', keep it or leave as is
        return q;
      })
    );
  };

  const handleCompleteQueue = (queueId: string) => {
    setQueues((prev) =>
      prev.map((q) => (q.id === queueId ? { ...q, status: 'selesai' } : q))
    );
  };

  const handleSkipQueue = (queueId: string) => {
    setQueues((prev) =>
      prev.map((q) => (q.id === queueId ? { ...q, status: 'dilewati' } : q))
    );
  };

  const handleNextQueue = () => {
    // Find first waiting queue
    const nextQueue = queues.find((q) => q.status === 'menunggu');
    if (nextQueue) {
      handleCallQueue(nextQueue);
      announceQueue(nextQueue.noAntrean, nextQueue.namaPasien, nextQueue.jenisPelayanan, {
        playChime: sound.chimeEnabled,
        speechRate: sound.speechRate,
        volume: sound.volume,
      });
    }
  };

  const handleAddQueue = (patientId: string, service: ServiceType, notes?: string) => {
    const patient = patients.find((p) => p.id === patientId);
    if (!patient) return;

    // Generate next queue number, e.g. A017, A018
    const maxNum = queues.reduce((max, item) => {
      const match = item.noAntrean.match(/\d+/);
      const num = match ? parseInt(match[0], 10) : 0;
      return num > max ? num : max;
    }, 16);

    const nextNumberStr = `A${String(maxNum + 1).padStart(3, '0')}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toISOString().split('T')[0];

    const newQueue: QueueItem = {
      id: `q-${Date.now()}`,
      noAntrean: nextNumberStr,
      patientId: patient.id,
      namaPasien: patient.nama,
      jenisPelayanan: service,
      waktuDaftar: timeStr,
      tanggal: dateStr,
      status: 'menunggu',
      catatan: notes,
    };

    setQueues((prev) => [...prev, newQueue]);
    setPrintModalQueue(newQueue);
  };

  // Patient Operations
  const handleAddPatient = (patientData: Omit<Patient, 'id' | 'tanggalDaftar'>) => {
    const newPatient: Patient = {
      ...patientData,
      id: `p-${Date.now()}`,
      tanggalDaftar: new Date().toISOString().split('T')[0],
    };
    setPatients((prev) => [newPatient, ...prev]);
  };

  const handleUpdatePatient = (updated: Patient) => {
    setPatients((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    // Also update existing queues for this patient
    setQueues((prev) =>
      prev.map((q) =>
        q.patientId === updated.id ? { ...q, namaPasien: updated.nama } : q
      )
    );
  };

  const handleDeletePatient = (patientId: string) => {
    setPatients((prev) => prev.filter((p) => p.id !== patientId));
  };

  const handleRegisterQueueForPatient = (patient: Patient, service: ServiceType) => {
    handleAddQueue(patient.id, service);
  };

  // Schedule Operations
  const handleAddSchedule = (scheduleData: Omit<ServiceSchedule, 'id'>) => {
    const newSchedule: ServiceSchedule = {
      ...scheduleData,
      id: `sch-${Date.now()}`,
    };
    setSchedules((prev) => [...prev, newSchedule]);
  };

  const handleUpdateSchedule = (updated: ServiceSchedule) => {
    setSchedules((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const handleDeleteSchedule = (id: string) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
  };

  // Settings & Reset
  const handleSaveProfile = (updatedProfile: AdminProfile) => {
    setProfile(updatedProfile);
    saveProfile(updatedProfile);
  };

  const handleSaveSound = (updatedSound: SoundSettings) => {
    setSound(updatedSound);
    saveSound(updatedSound);
  };

  const handleResetData = () => {
    resetAllDataToDefault();
    setPatients(getStoredPatients());
    setQueues(getStoredQueues());
    setSchedules(getStoredSchedules());
    setProfile(getStoredProfile());
    setSound(getStoredSound());
  };

  const handleTestSound = () => {
    playClinicChime(sound.volume);
  };

  // 1. If not authenticated, render Login Screen (per user request)
  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  // 2. Fullscreen Waiting Room TV Display mode
  if (showTvDisplay) {
    return (
      <LayarAntreanTV
        queues={queues}
        profile={profile}
        soundSettings={sound}
        onClose={() => setShowTvDisplay(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F2FBFB] text-slate-800 flex font-['Poppins',sans-serif]">
      {/* Sidebar matching reference image 2 */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onLogout={handleLogout}
        onOpenTvDisplay={() => setShowTvDisplay(true)}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          {/* Header matching reference image 2 */}
          <Header
            admin={profile}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
            onLogout={handleLogout}
            onTestSound={handleTestSound}
          />

          {/* Views switch */}
          {currentTab === 'dashboard' && (
            <DashboardView
              queues={queues}
              patients={patients}
              soundSettings={sound}
              onCallQueue={handleCallQueue}
              onCompleteQueue={handleCompleteQueue}
              onSkipQueue={handleSkipQueue}
              onNextQueue={handleNextQueue}
              onViewAllQueues={() => setCurrentTab('antrean')}
              onPrintTicket={(queue) => setPrintModalQueue(queue)}
              onSelectQueueDetail={(queue) => setDetailModalQueue(queue)}
            />
          )}

          {currentTab === 'pasien' && (
            <DataPasienView
              patients={patients}
              onAddPatient={handleAddPatient}
              onUpdatePatient={handleUpdatePatient}
              onDeletePatient={handleDeletePatient}
              onRegisterQueueForPatient={handleRegisterQueueForPatient}
            />
          )}

          {currentTab === 'antrean' && (
            <DataAntreanView
              queues={queues}
              patients={patients}
              soundSettings={sound}
              onAddQueue={handleAddQueue}
              onCallQueue={handleCallQueue}
              onCompleteQueue={handleCompleteQueue}
              onSkipQueue={handleSkipQueue}
              onPrintTicket={(queue) => setPrintModalQueue(queue)}
            />
          )}

          {currentTab === 'jadwal' && (
            <JadwalPelayananView
              schedules={schedules}
              onAddSchedule={handleAddSchedule}
              onUpdateSchedule={handleUpdateSchedule}
              onDeleteSchedule={handleDeleteSchedule}
            />
          )}

          {currentTab === 'laporan' && (
            <LaporanAntreanView queues={queues} patients={patients} />
          )}

          {currentTab === 'pengaturan' && (
            <PengaturanView
              profile={profile}
              sound={sound}
              onSaveProfile={handleSaveProfile}
              onSaveSound={handleSaveSound}
              onResetData={handleResetData}
            />
          )}
        </main>
      </div>

      {/* Thermal Ticket Print Modal */}
      {printModalQueue && (
        <TicketPrintModal
          queue={printModalQueue}
          profile={profile}
          onClose={() => setPrintModalQueue(null)}
        />
      )}

      {/* Patient Detail Modal */}
      {detailModalQueue && (
        <PatientDetailModal
          queue={detailModalQueue}
          patient={patients.find((p) => p.id === detailModalQueue.patientId)}
          onClose={() => setDetailModalQueue(null)}
          onPrintTicket={(q) => {
            setDetailModalQueue(null);
            setPrintModalQueue(q);
          }}
          onCallQueue={(q) => {
            handleCallQueue(q);
            announceQueue(q.noAntrean, q.namaPasien, q.jenisPelayanan, {
              playChime: sound.chimeEnabled,
              speechRate: sound.speechRate,
              volume: sound.volume,
            });
          }}
        />
      )}
    </div>
  );
}
