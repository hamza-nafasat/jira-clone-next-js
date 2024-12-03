"use client";

import { DottedSeparator } from "@/app/components/dotted-separator";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useCreateWorkspace from "../apis/use-create-workspace";
import { createWorkspaceSchema } from "../utils/schemas";

interface CreateWorkspaceFormProps {
  onCancel?: () => void;
}

const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProps) => {
  const { mutate, isPending } = useCreateWorkspace();
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof createWorkspaceSchema>) => {
    const finalValues = { ...values, image: values.image instanceof File ? values.image : "" };
    mutate({ form: finalValues }, { onSuccess: () => form.reset() });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) form.setValue("image", file);
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">Create a new workspace</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter workspace name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-5">
                      {field?.value ? (
                        <div className="size-[72px] rounded-medium overflow-hidden">
                          <Image
                            src={field?.value instanceof File ? URL.createObjectURL(field?.value) : field?.value}
                            alt={"logo"}
                            className="object-cover"
                            width={72}
                            height={72}
                          />
                        </div>
                      ) : (
                        <Avatar className="size-[72px]">
                          <AvatarFallback>
                            <ImageIcon className="size-[36px] text-neutral-400" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex flex-col">
                        <p className="text-sm">Workspace icon</p>
                        <p className="text-sm text-muted-foreground">JPG, PNG, SVG OR JPEG, MAX 5MB</p>
                      </div>
                      <Input
                        className="hidden"
                        type="file"
                        accept=".jpg, .jpeg, .png, .svg"
                        ref={inputRef}
                        disabled={isPending}
                        onChange={handleImageChange}
                      />
                      <Button
                        type="button"
                        size={"xs"}
                        onClick={() => inputRef.current?.click()}
                        disabled={isPending}
                        variant={"teritary"}
                        className="w-fit mt-2"
                      >
                        Upload Image
                      </Button>
                    </div>
                  </div>
                )}
              />
            </div>
            <DottedSeparator className="py-7" />

            <div className="flex items-center justify-between">
              <Button type="button" size={"lg"} variant={"secondary"} onClick={onCancel}>
                Cancel
              </Button>
              <Button disabled={isPending} size={"lg"}>
                Create Workspace
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateWorkspaceForm;
