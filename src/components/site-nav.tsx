import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, User } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useTheme } from "@/context/theme-context";
import { Logo } from "@/components/logo";
import look1 from "@/assets/lookbook-1.jpg";

const mobileContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 }
  }
};

const mobileItemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.4 } }
};

const MobileNavLink = ({ to, children, onClick, className = "" }: any) => (
  <motion.div variants={mobileItemVariants}>
    <Link 
      to={to} 
      onClick={onClick}
      activeProps={{ className: "!text-acid" }}
      inactiveProps={{ className: "text-bone" }}
      className={`display block text-3xl hover:text-acid transition-colors ${className}`}
    >
      {children}
    </Link>
  </motion.div>
);

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items, setIsCartOpen } = useCart();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[120] transition-all duration-500 ease-physics ${
          scrolled || isShopHovered
            ? "bg-ink border-b border-line py-3 shadow-xl shadow-ink/50"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-10 relative">
          <Link to="/" className="flex items-center gap-3 relative z-10 hover:opacity-70 transition-opacity">
            <Logo className="h-8 md:h-10 w-auto object-contain" />
          </Link>
          
          <nav className="hidden items-center gap-10 md:flex relative z-10">
            <div 
              className="relative py-4"
              onMouseEnter={() => setIsShopHovered(true)}
              onMouseLeave={() => setIsShopHovered(false)}
            >
              <span className="label-xs text-bone/70 transition-colors hover:text-acid cursor-pointer">
                Shop
              </span>
            </div>
            
            <Link to="/studio/lookbook" className="label-xs text-bone/70 transition-colors hover:text-acid py-4">Lookbook</Link>
            <Link to="/studio/manifesto" className="label-xs text-bone/70 transition-colors hover:text-acid py-4">Manifesto</Link>
            <Link to="/support/contact" className="label-xs text-bone/70 transition-colors hover:text-acid py-4">Contact</Link>
          </nav>

          <div className="flex items-center gap-4 relative z-10">
            <span className="label-xs hidden text-bone/50 md:inline">SS26 / 001</span>
            
            <Link
              to="/account"
              className="p-2 text-bone hover:text-acid transition-colors"
              aria-label="Profile"
            >
              <User size={18} />
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 text-bone hover:text-acid transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="label-xs border border-bone/40 px-4 py-2 text-bone transition-colors hover:bg-acid hover:text-acid-foreground hover:border-acid"
            >
              Bag [{cartCount}]
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-bone hover:text-acid transition-colors relative z-[130] flex items-center justify-center ml-2"
              aria-label="Toggle mobile menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <motion.line 
                  x1="4" y1="6" x2="20" y2="6" 
                  animate={{ y1: isMobileMenuOpen ? 12 : 6, y2: isMobileMenuOpen ? 12 : 6, rotate: isMobileMenuOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.line 
                  x1="4" y1="12" x2="20" y2="12" 
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.line 
                  x1="4" y1="18" x2="20" y2="18" 
                  animate={{ y1: isMobileMenuOpen ? 12 : 18, y2: isMobileMenuOpen ? 12 : 18, rotate: isMobileMenuOpen ? -45 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {isShopHovered && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
              className="absolute top-full left-0 w-full bg-ink border-b border-line overflow-hidden shadow-xl shadow-ink/50"
              onMouseEnter={() => setIsShopHovered(true)}
              onMouseLeave={() => setIsShopHovered(false)}
            >
              <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-12 flex gap-24">
                <div className="w-1/3">
                  <p className="label-xs text-acid mb-6">/ Categories</p>
                  <div className="flex flex-col gap-4">
                    <Link to="/shop/outerwear" className="display text-3xl text-bone hover:text-acid transition-colors">Outerwear</Link>
                    <Link to="/shop/bottoms" className="display text-3xl text-bone hover:text-acid transition-colors">Bottoms</Link>
                    <Link to="/shop/layers" className="display text-3xl text-bone hover:text-acid transition-colors">Layers</Link>
                    <Link to="/shop/modular" className="display text-3xl text-bone hover:text-acid transition-colors">Modular</Link>
                    <Link to="/shop/archive" className="display text-3xl text-bone/50 hover:text-bone transition-colors">Archive</Link>
                  </div>
                </div>
                
                <div className="w-2/3 flex items-center justify-end gap-12">
                  <div className="max-w-sm">
                    <h3 className="label-xs text-bone mb-2">Featured Collection</h3>
                    <p className="text-sm text-bone/60">Engineered for extreme environments. Precision-cut and seam-sealed.</p>
                    <Link to="/shop/outerwear" className="inline-block mt-6 label-xs text-acid hover:text-bone transition-colors">Explore Outerwear →</Link>
                  </div>
                  <div className="aspect-[4/5] w-64 bg-panel-2 relative group overflow-hidden">
                    <img src={look1} alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-physics" />
                    <div className="absolute inset-0 bg-ink/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ y: "-100%", opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              className="fixed inset-0 z-[110] bg-ink/95 backdrop-blur-md grain overflow-y-auto flex flex-col pt-32 px-6 pb-12 md:hidden"
            >
              <motion.div variants={mobileContainerVariants} initial="hidden" animate="show" className="flex flex-col gap-10">
                {/* Shop Section */}
                <div>
                  <motion.p variants={mobileItemVariants} className="label-xs text-acid mb-4">/ Shop</motion.p>
                  <div className="flex flex-col gap-4 pl-4 border-l border-line">
                    <MobileNavLink onClick={() => setIsMobileMenuOpen(false)} to="/shop/outerwear">Outerwear</MobileNavLink>
                    <MobileNavLink onClick={() => setIsMobileMenuOpen(false)} to="/shop/bottoms">Bottoms</MobileNavLink>
                    <MobileNavLink onClick={() => setIsMobileMenuOpen(false)} to="/shop/layers">Layers</MobileNavLink>
                    <MobileNavLink onClick={() => setIsMobileMenuOpen(false)} to="/shop/modular">Modular</MobileNavLink>
                    <MobileNavLink onClick={() => setIsMobileMenuOpen(false)} to="/shop/archive" className="opacity-50 hover:opacity-100">Archive</MobileNavLink>
                  </div>
                </div>

                {/* Studio Section */}
                <div>
                  <motion.p variants={mobileItemVariants} className="label-xs text-acid mb-4">/ Studio</motion.p>
                  <div className="flex flex-col gap-4 pl-4 border-l border-line">
                    <MobileNavLink onClick={() => setIsMobileMenuOpen(false)} to="/studio/manifesto">Manifesto</MobileNavLink>
                    <MobileNavLink onClick={() => setIsMobileMenuOpen(false)} to="/studio/lookbook">Lookbook</MobileNavLink>
                    <MobileNavLink onClick={() => setIsMobileMenuOpen(false)} to="/studio/journal">Journal</MobileNavLink>
                    <MobileNavLink onClick={() => setIsMobileMenuOpen(false)} to="/studio/press">Press</MobileNavLink>
                  </div>
                </div>

                {/* Support Section */}
                <div>
                  <motion.p variants={mobileItemVariants} className="label-xs text-acid mb-4">/ Support</motion.p>
                  <div className="flex flex-col gap-4 pl-4 border-l border-line">
                    <MobileNavLink onClick={() => setIsMobileMenuOpen(false)} to="/support/sizing">Sizing</MobileNavLink>
                    <MobileNavLink onClick={() => setIsMobileMenuOpen(false)} to="/support/shipping">Shipping</MobileNavLink>
                    <MobileNavLink onClick={() => setIsMobileMenuOpen(false)} to="/support/returns">Returns</MobileNavLink>
                    <MobileNavLink onClick={() => setIsMobileMenuOpen(false)} to="/support/contact">Contact</MobileNavLink>
                  </div>
                </div>

                {/* Socials */}
                <motion.div variants={mobileItemVariants} className="mt-4 pt-8 border-t border-line flex gap-6">
                  <a href="#" className="label-xs text-bone hover:text-acid transition-colors">Instagram</a>
                  <a href="#" className="label-xs text-bone hover:text-acid transition-colors">Twitter</a>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
