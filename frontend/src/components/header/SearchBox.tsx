import React, { MutableRefObject, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowBack, IoIosSearch } from 'react-icons/io';
import { UserState } from '../../redux/slices/userSlice';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { shallowEqual } from 'react-redux';
import { IoMdCloseCircle } from 'react-icons/io';
import useClickOutside from '../../hooks/useClickOutside';

const SearchBox = () => {
  const { t } = useTranslation();

  const userState: UserState = useAppSelector((state: RootState): UserState => {
    return state.user as UserState;
  }, shallowEqual);
  const [isSearch, setSearch] = useState<boolean>(false);

  // const searchPannel = useRef<HTMLDivElement>(null);
  const searchPannel = useRef() as MutableRefObject<HTMLDivElement>;
  // const searchRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef() as MutableRefObject<HTMLInputElement>;
  // const searchIconRef = useRef<HTMLSpanElement>(null);
  const searchIconRef = useRef() as MutableRefObject<HTMLSpanElement>;

  // Hook to hide search result, when user clicked outside
  useClickOutside(searchPannel, setSearch);

  return (
    <div className="flex-grow flex flex-col relative">
      <div className="flex flex-row gap-3 justify-start pt-1 items-center">
        <div className="w-11 px-1 py-1">
          <img src="./images/materials/logo-small.png" className="w-9" />
        </div>
        <div className="relative sm:block sm:h-9 pt-1">
          <input
            type="text"
            onClick={() => setSearch(true)}
            placeholder={t('Search')}
            className="w-[200px] h-7 border-none rounded-full hidden xl:block py-1 pl-9 pr-1 font-sans text-xs text-gray-700 bg-gray-200"
          />
          <span
            className="absolute xl:top-[5px] xl:left-1 xl:p-1 p-2 w-5 cursor-pointer border-none rounded-full bg-gray-200 hover:bg-gray-300 sm:w-8"
            onClick={() => setSearch(true)}
          >
            <IoIosSearch />
          </span>
        </div>
      </div>
      {isSearch && (
        <div
          className="absolute top-0 left-0 rounded-br-lg shadow-md shadow-gray-600 bg-white p-2"
          ref={searchPannel}
        >
          <div className="flex flex-row gap-3 justify-start pt-1 items-center">
            <div
              className="w-9 p-2 hover:bg-gray-200 hover:rounded-full cursor-pointer"
              onClick={() => setSearch(false)}
            >
              <IoIosArrowBack />
            </div>
            <div className="relative sm:block sm:h-9 pt-1">
              <input
                type="text"
                autoFocus={true}
                onFocus={() => {
                  (searchRef.current.style.paddingLeft as string) = '8px';
                  searchIconRef.current.style.display = 'none';
                }}
                onBlur={() => {
                  searchRef.current.style.paddingLeft = '36px';
                  searchIconRef.current.style.display = 'block';
                }}
                onClick={() => setSearch(true)}
                placeholder={t('Search')}
                ref={searchRef}
                className="w-[200px] h-7 border-none rounded-full py-1 pl-9 pr-1 font-sans text-xs text-gray-700 bg-gray-200"
              />
              <span
                ref={searchIconRef}
                className="absolute top-[5px] left-1 p-1 w-5 cursor-pointer border-none rounded-full bg-gray-200 hover:bg-gray-300 sm:w-8"
              >
                <IoIosSearch />
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center py-2">
            <div className="text-gray-800 font-headline font-bold text-[14px]">
              {t('RecentSearchs')}
            </div>
            <div>
              <a href="">Edit</a>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center gap-2 py-1 hover:bg-gray-300 hover:cursor-pointer hover:rounded-md">
            <div className="flex flex-row justify-start items-center">
              <img
                src={userState?.userInfo.image}
                className="w-8 p-1 rounded-full"
              />
              <span className="pl-2 text-sm font-normal text-gray-700 font-roboto">
                {userState.userInfo.fname + ' ' + userState.userInfo.lname}
              </span>
            </div>
            <div className="w-4 cursor-pointer pr-2">
              <IoMdCloseCircle />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
