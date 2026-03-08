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

const Rainbow = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 48 A24 24 0 0 1 56 48" stroke="#ff6b6b" strokeWidth="5" strokeLinecap="round" fill="none"/>
    <path d="M13 48 A19 19 0 0 1 51 48" stroke="#ffa500" strokeWidth="5" strokeLinecap="round" fill="none"/>
    <path d="M18 48 A14 14 0 0 1 46 48" stroke="#ffd93d" strokeWidth="5" strokeLinecap="round" fill="none"/>
    <path d="M23 48 A9 9 0 0 1 41 48" stroke="#6bcb77" strokeWidth="5" strokeLinecap="round" fill="none"/>
    <path d="M28 48 A4 4 0 0 1 36 48" stroke="#4d96ff" strokeWidth="5" strokeLinecap="round" fill="none"/>
  </svg>
);

const Dragon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* flame */}
    <path d="M32 6 C28 18 18 22 18 34 C18 42 24 50 32 50 C40 50 46 42 46 34 C46 22 36 18 32 6Z"
      fill="#ff8c00" stroke="#ff4500" strokeWidth="2"/>
    <path d="M32 16 C30 24 24 28 24 36 C24 42 28 46 32 46 C36 46 40 42 40 36 C40 28 34 24 32 16Z"
      fill="#ffcc00"/>
    <path d="M32 28 C30 32 28 34 28 38 C28 42 30 44 32 44 C34 44 36 42 36 38 C36 34 34 32 32 28Z"
      fill="#fff5cc"/>
  </svg>
);

const ICONS: Record<Species, React.FC> = {
  ice: Snowflake,
  heart: Heart,
  hypno: Spiral,
  icecream: IceCream,
  tv: TV,
  rainbow: Rainbow,
  dragon: Dragon,
};

interface TummyIconProps {
  species: Species;
}

export const TummyIcon: React.FC<TummyIconProps> = ({ species }) => {
  const Icon = ICONS[species];
  return <Icon />;
};
