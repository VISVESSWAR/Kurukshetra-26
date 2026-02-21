import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LuAtSign } from "react-icons/lu";
import { useAuth } from "@/context/utils/useAuth";
import type { ForgotPasswordPayload } from "@/context/utils/auth_types";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email required." })
    .email("Enter a valid email."),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  verifiedEmail?: string;
}

const ForgotPasswordForm = ({ verifiedEmail }: ForgotPasswordFormProps) => {
  const { handleForgotPassword } = useAuth();
  const inputStyles =
    "flex items-center rounded-full px-4 py-2.5 border border-white/50 bg-transparent backdrop-blur-xs transition-all duration-300 focus-within:border-[#7a28ff] focus-within:shadow-[0_0_12px_rgba(122,40,255,0.4)]";
  const iconStyles = "h-5 w-5 text-white shrink-0";
  const labelStyles = "text-white font-medium font-novaSquare text-sm";
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    handleForgotPassword({
      email: data.email,
    } as ForgotPasswordPayload);
  };

  React.useEffect(() => {
    if (verifiedEmail) {
      form.setValue("email", verifiedEmail);
    }
  }, [verifiedEmail, form]);

  return (
    <div className="w-full max-w-md rounded-xl border border-white/20 bg-slate-950/50 px-8 py-12 backdrop-blur-md text-white">
      <div className="w-full">
        <h2 className="z-10 mb-6 font-euroStyle font-semibold uppercase text-white [text-shadow:5px_5px_5px_rgba(122,40,255,0.3)] text-3xl text-center">
          Verify your email
        </h2>
        <div className="w-full" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(labelStyles)}>Email ID</FormLabel>
                  <FormControl>
                    <div className={cn(inputStyles)}>
                      <LuAtSign className={cn(iconStyles)} />
                      <Input
                        placeholder="johndoe@gmail.com"
                        {...field}
                        className="border-0 bg-transparent dark:bg-transparent"
                        type="email"
                        disabled={!!verifiedEmail}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full pt-4">
              <button
                type="submit"
                className="w-full rounded-lg py-2.5 font-subtitle font-medium tracking-widest bg-[#7a28ff] text-white transition-all hover:shadow-[0_0_16px_rgba(122,40,255,0.6)] border border-[#7a28ff]/50"
              >
                Verify
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
