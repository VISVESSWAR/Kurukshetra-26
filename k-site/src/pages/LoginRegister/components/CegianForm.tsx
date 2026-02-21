import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useSearchParams } from "react-router-dom";
import {
  CustomSelect,
  type SelectOption,
} from "@/components/Forms/CustomSelect";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  LuAtSign,
  LuLock,
  LuEye,
  LuEyeOff,
  LuUser,
  LuPhone,
  //   LuGraduationCap,
} from "react-icons/lu";
import { HiOutlineIdentification } from "react-icons/hi2";
import { PhoneCode } from "@/components/Forms/PhoneCode";
import { DatePicker } from "@/components/Forms/DatePicker";
import { Link } from "react-router-dom";
import { cegYears } from "@/constants/form";
import { useAuth } from "@/context/utils/useAuth";
import type { RegisterPayload } from "@/context/utils/auth_types";

const cegianFormSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email required." })
      .email("Enter a valid email."),
    fname: z.string().min(1, { message: "Name required" }),
    lname: z.string().min(1, { message: "Name required" }),
    mobile: z.string().min(10, {
      message: "Enter a valid mobile number.",
    }),
    dob: z.date().max(new Date(2008, 1, 1), {
      message: "Enter a valid dob.",
    }),
    roll: z.string().min(1, { message: "Roll number required" }),
    department: z.string().min(1, { message: "Department required" }),
    year: z.string().min(1, { message: "Year required" }),
    password: z.string().min(1, { message: "Minimum 1 characters." }),
    confirm: z.string().min(1, { message: "Minimum 1 characters." }),
    terms: z.boolean().refine((data) => data, {
      message: "Accept the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  })
  .refine(
    (data) => {
      const rollNumber = Number(data.roll);
      return Number.isInteger(rollNumber) && rollNumber > 0;
    },
    {
      message: "Enter a valid Roll Number",
      path: ["roll"],
    },
  );

const cegianFormSchemaG = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email required." })
      .email("Enter a valid email."),
    fname: z.string().min(1, { message: "Name required" }),
    lname: z.string().min(1, { message: "Name required" }).optional(),
    mobile: z.string().min(10, {
      message: "Enter a valid mobile number.",
    }),
    dob: z.date().max(new Date(2008, 1, 1), {
      message: "Enter a valid dob.",
    }),
    roll: z.string().min(1, { message: "Roll number required" }),
    department: z.string().min(1, { message: "Department required" }),
    year: z.string().min(1, { message: "Year required" }),
    terms: z.boolean().refine((data) => data, {
      message: "Accept the terms and conditions.",
      path: ["terms"],
    }),
  })
  .refine(
    (data) => {
      const rollNumber = Number(data.roll);
      return Number.isInteger(rollNumber) && rollNumber > 0;
    },
    {
      message: "Enter a valid Roll Number",
      path: ["roll"],
    },
  );

type CegianFormValues =
  | z.infer<typeof cegianFormSchema>
  | z.infer<typeof cegianFormSchemaG>;

interface CegianFormProps {
  verifiedEmail?: string;
}

