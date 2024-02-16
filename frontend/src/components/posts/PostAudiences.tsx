import { useTranslation } from 'react-i18next';
import PostAudienceArray from '../../data/postAudience.json';
import { useState } from 'react';
import { Audiences } from './CreatePost';

type Props = {
  visableFN: (value: number) => void;
  audienceFN: (value: string) => void;
};

const PostAudiences = (props: Props) => {
  const [defaultAudience, setDefaultAudience] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <>
      <form>
        <div className="flex flex-row justify-center items-center text-center font-headline font-bold text-gray-700 text-[18px] my-3 w-[530px]">
          {t('PostAudience')}
          <img
            src="./images/menu/arrowleft.png"
            className="absolute p-2 cursor-pointer left-2 w-7 h-7 rounded-full bg-gray-300"
            onClick={() => props.visableFN(0)}
          />
        </div>
        <hr className="bg-gray-400 w-[530px]" />
        <div className="flex flex-col justify-start p-3">
          <div className="font-headline font-bold text-gray-700">
            {t('WhoCanSeeYourPost')}
          </div>
          <div className="font-roboto font-normal text-gray-600">
            {t('AudiencceDescripotion')}
          </div>
        </div>
        <div className="h-60 px-2 flex flex-col overflow-y-scroll scrollbar-thin  scrollbar-thumb-gray-200  scrollbar-thumb-rounded-md">
          {PostAudienceArray.map((audience: Audiences, index) => {
            return (
              <div
                className="flex flex-row gap-3 p-2 rounded-md hover:bg-gray-100 items-center"
                key={index}
              >
                <img
                  src={audience.image}
                  className="w-14 h-14 p-3 bg-gray-300 rounded-full"
                />
                <div className="flex flex-col justify-start w-[380px]">
                  <span className="font-roboto font-bold text-[15px] text-gray-700">
                    {t(audience.title)}
                  </span>
                  <span className="font-roboto font-normal text-[13px] text-gray-500">
                    {t(audience.desc)}
                  </span>
                </div>
                <input
                  type="radio"
                  name="audienceradio"
                  className=""
                  onClick={() => props.audienceFN(audience.title)}
                />
              </div>
            );
          })}
        </div>
        <hr className="bg-gray-400 w-[530px]" />
        <div className="font-roboto font-bold text-[13px] text-gray-800 p-3 py-2">
          <label>
            <input
              type="checkbox"
              className="border-2 border-gray-500 rounded-md w-6 h-6"
              onClick={() => setDefaultAudience(!defaultAudience)}
            />{' '}
            <span className="pl-2">{t('SetAsDefaultAudience')}</span>
          </label>
        </div>
        <div className="flex flex-row gap-3 justify-end p-3">
          <button
            className="py-2 px-5 rounded border border-myorange-dark disabled:border-gray-600 bg-myorange hover:bg-myorange-dark transition-colors disabled:bg-gray-400 text-white font-bold font-roboto text-md disabled:cursor-not-allowed cursor-pointer"
            onClick={() => props.visableFN(0)}
          >
            {t('Cancel')}
          </button>
          <button
            onClick={() => props.visableFN(0)}
            className="shadow-sm shadow-mygreen disabled:shadow-gray-500 py-2 px-5 rounded border border-mygreen-dark disabled:border-gray-600 bg-mygreen hover:bg-mygreen-dark transition-colors disabled:bg-gray-400 text-white font-bold font-roboto text-md disabled:cursor-not-allowed cursor-pointer"
          >
            {defaultAudience ? t('Save') : t('Done')}
          </button>
        </div>
      </form>
    </>
  );
};

export default PostAudiences;
