"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Send } from "lucide-react";
import { useRouter } from "next/navigation";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { EmojiPicker } from "@/components/emoji-picker";

import { io } from "socket.io-client";
import { useSocket } from "../Providers/SocketProvider";
import { SendMessaage } from "@/lib/actions";
const socket = io("http://localhost:3001");

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
}

const formSchema = z.object({
  content: z.string().min(1),
});

export const ChatInput = ({ query, name, type }: ChatInputProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
  const { socket } = useSocket();
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      SendMessaage({
        Receiver: query.userId,
        conversationId: query.conversationId,
        message: values,
      });

      socket.emit("sendMessage", {
        sender: query.selfId,
        Receiver: query.userId,
        conversationId: query.conversationId,
        message: values,
      });

      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    onClick={() => {}}
                    className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="text-white dark:text-[#313338]" />
                  </button>
                  <Input
                    disabled={isLoading}
                    className="px-14 pr-28 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                    placeholder={`Message ${
                      type === "conversation" ? name : "#" + name
                    }`}
                    {...field}
                  />
                  <div className="absolute top-7 right-20">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="absolute text-muted-foreground top-7 right-8"
                    >
                      <Send />
                    </button>
                  </div>
                </div>
              </FormControl>
              <FormControl></FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
