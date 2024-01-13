import React from "react";
import { useTranslation } from "react-i18next";
import LoginComp from "../components/authentications/LoginComp";

const Signin = () => {
  const { t } = useTranslation();
  return (
    <div className="">
      {/* Login Form */}
      <div>
        <div className="">
          <div>
            <img src="./images/materials/logo-medium.png" />
          </div>
          <div className="font-headline text-lg font-bold">
            {t("LoginMoto")}
          </div>
          <LoginComp />
        </div>
      </div>
      {/* Sign up Form */}
      <div></div>
    </div>
  );
};

export default Signin;
