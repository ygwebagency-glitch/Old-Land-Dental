import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { NotFoundPage } from "@/components/sections/NotFoundPage";
import { dentistJsonLd } from "@/lib/seo";

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-sand px-4">
      <div className="max-w-md text-center">
        <h1 className="type-h2">This page didn't load</h1>
        <p className="mt-3 text-ink-muted">Something went wrong on our end. You can try refreshing or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-charcoal px-6 font-semibold text-on-dark hover:bg-charcoal-deep"
          >
            Try again
          </button>
          <a href="/" className="inline-flex min-h-11 items-center justify-center rounded-full border-[1.5px] border-charcoal px-6 font-semibold text-charcoal">
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
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Oldland Dental Practice In Bristol | Bristol Dentist" },
      {
        name: "description",
        content:
          "Welcome to Oldland Dental Practice In Bristol. We have been established as a Bristol Dentist for a number of years now and have highly trained staff.",
      },
      {
        name: "keywords",
        content:
          "Oldland Dentist, Oldland Dental Practice, Dentist In Oldland, Dentist Oldland, Bristol Dentist, Bristol Dental Practice, Dentist In Bristol",
      },
      { name: "theme-color", content: "#4B4D50" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Oldland Dental Practice" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Arapey:ital@0;1&family=Mulish:wght@400;500;600;700;800&display=swap",
      },
      { rel: "preconnect", href: "https://www.oldlanddental.co.uk" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(dentistJsonLd) }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB">
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

  return (
    <QueryClientProvider client={queryClient}>
      <SiteLayout>
        <Outlet />
      </SiteLayout>
    </QueryClientProvider>
  );
}
