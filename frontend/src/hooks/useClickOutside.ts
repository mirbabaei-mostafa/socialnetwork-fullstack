import { MutableRefObject, useEffect } from "react";

// These Hook created to hide all menus, when user clicks outside

const useClickOutside = (
  ref: MutableRefObject<HTMLDivElement>,
  callback: (value: boolean) => void
) => {
  useEffect(() => {
    // DOM Event, not to be confused with React.MouseEvent
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(false);
    };
    /// Create listener to handle mouse and touch events
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // Remove listeners from mouse and touch events (Clean listeners)
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref]);
};

export default useClickOutside;
