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
import { toast } from "sonner";

import { useParams, useRouter } from "next/navigation";
import { UseModal } from "@/hooks/useModalStore";
import { ChannelType } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createChannel } from "@/lib/actions/crateChannel";
import { useEffect } from "react";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Channel name is required",
    })
    .refine((name) => name !== "general", {
      message: "can not assign name general to new channel",
    }),
  type: z.nativeEnum(ChannelType),
});

export const Createchannel = () => {
  const { isOpen, onClose, onOpen, type, data } = UseModal();
  const { channelTypeData } = data;

  let defalutType: ChannelType = ChannelType.TEXT;
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: channelTypeData || ChannelType.TEXT,
    },
  });
  const router = useRouter();
  const params = useParams();
  const isLoading = form.formState.isSubmitting;

  const OnSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await createChannel({
        ...values,
        serverId: params?.serverId as string,
      });
      toast.success("Channel Created");
      onClose();
      form.reset();
      router.refresh();
    } catch (error) {
      console.log("Server Create Error", error);
      toast.error("something went worng");
    }
  };

  const isModalOpen = isOpen && type === "createChannel";

  const handleClose = () => {
    form.reset();
    onClose();
  };

  useEffect(() => {
    if (channelTypeData) {
      defalutType = channelTypeData;
      form.setValue("type", channelTypeData);
    } else {
      form.setValue("type", ChannelType.TEXT);
    }
  }, []);
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[425px] p-0">
        <DialogHeader className="flex flex-col p-4 justify-center gap-4 mt-4 items-center">
          <DialogTitle className="text-2xl">Create a Channel</DialogTitle>
          <DialogDescription>
            Select channel type and provide a name for the channel
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-8  ">
            <div className="flex flex-col  justify-center items-center">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="w-full p-4">
                    <FormLabel className="text-primary uppercase text-sm font-bold dark:text-primary/70">
                      Channel Type
                    </FormLabel>

                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        disabled={isLoading}
                        defaultValue={channelTypeData|| field.value}
                      >
                        <SelectTrigger className="border-0 focus:ring-0 focus:ring-offset-0 ring-offset-0 uppercase">
                          <SelectValue placeholder="Select channel type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Channel Types</SelectLabel>
                            <SelectItem value="TEXT">TEXT</SelectItem>
                            <SelectItem value="AUDIO">AUDIO</SelectItem>
                            <SelectItem value="VIDEO">VIDEO</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="dark:text-red-700 font-semibold" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full p-4">
                    <FormLabel className="text-primary uppercase text-sm font-bold dark:text-primary/70">
                      Channel NAME
                    </FormLabel>

                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter channel Name"
                        className="outline-none bg-primary-foreground disabled:bg-primary-foreground/70 text-zinc-600 dark:text-zinc-300 text-base border-0 focus-visible:ring-0 focus-visible:ring-offset-0 "
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
