import { create } from "zustand";

type Store = {
  OnlineUsers: string[];
  setOnlineUsers: (users: string[]) => void;
};

const useStore = create<Store>(
  (set): Store => ({
    OnlineUsers: [],
    setOnlineUsers: (users) => set({ OnlineUsers: users }),
  })
);

export default useStore;
