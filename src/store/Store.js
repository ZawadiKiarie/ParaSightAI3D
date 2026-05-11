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

// Current parasite
export const parasiteAtom = atom("EntamoebaHystolytica");

// Current stage
export const stageAtom = atom("trophozoite");

export const isLoadingScreenComplete = atom(false);
// 'HOME', 'LIST', 'FOCUS', 'ISOLATED'
export const viewAtom = atom("HOME");
// Hovered marker id
export const hoveredMarkerAtom = atom(null);
// Focused marker id
export const focusedMarkerIdAtom = atom(null);

// Focused feature index
export const focusedFeatureIndexAtom = atom(0);

// Active section/tab inside isolated info modal
export const infoSectionAtom = atom("overview");
