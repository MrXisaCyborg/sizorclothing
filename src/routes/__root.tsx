import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  ScrollRestoration,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ThemeProvider } from "../context/theme-context";
import { OrderProvider } from "../context/order-context";
import { CartProvider } from "../context/cart-context";
import { CartDrawer } from "../components/cart-drawer";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Preloader } from "../components/Preloader";
import { SiteNav } from "../components/site-nav";
import { SiteFooter } from "../components/site-footer";
import { OrganizationSchema, LocalBusinessSchema } from "../components/seo-schemas";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center grain relative bg-ink px-4 overflow-hidden">
      <div className="absolute inset-0 bg-panel opacity-50 mix-blend-color" />
      <div className="relative z-10 max-w-2xl text-center">
        <p className="label-xs text-acid mb-6">Error / 404</p>
        <h1 className="display text-[clamp(4rem,10vw,8rem)] text-bone tracking-tighter leading-none mb-8">
          SIGNAL<br/>LOST.
        </h1>
        <p className="text-xl text-bone/60 mb-12 max-w-md mx-auto">
          The requested coordinate does not exist within the current system parameters.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-acid px-8 py-5 label-xs text-ink transition-colors hover:bg-bone"
        >
          Return to Base →
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="label-xs text-acid">System / Error</p>
        <h1 className="display mt-4 text-4xl text-bone">This page didn't load</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Something broke on our end. Retry or head back.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="label-xs border border-acid bg-acid px-5 py-3 text-acid-foreground transition-opacity hover:opacity-90"
          >
            Retry
          </button>
          <a
            href="/"
            className="label-xs border border-bone px-5 py-3 text-bone transition-colors hover:bg-bone hover:text-ink"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SIZOR | Techwear & Streetwear Outerwear India" },
      {
        name: "description",
        content:
          "SIZOR is a premium techwear and streetwear label based in Mumbai. Utility clothing, outerwear, and tactical apparel shipped worldwide and across India including Chennai.",
      },
      { name: "keywords", content: "techwear India, streetwear India, techwear brand Mumbai, streetwear Chennai, utility clothing India, limited run streetwear India, Sizor techwear, Sizor streetwear" },
      { name: "author", content: "SIZOR" },
      { property: "og:title", content: "SIZOR | Techwear & Streetwear Outerwear India" },
      {
        property: "og:description",
        content:
          "Premium techwear and streetwear outerwear label. Utility clothing shipped worldwide and across India.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sizor.com" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://sizor.com" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/logo-wordmark.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [showPreloader, setShowPreloader] = useState(true);
  const [mountApp, setMountApp] = useState(false);
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <OrderProvider>
          <CartProvider>
            <ScrollRestoration />
            {showPreloader && (
              <Preloader 
                onStartExit={() => setMountApp(true)}
                onComplete={() => setShowPreloader(false)} 
              />
            )}
            <OrganizationSchema />
            <LocalBusinessSchema />
            {mountApp && (
              <div id="top" className="min-h-screen bg-ink text-bone flex flex-col transition-colors duration-500 ease-physics">
                <SiteNav />
                <CartDrawer />
                <main className="flex-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={router.state.location.pathname}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
                      className="min-h-screen"
                    >
                      <Outlet />
                    </motion.div>
                  </AnimatePresence>
                </main>
                <SiteFooter />
              </div>
            )}
          </CartProvider>
        </OrderProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
