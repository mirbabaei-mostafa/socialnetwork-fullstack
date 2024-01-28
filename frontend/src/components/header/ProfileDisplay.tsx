import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "../../hooks/useDarkSide";
import { useState } from "react";

interface Props {
  showFN: (value: number) => void;
}

const ProfileDisplay = (props: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (theme: string) => {
    setTheme(colorTheme);
    // setTheme(theme);
    setDarkSide(checked);
  };

  return (
    <div className="w-96 bg-white shadow-md shadow-gray-400 rounded-md flex flex-col p-3 absolute right-0">
      <div className="flex flex-row justify-start items-center p-2 gap-3">
        <img
          src="./images/menu/arrowleft.png"
          className="p-2 bg-gray-100 hover:bg-gray-300 rounded-full cursor-pointer"
          onClick={() => props.showFN(1)}
        />
        <span className="font-headline fonr-bold text-gray-700 text-[16px]">
          {t("DisplayAndAccessibility")}
        </span>
      </div>
      <div className="flex flex-row justify-start gap-2 items-start p-2 rounded-md hover:bg-gray-200 cursor-pointer">
        <div className="rounded-full bg-gray-300 p-2">
          <img src="./images/menu/display.png" />
        </div>
        <div className="flex flex-col items-start">
          <span className="font-roboto font-bold text-[15px] text-gray-700 pb-2">
            {t("DarkMode")}
          </span>
          <span className="font-roboto font-normal text-[13px] text-gray-500">
            {t("AdjustDarkMode")}
          </span>
          <label className="font-roboto font-bold text-[13px] text-gray-700 items-center pt-3 pb-2">
            <input
              type="radio"
              name="darkmode"
              value={1}
              id={"on"}
              className="focus:ring-0 border-2 mr-2"
              onClick={() => toggleDarkMode("dark")}
            />
            {t("On")}
          </label>
          <label className="font-roboto font-bold text-[13px] text-gray-700 items-center pt-2 pb-3">
            <input
              type="radio"
              name="darkmode"
              value={0}
              id={"off"}
              className="focus:ring-0 border-2 mr-2"
            />
            {t("Off")}
          </label>
          <div>
            <DarkModeSwitch
              checked={darkSide}
              onChange={toggleDarkMode}
              size={56}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-start gap-2 items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer">
        <div className="rounded-full bg-gray-300 p-2">
          <img src="./images/menu/supportinbox.png" />
        </div>
        <div className="font-roboto font-bold text-[15px] text-gray-600">
          {t("SupportInbox")}
        </div>
      </div>
      <div
        className="flex flex-row justify-start gap-2 items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer"
        onClick={() => navigate("/profile/reportproblem")}
      >
        <div className="rounded-full bg-gray-300 p-2">
          <img src="./images/menu/reportproblem.png" />
        </div>
        <div className="font-roboto font-bold text-[15px] text-gray-600">
          {t("ReportAProblem")}
        </div>
      </div>
    </div>
  );
};

export default ProfileDisplay;
