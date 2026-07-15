import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useOrders, Order } from "@/context/order-context";

export const Route = createFileRoute("/account")({
  component: AccountPage,
  head: () => ({
    meta: [
      { title: "Account | SIZOR Techwear India" },
      { name: "description", content: "Manage your SIZOR account and track your limited run techwear orders in India." },
      { name: "robots", content: "noindex, nofollow" }
    ]
  }),
});

function AccountPage() {
  const { orders } = useOrders();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-10 max-w-[1200px] mx-auto">
      <div className="mb-16">
        <p className="label-xs text-acid mb-4">/ System Access</p>
        <h1 className="display text-5xl text-bone mb-2">Profile</h1>
        <p className="text-bone/50 text-sm">Welcome back to the grid.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {/* Sidebar */}
        <div className="space-y-8">
          <div className="border border-line bg-panel p-6">
            <h2 className="label-xs text-bone mb-4">Operative Details</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-bone/50">ID</span>
                <span className="text-bone">USR-0042</span>
              </div>
              <div className="flex justify-between">
                <span className="text-bone/50">Status</span>
                <span className="text-acid">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-bone/50">Clearance</span>
                <span className="text-bone">Level 1</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => navigate({ to: "/" })}
            className="w-full text-left label-xs text-bone/50 hover:text-acid transition-colors"
          >
            ← Return to Base
          </button>
        </div>

        {/* Main Content: Orders */}
        <div className="md:col-span-2 space-y-12">
          <div>
            <h2 className="label-xs text-bone mb-6 border-b border-line pb-4">Order History</h2>
            
            {orders.length === 0 ? (
              <div className="p-12 border border-line border-dashed bg-panel text-center">
                <p className="text-bone/50 mb-4">No previous transmissions found.</p>
                <button 
                  onClick={() => navigate({ to: "/shop/outerwear" })}
                  className="label-xs border border-acid text-acid px-6 py-3 hover:bg-acid hover:text-ink transition-colors"
                >
                  Browse Techwear
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {orders.map(order => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  // Tracking visual logic
  const steps = ["PLACED", "SHIPPED", "DELIVERED"];
  const currentStepIndex = steps.indexOf(order.status);

  return (
    <div className="border border-line bg-panel p-6">
      <div className="flex flex-wrap justify-between items-start gap-4 mb-6 pb-6 border-b border-line">
        <div>
          <p className="label-xs text-bone/50 mb-1">Order ID</p>
          <p className="label-xs text-acid">{order.id}</p>
        </div>
        <div>
          <p className="label-xs text-bone/50 mb-1">Date</p>
          <p className="label-xs text-bone">{new Date(order.date).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="label-xs text-bone/50 mb-1">Payment</p>
          <p className="label-xs text-bone">{order.paymentMethod} {order.transactionId ? `(${order.transactionId.substring(0, 4)}...)` : ""}</p>
        </div>
        <div>
          <p className="label-xs text-bone/50 mb-1">Total</p>
          <p className="label-xs text-bone">₹{order.totalAmount.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Tracking Timeline */}
      <div className="mb-8">
        <p className="label-xs text-bone mb-4">Status Matrix</p>
        <div className="flex items-center">
          {steps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            
            return (
              <div key={step} className="flex-1 relative">
                {/* Connecting line */}
                {index !== steps.length - 1 && (
                  <div className={`absolute top-2 left-0 w-full h-[1px] -z-10 ${index < currentStepIndex ? 'bg-acid' : 'bg-line'}`} />
                )}
                
                {/* Node */}
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-4 h-4 rounded-full border-2 ${isCompleted ? 'border-acid bg-acid' : 'border-line bg-panel'} ${isCurrent ? 'animate-pulse shadow-[0_0_10px_#C6FF3D]' : ''}`} />
                  <span className={`text-[10px] uppercase tracking-widest ${isCompleted ? 'text-acid' : 'text-bone/30'}`}>{step}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex gap-4 p-4 bg-panel-2">
            <div className="w-16 h-20 bg-ink shrink-0">
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
    </div>
  );
}
