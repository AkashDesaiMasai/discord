"use client"
import { useEffect, useState } from "react";

const useOrigin = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return "";
  }
  const origin = window?.location?.origin || "";
  return origin;
};

export default useOrigin;
