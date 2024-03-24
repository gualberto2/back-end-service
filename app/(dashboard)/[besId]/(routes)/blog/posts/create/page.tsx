"use client";

import * as z from "zod";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import "quill/dist/quill.core.css";
import Quill from "quill";

import { createClient } from "@/lib/supabase/client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(2),
  body: z.string().min(2),
  hook: z.string().min(2),
  conclusion: z.string().min(2),
  code: z.string().min(2),
  images: z.object({ url: z.string() }).array(),
  isFeatured: z.boolean().default(false).optional(),
});

const AddPost = ({ params }: { params: { besId: string } }) => {
  const router = useRouter();
  const quillRef = useRef(null); // Ref to attach Quill

  const supabase = createClient();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (quillRef.current) {
      const quill = new Quill(quillRef.current, {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
          ],
        },
      });

      quill.on("text-change", () => {
        form.setValue("body", quill.root.innerHTML);
      });
    }
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("posts")
        .insert([
          {
            title: values.title,
            body: values.body,
            hook: values.hook,
            code: values.code,
            images: values.images,
            isFeatured: values.isFeatured,

            blog_id: params.besId,
          },
        ])
        .select();

      if (error) {
        console.log("no work", error);
        throw error;
      }

      console.log(values, "HERE DA DATA");

      router.refresh();
      router.push(`/${params.besId}/blog/author`);
      toast({ title: "success" });
    } catch (error: any) {
      toast({ title: "Something went wrong.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-2 md:p-5 pt-10">
        <div className="flex items-center justify-between">
          <Heading title={"Create Author"} description={"Create author here"} />
        </div>
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="flex flex-col gap-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Author name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hook</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Hook, this will be displayed in the card"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body</FormLabel>
                    <FormControl>
                      <div
                        ref={quillRef}
                        className="quill-editor border border-neutral-200 dark:text-neutral-300 text-neutral-900"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={loading} className="ml-auto" type="submit">
              Create
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddPost;
