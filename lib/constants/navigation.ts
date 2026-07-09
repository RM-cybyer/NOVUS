import {
  Sparkles,
  BarChart3,
  Target,
  ArrowLeftRight,
  Brain,
  Briefcase,
  Plug,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Shown in the mobile bottom nav (3 primary destinations). */
  mobile?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Novus", href: "/", icon: Sparkles, mobile: true },
  { label: "Panel", href: "/panel", icon: BarChart3, mobile: true },
  { label: "Metas", href: "/metas", icon: Target },
  { label: "Movimientos", href: "/movimientos", icon: ArrowLeftRight },
  { label: "Memoria", href: "/memoria", icon: Brain, mobile: true },
  { label: "Negocio", href: "/negocio", icon: Briefcase },
  { label: "Conexiones", href: "/conexiones", icon: Plug },
];
