import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import ForgotHeader from "../components/forgot/ForgotHeader";
import { useState } from "react";
import FindAcount from "../components/forgot/FindAcount";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [forgotState, setForgotState] = useState<number>(0);
  return (
    <div className="container flex flex-col">
      <Helmet>
        <title>{t("ForgotPassword")}</title>
      </Helmet>
      <ForgotHeader />
      <div className="w-full border-2 flex flex-row justify-between items-center h-lvh text-center">
        <div className="w-[550px] flex flex-col rounded-md bg-white shadow-md shadow-gray-600 mx-auto">
          <div className="rounded-tr-md rounded-tl-md bg-mygreen-dark text-left py-1 px-3 font-bold font-headline text-white text-[18px]">
            {forgotState === 0 && t("FindYourAccount")}
          </div>
          <div className="flex flex-col items-center p-2">
            {forgotState === 0 && <FindAcount />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
