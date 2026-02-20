import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Mail,
  Phone,
  Eye,
  EyeOff,
  ChevronDown,
  School,
  Lock,
  Ticket,
  MapPin,
} from "lucide-react";
import Background from "@/pages/Background";

import {
  indianStates,
  indianCities,
  dateMonths,
  dateYears,
  dateDays,
  academicYears,
} from "../constants/locations";

// ================= VALIDATION SCHEMA =================
const registerSchema = z
  .object({
    activeTab: z.enum(["cegian", "others"]),
    email: z.string().email("Invalid email"),
    firstName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),
    mobile: z.string().regex(/^[6-9]\d{9}$/, "Invalid mobile"),
    rollNumber: z.string().optional(),
    college: z.string().optional(),
    department: z.string().min(1, "Required"),
    year: z.string().min(1, "Required"),
    dobDay: z.string().optional(),
    dobMonth: z.string().optional(),
    dobYear: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    referralCode: z.string().optional(),
    password: z.string().min(6, "Min 6 characters"),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the Terms & Conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .superRefine((data, ctx) => {
    if (data.activeTab === "cegian") {
      if (!data.rollNumber)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Required",
          path: ["rollNumber"],
        });
      if (!data.dobDay || !data.dobMonth || !data.dobYear) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Required",
          path: ["dobDay"],
        });
      }
    } else {
      if (!data.college)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Required",
          path: ["college"],
        });
      if (!data.state)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Required",
          path: ["state"],
        });
      if (!data.city)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Required",
          path: ["city"],
        });
    }
  });

