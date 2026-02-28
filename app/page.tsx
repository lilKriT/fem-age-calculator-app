"use client";

import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, SubmitErrorHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { intervalToDuration } from "date-fns";

const schema = z
  .object({
    day: z
      .number({ error: "This field is required" })
      .min(1, "Must be a valid day")
      .max(31, "Must be a valid day"),
    month: z
      .number({ error: "This field is required" })
      .min(1, "Must be a valid month")
      .max(12, "Must be a valid month"),
    year: z
      .number({ error: "This field is required" })
      .min(1900, "Too early")
      .max(new Date().getFullYear(), "Must be in the past"),
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
      error: "Must be a valid date",
      path: ["day"],
    },
  );

type FormValues = z.infer<typeof schema>;

type AgeResult = {
  years: number;
  months: number;
  days: number;
};

export default function Home() {
  const [result, setResult] = useState<AgeResult | null>(null);

  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // console.log("Submitting form");
    // console.log(data);

    const newResult = calculateAge(data);

    setResult(newResult);
  };

  const onError: SubmitErrorHandler<FormValues> = (data) => {
    // Hypothetical error handling could go here.
    // console.log("Wrong date!");
    // console.log("Errors: ", formState.errors);
    setResult(null);
  };

  const calculateAge = ({ day, month, year }: FormValues) => {
    const birth = new Date(year, month - 1, day);
    const now = new Date();

    const duration = intervalToDuration({ start: birth, end: now });

    return {
      years: duration.years ?? 0,
      months: duration.months ?? 0,
      days: duration.days ?? 0,
    };
  };

  return (
    <section className="min-h-dvh flex items-center justify-center px-4 md:px-8 py-32">
      <div className="bg-white lg:w-full max-w-210 py-16 px-8 md:px-16 rounded-3xl rounded-br-[10rem]">
        {/* Date form */}
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex flex-col"
        >
          <div className="flex justify-start items-start gap-4 md:gap-8">
            <label
              className={`label ${formState.errors.day && "label--error"}`}
            >
              <span>Day</span>
              <input
                {...register("day", { valueAsNumber: true })}
                type="text"
                placeholder="DD"
              />
              {/* Day error */}
              {formState.errors.day && (
                <span className="error">{formState.errors.day.message}</span>
              )}
              {/* Form error */}
              {formState.errors.root && (
                <span className="error">{formState.errors.root.message}</span>
              )}
            </label>

            <label
              className={`label ${formState.errors.month && "label--error"}`}
            >
              <span>Month</span>
              <input
                {...register("month", { valueAsNumber: true })}
                type="text"
                placeholder="MM"
              />
              {formState.errors.month && (
                <span className="error">{formState.errors.month.message}</span>
              )}
            </label>

            <label
              className={`label ${formState.errors.year && "label--error"}`}
            >
              <span>Year</span>
              <input
                {...register("year", { valueAsNumber: true })}
                type="text"
                placeholder="YYYY"
              />
              {formState.errors.year && (
                <span className="error">{formState.errors.year.message}</span>
              )}
            </label>
          </div>

          {/* Decoration */}
          <div className="relative flex justify-end items-center my-16 lg:my-0">
            <div className="h-0.5 w-full bg-gray-200 rounded-full"></div>
            <button
              type="submit"
              aria-label="Submit form"
              className="bg-purple-500 absolute left-1/2 -translate-x-1/2 lg:static lg:left-0 lg:translate-x-0 p-4 lg:p-6 rounded-full hover:bg-black motion-safe:duration-300 ease-in-out cursor-pointer"
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
            <span className="text-purple-500 text-[clamp(3.25rem,8vw,4.75rem)]">
              {result?.years ?? "--"}
            </span>{" "}
            years
          </span>
          <span>
            <span className="text-purple-500 text-[clamp(3.25rem,8vw,4.75rem)]">
              {result?.months ?? "--"}
            </span>{" "}
            months
          </span>
          <span>
            <span className="text-purple-500 text-[clamp(3.25rem,8vw,4.75rem)]">
              {result?.days ?? "--"}
            </span>{" "}
            days
          </span>
        </div>
      </div>
    </section>
  );
}
