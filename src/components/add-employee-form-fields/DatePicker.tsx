"use client";

import { format } from "date-fns"; //
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { OnSelectHandler } from "react-day-picker";

type DatePickerType = {
  date: string;
  setDate: (_value: string) => void;
};

export const DatePicker = ({ date, setDate }: DatePickerType) => {
  const handleDatePick: OnSelectHandler<Date> = (date: Date) => {
    setDate(format(date, "yyyy-MM-dd"));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal h-10",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {/* Change token from "PPP" or "MM/dd/yyyy" to "yyyy-MM-dd" */}
          {date ? format(date, "yyyy-MM-dd") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          required
          mode="single"
          selected={new Date(date)}
          onSelect={handleDatePick}
          className="rounded-lg border"
        />
      </PopoverContent>
    </Popover>
  );
};
