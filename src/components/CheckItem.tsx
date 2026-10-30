/** Gold four-point sparkle bullet + label used across feature lists. */
export default function CheckItem({ children, size = "md", className = "" }: { children: React.ReactNode; size?: "sm" | "md"; className?: string }) {
  const sm = size === "sm";
  return (
    <li className={`flex items-center ${sm ? "gap-5 py-2" : "gap-2"} ${className}`}>
      <img loading="lazy" src={sm ? "/icons/sparkle-sm.svg" : "/icons/sparkle.svg"} alt="" className={sm ? "size-6 shrink-0" : "size-8 shrink-0"} />
      <span>{children}</span>
    </li>
  );
}
