import { MutableRefObject, useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { IoIosChatbubbles } from 'react-icons/io';

const ChatMenu = () => {
  const { t } = useTranslation();
  const [isChatPannel, setChatPannel] = useState<boolean>(false);
  const navigate = useNavigate();

  const chatPannel = useRef() as MutableRefObject<HTMLDivElement>;

  // Hook to hide search result, when user clicked outside
  useClickOutside(chatPannel, setChatPannel);

  return (
    <div className="relative p-1 bg-gray-200 hover:bg-gray-400 rounded-full">
      <span
        onClick={() => setChatPannel(!isChatPannel)}
        className=" cursor-pointer"
      >
        <IoIosChatbubbles size={24} />
      </span>
      {isChatPannel && (
        <div
          className="w-96 bg-white shadow-md shadow-gray-400 rounded-md flex flex-col p-3 absolute right-0"
          ref={chatPannel}
        >
          <div className="w-[360px] flex flex-row justify-between gap-2 pb-3">
            <div className="font-headline font-bold text-gray-700 text-[18px]">
              {t('Chats')}
            </div>
            <div className="flex flex-row justify-end gap-3">
              <img
                src="./images/menu/option.png"
                className="p-1 bg-gray-100 hover:bg-gray-300 rounded-full cursor-pointer"
              />
              <img
                src="./images/menu/allmessenger.png"
                className="p-1 bg-gray-100 hover:bg-gray-300 rounded-full cursor-pointer"
                onClick={() => navigate('/messenger')}
              />
              <img
                src="./images/menu/newmessage.png"
                className="p-1 bg-gray-100 hover:bg-gray-300 rounded-full cursor-pointer"
                onClick={() => navigate('/messenger/new')}
              />
            </div>
          </div>
          <div className="w-[360px] py-2 relative">
            <input
              className=" bg-gray-200 pl-9 py-1 w-[360px] border-0 rounded-full font-roboto text-[13px]"
              placeholder={t('SearchMessanger')}
            />
            <img
              src="./images/menu/search.png"
              className="absolute left-[10px] top-[15px] w-[18px] h-[18px]"
            />
          </div>
          <div className="py-4 text-[13px] font-roboto font-normal text-gray-700">
            {t('NoMessagesFound')}
          </div>
          <div className="border-t-gray-400 border-t-[1px] w-[360px] mt-3 text-center p-2">
            <span
              className="font-roboto font-normal text-mycyan-dark hover:text-mycyan text-[13px]"
              onClick={() => navigate('/messenger')}
            >
              {t('SeeAllInMessenger')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMenu;
