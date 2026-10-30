// One-time import of the site's existing content and images into Sanity.
// Run: node --env-file=.env.local scripts/import-to-sanity.ts
//
// Documents get fixed IDs (e.g. "country-canada"), so re-running updates the same
// documents instead of creating duplicates. It also OVERWRITES edits made in the
// Studio, so only re-run before editors start working.
import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { COUNTRIES } from "../src/data/countries.ts";
import { COUNTRY_DETAILS } from "../src/data/country-details.ts";

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

/** Uploads /public/<p> once and returns an image field value. Logos are trimmed to their visible area. */
async function img(p: string, { trim = false, alt }: { trim?: boolean; alt?: string } = {}): Promise<Img> {
  const key = `${p}|${trim}`;
  if (!uploaded.has(key)) {
    let buf = await readFile(path.join("public", p));
    if (trim) {
      try {
        buf = await sharp(buf).trim({ threshold: 10 }).webp({ quality: 90 }).toBuffer();
      } catch {
        // Image is a single colour or can't be trimmed; upload as-is.
      }
    }
    const asset = await client.assets.upload("image", buf, { filename: path.basename(p) });
    uploaded.set(key, asset._id);
    process.stdout.write(".");
  }
  return { _type: "image", asset: { _type: "reference", _ref: uploaded.get(key)! }, ...(alt ? { alt } : {}) };
}

let k = 0;
/** Adds the _key Sanity needs on every array item. */
const keyed = <T extends object>(items: T[]) => items.map((item) => ({ _key: `k${(k++).toString(36)}`, ...item }));
const ref = (id: string) => ({ _type: "reference", _ref: id, _key: `r${(k++).toString(36)}` });
const slug = (s: string) => ({
  _type: "slug",
  current: s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, ""),
});
const titleBody = (items: { title: string; body?: string }[]) => keyed(items.map((i) => ({ _type: "titleBody", ...i })));
const rows = (items: { label: string; value: string }[]) => keyed(items.map((i) => ({ _type: "labelValue", ...i })));

const docs: Record<string, unknown>[] = [];
const add = (doc: Record<string, unknown>) => docs.push(doc);

// ---------- universities ----------

type Uni = { name: string; logo: string; type: "abroad" | "india" | "medical"; city?: string; country?: string };
const uniId = (name: string) => `university-${slug(name).current}`;

const CANADA = COUNTRY_DETAILS.canada.universities.map((u): Uni => ({ name: u.name, logo: u.logo, type: "abroad", country: "Canada" }));

const ENGINEERING: Uni[] = [
  ["Adithya Institute of Technology, Coimbatore", "adithya"],
  ["Amrita College of Engineering, Coimbatore", "amrita"],
  ["CMS College of Engineering, Coimbatore", "cms"],
  ["Dhanalakshmi Srinivasan College of Engineering, Coimbatore", "dhanalakshmi"],
  ["Karpagam College of Engineering, Coimbatore", "karpagam"],
  ["Akshaya College of Engineering and Technology, Coimbatore", "akshaya"],
  ["Arjun College of Technology, Coimbatore", "arjun"],
  ["Dhaanish Ahmed Institute of Technology, Coimbatore", "dhaanish"],
  ["Hindusthan College of Engineering, Coimbatore", "hindusthan"],
  ["Kathir College of Engineering, Coimbatore", "kathir"],
].map(([name, f]) => ({ name, logo: `/course/unis/${f}.webp`, type: "india", city: "Coimbatore", country: "India" }));

const RUSSIA: Uni[] = [
  ["Kazan Federal University", "kazan"],
  ["Orenburg State Medical University", "orenburg"],
  ["Crimea Federal University", "crimea"],
  ["Bashkir State Medical University", "bashkir"],
  ["Ural State Medical University", "ural"],
  ["Tver State Medical University", "tver"],
].map(([name, f]) => ({ name, logo: `/russia/u-${f}.webp`, type: "medical", country: "Russia" }));

