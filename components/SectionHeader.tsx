export default function SectionHeader({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-10 max-w-[42rem] md:mb-14">
      <p className="mb-3 text-sm font-semibold text-accent">{eyebrow}</p>
      <h2 id={id} className="text-3xl leading-tight font-bold tracking-tight md:text-5xl">
        {title}
      </h2>
      {children && <p className="mt-4 text-lg text-ink-2">{children}</p>}
    </div>
  );
}
