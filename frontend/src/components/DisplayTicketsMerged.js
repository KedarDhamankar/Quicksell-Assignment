import Card from "./Card";
import './DisplayTickets.css';

// In progress icon
import { RiProgress5Line } from "react-icons/ri";

// Plus icon
import { FaPlus } from "react-icons/fa6";

// Three dots icon
import { BsThreeDots } from "react-icons/bs";

const groupAndSortTickets = (tickets, grouping, sortOption, users) => {
    const groupedTickets = {};

    // console.log(tickets)

    // Define all possible labels for each grouping type
    const allLabels = {
        status: ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'],
        priority: ['4', '3', '2', '1', '0'],
        user: ['Unassigned', ...users.map(user => user.id)]
    };

    // Initialize groupedTickets with all possible labels
    allLabels[grouping].forEach(label => {
        groupedTickets[label] = [];
    });

    // Group tickets
    tickets.forEach(ticket => {
        let key;
        switch (grouping) {
            case 'status':
                key = ticket.status;
                break;
            case 'user':
                key = ticket.userId || 'Unassigned';
                break;
            case 'priority':
                key = ticket.priority !== undefined ? ticket.priority.toString() : '0';
                break;
            default:
                key = 'All Tickets';
        }

        if (groupedTickets[key]) {
            groupedTickets[key].push(ticket);
        } else {
            console.warn(`Unexpected ${grouping} value: ${key}`);
        }
    });

    Object.keys(groupedTickets).forEach(key => {
        groupedTickets[key].sort((a, b) => {
            if (sortOption === 'priority') {
                return b.priority - a.priority; // Descending order
            } else if (sortOption === 'title') {
                return a.title.localeCompare(b.title); // Ascending order
            }
            return 0;
        });
    });

    const columns = Object.entries(groupedTickets).map(([title, tickets]) => ({
        title,
        tickets
    }));

    // Sort columns
    if (grouping === 'priority') {
        columns.sort((a, b) => Number(b.title) - Number(a.title));
    } else if (grouping === 'status') {
        const statusOrder = { 'Backlog': 0, 'Todo': 1, 'In progress': 2, 'Done': 3, 'Cancelled': 4 };
        columns.sort((a, b) => statusOrder[a.title] - statusOrder[b.title]);
    }

    return columns;
};

// Helper functions
const getPriorityLabel = (priority) => {
    switch (Number(priority)) {
        case 4: return 'Urgent';
        case 3: return 'High';
        case 2: return 'Medium';
        case 1: return 'Low';
        case 0: return 'No priority';
        default: return 'Unknown';
    }
};

const getUserName = (userId, users) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : null;
};

// Updated usage in your React component
const DisplayTickets = ({ tickets, users, grouping, sortOption }) => {
    const groupedAndSortedTickets = groupAndSortTickets(tickets, grouping, sortOption, users);

    return (
        <div className="content">
            {groupedAndSortedTickets.map(column => (
                <div>
                    <div className="cards-section">
                        <div className="card-section-header">

                            <div className="card-section-header-left">
                                <RiProgress5Line />
                                <div key={column.title} className="ticket-column">
                                    <span>
                                        {grouping === 'priority' ? getPriorityLabel(column.title) :
                                            grouping === 'user' ? getUserName(column.title, users) :
                                                column.title}
                                    </span>
                                </div>
                                <span>3</span> {/* cards count */}
                            </div>
                            <div className="card-section-header-right">
                                <FaPlus />
                                <BsThreeDots />
                            </div>
                        </div>
                        <div className="cards-list">
                            {column.tickets.map(ticket => (
                                <div className="ticket" key={ticket.id}>
                                    <Card ticket={ticket} />
                                </div>
                            ))}
                            {/* </div> */}
                            {/* </div> */}
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};


export default DisplayTickets