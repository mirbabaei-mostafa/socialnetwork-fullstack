import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../../redux/hooks';
import { UserState } from '../../redux/slices/userSlice';
import { RootState } from '../../redux/store';
import ResendVerification from '../home/ResendVerification';
import Stories from './Stories';

const Posts = () => {
  const userState: UserState = useAppSelector((state: RootState): UserState => {
    return state.user as UserState;
  }, shallowEqual);
  return (
    <div className="flex flex-col items-center md:w-[780px] w-[360px]">
      <div>
        <Stories />
        {!userState.userInfo.verify && <ResendVerification />}
      </div>
    </div>
  );
};

export default Posts;
