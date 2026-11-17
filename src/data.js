// All business facts live here so the client can correct them in one place.
// Contact details are from India Finance's Google Business Profile (Nov 2026).
// Rates, ticket sizes and timelines are INDICATIVE market ranges — confirm with the client before launch.

export const CONTACT = {
  phone: '+91 91474 17091',
  tel: 'tel:+919147417091',
  whatsapp: '919147417091',
  // ponytail: no email on the Google profile — add one here and it shows in the contact section
  email: null,
  address: '2nd Floor, 23 Market Street, Esplanade, Janbazar, Taltala, Kolkata, West Bengal 700016',
  addressShort: '23 Market Street, Esplanade, Kolkata',
  hours: '10:00 am – 7:00 pm',
  google: 'https://share.google/dST7RxjmVyIzM4KfS',
  directions: 'https://www.google.com/maps/dir/?api=1&destination=India+Finance+23+Market+Street+Esplanade+Kolkata+700016',
  mapEmbed: 'https://www.google.com/maps?q=India+Finance,+23+Market+St,+Esplanade,+Kolkata+700016&output=embed',
  rating: '5.0',
}

// Social profiles. Paste a full URL to show an icon; leave '' to hide it.
// Instagram: found on Google as an account posting India Finance offers — confirm it is the official one.
export const SOCIAL = [
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/royamit590/' },
  { id: 'facebook', label: 'Facebook', url: '' },
  { id: 'youtube', label: 'YouTube', url: '' },
  { id: 'linkedin', label: 'LinkedIn', url: '' },
  { id: 'x', label: 'X (Twitter)', url: '' },
  { id: 'google', label: 'Google reviews', url: CONTACT.google },
].filter((s) => s.url)

export const wa = (text) => `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`

export const LOANS = [
  {
    id: 'personal',
    slug: 'personal-loan',
    name: 'Personal Loan',
    tag: 'Salaried & self-employed',
    blurb: 'Unsecured funds for a wedding, treatment, education or a home upgrade. We shortlist the lender most likely to approve you at the lowest rate your CIBIL allows.',
    ticket: '₹50,000 – ₹40 L',
    rate: 'from 10.5% p.a.',
    tenure: '1 – 6 years',
    defaultRate: 11.5,
  },
  {
    id: 'business',
    slug: 'business-loan',
    name: 'Business & MSME Loan',
    tag: 'Traders, shops, manufacturers',
    blurb: 'Collateral-free term loans for stock, machinery or expansion, built on your GST returns, ITR and bank statements.',
    ticket: '₹5 L – ₹1 Cr',
    rate: 'from 14% p.a.',
    tenure: '1 – 5 years',
    defaultRate: 16,
  },
  {
    id: 'lap',
    slug: 'loan-against-property',
    name: 'Loan Against Property',
    tag: 'Residential & commercial',
    blurb: 'Unlock the value of a flat, house or shop you own, at secured-loan rates and long tenures that keep the EMI light.',
    ticket: '₹10 L – ₹10 Cr',
    rate: 'from 9.25% p.a.',
    tenure: 'up to 15 years',
    defaultRate: 10,
  },
  {
    id: 'cc',
    slug: 'cash-credit',
    name: 'Cash Credit & Overdraft',
    tag: 'Working capital limits',
    blurb: 'A revolving limit against stock and debtors. Interest only on what you draw. Fresh limits, enhancements and takeovers from your current bank.',
    ticket: '₹25 L – ₹25 Cr',
    rate: 'repo / MCLR linked',
    tenure: 'renewed yearly',
    defaultRate: 10.5,
  },
  {
    id: 'bt',
    slug: 'balance-transfer',
    name: 'Balance Transfer & Top-up',
    tag: 'Already paying an EMI?',
    blurb: 'Move a costly loan to a lender charging less, and take a top-up on the same file if you need more.',
    ticket: 'up to your outstanding + top-up',
    rate: 'often 1 – 4% lower',
    tenure: 'reset to suit you',
    defaultRate: 10.5,
  },
]

export const FACTS = [
  { k: 'Ticket sizes', v: '₹50k – ₹25 Cr', note: 'Personal loans to working capital limits' },
  { k: 'Longest tenure', v: '15 years', note: 'On loan against property' },
  { k: 'Office', v: 'Esplanade', note: 'Walk in, or apply from home' },
  { k: 'Google rating', v: '5.0 / 5', note: 'From verified customer reviews' },
]

