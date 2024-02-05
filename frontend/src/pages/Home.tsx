import { Helmet } from 'react-helmet-async';
import Header from '../components/header/Header';
import LeftMenu from '../components/leftMenu/LeftMenu';
import Posts from '../components/posts/Posts';
import RightSide from '../components/rightSide/RightSide';
import { useTranslation } from 'react-i18next';
import { UserState } from '../redux/slices/userSlice';
import { RootState } from '../redux/store';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../redux/hooks';
import { useParams } from 'react-router-dom';
import DoVerify from '../components/modals/DoVerify';

const Home = () => {
  const userState: UserState = useAppSelector((state: RootState): UserState => {
    return state.user as UserState;
  }, shallowEqual);
  const { t } = useTranslation();
  const { accesstoken } = useParams();
  return (
    <div className="container flex flex-col">
      <Helmet>
        <title>{t('SiteTitle')}</title>
      </Helmet>
      <Header />
      {accesstoken && <DoVerify accesstoken={accesstoken as string} />}
      <div className="flex flex-row justify-between gap-7 items-start mt-[60px]">
        <div className="w-16 md:w-[350px] p-1 md:p-2 hidden sm:block sticky">
          <LeftMenu userInfo={userState?.userInfo} />
        </div>
        <div className="md:w-[780px] w-[360px]">
          <Posts />
        </div>
        <div className="w-[350px] md:w-16 sticky hidden md:block">
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default Home;
