import React from 'react'
import Header from '../pages/header/Header'
import Calender from '../pages/Calender/Calender'
import NewCalender from '../pages/Calender/NewCalender'
import Task from '../pages/task/Task'
import { Outlet } from "react-router-dom";
import Sidebar from '../components/sidebar/Sidebar'

const Main = () => {
  return (
    <div className=''>
        <Header/>
        <div className=''>
          <Sidebar/>
            {/* <Calender/> */}
            <div className='px-[40px] ml-[170px] h-screen overflow-x-hidden pb-[40px] relative'>
              <Outlet/>
            </div>
            {/* <Task/> */}
        </div>
    </div>
  )
}

export default Main