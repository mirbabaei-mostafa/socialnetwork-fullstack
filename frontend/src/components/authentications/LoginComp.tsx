import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useScreenSizer from "../../hooks/responsive";
import { IoIosAlert } from "react-icons/io";
import ErrorMsg from "./ErrorMsg";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import SpinnerCircleLoader from "../spinners/SpinnerCircleLoader";
import SpinnerBarLoader from "../spinners/SpinnerBarLoader";
import { UserState, doAuth } from "../../redux/slices/userSlice";
import { RootState } from "../../redux/store";
import { shallowEqual } from "react-redux";
import LoginErrors from "../errors/LoginErrors";

type Props = {
  regFn: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginComp = ({ regFn }: Props) => {
  const {
    // screenSmall,
    // screenMedium,
    screenLarge,
    screenXLarge,
    screen2XLarge,
  } = useScreenSizer();
  const { t } = useTranslation();

  const navigate = useNavigate();
  const userState: UserState = useAppSelector((state: RootState): UserState => {
    return state.user as UserState;
  }, shallowEqual);
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
    dispatch(doAuth(data));
  };

  // console.log(stateInfo);
  return (
    <div className="w-80 rounded shadow-md bg-white p-4 m-auto">
      <SpinnerBarLoader isLoading={userState.isLoading} />
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
            {!userState.isLoading ? (
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
            ) : (
              <SpinnerCircleLoader isLoading={userState.isLoading} size={30} />
            )}
          </div>
          {userState.error && (
            <div className="text-red-700 font-bold text-sm font-mono pb-6 text-center">
              <LoginErrors error={userState.error} />
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
        </form>
        <div className="w-full pt-6 pb-2">
          <button
            onClick={() => regFn(true)}
            className="w-full py-2 px-4 rounded border border-mygreen-dark bg-mygreen hover:bg-mygreen-dark transition-colors text-white font-bold font-roboto text-md"
          >
            {t("CreateAccount")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComp;
