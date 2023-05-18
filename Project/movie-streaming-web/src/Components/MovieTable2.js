import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { DateFormat, shortUppercaseId } from './Notfications/Empty'

const Head = 'text-xs text-left text-main font-bold px-5 py-3 uppercase'
const Text = 'text-sm text-left leading-6 whitespace-nowrap px-5 py-3'

const Rows = (data, i, users, OnEditFunction, OnDeleteFunction) => {
    return (
        <tr key={i}>
            {
                users ? (
                    <>
                        <td className={`${Text}`}>
                            <div className='w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden'>
                                <img
                                    className='h-full w-full object-cover'
                                    src={`${data?.image ? data.image : '/imgaes/user.png'}`}
                                    alt={data?.fullName}/>
                            </div>
                        </td>
                        <td className={`${Text}`}>{data?._id ? shortUppercaseId(data?._id) : 'D1E4X0T4ER'}</td>
                        <td className={`${Text}`}>{DateFormat(data?.createdAt)}</td>
                        <td className={`${Text}`}>{data?.fullName}</td>
                        <td className={`${Text}`}>{data?.email}</td>
                        <td className={`${Text}`}>{data?.isAdmin ? "Admin" : "User"}</td>
                        <td className={`${Text} float-right flex-rows gap-2`}>
                            {!data?.isAdmin && (
                            <button onClick={() => OnDeleteFunction(data?._id)} className='bg-subMain text-white rounded flex-colo py-4 px-4'>
                                <MdDelete/>
                            </button>
                            )}
                        </td>
                    </>
                ) : (
                    //Categories
                    <>
                        <td className={`${Text} font-bold`}>{data?._id ? shortUppercaseId(data?._id) : 'D1E4X0T4ER'}</td>
                        <td className={`${Text}`}>{DateFormat(data?.createdAt)}</td>
                        <td className={`${Text}`}>{data.title}</td>
                        <td className={`${Text} float-right flex gap-2`}>
                            <button 
                                onClick={() => OnEditFunction(data)}
                                className='border border-border bg-dry flex-rows gap-2 text-border rounded py-4 px-4'>
                                    <FaEdit className='text-green-500'/>
                            </button>
                            <button onClick={() => OnDeleteFunction(data?._id)} 
                                    className='bg-subMain text-white rounded flex-colo py-4 px-4'>
                                <MdDelete/>
                            </button>
                        </td>
                    </>
            )}
        </tr>
    )
}

function MovieTable2({data, users, OnEditFunction, OnDeleteFunction}) {
  return (
    <div className='overflow-x-scroll overflow-hidden relative w-full'>
        <table className='w-full table-auto border border-border divide-y divide-border'>
            <thead>
                <tr className='bg-dryGray'>
                    {
                        users ? (
                            <>
                                <th scope='col' className={`${Head}`}>
                                    Poster
                                </th>
                                <th scope='col' className={`${Head}`}>
                                    Id
                                </th>
                                <th scope='col' className={`${Head}`}>
                                    Date
                                </th>
                                <th scope='col' className={`${Head}`}>
                                    Full Name
                                </th>
                                <th scope='col' className={`${Head}`}>
                                    Email
                                </th>
                                <th scope='col' className={`${Head}`}>
                                    Role
                                </th>
                            </>
                        ) : (
                            <>
                                <th scope='col' className={`${Head}`}>
                                    Id
                                </th>
                                <th scope='col' className={`${Head}`}>
                                    Type
                                </th>
                                <th scope='col' className={`${Head}`}>
                                    Thể loại
                                </th>
                            </>
                        )}
                        <th scope='col' className='text-xs text-right text-main font-bold px-5 py-3 uppercase'>
                            Actions
                        </th>
                </tr>
            </thead>
            <tbody className='bg-main divide-y divide-gray-800'>
                {data.map((data, i) => Rows(data, i, users, OnEditFunction, OnDeleteFunction))}
            </tbody>
        </table>
    </div>
  )
}

export default MovieTable2