const PRIVATE_MEDICAL: Uni[] = [
  ["PSG Medical College & Hospital, Coimbatore", "psg"],
  ["Karpagam Faculty of Medical Sciences & Research Coimbatore", "karpagam"],
  ["Velammal Medical College Hospital & Research Institute", "velammal"],
  ["Panimalar Medical College Hospital & Research Institute", "panimalar"],
  ["Sri Muthukumaran Medical College Hospital & Research Institute, Chennai", "muthukumaran"],
  ["KMCH Institute of Health Sciences & Research, Coimbatore", "kmch"],
  ["Annapoorana Medical College & Hospital, Salem", "annapoorana"],
  ["Trichy SRM Medical College Hospital & Research Centre", "srm"],
  ["Madha Medical College & Hospital, Chennai", "madha"],
  ["Dhanalakshmi Srinivasan Medical College & Hospital, Perambur", "dhanalakshmi"],
].map(([name, f]) => ({ name, logo: `/private/colleges/${f}.webp`, type: "medical", country: "India" }));

async function universities() {
  for (const u of [...CANADA, ...ENGINEERING, ...RUSSIA, ...PRIVATE_MEDICAL]) {
    add({
      _id: uniId(u.name),
      _type: "university",
      name: u.name,
      slug: slug(u.name),
      type: u.type,
      city: u.city,
      country: u.country,
      logo: await img(u.logo, { trim: true }),
      hasDetailPage: false,
    });
  }

  // Adithya is the only college with a full page so far.
  const C = "/college";
  const adithya = docs.find((d) => d._id === uniId(ENGINEERING[0].name))!;
  Object.assign(adithya, {
    slug: { _type: "slug", current: "adithya-institute-of-technology" },
    hasDetailPage: true,
    courseCategory: { _type: "reference", _ref: "courseCategory-engineering-and-technology" },
    heroImage: await img(`${C}/hero.webp`),
    about: [
      "Adithya Institute of Technology (AIT) is committed to fostering academic excellence by providing a comprehensive and industry-relevant curriculum. The institution aims to cultivate a strong foundation in engineering and management disciplines through innovative teaching methodologies, research-driven learning, and hands-on practical exposure. By integrating advanced technology and modern pedagogy, AIT ensures that students develop critical thinking, problem-solving abilities, and technical proficiency to meet global industry standards.",
      "Beyond academics, AIT strives to nurture a culture of innovation, entrepreneurship, and leadership among students. The institute actively collaborates with industry leaders, research organizations, and academic institutions to provide students with real-world exposure and experiential learning opportunities. Through workshops, seminars, and internships, AIT empowers students to develop the professional competencies necessary to excel in a competitive global landscape.",
    ],
    aboutImage: await img(`${C}/about.webp`),
    pillars: titleBody([
      { title: "Vision", body: "To be a center of excellence in technical education and research." },
      { title: "Mission", body: "To empower students with knowledge, skills and values for a better tomorrow." },
      { title: "Our Values", body: "Integrity, Innovation, Excellence and Social Responsibility." },
    ]),
    stats: rows([
      { value: "100%", label: "Successful Students" },
      { value: "32+", label: "Awards & Recognitions" },
      { value: "150+", label: "Faculty Members" },
      { value: "1000+", label: "Students Enrolled" },
      { value: "50+", label: "Industry Collaborations" },
    ]),
    campusGallery: keyed(await Promise.all(["campus-main", "campus-1", "campus-2", "campus-3"].map((f) => img(`${C}/${f}.webp`)))),
    ugProgrammes: titleBody([
      { title: "B.Tech Artificial Intelligence & Data Science", body: "B.Tech in Artificial Intelligence and Data Science (AIDS) is a four-year undergraduate program that focuses on developing AI-based solutions and analyzing large datasets for decision-making." },
      { title: "B.Tech Information Technology", body: "B.Tech in Information Technology (IT) is a four-year undergraduate program that focuses on the study of computing technologies, software development, networking, and cybersecurity." },
      { title: "B.E Civil Engineering", body: "B.E. in Civil Engineering is a four-year undergraduate program that focuses on the design, construction, and maintenance of infrastructure projects such as buildings, roads, bridges, dams, and tunnels." },
      { title: "B.E Computer Science and Engineering", body: "B.E. in Computer Science and Engineering (CSE) is a four-year undergraduate program that focuses on the study of computing technologies, software development, algorithms, and data structures." },
      { title: "B.E Electronics and Communication Engineering", body: "B.E. in Electronics and Communication Engineering (ECE) is a four-year undergraduate program that focuses on the design, development, and maintenance of electronic devices and communication systems." },
    ]),
    pgProgrammes: titleBody([
      { title: "M.E Computer Science and Engineering", body: "A two-year postgraduate program covering advanced algorithms, distributed systems, machine learning, and research methodology." },
      { title: "M.E Structural Engineering", body: "A two-year postgraduate program focused on the analysis and design of safe, efficient, and sustainable structures." },
      { title: "M.E VLSI Design", body: "A two-year postgraduate program in digital and analog IC design, verification, and semiconductor technology." },
      { title: "MBA", body: "A two-year postgraduate program building management, leadership, and business analytics skills for engineers and graduates." },
    ]),
  });

  const reviews = [
    { rating: 5, name: "Merina", course: "Computer Science", quote: "The Computer Science program has been incredibly rewarding. From building real-world projects to learning from supportive professors, I’ve gained the skills and confidence to pursue a career in technology." },
    { rating: 5, name: "Rajani", course: "Software Engineering", quote: "The Software Engineering curriculum pushed me to design scalable systems and embrace agile methodologies, equipping me with practical experience for the tech industry." },
    { rating: 4.9, name: "Derek", course: "Electrical Engineering", quote: "Studying Electrical Engineering allowed me to dive deep into hardware-software integration, preparing me to develop innovative embedded systems." },
    { rating: 5, name: "Lina", course: "Mechanical Engineering", quote: "The Mechanical Engineering courses emphasized problem-solving and design thinking, which helped me excel in product development roles." },
    { rating: 4.8, name: "Carlos", course: "Civil Engineering", quote: "Through Civil Engineering, I learned how to apply engineering principles to real-world infrastructure challenges, making a tangible impact on communities." },
  ];
  for (const r of reviews) {
    add({ _id: `testimonial-adithya-${slug(r.name).current}`, _type: "testimonial", ...r, university: { _type: "reference", _ref: adithya._id } });
  }
}

