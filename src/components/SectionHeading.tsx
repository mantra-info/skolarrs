type Props = {
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
};

/** H2 title + paragraph pair used at the top of most sections. */
export default function SectionHeading({ title, description, align = "center", light, className = "" }: Props) {
  const center = align === "center";
  return (
    <div className={`flex flex-col gap-4 md:gap-7 ${center ? "items-center text-center" : "items-start"} ${className}`}>
      <h2 className={`text-[2rem]/[2.5rem] font-bold tracking-[-0.025rem] md:text-h2 ${light ? "text-white" : "text-heading"}`}>{title}</h2>
      {description && (
        <p className={`max-w-[73.625rem] text-base md:text-h6 ${light ? "text-white/80" : "text-paragraph"}`}>{description}</p>
      )}
    </div>
  );
}
