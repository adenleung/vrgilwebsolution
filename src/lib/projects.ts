export type Project = {
  slug: string;
  name: string;
  industry: string;
  summary: string;
  brief: string;
  approach: string;
  features: string[];
  desktop: string;
  mobile: string;
  desktopAlt: string;
  mobileAlt: string;
  source: string;
  sourceCommit: string;
  liveUrl: string | null;
};
// Only approved projects verified against source. Live links require a deployment check.
export const projects: Project[] = [
  {
    slug: "bloom-hair-place",
    name: "Bloom Hair Place",
    industry: "Hair & beauty · Singapore",
    summary:
      "A welcoming digital home for a neighbourhood hair salon. Soft colour, clear services and a direct path to an appointment enquiry.",
    brief:
      "Present the salon’s personality and services in a way that feels welcoming, while making practical information easy for customers to find.",
    approach:
      "A warm, editorial layout combines imagery of the salon with service information, a hair gallery and a clear WhatsApp enquiry path. The experience adapts to mobile with a dedicated navigation menu and easy access to contact details.",
    features: [
      "Responsive website design",
      "Salon services & pricing",
      "Hair gallery",
      "WhatsApp enquiries",
      "Location & directions",
    ],
    desktopAlt:
      "Bloom Hair Place website showing the salon interior and welcome headline",
    mobileAlt: "Mobile layout of the Bloom Hair Place website",
    desktop: "/work/bloom-desktop.webp",
    mobile: "/work/bloom-mobile.webp",
    source: "https://github.com/adenleung/BloomHairPlaceSSG",
    sourceCommit: "5edb80382e81b8a67891de34fe2d73685f200248",
    liveUrl: "https://bloomhairplace.com",
  },
];
