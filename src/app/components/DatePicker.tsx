import { useState, useEffect } from "react";

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function daysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}

function parseValue(value: string) {
  if (!value) return { month: null as number | null, day: null as number | null, year: null as number | null };
  const parts = value.trim().split(/\s+/);
  const monthIdx = MONTHS.indexOf(parts[0]);
  const day = parts[1] ? parseInt(parts[1].replace(',', '')) : NaN;
  const year = parts[2] ? parseInt(parts[2]) : NaN;
  return {
    month: monthIdx >= 0 ? monthIdx + 1 : null,
    day: isNaN(day) ? null : day,
    year: isNaN(year) ? null : year,
  };
}

function formatDate(month: number, day: number, year: number) {
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

const NOW = new Date();
const BASE_YEAR = NOW.getFullYear();
const DEFAULT_MONTH = NOW.getMonth() + 1;
const DEFAULT_DAY = NOW.getDate();
const YEARS = Array.from({ length: 5 }, (_, i) => BASE_YEAR - 1 + i);

interface Props {
  value: string;
  onChange: (value: string) => void;
  selectClassName?: string;
}

export function DatePicker({ value, onChange, selectClassName = '' }: Props) {
  const parsed = parseValue(value);
  // Default to today if no value provided
  const [month, setMonth] = useState<number>(parsed.month ?? DEFAULT_MONTH);
  const [day,   setDay]   = useState<number>(parsed.day   ?? DEFAULT_DAY);
  const [year,  setYear]  = useState<number>(parsed.year  ?? BASE_YEAR);

  // Sync when external value changes (e.g. reset on edit open)
  useEffect(() => {
    const p = parseValue(value);
    setMonth(p.month ?? DEFAULT_MONTH);
    setDay(p.day     ?? DEFAULT_DAY);
    setYear(p.year   ?? BASE_YEAR);
  }, [value]);

  const maxDays = daysInMonth(month, year);

  function handleMonth(m: number) {
    setMonth(m);
    const newMax = daysInMonth(m, year);
    const clampedDay = Math.min(day, newMax);
    setDay(clampedDay);
    onChange(formatDate(m, clampedDay, year));
  }

  function handleDay(d: number) {
    setDay(d);
    onChange(formatDate(month, d, year));
  }

  function handleYear(y: number) {
    setYear(y);
    const newMax = daysInMonth(month, y);
    const clampedDay = Math.min(day, newMax);
    setDay(clampedDay);
    onChange(formatDate(month, clampedDay, y));
  }

  const base = `text-[13px] px-2 py-1.5 rounded-lg border border-[#E9ECEF] focus:outline-none focus:border-[#00a79d] bg-[#F8F9FA] ${selectClassName}`;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <select value={month} onChange={e => handleMonth(Number(e.target.value))}
        className={base} style={{ fontFamily: 'var(--font-body)' }}>
        {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
      </select>

      <select value={day} onChange={e => handleDay(Number(e.target.value))}
        className={base} style={{ fontFamily: 'var(--font-body)' }}>
        {Array.from({ length: maxDays }, (_, i) => i + 1).map(d =>
          <option key={d} value={d}>{d}</option>
        )}
      </select>

      <select value={year} onChange={e => handleYear(Number(e.target.value))}
        className={base} style={{ fontFamily: 'var(--font-body)' }}>
        {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
      </select>
    </div>
  );
}
