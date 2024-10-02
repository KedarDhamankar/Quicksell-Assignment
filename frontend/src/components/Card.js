import React from 'react'
import './Card.css'
import profile from '../assets/profile.png'

const Card = ({ ticket }) => {
    return (
        <div className="card">
            <div className="card-header">
                <span className="card-id">{ticket.id}</span>
                <img src={profile} className="profile-image" />
            </div>
            <div className="card-title">{ticket.title}</div>
            <div className="card-text">
                <span className="feature-request">Feature Request</span>
            </div>
        </div>
    )
}

export default Card