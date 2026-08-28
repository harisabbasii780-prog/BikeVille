/**
 * Central bike catalogue. Every image path lives here so assets can be swapped
 * in one place without touching component code.
 */

export type CategoryId =
  | 'street'
  | 'naked'
  | 'adventure'
  | 'enduro'
  | 'motocross'
  | 'supermoto';

export interface BikeSpecs {
  engine: string;
  power: string;
  powerHp: number;
  torque: string;
  weight: string;
  topSpeed: string;
  seatHeight: string;
  fuel: string;
  transmission: string;
  brakes: string;
  suspension: string;
  electronics: string;
}

export interface Bike {
  id: string;
  name: string;
  short: string;
  model: string;
  year: number;
  category: CategoryId;
  categoryLabel: string;
  tagline: string;
  /** Two words used by the hero's "READY TO ___" rotator */
  readyWords: [string, string];
  price: number;
  image: string;
  scene: string;
  availability: string;
  description: string;
  highlights: string[];
  specs: BikeSpecs;
  featured?: boolean;
  popular?: boolean;
}

export const BIKES: Bike[] = [
  {
    id: 'nx-1290-adventure-s',
    name: 'NX 1290 Adventure S',
    short: '1290 ADV S',
    model: 'NX-1290',
    year: 2025,
    category: 'adventure',
    categoryLabel: 'Adventure',
    tagline: 'Conquer every horizon.',
    readyWords: ['RIDE', 'EXPLORE'],
    price: 2150000,
    image: '/images/bikes/adventure.webp',
    scene: '/images/scenes/trail.webp',
    availability: 'In stock — 4 units',
    description:
      'Long-haul dominance without compromise. The NX 1290 pairs a 1301cc LC8 V-twin with semi-active WP APEX suspension and a 6D lean-angle sensor, so tarmac, gravel and everything between read the same under your wheels.',
    highlights: [
      'Semi-active WP APEX suspension',
      'Adaptive cruise with radar',
      'Cornering ABS + Motorcycle Traction Control',
      '23 L long-range tank',
    ],
    specs: {
      engine: '1301cc LC8 75° V-Twin',
      power: '160 HP @ 9,000 rpm',
      powerHp: 160,
      torque: '138 Nm @ 6,500 rpm',
      weight: '220 kg dry',
      topSpeed: '250 km/h',
      seatHeight: '849 mm adjustable',
      fuel: '23 litres',
      transmission: '6-speed / Quickshifter+',
      brakes: 'Radial 4-piston, 320 mm twin disc',
      suspension: 'WP APEX Semi-Active, 200 mm travel',
      electronics: '6D IMU · 7" TFT · 5 ride modes',
    },
    featured: true,
    popular: true,
  },
  {
    id: 'rx-1390-super-naked-r',
    name: 'RX 1390 Super Naked R',
    short: '1390 SUPER NAKED R',
    model: 'RX-1390',
    year: 2025,
    category: 'naked',
    categoryLabel: 'Naked',
    tagline: 'The beast has no manners.',
    readyWords: ['RACE', 'WIN'],
    price: 2400000,
    image: '/images/bikes/naked.webp',
    scene: '/images/scenes/studio.webp',
    availability: 'In stock — 2 units',
    description:
      'Nothing between you and 190 horsepower except a throttle cable and your own restraint. A camshift-equipped LC8 V-twin, chromoly trellis frame and track-derived electronics make the RX 1390 the most uncivilised thing on a number plate.',
    highlights: [
      'Camshift variable valve timing',
      'Track pack with launch control',
      'Brembo Stylema monobloc calipers',
      'Chromoly steel trellis frame',
    ],
    specs: {
      engine: '1350cc LC8 75° V-Twin',
      power: '190 HP @ 10,000 rpm',
      powerHp: 190,
      torque: '145 Nm @ 8,000 rpm',
      weight: '200 kg dry',
      topSpeed: '290 km/h',
      seatHeight: '834 mm',
      fuel: '17.5 litres',
      transmission: '6-speed / Quickshifter+',
      brakes: 'Brembo Stylema, 320 mm twin disc',
      suspension: 'WP APEX Semi-Active closed cartridge',
      electronics: '6D IMU · Launch control · Anti-wheelie',
    },
    featured: true,
    popular: true,
  },
  {
    id: 'ex-390-enduro-r',
    name: 'EX 390 Enduro R',
    short: '390 ENDURO R',
    model: 'EX-390',
    year: 2025,
    category: 'enduro',
    categoryLabel: 'Enduro',
    tagline: 'Where the road quits.',
    readyWords: ['ROAM', 'ESCAPE'],
    price: 450000,
    image: '/images/bikes/enduro.webp',
    scene: '/images/scenes/dirt.webp',
    availability: 'In stock — 9 units',
    description:
      'A genuine dual-sport with a 373cc single, 230 mm of travel and a 158 kg kerb weight. Light enough to pick up, tough enough that you probably will not have to.',
    highlights: [
      '230 mm suspension travel',
      'Offroad ABS with rear defeat',
      '21"/18" spoked wheels',
      'Ride-by-wire with 2 modes',
    ],
    specs: {
      engine: '373cc DOHC single',
      power: '44 HP @ 9,000 rpm',
      powerHp: 44,
      torque: '37 Nm @ 7,000 rpm',
      weight: '158 kg kerb',
      topSpeed: '170 km/h',
      seatHeight: '910 mm',
      fuel: '9 litres',
      transmission: '6-speed / slipper clutch',
      brakes: '285 mm front, 240 mm rear',
      suspension: 'WP APEX open cartridge, 230 mm',
      electronics: 'Offroad ABS · Cornering TC · TFT',
    },
    popular: true,
  },
  {
    id: 'mx-450-cross-f',
    name: 'MX 450 Cross F',
    short: '450 CROSS F',
    model: 'MX-450',
    year: 2025,
    category: 'motocross',
    categoryLabel: 'Motocross',
    tagline: 'Born on the gate.',
    readyWords: ['SEND', 'LAND'],
    price: 1250000,
    image: '/images/bikes/motocross.webp',
    scene: '/images/scenes/dirt.webp',
    availability: 'Made to order — 6 weeks',
    description:
      'A factory-spec race weapon. Hydroformed frame, 63 HP from a 450cc single and a launch control map developed with the factory team. Not road legal. Not sorry.',
    highlights: [
      'Factory launch control',
      'Hydroformed chromoly frame',
      'WP XACT air fork',
      'Traction control map switch',
    ],
    specs: {
      engine: '450cc SOHC single',
      power: '63 HP @ 9,500 rpm',
      powerHp: 63,
      torque: '51 Nm @ 7,500 rpm',
      weight: '102 kg dry',
      topSpeed: 'Race limited',
      seatHeight: '952 mm',
      fuel: '7.2 litres',
      transmission: '5-speed / Pankl gearbox',
      brakes: '260 mm front, 220 mm rear',
      suspension: 'WP XACT AER 48 air fork, 310 mm',
      electronics: 'Launch control · 2 maps · TC',
    },
    popular: true,
  },
  {
    id: 'sm-690-supermoto-r',
    name: 'SM 690 Supermoto R',
    short: '690 SUPERMOTO R',
    model: 'SM-690',
    year: 2025,
    category: 'supermoto',
    categoryLabel: 'Supermoto',
    tagline: 'Corners are optional.',
    readyWords: ['SLIDE', 'ATTACK'],
    price: 980000,
    image: '/images/bikes/supermoto.webp',
    scene: '/images/scenes/street-night.webp',
    availability: 'In stock — 3 units',
    description:
      'The largest single-cylinder production engine on earth, wrapped around 17" sticky rubber. A hooligan tool that treats roundabouts as an invitation.',
    highlights: [
      'Supermoto ABS mode',
      '693cc LC4 single',
      'Slipper clutch with anti-hopping',
      'Adjustable WP APEX suspension',
    ],
    specs: {
      engine: '693cc LC4 single',
      power: '74 HP @ 8,000 rpm',
      powerHp: 74,
      torque: '73.5 Nm @ 6,500 rpm',
      weight: '147 kg dry',
      topSpeed: '200 km/h',
      seatHeight: '890 mm',
      fuel: '13.5 litres',
      transmission: '6-speed / Quickshifter+',
      brakes: '320 mm radial 4-piston',
      suspension: 'WP APEX 48, fully adjustable',
      electronics: 'Supermoto ABS · MTC · Cruise',
    },
  },
  {
    id: 'rc-990-supersport-r',
    name: 'RC 990 Supersport R',
    short: '990 SUPERSPORT R',
    model: 'RC-990',
    year: 2025,
    category: 'street',
    categoryLabel: 'Supersport',
    tagline: 'Straight from the grid.',
    readyWords: ['PUSH', 'DOMINATE'],
    price: 1140000,
    image: '/images/bikes/sport.webp',
    scene: '/images/scenes/street-night.webp',
    availability: 'In stock — 5 units',
    description:
      'Full-fairing aggression with a 947cc parallel twin, winglets and a chassis tuned on European circuits. Road legal, track obsessed.',
    highlights: [
      'Aerodynamic downforce winglets',
      'Track ride mode with 9-level TC',
      'Full LED with cornering lights',
      '5" bonded-glass TFT',
    ],
    specs: {
      engine: '947cc LC8c parallel twin',
      power: '128 HP @ 9,500 rpm',
      powerHp: 128,
      torque: '103 Nm @ 7,750 rpm',
      weight: '179 kg dry',
      topSpeed: '265 km/h',
      seatHeight: '820 mm',
      fuel: '15 litres',
      transmission: '6-speed / Quickshifter+',
      brakes: '320 mm radial 4-piston',
      suspension: 'WP APEX closed cartridge',
      electronics: '6D IMU · Track mode · Pit lane limiter',
    },
    featured: true,
  },
  {
    id: 'dx-390-street',
    name: 'DX 390 Street',
    short: '390 STREET',
    model: 'DX-390',
    year: 2025,
    category: 'street',
    categoryLabel: 'Street',
    tagline: 'Your first taste of orange.',
    readyWords: ['START', 'COMMIT'],
    price: 320000,
    image: '/images/bikes/street.webp',
    scene: '/images/scenes/street-night.webp',
    availability: 'In stock — 12 units',
    description:
      'The corner-carver that started a generation. 45 horses, 165 kilos and a chassis that flatters everyone from commuter to track-day regular.',
    highlights: [
      'Split-trellis frame',
      'Cornering ABS with Supermoto mode',
      'Open-cartridge WP APEX fork',
      'Bluetooth connectivity',
    ],
    specs: {
      engine: '399cc DOHC single',
      power: '45 HP @ 8,500 rpm',
      powerHp: 45,
      torque: '39 Nm @ 7,000 rpm',
      weight: '165 kg kerb',
      topSpeed: '175 km/h',
      seatHeight: '820 mm',
      fuel: '15 litres',
      transmission: '6-speed / Quickshifter+',
      brakes: '320 mm ByBre radial',
      suspension: 'WP APEX 43, adjustable',
      electronics: 'Cornering ABS · MTC · 5" TFT',
    },
    popular: true,
  },
];

