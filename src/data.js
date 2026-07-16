/* ============================================================
   EDITABLE SITE CONTENT
   ------------------------------------------------------------
   Everything you'll want to change lives in this file:
   agency info, hero copy, services, stats, projects,
   process steps, testimonials and contact details.
   ============================================================ */

export const site = {
  name: 'WebForged',
  tagline: 'Websites & web apps, built to grow your business.',
  email: 'jawakkerjude@gmail.com',
  phones: ['+94 76 780 5529', '+94 75 039 2268'],
  location: 'Colombo, Sri Lanka',
  socials: [
    { label: 'Twitter / X', href: 'https://twitter.com', icon: 'twitter' },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
    { label: 'GitHub', href: 'https://github.com', icon: 'github' },
    { label: 'Instagram', href: 'https://www.instagram.com/webforged_/', icon: 'instagram' },
  ],
};

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const hero = {
  badge: 'Full-service web agency',
  // Each array item animates in as one masked line.
  headlineLines: ['We Build Websites', '& Web Apps That', 'Grow Your Business'],
  // The word that receives the gradient highlight.
  highlightWord: 'Grow',
  // Phrases cycled by the typing effect.
  typingPhrases: [
    'For startups and small businesses.',
    'For enterprises that need to scale.',
    'For personal brands and portfolios.',
    'Designed. Developed. Delivered.',
  ],
  subline:
    'From ambitious startups to established enterprises — and every personal brand in between — we design and ship digital experiences that convert.',
};

/* `image` is a subtle background photo behind each card (dimmed by an overlay). */
export const services = [
  {
    icon: 'building',
    title: 'Business Websites',
    description:
      'Polished, credible sites that turn visitors into customers — built around your goals, not a template.',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
  },
  {
    icon: 'code',
    title: 'Web Applications',
    description:
      'Custom dashboards, portals and SaaS products engineered for speed, security and scale.',
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop',
  },
  {
    icon: 'cart',
    title: 'E-commerce Stores',
    description:
      'Conversion-focused storefronts with seamless checkout, inventory and payment integrations.',
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop',
  },
  {
    icon: 'user',
    title: 'Personal & Portfolio Sites',
    description:
      'Distinctive personal sites that make creatives, consultants and founders unforgettable.',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop',
  },
  {
    icon: 'pen',
    title: 'UI/UX Design',
    description:
      'Research-driven interfaces that feel effortless — wireframes to pixel-perfect design systems.',
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
  },
  {
    icon: 'shield',
    title: 'Maintenance & Support',
    description:
      'Ongoing updates, monitoring and improvements so your site stays fast, secure and fresh.',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
  },
];

export const about = {
  heading: 'A small team obsessed with big results',
  paragraphs: [
    'WebForged is a tight-knit crew of designers and engineers who believe great websites are grown, not assembled. We partner with businesses of every size — from solo founders to established brands — to craft digital products that look exceptional and perform even better.',
    'Our approach is simple: modern design, obsessive performance, and measurable results. No bloated templates, no jargon, no surprises — just work we\'re proud to put our name on.',
  ],
  whyChooseUs: [
    'Fast, reliable delivery — most sites launch in weeks, not months',
    'Custom design tailored to your brand, never off-the-shelf',
    'Ongoing support and maintenance after launch',
    'Honest pricing that works for small businesses too',
  ],
};

