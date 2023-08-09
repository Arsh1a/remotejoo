import React, { Dispatch, SetStateAction } from "react";

interface Props {
  tabs: { label: string; value: string }[];
  state: any;
  setState: Dispatch<SetStateAction<any>>;
}

const Tabs = ({ tabs, state, setState }: Props) => {
  return (
    <ul className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <li
          className={`px-4 py-2 rounded-full cursor-pointer hover:opacity-70 text-sm transition${
            state === tab.value ? " bg-black text-white" : " bg-white"
          }`}
          key={tab.value}
          onClick={() => setState(tab.value)}
        >
          {tab.label}
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
