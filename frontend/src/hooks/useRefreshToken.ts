import { useAppDispatch } from '../redux/hooks';
import { renew } from '../redux/slices/userSlice';
import { axiosPrivate } from '../utils/axios';

const useRefreshToken = () => {
  const dispatch = useAppDispatch();

  const refreshToken = async () => {
    try {
      const response = await axiosPrivate.get('/api/renew');
      dispatch(renew(response.data));
      return response.data.accessToken;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return refreshToken;
};

export default useRefreshToken;
