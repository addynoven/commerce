"use client";

import { useEffect, useRef, useState } from "react";

interface PriceSliderProps {
  min: number;
  max: number;
  currentMin: number;
  currentMax: number;
  onChange: (min: number, max: number) => void;
}

export function PriceSlider({
  min,
  max,
  currentMin,
  currentMax,
  onChange,
}: PriceSliderProps) {
  const [minVal, setMinVal] = useState(currentMin);
  const [maxVal, setMaxVal] = useState(currentMax);
  const minValRef = useRef(currentMin);
  const maxValRef = useRef(currentMax);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = (value: number) =>
    Math.round(((value - min) / (max - min)) * 100);

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Sync state with props
  useEffect(() => {
    setMinVal(currentMin);
    setMaxVal(currentMax);
    minValRef.current = currentMin;
    maxValRef.current = currentMax;
  }, [currentMin, currentMax]);

  return (
    <div className="flex flex-col space-y-4 px-2">
      <div className="relative h-1 w-full flex items-center justify-center">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
          }}
          onMouseUp={() => onChange(minVal, maxVal)}
          onTouchEnd={() => onChange(minVal, maxVal)}
          className="thumb thumb--left pointer-events-none absolute h-0 w-full outline-none z-[3]"
          style={{ zIndex: minVal > max - 100 ? "5" : undefined }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          onMouseUp={() => onChange(minVal, maxVal)}
          onTouchEnd={() => onChange(minVal, maxVal)}
          className="thumb thumb--right pointer-events-none absolute h-0 w-full outline-none z-[4]"
        />

        <div className="slider relative w-full h-1 bg-neutral-200 rounded-full">
          <div
            ref={range}
            className="slider__range absolute h-1 bg-[#6B8E67] rounded-full"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">₹</span>
          <input
            type="number"
            value={minVal}
            onChange={(e) => {
              const val = Number(e.target.value);
              setMinVal(val);
              minValRef.current = val;
            }}
            onBlur={() => onChange(minVal, maxVal)}
            className="w-full pl-7 pr-3 py-2 bg-white border border-neutral-100 rounded-lg text-sm font-medium text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#6B8E67] transition-all"
          />
        </div>
        <span className="text-neutral-400 text-xs font-bold uppercase tracking-widest">To</span>
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">₹</span>
          <input
            type="number"
            value={maxVal}
            onChange={(e) => {
              const val = Number(e.target.value);
              setMaxVal(val);
              maxValRef.current = val;
            }}
            onBlur={() => onChange(minVal, maxVal)}
            className="w-full pl-7 pr-3 py-2 bg-white border border-neutral-100 rounded-lg text-sm font-medium text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#6B8E67] transition-all"
          />
        </div>
      </div>

      <style jsx>{`
        .thumb,
        .thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          -webkit-tap-highlight-color: transparent;
        }

        .thumb {
          pointer-events: none;
          position: absolute;
          height: 0;
          width: 100%;
          outline: none;
        }

        .thumb--left {
          z-index: 3;
        }

        .thumb--right {
          z-index: 4;
        }

        /* Webkit browsers */
        .thumb::-webkit-slider-thumb {
          background-color: #6B8E67;
          border: 2px solid #FFFFFF;
          border-radius: 50%;
          box-shadow: 0 0 1px 1px #ced4da;
          cursor: pointer;
          height: 18px;
          width: 18px;
          margin-top: 4px;
          pointer-events: all;
          position: relative;
        }

        /* Firefox */
        .thumb::-moz-range-thumb {
          background-color: #6B8E67;
          border: 2px solid #FFFFFF;
          border-radius: 50%;
          box-shadow: 0 0 1px 1px #ced4da;
          cursor: pointer;
          height: 18px;
          width: 18px;
          margin-top: 4px;
          pointer-events: all;
          position: relative;
        }
      `}</style>
    </div>
  );
}
