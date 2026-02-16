import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, ArrowLeft } from "lucide-react";

// VALIDATION SCHEMA
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email required." })
    .email("Enter a valid email."),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm = ({ verifiedEmail }: { verifiedEmail?: boolean }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordValues) => {
    console.log("Simulating password reset for:", data.email);
    alert("If this email is registered, a reset link will be sent.");
  };

  // Shared theme styles from your Register page
  const inputBase = "w-full bg-[#1A0B2E]/40 border-[0.5px] border-white/40 rounded-[15px] text-white text-sm focus:outline-none focus:border-purple-500 transition-all shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)] appearance-none";

  return (
    <div className="rounded-[15px] p-8 border-[0.5px] border-white/40 bg-white/[0.02] backdrop-blur-xl shadow-2xl w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white tracking-widest uppercase mb-2" style={{ fontFamily: 'Orbitron' }}>
          Verify <span className="text-purple-500">Email</span>
        </h2>
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-tight">
          Enter your registered email to receive a reset link
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="text-white text-[11px] font-bold uppercase tracking-wider ml-2 mb-1 block">
            Email ID
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 w-5 h-5" />
            <input
              {...register("email")}
              placeholder="johndoe@gmail.com"
              disabled={!!verifiedEmail}
              className={`${inputBase} pl-12 pr-5 py-3`}
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-[10px] mt-2 ml-2 font-bold">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="pt-2 space-y-4">
          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-600 text-white py-3.5 rounded-[15px] font-bold shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all uppercase tracking-widest"
          >
            Verify
          </button>
          
          <div className="flex flex-col items-center gap-2">
            <p className="text-center text-gray-400 text-xs">
              Remembered your password? 
              <a href="/login" className="text-[#D81B60] font-bold hover:underline ml-1">Login</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;