export interface VisaCategory {
  id: string;
  country: string;
  countryCode: string;
  title: string;
  type: string;
  processingTime: string;
  validity: string;
  feeEstimate: string;
  keyRequirements: string[];
}

export const VISA_CATEGORIES: VisaCategory[] = [
  {
    id: 'uk-student-visa',
    country: 'United Kingdom',
    countryCode: 'GB',
    title: 'Student Visa (Subclass Route)',
    type: 'Student Visa',
    processingTime: '3-4 Weeks',
    validity: 'Course Duration + 4 Months',
    feeEstimate: '£490 + Healthcare Surcharge',
    keyRequirements: [
      'Confirmation of Acceptance for Studies (CAS) from licensed sponsor',
      'Proof of financial maintenance (£1,334/month for London)',
      'Tuberculosis (TB) test certificate from approved clinic',
      'ATAS certificate (for specified postgraduate STEM programs)'
    ]
  },
  {
    id: 'canada-study-permit',
    country: 'Canada',
    countryCode: 'CA',
    title: 'Canada Study Permit & PAL',
    type: 'Study Permit',
    processingTime: '4-7 Weeks',
    validity: 'Length of study + 90 days',
    feeEstimate: 'CAD  + Biometrics CAD ',
    keyRequirements: [
      'Provincial Attestation Letter (PAL) from designated learning institution',
      'Guaranteed Investment Certificate (GIC) CAD ,635 maintenance',
      'Upfront Immigration Medical Examination (IME)',
      'Clean police clearance certificate'
    ]
  },
  {
    id: 'australia-subclass-500',
    country: 'Australia',
    countryCode: 'AU',
    title: 'Student Visa (Subclass 500)',
    type: 'Student Visa',
    processingTime: '4-6 Weeks',
    validity: 'Up to 5 years depending on enrollment',
    feeEstimate: 'AUD ,600',
    keyRequirements: [
      'Electronic Confirmation of Enrolment (eCoE)',
      'Genuine Student (GS) statement criteria assessment',
      'Overseas Student Health Cover (OSHC) policy',
      'English proficiency benchmark verification'
    ]
  },
  {
    id: 'us-f1-visa',
    country: 'United States',
    countryCode: 'US',
    title: 'F-1 Academic Student Visa',
    type: 'Student Visa',
    processingTime: '2-4 Weeks',
    validity: 'Duration of Status (D/S)',
    feeEstimate: ' MRV fee +  SEVIS I-901',
    keyRequirements: [
      'Valid Form I-20 issued by SEVP-certified institution',
      'SEVIS I-901 fee receipt',
      'In-person consular interview appointment',
      'Sufficient liquid funds for 1 academic year'
    ]
  },
  {
    id: 'uk-standard-visitor',
    country: 'United Kingdom',
    countryCode: 'GB',
    title: 'Standard Visitor / Parents Visa',
    type: 'Visit Visa',
    processingTime: '3 Weeks',
    validity: '6 Months (Multiple Entry)',
    feeEstimate: '£115',
    keyRequirements: [
      'Proof of sufficient funds for duration of visit',
      'Letter of invitation from student studying in the UK',
      'Evidence of strong ties to home country',
      'Travel itinerary and accommodation booking'
    ]
  },
  {
    id: 'schengen-student-visa',
    country: 'Germany / Schengen',
    countryCode: 'DE',
    title: 'German National Student Visa (Type D)',
    type: 'Student Visa',
    processingTime: '6-8 Weeks',
    validity: '3 to 6 Months (converted to Residence Permit)',
    feeEstimate: '€75',
    keyRequirements: [
      'University admission letter from German university',
      'Blocked Account (Sperrkonto) with €11,208 deposit',
      'Statutory / private health insurance',
      'Proof of German or English language proficiency'
    ]
  }
];

export interface MockFlight {
  id: string;
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: string;
  priceInr: string;
  studentBaggage: string;
  aircraft: string;
}

export const MOCK_FLIGHTS: MockFlight[] = [
  {
    id: 'fl-1',
    airline: 'British Airways',
    airlineLogo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=120&q=80',
    flightNumber: 'BA 142',
    origin: 'DEL (New Delhi)',
    destination: 'LHR (London Heathrow)',
    departureTime: '03:15 AM',
    arrivalTime: '07:50 AM',
    duration: '9h 05m',
    stops: 'Non-stop',
    priceInr: '₹42,850',
    studentBaggage: '2 x 23kg Check-in + 1 Extra Student Bag Free (46kg Total)',
    aircraft: 'Boeing 787-9 Dreamliner'
  },
  {
    id: 'fl-2',
    airline: 'Air Canada',
    airlineLogo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=120&q=80',
    flightNumber: 'AC 43',
    origin: 'DEL (New Delhi)',
    destination: 'YYZ (Toronto Pearson)',
    departureTime: '11:45 PM',
    arrivalTime: '05:25 AM (+1)',
    duration: '14h 40m',
    stops: 'Non-stop',
    priceInr: '₹68,400',
    studentBaggage: '2 x 23kg Check-in + Free Student Date Change',
    aircraft: 'Boeing 777-200LR'
  },
  {
    id: 'fl-3',
    airline: 'Singapore Airlines',
    airlineLogo: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=120&q=80',
    flightNumber: 'SQ 401',
    origin: 'BOM (Mumbai)',
    destination: 'MEL (Melbourne Tullamarine)',
    departureTime: '11:30 AM',
    arrivalTime: '08:15 AM (+1)',
    duration: '15h 15m',
    stops: '1 Stop (Singapore SIN 2h)',
    priceInr: '₹54,200',
    studentBaggage: '40kg Student Allowance + 10% Student Fare Discount',
    aircraft: 'Airbus A350-900'
  },
  {
    id: 'fl-4',
    airline: 'Lufthansa',
    airlineLogo: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=120&q=80',
    flightNumber: 'LH 761',
    origin: 'DEL (New Delhi)',
    destination: 'MUC (Munich Airport)',
    departureTime: '01:50 AM',
    arrivalTime: '06:10 AM',
    duration: '8h 50m',
    stops: 'Non-stop',
    priceInr: '₹46,900',
    studentBaggage: '2 x 23kg Included for Student Visa Holders',
    aircraft: 'Airbus A350-900'
  }
];

