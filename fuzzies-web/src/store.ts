import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const BASE = import.meta.env.BASE_URL;
export const assetUrl = (path: string) => `${BASE}assets/${path}`;

export type Color = 'blue' | 'pink' | 'green' | 'yellow' | 'purple' | 'orange' | 'red';
export type Species = 'ice' | 'heart' | 'hypno' | 'icecream' | 'tv' | 'rainbow' | 'dragon';
export type Hat = 'none' | 'cap' | 'magic' | 'helicopter';

export interface FuzzyConfig {
  id: string;
  color: Color;
  species: Species;
  hat: Hat;
  name: string;
  position: { x: number; y: number };
  hatDetached: boolean;
  hatOffset: { x: number; y: number };
  detachedHatType: Hat;
  createdAt: number;
}

function createFuzzyConfig(): FuzzyConfig {
  return {
    id: crypto.randomUUID(),
    color: 'blue',
    species: 'ice',
    hat: 'none',
    name: '',
    position: { x: 0, y: 0 },
    hatDetached: false,
    hatOffset: { x: 0, y: 0 },
    detachedHatType: 'none',
    createdAt: Date.now(),
  };
}

interface FuzzyFamilyStore {
  fuzzies: FuzzyConfig[];
  activeFuzzyId: string | null;
  screen: 'splash' | 'editor';
  createFuzzy: () => void;
  deleteFuzzy: (id: string) => void;
  setActiveFuzzy: (id: string) => void;
  goToSplash: () => void;
  setColor: (color: Color) => void;
  setSpecies: (species: Species) => void;
  setHat: (hat: Hat) => void;
  setName: (name: string) => void;
  setPosition: (position: { x: number; y: number }) => void;
  setHatDetached: (detached: boolean) => void;
  setHatOffset: (offset: { x: number; y: number }) => void;
  setDetachedHatType: (hat: Hat) => void;
}

function updateActive(state: FuzzyFamilyStore, patch: Partial<FuzzyConfig>): Partial<FuzzyFamilyStore> {
  return {
    fuzzies: state.fuzzies.map((f) =>
      f.id === state.activeFuzzyId ? { ...f, ...patch } : f
    ),
  };
}

export const useFuzzyStore = create<FuzzyFamilyStore>()(
  persist(
    (set) => ({
      fuzzies: [],
      activeFuzzyId: null,
      screen: 'splash',

      createFuzzy: () =>
        set((state) => {
          const newFuzzy = createFuzzyConfig();
          return {
            fuzzies: [...state.fuzzies, newFuzzy],
            activeFuzzyId: newFuzzy.id,
            screen: 'editor',
          };
        }),

      deleteFuzzy: (id) =>
        set((state) => ({
          fuzzies: state.fuzzies.filter((f) => f.id !== id),
          activeFuzzyId: state.activeFuzzyId === id ? null : state.activeFuzzyId,
        })),

      setActiveFuzzy: (id) => set({ activeFuzzyId: id, screen: 'editor' }),
      goToSplash: () => set({ screen: 'splash' }),

      setColor: (color) => set((s) => updateActive(s, { color })),
      setSpecies: (species) => set((s) => updateActive(s, { species })),
      setHat: (hat) => set((s) => updateActive(s, { hat })),
      setName: (name) => set((s) => updateActive(s, { name })),
      setPosition: (position) => set((s) => updateActive(s, { position })),
      setHatDetached: (hatDetached) => set((s) => updateActive(s, { hatDetached })),
      setHatOffset: (hatOffset) => set((s) => updateActive(s, { hatOffset })),
      setDetachedHatType: (detachedHatType) => set((s) => updateActive(s, { detachedHatType })),
    }),
    { name: 'fuzzy-family' }
  )
);

/** Get the active fuzzy config (convenience selector) */
export function useActiveFuzzy(): FuzzyConfig | undefined {
  return useFuzzyStore((s) => s.fuzzies.find((f) => f.id === s.activeFuzzyId));
}
