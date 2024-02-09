import { useState } from 'react';
import { ForgotProps } from '../../utils/type';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  ForgotInfo,
  cancelResetCode,
  verifyResetCode,
} from '../../redux/slices/forgotSlice';
import { RootState } from '../../redux/store';
import { shallowEqual } from 'react-redux';
import ReactInputVerificationCode from 'react-input-verification-code';
import { useNavigate } from 'react-router-dom';

const GetResetCode = (props: ForgotProps) => {
  const { t } = useTranslation();
  const [resetCode, setResetCode] = useState<string>('');
  const navigate = useNavigate();
  const forgotState: ForgotInfo = useAppSelector(
    (state: RootState): ForgotInfo => {
      return state.forgot as ForgotInfo;
    },
    shallowEqual
  );
  const dispatch = useAppDispatch();

  const onSubmitHandel = () => {
    dispatch(verifyResetCode({ email: forgotState.email, code: resetCode }));
    if (forgotState.success) {
      props.stateFN(3);
    }
  };

  const cancelReset = () => {
    dispatch(cancelResetCode({ email: forgotState.email }));
    navigate('/login');
  };

  return (
    <>
      <div className="w-[510px] text-left pt-7 pb-3 font-roboto font-normal text-gray-800 text-[14px]">
        {t('HowToRecieveCode')}
      </div>
      <div className="custom-styles">
        <ReactInputVerificationCode
          autoFocus
          placeholder=""
          value={resetCode}
          onChange={setResetCode}
          onCompleted={onSubmitHandel}
          length={6}
          type="text"
        />
      </div>
      {forgotState.error && (
        <div className="font-roboto font-bold text-[13px] text-red-700">
          {forgotState.error}
        </div>
      )}
      <div className="w-[510px] flex flex-row justify-around gap-5 pt-9 pb-4">
        <button
          onClick={onSubmitHandel}
          type="submit"
          className="py-2 px-4 rounded border border-mycyan-dark disabled:border-gray-600 bg-mycyan hover:bg-mycyan-dark transition-colors disabled:bg-gray-400 text-white font-bold font-roboto text-md disabled:cursor-not-allowed cursor-pointer"
        >
          {t('Continue')}
        </button>
        <button
          onClick={cancelReset}
          className="py-2 px-4 rounded border border-myorange-dark disabled:border-gray-600 bg-myorange hover:bg-myorange-dark transition-colors disabled:bg-gray-400 text-white font-bold font-roboto text-md disabled:cursor-not-allowed cursor-pointer"
        >
          {t('Cancel')}
        </button>
      </div>
    </>
  );
};

export default GetResetCode;
