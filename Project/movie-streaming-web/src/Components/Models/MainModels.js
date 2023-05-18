import { Dialog, Transition } from '@headlessui/react'
import React from 'react'
import { Fragment } from 'react'
import { useRef } from 'react'
import { IoClose } from 'react-icons/io5' 

function MainModels({modelOpen, setModelOpen, children}) {
    const cancelButton = useRef()
  return (
    <>
        <Transition 
            show={modelOpen}
            as={Fragment}
            appear>
                <Dialog
                    as='div'
                    className='fixed inset-0 z-30 overflow-y-auto text-center' initialFocus={cancelButton} onClose={() => setModelOpen(false)}>
                        <div className='min-h-screen px-4'>
                            <Transition.Child 
                                as={Fragment} 
                                enter='ease-out duration-300' 
                                enterFrom='opacity-0' 
                                enterTo='opacity-100' 
                                leave='ease-in duration-200' 
                                leaveFrom='opacity-100 scale-100' 
                                leaveTo='opacity-0'>
                                    <Dialog.Overlay className='fixed inset-0 bg-black opacity-60'></Dialog.Overlay>               
                            </Transition.Child>
                            <span 
                                className='inline-block h-screen align-middle'
                                aria-hidden='true'>
                                    &#8203
                            </span>
                            <Transition.Child 
                                as={Fragment} 
                                enter='ease-out duration-300' 
                                enterFrom='opacity-0 scale-95' 
                                enterTo='opacity-100 scale-100' 
                                leave='ease-in duration-200' 
                                leaveFrom='opacity-100 scale-100' 
                                leaveTo='opacity-0 scale-95'>
                                    {children}            
                            </Transition.Child>
                            <div className='absolute right-5 top-5'>
                                <button
                                    onClick={() => setModelOpen(false)}
                                    type='button'
                                    className='transitions w-10 h-10 flex-colo text-base text-subMain bg-white rounded-md hover:bg-subMain hover:text-white'>
                                        <IoClose/>
                                </button>
                            </div>
                        </div>
                </Dialog>    
        </Transition>

    </>
  )
}

export default MainModels