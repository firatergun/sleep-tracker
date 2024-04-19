import {
  UserGroupIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';

const links = [
  {
    name: 'Log-In',
    to: '/',
    icon: DocumentDuplicateIcon
  },
  {
    name: 'Users',
    to: '/users',
    icon: UserGroupIcon,
  },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <NavLink
            key={link.name}
            to={link.to}
            className={({ isActive }) => {
              return `flex h-[48px] grow items-center justify-center gap-2 rounded-md 
                    bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600
                    md:flex-none md:justify-start md:p-2 md:px-3 ${isActive ? 'bg-sky-100 text-blue-600' : ''}`
            }}>
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </NavLink>
        );
      })}
    </>
  );
}
