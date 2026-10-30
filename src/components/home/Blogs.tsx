import Link from "next/link";
import Button from "@/components/Button";

const TAGS = {
  "Abroad Study": { bg: "rgba(255,201,51,0.2)", border: "#e7a700", color: "#e7a700" },
  News: { bg: "rgba(60,42,33,0.15)", border: "#3c2a21", color: "#3c2a21" },
  Engineering: { bg: "rgba(0,87,219,0.12)", border: "#0057db", color: "#0057db" },
  Counselling: { bg: "rgba(0,108,127,0.1)", border: "#006c7f", color: "#006c7f" },
} as const;

type Tag = keyof typeof TAGS;

const SMALL: { tag: Tag; title: string; image: string; crop: string }[] = [
  { tag: "News", title: "Enroll Now for Engineering Programs in  Australia - 2026", image: "/home/blogs/b1.webp", crop: "inset-0 size-full object-cover" },
  { tag: "Engineering", title: "Secure Your Spot for Engineering Studies", image: "/home/blogs/b2.webp", crop: "top-[-6.91%] left-0 h-[141.45%] w-full" },
  { tag: "Counselling", title: "Engineering Enrollment for 2026 Now Open in the UK and Australia!", image: "/home/blogs/b3.webp", crop: "top-[0.04%] left-0 h-[139.6%] w-full" },
  { tag: "Abroad Study", title: "Join Our UK and Australia Engineering Programs", image: "/home/blogs/b4.webp", crop: "top-0 left-[-1.82%] h-[146.02%] w-[103.64%]" },
];

function TagChip({ tag }: { tag: Tag }) {
  const t = TAGS[tag];
  return (
    <span className="inline-flex items-center rounded-3xl border-[0.5px] px-3 py-2 text-label" style={{ backgroundColor: t.bg, borderColor: t.border, color: t.color }}>
      {tag}
    </span>
  );
}

function Meta({ small }: { small?: boolean }) {
  return (
    <div className={`flex items-center gap-6 text-[#777] ${small ? "text-xs leading-4 tracking-[-0.0075rem]" : "text-h6"}`}>
      <span>10 July 2026</span>
      <span className="w-px self-stretch bg-[#cecece]" />
      <span>5 Min read</span>
    </div>
  );
}

export default function Blogs() {
  return (
    <section id="blogs" className="bg-surface py-16 md:py-20">
      <div className="container-x flex flex-col gap-12">
        <h2 className="text-center text-[1.875rem]/[2.375rem] font-bold tracking-[-0.01875rem] text-ink md:text-h3">Blogs &amp; News</h2>
        <div className="flex flex-col gap-6 lg:flex-row">
          <Link href="#" className="flex flex-col gap-6 rounded-3xl border-[0.5px] border-[#cecece] bg-white p-6 transition hover:shadow-lg lg:w-[48.125rem] lg:shrink-0">
            <div className="relative aspect-[722/470] w-full overflow-hidden rounded-2xl lg:aspect-auto lg:flex-1">
              <img loading="lazy" src="/home/blogs/featured.webp" alt="" className="absolute top-[-22.14%] left-0 h-[191.95%] w-full max-w-none" />
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <TagChip tag="Abroad Study" />
              </div>
              <h3 className="text-xl/7 font-medium tracking-[-0.009375rem] text-ink md:text-h5">Germany and Canada Nursing Admission Started - 2026</h3>
            </div>
            <p className="text-base text-ink md:text-h6">Attend Skolarr’s Germany and Canada nursing admission and apply for nursing 2026 - 2027</p>
            <Meta />
          </Link>

          <span className="hidden w-px self-stretch bg-[#e0e0e0] lg:block" />

          <div className="grid flex-1 gap-3 sm:grid-cols-2">
            {SMALL.map((b) => (
              <Link
                key={b.title}
                href="#"
                className="flex h-[23.5rem] flex-col gap-6 rounded-3xl border-[0.5px] border-[#cecece] bg-white p-6 transition hover:shadow-lg"
              >
                <div className="relative flex-1 overflow-hidden rounded-2xl">
                  <img loading="lazy" src={b.image} alt="" className={`absolute max-w-none ${b.crop}`} />
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <TagChip tag={b.tag} />
                  </div>
                  <p className="text-h6 text-ink">{b.title}</p>
                </div>
                <Meta small />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <Button href="#" variant="secondary">
            Read More Blogs
          </Button>
        </div>
      </div>
    </section>
  );
}
