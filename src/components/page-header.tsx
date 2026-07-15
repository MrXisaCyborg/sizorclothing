import { Reveal } from "./reveal";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="grain scanlines relative isolate overflow-hidden pt-40 pb-20 md:pt-48 md:pb-24">
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30 z-0" />
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal>
          {subtitle && (
            <p className="label-xs text-acid mb-4">/ {subtitle}</p>
          )}
          <h1 className="display text-[clamp(2.5rem,8vw,6rem)] text-bone tracking-tight">
            {title}
          </h1>
        </Reveal>
      </div>
    </section>
  );
}
