import type { Metadata, Viewport } from "next";
import { type ReactNode } from "react";
import { AppShell } from "@/components/layouts/app-shell";
import "@/styles/global/globals.css";

export const metadata: Metadata = {
  title: { default: "Novus", template: "%s - Novus" },
  description:
    "Novus es tu sistema operativo de vida, negocio y finanzas. Toma mejores decisiones.",
};

export const viewport: Viewport = {
  themeColor: "#070707",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        {/* Brand fonts (Clash Display + Satoshi) via Fontshare; token stacks provide fallbacks. */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
