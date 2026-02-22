import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { HelpCircle, Copy, Check } from "lucide-react";
import useGlitch from "@/hooks/useGlitch";
import { useAuth } from "@/context/utils/useAuth";
import {
  pageVariants,
  fadeUp,
  blurIn,
  slideLeft,
  slideRight,
  breathe,
  floatSlow,
  hoverLift,
} from "@/lib/animations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { apiGetAccommodation, apiRegisterAccommodation } from "@/api/user";
import toast from "react-hot-toast";
import qrCode from "@/assets/Accomodation/upi.jpg";
import upiRef from "@/assets/Accomodation/upi_id.jpg";

type Gender = "Male" | "Female" | "Others";

const accommodationSchema = z
  .object({
    upiTransactionId: z
      .string()
      .regex(/^\d+$/, { message: "Enter a valid UPI Transaction ID" })
      .min(1, "UPI Transaction ID required"),
    confirmUpiTransactionId: z
      .string()
      .regex(/^\d+$/, { message: "Enter a valid UPI Transaction ID" })
      .min(1, "Confirm UPI Transaction ID required"),
  })
  .refine(
    (data) => data.upiTransactionId === data.confirmUpiTransactionId,
    {
      message: "UPI Transaction IDs do not match",
      path: ["confirmUpiTransactionId"],
    }
  );

type AccommodationFormValues = z.infer<typeof accommodationSchema>;

const ALL_DATES = ["MAR 7", "MAR 8", "MAR 9"];

