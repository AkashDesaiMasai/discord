import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const getProfile = async () => {
    const { userId } = auth();
    if (!userId) redirect("/sign-in");




};

export default getProfile;
