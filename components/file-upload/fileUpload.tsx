"use client";
import { X } from "lucide-react";
import Image from "next/image";

import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@/lib/uploadthing";

import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";

type FileUploadProps = {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
};

const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative w-32 h-32">
        <Suspense
          fallback={<Skeleton className="rounded-full bg-red-500 h-32 w-32" />}
        >
          <Image
            src={value}
            alt="UPload"
            fill
            className="rounded-full border shadow-lg p-2"
          />
        </Suspense>
        <button
          className="p-1 bg-rose-500 shadow-sm rounded-full top-1 right-1 absolute"
          type="button"
          onClick={() => onChange("")}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
      ></UploadDropzone>
    </div>
  );
};

export default FileUpload;
