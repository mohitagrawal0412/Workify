import React, { useState } from "react";
import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    format,
    isSameDay,
    isSameMonth,
    parseISO,
} from "date-fns";

// Sample data
const feeds = [
    { id: 1, title: "UI Work", date: "2025-04-14" },
    { id: 2, title: "Imposter Syndrome", date: "2025-04-13" },
    { id: 3, title: "Journal Thoughts", date: "2025-04-12" },
];

const CalendarView = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const feedDates = feeds.map((f) => format(parseISO(f.date), "yyyy-MM-dd"));

    const nextMonth = () => setCurrentMonth(addDays(endOfMonth(currentMonth), 1));
    const prevMonth = () => setCurrentMonth(addDays(startOfMonth(currentMonth), -1));

    const renderCells = () => {
        const rows = [];
        let day = startDate;

        while (day <= endDate) {
            const days = [];

            for (let i = 0; i < 7; i++) {
                const dayStr = format(day, "yyyy-MM-dd");
                const feedForDay = feeds.filter((f) => dayStr === f.date);

                days.push(
                    <div
                        key={day}
                        className={`p-2 h-24 border text-sm relative rounded-lg ${!isSameMonth(day, monthStart) ? "text-gray-400 bg-gray-100" : "bg-white"
                            }`}
                    >
                        <div className="text-xs font-semibold">{format(day, "d")}</div>

                        {feedForDay.length > 0 && (
                            <ul className="mt-1 text-xs text-indigo-600 list-disc list-inside space-y-1">
                                {feedForDay.map((feed) => (
                                    <li key={feed.id}>{feed.title}</li>
                                ))}
                            </ul>
                        )}

                    </div>
                );
                day = addDays(day, 1);
            }

            rows.push(
                <div key={day} className="grid grid-cols-7 gap-2">
                    {days}
                </div>
            );
        }

        return <div className="space-y-2">{rows}</div>;
    };

    return (
        <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={prevMonth}
                        className="px-4 py-2 text-indigo-600 hover:text-indigo-800"
                    >
                        ← Prev
                    </button>
                    <h2 className="text-xl font-bold text-indigo-700">
                        {format(currentMonth, "MMMM yyyy")}
                    </h2>
                    <button
                        onClick={nextMonth}
                        className="px-4 py-2 text-indigo-600 hover:text-indigo-800"
                    >
                        Next →
                    </button>
                </div>

                <div className="grid grid-cols-7 text-center font-semibold text-gray-600 mb-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                        <div key={d}>{d}</div>
                    ))}
                </div>

                {renderCells()}
            </div>
        </div>
    );
};

export default CalendarView;
