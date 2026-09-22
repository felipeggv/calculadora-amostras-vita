/** Simulação por kit. Taxas são percentuais de 0 a 100. */
export function calculate({ volume, price, feeRate, kitCost, freight, ads, repeatRate, incrementality, margin, directCAC }) {
  const netRevenue = price * (1 - feeRate / 100);
  const kitContribution = netRevenue - kitCost - freight - ads;
  const incrementalRate = (repeatRate / 100) * (incrementality / 100);
  const incrementalBuyers = volume * incrementalRate;
  const kitTotal = volume * kitContribution;
  const repeatTotal = incrementalBuyers * margin;
  const effectiveCost = incrementalRate > 0 ? -kitContribution / incrementalRate : null;
  const breakEvenRate = kitContribution >= 0 ? 0 : margin * incrementality > 0
    ? (-kitContribution / (margin * incrementality / 100)) * 100 : null;
  const parityRate = kitContribution >= 0 ? 0 : directCAC * incrementality > 0
    ? (-kitContribution / (directCAC * incrementality / 100)) * 100 : null;

  return {
    grossTotal: volume * price,
    adsTotal: volume * ads,
    netRevenue,
    kitContribution,
    incrementalBuyers,
    kitTotal,
    repeatTotal,
    netTotal: kitTotal + repeatTotal,
    effectiveCost,
    breakEvenRate,
    parityRate,
    directAdvantage: incrementalBuyers * directCAC + kitTotal,
  };
}
