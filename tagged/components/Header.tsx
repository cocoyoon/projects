import React from 'react'
import localFont from 'next/font/local'
import { Bars3Icon } from '@heroicons/react/20/solid'
import Link from 'next/link'

const custom_font = localFont({ src: '../fonts/utah-condensed-bold.ttf' })

function Header() {
  return (
    <header>
      <div className="grid grid-cols-3 p-1 items-center border-solid border-black border-b">
        <div className="px-2 text-sm">
          <Link href="/" prefetch={false}> 스타일 </Link>
          <Link href="/magazine" prefetch={false} className="px-2"> 메거진 </Link>
        </div>
        <Link href="/" prefetch={false} className="text-3xl text-center">
          <h1 className={custom_font.className}> TAGGED </h1>
        </Link>
        {/* <Bars3Icon className="h-5 w-5 point-cursor bg-red-500"/> */}
      </div>
    </header>
  )
}

export default Header