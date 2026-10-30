/** Full-width rounded promotional artwork: 1432x421 (Figma "Frame 736") or 1560x418 when `wide` ("Frame 732"). */
export default function PromoBanner({ src, alt, crop = "top-[-7.91%] h-[112.5%]", wide }: { src: string; alt: string; crop?: string; wide?: boolean }) {
  return (
    <section className={`container-x ${wide ? "py-10" : "py-16 md:py-[6.25rem]"}`}>
      <div className={`relative w-full overflow-hidden rounded-3xl ${wide ? "aspect-[1560/418]" : "aspect-[1432/421]"}`}>
        <img loading="lazy" src={src} alt={alt} className={`absolute left-0 w-full max-w-none ${crop}`} />
      </div>
    </section>
  );
}
