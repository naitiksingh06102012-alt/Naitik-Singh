export interface Doctor {
  id: string;
  name: string;
  qualification: string;
  role: string;
  experienceYears: number;
  alumni: string;
  registrations: string;
  specialties: string[];
  opdSchedule: {
    boringRoad: string;
    kankarbagh: string;
  };
  bio: string;
}

export interface ClinicBranch {
  id: string;
  name: string;
  area: string;
  address: string;
  landmark: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  hours: {
    weekdays: string;
    sunday: string;
  };
  mapCoordinates: { lat: number; lng: number };
  directions: string;
}

export interface Treatment {
  id: string;
  category: 'clinical' | 'laser' | 'hair' | 'aesthetics' | 'surgery';
  categoryLabel: string;
  title: string;
  summary: string;
  indication: string;
  technology: string;
  sessionsRequired: string;
  downtime: string;
  approxFee: string;
  protocolHighlights: string[];
  suitableFor: string;
}

export interface BeforeAfterCase {
  id: string;
  title: string;
  category: string;
  patientAgeGender: string;
  sessions: string;
  timeframe: string;
  doctorInCharge: string;
  procedureDone: string;
  clinicalNote: string;
  beforeLabel: string;
  afterLabel: string;
  beforeVisualColor: string;
  afterVisualColor: string;
  description: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  locality: string;
  condition: string;
  rating: number;
  doctorName: string;
  comment: string;
  date: string;
}

export interface AppointmentRecord {
  id: string;
  referenceCode: string;
  patientName: string;
  phone: string;
  email: string;
  age: number;
  gender: string;
  branchId: string;
  branchName: string;
  doctorId: string;
  doctorName: string;
  treatmentCategory: string;
  date: string;
  timeSlot: string;
  concernNotes: string;
  createdAt: string;
  status: 'confirmed' | 'rescheduled' | 'cancelled';
}

