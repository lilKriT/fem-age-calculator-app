"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [errors, setErrors] = useState({
    days: "bla",
    months: "lol",
    year: "kay",
    form: "nope",
  });

  const handleSubmit = () => {
    console.log("Submitting form");
  };

  return (
    <section className="min-h-dvh flex items-center justify-center px-4 md:px-8 py-32">
      <div className="bg-white w-full max-w-210 py-16 px-8 md:px-16 rounded-3xl rounded-br-[10rem]">
        {/* Date form */}
        <form className="flex flex-col">
          <div className="flex gap-4 md:gap-8">
            <label className="label">
              <span>Day</span>
              <input type="text" placeholder="DD" />
              <span className="error">{errors.days}</span>
            </label>

            <label className="label">
              <span>Month</span>
              <input type="text" placeholder="MM" />
              <span className="error">{errors.months}</span>
            </label>

            <label className="label">
              <span>Year</span>
              <input type="text" placeholder="YYYY" />
              <span className="error">{errors.year}</span>
            </label>
          </div>

          {/* Decoration */}
          <div className="relative flex justify-end items-center">
            <div className="h-0.5 w-full bg-gray-200 rounded-full"></div>
            <button
              type="button"
              aria-label="Submit form"
              className="bg-purple-500 p-6 rounded-full hover:bg-black motion-safe:duration-300 ease-in-out cursor-pointer"
              onClick={handleSubmit}
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
