import {
  Sparkles,
  BarChart3,
  Target,
  ArrowLeftRight,
  Brain,
  Briefcase,
  Plug,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Shown in the mobile bottom nav (5 primary destinations). */
  mobile?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Panel", href: "/panel", icon: BarChart3, mobile: true },
  { label: "Novus", href: "/", icon: Sparkles, mobile: true },
  { label: "Metas", href: "/metas", icon: Target, mobile: true },
  { label: "Movimientos", href: "/movimientos", icon: ArrowLeftRight, mobile: true },
  { label: "Memoria", href: "/memoria", icon: Brain },
  { label: "Negocio", href: "/negocio", icon: Briefcase },
  { label: "Conexiones", href: "/conexiones", icon: Plug },
  { label: "Ajustes", href: "/ajustes", icon: Settings, mobile: true },
];
