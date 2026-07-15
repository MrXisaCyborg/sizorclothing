import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { ProductGrid } from "@/components/product-grid";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";

export const Route = createFileRoute("/shop/archive")({
  component: ArchivePage,
});

const products = [
  { id: "a1", name: "Field Shell 01 (Sold Out)", tag: "Outerwear", price: "₹40,000", img: product1 },
  { id: "a2", name: "Cargo Pant C-1 (Sold Out)", tag: "Bottoms", price: "₹24,000", img: product2 },
];

function ArchivePage() {
  return (
    <>
      <PageHeader title="Archive" subtitle="Shop / Past Drops" />
      <ProductGrid products={products} isArchive={true} />
    </>
  );
}