export const CLINIC_BRANCHES: ClinicBranch[] = [
  {
    id: 'boring-road',
    name: 'Boring Road Center',
    area: 'Boring Road, Patna West',
    address: '2nd Floor, Grand Plaza, Opp. Pantaloons, Boring Road, Patna, Bihar 800001',
    landmark: 'Opposite Pantaloons, 200m from Boring Canal Road Crossing',
    phone: '+91 612 254 8920',
    emergencyPhone: '+91 94310 28419',
    email: 'boringroad@patnaskinlaser.in',
    hours: {
      weekdays: '09:30 AM – 01:30 PM & 04:30 PM – 08:00 PM',
      sunday: '10:00 AM – 02:00 PM (Prior Appointment Only)'
    },
    mapCoordinates: { lat: 25.6171, lng: 85.1238 },
    directions: 'Located on Main Boring Road right above HDFC Bank, with dedicated basement parking for clinic visitors.'
  },
  {
    id: 'kankarbagh',
    name: 'Kankarbagh Center',
    area: 'Kankarbagh, Patna South',
    address: '1st Floor, Arogya Health Complex, Near Tiwary Bechar, Main Road, Kankarbagh, Patna, Bihar 800020',
    landmark: 'Adjacent to Tiwary Bechar, 1 km from Rajendra Nagar Terminal',
    phone: '+91 612 235 6114',
    emergencyPhone: '+91 94310 28419',
    email: 'kankarbagh@patnaskinlaser.in',
    hours: {
      weekdays: '10:00 AM – 02:00 PM & 05:00 PM – 08:30 PM',
      sunday: 'Closed for Deep Sterilization'
    },
    mapCoordinates: { lat: 25.5982, lng: 85.1584 },
    directions: 'Easily accessible from Old Bypass and Rajendra Nagar overbridge with ramp access and elevator.'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-saurabh-verma',
    name: 'Dr. Saurabh Verma',
    qualification: 'MBBS, MD (Dermatology, Venereology & Leprosy - AIIMS Patna)',
    role: 'Chief Dermatologist & Dermatosurgeon',
    experienceYears: 14,
    alumni: 'AIIMS Patna Gold Medalist · Ex-Senior Resident PMCH Patna',
    registrations: 'Bihar Medical Council Reg: BMC-34190 · Life Member IADVL & ACSI',
    specialties: [
      'Recalcitrant Acne & Subcision Scar Revision',
      'Psoriasis & Biological Therapy',
      'Vitiligo & Epidermal Cell Suspension',
      'Clinical Dermoscopy & Pigmentary Disorders'
    ],
    opdSchedule: {
      boringRoad: 'Mon, Wed, Fri (10:00 AM – 01:30 PM & 05:00 PM – 08:00 PM)',
      kankarbagh: 'Tue, Thu, Sat (10:00 AM – 01:30 PM & 05:00 PM – 08:00 PM)'
    },
    bio: 'Dr. Saurabh Verma has treated over 18,000 patients across Bihar and Eastern India. Having trained at AIIMS Patna and served at Patna Medical College & Hospital (PMCH), his clinical approach prioritizes safe, evidence-based dermatological therapies without unnecessary dependency on long-term systemic antibiotics.'
  },
  {
    id: 'dr-priya-sinha',
    name: 'Dr. Priya N. Sinha',
    qualification: 'MBBS, DVD, Fellowship in Aesthetic Medicine & Lasers (Germany)',
    role: 'Senior Consultant Laser Dermatologist & Trichologist',
    experienceYears: 11,
    alumni: 'KMC Manipal · Fellowship Greifswald University Hospital, Germany',
    registrations: 'Bihar Medical Council Reg: BMC-41805 · Member Association of Cutaneous Surgeons',
    specialties: [
      'Triple-Wavelength Laser Hair Reduction',
      'Melasma & Q-Switched Laser Toning',
      'GFC & Autologous Hair Restoration Therapy',
      'Medical HydraFacial MD & Chemical Peels'
    ],
    opdSchedule: {
      boringRoad: 'Tue, Thu, Sat (10:00 AM – 01:30 PM & 05:00 PM – 08:00 PM)',
      kankarbagh: 'Mon, Wed, Fri (10:00 AM – 01:30 PM & 05:00 PM – 08:00 PM)'
    },
    bio: 'Dr. Priya N. Sinha specializes in non-invasive cosmetic dermatology, scalp trichology, and advanced laser parameters specifically customized for Fitzpatrick skin types IV and V prevalent in Northern India. She is renowned for subtle, high-efficacy clinical results without post-inflammatory hyperpigmentation.'
  }
];

