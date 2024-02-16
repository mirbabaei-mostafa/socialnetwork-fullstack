import { MutableRefObject, useEffect, useRef, useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import useClickOutside from "../../hooks/useClickOutside";

export interface EmojiProps {
  postRef: MutableRefObject<HTMLTextAreaElement>;
  setPostText: (value: string) => void;
}

const EmojiPickerPanel = ({ postRef, setPostText }: EmojiProps) => {
  const emojiRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [showEmojiPanel, setShowEmojiPanel] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  useEffect(() => {
    postRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const emojiHandel = (emojiData: EmojiClickData, event: MouseEvent) => {
    postRef.current.focus();
    const postText = postRef.current.value;
    const beforEmojiTest = postText.substring(
      0,
      postRef.current.selectionStart
    );
    const afterEmojiText = postText.substring(postRef.current.selectionStart);
    const newPostText = beforEmojiTest + emojiData.emoji + afterEmojiText;
    setPostText(newPostText);
    setCursorPosition(beforEmojiTest.length + emojiData.emoji.length);
  };

  useClickOutside(emojiRef, setShowEmojiPanel);

  return (
    <div className="relative" ref={emojiRef}>
      <img
        src="./images/emoji/emoji.png"
        className="w-8 h-8 cursor-pointer"
        onClick={() => setShowEmojiPanel(!showEmojiPanel)}
      />
      {showEmojiPanel && (
        <div className="absolute z-50 bottom-8 right-0">
          <EmojiPicker height={320} width={350} onEmojiClick={emojiHandel} />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPanel;
