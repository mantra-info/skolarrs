import { PortableText, type PortableTextBlock } from "next-sanity";

/** Renders a CMS "simpleText" field: one <p> per paragraph, bold words styled with `strongClassName`. */
export default function SimpleText({ value, className = "", strongClassName = "font-semibold" }: { value?: PortableTextBlock[]; className?: string; strongClassName?: string }) {
  if (!value?.length) return null;
  return (
    <PortableText
      value={value}
      components={{
        block: { normal: ({ children }) => <p className={className}>{children}</p> },
        marks: { strong: ({ children }) => <strong className={strongClassName}>{children}</strong> },
      }}
    />
  );
}