export const getBike = (id: string): Bike | undefined => BIKES.find((b) => b.id === id);

export const featuredBikes = BIKES.filter((b) => b.featured);
export const popularBikes = BIKES.filter((b) => b.popular);

/* ------------------------------------------------------------------ */
/* Categories                                                          */
/* ------------------------------------------------------------------ */

export interface Category {
  id: CategoryId;
  label: string;
  blurb: string;
  image: string;
  count: number;
}

export const CATEGORIES: Category[] = [
  { id: 'street', label: 'Street', blurb: 'City-shredding agility', image: '/images/cats/street.webp', count: 2 },
  { id: 'naked', label: 'Naked', blurb: 'Nothing to hide behind', image: '/images/cats/naked.webp', count: 1 },
  { id: 'adventure', label: 'Adventure', blurb: 'Continents, not corners', image: '/images/cats/adventure.webp', count: 1 },
  { id: 'enduro', label: 'Enduro', blurb: 'Past the end of the map', image: '/images/cats/enduro.webp', count: 1 },
  { id: 'motocross', label: 'Motocross', blurb: 'Gate drop to chequered', image: '/images/cats/motocross.webp', count: 1 },
  { id: 'supermoto', label: 'Supermoto', blurb: 'Sideways is a line', image: '/images/cats/supermoto.webp', count: 1 },
];

