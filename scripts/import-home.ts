// One-time import of the homepage's hard-coded content into Sanity.
// Run: node --env-file=.env.local scripts/import-home.ts
//
// Already run on 2026-11-27. The source images were then removed from /public (restore them
// from git history before re-running). Re-running is harmless: it only CREATES the Home page
// document and blog posts if they don't exist yet, and only fills empty Site settings fields,
// so nothing an editor changed in the Studio is overwritten.
import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("SANITY_API_WRITE_TOKEN missing in .env.local");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "jjlsvx5t",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-10-01",
  token,
  useCdn: false,
});

// ---------- helpers ----------

type Img = { _type: "image"; asset: { _type: "reference"; _ref: string }; alt?: string };
const uploaded = new Map<string, string>();

async function upload(key: string, buf: Buffer, filename: string, alt?: string): Promise<Img> {
  if (!uploaded.has(key)) {
    const asset = await client.assets.upload("image", buf, { filename });
    uploaded.set(key, asset._id);
    process.stdout.write(".");
  }
  return { _type: "image", asset: { _type: "reference", _ref: uploaded.get(key)! }, ...(alt ? { alt } : {}) };
}

/** Uploads /public/<p> as-is. */
const img = async (p: string, alt?: string) => upload(p, await readFile(path.join("public", p)), path.basename(p), alt);

/**
 * Uploads the part of /public/<p> the old CSS crop showed, so the site can now use plain object-cover.
 * Fractions are of the image's width/height. `aspect` first centre-crops to that ratio (for object-cover crops).
 */
async function cropped(p: string, f: { x?: number; y?: number; w?: number; h?: number }, aspect?: number) {
  let image = sharp(path.join("public", p));
  let { width = 0, height = 0 } = await image.metadata();
  if (aspect) {
    const w = Math.min(width, Math.round(height * aspect));
    const h = Math.min(height, Math.round(width / aspect));
    image = sharp(await image.extract({ left: Math.round((width - w) / 2), top: Math.round((height - h) / 2), width: w, height: h }).toBuffer());
    [width, height] = [w, h];
  }
  const left = Math.round((f.x ?? 0) * width);
  const top = Math.round((f.y ?? 0) * height);
  const buf = await image
    .extract({ left, top, width: Math.min(width - left, Math.round((f.w ?? 1) * width)), height: Math.min(height - top, Math.round((f.h ?? 1) * height)) })
    .webp({ quality: 85 })
    .toBuffer();
  return upload(`${p}|crop`, buf, path.basename(p));
}

