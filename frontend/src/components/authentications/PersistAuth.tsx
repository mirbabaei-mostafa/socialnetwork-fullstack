import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { UserState, renewToken } from "../../redux/slices/userSlice";
import { RootState } from "../../redux/store";
import SpinnerBarLoader from "../spinners/SpinnerBarLoader";
import { useDeferredValue, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PersistAuth = () => {
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
      {!userState?.userInfo.accessToken && <Navigate to="/login" />}
      <SpinnerBarLoader isLoading={IsLoadingVal} />
      {userState?.userInfo.accessToken && <Outlet />}
    </>
  );
};

export default PersistAuth;
