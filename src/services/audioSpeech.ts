/**
 * Audio chime and Indonesian speech synthesizer for clinic queue calls
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play gentle dual-tone hospital chime (Ding-Dong)
 */
export function playClinicChime(volume = 0.8): Promise<void> {
  return new Promise((resolve) => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // Note 1: E5 (659.25 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(659.25, now);
      
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.3 * volume, now + 0.05);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.75);

      // Note 2: C5 (523.25 Hz) slightly after
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(523.25, now + 0.35);

      gain2.gain.setValueAtTime(0, now + 0.35);
      gain2.gain.linearRampToValueAtTime(0.35 * volume, now + 0.4);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc2.start(now + 0.35);
      osc2.stop(now + 1.35);

      setTimeout(() => {
        resolve();
      }, 1200);
    } catch {
      resolve();
    }
  });
}

/**
 * Speak queue announcement in Indonesian using Web Speech API
 */
export async function announceQueue(
  noAntrean: string,
  namaPasien: string,
  service = 'Pemeriksaan',
  options: { playChime?: boolean; speechRate?: number; volume?: number } = {}
): Promise<void> {
  const { playChime = true, speechRate = 0.9, volume = 1.0 } = options;

  if (playChime) {
    await playClinicChime(volume);
  }

  if (!('speechSynthesis' in window)) {
    return;
  }

  window.speechSynthesis.cancel();

  // Spell number nicely: "A 0 1 2" -> "A kosong satu dua"
  const formattedNo = noAntrean
    .split('')
    .map((char) => {
      if (char === '0') return 'nol ';
      return char + ' ';
    })
    .join('');

  const textToSpeak = `Nomor antrean, ${formattedNo}, Ibu atau Saudara ${namaPasien}, silakan menuju ruang periksa Bidan Kanti untuk ${service}.`;

  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.lang = 'id-ID';
  utterance.rate = speechRate;
  utterance.pitch = 1.05;
  utterance.volume = volume;

  // Try to find an Indonesian voice if available
  const voices = window.speechSynthesis.getVoices();
  const idVoice = voices.find(
    (v) => v.lang.includes('id') || v.lang.includes('ID') || v.name.toLowerCase().includes('indonesia')
  );
  if (idVoice) {
    utterance.voice = idVoice;
  }

  window.speechSynthesis.speak(utterance);
}
