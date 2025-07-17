import React from 'react'
import { Link } from 'react-router-dom'

function clubselection() {
  return (
    <div className='flex flex-col w-[100vw] h-[calc(100vh-130px)] gap-10 items-center justify-center '>
    <Link to={'/clubs'} className='text-[#00EAFF] font-bold text-4xl'>Sports Clubs</Link>
    <Link to={'/clubs'} className='text-[#00EAFF] font-bold text-4xl'>Cultural Clubs</Link>
    <Link to={'/clubs'}className='text-[#00EAFF] font-bold text-4xl'>Tech Clubs</Link>
    </div>
  )
}

export default clubselection