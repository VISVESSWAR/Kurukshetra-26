import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CustomSelect, type SelectOption } from "@/components/Forms/CustomSelect";
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
  LuSchool,
  LuGraduationCap,
  LuMapPin,
  LuMap,
  LuTag,
} from "react-icons/lu";
import { HiOutlineIdentification } from "react-icons/hi2";
import { PhoneCode } from "@/components/Forms/PhoneCode";
import { Link, useSearchParams } from "react-router-dom";
import {
  years,
  indianCities as cities,
  indianStates as states,
} from "@/constants/locations";
import { useAuth } from "@/context/utils/useAuth";
import type { RegisterPayload } from "@/context/utils/auth_types";

const convertNameToValue = (
  states: Array<{ code: string; name: string }>
): SelectOption[] => {
  return states.map((state) => ({
    value: state.code,
    label: state.name,
  }));
};

const updatedStates = convertNameToValue(states);

const otherFormSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email required." })
      .email("Enter a valid email."),
    fname: z.string().min(1, { message: "First name required" }),
    lname: z.string().optional(),
    mobile: z.string().min(10, {
      message: "Enter a valid mobile number.",
    }),
    college: z.string().min(1, { message: "College required" }),
    city: z.string().min(1, { message: "City required" }),
    state: z.string().min(1, { message: "State required" }),
    department: z.string().min(1, { message: "Department required" }),
    year: z.string().min(1, { message: "Year required" }),
    referralCode: z.string().optional(),
    password: z.string().min(1, { message: "Minimum 1 characters." }),
    confirm: z.string().min(1, { message: "Minimum 1 characters." }),
    terms: z.boolean().refine((data) => data === true, {
      message: "Accept the terms & conditions.",
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

const otherFormSchemaG = z.object({
  email: z
    .string()
    .min(1, { message: "Email required." })
    .email("Enter a valid email."),
  fname: z.string().min(1, { message: "First name required" }),
  lname: z.string().min(1, { message: "Last name required" }),
  mobile: z.string().min(10, {
    message: "Enter a valid mobile number.",
  }),
  college: z.string().min(1, { message: "College required" }),
  city: z.string().min(1, { message: "City required" }),
  state: z.string().min(1, { message: "State required" }),
  department: z.string().min(1, { message: "Department required" }),
  year: z.string().min(1, { message: "Year required" }),
  referralCode: z.string().optional(),
  terms: z.boolean().refine((data) => data === true, {
    message: "Accept the terms & conditions.",
    path: ["terms"],
  }),
});

type OtherFormValues =
  | z.infer<typeof otherFormSchema>
  | z.infer<typeof otherFormSchemaG>;

interface OtherFormProps {
  verifiedEmail?: string;
}

const OtherForm = ({ verifiedEmail }: OtherFormProps) => {
  const { handleKRegister } = useAuth();
  const [searchParams] = useSearchParams();
  const [country, setCountry] = useState("India");
  const [showPassword, setShowPassword] = useState(false);
  const inputStyles =
    "flex items-center rounded-full px-4 py-2.5 border border-white/50 bg-transparent backdrop-blur-xs transition-all duration-300 focus-within:border-[#7a28ff] focus-within:shadow-[0_0_12px_rgba(122,40,255,0.4)]";
  const iconStyles = "h-5 w-5 text-white shrink-0";
  const labelStyles = "text-white font-medium font-novaSquare text-sm";
  const form = useForm<OtherFormValues>({
    resolver: zodResolver(verifiedEmail ? otherFormSchemaG : otherFormSchema),
    defaultValues: {
      state: "Tamil Nadu",
    },
  });

  useEffect(() => {
    const currentState = form.getValues().state;
    const citiesForState = currentState
      ? cities[currentState as keyof typeof cities]
      : undefined;
    if (currentState && citiesForState && citiesForState.length > 0) {
      form.setValue("city", citiesForState[0]);
    }
  }, [form.watch("state"), form]);

  useEffect(() => {
    if (verifiedEmail) form.setValue("email", verifiedEmail);
  }, [verifiedEmail, form]);

  const onSubmit = (data: OtherFormValues) => {
    const payload: RegisterPayload = {
      firstname: data.fname,
      lastname: data.lname || "",
      email: data.email,
      phone: data.mobile,
      college: data.college,
      state: data.state,
      city: data.city,
      dept: data.department,
      year: Number(data.year),
      pwd: "password" in data ? data.password : undefined,
      gauthToken: searchParams.get("user") || undefined,
      code: data.referralCode,
    };
    handleKRegister(payload);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const citiesForState =
    cities[form.getValues().state as keyof typeof cities] || [];
  const cityOptions: SelectOption[] = citiesForState.map((city) => ({
    value: city,
    label: city,
  }));

  const yearOptions: SelectOption[] = years.map((y) => ({
    value: y.value,
    label: y.name,
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
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

        {/* Name Fields - 50% each */}
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
        {/* Mobile and College Fields */}
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
            name="college"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn(labelStyles)}>College</FormLabel>
                <FormControl>
                  <div className={cn(inputStyles)}>
                    <LuSchool className={cn(iconStyles)} />
                    <Input
                      placeholder="College"
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

        {/* Department and Year Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn(labelStyles)}>Department</FormLabel>
                <FormControl>
                  <div className={cn(inputStyles)}>
                    <LuGraduationCap className={cn(iconStyles)} />
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
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn(labelStyles)}>Year</FormLabel>
                <FormControl>
                  <div className={cn(inputStyles)}>
                    <HiOutlineIdentification className={cn(iconStyles)} />
                    <CustomSelect
                      value={field.value}
                      onChange={field.onChange}
                      options={yearOptions}
                      placeholder="Select Year"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* State and City Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn(labelStyles)}>State</FormLabel>
                <FormControl>
                  <div className={cn(inputStyles)}>
                    <LuMap className={cn(iconStyles)} />
                    <CustomSelect
                      value={field.value}
                      onChange={(selectedState) => {
                        field.onChange(selectedState);
                        const citiesForState =
                          cities[
                            String(selectedState) as keyof typeof cities
                          ] || [];
                        if (citiesForState.length > 0) {
                          form.setValue("city", citiesForState[0]);
                        }
                      }}
                      options={updatedStates}
                      placeholder="Select state"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn(labelStyles)}>City</FormLabel>
                <FormControl>
                  <div className={cn(inputStyles)}>
                    <LuMapPin className={cn(iconStyles)} />
                    <CustomSelect
                      value={field.value}
                      onChange={field.onChange}
                      options={cityOptions}
                      placeholder="Select city"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Password Fields (when not verified email) */}
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
                  <FormLabel className={cn(labelStyles)}>Confirm Password</FormLabel>
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

        {/* Referral Code Field */}
        <FormField
          control={form.control}
          name="referralCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={cn(labelStyles)}>
                Referral Code{" "}
                <span className="ml-1 text-sm font-normal text-violet-300 opacity-80">
                  (optional)
                </span>
              </FormLabel>
              <FormControl>
                <div className={cn(inputStyles)}>
                  <LuTag className={cn(iconStyles)} />
                  <Input
                    placeholder="Referral Code"
                    {...field}
                    className="border-0 bg-transparent focus:outline-none"
                    type="text"
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Terms and Submit */}
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
                <div className="font-novaSquare flex items-center leading-none">
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

export default OtherForm;
