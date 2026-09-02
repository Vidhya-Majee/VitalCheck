function NumberField({ label, name, value, onChange, min, max, hint, icon: Icon }) {
  return (
    <div>
      <label className="flex items-center gap-2 font-body text-sm font-medium text-vital-ink/70 mb-2">
        {Icon && <Icon size={16} className="text-vital-ink/40" />}
        {label}
      </label>
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className="w-full px-4 py-3 rounded-xl border border-vital-ink/10 bg-white font-mono text-vital-ink
                   shadow-sm focus:outline-none focus:ring-2 focus:ring-vital-teal/40 focus:border-vital-teal
                   transition-all"
      />
      {hint && <p className="font-body text-xs text-vital-ink/40 mt-1.5">{hint}</p>}
    </div>
  );
}

export default NumberField;