/* ------------------------------------------------------------------ */
/* Configurator                                                        */
/* ------------------------------------------------------------------ */

export interface ColorOption {
  id: string;
  name: string;
  swatch: string;
  accent: string;
  /** CSS filter used to tint the base render */
  filter: string;
  price: number;
}

export const COLORS: ColorOption[] = [
  { id: 'factory-orange', name: 'Factory Orange', swatch: '#ff5a00', accent: '#ff5a00', filter: 'none', price: 0 },
  { id: 'midnight-black', name: 'Midnight Black', swatch: '#1b1b1b', accent: '#8d8d8d', filter: 'saturate(0.08) brightness(0.82) contrast(1.15)', price: 12000 },
  { id: 'ceramic-white', name: 'Ceramic White', swatch: '#e9e7e3', accent: '#d6d3ce', filter: 'saturate(0.12) brightness(1.35) contrast(0.92)', price: 15000 },
  { id: 'racing-blue', name: 'Racing Blue', swatch: '#1d43c8', accent: '#3f6bff', filter: 'hue-rotate(205deg) saturate(1.25)', price: 18000 },
];

export interface WheelOption {
  id: string;
  name: string;
  swatch: string;
  price: number;
}

export const WHEELS: WheelOption[] = [
  { id: 'anodised-black', name: 'Anodised Black', swatch: '#1c1c1c', price: 0 },
  { id: 'factory-orange-rim', name: 'Orange Rim', swatch: '#ff5a00', price: 8000 },
  { id: 'brushed-silver', name: 'Brushed Silver', swatch: '#c7c9cc', price: 5000 },
  { id: 'graphite', name: 'Graphite', swatch: '#4a4d52', price: 6000 },
];

