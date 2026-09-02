function YesNoToggle({ label, name, value, onChange, icon: Icon }) {
  return (
    <div>
      <label className="flex items-center gap-2 font-body text-sm font-medium text-vital-ink/70 mb-2">
        {Icon && (
          <span className={`w-7 h-7 rounded-lg flex items-center justify-center
            ${value === 1 ? 'bg-vital-coral/10 text-vital-coral' : 'bg-vital-ink/5 text-vital-ink/40'}`}>
            <Icon size={14} />
          </span>
        )}
        {label}
      </label>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onChange({ target: { name, value: 0 } })}
          className={`py-2.5 rounded-xl font-body text-sm font-medium border transition-all
            ${value === 0
              ? 'bg-vital-deep text-white border-vital-deep shadow-md'
              : 'bg-white text-vital-ink/50 border-vital-ink/10 hover:border-vital-ink/20'}`}
        >
          No
        </button>
        <button
          type="button"
          onClick={() => onChange({ target: { name, value: 1 } })}
          className={`py-2.5 rounded-xl font-body text-sm font-medium border transition-all
            ${value === 1
              ? 'bg-vital-coral text-white border-vital-coral shadow-md'
              : 'bg-white text-vital-ink/50 border-vital-ink/10 hover:border-vital-ink/20'}`}
        >
          Yes
        </button>
      </div>
    </div>
  );
}

export default YesNoToggle;