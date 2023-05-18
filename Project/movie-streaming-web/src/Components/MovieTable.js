import React from 'react'
import { FaCloudDownloadAlt, FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { GoEye } from 'react-icons/go'

const Head = 'text-xs text-left text-main font-bold px-5 py-3 uppercase'
const Text = 'text-sm text-left leading-6 whitespace-nowrap px-5 py-3'

const Rows = (movie, i, admin) => {
    return (
        <tr key={i}>
            <td className={`${Text}`}>
                <div className='w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden'>
                    <img
                        className='h-full w-full object-cover'
                        src={movie?.image ? movie?.image: "/images/user.png"}
                        alt={movie?.name}/>
                </div>
            </td>
            <td className={`${Text} truncate`}>{movie.name}</td>
            <td className={`${Text}`}>{movie.category}</td>
            <td className={`${Text}`}>{movie.language}</td>
            <td className={`${Text}`}>{movie.year}</td>
            <td className={`${Text}`}>{movie.time}Tiếng</td>
            <td className={`${Text} float-right flex-rows gap-2`}>
                {
                    admin ? (
                        <span className='items-center flex gap-2'>
                            <button className='border border-border bg-dry flex-rows gap-2 text-border rounded py-4 px-4'>
                             Sửa   <FaEdit className='text-green-500'/>
                            </button>
                            <button className='bg-subMain text-white rounded flex-colo py-4 px-4'>
                                <MdDelete/>
                            </button>
                        </span>
                    ) : (
                        <span className='items-center flex gap-2'>
                            <button className='border border-border bg-dry flex-rows gap-2 text-green-500 rounded py-4 px-4'>
                               Tải Xuống <FaCloudDownloadAlt/>
                            </button>
                            <Link to={`/movie/${movie?._id}`} className='bg-subMain text-white rounded flex-colo py-4 px-4'>
                                <GoEye/>
                            </Link>
                        </span>
                    )
                }
            </td>
        </tr>
    )
}

function MovieTable({data, admin}) {

  return (
    <div className='overflow-x-scroll overflow-hidden relative w-full'>
        <table className='w-full table-auto border border-border divide-y divide-border'>
            <thead>
                <tr className='bg-dryGray'>
                    <th scope='col' className={`${Head}`}>
                        Poster
                    </th>
                    <th scope='col' className={`${Head}`}>
                        Name
                    </th>
                    <th scope='col' className={`${Head}`}>
                        Category
                    </th>
                    <th scope='col' className={`${Head}`}>
                        Language
                    </th>
                    <th scope='col' className={`${Head}`}>
                        Year
                    </th>
                    <th scope='col' className={`${Head}`}>
                        Time
                    </th>
                    <th scope='col' className='text-xs text-right text-main font-bold px-5 py-3 uppercase'>
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody className='bg-main divide-y divide-gray-800'>
                {data.map((movie, i) => Rows(movie, i, admin))}
            </tbody>
        </table>
    </div>
  )
}

export default MovieTable