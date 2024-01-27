import { MutableRefObject, useRef, useState } from 'react';
import { IoIosMore, IoIosNotifications, IoIosPeople } from 'react-icons/io';
import useClickOutside from '../../hooks/useClickOutside';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const { t } = useTranslation();
  const [isNotePannel, setNotePannel] = useState<boolean>(false);

  const notificationsPannel = useRef() as MutableRefObject<HTMLDivElement>;

  // Hook to hide search result, when user clicked outside
  useClickOutside(notificationsPannel, setNotePannel);

  return (
    <div className="relative p-1 bg-gray-200 hover:bg-gray-400 rounded-full">
      <div
        className="cursor-pointer"
        onClick={() => setNotePannel(!isNotePannel)}
      >
        <IoIosNotifications size={24} />
      </div>
      {isNotePannel && (
        <div
          ref={notificationsPannel}
          className="absolute z-10 w-96 p-2 bg-white rounded-lg shadow-lg shadow-gray-400 botton-[26px] right-0 flex flex-col items-center"
        >
          <div className="flex flex-row items-center justify-between w-[364px] pb-2">
            <span className="font-headline text-gray-700 font-bold text-xl">
              {t('Notifications')}
            </span>
            <span className="bg-white hover:bg-gray-200 p-1 rounded-full cursor-pointer">
              <IoIosMore />
            </span>
          </div>
          <div className="flex flex-row items-center justify-start gap-2 w-[364px] pb-2">
            <div className="font-roboto font-bold text-gray-600 text-[12px] py-1 px-2 rounded-full bg-gray-300 hover:bg-myorange-light cursor-pointer">
              {t('All')}
            </div>
            <div className="font-roboto font-bold text-gray-600 text-[12px] py-1 px-2 rounded-full bg-gray-300 hover:bg-myorange-light cursor-pointer">
              {t('Unread')}
            </div>
          </div>
          <div className="flex flex-row items-center justify-between w-[364px] pb-2">
            <span className="font-headline text-gray-700 font-bold text-md">
              {t('New')}
            </span>
            <Link
              to={'/notifications/all'}
              className="text-mycyan hover:text-mycyan-dark font-roboto text-[12px]"
            >
              {t('See All')}
            </Link>
          </div>
          <div className="flex flex-col  w-[364px]">
            <div className="flex flex-row items-center justify-start gap-2">
              <div className="relative">
                <img
                  src="./images/others/berge.jpg"
                  className="rounded-full w-[52px] h-[52px]"
                />
                <div className="absolute bottom-0 right-0 p-1 bg-mycyan-dark rounded-full">
                  <IoIosPeople
                    size={18}
                    color={import.meta.env.VITE_COLOR_WHITE}
                  />
                </div>
              </div>
              <div className="relative flex flex-col font-roboto text-gray-500 w-[258px]">
                <span className="text-[13px] pb-2">
                  {t('YouMightLike')}{' '}
                  <span className="font-bold text-gray-600">
                    {t('Mountains')}
                  </span>
                </span>
                <span className="text-[10px]">
                  {t('1') + ' ' + t('DaysAgo')}
                </span>
              </div>
              <div className="relative rounded-full bg-gray-200 hover:bg-gray-300 p-1 cursor-pointer">
                <IoIosMore size={20} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
