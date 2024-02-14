import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../../redux/hooks';
import { UserState } from '../../redux/slices/userSlice';
import { RootState } from '../../redux/store';
import { useTranslation } from 'react-i18next';

type Props = {
  regFn: (value: boolean) => void;
};

const CreatePostBox = (props: Props) => {
  const { t } = useTranslation();
  const userState: UserState = useAppSelector((state: RootState): UserState => {
    return state.user as UserState;
  }, shallowEqual);
  const firstName = userState.userInfo.fname;
  const firstLetter = firstName.charAt(0);
  const firstLetterCap = firstLetter.toUpperCase();
  const remainingLetters = firstName.slice(1);
  const capitalizedWord = firstLetterCap + remainingLetters;
  return (
    <div className="my-2 rounded-md shadow-sm shadow-gray-400 bg-white p-3 flex flex-col md:w-[780px] w-[360px]">
      <div className="flex flex-row gap-3 justify-between items-center md:w-[750px] w-[332px]">
        <img className="w-9 rounded-full" src={userState.userInfo.image} />
        <div
          className="w-[700px] rounded-full bg-gray-100 hover:bg-gray-300 font-headline font-normal text-[14px] text-gray-600 py-2 px-4 cursor-pointer"
          onClick={() => props.regFn(true)}
        >
          {t('WhatsOnYourMind') + ', ' + capitalizedWord}
        </div>
      </div>
      <hr className="w-[750px] my-4 bg-gray-600" />
      <div className="w-[700px] flex flex-row gap-6 justify-evenly p-2 items-center">
        <div className="flex flex-row gap-2 justify-center items-center">
          <img src="./images/menu/livevideo.png" className="w-7" />
          <span className="font-headline font-bold text-[16px] text-gray-600">
            {t('LiveVideo')}
          </span>
        </div>
        <div className="flex flex-row gap-2 justify-center items-center">
          <img src="./images/menu/photovideo.png" className="w-7" />
          <span className="font-headline font-bold text-[16px] text-gray-600">
            {t('PhotoVideo')}
          </span>
        </div>
        <div className="flex flex-row gap-2 justify-center items-center">
          <img src="./images/menu/feeling.png" className="w-7" />
          <span className="font-headline font-bold text-[16px] text-gray-600">
            {t('FeelingActivity')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreatePostBox;
