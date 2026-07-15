import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { useOrders, Order, PaymentMethod } from "@/context/order-context";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () => ({
    meta: [
      { title: "Checkout | SIZOR Techwear India" },
      { name: "robots", content: "noindex, nofollow" }
    ]
  }),
});

function CheckoutPage() {
  const { items, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("QR");
  const [transactionId, setTransactionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = items.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
    return acc + price * item.quantity;
  }, 0);

  // Generate a mock UPI QR code for the amount
  const upiId = "sizor@ybl";
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=${upiId}&pn=SIZOR&am=${total.toFixed(2)}&cu=INR`;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.address) {
      setStep(2);
    }
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === "QR" && transactionId.trim().length < 8) {
      alert("Please enter a valid Transaction / UTI number.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      const orderId = `SZR-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      const newOrder: Order = {
        id: orderId,
        items: [...items],
        totalAmount: total,
        paymentMethod,
        transactionId: paymentMethod === "QR" ? transactionId : undefined,
        status: "PLACED",
        date: new Date().toISOString(),
        shippingDetails: formData,
      };

      addOrder(newOrder);
      clearCart();
      navigate({ to: "/account" });
    }, 1000);
  };

  if (items.length === 0 && !isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 px-6">
        <div className="text-center">
          <p className="label-xs text-acid mb-4">Error</p>
          <h1 className="display text-4xl text-bone mb-6">Cart is empty</h1>
          <button onClick={() => navigate({ to: "/" })} className="label-xs border border-line bg-ink px-6 py-3 text-bone hover:border-acid transition-colors">
            Return to Base
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Left Col: Form */}
        <div>
          <div className="flex gap-4 mb-12">
            <div className={`label-xs ${step === 1 ? 'text-acid' : 'text-bone/50'}`}>01 Shipping</div>
            <div className="text-line">—</div>
            <div className={`label-xs ${step === 2 ? 'text-acid' : 'text-bone/50'}`}>02 Payment</div>
          </div>

          {step === 1 ? (
            <form onSubmit={handleNext} className="space-y-6">
              <h2 className="display text-4xl text-bone mb-8">Destination</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="label-xs text-bone/50 block mb-2">Full Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-panel border border-line p-4 text-bone focus:outline-none focus:border-acid transition-colors"
                  />
                </div>
                <div>
                  <label className="label-xs text-bone/50 block mb-2">Email Address</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-panel border border-line p-4 text-bone focus:outline-none focus:border-acid transition-colors"
                  />
                </div>
                <div>
                  <label className="label-xs text-bone/50 block mb-2">Shipping Address</label>
                  <textarea 
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-panel border border-line p-4 text-bone h-32 focus:outline-none focus:border-acid transition-colors"
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-bone text-ink py-4 label-xs mt-8 hover:bg-acid transition-colors">
                Proceed to Payment →
              </button>
            </form>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-physics">
              <div className="flex justify-between items-end">
                <h2 className="display text-4xl text-bone">Payment</h2>
                <button onClick={() => setStep(1)} className="label-xs text-bone/50 hover:text-acid underline">Edit Shipping</button>
              </div>

              <div className="space-y-4">
                <label className={`block border p-4 cursor-pointer transition-colors ${paymentMethod === "QR" ? 'border-acid bg-acid/10' : 'border-line bg-panel hover:border-bone/50'}`}>
                  <div className="flex items-center gap-4">
                    <input type="radio" name="payment" value="QR" checked={paymentMethod === "QR"} onChange={() => setPaymentMethod("QR")} className="accent-acid" />
                    <span className="label-xs text-bone">UPI / QR Code</span>
                  </div>
                </label>
                <label className={`block border p-4 cursor-pointer transition-colors ${paymentMethod === "COD" ? 'border-acid bg-acid/10' : 'border-line bg-panel hover:border-bone/50'}`}>
                  <div className="flex items-center gap-4">
                    <input type="radio" name="payment" value="COD" checked={paymentMethod === "COD"} onChange={() => setPaymentMethod("COD")} className="accent-acid" />
                    <span className="label-xs text-bone">Cash on Delivery</span>
                  </div>
                </label>
              </div>

              {paymentMethod === "QR" && (
                <div className="border border-line bg-panel p-6 space-y-6">
                  <div className="flex flex-col items-center justify-center p-4 bg-white rounded-sm w-fit mx-auto">
                    <img src={qrUrl} alt="UPI QR Code" className="w-48 h-48" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-bone/70">Scan to pay <span className="text-acid font-bold">₹{total.toLocaleString('en-IN')}</span> to SIZOR.</p>
                  </div>
                  <div>
                    <label className="label-xs text-bone/50 block mb-2">Transaction / UTI Number</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 312345678901"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className="w-full bg-ink border border-line p-4 text-bone focus:outline-none focus:border-acid transition-colors"
                    />
                  </div>
                </div>
              )}

              <button 
                onClick={handlePlaceOrder} 
                disabled={isSubmitting}
                className={`w-full py-4 label-xs transition-colors ${isSubmitting ? 'bg-panel text-bone/30 cursor-not-allowed' : 'bg-acid text-ink hover:bg-bone'}`}
              >
                {isSubmitting ? "Processing..." : "Place Order"}
              </button>
            </div>
          )}
        </div>

        {/* Right Col: Order Summary */}
        <div className="border border-line bg-panel p-8 h-fit sticky top-32">
          <h3 className="label-xs text-bone mb-6">Order Summary</h3>
          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4">
                <div className="w-16 h-20 bg-panel-2 shrink-0">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="font-display text-sm text-bone">{item.name}</h4>
                  <p className="text-xs text-bone/50 mt-1">Size: {item.size} / Qty: {item.quantity}</p>
                </div>
                <div className="text-sm text-bone flex items-center">
                  {item.price}
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-line pt-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-bone/50">Subtotal</span>
              <span className="text-bone">₹{total.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-bone/50">Shipping</span>
              <span className="text-bone">Free</span>
            </div>
            <div className="flex justify-between pt-4 border-t border-line">
              <span className="label-xs text-bone">Total</span>
              <span className="label-xs text-acid">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
