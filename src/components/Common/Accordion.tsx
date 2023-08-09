import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
interface Props {
  title: string;
  desc: string;
}

const Accordion = ({ title, desc }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div
      className="cursor-pointer rounded-secondary bg-white p-4 flex flex-col gap-1"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="cursor-pointer flex items-center relative">
        <MdKeyboardArrowDown
          className={`text-primary absolute text-3xl transition lg:text-3xl${
            isOpen ? " rotate-180" : ""
          }`}
        />
        <h3 className="lg:text-lg font-semibold pr-9">{title}</h3>
      </div>
      {isOpen && <p className="pr-9">{desc}</p>}
    </div>
  );
};

export default Accordion;
