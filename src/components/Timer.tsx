interface TimerProps {
  timeLeft: number;
  maxTime: number;
}

export function Timer({ timeLeft, maxTime }: TimerProps) {
  const percentage = (timeLeft / maxTime) * 100;
  const isLowTime = timeLeft <= 5;
  const isCritical = timeLeft <= 3;

  return (
    <div className="flex items-center space-x-3">
      <div className={`relative w-16 h-16 ${isCritical ? 'animate-bounce' : ''}`}>
        {/* Background circle */}
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 32 32">
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
          />
          {/* Progress circle */}
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="none"
            stroke={isCritical ? "#dc2626" : isLowTime ? "#ef4444" : "#10b981"}
            strokeWidth={isCritical ? "3" : "2"}
            strokeLinecap="round"
            strokeDasharray="87.92"
            strokeDashoffset={87.92 - (87.92 * percentage) / 100}
            className={`transition-all duration-1000 ease-linear ${isCritical ? 'drop-shadow-lg' : ''}`}
          />
        </svg>
        
        {/* Time text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-lg font-bold transition-all duration-200 ${
            isCritical ? 'text-red-300 animate-pulse text-xl scale-110' : 
            isLowTime ? 'text-red-400 animate-pulse' : 
            'text-white'
          }`}>
            {timeLeft}
          </span>
        </div>
        
        {/* Warning glow effect */}
        {isCritical && (
          <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping"></div>
        )}
      </div>
      
      <div className={`text-sm transition-colors duration-300 ${
        isCritical ? 'text-red-300 font-semibold' :
        isLowTime ? 'text-red-400' :
        'text-white/80'
      }`}>
        seconds
      </div>
    </div>
  );
}
