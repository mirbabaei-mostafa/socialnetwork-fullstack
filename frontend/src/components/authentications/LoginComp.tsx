import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useScreenSizer from "../../hooks/responsive";
import authAction from "../../redux/actions/authentication";
import { IoIosAlert } from "react-icons/io";
import ErrorMsg from "./ErrorMsg";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { UserState } from "../../redux/slices/userSlice";
import {
  ACT_LOGIN_FAILED,
  ACT_LOGIN_REQUEST,
  ACT_LOGIN_SUCCESS,
} from "../../redux/types";
import axios from "../../utils/axios";
import { useState } from "react";

const LoginComp = () => {
  const {
    // screenSmall,
    // screenMedium,
    screenLarge,
    screenXLarge,
    screen2XLarge,
  } = useScreenSizer();
  const { t } = useTranslation();

  const [errorMessage, setError] = useState<string>("");
  const navigate = useNavigate();
  const stateInfo: UserState = useAppSelector((state) => state.user);
  // const stateInfo: UserState = useAppSelector(() => store.getState().user);
  const dispatch = useAppDispatch();

  const yupSchema = yup.object().shape({
    email: yup.string().required(t("EmailRequired")).email(t("EmailFormat")),
    password: yup.string().required(t("PasswordRequired")),
  });
  interface UserI extends yup.InferType<typeof yupSchema> {
    email: string;
    password: string;
  }
  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { errors, isDirty, isValid },
  } = useForm<UserI>({
    resolver: yupResolver(yupSchema),
  });

  const onSubmitHandler: SubmitHandler<UserI> = async (data: UserI) => {
    dispatch(authAction(data, setError));
    // dispatch(authentication({ type: ACT_LOGIN_REQUEST }));
    // try {
    //   await axios
    //     .post("/api/auth", JSON.stringify(data), {
    //       headers: { "Content-Type": "application/json" },
    //       withCredentials: true,
    //     })
    //     .then((res) => {
    //       dispatch(
    //         authentication({
    //           type: ACT_LOGIN_SUCCESS,
    //           payload: res?.data,
    //         })
    //       );
    //     });
    // } catch (err: unknown | any) {
    //   let errMsg: string = "";
    //   let errStatus: number = 0;
    //   if (!err?.response) {
    //     errMsg = "ServerIsNotAccessable";
    //     errStatus = 503;
    //   } else if (err?.response?.status === 400) {
    //     errStatus = err?.response?.status;
    //     err?.response?.data.error
    //       ? (errMsg = err?.response?.data.error)
    //       : (errMsg = "InvalidEmailPassword");
    //   } else if (err?.response?.status === 401) {
    //     errStatus = err?.response?.status;
    //     err?.response?.data.error
    //       ? (errMsg = err?.response?.data.error)
    //       : (errMsg = "IncorectEmailPassword");
    //   } else if (err?.response?.status === 403) {
    //     errStatus = err?.response?.status;
    //     err?.response?.data.error
    //       ? (errMsg = err?.response?.data.error)
    //       : (errMsg = "Forbidden");
    //   } else if (err instanceof Error) {
    //     errMsg = err.message;
    //   } else {
    //     errMsg = "GeneralError";
    //   }
    //   dispatch(
    //     authentication({
    //       type: ACT_LOGIN_FAILED,
    //       payload: { error: errMsg, status: errStatus },
    //     })
    //   );
    // }
  };

  console.log(stateInfo);
  return (
    <div className="w-80 rounded shadow-md bg-white p-4 m-auto">
      <div className="w-72 flex flex-col items-center">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="w-72 relative pb-4">
            {errors.email && (
              <ErrorMsg
                message={errors.email?.message as string}
                arrDir={
                  screenLarge || screenXLarge || screen2XLarge ? "left" : "up"
                }
              />
            )}
            <div className="w-72 relative">
              <input
                {...register("email")}
                type="text"
                placeholder={t("Email")}
                className="w-72 py-2 px-4 rounded border border-myorange text-gray-800 font-roboto text-md"
              />
              {errors.email && (
                <span className="errorIcon">
                  <IoIosAlert
                    style={{ color: import.meta.env.VITE_ALLERT_COLOR }}
                  />
                </span>
              )}
            </div>
          </div>
          <div className="w-72 relative pb-4">
            <div className="w-72">
              <input
                {...register("password")}
                type="password"
                placeholder={t("Password")}
                className="w-72 py-2 px-4 rounded border border-mygreen"
              />
              {errors.email && (
                <span className="errorIcon">
                  <IoIosAlert
                    style={{ color: import.meta.env.VITE_ALLERT_COLOR }}
                  />
                </span>
              )}
            </div>
            {errors.password && (
              <ErrorMsg
                message={errors.password?.message as string}
                arrDir={
                  screenLarge || screenXLarge || screen2XLarge ? "left" : "down"
                }
              />
            )}
          </div>
          <div className="w-full pb-4">
            <button
              type="submit"
              disabled={
                !(
                  getFieldState("email").isDirty &&
                  getFieldState("password").isDirty
                )
              }
              className="w-full py-2 px-4 rounded border border-mycyan-dark disabled:border-gray-600 bg-mycyan hover:bg-mycyan-dark transition-colors disabled:bg-gray-400 text-white font-bold font-roboto text-md disabled:cursor-not-allowed cursor-pointer"
            >
              {t("Login")}
            </button>
          </div>
          {/* {errorMessage && ( */}
          {stateInfo.error && (
            <div className="text-red-700 font-bold text-md font-mono pb-6 text-center">
              {t(errorMessage)}
            </div>
          )}
          <div className="w-full pb-5">
            <Link
              to={"/api/forgot"}
              className="block w-full text-md font-roboto text-mycyan-dark hover:text-myorange-dark text-center "
            >
              {t("ForgotPassword")}
            </Link>
          </div>
          <div className="w-full pt-6 pb-2">
            <button className="w-full py-2 px-4 rounded border border-mygreen-dark bg-mygreen hover:bg-mygreen-dark transition-colors text-white font-bold font-roboto text-md">
              {t("CreateAccount")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComp;
