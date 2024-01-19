import { CSSProperties } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

type Props = {
  isLoading: boolean;
  size: number;
};

const SpinnerPulseLoader = (props: Props) => {
  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    // borderColor: 'red',
  };
  return (
    <PulseLoader
      color={import.meta.env.VITE_SPINER_COLOR}
      loading={props.isLoading}
      cssOverride={override}
      size={props.size}
      speedMultiplier={1}
    />
  );
};

export default SpinnerPulseLoader;
