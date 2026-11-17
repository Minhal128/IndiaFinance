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

// ---------- Extra FAQs for the /faq page (home shows FAQ above) ----------
export const FAQ_ALL = [
  ...FAQ,
  { cat: 'About us', q: 'Do you charge customers a fee?', a: 'Ask us before you apply and we will tell you in writing whether any fee applies to your case and how much. The lender’s own processing fee is separate and is printed on your sanction letter.' },
  { cat: 'About us', q: 'Which lenders do you work with?', a: 'Partner banks and NBFCs regulated by the RBI. Which lender we approach depends on your profile, amount and city; we name the lender before your file goes to them.' },
  { cat: 'CIBIL & eligibility', q: 'Why was my loan rejected even with a good CIBIL score?', a: 'Score is one input. Lenders also check income stability, existing EMIs against income (FOIR), employer or business category, city and recent loan enquiries. We look at all of these before choosing where to apply.' },
  { cat: 'CIBIL & eligibility', q: 'Can I add a co-applicant to borrow more?', a: 'Yes. An earning spouse, parent or business partner can add their income to yours. They become equally responsible for repayment and their CIBIL is checked too.' },
  { cat: 'Rates & charges', q: 'Fixed or floating rate: which is better?', a: 'Floating rates move with the lender’s benchmark (for most new loans, the RBI repo rate), so EMIs can fall or rise. Fixed rates stay the same but usually start higher. For long tenures most borrowers choose floating.' },
  { cat: 'Rates & charges', q: 'What charges should I look for apart from the rate?', a: 'Processing fee, insurance bundled into the loan, foreclosure and part-payment charges, and bounce charges. We compare these across offers, not just the headline rate.' },
  { cat: 'Process', q: 'What happens after I send my details on WhatsApp?', a: 'A banker replies during working hours, asks a few questions about income and existing loans, and sends you the exact document list for the lender that fits your profile.' },
  { cat: 'Cash credit', q: 'What is drawing power and why is it lower than my limit?', a: 'Drawing power is what your current stock and debtors support after the lender’s margins. If stock falls or debtors age past the lender’s cut-off, drawing power falls even though the sanctioned limit stays the same.' },
  { cat: 'Cash credit', q: 'Can I move my cash credit limit to another bank?', a: 'Yes, through a takeover. The new lender pays off the old limit and sanctions its own, often with better terms or a higher limit. Expect fresh documentation and a stock and property inspection.' },
]

