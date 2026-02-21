import React, { useState, useEffect, useMemo, type HTMLAttributes } from "react";
import { LuCalendar } from "react-icons/lu";
import { CustomSelect, type SelectOption } from "./CustomSelect";
import { cn } from "@/lib/utils";
import { dateMonths, dateYears } from "@/constants/form";

interface DatePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: Date | string | boolean;
  onChange: (date: Date) => void;
  inputStyles?: string;
  iconStyles?: string;
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  ({ value, onChange, inputStyles = "", iconStyles = "", className }, ref) => {
    const daysInMonth = (m: number, y: number): number => {
      return new Date(y, m, 0).getDate();
    };

    // Handle various value types and convert to Date
    let dateValue: Date;
    if (value instanceof Date) {
      dateValue = value;
    } else if (typeof value === "string") {
      dateValue = new Date(value || new Date());
    } else if (typeof value === "boolean" || !value) {
      dateValue = new Date();
    } else {
      dateValue = new Date();
    }

    const initialMonth = dateValue.getMonth() + 1;
    const initialYear = dateValue.getFullYear();
    const [date, setDate] = useState(dateValue.getDate());
    const [month, setMonth] = useState(initialMonth);
    const [year, setYear] = useState(initialYear);

    const noOfDays = useMemo(() => daysInMonth(month, year), [month, year]);

    useEffect(() => {
      onChange(new Date(year, month - 1, date ?? 1));
    }, [date, month, year, onChange]);

    const dayOptions: SelectOption[] = Array.from(
      { length: noOfDays },
      (_, i) => ({
        value: i + 1,
        label: String(i + 1),
      })
    );

    const monthOptions: SelectOption[] = dateMonths.map((m) => ({
      value: m.number,
      label: m.month,
    }));

    const yearOptions: SelectOption[] = dateYears.map((y) => ({
      value: y.year,
      label: String(y.year),
    }));

    return (
      <div ref={ref} className={cn("flex items-center w-full", className)}>
        <div className="hidden place-content-center xs:grid">
          <LuCalendar className={cn(iconStyles, "h-5 w-[40px] py-[0.1rem]")} />
        </div>
        <div className="grid flex-1 grid-cols-9 gap-x-2 ">
          <div className={cn(inputStyles, "col-span-2  ")}>
            <CustomSelect
              options={dayOptions}
              value={date}
              onChange={(val) => setDate(typeof val === 'number' ? val : parseInt(String(val), 10))}
              placeholder="Day"
            />
          </div>
          <div className={cn(inputStyles, "col-span-4  ")}>
            <CustomSelect
              options={monthOptions}
              value={month}
              onChange={(val) => setMonth(typeof val === 'number' ? val : parseInt(String(val), 10))}
              placeholder="Month"
            />
          </div>
          <div className={cn(inputStyles, "col-span-3  ")}>
            <CustomSelect
              options={yearOptions}
              value={year}
              onChange={(val) => setYear(typeof val === 'number' ? val : parseInt(String(val), 10))}
              placeholder="Year"
            />
          </div>
        </div>
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker };
