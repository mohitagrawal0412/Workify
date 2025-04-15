import React from "react";
import {
    PieChart, Pie, Cell, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    LineChart, Line, AreaChart, Area
} from "recharts";

const Dashboard = () => {
    const summaryData = {
        totalPatients: 3256,
        availableStaff: 394,
        avgTreatmentCost: 62536,
        availableCars: 38,
        patientsThisMonth: 3240,
        todayPeakTime: "09:45am",
        peakAdmissions: 143
    };

    const outpatientInpatientTrend = [
        { month: "Oct 2019", outpatients: 4000, inpatients: 1000 },
        { month: "Nov 2019", outpatients: 3800, inpatients: 950 },
        { month: "Dec 2019", outpatients: 4100, inpatients: 1020 },
        { month: "Jan 2020", outpatients: 3900, inpatients: 980 },
        { month: "Feb 2020", outpatients: 4050, inpatients: 990 },
        { month: "Mar 2020", outpatients: 4200, inpatients: 1040 },
    ];

    const patientsByGender = [
        { name: "Female", value: 62 },
        { name: "Male", value: 38 }
    ];

    const patientsByDivision = [
        { division: "Cardiology", pt: 247 },
        { division: "Neurology", pt: 124 },
        { division: "Surgery", pt: 86 },
    ];

    const timeAdmitted = [
        { time: "08:00", value: 70 },
        { time: "09:00", value: 143 },
        { time: "10:00", value: 110 },
        { time: "11:00", value: 95 },
        { time: "12:00", value: 130 },
        { time: "01:00", value: 120 },
    ];

    const patientThisMonthData = Array.from({ length: 30 }, (_, i) => ({
        date: `${i + 1}`,
        value: Math.floor(Math.random() * 100) + 100,
    }));

    return (
        <div className="min-h-screen bg-gray-100 p-6 text-gray-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card label="Total Patients" value={summaryData.totalPatients} icon="🧑‍⚕️" />
                <Card label="Available Staff" value={summaryData.availableStaff} icon="👨‍🔬" />
                <Card label="Avg Treat. Costs" value={`$${summaryData.avgTreatmentCost.toLocaleString()}`} icon="💰" />
                <Card label="Available Cars" value={summaryData.availableCars} icon="🚑" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-4 shadow col-span-2">
                    <h2 className="text-lg font-semibold mb-4">Outpatients vs. Inpatients Trend</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={outpatientInpatientTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="inpatients" fill="#82ca9d" />
                            <Bar dataKey="outpatients" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-lg p-4 shadow">
                    <h2 className="text-lg font-semibold mb-4">Patients by Gender</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={patientsByGender} dataKey="value" nameKey="name" outerRadius={80} label>
                                {patientsByGender.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={["#ff7f50", "#1e90ff"][index % 2]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <div className="bg-white rounded-lg p-4 shadow">
                    <h2 className="text-lg font-semibold mb-4">Time Admitted</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={timeAdmitted}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-lg p-4 shadow">
                    <h2 className="text-lg font-semibold mb-4">Patients By Division</h2>
                    <ul className="space-y-2">
                        {patientsByDivision.map((item, index) => (
                            <li key={index} className="flex justify-between text-sm">
                                <span>{item.division}</span>
                                <span className="font-bold text-indigo-600">{item.pt}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-purple-600 rounded-lg p-4 shadow text-white">
                    <h2 className="text-lg font-semibold mb-2">{summaryData.patientsThisMonth} Patients this month</h2>
                    <ResponsiveContainer width="100%" height={120}>
                        <AreaChart data={patientThisMonthData}>
                            <Area type="monotone" dataKey="value" stroke="#fff" fill="#a78bfa" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

const Card = ({ label, value, icon }) => (
    <div className="bg-white rounded-lg p-4 shadow flex flex-col items-center justify-center">
        <div className="text-3xl mb-2">{icon}</div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-xl font-bold text-indigo-700">{value}</div>
    </div>
);

export default Dashboard;