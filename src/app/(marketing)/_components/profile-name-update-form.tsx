import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
  AccountSectionTriggers,
  SectionActionButtons,
} from "./section-layout-wrapper";

function ProfileNameUpdateForm(triggers: AccountSectionTriggers) {
  return (
    <div className="space-y-3">
      <section className="flex items-center justify-start gap-3">
        <Avatar>
          <AvatarImage src={""} />
          <AvatarFallback>SN</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-1">
            <Button size={"sm"} variant={"outline"}>
              Upload
            </Button>
            <Button size={"sm"} variant={"ghost"} className="text-red-500">
              Remove
            </Button>
          </div>
          <h3 className="text-xs text-muted-foreground">
            Recommended size 1:1, up to 10MB.
          </h3>
        </div>
      </section>
      <section>
        <UpdateForm triggers={triggers} />
      </section>
    </div>
  );
}
const updateSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
type UpdateSchemaType = z.infer<typeof updateSchema>;
function UpdateForm({ triggers }: { triggers: AccountSectionTriggers }) {
  const { data } = authClient.useSession();
  const router = useRouter();
  const form = useForm<UpdateSchemaType>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      name: data?.user.name ?? "",
    },
  });

  const handleSubmit = async (val: UpdateSchemaType) => {
    const result = await authClient.updateUser(val);
    if (result.data) {
      toast.success("Name is updated");
      router.refresh();
    }
    if (result.error) {
      toast.error(result.error.message ?? "Error Occures");
    }
  };

  const isPending = form.formState.isSubmitting;
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <Input
                  placeholder="eg: email@gmail.com"
                  {...field}
                  type="text"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <SectionActionButtons
            isPending={isPending}
            onClose={triggers.onClose}
            buttonText="Save"
            buttonType="submit"
          />
        </form>
      </Form>
    </div>
  );
}

function ProfileNameUpdateTrigger({ onOpen }: AccountSectionTriggers) {
  const { data } = authClient.useSession();
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <Avatar>
          <AvatarImage src={""} />
          <AvatarFallback>SN</AvatarFallback>
        </Avatar>
        {data?.user.name}
      </div>
      <Button onClick={onOpen} variant={"ghost"} className="text-blue-500">
        Update profile
      </Button>
    </div>
  );
}

export { ProfileNameUpdateForm, ProfileNameUpdateTrigger };
