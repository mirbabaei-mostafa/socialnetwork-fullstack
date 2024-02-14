import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../../redux/hooks';
import { UserState } from '../../redux/slices/userSlice';
import { RootState } from '../../redux/store';
import ResendVerification from '../home/ResendVerification';
import Stories from './Stories';
import CreatePostBox from './CreatePostBox';
import { useState } from 'react';
import CreatePost from './CreatePost';

const Posts = () => {
  const [showCreateForm, setShowCreateForm] = useState<boolean>();
  const userState: UserState = useAppSelector((state: RootState): UserState => {
    return state.user as UserState;
  }, shallowEqual);
  return (
    <div className="flex flex-col items-center md:w-[780px] w-[360px]">
      <div>
        <Stories />
        {!userState.userInfo.verify && <ResendVerification />}
        <CreatePostBox regFn={setShowCreateForm} />

        {/* Create new post form */}
        {showCreateForm && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-70">
            <CreatePost regFn={setShowCreateForm} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
