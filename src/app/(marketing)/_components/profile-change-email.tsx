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
import { Shuffle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
  AccountSectionTriggers,
  SectionActionButtons,
} from "./section-layout-wrapper";

function ChangeEmailForm(triggers: AccountSectionTriggers) {
  return (
    <div className="space-y-3">
      <section>
        <UpdateForm triggers={triggers} />
      </section>
    </div>
  );
}
const updateEmailSchema = z.object({
  email: z.email().min(1, "Email is required"),
});
type UpdateEmailSchemaType = z.infer<typeof updateEmailSchema>;
function UpdateForm({ triggers }: { triggers: AccountSectionTriggers }) {
  const form = useForm<UpdateEmailSchemaType>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (val: UpdateEmailSchemaType) => {
    const result = await authClient.changeEmail({
      newEmail: val.email,
    });
    if (result.error) {
      return toast.error(result.error.message || result.error.statusText);
    }
    if (result.data.status) {
      toast.success("A verfication link has sent to you current email");
      form.reset();
    }
  };

  const isPending = form.formState.isSubmitting;
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New email</FormLabel>
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
            buttonText="Change"
            buttonType="submit"
          />
        </form>
      </Form>
    </div>
  );
}

function ChangeEmailTrigger({ onOpen }: AccountSectionTriggers) {
  const { data } = authClient.useSession();
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <Avatar>
          <AvatarImage src={data?.user.image || ""} />
          <AvatarFallback>SN</AvatarFallback>
        </Avatar>
        {data?.user.email}
      </div>
      <Button onClick={onOpen} variant={"ghost"} className="text-blue-500">
        Change email <Shuffle />
      </Button>
    </div>
  );
}

export { ChangeEmailForm, ChangeEmailTrigger };
