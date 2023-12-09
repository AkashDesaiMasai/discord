
import { Button } from "@/components/ui/button";
import getProfile from "@/lib/auth/getProfile";
import { getUserAuth } from "@/lib/auth/utils";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect } from "react";
import io from "socket.io-client";
import  IndexPage from "@/components/socket"
import db  from "@/lib/db/index";

export default async function Home() {
  const userAuth = await auth();
  
  return <main className="space-y-6">
    
  </main>;
}
