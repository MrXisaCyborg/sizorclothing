import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/support/shipping")({
  component: ShippingPage,
  head: () => ({
    meta: [
      { title: "Shipping & Delivery | SIZOR India & Worldwide" },
      { name: "description", content: "Information on global shipping and delivery times. SIZOR techwear is shipped securely from Mumbai, India to worldwide destinations including Chennai." },
      { property: "og:title", content: "Shipping & Delivery | SIZOR India & Worldwide" },
      { property: "og:url", content: "https://sizor.com/support/shipping" }
    ],
    links: [
      { rel: "canonical", href: "https://sizor.com/support/shipping" }
    ]
  }),
});

function ShippingPage() {
  return (
    <>
      <PageHeader title="Shipping" subtitle="Support / Logistics" />
      <section className="mx-auto max-w-4xl px-6 py-20 md:px-10">
        <Reveal>
          <div className="space-y-8 text-bone/70">
            <div>
              <h3 className="display text-2xl text-bone mb-4">Worldwide Dispatch from Mumbai</h3>
              <p>
                All SIZOR products are designed, engineered, and shipped directly from our headquarters in Mumbai, India. We partner with premium logistics carriers to ensure your gear arrives securely and efficiently, no matter your location.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 mt-12">
              <div className="border border-line bg-panel p-6">
                <h4 className="text-acid label-xs mb-3">Domestic (India)</h4>
                <ul className="space-y-2">
                  <li>Standard: 3-5 Business Days (Free)</li>
                  <li>Express: 1-2 Business Days (₹500)</li>
                </ul>
              </div>
              <div className="border border-line bg-panel p-6">
                <h4 className="text-acid label-xs mb-3">International</h4>
                <ul className="space-y-2">
                  <li>Global Express: 5-8 Business Days (₹2,500 / $30)</li>
                  <li>Free global shipping on orders over ₹30,000</li>
                </ul>
              </div>
            </div>

            <p className="mt-8 text-sm">
              * Please note that international orders may be subject to local customs duties and taxes, which are the responsibility of the recipient.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
