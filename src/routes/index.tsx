import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SiteNav } from "@/components/site-nav";
import { Reveal } from "@/components/reveal";
import { ProductGrid } from "@/components/product-grid";
import { MagneticButton } from "@/components/magnetic-button";
import heroImg from "@/assets/hero.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import look1 from "@/assets/lookbook-1.jpg";
import look2 from "@/assets/lookbook-2.jpg";
import look3 from "@/assets/lookbook-3.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
});

const products = [
  { id: "01", name: "Field Shell 03", tag: "Outerwear", price: "₹42,000", img: product1, href: "/shop/outerwear" },
  { id: "02", name: "Cargo Pant C-9", tag: "Bottoms", price: "₹26,000", img: product2, href: "/shop/bottoms" },
  { id: "03", name: "Base Hoodie / Bone", tag: "Layer", price: "₹18,000", img: product3, href: "/shop/layers" },
  { id: "04", name: "Utility Vest V-2", tag: "Modular", price: "₹31,000", img: product4, href: "/shop/modular" },
];

function Marquee() {
  const items = ["NEW DROP", "LIMITED RUN", "SIZOR", "SS26 / 001", "SHIPPING WORLDWIDE"];
  const line = (
    <div className="flex shrink-0 items-center gap-16 pr-16">
      {items.map((t, i) => (
        <span key={i} className="display flex items-center gap-16 text-3xl md:text-5xl">
          {t}
          <span className="inline-block h-2 w-2 rotate-45 bg-acid" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="border-y border-line bg-ink py-6 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {line}
        {line}
      </div>
    </div>
  );
}

function Landing() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], ["0%", "20%"]);
  const look1Y = useTransform(scrollY, [1000, 3000], ["-5%", "15%"]);
  const look2Y = useTransform(scrollY, [1500, 3500], ["10%", "-10%"]);
  const look3Y = useTransform(scrollY, [2000, 4000], ["-10%", "10%"]);

  return (
    <div>
      {/* HERO */}
      <section className="grain scanlines relative isolate overflow-hidden">
        <div className="relative min-h-screen">
          <div className="absolute inset-0 bg-line/10 animate-pulse" />
          <motion.img
            src={heroImg}
            alt="SIZOR black techwear jacket worn in urban Mumbai setting"
            style={{ y: heroY }}
            className="absolute inset-0 h-[120%] -top-[10%] w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40 pointer-events-none" />

          {/* Corner ticks */}
          <div className="absolute left-6 top-24 md:left-10 md:top-28 label-xs text-bone/60">
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-acid" />
              N 19.076 / E 72.877
            </div>
          </div>
          <div className="absolute right-6 top-24 md:right-10 md:top-28 label-xs text-bone/60">
            Drop 001 / SS26
          </div>

          <div className="relative z-10 mx-auto flex min-h-screen max-w-[1600px] flex-col justify-end px-6 pb-16 pt-40 md:px-10 md:pb-24">
            <div className="max-w-5xl">
              <p className="label-xs animate-rise text-acid" style={{ animationDelay: "100ms" }}>
                / New Drop — Field Series
              </p>
              <h1 className="display animate-hero-glitch-in scanline-text relative mt-6 text-[clamp(3.5rem,12vw,11rem)] text-bone">
                Built for the
                <br />
                <span className="relative inline-block">
                  <span className="text-acid animate-micro-glitch relative inline-block">field</span>
                  <span className="absolute -right-3 top-[5%] h-[90%] w-2 bg-acid animate-cursor-blink" />
                </span>
                . Worn in the city.
              </h1>
              <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                <p className="animate-rise max-w-lg text-base text-bone/70 md:text-lg" style={{ animationDelay: "500ms" }}>
                  Precision-engineered utility apparel. Premium techwear and streetwear from Mumbai, India. Modular systems, weather-tested shells,
                  cut for movement — released in limited runs.
                </p>
                <div className="animate-rise flex flex-wrap items-center gap-4" style={{ animationDelay: "700ms" }}>
                  <MagneticButton variant="acid">Shop the Drop →</MagneticButton>
                  <MagneticButton variant="outline">View Lookbook</MagneticButton>
                </div>
              </div>
            </div>

            {/* Footer strip */}
            <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <div className="label-xs text-bone/50">Est. 2026 — Mumbai</div>
              <div className="label-xs text-bone/50">Scroll ↓ / 001 of 04</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee />

      {/* MANIFESTO */}
      <section id="manifesto" className="grain relative bg-ink py-28 md:py-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-3">
              <Reveal>
                <p className="label-xs text-acid">/ 002 — Manifesto</p>
              </Reveal>
            </div>
            <div className="md:col-span-9">
              <Reveal delay={80}>
                <h2 className="display text-[clamp(2.25rem,6vw,5.5rem)] text-bone">
                  We don't chase seasons.
                  <br />
                  We <span className="text-acid">engineer</span> them.
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-10 max-w-3xl text-lg leading-relaxed text-bone/70">
                  SIZOR is a technical studio. Every piece is a system — tested against
                  weather, movement, and repetition. No trend cycles. No filler. Just
                  fewer, better objects, released when they're ready. Precision techwear, 
                  engineered to adapt seamlessly to unpredictable urban environments. 
                  We produce exclusively in limited runs to maintain uncompromising standards, 
                  and dispatch every order worldwide directly from our headquarters in Mumbai.
                </p>
              </Reveal>

              <div className="mt-16 grid gap-8 border-t border-line pt-10 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { k: "01", t: "Precision Engineering", d: "Prototyped in weather. Refined in the street." },
                  { k: "02", t: "Techwear Materials", d: "Built with X-Pac, Dyneema, and waterproof synthetics." },
                  { k: "03", t: "Limited Runs", d: "Numbered, dated, gone. Under 400 units per drop." },
                  { k: "04", t: "Global Dispatch", d: "Shipped worldwide securely from our Mumbai studio." },
                ].map((p, i) => (
                  <Reveal key={p.k} delay={i * 120}>
                    <div>
                      <div className="label-xs text-acid">— {p.k}</div>
                      <h3 className="display mt-3 text-2xl text-bone">{p.t}</h3>
                      <p className="mt-3 text-sm text-bone/60">{p.d}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP GRID */}
      <section id="shop" className="grain relative border-t border-line bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
            <div>
              <Reveal>
                <p className="label-xs text-acid">/ 003 — Featured Collection</p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="display mt-4 text-[clamp(2rem,5vw,4.5rem)] text-bone">
                  The Field Series
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <a
                href="#"
                className="label-xs flex items-center gap-2 text-bone/70 hover:text-acid"
              >
                View all 12 pieces →
              </a>
            </Reveal>
          </div>

          <div className="mt-12">
            <ProductGrid products={products} />
          </div>
        </div>
      </section>

      {/* TECHNOLOGY SECTION */}
      <section className="grain relative border-t border-line bg-panel py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="grid gap-12 md:grid-cols-2 lg:gap-24 items-center">
            <div>
              <Reveal>
                <p className="label-xs text-acid">/ 004 — Innovation</p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="display mt-4 text-[clamp(2rem,5vw,4.5rem)] text-bone">
                  Advanced<br />
                  Material Science.
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 text-lg text-bone/70 leading-relaxed max-w-xl">
                  We don't just use standard fabrics. Every textile is stress-tested in brutal environments. From multi-layered Gore-Tex Pro membranes to custom-woven Dyneema composites, our gear is engineered for extreme weather resistance while maintaining breathability.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-12 grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="label-xs text-bone">Hydro-Resistance</h4>
                    <p className="mt-2 text-sm text-bone/50">20,000mm hydrostatic head rating on all outerwear shells.</p>
                  </div>
                  <div>
                    <h4 className="label-xs text-bone">Thermal Retention</h4>
                    <p className="mt-2 text-sm text-bone/50">Aerogel insulation mapping for maximum warmth without bulk.</p>
                  </div>
                </div>
              </Reveal>
            </div>
            <Reveal delay={200} className="relative aspect-square md:aspect-[4/5] bg-ink overflow-hidden group">
              <img src={look3} alt="Macro fabric details of SIZOR techwear waterproof membrane" loading="lazy" className="absolute inset-0 w-full h-full object-cover filter grayscale opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="label-xs text-acid bg-ink/80 backdrop-blur-sm inline-block px-3 py-1.5 mb-2">
                  Micro-Structure Analysis
                </div>
                <p className="text-sm text-bone/70">Magnified view of our proprietary 3-layer weatherproof membrane.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* LOOKBOOK */}
      <section id="lookbook" className="grain relative border-t border-line bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <p className="label-xs text-acid">/ 005 — Editorial</p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="display mt-4 text-[clamp(2rem,5vw,4.5rem)] text-bone">
                  Lookbook<br />
                  <span className="text-bone/40">SS26</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 max-w-md text-sm text-bone/60">
                  Shot on-location in Mumbai, October 2025. Concrete, low light,
                  reflected neon — the environment the pieces were built for.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <a href="#" className="label-xs mt-8 inline-flex items-center gap-2 text-bone hover:text-acid">
                  Full editorial →
                </a>
              </Reveal>
            </div>

            <div className="md:col-span-8">
              <div className="grid grid-cols-6 gap-4">
                <Reveal className="col-span-6 md:col-span-4" delay={0}>
                  <div className="group relative aspect-[4/5] overflow-hidden" data-cursor="drag">
                    <div className="absolute inset-0 bg-line/10 animate-pulse" />
                    <motion.img style={{ y: look1Y }} src={look1} alt="SIZOR streetwear lookbook shot in Mumbai concrete setting" loading="lazy" className="absolute inset-0 h-[120%] -top-[10%] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                    <div className="absolute bottom-3 left-3 label-xs bg-ink/70 px-2 py-1 backdrop-blur-sm z-10">01 / Concrete</div>
                  </div>
                </Reveal>
                <Reveal className="col-span-3 md:col-span-2 md:mt-16" delay={140}>
                  <div className="group relative aspect-square overflow-hidden" data-cursor="drag">
                    <div className="absolute inset-0 bg-line/10 animate-pulse" />
                    <motion.img style={{ y: look2Y }} src={look2} alt="Techwear jacket detail shot in Mumbai low light" loading="lazy" className="absolute inset-0 h-[120%] -top-[10%] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                    <div className="absolute bottom-3 left-3 label-xs bg-ink/70 px-2 py-1 backdrop-blur-sm z-10">02 / Detail</div>
                  </div>
                </Reveal>
                <Reveal className="col-span-3 md:col-span-6" delay={220}>
                  <div className="group relative aspect-[21/9] overflow-hidden" data-cursor="drag">
                    <div className="absolute inset-0 bg-line/10 animate-pulse" />
                    <motion.img style={{ y: look3Y }} src={look3} alt="SIZOR utility clothing lookbook shot in neon lit tunnel" loading="lazy" className="absolute inset-0 h-[120%] -top-[10%] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                    <div className="absolute bottom-3 left-3 label-xs bg-ink/70 px-2 py-1 backdrop-blur-sm z-10">03 / Tunnel</div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JOURNAL PREVIEW */}
      <section className="grain relative border-t border-line bg-panel py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8 mb-12">
            <div>
              <Reveal>
                <p className="label-xs text-acid">/ 006 — Dispatches</p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="display mt-4 text-[clamp(2rem,5vw,4.5rem)] text-bone">
                  From the Journal
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <Link to="/studio/journal" className="label-xs flex items-center gap-2 text-bone/70 hover:text-acid">
                Read all transmissions →
              </Link>
            </Reveal>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <Reveal delay={100}>
              <div className="group border border-line p-8 transition-colors hover:border-acid">
                <p className="label-xs text-acid mb-4">JULY 15, 2026</p>
                <h3 className="display text-2xl text-bone mb-3 group-hover:text-acid transition-colors">THE ARCHITECTURE OF MOVEMENT</h3>
                <p className="text-bone/70 mb-6">Exploring the biomechanics behind our articulated joints and why traditional flat patterning fails in dynamic urban environments.</p>
                <Link to="/studio/journal" className="label-xs text-bone hover:text-acid transition-colors">Read more →</Link>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="group border border-line p-8 transition-colors hover:border-acid">
                <p className="label-xs text-acid mb-4">JUNE 28, 2026</p>
                <h3 className="display text-2xl text-bone mb-3 group-hover:text-acid transition-colors">TEXTILE FOCUS: X-PAC & DYNEEMA</h3>
                <p className="text-bone/70 mb-6">A deep dive into the composite materials that make our Outerwear series simultaneously lightweight and virtually indestructible.</p>
                <Link to="/studio/journal" className="label-xs text-bone hover:text-acid transition-colors">Read more →</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="grain relative border-t border-line bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <Reveal>
            <p className="label-xs text-acid text-center mb-12">/ 007 — In the Field</p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Reveal delay={100}><img src={look1} className="w-full aspect-square object-cover filter grayscale hover:grayscale-0 transition-all duration-500" alt="IG Post 1" /></Reveal>
            <Reveal delay={200}><img src={product3} className="w-full aspect-square object-cover filter grayscale hover:grayscale-0 transition-all duration-500" alt="IG Post 2" /></Reveal>
            <Reveal delay={300}><img src={look2} className="w-full aspect-square object-cover filter grayscale hover:grayscale-0 transition-all duration-500" alt="IG Post 3" /></Reveal>
            <Reveal delay={400}><img src={product4} className="w-full aspect-square object-cover filter grayscale hover:grayscale-0 transition-all duration-500" alt="IG Post 4" /></Reveal>
          </div>
          <Reveal delay={500}>
            <div className="text-center mt-8">
              <a href="#" className="label-xs text-bone hover:text-acid transition-colors">@sizor.studio</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="grain relative border-t border-line bg-panel py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="grid gap-12 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Reveal>
                <p className="label-xs text-acid">/ 008 — Access</p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="display mt-4 text-[clamp(2.25rem,6vw,5.5rem)] text-bone">
                  First look.
                  <br />
                  First to <span className="text-acid">drop.</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 max-w-md text-sm text-bone/60">
                  Subscribers get 24-hour early access to every release. No spam.
                  One email per drop.
                </p>
              </Reveal>
            </div>
            <Reveal className="md:col-span-5" delay={220}>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-3"
              >
                <label className="label-xs text-bone/60">Email address</label>
                <div className="flex items-stretch border border-line bg-ink focus-within:border-acid">
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    className="w-full bg-transparent px-4 py-4 text-bone placeholder:text-bone/30 focus:outline-none"
                  />
                  <button className="label-xs shrink-0 bg-acid px-6 text-acid-foreground transition-colors hover:bg-bone">
                    Enlist →
                  </button>
                </div>
                <p className="label-xs text-bone/40">
                  By subscribing you accept our terms. Unsubscribe anytime.
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

    </div>
  );
}
