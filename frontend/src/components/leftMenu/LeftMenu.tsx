import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserInfo } from '../../redux/slices/userSlice';
import { useTranslation } from 'react-i18next';
import leftMenuList from '../../data/leftmenu.json';

interface Props {
  userInfo: UserInfo;
}

const LeftMenu = (props: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMore, setMore] = useState<boolean>(false);
  const menuMore: number = 7;

  return (
    <div className="flex flex-col items-start md:w-[310px] w-[48px]  overflow-y-scroll scrollbar-thin  scrollbar-thumb-gray-200  scrollbar-thumb-rounded-md">
      <div className="flex flex-row justify-start gap-3 rounded-md hover:bg-gray-200 p-2 items-center md:w-[294px] w-[48px] cursor-pointer">
        <img src={props?.userInfo?.image} className="w-8 rounded-full" />
        <span className="font-roboto font-normal text-[15px]">
          {props?.userInfo?.fname + ' ' + props?.userInfo?.lname}
        </span>
      </div>
      {leftMenuList.map((item, index) => {
        return index + 1 <= menuMore || isMore ? (
          <div
            className="flex flex-row justify-start gap-3 rounded-md hover:bg-gray-200 p-2 items-center md:w-[294px] w-[48px] cursor-pointer"
            onClick={() => navigate(item.link)}
            key={index}
          >
            <img src={item.image} className="w-8 rounded-full" />
            <span className="font-roboto font-normal text-[15px] hidden md:block">
              {t(item.title)}
            </span>
          </div>
        ) : (
          ''
        );
      })}
      {isMore ? (
        <div
          className="flex flex-row justify-start gap-3 rounded-md hover:bg-gray-200 p-2 items-center md:w-[294px] w-[48px] cursor-pointer"
          onClick={() => setMore(false)}
        >
          <img src="./images/menu/arrowup.png" className="w-8 rounded-full" />
          <span className="font-roboto font-normal text-[15px]">
            {t('SeeLess')}
          </span>
        </div>
      ) : (
        <div
          className="flex flex-row justify-start gap-3 rounded-md hover:bg-gray-200 p-2 items-center md:w-[294px] w-[48px] cursor-pointer"
          onClick={() => setMore(true)}
        >
          <img src="./images/menu/arrowdown.png" className="w-8 rounded-full" />
          <span className="font-roboto font-normal text-[15px]">
            {t('SeeMore')}
          </span>
        </div>
      )}
    </div>
  );
};

export default LeftMenu;
