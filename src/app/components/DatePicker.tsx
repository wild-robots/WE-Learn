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
const YEARS = Array.from({ length: 5 }, (_, i) => BASE_YEAR - 1 + i);

interface Props {
  value: string;
  onChange: (value: string) => void;
  selectClassName?: string;
}

export function DatePicker({ value, onChange, selectClassName = '' }: Props) {
  const parsed = parseValue(value);
  const [month, setMonth] = useState<number | null>(parsed.month);
  const [day,   setDay]   = useState<number | null>(parsed.day);
  const [year,  setYear]  = useState<number | null>(parsed.year);

  // Sync when external value changes (e.g. reset on edit open)
  useEffect(() => {
    const p = parseValue(value);
    setMonth(p.month);
    setDay(p.day);
    setYear(p.year);
  }, [value]);

  const maxDays = month && year ? daysInMonth(month, year) : month ? daysInMonth(month, BASE_YEAR) : 31;

  function handleMonth(m: number) {
    setMonth(m);
    // clamp day if needed
    const newMax = year ? daysInMonth(m, year) : daysInMonth(m, BASE_YEAR);
    const newDay = day && day > newMax ? newMax : day;
    setDay(newDay);
    if (newDay && year) onChange(formatDate(m, newDay, year));
  }

  function handleDay(d: number) {
    setDay(d);
    if (month && year) onChange(formatDate(month, d, year));
  }

  function handleYear(y: number) {
    setYear(y);
    const newMax = month ? daysInMonth(month, y) : 31;
    const validDay = day && day > newMax ? newMax : day;
    setDay(validDay);
    if (month && validDay) onChange(formatDate(month, validDay, y));
  }

  const base = `text-[13px] px-2 py-1.5 rounded-lg border border-[#E9ECEF] focus:outline-none focus:border-[#2BBFAA] bg-[#F8F9FA] ${selectClassName}`;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <select value={month ?? ''} onChange={e => handleMonth(Number(e.target.value))}
        className={base} style={{ fontFamily: 'var(--font-body)' }}>
        <option value="" disabled>Month</option>
        {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
      </select>

      {month !== null && (
        <select value={day ?? ''} onChange={e => handleDay(Number(e.target.value))}
          className={base} style={{ fontFamily: 'var(--font-body)' }}>
          <option value="" disabled>Day</option>
          {Array.from({ length: maxDays }, (_, i) => i + 1).map(d =>
            <option key={d} value={d}>{d}</option>
          )}
        </select>
      )}

      {month !== null && day !== null && (
        <select value={year ?? ''} onChange={e => handleYear(Number(e.target.value))}
          className={base} style={{ fontFamily: 'var(--font-body)' }}>
          <option value="" disabled>Year</option>
          {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      )}
    </div>
  );
}