// ---------- countries ----------

async function countries() {
  for (const [i, c] of COUNTRIES.entries()) {
    const d = COUNTRY_DETAILS[c.slug];
    add({
      _id: `country-${c.slug}`,
      _type: "country",
      name: c.name,
      slug: { _type: "slug", current: c.slug },
      order: i + 1,
      flag: await img(`/flags/round/${c.slug}.svg`),
      cardImage: await img(`/countries/${c.slug}.webp`),
      ...(d && {
        heroImage: await img(d.heroImage),
        whyBody: d.whyBody,
        universitiesBody: d.universitiesBody,
        universities: d.universities.map((u) => ref(uniId(u.name))),
        coursesBody: d.coursesBody,
        courses: d.courses,
        eligibilityBody: d.eligibilityBody,
        examsBody: d.examsBody,
        costBody: d.costBody,
        costOfStudy: rows(d.costOfStudy),
        costOfLiving: rows(d.costOfLiving),
        applicationBody: d.applicationBody,
        requirements: titleBody(d.requirements),
        promo: await img(d.promo, { alt: `Study in ${c.name}` }),
      }),
    });
  }
}

// ---------- course categories (Study India) ----------

async function courseCategories() {
  const I = "/india/courses";
  const cards = [
    { title: "Engineering & Technology", summary: "B.Tech | M.Tech | Mechanical | Civil | Electrical | Electronics | AI & Robotics", color: "#e2483d", icon: "icon-engineering" },
    { title: "Business & Management", summary: "BBA | MBA | Finance | Marketing | International Business | HR | Entrepreneurship", color: "#16213e", icon: "icon-business" },
    { title: "Medical & Healthcare", summary: "MBBS | Nursing | Pharmacy | Physiotherapy | Biotechnology | Allied Health Sciences", color: "#0a8f7c", icon: "icon-engineering" },
    { title: "Computer Science & IT", summary: "Computer Science | Data Science | Artificial Intelligence | Cybersecurity | Cloud Computing", color: "#0057db", icon: "icon-cs" },
    { title: "Law", summary: "LLB | LLM | Corporate Law | Criminal Law | International Law", color: "#3c2a21", icon: "icon-engineering" },
    { title: "Arts & Humanities", summary: "Psychology | Economics | English | History | Political Science | Sociology", color: "#006c7f", icon: "icon-engineering" },
    { title: "Design & Architecture", summary: "Architecture | Interior Design | Fashion Design | Product Design | Graphic Design", color: "#0e83cd", icon: "icon-architecture" },
    { title: "Hospitality & Tourism", summary: "Hotel Management | Tourism | Culinary Arts | Travel Management", color: "#5e4db2", icon: "icon-engineering" },
  ];
  for (const [i, c] of cards.entries()) {
    add({
      _id: `courseCategory-${slug(c.title).current}`,
      _type: "courseCategory",
      title: c.title,
      slug: slug(c.title),
      order: i + 1,
      summary: c.summary,
      color: c.color,
      icon: await img(`${I}/${c.icon}.svg`),
    });
  }

  const benefits = [
    { title: "High Career Demand", body: "Be part of a fast-growing industry with increasing opportunities across the globe" },
    { title: "Excellent Salary Potential", body: "Competitive compensation and strong growth prospects for skilled professionals" },
    { title: "Diverse Career Paths", body: "Explore multiple roles and specializations to find the path that fits your passion and strengths" },
    { title: "Innovation and Creativity", body: "Work on cutting edge technologies and bring impactful ideas to life" },
    { title: "Global Opportunities", body: "Collaborate with international clients and be part of a global network" },
    { title: "Continuous Learning & Growth", body: "Upgrade your skills, learn from industry experts, and grow at every step of your journey" },
  ];
  const trending = [
    "Artificial Intelligence & Machine Learning",
    "Data Science",
    "Cyber Security",
    "Robotics & Automation",
    "VLSI & Semiconductor Engineering",
    "EV Engineering",
    "Renewable Energy Engineering",
    "Aerospace Engineering",
    "Computer Science Engineering",
    "Electronics & Communications Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
  ];
  const eng = docs.find((d) => d._id === "courseCategory-engineering-and-technology")!;
  Object.assign(eng, {
    heroTitle: "Build. Innovate. Lead the Future.",
    heroSlides: keyed(await Promise.all([1, 2, 3, 4].map((n) => img(`/course/hero/h${n}.webp`)))),
    aboutBody:
      "Engineering & Technology is a dynamic field that drives innovation, solves real-world challenges, and shapes the future of industries worldwide. From computer science and artificial intelligence to civil, mechanical, and electrical engineering, these programs equip students with technical expertise, problem-solving abilities, and practical skills needed to excel in today's rapidly evolving technological landscape. Graduates enjoy diverse career opportunities across sectors such as IT, manufacturing, construction, healthcare, telecommunications, and research.",
    benefits: keyed(await Promise.all(benefits.map(async (b, i) => ({ _type: "imageCard", ...b, image: await img(`/course/about/a${i + 1}.webp`) })))),
    trending: keyed(await Promise.all(trending.map(async (title, i) => ({ _type: "imageCard", title, image: await img(`/course/trending/t${i + 1}.webp`) })))),
    universities: ENGINEERING.map((u) => ref(uniId(u.name))),
    promo: await img("/course/promo.webp", { alt: "Engineering Study — Build your future" }),
  });
}

