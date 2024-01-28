import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface Props {
  showFN: (value: number) => void;
}

const ProfileSetting = (props: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="w-96 bg-white shadow-md shadow-gray-400 rounded-md flex flex-col p-3 absolute right-0">
      <div className="flex flex-row justify-start items-center p-2 gap-3">
        <img
          src="./images/menu/arrowleft.png"
          className="p-2 bg-gray-100 hover:bg-gray-300 rounded-full cursor-pointer"
          onClick={() => props.showFN(1)}
        />
        <span className="font-headline fonr-bold text-gray-700 text-[16px]">
          {t('SettingAndPrivacy')}
        </span>
      </div>
      <div
        className="flex flex-row justify-start gap-2 items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer"
        onClick={() => navigate('/profile/setting')}
      >
        <div className="rounded-full bg-gray-300 p-2">
          <img src="./images/menu/setting.png" />
        </div>
        <div className="font-roboto font-bold text-[15px] text-gray-600">
          {t('Setting')}
        </div>
      </div>
      <div
        className="flex flex-row justify-start gap-2 items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer"
        onClick={() => navigate('/profile/language')}
      >
        <div className="rounded-full bg-gray-300 p-2">
          <img src="./images/menu/language.png" />
        </div>
        <div className="font-roboto font-bold text-[15px] text-gray-600">
          {t('Language')}
        </div>
      </div>
      <div
        className="flex flex-row justify-start gap-2 items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer"
        onClick={() => navigate('/profile/privacycheck')}
      >
        <div className="rounded-full bg-gray-300 p-2">
          <img src="./images/menu/privacycheck.png" />
        </div>
        <div className="font-roboto font-bold text-[15px] text-gray-600">
          {t('PrivacyCheckup')}
        </div>
      </div>
      <div
        className="flex flex-row justify-start gap-2 items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer"
        onClick={() => navigate('/profile/privacycenter')}
      >
        <div className="rounded-full bg-gray-300 p-2">
          <img src="./images/menu/privacycenter.png" />
        </div>
        <div className="font-roboto font-bold text-[15px] text-gray-600">
          {t('PrivacyCenter')}
        </div>
      </div>
      <div
        className="flex flex-row justify-start gap-2 items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer"
        onClick={() => navigate('/profile/activitylog')}
      >
        <div className="rounded-full bg-gray-300 p-2">
          <img src="./images/menu/activitylog.png" />
        </div>
        <div className="font-roboto font-bold text-[15px] text-gray-600">
          {t('ActivityLog')}
        </div>
      </div>
      <div
        className="flex flex-row justify-start gap-2 items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer"
        onClick={() => navigate('/profile/feed')}
      >
        <div className="rounded-full bg-gray-300 p-2">
          <img src="./images/menu/feed.png" />
        </div>
        <div className="font-roboto font-bold text-[15px] text-gray-600">
          {t('Feed')}
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
