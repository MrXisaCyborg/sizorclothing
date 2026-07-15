import { createContext, useContext, useEffect, useState } from "react";
import { CartItem } from "./cart-context";

export type PaymentMethod = "COD" | "QR";

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  status: "PLACED" | "SHIPPED" | "DELIVERED";
  date: string;
  shippingDetails: {
    name: string;
    email: string;
    address: string;
  };
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem("sizor-orders");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error("Failed to parse orders");
      }
    }
  }, []);

  const addOrder = (order: Order) => {
    setOrders((prev) => {
      const updated = [order, ...prev];
      localStorage.setItem("sizor-orders", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
}
