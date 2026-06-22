"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phoneNumber: z.string().min(7, "Valid phone number is required"),
  sessionType: z.enum(["DAILY", "WEEKLY", "MONTHLY"]),
});

type BookingValues = z.infer<typeof bookingSchema>;

const PRICES = {
  DAILY: 70,
  WEEKLY: 200,
  MONTHLY: 700,
};

const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      sessionType: "DAILY",
    },
  });

  const selectedType = watch("sessionType");
  const cost = PRICES[selectedType as keyof typeof PRICES];

  const onSubmit = async (data: BookingValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, cost }),
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <CheckCircle2 className="mb-4 h-16 w-16 text-green-500" />
        <h3 className="text-2xl font-bold text-zinc-100">Booking Received!</h3>
        <p className="mt-2 text-zinc-400">We will call you soon to confirm your session.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-xs font-extrabold uppercase tracking-widest text-zinc-500 mb-2">Full Name</label>
        <input
          {...register("name")}
          className="w-full rounded-lg border border-zinc-800 bg-black p-4 text-zinc-100 outline-none transition-all focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
          placeholder="Enter your name"
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-extrabold uppercase tracking-widest text-zinc-500 mb-2">Phone Number</label>
        <input
          {...register("phoneNumber")}
          className="w-full rounded-lg border border-zinc-800 bg-black p-4 text-zinc-100 outline-none transition-all focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
          placeholder="e.g., +63 9XX XXX XXXX"
        />
        {errors.phoneNumber && <p className="mt-1 text-xs text-red-500">{errors.phoneNumber.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-extrabold uppercase tracking-widest text-zinc-500 mb-2">Session Type</label>
        <select
          {...register("sessionType")}
          className="w-full rounded-lg border border-zinc-800 bg-black p-4 text-zinc-100 outline-none transition-all focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20 appearance-none"
        >
          <option value="DAILY">Daily Session</option>
          <option value="WEEKLY">Weekly Pass</option>
          <option value="MONTHLY">Monthly Membership</option>
        </select>
      </div>

      <div className="flex items-center justify-between rounded-lg bg-yellow-400/5 p-6 border border-yellow-400/20">
        <span className="text-sm font-extrabold text-zinc-400 uppercase tracking-widest">Total Cost</span>
        <span className="text-3xl font-black text-yellow-400">₱{cost}.00</span>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-yellow-400 p-4 text-sm font-black tracking-widest text-zinc-950 transition-all hover:bg-yellow-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            PROCESSING...
          </>
        ) : (
          "SUBMIT BOOKING"
        )}
      </button>
    </form>
  );
};

export default BookingForm;
