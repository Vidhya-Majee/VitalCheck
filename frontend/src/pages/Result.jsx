import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';
import PageBackground from '../components/PageBackground';
import PulseLine from '../components/PulseLine';

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <PageBackground>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-vital-ink/5 p-8 text-center max-w-sm">
            <p className="font-body text-vital-ink/60 mb-4">No result to show. Please submit the form first.</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-vital-deep text-white font-body font-medium px-5 py-2.5 rounded-xl"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </PageBackground>
    );
  }

  const isHighRisk = result.category === 'High Risk';
  const accentColor = isHighRisk ? 'vital-red' : 'vital-teal';
  const pct = (result.probability * 100).toFixed(1);

  return (
    <PageBackground>
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-xl shadow-vital-deep/5 border border-vital-ink/5 overflow-hidden">
            {/* Header */}
            <div className={`px-8 pt-10 pb-8 text-center relative overflow-hidden
                            ${isHighRisk ? 'bg-gradient-to-br from-vital-red to-vital-coral' : 'bg-gradient-to-br from-vital-teal to-vital-deep'}`}>
              <div className="absolute inset-0 opacity-[0.08]"
                   style={{
                     backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                     backgroundSize: '20px 20px',
                   }} />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  {isHighRisk ? (
                    <AlertTriangle className="text-white" size={30} />
                  ) : (
                    <CheckCircle2 className="text-white" size={30} />
                  )}
                </div>
                <p className="font-body text-white/70 text-sm uppercase tracking-wide mb-1">Your Result</p>
                <h1 className="font-display text-3xl font-semibold text-white">
                  {result.category}
                </h1>
              </div>
            </div>

            {/* Probability */}
            <div className="px-8 py-8 text-center">
              <p className="font-mono text-5xl font-semibold" style={{ color: isHighRisk ? '#E1483D' : '#2DD4B4' }}>
                {pct}%
              </p>
              <p className="font-body text-sm text-vital-ink/50 mt-1 mb-6">estimated probability</p>

              {/* Probability bar */}
              <div className="h-2.5 bg-vital-ink/5 rounded-full overflow-hidden mb-8">
                <div
                  className={`h-full rounded-full ${isHighRisk ? 'bg-vital-red' : 'bg-vital-teal'}`}
                  style={{ width: `${pct}%`, transition: 'width 1s ease-out' }}
                />
              </div>

              <PulseLine
                color={isHighRisk ? '#E1483D' : '#2DD4B4'}
                glow
                className="h-10 w-full mb-6"
              />

              <div className="bg-vital-ink/5 rounded-xl px-4 py-3 mb-6">
                <p className="font-body text-xs text-vital-ink/50 leading-relaxed">
                  This is not a medical diagnosis. Please consult a doctor for proper evaluation.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 flex items-center justify-center gap-2 bg-vital-deep text-white font-body font-medium py-3 rounded-xl
                             hover:bg-vital-deep/90 active:scale-[0.98] transition-all"
                >
                  <ArrowLeft size={16} />
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/history')}
                  className="flex-1 flex items-center justify-center gap-2 bg-vital-ink/5 text-vital-ink font-body font-medium py-3 rounded-xl
                             hover:bg-vital-ink/10 active:scale-[0.98] transition-all"
                >
                  <RefreshCw size={16} />
                  History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageBackground>
  );
}

export default Result;