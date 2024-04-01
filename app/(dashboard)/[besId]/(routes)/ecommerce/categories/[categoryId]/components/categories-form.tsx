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

import { Categories } from "@/utils/types";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2),
});

type CategoriesFormValues = z.infer<typeof formSchema>;

interface CategoriesFormProps {
  initialData: Categories | null;
}

export const CategoriesForm: React.FC<CategoriesFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      form.reset({
        ...form.getValues(),
        name: initialData.name,
      });
    }
  }, [initialData]);

  const form = useForm<CategoriesFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
    },
  });

  const onSubmit = async (data: CategoriesFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        try {
          const { data: updatedData, error } = await supabase
            .from("categories")
            .update({
              name: data.name,
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
      router.push(`/${params.besId}/ecommerce/categories`);
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
          title={"Edit Category"}
          description={"Edit the name of your category here"}
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Featured products!, Winter collection, Summer classics"
                      {...field}
                    />
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
