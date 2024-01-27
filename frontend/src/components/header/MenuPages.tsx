import {
  IoIosBasket,
  IoIosContacts,
  IoIosHome,
  IoIosVideocam,
  IoLogoGameControllerB,
} from 'react-icons/io';
import { NavLink } from 'react-router-dom';

const MenuPages = () => {
  return (
    <div className="flex flex-row justify-around items-center space-x-2">
      <NavLink
        to="/"
        className={({ isActive }) =>
          'hidden sm:block hover:bg-gray-300 hover:rounded-full p-2 ' +
          (isActive && 'border-b-4 border-mycyan-dark hover:border-0')
        }
      >
        <IoIosHome size={26} color={import.meta.env.VITE_SPINER_COLOR} />
      </NavLink>
      <NavLink
        to="/freinds"
        className={({ isActive }) =>
          'hover:bg-gray-300 hover:rounded-full p-2 ' +
          (isActive && 'border-b-4 border-mycyan-dark hover:border-0')
        }
      >
        <IoIosContacts size={26} color={import.meta.env.VITE_ICON_COLOR} />
      </NavLink>
      <NavLink
        to="/videos"
        className={({ isActive }) =>
          'hidden relative md:block hover:bg-gray-300 hover:rounded-full p-2 ' +
          (isActive && 'border-b-4 border-mycyan-dark hover:border-0')
        }
      >
        <IoIosVideocam size={26} color={import.meta.env.VITE_ICON_COLOR} />
        <span className="hidden absolute md:block font-mono font-bold text-white text-[9px] p-[2px] text-center bg-myorange-dark rounded-full right-0 top-0 w-[20px] h-[18px]">
          19
        </span>
      </NavLink>
      <NavLink
        to="/market"
        className={({ isActive }) =>
          'hidden lg:block hover:bg-gray-300 hover:rounded-full p-2 ' +
          (isActive && 'border-b-4 border-mycyan-dark hover:border-0')
        }
      >
        <IoIosBasket size={26} color={import.meta.env.VITE_ICON_COLOR} />
      </NavLink>
      <NavLink
        to="/games"
        className={({ isActive }) =>
          'hidden xl:block hover:bg-gray-300 hover:rounded-full p-2 ' +
          (isActive && 'border-b-4 border-mycyan-dark hover:border-0')
        }
      >
        <IoLogoGameControllerB
          size={26}
          color={import.meta.env.VITE_ICON_COLOR}
        />
      </NavLink>
    </div>
  );
};

export default MenuPages;
