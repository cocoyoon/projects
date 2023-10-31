import React from 'react'
import Image from 'next/image'

function Main() {
  return (
    <div className = "flex flex-row">
        <img src="./mock-1.png" alt="main image" className="w-2/3 border-solid border-black border-r" /> 
        {/* Detail View */}
        <div className="flex flex-1 flex-col">
            <div className="p-2 flex-1 border-solid border-black border-b h-1/2">
                {/* <img src="./mock-1.png" alt="main image" className="h-1/4" />  */}
                Image Section
            </div>
            <div className="p-2 border-solid border-black border-b h-1/2">
                Checkout Section
            </div>
        </div>
    </div>
  )
}

export default Main