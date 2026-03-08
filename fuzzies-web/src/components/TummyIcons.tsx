import React from 'react';
import type { Species } from '../store';

const Snowflake = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="32" y1="4" x2="32" y2="60" stroke="#a8d8ea" strokeWidth="5" strokeLinecap="round"/>
    <line x1="4" y1="32" x2="60" y2="32" stroke="#a8d8ea" strokeWidth="5" strokeLinecap="round"/>
    <line x1="11.5" y1="11.5" x2="52.5" y2="52.5" stroke="#a8d8ea" strokeWidth="5" strokeLinecap="round"/>
    <line x1="52.5" y1="11.5" x2="11.5" y2="52.5" stroke="#a8d8ea" strokeWidth="5" strokeLinecap="round"/>
    {/* arm nubs */}
    <line x1="22" y1="12" x2="32" y2="22" stroke="#a8d8ea" strokeWidth="3.5" strokeLinecap="round"/>
    <line x1="42" y1="12" x2="32" y2="22" stroke="#a8d8ea" strokeWidth="3.5" strokeLinecap="round"/>
    <line x1="52" y1="22" x2="42" y2="32" stroke="#a8d8ea" strokeWidth="3.5" strokeLinecap="round"/>
    <line x1="52" y1="42" x2="42" y2="32" stroke="#a8d8ea" strokeWidth="3.5" strokeLinecap="round"/>
    <line x1="42" y1="52" x2="32" y2="42" stroke="#a8d8ea" strokeWidth="3.5" strokeLinecap="round"/>
    <line x1="22" y1="52" x2="32" y2="42" stroke="#a8d8ea" strokeWidth="3.5" strokeLinecap="round"/>
    <line x1="12" y1="42" x2="22" y2="32" stroke="#a8d8ea" strokeWidth="3.5" strokeLinecap="round"/>
    <line x1="12" y1="22" x2="22" y2="32" stroke="#a8d8ea" strokeWidth="3.5" strokeLinecap="round"/>
    <circle cx="32" cy="32" r="5" fill="#a8d8ea"/>
  </svg>
);

const Heart = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 54 C32 54 8 38 8 22 C8 14 14 8 22 8 C26.5 8 30.5 10.5 32 14 C33.5 10.5 37.5 8 42 8 C50 8 56 14 56 22 C56 38 32 54 32 54Z"
      fill="#ff7eb3" stroke="#ff4da6" strokeWidth="2"/>
  </svg>
);

const Spiral = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 32 C32 32 32 20 44 20 C56 20 56 32 56 32 C56 44 44 44 32 44 C20 44 20 32 20 32 C20 20 28 16 32 16 C42 16 48 24 48 32 C48 40 40 46 32 46 C24 46 18 38 18 32"
      stroke="#9b59b6" strokeWidth="4" strokeLinecap="round" fill="none"/>
    <circle cx="32" cy="32" r="3" fill="#9b59b6"/>
  </svg>
);

const IceCream = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* cone */}
    <path d="M24 38 L32 58 L40 38Z" fill="#c8860a" stroke="#a06800" strokeWidth="1.5" strokeLinejoin="round"/>
    {/* scoops */}
    <circle cx="32" cy="30" r="12" fill="#ffb3c6"/>
    <circle cx="22" cy="36" r="9" fill="#ff8fab"/>
    <circle cx="42" cy="36" r="9" fill="#ffccd5"/>
    {/* shine */}
    <circle cx="28" cy="26" r="2.5" fill="white" opacity="0.6"/>
  </svg>
);

const TV = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* antenna */}
    <line x1="24" y1="12" x2="32" y2="20" stroke="#888" strokeWidth="3" strokeLinecap="round"/>
    <line x1="40" y1="12" x2="32" y2="20" stroke="#888" strokeWidth="3" strokeLinecap="round"/>
    {/* body */}
    <rect x="10" y="20" width="44" height="32" rx="4" fill="#d0d0d0" stroke="#aaa" strokeWidth="2"/>
    {/* screen */}
    <rect x="14" y="24" width="32" height="22" rx="2" fill="#3a3a6e"/>
    {/* buttons */}
    <circle cx="51" cy="30" r="2" fill="#aaa"/>
    <circle cx="51" cy="38" r="2" fill="#aaa"/>
    {/* legs */}
    <rect x="18" y="52" width="6" height="5" rx="1" fill="#bbb"/>
    <rect x="40" y="52" width="6" height="5" rx="1" fill="#bbb"/>
  </svg>
);

const Palette = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 8 C18 8 8 18 8 30 C8 40 16 48 26 50 C28 50.5 30 49 30 47 C30 45 31 44 32 44 C44 44 56 36 56 24 C56 14.5 45 8 32 8Z"
      fill="#f5e6d3" stroke="#d4a97a" strokeWidth="2"/>
    <circle cx="20" cy="24" r="4" fill="#ff6b6b"/>
    <circle cx="28" cy="16" r="4" fill="#ffd93d"/>
    <circle cx="38" cy="16" r="4" fill="#6bcb77"/>
    <circle cx="46" cy="24" r="4" fill="#4d96ff"/>
    <circle cx="44" cy="34" r="4" fill="#ff6bce"/>
    <circle cx="34" cy="40" r="3" fill="#9b59b6"/>
    {/* thumb hole */}
    <circle cx="42" cy="44" r="5" fill="white" stroke="#d4a97a" strokeWidth="2"/>
  </svg>
);

const ICONS: Record<Species, React.FC> = {
  ice: Snowflake,
  heart: Heart,
  hypno: Spiral,
  icecream: IceCream,
  tv: TV,
  paint: Palette,
};

interface TummyIconProps {
  species: Species;
}

export const TummyIcon: React.FC<TummyIconProps> = ({ species }) => {
  const Icon = ICONS[species];
  return <Icon />;
};
