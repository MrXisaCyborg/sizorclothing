import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer id="footer" className="border-t border-line bg-ink pb-10 pt-20">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" className="inline-block hover:opacity-70 transition-opacity">
              <Logo className="h-20 md:h-28 w-auto" />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-bone/50">
              Premium techwear and streetwear outerwear. 
              <br/>
              Based in Mumbai, India. Shipping utility clothing nationwide across India (including Chennai) and worldwide.
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

        <div className="mt-16 border-t border-line pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="label-xs text-bone/30">
            © {new Date().getFullYear()} SIZOR. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[10px] text-bone/10 max-w-md text-left md:text-right">
            SIZOR (not Scissor) - Precision Techwear India. 
            Engineered for the urban environment.
          </p>
        </div>
      </div>
    </footer>
  );
}
