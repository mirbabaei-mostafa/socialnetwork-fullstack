import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import ForgotHeader from "../components/forgot/ForgotHeader";
import { useState } from "react";
import FindAcount from "../components/forgot/FindAcount";
import FindSendCode from "../components/forgot/FindSendCode";
import GetResetCode from "../components/forgot/GetResetCode";
import GetNewPassword from "../components/forgot/GetNewPassword";
import { ForgotInfo } from "../redux/slices/forgotSlice";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { shallowEqual } from "react-redux";
import SpinnerBarLoader from "../components/spinners/SpinnerBarLoader";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [forgotPage, setforgotPage] = useState<number>(0);
  const forgotState: ForgotInfo = useAppSelector(
    (state: RootState): ForgotInfo => {
      return state.forgot as ForgotInfo;
    },
    shallowEqual
  );
  return (
    <div className="container flex flex-col">
      <SpinnerBarLoader isLoading={forgotState.isLoading} />
      <Helmet>
        <title>{t("ForgotPassword")}</title>
      </Helmet>
      <ForgotHeader />
      <div className="w-lvw border-2 flex flex-row justify-between items-center h-lvh text-center">
        <div className="w-[550px] flex flex-col rounded-md bg-white shadow-md shadow-gray-600 mx-auto">
          <div className="rounded-tr-md rounded-tl-md bg-mycyan-dark text-left py-2 px-3 font-bold font-headline text-white text-[18px]">
            {forgotPage === 0 && t("FindYourAccount")}
            {forgotPage === 1 && t("ResetPassword")}
            {forgotPage === 2 && t("EnterResetCode")}
            {forgotPage === 3 && t("EnterNewPassword")}
          </div>
          <div className="flex flex-col items-center p-2">
            {forgotPage === 0 && <FindAcount stateFN={setforgotPage} />}
            {forgotPage === 1 && <FindSendCode stateFN={setforgotPage} />}
            {forgotPage === 2 && <GetResetCode stateFN={setforgotPage} />}
            {forgotPage === 3 && <GetNewPassword stateFN={setforgotPage} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
