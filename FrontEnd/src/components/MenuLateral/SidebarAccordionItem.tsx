import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

interface LinkItem {
  to: string;
  label: string;
}

interface SidebarAccordionItemProps {
  icon: React.ElementType;
  label: string;
  open: boolean;
  onClick: () => void;
  active: boolean;
  links: LinkItem[];
}

const SidebarAccordionItem: React.FC<SidebarAccordionItemProps> = ({
  icon: Icon,
  label,
  open,
  onClick,
  active,
  links,
}) => {
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        className={`group relative flex w-full items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
          active ? 'bg-graydark dark:bg-meta-4' : ''
        }`}
      >
        <Icon className="text-lg" />
        <span>{label}</span>
        <FaChevronDown
          className={`absolute right-4 top-1/2 -translate-y-1/2 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div className={`overflow-hidden transition-all ${!open ? 'hidden' : ''}`}>
        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                  (isActive && '!text-white')
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SidebarAccordionItem;
