import { useTranslation } from 'react-i18next';
import SpinnerBarLoader from '../spinners/SpinnerBarLoader';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import ErrorMsg from './ErrorMsg';
import { IoIosAlert } from 'react-icons/io';
import useScreenSizer from '../../hooks/responsive';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  RegisterState,
  doRegister,
  NewUserInfo,
} from '../../redux/slices/registerSlice';
import { RootState } from '../../redux/store';
import { shallowEqual } from 'react-redux';
import SpinnerCircleLoader from '../spinners/SpinnerCircleLoader';
import LoginErrors from '../errors/LoginErrors';
import { IoMdCloseCircle } from 'react-icons/io';
import { useState } from 'react';

type Props = {
  regFn: React.Dispatch<React.SetStateAction<boolean>>;
};

const RegisterForm = ({ regFn }: Props) => {
  const monthNames: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const genders: string[] = ['Male', 'Female', 'Indeterminate'];
  const {
    // screenSmall,
    // screenMedium,
    screenLarge,
    screenXLarge,
    screen2XLarge,
  } = useScreenSizer();
  const { t } = useTranslation();

  const [registerSucces, setRegisterSuccess] = useState<boolean>(false);

  const userState: RegisterState = useAppSelector(
    (state: RootState): RegisterState => {
      return state.user as RegisterState;
    },
    shallowEqual
  );
  const dispatch = useAppDispatch();

  const yupSchema = yup.object().shape({
    fname: yup.string().required(t('FirstNameIsRequired')),
    lname: yup.string().required(t('LastNameIsRequired')),
    email: yup.string().required(t('EmailRequired')).email(t('EmailFormat')),
    password: yup
      .string()
      .required(t('PasswordRequired'))
      .min(12, t('PasswordRequired')),
    gender: yup.string(),
    birth_year: yup.number().min(1920).max(new Date().getFullYear()),
    birth_month: yup.number().min(1).max(12),
    birth_day: yup.number().min(1).max(31),
  });
  interface NewUser extends yup.InferType<typeof yupSchema> {
    fname: string;
    lname: string;
    email: string;
    // username: string;
    password: string;
    gender: string;
    birth_year: number;
    birth_month: number;
    birth_day: number;
  }
  const {
    register,
    handleSubmit,
    getFieldState,
    reset,
    formState: { errors },
  } = useForm<NewUser>({
    resolver: yupResolver(yupSchema),
  });

  const onSubmitHandler: SubmitHandler<NewUserInfo> = async (
    data: NewUserInfo
  ) => {
    dispatch(doRegister(data));
    // reset();
  };

  return (
    <div className="w-80 rounded shadow-md bg-white p-4 m-auto">
      <SpinnerBarLoader isLoading={userState.isLoading} />
      <div className="flex flex-col justify-center w-72">
        {!registerSucces && (
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="flex flex-row justify-between items-center w-72">
              <div className=" font-headline text-xl font-bold text-gray-800 pb-4">
                {t('Signup')}
              </div>
              <div
                className="icon-normal pr-2 cursor-pointer"
                onClick={() => regFn(false)}
              >
                <IoMdCloseCircle
                  style={{ color: import.meta.env.VITE_ICON_COLOR }}
                />
              </div>
            </div>
            <div className="w-72 relative pb-4">
              {errors.fname && (
                <ErrorMsg
                  message={errors.fname?.message as string}
                  arrDir={
                    screenLarge || screenXLarge || screen2XLarge ? 'left' : 'up'
                  }
                />
              )}
              <div className="w-72 relative">
                <input
                  {...register('fname')}
                  type="text"
                  placeholder={t('FirstName')}
                  className="w-72 py-2 px-4 rounded border border-mycyan-light text-gray-800 font-roboto text-md"
                />
                {errors.fname && (
                  <span className="errorIcon">
                    <IoIosAlert
                      style={{ color: import.meta.env.VITE_ALLERT_COLOR }}
                    />
                  </span>
                )}
              </div>
            </div>
            <div className="w-72 relative pb-4">
              {errors.lname && (
                <ErrorMsg
                  message={errors.lname?.message as string}
                  arrDir={
                    screenLarge || screenXLarge || screen2XLarge
                      ? 'right'
                      : 'up'
                  }
                />
              )}
              <div className="w-72 relative">
                <input
                  {...register('lname')}
                  type="text"
                  placeholder={t('LastName')}
                  className="w-72 py-2 px-4 rounded border border-myorange text-gray-800 font-roboto text-md"
                />
                {errors.lname && (
                  <span className="errorIcon">
                    <IoIosAlert
                      style={{ color: import.meta.env.VITE_ALLERT_COLOR }}
                    />
                  </span>
                )}
              </div>
            </div>
            <div className="w-72 relative pb-4">
              {errors.email && (
                <ErrorMsg
                  message={errors.email?.message as string}
                  arrDir={
                    screenLarge || screenXLarge || screen2XLarge ? 'left' : 'up'
                  }
                />
              )}
              <div className="w-72 relative">
                <input
                  {...register('email')}
                  type="text"
                  placeholder={t('Email')}
                  className="w-72 py-2 px-4 rounded border border-mycyan text-gray-800 font-roboto text-md"
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
                  {...register('password')}
                  type="password"
                  placeholder={t('Password')}
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
                    screenLarge || screenXLarge || screen2XLarge
                      ? 'right'
                      : 'down'
                  }
                />
              )}
            </div>
            <div className="w-72 pb-2 font-sans text-gray-700 text-sm">
              {t('BirthDate')}
            </div>
            <div className="w-72 pb-4 flex flex-row justify-around items-stretch gap-3">
              <div>
                <select
                  {...register('birth_year')}
                  className="select-form border-mycyan"
                >
                  {Array.from(
                    { length: new Date().getFullYear() - 1919 },
                    (_, i) => i + 1
                  ).map((y, index) => {
                    return (
                      <option value={index + 1920} key={index}>
                        {y + 1919}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <select
                  {...register('birth_month')}
                  className="select-form border-mygreen"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(
                    (y, index) => {
                      return (
                        <option value={index} key={index}>
                          {t(monthNames[y - 1].toString())}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
              <div>
                <select
                  {...register('birth_day')}
                  className="select-form  border-myorange"
                >
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(
                    (y, index) => {
                      return (
                        <option value={index} key={index}>
                          {y}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
            </div>
            <div className="w-72 pb-2 font-sans text-gray-700 text-sm">
              {t('Gender')}
            </div>
            <div className="w-72 pb-4 flex flex-row justify-around items-stretch gap-1">
              {genders.map((g) => {
                return (
                  <div className="flex justify-around" key={g}>
                    <label className="border-mygreen-dark rounded border-2 px-2 py-2 flex items-center justify-between font-sans text-[10px]">
                      {t(g)}
                      <input
                        {...register('gender')}
                        className="focus:ring-0 border-2 ml-2"
                        type="radio"
                        name="gender"
                        value={g}
                        id={g}
                      />
                    </label>
                  </div>
                );
              })}
            </div>
            {userState.error && (
              <div className="text-red-700 font-bold text-sm font-mono pb-6 text-center">
                <LoginErrors error={userState.error} />
              </div>
            )}
            <div className="w-full pb-4">
              {!userState.isLoading ? (
                <button
                  type="submit"
                  // disabled={
                  //   !(
                  //     getFieldState('email').isDirty &&
                  //     getFieldState('password').isDirty
                  //   )
                  // }
                  className="w-full shadow-sm shadow-mygreen disabled:shadow-gray-500 py-2 px-4 rounded border border-mygreen-dark disabled:border-gray-600 bg-mygreen hover:bg-mygreen-dark transition-colors disabled:bg-gray-400 text-white font-bold font-roboto text-md disabled:cursor-not-allowed cursor-pointer"
                >
                  {t('CreateAccount')}
                </button>
              ) : (
                <SpinnerCircleLoader
                  isLoading={userState.isLoading}
                  size={30}
                />
              )}
            </div>
          </form>
        )}
        {registerSucces && (
          <div className="p-6">
            <span className="text-mygreen text-xl font-bold">
              {t('Dear')}{' '}
              {userState.userInfo.fname + ' ' + userState.userInfo.lname}
            </span>
            <p className="text-gray-700 text-lg font-normal">
              {t('VerificationEmailSended')}{' '}
              <span className="font-bold">{userState.userInfo.email}</span>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
