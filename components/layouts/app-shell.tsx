"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Bell, PanelLeftClose, PanelLeftOpen, Search, Sparkles } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants/navigation";
import { useUiStore } from "@/store/ui-store";
import { useHotkey } from "@/hooks/use-hotkey";
import { cn } from "@/lib/utils/cn";
import { Kbd } from "@/components/primitives/kbd";
import { CommandPalette } from "@/components/composition/command-palette";
import { NotificationsPanel } from "@/components/composition/notifications-panel";
import { OfflineBanner } from "@/components/composition/offline-banner";

const EASE_STANDARD = [0.2, 0.8, 0.2, 1] as const;

function BrandMark({ withWordmark }: { withWordmark: boolean }) {
  return (
    <Link href="/" className="flex h-11 items-center gap-2.5 rounded-(--radius-sm) px-2.5">
      <Sparkles className="size-4 shrink-0 text-(--color-accent)" aria-hidden />
      {withWordmark && (
        <span className="font-display text-[17px] font-semibold tracking-(--letter-spacing-title)">
          Novus
        </span>
      )}
    </Link>
  );
}

function SidebarNav({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Navegacion principal" className="flex flex-col gap-1.5">
      {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            title={collapsed ? label : undefined}
            className={cn(
              "flex h-11 items-center gap-2.5 rounded-(--radius-sm) px-3 text-sm font-medium",
              "transition-colors duration-(--duration-fast)",
              collapsed && "justify-center px-0",
              active
                ? "bg-(--color-surface-pressed) font-semibold text-(--color-text-primary)"
                : "text-(--color-text-tertiary) hover:bg-(--color-surface-raised) hover:text-(--color-text-secondary)",
            )}
          >
            <Icon
              className={cn("size-4 shrink-0", active && "text-(--color-accent)")}
              aria-hidden
            />
            {!collapsed && <span className="truncate">{label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

function Topbar() {
  const { setPaletteOpen, setNotificationsOpen } = useUiStore();
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 px-4 md:px-6">
      <div className="md:hidden">
        <BrandMark withWordmark />
      </div>
      <div className="hidden md:block" />
      <div className="flex items-center gap-2">
        <button
          onClick={() => setPaletteOpen(true)}
          className={cn(
            "flex h-9 items-center gap-2.5 rounded-full border border-(--color-border-strong) bg-(--color-surface-raised) pl-3.5 pr-2",
            "text-[13px] text-(--color-text-muted) transition-colors duration-(--duration-fast) hover:bg-(--color-surface-pressed)",
          )}
        >
          <Search className="size-3.5" aria-hidden />
          <span className="hidden sm:inline">Buscar o preguntar</span>
          <Kbd>Ctrl K</Kbd>
        </button>
        <button
          onClick={() => setNotificationsOpen(true)}
          aria-label="Notificaciones"
          className="flex size-9 items-center justify-center rounded-full border border-(--color-border-strong) bg-(--color-surface-raised) text-(--color-text-secondary) transition-colors duration-(--duration-fast) hover:bg-(--color-surface-pressed)"
        >
          <Bell className="size-4" aria-hidden />
        </button>
      </div>
    </header>
  );
}

function MobileNav() {
  const pathname = usePathname();
  const items = NAV_ITEMS.filter((i) => i.mobile);
  return (
    <nav
      aria-label="Navegacion movil"
      className="fixed inset-x-0 bottom-4 z-40 mx-auto flex w-fit gap-1 rounded-full border border-(--color-border-strong) bg-(--color-surface-overlay) p-1.5 shadow-(--shadow-nav) backdrop-blur-xl md:hidden"
    >
      {items.map(({ label, href, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex h-11 items-center gap-2 rounded-full px-4 text-[12.5px] font-semibold",
              "transition-colors duration-(--duration-base)",
              active
                ? "bg-(--color-text-primary) text-(--color-bg-base)"
                : "text-(--color-text-tertiary)",
            )}
          >
            <Icon className="size-4" aria-hidden />
            {active && (
              <motion.span layout initial={false}>
                {label}
              </motion.span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { sidebarCollapsed, toggleSidebar, setPaletteOpen, paletteOpen } = useUiStore();
  const reduce = useReducedMotion();
  useHotkey("k", () => setPaletteOpen(!paletteOpen));

  return (
    <div className="flex h-dvh overflow-hidden">
      {/* Sidebar (desktop) */}
      <motion.aside
        aria-label="Barra lateral"
        animate={{ width: sidebarCollapsed ? 68 : 248 }}
        transition={reduce ? { duration: 0 } : { duration: 0.3, ease: EASE_STANDARD }}
        className="hidden shrink-0 flex-col gap-4 border-r border-(--color-border) bg-(--color-bg-warm) p-3.5 md:flex"
      >
        <div className={cn("flex items-center", sidebarCollapsed ? "justify-center" : "justify-between")}>
          {!sidebarCollapsed && <BrandMark withWordmark />}
          <button
            onClick={toggleSidebar}
            aria-label={sidebarCollapsed ? "Expandir barra lateral" : "Colapsar barra lateral"}
            className="flex size-9 items-center justify-center rounded-(--radius-sm) text-(--color-text-muted) transition-colors duration-(--duration-fast) hover:bg-(--color-surface-raised) hover:text-(--color-text-secondary)"
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen className="size-4" aria-hidden />
            ) : (
              <PanelLeftClose className="size-4" aria-hidden />
            )}
          </button>
        </div>
        <SidebarNav collapsed={sidebarCollapsed} />
      </motion.aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <OfflineBanner />
        <Topbar />
        <main className="flex-1 overflow-y-auto px-4 pb-28 md:px-6 md:pb-8">{children}</main>
      </div>

      <MobileNav />
      <CommandPalette />
      <NotificationsPanel />
    </div>
  );
}
