import React, { ChangeEvent, MutableRefObject, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ImageProps {
  setShowImageBox: (value: boolean) => void;
  imageArr: string[];
  setImageArr: (value: string[]) => void;
}

const ImageCordinator = ({
  setShowImageBox,
  imageArr,
  setImageArr,
}: ImageProps) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { t } = useTranslation();
  const imagesRef = useRef() as MutableRefObject<HTMLInputElement>;

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
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
          setImageArr([...imageArr, readerEvent.target?.result as string]);
        };
      }
    });
  };

  return (
    <div className="relative m-2 w-[510px] h-28 border-2 rounded-md border-gray-400  overflow-y-scroll scrollbar-thin  scrollbar-thumb-gray-200  scrollbar-thumb-rounded-md text-[16px]">
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
        className="absolute right-4 top-4 cursor-pointer p-2 rounded-full border-2 border-gray-400 bg-gray-300 hover:bg-gray-400"
        onClick={() => setShowImageBox(false)}
      />
      {!imageArr.length ? (
        <div
          className="m-2 py-5 flex flex-col justify-center items-center text-center w-[480px] bg-gray-100 hover:bg-gray-200 min-h-32 rounded-md cursor-pointer"
          onClick={() => imagesRef.current?.click()}
        >
          <img
            src="./images/menu/addimage.png"
            className="bg-gray-300 p-2 rounded-full"
          />
          <span className="py-3 font-headline font-bold text-[16px] text-gray-700">
            {t('AddPhotoVideos')}
          </span>
        </div>
      ) : (
        <div className="flex flex-col">
          {imageArr.map((image) => {
            return <img src={image} className="w-[480px]" />;
          })}
        </div>
      )}
    </div>
  );
};

export default ImageCordinator;
