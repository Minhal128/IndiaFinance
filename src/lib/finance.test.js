import { test } from 'node:test'
import assert from 'node:assert/strict'
import { emi, principalFor, eligibility, drawingPower, inr } from './finance.js'

test('emi matches the standard bank figure', () => {
  // ₹10 L at 10.5% for 5 years is ₹21,494 on every bank calculator
  assert.equal(Math.round(emi(1_000_000, 10.5, 60)), 21494)
  assert.equal(emi(120_000, 0, 12), 10_000)
  assert.equal(emi(0, 12, 12), 0)
})

test('principalFor inverts emi', () => {
  const p = principalFor(emi(2_500_000, 9.4, 180), 9.4, 180)
  assert.ok(Math.abs(p - 2_500_000) < 1)
})

test('eligibility never goes negative', () => {
  assert.deepEqual(eligibility({ income: 40_000, existingEmi: 30_000, annualRate: 12, months: 48 }), { maxEmi: 0, maxLoan: 0 })
  const ok = eligibility({ income: 80_000, existingEmi: 10_000, annualRate: 12, months: 48 })
  assert.equal(ok.maxEmi, 30_000)
})

test('drawing power applies margins and caps at the limit', () => {
  const r = drawingPower({ stock: 100, creditors: 20, debtors: 50, limit: 1000 })
  assert.equal(r.stockDp, 60)
  assert.equal(r.debtorDp, 35)
  assert.equal(r.available, 95)
  assert.equal(drawingPower({ stock: 100, creditors: 0, debtors: 0, limit: 50 }).available, 50)
})

test('inr formats Indian grouping and shorthand', () => {
  assert.equal(inr(1234567), '₹12,34,567')
  assert.equal(inr(2_500_000, true), '₹25 L')
  assert.equal(inr(15_000_000, true), '₹1.5 Cr')
})
