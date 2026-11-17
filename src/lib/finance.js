// Pure loan math used by the calculators. Runs only in the browser; nothing is sent anywhere.

/** Monthly EMI for principal p, annual rate % and tenure in months. */
export function emi(p, annualRate, months) {
  if (p <= 0 || months <= 0) return 0
  const r = annualRate / 1200
  if (r === 0) return p / months
  const f = (1 + r) ** months
  return (p * r * f) / (f - 1)
}

/** Principal that a given EMI can service (inverse of emi). */
export function principalFor(monthlyEmi, annualRate, months) {
  if (monthlyEmi <= 0 || months <= 0) return 0
  const r = annualRate / 1200
  if (r === 0) return monthlyEmi * months
  const f = (1 + r) ** months
  return (monthlyEmi * (f - 1)) / (r * f)
}

/**
 * Lender-style eligibility: share of net monthly income allowed for all EMIs (FOIR),
 * minus EMIs already running.
 */
export function eligibility({ income, existingEmi = 0, foir = 0.5, annualRate, months }) {
  const room = Math.max(0, income * foir - existingEmi)
  return { maxEmi: room, maxLoan: principalFor(room, annualRate, months) }
}

/**
 * Cash credit drawing power (IBA style):
 * (stock - creditors for goods) x (1 - stock margin) + eligible debtors x (1 - debtor margin),
 * capped by the sanctioned limit.
 */
export function drawingPower({ stock, creditors, debtors, stockMargin = 0.25, debtorMargin = 0.3, limit }) {
  const stockDp = Math.max(0, stock - creditors) * (1 - stockMargin)
  const debtorDp = Math.max(0, debtors) * (1 - debtorMargin)
  const dp = stockDp + debtorDp
  return { stockDp, debtorDp, dp, available: limit > 0 ? Math.min(dp, limit) : dp }
}

/**
 * Debt service coverage ratio, yearly figures:
 * (net profit + depreciation + interest) / (interest + principal repaid + new loan EMIs).
 * ponytail: ignores the new loan's interest reducing profit — lenders refine this with full projections.
 */
export function dscr({ profit, depreciation = 0, interest = 0, principal = 0, newEmi = 0 }) {
  const service = interest + principal + newEmi * 12
  return service > 0 ? (profit + depreciation + interest) / service : Infinity
}

/** ₹ in Indian grouping, with L / Cr shorthand when compact. */
export function inr(n, compact = false) {
  const v = Math.round(n)
  if (compact) {
    if (v >= 1e7) return `₹${(v / 1e7).toFixed(v >= 1e8 ? 1 : 2).replace(/\.?0+$/, '')} Cr`
    if (v >= 1e5) return `₹${(v / 1e5).toFixed(2).replace(/\.?0+$/, '')} L`
  }
  return `₹${v.toLocaleString('en-IN')}`
}