type RegisterValues = z.infer<typeof registerSchema>;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { activeTab: "cegian", state: indianStates[0].name },
  });

  const selectedState = watch("state");
  const activeTab = watch("activeTab");

  useEffect(() => {
    if (
      activeTab === "others" &&
      selectedState &&
      indianCities[selectedState]
    ) {
      setValue("city", indianCities[selectedState][0]);
    }
  }, [selectedState, activeTab, setValue]);

  const onSubmit = (data: RegisterValues) => {
    console.log("Registering User:", data);
    alert("Registration data logged to console!");
  };

  const inputBase =
    "w-full bg-[#1A0B2E]/40 border-[0.5px] border-white/40 rounded-[15px] text-white text-sm focus:outline-none focus:border-purple-500 transition-all shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)] appearance-none";
  const inputWithIcon = `${inputBase} pl-12 pr-5 py-2.5`;
  const inputNormal = `${inputBase} px-5 py-2.5`;

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4 bg-black font-sans pb-12">
      <Background />

      <div className="w-full max-w-4xl flex flex-col items-center relative z-10 mt-12">
        <h1
          className="text-3xl md:text-5xl font-bold text-center text-white tracking-widest mb-6 uppercase"
          style={{ fontFamily: "Orbitron" }}
        >
          Register for <span className="text-purple-500">K!26</span>
        </h1>

        <div className="flex gap-4 mb-8">
          <button
            type="button"
            onClick={() => setValue("activeTab", "cegian")}
            className={`px-12 md:px-16 py-2 rounded-full font-bold transition-all ${activeTab === "cegian" ? "bg-purple-600 text-white border-2 border-purple-400 shadow-lg" : "bg-white/5 text-purple-300"}`}
          >
            CEGian
          </button>
          <button
            type="button"
            onClick={() => setValue("activeTab", "others")}
            className={`px-12 md:px-16 py-2 rounded-full font-bold transition-all ${activeTab === "others" ? "bg-purple-600 text-white border-2 border-purple-400 shadow-lg" : "bg-white/5 text-purple-300"}`}
          >
            Others
          </button>
        </div>
      </div>

      <div className="w-full max-w-5xl relative z-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-[15px] p-8 border-[0.5px] border-white/40 bg-white/[0.02] backdrop-blur-xl shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {/* COLUMN 1 */}
            <div className="space-y-4">
              <Field label="Email Address" error={errors.email?.message}>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 w-4 h-4" />
                  <input
                    {...register("email")}
                    className={inputWithIcon}
                    placeholder="email@example.com"
                  />
                </div>
              </Field>

              <Field label="Full Name">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    {...register("firstName")}
                    className={inputNormal}
                    placeholder="First"
                  />
                  <input
                    {...register("lastName")}
                    className={inputNormal}
                    placeholder="Last"
                  />
                </div>
              </Field>

              <Field label="Mobile Number" error={errors.mobile?.message}>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 w-4 h-4" />
                  <input
                    {...register("mobile")}
                    className={inputWithIcon}
                    placeholder="9876543210"
                  />
                </div>
              </Field>

              {activeTab === "cegian" ? (
                <>
                  <Field label="Roll Number" error={errors.rollNumber?.message}>
                    <input
                      {...register("rollNumber")}
                      className={inputNormal}
                      placeholder="2023000000"
                    />
                  </Field>
                  <Field label="Date of Birth" error={errors.dobDay?.message}>
                    <div className="grid grid-cols-3 gap-2">
                      <select {...register("dobDay")} className={inputNormal}>
                        <option value="" className="bg-black">
                          Day
                        </option>
                        {dateDays.map((d) => (
                          <option
                            key={d.day}
                            value={d.day}
                            className="bg-black"
                          >
                            {d.day}
                          </option>
                        ))}
                      </select>
                      <select {...register("dobMonth")} className={inputNormal}>
                        <option value="" className="bg-black">
                          Month
                        </option>
                        {dateMonths.map((m) => (
                          <option
                            key={m.number}
                            value={m.number}
                            className="bg-black"
                          >
                            {m.month}
                          </option>
                        ))}
                      </select>
                      <select {...register("dobYear")} className={inputNormal}>
                        <option value="" className="bg-black">
                          Year
                        </option>
                        {dateYears.map((y) => (
                          <option
                            key={y.year}
                            value={y.year}
                            className="bg-black"
                          >
                            {y.year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Field>
                </>
              ) : (
                <>
                  <Field label="College Name" error={errors.college?.message}>
                    <div className="relative">
                      <School className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 w-4 h-4" />
                      <input
                        {...register("college")}
                        className={inputWithIcon}
                        placeholder="Enter College Name"
                      />
                    </div>
                  </Field>
                  <Field label="Department" error={errors.department?.message}>
                    <input
                      {...register("department")}
                      className={inputNormal}
                      placeholder="e.g. Mechanical"
                    />
                  </Field>
                  <Field label="Year of Study">
                    <select {...register("year")} className={inputNormal}>
                      <option value="" className="bg-black">
                        Select
                      </option>
                      {academicYears.map((y) => (
                        <option
                          key={y.value}
                          value={y.value}
                          className="bg-black"
                        >
                          {y.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                </>
              )}
            </div>

            {/* COLUMN 2 */}
            <div className="space-y-4">
              {activeTab === "cegian" ? (
                <>
                  <Field label="Department" error={errors.department?.message}>
                    <input
                      {...register("department")}
                      className={inputNormal}
                      placeholder="e.g. CSE"
                    />
                  </Field>
                  <Field label="Year of Study">
                    <select {...register("year")} className={inputNormal}>
                      <option value="" className="bg-black">
                        Select
                      </option>
                      {academicYears.map((y) => (
                        <option
                          key={y.value}
                          value={y.value}
                          className="bg-black"
                        >
                          {y.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                </>
              ) : (
                <>
                  <Field label="State">
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 w-4 h-4" />
                      <select {...register("state")} className={inputWithIcon}>
                        {indianStates.map((s) => (
                          <option
                            key={s.code}
                            value={s.name}
                            className="bg-black"
                          >
                            {s.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400 w-4 h-4 pointer-events-none" />
                    </div>
                  </Field>
                  <Field label="City">
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 w-4 h-4" />
                      <select {...register("city")} className={inputWithIcon}>
                        {(indianCities[selectedState || ""] || []).map((c) => (
                          <option key={c} value={c} className="bg-black">
                            {c}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400 w-4 h-4 pointer-events-none" />
                    </div>
                  </Field>
                  <Field label="Referral Code (Optional)">
                    <div className="relative">
                      <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 w-4 h-4" />
                      <input
                        {...register("referralCode")}
                        className={inputWithIcon}
                        placeholder="K26-XXXX"
                      />
                    </div>
                  </Field>
                </>
              )}

              <Field label="Password" error={errors.password?.message}>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 w-4 h-4" />
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className={inputWithIcon}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </Field>

              <Field
                label="Confirm Password"
                error={errors.confirmPassword?.message}
              >
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 w-4 h-4" />
                  <input
                    type="password"
                    {...register("confirmPassword")}
                    className={inputWithIcon}
                  />
                </div>
              </Field>

              {/* ACTION AREA */}
              <div className="pt-2 space-y-3">
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...register("acceptTerms")}
                      className="w-3.5 h-3.5 accent-purple-600 rounded"
                      id="terms"
                    />
                    <label
                      htmlFor="terms"
                      className="text-white/80 text-[11px] font-bold uppercase cursor-pointer tracking-tighter"
                    >
                      I Accept the Terms & Conditions
                    </label>
                  </div>

                  {errors.acceptTerms && (
                    <p className="text-red-400 text-[10px] font-medium">
                      {errors.acceptTerms.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-700 hover:bg-purple-600 text-white py-3 rounded-[15px] font-bold shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all uppercase tracking-widest"
                >
                  REGISTER
                </button>

                <p className="text-center text-gray-400 text-xs">
                  Already have an account?
                  <a
                    href="/login"
                    className="text-[#D81B60] font-bold hover:underline ml-1"
                  >
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <label className="text-white text-[11px] font-bold uppercase tracking-wider ml-2 mb-1 block">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-red-400 text-[10px] mt-1 ml-2 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
