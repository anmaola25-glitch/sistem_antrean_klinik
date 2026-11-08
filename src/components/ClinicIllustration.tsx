import React from 'react';

/**
 * High quality vector logo for Klinik Bidan Kanti
 * Showing loving mother embracing baby with heart accent
 */
export const ClinicLogo: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  theme?: 'dark' | 'light' | 'teal';
}> = ({ size = 'md', showSubtitle = true, theme = 'dark' }) => {
  const iconSize = size === 'sm' ? 36 : size === 'lg' ? 64 : 48;
  const titleClass =
    size === 'sm'
      ? 'text-base font-bold'
      : size === 'lg'
      ? 'text-2xl font-black tracking-tight'
      : 'text-lg font-extrabold tracking-tight';

  const subtitleClass = size === 'sm' ? 'text-[10px]' : 'text-xs';
  const textColor = theme === 'light' ? 'text-white' : 'text-[#087D86]';
  const subColor = theme === 'light' ? 'text-teal-100' : 'text-slate-500';

  return (
    <div className="flex items-center gap-3 select-none">
      <div
        className="relative flex items-center justify-center rounded-2xl bg-gradient-to-tr from-[#1E9FA7] to-[#5CD2D9] p-2 text-white shadow-md shadow-teal-500/20"
        style={{ width: iconSize, height: iconSize }}
      >
        {/* Mother & Baby Silhouette SVG */}
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white"
        >
          {/* Mother head */}
          <circle cx="21" cy="12" r="5" fill="currentColor" opacity="0.95" />
          {/* Mother body holding baby */}
          <path
            d="M12 36C12 28 17 21 24 21C27 21 31 23 33 26C31 27 29 29 29 32C29 36 33 38 35 38C33 41 29 43 24 43C17 43 12 40 12 36Z"
            fill="currentColor"
            opacity="0.9"
          />
          {/* Baby head */}
          <circle cx="34" cy="27" r="3.5" fill="currentColor" />
          {/* Baby wrap body */}
          <path
            d="M31 31C32 30 35 30 37 32C38 34 37 37 34 38C32 36 31 33 31 31Z"
            fill="currentColor"
          />
          {/* Sweet little heart */}
          <path
            d="M38 10C36.5 10 35.5 11 35 12C34.5 11 33.5 10 32 10C30 10 29 11.5 29 13.5C29 16 35 20 35 20C35 20 41 16 41 13.5C41 11.5 40 10 38 10Z"
            fill="#FF6584"
          />
        </svg>
      </div>

      <div>
        <h1 className={`${titleClass} ${textColor} leading-tight`}>
          Klinik <span className="text-[#20A6AE]">Bidan Kanti</span>
        </h1>
        {showSubtitle && (
          <p className={`${subtitleClass} ${subColor} font-medium`}>
            Sehat Bersama, Bahagia Selamanya
          </p>
        )}
      </div>
    </div>
  );
};

/**
 * Stylized Medical Cross symbol seen in Login reference (image 1)
 */
export const MedicalSymbolIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Soft cyan rounded cross glow */}
        <rect x="32" y="10" width="16" height="60" rx="8" fill="#DDF7F7" />
        <rect x="10" y="32" width="60" height="16" rx="8" fill="#DDF7F7" />
        {/* Gradient turquoise foreground cross */}
        <path
          d="M35 18C35 15.2386 37.2386 13 40 13C42.7614 13 45 15.2386 45 18V35H62C64.7614 35 67 37.2386 67 40C67 42.7614 64.7614 45 62 45H45V62C45 64.7614 42.7614 67 40 67C37.2386 67 35 64.7614 35 62V45H18C15.2386 45 13 42.7614 13 40C13 37.2386 15.2386 35 18 35H35V18Z"
          fill="url(#medicalCrossGrad)"
        />
        {/* Small sparkling circle */}
        <circle cx="40" cy="40" r="4" fill="white" />
        <defs>
          <linearGradient id="medicalCrossGrad" x1="13" y1="13" x2="67" y2="67" gradientUnits="userSpaceOnUse">
            <stop stopColor="#65D6DD" />
            <stop offset="1" stopColor="#1C979F" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

