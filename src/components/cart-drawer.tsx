import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/context/cart-context";

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeItem } = useCart();

  const total = items.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
    return acc + price * item.quantity;
  }, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-[150] bg-ink/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            className="fixed inset-y-0 right-0 z-[160] flex w-full max-w-md flex-col border-l border-line bg-panel shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line p-6">
              <h2 className="display text-2xl text-bone">Cart ({items.length})</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-bone/50 hover:text-acid transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 grain relative">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="label-xs text-acid mb-4">/ Empty</div>
                  <h3 className="display text-3xl text-bone mb-2">No items</h3>
                  <p className="text-bone/50">Your cart is empty.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-8 border border-line bg-ink px-8 py-4 label-xs text-bone hover:border-acid hover:text-acid transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4 border border-line bg-ink p-4">
                      <div className="h-24 w-20 shrink-0 bg-panel-2">
                        <img src={item.img} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex justify-between">
                            <h4 className="font-display uppercase font-semibold text-bone">{item.name}</h4>
                            <button 
                              onClick={() => removeItem(item.id, item.size)}
                              className="text-bone/40 hover:text-acid transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-sm text-bone/50">Size: {item.size}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="label-xs text-bone/70">Qty: {item.quantity}</p>
                          <p className="label-xs text-acid">{item.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-line bg-ink p-6">
                <div className="flex justify-between mb-6">
                  <span className="label-xs text-bone/50">Subtotal</span>
                  <span className="label-xs text-bone">₹{total.toLocaleString('en-IN')}</span>
                </div>
                <Link 
                  to="/checkout" 
                  onClick={() => setIsCartOpen(false)}
                  className="block text-center w-full bg-acid py-4 label-xs text-ink hover:bg-bone transition-colors"
                >
                  Checkout →
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
