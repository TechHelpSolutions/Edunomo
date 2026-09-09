import { JourneyServiceItem } from '../types';
import { studyAbroadService } from './studyAbroadService';

export const journeyService = {
  async getJourneyOverview(): Promise<{
    activeApplication?: any;
    milestones: JourneyServiceItem[];
    currentPhase: string;
    completedCount: number;
    totalServices: number;
  }> {
    const applications = await studyAbroadService.getApplications();
    const primaryApp = applications.length > 0 ? applications[0] : undefined;

    let studyAbroadStatusText = 'Not Started';
    let studyAbroadState: 'not_started' | 'in_progress' | 'completed' | 'warning' = 'not_started';
    let studyAbroadHeadline = 'Find & apply to top global universities';

    if (primaryApp) {
      studyAbroadHeadline = `${primaryApp.courseTitle} • ${primaryApp.collegeName}`;
      if (primaryApp.status === 'Documents Required') {
        studyAbroadStatusText = 'Additional Documents Required';
        studyAbroadState = 'warning';
      } else if (primaryApp.status === 'Accepted' || primaryApp.status === 'Completed') {
        studyAbroadStatusText = primaryApp.status;
        studyAbroadState = 'completed';
      } else {
        studyAbroadStatusText = primaryApp.status; // e.g. "Under Review", "Submitted"
        studyAbroadState = 'in_progress';
      }
    }

    const milestones: JourneyServiceItem[] = [
      {
        service: 'Study Abroad',
        category: 'study_abroad',
        headline: studyAbroadHeadline,
        subtitle: primaryApp ? `Application #${primaryApp.id} • ${primaryApp.intake}` : 'Explore 500+ programs across UK, Canada, USA & more',
        statusText: primaryApp ? `Study Abroad → ${studyAbroadStatusText}` : 'Discover Programs',
        statusState: studyAbroadState,
        route: primaryApp ? `/applications/${primaryApp.id}` : '/study-abroad',
        ctaText: primaryApp ? 'View Application' : 'Explore Study Abroad',
        iconName: 'GraduationCap'
      },
      {
        service: 'Visa Services',
        category: 'visa',
        headline: primaryApp ? `${primaryApp.country} Student Visa Guidance` : 'Student Visa Filing & Pre-Assessment',
        subtitle: 'Document checklist, country guidelines & pre-assessment support',
        statusText: primaryApp?.status === 'Accepted' ? 'Ready to File' : 'Pre-check Available',
        statusState: primaryApp?.status === 'Accepted' ? 'in_progress' : 'not_started',
        route: '/visa',
        ctaText: 'Continue',
        iconName: 'ShieldCheck'
      },
      {
        service: 'Flight Booking',
        category: 'flights',
        headline: 'Student Fares & Flexible Booking Options',
        subtitle: 'Special international student airfares with 46kg baggage allowance',
        statusText: 'Available',
        statusState: 'not_started',
        route: '/flights',
        ctaText: 'Search Flights',
        iconName: 'Plane'
      },
      {
        service: 'Hotels & Living',
        category: 'hotels',
        headline: 'Verified Student Accommodation & Guest Stays',
        subtitle: 'Accommodations within walking distance of global partner campuses',
        statusText: 'Available',
        statusState: 'not_started',
        route: '/hotels',
        ctaText: 'Explore Hotels',
        iconName: 'Building2'
      },
      {
        service: 'CAP Services',
        category: 'cabs',
        headline: 'Airport Transfers & Local Cab Services',
        subtitle: 'Terminal meet-and-greet and campus arrivals through the Edunomo mobile app',
        statusText: 'App-First',
        statusState: 'not_started',
        route: '/cabs',
        ctaText: 'Book a Cab',
        iconName: 'Car'
      },
      {
        service: 'Tuition & Tutors',
        category: 'tuition',
        headline: 'IELTS, GRE & Academic Subject Tutors',
        subtitle: 'Certified global educators for language exams and university subjects',
        statusText: 'Available',
        statusState: 'not_started',
        route: '/tuition',
        ctaText: 'Find a Tutor',
        iconName: 'BookOpen'
      }
    ];

    return {
      activeApplication: primaryApp,
      milestones,
      currentPhase: 'Multi-Service Hub',
      completedCount: milestones.length,
      totalServices: milestones.length
    };
  }
};
