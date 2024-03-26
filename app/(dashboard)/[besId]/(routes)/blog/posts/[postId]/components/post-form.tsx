"use client";

import * as z from "zod";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

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

import { Posts } from "@/utils/types";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  title: z.string().min(2),
  body: z.string().min(2),
  hook: z.string().min(2),
  conclusion: z.string().min(2),
  is_featured: z.boolean().default(false).optional(),
  is_archived: z.boolean().default(false).optional(),
});

type PostsFormValues = z.infer<typeof formSchema>;

interface PostsFormProps {
  initialData: Posts | null;
}

export const PostsForm: React.FC<PostsFormProps> = ({ initialData }) => {
  const [posts, setPosts] = useState<Posts | null>(null);

  const params = useParams();
  const router = useRouter();
  const supabase = createClient();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // If initialData is not null, update the default values accordingly
  useEffect(() => {
    if (initialData) {
      form.reset({
        ...form.getValues(),
        title: initialData.title,
        body: initialData.body,
        conclusion: initialData.conclusion,
        hook: initialData.hook,
        is_featured: initialData.is_featured,
        is_archived: initialData.is_archived,
      });
    }
  }, [initialData]);

  const form = useForm<PostsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      body: "",
      conclusion: "",
      hook: "",
      is_featured: false,
      is_archived: false,
    },
  });

  const onSubmit = async (data: PostsFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        try {
          const { data: updatedData, error } = await supabase
            .from("posts")
            .update({
              title: data.title,
              conclusion: data.conclusion,
              hook: data.hook,
              body: data.body,
              is_featured: data.is_featured,
              is_archived: data.is_archived,
            })
            .match({ id: initialData?.id });

          toast({ title: "success" });

          if (error) {
            throw error;
          }
        } catch (error) {
          console.error("Error during update:", error);
        }
      }
      router.refresh();
      router.push(`/${params.besId}/blog/posts`);
    } catch (error: any) {
      toast({ title: "success" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={"Edit Post Title"}
          description={"Edit the name of your author here"}
        />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="gap-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Confirm Edit
          </Button>
        </form>
      </Form>
    </>
  );
};
