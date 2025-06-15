import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaUser,
  FaWpforms,
  FaTable,
  FaCog,
  FaChartBar,
  FaCube,
  FaSignInAlt,
  FaEdit,
  FaLayerGroup,
  FaStepForward,
  // FaPlus,
  FaCode,
  FaExclamationTriangle,
  FaPlay,
  FaKey,
  FaUserPlus,
  FaBug,
  FaTools,
  FaSearch,
} from "react-icons/fa";

export interface MenuLink {
  to: string;
  label: string;
  icon?: React.ElementType; 
}

export interface MenuItem {
  id: string;
  to?: string;
  icon: React.ElementType;
  label: string;
  type: 'link' | 'accordion';
  links?: MenuLink[];
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}


const baseMenuConfig: MenuSection[] = [
  {
    title: "MENU",
    items: [
      {
        id: "dashboard",
        to: "/",
        icon: FaTachometerAlt,
        label: "Dashboard",
        type: "link",
      },
      {
        id: "JobProgramado",
        to: "/JobProgramado",
        icon: FaCalendarAlt,
        label: "JobProgramado",
        type: "link",
      },

      {
        id: "profile",
        to: "/profile",
        icon: FaUser,
        label: "Profile",
        type: "link",
      },
      {
        id: "forms",
        icon: FaWpforms,
        label: "Forms",
        type: "accordion",
        links: [
          { to: "/forms/form-elements", label: "Form Elements", icon: FaEdit },
          { to: "/forms/form-layout", label: "Form Layout", icon: FaLayerGroup },
          { to: "/forms/form-step-by-step", label: "Step by Step", icon: FaStepForward },

          { to: "/forms/dynamic-form-hook-improved", label: "Form Hook Mejorado", icon: FaCode },
          { to: "/forms/dynamic-form-examples", label: "Dynamic Examples", icon: FaLayerGroup },
        ],
      },
      {
        id: "tables",
        to: "/tables",
        icon: FaTable,
        label: "Tables",
        type: "link",
      },
      {
        id: "settings",
        to: "/settings",
        icon: FaCog,
        label: "Settings",
        type: "link",
      },
    ],
  },
  {
    title: "OTHERS",
    items: [
      {
        id: "chart",
        to: "/chart",
        icon: FaChartBar,
        label: "Chart",
        type: "link",
      },
      {
        id: "ui-elements",
        icon: FaCube,
        label: "UI Elements",
        type: "accordion",
        links: [
          { to: "/ui/alerts", label: "Alerts", icon: FaExclamationTriangle },
          { to: "/ui/buttons", label: "Buttons", icon: FaPlay },
        ],
      },
      {
        id: "authentication",
        icon: FaSignInAlt,
        label: "Authentication",
        type: "accordion",
        links: [
          { to: "/auth/signin", label: "Sign In", icon: FaKey },
          { to: "/auth/signup", label: "Sign Up", icon: FaUserPlus },
        ],
      },
    ],
  },
];


const devMenuSection: MenuSection = {
  title: "DESARROLLO",
  items: [
   
    {
      id: "dev-tools",
      icon: FaTools,
      label: "Herramientas Dev",
      type: "accordion",
      links: [
        { to: "/dev/debug-dashboard", label: "Debug Dashboard", icon: FaSearch },
        { to: "/dev/logs", label: "Logs del Sistema", icon: FaBug },
      ],
    },
  ],
};

// 🎯 Configuración final del menú (condicional para desarrollo)
export const menuConfig: MenuSection[] = [
  ...baseMenuConfig,
  // Solo agregar sección de desarrollo en modo desarrollo
  ...(import.meta.env?.DEV ? [devMenuSection] : [])
]; 