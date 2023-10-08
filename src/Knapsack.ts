import type { GiftWeightCase } from './GiftWeightCase';

export function knapsack(maxWeight: number, data: GiftWeightCase['data']): string {
  const numberOfItems = data.length;
  const tabulation: number[][] = Array.from({ length: numberOfItems + 1 })
    .fill(-1)
    .map(() => Array.from({ length: maxWeight + 1 }));
  data.sort((a, b) => b.cost - a.cost === 0 ? a.weight - b.weight : b.cost - a.cost);

  for (let i = 0; i <= numberOfItems; i++) {
    for (let k = 0; k <= maxWeight; k++) {
      if (i === 0 || k === 0) {
        tabulation[i][k] = 0;
      }
      else if (data[i - 1].weight > k) {
        tabulation[i][k] = tabulation[i - 1][k];
      }
      else {
        tabulation[i][k] = data[i - 1].cost + tabulation[i - 1][Math.floor(k - data[i - 1].weight)] > tabulation[i - 1][k]
          ? Number(data[i - 1].cost + tabulation[i - 1][Math.floor(k - data[i - 1].weight)])
          : tabulation[i - 1][k];
      }
    }
  }

  let maximumCost = tabulation[numberOfItems][maxWeight];
  const selectedItem: number[] = [];

  for (let i = numberOfItems; i > 0 && maximumCost > 0; i--) {
    if (maximumCost !== tabulation[i - 1][maxWeight]) {
      selectedItem.push(data[i - 1].index);
      maximumCost = maximumCost - data[i - 1].cost;
      maxWeight = maxWeight - data[i - 1].weight;
    }
  }
  return selectedItem.length > 0 ? selectedItem.join(',') : '-';
}
