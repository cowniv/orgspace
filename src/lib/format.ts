export const CATEGORIES = ["workshop", "talk", "hackathon", "social"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_STYLE: Record<string, string> = {
  workshop: "bg-sky-100 text-sky-700",
  talk: "bg-violet-100 text-violet-700",
  hackathon: "bg-orange-100 text-orange-700",
  social: "bg-emerald-100 text-emerald-700",
};
