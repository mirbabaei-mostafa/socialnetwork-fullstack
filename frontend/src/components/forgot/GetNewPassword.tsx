import * as yup from 'yup';
import { ForgotProps } from '../../utils/type';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ForgotInfo } from '../../redux/slices/forgotSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { shallowEqual } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorMsg from '../authentications/ErrorMsg';
import useScreenSizer from '../../hooks/responsive';
import { IoIosAlert } from 'react-icons/io';

interface PasswordI {
  newpassword: string;
  newpasswordconfirm: string;
}

const GetNewPassword = (props: ForgotProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const forgotState: ForgotInfo = useAppSelector(
    (state: RootState): ForgotInfo => {
      return state.forgot as ForgotInfo;
    },
    shallowEqual
  );
  const dispatch = useAppDispatch();

  const {
    // screenSmall,
    // screenMedium,
    screenLarge,
    screenXLarge,
    screen2XLarge,
  } = useScreenSizer();

  const yupSchema = yup.object().shape({
    newpassword: yup
      .string()
      .required(t('PasswordRequired'))
      .min(12, t('PasswordRequired')),
    newpasswordconfirm: yup
      .string()
      .required(t('ConfirmPasswordRequired'))
      .min(12, t('ConfirmPasswordRequired')),
  });
  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { errors, isDirty, isValid },
  } = useForm<PasswordI>({
    resolver: yupResolver(yupSchema),
  });

  const onSubmitHandler: SubmitHandler<PasswordI> = async (data: PasswordI) => {
    console.log(data);
    //   dispatch(findUserByEmail(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="w-96 text-left pt-6 pb-2 font-roboto font-normal text-gray-800 text-[14px] text-center">
        {t('NewPasswordAndConfirm')}
      </div>
      <div className="w-96 relative text-center py-2">
        {errors.newpassword && (
          <ErrorMsg
            message={errors.newpassword?.message as string}
            arrDir={
              screenLarge || screenXLarge || screen2XLarge ? 'left' : 'up'
            }
          />
        )}
        <div className="w-[360px] relative mx-5">
          <input
            {...register('newpassword')}
            type="password"
            placeholder={t('Password')}
            name="newpassword"
            className="border-2 border-myorange-dark rounded-md outline-none font-roboto font-normal text-[15px] w-[360px]"
          />
          {errors.newpassword && (
            <span className="errorIcon">
              <IoIosAlert
                style={{ color: import.meta.env.VITE_ALLERT_COLOR }}
              />
            </span>
          )}
        </div>
      </div>
      <div className="w-96 relative text-center py-2">
        {errors.newpasswordconfirm && (
          <ErrorMsg
            message={errors.newpasswordconfirm?.message as string}
            arrDir={
              screenLarge || screenXLarge || screen2XLarge ? 'right' : 'up'
            }
          />
        )}
        <div className="w-[360px] relative ml-5">
          <input
            {...register('newpasswordconfirm')}
            type="password"
            placeholder={t('ConfirmPassword')}
            name="newpasswordconfirm"
            className="border-2 border-myorange-dark rounded-md outline-none font-roboto font-normal text-[15px] w-[360px]"
          />
          {errors.newpasswordconfirm && (
            <span className="errorIcon">
              <IoIosAlert
                style={{ color: import.meta.env.VITE_ALLERT_COLOR }}
              />
            </span>
          )}
        </div>
      </div>
      {forgotState.error && (
        <div className="font-roboto font-bold text-[13px] text-red-700">
          {forgotState.error}
        </div>
      )}
      <div className="w-[510px] flex flex-row justify-around gap-5 pt-9 pb-4">
        <button
          type="submit"
          className="py-2 px-4 rounded border border-mycyan-dark disabled:border-gray-600 bg-mycyan hover:bg-mycyan-dark transition-colors disabled:bg-gray-400 text-white font-bold font-roboto text-md disabled:cursor-not-allowed cursor-pointer"
        >
          {t('Change')}
        </button>
        <button className="py-2 px-4 rounded border border-myorange-dark disabled:border-gray-600 bg-myorange hover:bg-myorange-dark transition-colors disabled:bg-gray-400 text-white font-bold font-roboto text-md disabled:cursor-not-allowed cursor-pointer">
          {t('Cancel')}
        </button>
      </div>
    </form>
  );
};

export default GetNewPassword;
