import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

interface Props {
  showFN: (value: number) => void;
}

const ProfileDisplay = (props: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="w-96 bg-white shadow-md shadow-gray-400 rounded-md flex flex-col p-3 absolute right-0 overflow-y-scroll scrollbar-thin  scrollbar-thumb-gray-200  scrollbar-thumb-rounded-md">
      <div className="flex flex-row justify-start items-center p-2 gap-3">
        <img
          src="./images/menu/arrowleft.png"
          className="p-2 bg-gray-100 hover:bg-gray-300 rounded-full cursor-pointer"
          onClick={() => props.showFN(1)}
        />
        <span className="font-headline fonr-bold text-gray-700 text-[16px]">
          {t('DisplayAndAccessibility')}
        </span>
      </div>
      <div className="flex flex-row justify-start gap-2 items-start p-2 rounded-md cursor-pointer">
        <div className="rounded-full bg-gray-300 p-2">
          <img src="./images/menu/display.png" />
        </div>
        <div className="flex flex-col items-start">
          <span className="font-roboto font-bold text-[15px] text-gray-700 pb-2">
            {t('DarkMode')}
          </span>
          <span className="font-roboto font-normal text-[13px] text-gray-500">
            {t('AdjustDarkMode')}
          </span>
          <label className="font-roboto font-bold text-[13px] text-gray-700 items-center pt-3 pb-2 hover:bg-gray-200 w-[300px] rounded-lg px-2 cursor-pointer">
            <input
              type="radio"
              name="darkmode"
              value={1}
              id={'on'}
              className="focus:ring-0 border-2 mr-2"
            />
            {t('On')}
          </label>
          <label className="font-roboto font-bold text-[13px] text-gray-700 items-center pt-2 pb-3 hover:bg-gray-200 w-[300px] rounded-lg px-2 cursor-pointer">
            <input
              type="radio"
              name="darkmode"
              value={0}
              id={'off'}
              className="focus:ring-0 border-2 mr-2"
            />
            {t('Off')}
          </label>
        </div>
      </div>
      <div className="flex flex-row justify-start gap-2 items-start p-2 rounded-md cursor-pointer">
        <div className="rounded-full bg-gray-300 p-2">
          <img src="./images/menu/compactmode.png" />
        </div>
        <div className="flex flex-col items-start">
          <span className="font-roboto font-bold text-[15px] text-gray-700 pb-2">
            {t('CompactMode')}
          </span>
          <span className="font-roboto font-normal text-[13px] text-gray-500">
            {t('CompactModeDesc')}
          </span>
          <label className="font-roboto font-bold text-[13px] text-gray-700 items-center pt-3 pb-2 hover:bg-gray-200 w-[300px] rounded-lg px-2 cursor-pointer">
            <input
              type="radio"
              name="compactmode"
              value={1}
              id={'on'}
              className="focus:ring-0 border-2 mr-2"
            />
            {t('On')}
          </label>
          <label className="font-roboto font-bold text-[13px] text-gray-700 items-center pt-2 pb-3 hover:bg-gray-200 w-[300px] rounded-lg px-2 cursor-pointer">
            <input
              type="radio"
              name="compactmode"
              value={0}
              id={'off'}
              className="focus:ring-0 border-2 mr-2"
            />
            {t('Off')}
          </label>
        </div>
      </div>
      <div className="flex flex-row justify-start gap-2 items-start p-2 rounded-md cursor-pointer">
        <div className="rounded-full bg-gray-300 p-2">
          <img src="./images/menu/showpreview.png" />
        </div>
        <div className="flex flex-col items-start">
          <span className="font-roboto font-bold text-[15px] text-gray-700 pb-2">
            {t('ShowPreviewsOfLinks')}
          </span>
          <span className="font-roboto font-normal text-[13px] text-gray-500">
            {t('ShowPreviewsOfLinksDesc')}
          </span>
          <label className="font-roboto font-bold text-[13px] text-gray-700 items-center pt-3 pb-2 hover:bg-gray-200 w-[300px] rounded-lg px-2 cursor-pointer">
            <input
              type="radio"
              name="showpreview"
              value={1}
              id={'hovering'}
              className="focus:ring-0 border-2 mr-2"
            />
            {t('ShowPreviewHovering')}
          </label>
          <label className="font-roboto font-bold text-[13px] text-gray-700 items-center pt-2 pb-3 hover:bg-gray-200 w-[300px] rounded-lg px-2 cursor-pointer">
            <input
              type="radio"
              name="showpreview"
              value={0}
              id={'clicking'}
              className="focus:ring-0 border-2 mr-2"
            />
            {t('ShowPreviewClicking')}
          </label>
          <label className="font-roboto font-bold text-[13px] text-gray-700 items-center pt-2 pb-3 hover:bg-gray-200 w-[300px] rounded-lg px-2 cursor-pointer">
            <input
              type="radio"
              name="showpreview"
              value={0}
              id={'dontpreview'}
              className="focus:ring-0 border-2 mr-2"
            />
            {t('DontShowPreview')}
          </label>
        </div>
      </div>
      <div className="flex flex-row justify-start gap-2 items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer">
        <div className="rounded-full bg-gray-300 p-2">
          <img src="./images/menu/keyboard.png" />
        </div>
        <div className="font-roboto font-bold text-[15px] text-gray-600">
          {t('Keyboard')}
        </div>
      </div>
    </div>
  );
};

export default ProfileDisplay;
