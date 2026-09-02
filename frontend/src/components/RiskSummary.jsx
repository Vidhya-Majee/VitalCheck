import { AlertTriangle, CheckCircle2 } from 'lucide-react';

function RiskSummary({ factors, color = 'teal' }) {
  const activeCount = factors.filter((f) => f.active).length;
  const colorClass = color === 'teal' ? 'vital-teal' : 'vital-coral';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-vital-ink/5 p-6 sticky top-6">
      <h3 className="font-display text-base font-semibold text-vital-ink mb-1">
        Live Summary
      </h3>
      <p className="font-body text-xs text-vital-ink/40 mb-5">
        Updates as you fill the form
      </p>

      <div className={`rounded-xl px-4 py-4 mb-5 bg-${colorClass}/8 border border-${colorClass}/15`}>
        <p className="font-mono text-3xl font-semibold" style={{ color: color === 'teal' ? '#2DD4B4' : '#FF6B5E' }}>
          {activeCount}
          <span className="text-sm text-vital-ink/40 font-body"> / {factors.length}</span>
        </p>
        <p className="font-body text-xs text-vital-ink/50 mt-1">risk factors flagged</p>
      </div>

      <div className="space-y-2.5">
        {factors.map((f, i) => (
          <div key={i} className="flex items-center gap-2.5">
            {f.active ? (
              <AlertTriangle size={15} className="text-vital-coral shrink-0" />
            ) : (
              <CheckCircle2 size={15} className="text-vital-teal/50 shrink-0" />
            )}
            <span className={`font-body text-xs ${f.active ? 'text-vital-ink font-medium' : 'text-vital-ink/40'}`}>
              {f.label}
            </span>
          </div>
        ))}
      </div>

      <p className="font-body text-[11px] text-vital-ink/30 mt-5 pt-4 border-t border-vital-ink/5 leading-relaxed">
        This is a live preview only — your actual risk score comes from the trained ML model after submitting.
      </p>
    </div>
  );
}

export default RiskSummary;