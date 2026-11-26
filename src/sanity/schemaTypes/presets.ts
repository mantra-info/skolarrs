// Fixed design options editors pick from, so content can't break the design.

/** Card / badge background colours used across the site. */
export const COLOR_OPTIONS = [
  { title: "Blue", value: "#0055cc" },
  { title: "Bright blue", value: "#0057db" },
  { title: "Azure", value: "#1d7afc" },
  { title: "Navy", value: "#163e78" },
  { title: "Midnight", value: "#16213e" },
  { title: "Teal", value: "#006c7f" },
  { title: "Sea green", value: "#0a8f7c" },
  { title: "Green", value: "#22a06b" },
  { title: "Sky", value: "#2898bd" },
  { title: "Ocean", value: "#0e83cd" },
  { title: "Purple", value: "#6e5dc6" },
  { title: "Violet", value: "#5e4db2" },
  { title: "Pink", value: "#da62ac" },
  { title: "Red", value: "#e2483d" },
  { title: "Orange", value: "#e56910" },
  { title: "Gold", value: "#e2b203" },
  { title: "Brown", value: "#3c2a21" },
];

export const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;

export type CountryColors = { main?: string; eligibility?: string; cost?: string };

/** White text down to the contrast the site's white-on-azure sections already use, dark text below that. */
function readableOn(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const whiteContrast = 1.05 / (0.2126 * r + 0.7152 * g + 0.0722 * b + 0.05);
  return whiteContrast >= 3.5 ? { text: "#ffffff", art: "brightness(0) invert(1)" } : { text: "#141414", art: "brightness(0)" };
}

/** CSS variables for a country page. Any colour left blank keeps the default blue and gold. */
export function countryThemeVars(colors?: CountryColors | null) {
  const { main, eligibility, cost } = colors ?? {};
  const vars: Record<string, string> = {
    "--theme-section": "linear-gradient(to top, #5ca9ff, #083abc)",
    "--theme-eligibility": "linear-gradient(to top, #ffe168, #fdc730)",
    "--theme-cost": "#1d7afc",
    "--theme-course-bg": "#ffeceb",
    "--theme-course-border": "#f15b50",
    "--theme-course-text": "#c9372c",
    "--theme-tab": "#d77a00",
    "--theme-tab-text": "#ffffff",
  };
  if (main && HEX_COLOR.test(main)) {
    const on = readableOn(main);
    Object.assign(vars, {
      "--theme-section": main,
      "--theme-section-text": on.text,
      "--theme-course-bg": "#ffffff",
      "--theme-course-border": "#e3e3e3",
      "--theme-course-text": "#141414",
      "--theme-btn-primary": `linear-gradient(${main}, ${main})`,
      "--theme-btn-secondary": `linear-gradient(${main}, ${main})`,
      "--theme-btn-text": on.text,
      "--theme-btn-art": on.art,
    });
  }
  if (eligibility && HEX_COLOR.test(eligibility)) {
    Object.assign(vars, { "--theme-eligibility": eligibility, "--theme-eligibility-text": readableOn(eligibility).text });
  }
  if (cost && HEX_COLOR.test(cost)) {
    const on = readableOn(cost);
    Object.assign(vars, { "--theme-cost": cost, "--theme-cost-text": on.text, "--theme-cost-art": on.art, "--theme-tab": on.text, "--theme-tab-text": cost });
  }
  return vars;
}

/** Layered vector icons defined in src/data/icons.ts. */
export const ICON_OPTIONS = [
  { title: "Education", value: "ICON_EDUCATION" },
  { title: "Tuition", value: "ICON_TUITION" },
  { title: "Job", value: "ICON_JOB" },
  { title: "Living", value: "ICON_LIVING" },
  { title: "Internship", value: "ICON_INTERNSHIP" },
  { title: "Resident", value: "ICON_RESIDENT" },
  { title: "Global", value: "ICON_GLOBAL" },
  { title: "Innovation", value: "ICON_INNOVATION" },
  { title: "Learning", value: "ICON_LEARNING" },
  { title: "Clinical", value: "ICON_CLINICAL" },
  { title: "Faculty", value: "ICON_FACULTY" },
  { title: "Campus", value: "ICON_CAMPUS" },
  { title: "Growth", value: "ICON_GROWTH" },
];

/** Pages that can show shared FAQs and testimonials. */
export const PAGE_OPTIONS = [
  { title: "Home", value: "home" },
  { title: "Study Abroad", value: "study-abroad" },
  { title: "Study India", value: "study-india" },
  { title: "Study MBBS", value: "study-mbbs" },
  { title: "Services", value: "services" },
  { title: "About", value: "about" },
  { title: "Course pages", value: "course" },
  { title: "Country pages", value: "country" },
];

export const BLOG_CATEGORIES = ["Abroad Study", "News", "Engineering", "Counselling"];

export const FAQ_CATEGORIES = ["General", "Admission", "Application", "Visa", "Scholarship & Financial"];
