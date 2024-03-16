import React from 'react'

const ErrorPage = () => {
  return (
    <div className=''>
      <div className='flex justify-center items-center flex-col'>
        <h2 className='mt-[10%] text-9xl font-bold'>404</h2>
        <div className='mt-10 text-center'>
            <p className='text-xl uppercase text-gray-400 mb-4'>Page not found</p>
            <a href="/" className='border border-blue-600 hover:bg-blue-600 hover:text-white transition duration-300 px-5 py-1 inline-block mt-0 text-blue-600'>Go Back</a>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
