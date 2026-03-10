export const CATEGORIES = ["workshop", "talk", "hackathon", "social"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_STYLE: Record<string, string> = {
  workshop: "bg-sky-100 text-sky-700",
