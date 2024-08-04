import { atomWithStorage } from "jotai/utils";

export const selectedAccountAtom = atomWithStorage<string | null>(
  "default_selected_account",
  null
);
