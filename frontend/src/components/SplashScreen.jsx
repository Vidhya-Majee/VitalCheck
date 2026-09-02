import { useEffect, useState } from 'react';
import PulseLine from './PulseLine';

function SplashScreen({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 3200);
    const doneTimer = setTimeout(() => onFinish(), 3700);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-vital-deep overflow-hidden
                  transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="absolute inset-0 opacity-40"
           style={{
             background: 'radial-gradient(circle at 30% 20%, #2DD4B4 0%, transparent 50%), radial-gradient(circle at 80% 80%, #FF6B5E 0%, transparent 50%)',
           }} />
      <div className="absolute inset-0 opacity-[0.07]"
           style={{
             backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
             backgroundSize: '24px 24px',
           }} />

          <div className="relative z-10 text-center animate-fade-up">
        <h1 className="font-display text-7xl md:text-7xl font-semibold text-white tracking-tight mb-6">
          Vital<span className="text-vital-coral">Check</span>
        </h1>
        <PulseLine glow color="#FF6B5E" className="h-16 w-80 mx-auto" />
        <p className="font-body text-white/50 text-base mt-6 tracking-wide">
          AI-driven health risk screening
        </p>
      </div>
    </div>
  );
}

export default SplashScreen;