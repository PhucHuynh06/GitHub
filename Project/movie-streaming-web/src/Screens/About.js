import React from 'react'
import Head from '../Components/Head'
import Layout from './../Layout/Layout';

function About() {
  return (
    <Layout>
      <div className='min-height-screen container mx-auto px-2 py-6'>
        <Head title='About Kota'/>
        <div className='xl:py-20 py-10 px-4'>
          <div className='grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center'>
            <div>
              <div className='mt-3 text-sm leading-8 text-text'>
                <p>
                  Welcome to Kota Cinema, the premier destination for movie streaming online! Our website is dedicated to bringing you the best cinematic experiences from around the world, right in the comfort of your own home. 
                  Kota Cinema was founded by a team of movie enthusiasts who wanted to create a platform that would make it easy for people to discover and watch movies online. 
                </p>
                <br/>
              </div>
              <h3 className='text-xl lg:text-2xl mb-4 font-semibold'>
                Mission
              </h3>
              <div className='mt-3 text-sm leading-8 text-text'>
                <p>
                  To provide a seamless and enjoyable movie streaming experience with a diverse collection of films, accessible from any device.
                </p>
                <br/>
              </div>
              <h3 className='text-xl lg:text-2xl mb-4 font-semibold'>
                Vision
              </h3>
              <div className='mt-3 text-sm leading-8 text-text'>
                <p>
                To be the premier destination for online movie streaming, connecting a community of movie enthusiasts around the world.
                </p>
                <br/>
              </div>
              <h3 className='text-xl lg:text-2xl mb-4 font-semibold'>
                Value
              </h3>
              <div className='mt-3 text-sm leading-8 text-text'>
                <p>
                Diversity, accessibility, innovation, transparency, and integrity.
                </p>
              </div> 
              <div className='grid md:grid-cols-2 gap-6 xl:gap-6 mt-8'>
                <div className='p-8 bg-dry rounded-lg'>
                  <span className='text-3xl block font-extrabold mt-4 text-subMain'>
                    14M+
                  </span>
                  <h4 className='text-lg font-bold mb-1'>
                    Listed Movies
                  </h4>
                  <p className='mb-0 text-text leading-7 text-sm'>
                    We pride ourselves on offering one of the most extensive collections of movies available online, with a wide range of genres, languages, and eras represented. 
                    Whether you're in the mood for a Hollywood blockbuster, a foreign indie gem, or a cult classic, you're sure to find something to suit your tastes. 
                    With powerful search and filtering tools, you can quickly find what you're looking for and start streaming in seconds. 
                    So why wait? Sign up for our movie streaming website today and start exploring our vast collection of over 14 million movies!
                  </p>
                </div>
                <div className='p-8 bg-dry rounded-lg'>
                  <span className='text-3xl block font-extrabold mt-4 text-subMain'>
                    4M+
                  </span>
                  <h4 className='text-lg font-bold mb-1'>
                    Premium Accounts
                  </h4>
                  <p className='mb-0 text-text leading-7 text-sm'>
                    Upgrade your movie streaming experience with our premium accounts! With a premium account, you'll gain access to a host of exclusive features and benefits that will take your movie viewing to the next level. 
                    Enjoy ad-free streaming, high-quality video playback, and priority customer support. 
                    You'll also be able to access new movie releases and special content that is not available to our regular users. 
                  </p>
                </div>
              </div>  
            </div>   
            <div>
              <img
                src='/images/about2.jpg'
                alt='aboutus'
                className='w-full xl:block hidden h-header rounded-lg object-cover'
              />
              <img
                src='/images/about1.jpg'
                alt='aboutus'
                className='w-full xl:block hidden h-header rounded-lg object-cover mt-4'
              />
            </div>    
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default About