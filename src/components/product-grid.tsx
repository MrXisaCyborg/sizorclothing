import { useState } from "react";
import { Reveal } from "./reveal";
import { QuickViewModal } from "./quick-view-modal";
import look2 from "@/assets/lookbook-2.jpg";

export interface Product {
  id: string;
  name: string;
  tag: string;
  price: string;
  img: string;
  img2?: string;
  href?: string;
}

export function ProductGrid({ products, isArchive = false }: { products: Product[], isArchive?: boolean }) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <>
      <div className={`grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-4 ${isArchive ? "grayscale opacity-80" : ""}`}>
        {products.map((p, i) => (
          <Reveal key={p.id} delay={i * 100}>
            <div 
              className="group block relative bg-panel transition-all duration-500 ease-physics hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]" 
              data-cursor="view"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-panel-2">
                {/* Skeleton Shimmer */}
                <div className="absolute inset-0 bg-line/10 animate-pulse" />
                
                {/* Primary Image */}
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-physics group-hover:opacity-0 z-10"
                />
                
                {/* Secondary Hover Image */}
                <img
                  src={p.img2 || look2}
                  alt={`${p.name} alternate view`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-physics scale-105 group-hover:scale-100 z-0"
                />
                
                {/* Duotone Overlay */}
                <div className="absolute inset-0 z-20 mix-blend-color opacity-0 transition-opacity duration-500 bg-acid/20 group-hover:opacity-100 pointer-events-none" />
                <div className="absolute inset-0 z-20 opacity-0 transition-opacity duration-500 bg-ink/30 group-hover:opacity-100 pointer-events-none" />
                
                {/* Quick View Button */}
                <div className="absolute bottom-4 left-4 right-4 z-30 translate-y-8 opacity-0 transition-all duration-500 ease-physics group-hover:translate-y-0 group-hover:opacity-100">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setQuickViewProduct(p);
                    }}
                    className="w-full bg-ink/90 backdrop-blur-md border border-line py-3 label-xs text-bone hover:border-acid hover:text-acid transition-colors"
                  >
                    Quick View
                  </button>
                </div>
              </div>
              
              <div className="p-5 relative z-10 bg-panel border-x border-b border-line group-hover:border-line/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="label-xs text-bone">{p.name}</h3>
                    <p className="mt-1 text-sm text-bone/50">{p.tag}</p>
                  </div>
                  <div className="label-xs text-acid">{p.price}</div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <QuickViewModal 
        product={quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
      />
    </>
  );
}
