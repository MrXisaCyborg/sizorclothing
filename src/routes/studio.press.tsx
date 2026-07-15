import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/studio/press")({
  component: PressPage,
});

const pressMentions = [
  { source: "HYPEBEAST", quote: "Redefining the baseline for functional techwear in the Global South." },
  { source: "HIGH SNOBIETY", quote: "SIZOR's Drop 001 proves that absolute utility doesn't have to sacrifice striking silhouettes." },
  { source: "ACRONYM_FANS", quote: "The build quality rivals the industry titans, but with a unique urban perspective from Mumbai." },
];

function PressPage() {
  return (
    <>
      <PageHeader title="Press" subtitle="Studio / Recognition" />
      <section className="mx-auto max-w-5xl px-6 py-20 md:px-10">
        <div className="grid gap-12 md:grid-cols-2">
          {pressMentions.map((mention, i) => (
            <Reveal key={mention.source} delay={i * 100}>
              <div className="border border-line bg-panel p-8">
                <p className="text-lg text-bone/90 font-medium leading-relaxed">
                  "{mention.quote}"
                </p>
                <div className="mt-6 label-xs text-acid">
                  — {mention.source}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
