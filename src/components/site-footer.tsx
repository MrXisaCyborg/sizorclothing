import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer id="footer" className="border-t border-line bg-ink pb-10 pt-20">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" className="inline-block hover:opacity-70 transition-opacity">
              <Logo className="h-14 md:h-20 w-auto" />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-bone/50">
              Precision techwear. Made in limited runs. Shipped worldwide from Mumbai.
            </p>
          </div>
          {[
            {
              title: "Shop",
              items: [
                { label: "Outerwear", to: "/shop/outerwear" },
                { label: "Bottoms", to: "/shop/bottoms" },
                { label: "Layers", to: "/shop/layers" },
                { label: "Modular", to: "/shop/modular" },
                { label: "Archive", to: "/shop/archive" },
              ],
            },
            {
              title: "Studio",
              items: [
                { label: "Manifesto", to: "/studio/manifesto" },
                { label: "Lookbook", to: "/studio/lookbook" },
                { label: "Journal", to: "/studio/journal" },
                { label: "Press", to: "/studio/press" },
              ],
            },
            {
              title: "Support",
              items: [
                { label: "Sizing", to: "/support/sizing" },
                { label: "Shipping", to: "/support/shipping" },
                { label: "Returns", to: "/support/returns" },
                { label: "Contact", to: "/support/contact" },
              ],
            },
          ].map((col) => (
            <div key={col.title} className="md:col-span-2">
              <div className="label-xs text-acid">— {col.title}</div>
              <ul className="mt-5 space-y-3">
                {col.items.map((it) => (
                  <li key={it.label}>
                    <Link
                      to={it.to}
                      className="text-sm text-bone/70 transition-colors hover:text-bone"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="md:col-span-1">
            <div className="label-xs text-acid">— Social</div>
            <ul className="mt-5 space-y-3">
              {["IG", "TW", "TT"].map((s) => (
                <li key={s}>
                  <a href="#" className="text-sm text-bone/70 hover:text-acid">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <div className="label-xs text-bone/40">© 2026 SIZOR Studio — Mumbai, IN</div>
          <div className="label-xs text-bone/40">Terms · Privacy · Imprint</div>
        </div>
      </div>
    </footer>
  );
}
