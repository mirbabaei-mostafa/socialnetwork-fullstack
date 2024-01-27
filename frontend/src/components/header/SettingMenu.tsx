import { IoIosChatbubbles } from 'react-icons/io';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { UserState } from '../../redux/slices/userSlice';
import { shallowEqual } from 'react-redux';
import Notifications from './Notifications';
import MainMenu from './MainMenu';

const SettingMenu = () => {
  const userState: UserState = useAppSelector((state: RootState): UserState => {
    return state.user as UserState;
  }, shallowEqual);
  return (
    <div className="flex flex-row justify-end gap-2 pr-3">
      <MainMenu />
      <div className="p-1 bg-gray-200 hover:bg-gray-400 rounded-full cursor-pointer">
        <IoIosChatbubbles size={24} />
      </div>
      <Notifications />
      <div className="">
        <img
          src={userState.userInfo.image}
          className=" w-[32px] h-[32px] rounded-full border-gray-400 border-[1px]"
        />
      </div>
    </div>
  );
};

export default SettingMenu;
