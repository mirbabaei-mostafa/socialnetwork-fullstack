import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

type Props = {
  //   regFn: React.Dispatch<React.SetStateAction<boolean>>;
  regFn: (value: boolean) => void;
};

const CreatePost = (props: Props) => {
  const { t } = useTranslation();
  return (
    <div className="w-[550px] rounded shadow-md bg-white p-4 m-auto">
      <Helmet>
        <title>{t('CreateNewPost')}</title>
      </Helmet>
      {/* Login Form */}
      <div className="flex flex-col lg:flex-row justify-center lg:justify-center lg:gap-5 lg:mx-24 xl:mx-36 2xl:mx-60 space-y-4 items-center h-screen p-4"></div>
    </div>
  );
};

export default CreatePost;
