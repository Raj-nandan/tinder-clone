import React from 'react'
import colorlogo from '../images/tinder-logo.jpeg'
import logo from '../images/tinder.png'
const Nav = ({ minimal, authtoken }) => {

    return (
        <nav>
            <div className="logo-container">
                <img className="logo" src={minimal ? colorlogo : logo} />
            </div>

            {!authtoken && !minimal && <button className="nav-btn">Log in</button>}
        </nav>

    )
}

export default Nav