export interface AccessoryOption {
  id: string;
  name: string;
  desc: string;
  price: number;
}

export const ACCESSORIES: AccessoryOption[] = [
  { id: 'exhaust', name: 'Titanium Slip-On', desc: 'Race-spec exhaust, −3.2 kg', price: 85000 },
  { id: 'luggage', name: 'Touring Luggage Set', desc: '2 × 31 L side cases + top box', price: 42000 },
  { id: 'quickshift', name: 'Quickshifter+', desc: 'Clutchless up & down shifts', price: 28000 },
  { id: 'grips', name: 'Heated Grips', desc: '3-stage, bar-end integrated', price: 14000 },
  { id: 'crashbars', name: 'Crash Protection', desc: 'Tubular bars + engine guard', price: 18000 },
  { id: 'techpack', name: 'Tech Pack', desc: 'Track mode, launch, anti-wheelie', price: 35000 },
];

export interface PackageOption {
  id: string;
  name: string;
  desc: string;
  price: number;
  includes: string[];
}

export const PACKAGES: PackageOption[] = [
  {
    id: 'none',
    name: 'Standard',
    desc: 'Factory specification, ready to ride.',
    price: 0,
    includes: ['Standard warranty', 'Rider handbook', 'First service free'],
  },
  {
    id: 'street',
    name: 'Street Pack',
    desc: 'Everyday usability, dialled up.',
    price: 64000,
    includes: ['Comfort seat', 'Tank bag', 'USB-C power kit', 'Frame sliders'],
  },
  {
    id: 'track',
    name: 'Track Pack',
    desc: 'Circuit hardware and race maps.',
    price: 148000,
    includes: ['Race ECU maps', 'Rearsets', 'Fork upgrade kit', 'Track bodywork'],
  },
  {
    id: 'adventure',
    name: 'Adventure Pack',
    desc: 'Everything for the long way round.',
    price: 126000,
    includes: ['Aluminium panniers', 'Auxiliary LEDs', 'Skid plate', 'Tall screen'],
  },
];
