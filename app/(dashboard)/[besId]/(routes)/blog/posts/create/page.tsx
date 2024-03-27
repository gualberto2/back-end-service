"use client";

import * as z from "zod";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import Tiptap from "@/components/tiptap";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  title: z.string().min(2),
  body: z.string().min(2),
  hook: z.string().min(2),
  conclusion: z.string().min(2),
  // code: z.string().min(2),

  is_featured: z.boolean().default(false).optional(),
  is_archived: z.boolean().default(false).optional(),
});

const AddPost = ({ params }: { params: { besId: string } }) => {
  const [imageUrls, setImageUrls] = useState([]);

  const router = useRouter();

  const supabase = createClient();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // const handleImageUpload = (newUrl: string) => {
  //   setImageUrls((prevUrls) => [...prevUrls, newUrl]);
  // };

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
            // code: values.code,

            is_featured: values.is_featured,
            is_archived: values.is_archived,

            blog_id: params.besId,
          },
        ])
        .select();

      if (error) {
        console.log("no work", error);
        throw error;
      }

      router.refresh();
      router.push(`/${params.besId}/blog/posts`);
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
          <Heading
            title={"Create Post"}
            description={
              "Create post here, please include a title, body content, hook, images, and author."
            }
          />
        </div>
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 md:space-y-6 w-full"
          >
            <div className="flex flex-col gap-6 md:gap-8">
              {/* <ImageUpload
                bucketName="post-images"
                onUpload={handleImageUpload}
              /> */}

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Provide a title for the post"
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
                    <FormLabel>Body</FormLabel>
                    <FormControl>
                      <Tiptap body={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="conclusion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conclusion</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Conclusion here will be shown at end of post."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-2">
                <FormField
                  control={form.control}
                  name="is_featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          // @ts-ignore
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Featured</FormLabel>
                        <FormDescription>
                          This post will appear on the home page (Optional)
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="is_archived"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          // @ts-ignore
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Archived</FormLabel>
                        <FormDescription>
                          This post will dissapear on the home page (Optional)
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
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
