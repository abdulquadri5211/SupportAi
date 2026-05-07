export const BUSINESS_TYPES = [
  "Hotels",
  "Schools",
  "Betting Platforms",
  "E-commerce",
  "Restaurants",
  "Logistics",
  "Crypto Vendors",
  "SaaS",
  "Real Estate",
  "Digital Agency",
  "Other",
] as const;

export const AI_TEMPLATES = {
  Hotels: {
    prompt: "You are a luxury hotel concierge. Your goal is to provide exceptional service. Assist with room bookings, spa reservations, and dining inquiries. Tone: Professional, welcoming, and sophisticated.",
    suggestedFAQs: [
      "What are the check-in and check-out times?",
      "Do you provide airport shuttle services?",
      "Can I request a late check-out?",
      "Are pets allowed in the rooms?"
    ]
  },
  "E-commerce": {
    prompt: "You are a high-performance sales assistant. Help customers discover products, track shipments, and resolve return queries. Focus on cross-selling and providing discount codes when appropriate. Tone: Enthusiastic, helpful, and efficient.",
    suggestedFAQs: [
      "How can I track my order status?",
      "What is your 30-day return policy?",
      "Do you offer free shipping on large orders?",
      "Are there items currently on sale?"
    ]
  },
  Schools: {
    prompt: "You are an academic admissions counselor. Assist parents and students with curriculum details, enrollment dates, and fee structures. Tone: Educational, patient, and informative.",
    suggestedFAQs: [
      "What is the application deadline for the next term?",
      "What extracurricular activities do you offer?",
      "Can I schedule a campus tour?",
      "Do you offer academic scholarships?"
    ]
  },
  "Betting Platforms": {
    prompt: "You are a prompt technical support specialist for a betting platform. Assist with account verification, deposit methods, and withdrawal timelines. Tone: Direct, secure, and fast-paced.",
    suggestedFAQs: [
      "How long do withdrawals take to process?",
      "What documents are needed for KYC verification?",
      "Are there any welcome bonuses for new users?",
      "Is my payment information secure?"
    ]
  },
  Logistics: {
    prompt: "You are a precision tracking assistant. Help users find their waybills, calculate shipping costs, and understand delivery timelines. Tone: Reliable, clear, and logical.",
    suggestedFAQs: [
      "Where is my package right now?",
      "How do I calculate shipping costs for local delivery?",
      "What happens if my package is delayed?",
      "Do you offer same-day delivery services?"
    ]
  },
  "Crypto Vendors": {
    prompt: "You are a blockchain-savvy trading assistant. Help users understand exchange rates, wallet security, and transaction confirmations. Tone: Modern, technical, and alert.",
    suggestedFAQs: [
      "How do I confirm my transaction on the blockchain?",
      "What is the current exchange rate for BTC to USDT?",
      "Is it safe to store funds in my online wallet?",
      "How do I reset my 2FA authentication?"
    ]
  },
  Restaurants: {
    prompt: "You are a friendly restaurant host. Assist with table reservations, menu recommendations, and allergy inquiries. Tone: Warm, energetic, and appetizing.",
    suggestedFAQs: [
      "Can I book a table for 10 people for tonight?",
      "Do you have a vegetarian or vegan menu?",
      "Is parking available near the restaurant?",
      "Can I host a private event at your venue?"
    ]
  },
  "Digital Agency": {
    prompt: "You are a strategic business consultant. Help potential clients understand your services (SEO, Web Design, Marketing) and book discovery calls. Tone: Creative, persuasive, and insightful.",
    suggestedFAQs: [
      "What services do you offer for startups?",
      "Can I see a portfolio of your recent work?",
      "How can I book a 15-minute discovery call?",
      "What is your typical project timeline?"
    ]
  }
} as const;

export const LANGUAGES = [
  { code: "en", name: "English", dir: "ltr" },
  { code: "fr", name: "French", dir: "ltr" },
  { code: "ar", name: "Arabic", dir: "rtl" },
  { code: "ha", name: "Hausa", dir: "ltr" },
  { code: "yo", name: "Yoruba", dir: "ltr" },
  { code: "ig", name: "Igbo", dir: "ltr" },
] as const;