// ---------- Product page content ----------
export const LOAN_DETAILS = {
  personal: {
    who: ['Salaried, with at least a year in your current job', 'Self-employed, with two years of ITR', 'Paying for a wedding, treatment, education, travel or home repairs'],
    features: [
      ['No collateral', 'Approval rests on your income and credit history, not on property or gold.'],
      ['Fixed monthly EMI', 'You know the exact instalment and end date from day one.'],
      ['Quick disbursal', 'Often 2 to 7 working days once documents are complete.'],
      ['Use it for anything legal', 'Lenders do not ask you to account for how the money is spent.'],
    ],
    watch: ['Rates are higher than secured loans because nothing backs them', 'Check if insurance is bundled into the loan amount', 'Foreclosure in the first year can carry a charge'],
    preset: { amount: 500_000, years: 4 },
  },
  business: {
    who: ['Traders, shop owners and distributors', 'Manufacturers and service businesses with GST registration', 'Businesses with 2 to 3 years of operations and steady banking'],
    features: [
      ['Usually unsecured', 'Many lenders do not ask for property up to their unsecured limit.'],
      ['Built on your numbers', 'GST returns, ITR and bank statements carry the application.'],
      ['Flexible use', 'Stock, machinery, renovation, a new branch or bridging a payment gap.'],
      ['1 to 5 year tenure', 'Pick an EMI your monthly cash flow can carry comfortably.'],
    ],
    watch: ['Cheque bounces in the last 6 months hurt approval badly', 'Lenders look at average bank balance, not just turnover', 'Several new loan enquiries in a short time lower your chances'],
    preset: { amount: 2_500_000, years: 3 },
  },
  lap: {
    who: ['Owners of a flat, house, shop or office with clear title', 'Business owners who want a large amount at a lower rate', 'Salaried or self-employed with steady income to service the EMI'],
    features: [
      ['Lower rates', 'Secured by property, so rates sit well below unsecured loans.'],
      ['Long tenure', 'Up to 15 years keeps the EMI light on large amounts.'],
      ['Higher amounts', 'Typically 50 to 70% of the market value the lender assesses.'],
      ['You keep living or working there', 'The property is mortgaged, not handed over.'],
    ],
    watch: ['The property is at risk if repayments stop', 'Legal and valuation checks take 2 to 4 weeks', 'Title gaps or missing approvals can stall the file, so check papers first'],
    preset: { amount: 5_000_000, years: 10 },
  },
  cc: {
    who: ['Manufacturers and traders who hold stock and sell on credit', 'Businesses whose current limit no longer matches turnover', 'Borrowers unhappy with their bank’s rate, service or renewal delays'],
    features: [
      ['Fresh limit', 'A new cash credit or overdraft line sized to your stock, debtors and cash cycle.'],
      ['Enhancement', 'A higher limit when turnover has grown, backed by updated CMA data.'],
      ['Takeover', 'Move the whole limit to a lender with better terms or more appetite.'],
      ['Interest on use only', 'You pay interest on the daily balance you draw, not on the full limit.'],
    ],
    watch: ['Stock statements must be filed on time or drawing power is frozen', 'Debtors older than the lender’s cut-off (often 90 days) do not count', 'Renewal needs updated financials every year'],
    preset: { amount: 5_000_000, years: 1 },
  },
  bt: {
    who: ['Paying an EMI at a rate above what lenders offer today', 'At least 6 to 12 EMIs paid on time', 'Wanting a top-up loan on the same file'],
    features: [
      ['Lower rate', 'A small rate cut on a large balance saves a lot over the remaining tenure.'],
      ['Top-up on the same file', 'Borrow more without a separate unsecured loan.'],
      ['Reset tenure', 'Stretch it to lower the EMI or shorten it to finish sooner.'],
      ['We do the maths first', 'We compare the saving with fees and charges before you move.'],
    ],
    watch: ['Processing fee and any foreclosure charge eat into the saving', 'A new lender will run a fresh credit check', 'Moving late in the tenure saves less because most interest is already paid'],
    preset: { amount: 3_000_000, years: 10 },
  },
}

// ---------- Tools ----------
export const TOOLS = [
  { slug: 'emi-calculator', name: 'EMI calculator', blurb: 'Monthly instalment, total interest and total repayment for any loan.' },
  { slug: 'eligibility-calculator', name: 'Eligibility calculator', blurb: 'How much lenders may lend you, based on income and existing EMIs.' },
  { slug: 'drawing-power-calculator', name: 'Drawing power calculator', blurb: 'What your stock and debtors let you draw from a cash credit limit.' },
  { slug: 'dscr-calculator', name: 'DSCR calculator', blurb: 'Whether your business cash flow can carry a new loan.' },
]

