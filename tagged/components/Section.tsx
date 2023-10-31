import React from 'react'
import localFont from 'next/font/local'

const custom_font = localFont({ src: '../fonts/utah-condensed-bold.ttf' })

interface Section {
    name: String
}

function Section({name}: Section) {
  return (
    <div className="text-3xl flex flex-1 p-1 border-solid border-black border-b justify-center">
        <h1 className={custom_font.className} >
            {name}
        </h1>
    </div>
  )
}

export default Section