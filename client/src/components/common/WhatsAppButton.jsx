import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const phoneNumber = '917050199763';
  const defaultMessage = encodeURIComponent(
    'Hi Prasanjeet, I reviewed your developer portfolio and would like to discuss an opportunity / project.'
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip on hover */}
      {hovered && (
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121118]/90 border border-emerald-500/30 text-emerald-300 text-xs shadow-lg backdrop-blur-md animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Quick Chat on WhatsApp</span>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Direct WhatsApp Chat with Prasanjeet"
        className="w-13 h-13 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white flex items-center justify-center shadow-[0_8px_25px_rgba(16,185,129,0.45)] hover:shadow-[0_10px_30px_rgba(16,185,129,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
      >
        <MessageCircle className="w-6 h-6 transition-transform group-hover:rotate-6" />
      </a>
    </div>
  );
}
