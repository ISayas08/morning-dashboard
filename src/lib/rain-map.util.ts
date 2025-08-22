export type RainCategory = "clear" | "drizzle" | "rain" | "showers" | "storm";

const rainCodeRanges: Array<{
  from: number;
  to: number;
  category: RainCategory;
}> = [
  { from: 51, to: 57, category: "drizzle" },
  { from: 61, to: 67, category: "rain" },
  { from: 80, to: 82, category: "showers" },
  { from: 95, to: 99, category: "storm" },
];

const rainCodeToCategoryMap: Record<number, RainCategory> = Object.fromEntries(
  rainCodeRanges.flatMap(({ from, to, category }) =>
    Array.from({ length: to - from + 1 }, (_, i) => [from + i, category])
  )
);

export const getRainCategory = (wmoCode: number): RainCategory =>
  rainCodeToCategoryMap[wmoCode] ?? "clear";

export const isRain = (wmoCode: number) => getRainCategory(wmoCode) !== "clear";