// ---------- MBBS destinations ----------

async function mbbs() {
  const abroad = [
    ["Russia", "russia"],
    ["Georgia", "georgia"],
    ["Uzbekistan", "uzbekistan"],
    ["Kyrgyzstan", "kyrgyzstan"],
    ["Tajikistan", "tajikistan"],
    ["Vietnam", "vietnam"],
    ["Timor-Leste", "timor-leste"],
  ];
  for (const [i, [name, f]] of abroad.entries()) {
    add({
      _id: `mbbs-${f}`,
      _type: "mbbsDestination",
      name,
      slug: { _type: "slug", current: f },
      region: "abroad",
      order: i + 1,
      cardImage: await img(`/mbbs/abroad/${f}.webp`),
      flag: await img(`/mbbs/flags/${f}.svg`),
      hasDetailPage: false,
    });
  }
  const india = [
    ["Private Medical Colleges", "private-medical-colleges", "private"],
    ["State Private Medical Colleges", "state-private-medical-colleges", "state-private"],
    ["Deemed Universities", "deemed-universities", "deemed"],
  ];
  for (const [i, [name, s, f]] of india.entries()) {
    add({
      _id: `mbbs-${s}`,
      _type: "mbbsDestination",
      name,
      slug: { _type: "slug", current: s },
      region: "india",
      order: i + 1,
      cardImage: await img(`/mbbs/india/${f}.webp`),
      hasDetailPage: false,
    });
  }

  const point = (label: string, icon: string) => ({ label, icon });
  const WHY_BODY = "Understand the best course, university, and career pathway based on your academic profile, interests, and future goals.";
  Object.assign(docs.find((d) => d._id === "mbbs-russia")!, {
    hasDetailPage: true,
    heroImage: await img("/russia/hero.webp"),
    introTitle: "About MBBS In Russia",
    introBody:
      "Russia is one of the most preferred destinations for Indian medical aspirants due to its affordable tuition fees, globally recognized universities, modern infrastructure, and extensive clinical exposure. Russian medical universities are recognized by WHO, NMC, ECFMG, and other international medical bodies.",
    keyPoints: keyed([
      point("Affordable Tuition Fees", "ICON_EDUCATION"),
      point("Globally Recognized Medical Degrees", "ICON_GLOBAL"),
      point("Advanced Medical Infrastructure", "ICON_JOB"),
      point("Strong Clinical Exposure", "ICON_GROWTH"),
      point("Practical Learning", "ICON_INNOVATION"),
      point("Global Opportunities", "ICON_GLOBAL"),
    ]),
    universitiesTitle: "Popular Universities in Russia",
    universities: RUSSIA.map((u) => ref(uniId(u.name))),
    whyImage: await img("/russia/why.webp"),
    whyItems: titleBody(
      [
        "Personalized MBBS Counselling",
        "Country & University Selection",
        "Application Processing Support",
        "Documentation & Visa Assistance",
        "Pre-Departure Guidance",
        "End-to-End MBBS Admission Support",
      ].map((title) => ({ title, body: WHY_BODY })),
    ),
    promo: await img("/russia/promo.webp", { alt: "MBBS Abroad — Your dream. A healthier world." }),
  });

  Object.assign(docs.find((d) => d._id === "mbbs-private-medical-colleges")!, {
    hasDetailPage: true,
    heroImage: await img("/private/hero.webp"),
    introTitle: "Why Private Medical Colleges",
    introBody:
      "Private medical colleges in India play a vital role in shaping the future of healthcare by offering quality medical education, modern infrastructure, and extensive clinical exposure. With advanced teaching facilities, experienced faculty, and affiliations with reputed hospitals, these institutions provide aspiring doctors with excellent opportunities to pursue MBBS and other medical programs. Private medical colleges also help bridge the gap in medical education by increasing the number of available seats and providing students with diverse learning environments across the country.",
    keyPoints: keyed([
      point("Quality Medical Education", "ICON_EDUCATION"),
      point("Clinical Exposure and Practical Learning", "ICON_CLINICAL"),
      point("Modern Learning Facilities", "ICON_LEARNING"),
      point("Experienced Faculty and Academic Support", "ICON_FACULTY"),
      point("Campus and Student Life", "ICON_CAMPUS"),
      point("Opportunities for Future Specialisation", "ICON_GLOBAL"),
    ]),
    universitiesTitle: "Top Private Medical Colleges",
    universities: PRIVATE_MEDICAL.map((u) => ref(uniId(u.name))),
    fees: keyed([
      { title: "Govt. Quota", fee: "4.35 Lakh - 4.50 Lakh", route: "NEET, State Counselling" },
      { title: "Management Quota", fee: "15 Lakh", route: "NEET" },
      { title: "NRI Quota", fee: "27 Lakh", route: "NEET, NRI Sponsorship" },
    ]),
    promo: await img("/russia/promo.webp", { alt: "MBBS Abroad — Your dream. A healthier world." }),
  });
}

