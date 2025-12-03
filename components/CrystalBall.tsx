import React from 'react';
import { OracleState } from '../types';

interface CrystalBallProps {
  state: OracleState;
}

export const CrystalBall: React.FC<CrystalBallProps> = ({ state }) => {
  const getInnerGlow = () => {
    switch (state) {
      case OracleState.THINKING: return 'from-purple-500/40 via-fuchsia-400/20 to-transparent';
      case OracleState.REVEALED: return 'from-pink-400/40 via-purple-400/20 to-transparent';
      case OracleState.ERROR: return 'from-red-500/40 via-orange-400/20 to-transparent';
      default: return 'from-indigo-500/30 via-purple-500/10 to-transparent';
    }
  };

  return (
    <div className="relative w-72 h-72 mx-auto mb-10 flex items-center justify-center animate-float">
      {/* Ambient Back Glow - Soft & Ethereal */}
      <div className={`absolute inset-0 rounded-full blur-[60px] transition-colors duration-1000 opacity-60
        ${state === OracleState.ERROR ? 'bg-red-900' : 'bg-indigo-900'}
        ${state === OracleState.THINKING ? 'scale-125' : 'scale-100'}
      `}></div>
      
      {/* The Sphere */}
      <div className="relative w-56 h-56 rounded-full backdrop-blur-sm shadow-[inset_0_0_40px_rgba(255,255,255,0.15)] border border-white/10 flex items-center justify-center overflow-hidden transition-all duration-700">
        
        {/* Glass Surface Reflection */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-50 z-20"></div>
        <div className="absolute top-8 left-10 w-16 h-8 rounded-[100%] bg-white blur-md opacity-20 z-20 rotate-[-15deg]"></div>

        {/* Inner Moving Nebula */}
        <div className={`absolute inset-0 bg-gradient-to-t ${getInnerGlow()} transition-all duration-1000 z-10 animate-breathing`}></div>
        
        {/* Core Eye/Symbol */}
        <div className={`relative z-30 transition-all duration-700 ${state === OracleState.THINKING ? 'scale-110 opacity-80' : 'scale-100 opacity-60'}`}>
          {state === OracleState.THINKING ? (
            <div className="relative">
              <div className="absolute inset-0 bg-white/50 blur-lg rounded-full animate-ping"></div>
              <svg className="w-16 h-16 text-white animate-spin-slow drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
          ) : (
             <svg className={`w-14 h-14 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-1000 ${state === OracleState.REVEALED ? 'text-pink-200' : 'text-indigo-200'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
               <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
               <circle cx="12" cy="12" r="3" />
               <path d="M12 9v.01" />
               <path d="M12 15v.01" />
             </svg>
          )}
        </div>
      </div>
    </div>
  );
};