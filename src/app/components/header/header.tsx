import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <Link href="/">
        <div className='font-bold text-xl cursor-pointer p-4'>Job Serach Portal</div>
    </Link>
  )
}

export default Header