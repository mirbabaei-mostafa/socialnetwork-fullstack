import { ChangeEvent, MutableRefObject, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosMenu, IoIosSearch } from 'react-icons/io';
import useClickOutside from '../../hooks/useClickOutside';
import MenuList from '../../data/mainmenu.json';
import CreateList from '../../data/create.json';
import { Link } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';

const MainMenu = () => {
  const { t } = useTranslation();
  const [isMainPannel, setMainPannel] = useState<boolean>(false);
  const [menuSearch, setMenuSearch] = useState<string>('');

  const mainMenuPannel = useRef() as MutableRefObject<HTMLDivElement>;

  // Hook to hide search result, when user clicked outside
  useClickOutside(mainMenuPannel, setMainPannel);

  return (
    <div className="p-1 bg-gray-200 hover:bg-gray-400 rounded-full relative">
      <div
        className="cursor-pointer"
        onClick={() => setMainPannel(!isMainPannel)}
      >
        <IoIosMenu size={24} />
      </div>
      {isMainPannel && (
        <div
          ref={mainMenuPannel}
          className="absolute botton-[26px] -right-[120px] flex flex-col w-[350px] md:w-[600px] shadow-md shadow-gray-400 rounded-md bg-white p-3 h-[92vh] overflow-y-scroll scrollbar-thin  scrollbar-thumb-gray-200  scrollbar-thumb-rounded-md"
        >
          <div className="font-headline text-gray-700 font-bold text-xl">
            {t('Menu')}
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-2">
            {/* Main Menu */}
            <div className="w-[320px] md:w-[338px] flex flex-col shadow-md shadow-gray-300 p-2">
              {/* Search in main menu */}
              <div className="py-4 relative">
                <input
                  type="text"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setMenuSearch(e.target.value)
                  }
                  placeholder={t('SearchMenu')}
                  className="bg-gray-200 font-roboto text-[11px] text-gray-700 rounded-2xl py-1 pl-7 border-0 w-64"
                />
                <span className="absolute left-[6px] top-[21px]">
                  <IoIosSearch
                    size={20}
                    color={import.meta.env.VITE_GRAY_ICON}
                  />
                </span>
              </div>
              {MenuList.map((category) => {
                return (
                  <>
                    <div className="font-headline font-bold text-[16px] text-gray-600 w-64 border-b border-b-gray-200 py-3">
                      {t(category.maintitle)}
                    </div>
                    {category.submenu.map((submenu) => {
                      return submenu.title
                        .toLowerCase()
                        .includes(menuSearch.toLowerCase()) ? (
                        <div className="flex flex-row justify-start gap-2 items-start py-3">
                          <div className="">
                            <img src={submenu.image} className="w-9 h-9" />
                          </div>
                          <div className="flex flex-col">
                            <Link
                              to={submenu.link}
                              className="font-headline text-[14px] font-bold cursor-pointer text-mycyan-dark hover:text-mycyan pb-1"
                            >
                              {t(submenu.title)}
                            </Link>
                            <span className="font-roboto font-normal text-[12px] text-gray-500">
                              {t(submenu.Description)}
                            </span>
                          </div>
                        </div>
                      ) : (
                        ''
                      );
                    })}
                  </>
                );
              })}
            </div>
            {/* Create Menu */}
            <div className="w-[320px] flex flex-col shadow-md shadow-gray-300 p-3 md:fixed md:right-[32px] md:top-[74px] md:w-[220px] overflow-hidden">
              <div className="font-bold font-headline text-[16px] text-gray-500">
                {t('Create')}
              </div>
              {CreateList.map((create) => {
                return (
                  <div className="flex flex-row justify-start gap-3 items-center px-2 py-2 hover:rounded-lg hover:bg-gray-100">
                    <div className=" rounded-full p-2 bg-gray-200">
                      <img src={create.icon} className="w-6 h-6" />
                    </div>
                    <Link
                      to={create.link}
                      className="font-roboto font-bold text-[15px] text-gray-600 hover:text-gray-800"
                    >
                      {create.title}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainMenu;
