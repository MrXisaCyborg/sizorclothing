import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { ProductGrid } from "@/components/product-grid";
import { ProductSchema } from "@/components/seo-schemas";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";

export const Route = createFileRoute("/shop/archive")({
  component: ArchivePage,
  head: () => ({
    meta: [
      { title: "Archive | Limited Run Techwear India — SIZOR" },
      { name: "description", content: "Archived collections of premium techwear and utility clothing. Engineered in Mumbai, India. Sold out limited runs." },
      { property: "og:title", content: "Archive | Limited Run Techwear India — SIZOR" },
      { property: "og:url", content: "https://sizor.com/shop/archive" }
    ],
    links: [
      { rel: "canonical", href: "https://sizor.com/shop/archive" }
    ]
  }),
});

const products = [
  { id: "a1", name: "Field Shell 01 (Sold Out)", tag: "Outerwear", price: "₹40,000", img: product1 },
  { id: "a2", name: "Cargo Pant C-1 (Sold Out)", tag: "Bottoms", price: "₹24,000", img: product2 },
];

function ArchivePage() {
  return (
    <>
      <PageHeader title="Archive" subtitle="Shop / Past Collections" />
      <ProductGrid products={products} isArchive={true} />
      {products.map(p => (
        <ProductSchema 
          key={p.id}
          name={p.name}
          price={parseInt(p.price.replace(/[^\d]/g, ''))}
          description={`SIZOR ${p.tag} - ${p.name}. Premium techwear shipped across India.`}
          inStock={false}
        />
      ))}
    </>
  );
}
