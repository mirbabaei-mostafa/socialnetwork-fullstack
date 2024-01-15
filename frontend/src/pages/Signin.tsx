import React from "react";
import { useTranslation } from "react-i18next";
import LoginComp from "../components/authentications/LoginComp";

const Signin = () => {
  const { t } = useTranslation();
  return (
    <div>
      {/* Login Form */}
      <div className="flex flex-col lg:flex-row justify-center lg:justify-center lg:gap-5 lg:mx-24 xl:mx-36 2xl:mx-60 space-y-4 items-center h-screen p-4">
        <div className="flex flex-col justify-center items-center lg:items-start">
          <div>
            <img
              src="./images/materials/logo-medium.png"
              className="w-28 lg:w-36 lg:pl-5 mt-3"
            />
          </div>
          <div className="font-headline text-lg lg:text-2xl font-bold py-4 text-center lg:text-left">
            {t("LoginMoto")}
          </div>
        </div>
        <div>
          <LoginComp />
        </div>
      </div>
      {/* Sign up Form */}
      <div></div>
    </div>
  );
};

export default Signin;
