"use client";

import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// const schema = z.object({
//   day: z.number({ error: "No day" }).min(1, "Too small").max(31, "Too big"),
//   month: z.number({ error: "No month" }).min(1, "Too small").max(12, "Too big"),
//   year: z
//     .number({ error: "No year" })
//     .min(1900, "Too small")
//     .max(new Date().getFullYear(), "Too big"),
// });

// Refined version
const schema = z
  .object({
    day: z.number({ error: "No day" }).min(1, "Too small").max(31, "Too big"),
    month: z
      .number({ error: "No month" })
      .min(1, "Too small")
      .max(12, "Too big"),
    year: z
      .number({ error: "No year" })
      .min(1900, "Too small")
      .max(new Date().getFullYear(), "Too big"),
  })
  .refine(
    (data) => {
      const { day, month, year } = data;
      const date = new Date(year, month - 1, day);

      return (
        date.getFullYear() == year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    },
    {
      error: "Invalid date",
      path: ["day", "month"],
    },
  );

type FormValues = z.infer<typeof schema>;

export default function Home() {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  // const onSubmit = (data: FormValues) => {
  //   console.log("Submitting form");
  //   console.log(data);
  // };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Submitting form");
    console.log(data);
  };

  return (
    <section className="min-h-dvh flex items-center justify-center px-4 md:px-8 py-32">
      <div className="bg-white w-full max-w-210 py-16 px-8 md:px-16 rounded-3xl rounded-br-[10rem]">
        {/* Date form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="flex items-start gap-4 md:gap-8">
            <label className="label">
              <span>Day</span>
              <input
                {...register("day", { valueAsNumber: true })}
                type="text"
                placeholder="DD"
              />
              {formState.errors.day && (
                <span className="error">{formState.errors.day?.message}</span>
              )}
            </label>

            <label className="label">
              <span>Month</span>
              <input
                {...register("month", { valueAsNumber: true })}
                type="text"
                placeholder="MM"
              />
              {formState.errors.month && (
                <span className="error">{formState.errors.month?.message}</span>
              )}
            </label>

            <label className="label">
              <span>Year</span>
              <input
                {...register("year", { valueAsNumber: true })}
                type="text"
                placeholder="YYYY"
              />
              {formState.errors.year && (
                <span className="error">{formState.errors.year?.message}</span>
              )}
            </label>
          </div>

          {/* Decoration */}
          <div className="relative flex justify-end items-center">
            <div className="h-0.5 w-full bg-gray-200 rounded-full"></div>
            <button
              type="submit"
              aria-label="Submit form"
              className="bg-purple-500 p-6 rounded-full hover:bg-black motion-safe:duration-300 ease-in-out cursor-pointer"
            >
              <Image
                src={"/icon-arrow.svg"}
                aria-hidden="true"
                alt="Arrow Icon"
                width={46}
                height={44}
              />
            </button>
          </div>
        </form>

        {/* Results */}
        <div className="flex flex-col leading-[1.15] text-[clamp(3rem,8vw,4.5rem)] font-extrabold italic">
          <span>
            <span className="text-purple-500">--</span> years
          </span>
          <span>
            <span className="text-purple-500">--</span> months
          </span>
          <span>
            <span className="text-purple-500">--</span> days
          </span>
        </div>
      </div>
    </section>
  );
}
