import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "acid" | "outline";
}

export function MagneticButton({
  children,
  variant = "acid",
  className = "",
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate3d(${x * 0.25}px, ${y * 0.35}px, 0)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0,0,0)";
  };

  const base =
    "label-xs relative inline-flex items-center gap-3 px-7 py-4 transition-[transform,background-color,color] duration-300 will-change-transform";
  const styles =
    variant === "acid"
      ? "bg-acid text-acid-foreground hover:bg-bone"
      : "border border-bone text-bone hover:bg-bone hover:text-ink";

  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${base} ${styles} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
