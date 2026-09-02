function PageBackground({ children }) {
  return (
    <div className="min-h-screen bg-vital-bg relative overflow-hidden">
      {/* Soft blurred color blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-vital-teal/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-vital-coral/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-vital-deep/10 blur-3xl pointer-events-none" />

      {/* Subtle dot texture */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none"
           style={{
             backgroundImage: 'radial-gradient(circle, rgba(11,61,58,0.06) 1px, transparent 1px)',
             backgroundSize: '28px 28px',
           }} />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default PageBackground;