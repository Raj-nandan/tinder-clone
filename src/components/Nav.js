import React from 'react'
import colorlogo from '../images/tinder-logo.jpeg'
import logo from '../images/tinder.png'
const Nav = ({ minimal, setShowModal, showModel, setIsSignUp }) => {

    const handleClick = () => {
        console.log("clicked")
        setShowModal(true)
        setIsSignUp(false)
    }

    const authToken = false

    return (
        <nav>
            <div className="logo-container">
                <img className="logo" src={minimal ? colorlogo : logo} alt='logo' />
            </div>

            {!authToken && !minimal && <button className="nav-btn" onClick={handleClick} disabled = {showModel}>Log in</button>}
        </nav>

        

    )
}

export default Nav
