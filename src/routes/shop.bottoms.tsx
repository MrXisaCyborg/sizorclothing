import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { ProductGrid } from "@/components/product-grid";
import { ProductSchema } from "@/components/seo-schemas";
import product2 from "@/assets/product-2.jpg";
import product4 from "@/assets/product-4.jpg";

export const Route = createFileRoute("/shop/bottoms")({
  component: BottomsPage,
  head: () => ({
    meta: [
      { title: "Bottoms | Techwear Cargo Pants India — SIZOR" },
      { name: "description", content: "Shop premium techwear cargo pants and utility trousers. Engineered in Mumbai, India for maximum mobility and storage." },
      { property: "og:title", content: "Bottoms | Techwear Cargo Pants India — SIZOR" },
      { property: "og:url", content: "https://sizor.com/shop/bottoms" }
    ],
    links: [
      { rel: "canonical", href: "https://sizor.com/shop/bottoms" }
    ]
  }),
});

const products = [
  { id: "b1", name: "Cargo Pant C-9", tag: "Bottoms", price: "₹26,000", img: product2 },
  { id: "b2", name: "Utility Shorts", tag: "Bottoms", price: "₹18,000", img: product4 },
];

function BottomsPage() {
  return (
    <>
      <PageHeader title="Bottoms" subtitle="Shop / Articulated Movement" />
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
