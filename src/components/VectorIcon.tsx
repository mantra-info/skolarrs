/** Multi-layer Figma icon: each layer is an SVG placed by inset (top right bottom left, % of the icon box). */
export default function VectorIcon({ layers, className = "" }: { layers: [src: string, inset: string][]; className?: string }) {
  return (
    <span aria-hidden className={`relative block shrink-0 overflow-hidden ${className}`}>
      {layers.map(([src, inset], i) => (
        <img loading="lazy" key={i} src={src} alt="" className="absolute block max-w-none" style={{ inset }} />
      ))}
    </span>
  );
}
