import { useEffect, useState } from 'react';

import './App.css';
import Card from "./components/Card.js"
import DisplayTickets from './components/DisplayTicketsMerged.js';

import { BsSliders2 } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

// In progress icon
import { RiProgress5Line } from "react-icons/ri";

// Plus icon
import { FaPlus } from "react-icons/fa6";

// Three dots icon
import { BsThreeDots } from "react-icons/bs";


function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [sortOption, setSortOption] = useState('priority');

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      const data = await res.json();

      console.log(data)

      setTickets(data.tickets);
      setUsers(data.users);
    }

    fetchDetails()
  }, [])

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {/* <Navbar />
       */}

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
              <select
                className="menu-select"
                id="grouping"
                value={grouping}
                onChange={(e) => setGrouping(e.target.value)}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="menu-item">
              <label className="menu-label" for="ordering">Ordering</label>
              <select
                className="menu-select"
                id="ordering"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>
        }
      </div>

      <DisplayTickets tickets={tickets} users={users} grouping={grouping} sortOption={sortOption} />

    </>
  );
}

export default App;