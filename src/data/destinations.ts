import { Destination } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'uk',
    country: 'United Kingdom',
    countryCode: 'GB',
    flag: '🇬🇧',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    collegesCount: 48,
    coursesCount: 320,
    startingFeeInr: '₹16,50,000 / yr',
    startingFeeLocal: '£16,000 / yr',
    popularCities: ['London', 'Manchester', 'Edinburgh', 'Oxford', 'Birmingham'],
    visaProcessingWeeks: '3-4 weeks',
    description: 'World-renowned universities, 1-year master’s options, and 2-year Graduate Route visa.'
  },
  {
    id: 'canada',
    country: 'Canada',
    countryCode: 'CA',
    flag: '🇨🇦',
    image: 'https://images.unsplash.com/photo-1517935703635-2717090c2210?auto=format&fit=crop&w=800&q=80',
    collegesCount: 36,
    coursesCount: 260,
    startingFeeInr: '₹14,00,000 / yr',
    startingFeeLocal: 'CAD 22,000 / yr',
    popularCities: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'],
    visaProcessingWeeks: '4-6 weeks',
    description: 'Post-Graduation Work Permit (PGWP) eligibility, safe multicultural cities, and high quality of life.'
  },
  {
    id: 'australia',
    country: 'Australia',
    countryCode: 'AU',
    flag: '🇦🇺',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
    collegesCount: 32,
    coursesCount: 210,
    startingFeeInr: '₹17,20,000 / yr',
    startingFeeLocal: 'AUD 30,000 / yr',
    popularCities: ['Melbourne', 'Sydney', 'Brisbane', 'Perth'],
    visaProcessingWeeks: '3-5 weeks',
    description: 'Top ranked Group of Eight universities, generous post-study work rights, and vibrant student hubs.'
  },
  {
    id: 'usa',
    country: 'United States',
    countryCode: 'US',
    flag: '🇺🇸',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=800&q=80',
    collegesCount: 54,
    coursesCount: 450,
    startingFeeInr: '₹22,00,000 / yr',
    startingFeeLocal: ',000 / yr',
    popularCities: ['Boston', 'New York', 'San Francisco', 'Chicago'],
    visaProcessingWeeks: '2-4 weeks',
    description: 'Global tech and innovation capital with 3-year STEM OPT work authorization.'
  },
  {
    id: 'germany',
    country: 'Germany',
    countryCode: 'DE',
    flag: '🇩🇪',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
    collegesCount: 24,
    coursesCount: 140,
    startingFeeInr: '₹2,50,000 / yr',
    startingFeeLocal: '€1,500 / yr',
    popularCities: ['Munich', 'Berlin', 'Frankfurt', 'Aachen'],
    visaProcessingWeeks: '6-8 weeks',
    description: 'Virtually tuition-free public universities, world-class engineering, and 18-month job seeker visa.'
  },
  {
    id: 'ireland',
    country: 'Ireland',
    countryCode: 'IE',
    flag: '🇮🇪',
    image: 'https://images.unsplash.com/photo-1549918864-48ac978761a4?auto=format&fit=crop&w=800&q=80',
    collegesCount: 18,
    coursesCount: 95,
    startingFeeInr: '₹12,80,000 / yr',
    startingFeeLocal: '€14,000 / yr',
    popularCities: ['Dublin', 'Cork', 'Galway'],
    visaProcessingWeeks: '4-5 weeks',
    description: 'European tech HQ hub (Google, Meta, Apple), English-speaking country with 2-year post-study stay back.'
  }
];
