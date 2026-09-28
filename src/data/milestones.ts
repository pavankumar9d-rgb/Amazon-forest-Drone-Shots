export interface Milestone {
  id: number;
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  creditLine?: string;
  progressStart: number;
  progressEnd: number;
  timeStart: number; // in seconds (0 to 80)
  timeEnd: number;
  coordinates: string;
  altitude: string;
  biome: string;
  details: {
    label: string;
    value: string;
  }[];
  ambient: {
    color: string;
    glow: string;
    warmth: number; // 0 to 1
    teal: number; // 0 to 1
    accent: string;
  };
  cta?: string;
}

export const MILESTONES: Milestone[] = [
  {
    id: 1,
    slug: "sunrise-canopy",
    name: "Sunrise Canopy",
    title: "WELCOME TO THE WILD",
    subtitle: "A forest with no edge",
    progressStart: 0.0,
    progressEnd: 0.125,
    timeStart: 0,
    timeEnd: 10,
    coordinates: `03°08'42.1"S 60°01'38.4"W`,
    altitude: "140m AGL · High Emergent",
    biome: "Terra Firme Primary Canopy",
    details: [
      { label: "Canopy Height", value: "35–45 meters" },
      { label: "Atmospheric Mist", value: "98% Relative Humidity" },
      { label: "Solar Angle", value: "Sunrise +14°" },
    ],
    ambient: {
      color: "#F7F4EC",
      glow: "rgba(247, 244, 236, 0.18)",
      warmth: 0.25,
      teal: 0.05,
      accent: "#3C4A3A",
    },
  },
  {
    id: 2,
    slug: "amazon-river",
    name: "The Amazon River",
    title: "THE RIVER THAT FEEDS A CONTINENT",
    subtitle: "Pink dolphins, caimans, and endless green",
    progressStart: 0.125,
    progressEnd: 0.25,
    timeStart: 10,
    timeEnd: 20,
    coordinates: `02°53'14.6"S 58°26'02.9"W`,
    altitude: "85m AGL · River Channel",
    biome: "Solimões-Amazon Mainstream",
    details: [
      { label: "Discharge Volume", value: "209,000 m³/s" },
      { label: "Global Freshwater", value: "20% of Ocean Inflow" },
      { label: "Key Inhabitant", value: "Inia geoffrensis (Boto)" },
    ],
    ambient: {
      color: "#F7F4EC",
      glow: "rgba(74, 59, 42, 0.3)",
      warmth: 0.35,
      teal: 0.05,
      accent: "#4A3B2A",
    },
  },
  {
    id: 3,
    slug: "flooded-forest",
    name: "The Flooded Forest",
    title: "WHERE THE TREES STAND IN WATER",
    subtitle: "A mirror world of roots and light",
    progressStart: 0.25,
    progressEnd: 0.375,
    timeStart: 20,
    timeEnd: 30,
    coordinates: `01°44'28.0"S 61°32'19.2"W`,
    altitude: "18m AGL · Sub-Canopy Water Level",
    biome: "Igapó Blackwater Lagoon",
    details: [
      { label: "Seasonal Flood", value: "Cheia (+11.2m depth)" },
      { label: "Aqueous Acidity", value: "pH 4.2 · Tannin Rich" },
      { label: "Reflection Clarity", value: "Mirrored Blackwater" },
    ],
    ambient: {
      color: "#F7F4EC",
      glow: "rgba(60, 74, 58, 0.35)",
      warmth: 0.15,
      teal: 0.2,
      accent: "#3C4A3A",
    },
  },
  {
    id: 4,
    slug: "giant-kapok",
    name: "The Giant Kapok",
    title: "OLDER THAN MEMORY",
    subtitle: "Climb through every layer of life",
    progressStart: 0.375,
    progressEnd: 0.5,
    timeStart: 30,
    timeEnd: 40,
    coordinates: `02°11'05.8"S 63°18'44.1"W`,
    altitude: "Climbing: 10m → 65m AGL",
    biome: "Ceiba Pentandra Micro-Ecosystem",
    details: [
      { label: "Tree Age", value: "Estimated 420+ Years" },
      { label: "Epiphyte Species", value: "140+ on single trunk" },
      { label: "Trunk Diameter", value: "3.8m above buttresses" },
    ],
    ambient: {
      color: "#F7F4EC",
      glow: "rgba(60, 74, 58, 0.4)",
      warmth: 0.3,
      teal: 0.1,
      accent: "#3C4A3A",
    },
  },
  {
    id: 5,
    slug: "community",
    name: "The Community",
    title: "PEOPLE OF THE FOREST",
    subtitle: "Guardians of this land for thousands of years",
    creditLine: "Home to Indigenous peoples who have protected this forest for millennia.",
    progressStart: 0.5,
    progressEnd: 0.625,
    timeStart: 40,
    timeEnd: 50,
    coordinates: `03°41'19.7"S 64°55'10.2"W`,
    altitude: "45m AGL · Riverine Habitation",
    biome: "Ribereño Sustainable Território",
    details: [
      { label: "Stewardship", value: "Millennial Heritage" },
      { label: "Forest Boundary", value: "Demarcated Ancestral" },
      { label: "Coexistence", value: "Zero Deforestation Zone" },
    ],
    ambient: {
      color: "#F7F4EC",
      glow: "rgba(178, 58, 46, 0.25)",
      warmth: 0.5,
      teal: 0.05,
      accent: "#B23A2E",
    },
  },
  {
    id: 6,
    slug: "waterfall",
    name: "The Waterfall",
    title: "WHERE THE JAGUAR DRINKS",
    subtitle: "Mist, stone, and the wild at its edge",
    progressStart: 0.625,
    progressEnd: 0.75,
    timeStart: 50,
    timeEnd: 60,
    coordinates: `00°49'33.1"N 66°02'15.4"W`,
    altitude: "22m AGL · Riverbed Gorge",
    biome: "Guiana Shield Granite Escarpment",
    details: [
      { label: "Apex Predator", value: "Panthera onca (Jaguar)" },
      { label: "Basin Mist", value: "Cooling Microclimate" },
      { label: "Bedrock Age", value: "1.7 Billion Years" },
    ],
    ambient: {
      color: "#F7F4EC",
      glow: "rgba(79, 209, 184, 0.2)",
      warmth: 0.1,
      teal: 0.35,
      accent: "#3C4A3A",
    },
  },
  {
    id: 7,
    slug: "golden-hour-lake",
    name: "Golden-Hour Lake",
    title: "EVERY SUNSET IS WILD",
    subtitle: "Gold light, wings crossing the sky",
    progressStart: 0.75,
    progressEnd: 0.875,
    timeStart: 60,
    timeEnd: 70,
    coordinates: `04°12'58.2"S 69°56'40.5"W`,
    altitude: "50m AGL · Oxbow Glide",
    biome: "Várzea Oxbow Lagoon",
    details: [
      { label: "Solar Elevation", value: "4.8° Above Horizon" },
      { label: "Color Temperature", value: "2,850 Kelvin Amber" },
      { label: "Avian Roost", value: "Ara macao & Ardea alba" },
    ],
    ambient: {
      color: "#F7F4EC",
      glow: "rgba(247, 190, 80, 0.35)",
      warmth: 0.85,
      teal: 0.0,
      accent: "#4A3B2A",
    },
  },
  {
    id: 8,
    slug: "night-reveal",
    name: "Night Reveal",
    title: "THE FOREST NEVER SLEEPS",
    subtitle: "Fireflies, river, and a billion stars",
    progressStart: 0.875,
    progressEnd: 1.0,
    timeStart: 70,
    timeEnd: 80,
    coordinates: `03°08'42.1"S 60°01'38.4"W`,
    altitude: "Pullback: 30m → 450m AGL",
    biome: "Nocturnal Canopy & River Basin",
    details: [
      { label: "Night Sky", value: "Bortle Class 1 · Pristine" },
      { label: "Bioluminescence", value: "Lampyridae & Mycena lucentipes" },
      { label: "Audio Density", value: "110+ Nocturnal Call Frequencies" },
    ],
    ambient: {
      color: "#F7F4EC",
      glow: "rgba(79, 209, 184, 0.55)",
      warmth: 0.0,
      teal: 0.9,
      accent: "#4FD1B8",
    },
    cta: "BEGIN YOUR EXPEDITION",
  },
];
