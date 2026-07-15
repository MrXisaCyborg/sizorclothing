import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/support/sizing")({
  component: SizingPage,
  head: () => ({
    meta: [
      { title: "Sizing Guide | SIZOR Techwear India" },
      { name: "description", content: "Comprehensive sizing guide for SIZOR's utility clothing and outerwear. Measure for the perfect fit." },
      { property: "og:title", content: "Sizing Guide | SIZOR Techwear India" },
      { property: "og:url", content: "https://sizor.com/support/sizing" }
    ],
    links: [
      { rel: "canonical", href: "https://sizor.com/support/sizing" }
    ]
  }),
});

function SizingPage() {
  return (
    <>
      <PageHeader title="Sizing" subtitle="Support / Measurements" />
      <section className="mx-auto max-w-4xl px-6 py-20 md:px-10">
        <Reveal>
          <div className="prose prose-invert max-w-none text-bone/70">
            <h3 className="display text-2xl text-bone mb-6">How to Measure</h3>
            <p className="mb-8">
              Our garments are designed with an articulated, slightly oversized fit to accommodate modular layers. If you prefer a slimmer fit, we recommend sizing down. All measurements are in centimeters (cm).
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-line text-bone">
                    <th className="py-4 font-normal">Size</th>
                    <th className="py-4 font-normal">Chest</th>
                    <th className="py-4 font-normal">Length</th>
                    <th className="py-4 font-normal">Sleeve</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-line/50">
                    <td className="py-4">S</td>
                    <td className="py-4">58</td>
                    <td className="py-4">68</td>
                    <td className="py-4">84</td>
                  </tr>
                  <tr className="border-b border-line/50">
                    <td className="py-4">M</td>
                    <td className="py-4">60</td>
                    <td className="py-4">70</td>
                    <td className="py-4">86</td>
                  </tr>
                  <tr className="border-b border-line/50">
                    <td className="py-4">L</td>
                    <td className="py-4">62</td>
                    <td className="py-4">72</td>
                    <td className="py-4">88</td>
                  </tr>
                  <tr className="border-b border-line/50">
                    <td className="py-4">XL</td>
                    <td className="py-4">64</td>
                    <td className="py-4">74</td>
                    <td className="py-4">90</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
