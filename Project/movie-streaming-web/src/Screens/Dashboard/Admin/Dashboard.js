import React from 'react'
import SideBar from '../SideBar'
import { FaRegListAlt, FaUser } from 'react-icons/fa'
import { HiViewGridAdd } from 'react-icons/hi'
import { Movies } from '../../../Data/MoviesData'
import MovieTable from '../../../Components/MovieTable'

function Dashboard() {
    const DashboardInfo = [
        {
            bg:'bg-orange-600',
            icon:FaRegListAlt,
            title:'Total Movies',
            total:90
        },
        {
            bg:'bg-blue-700',
            icon:HiViewGridAdd,
            title:'Total Categories',
            total:8
        },
        {
            bg:'bg-green-600',
            icon:FaUser,
            title:'Total Users',
            total:144
        },
    ]
  return (
    <SideBar>
        <h2 className='text-xl font-bold'>Dashboard</h2>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
            {DashboardInfo.map((data, index) => (
                <div 
                    key={index}
                    className='p-4 rounded bg-main border-border grid grid-cols-4 gap-2'>
                    <div className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}>
                        <data.icon/>
                    </div>
                    <div className='col-span-3'>
                        <h2>{data.title}</h2>
                        <p className='mt-2 font-bold'>{data.total}</p>
                    </div>
                </div>
            ))}
        </div>
        <h3 className='text-md font-medium my-6 italic text-border'>Recent Movies</h3>
        <MovieTable data={Movies.slice(0, 5)} admin={true}></MovieTable>
    </SideBar>
  )
}

export default Dashboard