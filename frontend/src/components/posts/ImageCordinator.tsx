import { ChangeEvent, MutableRefObject, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SpinnerBarLoader from '../spinners/SpinnerBarLoader';

interface ImageProps {
  setShowImageBox: (value: boolean) => void;
  imageArr: string[];
  setImageArr: (callback: (value: string[]) => void) => void;
}

const ImageCordinator = ({
  setShowImageBox,
  imageArr,
  setImageArr,
}: ImageProps) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const imagesRef = useRef() as MutableRefObject<HTMLInputElement>;
  const [showIcons, setShowIcons] = useState<boolean>(false);

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const files = (e.target as HTMLInputElement).files as FileList;
    Array.from(files).forEach((image) => {
      if (!['jpeg', 'gif', 'webp', 'png'].includes(image.type.split('/')[1])) {
        setErrorMessage(t('ImageFormatError') + image.name);
        return;
      } else if (
        image.size >
        parseInt(import.meta.env.VITE_IMAGE_SIZE) * 1024 * 1024
      ) {
        setErrorMessage(t('ImageSizeError') + image.name);
        return;
      } else {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(image);
        fileReader.onload = (readerEvent) => {
          setImageArr((imageArr) => [
            ...imageArr,
            readerEvent.target?.result as string,
          ]);
        };
      }
    });
    setLoading(false);
  };

  return (
    <div className="relative mx-2 my-1 w-[510px] h-44 border-2 rounded-md border-gray-400  overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-200  scrollbar-thumb-rounded-md text-[16px]">
      <SpinnerBarLoader isLoading={isLoading} />
      <input
        type="file"
        ref={imagesRef}
        multiple
        hidden
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleUpload}
      />
      <img
        src="./images/menu/close.png"
        className="absolute right-4 top-4 cursor-pointer p-2 rounded-full border-2 border-gray-400 bg-gray-300 hover:bg-gray-400 z-40"
        onClick={() => setShowImageBox(false)}
      />
      {!imageArr.length ? (
        <div
          className="m-2 py-5 flex flex-col justify-center items-center text-center w-[480px] bg-gray-100 hover:bg-gray-200 min-h-40 rounded-md cursor-pointer"
          onClick={() => imagesRef.current?.click()}
        >
          <img
            src="./images/menu/addimage.png"
            className="bg-gray-300 p-2 rounded-full"
          />
          <span className="py-3 font-headline font-bold text-[16px] text-gray-700">
            {t('AddPhotoVideos')}
          </span>
          {errorMessage && (
            <span className="font-roboto font-bold py-3 text-red-800 text-[14px]">
              {errorMessage}
            </span>
          )}
        </div>
      ) : (
        <div className="flex flex-col">
          {imageArr &&
            imageArr.map((image, index) => {
              return (
                <div
                  key={index}
                  className="relative"
                  onMouseOver={() => setShowIcons(true)}
                  onMouseOut={() => setShowIcons(false)}
                >
                  <img src={image} className="w-[500px] " />
                  {showIcons && (
                    <div className="absolute left-2 top-2 flex flex-row justify-start gap-2 z-30">
                      <img
                        src="./images/menu/addimage.png"
                        className="p-2 w-10 h-10 bg-gray-300 rounded-full cursor-pointer"
                        title={t('AddPhoto')}
                        onClick={() => imagesRef.current?.click()}
                      />
                      <img
                        src="./images/menu/remove.png"
                        className="p-2 w-10 h-10 bg-gray-300 rounded-full cursor-pointer"
                        title={t('RemovePhoto')}
                        onClick={() => {
                          setImageArr((imageArr) => {
                            const newImageArr = imageArr.filter(
                              (img) => img !== image
                            );
                            return [...newImageArr];
                          });
                        }}
                      />
                      <img
                        src="./images/menu/removeall.png"
                        className="p-2 w-10 h-10 bg-gray-300 rounded-full cursor-pointer"
                        title={t('RemovePhoto')}
                        onClick={() => setImageArr((imageArr) => [])}
                      />
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default ImageCordinator;
