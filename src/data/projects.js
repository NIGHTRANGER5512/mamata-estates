// ─────────────────────────────────────────────────────────────────────────────
//  TRIBHUVAN AWAS — Project Data
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
     1. ONKARESHWAR APARTMENT — Ranchi
  ══════════════════════════════════════════════════════════════════ */
  {
    id: 'onkareshwar-apartment-ranchi',
    name: 'Onkareshwar Apartment',
    city: 'Ranchi',
    area: 'Ranchi, Jharkhand',
    type: 'Residential',
    status: 'Completed',
    bookingOpen: false,
    description: 'A well-crafted residential development in Ranchi — built on Tribhuvan Awas\'s founding principles of structural integrity and livable design.',
    overview: 'Onkareshwar Apartment stands as Tribhuvan Awas\'s mark on Ranchi — a thoughtfully designed residential complex delivering quality construction, practical layouts, and durable finishes. Built with earthquake-resistant RCC structure and premium material specifications, this project set the benchmark for mid-segment residential quality in the city.',
    totalUnits: '—',           // Update when available
    configuration: '2 BHK / 3 BHK',
    totalArea: '—',            // Update when available
    possessionDate: 'Delivered',
    reraId: '—',               // Update with RERA ID
    priceRange: '—',           // Update when available
    floors: '—',
    parking: 'Available',
    structuralConsultants: 'Tribhuvan Awas Engineering Team',
    images: [
      '/projects/onkareshwar-apartment-ranchi/photos/photo1.jpg',
      '/projects/onkareshwar-apartment-ranchi/photos/photo2.jpg',
    ],
    image: '/projects/onkareshwar-apartment-ranchi/photos/photo1.jpg',
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
     2. TRIVAMBAKESWAR APARTMENT — Ranchi
  ══════════════════════════════════════════════════════════════════ */
  {
    id: 'trivambakeswar-apartment-ranchi',
    name: 'Trivambakeswar Apartment',
    city: 'Ranchi',
    area: 'Ranchi, Jharkhand',
    type: 'Residential',
    status: 'Completed',
    bookingOpen: false,
    description: 'A premium residential complex in Ranchi — designed for families seeking quality, space, and lasting structural integrity.',
    overview: 'Trivambakeswar Apartment represents a considered approach to residential living in Ranchi. Developed with the same structural rigour and finish quality that defines every Tribhuvan Awas project, this development offers thoughtfully proportioned apartments with excellent connectivity to key city landmarks.',
    totalUnits: '—',
    configuration: '2 BHK / 3 BHK',
    totalArea: '—',
    possessionDate: 'Delivered',
    reraId: '—',
    priceRange: '—',
    floors: '—',
    parking: 'Available',
    structuralConsultants: 'Tribhuvan Awas Engineering Team',
    images: [
      '/projects/trivambakeswar-apartment-ranchi/photos/photo1.jpg',
    ],
    image: '/projects/trivambakeswar-apartment-ranchi/photos/photo1.jpg',
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
     3. RAMESHWARAM APARTMENT — Patna, Kati Factory Road
  ══════════════════════════════════════════════════════════════════ */
  {
    id: 'rameshwaram-kati-factory-road-patna',
    name: 'Rameshwaram Apartment',
    city: 'Patna',
    area: 'Kati Factory Road',
    type: 'Residential',
    status: 'Completed',
    bookingOpen: false,
    description: 'A landmark residential development on Kati Factory Road, Patna — delivering spacious apartments with superior construction and modern amenities.',
    overview: 'Rameshwaram Apartment on Kati Factory Road is a flagship development by Tribhuvan Awas in Patna. Strategically located for connectivity across the city, this project features robustly constructed apartments with generous room proportions, designed for families seeking long-term quality and comfort.',
    totalUnits: '—',
    configuration: '2 BHK / 3 BHK',
    totalArea: '—',
    possessionDate: 'Delivered',
    reraId: '—',
    priceRange: '—',
    floors: '—',
    parking: 'Available',
    structuralConsultants: 'Tribhuvan Awas Engineering Team',
    images: [
      '/projects/rameshwaram-kati-factory-road-patna/photos/photo1.jpg',
      '/projects/rameshwaram-kati-factory-road-patna/photos/photo2.jpg',
      '/projects/rameshwaram-kati-factory-road-patna/photos/photo3.jpg',
    ],
    image: '/projects/rameshwaram-kati-factory-road-patna/photos/photo1.jpg',
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
     4. RAMESHWARAM APARTMENT — Patna, Patel Nagar
  ══════════════════════════════════════════════════════════════════ */
  {
    id: 'rameshwaram-patel-nagar-patna',
    name: 'Rameshwaram Apartment',
    city: 'Patna',
    area: 'Patel Nagar',
    type: 'Residential',
    status: 'Completed',
    bookingOpen: false,
    description: 'Nestled in the established Patel Nagar neighbourhood — a quality residential development with excellent access to Patna\'s key commercial and social infrastructure.',
    overview: 'Rameshwaram Apartment at Patel Nagar occupies a prime residential address in one of Patna\'s most mature and well-connected neighbourhoods. Designed with the same construction standards as all Tribhuvan Awas projects, this development offers families a safe, well-finished, and connected living environment.',
    totalUnits: '—',
    configuration: '2 BHK / 3 BHK',
    totalArea: '—',
    possessionDate: 'Delivered',
    reraId: '—',
    priceRange: '—',
    floors: '—',
    parking: 'Available',
    structuralConsultants: 'Tribhuvan Awas Engineering Team',
    images: [
      '/projects/rameshwaram-patel-nagar-patna/photos/photo1.jpg',
      '/projects/rameshwaram-patel-nagar-patna/photos/photo2.jpg',
      '/projects/rameshwaram-patel-nagar-patna/photos/photo3.jpg',
    ],
    image: '/projects/rameshwaram-patel-nagar-patna/photos/photo1.jpg',
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
     5. SHIVAM RESIDENCY — Patna, New Mahavir Colony
  ══════════════════════════════════════════════════════════════════ */
  {
    id: 'shivam-residency-new-mahavir-colony',
    name: 'Shivam Residency',
    city: 'Patna',
    area: 'New Mahavir Colony',
    type: 'Residential',
    status: 'Completed',
    bookingOpen: false,
    description: 'An exclusive 16-unit gated community in New Mahavir Colony — delivered on schedule with earthquake-resistant construction and premium finishes.',
    overview: 'Shivam Residency stands as definitive proof of Tribhuvan Awas\'s commitment to quality and timely delivery. Nestled in New Mahavir Colony, this boutique development offers 16 exclusive 3 BHK apartments across a single 4-floor structure. The low-density design ensures privacy, natural light, and a tightly knit community feel. Possession commenced in January 2021 — on schedule.',
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
      '/projects/shivam-residency-new-mahavir-colony/photos/photo1.jpg',
    ],
    image: '/projects/shivam-residency-new-mahavir-colony/photos/photo1.jpg',
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
     6. HARI ENCLAVE — Patna, New AG Colony   ★ BOOKING OPEN ★
  ══════════════════════════════════════════════════════════════════ */
  {
    id: 'hari-enclave-new-ag-colony',
    name: 'Hari Enclave',
    city: 'Patna',
    area: 'New AG Colony',
    type: 'Residential',
    status: 'Ongoing',
    bookingOpen: true,
    description: 'A premium ultra-low-density enclave in New AG Colony — offering expansive 3 BHK apartments with modern amenities and a boutique living experience. Bookings are open now.',
    overview: 'Hari Enclave represents Tribhuvan Awas\'s evolution into premium lifestyle curation. This exclusive development features just 4 units per floor across a single 4-storey tower — creating a deeply private, boutique living environment in the heart of New AG Colony, Patna. With super built-up areas ranging from 1,450 to 1,520 sq. ft., every apartment is engineered for maximum cross-ventilation, natural light, and generous living space.',
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
      '/projects/hari-enclave-new-ag-colony/photos/photo1.jpg',
      '/projects/hari-enclave-new-ag-colony/photos/photo2.jpg',
      '/projects/hari-enclave-new-ag-colony/photos/photo3.jpg',
    ],
    image: '/projects/hari-enclave-new-ag-colony/photos/photo1.jpg',
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
      '3 BHK – 1,450 sq.ft.': PH('hari-fp1', 800, 600),
      '3 BHK – 1,512 sq.ft.': PH('hari-fp2', 800, 600),
      '3 BHK – 1,520 sq.ft.': PH('hari-fp3', 800, 600),
    },
    floorPlans: {
      'Typical Floor Plan': '/projects/hari-enclave-new-ag-colony/floorplans/Typical.png',
      'Ground Floor Plan':  '/projects/hari-enclave-new-ag-colony/floorplans/Ground.png',
    },
    brochureUrl: '/projects/hari-enclave-new-ag-colony/brochure/brochure.pdf',
    model3dUrl:  '/projects/hari-enclave-new-ag-colony/hari_enclave_ar.glb',
    arPageUrl:   'https://nightranger5512.github.io/apartment-ar/',
  },

  /* ══════════════════════════════════════════════════════════════════
     7. UPCOMING PROJECT — Patna, New AG Colony
  ══════════════════════════════════════════════════════════════════ */
  {
    id: 'kailasam-legacy',
    name: 'Kailasam Legacy',
    city: 'Patna',
    area: 'New AG Colony',
    type: 'Residential',
    status: 'Upcoming',
    bookingOpen: false,
    description: 'Kailasam Legacy — our next landmark at New AG Colony, Patna. Coming soon.',
    overview: 'Kailasam Legacy is Tribhuvan Awas\'s most anticipated upcoming development — a premium residential address at New AG Colony, steps from Hari Enclave. Built with the same structural quality and finish standards that define every Tribhuvan Awas project.',
    totalUnits: '—',           // Update when available
    configuration: '3 BHK',
    totalArea: '—',
    possessionDate: 'To Be Announced',
    reraId: 'RERA Registration In Progress',
    priceRange: '—',
    floors: '—',
    parking: 'Dedicated Covered Parking',
    launchDate: 'Coming Soon',
    images: [
      '/projects/kailasam-legacy/photos/photo1.jpg',
    ],
    image: '/projects/kailasam-legacy/photos/photo1.jpg',
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
      { label: 'Hari Enclave (Phase I)', distance: 'Same Campus' },
      { label: 'Patliputra Railway Station', distance: 'Nearest' },
      { label: 'Jay Prakash Narayan Airport', distance: '6 km' },
    ],
    brochureUrl: null,   // Brochure coming soon
  },
]

