import { CSSProperties } from 'react';
import CircleLoader from 'react-spinners/CircleLoader';

type Props = {
  isLoading: boolean;
  size: number;
};

const SpinnerCircleLoader = (props: Props) => {
  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    // borderColor: 'red',
  };
  return (
    <CircleLoader
      color={import.meta.env.VITE_SPINER_COLOR}
      loading={props.isLoading}
      cssOverride={override}
      size={props.size}
      speedMultiplier={1}
    />
  );
};

export default SpinnerCircleLoader;
