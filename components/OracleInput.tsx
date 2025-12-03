import React, { useState } from 'react';
import { OracleState } from '../types';

interface OracleInputProps {
  onAsk: (question: string) => void;
  state: OracleState;
  placeholder: string;
  buttonText: string;
}

export const OracleInput: React.FC<OracleInputProps> = ({ onAsk, state, placeholder, buttonText }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && state !== OracleState.THINKING) {
      onAsk(question);
    }
  };

  const isThinking = state === OracleState.THINKING;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg relative z-20 mx-auto">
      <div className="relative group transition-all duration-300 transform hover:scale-[1.01]">
        {/* Soft Outer Glow on Hover */}
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
        
        {/* Glass Pill Container */}
        <div className="relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1.5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={isThinking}
            placeholder={placeholder}
            className="flex-1 bg-transparent px-6 py-3 text-base text-white placeholder-white/40 focus:outline-none font-mono font-light tracking-wide disabled:opacity-50"
          />
          
          <button
            type="submit"
            disabled={!question.trim() || isThinking}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-full transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed font-serif text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            {isThinking ? (
              <span className="animate-pulse">...</span>
            ) : (
              buttonText
            )}
          </button>
        </div>
      </div>
    </form>
  );
};