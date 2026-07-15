import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/support/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact Us | SIZOR Mumbai Studio" },
      { name: "description", content: "Get in touch with the SIZOR team. Based in Mumbai, India. Customer support for techwear and streetwear." },
      { property: "og:title", content: "Contact Us | SIZOR Mumbai Studio" },
      { property: "og:url", content: "https://sizor.com/support/contact" }
    ],
    links: [
      { rel: "canonical", href: "https://sizor.com/support/contact" }
    ]
  }),
});

function ContactPage() {
  return (
    <>
      <PageHeader title="Contact" subtitle="Support / Transmission" />
      <section className="mx-auto max-w-2xl px-6 py-20 md:px-10">
        <Reveal>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="label-xs text-bone/50" htmlFor="name">Name</label>
                <input 
                  id="name"
                  type="text" 
                  className="w-full border border-line bg-panel p-4 text-bone placeholder-bone/30 outline-none focus:border-acid focus:bg-ink transition-colors"
                  placeholder="Designation" 
                />
              </div>
              <div className="space-y-2">
                <label className="label-xs text-bone/50" htmlFor="email">Email</label>
                <input 
                  id="email"
                  type="email" 
                  className="w-full border border-line bg-panel p-4 text-bone placeholder-bone/30 outline-none focus:border-acid focus:bg-ink transition-colors"
                  placeholder="name@system.com" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="label-xs text-bone/50" htmlFor="message">Message</label>
              <textarea 
                id="message"
                rows={6}
                className="w-full border border-line bg-panel p-4 text-bone placeholder-bone/30 outline-none focus:border-acid focus:bg-ink transition-colors"
                placeholder="Enter transmission..." 
              />
            </div>
            <button className="label-xs w-full bg-acid p-4 text-ink hover:bg-bone transition-colors mt-4">
              Send Transmission
            </button>
          </form>
        </Reveal>
      </section>
    </>
  );
}
