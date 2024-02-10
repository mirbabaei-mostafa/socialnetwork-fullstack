import { useTranslation } from 'react-i18next';

interface Props {
  error: string;
}

const LoginErrors = ({ error }: Props) => {
  const { t } = useTranslation();
  if (error.includes('400')) {
    return t('400');
  } else if (error.includes('401')) {
    return t('401');
  } else if (error.includes('402')) {
    return t('402');
  } else if (error.includes('403')) {
    return t('403');
  } else if (error.includes('404')) {
    return t('404');
  } else {
    return error;
  }
};

export default LoginErrors;