export const TREATMENTS: Treatment[] = [
  {
    id: 'acne-scar-revision',
    category: 'clinical',
    categoryLabel: 'Acne & Scars',
    title: 'Multi-Modal Acne Scar Revision',
    summary: 'Subcision, TCA Cross, and Fractional Micro-Needling RF for pitted and tethered scars.',
    indication: 'Deep ice-pick scars, rolling scars, post-acne boxcar indentations, and persistent erythema.',
    technology: 'Nokor needle subcision + Lumenis Ultrapulse / Secret RF Microneedling',
    sessionsRequired: '3 – 5 sessions spaced 4 weeks apart',
    downtime: '24 to 48 hours mild redness',
    approxFee: '₹2,500 – ₹5,500 per session',
    protocolHighlights: [
      'Releases deep fibrotic fibrous bands tethering scars to subcutaneous tissue',
      'High-concentration Cross TCA targeting narrow ice-pick pits',
      'Stimulates new autologous Type I and III collagen remodeling'
    ],
    suitableFor: 'Patients with persistent pitted acne scarring after active acne has stabilized'
  },
  {
    id: 'melasma-pigment-laser',
    category: 'laser',
    categoryLabel: 'Laser Care',
    title: 'Q-Switched Nd:YAG Laser Pigmentation Toning',
    summary: 'Targeted photomechanical laser fragmentation of deep epidermal and dermal melanin clusters.',
    indication: 'Melasma, post-inflammatory hyperpigmentation (PIH), sun freckles, and dark patches.',
    technology: 'US-FDA Approved Q-Switched Nd:YAG (1064nm & 532nm colimated laser)',
    sessionsRequired: '4 – 6 sessions spaced 2 to 3 weeks apart',
    downtime: 'Zero downtime; mild warm flush for 30 minutes',
    approxFee: '₹2,200 – ₹4,000 per session',
    protocolHighlights: [
      'Sub-cellular photo-acoustic shockwave shatters pigment granules into micro-debris',
      'Does not damage overlying skin surface, preventing rebound hyperpigmentation',
      'Customized topical tranexamic and azelaic acid maintenance regimen'
    ],
    suitableFor: 'Stubborn dark patches resistant to ordinary skin creams, safe for Indian skin tones'
  },
  {
    id: 'gfc-hair-restoration',
    category: 'hair',
    categoryLabel: 'Hair & Scalp',
    title: 'GFC (Growth Factor Concentrate) Hair Therapy',
    summary: 'Next-generation cell-free autologous concentrated growth factor injections for thinning hair.',
    indication: 'Androgenetic alopecia (male & female pattern hair loss), telogen effluvium, crown thinning.',
    technology: 'Kits engineered for high-purity autologous PDGF, VEGF, EGF and IGF-1 extraction',
    sessionsRequired: '3 – 4 sessions spaced 30 days apart',
    downtime: 'Nil; resume routine activities immediately',
    approxFee: '₹3,500 – ₹5,000 per session',
    protocolHighlights: [
      'Zero red blood cells or inflammatory white cells, completely painless compared to standard PRP',
      'Direct follicular stimulation reversing follicular miniaturization',
      'Trichoscopy density mapping tracking hair count progression every 60 days'
    ],
    suitableFor: 'Active hair fall, receding hairline, widening partition, and weak brittle follicles'
  },
  {
    id: 'laser-hair-reduction',
    category: 'laser',
    categoryLabel: 'Laser Care',
    title: 'US-FDA Triple-Wavelength Laser Hair Reduction',
    summary: 'Permanent hair reduction combining 808nm Diode, 1064nm Nd:YAG, and 755nm Alexandrite.',
    indication: 'Unwanted facial hair, chin hirsutism in PCOS, underarms, arms, legs, and full body.',
    technology: 'Triple-wavelength cooling contact laser with chilled sapphire crystal tip (-5°C)',
    sessionsRequired: '6 – 8 sessions for 85–95% permanent reduction',
    downtime: 'Zero downtime',
    approxFee: 'From ₹1,499 (Chin/Upper Lip) to ₹7,999 (Full Body Session)',
    protocolHighlights: [
      'Calibrated precisely for Indian skin types to bypass surface melanin safely',
      'Contact cooling system prevents pain and thermal burns completely',
      'Certified technicians supervised directly by on-site dermatologist'
    ],
    suitableFor: 'Women with PCOS hirsutism or anyone seeking smooth hair-free skin'
  },
  {
    id: 'hydrafacial-md-elite',
    category: 'aesthetics',
    categoryLabel: 'Medi-Facials',
    title: 'Original Medical HydraFacial MD®',
    summary: 'Patented 4-step vortex cleansing, gentle chemical exfoliation, painless suction extraction, and peptide hydration.',
    indication: 'Clogged open pores, blackheads, urban pollution distress, uneven dull complexion.',
    technology: 'Genuine HydraFacial Vortex-Fusion® delivery system with medical booster serums',
    sessionsRequired: 'Single session for instant glow; monthly for sustained skin barrier health',
    downtime: 'Zero downtime; immediate radiant glass skin',
    approxFee: '₹2,999 – ₹4,800 per session',
    protocolHighlights: [
      'Simultaneous salicylic and glycolic acid infusion for deep pore decongestion',
      'Closed-loop vacuum extraction capturing sebum plugs visibly in waste cylinder',
      'Antioxidant and hyaluronic acid lock-in with soothing LED phototherapy'
    ],
    suitableFor: 'Pre-wedding glow, active professionals, and rough asphyxiated skin'
  },
  {
    id: 'chronic-eczema-psoriasis',
    category: 'clinical',
    categoryLabel: 'Clinical Dermatology',
    title: 'Clinical Psoriasis & Chronic Eczema Management',
    summary: 'Comprehensive diagnostic workup, targeted topicals, phototherapy, and modern biologic molecules.',
    indication: 'Plaque psoriasis, palmoplantar psoriasis, atopic dermatitis, severe hand eczema.',
    technology: 'Digital Wood’s lamp, skin scrape KOH test, Narrowband UVB phototherapy',
    sessionsRequired: 'Personalized medical course with weekly to monthly reviews',
    downtime: 'Non-surgical medical management',
    approxFee: '₹700 consultation + targeted medication plan',
    protocolHighlights: [
      'Detailed steroid-sparing protocol to prevent thinning of skin and topical withdrawal',
      'Screening for trigger factors, food allergies, and barrier repair lipids',
      'Close liver and metabolic monitoring for patients on systemic therapy'
    ],
    suitableFor: 'Patients suffering from persistent red, scaly, itchy patches and cracked hands/feet'
  },
  {
    id: 'radiofrequency-mole-removal',
    category: 'surgery',
    categoryLabel: 'Minor Dermatosurgery',
    title: 'Radiofrequency Mole, Wart & Skin Tag Ablation',
    summary: 'Precise radiosurgical vaporization of benign cutaneous growths with negligible scarring.',
    indication: 'Facial moles, seborrheic keratosis, neck skin tags (acrochordons), viral warts.',
    technology: 'Ellman 4.0 MHz high-frequency cold radiofrequency ablation unit',
    sessionsRequired: 'Usually single sitting',
    downtime: 'Mild crusting resolving cleanly in 5–7 days',
    approxFee: '₹1,200 – ₹3,500 depending on lesion count and size',
    protocolHighlights: [
      'Done under local surface anesthesia without any pain or scalpel incision',
      'Minimal lateral thermal damage ensuring clean re-epithelialization',
      'Histopathology dispatch available for suspicious pigmented lesions'
    ],
    suitableFor: 'Cosmetically bothersome or recurrent skin tags, moles, and warts'
  },
  {
    id: 'chemical-peels-glow',
    category: 'aesthetics',
    categoryLabel: 'Medi-Facials',
    title: 'Dermatologist-Grade Medical Chemical Peels',
    summary: 'Custom concentrations of Mandelic, Glycolic, Salicylic, and Yellow Retinol peels.',
    indication: 'Active acne breakout control, tanning, superficial pigment spots, and fine textural lines.',
    technology: 'Pharmaceutical-grade organic AHA, BHA and Retinol complex formulas',
    sessionsRequired: '3 – 5 sessions at 3-week intervals',
    downtime: 'Mild flaking from day 3 to day 5',
    approxFee: '₹1,500 – ₹2,800 per peel',
    protocolHighlights: [
      'Doctor assesses skin barrier thickness before selecting custom peel formulation',
      'Neutralized carefully with medical neutralizing buffer solution',
      'Includes barrier restorative calming post-peel balm and mineral sunscreen'
    ],
    suitableFor: 'Tanned skin, recurring active pimples, and post-festive skin dullness'
  }
];

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: 'case-acne-scars',
    title: 'Grade 3 Inflammatory Acne & Rolling Scars',
    category: 'Acne Revision',
    patientAgeGender: '24-year-old Male (Boring Road, Patna)',
    sessions: '4 Sessions over 16 weeks',
    timeframe: '4 Months',
    doctorInCharge: 'Dr. Saurabh Verma, MD',
    procedureDone: 'Nokor Subcision + Cross TCA + Fractional Microneedle RF',
    clinicalNote: 'Patient presented with severe post-acne indurations and deep fibrous tethering. Combined subcision freed the dermal anchors, followed by collagen rebuilding.',
    beforeLabel: 'Before Treatment (Deep Tethered Scars)',
    afterLabel: 'After 4 Sessions (80% Skin Smoothening)',
    beforeVisualColor: 'from-amber-900/60 to-rose-900/70',
    afterVisualColor: 'from-emerald-950/40 to-teal-900/50',
    description: 'Noticeable elevation of pitted depressions and disappearance of active cystic eruptions.'
  },
  {
    id: 'case-melasma-pigment',
    title: 'Bilateral Malar Recalcitrant Melasma',
    category: 'Laser Pigmentation',
    patientAgeGender: '38-year-old Female (Kankarbagh, Patna)',
    sessions: '5 Sessions spaced 3 weeks',
    timeframe: '3.5 Months',
    doctorInCharge: 'Dr. Priya N. Sinha',
    procedureDone: 'Low-Fluence 1064nm Q-Switched Nd:YAG Laser + Oral Tranexamic Regimen',
    clinicalNote: 'Deep mixed epidermal-dermal melasma present for 4 years after pregnancy. Laser toning safely dispersed melanin without post-inflammatory rebound.',
    beforeLabel: 'Before (Dense Dark Butterfly Patches)',
    afterLabel: 'After (90% Pigment Clearance & Even Tone)',
    beforeVisualColor: 'from-amber-950/70 to-stone-900/70',
    afterVisualColor: 'from-teal-950/40 to-slate-900/40',
    description: 'Remarkable clearing of hyper-pigmented butterfly distribution across both cheeks and nose bridge.'
  },
  {
    id: 'case-hair-thinning',
    title: 'Grade 3 Norwood Male Pattern Thinning',
    category: 'Hair Restoration',
    patientAgeGender: '29-year-old Male (Bailey Road, Patna)',
    sessions: '4 Sessions of Autologous GFC',
    timeframe: '4 Months',
    doctorInCharge: 'Dr. Priya N. Sinha',
    procedureDone: 'High-Purity GFC (Growth Factor Concentrate) + Topical 5% Minoxidil-Finasteride',
    clinicalNote: 'Marked follicular miniaturization at the frontal mid-scalp and vertex. Trichoscopic hair shaft diameter increased by 42% after 4 sittings.',
    beforeLabel: 'Baseline (Visible Scalp Exposure & Thinning)',
    afterLabel: 'Month 4 (Dense Follicular Coverage)',
    beforeVisualColor: 'from-stone-900/80 to-amber-950/60',
    afterVisualColor: 'from-emerald-950/60 to-slate-950/70',
    description: 'Substantial thickening of hair shafts and restoration of scalp density at crown and vertex.'
  },
  {
    id: 'case-facial-hair-pcos',
    title: 'PCOS-Induced Coarse Facial Hirsutism',
    category: 'Laser Hair Reduction',
    patientAgeGender: '26-year-old Female (Rajendra Nagar, Patna)',
    sessions: '6 Laser Sessions',
    timeframe: '6 Months',
    doctorInCharge: 'Dr. Priya N. Sinha',
    procedureDone: 'Triple-Wavelength Diode/Nd:YAG Contact Laser with Chilled Tip',
    clinicalNote: 'Coarse terminal hair on chin and jawline secondary to polycystic ovarian syndrome. Shaving frequency reduced from daily to zero in 6 months.',
    beforeLabel: 'Before (Dense Coarse Chin Hair & Shave Irritation)',
    afterLabel: 'After 6 Sessions (Velus Hair, Zero Razor Bumps)',
    beforeVisualColor: 'from-zinc-900/70 to-rose-950/60',
    afterVisualColor: 'from-teal-950/40 to-stone-900/50',
    description: 'Smooth, irritation-free jawline without ingrown hairs or post-inflammatory dark marks.'
  }
];

