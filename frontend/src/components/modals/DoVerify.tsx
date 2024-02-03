import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { UserState, doVerify } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { t } from "i18next";
import { RootState } from "../../redux/store";
import { shallowEqual } from "react-redux";
import useClickOutside from "../../hooks/useClickOutside";

interface Props {
  accesstoken: string;
}

const DoVerify = (props: Props) => {
  const verifyPannel = useRef() as MutableRefObject<HTMLDivElement>;
  const [isVerifyPannel, setVerifyPannel] = useState<boolean>(false);

  // Hook to hide search result, when user clicked outside
  useClickOutside(verifyPannel, setVerifyPannel);

  const dispatch = useAppDispatch();
  const userState: UserState = useAppSelector((state: RootState): UserState => {
    return state.user as UserState;
  }, shallowEqual);
  const navigate = useNavigate();

  console.log(props.accesstoken);

  useEffect(() => {
    if (props.accesstoken) {
      dispatch(doVerify(props.accesstoken));
      const timeOut = setTimeout(() => navigate("/"), 2500);
      return () => clearTimeout(timeOut);
    }
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center z-20 inset-0 bg-gray-500 bg-opacity-80"
      onClick={() => setVerifyPannel(!isVerifyPannel)}
    >
      <div
        className="w-72 p-3 rounded-md bg-white shadow-md shadow-gray-500 flex flex-col items-center justify-center"
        ref={verifyPannel}
      >
        <span className="font-headline font-bold text-gray-700 text-[18px] py-3">
          {t("ActivationAccount")}
        </span>
        {userState.error ? (
          <span className="font-roboto font-bold text-[13px] text-red-700 py-3">
            {t(userState.error)}
          </span>
        ) : (
          <span className="font-roboto font-bold text-[13px] text-mygreen-dark py-3">
            {t("AccountVerified")}
          </span>
        )}
        {userState.isLoading && (
          <BeatLoader
            size={24}
            margin={12}
            color={import.meta.env.VITE_SPINER_COLOR}
          />
        )}
      </div>
    </div>
  );
};

export default DoVerify;
