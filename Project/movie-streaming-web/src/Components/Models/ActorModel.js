import React from 'react'
import { Input } from '../UseInput'
import MainModels from './MainModels'
import Uploader from '../Uploader'

function ActorModel({modelOpen, setModelOpen, actor}) {
  return (
    <MainModels modelOpen={modelOpen} setModelOpen={setModelOpen}>
        <div className='inline-block sm:w-4/5 border border-border bg-main text-white rounded-2xl md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full'>
            <h2 className='text-3xl font-bold'>
                {actor ? 'Update Actor/Actress' : 'Add Actor/Actress'}
            </h2>
            <form className='flex flex-col gap-6 text-left mt-6'>
                <Input 
                    label="Actor/Actress's Name" 
                    placeholder={actor ? actor.fullName : 'Nicolai'}
                    type='text'
                    bg={false} ></Input>
                <p className='text-border font-semibold text-sm h-1'>
                    Actor/Actress Image
                </p>
                <Uploader/>
                <button
                    onClick={() => setModelOpen(false)} 
                    className='w-full flex-rows gap-4 py-3 text-lg transitions hover:bg-dry border-2 border-subMain  rounded bg-subMain text-white'>
                        {actor ? 'Update' : 'Add'}
                </button>
            </form>
        </div>
    </MainModels>
  )
}

export default ActorModel