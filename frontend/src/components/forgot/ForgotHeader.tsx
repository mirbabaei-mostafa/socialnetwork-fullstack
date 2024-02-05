import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ForgotHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="fixed w-full h-12 bg-white shadow-md shadow-gray-400 z-40">
      <div className="flex flex-row items-center justify-between w-full px-6 py-1">
        <div
          className="w-11 px-1 py-1 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="./images/materials/logo-small.png" className="w-9" />
        </div>
        <button
          onClick={() => navigate("/login")}
          className="py-1 px-4 rounded border border-mycyan-dark bg-mycyan hover:bg-mycyan-dark transition-colors text-white font-bold font-roboto text-md"
        >
          {t("Login")}
        </button>
      </div>
    </div>
  );
};

export default ForgotHeader;
