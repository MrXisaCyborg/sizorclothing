import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { ProductGrid } from "@/components/product-grid";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";

export const Route = createFileRoute("/shop/outerwear")({
  component: OuterwearPage,
});

const products = [
  { id: "o1", name: "Field Shell 03", tag: "Outerwear", price: "₹42,000", img: product1 },
  { id: "o2", name: "Rain Anorak", tag: "Outerwear", price: "₹38,000", img: product2 },
  { id: "o3", name: "Storm Parka", tag: "Outerwear", price: "₹55,000", img: product1 },
];

function OuterwearPage() {
  return (
    <>
      <PageHeader title="Outerwear" subtitle="Shop / All Weather" />
      <ProductGrid products={products} />
    </>
  );
}
