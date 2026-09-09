import { UserProfile } from '../types';
import { storage } from './storage';

const INITIAL_PROFILE: UserProfile = {
  id: 'usr_001',
  fullName: 'Rahul Sharma',
  email: 'student.demo@edunomo.in',
  phone: '+91 98765 43210',
  dateOfBirth: '2001-05-14',
  nationality: 'Indian',
  passportNumber: 'Z8473921',
  highestQualification: 'Bachelor of Technology (Computer Science)',
  institutionName: 'Indian Institute of Technology, Delhi',
  graduationYear: '2024',
  gradeGpa: '8.9 CGPA',
  englishTestType: 'IELTS Academic',
  englishTestScore: '8.0 Overall',
  savedCollegeIds: ['oxford-univ', 'univ-toronto'],
  completionPercentage: 88,
};

export const authService = {
  getProfile(): UserProfile {
    return storage.get<UserProfile>(storage.KEYS.PROFILE, INITIAL_PROFILE);
  },

  updateProfile(updates: Partial<UserProfile>): UserProfile {
    const current = this.getProfile();
    const updated = { ...current, ...updates };
    
    // Recalculate profile completion
    let score = 0;
    const fields: (keyof UserProfile)[] = [
      'fullName',
      'email',
      'phone',
      'dateOfBirth',
      'nationality',
      'passportNumber',
      'highestQualification',
      'institutionName',
      'graduationYear',
      'gradeGpa',
      'englishTestType',
      'englishTestScore',
    ];

    fields.forEach((f) => {
      if (updated[f] && String(updated[f]).trim().length > 0) {
        score += 1;
      }
    });

    updated.completionPercentage = Math.round((score / fields.length) * 100);
    storage.set(storage.KEYS.PROFILE, updated);
    return updated;
  },

  isAuthenticated(): boolean {
    const user = storage.get(storage.KEYS.AUTH_USER, { loggedIn: true });
    return Boolean(user?.loggedIn);
  },

  login(email: string, _pass: string): { success: boolean; user: UserProfile } {
    const profile = this.getProfile();
    storage.set(storage.KEYS.AUTH_USER, { loggedIn: true, email });
    return { success: true, user: profile };
  },

  signup(data: { fullName: string; email: string; phone: string; password?: string }): { success: boolean; user: UserProfile } {
    const newProfile = this.updateProfile({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
    });
    storage.set(storage.KEYS.AUTH_USER, { loggedIn: true, email: data.email });
    return { success: true, user: newProfile };
  },

  logout(): void {
    storage.set(storage.KEYS.AUTH_USER, { loggedIn: false });
  }
};
