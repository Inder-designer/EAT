import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Check, Done } from "@mui/icons-material";
import UserInfo from "../../components/userInfo/UserInfo";
import Loader from "../../components/loader/Loader";
import { TokenExpired } from "../../config/tokenDecoded";

const Task = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [taskData, setTaskData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const token = TokenExpired();

  const getTask = async () => {
    try {
      const res = await axios.get("/task/get-task", {
        headers: {
          Authorization: token,
        },
      });
      setTaskData(res.data.data);
      setTimeout(() => {
        setLoading(false);
      }, "100");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  const getAttendance = async () => {
    try {
      const res = await axios.get("/attendance/get-attendance", {
        headers: {
          Authorization: token,
        },
      });
      setAttendanceData(res.data.data.attendance);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);

  const todayDate = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const markAttendanceIn = async (e) => {
    setLoader(true);
    try {
      const res = await axios.post(
        "attendance/mark-attendance",
        {
          date: todayDate,
          attendance: "Present",
          inTime: currentTime,
          outTime: "",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      getAttendance();
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };
  const markAttendanceOut = async () => {
    setLoader(true);
    const inTime = attendanceData.find(
      (item) => item.date === todayDate
    ).inTime;
    try {
      const res = await axios.post(
        "attendance/mark-attendance",
        {
          date: todayDate,
          attendance: "Present",
          inTime: inTime,
          outTime: currentTime,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      getAttendance();
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (e) => {
    setLoader(true);
    try {
      const res = await axios.put(
        "/task/update-status/" + e,
        { status: "Completed" },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      getTask();
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

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

    const calendarDays = [];

    // Fill in days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const dataForDay = taskData.find(
        (item) =>
          new Date(item.date).toLocaleDateString() ===
          currentDate.toLocaleDateString()
      );
      calendarDays.push({
        date: currentDate,
        data: dataForDay || null,
      });
    }

    const weeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7));
    }

    return (
      <div className="flex overflow-x-auto">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`day min-w-[200px] min-h-[150px] border border-gray-300 ${
              day.date.getMonth() === month
                ? "calendar-day"
                : "empty-day text-gray-400"
            }`}
          >
            <div className="text-center border-b border-gray-300 text-gray-500 font-medium">
              {day.date.toLocaleDateString("en-US", { weekday: "short" })}
              <br />
              {day.date.getDate()}
            </div>

            {day.data && (
              <div className="text-xs text-gray-500 flex flex-col mt-2 px-2">
                {Array.isArray(day.data) ? (
                  day.data.map((task, taskIndex) => (
                    <div
                      key={taskIndex}
                      className="mt-4 bg-blue-500 p-4 text-white text-sm rounded-md d"
                    >
                      {task.description}
                      <div>Status: {task.status}</div>
                    </div>
                  ))
                ) : (
                  <div>
                    <div className="mt-4 dd">
                      {day.data.tasks.map((task, taskIndex) => (
                        <div
                          key={taskIndex}
                          className="bg-blue-500 py-4 px-2 text-white text-sm rounded-md mb-4"
                        >
                          {task.description}
                          <div className="text-black bg-slate-100 mt-4 px-2 py-1 rounded-[4px]">
                            <span className=" font-medium">Deadline:</span>{" "}
                            {task.deadline}
                          </div>
                          <div className="flex items-center">
                            <div className="text-black bg-slate-100 mt-2 px-2 py-1 rounded-[4px]">
                              <span
                                className={`font-medium ${
                                  task.status === "Pending"
                                    ? "text-red-600"
                                    : "text-green-600"
                                }`}
                              >
                                {task.status}
                              </span>
                            </div>
                            {task.status === "Pending" ? (
                              <button
                                className="ml-1 bg-slate-100 rounded-[4px] px-2 mt-2 text-green-600"
                                onClick={() => updateStatus(task._id)}
                              >
                                <Done className="text-[28px]" />
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* {day.data && !Array.isArray(day.data) && (
              <div className="text-xs text-gray-500 flex flex-col mt-2 px-2">
                <div className="mt-4 bg-blue-500 p-4 text-white text-sm rounded-md">
                  {day.data.description}
                </div>
              </div>
            )} */}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="pt-[120px] pb-6 ">
      {loading ? (
        <div className="flex items-center justify-center w-full h-[calc(100vh_-_250px)]">
          <Loader />
        </div>
      ) : (
        <div className="relative">
          {loader && 
          <div className="flex items-center justify-center left-0 right-0 top-0 bottom-0 absolute bg-white opacity-70 backdrop-blur-sm">
            <Loader />
          </div>
          }
          <div className="flex justify-between items-center mb-4">
            <div>
              <UserInfo />
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex gap-2 items-center">
                {attendanceData.some((item) => item.date === todayDate) ? (
                  <button
                    className="px-2 py-1.5 bg-gray-300 rounded uppercase font-medium text-sm text-gray-800"
                    disabled
                  >
                    In Time:{" "}
                    {
                      attendanceData.find((item) => item.date === todayDate)
                        .inTime
                    }
                  </button>
                ) : (
                  <button
                    className="px-2 py-1.5 bg-blue-500 text-white rounded font-medium text-sm uppercase"
                    onClick={markAttendanceIn}
                  >
                    Attendance In
                  </button>
                )}
                {attendanceData.some((item) => item.date === todayDate) ? (
                  !attendanceData.find((item) => item.date === todayDate)
                    .outTime ? (
                    <button
                      className="px-2 py-1.5 bg-blue-500 text-white font-medium rounded uppercase  text-sm"
                      onClick={() => markAttendanceOut()}
                    >
                      Attendance Out
                    </button>
                  ) : (
                    <button
                      className="px-2 py-1.5 bg-gray-300 rounded uppercase font-medium text-sm text-gray-800"
                      disabled
                    >
                      In Time:{" "}
                      {
                        attendanceData.find((item) => item.date === todayDate)
                          .outTime
                      }
                    </button>
                  )
                ) : (
                  <button
                    disabled
                    className="px-2 py-1.5 bg-gray-300 rounded uppercase font-medium text-sm text-gray-800"
                    // onClick={() => markAttendanceOut()}
                  >
                    Attendance Out
                  </button>
                )}
              </div>
            </div>
            <div className="gap-2 flex items-center">
              <span className="text-lg font-semibold">
                {currentDate.toLocaleString("default", { month: "long" })}{" "}
                {currentDate.getFullYear()}
              </span>
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
          <div className="border border-gray-300">
            {renderCalendar()}
            {/* Add navigation buttons or other components as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
