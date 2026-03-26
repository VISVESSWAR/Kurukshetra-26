import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useSearchParams } from "react-router-dom";
import { LuLock, LuEye, LuEyeOff } from "react-icons/lu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/utils/useAuth";
import type { ResetPasswordPayload } from "@/context/utils/auth_types";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, { message: "Minimum 8 characters." }),
    confirm: z.string().min(8, { message: "Minimum 8 characters." }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
  verifiedEmail?: string;
}

const ResetPasswordForm = ({ verifiedEmail: _ }: ResetPasswordFormProps) => {
  const { handleResetPassword } = useAuth();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const inputStyles =
    "flex items-center rounded-full px-4 py-2.5 border border-white/50 bg-transparent transition-all duration-300 focus-within:border-[#7a28ff] focus-within:shadow-[0_0_12px_rgba(122,40,255,0.4)]";
  const iconStyles = "h-5 w-5 text-white shrink-0";
  const labelStyles = "text-white font-medium font-novaSquare text-sm";
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    handleResetPassword({
      pwd: data.password,
      user: searchParams.get("user") || undefined,
      key: searchParams.get("key") || undefined,
    } as ResetPasswordPayload);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="mr-0 mt-16 w-fit overflow-y-auto rounded-xl border border-violet-300/20 bg-slate-950/50 px-8 pb-12 backdrop-blur-md lg:mr-[8vw] lg:bg-light/20 text-white">
      <div className="max-w-xd w-full pt-8">
        <h2 className="z-10 mt-4 mb-6 font-euroStyle font-semibold uppercase text-light [text-shadow:5px_5px_5px_blue] md:text-3xl text-3xl text-center">
          Reset Password
        </h2>
        <div className="w-full" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(labelStyles)}>Password</FormLabel>
                  <FormControl>
                    <div className={cn(inputStyles, "relative")}>
                      <LuLock className={cn(iconStyles)} />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                        className="border-0 bg-transparent dark:bg-transparent"
                      />
                      <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400">
                        {showPassword ? (
                          <LuEyeOff
                            className="h-4 w-4"
                            onClick={togglePasswordVisibility}
                          />
                        ) : (
                          <LuEye
                            className="h-4 w-4"
                            onClick={togglePasswordVisibility}
                          />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(labelStyles)}>
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className={cn(inputStyles, "relative")}>
                      <LuLock className={cn(iconStyles)} />
                      <Input
                        type={"password"}
                        placeholder="Confirm Password"
                        {...field}
                        className="border-0 bg-transparent dark:bg-transparent"
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
                className="w-full rounded-lg border-2 border-orange-200/10 bg-black/50 py-2 font-subtitle font-medium tracking-widest text-orange-400 transition-colors hover:bg-slate-950/60"
              >
                Reset
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
