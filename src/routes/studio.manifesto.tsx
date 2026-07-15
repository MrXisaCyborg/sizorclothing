import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/studio/manifesto")({
  component: ManifestoPage,
  head: () => ({
    meta: [
      { title: "Manifesto | SIZOR Techwear India" },
      { name: "description", content: "The philosophy behind SIZOR. Premium techwear and streetwear designed in Mumbai for global utility." },
      { property: "og:title", content: "Manifesto | SIZOR Techwear India" },
      { property: "og:url", content: "https://sizor.com/studio/manifesto" }
    ],
    links: [
      { rel: "canonical", href: "https://sizor.com/studio/manifesto" }
    ]
  }),
});

function ManifestoPage() {
  return (
    <>
      <PageHeader title="Manifesto" subtitle="Studio / Vision" />
      <section className="mx-auto max-w-4xl px-6 py-20 md:px-10">
        <Reveal delay={200}>
          <div className="space-y-12">
            <h2 className="display text-3xl text-bone md:text-5xl leading-tight">
              PRECISION ENGINEERING MEETS URBAN UTILITY. WE REJECT THE SUPERFLUOUS.
            </h2>
            <p className="text-lg text-bone/70 md:text-xl leading-relaxed">
              SIZOR was born from a necessity for gear that adapts seamlessly to rapidly changing environments. We believe clothing should be a modular system, an extension of the wearer that provides utility without compromising on form.
            </p>
            <p className="text-lg text-bone/70 md:text-xl leading-relaxed">
              Our design philosophy strips away the unnecessary, leaving only what performs. Every seam, every textile choice, and every pocket placement is meticulously calculated. We release our gear in strictly limited runs because quality and precision cannot be mass-produced. 
            </p>
            <p className="text-lg text-bone/70 md:text-xl leading-relaxed">
              Designed for the field. Built for the city. Shipped worldwide from Mumbai.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
