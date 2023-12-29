"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "../ui/input";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import FileUpload from "../file-upload/fileUpload";
import { toast } from "sonner";
import { createServer } from "@/lib/actions/createServer";

import { useRouter } from "next/navigation";
import { UseModal } from "@/hooks/useModalStore";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required",
  }),
  imageUrl: z.string().min(1, {
    message: "Server Image is required",
  }),
});

export const CreateServerModal = () => {
  const { isOpen, onClose, onOpen, type } = UseModal();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });
  const router = useRouter();
  const isLoading = form.formState.isSubmitting;

  const OnSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await createServer(values);
      form.reset();
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log("Server Create Error", error);
      toast.error("something went worng");
    }
  };

  const isModalOpen = isOpen && type === "createServer";

  const handleClose = ()=>{
    form.reset();
    onClose();
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[425px] p-0">
        <DialogHeader className="flex flex-col p-4 justify-center gap-4 mt-4 items-center">
          <DialogTitle className="text-2xl">Customise your Server</DialogTitle>
          <DialogDescription>
            Give your Server a personality with a name and an icon. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-8  ">
            <div className="flex flex-col space-y-8 justify-center items-center">
              <div className="rounded-full">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          onChange={field.onChange}
                          value={field.value}
                          endpoint="serverImage"
                        />
                      </FormControl>
                      <FormMessage className="dark:text-red-700 text-center font-semibold" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full p-4">
                    <FormLabel className="text-primary uppercase text-sm font-bold dark:text-primary/70">
                      SERVER NAME
                    </FormLabel>

                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter Server Name"
                        className="outline-none text-zinc-600 dark:text-zinc-300 text-base border-0 focus-visible:ring-0 focus-visible:ring-offset-0 "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="dark:text-red-700 font-semibold" />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-primary-foreground/30 px-4 py-6">
              <Button disabled={isLoading} size={"lg"} variant={"primary"}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
