export const CATEGORIES = ["workshop", "talk", "hackathon", "social"] as const;
export type Category = (typeof CATEGORIES)[number];

