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
  label: z.string().min(2),
  //   body: z.string().min(2),
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
        .from("billboard")
        .insert([
          {
            label: values.label,

            ecommerce_id: params.besId,
          },
        ])
        .select();

      if (error) {
        toast({ title: "Something went wrong.", variant: "destructive" });

        throw error;
      }

      router.refresh();
      router.push(`/${params.besId}/ecommerce/billboards`);
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
            title={"Create a billboard"}
            description={
              "You can use this for your categoried pages, some guidelines to follow here 🔗."
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
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Provide a label for this billboard"
                        {...field}
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
