import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../images/logo/logo.svg";
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
  FaBars,
} from "react-icons/fa";
import MenuItem from "./MenuItem";
import SidebarLinkGroup from "./SidebarLinkGroup";
import SidebarAccordionItem from "./SidebarAccordionItem";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <FaBars className="text-white" size={20} />
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <MenuItem to="/" icon={FaTachometerAlt} label="Dashboard" />
              <MenuItem to="/calendar" icon={FaCalendarAlt} label="Calendar" />
              <MenuItem to="/profile" icon={FaUser} label="Profile" />
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/forms" || pathname.includes("forms")
                }
              >
                {(handleClick, open) => (
                  <SidebarAccordionItem
                    icon={FaWpforms}
                    label="Forms"
                    open={open}
                    onClick={() =>
                      sidebarExpanded ? handleClick() : setSidebarExpanded(true)
                    }
                    active={pathname === "/forms" || pathname.includes("forms")}
                    links={[
                      { to: "/forms/form-elements", label: "Form Elements" },
                      { to: "/forms/form-layout", label: "Form Layout" },
                    ]}
                  />
                )}
              </SidebarLinkGroup>
              <MenuItem to="/tables" icon={FaTable} label="Tables" />
              <MenuItem to="/settings" icon={FaCog} label="Settings" />
            </ul>
          </div>

          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              OTHERS
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <MenuItem to="/chart" icon={FaChartBar} label="Chart" />
              <SidebarLinkGroup
                activeCondition={pathname === "/ui" || pathname.includes("ui")}
              >
                {(handleClick, open) => (
                  <SidebarAccordionItem
                    icon={FaCube}
                    label="UI Elements"
                    open={open}
                    onClick={() =>
                      sidebarExpanded ? handleClick() : setSidebarExpanded(true)
                    }
                    active={pathname === "/ui" || pathname.includes("ui")}
                    links={[
                      { to: "/ui/alerts", label: "Alerts" },
                      { to: "/ui/buttons", label: "Buttons" },
                    ]}
                  />
                )}
              </SidebarLinkGroup>

              {/* Acordeón: Authentication */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/auth" || pathname.includes("auth")
                }
              >
                {(handleClick, open) => (
                  <SidebarAccordionItem
                    icon={FaSignInAlt}
                    label="Authentication"
                    open={open}
                    onClick={() =>
                      sidebarExpanded ? handleClick() : setSidebarExpanded(true)
                    }
                    active={pathname === "/auth" || pathname.includes("auth")}
                    links={[
                      { to: "/auth/signin", label: "Sign In" },
                      { to: "/auth/signup", label: "Sign Up" },
                    ]}
                  />
                )}
              </SidebarLinkGroup>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