// ---------- services, FAQs, partners, events, settings ----------

async function services() {
  const list = [
    ["Personalized Counselling", "Get one-on-one guidance tailored to your academic goals, interests, and future career aspirations.", ["One-on-one counselling tailored to your goals", "Personalized course and university recommendations", "Guidance based on your interests, strengths & career plans"]],
    ["Career Guidance", "Our counselling sessions will immensely benefit you in making the best academic decision suiting your career choices.", ["Career-oriented counselling", "Emphasis on futuristic courses and careers", "Interactive sessions with university delegates"]],
    ["Test Preparation", "Effortlessly reach your highest potential test score with our certified, adept and dedicated tutors who will efficiently prepare you for your desired tests.", ["Interactive classrooms & free demo sessions", "Study material that’s simple yet highly effective", "Score oriented tutorials & mock tests"]],
    ["Application & Admission Support", "Choose the right intake, apply timely and smartly in courses and universities that are your right fit and receive admits/offers in no time.", ["Flawless applications - assured admits", "High quality SOPs, LORs and Resumes", "Real time application tracking & follow through with universities"]],
    ["University Selection & Support", "Find the right university with expert guidance tailored to your academic profile, career goals, budget, and preferred destination.", ["Shortlisting universities based on your profile & goals", "Guidance on courses, rankings, fees & eligibility", "Complete support throughout the university application process"]],
    ["Country & Course Selection", "We help you choose the ideal course, university & country that perfectly match your career, academic and budget preferences.", ["Make precise academic and career decisions", "University comparison – rankings, courses & scholarships", "Course options across 1000+ universities in 42 countries"]],
    ["Visa Processing", "Our skilled visa experts will help you prepare and present your visa documents to Embassies and High Commissions to ensure a successful visa outcomes in minimal time.", ["Impeccable guidance on visa documentation", "Excellent visa success ratio across all countries", "Mock visa interviews"]],
    ["End to End Application Processing", "From preparing your documents to submitting your application, we provide complete support at every stage.", ["Complete application preparation & documentation support", "Accurate form filling and application submission", "Regular updates and assistance throughout the admission process"]],
    ["Other Services", "We help you choose the ideal course, university & country that perfectly match your career, academic and budget preferences.", ["Educational loan", "Scholarships", "Internships"]],
  ] as const;
  for (const [i, [title, description, offerings]] of list.entries()) {
    add({ _id: `service-${slug(title).current}`, _type: "service", title, order: i + 1, description, offerings: [...offerings], image: await img(`/services/rows/${i + 1}.webp`) });
  }
}

