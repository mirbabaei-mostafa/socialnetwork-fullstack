import { useEffect, useState } from 'react';
import BgLists from '../../data/backgrounds.json';
import { useTranslation } from 'react-i18next';

interface BgProps {
  postText: string;
  setShowBgBox: (value: boolean) => void;
  bgImage: string;
  setBgImage: (value: string) => void;
}

const BackgroundCordinator = ({
  postText,
  setShowBgBox,
  bgImage,
  setBgImage,
}: BgProps) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="relative m-2 w-[510px] h-44 border-2 rounded-md border-gray-400  overflow-y-scroll scrollbar-thin  scrollbar-thumb-gray-200  scrollbar-thumb-rounded-md text-[16px]">
        {bgImage ? (
          <>
            <img
              src={bgImage}
              className="relative w-[500px] h-[375px] rounded-md"
            />
            {postText && (
              <div className="absolute font-headline font-semibold text-[16px] text-gray-800 top-16 left-14 p-3 rounded-md bg-gray-400 bg-opacity-40 backdrop-blur-sm break-all w-auto max-w-[380px] block">
                {postText}
              </div>
            )}
            <img
              src="./images/menu/close.png"
              className="absolute right-4 top-4 cursor-pointer p-2 rounded-full border-2 border-gray-400 bg-gray-300 hover:bg-gray-400"
              onClick={() => {
                setBgImage('');
                setShowBgBox(false);
              }}
            />
          </>
        ) : (
          <span className="p-3 font-roboto text-[13px] text-gray-500">
            {t('SelectOneBelowBg')}
          </span>
        )}
      </div>
      <div className="flex flex-row gap-1 mx-2 justify-between items-center my-1 max-w-[510px] overflow-x-scroll scrollbar-thin  scrollbar-thumb-gray-200  scrollbar-thumb-rounded-md">
        {BgLists.map((bg, index) => {
          return (
            <img
              src={bg}
              key={index}
              className="w-7 h-7 rounded-md cursor-pointer"
              onClick={() => setBgImage(bg)}
            />
          );
        })}
      </div>
    </>
  );
};

export default BackgroundCordinator;
