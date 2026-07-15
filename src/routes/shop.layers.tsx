import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { ProductGrid } from "@/components/product-grid";
import product3 from "@/assets/product-3.jpg";

export const Route = createFileRoute("/shop/layers")({
  component: LayersPage,
});

const products = [
  { id: "l1", name: "Base Hoodie / Bone", tag: "Layer", price: "₹18,000", img: product3 },
  { id: "l2", name: "Thermal Zip", tag: "Layer", price: "₹15,000", img: product3 },
];

function LayersPage() {
  return (
    <>
      <PageHeader title="Layers" subtitle="Shop / Base & Mid" />
      <ProductGrid products={products} />
    </>
  );
}
