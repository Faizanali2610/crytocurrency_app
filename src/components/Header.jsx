import React from 'react'
import { Link } from "react-router-dom"
const Header = () => {
  return (
    <div className='p-5  text-white space-x-16  bg-[#151313]'>
    <Link to="/">Home</Link>
    <Link to="/exchanges">Exhanges</Link>
    <Link to="/coins">Coins</Link>
    

    </div>
  )
}

export default Header
