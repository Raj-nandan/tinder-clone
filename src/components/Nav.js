import React from 'react'
import colorlogo from '../images/tinder-logo.jpeg'
import logo from '../images/tinder.png'
const Nav = ({ minimal, authtoken, setShowModal, showModel, setIsSignUp }) => {

    const handleClick = () => {
        console.log("clicked")
        setShowModal(true)
        setIsSignUp(false)
    }

    return (
        <nav>
            <div className="logo-container">
                <img className="logo" src={minimal ? colorlogo : logo} alt='logo' />
            </div>

            {!authtoken && !minimal && <button className="nav-btn" onClick={handleClick} disabled = {showModel}>Log in</button>}
        </nav>

    )
}

export default Nav