/** Merges a multi-layer Figma icon (SVG layers placed by CSS inset %) into one square SVG. */
async function layered(name: string, layers: [string, string][]) {
  const parts = await Promise.all(
    layers.map(async ([src, inset]) => {
      const v = inset.split(" ").map(parseFloat);
      const [t, r, b, l] = [v[0], v[1] ?? v[0], v[2] ?? v[0], v[3] ?? v[1] ?? v[0]];
      const data = (await readFile(path.join("public", src))).toString("base64");
      return `<image href="data:image/svg+xml;base64,${data}" x="${l}" y="${t}" width="${100 - l - r}" height="${100 - t - b}" preserveAspectRatio="none"/>`;
    }),
  );
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="52" height="52">${parts.join("")}</svg>`;
  return upload(`layered|${name}`, Buffer.from(svg), `${name}.svg`);
}

let k = 0;
const key = () => `h${(k++).toString(36)}`;
const keyed = <T extends object>(items: T[]) => items.map((item) => ({ _key: key(), ...item }));
const link = (label: string, href: string) => ({ _type: "link", label, href });

/** Paragraph with bold parts: text("plain ", { b: "bold" }, " plain"). */
const text = (...parts: (string | { b: string })[]) => [
  {
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: parts.map((p) => ({ _type: "span", _key: key(), text: typeof p === "string" ? p : p.b, marks: typeof p === "string" ? [] : ["strong"] })),
  },
];

// ---------- home page ----------

const H = "/home";

async function homePage() {
  const C = `${H}/compare`;
  return {
    _id: "homePage",
    _type: "homePage",

    heroSlides: keyed([
      { _type: "heroSlide", design: "abroad", line1: "Dream", line2: "Learn", line3: "Achieve", accent: "Anywhere", subtitle: "Your Global Career Begins Here", button: link("Start Your Journey", "/study-abroad"), buttonStyle: "secondary", darkText: false },
      { _type: "heroSlide", design: "domestic", line1: "Study In India,", line2: "Limitless", line3: "Possibilities", subtitle: "Explore diverse courses in India", button: link("Apply Now", "/study-india"), buttonStyle: "primary", darkText: true },
      { _type: "heroSlide", design: "mbbs", line1: "Study MBBS,", line2: "Build a Career", line3: "Save Lives", subtitle: "Your journey to become a doctor, Starts here", button: link("Apply Now", "/study-mbbs"), buttonStyle: "secondary", darkText: false },
      { _type: "heroSlide", design: "law", line1: "Study Law,", line2: "Lead with", line3: "Justice", subtitle: "Build a rewarding career, Make an impact", button: link("Apply Now", "/study-india"), buttonStyle: "primary", darkText: false },
    ]),

    strengthTitle: "Our Strength",
    strengthBody: text(
      { b: "Skolarrs Solutions Pvt. Ltd." },
      " is a leading higher education guidance and admissions consultancy dedicated to helping students make informed academic and career decisions through transparent, personalized, and end-to-end counselling services. With over ",
      { b: "26+ years of excellence," },
      " Skolarrs supports admissions across ",
      { b: "Engineering, Medical, Allied Health Sciences, Nursing, Arts & Science, Management, and Study Abroad" },
      " programs, partnering with ",
      { b: "250+ universities, 1,000+ colleges, and institutions in 45+ countries" },
      ". The organization provides expert guidance for counselling processes such as ",
      { b: "TNEA, MCC, and state-level admissions," },
      " while also assisting students aspiring to pursue education overseas. Through a strong focus on integrity, student success, and digital innovation, Skolarrs combines accurate information, expert counselling, comprehensive admission support, and educational resources to simplify the journey from career aspiration to successful admission, positioning itself as a trusted partner for students and parents seeking quality higher education opportunities in India and abroad.",
    ),
    strengthPoints: ["Expert Career Guidance", "Trusted University Network", "Abroad & Domestic Admissions", "End-to-End Student Support"],
    strengthButton: link("Read More", "/about"),
    strengthPhoto: await img(`${H}/strength/photo.webp`, "Students studying together on campus steps"),
    strengthStats: keyed(
      await Promise.all(
        [
          ["1000+", "Top Colleges", "#006c7f", "icon-colleges.svg"],
          ["250+", "University Tie-ups", "#163e78", "icon-tieups.svg"],
          ["50k+", "Students Guided", "#684eff", "icon-students.webp"],
          ["100%", "Success Rate", "#e7a700", "icon-success.svg"],
          ["26+", "Years of Excellence", "#26a69a", "icon-years.svg"],
          ["24/7", "Expert Support", "#3c2a21", "icon-support.svg"],
        ].map(async ([value, label, color, icon]) => ({ _type: "statCard", value, label, color, icon: await img(`${H}/strength/${icon}`) })),
      ),
    ),

    servicesTitle: "Our Services and Offerings",
    servicesBody:
      "From career guidance to education financing, we make every step seamless — so your study abroad journey feels smooth and stress-free.We make every step seamless — so your study abroad journey feels smooth and stress-free",
    servicesPoints: ["Virtual Coaching and Counselling", "Applications, Admission & Visas", "Country & University Selection", "High Values Scholarship and Study Loans"],
    servicesButton: link("View More", "/services"),
    servicesImage: await img(`${H}/services/student.webp`, "Smiling student holding books"),

    journeyTitle: "Where are You in Your Education Journey?",
    journeyBody: "Whether you are planning your child’s future or building your own — start with\nthe guidance that’s right for you.",
    journeyCards: keyed([
      {
        _type: "journeyCard",
        title: "I’m a Parent",
        blurb: "Making the right decision for your child starts with the right information.",
        color: "#163e78",
        innerColor: "#16213e",
        icon: await img(`${H}/journey/icon-parent.webp`),
        photo: await img(`${H}/journey/parent-photo.webp`),
        points: [
          "High Values Scholarship and Study Loans",
          "Explore India & international education opportunities",
          "Understand fees, scholarships & financial planning",
          "Compare universities & institutions",
          "Get guidance on admissions & documentation",
          "Understand safety, accommodation & student support",
          "Get complete guidance for studying abroad",
        ],
        button: link("Explore as a Parent", "/study-abroad"),
      },
      {
        _type: "journeyCard",
        title: "I’m a Student",
        blurb: "Your goals. Your choices. Your future. Let’s find the right path.",
        color: "#943d73",
        innerColor: "#50253f",
        icon: await img(`${H}/journey/icon-student.webp`),
        photo: await img(`${H}/journey/student-photo.webp`),
        points: [
          "Discover courses based on interests & strengths",
          "Find colleges & universities that match your profile",
          "Explore study opportunities in India & abroad",
          "Understand eligibility, entrance exams & cut-offs",
          "Explore affordable education options",
          "Get application & admission guidance",
          "Plan your next step with career-focused guidance",
        ],
        button: link("Explore as a Student", "/study-india"),
      },
    ]),

    destinationTitle: "Find Your Perfect Abroad Study Destination",
    destinationBody: text("Choose what suits you from ", { b: "250+ global universities" }, " in, world over."),
    destinationButton: link("Explore Countries", "/study-abroad"),

    coursesTitle: "Explore Trending Domestic Courses",
    courses: keyed(
      await Promise.all(
        [
          ["Engineering & Technology", "Computer Science, AI & Data Science, Civil Engineering", "/study-india/engineering-and-technology", "#0057db", "#687b9d", "engineering", "icon-engineering"],
          ["Allied Health Science", "Nursing, Pharmacy, BDS, Nutrition & Dietetics, Physician Assistant", "/study-india", "#006c7f", "#0d939f", "allied", "icon-health"],
          ["MBBS", "General Medicine, Pediatrics, Cardiology, Radiology, Surgery", "/study-mbbs", "#0a8f7c", "#f1c3ac", "mbbs", "icon-mbbs"],
          ["LLB", "LLB, BA LLB, Public Administration", "/study-india", "#3c2a21", undefined, "llb", "icon-law"],
          ["Nursing", "B.Sc. Nursing, General Nursing, M.Sc. Nursing, Pediatric Nursing", "/study-india", "#26a69a", "#f1c3ac", "nursing", "icon-nursing"],
        ].map(async ([title, description, href, color, photoBackground, photo, icon]) => ({
          _type: "courseCard",
          title,
          description,
          href,
          color,
          ...(photoBackground ? { photoBackground } : {}),
          photo: await img(`${H}/courses/${photo}.webp`),
          icon: await img(`${H}/courses/${icon}.svg`),
        })),
      ),
    ),
    coursesButton: link("View More Courses", "/study-india"),

    banners: keyed([
      { _type: "banner", heading: ["Make Your", "MBBS Happen"], image: await img(`${H}/banners/mbbs.webp`), button: link("Apply Now", "/study-mbbs"), buttonStyle: "primary" },
      {
        _type: "banner",
        heading: ["Best Colleges", "Bright Futures"],
        // Old CSS: object-cover in a box 104.77% x 131.04% of the 770:411 tile, offset -2.35% / -17.51%.
        image: await cropped(`${H}/banners/colleges.webp`, { x: 2.35 / 104.77, y: 17.51 / 131.04, w: 100 / 104.77, h: 100 / 131.04 }, (104.77 * 770) / (131.04 * 411)),
        button: link("Apply Now", "/study-india"),
        buttonStyle: "secondary",
      },
    ]),

    compareBefore: {
      badge: "Before Skolarrs",
      title: "A Confusing Journey",
      subtitle: "Too many questions, No directions",
      items: keyed(
        await Promise.all(
          [
            ["icon-confused", "Confused"],
            ["icon-courses", "Too many courses"],
            ["icon-colleges", "Too many colleges"],
            ["icon-fees", "Don’t know fees"],
            ["icon-eligibility", "Don’t know eligibility"],
            ["icon-website", "Don’t know where to apply"],
          ].map(async ([icon, label]) => ({ _type: "compareItem", label, icon: await img(`${C}/${icon}.webp`) })),
        ),
      ),
    },
    compareAfter: {
      badge: "With Skolarrs",
      title: "A Smarter\nJourney",
      subtitle: "Expert guidance, every step of the way",
      items: keyed([
        { _type: "compareItem", label: "Career clarity", icon: await layered("career-clarity", [[`${C}/edu-a.svg`, "20.7% 17.82% 23.63% 5.86%"], [`${C}/edu-b.svg`, "6.06% 0"]]) },
        { _type: "compareItem", label: "Course Selection", icon: await img(`${C}/icon-courses-c.webp`) },
        { _type: "compareItem", label: "College shortlist", icon: await img(`${C}/icon-colleges-c.webp`) },
        { _type: "compareItem", label: "Application", icon: await img(`${C}/icon-application.webp`) },
        { _type: "compareItem", label: "Visa/documentation", icon: await layered("visa", [[`${C}/living-a.svg`, "2.91% 8.98% 0 8.98%"], [`${C}/living-b.svg`, "0 3.12% 5.86% 3.12%"]]) },
        {
          _type: "compareItem",
          label: "New beginning",
          green: true,
          icon: await layered("new-beginning", [[`${C}/resident-a.svg`, "3.13% 0 3.13% 5.86%"], [`${C}/resident-b.svg`, "14.84% 6.05% 3.13% 0"]]),
        },
      ]),
    },

    loansTitle: "Reach New Heights with Education Loans",
    loansBody: "Availing an education loan to study in your dream university has never been easier!",
    loansPoints: ["Study Loans through 20+ leading banks", "Financial structuring to suit your university", "Hassle free documentation", "Pre-visa disbursal of loans", "Forex and Travel Insurance"],
    loansButton: link("More Details", "/services"),

    partnersCount: "1500+",
    partnersTitle: "University Partners",
    partnersSubtitle: "For India & Study Abroad Journey",

    blogsTitle: "Blogs & News",
    blogsButton: link("Read More Blogs", "#"),
  };
}

// ---------- blog posts shown on the homepage ----------

async function posts() {
  const B = `${H}/blogs`;
  const list: [string, string, string | undefined, Promise<Img>][] = [
    // Old CSS crops (top / height as % of the card image box) are baked into the uploaded images.
    ["Germany and Canada Nursing Admission Started - 2026", "Abroad Study", "Attend Skolarr’s Germany and Canada nursing admission and apply for nursing 2026 - 2027", cropped(`${B}/featured.webp`, { y: 22.14 / 191.95, h: 100 / 191.95 })],
    ["Enroll Now for Engineering Programs in Australia - 2026", "News", undefined, img(`${B}/b1.webp`)],
    ["Secure Your Spot for Engineering Studies", "Engineering", undefined, cropped(`${B}/b2.webp`, { y: 6.91 / 141.45, h: 100 / 141.45 })],
    ["Engineering Enrollment for 2026 Now Open in the UK and Australia!", "Counselling", undefined, cropped(`${B}/b3.webp`, { h: 100 / 139.6 })],
    ["Join Our UK and Australia Engineering Programs", "Abroad Study", undefined, cropped(`${B}/b4.webp`, { x: 1.82 / 103.64, w: 100 / 103.64, h: 100 / 146.02 })],
  ];
  const out = [];
  for (const [i, [title, category, excerpt, image]] of list.entries()) {
    const slug = title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    out.push({
      _id: `post-${slug}`,
      _type: "post",
      title,
      slug: { _type: "slug", current: slug },
      category,
      ...(excerpt ? { excerpt } : {}),
      coverImage: { ...(await image), alt: title },
      // Same day, newest first in list order, so the first one is the featured card.
      publishedAt: new Date(Date.UTC(2026, 6, 10, 10 - i)).toISOString(),
      readingTime: 5,
    });
  }
  return out;
}

// ---------- run ----------

process.stdout.write("Uploading images");
const home = await homePage();
const blog = await posts();
console.log(`\n${uploaded.size} images uploaded.`);

const tx = client.transaction();
tx.createIfNotExists(home);
for (const p of blog) tx.createIfNotExists(p);
tx.patch("siteSettings", (p) =>
  p.setIfMissing({
    address: "1515, 3rd Floor, The Grand Hub\nOpp Varatharaja Mill, Avinashi Road\nPeelamedu, Coimbatore - 641004",
    mapUrl: "https://maps.google.com/?q=The+Grand+Hub+Avinashi+Road+Peelamedu+Coimbatore",
    contactTitle: "Get In Touch",
    contactBody: "Our expert counselors are here to guide you through every step of your domestic and international education journey.",
    socials: keyed([
      { network: "Facebook", url: "https://facebook.com" },
      { network: "Instagram", url: "https://instagram.com" },
      { network: "WhatsApp", url: "https://wa.me/919790444443" },
      { network: "YouTube", url: "https://youtube.com" },
    ]),
  }),
);
await tx.commit();
console.log("Done: homePage, siteSettings and", blog.length, "blog posts.");
