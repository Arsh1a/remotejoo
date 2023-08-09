import useOnClickOutside from "@/hooks/useOnClickOutside";
import React, { useRef, useState } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

interface Props {
  label: string;
  content: React.ReactNode;
}

const Dropdown = ({ label, content }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useOnClickOutside<HTMLDivElement>(() => setIsOpen(false));

  return (
    <div className="relative flex" ref={ref}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        className={`rounded-xl w-full border border-gray-300 py-1 px-4 cursor-pointer${
          isOpen ? " outline outline-1 outline-gray-300" : ""
        }`}
      >
        <div className="relative min-h-[30px] flex items-center justify-center gap-2">
          {label}

          <div className="text-xl">
            <MdKeyboardArrowDown className={isOpen ? "" : "hidden"} />
            <MdKeyboardArrowUp className={!isOpen ? "" : "hidden"} />
          </div>
        </div>
      </div>
      <div
        onClick={(event) => event.stopPropagation()}
        className={`absolute outline outline-1 outline-gray-300 bg-white min-w-full  z-10 rounded-xl p-6 right-0 top-14${
          isOpen ? " fade-in" : " fade-out"
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default Dropdown;
