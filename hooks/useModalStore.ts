import { ServerWithMembersWithProfiles } from "@/types";
import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "createServer" | "invite"|"EditServer"|"LeaveServer"|"deleteServer"|"manageMembers"|"createChannel"|"deleteChannel";

type ModalData = {
  server?: ServerWithMembersWithProfiles;
  channel? :Channel
  channelTypeData?:ChannelType
};

type ModalStore = {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;

  onOpen: (type: ModalType, data: ModalData) => void;
  onClose: () => void;
};

export const UseModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type: ModalType, data: ModalData = {}) =>
    set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
