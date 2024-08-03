import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { Product } from "@/types";

export const selectedAccountAtom = atomWithStorage<string | null>(
  "default_selected_account",
  null
);

export const productsAtom = atom<Product[]>([]);
