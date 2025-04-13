import {
  IoCalendarOutline
} from 'react-icons/io5';

import { SidebarItem } from './SidebarItem';
import { Link } from 'react-router-dom';

import avatarUrl from '../../assets/avatar.png'; // Ruta válida para imagen de avatar
import logoUrl from '../../assets/logo.png'; // Ruta válida para el logo

// Simulación de datos (puedes reemplazarlo por props o contexto)
const userName = 'Juan Pérez';
const userRoles = ['admin', 'editor'];

const menuItems = [
  {
    icon: <IoCalendarOutline />,
    title: 'Dashboard',
    path: '/dashboard',
  },
 
];

export const Sidebar = () => {
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link to="/" title="home">
            <img src={logoUrl} className="w-32" alt="logo" />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {userName}
          </h5>
          <span className="hidden text-gray-400 lg:block capitalize">
            {userRoles.join(', ')}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {menuItems.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
      </div>
    </aside>
  );
};
