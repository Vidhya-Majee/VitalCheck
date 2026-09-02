function PulseLine({ color = '#FF6B5E', glow = false, className = '' }) {
  const points = "0,30 60,30 75,10 90,50 105,30 140,30 155,15 170,45 185,30 400,30";
  return (
    <svg viewBox="0 0 400 60" className={className} preserveAspectRatio="none">
      {glow && (
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="100"
          opacity="0.35"
          style={{
            strokeDasharray: 100,
            strokeDashoffset: 100,
            filter: 'blur(4px)',
            animation: 'pulse-draw 2.5s ease-in-out infinite',
          }}
        />
      )}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="100"
        style={{
          strokeDasharray: 100,
          strokeDashoffset: 100,
          animation: 'pulse-draw 2.5s ease-in-out infinite',
        }}
      />
    </svg>
  );
}

export default PulseLine;