export interface MockHotel {
  id: string;
  name: string;
  location: string;
  city: string;
  country: string;
  type: string;
  rating: number;
  reviewsCount: number;
  pricePerNightInr: string;
  image: string;
  distanceToCampus: string;
  description: string;
  amenities: string[];
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
  freeCancellationHours: number;
}

export const MOCK_HOTELS: MockHotel[] = [
  {
    id: 'ht-1',
    name: 'Bloomsbury International Residence & Studios',
    location: 'Near UCL & King’s College, Bloomsbury',
    city: 'London',
    country: 'United Kingdom',
    type: 'Serviced Residence & Long-Stay',
    rating: 4.8,
    reviewsCount: 312,
    pricePerNightInr: '₹6,800 / night',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    distanceToCampus: '0.4 km to university / transit hub',
    description: 'Modern accommodation located in central Bloomsbury with comfortable self-contained studios, quiet workspaces, and seamless connections to the city.',
    amenities: ['High-speed WiFi', 'Study Lounges', 'Ensuite Bathroom', 'Communal Kitchen', '24/7 Reception', 'Gym'],
    checkInTime: '15:00',
    checkOutTime: '11:00',
    cancellationPolicy: 'Free cancellation up to 48 hours before check-in. Non-refundable thereafter.',
    freeCancellationHours: 48,
  },
  {
    id: 'ht-2',
    name: 'The Downtown Bay Suites',
    location: 'Bay Street / Financial & University Corridor',
    city: 'Toronto',
    country: 'Canada',
    type: 'Furnished Executive Suites',
    rating: 4.7,
    reviewsCount: 198,
    pricePerNightInr: '₹5,900 / night',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    distanceToCampus: '0.8 km to downtown corridor',
    description: 'Centrally located luxury serviced suites in downtown Toronto with fully furnished interiors, on-site fitness facilities, and high-speed fiber connectivity.',
    amenities: ['Furnished Room', 'On-site Gym', 'Laundry Service', 'High-speed Fiber', '24/7 Reception', 'Parking'],
    checkInTime: '14:00',
    checkOutTime: '11:00',
    cancellationPolicy: 'Free cancellation up to 24 hours before check-in. First night charged thereafter.',
    freeCancellationHours: 24,
  },
  {
    id: 'ht-3',
    name: 'Parkville Premier Lodge',
    location: 'Royal Parade, Parkville',
    city: 'Melbourne',
    country: 'Australia',
    type: 'Premium Apartment Living',
    rating: 4.9,
    reviewsCount: 240,
    pricePerNightInr: '₹6,200 / night',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    distanceToCampus: '300m to university and parklands',
    description: 'Boutique accommodation offering modern apartments, private kitchenettes, rooftop terrace recreation, and convenient public tram access.',
    amenities: ['Private Kitchenette', 'Rooftop Terrace', 'Study Lounges', 'Bicycle Storage', 'Air Conditioning', 'WiFi'],
    checkInTime: '14:00',
    checkOutTime: '10:00',
    cancellationPolicy: 'Free cancellation up to 48 hours before check-in.',
    freeCancellationHours: 48,
  }
];

export interface MockTutor {
  id: string;
  name: string;
  avatar: string;
  subjects: string[];
  qualifications: string;
  rating: number;
  reviewsCount: number;
  hourlyRateInr: string;
  hourlyRateLocal: string;
  mode: 'Online' | 'In-Person' | 'Hybrid';
  bio: string;
}

export const MOCK_TUTORS: MockTutor[] = [
  {
    id: 'tu-1',
    name: 'Dr. Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    subjects: ['IELTS Academic Band 8+', 'TOEFL iBT', 'Academic English'],
    qualifications: 'Former British Council Senior Examiner, Cambridge CELTA',
    rating: 4.95,
    reviewsCount: 148,
    hourlyRateInr: '₹2,200 / hr',
    hourlyRateLocal: '£22 / hr',
    mode: 'Online',
    bio: '12+ years preparing Indian and international students for 8.0+ in IELTS writing and speaking. Proven band escalation methods.'
  },
  {
    id: 'tu-2',
    name: 'Rohan Mehta, M.Tech',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    subjects: ['GRE Quant 165+', 'Engineering Mathematics', 'Data Structures & Algorithms'],
    qualifications: 'IIT Bombay Alumnus, 99.8th percentile in GRE & GATE',
    rating: 4.92,
    reviewsCount: 96,
    hourlyRateInr: '₹1,950 / hr',
    hourlyRateLocal: ' / hr',
    mode: 'Online',
    bio: 'Specialized intensive GRE quantitative tutoring and master-level algorithmic interview prep.'
  },
  {
    id: 'tu-3',
    name: 'Claire Moreau',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    subjects: ['German A1-B2', 'TestDaF Preparation', 'French for Quebec CSQ'],
    qualifications: 'Goethe-Institut Certified Instructor, Sorbonne Alum',
    rating: 4.88,
    reviewsCount: 82,
    hourlyRateInr: '₹1,800 / hr',
    hourlyRateLocal: '€20 / hr',
    mode: 'Online',
    bio: 'Helping students fulfill German visa language requirements for TU Munich, RWTH Aachen, and TU Berlin.'
  }
];
