import Notifications from './Notifications';
import MainMenu from './MainMenu';
import ProfileMenu from './ProfileMenu';
import ChatMenu from './ChatMenu';

const SettingMenu = () => {
  return (
    <div className="flex flex-row justify-end gap-2 pr-3">
      <MainMenu />
      <ChatMenu />
      <Notifications />
      <ProfileMenu />
    </div>
  );
};

export default SettingMenu;
