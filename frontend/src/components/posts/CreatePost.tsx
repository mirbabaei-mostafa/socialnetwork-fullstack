import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { IoMdCloseCircle } from 'react-icons/io';
import { UserState } from '../../redux/slices/userSlice';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { shallowEqual } from 'react-redux';
import {
  LegacyRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import PostAudienceArray from '../../data/postAudience.json';
import PostAudiences from './PostAudiences';
import EmojiPickerPanel from './EmojiPickerPanel';
import ImageCordinator from './ImageCordinator';
import BackgroundCordinator from './BackgroundCordinator';

type Props = {
  //   regFn: React.Dispatch<React.SetStateAction<boolean>>;
  regFn: (value: boolean) => void;
};

export interface Audiences {
  title: string;
  desc: string;
  image: string;
}

const CreatePost = (props: Props) => {
  const postRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const [postText, setPostText] = useState<string>('');
  const [visable, setVisable] = useState<number>(0);
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [postAudience, setPostAudience] = useState<string>('Public');
  const [postAudienceImage, setPostAudienceImage] = useState<string>('');
  const [isShowImageBox, setShowImageBox] = useState<boolean>(false);
  const [isShowBgBox, setShowBgBox] = useState<boolean>(false);
  const [imageArr, setImageArr] = useState<string[]>([]);
  const [bgImage, setBgImage] = useState<string>('');
  const userState: UserState = useAppSelector((state: RootState): UserState => {
    return state.user as UserState;
  }, shallowEqual);
  const { t } = useTranslation();

  useEffect(() => {
    setPostAudienceImage(() => {
      const audience: Audiences[] = PostAudienceArray.filter(
        (item) => item.title === postAudience
      );
      return audience[0].image;
    });
  }, [postAudience]);

  useEffect(() => {
    postText.length ? setIsDisable(false) : setIsDisable(true);
  }, [postText]);

  return (
    <div className="relative rounded shadow-md shadow-gray-300 bg-white m-auto w-[530px] min-h-[350px] flex flex-col justify-start items-start">
      <Helmet>
        <title>{t('CreateNewPost')}</title>
      </Helmet>
      {visable === 0 && (
        <>
          <div className="flex flex-row justify-center items-center text-center font-headline font-bold text-gray-700 text-[18px] my-2 w-[530px]">
            {t('CreatePost')}
            <div
              className="absolute icon-normal pr-2 cursor-pointer right-2"
              onClick={() => props.regFn(false)}
            >
              <IoMdCloseCircle
                style={{ color: import.meta.env.VITE_ICON_COLOR }}
              />
            </div>
          </div>
          <hr className="bg-gray-400 w-[530px]" />
          <div className="flex flex-row gap-3 py-2 px-3">
            <img
              src={userState.userInfo.image}
              className="rounded-full w-11 border-2 border-gray-400"
            />
            <div className="flex flex-col justify-start">
              <span className="font-roboto font-bold text-[14px] text-gray-600">
                {userState.userInfo.fname + ' ' + userState.userInfo.lname}
              </span>
              <div
                className="flex flex-row gap-2 rounded-full bg-gray-300 items-center justify-start py-1 px-3 cursor-pointer"
                onClick={() => setVisable(1)}
              >
                <img src={postAudienceImage} className="w-3 h-3" />
                <span className="font-roboto font-bold text-[12px] text-gray-600">
                  {t(postAudience)}
                </span>
                <img src="./images/menu/arrowdown.png" className="w-3 h-3" />
              </div>
            </div>
          </div>
          <div className="relative px-3 py-1 h-24">
            <textarea
              className="w-[505px] h-24 border-0 resize-none overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-md text-[16px] font-sans"
              placeholder={
                t('WhatsOnYourMind') + ', ' + userState.userInfo.fname
              }
              ref={postRef}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
            <span className="absolute -top-8 right-4">
              <EmojiPickerPanel postRef={postRef} setPostText={setPostText} />
            </span>
          </div>
          {isShowImageBox ? (
            <div>
              <ImageCordinator
                setShowImageBox={setShowImageBox}
                imageArr={imageArr}
                setImageArr={setImageArr}
              />
            </div>
          ) : isShowBgBox ? (
            <div>
              <BackgroundCordinator
                postText={postText}
                setShowBgBox={setShowBgBox}
                bgImage={bgImage}
                setBgImage={setBgImage}
              />
            </div>
          ) : (
            <div className="block w-[530px] h-8"></div>
          )}
          <div className="flex flex-row justify-between gap-1 items-center border-2 border-gray-300 rounded-md px-3 py-1 mx-2 w-[510px]">
            <span className="font-sans font-bold text-gray-700 text-[14px] pr-1">
              {t('AddToYourPost')}
            </span>
            <span className=" rounded-full hover:bg-gray-200 p-2 cursor-pointer tooltip">
              <span className="tooltiptext">{t('Background')}</span>
              <img
                src="./images/emoji/colorpicker.png"
                className="w-8 h-8 cursor-pointer"
                onClick={() => {
                  isShowBgBox && setShowBgBox(false);
                  !isShowBgBox && setShowBgBox(true);
                  !isShowBgBox && setShowImageBox(false);
                }}
                title={t('Background')}
              />
            </span>
            <span className=" rounded-full hover:bg-gray-200 p-2 cursor-pointer tooltip">
              <span className="tooltiptext">{t('Photo/Video')}</span>
              <img
                src="./images/emoji/addimage.png"
                className="w-7"
                alt={t('Photo/Video')}
                title={t('Photo/Video')}
                onClick={() => {
                  isShowImageBox && setShowImageBox(false);
                  !isShowImageBox && setShowImageBox(true);
                  !isShowImageBox && setShowBgBox(false);
                }}
              />
            </span>
            <span className=" rounded-full hover:bg-gray-200 p-2 cursor-pointer tooltip">
              <span className="tooltiptext">{t('TagPeople')}</span>
              <img
                src="./images/emoji/tagpeople.png"
                className="w-7"
                alt={t('TagPeople')}
                title={t('TagPeople')}
              />
            </span>
            <span className=" rounded-full hover:bg-gray-200 p-2 cursor-pointer tooltip">
              <span className="tooltiptext">{t('Feeling/activity')}</span>
              <img
                src="./images/emoji/feeling.png"
                className="w-7"
                alt={t('Feeling/activity')}
                title={t('Feeling/activity')}
              />
            </span>
            <span className=" rounded-full hover:bg-gray-200 p-2 cursor-pointer tooltip">
              <span className="tooltiptext">{t('CheckIn')}</span>
              <img
                src="./images/emoji/checkin.png"
                className="w-7"
                alt={t('CheckIn')}
                title={t('CheckIn')}
              />
            </span>
            <span className=" rounded-full hover:bg-gray-200 p-2 cursor-pointer tooltip">
              <span className="tooltiptext">{t('Gif')}</span>
              <img
                src="./images/emoji/gif.png"
                className="w-7"
                alt={t('Gif')}
                title={t('Gif')}
              />
            </span>
            <span className=" rounded-full hover:bg-gray-200 p-2 cursor-pointer tooltip">
              <span className="tooltiptext">{t('More')}</span>
              <img
                src="./images/emoji/more.png"
                className="w-7"
                alt={t('More')}
                title={t('More')}
              />
            </span>
          </div>
          <button
            disabled={isDisable}
            className="w-[500px] mx-[14px] my-3 shadow-sm shadow-mycyan disabled:shadow-gray-500 py-2 rounded border border-mycyan-dark disabled:border-gray-600 bg-mycyan hover:bg-mycyan-dark transition-colors disabled:bg-gray-400 text-white font-bold font-roboto text-md disabled:cursor-not-allowed cursor-pointer"
          >
            {t('Post')}
          </button>
        </>
      )}
      {visable === 1 && (
        <PostAudiences visableFN={setVisable} audienceFN={setPostAudience} />
      )}
    </div>
  );
};

export default CreatePost;