export const PATIENT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    patientName: 'Rohan Shrivastava',
    locality: 'Boring Road, Patna',
    condition: 'Cystic Acne & Scar Treatment',
    rating: 5,
    doctorName: 'Dr. Saurabh Verma',
    comment: 'I had visited 3 different doctors in Patna who kept giving me steroid creams that only ruined my face. Dr. Saurabh Verma explained the root cause scientifically, stopped the harmful creams, and did subcision with fractional laser. My skin is 85% clearer in 4 months.',
    date: 'February 2026'
  },
  {
    id: 'rev-2',
    patientName: 'Sneha Kumari',
    locality: 'Kankarbagh, Patna',
    condition: 'Melasma & Pigmentation',
    rating: 5,
    doctorName: 'Dr. Priya N. Sinha',
    comment: 'The Q-switched laser at their Kankarbagh branch is truly world-class. Dr. Priya is very gentle and never pushed unnecessary packages. My dark patches on both cheeks have almost completely vanished. The clinic is spotless and very punctual.',
    date: 'January 2026'
  },
  {
    id: 'rev-3',
    patientName: 'Amitabh Ranjan',
    locality: 'Patliputra Colony, Patna',
    condition: 'GFC Hair Loss Therapy',
    rating: 5,
    doctorName: 'Dr. Priya N. Sinha',
    comment: 'I was hesitant about hair treatments because regular PRP is quite painful. Dr. Priya suggested GFC therapy which was surprisingly comfortable. By the 3rd session my excessive hair fall stopped completely and new baby hair sprouted on my crown.',
    date: 'December 2025'
  },
  {
    id: 'rev-4',
    patientName: 'Pooja Agarwal',
    locality: 'Bailey Road (Raja Bazar), Patna',
    condition: 'PCOS Laser Hair Reduction',
    rating: 5,
    doctorName: 'Dr. Priya N. Sinha',
    comment: 'Best laser hair removal experience in Patna! Their cooling handpiece makes the procedure completely painless. The female staff and doctors maintain utmost medical privacy and hygienic single-use covers.',
    date: 'March 2026'
  }
];

