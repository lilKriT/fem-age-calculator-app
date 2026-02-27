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

  return (
    <section className="min-h-dvh flex items-center justify-center px-8 py-32">
      <div className="bg-white p-16 rounded-3xl rounded-br-[10rem]">
        {/* Date form */}
        <form className="flex gap-8">
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
        </form>

        {/* Decoration */}
        <div className="relative flex justify-end items-center">
          <div className="h-0.5 w-full bg-gray-200 rounded-full"></div>
          <div className="bg-purple-500 p-6 rounded-full">
            <Image
              src={"/icon-arrow.svg"}
              aria-hidden="true"
              alt="Arrow Icon"
              width={46}
              height={44}
            />
          </div>
        </div>

        {/* Results */}
        <p>-- years -- months -- days</p>
      </div>
    </section>
  );
}
