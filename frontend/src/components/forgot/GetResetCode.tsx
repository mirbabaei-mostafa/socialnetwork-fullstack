import { useEffect, useState } from 'react';
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
import VerificationInput from 'react-verification-input';
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

  const onSubmitHandel = (value: string) => {
    dispatch(verifyResetCode({ email: forgotState.email, code: value }));
  };

  useEffect(() => {
    if (forgotState.verifySuccess) {
      props.stateFN(3);
    }
    if (!forgotState.error) {
      setResetCode('');
    }
  }, [forgotState]);

  const cancelReset = () => {
    dispatch(cancelResetCode({ email: forgotState.email }));
    navigate('/login');
  };

  return (
    <>
      <div className="w-[510px] text-left pt-7 pb-3 font-roboto font-normal text-gray-800 text-[14px]">
        {t('HowToRecieveCode')}
      </div>
      <div>
        <VerificationInput
          length={6}
          value={resetCode}
          validChars="A-Za-z0-9"
          placeholder=""
          autoFocus
          onChange={setResetCode}
          onComplete={onSubmitHandel}
          classNames={{
            container: 'vi-container',
            character: 'vi-character',
            characterInactive: 'vi-character--inactive',
            characterSelected: 'vi-character--selected',
            characterFilled: 'vi-character--filled',
          }}
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
