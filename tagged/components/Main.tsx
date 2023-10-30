import React from 'react'
import Image from 'next/image'

function Main() {
  return (
    <div>
        <Image 
        src="/mock-1.png"
        alt='mocking'
        layout='fill'
        />
        <div> hi </div>
    </div>
  )
}

export default Main