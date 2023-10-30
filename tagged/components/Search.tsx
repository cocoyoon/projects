import React from 'react'
import localFont from 'next/font/local'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

const custom_font = localFont({ src: '../fonts/utah-condensed-bold.ttf' })

function Search() {
    return (
        <div className="flex">
            <form className="flex flex-1 bg-orange-600 border-solid border-black border-b-2 items-center px-2">
                <MagnifyingGlassIcon className = "w-5 h-5 text-black" />
                <input type="text" placeholder='Search' className='flex-1 outline-none p-2 bg-orange-600 placeholder-black' />
            </form>
        </div>
    )
}

export default Search