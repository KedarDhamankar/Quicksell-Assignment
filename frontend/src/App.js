import { useEffect, useState } from 'react';

import './App.css';
import Card from "./components/Card.js"
import Navbar from './components/Navbar.js';
import DisplayTickets from './components/DisplayTicketsMerged.js';

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

      setTickets(data.tickets);
      setUsers(data.users);
      alert('Fetched data:', tickets);

    }

    fetchDetails()
  }, [])
  return (
    <>
      <Navbar />

      <DisplayTickets tickets={tickets} users={users} grouping={grouping} sortOption={sortOption} />

    </>
  );
}

export default App;