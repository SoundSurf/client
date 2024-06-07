import { create } from "zustand";
import { User } from "@/ssTypes/sign/internal/signInternalTypes.ts";

type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUserStore;
