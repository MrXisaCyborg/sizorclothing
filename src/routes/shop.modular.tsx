import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { ProductGrid } from "@/components/product-grid";
import product4 from "@/assets/product-4.jpg";

export const Route = createFileRoute("/shop/modular")({
  component: ModularPage,
});

const products = [
  { id: "m1", name: "Utility Vest V-2", tag: "Modular", price: "₹31,000", img: product4 },
  { id: "m2", name: "Attachable Pouch", tag: "Modular", price: "₹9,500", img: product4 },
];

function ModularPage() {
  return (
    <>
      <PageHeader title="Modular" subtitle="Shop / Accessories & Add-ons" />
      <ProductGrid products={products} />
    </>
  );
}
