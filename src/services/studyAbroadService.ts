import { College, Course, Destination, Application, ApplicationStatus, DocumentItem } from '../types';
import { COLLEGES } from '../data/colleges';
import { COURSES } from '../data/courses';
import { DESTINATIONS } from '../data/destinations';
import { INITIAL_APPLICATIONS } from '../data/initialApplications';
import { storage } from './storage';

export interface CollegeFilterParams {
  searchQuery?: string;
  country?: string;
  city?: string;
  level?: string;
  discipline?: string;
  intake?: string;
  maxFeeInr?: number;
  sortBy?: 'recommended' | 'fee_asc' | 'fee_desc' | 'ranking';
}

export const studyAbroadService = {
  // Destinations
  async getDestinations(): Promise<Destination[]> {
    return Promise.resolve([...DESTINATIONS]);
  },

  async getDestinationByCountry(country: string): Promise<Destination | undefined> {
    return Promise.resolve(
      DESTINATIONS.find((d) => d.country.toLowerCase() === country.toLowerCase())
    );
  },

  // Colleges
  async getColleges(params?: CollegeFilterParams): Promise<College[]> {
    let list = [...COLLEGES];

    if (!params) return Promise.resolve(list);

    const { searchQuery, country, city, maxFeeInr, sortBy } = params;

    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q) ||
          c.country.toLowerCase().includes(q) ||
          c.type.toLowerCase().includes(q)
      );
    }

    if (country && country !== 'all') {
      list = list.filter((c) => c.country.toLowerCase() === country.toLowerCase());
    }

    if (city && city !== 'all') {
      list = list.filter((c) => c.city.toLowerCase() === city.toLowerCase());
    }

    if (maxFeeInr && maxFeeInr > 0) {
      list = list.filter((c) => c.startingTuitionFeeInr <= maxFeeInr);
    }

    if (sortBy === 'fee_asc') {
      list.sort((a, b) => a.startingTuitionFeeInr - b.startingTuitionFeeInr);
    } else if (sortBy === 'fee_desc') {
      list.sort((a, b) => b.startingTuitionFeeInr - a.startingTuitionFeeInr);
    }

    return Promise.resolve(list);
  },

  async getCollegeById(id: string): Promise<College | undefined> {
    const college = COLLEGES.find((c) => c.id === id);
    return Promise.resolve(college);
  },

  // Courses
  async getCourses(collegeId?: string): Promise<Course[]> {
    if (collegeId) {
      return Promise.resolve(COURSES.filter((c) => c.collegeId === collegeId));
    }
    return Promise.resolve([...COURSES]);
  },

  async getCourseById(id: string): Promise<Course | undefined> {
    const course = COURSES.find((c) => c.id === id);
    return Promise.resolve(course);
  },

  // Applications
  async getApplications(): Promise<Application[]> {
    const apps = storage.get<Application[]>(storage.KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
    return Promise.resolve(apps);
  },

  async getApplicationById(id: string): Promise<Application | undefined> {
    const apps = await this.getApplications();
    return Promise.resolve(apps.find((a) => a.id === id));
  },

  async createApplication(
    newApp: Omit<Application, 'id' | 'submissionDate' | 'status' | 'timeline'>
  ): Promise<Application> {
    const apps = await this.getApplications();
    
    // Generate clean unique application number
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const generatedId = `APP-2026-${randomSuffix}`;

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const application: Application = {
      ...newApp,
      id: generatedId,
      submissionDate: dateStr,
      status: 'Submitted',
      timeline: [
        {
          status: 'Submitted',
          label: 'Application Submitted',
          date: `${dateStr}, ${timeStr}`,
          note: 'Application successfully received by Edunomo processing desk.',
          isCompleted: true,
          isCurrent: false
        },
        {
          status: 'Under Review',
          label: 'Document Verification',
          note: 'Edunomo verification officer will validate uploaded credentials.',
          isCompleted: false,
          isCurrent: true
        },
        {
          status: 'Under Review',
          label: 'Admissions Evaluation',
          note: 'Senior advisor reviews statement of purpose and academic profile.',
          isCompleted: false,
          isCurrent: false
        },
        {
          status: 'Submitted to College',
          label: 'Dispatched to University',
          note: 'Official application forwarded to university admissions office.',
          isCompleted: false,
          isCurrent: false
        },
        {
          status: 'Accepted',
          label: 'University Decision',
          note: 'Formal offer letter and admission outcome issued.',
          isCompleted: false,
          isCurrent: false
        }
      ]
    };

    const updated = [application, ...apps];
    storage.set(storage.KEYS.APPLICATIONS, updated);
    return Promise.resolve(application);
  },

  async updateApplicationStatus(
    appId: string,
    status: ApplicationStatus,
    note?: string
  ): Promise<Application | undefined> {
    const apps = await this.getApplications();
    const index = apps.findIndex((a) => a.id === appId);
    if (index === -1) return undefined;

    const target = { ...apps[index] };
    target.status = status;

    if (note) {
      target.requestedDocumentsNote = note;
    }

    // Update timeline
    target.timeline = target.timeline.map((item) => {
      if (item.status === status) {
        return {
          ...item,
          isCurrent: true,
          isCompleted: false,
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        };
      }
      return item;
    });

    apps[index] = target;
    storage.set(storage.KEYS.APPLICATIONS, apps);
    return Promise.resolve(target);
  },

  async updateApplicationDocument(
    appId: string,
    docId: string,
    documentUpdates: Partial<DocumentItem>
  ): Promise<Application | undefined> {
    const apps = await this.getApplications();
    const index = apps.findIndex((a) => a.id === appId);
    if (index === -1) return undefined;

    const target = { ...apps[index] };
    target.documents = target.documents.map((d) =>
      d.id === docId ? { ...d, ...documentUpdates } : d
    );

    // If all documents are uploaded/verified, ensure status returns to Under Review if it was Documents Required
    if (target.status === 'Documents Required') {
      const anyInsufficient = target.documents.some((d) => d.status === 'Insufficient' || d.status === 'Not Uploaded');
      if (!anyInsufficient) {
        target.status = 'Under Review';
        target.requestedDocumentsNote = undefined;
      }
    }

    apps[index] = target;
    storage.set(storage.KEYS.APPLICATIONS, apps);
    return Promise.resolve(target);
  },

  // Saved Colleges Bookmark
  getSavedCollegeIds(): string[] {
    return storage.get<string[]>(storage.KEYS.SAVED_COLLEGES, ['oxford-univ', 'univ-toronto']);
  },

  toggleSaveCollege(collegeId: string): boolean {
    const saved = this.getSavedCollegeIds();
    const exists = saved.includes(collegeId);
    let updated: string[];
    if (exists) {
      updated = saved.filter((id) => id !== collegeId);
    } else {
      updated = [...saved, collegeId];
    }
    storage.set(storage.KEYS.SAVED_COLLEGES, updated);
    return !exists;
  }
};