export const FAQ_ITEMS = [
  {
    question: 'How do I choose between the Boring Road and Kankarbagh clinic locations?',
    answer: 'Both clinics are equipped with identical US-FDA laser infrastructure, digital dermoscopy, and minor dermatosurgery suites. You can select whichever is closest to you. Dr. Saurabh Verma and Dr. Priya Sinha rotate between both centers on alternating days (Mon/Wed/Fri and Tue/Thu/Sat).'
  },
  {
    question: 'What is the initial consultation fee and what is included?',
    answer: 'The initial consultation fee is ₹700. This includes an in-depth dermatological examination, high-magnification polarized dermoscopy / trichoscopy scalp scan, and a personalized prescription. A follow-up within 7 days is complimentary.'
  },
  {
    question: 'How should I prepare for my skin or scalp consultation?',
    answer: 'Please do not apply makeup, heavy concealers, or oily hair products on the morning of your appointment so our dermatologists can inspect the natural skin barrier. If you have been using any steroid or medicated creams, please bring the tubes or past prescriptions with you.'
  },
  {
    question: 'Are laser treatments safe for Indian (Fitzpatrick IV–V) skin types?',
    answer: 'Yes, absolutely. We strictly deploy long-pulsed 1064nm Nd:YAG and calibrated Diode wavelengths that bypass epidermal melanin. This completely eliminates the risk of burns and post-inflammatory hyperpigmentation that commonly occurs with cheap uncalibrated IPL machines.'
  },
  {
    question: 'Can I get same-day appointment slots in Patna?',
    answer: 'Yes, we reserve dedicated emergency and walk-in slots every morning and evening. However, booking your slot 24 hours in advance through our online scheduler guarantees zero waiting time.'
  }
];