function faqs() {
  const SERVICES_ANSWER =
    "We offer complete guidance for both domestic and international education, including career counseling, university selection, admission support, application processing, visa assistance, scholarship guidance, education loans, accommodation support, and pre-departure assistance.";
  const list: [string, string, string][] = [
    ["General", "What services does your consultancy provide?", SERVICES_ANSWER],
    ["General", "Do you help with both abroad and Indian admissions?", "Yes. We support admissions to colleges and universities across India as well as study abroad programs in 45+ countries."],
    ["General", "Is career counseling available before choosing a course?", "Absolutely. Our counsellors help you understand your interests, strengths and career goals before shortlisting courses and institutions."],
    ["General", "How early should I start planning for higher studies?", "Ideally 12–18 months before your intended intake, so there is enough time for exams, applications, scholarships and visas."],
    ["Admission", "Which entrance exams do you guide students for?", "We guide students through TNEA, NEET/MCC, state-level counselling and international tests such as IELTS, TOEFL, GRE and SAT."],
    ["Admission", "Can you help me shortlist colleges based on my marks?", "Yes. We match your academic profile, budget and preferences with suitable colleges and universities."],
    ["Application", "Do you help prepare SOPs and LORs?", "Yes. Our team reviews and helps you refine statements of purpose, letters of recommendation and resumes."],
    ["Application", "How many universities should I apply to?", "Most students apply to 5–8 universities with a balanced mix of ambitious, target and safe options."],
    ["Visa", "Do you assist with student visa applications?", "Yes. We help with documentation, financial proofs, interview preparation and filing timelines for your destination country."],
    ["Scholarship & Financial", "Can you help me find scholarships?", "Yes. We identify merit and need-based scholarships offered by universities, governments and private foundations."],
    ["Scholarship & Financial", "Do you help with education loans?", "We work with 20+ leading banks and lenders to structure education loans that suit your university and budget."],
  ];
  // Faq is shown with these defaults on all of these pages today.
  const pages = ["home", "study-abroad", "study-india", "study-mbbs", "about", "course", "country"];
  list.forEach(([category, question, answer], i) =>
    add({ _id: `faq-${i + 1}`, _type: "faq", category, question, answer, pages, order: i + 1 }),
  );
}

