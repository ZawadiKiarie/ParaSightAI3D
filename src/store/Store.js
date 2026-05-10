import { atom } from "jotai";

const storedUser = sessionStorage.getItem("user");

export const userAtom = atom(
  storedUser
    ? JSON.parse(storedUser)
    : {
        id: "",
        name: "",
        email: "",
      },
);

export const isLoadingScreenComplete = atom(false);
