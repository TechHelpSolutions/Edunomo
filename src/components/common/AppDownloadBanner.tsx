import React from 'react';
import { Smartphone, QrCode, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface AppDownloadBannerProps {
  title?: string;
  subtitle?: string;
  variant?: 'card' | 'hero' | 'inline';
  showQr?: boolean;
}

export const AppDownloadBanner: React.FC<AppDownloadBannerProps> = ({
  title = 'Download the Edunomo app to book your ride.',
  subtitle = 'Get real-time flight tracking, live airport chauffeur dispatch, transparent fixed fares, and automated receipts directly in the mobile app.',
  variant = 'card',
  showQr = true,
}) => {
  const { showToast } = useToast();

  const handleStoreClick = (storeName: string) => {
    showToast(`Edunomo for ${storeName} is launching soon. Official store links will be connected upon store deployment.`, 'info');
  };

  return (
    <div
      id="download-app"
      className={`relative overflow-hidden rounded-3xl border transition-all ${
        variant === 'hero'
          ? 'bg-gradient-to-br from-[#0A1D44] via-[#0D2A68] to-[#1E3A8A] text-white p-8 sm:p-12 border-blue-900 shadow-xl'
          : variant === 'inline'
          ? 'bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 sm:p-8 border-blue-800 shadow-md'
          : 'bg-white text-slate-900 p-6 sm:p-10 border-slate-200/90 shadow-md'
      }`}
    >
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Text Content */}
        <div className={showQr ? 'lg:col-span-8 space-y-4' : 'lg:col-span-12 space-y-4'}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 text-xs font-bold text-sky-400 border border-blue-400/20 backdrop-blur-md">
            <Smartphone className="w-3.5 h-3.5" />
            <span>App-First Student Experience</span>
          </div>

          <h3 className={`text-2xl sm:text-3xl font-black tracking-tight leading-tight ${
            variant === 'hero' || variant === 'inline' ? 'text-white' : 'text-slate-900'
          }`}>
            {title}
          </h3>

          <p className={`text-xs sm:text-sm leading-relaxed max-w-2xl ${
            variant === 'hero' || variant === 'inline' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            {[
              'Airport Meet & Greet',
              'University Direct Drop',
              'Verified Police Checks',
              'Real-Time Live Tracking',
            ].map((feature, idx) => (
              <span
                key={idx}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5 ${
                  variant === 'hero' || variant === 'inline'
                    ? 'bg-white/10 text-slate-200 border border-white/10'
                    : 'bg-slate-100 text-slate-700 border border-slate-200/60'
                }`}
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                {feature}
              </span>
            ))}
          </div>

          {/* Store Download Buttons */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            {/* Google Play Button */}
            <button
              type="button"
              onClick={() => handleStoreClick('Google Play')}
              className="group flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-black hover:bg-slate-900 text-white font-semibold transition-all shadow-md hover:scale-[1.02] border border-white/10 text-left cursor-pointer"
              title="Download on Google Play Store"
            >
              <svg className="w-6 h-6 shrink-0 fill-current text-white" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 0 1-.61-.926V2.74c.16-.36.377-.678.61-.926zm11.246 11.246l2.36 2.36-12.012 6.94a1.88 1.88 0 0 0 .973.197c.507 0 1.015-.147 1.48-.426l9.199-5.32 3.003-1.751zm0-2.12L5.656 3.66a2.91 2.91 0 0 0-1.48-.426c-.347 0-.687.072-.973.197l12.012 6.94-2.36 2.36zm1.06 1.06l3.414 1.977c1.196.693 1.196 1.83 0 2.523l-3.414 1.977-2.12-2.12 2.12-2.357z"/>
              </svg>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block leading-none">
                  GET IT ON
                </span>
                <span className="text-sm font-extrabold text-white block mt-0.5 leading-tight">
                  Google Play
                </span>
              </div>
            </button>

            {/* Apple App Store Button */}
            <button
              type="button"
              onClick={() => handleStoreClick('Apple App Store')}
              className="group flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-black hover:bg-slate-900 text-white font-semibold transition-all shadow-md hover:scale-[1.02] border border-white/10 text-left cursor-pointer"
              title="Download on Apple App Store"
            >
              <svg className="w-6 h-6 shrink-0 fill-current text-white" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.64 1.36-.57.65-.96 1.7-0.82 2.72 1.01.08 2.03-.51 2.54-1.23z"/>
              </svg>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block leading-none">
                  Download on the
                </span>
                <span className="text-sm font-extrabold text-white block mt-0.5 leading-tight">
                  App Store
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* QR Code / Phone Graphic Preview */}
        {showQr && (
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className={`p-4 rounded-3xl border text-center shadow-md backdrop-blur-md max-w-[220px] w-full ${
              variant === 'hero' || variant === 'inline'
                ? 'bg-white/10 border-white/20 text-white'
                : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}>
              <div className="bg-white p-3 rounded-2xl inline-block shadow-inner mb-2.5">
                <QrCode className="w-28 h-28 text-slate-900 mx-auto" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider block">
                Scan to Install App
              </span>
              <span className={`text-[11px] block mt-0.5 ${
                variant === 'hero' || variant === 'inline' ? 'text-slate-300' : 'text-slate-500'
              }`}>
                iOS & Android Ready
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};