// ─────────────────────────────────────────────────────────────────────────────
//  MAMTA ESTATES — Project Data
//
//  HOW TO ADD YOUR PHOTOS & BROCHURE:
//  1. Drop photos into:  public/projects/{id}/photos/photo1.jpg, photo2.jpg …
//  2. Drop brochure into: public/projects/{id}/brochure/brochure.pdf
//  3. Update the "images" and "floorPlans" arrays below for that project.
//  4. The brochureUrl is already wired — no other changes needed.
// ─────────────────────────────────────────────────────────────────────────────

// Reliable placeholder images (seeded, will not break)
// Replace each URL with /projects/{id}/photos/photo1.jpg once you upload your photos.
const PH = (seed, w = 900, h = 600) => `https://picsum.photos/seed/${seed}/${w}/${h}`

export const projects = [

  /* ══════════════════════════════════════════════════════════════════
     1. RESIDENTIAL PROJECT — Ranchi I
  ══════════════════════════════════════════════════════════════════ */
  {
    id: 'onkareshwar-apartment-ranchi',
    name: 'Residential Project',
    city: 'Ranchi',
    area: 'Ranchi, Jharkhand',
    type: 'Residential',
    status: 'Completed',
    bookingOpen: false,
    description: 'A well-crafted residential development in Ranchi — built on our founding principles of structural integrity and livable design.',
    overview: 'A thoughtfully designed residential complex delivering quality construction, practical layouts, and durable finishes. Built with earthquake-resistant RCC structure and premium material specifications, this project set the benchmark for mid-segment residential quality in the city.',
    totalUnits: '—',
    configuration: '2 BHK / 3 BHK',
    totalArea: '—',
    possessionDate: 'Delivered',
    reraId: '—',
    priceRange: '—',
    floors: '—',
    parking: 'Available',
    structuralConsultants: 'Mamta Estates Engineering Team',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80',
    ],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80',
    amenities: [
      'Earthquake Resistant RCC Structure',
      'Gated Community',
      'Lift',
      'Covered Car Parking',
      '24hr Security',
      'CCTV',
      'Power Backup',
      'Water Supply',
    ],
    nearby: [
      { label: 'City Centre', distance: 'Nearby' },
      { label: 'Schools & Colleges', distance: 'Nearby' },
      { label: 'Hospitals', distance: 'Nearby' },
    ],
    brochureUrl: '/projects/onkareshwar-apartment-ranchi/brochure/brochure.pdf',
  },

  /* ══════════════════════════════════════════════════════════════════
     2. RESIDENTIAL PROJECT — Ranchi II
  ══════════════════════════════════════════════════════════════════ */
  {
    id: 'trivambakeswar-apartment-ranchi',
    name: 'Premium Residency',
    city: 'Ranchi',
    area: 'Ranchi, Jharkhand',
    type: 'Residential',
    status: 'Completed',
    bookingOpen: false,
    description: 'A premium residential complex in Ranchi — designed for families seeking quality, space, and lasting structural integrity.',
    overview: 'A considered approach to residential living in Ranchi. Developed with the same structural rigour and finish quality that defines every Mamta Estates project, this development offers thoughtfully proportioned apartments with excellent connectivity to key city landmarks.',
    totalUnits: '—',
    configuration: '2 BHK / 3 BHK',
    totalArea: '—',
    possessionDate: 'Delivered',
    reraId: '—',
    priceRange: '—',
    floors: '—',
    parking: 'Available',
    structuralConsultants: 'Mamta Estates Engineering Team',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80',
    ],
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80',
    amenities: [
      'Earthquake Resistant RCC Structure',
      'Gated Community',
      'Lift',
      'Covered Car Parking',
      '24hr Security',
      'CCTV',
      'Power Backup',
      'Water Supply',
    ],
    nearby: [
      { label: 'City Centre', distance: 'Nearby' },
      { label: 'Schools & Colleges', distance: 'Nearby' },
      { label: 'Hospitals', distance: 'Nearby' },
    ],
    brochureUrl: '/projects/trivambakeswar-apartment-ranchi/brochure/brochure.pdf',
  },

  /* ══════════════════════════════════════════════════════════════════
     3. RESIDENTIAL PROJECT — Patna, Kati Factory Road
  ══════════════════════════════════════════════════════════════════ */
  {
    id: 'rameshwaram-kati-factory-road-patna',
    name: 'Riverside Apartments',
    city: 'Patna',
    area: 'Kati Factory Road',
    type: 'Residential',
    status: 'Completed',
    bookingOpen: false,
    description: 'A landmark residential development on Kati Factory Road, Patna — delivering spacious apartments with superior construction and modern amenities.',
    overview: 'Located on Kati Factory Road, this flagship development by Mamta Estates in Patna features robustly constructed apartments with generous room proportions, designed for families seeking long-term quality and comfort.',
    totalUnits: '—',
    configuration: '2 BHK / 3 BHK',
    totalArea: '—',
    possessionDate: 'Delivered',
    reraId: '—',
    priceRange: '—',
    floors: '—',
    parking: 'Available',
    structuralConsultants: 'Mamta Estates Engineering Team',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80',
      'https://images.unsplash.com/photo-1582407947304-fd86f28320c7?w=900&q=80',
    ],
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80',
    amenities: [
      'Earthquake Resistant RCC Structure',
      'Gated Community',
      'Lift',
      'Covered Car Parking',
      '24hr Security',
      'CCTV',
      'Power Backup',
      'Water Supply',
    ],
    nearby: [
      { label: 'Kati Factory Road', distance: 'On-site' },
      { label: 'Patna City Centre', distance: 'Nearby' },
      { label: 'Schools & Hospitals', distance: 'Nearby' },
    ],
    brochureUrl: '/projects/rameshwaram-kati-factory-road-patna/brochure/brochure.pdf',
  },

  /* ══════════════════════════════════════════════════════════════════
     4. RESIDENTIAL PROJECT — Patna, Patel Nagar
  ══════════════════════════════════════════════════════════════════ */
  {
    id: 'rameshwaram-patel-nagar-patna',
    name: 'Garden View Apartments',
    city: 'Patna',
    area: 'Patel Nagar',
    type: 'Residential',
    status: 'Completed',
    bookingOpen: false,
    description: 'Nestled in the established Patel Nagar neighbourhood — a quality residential development with excellent access to Patna\'s key commercial and social infrastructure.',
    overview: 'Located at Patel Nagar, one of Patna\'s most mature and well-connected neighbourhoods. Designed with the same construction standards as all Mamta Estates projects, this development offers families a safe, well-finished, and connected living environment.',
    totalUnits: '—',
    configuration: '2 BHK / 3 BHK',
    totalArea: '—',
    possessionDate: 'Delivered',
    reraId: '—',
    priceRange: '—',
    floors: '—',
    parking: 'Available',
    structuralConsultants: 'Mamta Estates Engineering Team',
    images: [
      'https://images.unsplash.com/photo-1582407947304-fd86f28320c7?w=900&q=80',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80',
    ],
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f28320c7?w=900&q=80',
    amenities: [
      'Earthquake Resistant RCC Structure',
      'Gated Community',
      'Lift',
      'Covered Car Parking',
      '24hr Security',
      'CCTV',
      'Power Backup',
      'Water Supply',
    ],
    nearby: [
      { label: 'Patel Nagar', distance: 'On-site' },
      { label: 'Patna Junction', distance: 'Nearby' },
      { label: 'Schools & Hospitals', distance: 'Nearby' },
    ],
    brochureUrl: '/projects/rameshwaram-patel-nagar-patna/brochure/brochure.pdf',
  },

  /* ══════════════════════════════════════════════════════════════════
     5. GATED COMMUNITY — Patna, New Mahavir Colony
  ══════════════════════════════════════════════════════════════════ */
  {
    id: 'shivam-residency-new-mahavir-colony',
    name: 'Emerald Enclave',
    city: 'Patna',
    area: 'New Mahavir Colony',
    type: 'Residential',
    status: 'Completed',
    bookingOpen: false,
    description: 'An exclusive 16-unit gated community in New Mahavir Colony — delivered on schedule with earthquake-resistant construction and premium finishes.',
    overview: 'A definitive proof of our commitment to quality and timely delivery. Nestled in New Mahavir Colony, this boutique development offers 16 exclusive 3 BHK apartments across a single 4-floor structure. The low-density design ensures privacy, natural light, and a tightly knit community feel. Possession commenced in January 2021 — on schedule.',
    totalUnits: 16,
    configuration: '3 BHK',
    totalArea: '0.16 Acres (661 Sq-m)',
    possessionDate: 'January 2021',
    reraId: 'BRERAP00125-1/347/R-124/2018',
    priceRange: '₹65.9L – ₹90L',
    floors: 4,
    parking: 'Covered (Dedicated)',
    structuralConsultants: 'CASCON (Structural) · PH Engineers (Public Health) · ARCC (Geological)',
    sizeVariants: [
      { label: 'Type A', carpetArea: '864 sq. ft.' },
      { label: 'Type B', carpetArea: '913 sq. ft.' },
    ],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
    ],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80',
    amenities: [
      'Earthquake Resistant RCC Structure',
      'Gated Community',
      'Lift',
      'Covered Car Parking',
      'Community Hall',
      'Green Views',
      '24hr Security',
      'CCTV',
    ],
    nearby: [
      { label: 'New Mahavir Colony', distance: 'On-site' },
      { label: 'DAV Public School', distance: 'Nearby' },
      { label: 'Paras HMRI Hospital', distance: 'Nearby' },
    ],
    brochureUrl: '/projects/shivam-residency-new-mahavir-colony/brochure/brochure.pdf',
  },

  /* ══════════════════════════════════════════════════════════════════
     6. PREMIUM ENCLAVE — Patna, New AG Colony   ★ BOOKING OPEN ★
  ══════════════════════════════════════════════════════════════════ */
  {
    id: 'hari-enclave-new-ag-colony',
    name: 'Premium Enclave',
    city: 'Patna',
    area: 'New AG Colony',
    type: 'Residential',
    status: 'Ongoing',
    bookingOpen: true,
    description: 'A premium ultra-low-density enclave in New AG Colony — offering expansive 3 BHK apartments with modern amenities and a boutique living experience. Bookings are open now.',
    overview: 'This exclusive development features just 4 units per floor across a single 4-storey tower — creating a deeply private, boutique living environment in the heart of New AG Colony, Patna. With super built-up areas ranging from 1,450 to 1,520 sq. ft., every apartment is engineered for maximum cross-ventilation, natural light, and generous living space.',
    totalUnits: 16,
    configuration: 'Exclusively 3 BHK',
    totalArea: 'Single Tower, 4 Floors',
    possessionDate: 'Dec 2025 – Feb 2027',
    reraId: 'BRERAP00125-2/15/R-1539/2023',
    priceRange: '—',
    floors: 4,
    parking: 'Dedicated Covered Parking',
    launchDate: 'February 2023',
    structuralConsultants: 'CASCON (Structural) · PH Engineers (Public Health)',
    sizeVariants: [
      { label: 'Type A', superBuiltUp: '1,450 sq. ft.' },
      { label: 'Type B', superBuiltUp: '1,512 sq. ft.' },
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80',
    ],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80',
    amenities: [
      'Earthquake Resistant RCC Structure',
      'CCTV Surveillance (24/7)',
      'Fire Fighting System',
      '24/7 Power Backup',
      '24/7 Water Supply',
      'Intercom Facility',
      'High-Speed Elevator',
      'Dedicated Car Parking',
      'Security Personnel',
    ],
    nearby: [
      { label: 'New AG Colony', distance: 'On-site' },
      { label: 'Patliputra Railway Station', distance: 'Nearest' },
      { label: 'Jay Prakash Narayan Airport', distance: '6 km' },
      { label: 'Patna Junction', distance: '8 km' },
      { label: 'G.D. Goenka School', distance: 'Nearby' },
      { label: 'Paras HMRI Hospital', distance: 'Nearby' },
    ],
    floorPlans: {
      'Typical Floor Plan': '/projects/hari-enclave-new-ag-colony/floorplans/Typical.png',
      'Ground Floor Plan':  '/projects/hari-enclave-new-ag-colony/floorplans/Ground.png',
    },
    brochureUrl: '/projects/hari-enclave-new-ag-colony/brochure/brochure.pdf',
    model3dUrl:  '/projects/hari-enclave-new-ag-colony/hari_enclave_ar.glb',
    arPageUrl:   null,
  },

  /* ══════════════════════════════════════════════════════════════════
     7. UPCOMING PROJECT — Patna, New AG Colony
  ══════════════════════════════════════════════════════════════════ */
  {
    id: 'kailasam-legacy',
    name: 'Upcoming Signature Project',
    city: 'Patna',
    area: 'New AG Colony',
    type: 'Residential',
    status: 'Upcoming',
    bookingOpen: false,
    description: 'Our next landmark at New AG Colony, Patna — a signature premium residence. Coming soon.',
    overview: 'Our most anticipated upcoming development — a premium residential address at New AG Colony, steps from our current project. Built with the same structural quality and finish standards that define every Mamta Estates project.',
    totalUnits: '—',
    configuration: '3 BHK',
    totalArea: '—',
    possessionDate: 'To Be Announced',
    reraId: 'RERA Registration In Progress',
    priceRange: '—',
    floors: '—',
    parking: 'Dedicated Covered Parking',
    launchDate: 'Coming Soon',
    images: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80',
    ],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80',
    amenities: [
      'Earthquake Resistant RCC Structure',
      '24/7 Power Backup',
      '24/7 Water Supply',
      'Landscaped Gardens',
      'High-Speed Elevator',
      'Dedicated Car Parking',
      'CCTV Surveillance',
      'Security Personnel',
    ],
    nearby: [
      { label: 'New AG Colony', distance: 'On-site' },
      { label: 'Premium Enclave (Phase I)', distance: 'Same Campus' },
      { label: 'Patliputra Railway Station', distance: 'Nearest' },
      { label: 'Jay Prakash Narayan Airport', distance: '6 km' },
    ],
    brochureUrl: null,
  },
]

