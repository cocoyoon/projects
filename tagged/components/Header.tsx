import React from 'react'
import localFont from 'next/font/local'
import { Bars3Icon } from '@heroicons/react/20/solid'

const custom_font = localFont({ src: '../fonts/utah-condensed-bold.ttf' })

function Header() {
  return (
    <header>
      <div className="h-10 flex border-solid border-black border-b-2 items-center justify-between">
        <div className="px-2 flex text-sm">
          <p>스타일</p>
        </div>
        <div className={custom_font.className}>
          <div className="text-3xl"> 
            TAGGED
          </div>
        </div>
        <div className='px-2'>
          <Bars3Icon className="h-5 w-5"/>
        </div>
      </div>
    </header>
  )
}

export default Header