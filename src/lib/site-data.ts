export const studio = {
  name: "VRGIL Web Solutions",
  email: "adenleung08@gmail.com",
  phone: "+65 8363 5900",
  whatsapp: "6583635900",
  description:
    "Independent website design and development for Singapore businesses.",
};
export const navigation = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "Our Work", id: "work" },
  { label: "Pricing", id: "pricing" },
  { label: "Process", id: "process" },
  { label: "Contact", id: "contact" },
] as const;
export const packages = [
  {
    id: "landing",
    name: "Landing Page",
    price: 599,
    label: "A focused first step",
    description:
      "One thoughtfully designed page to introduce your business and make it easy to get in touch.",
    pages: "1 custom page",
    revisions: "1 revision round",
    delivery: "5–7 business days",
    examples:
      "Hero, about, services, genuine client-supplied testimonials where available, contact and footer.",
    features: [
      "Mobile-responsive design",
      "Contact form",
      "WhatsApp button",
      "Google Maps integration",
      "Basic SEO setup",
      "Social media links",
    ],
  },
  {
    id: "business",
    name: "Business Website",
    price: 999,
    label: "Room to tell your story",
    description:
      "A complete website for businesses that need more space for their services, story and work.",
    pages: "Up to 5 pages",
    revisions: "2 revision rounds",
    delivery: "7–14 business days",
    examples: "Home, about, services, portfolio or gallery, and contact.",
    features: [
      "Mobile-responsive design",
      "Contact form",
      "WhatsApp integration",
      "Google Maps integration",
      "Basic SEO setup",
      "Social media links",
    ],
  },
] as const;
export const addOns = [
  { name: "Additional page", price: 100 },
  { name: "Logo design", price: 100 },
  { name: "Copywriting", price: 100 },
  { name: "Booking integration", price: 200 },
  { name: "Blog setup", price: 150 },
  { name: "Additional revision", price: 50 },
  { name: "Priority delivery", price: 200 },
] as const;
export const services = [
  {
    title: "Landing pages",
    text: "A clear introduction to your business, services or new offering, all on one page.",
    icon: "layout",
  },
  {
    title: "Business websites",
    text: "A dedicated home for your story, services, gallery and contact information.",
    icon: "pages",
  },
  {
    title: "Website redesign",
    text: "Refresh an existing website with a clearer structure and a design that fits your brand.",
    icon: "redesign",
  },
  {
    title: "Mobile-responsive design",
    text: "Layouts that adapt naturally to phones, tablets and larger screens.",
    icon: "mobile",
  },
  {
    title: "Basic SEO",
    text: "Page titles, descriptions and a clear page structure to support search discoverability.",
    icon: "search",
  },
  {
    title: "Contact & WhatsApp",
    text: "Make it straightforward for customers to ask a question or start a conversation.",
    icon: "contact",
  },
  {
    title: "Booking integration",
    text: "Connect a suitable booking platform so customers can arrange appointments.",
    icon: "booking",
  },
  {
    title: "Something more specific?",
    text: "Additional functionality is scoped and quoted around what your business needs.",
    icon: "custom",
  },
] as const;
export const journey = [
  {
    title: "Discovery",
    description:
      "Tell us about your business, your customers and what you need from your website.",
    milestone: "A shared starting point",
  },
  {
    title: "Planning",
    description:
      "Agree on the objectives, pages, features, content and design direction. Confirm the scope and quotation.",
    milestone: "An agreed project brief",
  },
  {
    title: "Design & development",
    description:
      "Your website takes shape around the approved brief, with responsive layouts and clear customer journeys.",
    milestone: "Your website draft",
  },
  {
    title: "Review & refinement",
    description:
      "Review the website and share a consolidated set of changes within your included revision rounds.",
    milestone: "A website you have reviewed",
  },
  {
    title: "Launch & handover",
    description:
      "After final approval and payment, the website is deployed and the agreed handover is completed.",
    milestone: "Your website, ready to use",
  },
] as const;
export const faqs = [
  [
    "Why does my business need a website?",
    "A website gives customers one place to understand your business, explore your services and contact you. It can complement your social media presence while giving you more control over how your information is presented.",
  ],
  [
    "Can I get a website with no technical experience?",
    "Yes. You bring your knowledge of the business; VRGIL handles the design and development. We work through the required content, decisions and approvals with you.",
  ],
  [
    "What content do I need to provide?",
    "Your logo, business information, service details, contact details, and any photographs or copy you want to use. You should have permission to use the supplied materials. If you need help writing the text, copywriting can be quoted as an add-on.",
  ],
  [
    "How long does development take?",
    `A Landing Page is estimated at ${packages[0].delivery}; a Business Website at ${packages[1].delivery}. The timeline depends on receiving the required materials and approvals. Custom features and revisions can affect the agreed schedule.`,
  ],
  [
    "What is included in the package?",
    "Both packages include responsive design, a contact form, WhatsApp, Google Maps, basic SEO and social media links. Landing Page includes one custom page and one revision round. Business Website includes up to five pages and two revision rounds. The quotation confirms your final scope.",
  ],
  [
    "Are domain and hosting included?",
    "Domain registration, hosting, third-party subscriptions and ongoing maintenance are separate unless your quotation explicitly includes them. VRGIL can guide you through the options before you commit.",
  ],
  [
    "Can I request revisions?",
    `Yes. Landing Page includes ${packages[0].revisions}; Business Website includes ${packages[1].revisions}. Additional revision rounds start at S$50. A change to the agreed scope is quoted separately.`,
  ],
  [
    "Do I own the completed website?",
    "Ownership, source files, account access and handover are specified in your project quotation before work begins. Any third-party software, fonts or assets remain subject to their own licences. Ask us to clarify anything you need to manage after handover.",
  ],
  [
    "Can I upgrade my website later?",
    "Yes. Additional pages or functionality can be scoped separately. We will review the existing website and provide a quotation for the changes you need.",
  ],
  [
    "What happens after launch?",
    "VRGIL completes the handover agreed in your quotation. Ongoing updates and maintenance are separate unless explicitly included. Discuss the level of support you need during planning.",
  ],
] as const;
export function whatsappLink(
  message = "Hello VRGIL Web Solutions, I would like to discuss a website project.",
) {
  return `https://wa.me/${studio.whatsapp}?text=${encodeURIComponent(message)}`;
}
export const siteUrl = (() => {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (
      !["https:", "http:"].includes(url.protocol) ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    )
      return null;
    return url.origin;
  } catch {
    return null;
  }
})();
