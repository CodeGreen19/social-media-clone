import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/server/post";
import { toast } from "sonner";
export default function AddPost() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Add post</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a new post</SheetTitle>
        </SheetHeader>
        <div className="px-6">
          <AddPostForm />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export const addPostSchema = z.object({
  title: z.string().min(5, "Name is must be at least 5 char"),
  description: z.string().min(5, "Desc is must be at least 5 char"),
});
export type AddPostSchema = z.infer<typeof addPostSchema>;
function AddPostForm() {
  const form = useForm<AddPostSchema>({
    resolver: zodResolver(addPostSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleSubmit = async (val: AddPostSchema) => {
    const data = await createPost({ input: val });
    toast.success(data.message);
  };

  const isPending = form.formState.isSubmitting;
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="eg: new css property has come"
                  {...field}
                  type="text"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descriptions</FormLabel>
                <Textarea
                  className="min-h-52"
                  placeholder="eg: description"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end">
            <Button disabled={isPending} type="submit">
              Post
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
