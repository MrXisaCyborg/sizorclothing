import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/studio/journal")({
  component: JournalPage,
  head: () => ({
    meta: [
      { title: "Journal | Techwear Culture India — SIZOR" },
      { name: "description", content: "Notes, process, and culture from the SIZOR studio in Mumbai. Exploring the intersection of techwear and streetwear." },
      { property: "og:title", content: "Journal | Techwear Culture India — SIZOR" },
      { property: "og:url", content: "https://sizor.com/studio/journal" }
    ],
    links: [
      { rel: "canonical", href: "https://sizor.com/studio/journal" }
    ]
  }),
});

const articles = [
  { id: 1, date: "JULY 15, 2026", title: "THE ARCHITECTURE OF MOVEMENT", excerpt: "Exploring the biomechanics behind our articulated joints and why traditional flat patterning fails in dynamic urban environments." },
  { id: 2, date: "JUNE 28, 2026", title: "TEXTILE FOCUS: X-PAC & DYNEEMA", excerpt: "A deep dive into the composite materials that make our Outerwear series simultaneously lightweight and virtually indestructible." },
  { id: 3, date: "MAY 10, 2026", title: "DROP 001 FIELD TESTING", excerpt: "Documenting our rigorous field testing process across three different climate zones before finalizing the production run." },
];

function JournalPage() {
  return (
    <>
      <PageHeader title="Journal" subtitle="Studio / Dispatches" />
      <section className="mx-auto max-w-5xl px-6 py-20 md:px-10">
        <div className="space-y-16">
          {articles.map((article, i) => (
            <Reveal key={article.id} delay={i * 100}>
              <article className="group border-b border-line pb-12 transition-colors hover:border-acid">
                <p className="label-xs text-acid mb-4">{article.date}</p>
                <h2 className="display text-3xl text-bone md:text-4xl transition-colors group-hover:text-acid">
                  <Link to="/studio/journal">{article.title}</Link>
                </h2>
                <p className="mt-4 text-base text-bone/70 max-w-3xl">
                  {article.excerpt}
                </p>
                <div className="mt-6">
                  <Link to="/studio/journal" className="label-xs text-bone transition-colors hover:text-acid">
                    Read Entry →
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