/**
 * Animated ECG Heartbeat waveform for background
 */
export const EcgWaveBackground: React.FC<{ className?: string; opacity?: number }> = ({
  className = '',
  opacity = 0.5,
}) => {
  return (
    <div className={`pointer-events-none select-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1200 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="none"
        style={{ opacity }}
      >
        <path
          d="M0 70 L250 70 L280 70 L295 40 L305 105 L320 20 L335 120 L350 55 L365 80 L380 70 L600 70 L630 70 L645 40 L655 105 L670 15 L685 125 L700 55 L715 80 L730 70 L950 70 L980 70 L995 40 L1005 105 L1020 20 L1035 120 L1050 55 L1065 80 L1080 70 L1200 70"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-ecg-pulse drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
        />
      </svg>
    </div>
  );
};

/**
 * Pregnant mother illustration banner matching reference image 2
 */
export const PregnantMotherBannerIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Soft background glow */}
      <circle cx="120" cy="110" r="75" fill="#EBF9FA" />
      <circle cx="70" cy="140" r="30" fill="#DDF7F7" opacity="0.6" />

      {/* Decorative leafy foliage */}
      <path
        d="M50 150C40 140 45 125 55 125C65 125 65 140 50 150Z"
        fill="#A1E4E7"
      />
      <path
        d="M60 165C45 160 48 145 60 145C72 145 70 160 60 165Z"
        fill="#73D7DC"
      />
      <path
        d="M180 155C195 145 190 130 180 130C170 130 170 145 180 155Z"
        fill="#A1E4E7"
      />
      <path
        d="M190 170C205 165 200 150 190 150C180 150 180 165 190 170Z"
        fill="#73D7DC"
      />

      {/* Floating little hearts */}
      <path
        d="M75 80C72 75 66 75 63 78C60 75 54 75 51 78C47 82 51 88 57 93L63 99L69 93C75 88 79 82 75 80Z"
        fill="#FF8FA3"
        opacity="0.8"
      />
      <path
        d="M175 70C172 66 168 66 165 68C163 66 158 66 156 68C153 71 156 76 161 80L165 84L170 80C174 76 177 71 175 70Z"
        fill="#FFB5C5"
        opacity="0.75"
      />

      {/* Hair (flowing dark chestnut) */}
      <path
        d="M125 45C110 42 98 52 95 68C93 80 97 98 100 115C102 124 105 130 108 135C102 120 100 100 104 85C108 72 118 64 125 64C135 64 142 70 142 82C142 95 138 105 136 120C142 108 145 92 144 80C143 62 138 48 125 45Z"
        fill="#4A3430"
      />

      {/* Face & Neck */}
      <path
        d="M123 60C132 60 137 66 137 74C137 82 131 89 124 89C117 89 113 82 113 74C113 66 117 60 123 60Z"
        fill="#FDDFD3"
      />
      {/* Gentle closed smile eye and blush */}
      <path d="M127 73C128 75 131 75 132 73" stroke="#875344" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="129" cy="78" r="3.5" fill="#FF859A" opacity="0.45" />

      {/* Dress (Soft Pink Pastel) */}
      <path
        d="M117 92C110 95 106 102 104 112L98 145C102 152 112 156 124 156C138 156 150 150 152 142L148 115C146 104 140 96 134 92H117Z"
        fill="#F7B2C2"
      />
      {/* Pregnant belly contour highlight */}
      <path
        d="M136 115C148 122 148 138 138 147C126 153 118 148 116 142C128 142 134 132 136 115Z"
        fill="#F29CB0"
        opacity="0.6"
      />

      {/* Tender hands resting on belly */}
      <path
        d="M125 125C129 123 135 126 138 132C136 136 130 138 124 135C122 131 123 127 125 125Z"
        fill="#FDDFD3"
      />
    </svg>
  );
};
