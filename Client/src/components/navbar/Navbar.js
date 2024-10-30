import React from 'react'
import './Navbar.scss'
import logo from '../../assets/logo.png'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="logo">
                <img src={logo} alt="" />
            </div>
        </div>
    )
}

export default Navbar