export const STEPS = [
  { t: 'Tell us what you need', d: 'A five-minute call or WhatsApp. Amount, purpose, your income and any EMIs you already pay.' },
  { t: 'Eligibility & document list', d: 'We read your CIBIL position and give you a written list of exactly what this lender will ask for. Nothing extra.' },
  { t: 'Lender match', d: 'Your profile goes to the bank or NBFC most likely to approve it. You see the rate, fees and tenure before anything is signed.' },
  { t: 'File login & verification', d: 'We assemble the file, submit it and handle the lender’s queries, site visits and calls with you.' },
  { t: 'Sanction & disbursal', d: 'You sign the sanction letter only when the numbers match what we promised. Funds go straight to your account.' },
]

export const CRITERIA = {
  cols: ['Personal', 'Business / MSME', 'Against Property', 'Cash Credit / OD'],
  rows: [
    ['CIBIL score', '700+ (750+ for best rates)', '700+ for promoters', '650 – 700+', '700+; external rating at larger limits'],
    ['Income proof', '3 salary slips, 6-month bank statement', '2 years ITR, GST returns, 12-month statement', 'ITR or salary slips, bank statement', 'Audited financials, CMA data, stock statements'],
    ['Track record', '1 year in current job', '2 – 3 years in business', 'Any, with stable income', '3 years of operations'],
    ['Security', 'None', 'Usually none', 'Clear-title property', 'Stock, debtors + collateral'],
    ['Typical turnaround', '2 – 7 working days', '5 – 10 working days', '2 – 4 weeks', '3 – 6 weeks'],
  ],
}

export const DOCS = {
  personal: ['PAN card', 'Aadhaar card', 'Last 3 months’ salary slips', '6-month salary account statement', 'Form 16 or last 2 years’ ITR', 'Passport-size photograph'],
  business: ['PAN of business and promoters', 'Aadhaar of promoters', 'Udyam / trade licence / GST certificate', 'Last 2 years’ ITR with computation', 'Last 12 months’ GST returns', '12-month current account statement'],
  lap: ['KYC of all property owners', 'Title deed and chain documents', 'Latest municipal tax receipt', 'Approved building plan', 'Income proof (ITR or salary slips)', '6-month bank statement'],
  cc: ['Audited financials (3 years)', 'Provisional current-year accounts', 'CMA data and projections', 'Stock and debtor statements', 'Existing sanction letters, if any', 'Collateral property papers'],
  bt: ['PAN and Aadhaar', 'Existing loan sanction letter', 'Repayment schedule / loan account statement', 'Foreclosure letter from current lender', 'Income proof (salary slips or ITR)', '12-month bank statement showing EMIs'],
}

export const REVIEWS = [
  { q: 'Very first service, I am happy.', who: 'Google review' },
  { q: 'Excellent customer service, I am happy.', who: 'Google review' },
  { q: 'If you have any questions about loans or banking, feel free to ask him!', who: 'Google review' },
]

export const FAQ = [
  { cat: 'About us', q: 'Is India Finance a bank?', a: 'No. India Finance is a loan agency in Kolkata. We prepare your application and place it with partner banks and NBFCs. The lender makes the credit decision and disburses the money directly to you.' },
  { cat: 'Process', q: 'Do I have to visit your office?', a: 'No. Most customers apply entirely over phone and WhatsApp. If you prefer to sit across the table, our office is on the 2nd floor of 23 Market Street, Esplanade.' },
  { cat: 'CIBIL & eligibility', q: 'Will checking my eligibility here affect my CIBIL score?', a: 'The calculators on this page run in your browser and do not touch your credit report. A lender pulls your CIBIL only when you formally apply, and we tell you before that happens.' },
  { cat: 'CIBIL & eligibility', q: 'What CIBIL score do I need?', a: 'Most lenders look for 700 or above for unsecured loans, and give their best rates above 750. Secured loans such as loan against property can work with lower scores if the property and income are strong.' },
  { cat: 'Process', q: 'How fast can I get the money?', a: 'Personal loans for salaried applicants with complete documents often disburse in 2 to 7 working days. Business loans take about a week or two, and property-backed loans 2 to 4 weeks because of legal and valuation checks.' },
  { cat: 'Cash credit', q: 'My bank is not increasing my cash credit limit. Can you help?', a: 'Yes. We look at your stock, debtors and financials, work out the drawing power you can justify, and either take the case for enhancement or move the limit to a lender with more appetite.' },
  { cat: 'Rates & charges', q: 'Can I move my existing loan to a lower rate?', a: 'Usually, yes, if you have paid at least 6 to 12 EMIs on time. We compare the saving against the processing fee and any foreclosure charge so you know the net benefit before you move.' },
]
