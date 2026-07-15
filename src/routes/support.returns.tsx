import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/support/returns")({
  component: ReturnsPage,
  head: () => ({
    meta: [
      { title: "Returns & Exchanges | SIZOR Techwear India" },
      { name: "description", content: "SIZOR's 14-day return and exchange policy for unworn streetwear and utility apparel." },
      { property: "og:title", content: "Returns & Exchanges | SIZOR Techwear India" },
      { property: "og:url", content: "https://sizor.com/support/returns" }
    ],
    links: [
      { rel: "canonical", href: "https://sizor.com/support/returns" }
    ]
  }),
});

function ReturnsPage() {
  return (
    <>
      <PageHeader title="Returns" subtitle="Support / Policy" />
      <section className="mx-auto max-w-4xl px-6 py-20 md:px-10">
        <Reveal>
          <div className="space-y-8 text-bone/70">
            <p>
              We stand by the engineering of our garments. If your piece does not meet your expectations, we accept returns within 14 days of delivery.
            </p>
            
            <h4 className="display text-xl text-bone mt-8">Conditions</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Items must be unworn, unwashed, and in original condition.</li>
              <li>All original tags and technical packaging must be included.</li>
              <li>Archive items and limited edition collaborations are final sale.</li>
            </ul>

            <h4 className="display text-xl text-bone mt-8">Process</h4>
            <p>
              To initiate a return, contact our support team with your order number. Return shipping costs are the responsibility of the customer, except in cases of manufacturing defects. Once received and inspected at our Mumbai facility, refunds are processed within 5-7 business days.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
