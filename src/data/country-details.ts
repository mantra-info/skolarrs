export type CountryDetail = {
  heroImage: string;
  heroCrop: string;
  whyBody: string;
  universitiesBody: string;
  universities: { name: string; logo: string; w: number; h: number; crop?: string }[];
  coursesBody: string;
  courses: string[];
  eligibilityBody: string;
  examsBody: string;
  costBody: string;
  costOfStudy: { label: string; value: string }[];
  costOfLiving: { label: string; value: string }[];
  applicationBody: string;
  requirements: { title: string; body: string }[];
  promo: string;
};

const U = "/country/canada";

/** Full content exists in the design for Canada only. */
export const COUNTRY_DETAILS: Record<string, CountryDetail> = {
  canada: {
    heroImage: `${U}/hero.webp`,
    heroCrop: "top-[-2.52%] h-[159.32%]",
    whyBody:
      "Study, grow, and succeed in one of the world's leading education destinations. Canada attracts thousands of international students every year with its excellent academic institutions, affordable education options, diverse communities, and strong employment prospects. From innovative classrooms and research opportunities to valuable post-graduation work experiences, Canada offers everything students need to thrive in today's global economy.",
    universitiesBody:
      "A Canadian university education is an investment in your future. Renowned for high academic standards and innovative teaching methods, Canada's universities equip students with the knowledge, skills, and global perspective needed to excel in today's competitive world. Students benefit from world-class faculty, advanced research opportunities, diverse campus communities, and strong industry connections that support career growth. Whether your goal is higher education, professional success, or international exposure, studying in Canada provides the foundation to achieve your ambitions.",
    universities: [
      { name: "University of Ottawa", logo: `${U}/u-ottawa.webp`, w: 120, h: 31 },
      { name: "University of Windsor", logo: `${U}/u-windsor.webp`, w: 120, h: 47 },
      { name: "Wilfrid Laurier University - WLU", logo: `${U}/u-wlu.webp`, w: 120, h: 37 },
      { name: "Humber Polytechnic", logo: `${U}/u-humber.webp`, w: 122, h: 21, crop: "left-[0.57%] w-[100.5%] h-full" },
      { name: "Lakehead University - Thunder Bay Campus", logo: `${U}/u-lakehead.webp`, w: 120, h: 63 },
      { name: "University of Guelph", logo: `${U}/u-guelph.webp`, w: 120, h: 63 },
      { name: "Dalhousie University", logo: `${U}/u-dalhousie.webp`, w: 120, h: 33, crop: "left-[0.18%] w-[98.76%] h-full" },
      { name: "University of Regina", logo: `${U}/u-regina.webp`, w: 120, h: 48 },
      { name: "The University of British Columbia", logo: `${U}/u-ubc.webp`, w: 120, h: 30.6, crop: "left-[-0.02%] top-[-3.13%] w-[114.94%] h-full" },
      { name: "Ontario Tech University", logo: `${U}/u-ontariotech.webp`, w: 120, h: 30.6 },
    ],
    coursesBody:
      "With thousands of career-focused programs available across colleges and universities, Canada provides excellent academic opportunities for international students. Popular areas of study include Engineering, Computer Science, AI, Data Science, Business Management, Finance, Healthcare, Nursing, Cyber Security, Hospitality, and Project Management. These programs combine academic excellence with practical learning, helping graduates build successful careers in Canada and around the world.",
    courses: [
      "MBA",
      "Public Health",
      "International Business",
      "Computer Science",
      "Data Science / Artificial Intelligence",
      "Project Management",
      "Finance / Accounting",
      "Engineering (Various Specializations)",
      "Marketing / Digital Marketing",
    ],
    eligibilityBody:
      "Canada welcomes international students from around the world, but applicants must meet the admission requirements of their chosen institution and obtain a valid Canadian study permit. The eligibility criteria vary by institutions and course, however, the general requirements include the following.",
    examsBody:
      "International students must demonstrate English proficiency through tests like IELTS, TOEFL, or PTE. Standardised tests are generally not required, but some universities may ask for GMAT or GRE for specific postgraduate programs such as MBA or specialized master’s courses.",
    costBody:
      "The cost of studying in Canada includes tuition fees and living expenses, which vary by course and university. Students should plan their finances carefully for a smooth study experience. Overall expenses depend on the location and lifestyle, so proper budgeting helps avoid unexpected costs.",
    costOfStudy: [
      { label: "Annual Tuition Fees for Masters ( PA )", value: "$18,000 – $25,000" },
      { label: "Annual Tuition Fees for Bachelors ( PA )", value: "$18,000 – $22,000" },
      { label: "Associate Degree (PA)", value: "$16,000 – $18,000" },
      { label: "PG Diploma (PA)", value: "$17,000 – $19,000" },
      { label: "Certificate/Diploma/Advance Diploma", value: "$14,000 – $18,000" },
    ],
    // Not specified in the design; indicative ranges for the "Cost of Living" tab.
    costOfLiving: [
      { label: "Accommodation (PA)", value: "$8,000 – $14,000" },
      { label: "Food & Groceries (PA)", value: "$3,000 – $4,500" },
      { label: "Transportation (PA)", value: "$1,000 – $1,500" },
      { label: "Health Insurance (PA)", value: "$600 – $900" },
      { label: "Personal Expenses (PA)", value: "$1,500 – $2,500" },
    ],
    applicationBody:
      "Applying to a Canadian university requires students to meet the institution's admission criteria and submit the necessary academic and supporting documents. Requirements may vary by university and program, so it is advisable to prepare your application well in advance. Starting the process 6–12 months before your chosen intake gives you enough time to secure admission, obtain a study permit, and make travel arrangements.",
    requirements: [
      {
        title: "Valid Passport",
        body: "A valid passport is required throughout the admission and study permit application process. Ensure it remains valid for the duration of your intended stay in Canada.",
      },
      {
        title: "Academic Transcripts",
        body: "Submit official mark sheets and transcripts from all previous educational institutions to demonstrate your academic performance.",
      },
      {
        title: "English Language Proficiency",
        body: "Demonstrate your English language skills through accepted tests such as IELTS, TOEFL, PTE Academic, or other university-approved examinations.",
      },
      {
        title: "Letter of Recommendations (If applicable)",
        body: "A letter from a teacher, professor, or employer that highlights a student's academic achievements, skills, and potential for success in higher education.",
      },
      {
        title: "Application Fee (If applicable)",
        body: "Most Canadian universities charge an application processing fee, although some institutions may waive it for eligible applicants or during special admission periods.",
      },
      {
        title: "Statement of Purpose (SOP) (If applicable)",
        body: "Provide a compelling Statement of Purpose outlining your academic interests, career aspirations, and reasons for choosing Canada, the university, and the program.",
      },
      {
        title: "Resume / Curriculum Vitae (CV)",
        body: "Postgraduate and professional programs often require a resume highlighting your education, work experience, internships, research, and achievements.",
      },
    ],
    promo: `${U}/promo.webp`,
  },
};
