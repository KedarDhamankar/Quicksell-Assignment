import React, { useState } from 'react'
import './Navbar.css'
import { BsSliders2 } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="navbar">
            <div className="dropdown">
                <button onClick={toggleVisibility}>
                    <BsSliders2 style={{ color: "#696B6C" }} />
                    Display
                    <IoIosArrowDown style={{ color: "#696B6C" }} />
                </button>
            </div>
            {isVisible && <div className="navbar-menu" >
                <div className="menu-container">
                    <div className="menu-item">
                        <label className="menu-label" for="grouping">Grouping</label>
                        <select className="menu-select" id="grouping">
                            <option>Status</option>
                            <option>Users</option>
                            <option>Priority</option>
                        </select>
                    </div>
                    <div className="menu-item">
                        <label className="menu-label" for="ordering">Ordering</label>
                        <select className="menu-select" id="ordering">
                            <option>Priority</option>
                        </select>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default Navbar