async function partners() {
  for (let i = 1; i <= 9; i++) {
    add({ _id: `partner-abroad-${i}`, _type: "partner", name: `Abroad partner ${i}`, group: "abroad", order: i, logo: await img(`/partners/abroad/u${i}.webp`) });
    add({ _id: `partner-india-${i}`, _type: "partner", name: `India partner ${i}`, group: "india", order: i, logo: await img(`/partners/india/i${i}.webp`) });
  }
}

async function events() {
  const list = [
    ["nursing", "Nursing", "Germany and Canada Nursing Admission Started - 2026", "Attend Skolarr’s Germany and Canada nursing admission and apply for nursing 2026 - 2027", "Register Now"],
    ["engineering", "Engineering", "UK and Australia Engineering Enrollment Open - 2026", "Join Skolarr’s UK and Australia engineering programs and secure your spot for 2026 - 2027", "Apply Today"],
    ["business", "Business", "USA and Singapore Business Courses Registration Live - 2026", "Explore Skolarr’s USA and Singapore business courses and kickstart your career for 2026 - 2027", "Enroll Now"],
  ];
  for (const [f, tag, title, description, cta] of list) {
    add({ _id: `event-${f}`, _type: "event", tag, title, description, image: await img(`/home/events/${f}.webp`), cta: { _type: "link", label: cta, href: "/#contact" } });
  }
}

function settings() {
  add({
    _id: "siteSettings",
    _type: "siteSettings",
    phones: ["+91 97904 44443", "0422 - 437 00 44"],
    email: "info@skolarrssolutions.com",
    whatsapp: "919790444443",
    stats: rows([
      { value: "1500+", label: "University Tie-ups" },
      { value: "26+", label: "Years of Experience" },
      { value: "100%", label: "Visa Success Rate" },
    ]),
    enquiryEmail: "info@skolarrssolutions.com",
  });
}

// ---------- run ----------

process.stdout.write("Uploading images");
await universities();
await countries();
await courseCategories();
await mbbs();
await services();
faqs();
await partners();
await events();
settings();
console.log(`\n${uploaded.size} images uploaded. Writing ${docs.length} documents…`);

// One transaction, so cross-references (e.g. college → course category) resolve together.
const tx = client.transaction();
for (const d of docs) tx.createOrReplace(d as { _id: string; _type: string });
await tx.commit();

const counts = docs.reduce<Record<string, number>>((acc, d) => ((acc[d._type as string] = (acc[d._type as string] ?? 0) + 1), acc), {});
console.log("Done:", counts);
