import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { ProductGrid } from "@/components/product-grid";
import { ProductSchema } from "@/components/seo-schemas";
import product4 from "@/assets/product-4.jpg";

export const Route = createFileRoute("/shop/modular")({
  component: ModularPage,
  head: () => ({
    meta: [
      { title: "Modular | Techwear Accessories India — SIZOR" },
      { name: "description", content: "Shop premium techwear accessories and modular attachments. Engineered in Mumbai, India for utility and tactical storage." },
      { property: "og:title", content: "Modular | Techwear Accessories India — SIZOR" },
      { property: "og:url", content: "https://sizor.com/shop/modular" }
    ],
    links: [
      { rel: "canonical", href: "https://sizor.com/shop/modular" }
    ]
  }),
});

const products = [
  { id: "m1", name: "Utility Vest V-2", tag: "Modular", price: "₹31,000", img: product4 },
  { id: "m2", name: "Attachable Pouch", tag: "Modular", price: "₹9,500", img: product4 },
];

function ModularPage() {
  return (
    <>
      <PageHeader title="Modular" subtitle="Shop / Tactical Expansion" />
      <ProductGrid products={products} />
      {products.map(p => (
        <ProductSchema 
          key={p.id}
          name={p.name}
          price={parseInt(p.price.replace(/[^\d]/g, ''))}
          description={`SIZOR ${p.tag} - ${p.name}. Premium techwear shipped across India.`}
        />
      ))}
    </>
  );
}
