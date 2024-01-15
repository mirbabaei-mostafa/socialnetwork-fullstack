import { useMediaQuery } from 'react-responsive';

const useScreenSizer = () => {
  // Adviced by tailwind
  const screenSmall = useMediaQuery({ minWidth: 640 });
  const screenMedium = useMediaQuery({ minWidth: 768 });
  const screenLarge = useMediaQuery({ minWidth: 1024 });
  const screenXLarge = useMediaQuery({ minWidth: 1280 });
  const screen2XLarge = useMediaQuery({ minWidth: 1536 });

  // Adviced by react-reposive module teams
  // const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 })
  // const isBigScreen = useMediaQuery({ minWidth: 1824 })
  // const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })
  // const isPortrait = useMediaQuery({ orientation: 'portrait' })
  // const isRetina = useMediaQuery({ minResolution: '2dppx' })

  return {
    screenSmall,
    screenMedium,
    screenLarge,
    screenXLarge,
    screen2XLarge,
  };
};

export default useScreenSizer;
