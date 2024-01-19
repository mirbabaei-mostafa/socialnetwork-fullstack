import { CSSProperties } from 'react';
import BarLoader from 'react-spinners/BarLoader';

type Props = {
  isLoading: boolean;
};

const SpinnerBarLoader = (props: Props) => {
  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    // borderColor: 'red',
  };
  return (
    <div className="fixed top-0 left-0 w-full">
      <BarLoader
        color={import.meta.env.VITE_SPINER_COLOR}
        loading={props.isLoading}
        cssOverride={override}
        height={5}
        width="100%"
        speedMultiplier={1}
      />
    </div>
  );
};

export default SpinnerBarLoader;
