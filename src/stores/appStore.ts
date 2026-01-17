import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Pet, ScanResult, Reminder, User } from '@/types';

interface AppState {
  // User
  user: User | null;
  setUser: (user: User | null) => void;
  incrementScanQuota: () => void;
  
  // Pets
  pets: Pet[];
  addPet: (pet: Pet) => void;
  updatePet: (id: string, pet: Partial<Pet>) => void;
  deletePet: (id: string) => void;
  selectedPetId: string | null;
  setSelectedPetId: (id: string | null) => void;
  
  // Scans
  scans: ScanResult[];
  addScan: (scan: ScanResult) => void;
  
  // Reminders
  reminders: Reminder[];
  addReminder: (reminder: Reminder) => void;
  updateReminder: (id: string, reminder: Partial<Reminder>) => void;
  deleteReminder: (id: string) => void;
  
  // Onboarding
  hasAcceptedDisclaimer: boolean;
  setHasAcceptedDisclaimer: (value: boolean) => void;
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (value: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User
      user: {
        id: '1',
        email: 'demo@pawtic.app',
        plan: 'FREE',
        scanQuotaUsed: 0,
        maxFreeScans: 5,
        createdAt: new Date().toISOString(),
      },
      setUser: (user) => set({ user }),
      incrementScanQuota: () => set((state) => ({
        user: state.user ? {
          ...state.user,
          scanQuotaUsed: state.user.scanQuotaUsed + 1
        } : null
      })),
      
      // Pets
      pets: [],
      addPet: (pet) => set((state) => ({ pets: [...state.pets, pet] })),
      updatePet: (id, petData) => set((state) => ({
        pets: state.pets.map((p) => p.id === id ? { ...p, ...petData } : p)
      })),
      deletePet: (id) => set((state) => ({
        pets: state.pets.filter((p) => p.id !== id)
      })),
      selectedPetId: null,
      setSelectedPetId: (id) => set({ selectedPetId: id }),
      
      // Scans
      scans: [],
      addScan: (scan) => set((state) => ({ scans: [scan, ...state.scans] })),
      
      // Reminders
      reminders: [],
      addReminder: (reminder) => set((state) => ({ reminders: [...state.reminders, reminder] })),
      updateReminder: (id, reminderData) => set((state) => ({
        reminders: state.reminders.map((r) => r.id === id ? { ...r, ...reminderData } : r)
      })),
      deleteReminder: (id) => set((state) => ({
        reminders: state.reminders.filter((r) => r.id !== id)
      })),
      
      // Onboarding
      hasAcceptedDisclaimer: false,
      setHasAcceptedDisclaimer: (value) => set({ hasAcceptedDisclaimer: value }),
      hasCompletedOnboarding: false,
      setHasCompletedOnboarding: (value) => set({ hasCompletedOnboarding: value }),
    }),
    {
      name: 'pawtic-storage',
    }
  )
);
