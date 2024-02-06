import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ForgotInfo } from "../../redux/slices/forgotSlice";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { shallowEqual } from "react-redux";

interface Props {
  stateFN: (value: number) => void;
}

const FindSendCode = (props: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const forgotState: ForgotInfo = useAppSelector(
    (state: RootState): ForgotInfo => {
      return state.forgot as ForgotInfo;
    },
    shallowEqual
  );

  const handelSubmit = () => {};

  return (
    <>
      <div className="flex flex-row justify-start gap-3 items-center w-[510px] py-3">
        <div className="">
          <img src={forgotState.image} className="w-8 rounded-full" />
        </div>
        <div className="flex flex-col items-start">
          <span className="font-bold font-headline text-gray-700 text-[14px]">
            {forgotState.email}
          </span>
        </div>
      </div>
      <div className="w-[510px] text-left pt-7 pb-3 font-roboto font-normal text-gray-800 text-[14px]">
        {t("HowToRecieveCode")}
      </div>
      <div className="w-[510px] text-left items-center">
        <label className="font-roboto font-normal text-gray-800 text-[13px]">
          <input
            type="radio"
            name="codetype"
            value="byemail"
            className="focus:ring-0 border-2 ml-2"
          />{" "}
          {t("CodeByEmail") + " '" + forgotState.email + "'"}
        </label>
      </div>
      <div className="w-[510px] flex flex-row justify-around gap-5 pt-9 pb-4">
        <button
          onClick={handelSubmit}
          type="submit"
          className="py-2 px-4 rounded border border-mycyan-dark disabled:border-gray-600 bg-mycyan hover:bg-mycyan-dark transition-colors disabled:bg-gray-400 text-white font-bold font-roboto text-md disabled:cursor-not-allowed cursor-pointer"
        >
          {t("Continue")}
        </button>
        <button
          onClick={() => navigate("/login")}
          className="py-2 px-4 rounded border border-myorange-dark disabled:border-gray-600 bg-myorange hover:bg-myorange-dark transition-colors disabled:bg-gray-400 text-white font-bold font-roboto text-md disabled:cursor-not-allowed cursor-pointer"
        >
          {t("ItIsNotMe")}
        </button>
      </div>
    </>
  );
};

export default FindSendCode;
