import React from 'react';

export default function Logo({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <img 
      src="/logo.jpg" 
      alt="Amajuba Economic Chamber Logo" 
      className={`object-contain rounded-full bg-white shadow-sm p-1 ${className}`} 
    />
  );
}
