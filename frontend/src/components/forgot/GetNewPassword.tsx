import React from 'react';
import { ForgotProps } from '../../utils/type';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ForgotInfo } from '../../redux/slices/forgotSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { shallowEqual } from 'react-redux';

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
  return <div>GetNewPassword</div>;
};

export default GetNewPassword;
