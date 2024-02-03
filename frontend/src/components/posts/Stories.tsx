import { useTranslation } from 'react-i18next';
import StoriesData from '../../data/stories.json';
import useScreenSizer from '../../hooks/responsive';

const Stories = () => {
  const { t } = useTranslation();
  const { screenSmall, screenMedium } = useScreenSizer();
  const storyCount = screenMedium ? 5 : screenSmall ? 4 : 3;
  return (
    <>
      <div className="flex flex-col my-2 p-2 rounded-md shadow-sm shadow-gray-400 bg-white">
        <div className="flex flex-row justify-start gap-2 items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer">
          <img
            src="./images/menu/newitemblue.png"
            className="p-2 rounded-full bg-blue-100"
          />
          <div className="flex flex-col justify-start">
            <span className="font-headline font-bold text-[16px] text-gray-700">
              {t('CreateStory')}
            </span>
            <span className="font-roboto font-normal text-[13px] text-gray-600">
              {t('CreateStoryDesc')}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-2 my-2">
        {StoriesData.map((story, index) => {
          return index + 1 <= storyCount ? (
            <div
              key={index}
              className="w-[150px] h-[250px] cursor-pointer rounded-md p-0 m-0 relative bg-gradient-to-b from-myorange-dark to-mygreen-dark items-center text-center shadow-sm shadow-gray-400 overflow-hidden"
            >
              <img
                src={story.image}
                className="brightness-75 hover:brightness-100 scale-100 hover:scale-110 object-cover h-full"
              />
              <div className="flex flex-row justify-start items-center gap-2 absolute left-3 top-3">
                <img
                  src={story.userimage}
                  className="rounded-full w-8 border-2 border-gray-700"
                />
                <span className="font-roboto font-bold text-[12px] text-white drop-shadow-lg shadow-gray-600">
                  {story.username}
                </span>
              </div>
              <div className="absolute font-roboto font-normal text-[12px] text-white drop-shadow-lg shadow-gray-600 bottom-2 left-2">
                {story.title}
              </div>
            </div>
          ) : (
            ''
          );
        })}
      </div>
    </>
  );
};

export default Stories;
