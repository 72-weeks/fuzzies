import { create } from 'zustand';

export type Color = 'blue' | 'pink' | 'green' | 'yellow' | 'purple' | 'orange';
export type Species = 'ice' | 'heart' | 'hypno' | 'icecream' | 'tv' | 'paint';
export type Hat = 'none' | 'cap' | 'magic' | 'helicopter';

interface FuzzyStore {
  color: Color;
  species: Species;
  hat: Hat;
  name: string;
  setColor: (color: Color) => void;
  setSpecies: (species: Species) => void;
  setHat: (hat: Hat) => void;
  setName: (name: string) => void;
}

export const useFuzzyStore = create<FuzzyStore>((set) => ({
  color: 'blue',
  species: 'ice',
  hat: 'none',
  name: '',
  setColor: (color) => set({ color }),
  setSpecies: (species) => set({ species }),
  setHat: (hat) => set({ hat }),
  setName: (name) => set({ name }),
}));
