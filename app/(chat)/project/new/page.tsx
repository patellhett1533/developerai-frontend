"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { post_api } from "@/helper/api";

const FormSchema = z.object({
  project_name: z.string().min(3, {
    message: "Enter a relevant name for your project.",
  }),
  github_url: z
    .string()
    .regex(/^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/, {
      message: "Please enter a valid GitHub repository URL.",
    }),
  githubToken: z.string().optional(),
});

const CreateProjectForm: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      project_name: "",
      github_url: "",
      githubToken: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>): Promise<void> {
    setIsLoading(true);
    const token = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("token="))
      ?.split("=")[1];
    const {data: response, message} = await post_api("/dashboard", data);
    setIsLoading(false);
    if (response) {
      toast("Great! Your project is created.");
      router.push(`/chat/${response.id}`);
    } else {
      toast("You are logged out.");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-1/2 mx-auto space-y-4"
      >
        <FormField
          control={form.control}
          name="project_name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter your project name"
                  className="focus-visible:ring-0"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="github_url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Paste respository url"
                  className="focus-visible:ring-0"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="githubToken"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Github Token (optional)"
                  className="focus-visible:ring-0"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {isLoading ? (
            <>
              <Loader className="animate-spin" />
            </>
          ) : (
            "Create Project"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateProjectForm;
