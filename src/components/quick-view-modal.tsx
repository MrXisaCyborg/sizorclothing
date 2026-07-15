import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useCart, CartItem } from "@/context/cart-context";
import { Product } from "./product-grid";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {product && <ModalInner key="quick-view" product={product} onClose={onClose} />}
    </AnimatePresence>,
    document.body
  );
}

function ModalInner({ product, onClose }: { product: Product, onClose: () => void }) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      size: selectedSize,
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
    >
      <div 
        className="absolute inset-0 bg-ink/90 backdrop-blur-md" 
        onClick={onClose}
      />
      
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.95 }}
        transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
        className="relative z-10 w-full max-w-4xl bg-panel border border-line flex flex-col md:flex-row overflow-hidden shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-ink/50 backdrop-blur-md p-2 rounded-full text-bone/50 hover:text-acid transition-colors"
        >
          <X size={20} />
        </button>

        <div className="md:w-1/2 aspect-square md:aspect-auto bg-panel-2 relative">
          <img 
            src={product.img} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center grain">
          <p className="label-xs text-acid mb-4">/ {product.tag}</p>
          <h2 className="display text-3xl md:text-5xl text-bone mb-4 leading-tight">{product.name}</h2>
          <p className="text-xl text-bone/70 mb-8">{product.price}</p>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="label-xs text-bone/50">Select Size</span>
                <button className="text-xs text-bone/40 underline hover:text-bone">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-sm font-medium transition-all ${
                      selectedSize === size 
                        ? "bg-acid text-ink border border-acid" 
                        : "bg-ink border border-line text-bone hover:border-bone/50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`w-full py-5 label-xs transition-colors ${
                selectedSize 
                  ? "bg-acid text-ink hover:bg-bone" 
                  : "bg-ink border border-line text-bone/30 cursor-not-allowed"
              }`}
            >
              {selectedSize ? "Add to Cart — " + product.price : "Select a Size"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
