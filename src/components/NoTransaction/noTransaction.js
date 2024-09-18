import React from 'react'
import noTransaction from '../../components/assets/No.png'

function NoTransaction() {
    return (
        <div className='w-full flex justify-center items-center flex-col mb-10'>
            <img src={noTransaction} alt="" className='w-[70%] md:w-[30%] ml-3'/>
            <p className='lg:text-3xl md:text-3xl text-md font-semibold text-blue-500 capitalize'>You have no transactions available</p>
        </div>
    )
}

export default NoTransaction;
