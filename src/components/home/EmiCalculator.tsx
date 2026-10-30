"use client";

import { useState } from "react";

type SliderProps = {
  label: React.ReactNode;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  ticks: string[];
  onChange: (v: number) => void;
};

function Slider({ label, value, display, min, max, step, ticks, onChange }: SliderProps) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-4">
        <div className="text-label text-white">{label}</div>
        <p className="text-xl/7 font-semibold tracking-[-0.009375rem] text-white md:text-h5">{display}</p>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="emi-range"
        style={{ "--fill": `${fill}%` } as React.CSSProperties}
      />
      <div className="flex justify-between text-sm text-white md:text-h6">
        {ticks.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  );
}

const inr = new Intl.NumberFormat("en-IN");

export default function EmiCalculator() {
  const [amount, setAmount] = useState(5_000_000);
  const [rate, setRate] = useState(10);
  const [tenure, setTenure] = useState(20);
  const [unit, setUnit] = useState<"yearly" | "monthly">("yearly");

  const months = unit === "yearly" ? tenure * 12 : tenure;
  const r = rate / 12 / 100;
  const emi = r === 0 ? amount / months : (amount * r * (1 + r) ** months) / ((1 + r) ** months - 1);

  return (
    <div className="flex w-full flex-col gap-10 rounded-[1.25rem] bg-heading p-6 drop-shadow-[11px_13px_21.5px_rgba(0,0,0,0.45)] md:gap-[3.3125rem] md:p-10 lg:w-[47.3125rem]">
      <p className="text-xl/7 tracking-[-0.009375rem] text-white md:text-h5">
        <span className="font-semibold">EMI Calculator</span> <span className="font-medium">-</span> <span className="text-gold">Education Loan</span>
      </p>
      <div className="flex flex-col gap-10 md:gap-[2.5rem]">
        <Slider
          label="Loan Amount"
          value={amount}
          display={inr.format(amount)}
          min={0}
          max={15_000_000}
          step={100_000}
          ticks={["0", "25L", "50L", "70L", "100L", "125L", "150L"]}
          onChange={setAmount}
        />
        <Slider
          label="Interest Rate"
          value={rate}
          display={`${rate}%`}
          min={5}
          max={25}
          step={0.5}
          ticks={["5", "7.5", "10", "15", "17.5", "20", "25"]}
          onChange={setRate}
        />
        <Slider
          label={
            <span className="flex items-center gap-4">
              Loan Tenure
              <span className="flex text-sm leading-5 tracking-[-0.01rem]">
                {(["yearly", "monthly"] as const).map((u, i) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => {
                      setUnit(u);
                      setTenure(u === "yearly" ? 20 : 120);
                    }}
                    className={`px-2.5 py-1 capitalize text-white ${i === 0 ? "rounded-l-full" : "rounded-r-full"} ${
                      unit === u ? "bg-primary-gradient" : "bg-[#3b436d] opacity-60"
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </span>
            </span>
          }
          value={tenure}
          display={String(tenure)}
          min={unit === "yearly" ? 5 : 12}
          max={unit === "yearly" ? 35 : 420}
          step={unit === "yearly" ? 1 : 12}
          ticks={unit === "yearly" ? ["5", "10", "15", "20", "25", "30", "35"] : ["12", "72", "132", "192", "252", "312", "420"]}
          onChange={setTenure}
        />
        <div className="flex items-center justify-between border-t border-white/15 pt-6 text-white">
          <span className="text-label">Monthly EMI</span>
          <span className="text-h5 font-semibold text-gold">₹ {inr.format(Math.round(emi))}</span>
        </div>
      </div>
    </div>
  );
}
