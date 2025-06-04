import React from 'react';
import { NavLink } from 'react-router-dom';

interface MenuItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ to, icon: Icon, label }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
            isActive ? 'bg-graydark dark:bg-meta-4' : ''
          }`
        }
      >
        <Icon className="text-lg" />
        <span>{label}</span>
      </NavLink>
    </li>
  );
};

export default MenuItem;
