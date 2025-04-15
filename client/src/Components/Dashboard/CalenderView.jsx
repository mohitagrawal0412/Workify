import React, { useState } from "react";
import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    format,
    isSameMonth,
    parseISO,
} from "date-fns";

const feeds = [
    { id: 1, title: "UI Work", date: "2025-04-14" },
    { id: 2, title: "Reflection", date: "2025-04-13" },
    { id: 3, title: "Growth Log", date: "2025-04-12" },
];

const CalendarView = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const feedDates = feeds.map(f => format(parseISO(f.date), "yyyy-MM-dd"));

    const nextMonth = () => setCurrentMonth(addDays(endOfMonth(currentMonth), 1));
    const prevMonth = () => setCurrentMonth(addDays(startOfMonth(currentMonth), -1));

    const renderDays = () => {
        const days = [];
        let day = startDate;

        while (day <= endDate) {
            const formattedDate = format(day, "yyyy-MM-dd");
            const isToday = formattedDate === format(new Date(), "yyyy-MM-dd");
            const hasFeed = feedDates.includes(formattedDate);
            const isCurrentMonth = isSameMonth(day, monthStart);

            days.push(
                <div
                    key={formattedDate}
                    className={`relative h-16 text-center text-xs p-1 rounded-md flex flex-col items-center justify-center
            ${isCurrentMonth ? "bg-white text-gray-900" : "text-gray-400"}
            ${isToday ? "border border-indigo-500" : ""}
          `}
                >
                    <span className="font-medium">{format(day, "d")}</span>
                    {hasFeed && <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1"></span>}
                </div>
            );
            day = addDays(day, 1);
        }

        return days;
    };

    return (
        <div className="min-h-screen p-6 bg-gray-50 text-gray-800">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <button onClick={prevMonth} className="text-sm text-indigo-500 hover:underline">
                        ← Prev
                    </button>
                    <h2 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
                    <button onClick={nextMonth} className="text-sm text-indigo-500 hover:underline">
                        Next →
                    </button>
                </div>

                {/* Weekdays */}
                <div className="grid grid-cols-7 text-xs text-center font-semibold text-gray-500 mb-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                        <div key={d}>{d}</div>
                    ))}
                </div>

                {/* Days */}
                <div className="grid grid-cols-7 gap-1">
                    {renderDays()}
                </div>
            </div>
        </div>
    );
};

export default CalendarView;
