import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { ProductGrid } from "@/components/product-grid";
import { ProductSchema } from "@/components/seo-schemas";
import product3 from "@/assets/product-3.jpg";

export const Route = createFileRoute("/shop/layers")({
  component: LayersPage,
  head: () => ({
    meta: [
      { title: "Layers | Techwear Hoodies & Midlayers India — SIZOR" },
      { name: "description", content: "Shop premium techwear hoodies and thermal midlayers. Engineered in Mumbai, India for tactical layering." },
      { property: "og:title", content: "Layers | Techwear Hoodies & Midlayers India — SIZOR" },
      { property: "og:url", content: "https://sizor.com/shop/layers" }
    ],
    links: [
      { rel: "canonical", href: "https://sizor.com/shop/layers" }
    ]
  }),
});

const products = [
  { id: "l1", name: "Base Hoodie / Bone", tag: "Layer", price: "₹18,000", img: product3 },
  { id: "l2", name: "Thermal Zip", tag: "Layer", price: "₹15,000", img: product3 },
];

function LayersPage() {
  return (
    <>
      <PageHeader title="Layers" subtitle="Shop / Thermal Regulation" />
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
