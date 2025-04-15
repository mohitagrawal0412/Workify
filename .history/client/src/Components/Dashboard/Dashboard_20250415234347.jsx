import React, { useState } from "react";
import { format } from "date-fns";

const Dashboard = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Function to render dots on calendar days (assuming data was logged on specific days)
    const renderCalendar = () => {
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const weeks = [];

        // Create weeks in a month
        let currentDay = 1;
        for (let i = 0; i < 6; i++) {
            const days = [];
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDayOfMonth) {
                    days.push(<div key={`${i}-${j}`} className="w-12 h-12"></div>); // Empty space before the month starts
                } else if (currentDay <= daysInMonth) {
                    days.push(
                        <div key={`${i}-${j}`} className="relative w-12 h-12 flex items-center justify-center">
                            <div
                                className={`text-sm font-medium ${currentDay === new Date().getDate() ? "bg-indigo-500 text-white rounded-full" : "text-gray-700"
                                    } p-2`}
                            >
                                {currentDay}
                            </div>
                            {/* Display dots on some days, for demonstration */}
                            <div
                                className={`w-2 h-2 bg-green-400 rounded-full absolute bottom-1 right-1 ${currentDay % 3 === 0 ? "block" : "hidden"
                                    }`} // Only show dots on certain days (for demo purposes)
                            />
                        </div>
                    );
                    currentDay++;
                }
            }
            weeks.push(<div key={i} className="flex">{days}</div>);
        }

        return weeks;
    };

    // Change month forward or backward
    const handleMonthChange = (direction) => {
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            if (direction === "next") {
                newDate.setMonth(newDate.getMonth() + 1);
            } else if (direction === "prev") {
                newDate.setMonth(newDate.getMonth() - 1);
            }
            return newDate;
        });
    };

    return (
        <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col">
            <main className="flex-grow p-4 sm:p-6">
                <h1 className="text-3xl font-bold text-indigo-500 mb-8">MyWorkLogger</h1>

                {/* Calendar Section */}
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex justify-between items-center mb-4">
                        <button
                            className="text-white text-xl"
                            onClick={() => handleMonthChange("prev")}
                        >
                            ←
                        </button>
                        <h3 className="text-xl font-semibold text-indigo-300">{format(currentDate, "MMMM yyyy")}</h3>
                        <button
                            className="text-white text-xl"
                            onClick={() => handleMonthChange("next")}
                        >
                            →
                        </button>
                    </div>
                    <div className="grid grid-cols-7 gap-2 mb-2">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                            <div key={day} className="text-center text-sm font-semibold text-gray-300">
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2 mt-2">{renderCalendar()}</div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