export const stats = [
  { value: 35, suffix: '+', label: 'Projects Delivered' },
  { value: 30, suffix: '+', label: 'Happy Clients' },
  { value: 3, suffix: '+', label: 'Years of Craft' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
];

/* ------------------------------------------------------------
   PROJECTS
   Add a project by appending one object to this array.
   - category: 'website' | 'webapp' | 'personal'  (drives the filter)
   - tag:      the label shown on the card
   - url:      the live site opened in a new tab
   - image:    optional — path/URL to a screenshot. When omitted,
               a styled placeholder is generated automatically.
   - accent:   two colors used by the generated placeholder art.
   ------------------------------------------------------------ */
export const projectFilters = [
  { id: 'all', label: 'All' },
  { id: 'business', label: 'Business' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'brand', label: 'Brand & Product' },
];

export const projects = [
  {
    name: 'Nirvee Visa & Immigration',
    description:
      'A full immigration-consultancy site — programs, services and client testimonials for Canada, Australia, Germany and UK visas.',
    category: 'business',
    tag: 'Business Website',
    url: 'https://nirveevisa.com/',
    image: '/screenshots/nirveevisa.jpg',
    accent: ['#7c3aed', '#3b82f6'],
  },
  {
    name: 'Lumen Studio',
    description:
      'A brand-and-web design studio site with bold type, buttery motion and a template showcase built to convert founders.',
    category: 'brand',
    tag: 'Brand & Studio',
    url: 'https://lumen-seven-dusky.vercel.app/',
    image: '/screenshots/lumen.jpg',
    accent: ['#6366f1', '#8b5cf6'],
  },
  {
    name: 'ÉLAN',
    description:
      'A modern fashion storefront with curated edits, a live cart and limited-drop campaigns for women’s and men’s essentials.',
    category: 'ecommerce',
    tag: 'E-commerce',
    url: 'https://shopping-web-phi-amber.vercel.app/',
    image: '/screenshots/shopping-web.jpg',
    accent: ['#f59e0b', '#ef4444'],
  },
  {
    name: 'APEX MOTO',
    description:
      'An adrenaline-fueled showcase for a performance motorcycle brand — carbon, horsepower and cinematic scroll storytelling.',
    category: 'brand',
    tag: 'Brand Showcase',
    url: 'https://motor-self.vercel.app/',
    image: '/screenshots/motor.jpg',
    accent: ['#ef4444', '#f97316'],
  },
  {
    name: 'VELOCE — Air-9',
    description:
      'A limited-drop sneaker launch page with kinetic type, product reveals and a reservation flow for just 999 pairs.',
    category: 'ecommerce',
    tag: 'Product Launch',
    url: 'https://sneaker-veloce.vercel.app/',
    image: '/screenshots/sneaker.jpg',
    accent: ['#eab308', '#78350f'],
  },
  {
    name: 'AURA',
    description:
      'A playful beverage store for a sparkling botanical tonic — flavor shop, subscriptions and vibrant marquee energy.',
    category: 'ecommerce',
    tag: 'E-commerce',
    url: 'https://aura-drink.vercel.app/',
    image: '/screenshots/aura-drink.png',
    accent: ['#ec4899', '#f97316'],
  },
  {
    name: 'Evermore Funeral Home',
    description:
      'A calm, compassionate site for a family-owned funeral home — services, pricing and tributes handled with grace.',
    category: 'business',
    tag: 'Business Website',
    url: 'https://funeral-site-navy.vercel.app/',
    image: '/screenshots/funeral-site.jpg',
    accent: ['#334155', '#64748b'],
  },
  {
    name: 'FitKit Gym',
    description:
      'A high-energy gym site with class schedules, trainer profiles and membership pricing built to drive sign-ups.',
    category: 'business',
    tag: 'Business Website',
    url: 'https://gym-site-xi-roan.vercel.app/',
    image: '/screenshots/gym-site.jpg',
    accent: ['#84cc16', '#22c55e'],
  },
  {
    name: 'Saffron & Sage',
    description:
      'An elegant fine-dining site with a seasonal menu, chef stories and table reservations in an intimate setting.',
    category: 'business',
    tag: 'Business Website',
    url: 'https://food-res-bice.vercel.app/',
    image: '/screenshots/food-res.jpg',
    accent: ['#b45309', '#65a30d'],
  },
  {
    name: 'The Horeo',
    description:
      'A restaurant ordering site for authentic European cuisine — live menu, promo-code specials and member login.',
    category: 'ecommerce',
    tag: 'Food Ordering',
    url: 'https://thehoreo.vercel.app/',
    image: '/screenshots/thehoreo.jpg',
    accent: ['#2563eb', '#0ea5e9'],
  },
];

export const processSteps = [
  {
    number: '01',
    title: 'Discover',
    description: 'We dig into your goals, audience and market to define what success looks like.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Wireframes evolve into polished, on-brand designs you approve at every step.',
  },
  {
    number: '03',
    title: 'Develop',
    description: 'Clean, fast, accessible code — tested across devices before you ever see a bug.',
  },
  {
    number: '04',
    title: 'Launch',
    description: 'We deploy, monitor and fine-tune. Then we stick around to help you grow.',
  },
];

/* `image` is a portrait shown in the testimonial slider. Replace the
   Unsplash placeholders with real client photos in /public when you have them. */
export const testimonials = [
  {
    quote:
      'WebForged rebuilt our site in three weeks and enquiries doubled the first month. They felt like part of our team, not a vendor.',
    name: 'Sarah Mitchell',
    role: 'Owner, boutique retail brand',
    image:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=800&auto=format&fit=crop',
  },
  {
    quote:
      'The web app they built replaced three separate tools we were paying for. Fast, intuitive, and our staff actually enjoys using it.',
    name: 'David Okafor',
    role: 'Operations Director, logistics company',
    image:
      'https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=800&auto=format&fit=crop',
  },
  {
    quote:
      'As a freelancer I needed a portfolio that stood out. Mine gets compliments on every client call — worth every penny.',
    name: 'Priya Raman',
    role: 'Independent brand designer',
    image:
      'https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=800&auto=format&fit=crop',
  },
  {
    quote:
      'They took our outdated store and turned it into something we\'re proud of. Sales are up 40% and the site loads instantly.',
    name: 'Marco Silva',
    role: 'Founder, specialty coffee e-commerce',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop',
  },
];

export const contact = {
  heading: "Have a project in mind? Let's build it.",
  subheading:
    "Tell us a little about your idea and we'll get back to you within one business day — no pressure, no jargon.",
  projectTypes: [
    'Business Website',
    'Web Application',
    'E-commerce Store',
    'Personal / Portfolio Site',
    'UI/UX Design',
    'Something Else',
  ],
};
