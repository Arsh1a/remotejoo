import { postData, getData } from "@/utils/api";
import { useState, useEffect } from "react";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import Cookie from "js-cookie";

type State = {
  loggedIn: boolean;
};

type Actions = {
  contextReset: () => void;
  contextLogin: () => void;
};

const initialState: State = {
  loggedIn: false,
};

const useAuthStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        contextReset: () => {
          set(() => initialState);
        },
        contextLogin: async () => {
          set(() => ({ loggedIn: true }));
        },
      }),
      {
        name: "auth-store",
      }
    )
  )
);

export default useAuthStore;