export const testimonials = [
  {
    name: 'Rajesh Kumar Sinha',
    city: 'Patna',
    project: 'Shivam Residency',
    quote: 'We moved into our 3 BHK at Shivam Residency and the quality has exceeded every expectation. Solid construction, premium finishes, and the team was transparent through the entire process. Possession was on time — January 2021 as promised.',
    initials: 'RK',
  },
  {
    name: 'Priya Narayan',
    city: 'Patna',
    project: 'Shivam Residency',
    quote: 'The community hall and covered parking made all the difference for us. It feels like a private colony — not a crowded apartment block. Very happy with the green surroundings too.',
    initials: 'PN',
  },
  {
    name: 'Amit Verma',
    city: 'New AG Colony, Patna',
    project: 'Hari Enclave',
    quote: 'We booked in Hari Enclave primarily for the location — New AG Colony is extremely well connected. The RERA compliance gave us complete legal confidence, and the construction quality is visible on every site visit.',
    initials: 'AV',
  },
  {
    name: 'Sunita Devi',
    city: 'Patna',
    project: 'Shivam Residency',
    quote: 'As a family with elderly parents, the earthquake-resistant structure and lift facilities were our top priorities. Tribhuvan Awas delivered on both. The structural quality is something you can actually see and feel.',
    initials: 'SD',
  },
  {
    name: 'Manoj Kumar',
    city: 'Patna',
    project: 'Hari Enclave',
    quote: 'The construction quality at Hari Enclave is exceptional. Most developers in Patna cut corners, but here you can see the attention to detail on every site visit. A genuinely premium project.',
    initials: 'MK',
  },
]
