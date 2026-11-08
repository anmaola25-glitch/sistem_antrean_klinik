import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Activity, Stethoscope, Dna, Heart, ArrowRight, ShieldCheck } from 'lucide-react';
import { MedicalSymbolIcon, EcgWaveBackground, ClinicLogo } from './ClinicIllustration';

interface LoginScreenProps {
  onLoginSuccess: (username: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Harap masukkan username dan kata sandi.');
      return;
    }

    setIsLoading(true);

    // Simulating authentication
    setTimeout(() => {
      // Allow demo login
      if (
        (username.toLowerCase() === 'admin' || username.includes('@')) &&
        password.length >= 4
      ) {
        setIsLoading(false);
        onLoginSuccess(username);
      } else {
        setIsLoading(false);
        setErrorMessage('Username atau kata sandi tidak valid. Gunakan: admin / bidankanti123');
      }
    }, 850);
  };

  const handleQuickFill = () => {
    setUsername('admin');
    setPassword('bidankanti123');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen w-full bg-[#E5F7F8] flex items-center justify-center p-3 sm:p-6 md:p-8 font-['Poppins',sans-serif]">
      {/* Outer Rounded Container mirroring Image 1 */}
      <div className="relative w-full max-w-6xl h-full min-h-[700px] md:min-h-[760px] rounded-3xl md:rounded-[36px] overflow-hidden shadow-2xl border-4 border-white/60 flex flex-col justify-between bg-gradient-to-br from-[#128890] via-[#20A6AE] to-[#5CD2D9]">
        
        {/* Soft Ambient Radial Lights */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#82E6EC]/30 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-[#187A82]/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-1/3 w-80 h-80 rounded-full bg-white/20 blur-2xl pointer-events-none" />

        {/* Top Floating Glass Bubble (Heartbeat Rate) - Image 1 Reference */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-0 animate-float-bubble pointer-events-none hidden sm:block">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-center text-white/90">
            <Activity className="w-8 h-8 text-white drop-shadow" />
          </div>
        </div>

        {/* Left Floating Glass Bubble (DNA Helix) - Image 1 Reference */}
        <div className="absolute top-1/3 left-6 md:left-14 z-0 animate-float-bubble pointer-events-none">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-white/20 backdrop-blur-md border border-white/45 shadow-xl flex items-center justify-center text-white/95">
            <Dna className="w-12 h-12 md:w-16 md:h-16 text-white stroke-[1.5] -rotate-12 drop-shadow-md" />
          </div>
        </div>

        {/* Right Floating Glass Bubble (Stethoscope) - Image 1 Reference */}
        <div className="absolute top-1/2 right-6 md:right-14 z-0 animate-float-bubble-alt pointer-events-none">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-white/20 backdrop-blur-md border border-white/45 shadow-xl flex items-center justify-center text-white/95">
            <Stethoscope className="w-12 h-12 md:w-16 md:h-16 text-white stroke-[1.5] drop-shadow-md" />
          </div>
        </div>

        {/* Additional Small Ambient Bubble */}
        <div className="absolute bottom-32 left-28 z-0 animate-float-bubble pointer-events-none hidden lg:block">
          <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <Heart className="w-6 h-6 text-white/80 fill-white/40" />
          </div>
        </div>

        {/* Top Header Bar inside Frame */}
        <header className="relative z-20 flex items-center justify-between px-6 py-5 md:px-10">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
            <span className="text-white/90 text-xs md:text-sm font-semibold tracking-wide uppercase drop-shadow">
              Klinik Bidan Kanti • Portal Admin
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Pill Selector (mirrors En pill in Image 1) */}
            <div className="flex items-center bg-white/25 backdrop-blur-md border border-white/40 rounded-full px-3 py-1.5 text-xs font-semibold text-white shadow-sm cursor-pointer hover:bg-white/35 transition">
              <span className="mr-1.5">{lang === 'id' ? '🇮🇩' : '🇺🇸'}</span>
              <span>{lang === 'id' ? 'ID' : 'EN'}</span>
              <button
                type="button"
                onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
                className="ml-1 text-white/80 hover:text-white"
                title="Ganti Bahasa"
              >
                ▾
              </button>
            </div>

            {/* Shield / Security Indicator */}
            <div className="w-8 h-8 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-sm">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
        </header>

        {/* Center Login Card Container */}
        <main className="relative z-20 flex items-center justify-center px-4 py-4 md:py-8 my-auto">
          {/* Glassmorphic White Card matching Image 1 */}
          <div className="w-full max-w-[430px] rounded-3xl md:rounded-[32px] bg-white/95 backdrop-blur-xl p-7 sm:p-9 shadow-2xl border border-white/80 transition-all duration-300">
            
            {/* Top Medical Cross Symbol / Logo from Reference Image 1 */}
            <div className="flex justify-center mb-2">
              <MedicalSymbolIcon className="w-16 h-16 drop-shadow-sm" />
            </div>

            {/* Title & Subtitle */}
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-[26px] font-bold text-slate-800 tracking-tight">
                {lang === 'id' ? 'Selamat Datang Kembali!' : 'Welcome Back!'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                Sistem Informasi Antrean Klinik Bidan Kanti
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium text-center animate-shake">
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username / Email Field */}
              <div>
                <label className="block text-xs font-semibold text-[#087D86] mb-1">
                  {lang === 'id' ? 'Username atau Email Admin' : 'Email or Username'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan username atau email admin"
                    required
                    className="w-full px-3.5 py-2.5 pr-10 text-sm bg-slate-50/80 border-b-2 border-slate-200 hover:border-[#20A6AE] focus:border-[#20A6AE] focus:bg-white rounded-t-lg transition outline-none text-slate-800 placeholder:text-slate-400 font-medium"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <User className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-semibold text-[#087D86] mb-1">
                  {lang === 'id' ? 'Kata Sandi' : 'Password'}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi"
                    required
                    className="w-full px-3.5 py-2.5 pr-10 text-sm bg-slate-50/80 border-b-2 border-slate-200 hover:border-[#20A6AE] focus:border-[#20A6AE] focus:bg-white rounded-t-lg transition outline-none text-slate-800 placeholder:text-slate-400 font-medium tracking-wider"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label="Toggle password"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#20A6AE] border-slate-300 focus:ring-[#20A6AE] cursor-pointer accent-[#20A6AE]"
                  />
                  <span>{lang === 'id' ? 'Ingat Saya' : 'Remember Me'}</span>
                </label>

                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs font-medium text-[#20A6AE] hover:text-[#087D86] hover:underline"
                >
                  {lang === 'id' ? 'Lupa Password?' : 'Forgot Password?'}
                </button>
              </div>

              {/* Wide Turquoise Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-3 py-3 px-4 rounded-xl bg-gradient-to-r from-[#20A6AE] to-[#1BA1A9] hover:from-[#188F96] hover:to-[#147980] text-white font-bold text-sm tracking-wider uppercase shadow-lg shadow-teal-500/30 hover:shadow-teal-500/40 active:scale-[0.99] transition duration-200 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-wait"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Memverifikasi...</span>
                  </div>
                ) : (
                  <>
                    <span>{lang === 'id' ? 'MASUK KE SISTEM' : 'SIGN IN'}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>

              {/* Demo Section under form columns per user request */}
              <div className="pt-2 text-center">
                <div className="p-2.5 rounded-2xl bg-teal-50/70 border border-teal-100 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-[#087D86] font-semibold mb-1">
                    <span>💡 Akun Demo Admin:</span>
                    <button
                      type="button"
                      onClick={handleQuickFill}
                      className="px-2.5 py-0.5 rounded-full bg-[#20A6AE] hover:bg-[#188F96] text-white text-[10px] font-bold shadow-xs transition"
                    >
                      Klik Isi Otomatis
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-600 flex items-center justify-center gap-3 font-mono">
                    <span>User: <b className="text-slate-800">admin</b></span>
                    <span>•</span>
                    <span>Pass: <b className="text-slate-800">bidankanti123</b></span>
                  </div>
                </div>
              </div>

              {/* Subtle Clinic Slogan Footer inside card */}
              <div className="pt-3 border-t border-slate-100 text-center">
                <p className="text-[11px] text-slate-400 font-medium">
                  Klinik Bidan Kanti | Pelayanan Kesehatan Ibu dan Anak
                </p>
              </div>
            </form>
          </div>
        </main>

        {/* Bottom Translucent Hill & Animated ECG Line (matching Image 1) */}
        <div className="relative z-10 w-full overflow-hidden">
          {/* Overlapping Curved Hill */}
          <div className="relative w-full h-24 pointer-events-none">
            <svg
              viewBox="0 0 1200 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-0 w-full h-auto text-white/15"
              preserveAspectRatio="none"
            >
              <path
                d="M0 120C200 40 450 10 600 20C750 30 1000 80 1200 120V120H0Z"
                fill="currentColor"
              />
            </svg>
            <svg
              viewBox="0 0 1200 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-0 w-full h-auto text-white/20"
              preserveAspectRatio="none"
            >
              <path
                d="M0 120C300 70 500 30 700 40C900 50 1050 90 1200 120V120H0Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Running Heartbeat ECG Waveform at bottom */}
          <EcgWaveBackground className="absolute bottom-1 w-full" opacity={0.65} />

          {/* Bottom Copyright & Status Bar */}
          <div className="relative z-20 px-8 py-3 bg-[#087D86]/30 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/80 font-medium">
            <span>© 2025 Klinik Bidan Kanti. Hak Cipta Dilindungi.</span>
            <div className="flex items-center gap-4 mt-1 sm:mt-0">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                Server Online & Aktif
              </span>
              <span>Versi 2.4-Modern</span>
            </div>
          </div>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 text-center animate-fade-in">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#20A6AE] flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Bantuan Akses Admin</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Untuk keamanan rekam medis dan data antrean, pemulihan kata sandi dilakukan secara langsung oleh Koordinator Bidan Kanti.
            </p>
            <div className="mt-4 p-3 bg-teal-50/70 rounded-xl text-xs text-[#087D86] text-left">
              <p className="font-semibold">Akun Bawaan:</p>
              <p>Username: <code className="bg-white px-1.5 py-0.5 rounded border border-teal-200">admin</code></p>
              <p className="mt-1">Password: <code className="bg-white px-1.5 py-0.5 rounded border border-teal-200">bidankanti123</code></p>
            </div>
            <button
              onClick={() => setShowForgotModal(false)}
              className="mt-5 w-full py-2.5 bg-[#20A6AE] hover:bg-[#188F96] text-white rounded-xl text-xs font-bold transition shadow-md"
            >
              Mengerti & Kembali
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
