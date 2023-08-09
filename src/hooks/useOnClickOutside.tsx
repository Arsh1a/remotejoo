import React, { useEffect, useRef, RefObject } from "react";

const useOnClickOutside = <T extends HTMLElement>(
  callback: () => void
): RefObject<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref, callback]);

  return ref;
};

export default useOnClickOutside;
