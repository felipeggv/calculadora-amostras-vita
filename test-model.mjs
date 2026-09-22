import assert from 'node:assert/strict';
import { calculate } from './model.mjs';

const base = {
  volume: 1000, price: 24.9, feeRate: 25, kitCost: 11.5, freight: 4.5,
  ads: 6, repeatRate: 5, incrementality: 100, margin: 100, directCAC: 110,
};
const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-9, `${actual} != ${expected}`);

const result = calculate(base);
near(result.kitContribution, -3.325);
near(result.incrementalBuyers, 50);
near(result.effectiveCost, 66.5);
near(result.netTotal, 1675);
near(result.directAdvantage, 2175);
near(result.parityRate, 3.0227272727272725);

const halfIncremental = calculate({ ...base, incrementality: 50 });
near(halfIncremental.effectiveCost, 133);
near(halfIncremental.netTotal, -825);

const noRepeat = calculate({ ...base, repeatRate: 0 });
assert.equal(noRepeat.effectiveCost, null);
near(noRepeat.netTotal, -3325);

console.log('Cenários financeiros: OK');
