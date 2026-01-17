// Pet types
export type PetSpecies = 'dog' | 'cat';
export type PetSex = 'male' | 'female';

export interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  breed: string;
  sex: PetSex;
  birthdate?: string;
  weight?: number;
  photoUrl?: string;
  isVaccinated?: boolean;
  isCertified?: boolean;
  notes?: string;
  createdAt: string;
}

// Scan types
export type ScanCategory = 'skin' | 'eyes' | 'stool' | 'vomit' | 'behavior' | 'emergency' | 'other';
export type TriageLevel = 'NORMAL' | 'OBSERVE' | 'SEE_VET' | 'EMERGENCY';

export interface ScanResult {
  id: string;
  petId: string;
  category: ScanCategory;
  imageUrl?: string;
  textInput?: string;
  triageLevel: TriageLevel;
  summary: string;
  likelyCauses: string[];
  doNow: string[];
  watchFor: string[];
  disclaimer: string;
  affiliateTags: string[];
  createdAt: string;
}

// Reminder types
export type ReminderType = 'vaccine' | 'parasite' | 'checkup' | 'medication' | 'followup';

export interface Reminder {
  id: string;
  petId: string;
  type: ReminderType;
  title: string;
  scheduleAt: string;
  repeatRule?: string;
  enabled: boolean;
  createdAt: string;
}

// Medical Record types
export type MedicalRecordType = 'vaccine' | 'parasite' | 'surgery' | 'checkup' | 'notes';

export interface MedicalRecord {
  id: string;
  petId: string;
  type: MedicalRecordType;
  date: string;
  title: string;
  detail?: string;
  createdAt: string;
}

// User types
export type UserPlan = 'FREE' | 'PRO';

export interface User {
  id: string;
  email?: string;
  phone?: string;
  plan: UserPlan;
  proExpireAt?: string;
  scanQuotaUsed: number;
  maxFreeScans: number;
  createdAt: string;
}

// Clinic types
export interface Clinic {
  id: string;
  name: string;
  lat: number;
  lng: number;
  phone: string;
  openHours: string;
  is24h: boolean;
  distance?: number;
}

// Category for home screen
export interface Category {
  id: ScanCategory;
  name: string;
  icon: string;
  color: string;
}
