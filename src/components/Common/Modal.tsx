import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, cloneElement } from "react";
import Button from "./Button";
import { MdClear } from "react-icons/md";
import useOnClickOutside from "@/hooks/useOnClickOutside";
interface Props {
  content: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
}
const Modal = ({ content, title, isOpen, setIsOpen }: Props) => {
  const ref = useOnClickOutside<HTMLDivElement>(() => setIsOpen(false));

  return (
    <>
      {isOpen && (
        <div className="z-[51] fixed">
          <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center p-5">
            <div
              ref={ref}
              className={`flex flex-col z-[51] relative bg-white rounded-3xl px-6 py-4 w-full md:w-[600px]${
                !title ? " pt-12" : ""
              }`}
            >
              <div
                className="absolute top-5 right-5"
                onClick={() => setIsOpen(false)}
              >
                <MdClear
                  size={20}
                  className="cursor-pointer hover:opacity-70 transition"
                />
              </div>
              {title && <h2 className="text-center text-lg mb-5">{title}</h2>}
              {content}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
