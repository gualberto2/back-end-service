"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";

import { Input } from "./ui/input";
import { createClient } from "@/lib/supabase/client";

import { useRouter } from "next/navigation";
import { toast, useToast } from "./ui/use-toast";
import { useBesModal } from "@/hooks/use-bes-modal";

const formSchema = z.object({
  name: z.string({ required_error: "Please enter a name" }).min(1),
  type: z.string({ required_error: "Please enter a name" }).min(1),
});

const CreateBes = () => {
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const { onClose } = useBesModal();

  const router = useRouter();
  const supabase = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("bes")
        .insert([{ name: values.name, type: values.type }])
        .select();

      if (!error) {
        toast({
          title: "Successfully created!",
          description: `The BES ${values.name} has been created!`,
        });

        onClose();

        router.push("/");
        await router.refresh();
      } else {
        toast({
          title: "Error",
          description: "An error occurred while creating the BES.",
        });
      }
    } catch (error) {
      // Handle any other errors here
      console.error("Submission error:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="flex flex-row gap-1">
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a BES Here</DialogTitle>
          <DialogDescription>
            Please provide a name and select what type you would like to create.
          </DialogDescription>
          <div className="">
            <div className="space-y-4  py-2 pb-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              placeholder="Ecommerce"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a type of BES" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Types</SelectLabel>{" "}
                                {/* Just label, no value */}
                                <SelectItem value="blog">Blog</SelectItem>
                                <SelectItem value="ecommerce">
                                  Ecommerce
                                </SelectItem>
                                <SelectItem value="helpdesk">
                                  HelpDesk
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>

                    <Button disabled={loading} type="submit">
                      Continue
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default CreateBes;
