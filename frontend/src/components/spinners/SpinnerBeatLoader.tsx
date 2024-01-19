import { CSSProperties } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

type Props = {
  isLoading: boolean;
  size: number;
};

const SpinnerBeatLoader = (props: Props) => {
  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    // borderColor: 'red',
  };
  return (
    <BeatLoader
      color={import.meta.env.VITE_SPINER_COLOR}
      loading={props.isLoading}
      cssOverride={override}
      size={props.size}
      speedMultiplier={1}
    />
  );
};

export default SpinnerBeatLoader;
