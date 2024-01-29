import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { UserState, signout } from "../../redux/slices/userSlice";
import { shallowEqual } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MutableRefObject, useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import ProfileSetting from "./ProfileSetting";
import ProfileHelp from "./ProfileHelp";
import ProfileDisplay from "./ProfileDisplay";

const ProfileMenu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userState: UserState = useAppSelector((state: RootState): UserState => {
    return state.user as UserState;
  }, shallowEqual);
  const dispatch = useAppDispatch();
  const [profilePannelShow, setProfilePannel] = useState<boolean>(false);
  const [menuId, setMenuId] = useState<number>(1);
  const profilePannel = useRef() as MutableRefObject<HTMLDivElement>;

  // Hook to hide search result, when user clicked outside
  useClickOutside(profilePannel, setProfilePannel);

  const signOut = () => {
    dispatch(signout());
    console.log(userState);
    // navigate("/login");
  };

  return (
    <div className="relative">
      <img
        src={userState.userInfo.image}
        className=" w-[32px] h-[32px] rounded-full border-gray-400 border-[1px] cursor-pointer"
        onClick={() => setProfilePannel(!profilePannelShow)}
      />
      <div ref={profilePannel}>
        {profilePannelShow && menuId === 1 && (
          <div className="w-96 bg-white shadow-md shadow-gray-400 rounded-md flex flex-col p-3 absolute right-0">
            {/* User Profile */}
            <div className="w-[360px] shadow-md shadow-gray-400 p-3 flex flex-col items-start rounded-md mb-3">
              <div className="w-[330px] flex flex-row justify-start gap-3 items-center rounded-md hover:bg-gray-200 mb-2 p-2">
                <img
                  src={userState.userInfo.image}
                  className=" w-[32px] h-[32px] rounded-full border-gray-400 border-[1px]"
                />
                <span className="font-headline font-bold text-gray-600 text-[16px]">
                  {userState.userInfo.fname + " " + userState.userInfo.lname}
                </span>
              </div>
              <div className="w-[330px] py-2  border-t-gray-400 border-t-[1px]">
                <Link
                  to="/profile/my"
                  className="text-mycyan-dark hover:text-mycyan font-roboto font-normal text-[12px] cursor-pointer"
                >
                  {t("SeeAllProfiles")}
                </Link>
              </div>
            </div>
            <div
              className="flex flex-row justify-between gap-2 items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer"
              onClick={() => setMenuId(2)}
            >
              <div className="flex flex-row justify-start items-center gap-2">
                <div className="rounded-full bg-gray-300 p-2">
                  <img src="./images/menu/setting.png" />
                </div>
                <div className="font-roboto font-bold text-[15px] text-gray-600">
                  {t("SettingAndPrivacy")}
                </div>
              </div>
              <div>
                <img src="./images/menu/arrowright.png" />
              </div>
            </div>
            <div
              className="flex flex-row justify-between gap-2 items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer"
              onClick={() => setMenuId(3)}
            >
              <div className="flex flex-row justify-start items-center gap-2">
                <div className="rounded-full bg-gray-300 p-2">
                  <img src="./images/menu/support.png" />
                </div>
                <div className="font-roboto font-bold text-[15px] text-gray-600">
                  {t("HelpAndSupport")}
                </div>
              </div>
              <div>
                <img src="./images/menu/arrowright.png" />
              </div>
            </div>
            <div
              className="flex flex-row justify-between gap-2 items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer"
              onClick={() => setMenuId(4)}
            >
              <div className="flex flex-row justify-start items-center gap-2">
                <div className="rounded-full bg-gray-300 p-2">
                  <img src="./images/menu/display.png" />
                </div>
                <div className="font-roboto font-bold text-[15px] text-gray-600">
                  {t("DisplayAndAccessibility")}
                </div>
              </div>
              <div>
                <img src="./images/menu/arrowright.png" />
              </div>
            </div>
            <div
              className="flex flex-row justify-start gap-2 items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer"
              onClick={() => navigate("/profile/feedback")}
            >
              <div className="rounded-full bg-gray-300 p-2">
                <img src="./images/menu/feedback.png" />
              </div>
              <div className="font-roboto font-bold text-[15px] text-gray-600">
                {t("GiveFeedback")}
              </div>
            </div>
            <div
              className="flex flex-row justify-start gap-2 items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer"
              onClick={signOut}
            >
              <div className="rounded-full bg-gray-300 p-2">
                <img src="./images/menu/logout.png" />
              </div>
              <div className="font-roboto font-bold text-[15px] text-gray-600">
                {t("LogOut")}
              </div>
            </div>
          </div>
        )}
        {profilePannelShow && menuId === 2 && (
          <ProfileSetting showFN={setMenuId} />
        )}
        {profilePannelShow && menuId === 3 && (
          <ProfileHelp showFN={setMenuId} />
        )}
        {profilePannelShow && menuId === 4 && (
          <ProfileDisplay showFN={setMenuId} />
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;
