"use client";

import { useEffect, useState } from "react";
import { CreateServerModal } from "../Modals/CreateServerModal";
import { InviteModal } from "../Modals/inviteModal";
import { EditServerModal } from "../Modals/EditServer";
import { LeaveModal } from "../Modals/LeaveServer";
import { DeleteServerModal } from "../Modals/DeleteServer";
import { ManageMembersModal } from "../Modals/ManageMembers";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <InviteModal/>
      <EditServerModal/>
      <LeaveModal/>
      <DeleteServerModal/>
      <ManageMembersModal/>
    </>
  );
};
