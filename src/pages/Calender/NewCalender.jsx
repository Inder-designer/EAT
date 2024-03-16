import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import Loader from "../../components/loader/Loader";
import { TokenExpired } from "../../config/tokenDecoded";

const NewCalender = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = TokenExpired();

  const getAttendance = async () => {
    try {
      const res = await axios.get("/attendance/get-attendance", {
        headers: {
          Authorization: token,
        },
      });
      setAttendanceData(res.data.data.attendance);
      setTimeout(() => {
        setLoading(false);
      }, "100");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);

  const handlePrevMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
  };

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = new Date(year, month, 1).getDay();

    const calendarDays = [];

    // Fill in days from previous month
    const daysFromPrevMonth = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      const prevMonthDate = new Date(year, month - 1, daysFromPrevMonth - i);
      calendarDays.push({
        date: prevMonthDate,
        data: null,
      });
    }

    // Fill in days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const dataForDay = attendanceData.find(
        (item) =>
          new Date(item.date).toLocaleDateString() ===
          currentDate.toLocaleDateString()
      );

      calendarDays.push({
        date: currentDate,
        data: dataForDay || null,
      });
    }

    // Mark past dates with no data as "Absent"
    const today = new Date();
    calendarDays.forEach((day) => {
      if (day.date < today && !day.data) {
        day.data = { status: "Absent", inTime: "", outTime: "" };
      }
    });

    // Fill in days from next month
    const daysFromNextMonth = 7 - (calendarDays.length % 7);
    for (let i = 1; i <= daysFromNextMonth; i++) {
      const nextMonthDate = new Date(year, month + 1, i);
      calendarDays.push({
        date: nextMonthDate,
        data: null,
      });
    }

    return calendarDays.map((day, index) => (
      <div
        key={index}
        className={`day min-h-[140px] border border-gray-300 py-1 px-3 relative ${
          day.date.getMonth() === month
            ? "calendar-day"
            : "empty-day text-gray-400 saturate-[-0]"
        } ${
          day.date.toDateString() === today.toDateString() ? "bg-blue-200" : ""
        }`}
      >
        {day.date.getMonth() === month ? null : (
          <div className="absolute bg-gray-100 opacity-70 z-10 left-0 right-0 top-0 bottom-0"></div>
        )}
        {day.date.getDay() === 0 || day.date.getDay() === 6 ? (
          !day.data ? (
            <div className="rounded-md py-1.5 px-2 bg-purple-400 text-white mt-2">
              Holiday
            </div>
          ) : day.data.status === "Present" ? (
            <div>
              <div
                className={`text-sm rounded-md py-1.5 px-2 text-white font-semibold mt-2 bg-green-600                }`}
              >
                {day.data.status}
              </div>
              <div className="text-xs text-gray-600 flex flex-col mt-2">
                <span className="font-bold uppercase">
                  In Time: {day.data.inTime === "" ? "NA" : day.data.inTime}
                </span>
                <span className="font-bold uppercase">
                  Out Time: {day.data.outTime === "" ? "NA" : day.data.outTime}
                </span>
              </div>
            </div>
          ) : (
            <div className="rounded-md py-1.5 px-2 bg-purple-400 text-white mt-2">
              Holiday
            </div>
          )
        ) : (
          <div>
            {day.data && (
              <div
                className={`text-sm text-gray-500 rounded-md py-1.5 px-2 text-white font-semibold mt-2 ${
                  day.data.status === "Present"
                    ? "bg-green-600"
                    : day.data.attendance === "Leave"
                    ? "bg-blue-600"
                    : "bg-red-600"
                }`}
              >
                {day.data.status}
              </div>
            )}
            {day.data && (
              <div className="text-xs text-gray-600 flex flex-col mt-2">
                <span className="font-bold uppercase">
                  In Time: {day.data.inTime === "" ? "NA" : day.data.inTime}
                </span>
                <span className="font-bold uppercase">
                  Out Time: {day.data.outTime === "" ? "NA" : day.data.outTime}
                </span>
              </div>
            )}
          </div>
        )}
        <div
          className={`text-end absolute bottom-2 right-2 ${
            day.date.toDateString() === today.toDateString() ? "text-lg" : ""
          }`}
        >
          {day.date.getDate()}
        </div>
      </div>
    ));
  };

  const renderWeekDays = () => {
    const weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return weekDays.map((day, index) => (
      <div key={index} className="day font-semibold text-center uppercase py-3">
        {day}
      </div>
    ));
  };
  return (
    <div className="pt-[100px]">
      {loading ? (
        <div className="flex items-center justify-center w-full h-[calc(100vh_-_250px)]">
          <Loader />
        </div>
      ) : (
        <div>
          <h4 className="text-lg font-medium mb-3">Daily Attendance</h4>
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">
                {currentDate.toLocaleString("default", { month: "long" })}{" "}
                {currentDate.getFullYear()}
              </span>
              <div className="gap-2 flex">
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                  onClick={handlePrevMonth}
                >
                  Previous Month
                </button>
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                  onClick={handleNextMonth}
                >
                  Next Month
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7">{renderWeekDays()}</div>
            <div className="border border-gray-300">
              <div className="grid grid-cols-7">{renderCalendar()}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewCalender;
