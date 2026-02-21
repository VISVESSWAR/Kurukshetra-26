import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LuAtSign, LuLock, LuEye, LuEyeOff } from "react-icons/lu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/utils/useAuth";
import TextDivider from "./TextDivider";
import GoogleOAuthLogin from "./GoogleOAuthLogin";
import type { LoginPayload } from "@/context/utils/auth_types";

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email required." })
    .email("This is not a valid email."),
  password: z.string().min(1, { message: "Minimum 1 characters." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const inputStyles =
    "flex items-center rounded-full px-4 py-2.5 border border-white/50 bg-transparent transition-all duration-300 focus-within:border-[#7a28ff] focus-within:shadow-[0_0_12px_rgba(122,40,255,0.4)]";
  const iconStyles = "h-5 w-5 text-white shrink-0";
  const labelStyles = "text-white font-medium font-novaSquare text-sm";
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  const { handleKLogin } = useAuth();

  const onSubmit = (data: LoginFormValues) => {
    handleKLogin({
      email: data.email,
      pwd: data.password,
    } as LoginPayload);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full max-w-md rounded-xl border border-white/20 bg-slate-950/50 px-8 py-12 backdrop-blur-md text-white">
      <div className="w-full">
        <h2 className="z-10 mb-6 font-euroStyle font-semibold uppercase text-white [text-shadow:5px_5px_5px_rgba(122,40,255,0.3)] text-3xl text-center">
          Login to K! 26
        </h2>
        <div className="w-full" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-xs space-y-4 min-[500px]:w-[100vw]"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(labelStyles)}>Email</FormLabel>

                  <FormControl>
                    <div className={cn(inputStyles)}>
                      <LuAtSign className={cn(iconStyles)} />
                      <Input
                        placeholder="johndoe@gmail.com"
                        {...field}
                        className="border-0 bg-transparent dark:bg-transparent"
                        type="email"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <div className="flex justify-end">
              <Link
                to="/forgotpassword"
                className={cn(
                  "cursor-pointer pb-3 font-novaSquare text-sm font-normal text-[#7a28ff] underline-offset-4 hover:underline hover:text-[#8A05FF]",
                )}
              >
                Forgot Password?
              </Link>
            </div>
            <div className="w-full">
              <button
                type="submit"
                className="w-full rounded-lg py-2.5 font-subtitle font-medium tracking-widest bg-[#7a28ff] text-white transition-all hover:shadow-[0_0_16px_rgba(122,40,255,0.6)] border border-[#7a28ff]/50"
              >
                Login
              </button>
            </div>
            <div className="flex items-end justify-center font-novaSquare">
              <span className="text-xs tracking-wider opacity-70">
                Don't have an account?
              </span>
              <Link
                to="/register"
                className="ml-3 cursor-pointer text-sm text-[#7a28ff] underline-offset-4 transition-colors hover:text-[#8A05FF] hover:underline"
              >
                Register now
              </Link>
            </div>
            <TextDivider text={"Or"} />

            <div className="w:full flex justify-center align-middle font-novaSquare">
              <GoogleOAuthLogin />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
