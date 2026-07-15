import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import look1 from "@/assets/lookbook-1.jpg";
import look2 from "@/assets/lookbook-2.jpg";
import look3 from "@/assets/lookbook-3.jpg";

export const Route = createFileRoute("/studio/lookbook")({
  component: LookbookPage,
});

function LookbookPage() {
  return (
    <>
      <PageHeader title="Lookbook" subtitle="Studio / Drop 001" />
      <section className="mx-auto max-w-[1600px] px-6 py-20 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-24">
          <Reveal delay={100} className="md:mt-24">
            <img src={look1} alt="Look 1" className="w-full object-cover aspect-[3/4] filter grayscale hover:grayscale-0 transition-all duration-700" />
            <p className="mt-4 label-xs text-bone/50">Look 01 — Field Shell / Cargo C-9</p>
          </Reveal>
          <Reveal delay={300}>
            <img src={look2} alt="Look 2" className="w-full object-cover aspect-[3/4] filter grayscale hover:grayscale-0 transition-all duration-700" />
            <p className="mt-4 label-xs text-bone/50">Look 02 — Base Hoodie / Utility Vest</p>
          </Reveal>
          <Reveal delay={200} className="md:col-span-2 lg:col-span-1 lg:col-start-2">
            <img src={look3} alt="Look 3" className="w-full object-cover aspect-square md:aspect-[16/9] filter grayscale hover:grayscale-0 transition-all duration-700" />
            <p className="mt-4 label-xs text-bone/50">Look 03 — Modular Attachments</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
