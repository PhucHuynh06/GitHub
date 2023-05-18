import React from 'react'
import SideBar from '../SideBar'
import { Input, Message, Select } from '../../../Components/UseInput'
import Uploader from './../../../Components/Uploader';
import { CategoriesData } from '../../../Data/CategoriesData';
import { Actor } from '../../../Data/MoviesData';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { ImUpload } from 'react-icons/im';
import ActorModel from '../../../Components/Models/ActorModel';
import { useState } from 'react';
import { useEffect } from 'react';

function AddMovie() {
    const [modelOpen, setModelOpen] = useState(false)
    const [actor, setActor] = useState(null)

    useEffect(() => {
        if(modelOpen === false) {
            setActor();
        }
    }, [modelOpen]);
  return (
    <SideBar>
      <ActorModel 
        modelOpen={modelOpen}
        setModelOpen={setModelOpen}
        actor={actor}/>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Add Movie</h2>
        <Input
            label="Movie Title"
            placeholder="Ex: Game Of Cube"
            type="text"
            bg={true}>
        </Input>
        <Input
            label="Hour"
            placeholder="Ex: 4hr"
            type="text"
            bg={true}
        ></Input>
        <Input
          label="Language Used"
          placeholder="Ex: English"
          type="text"
          bg={true}
        ></Input>
        <Input
          label="Release Year"
          placeholder="Ex: 2014"
          type="number"
          bg={true}
        ></Input>
        <p className='text-border font-semibold text-sm h-1'>
            Image
        </p>
        <Uploader/>
        <Message
            label="Movie Description"
            placeholder="Ex: Dexter baxter holden daxter"
        ></Message>
        <div className='text-sm w-full'>
            <Select label='Movie Category'
                options={CategoriesData}></Select>
        </div>
        <p className='text-border font-semibold text-sm h-1'>
            Video
        </p>
        <Uploader/>
        <button 
            onClick={() => setModelOpen(true)}
            className='w-full py-4 bg-main border border-subMain text-white rounded'>
                Add Actor
        </button>
        <div className='grid 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4'>
            {Actor.map((user, i) => (
                <div
                    key={i}
                    className='p-2 italic text-xs text-text rounded flex-colo bg-main border'>
                        <img
                            src={`/${user.image ? user.image : 'user.png'}`}
                            alt={user.fullName}
                            className='w-full h-24 object-cover rounded mb-2'/>
                        <p>{user.fullName}</p>
                        <div className='flex justify-center mt-2 w-full gap-2'>
                            <button className='w-7 h-7 text-lg flex-colo bg-dry border border-border text-subMain rounded'>
                                <MdDelete/>
                            </button>
                            <button 
                                onClick={() => {
                                    setActor(user)
                                    setModelOpen(true)
                                }}
                                className='w-7 h-7 text-lg flex-colo bg-dry border border-border text-green-800 rounded'>
                                    <FaEdit/>
                            </button>
                        </div>
                </div>
            ))}
        </div>

        <button className="bg-subMain w-full flex justify-center items-center gap-6 font-medium  text-white py-5 rounded">
            <ImUpload/> Publish Movie
        </button>

      </div>
    </SideBar>
  )
}

export default AddMovie