export const testimonials = [
  {
    name: 'Rajesh Kumar Sinha',
    city: 'Patna',
    project: 'Emerald Enclave',
    quote: 'We moved into our 3 BHK and the quality has exceeded every expectation. Solid construction, premium finishes, and the team was transparent through the entire process. Possession was on time — January 2021 as promised.',
    initials: 'RK',
  },
  {
    name: 'Priya Narayan',
    city: 'Patna',
    project: 'Emerald Enclave',
    quote: 'The community hall and covered parking made all the difference for us. It feels like a private colony — not a crowded apartment block. Very happy with the green surroundings too.',
    initials: 'PN',
  },
  {
    name: 'Amit Verma',
    city: 'New AG Colony, Patna',
    project: 'Premium Enclave',
    quote: 'We booked primarily for the location — New AG Colony is extremely well connected. The RERA compliance gave us complete legal confidence, and the construction quality is visible on every site visit.',
    initials: 'AV',
  },
  {
    name: 'Sunita Devi',
    city: 'Patna',
    project: 'Emerald Enclave',
    quote: 'As a family with elderly parents, the earthquake-resistant structure and lift facilities were our top priorities. Mamta Estates delivered on both. The structural quality is something you can actually see and feel.',
    initials: 'SD',
  },
  {
    name: 'Manoj Kumar',
    city: 'Patna',
    project: 'Premium Enclave',
    quote: 'The construction quality is exceptional. Most developers in Patna cut corners, but here you can see the attention to detail on every site visit. A genuinely premium project.',
    initials: 'MK',
  },
]
