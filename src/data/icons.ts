/** Layer stacks for multi-part Figma icons, consumed by <VectorIcon />. Insets are % of the icon box. */
type Layers = [string, string][];

const W = "/icons/why";
export const ICON_EDUCATION: Layers = [[`${W}/edu-a.svg`, "20.7% 17.82% 23.63% 5.86%"], [`${W}/edu-b.svg`, "6.06% 0"]];
export const ICON_TUITION: Layers = [[`${W}/tuition-a.svg`, "5.86% 0 6.05% 0"], [`${W}/tuition-b.svg`, "0"]];
export const ICON_JOB: Layers = [[`${W}/job-a.svg`, "16.31% 0 25.1% 0"], [`${W}/job-b.svg`, "7.52% 0"]];
export const ICON_LIVING: Layers = [[`${W}/living-a.svg`, "2.91% 8.98% 0 8.98%"], [`${W}/living-b.svg`, "0 3.12% 5.86% 3.12%"]];
export const ICON_INTERNSHIP: Layers = [[`${W}/internship.svg`, "0"]];
export const ICON_RESIDENT: Layers = [[`${W}/resident-a.svg`, "3.13% 0 3.13% 5.86%"], [`${W}/resident-b.svg`, "14.84% 6.05% 3.13% 0"]];

const G = "/icons/global";
export const ICON_GLOBAL: Layers = [
  [`${G}/a.svg`, "15.75% 0 0.13% 0"],
  [`${G}/b.svg`, "0 13.56% 0 2.57%"],
  [`${G}/c.svg`, "3.97% 21.49% 15.12% 8.49%"],
  [`${G}/d.svg`, "5.22% 1.43% 19.76% 0.24%"],
  [`${G}/e.svg`, "9.01% 6.8% 20.25% 4.92%"],
];

const N = "/icons/innovation";
export const ICON_INNOVATION: Layers = [
  [`${N}/a.svg`, "42.97% 16.01% 28.71% 16.01%"],
  [`${N}/b.svg`, "49.03% 21.87% 32.62% 21.87%"],
  [`${N}/c.svg`, "42.97% 16.01% 28.71% 50%"],
  [`${N}/d.svg`, "49.03% 21.87% 32.62% 50%"],
  [`${N}/e.svg`, "56.59% 15.82% 0 15.82%"],
  [`${N}/f.svg`, "3.91% 9.96% 58.98% 9.96%"],
  [`${N}/g.svg`, "0 27.54% 41.41% 27.54%"],
  [`${N}/h.svg`, "54.69% 4.1% 17.97% 4.1%"],
];

export const ICON_LEARNING: Layers = [["/icons/learning.svg", "0 19%"]];
export const ICON_CLINICAL: Layers = [["/icons/clinical.svg", "0 8.35%"]];
export const ICON_FACULTY: Layers = [["/icons/faculty.svg", "0"]];

const C = "/icons/campus";
export const ICON_CAMPUS: Layers = [
  [`${C}/g7.svg`, "35.01% 10.61% 28.72% 10.61%"],
  [`${C}/g8.svg`, "35.01% 10.61% 52.64% 10.61%"],
  [`${C}/g9.svg`, "24.72% 7.04% 57.74% 7.04%"],
  [`${C}/g10.svg`, "2.2% 27.21% 75.28% 27.21%"],
  [`${C}/g11.svg`, "12.24% 27.21% 75.28% 27.21%"],
  [`${C}/g12.svg`, "18.81% 27.21% 28.72% 27.21%"],
  [`${C}/g13.svg`, "51.66% 27.21% 28.72% 27.21%"],
  [`${C}/v2.svg`, "43.41% 37.24% 28.72% 37.24%"],
  [`${C}/v3.svg`, "51.66% 37.24% 28.72% 37.24%"],
  [`${C}/v4.svg`, "0.73% 21.93% 80.14% 21.93%"],
  [`${C}/v5.svg`, "43.41% 48.54% 28.72% 48.54%"],
  [`${C}/v6.svg`, "51.66% 48.54% 28.72% 48.54%"],
  [`${C}/g14.svg`, "88.54% 5.37% 0.73% 5.37%"],
  [`${C}/g15.svg`, "84.06% 5.37% 7.55% 5.37%"],
  [`${C}/g16.svg`, "56.43% 0 14.47% 0"],
  [`${C}/g17.svg`, "64.22% 9.95% 22.26% 9.56%"],
];

const R = "/icons/growth";
export const ICON_GROWTH: Layers = [
  [`${R}/a.svg`, "81.67% 76.37% 3.68% 6.05%"],
  [`${R}/b.svg`, "69.95% 52.93% 3.68% 29.49%"],
  [`${R}/c.svg`, "58.23% 29.49% 3.68% 52.93%"],
  [`${R}/d.svg`, "46.51% 6.05% 3.68% 76.37%"],
  [`${R}/e.svg`, "0.75% 10.92% 41.47% 12.09%"],
  [`${R}/f.svg`, "46.51% 6.05% 3.68% 85.16%"],
  [`${R}/g.svg`, "58.23% 29.49% 3.68% 14.84%"],
  [`${R}/h.svg`, "0.75% 10.92% 46.98% 50%"],
  [`${R}/i.svg`, "93.39% 0 0.75% 0"],
  [`${R}/j.svg`, "93.39% 0 0.75% 50%"],
];
