import { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  isAfter,
  isBefore,
} from "date-fns";

export const Calendar = ({ onRangeSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [range, setRange] = useState({ start: null, end: null });

  const startDate = startOfWeek(startOfMonth(selectedDate));
  const endDate = endOfWeek(endOfMonth(selectedDate));

  const days = [];
  let day = startDate;
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  const handleDateClick = (date) => {
    if (!range.start || (range.start && range.end)) {
      setRange({ start: date, end: null });
    } else if (isBefore(date, range.start)) {
      setRange({ start: date, end: range.start });
    } else {
      setRange({ ...range, end: date });
    }
  };

  useEffect(() => {
    if (range.start && range.end) {
      onRangeSelect({ start: range.start, end: range.end });
    }
  }, [range]);

  const renderHeader = () => (
    <div className="flex justify-between items-center p-4 bg-blue-500 text-white rounded-t-md">
      <button
        className="px-2 py-1 bg-blue-700 rounded-md hover:bg-blue-600"
        onClick={() => setSelectedDate(addMonths(selectedDate, -1))}
      >
        &lt;
      </button>
      <h2 className="text-lg font-bold">{format(selectedDate, "MMMM yyyy")}</h2>
      <button
        className="px-2 py-1 bg-blue-700 rounded-md hover:bg-blue-600"
        onClick={() => setSelectedDate(addMonths(selectedDate, 1))}
      >
        &gt;
      </button>
    </div>
  );

  const renderDaysOfWeek = () => (
    <div className="grid grid-cols-7 gap-2 text-center bg-gray-100 p-2">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div key={day} className="font-medium text-gray-700">
          {day}
        </div>
      ))}
    </div>
  );

  const renderDays = () => (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day, index) => {
        const isSelectedStart = isSameDay(day, range.start);
        const isSelectedEnd = isSameDay(day, range.end);
        const isInRange =
          range.start &&
          range.end &&
          isAfter(day, range.start) &&
          isBefore(day, range.end);

        return (
          <div
            key={index}
            className={`p-2 rounded-md text-center cursor-pointer transition-all ${isSameMonth(day, selectedDate)
              ? isSelectedStart || isSelectedEnd
                ? "bg-blue-500 text-white"
                : isInRange
                  ? "bg-blue-300 text-white"
                  : "bg-white text-gray-900 hover:bg-blue-200"
              : "bg-gray-200 text-gray-500"
              }`}
            onClick={() => handleDateClick(day)}
          >
            {format(day, "d")}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto mt-10 border border-gray-300 rounded-md shadow-md">
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderDays()}
    </div>
  );
};
