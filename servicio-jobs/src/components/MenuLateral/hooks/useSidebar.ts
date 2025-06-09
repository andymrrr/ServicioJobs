import { useEffect, useRef, useState, useCallback } from "react";

interface UseSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const useSidebar = ({ sidebarOpen, setSidebarOpen }: UseSidebarProps) => {
  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLElement>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // Manejar clicks fuera del sidebar
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as Node;
      
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      ) {
        return;
      }
      
      setSidebarOpen(false);
    },
    [sidebarOpen, setSidebarOpen]
  );

  // Manejar tecla ESC
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!sidebarOpen || event.keyCode !== 27) return;
      setSidebarOpen(false);
    },
    [sidebarOpen, setSidebarOpen]
  );

  // Toggle sidebar expandido
  const toggleSidebarExpanded = useCallback(() => {
    setSidebarExpanded(prev => !prev);
  }, []);

  // Expandir sidebar si no está expandido
  const expandSidebar = useCallback(() => {
    if (!sidebarExpanded) {
      setSidebarExpanded(true);
    }
  }, [sidebarExpanded]);

  // Effect para manejar clicks fuera
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  // Effect para manejar teclas
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Effect para persistir estado expandido
  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    
    const body = document.querySelector("body");
    if (sidebarExpanded) {
      body?.classList.add("sidebar-expanded");
    } else {
      body?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return {
    sidebar,
    trigger,
    sidebarExpanded,
    setSidebarExpanded,
    toggleSidebarExpanded,
    expandSidebar,
  };
}; 