import React from 'react'
import { FacebookShareButton, TwitterShareButton, TelegramShareButton, FacebookIcon, TwitterIcon, TelegramIcon } from 'react-share'
import MainModels from './MainModels'

function LinkShareModel({modelOpen, setModelOpen, movie}) {
    const share = [
        {
            icon: FacebookIcon,
            shareButton: FacebookShareButton
        },
        {
            icon: TwitterIcon,
            shareButton: TwitterShareButton
        },
        {
            icon: TelegramIcon,
            shareButton: TelegramShareButton
        },
    ]
    const url = `${window.location.protocol}//${window.location.host}/movie/${movie?._id}`
  return (
    <MainModels modelOpen={modelOpen} setModelOpen={setModelOpen}>
        <div className='inline-block sm:w-4/5 border border-border bg-main text-white rounded-2xl md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full'>
            <h2 className='text-xl'>
                Share {' '}
                <span className='text-xl font-bold'>
                    '{movie?.name}' ?
                </span>
            </h2>
            <form className='flex justify-center flex-wrap gap-6 mt-6'>
                {share.map((data, index) => (
                    <data.shareButton key={index} url={url} quote='Kota Cinema'>
                        <div className='w-12 transition flex-colo text-lg h-12 bg-white rounded bg-opacity-30'>
                            <data.icon/>
                        </div>
                    </data.shareButton>   
                ))}
            </form>
        </div>
    </MainModels>
  )
}

export default LinkShareModel