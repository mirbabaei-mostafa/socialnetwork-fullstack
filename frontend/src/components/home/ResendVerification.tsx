import { useState } from 'react';
// import { UserState } from '../../redux/slices/userSlice';
// import { useAppSelector } from '../../redux/hooks';
// import { RootState } from '../../redux/store';
// import { shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useAxiosToken from '../../hooks/useAxiosToken';

const ResendVerification = () => {
  const { t } = useTranslation();
  // const userState: UserState = useAppSelector((state: RootState): UserState => {
  //   return state.user as UserState;
  // }, shallowEqual);
  const [successMsg, setMsg] = useState<string>('');
  const [errorMsg, setError] = useState<string>('');
  const axiosPrivate = useAxiosToken();

  const reSend = async () => {
    try {
      // const controller = new AbortController();
      await axiosPrivate
        // await axios
        .post(
          '/user/resendverification'
          // , {
          //   signal: controller.signal,
          // }
        )
        .then((res) => {
          setMsg(res.data.message);
        })
        .catch((err) => {
          setError(err.message);
        });
    } catch (err: unknown | any) {
      if (!err?.response) {
        setError('ServerIsNotAccessable');
      } else if (err?.response?.data.message) {
        setError(err?.response?.data.message);
      } else {
        setError('FailedResendVerification');
      }
    }
  };

  return (
    <div className="flex flex-col my-3 p-3 rounded-md shadow-sm shadow-gray-400 bg-white">
      <span className="py-3 font-roboto text-[13px] font-bold text-gray-600">
        {t('ResendEmailVerificationMessage')}
      </span>
      <span
        className="py-2 font-roboto text-[13px] font-normal text-mycyan-dark hover:text-mycyan cursor-pointer"
        onClick={reSend}
      >
        {t('SendVerification')}
      </span>
      {successMsg && (
        <div className="py-2 font-roboto text-[13px] font-normal text-mygreen-dark">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="py-2 font-roboto text-[13px] font-normal text-red-700">
          {errorMsg}
        </div>
      )}
    </div>
  );
};

export default ResendVerification;
