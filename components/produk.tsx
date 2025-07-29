import Image from 'next/image'
import React from 'react'

export default function ProductCards() {
  return (
    <div className=''>
      <h1 className='text-5xl flex items-center justify-center'>Produk <span className='text-red-500'> kami</span></h1>
      <div className='flex justify-center items-center'>
        <div className=' flex flex-wrap justify-center items-center gap-20 mt-10 '>
          <Image
                  priority
                   src="/images/produk2.jpeg" // Ganti ini dengan gambar kamu
                   alt="Loading"
                   width={200}
                   height={200}
                   className=" object-cover"
                 />
          <Image
                  priority
                   src="/images/produk2.jpeg" // Ganti ini dengan gambar kamu
                   alt="Loading"
                   width={200}
                   height={200}
                   className=" object-cover"
                 />
        </div>
      </div>
     
    </div>
  )
}