export default function Accommodation() {
  const { isAuthenticated } = useAuth();
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [gender, setGender] = useState<Gender | null>(null);
  const [food, setFood] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [accommodation, setAccommodation] = useState<{
    registered: boolean;
    isPaid: boolean;
    payid: string | false;
  }>({
    registered: false,
    isPaid: false,
    payid: false,
  });
  const glitch = useGlitch();

  const isAlreadyBooked = accommodation.registered && !!accommodation.payid;

  const togglePayment = () => {
    setIsOpen((prev) => !prev);
  };

  const form = useForm<AccommodationFormValues>({
    resolver: zodResolver(accommodationSchema),
    defaultValues: {
      upiTransactionId: "",
      confirmUpiTransactionId: "",
    },
  });

  const dates = ALL_DATES;
  const total = selectedDates.length * (food ? 450 : 300);

  const toggleDate = (d: string) => {
    if (isAlreadyBooked) return;
    setSelectedDates((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d],
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("UPI ID copied to clipboard");
  };

  // Map display dates to API keys (MAR 7 → d1, MAR 8 → d2, MAR 9 → d3)
  const dateToKey: Record<string, "d1" | "d2" | "d3"> = {
    "MAR 7": "d1",
    "MAR 8": "d2",
    "MAR 9": "d3",
  };


  const handleSubmit = async (formData: AccommodationFormValues) => {
    if (!isAuthenticated) {
      toast.error("Please login to register");
      return;
    }
    if (!gender) {
      toast.error("Please select your gender");
      return;
    }
    if (selectedDates.length === 0) {
      toast.error("Please select at least one date");
      return;
    }

    const payload = {
      sex: gender.toLowerCase() as "male" | "female" | "others",
      food,
      d1: selectedDates.includes("MAR 7"),
      d2: selectedDates.includes("MAR 8"),
      d3: selectedDates.includes("MAR 9"),
      payid: formData.upiTransactionId,
    };

    setIsPending(true);
    toast.promise(
      apiRegisterAccommodation(payload),
      {
        loading: "Submitting...",
        success: (data: { message: string }) => {
          setIsPending(false);
          form.reset();
          setIsOpen(false);
          return data.message;
        },
        error: (err: unknown) => {
          setIsPending(false);
          return typeof err === "object" && err !== null && "message" in err
            ? (err as { message: string }).message
            : String(err);
        },
      }
    );
  };

  // Fetch existing accommodation status
  useEffect(() => {
    apiGetAccommodation()
      .then((data: typeof accommodation) => {
        setAccommodation(data);
      })
      .catch(() => {});
  }, [isPending]);

  const inputStyles =
    "flex items-center rounded-full px-4 py-2.5 border border-white/50 bg-transparent backdrop-blur-xs transition-all duration-300 focus-within:border-[#7a28ff] focus-within:shadow-[0_0_12px_rgba(122,40,255,0.4)]";
  const labelStyles = "text-white font-medium font-novaSquare text-sm";

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center px-3 sm:px-4 pt-28 sm:pt-24 pb-8 sm:pb-16 font-(family-name:--orbitron) overflow-hidden"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated background gradients */}
      <motion.div
        className="absolute inset-0 bg-linear-to-br from-violet-900/10 via-transparent to-purple-900/10"
        animate={breathe}
      />
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-violet-600/15 rounded-full blur-[100px]"
        animate={floatSlow}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-purple-600/15 rounded-full blur-[100px]"
        animate={{
          ...floatSlow,
          transition: { ...floatSlow.transition, delay: 1 },
        }}
      />
      <div className="relative z-10 w-full max-w-285 flex flex-col items-center mt-4 sm:mt-0">
        {/* PAGE TITLE */}
        <motion.div className="flex justify-center mb-6" variants={blurIn}>
          <div className={`relative ${glitch ? "glitch-active" : ""}`}>
            <h1
              className="sponsor-glitch text-center mx-auto text-white max-w-285 text-[1.15rem] tracking-[0.005em] xs:text-[1.35rem] xs:tracking-[0.01em] sm:text-[1.8rem] sm:tracking-[0.035em] md:text-[2.4rem] md:tracking-[0.06em]"
              data-text="ACCOMMODATION"
              style={{
                fontFamily: "Wallpoet, sans-serif",
                fontWeight: 700,
              }}
            >
              ACCOMMODATION
            </h1>
          </div>
        </motion.div>

        {/* CONTAINER */}
        <motion.div
          className="w-full max-w-240 rounded-4xl sm:rounded-[28px]
          border border-white/70 backdrop-blur-xs relative overflow-hidden
          px-4 sm:px-7 md:px-10 py-6 sm:py-8 md:py-10 shadow-[0_0_40px_rgba(140,0,255,0.25)]"
          variants={fadeUp}
          whileHover={hoverLift}
        >
          {/* Inner animated background */}
          <motion.div
            className="absolute inset-0 bg-linear-to-br from-violet-500/5 via-transparent to-purple-500/5 pointer-events-none"
            animate={breathe}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {/* LEFT SECTION */}
            <motion.div
              className="space-y-3 flex flex-col items-center text-center"
              variants={slideLeft}
            >
              <h2
                style={{ fontFamily: "Orbitron, sans-serif" }}
                className="text-[1.55rem] tracking-wide text-white"
              >
                Accommodation Charges
              </h2>

              {/* Already booked banner */}
              {isAlreadyBooked && (
                <div
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                  className="w-full px-4 py-2 rounded-2xl bg-green-600/20 border border-green-400/50 text-green-300 text-sm text-center"
                >
                  {accommodation.isPaid
                    ? "✓ Accommodation Registered"
                    : "⏳ Confirming your payment..."}
                </div>
              )}

              {/* Dates */}
              <div
                className="flex flex-wrap justify-center gap-4 p-3 rounded-3xl
               border border-white/70"
              >
                {dates.map((d) => {
                  const sel = selectedDates.includes(d);
                  const disabled = isAlreadyBooked || isPending;
                  return (
                    <div
                      key={d}
                      onClick={() => !disabled && toggleDate(d)}
                      className={cn(
                        "flex items-center gap-3 select-none",
                        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                      )}
                    >
                      <div
                        className={`w-5 h-5 rounded-xs flex items-center justify-center border
                        ${sel ? "border-violet-600 bg-violet-600 text-white" : "border-white/70"}`}
                      >
                        {sel && "✓"}
                      </div>
                      <span
                        style={{ fontFamily: "Orbitron, sans-serif" }}
                        className="text-[0.8rem] text-white"
                      >
                        {d}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Gender */}
              <div
                className="flex justify-center gap-6 p-3 rounded-3xl
               border border-white/70"
              >
                {(["Male", "Female", "Others"] as Gender[]).map((g) => {
                  const sel = gender === g;
                  const disabled = isAlreadyBooked || isPending;
                  return (
                    <div
                      key={g}
                      onClick={() => !disabled && setGender(g)}
                      className={cn(
                        "flex items-center gap-3 select-none",
                        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                      )}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border
                        ${sel ? "border-violet-600 bg-violet-600 text-white" : "border-white/70"}`}
                      >
                        {sel && "✓"}
                      </div>
                      <span
                        style={{ fontFamily: "Orbitron, sans-serif" }}
                        className="text-[0.8rem] text-white"
                      >
                        {g}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              <p
                style={{ fontFamily: "Orbitron, sans-serif" }}
                className="text-[0.9rem] leading-relaxed text-white"
              >
                <span className="font-bold text-lg">Note</span>
                <br />
                Without food – Rs.300 per day <br />
                With food – Rs.450 per day
              </p>

              {/* Food */}
              <div className="flex flex-row justify-around w-full">
                <label
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                  className={cn(
                    "flex items-center justify-center gap-2 text-md text-white",
                    isAlreadyBooked || isPending ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                  )}
                >
                  <input
                    type="radio"
                    name="food_choice"
                    value="no"
                    checked={!food}
                    onChange={() => setFood(false)}
                    disabled={isAlreadyBooked || isPending}
                    className="w-4 h-4 accent-violet-600"
                  />
                  Without food.
                </label>
                <label
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                  className={cn(
                    "flex items-center justify-center gap-2 text-md text-white",
                    isAlreadyBooked || isPending ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                  )}
                >
                  <input
                    type="radio"
                    name="food_choice"
                    value="yes"
                    checked={food}
                    onChange={() => setFood(true)}
                    disabled={isAlreadyBooked || isPending}
                    className="w-4 h-4 accent-violet-600"
                  />
                  With food.
                </label>
              </div>

              {/* Total */}
              <div className="flex justify-center flex-wrap gap-4 pt-3">
                <div
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    letterSpacing: "0.04em",
                  }}
                  className="px-6 py-2.5 rounded-3xl
                border border-white/70 text-white text-[1rem]"
                >
                  Total – Rs.{total}/-
                </div>
              </div>

              {/* Payment Reference Section - Only when isOpen */}
              {isOpen && (
                <div className="w-full">
                  <h3
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                    className="text-[1.2rem] tracking-wide text-white mb-3 text-center"
                  >
                    Payment Reference
                  </h3>
                  <div className="flex flex-col items-center gap-4 p-4 rounded-3xl border border-white/70">
                    {/* QR Code */}
                    <div className="w-56 h-56 bg-white/10 rounded-lg border border-white/50 flex items-center justify-center">
                      <img
                        src={qrCode}
                        alt="UPI QR Code"
                        className="w-full h-full object-fit rounded-lg"
                      />
                    </div>
                    <div className="w-full flex flex-col items-center">
                      <p
                        style={{ fontFamily: "Orbitron, sans-serif" }}
                        className="text-[0.9rem] text-white/70 mb-1"
                      >
                        UPI ID
                      </p>
                      <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 border border-white/10">
                        <p
                          style={{
                            fontFamily: "Orbitron, sans-serif",
                            letterSpacing: "0.04em",
                          }}
                          className="text-[1rem] text-white font-semibold"
                        >
                          techforum@sbi
                        </p>
                        <button
                          type="button"
                          onClick={() => copyToClipboard("techforum@sbi")}
                          className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                          title="Copy UPI ID"
                        >
                          {copied ? (
                            <Check size={16} className="text-green-500" />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Transaction ID Fields - Only when isOpen */}
              {isOpen && !isAlreadyBooked && (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="w-full space-y-3"
                  >
                    <FormField
                      control={form.control}
                      name="upiTransactionId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={cn(labelStyles, "justify-center flex")}>
                            <span className="flex items-center gap-x-2">
                              UPI Transaction ID
                              <Popover>
                                <PopoverTrigger className="hover:text-violet-400 transition-colors">
                                  <HelpCircle size={18} />
                                </PopoverTrigger>
                                <PopoverContent
                                  align="start"
                                  side="right"
                                  className="w-64 border-white/20 bg-black/80 backdrop-blur-sm"
                                >
                                  <img
                                    src={upiRef}
                                    alt="upi_id_image"
                                    className="rounded-lg w-full"
                                  />
                                </PopoverContent>
                              </Popover>
                            </span>
                          </FormLabel>
                          <FormControl>
                            <div className={cn(inputStyles)}>
                              <Input
                                placeholder="Enter UPI Transaction ID"
                                {...field}
                                disabled={isPending}
                                className="border-0 bg-transparent focus:outline-none text-white placeholder:text-gray-400 text-center"
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
                      name="confirmUpiTransactionId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={cn(labelStyles)}>
                            Confirm UPI Transaction ID
                          </FormLabel>
                          <FormControl>
                            <div className={cn(inputStyles)}>
                              <Input
                                placeholder="Confirm UPI Transaction ID"
                                {...field}
                                disabled={isPending}
                                className="border-0 bg-transparent focus:outline-none text-white placeholder:text-gray-400 text-center"
                                type="password"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <button
                      type="submit"
                      style={{
                        fontFamily: "Orbitron, sans-serif",
                        letterSpacing: "0.04em",
                      }}
                      disabled={
                        isPending ||
                        !gender ||
                        selectedDates.length === 0
                      }
                      className={cn(
                        "w-full mt-3 px-10 py-3 rounded-3xl bg-violet-600 text-white border border-violet-600 transition",
                        isPending || !gender || selectedDates.length === 0
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer hover:shadow-[0_0_24px_rgba(122,40,255,0.85)]"
                      )}
                    >
                      {isPending ? "Submitting..." : "Submit"}
                    </button>
                  </form>
                </Form>
              )}

              {/* Payment Button - Only when logged in and not already booked */}
              {isAuthenticated && !isOpen && !isAlreadyBooked && (
                <button
                  onClick={togglePayment}
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    letterSpacing: "0.04em",
                  }}
                  className="w-full mt-3 px-10 py-3 rounded-3xl
                bg-violet-600 text-white
                border border-violet-600
                cursor-pointer
                hover:shadow-[0_0_24px_rgba(122,40,255,0.85)] transition"
                >
                  Pay Amount
                </button>
              )}

              {/* Close Payment Button - Only when logged in and payment open */}
              {isAuthenticated && isOpen && !isAlreadyBooked && (
                <button
                  onClick={togglePayment}
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    letterSpacing: "0.04em",
                  }}
                  className="w-full mt-3 px-10 py-3 rounded-3xl
                bg-red-600/80 text-white
                border border-red-600
                cursor-pointer
                hover:shadow-[0_0_24px_rgba(220,38,38,0.85)] transition"
                >
                  Close Payment
                </button>
              )}

              {/* Not Logged In Message */}
              {!isAuthenticated && (
                <div
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    letterSpacing: "0.04em",
                  }}
                  className="w-full mt-3 px-10 py-3 rounded-3xl
                bg-violet-600/50 text-white
                border border-violet-600
                text-center"
                >
                  Login to proceed with accommodation
                </div>
              )}
            </motion.div>

            {/* Mobile separator */}
            <div className="block md:hidden w-full h-px bg-white/70 my-2" />

            {/* RIGHT SECTION */}
            <motion.div
              className="space-y-8 md:border-l md:pl-8 border-white/70
            flex flex-col items-center text-center"
              variants={slideRight}
            >
              {/* Got queries section */}
              <div className="w-full">
                <h2
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                  className="text-[1.55rem] tracking-wide text-white mb-4"
                >
                  Got queries?
                </h2>

                <div className="space-y-4">
                  <div>
                    <p
                      style={{ fontFamily: "Orbitron, sans-serif" }}
                      className="text-[1rem] text-white mb-2"
                    >
                      Drop a mail at
                    </p>
                    <a
                      href="mailto:hospitality@cegtechforum.in"
                      style={{
                        fontFamily: "Orbitron, sans-serif",
                        letterSpacing: "0.08em",
                      }}
                      className="inline-block px-5 py-2.5 rounded-3xl
                        bg-violet-600
                      text-white text-[0.8rem] hover:shadow-[0_0_24px_rgba(122,40,255,0.85)] transition"
                    >
                      hospitality@cegtechforum.in
                    </a>
                  </div>

              <div>
                <p
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                  className="text-[1rem] text-white mb-2"
                >
                  Call our team
                </p>
                <div className="flex flex-col gap-2.5">
                  {[
                    ["Ajithkumar", "+91 90256 24766"],
                    ["Mohamed Sahul Hameed H", "+91 90428 50775"],
                    ["Surekaa S", "+91 63827 77055"],
                  ].map(([n, p]) => (
                    <div
                      key={n}
                      style={{ fontFamily: "Orbitron, sans-serif" }}
                      className="px-5 py-2.5 rounded-lg 
                      border border-white/70 text-[0.8rem] 
                      grid grid-cols-[1fr_auto] items-center gap-6"
                    >
                      <span className="text-left text-white">{n}</span>
                      <a
                        href={`tel:${p.replace(/\s+/g, "")}`}
                        className="text-white/90 whitespace-nowrap hover:text-white transition-colors"
                      >
                        {p}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}