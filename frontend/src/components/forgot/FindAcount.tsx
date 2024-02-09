import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  EmailI,
  ForgotInfo,
  findUserByEmail,
} from '../../redux/slices/forgotSlice';
import { shallowEqual } from 'react-redux';
import { RootState } from '../../redux/store';
import { ForgotProps } from '../../utils/type';

const FindAcount = (props: ForgotProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const forgotState: ForgotInfo = useAppSelector(
    (state: RootState): ForgotInfo => {
      return state.forgot as ForgotInfo;
    },
    shallowEqual
  );
  const dispatch = useAppDispatch();
  const yupSchema = yup.object().shape({
    email: yup.string().required(t('EmailRequired')).email(t('EmailFormat')),
  });
  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { errors, isDirty, isValid },
  } = useForm<EmailI>({
    resolver: yupResolver(yupSchema),
  });

  const onSubmitHandler: SubmitHandler<EmailI> = async (data: EmailI) => {
    dispatch(findUserByEmail(data));
    if (forgotState.success) {
      props.stateFN(1);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="font-normal font-roboto text-[15px] text-gray-700 py-3">
          {t('EnterEmail')}
        </div>
        <div className="py-4">
          <input
            className="w-[400px] py-2 px-4 rounded border border-myorange text-gray-800 font-roboto text-md"
            type="text"
            {...register('email')}
            placeholder={t('Email')}
          />
        </div>
        {forgotState.error && (
          <div className="font-roboto font-normal text-[14px] text-red-700 py-4">
            {forgotState.error}
          </div>
        )}
        <div className="flex flex-row justify-around gap-5 py-6">
          <button
            type="submit"
            disabled={!getFieldState('email').isDirty}
            className="w-full py-2 px-4 rounded border border-mycyan-dark disabled:border-gray-600 bg-mycyan hover:bg-mycyan-dark transition-colors disabled:bg-gray-400 text-white font-bold font-roboto text-md disabled:cursor-not-allowed cursor-pointer"
          >
            {t('Find')}
          </button>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-2 px-4 rounded border border-mygreen-dark disabled:border-gray-600 bg-mygreen hover:bg-mygreen-dark transition-colors disabled:bg-gray-400 text-white font-bold font-roboto text-md disabled:cursor-not-allowed cursor-pointer"
          >
            {t('Cancel')}
          </button>
        </div>
      </form>
    </>
  );
};

export default FindAcount;
