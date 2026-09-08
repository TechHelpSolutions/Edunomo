const STORAGE_KEYS = {
  APPLICATIONS: 'edunomo_applications_v1',
  PROFILE: 'edunomo_profile_v1',
  NOTIFICATIONS: 'edunomo_notifications_v1',
  SAVED_COLLEGES: 'edunomo_saved_colleges_v1',
  AUTH_USER: 'edunomo_auth_user_v1',
};

export const storage = {
  get<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : fallback;
    } catch (e) {
      console.warn('Storage get failed for key ' + key, e);
      return fallback;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage set failed for key ' + key, e);
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Storage remove failed for key ' + key, e);
    }
  },

  KEYS: STORAGE_KEYS,
};
