// Calendar.js
import React, { useState } from "react";

const Calendar = () => {
  const [inTime, SetInTime] = useState();
  const [outTime, SetOutTime] = useState();
  const [attendanceData, setAttendanceData] = useState([
    { date: "2023-12-01", present: true, inTime: "", outTime: "" },
    { date: "2023-12-02", present: false },
    { date: "2023-12-03", present: false },
    // Add more attendance data entries as needed
  ]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDayStatus = (date) => {
    const attendanceEntry = attendanceData.find((entry) => entry.date === date);
    return attendanceEntry ? (attendanceEntry.present ? "P" : "A") : "N";
  };

  const renderCalendar = () => {
    const today = currentMonth;
    const currentDate = new Date();
    const daysInMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).getDate();
    const monthStartDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    ).getDay();
  
    const calendarArray = [];
  
    // Add empty slots for days before the month starts
    for (let i = 0; i < monthStartDay; i++) {
      const prevMonthDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        0 - i
      ).getDate();
  
      calendarArray.push(
        <div
          key={`empty-${i}`}
          className="calendar-cell empty-cell border border-gray-200 text-gray-400 "
        >
          {prevMonthDay}
        </div>
      );
    }
  
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${today.getFullYear()}-${today.getMonth() + 1}-${day
        .toString()
        .padStart(2, "0")}`;
      const dayStatus = getDayStatus(date);
      const isToday =
        day === currentDate.getDate() &&
        today.getMonth() === currentDate.getMonth() &&
        today.getFullYear() === currentDate.getFullYear();
  
      calendarArray.push(
        <div
          key={day}
          className={`calendar-cell ${dayStatus.toLowerCase()} p-2 border border-gray-200 relative`}
        >
          <div
            className={`day-number text-center ${isToday ? "font-bold" : ""}`}
          >
            {day}
          </div>
          <div className="day-status text-center mb-1">
            {dayStatus === "P" && (
              <span className="text-green-600">Present</span>
            )}
            {dayStatus === "A" && <span className="text-red-600">Absent</span>}
            {!isToday && new Date(date) < currentDate
              ? dayStatus === "N" && (
                  <span className="text-gray-600">Not marked</span>
                )
              : ""}
          </div>
          {dayStatus === "P" && (
            <div className="in-out-times text-xs text-gray-500 absolute bottom-0 left-0 right-0 px-2">
              <div className="mb-1">In: {inTime}</div>
              <div>Out: {outTime}</div>
            </div>
          )}
        </div>
      );
    }
  
    // Add empty slots for days after the month ends
    const remainingDays = 42 - (monthStartDay + daysInMonth);
    for (let i = 1; i <= remainingDays; i++) {
      const nextMonthDay = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        i
      ).getDate();
  
      calendarArray.push(
        <div
          key={`next-month-${i}`}
          className="calendar-cell empty-cell border border-gray-200 text-gray-400 "
        >
          {nextMonthDay}
        </div>
      );
    }
  
    return calendarArray;
  };

  const currentDate = new Date();
  const todayDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;


  const handleIn = (date) => {
    SetInTime(new Date().toLocaleTimeString());
  };

  const handleOut = (date) => {
    SetOutTime(new Date().toLocaleTimeString());
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      (prevMonth) => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1)
    );
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      (prevMonth) => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1)
    );
  };

  const handleToday = () => {
    setCurrentMonth(new Date());
  };

  return (
    <div className="attendance-calendar p-4 pt-[120px]">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="btn-prev-next">
          Previous Month
        </button>
          <div className="">

          </div>
        <div className="calendar-header text-2xl font-bold">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <div className="flex">
          <button onClick={handleToday} className="btn-today mr-2">
            Today
          </button>
          <button onClick={handleNextMonth} className="btn-prev-next">
            Next Month
          </button>
        </div>
      </div>
      <div className="calendar-days grid grid-cols-7 mb-4">
        <div className="day-label text-center">Sun</div>
        <div className="day-label text-center">Mon</div>
        <div className="day-label text-center">Tue</div>
        <div className="day-label text-center">Wed</div>
        <div className="day-label text-center">Thu</div>
        <div className="day-label text-center">Fri</div>
        <div className="day-label text-center">Sat</div>
      </div>
      <div className="calendar-grid grid grid-cols-7 border">
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
