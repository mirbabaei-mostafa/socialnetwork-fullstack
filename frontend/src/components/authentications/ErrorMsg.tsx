import { IoIosPlay } from 'react-icons/io';

interface ErrorProps {
  message: string;
  arrDir: string;
}

const ErrorMsg = (props: ErrorProps) => {
  let arrStyle: string = '';
  let locStyle: string = '';
  switch (props.arrDir) {
    case 'up': {
      arrStyle = 'absolute top-[85%] left-4 rotate-90';
      locStyle = 'relative -top-2';
      break;
    }
    case 'down': {
      arrStyle = 'absolute bottom-[88%] left-4 -rotate-90';
      locStyle = 'relative -bottom-2';
      break;
    }
    case 'left': {
      arrStyle = 'absolute top-1 -right-[10px]';
      locStyle = 'absolute top-0 right-full mr-4';
      break;
    }
    case 'right': {
      arrStyle = 'absolute top-1 -left-[10px] rotate-180';
      locStyle = 'absolute top-0 left-full ml-4';
      break;
    }
    default:
      arrStyle = '';
      locStyle = 'relative';
      break;
  }
  console.log(locStyle);
  return (
    <>
      <div
        className={`${locStyle} w-72 bg-red-600 rounded py-1 px-3 text-white font-roboto text-sm shadow-md shadow-red-300`}
      >
        {props.message}
        <div className={arrStyle}>
          <IoIosPlay style={{ color: import.meta.env.VITE_ALLERT_COLOR }} />
        </div>
      </div>
    </>
  );
};

export default ErrorMsg;
