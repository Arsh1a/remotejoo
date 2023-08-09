import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { MdCheck, MdKeyboardArrowDown } from "react-icons/md";

type DataType = {
  label: string;
  value: string;
};

interface Props {
  data: DataType[];
  //These types are for react-hook-form intergration
  error?: boolean;
  value: string | null;
  onChange?: (e: React.SetStateAction<string | null>) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ListBoxDropdown = ({ data, error, value, onChange }: Props) => {
  const [selected, setSelected] = useState<null | DataType>(
    data.find((d) => d.value === value) ?? null
  );

  useEffect(() => {
    if (value) {
      setSelected(data.find((d) => d.value === value)!);
    }
  }, [value]);

  useEffect(() => {
    if (onChange && selected) {
      onChange(selected.value);
    }
  }, [selected]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button
              className={classNames(
                error ? "ring-red-500" : "",
                "relative w-full cursor-pointer rounded-secondary py-2 px-4 text-left ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary sm:leading-6"
              )}
            >
              <span className="flex items-center mr-4">
                <span className="block truncate ">
                  {selected ? selected.label : "انتخاب دسته بندی"}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-4 flex items-center pr-2">
                <MdKeyboardArrowDown
                  className={open ? "rotate-180 transition" : ""}
                  size={20}
                />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-secondary bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {data.map((d) => (
                  <Listbox.Option
                    key={d.value}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-primary text-white" : "text-gray-900",
                        "relative cursor-pointer select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={d}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {d.label}
                          </span>
                        </div>
                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-secondary",
                              "absolute inset-y-0 right-0 -top-2 flex items-center pr-4"
                            )}
                          >
                            <MdCheck size={18} />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default ListBoxDropdown;