// ---------- Glossary (plain-language definitions) ----------
export const GLOSSARY = [
  ['Amortisation', 'Paying off a loan through instalments that each cover interest plus part of the principal. Early EMIs are mostly interest; later ones mostly principal.'],
  ['Balance transfer', 'Moving the outstanding amount of a loan to another lender, usually to get a lower rate or better terms.'],
  ['Bounce charges', 'A fee charged when an EMI auto-debit or cheque fails for lack of funds. Bounces also hurt your credit score.'],
  ['Cash credit (CC)', 'A revolving working-capital limit secured by stock and debtors. You draw and repay as needed and pay interest only on what is used.'],
  ['CIBIL score', 'A three-digit score from 300 to 900 produced by TransUnion CIBIL from your repayment history, credit use, mix of loans and recent enquiries.'],
  ['CMA data', 'Credit Monitoring Arrangement data: a standard set of past, current and projected financial statements that banks use to size working-capital limits.'],
  ['Co-applicant', 'A second borrower, often a spouse or business partner, whose income is added to yours. They are equally responsible for repayment.'],
  ['Collateral', 'An asset pledged to secure a loan, such as property, gold, fixed deposits or business stock.'],
  ['Credit enquiry', 'A record created when a lender checks your credit report after you apply. Many enquiries in a short time can lower your score.'],
  ['Credit utilisation', 'How much of your card and revolving limits you are using. Keeping it low, roughly under 30%, helps your score.'],
  ['Disbursal', 'The lender releasing the sanctioned money to your account or to the seller.'],
  ['Drawing power (DP)', 'The amount you can actually draw from a cash credit limit at a given time: eligible stock and debtors after margins, capped at the sanctioned limit.'],
  ['DSCR', 'Debt service coverage ratio: the cash a business has available for debt (profit plus depreciation plus interest) divided by the interest and principal it must pay. Lenders commonly look for about 1.25 or more.'],
  ['EBLR', 'External benchmark lending rate. Most new floating-rate retail and small-business loans are linked to an outside benchmark, usually the RBI repo rate, so changes pass through faster.'],
  ['EMI', 'Equated monthly instalment: the fixed amount you pay each month to repay a loan over its tenure.'],
  ['e-NACH', 'An electronic mandate that lets the lender auto-debit your EMI from your bank account on the due date.'],
  ['FOIR', 'Fixed obligations to income ratio: the share of your monthly income that goes to all EMIs, including the new one. Lenders cap it, often between 40 and 60%.'],
  ['Foreclosure', 'Repaying the entire loan before the tenure ends. Charges depend on the loan type, rate type and lender.'],
  ['Guarantor', 'A person who promises to repay if the borrower does not. Unlike a co-applicant, their income is usually not counted.'],
  ['Hypothecation', 'A charge on movable assets such as stock, vehicles or debtors, where you keep possession and the lender holds the right over them.'],
  ['ITR', 'Income tax return. For self-employed applicants it is the main proof of income.'],
  ['KYC', 'Know Your Customer: identity and address verification with documents such as PAN and Aadhaar.'],
  ['LTV', 'Loan to value: the loan as a percentage of the property’s assessed value. A ₹70 lakh loan on a ₹1 crore property is 70% LTV.'],
  ['MCLR', 'Marginal cost of funds based lending rate: a bank’s internal benchmark used for many loans taken between 2016 and 2019. Some older loans are still linked to it.'],
  ['Moratorium', 'A period at the start of a loan when EMIs are paused or only interest is paid. Interest usually still accrues.'],
  ['Mortgage', 'A charge on immovable property, such as a flat, house, shop or land, given as security for a loan.'],
  ['MPBF', 'Maximum permissible bank finance: a traditional method for sizing working capital. Under the common Method II it is 75% of current assets minus current liabilities other than bank borrowings.'],
  ['NBFC', 'Non-banking financial company: an RBI-registered lender that gives loans but cannot accept demand deposits like a bank.'],
  ['Overdraft (OD)', 'A limit that lets you withdraw more than your balance, secured against property, fixed deposits or, for some salaried customers, salary.'],
  ['Part-prepayment', 'Paying a lump sum towards the principal before it is due, which cuts either your EMI or your remaining tenure.'],
  ['Processing fee', 'A one-time fee the lender charges to evaluate and set up the loan, usually a percentage of the amount plus GST.'],
  ['Repo rate', 'The rate at which the RBI lends to banks. Changes flow through to loans linked to the repo rate.'],
  ['Sanction letter', 'The lender’s written approval stating the amount, rate, tenure, fees and conditions. Read it before signing.'],
  ['Stock statement', 'A periodic, usually monthly, statement of stock and debtors you give the lender. It is used to calculate drawing power.'],
  ['Tenure', 'The length of time over which the loan is repaid.'],
  ['Top-up loan', 'An additional amount given on an existing loan, often at a rate close to the main loan.'],
  ['Udyam registration', 'The government registration certificate for micro, small and medium enterprises, issued by the Ministry of MSME.'],
  ['WCDL', 'Working capital demand loan: a short-term loan for a fixed period carved out of a working-capital limit, often priced below cash credit.'],
]
