import { useDeferredValue, useEffect } from "react";
import { UserState, renewToken } from "../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { shallowEqual } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import SpinnerBarLoader from "../spinners/SpinnerBarLoader";

const NotAuthentication = () => {
  const userState: UserState = useAppSelector((state: RootState): UserState => {
    return state.user as UserState;
  }, shallowEqual);
  const dispatch = useAppDispatch();
  const IsLoadingVal: boolean = useDeferredValue(userState.isLoading);

  useEffect(() => {
    if (!userState?.userInfo.accessToken) {
      dispatch(renewToken("renew"));
    }
  }, []);

  return (
    <>
      <SpinnerBarLoader isLoading={IsLoadingVal} />
      {userState?.userInfo.accessToken ? <Navigate to="/" /> : <Outlet />}
    </>
  );
};

export default NotAuthentication;
