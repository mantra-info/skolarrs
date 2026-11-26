import Button from "./Button";

/** Blue "Get In Touch" banner with call-centre photo (About page "Frame 661"). */
export default function CtaBanner({
  title = "Get In Touch",
  body = "Our advisors are available around the clock to answer questions and support your educational journey. Connect with us today to explore how Skolarrs can help you meet your career goals.",
  cta = "Talk to Counsellor",
}: {
  title?: string;
  body?: string;
  cta?: string;
}) {
  return (
    <section className="container-x py-16 lg:py-20">
      <div className="relative flex flex-col overflow-hidden rounded-2xl bg-[linear-gradient(to_top,#5ca9ff,#083abc)] lg:h-[17.375rem] lg:flex-row lg:items-center lg:justify-between">
        <img loading="lazy" src="/about/cta-map.svg" alt="" className="pointer-events-none absolute top-[-6.5rem] left-[53.4375rem] hidden h-[30.375rem] w-[58.1875rem] max-w-none lg:block" />
        <img loading="lazy" src="/about/cta-agents.webp" alt="" className="relative aspect-[499/265] w-full object-bottom lg:h-full lg:w-auto lg:rounded-l-2xl" />
        <div className="relative flex h-full flex-1 items-center p-6 lg:p-8 lg:min-w-0">
          <div className="flex max-w-[45.9375rem] flex-col items-start gap-5 text-[#f7f7f7]">
            <h2 className="text-[1.625rem]/8 font-semibold tracking-[-0.0125rem] lg:text-h4">{title}</h2>
            <p className="text-label">{body}</p>
            <Button href="/#contact" variant="secondary">
              {cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
