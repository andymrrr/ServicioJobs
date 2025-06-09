import React from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Logo from "../../images/logo/logo.svg";
import { useSidebar } from "./hooks/useSidebar";
import { menuConfig } from "./menuConfig";
import MenuSection from "./MenuSection";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const {
    sidebar,
    trigger,
    sidebarExpanded,
    expandSidebar,
  } = useSidebar({ sidebarOpen, setSidebarOpen });

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      role="navigation"
      aria-label="Sidebar navigation"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/" aria-label="Ir al inicio">
          <img src={Logo} alt="Logo de la aplicación" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          aria-label={sidebarOpen ? "Cerrar menú" : "Abrir menú"}
          className="block lg:hidden"
        >
          <FaBars className="text-white" size={20} />
        </button>
      </div>

      {/* Navigation */}
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {menuConfig.map((section) => (
            <MenuSection
              key={section.title}
              section={section}
              sidebarExpanded={sidebarExpanded}
              expandSidebar={expandSidebar}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
