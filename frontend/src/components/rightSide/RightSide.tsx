import { useTranslation } from 'react-i18next';

const RightSide = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-start w-[310px] p-2">
      <div className="font-headline font-bold text-gray-600 text-[16px]">
        {t('GroupConversations')}
      </div>
      <div className="flex flex-row justify-start gap-3 rounded-md hover:bg-gray-200 p-2 items-center md:w-[294px] w-[48px] cursor-pointer">
        <img
          src="./images/menu/newitem.png"
          className="w-8 rounded-full p-1 bg-gray-300"
        />
        <span
          className="font-roboto font-normal text-[15px]
        "
        >
          {t('CreateNewGroup')}
        </span>
      </div>
    </div>
  );
};

export default RightSide;
