import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { ProductGrid } from "@/components/product-grid";
import product2 from "@/assets/product-2.jpg";
import product4 from "@/assets/product-4.jpg";

export const Route = createFileRoute("/shop/bottoms")({
  component: BottomsPage,
});

const products = [
  { id: "b1", name: "Cargo Pant C-9", tag: "Bottoms", price: "₹26,000", img: product2 },
  { id: "b2", name: "Utility Shorts", tag: "Bottoms", price: "₹18,000", img: product4 },
];

function BottomsPage() {
  return (
    <>
      <PageHeader title="Bottoms" subtitle="Shop / Lower Body" />
      <ProductGrid products={products} />
    </>
  );
}
