import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Move } from "lucide-react";

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<"default" | "hover" | "view" | "drag">("default");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) setEnabled(true);
    
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const cursorTarget = t.closest("[data-cursor]");
      const linkTarget = t.closest("a, button, [data-cursor-hover]");
      
      if (cursorTarget) {
        setCursorState(cursorTarget.getAttribute("data-cursor") as any || "hover");
      } else if (linkTarget) {
        setCursorState("hover");
      } else {
        setCursorState("default");
      }
    };
    
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  if (!enabled) return null;

  const variants = {
    default: {
      width: 8,
      height: 8,
      x: pos.x - 4,
      y: pos.y - 4,
      backgroundColor: "#C6FF3D",
      border: "0px solid #C6FF3D",
      mixBlendMode: "difference" as const,
    },
    hover: {
      width: 40,
      height: 40,
      x: pos.x - 20,
      y: pos.y - 20,
      backgroundColor: "transparent",
      border: "1px solid #C6FF3D",
      mixBlendMode: "difference" as const,
    },
    view: {
      width: 64,
      height: 64,
      x: pos.x - 32,
      y: pos.y - 32,
      backgroundColor: "#C6FF3D",
      border: "0px solid #C6FF3D",
      mixBlendMode: "normal" as const,
    },
    drag: {
      width: 64,
      height: 64,
      x: pos.x - 32,
      y: pos.y - 32,
      backgroundColor: "#C6FF3D",
      border: "0px solid #C6FF3D",
      mixBlendMode: "normal" as const,
    }
  };

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:flex items-center justify-center rounded-full overflow-hidden"
        animate={cursorState}
        variants={variants}
        transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: cursorState === "view" ? 1 : 0 }}
          className="text-[#0A0A0B] text-[10px] font-display font-bold uppercase tracking-wider"
        >
          View
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, position: "absolute" }}
          animate={{ opacity: cursorState === "drag" ? 1 : 0 }}
          className="text-[#0A0A0B]"
        >
          <Move size={16} />
        </motion.div>
      </motion.div>
      <style>{`@media (pointer: fine) { body { cursor: none; } a, button { cursor: none; } }`}</style>
    </>
  );
}
