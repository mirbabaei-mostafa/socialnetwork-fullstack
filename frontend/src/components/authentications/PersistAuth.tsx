import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { UserState, renewToken } from "../../redux/slices/userSlice";
import { RootState } from "../../redux/store";
import SpinnerBarLoader from "../spinners/SpinnerBarLoader";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PersistAuth = () => {
  const userState: UserState = useAppSelector((state: RootState): UserState => {
    return state.user as UserState;
  }, shallowEqual);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!userState?.userInfo.accessToken) {
      dispatch(renewToken("renew"));
    }
  }, []);

  userState?.error && navigate("/login");
  return (
    <>
      <SpinnerBarLoader isLoading={userState.isLoading} />
      {userState?.userInfo.accessToken && <Outlet />}
    </>
  );
};

export default PersistAuth;