const CegianForm = ({ verifiedEmail }: CegianFormProps) => {
  const { handleKRegister } = useAuth();
  const [searchParams] = useSearchParams();
  const [country, setCountry] = useState("India");
  const [showPassword, setShowPassword] = useState(false);
  const inputStyles =
    "flex items-center rounded-full px-4 py-2.5 border border-white/50 bg-transparent transition-all duration-300 focus-within:border-[#7a28ff] focus-within:shadow-[0_0_12px_rgba(122,40,255,0.4)]";
  const iconStyles = "h-5 w-5 text-white shrink-0";
  const labelStyles = "text-white font-medium font-novaSquare text-sm";
  const form = useForm<CegianFormValues>({
    resolver: zodResolver(verifiedEmail ? cegianFormSchemaG : cegianFormSchema),
  });

  const convertDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options).replace(/\//g, "-");
  };

  const onSubmit = (data: CegianFormValues) => {
    const payload: RegisterPayload = {
      firstname: data.fname,
      lastname: data.lname || "",
      email: data.email,
      phone: data.mobile,
      college: "CEG",
      city: "Chennai",
      state: "Tamil Nadu",
      dept: data.department,
      roll: data.roll,
      dob: convertDate(data.dob),
      year: Number(data.year),
      pwd: "password" in data ? data.password : undefined,
      gauthToken: searchParams.get("user") || undefined,
    };
    handleKRegister(payload);
  };

  useEffect(() => {
    if (verifiedEmail) {
      form.setValue("email", verifiedEmail);
    } else {
      // Set default values
      form.setValue("email", "amvisvesswar2004@gmail.com");
      form.setValue("fname", "John");
      form.setValue("lname", "Doe");
      form.setValue("mobile", "7418243840");
      form.setValue("roll", "2022103013");
      form.setValue("department", "Computer Science");
      form.setValue("year", "4");
      form.setValue("dob", new Date(2004, 9, 31));
      form.setValue("password", "Password123");
      form.setValue("confirm", "Password123");
      form.setValue("terms", false);
    }
  }, [verifiedEmail, form]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const yearOptions: SelectOption[] = cegYears.map((y) => ({
    value: y.value,
    label: y.label,
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Section 1: Email Field */}
        <div className="grid grid-cols-1 gap-6">
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
                      className="border-0 bg-transparent focus:outline-none"
                      type="email"
                      disabled={!!verifiedEmail}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Section 1b: Name Fields - 50% each */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn(labelStyles)}>First Name</FormLabel>
                <FormControl>
                  <div className={cn(inputStyles)}>
                    <LuUser className={cn(iconStyles)} />
                    <Input
                      placeholder="First Name"
                      {...field}
                      className="border-0 bg-transparent focus:outline-none"
                      type="text"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn(labelStyles)}>Last Name</FormLabel>
                <FormControl>
                  <div className={cn(inputStyles)}>
                    <Input
                      placeholder="Last Name"
                      {...field}
                      className="border-0 bg-transparent focus:outline-none"
                      type="text"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Section 2: Mobile and Department Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn(labelStyles)}>Mobile</FormLabel>
                <FormControl>
                  <div className={cn(inputStyles)}>
                    <LuPhone className={cn(iconStyles)} />
                    <PhoneCode countryName={country} setCountry={setCountry} />
                    <Input
                      placeholder="Mobile Number"
                      {...field}
                      className="border-0 bg-transparent pl-1 md:pl-1.5 focus:outline-none"
                      type="tel"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn(labelStyles)}>Department</FormLabel>
                <FormControl>
                  <div className={cn(inputStyles)}>
                    <Input
                      placeholder="Department"
                      {...field}
                      className="border-0 bg-transparent focus:outline-none"
                      type="text"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Section 3: DOB and Year Fields */}
        <div className="grid grid-cols-1  gap-6">
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className={cn(labelStyles)}>Date of Birth</FormLabel>
                <DatePicker
                  value={field.value || new Date()}
                  onChange={field.onChange}
                  inputStyles={inputStyles}
                  iconStyles={iconStyles}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Section 2b: Roll Number Field */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="roll"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(labelStyles)}>Roll Number</FormLabel>
                  <FormControl>
                    <div className={cn(inputStyles)}>
                      <HiOutlineIdentification className={cn(iconStyles)} />
                      <Input
                        placeholder="Registration Number"
                        {...field}
                        className="border-0 bg-transparent focus:outline-none"
                        type="text"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className={cn(labelStyles)}>
                    Year of Study
                  </FormLabel>
                  <FormControl>
                    <div className={cn(inputStyles, "relative")}>
                      <HiOutlineIdentification className={cn(iconStyles)} />
                      <CustomSelect
                        value={field.value}
                        onChange={field.onChange}
                        options={yearOptions}
                        placeholder="Select Year Of Study"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Section 4: Password Fields (when not verified email) */}
        {!verifiedEmail && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        className="border-0 bg-transparent focus:outline-none"
                      />
                      <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-100">
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
                        type="password"
                        placeholder="Confirm Password"
                        {...field}
                        className="border-0 bg-transparent focus:outline-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {/* Section 5: Centered Action Area (Terms & Register Button) */}
        <div className="flex flex-col items-center gap-4 pt-4">
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value || false}
                    onChange={(checked) => field.onChange(checked)}
                    className="h-[1.05rem] w-[1.05rem] rounded-[0.25rem] border-white/50 data-[state=checked]:bg-[#7a28ff]"
                  />
                </FormControl>
                <div className="flex items-center font-novaSquare leading-none">
                  <p className="text-sm text-white/70">Accept</p>
                  <Link
                    to={"/terms"}
                    className="ml-2 cursor-pointer text-sm text-[#7a28ff] underline-offset-4 transition-colors hover:text-[#8A05FF] hover:underline"
                  >
                    Terms&nbsp;&amp;&nbsp;Conditions
                  </Link>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="w-full max-w-sm rounded-lg py-2.5 font-subtitle font-medium tracking-widest bg-[#7a28ff] text-white transition-all hover:shadow-[0_0_16px_rgba(122,40,255,0.6)] border border-[#7a28ff]/50"
          >
            Register
          </button>
        </div>
      </form>
    </Form>
  );
};

export default CegianForm;
