import React from 'react';
import { useLocation } from 'react-router-dom';
import MenuItem from './MenuItem';
import SidebarLinkGroup from './SidebarLinkGroup';
import SidebarAccordionItem from './SidebarAccordionItem';
import { MenuSection as MenuSectionType } from './menuConfig';

interface MenuSectionProps {
  section: MenuSectionType;
  sidebarExpanded: boolean;
  expandSidebar: () => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({
  section,
  sidebarExpanded,
  expandSidebar,
}) => {
  const location = useLocation();
  const { pathname } = location;

  const isAccordionActive = (_: string, links?: Array<{ to: string }>) => {
    if (!links) return false;
    return links.some(link => pathname === link.to || pathname.includes(link.to));
  };

  const getAccordionCondition = (itemId: string, links?: Array<{ to: string }>) => {
    if (!links) return false;
    return links.some(link => pathname === link.to || pathname.includes(itemId));
  };

  return (
    <div>
      <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
        {section.title}
      </h3>
      <ul className="mb-6 flex flex-col gap-1.5">
        {section.items.map((item) => {
          if (item.type === 'link' && item.to) {
            return (
              <MenuItem
                key={item.id}
                to={item.to}
                icon={item.icon}
                label={item.label}
              />
            );
          }

          if (item.type === 'accordion' && item.links) {
            return (
              <SidebarLinkGroup
                key={item.id}
                activeCondition={getAccordionCondition(item.id, item.links)}
              >
                {(handleClick, open) => (
                  <SidebarAccordionItem
                    icon={item.icon}
                    label={item.label}
                    open={open}
                    onClick={() =>
                      sidebarExpanded ? handleClick() : expandSidebar()
                    }
                    active={isAccordionActive(item.id, item.links)}
                    links={item.links || []}
                  />
                )}
              </SidebarLinkGroup>
            );
          }

          return null;
        })}
      </ul>
    </div>
  );
};

export default MenuSection; 